import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function PUT(req: Request) {
    try {
        const session = await auth();
        if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { name, currentPassword, newPassword } = await req.json();

        const user = await prisma.user.findUnique({ where: { id: session.user.id } });
        if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const updateData: any = {};

        if (name && name.trim() !== "") updateData.name = name.trim();

        if (currentPassword && newPassword) {
            if (!user.passwordHash) {
                return NextResponse.json({ error: "Your account uses a third-party provider and does not have a password." }, { status: 400 });
            }
            const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
            if (!isMatch) return NextResponse.json({ error: "Incorrect current password." }, { status: 403 });
            if (newPassword.length < 6) return NextResponse.json({ error: "New password must be at least 6 characters." }, { status: 400 });
            updateData.passwordHash = await bcrypt.hash(newPassword, 12);
        }

        if (Object.keys(updateData).length === 0) {
            return NextResponse.json({ error: "No valid fields to update." }, { status: 400 });
        }

        await prisma.user.update({
            where: { id: user.id },
            data: updateData
        });

        return NextResponse.json({ ok: true });
    } catch (error) {
        console.error("Settings update error:", error);
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
