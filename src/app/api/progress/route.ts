import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasActiveEnrollment } from "@/lib/entitlements";
import { log } from "@/lib/observability/logger";
import { createRequestContext } from "@/lib/observability/request-context";

export async function POST(req: Request) {
    const context = createRequestContext(req, "/api/progress");
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { lessonId } = await req.json();
        if (!lessonId) {
            return NextResponse.json({ error: "lessonId is required." }, { status: 400 });
        }

        // Fetch lesson context first to determine course routing
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
            include: { module: { include: { course: true } } },
        });

        if (!lesson) {
            return NextResponse.json({ error: "Lesson not found." }, { status: 404 });
        }

        const courseId = lesson.module.courseId;

        // CRITICAL P0 FIX: Validate strict enrollment before mutating progress or issuing certificates
        const isEnrolled = await hasActiveEnrollment(session.user.id, courseId);
        if (!isEnrolled) {
            log.warn("entitlement.progress.denied", { ...context, reason: "ACTIVE_ENROLLMENT_REQUIRED" });
            return NextResponse.json({ error: "Must be actively enrolled in course." }, { status: 403 });
        }

        // RECONCILIATION PATCH: If lesson is a QUIZ, verify they actually passed it (if required).
        if (lesson.type === "QUIZ" && lesson.quizData) {
            let isRequired = false;
            try {
                const parsed = JSON.parse(lesson.quizData);
                if (!Array.isArray(parsed) && parsed.settings?.isRequiredToContinue) {
                    isRequired = true;
                }
            } catch { }

            if (isRequired) {
                const bestAttempt = await (prisma as any).quizAttempt.findFirst({
                    where: { userId: session.user.id, lessonId },
                    orderBy: { score: "desc" },
                });
                if (!bestAttempt || !bestAttempt.passed) {
                    log.info("entitlement.progress.quiz_blocked", { ...context, reason: "REQUIRED_QUIZ_NOT_PASSED" });
                    return NextResponse.json({ error: "Cannot complete lesson: You must pass the required quiz first." }, { status: 400 });
                }
            }
        }

        // Mark lesson as completed
        const progress = await prisma.lessonProgress.upsert({
            where: {
                userId_lessonId: {
                    userId: session.user.id,
                    lessonId,
                },
            },
            update: {
                completed: true,
                completedAt: new Date(),
            },
            create: {
                userId: session.user.id,
                lessonId,
                completed: true,
                completedAt: new Date(),
            },
        });

        const totalLessons = await prisma.lesson.count({
            where: { module: { courseId } },
        });

        const completedLessons = await prisma.lessonProgress.count({
            where: {
                userId: session.user.id,
                completed: true,
                lesson: { module: { courseId } },
            },
        });

        const courseCompleted = completedLessons >= totalLessons;
        let certificateCode: string | null = null;

        log.info("entitlement.progress.completed", { ...context });

        if (courseCompleted) {
            log.info("entitlement.course.completed", { ...context });
            await prisma.enrollment.updateMany({
                where: {
                    userId: session.user.id,
                    courseId,
                    completedAt: null,
                },
                data: { completedAt: new Date() },
            });

            // Gate certificate auto-issuance by course certificateMode
            const courseRecord = await prisma.course.findUnique({
                where: { id: courseId },
                select: { certificateMode: true }
            });
            const certMode = (courseRecord as any)?.certificateMode || "INCLUDED";

            if (certMode === "INCLUDED") {
                // Auto-issue certificate for INCLUDED courses (existing behavior)
                const existingCert = await prisma.certificate.findUnique({
                    where: { userId_courseId: { userId: session.user.id, courseId } }
                });

                if (!existingCert) {
                    const newCert = await prisma.certificate.create({
                        data: {
                            userId: session.user.id,
                            courseId,
                        }
                    });
                    certificateCode = newCert.uniqueCode;
                } else {
                    certificateCode = existingCert.uniqueCode;
                }
            }
            // PAID_DIGITAL: certificate will be issued via paid claim flow (Phase 2B)
            // DISABLED: no certificate issuance
        }

        return NextResponse.json({ ...progress, courseCompleted, certificateCode });
    } catch (error) {
        log.error("system.unhandled_error", { ...context, error, route: "/api/progress" });
        return NextResponse.json({ error: "Internal server error." }, { status: 500 });
    }
}
