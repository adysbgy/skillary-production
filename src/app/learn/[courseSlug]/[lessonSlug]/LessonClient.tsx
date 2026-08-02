"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GradientButton } from "@/components/ui/Button";
import { MarkdownRenderer } from "@/components/ui/MarkdownRenderer";
import { isValidVideoDomain } from "@/lib/video";

// Assessment Foundations 2.0 Typings
type QuestionType = "SINGLE_CHOICE" | "MULTIPLE_SELECTION" | "SHORT_ANSWER";
interface QuizQuestionItem {
    id: string;
    type: QuestionType;
    prompt: string;
    options?: string[];
    correctAnswers?: string[];
}
interface QuizSettings {
    passingScore: number;
    maxAttempts: number | null;
    showScore: boolean;
    showAnswers: boolean;
    isRequiredToContinue?: boolean;
}
interface QuizDataPayload {
    settings: QuizSettings;
    questions: QuizQuestionItem[];
}
interface QuizFeedbackItem {
    correct: boolean;
    correctAnswers?: string[];
}
interface LessonResource { id: string; filename: string; url: string; fileType: string; fileSize: number; }
interface BaseLesson {
    id: string; title: string; slug: string; type: string; content: string; videoUrl: string | null; quizData?: string | null;
    resources?: LessonResource[];
}
interface BaseModule {
    id: string; title: string; lessons: BaseLesson[];
}
interface Progress { lessonId: string; completed: boolean; }
interface Course {
    title: string; slug: string; modules: BaseModule[];
}

