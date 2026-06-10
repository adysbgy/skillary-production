import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");
        const secret = searchParams.get("secret");

        // Simple security check to prevent abuse
        if (secret !== "skillary-setup-superadmin-2026") {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
        }

        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found. Please register on the website first." }, { status: 404 });
        }

        const updatedUser = await prisma.user.update({
            where: { email },
            data: { role: "ADMIN" }
        });

        return NextResponse.json({ 
            success: true, 
            message: `User ${updatedUser.email} has been successfully promoted to ADMIN. Please logout and login again.` 
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
