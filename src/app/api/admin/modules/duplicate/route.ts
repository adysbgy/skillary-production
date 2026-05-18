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
        const { moduleId } = body;

        if (!moduleId) {
            return new NextResponse("Module ID is required", { status: 400 });
        }

        // Fetch original module heavily
        const originalModule = await prisma.module.findUnique({
            where: { id: moduleId },
            include: {
                course: true, // Needed for permission check
                lessons: {
                    include: {
                        resources: true
                    }
                }
            }
        });

        if (!originalModule) {
            return new NextResponse("Module Not Found", { status: 404 });
        }

        // Permission check: Instructor can only duplicate inside their own course
        if (role === "INSTRUCTOR" && originalModule.course.instructorId !== userId) {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Generate unique suffix for lessons to avoid slug collisions globally
        const copySuffix = crypto.randomBytes(4).toString('hex');

        // Determine safe sortOrder (put it at the end of the course)
        const aggregate = await prisma.module.aggregate({
            where: { courseId: originalModule.courseId },
            _max: { sortOrder: true }
        });
        const nextSortOrder = (aggregate._max.sortOrder ?? -1) + 1;

        // Perform deeply nested creation
        const duplicatedModule = await prisma.module.create({
            data: {
                courseId: originalModule.courseId,
                title: `Copy of ${originalModule.title}`,
                sortOrder: nextSortOrder,
                lessons: {
                    create: originalModule.lessons.map(lesson => ({
                        title: lesson.title,
                        slug: `${lesson.slug}-copy-${copySuffix}`, // guaranteed uniqueish
                        type: lesson.type,
                        content: lesson.content,
                        videoUrl: lesson.videoUrl,
                        quizData: lesson.quizData,
                        sortOrder: lesson.sortOrder, // Retain exact internal ordering
                        resources: {
                            create: lesson.resources.map(res => ({
                                filename: res.filename,
                                url: res.url,
                                fileType: res.fileType,
                                fileSize: res.fileSize,
                                sortOrder: res.sortOrder
                            }))
                        }
                    }))
                }
            },
            // Return back the fully typed clone for the frontend state update
            include: {
                lessons: {
                    include: {
                        resources: true
                    }
                }
            }
        });

        return NextResponse.json(duplicatedModule);

    } catch (error) {
        console.error("[MODULE_DUPLICATE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
