"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type LearnerState = {
    id: string;
    name: string;
    email: string;
    source: string;
    status: "Not Submitted" | "Passed" | "Failed" | "Exhausted";
    attemptsUsed: number;
    maxAttempts: number | "Unlimited";
    bestScore: number | null;
    latestSubmittedAt: string | null;
};

export default function LiveAssessmentTable({ learners, lessonId }: { learners: LearnerState[], lessonId: string }) {
    const router = useRouter();
    const [filter, setFilter] = useState<"All" | "Needs Help" | "Not Submitted" | "Passed" | "Failed" | "Exhausted">("All");
    const [resettingEmail, setResettingEmail] = useState<string | null>(null);

    const filteredLearners = learners.filter(l => {
        if (filter === "All") return true;
        if (filter === "Needs Help") return l.status === "Failed" || l.status === "Exhausted";
        return l.status === filter;
    });

    async function handleReset(email: string) {
        if (!confirm(`Are you sure you want to completely reset quiz attempts for ${email}? This cannot be undone.`)) return;

        setResettingEmail(email);
        try {
            const res = await fetch("/api/admin/quiz/reset", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, lessonId }),
            });
            const data = await res.json();
            if (res.ok) {
                alert(data.message);
                router.refresh();
            } else {
                alert(data.error || "Failed to reset");
            }
        } catch (error) {
            alert("Network error processing reset.");
        } finally {
            setResettingEmail(null);
        }
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-black/40 mr-2">Filter View:</span>
                {(["All", "Needs Help", "Not Submitted", "Passed", "Failed", "Exhausted"] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${filter === f ? "bg-black/90 text-white" : "bg-black/5 text-black/60 hover:bg-black/10"
                            } ${f === "Needs Help" && filter !== f ? "text-red-600 bg-red-50 hover:bg-red-100" : ""}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="bg-white border text-sm border-black/10 rounded-2xl overflow-x-auto shadow-sm">
                <table className="w-full text-left min-w-[800px]">
                    <thead>
                        <tr className="border-b border-black/5 bg-black/[0.02]">
                            <th className="px-5 py-3 font-medium text-black/55">Learner</th>
                            <th className="px-5 py-3 font-medium text-black/55 w-[140px]">Status</th>
                            <th className="px-5 py-3 font-medium text-black/55 text-right">Attempts</th>
                            <th className="px-5 py-3 font-medium text-black/55 text-right w-[100px]">Best Score</th>
                            <th className="px-5 py-3 font-medium text-black/55 w-[140px]">Latest Try</th>
                            <th className="px-5 py-3 font-medium text-black/55 text-right w-[150px]">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-black/5">
                        {filteredLearners.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-5 py-8 text-center text-black/40">
                                    No records matching "{filter}"
                                </td>
                            </tr>
                        ) : (
                            filteredLearners.map(l => (
                                <tr key={l.id} className="hover:bg-black/[0.01]">
                                    <td className="px-5 py-3">
                                        <p className="font-semibold text-black/90 truncate max-w-[200px]" title={l.name || ""}>{l.name || "—"}</p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <p className="text-xs text-black/45 truncate max-w-[150px]" title={l.email}>{l.email}</p>
                                            <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-[1px] rounded ${l.source === "PAID" ? "bg-blue-50 text-blue-600" :
                                                l.source === "MANUAL" ? "bg-violet-50 text-violet-600" :
                                                    "bg-[rgb(255,138,0)]/20 text-[#D48924]"
                                                }`}>
                                                {l.source}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded inline-flex items-center gap-1.5 ${l.status === "Passed" ? "bg-green-100 text-green-700" :
                                            l.status === "Exhausted" ? "bg-black/80 text-white" :
                                                l.status === "Failed" ? "bg-red-50 border border-red-200 text-red-600" :
                                                    "bg-black/5 text-black/40"
                                            }`}>
                                            {(l.status === "Failed" || l.status === "Exhausted") && <span className="w-1.5 h-1.5 rounded-full bg-current" />}
                                            {l.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        <span className="font-semibold">{l.attemptsUsed}</span>
                                        <span className="text-xs text-black/40 ml-1">/ {l.maxAttempts}</span>
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        {l.bestScore !== null ? (
                                            <span className={`font-bold ${l.status === "Passed" ? "text-green-600" : "text-black/80"}`}>{l.bestScore}%</span>
                                        ) : <span className="text-black/20">—</span>}
                                    </td>
                                    <td className="px-5 py-3 text-xs text-black/50">
                                        {l.latestSubmittedAt || "—"}
                                    </td>
                                    <td className="px-5 py-3 text-right">
                                        {l.attemptsUsed > 0 && (
                                            <button
                                                onClick={() => handleReset(l.email)}
                                                disabled={resettingEmail === l.email}
                                                className="text-[10px] font-bold tracking-wider uppercase text-black/40 hover:text-[rgb(255,90,95)] transition-colors border border-black/10 hover:border-[rgb(255,90,95)]/30 bg-white px-2 py-1 rounded shadow-sm disabled:opacity-50"
                                            >
                                                {resettingEmail === l.email ? "..." : "Reset"}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
