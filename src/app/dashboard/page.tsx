import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, GradientButton } from "@/components/ui/Button";
import DashboardContentClient from "./DashboardContentClient";

export const dynamic = "force-dynamic";

export default async function LearnerDashboardPage() {
    const session = await auth();
    if (!session) redirect("/login");

    const userId = session.user.id;

    // Fetch all enrollments with course details and lesson counts
    const [user, enrollments, completedLessonIds, certificates, pathEnrollments] = await Promise.all([
        prisma.user.findUnique({ where: { id: userId } }),
        prisma.enrollment.findMany({
            where: { userId },
            orderBy: { enrolledAt: "desc" },
            include: {
                course: {
                    include: {
                        modules: {
                            orderBy: { sortOrder: "asc" },
                            include: {
                                lessons: { orderBy: { sortOrder: "asc" }, select: { id: true, slug: true, title: true, type: true } },
                            },
                        },
                    },
                },
            },
        }),
        prisma.lessonProgress.findMany({
            where: { userId, completed: true },
            select: { lessonId: true, completedAt: true },
        }),
        prisma.certificate.findMany({
            where: { userId },
            include: { course: true },
            orderBy: { issuedAt: "desc" },
        }),
        prisma.pathEnrollment.findMany({
            where: { userId },
            orderBy: { enrolledAt: "desc" },
            include: {
                learningPath: {
                    include: {
                        courses: {
                            orderBy: { sortOrder: "asc" },
                            include: {
                                course: {
                                    select: { id: true, title: true, slug: true }
                                }
                            }
                        }
                    }
                }
            }
        })
    ]);

    if (!user) redirect("/login");

    const completedSet = new Set(completedLessonIds.map((p: any) => p.lessonId));
    const completedCourseIds = new Set(enrollments.filter((e: any) => e.completedAt).map((e: any) => e.courseId));
    const enrolledCourseIds = new Set(enrollments.map((e: any) => e.courseId));

    const isCreator = user.role === "ADMIN" || user.role === "INSTRUCTOR";

    // Compute per-course progress
    const coursesWithProgress = enrollments.map((enrollment: any) => {
        let lastActivity = enrollment.enrolledAt.getTime();
        const modules = enrollment.course.modules;
        const allLessons = modules.flatMap((m: any) => m.lessons);
        const totalLessons = allLessons.length;
        const completedCount = allLessons.filter((l: any) => {
            const isCompleted = completedSet.has(l.id);
            if (isCompleted) {
                const lp = completedLessonIds.find((p: any) => p.lessonId === l.id);
                if (lp && lp.completedAt && lp.completedAt.getTime() > lastActivity) {
                    lastActivity = lp.completedAt.getTime();
                }
            }
            return isCompleted;
        }).length;
        const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

        // Find next lesson and its parent module
        let nextLesson = null;
        let nextModule = null;

        for (const m of modules) {
            for (const l of m.lessons) {
                if (!completedSet.has(l.id) && !nextLesson) {
                    nextLesson = l;
                    nextModule = m;
                    break;
                }
            }
            if (nextLesson) break;
        }

        // Fallbacks if completed
        if (!nextLesson && allLessons.length > 0) {
            nextLesson = allLessons[0];
            nextModule = modules[0];
        }


        return {
            id: enrollment.id,
            course: enrollment.course,
            enrolledAt: enrollment.enrolledAt,
            completedAt: enrollment.completedAt,
            lastActivity,
            totalLessons,
            completedCount,
            percent,
            nextLesson,
            nextModule,
            nextLessonSlug: nextLesson?.slug || "",
        };
    });

    const inProgressUnsorted = coursesWithProgress.filter((c: any) => c.percent < 100);
    // Sort inProgress by deepest progress / activity proxy for MVP
    const inProgress = inProgressUnsorted.sort((a: any, b: any) => b.lastActivity - a.lastActivity);
    const completed = coursesWithProgress.filter((c: any) => c.percent === 100);

    // Extract priority "Jump Back In" course
    const priorityCourse = inProgress.length > 0 ? inProgress[0] : null;
    const remainingInProgress = inProgress.length > 0 ? inProgress.slice(1) : [];
    const totalCompletedLessons = completedSet.size;

    // Course-based certificates only (excludes event/webinar certificates,
    // which have no `course` and are surfaced in the "Webinar Saya" section).
    const courseCertificates = certificates.filter((c: any) => c.courseId && c.course);

    // Certificate lookup by courseId for inline badge on completed cards
    const certByCourseId = new Map(courseCertificates.map((c: any) => [c.courseId, c]));

    // Compute Path Progress
    const pathsWithProgress = pathEnrollments.map((pe: any) => {
        const path = pe.learningPath;
        const totalCourses = path.courses.length;
        let completedCount = 0;
        let nextCourse: any = null;

        path.courses.forEach((pc: any) => {
            if (completedCourseIds.has(pc.course.id)) {
                completedCount++;
            } else if (!nextCourse) {
                nextCourse = pc.course;
            }
        });

        const percent = totalCourses > 0 ? Math.round((completedCount / totalCourses) * 100) : 0;

        return {
            id: pe.id,
            path,
            totalCourses,
            completedCount,
            percent,
            nextCourse,
            enrolledAt: pe.enrolledAt
        };
    });

    const activePaths = pathsWithProgress.filter((p: any) => p.percent < 100);
    const completedPaths = pathsWithProgress.filter((p: any) => p.percent === 100);

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            {/* Welcome & Priority Jump Back In */}
            {enrollments.length === 0 ? (
                /* ====== ZERO ENROLLMENT: Onboarding Hero ====== */
                <div className="rounded-3xl p-10 lg:p-14 text-center border" style={{ background: 'linear-gradient(135deg, rgba(255, 138, 0, 0.08), rgba(255, 90, 95, 0.04))', borderColor: 'rgb(240, 217, 200)' }}>
                    <div className="mx-auto w-16 h-16 rounded-2xl bg-black flex items-center justify-center mb-6 shadow-lg">
                        <span className="text-white text-2xl font-bold tracking-tighter">S</span>
                    </div>
                    <h1 className="text-3xl font-semibold tracking-tight text-black/90 mb-3">
                        Welcome to Skillary, {user.name?.split(" ")[0] || "Learner"}
                    </h1>
                    <p className="text-black/60 text-base max-w-md mx-auto mb-8">
                        Your learning journey starts here. Browse our catalog and enroll in your first course to get started.
                    </p>
                    <Link href="/explore">
                        <GradientButton className="px-10 py-3.5 text-base">Explore Courses <span className="ml-2">→</span></GradientButton>
                    </Link>
                </div>
            ) : (
                /* ====== ENROLLED LEARNER: Contextual Welcome + Jump Back In ====== */
                <div className="grid lg:grid-cols-[1fr_0.8fr] gap-6 mb-8">
                    <div className="rounded-3xl p-8 lg:p-10 relative overflow-hidden border flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, rgba(255, 138, 0, 0.06), rgba(255, 90, 95, 0.04))', borderColor: 'rgb(240, 217, 200)' }}>
                        <div className="relative z-10">
                            <h1 className="text-3xl font-semibold tracking-tight text-black/90">
                                {inProgress.length === 0 && completed.length > 0
                                    ? `Congratulations, ${user.name?.split(" ")[0] || "Learner"}!`
                                    : `Welcome back, ${user.name?.split(" ")[0] || "Learner"}`
                                }
                            </h1>
                            <p className="mt-3 text-black/60 text-base">
                                {totalCompletedLessons === 0
                                    ? `You're enrolled in ${enrollments.length} course${enrollments.length !== 1 ? "s" : ""}. Start your first lesson to begin!`
                                    : inProgress.length === 0 && completed.length > 0
                                        ? `You've completed all ${completed.length} course${completed.length !== 1 ? "s" : ""} and earned ${certificates.length} certificate${certificates.length !== 1 ? "s" : ""}. Incredible work!`
                                        : `You've completed ${totalCompletedLessons} lessons across ${enrollments.length} enrolled course${enrollments.length !== 1 ? "s" : ""}. Keep up the momentum!`
                                }
                            </p>
                            {inProgress.length === 0 && completed.length > 0 && (
                                <Link href="/explore" className="inline-block mt-5">
                                    <button className="px-6 py-2.5 text-sm font-semibold rounded-xl border border-black/10 hover:bg-black/5 transition-colors">Discover More Courses →</button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {priorityCourse ? (
                        <Card className="p-8 border-2 flex flex-col rounded-3xl bg-[#FFFDF9] hover:-translate-y-1 hover:shadow-lg transition-all" style={{ borderColor: 'rgb(240, 217, 200)' }}>
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider mb-4 inline-block w-fit" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>Jump Back In</span>
                            <h2 className="text-xl font-semibold tracking-[-0.02em] leading-snug line-clamp-2">
                                {priorityCourse.course.title}
                                {priorityCourse.course.status !== "PUBLISHED" && (
                                    <span className="ml-2 align-middle inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-black/5 text-black/50 border border-black/10">Archived</span>
                                )}
                            </h2>
                            <div className="mt-auto pt-6">
                                <p className="text-sm font-medium text-black/60 mb-3 truncate">
                                    <span className="font-semibold text-black/80 text-xs mr-2">↑ Next up:</span>
                                    {priorityCourse.nextModule?.title} <span className="mx-1 opacity-50">•</span> {priorityCourse.nextLesson?.title}
                                </p>
                                <Link href={`/learn/${priorityCourse.course.slug}/${priorityCourse.nextLessonSlug}`} className="block w-full">
                                    <GradientButton className="w-full py-3.5 text-sm font-semibold capitalize tracking-tight">Resume Lesson <span className="text-lg ml-1">→</span></GradientButton>
                                </Link>
                            </div>
                        </Card>
                    ) : completed.length > 0 && courseCertificates.length > 0 ? (
                        /* Completed-all: show latest course cert as hero */
                        <Card className="p-8 border-2 border-green-500/30 flex flex-col rounded-3xl bg-green-50/50 transition-all">
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-green-500/10 text-green-700 uppercase tracking-wider mb-4 inline-block w-fit">Latest Achievement</span>
                            <h2 className="text-xl font-semibold tracking-[-0.02em] leading-snug line-clamp-2">{courseCertificates[0].course!.title}</h2>
                            <div className="mt-auto pt-6">
                                <Link href={`/certificate/${courseCertificates[0].uniqueCode}`} className="block w-full">
                                    <button className="w-full py-3.5 text-sm font-semibold rounded-2xl bg-green-600 text-white hover:bg-green-700 transition-colors">
                                        🎓 View Certificate
                                    </button>
                                </Link>
                            </div>
                        </Card>
                    ) : null}
                </div>
            )}

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <DashboardContentClient
                        activePaths={activePaths}
                        completedPaths={completedPaths}
                        inProgressUnsorted={inProgressUnsorted}
                        remainingInProgress={remainingInProgress}
                        completed={completed}
                        certificates={courseCertificates}
                        certByCourseIdMap={Object.fromEntries(certByCourseId)}
                    />
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {isCreator && (
                        <div className="bg-green-50 border border-green-500/20 rounded-2xl p-5 mb-2">
                            <h3 className="font-semibold text-green-900 mb-1 text-sm tracking-tight">Creator Tools</h3>
                            <p className="text-xs text-green-800/60 mb-4">Design, manage, and publish your own courses.</p>
                            <Link href="/admin/courses/new" className="block">
                                <button className="w-full py-2.5 text-xs font-bold rounded-xl bg-green-600 text-white hover:bg-green-700 transition-colors shadow-sm">
                                    + Create Course
                                </button>
                            </Link>
                        </div>
                    )}
                    <h2 className="text-xl font-semibold tracking-tight">Quick Stats</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Card className="p-5 flex flex-col justify-center items-center text-center bg-[#FFFDF9]" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                            <span className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                                {enrollments.length}
                            </span>
                            <span className="text-xs text-black/50 font-medium uppercase mt-1">Enrolled</span>
                        </Card>
                        <Card className="p-5 flex flex-col justify-center items-center text-center bg-[#FFFDF9]" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                            <span className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                                {totalCompletedLessons}
                            </span>
                            <span className="text-xs text-black/50 font-medium uppercase mt-1">Lessons Done</span>
                        </Card>
                        <Card className="p-5 flex flex-col justify-center items-center text-center bg-[#FFFDF9]" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                            <span className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                                {completed.length}
                            </span>
                            <span className="text-xs text-black/50 font-medium uppercase mt-1">Completed</span>
                        </Card>
                        <Card className="p-5 flex flex-col justify-center items-center text-center bg-[#FFFDF9]" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                            <span className="text-3xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                                {certificates.length}
                            </span>
                            <span className="text-xs text-black/50 font-medium uppercase mt-1">Certificates</span>
                        </Card>
                    </div>

                    <Card className="p-6 bg-[#FFFDF9] mt-6 rounded-2xl transition-colors shadow-sm" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                        <h3 className="font-semibold mb-2 text-[#0F172A]">Need Guidance?</h3>
                        <p className="text-sm text-[#475569] mb-4 line-clamp-3">Our community of industry experts is always ready to review your progress and assist you.</p>
                        <Link href="/community" className="text-sm font-medium transition-colors inline-flex items-center" style={{ color: 'rgb(255, 138, 0)' }}>
                            Join Discussion <span className="ml-2">→</span>
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
    );
}
