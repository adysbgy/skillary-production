import { NextResponse } from "next/server";
import { requireAdminOrInstructorAPI, requireCourseOwnershipAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { normalizeVideoUrl, isValidVideoDomain, ALLOWED_VIDEO_DOMAINS } from "@/lib/video";

const lessonSchema = z.object({
    moduleId: z.string().min(1, "Module ID is required"),
    title: z.string().min(1, "Title is required").max(150),
    type: z.enum(["TEXT", "VIDEO", "QUIZ"]).optional(),
    content: z.string().optional(),
    videoUrl: z.string().url().optional().or(z.literal("")),
});

const lessonUpdateSchema = z.object({
    title: z.string().min(1).max(150),
    type: z.enum(["TEXT", "VIDEO", "QUIZ"]),
    content: z.string(),
    videoUrl: z.string().url().or(z.literal("")).nullable(),
    quizData: z.string().nullable(),
}).partial();

function generateSlug(title: string) {
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    return `${baseSlug}-${randomSuffix}`;
}

async function verifyLessonOwnership(lessonId: string, userId: string, role: string) {
    if (role === "ADMIN") return true;
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: { module: { include: { course: true } } }
    });
    return lesson?.module.course.instructorId === userId;
}

export async function POST(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const body = await req.json();
        const parsed = lessonSchema.parse(body);

        const mod = await prisma.module.findUnique({ where: { id: parsed.moduleId }, include: { course: true } });
        const ownershipError = requireCourseOwnershipAPI(role, mod?.course.instructorId, session.user.id);
        if (ownershipError.error) return ownershipError.error;

        let finalVideoUrl = parsed.videoUrl || null;
        if (finalVideoUrl) {
            finalVideoUrl = normalizeVideoUrl(finalVideoUrl);
            if (!finalVideoUrl || !isValidVideoDomain(finalVideoUrl)) {
                return NextResponse.json({ error: `Invalid video domain. Allowed: ${ALLOWED_VIDEO_DOMAINS.join(", ")}` }, { status: 400 });
            }
        }

        const maxOrder = await prisma.lesson.aggregate({
            where: { moduleId: parsed.moduleId },
            _max: { sortOrder: true },
        });

        const lesson = await prisma.lesson.create({
            data: {
                moduleId: parsed.moduleId,
                title: parsed.title,
                slug: generateSlug(parsed.title),
                type: parsed.type || "TEXT",
                content: parsed.content || "",
                videoUrl: finalVideoUrl,
                sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
            },
        });

        return NextResponse.json(lesson, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation error", issues: error.issues }, { status: 400 });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const body = await req.json();
        const { id, ...updateData } = body;
        if (!id) return NextResponse.json({ error: "Lesson ID is required" }, { status: 400 });

        const isOwner = await verifyLessonOwnership(id, session.user.id, role);
        if (!isOwner) return NextResponse.json({ error: "Unauthorized: You do not own this course" }, { status: 403 });

        const parsed = lessonUpdateSchema.parse(updateData);

        let finalVideoUrl = parsed.videoUrl !== undefined ? parsed.videoUrl : undefined;
        if (finalVideoUrl) {
            finalVideoUrl = normalizeVideoUrl(finalVideoUrl);
            if (!finalVideoUrl || !isValidVideoDomain(finalVideoUrl)) {
                return NextResponse.json({ error: `Invalid video domain. Allowed: ${ALLOWED_VIDEO_DOMAINS.join(", ")}` }, { status: 400 });
            }
        }

        const lesson = await prisma.lesson.update({
            where: { id },
            data: {
                ...parsed,
                videoUrl: finalVideoUrl
            },
        });

        return NextResponse.json(lesson);
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation error", issues: error.issues }, { status: 400 });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const { id } = await req.json();
        if (!id) return NextResponse.json({ error: "Lesson ID is required" }, { status: 400 });

        const isOwner = await verifyLessonOwnership(id, session.user.id, role);
        if (!isOwner) return NextResponse.json({ error: "Unauthorized: You do not own this course" }, { status: 403 });

        const progressCount = await prisma.lessonProgress.count({ where: { lessonId: id } });
        if (progressCount > 0) {
            return NextResponse.json({
                error: `Safety Block: Cannot delete lesson. ${progressCount} learner(s) have recorded progress here. Removing this node would corrupt their historical tracking.`
            }, { status: 400 });
        }

        const lesson = await prisma.lesson.findUnique({
            where: { id },
            include: { module: { include: { course: true } } }
        });
        if (lesson?.module.course.status === "PUBLISHED") {
            const courseLessonsCount = await prisma.lesson.count({
                where: { module: { courseId: lesson.module.course.id } }
            });
            if (courseLessonsCount <= 1) {
                return NextResponse.json({
                    error: "Safety Block: Cannot delete the last lesson of a PUBLISHED course. Unpublish the course first or add another lesson."
                }, { status: 400 });
            }
        }

        await prisma.lesson.delete({ where: { id } });
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

const reorderSchema = z.array(z.object({
    id: z.string().min(1),
    sortOrder: z.number(),
}));

export async function PATCH(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const body = await req.json();
        const parsed = reorderSchema.parse(body);

        if (parsed.length > 0 && role === "INSTRUCTOR") {
            const first = await prisma.lesson.findUnique({ where: { id: parsed[0].id }, include: { module: { include: { course: true } } } });
            const ownershipError = requireCourseOwnershipAPI(role, first?.module.course.instructorId, session.user.id, "Unauthorized");
            if (ownershipError.error) return ownershipError.error;
        }

        await prisma.$transaction(
            parsed.map(item =>
                prisma.lesson.update({
                    where: { id: item.id },
                    data: { sortOrder: item.sortOrder }
                })
            )
        );

        return NextResponse.json({ ok: true });
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation error", issues: error.issues }, { status: 400 });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
