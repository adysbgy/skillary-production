"use client";

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, GradientButton } from "@/components/ui/Button";
import { Fragment } from "react";

interface Lesson { id: string; title: string; slug: string; type: string; }
interface Module { id: string; title: string; lessons: Lesson[]; }
interface Progress { lessonId: string; completed: boolean; }
interface Course {
    id: string; title: string; description: string; level: string; slug: string;
    modules: Module[];
    status?: string | null;
}

export default function CourseOverviewClient({
    course,
    isEnrolled,
    progress = [],
    isPreview = false,
    isArchivedAccess = false,
    certificateCode
}: {
    course: Course,
    isEnrolled: boolean,
    progress: Progress[],
    isPreview?: boolean,
    isArchivedAccess?: boolean,
    certificateCode?: string
}) {
    const completedIds = new Set(progress.filter(p => p.completed).map(p => p.lessonId));

    // Pre-compute flat lessons list once (used for locking logic)
    const flatLessons = course.modules.flatMap(m => m.lessons);

    // Smart resume: find first incomplete lesson, fallback to first lesson
    let resumeSlug = "";
    for (const l of flatLessons) {
        if (!completedIds.has(l.id)) {
            resumeSlug = l.slug;
            break;
        }
    }
    if (!resumeSlug && flatLessons.length > 0) {
        resumeSlug = flatLessons[0].slug;
    }

    // Pre-compute per-module progress
    const moduleProgress = course.modules.map(mod => {
        const total = mod.lessons.length;
        const completed = mod.lessons.filter(l => completedIds.has(l.id)).length;
        const status: 'completed' | 'in-progress' | 'untouched' =
            total > 0 && completed === total ? 'completed' :
                completed > 0 ? 'in-progress' : 'untouched';
        return { total, completed, status };
    });

    return (
        <Fragment>
            {isPreview && (
                isArchivedAccess ? (
                    <div className="bg-black/80 text-white text-center py-2.5 px-4 text-sm font-medium tracking-wide shadow-md sticky top-0 z-50">
                        📁 This course is no longer publicly listed, but you still have full access as an enrolled learner.
                    </div>
                ) : (
                    <div className="bg-amber-500 text-black text-center py-2 px-4 text-sm font-bold tracking-wide shadow-md sticky top-0 z-50">
                        ⚠️ PREVIEW MODE: This course is currently {course.status || "DRAFT"}. Only you can see this.
                    </div>
                )
            )}
            {/* HERO SECTION */}
            <section className="relative overflow-hidden py-20 lg:py-28" style={{ background: 'rgb(255, 253, 249)', borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(to bottom, rgba(255, 138, 0, 0.03), transparent)' }} />

                <Container className="relative z-10 w-full pl-0">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>{course.level}</span>
                            <span className="text-black/60 text-sm font-medium">Self-Paced Program</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-semibold tracking-[-0.02em] leading-tight mb-6 text-black">
                            {course.title}
                        </h1>
                        <p className="text-lg text-black/70 leading-relaxed max-w-2xl mb-10">
                            {course.description || "Start your journey in mastering this subject with our expertly crafted curriculum."}
                        </p>

                        {!isEnrolled ? (
                            <form action="/api/enroll" method="POST">
                                <input type="hidden" name="courseId" value={course.id} />
                                <GradientButton type="submit" className="px-8 py-3.5 text-base border-none">
                                    Enroll Now
                                </GradientButton>
                            </form>
                        ) : completedIds.size === flatLessons.length && certificateCode ? (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Link href={`/certificate/${certificateCode}`}>
                                    <button className="px-8 py-3.5 text-base font-semibold rounded-2xl bg-green-500 text-white hover:bg-green-600 transition-colors shadow-lg w-full sm:w-auto">
                                        🎓 View Certificate
                                    </button>
                                </Link>
                                <Link href={resumeSlug ? `/learn/${course.slug}/${resumeSlug}` : "#"}>
                                    <button className="px-8 py-3.5 text-base font-semibold rounded-2xl bg-black/5 text-black hover:bg-black/10 transition-colors w-full sm:w-auto">
                                        Review Course
                                    </button>
                                </Link>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <Link href={resumeSlug ? `/learn/${course.slug}/${resumeSlug}` : "#"}>
                                    <GradientButton className="px-8 py-3.5 text-base w-full sm:w-auto border-none">
                                        Resume Learning
                                    </GradientButton>
                                </Link>
                                <span className="text-sm font-medium text-green-400 bg-green-400/10 px-4 py-2.5 rounded-xl border border-green-400/20 text-center sm:text-left">
                                    ✓ Actively Enrolled
                                </span>
                            </div>
                        )}
                    </div>
                </Container>
            </section>

            {/* CURRICULUM SECTION */}
            <section className="py-20 bg-[#FFFDF9] min-h-[50vh]">
                <Container className="pl-0">
                    <div className="max-w-3xl mx-auto md:mx-0">
                        <div className="flex items-center justify-between border-b border-black/10 pb-4 mb-8">
                            <h2 className="text-2xl font-semibold tracking-tight">Course Syllabus</h2>
                            <div className="flex items-center gap-3">
                                {isEnrolled && (
                                    <span className="text-xs font-semibold text-black/40">
                                        {flatLessons.filter(l => completedIds.has(l.id)).length}/{flatLessons.length} complete
                                    </span>
                                )}
                                <span className="text-sm text-black/50 font-medium">{course.modules.length} Modules</span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {course.modules.length === 0 ? (
                                <div className="text-center p-12 bg-white rounded-2xl border border-black/5 text-black/40 font-medium">
                                    Curriculum is currently being structured by our instructors.
                                </div>
                            ) : (
                                course.modules.map((mod, index) => {
                                    const mp = moduleProgress[index];
                                    const headerBg = mp.status === 'completed' ? 'bg-green-50/80' :
                                        mp.status === 'in-progress' ? 'bg-[#FFFDF9]' : 'bg-white';
                                    const headerBorder = mp.status === 'completed' ? 'border-green-200/60' : 'border-black/5';

                                    return (
                                        <Card key={mod.id} className={`p-0 overflow-hidden shadow-sm border-black/5 bg-white transition hover:shadow-md ${mp.status === 'completed' ? 'border-green-200/40' : ''}`}>
                                            <div className={`${headerBg} border-b ${headerBorder} px-6 py-5`}>
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center gap-2.5">
                                                        {mp.status === 'completed' && (
                                                            <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] shrink-0">✓</span>
                                                        )}
                                                        <h3 className="font-semibold text-lg text-black/90">Module {index + 1}: {mod.title}</h3>
                                                    </div>
                                                    <span className="text-xs font-semibold text-black/40 shrink-0 ml-3">
                                                        {isEnrolled ? `${mp.completed}/${mp.total}` : `${mp.total} Lessons`}
                                                    </span>
                                                </div>
                                                {isEnrolled && mp.total > 0 && (
                                                    <div className="mt-3 h-1 w-full bg-black/5 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full rounded-full transition-all duration-500 ${mp.status === 'completed' ? 'bg-green-500' : ''}`}
                                                            style={mp.status === 'completed' ? { width: `${Math.round((mp.completed / mp.total) * 100)}%` } : { width: `${Math.round((mp.completed / mp.total) * 100)}%`, background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="divide-y divide-black/5">
                                                {mod.lessons.map((lesson) => {
                                                    const flatIndex = flatLessons.findIndex(l => l.id === lesson.id);
                                                    const prevLessonId = flatIndex > 0 ? flatLessons[flatIndex - 1].id : null;
                                                    const isDone = completedIds.has(lesson.id);

                                                    const sequenceUnlocked = flatIndex === 0 || (prevLessonId && completedIds.has(prevLessonId));
                                                    const isClickable = isEnrolled && (sequenceUnlocked || isPreview);

                                                    return isClickable ? (
                                                        <Link href={`/learn/${course.slug}/${lesson.slug}`} key={lesson.id} className="group block px-6 py-4 hover:bg-black/[0.02] transition-colors">
                                                            <LessonRow lesson={lesson} index={flatIndex} isDone={isDone} />
                                                        </Link>
                                                    ) : (
                                                        <div key={lesson.id} className="px-6 py-4 opacity-50">
                                                            <LessonRow lesson={lesson} index={flatIndex} isDone={false} locked={true} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </Card>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </Container>
            </section>
        </Fragment>
    );
}

function LessonRow({ lesson, index, isDone, locked = false }: { lesson: Lesson, index: number, isDone: boolean, locked?: boolean }) {
    return (
        <div className="flex items-center gap-4">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors border ${isDone ? 'bg-green-500 border-green-500 text-white' : locked ? 'bg-black/[0.03] border-black/10 text-black/30' : 'bg-transparent border-black/15 text-black/60 group-hover:bg-[#FFF8F1] group-hover:border-[#FF8A00] group-hover:text-[#FF8A00]'}`}>
                {locked ? "🔒" : (isDone ? "✓" : index + 1)}
            </div>
            <div className="flex-1">
                <h4 className={`text-sm font-medium transition-colors ${locked ? 'text-black/40' : 'text-black/90 group-hover:text-[#FF8A00]'}`}>{lesson.title}</h4>
                <div className="flex items-center gap-2 mt-1">
                    <p className="text-[10px] font-bold text-black/40 uppercase tracking-widest">{lesson.type}</p>
                    {locked && (
                        <span className="text-[10px] text-black/30 font-medium">· Complete previous lesson to unlock</span>
                    )}
                </div>
            </div>
            {!locked && (
                <div className="opacity-0 group-hover:opacity-100 text-xs text-[#FF8A00] font-medium transition-opacity">
                    {isDone ? 'Review' : 'Start'} <span className="ml-1">→</span>
                </div>
            )}
        </div>
    );
}
