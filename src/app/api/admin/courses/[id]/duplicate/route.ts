import { NextResponse } from "next/server";
import { requireAdminOrInstructorAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(
    request: Request,
    props: { params: Promise<{ id: string }> }
) {
    try {
        const { session, role, error: authError } = await requireAdminOrInstructorAPI();
        if (authError) return authError;
        const userId = session.user.id;

        const { id: courseId } = await props.params;

        // Fetch original course with deep relations
        const originalCourse = await prisma.course.findUnique({
            where: { id: courseId },
            include: {
                modules: {
                    include: {
                        lessons: {
                            include: {
                                resources: true
                            }
                        }
                    }
                }
            }
        });

        if (!originalCourse) {
            return new NextResponse("Course Not Found", { status: 404 });
        }

        // Permission check: Instructor can only duplicate their own course, UNLESS it's a blueprint TEMPLATE
        if (role === "INSTRUCTOR" && originalCourse.instructorId !== userId && originalCourse.status !== "TEMPLATE") {
            return new NextResponse("Forbidden", { status: 403 });
        }

        // Generate unique suffix to avoid slug collisions and track lineage
        const copySuffix = crypto.randomBytes(4).toString('hex');

        // Deep copy via Prisma nested create. 
        // Notice we EXCLUDE enrollments, certificates, and learningPaths.
        const duplicatedCourse = await prisma.course.create({
            data: {
                title: `Copy of ${originalCourse.title}`,
                slug: `${originalCourse.slug}-copy-${copySuffix}`,
                description: originalCourse.description,
                level: originalCourse.level,
                duration: originalCourse.duration,
                category: originalCourse.category,
                price: originalCourse.price,
                status: "DRAFT", // Strict safety override
                thumbnailUrl: originalCourse.thumbnailUrl,
                instructorId: userId, // New owner is the duper
                outcomesData: originalCourse.outcomesData,
                audienceData: originalCourse.audienceData,
                prerequisitesData: originalCourse.prerequisitesData,
                modules: {
                    create: originalCourse.modules.map(mod => ({
                        title: mod.title,
                        sortOrder: mod.sortOrder,
                        lessons: {
                            create: mod.lessons.map(lesson => ({
                                title: lesson.title,
                                slug: `${lesson.slug}-copy-${copySuffix}`,
                                type: lesson.type,
                                content: lesson.content,
                                videoUrl: lesson.videoUrl,
                                quizData: lesson.quizData,
                                sortOrder: lesson.sortOrder,
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
                    }))
                }
            }
        });

        return NextResponse.json({
            success: true,
            courseId: duplicatedCourse.id,
            slug: duplicatedCourse.slug
        });

    } catch (error) {
        console.error("[COURSE_DUPLICATE_ERROR]", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
