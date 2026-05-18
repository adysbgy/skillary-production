"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";

type Course = { id: string; title: string };
type PathCourse = { id: string; courseId: string; sortOrder: number; course: Course };
type Path = { id: string; title: string; slug: string; description: string; status: string; mode: string; courses: PathCourse[] };

function PathEditorClient({ initialPath, allCourses, pathEnrollmentCount = 0 }: { initialPath: Path; allCourses: Course[]; pathEnrollmentCount?: number }) {
    const router = useRouter();
    const [path, setPath] = useState(initialPath);
    const [saving, setSaving] = useState(false);

    // Filter courses not in path
    const availableCourses = allCourses.filter(c => !path.courses.find(pc => pc.courseId === c.id));
    const [selectedCourseId, setSelectedCourseId] = useState("");

    const handleSaveMetadata = async () => {
        setSaving(true);
        try {
            await fetch(`/api/admin/paths/${path.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: path.title,
                    slug: path.slug,
                    description: path.description,
                    status: path.status,
                    mode: path.mode
                })
            });
            alert("Saved");
            router.refresh();
        } catch (e) {
            alert("Error saving");
        } finally {
            setSaving(false);
        }
    };

    const handleAddCourse = async () => {
        if (!selectedCourseId) return;
        try {
            const res = await fetch(`/api/admin/paths/${path.id}/courses`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId: selectedCourseId })
            });
            if (res.ok) {
                const newPc = await res.json();
                // Attach course object for UI
                newPc.course = allCourses.find(c => c.id === selectedCourseId);
                setPath(p => ({ ...p, courses: [...p.courses, newPc] }));
                setSelectedCourseId("");
                router.refresh();
            }
        } catch (e) {
            alert("Error adding course");
        }
    };

    const handleRemoveCourse = async (courseId: string) => {
        if (!confirm("Remove this course from the path?")) return;
        try {
            await fetch(`/api/admin/paths/${path.id}/courses/${courseId}`, { method: "DELETE" });
            setPath(p => ({ ...p, courses: p.courses.filter(c => c.courseId !== courseId) }));
            router.refresh();
        } catch (e) {
            alert("Error removing course");
        }
    };

    const handleMove = async (index: number, direction: "up" | "down") => {
        const newCourses = [...path.courses];
        if (direction === "up" && index > 0) {
            [newCourses[index - 1], newCourses[index]] = [newCourses[index], newCourses[index - 1]];
        } else if (direction === "down" && index < newCourses.length - 1) {
            [newCourses[index + 1], newCourses[index]] = [newCourses[index], newCourses[index + 1]];
        } else {
            return;
        }

        // Update sortOrders
        newCourses.forEach((c, i) => c.sortOrder = i);
        setPath(p => ({ ...p, courses: newCourses }));

        // Save new order to backend
        try {
            await fetch(`/api/admin/paths/${path.id}/courses`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ updates: newCourses.map(c => ({ id: c.id, sortOrder: c.sortOrder })) })
            });
            router.refresh();
        } catch (e) {
            alert("Error saving order");
        }
    };

    return (
        <div className="max-w-4xl mx-auto grid lg:grid-cols-[1fr_350px] gap-8">
            <div className="space-y-8">
                {/* ── Path Metadata ── */}
                <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Path Settings</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Title</label>
                            <input type="text" value={path.title} onChange={e => setPath(p => ({ ...p, title: e.target.value }))} className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Slug</label>
                            <input type="text" value={path.slug} onChange={e => setPath(p => ({ ...p, slug: e.target.value }))} className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none font-mono text-xs" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea value={path.description} onChange={e => setPath(p => ({ ...p, description: e.target.value }))} rows={3} className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none resize-none" />
                        </div>
                        <div className="flex justify-end pt-2">
                            <PrimaryButton onClick={handleSaveMetadata} disabled={saving}>{saving ? "Saving..." : "Save Settings"}</PrimaryButton>
                        </div>
                    </div>
                </Card>

                {/* ── Courses in Path ── */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold">Ordered Courses</h2>
                        <span className="text-sm text-black/50">{path.courses.length} courses</span>
                    </div>

                    <div className="space-y-3 mb-6">
                        {path.courses.sort((a, b) => a.sortOrder - b.sortOrder).map((c, i) => (
                            <div key={c.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg border border-black/10 bg-black/[0.01]">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-black/40 w-4">{i + 1}.</span>
                                    <span className="text-sm font-medium">{c.course.title}</span>
                                </div>
                                <div className="flex items-center gap-2 mt-3 sm:mt-0 ml-7 sm:ml-0">
                                    <div className="flex bg-black/[0.03] rounded-lg overflow-hidden border border-black/5">
                                        <button onClick={() => handleMove(i, "up")} disabled={i === 0} className="px-2 py-1 hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent text-xs">→</button>
                                        <button onClick={() => handleMove(i, "down")} disabled={i === path.courses.length - 1} className="px-2 py-1 hover:bg-black/5 disabled:opacity-30 disabled:hover:bg-transparent text-xs border-l border-black/5">→</button>
                                    </div>
                                    <button onClick={() => handleRemoveCourse(c.courseId)} className="text-xs text-red-500 hover:text-red-700 ml-2 font-medium">Remove</button>
                                </div>
                            </div>
                        ))}
                        {path.courses.length === 0 && (
                            <p className="text-sm text-black/40 text-center py-6 border border-dashed border-black/10 rounded-lg">No courses in this path yet.</p>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)} className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm outline-none">
                            <option value="">Select a course to add...</option>
                            {availableCourses.map(c => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                        </select>
                        <SecondaryButton onClick={handleAddCourse} disabled={!selectedCourseId}>Add</SecondaryButton>
                    </div>
                </Card>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-4">
                <Card className="p-5">
                    <h3 className="text-sm font-semibold mb-3">Path Status</h3>
                    <select value={path.status} onChange={e => setPath(p => ({ ...p, status: e.target.value }))} className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none mb-3">
                        <option value="DRAFT">Draft</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="ARCHIVED">Archived (Hide from Public)</option>
                    </select>
                    {path.status !== "PUBLISHED" && pathEnrollmentCount > 0 && (
                        <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 leading-relaxed">
                            <strong>⚠️ {pathEnrollmentCount} learner(s) joined this path.</strong> It will be hidden from the catalog, but joined learners retain contextual access.
                        </div>
                    )}
                    <p className="text-xs text-black/50 leading-relaxed mb-4">Draft and Archived paths are hidden. Published paths are visible to learners.</p>
                </Card>

                <Card className="p-5">
                    <h3 className="text-sm font-semibold mb-3">Path Mode</h3>
                    <select value={path.mode || "GUIDED"} onChange={e => setPath(p => ({ ...p, mode: e.target.value }))} className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none mb-3">
                        <option value="GUIDED">Guided — Recommended order</option>
                        <option value="SEQUENTIAL">Sequential — Structured progression</option>
                    </select>
                    <div className="text-xs text-black/50 leading-relaxed mb-4 space-y-2">
                        {(path.mode || "GUIDED") === "GUIDED" ? (
                            <p><strong>Guided:</strong> Courses are shown in recommended order. Learners can freely access any course at any time.</p>
                        ) : (
                            <>
                                <p><strong>Sequential:</strong> Learners see a clear step-by-step progression with visual cues for completed, current, and upcoming courses.</p>
                                <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-lg text-blue-700 text-[11px] leading-relaxed">
                                    <strong>Note:</strong> Sequential currently affects learner guidance and path messaging only. It does not yet block course access.
                                </div>
                            </>
                        )}
                    </div>
                    <PrimaryButton onClick={handleSaveMetadata} disabled={saving} className="w-full justify-center">{saving ? "Saving..." : "Save Settings"}</PrimaryButton>
                </Card>
            </div>
            {/* HACK: Simple fix for arrow logic */}
            <style jsx global>{`
                button:has(> *):contains("→") { transform: rotate(-90deg) }
            `}</style>
        </div>
    );
}

export default function EditPathPage({ params }: { params: Promise<{ id: string }> }) {
    // We are wrapping the async part here and importing the real DB code directly 
    // to avoid a giant "use client" file
    const id = use(params).id;

    return <EditPathDataLoader id={id} />;
}

// Need a separate component to load the DB data since Next 15 "use client" can't have async components
import { prisma } from "@/lib/prisma";

async function EditPathDataLoader({ id }: { id: string }) {
    const path = await prisma.learningPath.findUnique({
        where: { id },
        include: {
            courses: {
                include: { course: { select: { id: true, title: true } } }
            }
        }
    });

    if (!path) return <p>Not found</p>;

    const allCourses = await prisma.course.findMany({ select: { id: true, title: true }, orderBy: { title: "asc" } });

    const pathEnrollmentCount = await (prisma as any).pathEnrollment.count({ where: { learningPathId: path.id } });

    return (
        <div>
            <div className="mb-6 max-w-4xl mx-auto">
                <Link href="/admin/paths" className="text-sm font-semibold text-black/40 hover:text-black mb-2 inline-block">← Back to Paths</Link>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight">Edit Path: {path.title}</h1>
                        <div className="flex items-center gap-3 mt-1">
                            <Link href={`/path/${path.slug}`} target="_blank" className="text-sm text-blue-600 hover:underline">
                                View as Learner ↗
                            </Link>
                            <span className="text-black/20">•</span>
                            <Link href={`/admin/paths/${path.id}/analytics`} className="text-sm text-blue-600 hover:underline">
                                View Analytics ↗
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <PathEditorClient initialPath={path as any} allCourses={allCourses} pathEnrollmentCount={pathEnrollmentCount} />
        </div>
    );
}
