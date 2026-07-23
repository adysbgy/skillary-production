import { createHash } from "crypto";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientKey, rateLimitHeaders } from "@/lib/rate-limit";
import { log } from "@/lib/observability/logger";

const resetSchema = z.object({
  token: z.string().length(64),
  newPassword: z.string().min(10).max(128),
});

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const limit = await checkRateLimit(`reset-password:${getClientKey(req)}`, 10, 15 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json({ error: "Too many attempts" }, { status: 429, headers: rateLimitHeaders(limit) });
    }

    const parsed = resetSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid token or password must be 10–128 characters" }, { status: 400 });
    }

    const hash = tokenHash(parsed.data.token);
    const resetRecord = await prisma.passwordResetToken.findUnique({ where: { token: hash } });
    if (!resetRecord || resetRecord.expires < new Date()) {
      if (resetRecord) await prisma.passwordResetToken.delete({ where: { token: hash } });
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const newPasswordHash = await bcrypt.hash(parsed.data.newPassword, 12);
    const changedAt = new Date();
    await prisma.$transaction([
      prisma.user.update({
        where: { email: resetRecord.email },
        data: { passwordHash: newPasswordHash, passwordChangedAt: changedAt },
      }),
      prisma.passwordResetToken.deleteMany({ where: { email: resetRecord.email } }),
    ]);

    return NextResponse.json({ success: true, message: "Password has been reset successfully" });
  } catch (error) {
    log.error("auth.password_reset.consume_failed", { error });
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
