import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientKey, rateLimitHeaders } from "@/lib/rate-limit";

const registrationSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).transform((value) => value.toLowerCase()),
  password: z.string().min(10).max(128),
}).strict();

export async function POST(req: Request) {
  try {
    const rateLimit = await checkRateLimit(getClientKey(req, "register"), 5, 15 * 60 * 1000);
    if (!rateLimit.configured && process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
    }
    if (rateLimit.configured && !rateLimit.success) {
      return NextResponse.json(
        { error: "Too many registration attempts. Please try again later." },
        { status: 429, headers: rateLimitHeaders(rateLimit) },
      );
    }

    const parsed = registrationSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || "Invalid registration data." },
        { status: 400 },
      );
    }

    const { name, email, password } = parsed.data;
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
    });

    return NextResponse.json(
      { id: user.id, name: user.name, email: user.email },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
