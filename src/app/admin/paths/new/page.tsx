"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

export default function NewPathPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        status: "DRAFT",
        mode: "GUIDED"
    });

    const generateSlug = (val: string) => {
        return val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value;
        setFormData(prev => ({
            ...prev,
            title,
            slug: prev.slug === generateSlug(prev.title) ? generateSlug(title) : prev.slug
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/admin/paths", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                const data = await res.json();
                router.push(`/admin/paths/${data.id}/edit`);
            } else {
                alert("Failed to create path.");
            }
        } catch {
            alert("Error creating path.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <Link href="/admin/paths" className="text-sm font-semibold text-black/40 hover:text-black mb-2 inline-block">
                    ← Back to Paths
                </Link>
                <h1 className="text-3xl font-semibold tracking-tight">Create Learning Path</h1>
            </div>

            <Card className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Title</label>
                        <input
                            required
                            type="text"
                            value={formData.title}
                            onChange={handleTitleChange}
                            placeholder="e.g. Front-End Foundations"
                            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-black/30"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Slug</label>
                        <input
                            required
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                            placeholder="e.g. front-end-foundations"
                            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-black/30 font-mono text-xs"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea
                            required
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                            placeholder="A short summary of what this path covers..."
                            className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-black/30 resize-none"
                        />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-black/30 bg-white"
                            >
                                <option value="DRAFT">Draft — Hidden from learners</option>
                                <option value="PUBLISHED">Published — Visible in catalog</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Mode</label>
                            <select
                                value={formData.mode}
                                onChange={(e) => setFormData(prev => ({ ...prev, mode: e.target.value }))}
                                className="w-full rounded-xl border border-black/10 px-4 py-2.5 text-sm outline-none focus:border-black/30 bg-white"
                            >
                                <option value="GUIDED">Guided — Recommended order</option>
                                <option value="SEQUENTIAL">Sequential — Structured progression</option>
                            </select>
                        </div>
                    </div>
                    <div className="text-xs text-black/50 leading-relaxed -mt-2">
                        {formData.mode === "GUIDED"
                            ? "Guided: Courses appear in recommended order. Learners can access any course freely."
                            : "Sequential: Learners see step-by-step progression messaging. Does not block course access."
                        }
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Link href="/admin/paths">
                            <SecondaryButton type="button">Cancel</SecondaryButton>
                        </Link>
                        <PrimaryButton type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Path"}
                        </PrimaryButton>
                    </div>
                </form>
            </Card>
        </div>
    );
}
