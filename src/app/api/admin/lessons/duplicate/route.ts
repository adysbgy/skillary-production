import { NextResponse } from "next/server";
import { requireAdminOrInstructorAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(request: Request) {
    try {
        const { session, role, error: authError } = await requireAdminOrInstructorAPI();
        if (authError) return authError;
        const userId = session.user.id;

        const body = await request.json();
        const { lessonId } = body;

        if (!lessonId) {
            return new NextResponse("Lesson ID is required", { status: 400 });
        }

        // Fetch original lesson with deeply nested ownership chain and resources
        const originalLesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
            include: {
                module: {
                    include: {
                        course: true // Needed for permission check
                    }
                },
                resources: true
            }
        });

        if (!originalLesson) {
            return new NextResponse("Lesson Not Found", { status: 404 });
        }

        // Permission check: Instructor can only duplicate inside their own course
        if (role === "INSTRUCTOR" && originalLesson.module.course.instructorId !== userId) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Generate unique suffix for lesson slug to avoid collisions
        const copySuffix = crypto.randomBytes(4).toString('hex');

        // Determine safe sortOrder (put it at the end of the SAME module)
        const aggregate = await prisma.lesson.aggregate({
            where: { moduleId: originalLesson.moduleId },
            _max: { sortOrder: true }
        });
        const nextSortOrder = (aggregate._max.sortOrder ?? -1) + 1;

        // Perform creation (excluding QuizAttempts, LessonProgress completely)
        const duplicatedLesson = await prisma.lesson.create({
            data: {
                moduleId: originalLesson.moduleId, // Attach to same module safely
                title: `Copy of ${originalLesson.title}`,
                slug: `${originalLesson.slug}-copy-${copySuffix}`,
                type: originalLesson.type,
                content: originalLesson.content,
                videoUrl: originalLesson.videoUrl,
                quizData: originalLesson.quizData,
                sortOrder: nextSortOrder,
                resources: {
                    create: originalLesson.resources.map(res => ({
                        filename: res.filename,
                        url: res.url,
                        fileType: res.fileType,
                        fileSize: res.fileSize,
                        sortOrder: res.sortOrder
                    }))
                }
            },
            // Return back the fully typed clone for the frontend state update
            include: {
                resources: true
            }
        });

        return NextResponse.json(duplicatedLesson);

    } catch (error) {
        console.error("[LESSON_DUPLICATE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
