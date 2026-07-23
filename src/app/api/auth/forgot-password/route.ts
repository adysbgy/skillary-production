import { createHash, randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientKey, rateLimitHeaders } from "@/lib/rate-limit";
import { log } from "@/lib/observability/logger";

const requestSchema = z.object({ email: z.string().trim().email().max(254) });
const GENERIC_MESSAGE = "If that email exists, a reset link was sent.";
const CANONICAL_ORIGIN = process.env.NEXT_PUBLIC_APP_URL || (process.env.NODE_ENV === "production" ? "https://skillary.my.id" : "http://localhost:3000");

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const parsed = requestSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "A valid email is required" }, { status: 400 });

    const email = parsed.data.email.toLowerCase();
    const ipLimit = await checkRateLimit(`forgot-password:${getClientKey(req)}`, 5, 15 * 60 * 1000);
    if (!ipLimit.allowed) {
      return NextResponse.json({ message: GENERIC_MESSAGE }, { status: 429, headers: rateLimitHeaders(ipLimit) });
    }
    const accountLimit = await checkRateLimit(`forgot-password-account:${email}`, 3, 60 * 60 * 1000);
    if (!accountLimit.allowed) {
      return NextResponse.json({ message: GENERIC_MESSAGE });
    }

    const user = await prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (!user) return NextResponse.json({ message: GENERIC_MESSAGE });

    const rawToken = randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    await prisma.$transaction([
      prisma.passwordResetToken.deleteMany({ where: { email } }),
      prisma.passwordResetToken.create({ data: { email, token: tokenHash(rawToken), expires } }),
    ]);

    const resetLink = `${CANONICAL_ORIGIN}/reset-password?token=${encodeURIComponent(rawToken)}`;
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Skillary Support <onboarding@resend.dev>",
        to: email,
        subject: "Reset your Skillary password",
        html: `<div style="font-family:sans-serif;max-width:600px;color:#111"><h2>Password Reset Request</h2><p>We received a request to reset your Skillary password.</p><p>This link expires in 1 hour.</p><a href="${resetLink}" style="display:inline-block;padding:12px 24px;background:rgb(255,138,0);color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;margin:16px 0">Reset Password</a><p style="color:#666;font-size:14px">If you did not request this, ignore this email.</p></div>`,
      });
    } else {
      log.warn("auth.password_reset.email_unavailable", { reason: "RESEND_NOT_CONFIGURED" });
    }
    return NextResponse.json({ message: GENERIC_MESSAGE });
  } catch (error) {
    log.error("auth.password_reset.request_failed", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
