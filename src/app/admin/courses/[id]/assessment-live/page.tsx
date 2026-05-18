import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import LiveAssessmentTable from "./LiveAssessmentTable";

export const dynamic = "force-dynamic";

export default async function LiveAssessmentPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ lessonId?: string }>
}) {
    const { id } = await params;
    const { lessonId } = await searchParams;
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        redirect("/dashboard");
    }

    const course = await prisma.course.findUnique({
        where: { id },
        include: {
            modules: {
                orderBy: { sortOrder: "asc" },
                include: { lessons: { orderBy: { sortOrder: "asc" }, where: { type: "QUIZ" } } }
            },
            enrollments: {
                where: { revokedAt: null },
                include: { user: { select: { id: true, name: true, email: true } } }
            }
        }
    });

    if (!course) redirect("/admin");

    if (role === "INSTRUCTOR" && (course as any).instructorId !== session.user.id) {
        redirect("/admin");
    }

    const quizLessons = course.modules.flatMap(m => m.lessons);
    if (quizLessons.length === 0) {
        return (
            <div className="max-w-6xl mx-auto space-y-10">
                <h1 className="text-3xl font-semibold tracking-tight">{course.title}</h1>
                <Card className="p-12 text-center text-black/40">No quizzes configured in this course.</Card>
            </div>
        );
    }

    const targetLessonId = lessonId || quizLessons[0].id;
    const targetLesson = quizLessons.find(l => l.id === targetLessonId) || quizLessons[0];

    // Safely parse maxAttempts
    let maxAttempts: number | "Unlimited" = "Unlimited";
    if (targetLesson.quizData) {
        try {
            const data = typeof targetLesson.quizData === "string" ? JSON.parse(targetLesson.quizData) : targetLesson.quizData;
            // Only accept positive numbers as valid limits
            if (typeof data?.settings?.maxAttempts === 'number' && data.settings.maxAttempts > 0) {
                maxAttempts = data.settings.maxAttempts;
            }
        } catch (e) {
            // Ignore parse errors
        }
    }

    const attempts = await prisma.quizAttempt.findMany({
        where: { lessonId: targetLesson.id },
        orderBy: { createdAt: "desc" }
    });

    const learners = course.enrollments.map(e => {
        const userAttempts = attempts.filter(a => a.userId === e.user.id);
        const passedAttempt = userAttempts.find(a => a.passed);

        const attemptsUsed = userAttempts.length;
        const bestScore = userAttempts.length > 0
            ? Math.max(...userAttempts.map(a => a.totalQuestions > 0 ? Math.round((a.score / a.totalQuestions) * 100) : 0))
            : null;

        let status: "Not Submitted" | "Passed" | "Failed" | "Exhausted" = "Not Submitted";

        if (attemptsUsed > 0) {
            if (passedAttempt) {
                status = "Passed";
            } else if (maxAttempts !== "Unlimited" && attemptsUsed >= maxAttempts) {
                status = "Exhausted";
            } else {
                status = "Failed";
            }
        }

        const latestSubmittedAt = userAttempts.length > 0
            ? userAttempts[0].createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + " " + userAttempts[0].createdAt.toLocaleDateString()
            : null;

        return {
            id: e.user.id,
            name: e.user.name || "",
            email: e.user.email || "",
            source: e.source,
            status,
            attemptsUsed,
            maxAttempts,
            bestScore,
            latestSubmittedAt
        };
    });

    // KPI Calc
    const totalEnrolled = learners.length;
    const notSubmitted = learners.filter(l => l.status === "Not Submitted").length;
    const passed = learners.filter(l => l.status === "Passed").length;
    const failed = learners.filter(l => l.status === "Failed").length;
    const exhausted = learners.filter(l => l.status === "Exhausted").length;

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Link href="/admin" className="text-xs uppercase font-bold tracking-wider text-black/40 hover:text-black transition-colors">← Overview</Link>
                        <span className="text-black/20 text-xs">·</span>
                        <Link href={`/admin/courses/${course.id}/analytics`} className="text-xs uppercase font-bold tracking-wider text-black/40 hover:text-black transition-colors">Course Analytics</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-3xl font-semibold tracking-[-0.02em]">{course.title}</h1>
                        <span className="bg-[rgb(255,90,95)]/10 text-[rgb(255,90,95)] border border-[rgb(255,90,95)]/20 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-current animate-pulse" /> Live Monitor</span>
                    </div>
                    <p className="text-sm text-black/55 mt-2 max-w-xl">Monitor class progression through targeted assessment modules. Safe real-time visualization.</p>
                </div>

                <div className="flex items-center gap-3">
                    <a href={`/api/admin/reports/quiz-attempts?courseId=${course.id}`} target="_blank" className="text-[11px] font-bold tracking-wider uppercase px-4 py-2 bg-white border border-black/10 rounded-xl hover:bg-black/5 transition shadow-sm">
                        Export Course Quiz Attempts
                    </a>
                </div>
            </div>

            <div className="bg-[#FFFDF9] border border-black/10 rounded-2xl p-4 flex flex-col md:flex-row gap-6 md:items-center justify-between shadow-sm">
                <div className="flex-1 w-full max-w-sm">
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-black/40 mb-1.5">Target Assessment</label>
                    <form className="relative">
                        <select
                            name="lessonId"
                            defaultValue={targetLesson.id}
                            onChange={(e) => e.target.form?.submit()}
                            className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-sm font-medium focus:border-black/30 focus:outline-none appearance-none bg-white shadow-sm"
                        >
                            {course.modules.map(m => (
                                <optgroup label={m.title} key={m.id}>
                                    {m.lessons.map(l => (
                                        <option value={l.id} key={l.id}>{l.title}</option>
                                    ))}
                                </optgroup>
                            ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-black/40">▼</div>
                    </form>
                </div>

                <div className="flex items-center gap-6 pr-4">
                    <div>
                        <p className="text-[10px] font-bold tracking-wider uppercase text-black/40 mb-0.5">Attempt Limit</p>
                        <p className="text-sm font-semibold">{maxAttempts}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                <Card className="p-4 bg-gradient-to-b from-white to-[#FFFDF9] border-black/5">
                    <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider mb-1">Participants</p>
                    <p className="text-2xl font-extrabold tracking-tight">{totalEnrolled}</p>
                </Card>
                <Card className="p-4 bg-gradient-to-b from-white to-[#FFFDF9] border-black/5">
                    <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider mb-1">Not Submitted</p>
                    <p className="text-2xl font-extrabold tracking-tight text-black/60">{notSubmitted}</p>
                </Card>
                <Card className="p-4 bg-gradient-to-b from-[#F2FBF5] to-white border-green-200 shadow-sm shadow-green-500/5">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <p className="text-[10px] uppercase font-bold text-green-700 tracking-wider">Passed</p>
                    </div>
                    <p className="text-2xl font-extrabold tracking-tight text-green-700">{passed}</p>
                </Card>
                <Card className="p-4 bg-gradient-to-b from-red-50/60 to-white border-red-200/60 shadow-sm shadow-red-500/5">
                    <p className="text-[10px] uppercase font-bold text-red-600 tracking-wider mb-1">Active Fails</p>
                    <p className="text-2xl font-extrabold tracking-tight text-red-600">{failed}</p>
                </Card>
                <Card className={`p-4 ${exhausted > 0 ? "bg-black/90 text-white" : "bg-gradient-to-b from-white to-[#FFFDF9] border-black/5"}`}>
                    <p className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${exhausted > 0 ? "text-white/60" : "text-black/40"}`}>Exhausted</p>
                    <p className={`text-2xl font-extrabold tracking-tight ${exhausted > 0 ? "text-white" : "text-black/50"}`}>{exhausted}</p>
                </Card>
            </div>

            <LiveAssessmentTable learners={learners} lessonId={targetLesson.id} />

            <div className="pb-10"></div>
        </div>
    );
}
