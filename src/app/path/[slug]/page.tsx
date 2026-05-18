import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { Container } from "@/components/ui/Container";
import { Card, SoftCard } from "@/components/ui/Card";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { JoinPathButton } from "./JoinPathButton";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const path = await prisma.learningPath.findUnique({ where: { slug, status: "PUBLISHED" } });
    if (!path) return { title: "Path Not Found" };
    return { title: `${path.title} | Learning Path | Skillary`, description: path.description };
}

export default async function PathDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug;
    const session = await auth();

    const path = await prisma.learningPath.findUnique({
        where: { slug },
        include: {
            courses: {
                orderBy: { sortOrder: "asc" },
                include: {
                    course: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            level: true,
                            slug: true,
                            category: true,
                        }
                    }
                }
            }
        }
    });

    if (!path) return notFound();

    // If path is not published, only allow joined learners or admins to view
    if (path.status !== "PUBLISHED") {
        let canAccess = false;
        if (session?.user) {
            const [joinCheck, user] = await Promise.all([
                prisma.pathEnrollment.findUnique({
                    where: { userId_learningPathId: { userId: session.user.id, learningPathId: path.id } }
                }),
                prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true } })
            ]);
            if (joinCheck || (user as any)?.role === "ADMIN") canAccess = true;
        }
        if (!canAccess) return notFound();
    }

    // Fetch user enrollments and completed courses to indicate progress (if logged in)
    let userCompletedIds = new Set<string>();
    let userEnrolledIds = new Set<string>();
    let isJoined = false;

    if (session?.user) {
        const [enrollments, joinCheck] = await Promise.all([
            prisma.enrollment.findMany({
                where: { userId: session.user.id },
                select: { courseId: true, completedAt: true }
            }),
            prisma.pathEnrollment.findUnique({
                where: {
                    userId_learningPathId: {
                        userId: session.user.id,
                        learningPathId: path.id
                    }
                }
            })
        ]);
        isJoined = !!joinCheck;
        enrollments.forEach((e: any) => {
            userEnrolledIds.add(e.courseId);
            if (e.completedAt) userCompletedIds.add(e.courseId);
        });
    }

    const totalCourses = path.courses.length;
    let completedCount = 0;
    let nextCourseId: string | null = null;

    path.courses.forEach((pc: any) => {
        if (userCompletedIds.has(pc.course.id)) {
            completedCount++;
        } else if (!nextCourseId) {
            // First non-completed course in order becomes the recommended "Up Next"
            nextCourseId = pc.course.id;
        }
    });

    const progressPercentage = totalCourses > 0 ? Math.round((completedCount / totalCourses) * 100) : 0;
    const isLoggedIn = !!session?.user;

    return (
        <div className="bg-[linear-gradient(to_bottom,_#FFFDF9,_#FFF7EF)] min-h-screen">
            <Container className="py-16 lg:py-24">
                <Link href="/path" className="text-sm font-semibold text-black/40 hover:text-black mb-8 inline-block transition-colors">
                    ← Browse Paths
                </Link>

                <div className="grid lg:grid-cols-[1fr_380px] gap-12 items-start">
                    <div>
                        <div className="mb-4 flex flex-wrap gap-2 text-xs uppercase font-bold tracking-wider text-black/40">
                            <span>Learning Path</span>
                            <span>·</span>
                            <span>{totalCourses} Courses</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-black mb-6">
                            {path.title}
                        </h1>
                        <p className="text-lg leading-relaxed text-black/70 max-w-2xl">
                            {path.description}
                        </p>

                        <div className="mt-16">
                            <SectionTitle eyebrow="Curriculum" title="Structured Progression" description="Complete these courses in order to master the topic." />
                            <div className="space-y-4">
                                {path.courses.map((pc: any, index: number) => {
                                    const c = pc.course;
                                    const isEnrolled = userEnrolledIds.has(c.id);
                                    const isCompleted = userCompletedIds.has(c.id);
                                    const isNext = c.id === nextCourseId;
                                    const isSequential = path.mode === "SEQUENTIAL";

                                    // Soft-lock logic for sequential: if not completed, not enrolled, and not 'next', it's a future step
                                    const isFutureStep = isSequential && !isCompleted && !isEnrolled && !isNext;
                                    const prevCourse = index > 0 ? path.courses[index - 1].course.title : null;

                                    return (
                                        <Card key={pc.id} className={`p-5 flex flex-col sm:flex-row gap-5 items-start sm:items-center transition-colors 
                                            ${isNext ? "ring-2 ring-[rgb(255,138,0)] bg-[#FFFdf9]" : ""}
                                            ${isFutureStep ? "border-dashed border-black/10 bg-black/[0.02] opacity-80" : "hover:border-black/20"}
                                        `}>
                                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold 
                                                ${isCompleted ? "bg-green-100 text-green-700" : isFutureStep ? "bg-black/5 text-black/40" : "bg-black text-white"}
                                            `}>
                                                {isCompleted ? "✓" : index + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                    <h3 className={`text-lg font-semibold tracking-tight ${isFutureStep ? "text-black/60" : ""}`}>{c.title}</h3>
                                                    {isCompleted ? (
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Completed</span>
                                                    ) : isNext ? (
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[rgb(255,138,0)] bg-[rgb(255,138,0)]/10 px-2 py-0.5 rounded-full">
                                                            ★ {isEnrolled ? "Resume" : "Recommended Next"}
                                                        </span>
                                                    ) : isEnrolled ? (
                                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C2410C] bg-[#FFF7ED] px-2 py-0.5 rounded-full">In Progress</span>
                                                    ) : isFutureStep ? (
                                                        <span className="text-[10px] whitespace-nowrap font-bold uppercase tracking-wider text-black/40 bg-black/5 px-2 py-0.5 rounded-full">
                                                            🔒 Later in this path
                                                        </span>
                                                    ) : null}
                                                </div>
                                                <p className="text-sm leading-relaxed text-black/60 line-clamp-2 pr-4">{c.description}</p>

                                                {isFutureStep && prevCourse && (
                                                    <div className="mt-2 text-xs font-medium text-black/50 bg-white/50 px-3 py-1.5 rounded-md inline-block border border-black/5">
                                                        Complete &quot;{prevCourse}&quot; first
                                                    </div>
                                                )}

                                                <div className="mt-3 flex gap-3 text-xs text-black/40 font-medium tracking-wide">
                                                    <span>{c.level}</span>
                                                    <span>·</span>
                                                    <span>{c.category}</span>
                                                </div>
                                            </div>
                                            <div className="shrink-0 w-full sm:w-auto">
                                                <Link href={`/program/${c.slug}`} className={`px-4 py-2 w-full rounded-xl text-sm font-semibold transition-colors block text-center sm:inline-block 
                                                    ${isNext ? "bg-[rgb(255,138,0)] hover:opacity-90 text-white shadow-md" :
                                                        isFutureStep ? "bg-transparent hover:bg-black/5 text-black/50 border border-black/10" :
                                                            "bg-black/5 hover:bg-black/10 text-black"}
                                                `}>
                                                    {isNext ? "Continue Sequence" : "View Course"}
                                                </Link>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Path Info Sidebar */}
                    <Card className="p-6 sticky top-8">
                        <SectionTitle eyebrow="Path Summary" title="At a glance" />

                        {isLoggedIn && (
                            <div className="mb-6">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-semibold text-black/80">Your Progress</span>
                                    <span className="text-xs font-bold text-black/40">{completedCount} of {totalCourses} courses</span>
                                </div>
                                <div className="h-2 w-full bg-black/5 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-[#181818] transition-all duration-1000"
                                        style={{ width: `${progressPercentage}%` }}
                                    />
                                </div>
                                {completedCount === totalCourses && totalCourses > 0 && (
                                    <p className="mt-3 text-xs font-medium text-green-700 bg-green-50 p-2 rounded-lg border border-green-100 text-center">
                                        🎉 Path Completed
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="grid gap-3 mb-6">
                            <SoftCard className="p-4 bg-white/50">
                                <p className="text-xs font-semibold uppercase tracking-widest text-black/40">Total Courses</p>
                                <p className="mt-1 text-base font-semibold text-black/80">{totalCourses}</p>
                            </SoftCard>
                            <SoftCard className="p-4 bg-white/50">
                                <p className="text-xs font-semibold uppercase tracking-widest text-black/40">Path Status</p>
                                <p className="mt-1 text-base font-semibold text-black/80">
                                    {path.mode === "SEQUENTIAL" ? "Sequential Guidance" : "Self-Paced Sequence"}
                                </p>
                            </SoftCard>
                        </div>
                        <div className="text-xs text-black/40 leading-relaxed bg-black/5 p-4 rounded-xl">
                            {path.mode === "SEQUENTIAL" ? (
                                <p><strong>Note:</strong> This path is designed to be completed in sequence. You must enroll in and complete each course individually.</p>
                            ) : (
                                <p><strong>Note:</strong> You must enroll in and complete each course individually. Course completion certificates will be issued separately for each milestone.</p>
                            )}
                        </div>
                    </Card>
                </div>
            </Container>
        </div>
    );
}
