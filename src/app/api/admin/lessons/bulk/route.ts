import { NextResponse } from "next/server";
import { requireAdminOrInstructorAPI, requireCourseOwnershipAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const bulkLessonSchema = z.object({
    moduleId: z.string().min(1, "Module ID is required"),
    titles: z.array(z.string().min(1, "Title is required").max(150)).min(1, "At least one title is required"),
    type: z.enum(["TEXT", "VIDEO", "QUIZ"]).optional(),
});

function generateSlug(title: string) {
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    return `${baseSlug}-${randomSuffix}`;
}

export async function POST(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const body = await req.json();
        const parsed = bulkLessonSchema.parse(body);

        const mod = await prisma.module.findUnique({ where: { id: parsed.moduleId }, include: { course: true } });
        if (!mod) {
            return NextResponse.json({ error: "Module not found" }, { status: 404 });
        }
        const ownershipError = requireCourseOwnershipAPI(role, mod.course.instructorId, session.user.id);
        if (ownershipError.error) return ownershipError.error;

        const maxOrderAgg = await prisma.lesson.aggregate({
            where: { moduleId: parsed.moduleId },
            _max: { sortOrder: true },
        });
        const currentMaxOrder = maxOrderAgg._max.sortOrder ?? -1;

        const results = await prisma.$transaction(
            parsed.titles.map((title, index) =>
                prisma.lesson.create({
                    data: {
                        moduleId: parsed.moduleId,
                        title,
                        slug: generateSlug(title),
                        type: parsed.type || "TEXT",
                        content: "",
                        sortOrder: currentMaxOrder + 1 + index,
                    }
                })
            )
        );

        return NextResponse.json(results, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation error", issues: error.issues }, { status: 400 });
        console.error("Bulk create lesson error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
