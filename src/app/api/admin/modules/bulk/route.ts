import { NextResponse } from "next/server";
import { requireAdminOrInstructorAPI, requireCourseOwnershipAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bulkModuleSchema = z.object({
    courseId: z.string().min(1, "Course ID is required"),
    titles: z.array(z.string().min(1, "Title is required").max(150)).min(1, "At least one title is required"),
});

export async function POST(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const body = await req.json();
        const parsed = bulkModuleSchema.parse(body);

        const course = await prisma.course.findUnique({ where: { id: parsed.courseId } });
        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }
        const ownershipError = requireCourseOwnershipAPI(role, course.instructorId, session.user.id);
        if (ownershipError.error) return ownershipError.error;

        const maxOrderAgg = await prisma.module.aggregate({
            where: { courseId: parsed.courseId },
            _max: { sortOrder: true },
        });
        const currentMaxOrder = maxOrderAgg._max.sortOrder ?? -1;

        const results = await prisma.$transaction(
            parsed.titles.map((title, index) =>
                prisma.module.create({
                    data: {
                        courseId: parsed.courseId,
                        title,
                        sortOrder: currentMaxOrder + 1 + index,
                    },
                    // Return the empty lessons array so the frontend structure aligns immediately
                    include: { lessons: true }
                })
            )
        );

        return NextResponse.json(results, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation error", issues: error.issues }, { status: 400 });
        console.error("Bulk create module error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
