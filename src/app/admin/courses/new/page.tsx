"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export default function NewCoursePage() {
    const router = useRouter();
    const [mode, setMode] = useState<"BLANK" | "TEMPLATE">("BLANK");
    const [templates, setTemplates] = useState<any[]>([]);
    const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ title: "", description: "", level: "Beginner" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("/api/admin/courses?templates=true")
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setTemplates(data);
            })
            .catch(() => { });
    }, []);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();

        if (mode === "BLANK") {
            if (!formData.title.trim()) return;

            setLoading(true);
            setError("");

            try {
                const res = await fetch("/api/admin/courses", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: formData.title.trim(),
                        description: formData.description.trim(),
                        level: formData.level
                    }),
                });

                if (!res.ok) {
                    const data = await res.json();
                    setError(data.error || "Failed to create course. Ensure data is valid.");
                    setLoading(false);
                    return;
                }

                const course = await res.json();
                router.push(`/admin/courses/${course.id}/edit`);
            } catch {
                setError("Something went wrong with the server. Please try again.");
                setLoading(false);
            }
        } else if (mode === "TEMPLATE") {
            if (!selectedTemplateId) return;
            setLoading(true);
            setError("");

            try {
                const res = await fetch(`/api/admin/courses/${selectedTemplateId}/duplicate`, { method: "POST" });
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || "Template deployment failed");
                }
                const data = await res.json();
                router.push(`/admin/courses/${data.courseId}/edit`);
            } catch (err: any) {
                setError(err.message || "Failed to clone template. Please try again.");
                setLoading(false);
            }
        }
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link href="/admin" className="text-sm text-black/45 hover:text-black transition mb-4 inline-block">← Back to Dashboard</Link>
                <h1 className="text-3xl font-semibold tracking-[-0.02em]">Create a New Course</h1>
                <p className="mt-2 text-sm text-black/55">Establish the foundation of your new curriculum. You can build out the lessons and modules on the next page.</p>
            </div>

            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setMode("BLANK")}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all focus:outline-none ${mode === "BLANK" ? 'bg-black text-white shadow-md hover:bg-black/80' : 'bg-black/5 text-black/60 hover:bg-black/10 hover:text-black border border-black/10'}`}
                >
                    Start From Scratch
                </button>
                <button
                    onClick={() => setMode("TEMPLATE")}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all focus:outline-none ${mode === "TEMPLATE" ? 'bg-[#5B6AD0] text-white shadow-md hover:bg-[#5B6AD0]/90' : 'bg-blue-50/50 text-[#5B6AD0]/70 hover:bg-blue-50 border border-blue-100/50'}`}
                >
                    Start From Blueprint Template
                </button>
            </div>

            <Card className="p-8">
                <form onSubmit={handleCreate} className="space-y-6">
                    {mode === "BLANK" && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-black/80 mb-2">
                                    Course Title <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Mastering User Experience Design"
                                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/25 focus:ring-2 focus:ring-[rgb(255,138,0)]/30"
                                    required={mode === "BLANK"}
                                    autoFocus
                                    maxLength={120}
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-black/80 mb-2">
                                    Short Description
                                </label>
                                <textarea
                                    id="description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Write a brief engaging summary of what learners will accomplish in this course."
                                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/25 focus:ring-2 focus:ring-[rgb(255,138,0)]/30 min-h-[100px] resize-y"
                                />
                            </div>

                            <div>
                                <label htmlFor="level" className="block text-sm font-medium text-black/80 mb-2">
                                    Difficulty Level
                                </label>
                                <select
                                    id="level"
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                                    className="w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-black/25"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {mode === "TEMPLATE" && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <h2 className="text-lg font-semibold text-black/90">Select a Starting Blueprint</h2>
                            {templates.length === 0 ? (
                                <div className="p-6 border-2 border-dashed border-black/10 rounded-xl text-center text-sm text-black/40">
                                    No blueprint templates have been created by admins yet. Return to Start From Scratch.
                                </div>
                            ) : (
                                <div className="grid gap-3">
                                    {templates.map(tmpl => (
                                        <label
                                            key={tmpl.id}
                                            className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${selectedTemplateId === tmpl.id ? 'border-[#5B6AD0] bg-indigo-50/40 shadow-sm ring-1 ring-[#5B6AD0]/50' : 'border-black/10 hover:border-black/30'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="template"
                                                    className="w-4 h-4 text-[#5B6AD0] border-black/20 focus:ring-[#5B6AD0]/50"
                                                    checked={selectedTemplateId === tmpl.id}
                                                    onChange={() => setSelectedTemplateId(tmpl.id)}
                                                />
                                                <span className="font-semibold text-black/80 text-base">{tmpl.title}</span>
                                            </div>
                                            {tmpl.description && <p className="text-sm text-black/50 mt-2 ml-7 line-clamp-2">{tmpl.description}</p>}
                                            <div className="ml-7 mt-3 flex items-center gap-2">
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-black/40 bg-black/5 px-2 py-1 rounded">{tmpl._count?.modules || 0} Modules</span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-black/5">
                        <Link href="/admin">
                            <SecondaryButton type="button" className="px-5 py-2.5">Cancel</SecondaryButton>
                        </Link>
                        <PrimaryButton type="submit" disabled={loading || (mode === "BLANK" && !formData.title.trim()) || (mode === "TEMPLATE" && !selectedTemplateId)} className={`px-8 py-2.5 transition-colors ${mode === "TEMPLATE" && selectedTemplateId ? 'bg-[#5B6AD0] hover:bg-[#5B6AD0]/90' : ''}`}>
                            {loading ? "Preparing…" : (mode === "BLANK" ? "Start Blank Course" : "Clone Blueprint")}
                        </PrimaryButton>
                    </div>
                </form>
            </Card>
        </div>
    );
}
