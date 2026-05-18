import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { computeCourseAnalytics } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export default async function AdminGlobalAnalyticsPage() {
    const session = await auth();
    const role = (session?.user as any)?.role;

    // Strict RBAC: only ADMIN can view global platform analytics
    if (!session || role !== "ADMIN") {
        redirect("/admin");
    }

    // ─── 1. FETCH ALL COURSES & COMPUTE METRICS ───
    const rawCourses = await prisma.course.findMany({
        orderBy: { updatedAt: "desc" },
        include: {
            instructor: { select: { name: true } },
            _count: { select: { enrollments: true, certificates: true } },
            modules: {
                include: {
                    lessons: {
                        include: {
                            progress: true,
                            quizAttempts: true,
                        }
                    }
                }
            }
        },
    });

    const coursesWithAnalytics = rawCourses.map((c) => ({
        ...c,
        analytics: computeCourseAnalytics(c)
    }));

    // ─── 2. FETCH ALL PATHS & COMPUTE PATH COMPLETION ───
    // To honestly derive path completion, we need to know who has completed the underlying courses
    const allEnrollments = await prisma.enrollment.findMany({
        where: { completedAt: { not: null } },
        select: { userId: true, courseId: true }
    });
    const userCompletedCourses = new Map<string, Set<string>>();
    allEnrollments.forEach(e => {
        if (!userCompletedCourses.has(e.userId)) userCompletedCourses.set(e.userId, new Set());
        userCompletedCourses.get(e.userId)!.add(e.courseId);
    });

    const paths = await prisma.learningPath.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            courses: { select: { courseId: true } },
            enrollments: true
        }
    });

    const pathsWithAnalytics = paths.map(path => {
        const totalCourses = path.courses.length;
        const totalJoined = path.enrollments.length;
        let totalCompleted = 0;

        if (totalCourses > 0) {
            path.enrollments.forEach(pe => {
                const userCompleted = userCompletedCourses.get(pe.userId) || new Set();
                const pathIsComplete = path.courses.every(c => userCompleted.has(c.courseId));
                if (pathIsComplete) {
                    totalCompleted++;
                }
            });
        }

        const completionRate = totalJoined > 0 ? Math.round((totalCompleted / totalJoined) * 100) : 0;

        return { ...path, totalCourses, totalJoined, totalCompleted, completionRate };
    });

    return (
        <div className="max-w-6xl mx-auto space-y-12">
            <div>
                <h1 className="text-3xl font-semibold tracking-[-0.02em]">Global Platform Health</h1>
                <p className="text-sm text-black/55 mt-1">Cross-platform visibility into course and path performance.</p>
            </div>

            {/* Courses Table */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Course Performance Overview</h2>
                </div>

                <Card className="overflow-hidden">
                    {coursesWithAnalytics.length === 0 ? (
                        <div className="p-8 text-center text-black/50 text-sm">No courses available.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-black/5 bg-black/[0.02] text-black/60 font-medium">
                                        <th className="px-4 py-3 text-left w-1/3">Course</th>
                                        <th className="px-4 py-3 text-left">Instructor</th>
                                        <th className="px-4 py-3 text-right">Learners</th>
                                        <th className="px-4 py-3 text-right">Avg Progress</th>
                                        <th className="px-4 py-3 text-right">Completion</th>
                                        <th className="px-4 py-3 text-right">Avg Quiz Score</th>
                                        <th className="px-4 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {coursesWithAnalytics.map(c => (
                                        <tr key={c.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.01]">
                                            <td className="px-4 py-3">
                                                <p className="font-semibold text-black/90 truncate max-w-[200px] xl:max-w-xs">{c.title}</p>
                                                <p className="text-[10px] text-black/40 mt-0.5">{c.status}</p>
                                            </td>
                                            <td className="px-4 py-3 text-black/70">
                                                {c.instructor?.name || "System"}
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium">
                                                {c.analytics.totalEnrolled}
                                            </td>
                                            <td className="px-4 py-3 text-right text-black/80">
                                                {c.analytics.avgProgress}%
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <span className={`px-2 py-1 inline-flex items-center justify-center rounded text-xs font-semibold ${c.analytics.completionRate > 50 ? 'bg-green-100 text-green-700' : 'bg-black/5 text-black/70'}`}>
                                                    {c.analytics.completionRate}%
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium text-[#D48924]">
                                                {c.analytics.avgQuizScore !== null ? `${c.analytics.avgQuizScore}%` : '-'}
                                            </td>
                                            <td className="px-4 py-3 text-right flex justify-end gap-2">
                                                <Link href={`/admin/courses/${c.id}/edit`} className="text-xs text-blue-600 hover:underline">Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>

            {/* Paths Table */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Learning Path Adoption Overview</h2>
                </div>

                <Card className="overflow-hidden">
                    {pathsWithAnalytics.length === 0 ? (
                        <div className="p-8 text-center text-black/50 text-sm">No paths created yet.</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-black/5 bg-black/[0.02] text-black/60 font-medium">
                                        <th className="px-4 py-3 text-left w-1/3">Path Name</th>
                                        <th className="px-4 py-3 text-left">Status</th>
                                        <th className="px-4 py-3 text-right">Courses Inside</th>
                                        <th className="px-4 py-3 text-right">Total Learners Joined</th>
                                        <th className="px-4 py-3 text-right">Total Completed</th>
                                        <th className="px-4 py-3 text-right">Completion Rate</th>
                                        <th className="px-4 py-3 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pathsWithAnalytics.map(p => (
                                        <tr key={p.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.01]">
                                            <td className="px-4 py-3">
                                                <p className="font-semibold text-black/90 truncate max-w-[200px] xl:max-w-xs">{p.title}</p>
                                            </td>
                                            <td className="px-4 py-3 text-black/70">
                                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${p.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-black/10 text-black/60'}`}>
                                                    {p.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right text-black/70">
                                                {p.totalCourses}
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium text-black">
                                                {p.totalJoined}
                                            </td>
                                            <td className="px-4 py-3 text-right font-medium text-green-700">
                                                {p.totalCompleted}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <span className={`px-2 py-1 inline-flex items-center justify-center rounded text-xs font-semibold ${p.completionRate > 50 ? 'bg-green-100 text-green-700' : 'bg-black/5 text-black/70'}`}>
                                                    {p.completionRate}%
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-right text-xs">
                                                <Link href={`/admin/paths/${p.id}/edit`} className="text-blue-600 hover:underline">Edit</Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
}
