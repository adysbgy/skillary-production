import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { checkRateLimit, getClientKey, rateLimitHeaders } from "@/lib/rate-limit";

const registrationSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(254),
    password: z.string().min(10).max(128),
});

export async function POST(req: Request) {
    try {
        const limit = await checkRateLimit(`register:${getClientKey(req)}`, 5, 60 * 60 * 1000);
        if (!limit.allowed) {
            return NextResponse.json({ error: "Too many registration attempts." }, { status: 429, headers: rateLimitHeaders(limit) });
        }
        const parsed = registrationSchema.safeParse(await req.json());
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Provide a valid name, email, and password of 10–128 characters." },
                { status: 400 }
            );
        }
        const { name, password } = parsed.data;
        const email = parsed.data.email.toLowerCase();

        const existing = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existing) {
            return NextResponse.json(
                { error: "An account with this email already exists." },
                { status: 409 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: {
                name,
                email: email,
                passwordHash,
            },
        });

        return NextResponse.json(
            { id: user.id, name: user.name, email: user.email },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Internal server error." },
            { status: 500 }
        );
    }
}
