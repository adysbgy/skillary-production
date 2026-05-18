import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const { token, newPassword } = await req.json();

        if (!token || !newPassword) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const resetRecord = await prisma.passwordResetToken.findUnique({
            where: { token },
        });

        if (!resetRecord) {
            return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
        }

        if (resetRecord.expires < new Date()) {
            await prisma.passwordResetToken.delete({ where: { token } });
            return NextResponse.json({ error: "Token has expired" }, { status: 400 });
        }

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        // Update user
        await prisma.user.update({
            where: { email: resetRecord.email },
            data: { passwordHash: newPasswordHash },
        });

        // Destroy token
        await prisma.passwordResetToken.delete({
            where: { token },
        });

        return NextResponse.json({ success: true, message: "Password has been reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
