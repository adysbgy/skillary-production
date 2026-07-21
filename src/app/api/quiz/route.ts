import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { log } from "@/lib/observability/logger";
import { createRequestContext } from "@/lib/observability/request-context";

// POST /api/quiz — Submit a quiz attempt
export async function POST(req: NextRequest) {
    const context = createRequestContext(req, "/api/quiz");
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { lessonId, answers, score, totalQuestions } = await req.json();

    if (!lessonId || answers === undefined || score === undefined || totalQuestions === undefined) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Verify lesson exists, is a QUIZ type, and fetch its courseId
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: { module: { include: { course: true } } },
    });

    if (!lesson || lesson.type !== "QUIZ") {
        return NextResponse.json({ error: "Invalid quiz lesson" }, { status: 400 });
    }

    const courseId = lesson.module.courseId;

    // CRITICAL P0 FIX: Strict validate enrollment before allowing quiz attempts
    const { hasActiveEnrollment } = await import("@/lib/entitlements");
    const isEnrolled = await hasActiveEnrollment(session.user.id, courseId);
    if (!isEnrolled) {
        log.warn("entitlement.quiz.denied", { ...context, reason: "ACTIVE_ENROLLMENT_REQUIRED" });
        return NextResponse.json({ error: "Must be actively enrolled in course." }, { status: 403 });
    }

    // Extract Assessment Foundations Settings
    let maxAttempts: number | null = null;
    let passingScoreThreshold = 70; // Legacy default

    if (lesson.quizData) {
        let parsed: any;
        try { parsed = JSON.parse(lesson.quizData); } catch { parsed = []; }
        if (!Array.isArray(parsed) && parsed.settings) {
            maxAttempts = parsed.settings.maxAttempts || null;
            passingScoreThreshold = parsed.settings.passingScore || 80;
        }
    }

    if (maxAttempts !== null) {
        const attemptCount = await prisma.quizAttempt.count({ where: { userId: session.user.id, lessonId } });
        if (attemptCount >= maxAttempts) {
            log.info("entitlement.quiz.denied", { ...context, reason: "MAX_ATTEMPTS_REACHED" });
            return NextResponse.json({ error: "Maximum attempts reached." }, { status: 403 });
        }
    }

    // Determine pass/fail based on dynamic threshold (e.g. 80%)
    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
    const passed = percentage >= passingScoreThreshold;

    log.info("entitlement.quiz.attempted", { ...context, passed });
    if (passed) log.info("entitlement.quiz.passed", { ...context });

    const attempt = await prisma.quizAttempt.create({
        data: {
            userId: session.user.id,
            lessonId,
            score,
            totalQuestions,
            passed,
            answers: JSON.stringify(answers),
        },
    });

    return NextResponse.json({
        id: attempt.id,
        score,
        totalQuestions,
        passed,
        percentage: Math.round(percentage),
    });
}

// GET /api/quiz?lessonId=xxx — Get user's best attempt for a lesson
export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const lessonId = req.nextUrl.searchParams.get("lessonId");
    if (!lessonId) {
        return NextResponse.json({ error: "lessonId required" }, { status: 400 });
    }

    const bestAttempt = await prisma.quizAttempt.findFirst({
        where: { userId: session.user.id, lessonId },
        orderBy: { score: "desc" },
    });

    const attemptsCount = await prisma.quizAttempt.count({
        where: { userId: session.user.id, lessonId }
    });

    if (!bestAttempt) {
        return NextResponse.json({ attempt: null, count: attemptsCount });
    }

    return NextResponse.json({
        count: attemptsCount,
        attempt: {
            id: bestAttempt.id,
            score: bestAttempt.score,
            totalQuestions: bestAttempt.totalQuestions,
            passed: bestAttempt.passed,
            percentage: bestAttempt.totalQuestions > 0 ? Math.round((bestAttempt.score / bestAttempt.totalQuestions) * 100) : 0,
            createdAt: bestAttempt.createdAt,
        },
    });
}
