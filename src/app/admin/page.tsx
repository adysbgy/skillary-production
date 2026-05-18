import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { computeCourseAnalytics } from "@/lib/analytics";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
    const session = await auth();
    const role = (session?.user as { role?: string }).role;
    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        redirect("/dashboard");
    }

    // ─── INSTRUCTOR: scoped to own courses only ───
    if (role === "INSTRUCTOR") {
        const userId = session.user.id;

        const rawCourses = await prisma.course.findMany({
            where: { instructorId: userId },
            orderBy: { updatedAt: "desc" },
            include: {
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

        const myCourses = rawCourses.map((c: any) => {
            return {
                ...c,
                analytics: computeCourseAnalytics(c)
            };
        });

        const draftCourses = myCourses.filter((c: any) => c.status !== "PUBLISHED");
        const publishedCourses = myCourses.filter((c: any) => c.status === "PUBLISHED");

        const myEnrollments = myCourses.reduce((acc: number, c: any) => acc + c.analytics.totalEnrolled, 0);
        const myCertificates = myCourses.reduce((acc: number, c: any) => acc + c.analytics.totalCompleted, 0);

        // Calculate weighted global average progress across all enrollments
        const totalProgressWeight = myCourses.reduce((acc: number, c: any) => acc + (c.analytics.avgProgress * c.analytics.totalEnrolled), 0);
        const globalAvgProgress = myEnrollments > 0 ? Math.round(totalProgressWeight / myEnrollments) : 0;

        // Fetch learners needing attention (Failed Quizzes)
        const recentFailedAttempts = await prisma.quizAttempt.findMany({
            where: {
                passed: false,
                lesson: { module: { course: { instructorId: userId } } }
            },
            orderBy: { createdAt: 'desc' },
            include: {
                user: { select: { id: true, name: true, email: true } },
                lesson: { select: { title: true, module: { select: { course: { select: { title: true } } } } } }
            }
        });

        // Dedup by user id so we don't spam the instructor with 15 fails from the same person
        const attentionUsersMap = new Map();
        for (const attempt of recentFailedAttempts) {
            if (!attentionUsersMap.has(attempt.user.id)) {
                attentionUsersMap.set(attempt.user.id, attempt);
            }
            if (attentionUsersMap.size >= 6) break; // Limit list size
        }
        const learnersNeedingAttention = Array.from(attentionUsersMap.values());

        return (
            <div className="max-w-6xl mx-auto space-y-10">
                <div>
                    <h1 className="text-3xl font-semibold tracking-[-0.02em]">Instructor Operating Dashboard</h1>
                    <p className="text-sm text-black/55 mt-1">Operational course health, learner progress, and content management.</p>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <Card className="p-5 border-black/5">
                        <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">Total Courses</h3>
                        <p className="text-2xl font-extrabold tracking-tight text-black">{myCourses.length}</p>
                    </Card>
                    <Card className="p-5 border-black/5">
                        <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">Published</h3>
                        <p className="text-2xl font-extrabold tracking-tight text-green-600">{publishedCourses.length}</p>
                    </Card>
                    <Card className="p-5 border-black/5">
                        <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">Total Learners</h3>
                        <p className="text-2xl font-extrabold tracking-tight text-blue-600">{myEnrollments}</p>
                    </Card>
                    <Card className="p-5 border-black/5">
                        <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">Avg Progress</h3>
                        <p className="text-2xl font-extrabold tracking-tight text-[#FF8A00]">{globalAvgProgress}%</p>
                    </Card>
                    <Card className="p-5 border-black/5">
                        <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">Certificates</h3>
                        <p className="text-2xl font-extrabold tracking-tight text-[#FF8A00]">{myCertificates}</p>
                    </Card>
                </div>

                {/* Quick Actions & Needs Attention Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Quick Actions (Left, 1/3) */}
                    <div className="space-y-4 lg:col-span-1">
                        <h2 className="text-lg font-semibold tracking-tight">Quick Actions</h2>
                        <Card className="p-5 flex flex-col gap-3 bg-[#FFFDF9]" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                            <Link href="/admin/courses/new">
                                <button className="w-full text-left px-4 py-3 text-sm font-semibold rounded-lg text-white hover:opacity-90 transition-opacity shadow-sm cursor-pointer" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                                    + Create New Course
                                </button>
                            </Link>

                            {draftCourses.length > 0 && (
                                <Link href={`/admin/courses/${draftCourses[0].id}/edit`}>
                                    <button className="w-full text-left px-4 py-3 text-sm font-medium rounded-lg bg-white border border-black/10 hover:bg-[#FFF8F1] transition-colors cursor-pointer text-[#FF8A00]">
                                        Resume Draft: {draftCourses[0].title}
                                    </button>
                                </Link>
                            )}

                            <Link href="/admin/courses">
                                <button className="w-full text-left px-4 py-3 text-sm font-medium rounded-lg bg-white border border-black/10 hover:bg-black/5 transition-colors cursor-pointer">
                                    View Course Studio
                                </button>
                            </Link>
                        </Card>
                    </div>

                    {/* Learners Needing Attention (Right, 2/3) */}
                    <div className="space-y-4 lg:col-span-2">
                        <h2 className="text-lg font-semibold tracking-tight">Learners Needing Attention</h2>
                        {learnersNeedingAttention.length > 0 ? (
                            <Card className="p-0 overflow-hidden border-black/5">
                                <table className="w-full text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-black/5 bg-black/5">
                                            <th className="px-5 py-3 font-medium text-black/60">Learner</th>
                                            <th className="px-5 py-3 font-medium text-black/60">Issue</th>
                                            <th className="px-5 py-3 font-medium text-black/60 hidden sm:table-cell">Context</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-black/5 bg-white">
                                        {learnersNeedingAttention.map((attempt: any) => (
                                            <tr key={attempt.id} className="hover:bg-black/[0.02] transition-colors">
                                                <td className="px-5 py-3 font-medium text-black/90">
                                                    {attempt.user.name}
                                                    <div className="text-xs text-black/45 font-normal">{attempt.user.email}</div>
                                                </td>
                                                <td className="px-5 py-3">
                                                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600 uppercase tracking-wider">
                                                        Failed Quiz
                                                    </span>
                                                    <div className="text-xs text-black/60 font-medium mt-1">Score: {attempt.score}/{attempt.totalQuestions}</div>
                                                </td>
                                                <td className="px-5 py-3 hidden sm:table-cell">
                                                    <div className="text-xs text-black/80 font-medium">{attempt.lesson.title}</div>
                                                    <div className="text-[10px] text-black/45 mt-0.5">{attempt.lesson.module.course.title}</div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Card>
                        ) : (
                            <Card className="p-6 text-center border border-dashed border-black/10 bg-[#FFFDF9] flex flex-col items-center justify-center">
                                <div className="h-10 w-10 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-3">
                                    ✓
                                </div>
                                <h3 className="text-sm font-semibold tracking-tight text-black/80">No urgent learner issues</h3>
                                <p className="text-xs text-black/50 mt-1 max-w-sm">Learners falling behind or repeatedly failing required quizzes will appear here for operational action.</p>
                            </Card>
                        )}
                    </div>
                </div>

                {/* Course Performance */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold tracking-tight">Course Performance</h2>
                    {myCourses.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {myCourses.map((c) => (
                                <Card key={c.id} className="p-0 overflow-hidden flex flex-col border-black/5 group hover:shadow-md transition-shadow">
                                    <div className={`h-1.5 w-full ${c.status === 'PUBLISHED' ? 'bg-green-500' : ''}`} style={c.status === 'PUBLISHED' ? {} : { background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }} />
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${c.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-black/10 text-black/60'}`}>
                                                        {c.status}
                                                    </span>
                                                </div>
                                                <h4 className="font-semibold text-lg text-black/90">{c.title}</h4>
                                            </div>
                                            <div className="flex gap-2 shrink-0">
                                                <Link href={`/admin/courses/${c.id}/analytics`} className="px-3 py-1.5 bg-[#FFF8F1] hover:bg-[#FFF4E6] rounded-lg text-xs font-medium transition-all text-[#FF8A00]">
                                                    Analytics →
                                                </Link>
                                                <Link href={`/admin/courses/${c.id}/edit`} className="px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-lg text-xs font-medium transition-all text-black/80">
                                                    Edit
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 mt-auto">
                                            <div className="bg-black/5 p-3 rounded-lg">
                                                <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider">Learners</p>
                                                <p className="text-xl font-semibold">{c.analytics.totalEnrolled}</p>
                                            </div>
                                            <div className="bg-black/5 p-3 rounded-lg">
                                                <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider">Completion</p>
                                                <p className="text-xl font-semibold">{c.analytics.completionRate}%</p>
                                            </div>
                                            <div className="bg-black/5 p-3 rounded-lg">
                                                <p className="text-[10px] uppercase font-bold text-black/40 tracking-wider">Avg Progress</p>
                                                <p className="text-xl font-semibold">{c.analytics.avgProgress}%</p>
                                            </div>
                                            <div className="bg-[#FFF8F1] p-3 rounded-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                                                <p className="text-[10px] uppercase font-bold text-[#FF8A00] tracking-wider">Quiz Avg</p>
                                                <p className="text-xl font-semibold text-[#FF8A00]">
                                                    {c.analytics.avgQuizScore !== null ? `${c.analytics.avgQuizScore}%` : '-'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="col-span-full p-12 flex flex-col items-center justify-center text-center border border-dashed border-black/10 rounded-xl bg-[#FFFDF9]">
                            <div className="h-14 w-14 bg-[#FFF8F1] text-[#FF8A00] rounded-2xl flex items-center justify-center mb-4 text-2xl">
                                📚
                            </div>
                            <h3 className="text-xl font-semibold tracking-tight mb-2">Build your first operational course</h3>
                            <p className="text-black/50 text-sm max-w-sm mb-6">Create content and publish it to the catalog. Data will arrive here as enrollments happen.</p>
                            <Link href="/admin/courses/new">
                                <button className="px-6 py-2.5 font-bold text-sm tracking-wide rounded-lg text-white hover:opacity-90 transition-opacity shadow-sm" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                                    + Create Course
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // ─── ADMIN: global platform overview ───
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const [usersCount, coursesCount, enrollmentsCount, recentCourses, recentEnrollments, certificatesCount] = await Promise.all([
        prisma.user.count({ where: { role: "LEARNER" } }),
        prisma.course.count(),
        prisma.enrollment.count(),
        prisma.course.findMany({
            take: 4,
            orderBy: { createdAt: "desc" },
            include: { _count: { select: { enrollments: true } } }
        }),
        prisma.enrollment.count({
            where: { enrolledAt: { gte: thirtyDaysAgo } }
        }),
        prisma.certificate.count()
    ]);

    return (
        <div className="max-w-6xl mx-auto pt-4" style={{ borderTop: '8px solid rgb(255, 138, 0)' }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-semibold tracking-[-0.02em]">Admin Platform View</h1>
                    <p className="text-sm text-black/55 mt-1">Manage global platform metrics and course configurations.</p>
                </div>
                <div className="flex gap-3">
                    <Link href="/admin/courses/new" className="px-5 py-2.5 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity shadow-lg" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                        + Create Course
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <Card className="p-6 bg-[#FFFDF9] border-black/5">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xs font-bold tracking-widest uppercase text-black/45 mb-1">Total Learners</h3>
                            <p className="text-3xl font-extrabold tracking-tight text-black">{usersCount}</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-sm">👤</div>
                    </div>
                </Card>
                <Card className="p-6 bg-[#FFFDF9] border-black/5">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xs font-bold tracking-widest uppercase text-black/45 mb-1">Total Enrollments</h3>
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-extrabold tracking-tight text-[#FF8A00]">{enrollmentsCount}</p>
                                {recentEnrollments > 0 && (
                                    <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                        +{recentEnrollments} (30d)
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 text-sm">🚀</div>
                    </div>
                </Card>
                <Card className="p-6 bg-[#FFFDF9] border-black/5">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xs font-bold tracking-widest uppercase text-black/45 mb-1">Certificates Issued</h3>
                            <p className="text-3xl font-extrabold tracking-tight text-[#FF8A00]">{certificatesCount}</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 text-sm">🏆</div>
                    </div>
                </Card>
                <Card className="p-6 bg-[#FFFDF9] border-black/5">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xs font-bold tracking-widest uppercase text-black/45 mb-1">Total Courses</h3>
                            <p className="text-3xl font-extrabold tracking-tight text-black">{coursesCount}</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-sm">📚</div>
                    </div>
                </Card>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Recently Added Courses</h2>
                    <Link href="/admin/courses" className="text-sm text-[#FF8A00] font-medium hover:underline">View All →</Link>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {recentCourses.map((c: any) => (
                        <Card key={c.id} className="p-0 overflow-hidden flex transition-shadow hover:shadow-md border-black/5 group">
                            <div className="w-2" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }} />
                            <div className="p-5 flex-1 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${c.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-black/10 text-black/60'}`}>
                                            {c.status}
                                        </span>
                                    </div>
                                    <h4 className="font-semibold text-lg text-black/90 group-hover:text-black transition-colors">{c.title}</h4>
                                    <p className="text-xs text-black/45 mt-1">{c._count.enrollments} Students Enrolled</p>
                                </div>
                                <Link href={`/admin/courses/${c.id}/edit`} className="opacity-0 group-hover:opacity-100 px-4 py-2 bg-black/5 hover:bg-black/10 rounded-lg text-sm font-medium transition-all text-black/80">
                                    Edit
                                </Link>
                            </div>
                        </Card>
                    ))}
                    {recentCourses.length === 0 && (
                        <div className="col-span-full p-12 text-center text-black/40 border border-dashed border-black/10 rounded-2xl bg-white">
                            No courses found. Start building the curriculum!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
