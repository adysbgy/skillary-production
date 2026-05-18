import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import ResetQuizAttempts from "./ResetQuizAttempts";

export const dynamic = "force-dynamic";

export default async function CourseAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
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
                include: {
                    lessons: { orderBy: { sortOrder: "asc" } }
                }
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
            },
        },
    });

    if (!course) redirect("/admin");

    // Instructor scope check
    if (role === "INSTRUCTOR" && (course as any).instructorId !== session.user.id) {
        redirect("/admin");
    }

    // ── Flatten all lesson IDs ──
    const allLessons = course.modules.flatMap(m => m.lessons);
    const totalLessons = allLessons.length;
    const lessonIds = allLessons.map(l => l.id);

    // ── Fetch all progress for this course's lessons ──
    const allProgress = await prisma.lessonProgress.findMany({
        where: { lessonId: { in: lessonIds }, completed: true },
    });

    // ── Fetch quiz attempts for quiz avg ──
    const quizLessonIds = allLessons.filter(l => l.type === "QUIZ").map(l => l.id);
    const quizAttempts = quizLessonIds.length > 0
        ? await prisma.quizAttempt.findMany({
            where: { lessonId: { in: quizLessonIds } },
            orderBy: { createdAt: 'desc' } // Descending helps grab the latest attempt
        })
        : [];

    // ── Certificate lookup ──
    const certUserIds = new Set(course.certificates.map(c => c.user.id));

    // ── Per-learner stats ──
    const learners = course.enrollments.map(e => {
        const completedIds = allProgress.filter(p => p.userId === e.user.id).map(p => p.lessonId);
        const progressPercent = totalLessons > 0 ? Math.round((completedIds.length / totalLessons) * 100) : 0;
        const hasCert = certUserIds.has(e.user.id);
        const status: "Completed" | "In Progress" | "Not Started" =
            e.completedAt ? "Completed"
                : completedIds.length > 0 ? "In Progress"
                    : "Not Started";

        // Quiz tracing
        const userAttempts = quizAttempts.filter(q => q.userId === e.user.id);
        const userQuizzesTakenIds = new Set(userAttempts.map(q => q.lessonId));
        let failedAny = false;
        let avgScore = 0;
        let totalScore = 0;

        // Check if the latest attempt on any quiz is a fail
        for (const qid of userQuizzesTakenIds) {
            const latest = userAttempts.find(q => q.lessonId === qid);
            if (latest && !latest.passed) failedAny = true;
        }

        if (userAttempts.length > 0) {
            for (const att of userAttempts) {
                if (att.totalQuestions > 0) {
                    totalScore += (att.score / att.totalQuestions) * 100;
                }
            }
            avgScore = Math.round(totalScore / userAttempts.length);
        }

        // Broad quiz status for the gradebook
        const quizStatus = userQuizzesTakenIds.size === 0 ? "Not Started" : (failedAny ? "Failed" : "Passed");

        return {
            id: e.user.id,
            name: e.user.name,
            email: e.user.email,
            source: e.source,
            enrolledAt: e.enrolledAt,
            completedAt: e.completedAt,
            lessonsCompleted: completedIds.length,
            progressPercent,
            status,
            hasCert,
            quizStatus,
            quizAvg: userAttempts.length > 0 ? avgScore : null,
            totalAttempts: userAttempts.length
        };
    });

    // ── Summary stats ──
    const totalEnrolled = learners.length;
    const completedCount = learners.filter(l => l.status === "Completed").length;
    const learnersStarted = learners.filter(l => l.status === "In Progress" || l.status === "Completed").length;
    const avgProgress = totalEnrolled > 0 ? Math.round(learners.reduce((acc, l) => acc + l.progressPercent, 0) / totalEnrolled) : 0;
    const completionRate = totalEnrolled > 0 ? Math.round((completedCount / totalEnrolled) * 100) : 0;
    const certificatesCount = course.certificates.length;

    const quizAvg = quizAttempts.length > 0
        ? Math.round(quizAttempts.reduce((acc, q) => acc + (q.totalQuestions > 0 ? q.score / q.totalQuestions : 0), 0) / quizAttempts.length * 100)
        : null;

    // ── Compute Learners Needing Attention ──
    // Any learner whose latest attempt on at least one quiz is Failed.
    const learnersNeedingAttention = learners.filter(l => l.quizStatus === "Failed");

    const quizLessons = course.modules.flatMap(m =>
        m.lessons.filter(l => l.type === "QUIZ").map(l => ({
            id: l.id,
            title: l.title,
            moduleTitle: m.title
        }))
    );

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            {/* Header */}
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <Link href="/admin" className="text-xs uppercase font-bold tracking-wider text-black/40 hover:text-black transition-colors">← Overview</Link>
                    <span className="text-black/20 text-xs">·</span>
                    <Link href={`/admin/courses/${id}/edit`} className="text-xs uppercase font-bold tracking-wider text-black/40 hover:text-black transition-colors">Edit Course</Link>
                </div>
                <h1 className="text-3xl font-semibold tracking-[-0.02em]">{course.title}</h1>
                <p className="text-sm text-black/55 mt-1">Course health, quiz performance, and learner gradebook.</p>
            </div>

            {/* ── Course Health KPIs ── */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                <Card className="p-4 bg-gradient-to-b from-white to-[#FFFdf9] border-black/5">
                    <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider mb-1">Enrolled</p>
                    <p className="text-2xl font-extrabold tracking-tight">{totalEnrolled}</p>
                </Card>
                <Card className="p-4 bg-gradient-to-b from-white to-[#FFFdf9] border-black/5">
                    <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider mb-1">Started</p>
                    <p className="text-2xl font-extrabold tracking-tight text-blue-600">{learnersStarted}</p>
                </Card>
                <Card className="p-4 bg-gradient-to-b from-white to-[#FFFdf9] border-black/5">
                    <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider mb-1">Avg Progress</p>
                    <p className="text-2xl font-extrabold tracking-tight text-[rgb(255,90,95)]">{avgProgress}%</p>
                </Card>
                <Card className="p-4 bg-gradient-to-b from-white to-[#FFFdf9] border-black/5">
                    <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider mb-1">Completion</p>
                    <p className="text-2xl font-extrabold tracking-tight text-green-600">{completionRate}%</p>
                </Card>
                <Card className="p-4 bg-gradient-to-b from-white to-[#FFFdf9] border-black/5">
                    <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider mb-1">Certificates</p>
                    <p className="text-2xl font-extrabold tracking-tight text-[rgb(255,138,0)]">{certificatesCount}</p>
                </Card>
                <Card className="p-4 bg-[#FFF8EC] border-[rgb(255,138,0)]/20">
                    <p className="text-[10px] uppercase font-bold text-[#D48924] tracking-wider mb-1">Quiz Avg</p>
                    <p className="text-2xl font-extrabold tracking-tight text-[#D48924]">{quizAvg !== null ? `${quizAvg}%` : "—"}</p>
                </Card>
                <Card className={`p-4 ${learnersNeedingAttention.length > 0 ? "bg-red-50/60 border-red-200/60" : "bg-gradient-to-b from-white to-[#FFFdf9] border-black/5"}`}>
                    <p className={`text-[10px] uppercase font-bold tracking-wider mb-1 ${learnersNeedingAttention.length > 0 ? "text-red-600" : "text-black/40"}`}>Recent Quiz Fails</p>
                    <p className={`text-2xl font-extrabold tracking-tight ${learnersNeedingAttention.length > 0 ? "text-red-600" : "text-black"}`}>{learnersNeedingAttention.length}</p>
                </Card>
            </div>

            {/* ── SPLIT VIEW: LEARNERS NEEDING ATTENTION & QUIZ SUMMARY ── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Learners Needing Attention */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold tracking-tight">Learners Needing Attention</h2>
                    {learnersNeedingAttention.length > 0 ? (
                        <Card className="p-0 border-black/5 overflow-hidden">
                            <div className="divide-y divide-black/5 bg-white">
                                {learnersNeedingAttention.map(l => (
                                    <div key={`attention-${l.id}`} className="px-4 py-3 flex items-start gap-3 hover:bg-black/[0.01]">
                                        <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5 shrink-0" />
                                        <div>
                                            <p className="font-semibold text-sm text-black/90">{l.name || "Unknown Learner"}</p>
                                            <p className="text-xs text-black/50 mb-1">{l.email}</p>
                                            <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 uppercase tracking-wider">
                                                Failed Quiz Attempt
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ) : (
                        <Card className="p-8 text-center border-dashed border-black/10 bg-[#FFFDF9] h-[150px] flex flex-col justify-center">
                            <h3 className="text-sm font-semibold tracking-tight">All clear</h3>
                            <p className="text-xs text-black/40 mt-1 max-w-sm mx-auto">No enrolled learners are currently stuck on a failed quiz.</p>
                        </Card>
                    )}
                </div>

                {/* Quiz Performance Summary */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold tracking-tight">Quiz Performance Summary</h2>
                    {quizLessons.length > 0 ? (
                        <Card className="p-0 border-black/5 overflow-hidden">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-black/5 bg-black/5">
                                        <th className="px-4 py-2 font-medium text-black/60 w-1/2">Quiz</th>
                                        <th className="px-4 py-2 font-medium text-black/60 text-right">Attempt Pass Rate</th>
                                        <th className="px-4 py-2 font-medium text-black/60 text-right">Avg Score</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5 bg-white">
                                    {quizLessons.map(ql => {
                                        const qAttempts = quizAttempts.filter(q => q.lessonId === ql.id);
                                        const passed = qAttempts.filter(q => q.passed).length;
                                        const passRate = qAttempts.length > 0 ? Math.round((passed / qAttempts.length) * 100) : null;

                                        let qAvg = null;
                                        if (qAttempts.length > 0) {
                                            const total = qAttempts.reduce((acc, att) => acc + (att.totalQuestions > 0 ? (att.score / att.totalQuestions) * 100 : 0), 0);
                                            qAvg = Math.round(total / qAttempts.length);
                                        }

                                        return (
                                            <tr key={ql.id} className="hover:bg-black/[0.02]">
                                                <td className="px-4 py-3">
                                                    <div className="font-semibold text-black/90 truncate max-w-[200px]" title={ql.title}>{ql.title}</div>
                                                    <div className="text-[10px] text-black/45 mt-0.5">{qAttempts.length} total attempts</div>
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    {passRate !== null ? (
                                                        <span className={`font-semibold ${passRate >= 70 ? 'text-green-600' : 'text-red-600'}`}>{passRate}%</span>
                                                    ) : <span className="text-black/30">—</span>}
                                                </td>
                                                <td className="px-4 py-3 text-right">
                                                    {qAvg !== null ? (
                                                        <span className="font-semibold text-[#D48924]">{qAvg}%</span>
                                                    ) : <span className="text-black/30">—</span>}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </Card>
                    ) : (
                        <Card className="p-8 text-center border-dashed border-black/10 bg-[#FFFDF9] h-[150px] flex flex-col justify-center">
                            <p className="text-xs font-medium text-black/40">No quizzes mapped in this course.</p>
                        </Card>
                    )}
                </div>
            </div>

            {/* ── LEARNER GRADEBOOK ── */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold tracking-tight">Learner Gradebook</h2>
                {learners.length === 0 ? (
                    <Card className="p-12 text-center border-dashed border-black/10">
                        <p className="text-black/50 text-sm">No learners enrolled in this course yet.</p>
                    </Card>
                ) : (
                    <Card className="overflow-hidden overflow-x-auto border-black/5 p-0">
                        <table className="w-full text-sm min-w-[800px]">
                            <thead>
                                <tr className="border-b border-black/5 bg-[#FFFDF9]">
                                    <th className="px-5 py-3 text-left font-medium text-black/60">Learner</th>
                                    <th className="px-5 py-3 text-left font-medium text-black/60">Source</th>
                                    <th className="px-5 py-3 text-left font-medium text-black/60">Progress</th>
                                    <th className="px-5 py-3 text-left font-medium text-black/60">Quizzes</th>
                                    <th className="px-5 py-3 text-left font-medium text-black/60">Certificate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {learners.map(l => (
                                    <tr key={l.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.01] transition-colors">
                                        <td className="px-5 py-4">
                                            <p className="font-semibold text-black/90">{l.name || "—"}</p>
                                            <p className="text-xs text-black/45 mt-0.5">{l.email}</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${l.source === "PAID" ? "bg-blue-50 text-blue-600" :
                                                l.source === "MANUAL" ? "bg-violet-50 text-violet-600" :
                                                    "bg-[rgb(255,138,0)]/20 text-[#D48924]"
                                                }`}>
                                                {l.source}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 min-w-[200px]">
                                            <div className="flex items-center gap-3">
                                                <div className="w-24 h-1.5 rounded-full bg-black/5 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full transition-all ${l.status === "Completed" ? "bg-green-500" : "bg-[rgb(255,138,0)]"}`}
                                                        style={{ width: `${l.progressPercent}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold text-black/70">{l.progressPercent}%</span>
                                            </div>
                                            <p className="text-[10px] text-black/40 mt-1">{l.lessonsCompleted} / {totalLessons} lessons</p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider ${l.quizStatus === "Passed" ? "text-green-600" :
                                                    l.quizStatus === "Failed" ? "text-red-600" :
                                                        "text-black/30"
                                                    }`}>
                                                    {l.quizStatus}
                                                </span>
                                            </div>
                                            {l.quizAvg !== null && (
                                                <p className="text-[10px] text-black/50 mt-1">Avg Score: <span className="font-semibold">{l.quizAvg}%</span></p>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            {l.hasCert ? (
                                                <span className="flex items-center gap-1.5 text-xs font-semibold text-[#D48924] bg-[#FFF8EC] px-2 py-1 rounded w-max">
                                                    <span>🎓</span> Earned
                                                </span>
                                            ) : (
                                                <span className="text-xs text-black/30 font-medium">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                )}
            </div>

            {/* Support Tools */}
            <div className="pt-8 grid lg:grid-cols-2 gap-6">
                <div>
                    <Card className="p-5 border-black/5 h-full">
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold mb-1 tracking-tight">Export Center</h3>
                            <p className="text-xs text-black/50">Download offline spreadsheets for detailed reporting.</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <a href={`/api/admin/reports/gradebook?courseId=${id}`} target="_blank" className="text-xs font-semibold px-4 py-2 rounded-lg border border-black/10 hover:bg-black/[0.02] transition shadow-sm bg-white">Gradebook CSV</a>
                            <a href={`/api/admin/reports/quiz-attempts?courseId=${id}`} target="_blank" className="text-xs font-semibold px-4 py-2 rounded-lg border border-black/10 hover:bg-black/[0.02] transition shadow-sm bg-white">Quiz Attempts CSV</a>
                            <a href={`/api/admin/reports/certificates?courseId=${id}`} target="_blank" className="text-xs font-semibold px-4 py-2 rounded-lg border border-black/10 hover:bg-black/[0.02] transition shadow-sm bg-white">Certificates CSV</a>
                        </div>
                    </Card>
                </div>
                {quizLessons.length > 0 && (
                    <div className="space-y-6">
                        <Card className="p-5 border-black/5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between shadow-sm">
                            <div>
                                <h3 className="text-sm font-semibold mb-1 tracking-tight flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-[rgb(255,90,95)] animate-pulse" /> Live Assessment Monitor
                                </h3>
                                <p className="text-xs text-black/50">Run in-house assessments and monitor attempts in real time.</p>
                            </div>
                            <Link href={`/admin/courses/${id}/assessment-live`} className="text-[11px] font-bold uppercase tracking-wider px-5 py-2.5 bg-black/90 text-white rounded-xl hover:bg-black transition whitespace-nowrap shadow-sm">
                                Launch Monitor
                            </Link>
                        </Card>
                        <ResetQuizAttempts quizzes={quizLessons} />
                    </div>
                )}
            </div>

            <div className="pb-8"></div>
        </div>
    );
}
