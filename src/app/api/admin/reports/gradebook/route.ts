import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateCSV, csvResponse } from "@/lib/csv";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
        return new Response("Missing courseId", { status: 400 });
    }

    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            modules: {
                include: { lessons: true }
            },
            enrollments: {
                where: { revokedAt: null },
                orderBy: { enrolledAt: "desc" },
                select: {
                    source: true,
                    enrolledAt: true,
                    completedAt: true,
                    user: { select: { id: true, name: true, email: true } }
                }
            },
            certificates: {
                include: { user: { select: { id: true } } }
            }
        }
    });

    if (!course) {
        return new Response("Course not found", { status: 404 });
    }

    if (role === "INSTRUCTOR" && (course as any).instructorId !== session.user.id) {
        return new Response("Forbidden", { status: 403 });
    }

    // Prepare data
    const allLessons = course.modules.flatMap(m => m.lessons);
    const totalLessons = allLessons.length;
    const lessonIds = allLessons.map(l => l.id);

    const allProgress = await prisma.lessonProgress.findMany({
        where: { lessonId: { in: lessonIds }, completed: true }
    });

    const quizLessonIds = allLessons.filter(l => l.type === "QUIZ").map(l => l.id);
    const quizAttempts = quizLessonIds.length > 0
        ? await prisma.quizAttempt.findMany({
            where: { lessonId: { in: quizLessonIds } },
            orderBy: { createdAt: 'desc' }
        })
        : [];

    const certUserIds = new Set(course.certificates.map(c => c.user.id));

    // Headers
    const headers = [
        "Course Title",
        "Learner Name",
        "Learner Email",
        "Enrollment Source",
        "Enrollment Date",
        "Status",
        "Progress %",
        "Lessons Completed",
        "Total Lessons",
        "Quiz Status",
        "Avg Quiz Score",
        "Total Attempts",
        "Certificate Earned"
    ];

    // Compute rows
    const rows = course.enrollments.map(e => {
        const completedIds = allProgress.filter(p => p.userId === e.user.id).map(p => p.lessonId);
        const progressPercent = totalLessons > 0 ? Math.round((completedIds.length / totalLessons) * 100) : 0;

        const status = e.completedAt ? "Completed" : (completedIds.length > 0 ? "In Progress" : "Not Started");
        const hasCert = certUserIds.has(e.user.id);

        const userAttempts = quizAttempts.filter(q => q.userId === e.user.id);
        const userQuizzesTakenIds = new Set(userAttempts.map(q => q.lessonId));

        let failedAny = false;
        let avgScore: number | null = null;
        let totalScore = 0;

        for (const qid of userQuizzesTakenIds) {
            const latest = userAttempts.find(q => q.lessonId === qid);
            if (latest && !latest.passed) failedAny = true;
        }

        if (userAttempts.length > 0) {
            for (const att of userAttempts) {
                if (att.totalQuestions > 0) totalScore += (att.score / att.totalQuestions) * 100;
            }
            avgScore = Math.round(totalScore / userAttempts.length);
        }

        const quizStatus = userQuizzesTakenIds.size === 0 ? "Not Started" : (failedAny ? "Failed" : "Passed");

        return [
            course.title,
            e.user.name || "Unknown",
            e.user.email,
            e.source,
            e.enrolledAt.toISOString().split("T")[0],
            status,
            progressPercent,
            completedIds.length,
            totalLessons,
            quizStatus,
            avgScore !== null ? `${avgScore}%` : "N/A",
            userAttempts.length,
            hasCert ? "Yes" : "No"
        ];
    });

    const csv = generateCSV(headers, rows);
    const filename = `Gradebook_${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`;

    return csvResponse(csv, filename);
}
