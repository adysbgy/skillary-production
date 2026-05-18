"use client";

import { useState } from "react";
import { PrimaryButton } from "@/components/ui/Button";

interface QuizLesson {
    id: string;
    title: string;
    moduleTitle: string;
}

export default function ResetQuizAttempts({ quizzes }: { quizzes: QuizLesson[] }) {
    const [email, setEmail] = useState("");
    const [lessonId, setLessonId] = useState(quizzes[0]?.id || "");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    if (quizzes.length === 0) return null;

    async function handleReset(e: React.FormEvent) {
        e.preventDefault();
        if (!email || !lessonId) return;

        setStatus("loading");
        try {
            const res = await fetch("/api/admin/quiz/reset", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, lessonId }),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus("success");
                setMessage(data.message);
                setEmail("");
            } else {
                setStatus("error");
                setMessage(data.error || "Failed to reset attempts");
            }
        } catch (err: any) {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-black/10 shadow-sm mt-8">
            <h3 className="text-base font-semibold text-black/90 mb-1 flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-amber-100 text-amber-700 flex items-center justify-center text-xs">🛠</span>
                Reset Quiz Attempts
            </h3>
            <p className="text-xs text-black/50 mb-5">
                Remove a learner&apos;s attempts for a required quiz to unblock their progression. This action is irreversible.
            </p>

            <form onSubmit={handleReset} className="flex flex-col sm:flex-row gap-4 items-start sm:items-end">
                <div className="flex-1 w-full relative">
                    <label className="block text-[11px] font-bold tracking-wider text-black/40 uppercase mb-1.5">Learner Email</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="learner@example.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-sm focus:border-black/30 focus:outline-none transition-colors"
                    />
                </div>
                <div className="flex-1 w-full relative">
                    <label className="block text-[11px] font-bold tracking-wider text-black/40 uppercase mb-1.5">Quiz Lesson</label>
                    <select
                        required
                        value={lessonId}
                        onChange={(e) => setLessonId(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-black/10 text-sm focus:border-black/30 focus:outline-none transition-colors appearance-none bg-white"
                    >
                        {quizzes.map(q => (
                            <option key={q.id} value={q.id}>{q.moduleTitle} - {q.title}</option>
                        ))}
                    </select>
                </div>
                <PrimaryButton
                    type="submit"
                    disabled={status === "loading" || !email || !lessonId}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl h-[42px] whitespace-nowrap"
                >
                    {status === "loading" ? "Resetting..." : "Reset Attempts"}
                </PrimaryButton>
            </form>

            {message && (
                <div className={`mt-4 px-4 py-3 rounded-xl border text-sm font-medium ${status === "success" ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"}`}>
                    {message}
                </div>
            )}
        </div>
    );
}
