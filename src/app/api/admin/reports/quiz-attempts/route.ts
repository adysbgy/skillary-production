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
            modules: { include: { lessons: { where: { type: "QUIZ" } } } }
        }
    });

    if (!course) return new Response("Course not found", { status: 404 });

    if (role === "INSTRUCTOR" && (course as any).instructorId !== session.user.id) {
        return new Response("Forbidden", { status: 403 });
    }

    const quizLessonIds = course.modules.flatMap(m => m.lessons.map(l => l.id));

    const attempts = quizLessonIds.length > 0
        ? await prisma.quizAttempt.findMany({
            where: { lessonId: { in: quizLessonIds } },
            orderBy: { createdAt: 'desc' },
            include: {
                lesson: { select: { title: true } },
                user: { select: { name: true, email: true } }
            }
        })
        : [];

    const headers = [
        "Course Title",
        "Quiz Title",
        "Learner Name",
        "Learner Email",
        "Score",
        "Total Questions",
        "Score %",
        "Passed",
        "Attempt Date"
    ];

    const rows = attempts.map(att => {
        const scorePercent = att.totalQuestions > 0 ? Math.round((att.score / att.totalQuestions) * 100) : 0;
        return [
            course.title,
            att.lesson.title,
            att.user.name || "Unknown",
            att.user.email,
            att.score,
            att.totalQuestions,
            `${scorePercent}%`,
            att.passed ? "Yes" : "No",
            att.createdAt.toISOString().replace("T", " ").split(".")[0],
        ];
    });

    const csv = generateCSV(headers, rows);
    const filename = `Quiz_Attempts_${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`;

    return csvResponse(csv, filename);
}
