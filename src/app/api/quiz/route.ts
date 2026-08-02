import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { log } from "@/lib/observability/logger";
import { createRequestContext } from "@/lib/observability/request-context";
import { gradeQuiz, parseQuizData, validateQuizAnswers } from "@/lib/quiz-integrity";

// POST /api/quiz — Submit a quiz attempt
export async function POST(req: NextRequest) {
    const context = createRequestContext(req, "/api/quiz");
    const session = await auth();
    if (!session?.user?.id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }
    if (typeof body !== "object" || body === null || Array.isArray(body)) {
        return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }
    const { lessonId, answers } = body as Record<string, unknown>;
    if (typeof lessonId !== "string" || !lessonId || answers === undefined) {
        return NextResponse.json({ error: "lessonId and answers are required." }, { status: 400 });
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

    const quiz = parseQuizData(lesson.quizData);
    if (quiz.questions.length === 0) {
        return NextResponse.json({ error: "Quiz has no configured questions." }, { status: 400 });
    }
    const validated = validateQuizAnswers(quiz, answers);
    if (!validated.ok) {
        return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const attemptCount = await prisma.quizAttempt.count({ where: { userId: session.user.id, lessonId } });
    if (quiz.settings.maxAttempts !== null) {
        if (attemptCount >= quiz.settings.maxAttempts) {
            log.info("entitlement.quiz.denied", { ...context, reason: "MAX_ATTEMPTS_REACHED" });
            return NextResponse.json({ error: "Maximum attempts reached." }, { status: 403 });
        }
    }

    const result = gradeQuiz(quiz, validated.answers);

    log.info("entitlement.quiz.attempted", { ...context, passed: result.passed });
    if (result.passed) log.info("entitlement.quiz.passed", { ...context });

    const attempt = await prisma.quizAttempt.create({
        data: {
            userId: session.user.id,
            lessonId,
            score: result.score,
            totalQuestions: result.totalQuestions,
            passed: result.passed,
            answers: JSON.stringify(validated.answers),
        },
    });

    return NextResponse.json({
        id: attempt.id,
        score: result.score,
        totalQuestions: result.totalQuestions,
        passed: result.passed,
        percentage: result.percentage,
        attemptsCount: attemptCount + 1,
        feedback: quiz.settings.showAnswers ? result.feedback : undefined,
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

    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: { module: true },
    });
    if (!lesson || lesson.type !== "QUIZ") {
        return NextResponse.json({ error: "Invalid quiz lesson." }, { status: 400 });
    }

    const { hasActiveEnrollment } = await import("@/lib/entitlements");
    const isEnrolled = await hasActiveEnrollment(session.user.id, lesson.module.courseId);
    if (!isEnrolled) {
        return NextResponse.json({ error: "Must be actively enrolled in course." }, { status: 403 });
    }

    const quiz = parseQuizData(lesson.quizData);
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

    let savedAnswers: Record<string, unknown> = {};
    try {
        const parsedAnswers: unknown = bestAttempt.answers ? JSON.parse(bestAttempt.answers) : {};
        if (typeof parsedAnswers === "object" && parsedAnswers !== null && !Array.isArray(parsedAnswers)) {
            savedAnswers = parsedAnswers as Record<string, unknown>;
        }
    } catch { }
    const result = gradeQuiz(quiz, savedAnswers);

    return NextResponse.json({
        count: attemptsCount,
        attempt: {
            id: bestAttempt.id,
            score: bestAttempt.score,
            totalQuestions: bestAttempt.totalQuestions,
            passed: bestAttempt.passed,
            percentage: bestAttempt.totalQuestions > 0 ? Math.round((bestAttempt.score / bestAttempt.totalQuestions) * 100) : 0,
            createdAt: bestAttempt.createdAt,
            answers: savedAnswers,
        },
        feedback: quiz.settings.showAnswers ? result.feedback : undefined,
    });
}
