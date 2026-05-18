import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { session, role, error: authError } = await requireAdminAPI();
        if (authError) return authError;

        const json = await req.json();
        const { title, slug, description, status, mode } = json;

        if (!title || !slug) {
            return new NextResponse("Title and Slug are required", { status: 400 });
        }

        const validModes = ["GUIDED", "SEQUENTIAL"];
        const safeMode = validModes.includes(mode) ? mode : "GUIDED";

        const path = await prisma.learningPath.create({
            data: {
                title,
                slug,
                description: description || "",
                status: status || "DRAFT",
                mode: safeMode
            }
        });

        return NextResponse.json(path);
    } catch (error) {
        console.error("Path create error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
