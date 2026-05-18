import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function DashboardCoursesPage() {
    const session = await auth();
    if (!session) redirect("/login");

    const enrollments = await prisma.enrollment.findMany({
        where: { userId: session.user.id },
        orderBy: { enrolledAt: "desc" },
        include: {
            course: {
                include: {
                    modules: {
                        include: {
                            lessons: {
                                select: { id: true },
                            },
                        },
                    },
                },
            },
        },
    });

    const completedLessonIds = await prisma.lessonProgress.findMany({
        where: { userId: session.user.id, completed: true },
        select: { lessonId: true },
    });
    const completedSet = new Set(completedLessonIds.map((p) => p.lessonId));

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-semibold tracking-tight">My Courses</h1>
                <Link href="/explore">
                    <SecondaryButton className="px-5 py-2.5">Explore More</SecondaryButton>
                </Link>
            </div>

            {enrollments.length === 0 ? (
                <Card className="p-12 text-center border-dashed">
                    <p className="text-black/50 mb-4">You are not enrolled in any courses yet.</p>
                    <Link href="/explore">
                        <PrimaryButton className="px-5 py-2.5">Find a Program</PrimaryButton>
                    </Link>
                </Card>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {enrollments.map((e) => {
                        const allLessons = e.course.modules.flatMap((m) => m.lessons);
                        const total = allLessons.length;
                        const complete = allLessons.filter((l) => completedSet.has(l.id)).length;
                        const progress = total > 0 ? Math.round((complete / total) * 100) : 0;
                        const isDone = e.completedAt !== null;

                        return (
                            <Link key={e.id} href={`/learn/${e.course.slug}`} className="group block h-full">
                                <Card className="p-5 h-full flex flex-col transition-all group-hover:-translate-y-1 group-hover:shadow-lg border-black/5">
                                    <div className="flex items-start justify-between mb-4">
                                        <span className={`text-xs font-semibold px-2 py-1 rounded-md ${isDone ? "bg-green-100 text-green-700" : "bg-[rgb(255,138,0)]/10 text-[#C2410C]"}`}>
                                            {isDone ? "Completed" : "In Progress"}
                                        </span>
                                        <span className="text-xs text-black/40">{total} Lessons</span>
                                    </div>
                                    <h3 className="text-lg font-semibold tracking-[-0.02em] mb-2 group-hover:text-[rgb(255,138,0)] transition-colors">{e.course.title}</h3>

                                    <div className="mb-4 text-sm text-black/55 flex-1">
                                        <p className="line-clamp-2">{e.course.description || "No description provided."}</p>
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-black/5">
                                        <div className="flex justify-between text-xs font-medium text-black/55 mb-2">
                                            <span>Progress</span>
                                            <span>{progress}%</span>
                                        </div>
                                        <div className="h-1.5 overflow-hidden rounded-full bg-black/8 w-full">
                                            <div className="h-full rounded-full bg-gradient-to-r from-[rgb(255,138,0)] to-[rgb(255,90,95)]" style={{ width: `${progress}%` }} />
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