export default function LessonClient({
    course, lesson, progress, allSlugs, certificateCode: initialCertificateCode, isOwnerOrAdmin
}: {
    course: Course; lesson: BaseLesson; progress: Progress[]; allSlugs: string[]; certificateCode?: string; isOwnerOrAdmin?: boolean;
}) {
    const router = useRouter();
    const [isMarking, setIsMarking] = useState(false);
    const [courseCompleted, setCourseCompleted] = useState(false);

    // VIDEO soft time-on-page gate (30s)
    const VIDEO_GATE_SECONDS = 30;
    const isVideo = lesson.type === "VIDEO";
    const [videoGateRemaining, setVideoGateRemaining] = useState(isVideo ? VIDEO_GATE_SECONDS : 0);
    const gateTimer = useRef<ReturnType<typeof setInterval> | null>(null);
    useEffect(() => {
        if (!isVideo) return;
        setVideoGateRemaining(VIDEO_GATE_SECONDS);
        gateTimer.current = setInterval(() => {
            setVideoGateRemaining(prev => {
                if (prev <= 1) { if (gateTimer.current) clearInterval(gateTimer.current); return 0; }
                return prev - 1;
            });
        }, 1000);
        return () => { if (gateTimer.current) clearInterval(gateTimer.current); };
    }, [lesson.id, isVideo]);
    const videoGateActive = isVideo && videoGateRemaining > 0;
    const [certificateCode, setCertificateCode] = useState<string | null>(initialCertificateCode || null);

    // Quiz state (Assessment Foundations 2.0)
    const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
    const [submitted, setSubmitted] = useState(false);
    const [quizSaving, setQuizSaving] = useState(false);
    const [savedScore, setSavedScore] = useState<{ score: number; total: number; passed: boolean; percentage: number, attemptsCount?: number } | null>(null);
    const [attemptsUsed, setAttemptsUsed] = useState(0);
    const [quizFeedback, setQuizFeedback] = useState<Record<string, QuizFeedbackItem>>({});
    const [quizError, setQuizError] = useState<string | null>(null);

    const payload: QuizDataPayload = useMemo(() => {
        const fallback: QuizDataPayload = { settings: { passingScore: 80, maxAttempts: null, showScore: true, showAnswers: true }, questions: [] };
        if (lesson.type !== "QUIZ" || !lesson.quizData) return fallback;
        let parsed: unknown;
        try { parsed = JSON.parse(lesson.quizData); } catch { return fallback; }
        if (Array.isArray(parsed)) {
            const questions = parsed.flatMap((item, index): QuizQuestionItem[] => {
                if (typeof item !== "object" || item === null || !("question" in item) || typeof item.question !== "string") return [];
                const options = "options" in item && Array.isArray(item.options) && item.options.every((option: unknown) => typeof option === "string") ? item.options as string[] : [];
                return [{ id: `legacy-${index}`, type: "SINGLE_CHOICE", prompt: item.question, options }];
            });
            return { ...fallback, questions };
        }
        if (typeof parsed !== "object" || parsed === null) return fallback;
        const settings = "settings" in parsed && typeof parsed.settings === "object" && parsed.settings !== null ? parsed.settings : {};
        const questions = "questions" in parsed && Array.isArray(parsed.questions) ? parsed.questions as QuizQuestionItem[] : [];
        return { settings: { ...fallback.settings, ...settings }, questions };
    }, [lesson.quizData, lesson.type]);


    // Fetch best previous attempt on mount
    useEffect(() => {
        if (lesson.type === "QUIZ") {
            fetch(`/api/quiz?lessonId=${lesson.id}`)
                .then(r => r.json())
                .then(d => {
                    if (d.attempt) {
                        setSavedScore({ score: d.attempt.score, total: d.attempt.totalQuestions, passed: d.attempt.passed, percentage: d.attempt.percentage });
                        if (d.attempt.answers && typeof d.attempt.answers === "object") setAnswers(d.attempt.answers);
                        if (d.feedback && typeof d.feedback === "object") setQuizFeedback(d.feedback);
                        setSubmitted(true);
                    }
                    if (typeof d.count === "number") setAttemptsUsed(d.count);
                })
                .catch(() => { });
        }
    }, [lesson.id, lesson.type]);

    // Determine highest unlocked sequential index
    const flatLessons = course.modules.flatMap(m => m.lessons);
    const firstIncompleteIdx = flatLessons.findIndex(l => !progress.some(p => p.lessonId === l.id && p.completed));
    const maxUnlockedIdx = isOwnerOrAdmin || firstIncompleteIdx === -1 ? flatLessons.length : firstIncompleteIdx;

    const isCompleted = progress.some(p => p.lessonId === lesson.id && p.completed);
    const currentIndex = allSlugs.indexOf(lesson.slug);
    const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
    const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

    async function handleMarkComplete() {
        if (isCompleted || isMarking) return;
        setIsMarking(true);
        try {
            const res = await fetch("/api/progress", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ lessonId: lesson.id, courseSlug: course.slug }),
            });
            const data = await res.json();
            router.refresh();

            if (data.courseCompleted) {
                setCourseCompleted(true);
                setCertificateCode(data.certificateCode || null);
            } else if (nextSlug) {
                setTimeout(() => router.push(`/learn/${course.slug}/${nextSlug}`), 600);
            }
        } finally {
            setIsMarking(false);
        }
    }

    return (
        <>
            {/* === COURSE COMPLETION CELEBRATION MODAL === */}
            {courseCompleted && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="relative w-full max-w-lg mx-4 bg-[#FFFDF9] rounded-3xl shadow-2xl border border-black/10 overflow-hidden">
                        {/* Top accent */}
                        <div className="h-2 w-full" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }} />

                        <div className="p-10 text-center">
                            <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 border-2" style={{ background: 'rgba(255, 138, 0, 0.1)', borderColor: 'rgba(255, 138, 0, 0.2)' }}>
                                <span className="text-4xl">🎓</span>
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight text-black mb-2">Course Completed!</h2>
                            <p className="text-black/60 text-sm leading-relaxed max-w-sm mx-auto mb-2">
                                You&apos;ve successfully finished every lesson in
                            </p>
                            <p className="text-lg font-semibold text-black/90 mb-8 leading-snug">{course.title}</p>

                            {certificateCode && (
                                <div className="mb-4">
                                    <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'rgb(255, 138, 0)' }}>Certificate Unlocked</p>
                                    <Link href={`/certificate/${certificateCode}`}>
                                        <button className="w-full px-8 py-4 bg-black text-white font-semibold rounded-2xl text-sm hover:bg-black/90 transition-colors shadow-lg">
                                            View Your Certificate →
                                        </button>
                                    </Link>
                                </div>
                            )}

                            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                                <Link href="/dashboard" className="flex-1">
                                    <button className="w-full px-6 py-3 rounded-xl border border-black/10 text-sm font-medium text-black/70 hover:bg-black/5 transition-colors">
                                        Back to Dashboard
                                    </button>
                                </Link>
                                <Link href="/explore" className="flex-1">
                                    <button className="w-full px-6 py-3 rounded-xl border border-black/10 text-sm font-medium text-black/70 hover:bg-black/5 transition-colors">
                                        Browse Courses
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row min-h-screen bg-[#FFFDF9]">
                {/* SIDEBAR NAVIGATION */}
                <aside className="w-full lg:w-80 shrink-0 bg-white border-r border-black/5 overflow-y-auto h-auto lg:h-[100dvh] lg:sticky top-0 order-2 lg:order-1 flex flex-col shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
                    <div className="p-6 border-b border-black/5 bg-[#FFF8EC]">
                        <div className="flex items-center gap-2 mb-3">
                            <Link href={`/learn/${course.slug}`} className="text-xs uppercase font-bold tracking-wider text-black/40 hover:text-black transition-colors">← Overview</Link>
                        </div>
                        <h2 className="font-bold text-lg leading-tight tracking-tight">{course.title}</h2>
                        <div className="h-1.5 w-full bg-black/5 rounded-full mt-4 overflow-hidden">
                            <div className="h-full transition-all duration-500" style={{ width: `${Math.round((progress.filter(p => p.completed).length / allSlugs.length) * 100)}%`, background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }} />
                        </div>
                    </div>
                    <div className="py-2 flex-1 overflow-y-auto">
                        {course.modules.map((mod, i) => {
                            const modCompleted = mod.lessons.filter(l => progress.some(p => p.lessonId === l.id && p.completed)).length;
                            const modTotal = mod.lessons.length;
                            const modDone = modTotal > 0 && modCompleted === modTotal;
                            return (
                                <div key={mod.id} className="mb-2">
                                    <div className={`px-6 py-3 sticky top-0 z-10 border-b border-black/5 ${modDone ? 'bg-green-50/90' : 'bg-white/95'} backdrop-blur`}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                {modDone && <span className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center text-white text-[7px] shrink-0">✓</span>}
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-black/50">{i + 1}. {mod.title}</h3>
                                            </div>
                                            <span className="text-[10px] font-bold text-black/30">{modCompleted}/{modTotal}</span>
                                        </div>
                                        {modTotal > 0 && (
                                            <div className="mt-2 h-0.5 w-full bg-black/5 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full transition-all duration-500 ${modDone ? 'bg-green-500' : ''}`} style={modDone ? { width: `${Math.round((modCompleted / modTotal) * 100)}%` } : { width: `${Math.round((modCompleted / modTotal) * 100)}%`, background: 'rgb(255, 138, 0)' }} />
                                            </div>
                                        )}
                                    </div>
                                    <ul className="flex flex-col">
                                        {mod.lessons.map(l => {
                                            const isActive = l.id === lesson.id;
                                            const done = progress.some(p => p.lessonId === l.id && p.completed);
                                            const lIndex = allSlugs.indexOf(l.slug);
                                            const isLocked = !isOwnerOrAdmin && lIndex > maxUnlockedIdx;

                                            return (
                                                <li key={l.id}>
                                                    <Link href={isLocked ? "#" : `/learn/${course.slug}/${l.slug}`}
                                                        className={`flex items-center px-6 py-3.5 text-sm transition-colors border-l-2 ${isLocked ? 'cursor-not-allowed opacity-60 bg-black/[0.01] border-transparent' : isActive ? 'bg-[#FFFDF9] border-[#FF8A00] font-semibold text-black' : 'border-transparent text-black/60 hover:bg-black/[0.02] hover:text-black font-medium'}`}>
                                                        <span className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mr-3 border text-[9px] transition-colors ${isLocked ? 'border-transparent bg-transparent text-black/40 text-[11px]' : done ? 'bg-green-500 border-green-500 text-white' : isActive ? 'border-[#FF8A00] bg-white text-[#FF8A00]' : 'border-black/20 bg-transparent text-transparent'}`}>
                                                            {isLocked ? '🔒' : '✓'}
                                                        </span>
                                                        <span className="line-clamp-2">{l.title}</span>
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* MAIN PLAYER VIEW */}
                <main className="flex-1 lg:max-h-[100dvh] lg:overflow-y-auto order-1 lg:order-2 bg-[#FFFDF9]">
                    <div className="max-w-4xl mx-auto px-6 py-10 lg:py-16">
                        <div className="mb-8 border-b border-black/5 pb-8">
                            <span className="inline-block px-3 py-1 rounded-md bg-black/5 text-black/50 text-xs font-bold tracking-widest uppercase mb-4">{lesson.type}</span>
                            <h1 className="text-3xl lg:text-4xl font-semibold tracking-[-0.02em] leading-tight text-black mb-2">{lesson.title}</h1>
                        </div>

                        {lesson.type === "VIDEO" && lesson.videoUrl && (
                            <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-12 shadow-2xl flex items-center justify-center border border-black/10 relative group">
                                {isValidVideoDomain(lesson.videoUrl) ? (
                                    <iframe src={lesson.videoUrl} className="w-full h-full" allowFullScreen allow="autoplay; fullscreen" />
                                ) : (
                                    <div className="text-center p-8 bg-zinc-900 w-full h-full flex flex-col items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-4 border border-red-500/30">
                                            <span className="text-xl">⚠️</span>
                                        </div>
                                        <p className="text-white/80 font-medium mb-2">Unsupported Video Source</p>
                                        <p className="text-white/40 text-xs mb-4 max-w-sm">
                                            This video URL is from an unsupported domain. Please use a supported embed link (YouTube, Vimeo, Loom, Google Drive, or Wistia).
                                        </p>
                                        <a href={lesson.videoUrl} target="_blank" className="text-[rgb(255,138,0)] hover:underline text-xs bg-white/5 px-4 py-2 rounded-lg truncate max-w-xs">{lesson.videoUrl}</a>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* === QUIZ RENDERER (Assessment Foundations 2.0) === */}
                        {lesson.type === "QUIZ" && payload.questions.length > 0 && (
                            <div className="mb-16 space-y-6">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full flex items-center justify-center text-white text-lg border-4 border-white shadow-sm font-bold" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>?</div>
                                        <div>
                                            <h2 className="text-xl font-bold tracking-tight">Quiz Assessment</h2>
                                            <p className="text-xs text-black/50 font-medium">{payload.questions.length} Question{payload.questions.length !== 1 ? "s" : ""} • Passing score: {payload.settings.passingScore}%</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        {payload.settings.maxAttempts !== null ? (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', borderColor: 'rgba(255, 138, 0, 0.2)' }}>
                                                Attempts: {attemptsUsed} / {payload.settings.maxAttempts}
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black/5 text-black/50 text-xs font-bold rounded-lg border border-black/5">
                                                Unlimited Attempts
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-8">
                                    {payload.questions.map((q, qi) => {
                                        const userAnswer = answers[q.id];
                                        const feedback = quizFeedback[q.id];
                                        const hasQuestionFeedback = submitted && payload.settings.showAnswers && feedback !== undefined;
                                        const isCorrect = hasQuestionFeedback && feedback.correct;
                                        const isWrong = hasQuestionFeedback && !feedback.correct;
                                        const correctAnswers = feedback?.correctAnswers || [];

                                        return (
                                            <div key={q.id} className={`p-6 md:p-8 rounded-3xl border transition-all shadow-sm relative ${submitted ? (isCorrect ? 'border-green-300 bg-green-50/40' : isWrong ? 'border-red-200 bg-red-50/20' : 'border-black/10 bg-white') : 'border-black/10 bg-white'}`}>

                                                {/* Post-submit indicator tag */}
                                                {submitted && payload.settings.showAnswers && (
                                                    <div className={`absolute top-0 right-6 -translate-y-1/2 px-3 py-1 rounded-full text-[10px] font-bold border shadow-sm ${isCorrect ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                                        {isCorrect ? '✓ Correct' : '✕ Incorrect'}
                                                    </div>
                                                )}

                                                <h3 className="font-semibold text-lg text-black/90 leading-snug mb-5">
                                                    <span className="text-[#FF8A00] mr-2 text-[15px] align-baseline">Q{qi + 1}.</span>{q.prompt}
                                                </h3>

                                                {/* SINGLE / MULTI SELECT RENDERER */}
                                                {(q.type === "SINGLE_CHOICE" || q.type === "MULTIPLE_SELECTION") && (
                                                    <div className="space-y-2.5">
                                                        {q.options?.map((opt, oi) => {
                                                            const isSelectedSingle = q.type === "SINGLE_CHOICE" && userAnswer === oi.toString();
                                                            const isSelectedMulti = q.type === "MULTIPLE_SELECTION" && Array.isArray(userAnswer) && userAnswer.includes(oi.toString());
                                                            const isSelected = isSelectedSingle || isSelectedMulti;

                                                            const isOptCorrectAns = correctAnswers.includes(oi.toString());
                                                            const showCorrect = submitted && payload.settings.showAnswers && isOptCorrectAns;
                                                            const showMissed = submitted && payload.settings.showAnswers && isOptCorrectAns && !isSelected;
                                                            const showWrong = submitted && payload.settings.showAnswers && isSelected && !isOptCorrectAns;

                                                            return (
                                                                <button
                                                                    key={oi}
                                                                    disabled={submitted}
                                                                    onClick={() => {
                                                                        if (q.type === "SINGLE_CHOICE") {
                                                                            setAnswers(prev => ({ ...prev, [q.id]: oi.toString() }));
                                                                        } else if (q.type === "MULTIPLE_SELECTION") {
                                                                            setAnswers(prev => {
                                                                                const current = new Set(Array.isArray(prev[q.id]) ? prev[q.id] : []);
                                                                                if (current.has(oi.toString())) current.delete(oi.toString()); else current.add(oi.toString());
                                                                                return { ...prev, [q.id]: Array.from(current) };
                                                                            });
                                                                        }
                                                                    }}
                                                                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-4 ${showCorrect ? 'border-green-400 bg-green-50 text-green-800 font-medium' :
                                                                        showWrong ? 'border-red-300 bg-red-50 text-red-800' :
                                                                            showMissed ? 'border-yellow-300 bg-yellow-50 text-yellow-800' :
                                                                                isSelected ? 'border-[#FF8A00] bg-[#FFFDF9] font-semibold text-black shadow-[inset_0_0_0_1px_#FF8A00]' :
                                                                                    'border-black/10 hover:border-black/30 hover:bg-black/[0.01]'
                                                                        }`}
                                                                >
                                                                    <div className={`w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center transition-colors ${q.type === "MULTIPLE_SELECTION" ? 'rounded border-2' : 'rounded-full border-2'} ${showCorrect ? 'border-green-500 bg-green-500 text-white' : showWrong ? 'border-red-500 bg-red-500 text-white' : showMissed ? 'border-yellow-500 bg-yellow-50 text-yellow-500' : isSelected ? 'border-[#FF8A00] bg-[#FF8A00] text-white' : 'border-black/20 bg-white'}`}>
                                                                        {showCorrect || (showMissed && q.type === "MULTIPLE_SELECTION") ? <span className="text-[12px] font-bold">✓</span> : showWrong ? <span className="text-[11px] font-bold">✕</span> : isSelected ? <span className={`w-2 h-2 ${q.type === "MULTIPLE_SELECTION" ? 'rounded-sm' : 'rounded-full'} bg-white`}></span> : null}
                                                                    </div>
                                                                    <span className="leading-snug">{opt}</span>
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                )}

                                                {/* SHORT ANSWER RENDERER */}
                                                {q.type === "SHORT_ANSWER" && (
                                                    <div className="space-y-3">
                                                        <input
                                                            type="text"
                                                            value={userAnswer || ""}
                                                            onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                                                            disabled={submitted}
                                                            placeholder="Type your exact answer here..."
                                                            className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-colors ${submitted && payload.settings.showAnswers ? (isCorrect ? 'border-green-400 bg-green-50 text-green-800 font-semibold disabled:opacity-100' : 'border-red-300 bg-red-50 text-red-800 disabled:opacity-100') : 'border-black/10 focus:border-[#FF8A00]'}`}
                                                        />
                                                        {submitted && payload.settings.showAnswers && !isCorrect && (
                                                            <div className="text-xs bg-black/5 p-3 rounded-lg border border-black/5">
                                                                <span className="font-semibold text-black/60 mr-2">Acceptable answers:</span>
                                                                <span className="font-mono text-[#FF8A00]">{correctAnswers.join("  OR  ")}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* SUBMISSION BLOCK */}
                                {!submitted ? (
                                    <div className="flex flex-col items-center pt-6 pb-2">
                                        <button
                                            onClick={async () => {
                                                setQuizSaving(true);
                                                setQuizError(null);

                                                try {
                                                    const res = await fetch("/api/quiz", {
                                                        method: "POST",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify({ lessonId: lesson.id, answers }),
                                                    });
                                                    const data = await res.json();
                                                    if (!res.ok) {
                                                        setQuizError(typeof data.error === "string" ? data.error : "Your answers could not be submitted. Please try again.");
                                                        return;
                                                    }
                                                    setSavedScore({ score: data.score, total: data.totalQuestions, passed: data.passed, percentage: data.percentage });
                                                    setAttemptsUsed(typeof data.attemptsCount === "number" ? data.attemptsCount : attemptsUsed + 1);
                                                    setQuizFeedback(data.feedback && typeof data.feedback === "object" ? data.feedback : {});
                                                    setSubmitted(true);
                                                } catch {
                                                    setQuizError("The assessment service is unavailable. Your answers are preserved; please try again.");
                                                } finally {
                                                    setQuizSaving(false);
                                                }
                                            }}
                                            disabled={Object.keys(answers).length < payload.questions.length || quizSaving}
                                            className="px-10 py-5 text-white rounded-2xl text-base font-bold hover:opacity-90 transition-all active:scale-95 shadow-lg w-full md:w-auto min-w-[240px]"
                                            style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
                                        >
                                            {quizSaving ? "Evaluating..." : "Submit Answer"}
                                        </button>
                                        {quizError && (
                                            <p role="alert" className="mt-4 max-w-xl rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm font-medium text-red-800">
                                                {quizError}
                                            </p>
                                        )}
                                    </div>
                                ) : (
                                    <div className={`p-8 rounded-3xl border-2 shadow-sm text-center flex flex-col items-center transition-all ${savedScore?.passed ? 'border-[#FF8A00] bg-[#FF8A00]/5' : 'border-black/10 bg-black/[0.02]'}`}>
                                        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 border-4 mb-2 ${savedScore?.passed ? 'bg-[#FF8A00] border-[#FF8A00]/20 text-white' : 'bg-black/10 border-white text-black/40'}`}>
                                            <span className="text-2xl font-bold">{savedScore?.passed ? '✓' : '✕'}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold tracking-tight text-black mb-2">{savedScore?.passed ? 'Assessment Passed!' : 'Assessment Failed'}</h3>

                                        {payload.settings.showScore ? (
                                            <p className="text-black/60 font-medium mb-6">You scored <span className="text-black font-bold">{savedScore?.percentage}%</span> (Passing is {payload.settings.passingScore}%).</p>
                                        ) : (
                                            <p className="text-black/60 font-medium mb-6">Your submission has been recorded.</p>
                                        )}

                                        {!savedScore?.passed && (!payload.settings.maxAttempts || attemptsUsed < payload.settings.maxAttempts) && (
                                            <button
                                                onClick={() => {
                                                    setSubmitted(false);
                                                    setAnswers({});
                                                    setSavedScore(null);
                                                    setQuizFeedback({});
                                                    setQuizError(null);
                                                }}
                                                className="px-8 py-3 bg-white border border-black/10 rounded-xl text-sm font-bold shadow-sm hover:border-black/20 hover:bg-black/5 transition-all text-black/70 mb-2"
                                            >
                                                Retry Assessment
                                            </button>
                                        )}

                                        {!savedScore?.passed && payload.settings.maxAttempts && attemptsUsed >= payload.settings.maxAttempts && (
                                            <div className="mt-2 text-center">
                                                <p className="text-[#FF8A00] font-bold text-sm bg-[#FF8A00]/10 px-4 py-2 rounded-lg border border-[#FF8A00]/20">Maximum attempts reached.</p>
                                                {payload.settings.isRequiredToContinue === true && (
                                                    <p className="text-xs text-black/50 mt-2">You cannot progress without passing this required assessment.</p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="max-w-none mb-16 font-sans">
                            {lesson.content ? (
                                <MarkdownRenderer content={lesson.content} />
                            ) : (
                                <div className="p-8 border border-dashed border-black/10 rounded-2xl text-center">
                                    <p className="italic text-black/40 font-medium">No text content provided for this lesson.</p>
                                </div>
                            )}
                        </div>

                        {/* === LESSON RESOURCES === */}
                        {lesson.resources && lesson.resources.length > 0 && (
                            <div className="mb-12 p-6 rounded-2xl border border-black/10 bg-white shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-lg">📎</span>
                                    <h3 className="font-semibold text-sm text-black/70">Lesson Resources</h3>
                                </div>
                                <div className="space-y-2">
                                    {lesson.resources.map(r => (
                                        <a
                                            key={r.id}
                                            href={r.url}
                                            download={r.filename}
                                            target="_blank"
                                            className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] hover:bg-black/[0.05] border border-black/5 transition-colors group"
                                        >
                                            <span className="text-sm">
                                                {r.fileType.includes('pdf') ? '📄' : r.fileType.includes('image') ? '🖼️' : r.fileType.includes('zip') ? '📦' : r.fileType.includes('presentation') ? '📊' : r.fileType.includes('spreadsheet') ? '📈' : '📎'}
                                            </span>
                                            <span className="flex-1 text-sm font-medium text-black/70 group-hover:text-[#FF8A00] transition-colors truncate">{r.filename}</span>
                                            <span className="text-[11px] text-black/30 shrink-0">
                                                {r.fileSize < 1024 ? `${r.fileSize} B` : r.fileSize < 1024 * 1024 ? `${(r.fileSize / 1024).toFixed(1)} KB` : `${(r.fileSize / (1024 * 1024)).toFixed(1)} MB`}
                                            </span>
                                            <span className="text-xs text-black/30 group-hover:text-[#FF8A00] transition-colors">↓</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {courseCompleted || (progress.filter(p => p.completed).length === allSlugs.length) ? (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 lg:p-8 border border-green-500/20 rounded-3xl bg-green-50/50 shadow-sm mt-16">
                                <div className="flex-1 text-center sm:text-left">
                                    <h4 className="font-semibold text-lg text-green-900 mb-1">🎉 You&apos;ve completed this course!</h4>
                                    <p className="text-sm text-green-700/80">Excellent work. Your progress has been completely recorded.</p>
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    {certificateCode ? (
                                        <Link href={`/certificate/${certificateCode}`} className="w-full sm:w-auto flex">
                                            <button className="w-full px-8 py-3 rounded-xl bg-green-600 text-white font-bold text-sm hover:bg-green-700 transition-colors shadow-md">
                                                🎓 View Certificate
                                            </button>
                                        </Link>
                                    ) : (
                                        <Link href="/dashboard" className="w-full sm:w-auto flex">
                                            <button className="w-full px-8 py-3 rounded-xl bg-green-100 text-green-800 font-bold text-sm hover:bg-green-200 transition-colors">
                                                🎓 View Dashboard
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 lg:p-8 border border-black/10 rounded-3xl bg-white shadow-sm mt-16">
                                <div className="flex-1 text-center sm:text-left">
                                    <h4 className="font-semibold text-lg text-black mb-1">{isVideo ? "Finished watching?" : "Ready to move on?"}</h4>
                                    <p className="text-sm text-black/50">
                                        {isVideo
                                            ? videoGateActive
                                                ? `Take your time with the video. Complete available in ${videoGateRemaining}s`
                                                : "Mark this lesson complete once you\u2019ve finished the video."
                                            : "Mark this lesson as complete to track your progress."
                                        }
                                    </p>
                                </div>
                                <div className="flex gap-3 w-full sm:w-auto">
                                    <GradientButton
                                        onClick={handleMarkComplete}
                                        disabled={isCompleted || isMarking || videoGateActive || (lesson.type === "QUIZ" && payload?.settings?.isRequiredToContinue === true && !savedScore?.passed)}
                                        className={`w-full sm:w-auto px-8 py-3 transition-all ${isCompleted ? '!bg-green-500 !text-white opacity-100 cursor-default' : ''} ${videoGateActive ? '!opacity-50 !cursor-not-allowed' : ''} ${lesson.type === "QUIZ" && payload?.settings?.isRequiredToContinue === true && !savedScore?.passed ? '!opacity-50 !cursor-not-allowed !bg-black/10 !text-black/50' : ''}`}
                                    >
                                        {isMarking ? "Saving..." : isCompleted ? "✓ Lesson Completed" : (lesson.type === "QUIZ" && payload?.settings?.isRequiredToContinue === true && !savedScore?.passed) ? "Pass Required to Continue" : isVideo ? "I\u2019ve Watched This \u2014 Mark Complete" : "Mark as Complete"}
                                    </GradientButton>
                                    {nextSlug && isCompleted && (
                                        <Link href={`/learn/${course.slug}/${nextSlug}`} className="shrink-0 hidden sm:block">
                                            <button className="h-full px-8 flex items-center justify-center rounded-xl bg-black/5 font-semibold transition hover:bg-black/10 text-black">
                                                Continue →
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Bottom Navigation */}
                        <div className="flex justify-between items-center mt-12 pt-6">
                            {prevSlug ? (
                                <Link href={`/learn/${course.slug}/${prevSlug}`} className="text-sm font-medium text-black/50 hover:text-black transition-colors">← Previous Lesson</Link>
                            ) : <div />}
                            {nextSlug ? (
                                (() => {
                                    const nIdx = allSlugs.indexOf(nextSlug);
                                    const locked = !isOwnerOrAdmin && nIdx > maxUnlockedIdx;
                                    return (
                                        <Link href={locked ? "#" : `/learn/${course.slug}/${nextSlug}`} className={`text-sm font-semibold transition-colors ${locked ? 'text-black/30 cursor-not-allowed' : 'text-[#FF8A00] hover:text-[#FF5A5F]'}`}>
                                            {locked ? '🔒 Locked' : 'Next Lesson →'}
                                        </Link>
                                    );
                                })()
                            ) : <div />}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
