import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Anti-enumeration: always return success
        if (!user) {
            return NextResponse.json({ message: "If that email exists, a reset link was sent." });
        }

        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 1000 * 60 * 60); // 1 hour

        // Clear existing tokens for this email
        await prisma.passwordResetToken.deleteMany({
            where: { email },
        });

        await prisma.passwordResetToken.create({
            data: {
                email,
                token,
                expires,
            },
        });

        const resetLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

        // RESEND EMAIL TRANSPORT
        if (process.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY);

                await resend.emails.send({
                    from: process.env.RESEND_FROM_EMAIL || "Skillary Support <onboarding@resend.dev>",
                    to: email,
                    subject: "Reset your Skillary password",
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; color: #111;">
                            <h2>Password Reset Request</h2>
                            <p>We received a request to reset your password for your Skillary account.</p>
                            <p>Click the link below to choose a new password. This link will expire in 1 hour.</p>
                            <a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background: rgb(255,138,0); color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 16px 0;">Reset Password</a>
                            <p style="color: #666; font-size: 14px;">If you didn't request this, you can safely ignore this email.</p>
                        </div>
                    `
                });
            } catch (err) {
                console.error("Resend delivery failed:", err);
            }
        } else {
            console.log("🔒 [MOCK EMAIL FALLBACK - Missing RESEND_API_KEY]");
            console.log("Link:", resetLink);
        }

        return NextResponse.json({ message: "If that email exists, a reset link was sent." });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
