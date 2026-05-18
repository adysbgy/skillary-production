import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, GradientButton } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

export const dynamic = "force-dynamic";

export default async function AdminCoursesPage(props: { searchParams: Promise<{ filter?: string }> }) {
    const searchParams = await props.searchParams;
    const filter = searchParams.filter || "ALL";
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        redirect("/dashboard");
    }

    // INSTRUCTOR sees only their own courses; ADMIN sees all
    const whereClause = role === "INSTRUCTOR" ? { instructorId: session.user.id } : {};

    const courses = await prisma.course.findMany({
        where: whereClause,
        orderBy: { updatedAt: "desc" },
        include: {
            _count: { select: { enrollments: true, modules: true } },
            instructor: { select: { name: true, email: true } },
        },
    });

    // Inline array filtering so we don't spam the DB with complex where clauses for small payloads
    const displayCourses = courses.filter(c => {
        if (filter === "DRAFTS" && c.status !== "DRAFT") return false;
        if (filter === "PUBLISHED" && c.status !== "PUBLISHED") return false;
        if (filter === "BLUEPRINTS" && c.status !== "TEMPLATE") return false;
        return true;
    });

    const activeTabBase = "px-4 py-2 text-sm font-semibold border-b-2 transition-colors ";
    const activeClass = activeTabBase + "border-[#FF8A00] text-[#FF8A00]";
    const inactiveClass = activeTabBase + "border-transparent text-black/50 hover:text-[#FF8A00] hover:border-[#FF8A00]/50";

    const renderCourseGrid = (coursesList: any[], showEmptyState = true) => {
        if (coursesList.length === 0 && showEmptyState) {
            return (
                <Card className="p-12 text-center border-dashed border-black/10">
                    <p className="text-black/40 font-medium">
                        No courses found in this section.
                    </p>
                </Card>
            );
        }
        if (coursesList.length === 0) return null;

        return (
            <div className="grid gap-4">
                {coursesList.map((course) => (
                    <Link key={course.id} href={`/admin/courses/${course.id}/edit`}>
                        <Card className="flex flex-col sm:flex-row sm:items-center justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-lg bg-[#FFFDF9] group gap-4 sm:gap-6" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-3 mb-1.5">
                                    <h3 className="text-base font-bold text-black/90 tracking-tight truncate group-hover:text-black transition-colors">{course.title}</h3>
                                    {course.status === "TEMPLATE" ? (
                                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 tracking-wider uppercase border border-indigo-100 shrink-0">Blueprint</span>
                                    ) : (
                                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md tracking-wider uppercase border shrink-0 ${course.status === 'PUBLISHED' ? 'bg-green-50 text-green-700 border-green-100' : course.status === 'ARCHIVED' ? 'bg-gray-100 text-gray-600 border-gray-200' : 'bg-[#FFF8F1] text-[#FF8A00] border-[#FF8A00]/20'}`}>
                                            {course.status}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-black/50 truncate font-medium flex items-center gap-2">
                                    <span>{course.category || "Uncategorized"}</span>
                                    <span className="w-1 h-1 rounded-full bg-black/20 shrink-0"></span>
                                    <span>{course._count.modules} modules</span>
                                    <span className="w-1 h-1 rounded-full bg-black/20 shrink-0"></span>
                                    <span>{course._count.enrollments} enrolled</span>
                                    {role === "ADMIN" && (course as any).instructor && (
                                        <>
                                            <span className="w-1 h-1 rounded-full bg-black/20 shrink-0" />
                                            <span className="text-black/40">{(course as any).instructor.name}</span>
                                        </>
                                    )}
                                </p>
                            </div>
                            <button className="px-5 py-2 text-xs font-bold rounded-lg bg-black/5 text-black/70 hover:opacity-90 transition-opacity sm:ml-4 shrink-0 shadow-sm border border-black/5 active:scale-95 w-full sm:w-auto mt-2 sm:mt-0" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))', color: 'white', borderColor: 'transparent' }}>
                                {course.status === "DRAFT" ? "Continue Draft →" : course.status === "TEMPLATE" ? "Edit Blueprint →" : "Manage →"}
                            </button>
                        </Card>
                    </Link>
                ))}
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4 border-b border-black/5 pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-black/90">
                        {role === "INSTRUCTOR" ? "Course Studio" : "Platform Courses"}
                    </h1>
                    <p className="text-sm text-black/50 mt-1 font-medium">Manage your educational catalog and templates.</p>
                </div>
                <div className="flex gap-3 shrink-0">
                    {role === "ADMIN" && (
                        <Link href="/admin/courses/new?template=true">
                            <button className="px-4 py-2 text-sm font-bold rounded-xl border border-black/10 bg-white text-black/60 hover:text-black hover:bg-black/5 transition-colors shadow-sm">
                                Create Blueprint
                            </button>
                        </Link>
                    )}
                    <Link href="/admin/courses/new">
                        <GradientButton className="px-6 py-2 rounded-xl text-sm shadow-md font-bold">+ New Course</GradientButton>
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-6 border-b border-black/10 mb-8 overflow-x-auto pb-1">
                <Link href="/admin/courses" scroll={false} className={filter === "ALL" ? activeClass : inactiveClass}>
                    All ({courses.length})
                </Link>
                <Link href="/admin/courses?filter=DRAFTS" scroll={false} className={filter === "DRAFTS" ? activeClass : inactiveClass}>
                    Drafts ({courses.filter(c => c.status === "DRAFT").length})
                </Link>
                <Link href="/admin/courses?filter=PUBLISHED" scroll={false} className={filter === "PUBLISHED" ? activeClass : inactiveClass}>
                    Published ({courses.filter(c => c.status === "PUBLISHED").length})
                </Link>
                {role === "ADMIN" && (
                    <Link href="/admin/courses?filter=BLUEPRINTS" scroll={false} className={filter === "BLUEPRINTS" ? activeClass : inactiveClass}>
                        Blueprints ({courses.filter(c => c.status === "TEMPLATE").length})
                    </Link>
                )}
            </div>

            {displayCourses.length === 0 ? (
                <Card className="p-16 text-center border-dashed border-black/10 bg-[#FAFAFA]">
                    <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">📚</div>
                    <h3 className="text-lg font-bold text-black/80 mb-1">No courses found</h3>
                    <p className="text-sm text-black/40 font-medium max-w-sm mx-auto mb-6">
                        {filter === "ALL" ? "You haven't created any courses yet. Start building your first learning experience." : `There are no courses matching the "${filter}" filter.`}
                    </p>
                    {filter === "ALL" && (
                        <Link href="/admin/courses/new">
                            <GradientButton className="px-6 py-2.5 rounded-xl text-sm font-bold">+ Create First Course</GradientButton>
                        </Link>
                    )}
                </Card>
            ) : (
                filter === "ALL" ? (
                    <div className="space-y-10">
                        {displayCourses.filter(c => c.status === "DRAFT").length > 0 && (
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-[#FF8A00] mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgb(255, 138, 0)' }}></span> In Progress
                                </h2>
                                {renderCourseGrid(displayCourses.filter(c => c.status === "DRAFT"), false)}
                            </section>
                        )}
                        {displayCourses.filter(c => c.status === "PUBLISHED").length > 0 && (
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-green-700 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Public Catalog
                                </h2>
                                {renderCourseGrid(displayCourses.filter(c => c.status === "PUBLISHED"), false)}
                            </section>
                        )}
                        {displayCourses.filter(c => c.status === "TEMPLATE").length > 0 && (
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-700 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> Admin Blueprints
                                </h2>
                                {renderCourseGrid(displayCourses.filter(c => c.status === "TEMPLATE"), false)}
                            </section>
                        )}
                        {displayCourses.filter(c => c.status === "ARCHIVED").length > 0 && (
                            <section>
                                <h2 className="text-xs font-bold uppercase tracking-widest text-black/40 mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black/20"></span> Archived
                                </h2>
                                {renderCourseGrid(displayCourses.filter(c => c.status === "ARCHIVED"), false)}
                            </section>
                        )}
                    </div>
                ) : (
                    renderCourseGrid(displayCourses, true)
                )
            )}
        </div>
    );
}
