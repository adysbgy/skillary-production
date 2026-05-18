import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { session, role, error: authError } = await requireAdminAPI();
        if (authError) return authError;
        const { id } = await params;

        const json = await req.json();
        const { title, slug, description, status, mode } = json;

        if (!title || !slug) {
            return new NextResponse("Title and Slug are required", { status: 400 });
        }

        const validModes = ["GUIDED", "SEQUENTIAL"];
        const safeMode = validModes.includes(mode) ? mode : undefined;

        const path = await prisma.learningPath.update({
            where: { id },
            data: {
                title,
                slug,
                description: description || "",
                status: status || "DRAFT",
                ...(safeMode ? { mode: safeMode } : {})
            }
        });

        return NextResponse.json(path);
    } catch (error) {
        console.error("Path update error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { session, role, error: authError } = await requireAdminAPI();
        if (authError) return authError;
        const { id } = await params;

        // Safety: prevent hard deletion if learners have joined this path
        const joinCount = await prisma.pathEnrollment.count({ where: { learningPathId: id } });
        if (joinCount > 0) {
            return NextResponse.json({
                error: `Cannot delete: This path has ${joinCount} active learner enrollment(s). Set status to ARCHIVED instead.`
            }, { status: 400 });
        }

        await prisma.learningPath.delete({
            where: { id }
        });

        return new NextResponse("Deleted", { status: 200 });
    } catch (error) {
        console.error("Path delete error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
