import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

export default async function PathAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session || role !== "ADMIN") redirect("/admin");

    const id = (await params).id;

    // 1. Fetch the path and its courses (ordered) + enrollments (joins)
    const path = await prisma.learningPath.findUnique({
        where: { id },
        include: {
            courses: {
                orderBy: { sortOrder: 'asc' },
                include: {
                    course: {
                        select: { id: true, title: true, slug: true, status: true }
                    }
                }
            },
            enrollments: {
                select: { userId: true, enrolledAt: true }
            }
        }
    });

    if (!path) redirect("/admin/paths");

    const isSequential = path.mode === "SEQUENTIAL";
    const totalJoined = path.enrollments.length;
    const joinedUserIds = new Set(path.enrollments.map(e => e.userId));

    // Date cutoff for Active vs Stale (60 days)
    const cutoffDateMs = Date.now() - (60 * 24 * 60 * 60 * 1000);

    // Initial latest activity seeded by when they joined the path
    const userLatestActivity = new Map<string, number>();
    path.enrollments.forEach(e => {
        userLatestActivity.set(e.userId, e.enrolledAt.getTime());
    });

    let allUserCourseCompletions = new Map<string, Set<string>>(); // UserID -> Set of completed CourseIDs
    let allUserCourseEnrollments = new Map<string, Set<string>>(); // UserID -> Set of enrolled CourseIDs

    if (joinedUserIds.size > 0 && path.courses.length > 0) {
        const pathCourseIds = path.courses.map(pc => pc.courseId);

        // Fetch ALL enrollments for these users scoped to these path courses
        // We need both enrolledAt and completedAt to accurately judge recency
        const relevantEnrollments = await prisma.enrollment.findMany({
            where: {
                userId: { in: Array.from(joinedUserIds) },
                courseId: { in: pathCourseIds }
            },
            select: { userId: true, courseId: true, enrolledAt: true, completedAt: true }
        });

        relevantEnrollments.forEach(e => {
            // Track enrollments
            if (!allUserCourseEnrollments.has(e.userId)) allUserCourseEnrollments.set(e.userId, new Set());
            allUserCourseEnrollments.get(e.userId)!.add(e.courseId);

            // Track completions
            if (e.completedAt) {
                if (!allUserCourseCompletions.has(e.userId)) allUserCourseCompletions.set(e.userId, new Set());
                allUserCourseCompletions.get(e.userId)!.add(e.courseId);
            }

            // Update latest activity timestamp
            let currentLatest = userLatestActivity.get(e.userId) || 0;
            currentLatest = Math.max(currentLatest, e.enrolledAt.getTime(), e.completedAt?.getTime() || 0);
            userLatestActivity.set(e.userId, currentLatest);
        });
    }

    // Cohort segmentation
    let totalNeverStarted = 0;
    let totalStale = 0;
    let totalActiveInsights = 0;
    let totalCompletedPath = 0;

    // Also track completions explicitly among the active cohort
    let activeCompletedPath = 0;

    const requiredCourseCount = path.courses.length;

    joinedUserIds.forEach(userId => {
        const hasStarted = allUserCourseEnrollments.get(userId)?.size ? true : false;
        const latestTime = userLatestActivity.get(userId) || 0;
        const userCompletions = allUserCourseCompletions.get(userId) || new Set();

        const hasCompletedPath = requiredCourseCount > 0 && path.courses.every(c => userCompletions.has(c.courseId));
        if (hasCompletedPath) totalCompletedPath++;

        if (!hasStarted) {
            totalNeverStarted++;
        } else if (latestTime < cutoffDateMs && !hasCompletedPath) {
            // Stale: Started something, but no activity in 60 days, and hasn't finished the path yet
            totalStale++;
        } else {
            // Active: Either joined < 60 days ago or has activity < 60 days ago, or finished the path
            totalActiveInsights++;
            if (hasCompletedPath) {
                activeCompletedPath++;
            }
        }
    });

    const completionRate = totalJoined > 0 ? Math.round((totalCompletedPath / totalJoined) * 100) : 0;
    const activeCompletionRate = totalActiveInsights > 0 ? Math.round((activeCompletedPath / totalActiveInsights) * 100) : 0;

    const funnelSteps = path.courses.map((pc, index) => {
        let courseCompletionCount = 0;
        joinedUserIds.forEach(userId => {
            if (allUserCourseCompletions.get(userId)?.has(pc.courseId)) {
                courseCompletionCount++;
            }
        });

        const stepCompletionRate = totalJoined > 0 ? Math.round((courseCompletionCount / totalJoined) * 100) : 0;

        return { ...pc, index, completionCount: courseCompletionCount, stepCompletionRate };
    });

    // 5. Friction-Step Math (SEQUENTIAL only)
    let maxDropIndex = -1;
    let maxDropValue = 0;

    if (isSequential && totalJoined >= 10 && funnelSteps.length > 1) {
        for (let i = 1; i < funnelSteps.length; i++) {
            const drop = funnelSteps[i - 1].stepCompletionRate - funnelSteps[i].stepCompletionRate;
            if (drop > maxDropValue && drop > 0) {
                maxDropValue = drop;
                maxDropIndex = i;
            }
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
                <Link href="/admin/paths" className="text-sm font-semibold text-black/40 hover:text-black mb-4 inline-block">
                    ← Back to Paths
                </Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-semibold tracking-tight">{path.title}</h1>
                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${path.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-black/10 text-black/60'}`}>
                                {path.status}
                            </span>
                        </div>
                        <p className="text-sm text-black/60">Path Analytics Overview • <span className="font-semibold text-black/80">{isSequential ? "Sequential Guidance" : "Guided / Self-Paced"}</span></p>
                    </div>
                    <div className="flex gap-3">
                        <Link href={`/admin/paths/${path.id}/edit`}>
                            <button className="px-4 py-2 border border-black/10 hover:bg-black/5 rounded-xl text-sm font-semibold transition-colors">
                                Edit Path Settings
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Engagement Cohorts Breakdown */}
            <div className="p-5 bg-black/[0.02] border border-black/5 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-sm uppercase tracking-wider text-black/60">Learner Engagement Cohorts</h3>
                    <span className="text-[10px] font-bold bg-white border border-black/5 px-2 py-1 rounded-full text-black/50">LAST 60 DAYS RECENCY</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-lg flex flex-col border border-blue-100 shadow-sm">
                        <span className="text-2xl font-bold text-blue-900">{totalActiveInsights}</span>
                        <span className="text-sm font-semibold mt-1 text-blue-800">Active Learners</span>
                        <span className="text-xs text-blue-800/60 mt-1">Joined recently or active in last 60 days</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg flex flex-col border border-black/5">
                        <span className="text-2xl font-bold text-black/70">{totalStale}</span>
                        <span className="text-sm font-semibold mt-1 text-black/60">Stale / Inactive</span>
                        <span className="text-xs text-black/40 mt-1">Started, but no activity in 60 days</span>
                    </div>
                    <div className="bg-white p-4 rounded-lg flex flex-col border border-amber-100">
                        <span className="text-2xl font-bold text-amber-700">{totalNeverStarted}</span>
                        <span className="text-sm font-semibold mt-1 text-amber-700">Never Started</span>
                        <span className="text-xs text-amber-700/60 mt-1">Joined path but 0 course enrollments</span>
                    </div>
                </div>
                {totalNeverStarted > 0 && (
                    <div className="mt-4 p-3 bg-amber-50 border border-amber-100 rounded-lg text-sm text-amber-800">
                        <strong>Insight:</strong> {totalNeverStarted} learners joined this path but haven&apos;t started any courses. Look for top-of-funnel drop-off issues here.
                    </div>
                )}
            </div>

            {/* Path Intervention Insights */}
            <div className="p-5 border border-black/10 rounded-xl bg-white shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                    <span className="text-base leading-none">💡</span>
                    <h3 className="font-semibold text-sm tracking-tight text-black">Actionable Insights</h3>
                </div>

                {totalJoined < 10 ? (
                    <div className="text-sm text-black/50 bg-black/5 p-3 rounded-lg border border-black/5">
                        Not enough joined learners yet for reliable intervention signals (minimum 10 required).
                    </div>
                ) : (totalNeverStarted / totalJoined) >= 0.5 ? (
                    <div className="text-sm p-3 bg-rose-50 text-rose-900 rounded-lg border border-rose-100 flex gap-2">
                        <span>🚨</span>
                        <div>
                            <strong>Possible Onboarding Issue:</strong> {Math.round((totalNeverStarted / totalJoined) * 100)}% of joined learners have not started any course yet. Consider checking path visibility, kickoff emails, or enrollment friction.
                        </div>
                    </div>
                ) : isSequential && maxDropValue >= 15 ? (
                    <div className="text-sm p-3 bg-amber-50 text-amber-900 rounded-lg border border-amber-100 flex gap-2">
                        <span>⚠️</span>
                        <div>
                            <strong>Possible Progression Friction:</strong> The largest sequential drop-off occurs at <em>{funnelSteps[maxDropIndex].course.title}</em> ({maxDropValue}% drop from the previous step). Consider reviewing this course&apos;s difficulty, length, or prerequisites.
                        </div>
                    </div>
                ) : !isSequential ? (
                    <div className="text-sm p-3 bg-blue-50 text-blue-900 rounded-lg border border-blue-100 flex gap-2">
                        <span>🧭</span>
                        <div>
                            <strong>Self-Paced Exploration:</strong> Because this path is Guided, learners are actively exploring courses out of sequence. No immediate friction warnings found.
                        </div>
                    </div>
                ) : (
                    <div className="text-sm p-3 bg-emerald-50 text-emerald-900 rounded-lg border border-emerald-100 flex gap-2">
                        <span>✨</span>
                        <div>
                            <strong>Healthy Continuation:</strong> Learner progression appears steady. No severe sequential friction drops detected across the active cohort.
                        </div>
                    </div>
                )}
            </div>

            {/* Top-Level Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-5 flex flex-col justify-center bg-white">
                    <span className="text-xs text-black/50 font-medium uppercase tracking-wider mb-1">Total Joined</span>
                    <span className="text-3xl font-bold text-black">{totalJoined}</span>
                    <span className="text-xs text-black/40 mt-1">All-time path intent</span>
                </Card>
                <Card className="p-5 flex flex-col justify-center bg-[#EBF5FF] border border-[#BCE0FD]">
                    <span className="text-[10px] text-blue-700 font-bold uppercase tracking-wider mb-2 bg-[#D1E9FF] inline-block self-start px-2 py-0.5 rounded-full">Active Lens</span>
                    <span className="text-3xl font-bold text-blue-700">{activeCompletionRate}%</span>
                    <span className="text-xs text-blue-800/60 mt-1">Completion rate among <strong>active</strong> cohort</span>
                </Card>
                <Card className="p-5 flex flex-col justify-center bg-white border border-black/5 opacity-80">
                    <span className="text-xs text-black/50 font-medium uppercase tracking-wider mb-1">Overall Completion</span>
                    <span className="text-3xl font-bold text-black/70">{completionRate}%</span>
                    <span className="text-xs text-black/40 mt-1">Ignores staleness</span>
                </Card>
                <Card className="p-5 flex flex-col justify-center bg-white">
                    <span className="text-xs text-black/50 font-medium uppercase tracking-wider mb-1">Total Courses</span>
                    <span className="text-3xl font-bold text-black">{requiredCourseCount}</span>
                    <span className="text-xs text-black/40 mt-1">Required inside path</span>
                </Card>
            </div>

            {/* Course Completion / Funnel Area */}
            <div>
                <h2 className="text-xl font-semibold tracking-tight mb-2">
                    {isSequential ? "Path Progress Funnel" : "Course Completion Across Joined Learners"}
                </h2>

                {/* Mode-Aware Explanation Text */}
                <div className={`p-4 rounded-xl text-sm leading-relaxed mb-6 ${isSequential ? "bg-amber-50 border border-amber-100 text-amber-900" : "bg-black/5 text-black/70"}`}>
                    {isSequential ? (
                        <><strong>Sequential Mode:</strong> Because this path actively guides learners to take courses in order, interpreting lower completion rates in later courses as <em>&quot;drop-off&quot;</em> or <em>&quot;bottlenecks&quot;</em> is highly recommended. Look for steep percentage drops between courses to identify where learners are getting stuck.</>
                    ) : (
                        <><strong>Guided Mode (Self-Paced):</strong> Because learners are free to bounce around and ignore the recommended order, a lower completion rate on Course 2 compared to Course 3 does not necessarily indicate a strict <em>&quot;drop-off bottleneck.&quot;</em> It simply reflects self-paced visibility.</>
                    )}
                </div>

                <Card className="overflow-hidden">
                    {funnelSteps.length === 0 ? (
                        <div className="p-10 text-center">
                            <p className="text-black/50 text-sm">No courses added to this path yet.</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-black/5">
                            {funnelSteps.map((step) => (
                                <div key={step.id} className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-6 hover:bg-black/[0.01] transition-colors">
                                    {/* Order / Number */}
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black text-white font-bold text-lg">
                                        {step.index + 1}
                                    </div>

                                    {/* Course Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                            <h3 className="text-lg font-semibold tracking-tight text-black flex items-center gap-2">
                                                {step.course.title}
                                                {step.course.status !== 'PUBLISHED' && (
                                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-sm bg-black/10 text-black/50 uppercase tracking-wider">Archived</span>
                                                )}
                                            </h3>
                                            {isSequential && maxDropIndex === step.index && maxDropValue >= 15 && totalJoined >= 10 && (
                                                <span className="inline-flex text-[10px] w-fit font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 uppercase tracking-wider border border-amber-200">
                                                    ⚠️ Largest progression drop
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-black/50 mt-1 font-mono">{step.course.slug}</p>
                                    </div>

                                    {/* Stats (strictly within Path context) */}
                                    <div className="sm:text-right shrink-0">
                                        <div className="flex items-end sm:flex-col gap-3 sm:gap-1">
                                            <div className="text-2xl font-bold font-mono tracking-tight text-black">
                                                {step.stepCompletionRate}%
                                            </div>
                                            <div className="text-xs font-semibold uppercase tracking-wider text-black/50">
                                                {step.completionCount} / {totalJoined} completed
                                            </div>
                                        </div>

                                        {/* Visual progress bar representation inline */}
                                        <div className="mt-3 h-2 w-full sm:w-40 bg-black/5 rounded-full overflow-hidden self-end">
                                            <div
                                                className={`h-full ${isSequential ? "bg-amber-500" : "bg-black/40"}`}
                                                style={{ width: `${step.stepCompletionRate}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>
            </div>

            <p className="text-center text-xs text-black/40 mt-8 pb-12">
                Metrics shown on this page only count completions from learners who explicitly joined this learning path. <br /> Direct course completions outside of this path intent are excluded to protect data integrity.
            </p>
        </div>
    );
}
