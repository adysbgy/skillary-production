import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string; courseId: string }> }) {
    try {
        const { session, role, error: authError } = await requireAdminAPI();
        if (authError) return authError;
        const { id, courseId } = await params;

        // The id param is the learning path id, courseId is the id to delete
        // Careful, we need the `id` of the LearningPathCourse itself to be safe, or just where learningPathId and courseId match
        await prisma.learningPathCourse.deleteMany({
            where: {
                learningPathId: id,
                courseId: courseId
            }
        });

        return new NextResponse("Deleted", { status: 200 });
    } catch (error) {
        console.error("Path course delete error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
