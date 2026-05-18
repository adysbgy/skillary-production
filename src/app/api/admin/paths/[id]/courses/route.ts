import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

// Add a course to the path
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { session, role, error: authError } = await requireAdminAPI();
        if (authError) return authError;
        const { id } = await params;
        const json = await req.json();
        const { courseId } = json;

        if (!courseId) return new NextResponse("Target course required", { status: 400 });

        // Get max sortOrder
        const existing = await prisma.learningPathCourse.findMany({
            where: { learningPathId: id },
            orderBy: { sortOrder: "desc" },
            take: 1
        });
        const maxOrder = existing.length > 0 ? existing[0].sortOrder : 0;

        const pathCourse = await prisma.learningPathCourse.create({
            data: {
                learningPathId: id,
                courseId,
                sortOrder: maxOrder + 1
            }
        });

        return NextResponse.json(pathCourse);
    } catch (error) {
        console.error("Path courses error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// Update all sortOrders
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { session, role, error: authError } = await requireAdminAPI();
        if (authError) return authError;
        const { id } = await params;
        const json = await req.json();

        // Array of { id, sortOrder }
        const { updates } = json;
        if (!updates || !Array.isArray(updates)) {
            return new NextResponse("Invalid updates payload", { status: 400 });
        }

        // We run updates sequentially/in a transaction
        for (const update of updates) {
            await prisma.learningPathCourse.updateMany({
                where: { learningPathId: id, id: update.id },
                data: { sortOrder: update.sortOrder }
            });
        }

        return new NextResponse("Updated", { status: 200 });
    } catch (error) {
        console.error("Path courses error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
