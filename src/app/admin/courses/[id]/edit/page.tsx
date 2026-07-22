"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import MarkdownEditor from "@/components/ui/MarkdownEditor";
import { StringListBuilder } from "@/components/ui/StringListBuilder";
import { isValidVideoDomain, normalizeVideoUrl } from "@/lib/video";
import { downloadQuizCsvTemplate, parseQuizCsv, validateQuizRows, mapRowsToQuizQuestions, type CsvValidationError } from "@/lib/csv-quiz-import";

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
interface QuizQuestion { question: string; options: string[]; correctIndex: number; } // Legacy fallback
interface Lesson { id: string; title: string; type: string; content: string; videoUrl: string | null; quizData?: string | null; }
interface Module { id: string; title: string; lessons: Lesson[]; }
interface Course { id: string; slug?: string; title: string; description: string; level: string; duration: string; category: string; status: string; price: number; instructorId?: string; thumbnailUrl?: string | null; outcomesData?: string | null; audienceData?: string | null; prerequisitesData?: string | null; certificateMode?: string; digitalCertificatePrice?: number | null; modules: Module[]; }
interface InstructorOption { id: string; name: string; email: string; }
interface ResourceItem { id: string; filename: string; url: string; fileType: string; fileSize: number; }

function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function fileIcon(type: string) {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('zip') || type.includes('archive')) return '📦';
    if (type.includes('presentation') || type.includes('powerpoint')) return '📊';
    if (type.includes('spreadsheet') || type.includes('excel')) return '📈';
    if (type.includes('word') || type.includes('document')) return '📝';
    return '📎';
}

function VideoEditorPreview({ lesson }: { lesson: any }) {
    const [val, setVal] = useState(lesson.videoUrl || "");
    const normalized = normalizeVideoUrl(val);
    const isValid = isValidVideoDomain(normalized);
    return (
        <div className="space-y-3">
            <input id={`video-${lesson.id}`} defaultValue={val} onChange={(e) => setVal(e.target.value)} placeholder="Wait! Paste a Youtube, Vimeo, Loom, Drive or Wistia link..." className="w-full rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[rgb(255,138,0)] font-mono bg-white transition-colors duration-200" />
            {val.trim() !== "" && (
                <div className="rounded-xl overflow-hidden border border-black/10 bg-black/5 aspect-video flex items-center justify-center relative">
                    {isValid && normalized ? (
                        <iframe src={normalized} className="w-full h-full" allowFullScreen allow="autoplay; fullscreen" />
                    ) : (
                        <div className="text-center p-4">
                            <span className="text-red-500 font-bold block mb-1">⚠️ Unsupported source</span>
                            <span className="text-xs max-w-sm text-black/50 mx-auto leading-relaxed block">Use an allowed source (YouTube, Vimeo, Loom, Google Drive, or Wistia) to avoid breaking the learner experience.</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function LessonResources({ lessonId }: { lessonId: string }) {
    const [resources, setResources] = useState<ResourceItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetch(`/api/admin/resources?lessonId=${lessonId}`)
            .then(r => r.json())
            .then(data => { if (Array.isArray(data)) setResources(data); })
            .catch(() => { })
            .finally(() => setLoading(false));
    }, [lessonId]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 20 * 1024 * 1024) { alert("File must be under 20 MB."); return; }
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            fd.append("lessonId", lessonId);
            fd.append("category", "resources");
            const res = await fetch("/api/admin/resources", { method: "POST", body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Upload failed");
            setResources(prev => [...prev, data]);
        } catch (err: any) {
            alert(err.message);
        } finally {
            setUploading(false);
            e.target.value = "";
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Remove this resource?")) return;
        try {
            await fetch("/api/admin/resources", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            setResources(prev => prev.filter(r => r.id !== id));
        } catch { alert("Failed to delete resource."); }
    };

    if (loading) return <p className="text-xs text-black/30">Loading resources...</p>;

    return (
        <div className="space-y-2">
            {resources.map(r => (
                <div key={r.id} className="flex items-center gap-2 p-2 rounded-lg bg-white border border-black/5 text-xs">
                    <span>{fileIcon(r.fileType)}</span>
                    <a href={r.url} target="_blank" className="flex-1 font-medium text-black/70 hover:text-[rgb(255,90,95)] truncate transition-colors">{r.filename}</a>
                    <span className="text-black/30 shrink-0">{formatFileSize(r.fileSize)}</span>
                    <button onClick={() => handleDelete(r.id)} className="text-red-400 hover:text-red-600 shrink-0 transition-colors">✕</button>
                </div>
            ))}
            <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/5 hover:bg-black/10 rounded-lg text-[11px] font-semibold text-black/60 transition-colors">
                {uploading ? "Uploading…" : "+ Attach File"}
                <input type="file" className="hidden" disabled={uploading} onChange={handleUpload}
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip,.txt,.csv,.jpg,.jpeg,.png,.webp,.gif" />
            </label>
            <p className="text-[9px] text-black/25">PDF, docs, images, etc. Max 20 MB each, up to 10 per lesson.</p>
        </div>
    );
}

export default function EditCoursePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();

    const [course, setCourse] = useState<Course | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState<"Curriculum" | "Setup" | "Pricing" | "Settings">("Curriculum");

    // UI State Feedback
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    // Inline Builder States
    const [isAddingModule, setIsAddingModule] = useState(false);
    const [newModuleTitle, setNewModuleTitle] = useState("");
    const [collapsedModules, setCollapsedModules] = useState<Record<string, boolean>>({});
    const [addingLessonToId, setAddingLessonToId] = useState<string | null>(null);
    const [newLessonTitle, setNewLessonTitle] = useState("");
    const [bulkAddMode, setBulkAddMode] = useState<string | null>(null);
    const [bulkTitlesText, setBulkTitlesText] = useState("");
    const [bulkModuleMode, setBulkModuleMode] = useState<boolean>(false);
    const [bulkModuleTitlesText, setBulkModuleTitlesText] = useState("");
    const [uploadingThumb, setUploadingThumb] = useState(false);

    // CSV Quiz Import state
    const [showCsvImport, setShowCsvImport] = useState(false);
    const [csvPreview, setCsvPreview] = useState<{ valid: number; errors: CsvValidationError[]; total: number; mappedQuestions: any[] } | null>(null);
    const [csvFileName, setCsvFileName] = useState("");

    // Role awareness for authority-appropriate UI. Missing/loading/error states
    // deliberately derive to null so privileged controls remain fail-closed.
    const { data: session } = useSession();
    const sessionRole = session?.user?.role ?? null;
    const [instructors, setInstructors] = useState<InstructorOption[]>([]);

    // Fetch instructors list for ADMIN ownership assignment
    useEffect(() => {
        if (sessionRole === "ADMIN") {
            fetch("/api/admin/users?role=INSTRUCTOR")
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        // Also include ADMINs as potential course owners
                        fetch("/api/admin/users?role=ADMIN")
                            .then(r => r.json())
                            .then(admins => {
                                if (Array.isArray(admins)) {
                                    const all = [...data, ...admins].map((u: any) => ({ id: u.id, name: u.name, email: u.email }));
                                    // Deduplicate
                                    const unique = all.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
                                    setInstructors(unique);
                                }
                            }).catch(() => { });
                    }
                }).catch(() => { });
        }
    }, [sessionRole]);

    useEffect(() => {
        fetch("/api/admin/courses?id=" + id)
            .then(res => res.json())
            .then((data: any) => {
                if (data && !data.error) setCourse(data);
                setLoading(false);
            })
            .catch(() => {
                setErrorMsg("Failed to load course details.");
                setLoading(false);
            });
    }, [id]);

    async function handleUpdateCourse(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg(""); setSuccessMsg(""); setSaving(true);

        try {
            const res = await fetch("/api/admin/courses", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: course?.id,
                    title: course?.title,
                    description: course?.description,
                    level: course?.level,
                    status: course?.status,
                    price: course?.price ?? 0,
                    outcomesData: course?.outcomesData,
                    audienceData: course?.audienceData,
                    prerequisitesData: course?.prerequisitesData,
                    certificateMode: course?.certificateMode,
                    digitalCertificatePrice: course?.digitalCertificatePrice,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Update failed");

            setSuccessMsg("Details saved successfully.");
            setTimeout(() => setSuccessMsg(""), 3000);
            router.refresh();
        } catch (err: any) {
            setErrorMsg(err.message || "Failed to save course.");
        } finally {
            setSaving(false);
        }
    }

    async function handleSaveModule() {
        if (!newModuleTitle.trim()) {
            setIsAddingModule(false);
            return;
        }
        try {
            const res = await fetch("/api/admin/modules", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId: id, title: newModuleTitle.trim() }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to create module");

            setCourse(prev => prev ? { ...prev, modules: [...prev.modules, { ...data, lessons: [] }] } : prev);
            setIsAddingModule(false);
            setNewModuleTitle("");
        } catch (err: any) {
            setErrorMsg(err.message || "Failed to save module.");
        }
    }

    async function handleBulkSaveModules() {
        if (!course) return;
        if (!bulkModuleTitlesText.trim()) return;
        const titles = bulkModuleTitlesText.split('\n').map(t => t.trim()).filter(t => t.length > 0);
        if (titles.length === 0) return;

        try {
            setSuccessMsg(`Creating ${titles.length} modules...`);
            const res = await fetch("/api/admin/modules/bulk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ courseId: course.id, titles })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Bulk creation failed");
            }

            const createdModules = await res.json();

            // Force newly created modules to be collapsed initially
            const nextCollapsed = { ...collapsedModules };
            createdModules.forEach((m: any) => { nextCollapsed[m.id] = true; });
            setCollapsedModules(nextCollapsed);

            setCourse(prev => prev ? { ...prev, modules: [...prev.modules, ...createdModules] } : prev);

            setIsAddingModule(false);
            setBulkModuleMode(false);
            setBulkModuleTitlesText("");
            setSuccessMsg(`${createdModules.length} modules created successfully!`);
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err: any) {
            setErrorMsg(err.message || "Failed to bulk create modules.");
            setSuccessMsg("");
            window.scroll({ top: 0, behavior: "smooth" });
        }
    }

    async function handleSaveLesson(moduleId: string) {
        if (!newLessonTitle.trim()) {
            setAddingLessonToId(null);
            return;
        }
        try {
            const res = await fetch("/api/admin/lessons", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ moduleId, title: newLessonTitle.trim(), type: "TEXT", content: "Write some awesome content using Markdown e.g., **Bold**, ## Headers, [Links](https://example.com)..." }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to create lesson");

            setCourse(prev => {
                if (!prev) return prev;
                return {
                    ...prev,
                    modules: prev.modules.map(m => m.id === moduleId ? { ...m, lessons: [...m.lessons, data] } : m)
                };
            });
            setAddingLessonToId(null);
            setNewLessonTitle("");
        } catch (err: any) {
            setErrorMsg(err.message || "Failed to create lesson.");
        }
    }

    async function moveModule(index: number, direction: "up" | "down") {
        if (!course) return;
        const mods = [...course.modules];
        if (direction === "up" && index > 0) {
            [mods[index], mods[index - 1]] = [mods[index - 1], mods[index]];
        } else if (direction === "down" && index < mods.length - 1) {
            [mods[index], mods[index + 1]] = [mods[index + 1], mods[index]];
        } else return;

        const updatedMods = mods.map((m, i) => ({ ...m, sortOrder: i }));
        setCourse({ ...course, modules: updatedMods });

        try {
            await fetch("/api/admin/modules", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedMods.map(m => ({ id: m.id, sortOrder: m.sortOrder })))
            });
        } catch {
            setErrorMsg("Failed to reorder modules.");
        }
    }

    async function moveLesson(modId: string, index: number, direction: "up" | "down") {
        if (!course) return;
        const mod = course.modules.find(m => m.id === modId);
        if (!mod) return;

        const lessons = [...mod.lessons];
        if (direction === "up" && index > 0) {
            [lessons[index], lessons[index - 1]] = [lessons[index - 1], lessons[index]];
        } else if (direction === "down" && index < lessons.length - 1) {
            [lessons[index], lessons[index + 1]] = [lessons[index + 1], lessons[index]];
        } else return;

        const updatedLessons = lessons.map((l, i) => ({ ...l, sortOrder: i }));
        setCourse({
            ...course,
            modules: course.modules.map(m => m.id === modId ? { ...m, lessons: updatedLessons } : m)
        });

        try {
            await fetch("/api/admin/lessons", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedLessons.map(l => ({ id: l.id, sortOrder: l.sortOrder })))
            });
        } catch {
            setErrorMsg("Failed to reorder lessons.");
        }
    }

    async function handleBulkSaveLessons(moduleId: string) {
        if (!bulkTitlesText.trim()) return;
        const titles = bulkTitlesText.split('\n').map(t => t.trim()).filter(t => t.length > 0);
        if (titles.length === 0) return;

        try {
            setSuccessMsg(`Creating ${titles.length} lessons...`);
            const res = await fetch("/api/admin/lessons/bulk", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ moduleId, titles })
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Bulk creation failed");
            }

            const createdLessons = await res.json();
            setCourse(prev => prev ? { ...prev, modules: prev.modules.map(m => m.id === moduleId ? { ...m, lessons: [...m.lessons, ...createdLessons] } : m) } : prev);

            setBulkAddMode(null);
            setBulkTitlesText("");
            setAddingLessonToId(null);
            setSuccessMsg(`${createdLessons.length} lessons created successfully!`);
            setTimeout(() => setSuccessMsg(""), 3000);
        } catch (err: any) {
            setErrorMsg(err.message || "Failed to bulk create lessons.");
            setSuccessMsg("");
            window.scroll({ top: 0, behavior: "smooth" });
        }
    }

    if (loading) return <div className="p-8 text-center text-black/50">Loading editor...</div>;
    if (!course) return <div className="p-8 text-center text-red-600">Course not found.</div>;

    return (
        <div className="max-w-4xl mx-auto py-8">
            <div className="flex items-center justify-between mb-6">
                <Link href="/admin/courses" className="text-sm text-black/45 hover:text-black transition inline-block font-medium">← Back to Course List</Link>
                <Link href={`/program/${course.slug || course.id}`} target="_blank" className="text-xs font-semibold px-4 py-2 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors">
                    Preview as Learner ↗
                </Link>
            </div>

            {course.status === "TEMPLATE" && (
                <div className="mb-6 p-5 bg-[#5B6AD0]/10 border-2 border-[#5B6AD0]/30 rounded-2xl flex items-start gap-4">
                    <div className="text-2xl pt-0.5">🚧</div>
                    <div>
                        <h2 className="text-[#5B6AD0] font-bold text-base mb-1">Admin Blueprint Template</h2>
                        <p className="text-[#5B6AD0]/80 text-sm leading-relaxed">
                            You are editing a blueprint source. Changes here will immediately affect the structure of any future draft courses created from this template. Instructors should use the "Start From Blueprint" flow instead of editing this source directly.
                        </p>
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-semibold tracking-[-0.03em] text-black/90">{course.title}</h1>
                    <p className="text-sm text-black/55 mt-1 font-medium">Status: <span className={course.status === "PUBLISHED" ? "text-green-600" : course.status === "TEMPLATE" ? "text-[#5B6AD0] font-bold" : "text-[#D97D00]"}>{course.status}</span></p>
                </div>
            </div>

            {errorMsg && <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-medium">{errorMsg}</div>}
            {successMsg && <div className="mb-6 p-4 bg-green-50 text-green-700 border border-green-100 rounded-xl text-sm font-medium">{successMsg}</div>}

            <div className="flex items-center gap-6 mb-8 border-b border-black/10 overflow-x-auto">
                {(["Curriculum", "Setup", "Pricing", "Settings"] as const).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`pb-3 text-sm font-bold tracking-wider uppercase whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? "border-[rgb(255,90,95)] text-black" : "border-transparent text-black/40 hover:text-black/70"}`}
                    >
                        {tab === "Setup" ? "Setup & Landing Page" : tab === "Pricing" ? "Pricing & Access" : tab}
                    </button>
                ))}
            </div>




            <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
                <div className="space-y-8">
                    {activeTab === 'Setup' && (
                        <>
                            {/* Thumbnail Upload */}
                            <Card className="p-6 border border-black/5 shadow-sm">
                                <h2 className="text-lg font-semibold mb-4 border-b border-black/5 pb-2 text-black/80">Cover Image</h2>
                                <div className="flex items-start gap-6">
                                    <div className="w-48 h-28 rounded-xl bg-black/[0.03] border-2 border-dashed border-black/10 flex items-center justify-center overflow-hidden shrink-0">
                                        {course.thumbnailUrl ? (
                                            <img src={course.thumbnailUrl} alt="Course thumbnail" className="w-full h-full object-cover rounded-xl" />
                                        ) : (
                                            <span className="text-xs text-black/30 font-medium">No image</span>
                                        )}
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-black/5 hover:bg-black/10 rounded-lg text-xs font-semibold text-black/70 transition-colors">
                                            {uploadingThumb ? "Uploading…" : course.thumbnailUrl ? "Replace Image" : "Upload Image"}
                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp,image/gif"
                                                className="hidden"
                                                disabled={uploadingThumb}
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;
                                                    if (file.size > 5 * 1024 * 1024) { setErrorMsg("Image must be under 5 MB."); return; }
                                                    setUploadingThumb(true); setErrorMsg("");
                                                    try {
                                                        const fd = new FormData();
                                                        fd.append("file", file);
                                                        fd.append("category", "thumbnails");
                                                        const uploadRes = await fetch("/api/upload", { method: "POST", body: fd });
                                                        const uploadData = await uploadRes.json();
                                                        if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");
                                                        // Save thumbnail URL to course
                                                        const saveRes = await fetch("/api/admin/courses", {
                                                            method: "PUT",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({ id: course.id, thumbnailUrl: uploadData.url }),
                                                        });
                                                        if (!saveRes.ok) throw new Error("Failed to save thumbnail");
                                                        setCourse(c => c ? { ...c, thumbnailUrl: uploadData.url } : c);
                                                        setSuccessMsg("Thumbnail uploaded.");
                                                        setTimeout(() => setSuccessMsg(""), 3000);
                                                    } catch (err: any) {
                                                        setErrorMsg(err.message);
                                                    } finally {
                                                        setUploadingThumb(false);
                                                        e.target.value = "";
                                                    }
                                                }}
                                            />
                                        </label>
                                        {course.thumbnailUrl && (
                                            <button
                                                type="button"
                                                onClick={async () => {
                                                    if (!confirm("Remove the cover image?")) return;
                                                    try {
                                                        await fetch("/api/admin/courses", {
                                                            method: "PUT",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({ id: course.id, thumbnailUrl: null }),
                                                        });
                                                        setCourse(c => c ? { ...c, thumbnailUrl: null } : c);
                                                    } catch { setErrorMsg("Failed to remove thumbnail."); }
                                                }}
                                                className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors"
                                            >
                                                Remove Image
                                            </button>
                                        )}
                                        <p className="text-[10px] text-black/35 leading-4">JPG, PNG, WebP, or GIF. Max 5 MB.<br />Recommended: 1200×630px (16:9).</p>
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-6 border border-black/5 shadow-sm">
                                <h2 className="text-lg font-semibold mb-6 border-b border-black/5 pb-2 text-black/80">Core Content</h2>
                                <form onSubmit={handleUpdateCourse} className="space-y-5">
                                    <div>
                                        <label className="block text-sm font-medium text-black/70 mb-1.5">Title</label>
                                        <input required value={course.title} onChange={e => setCourse(c => c ? { ...c, title: e.target.value } : c)} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 focus:ring-2 focus:ring-[rgb(255,138,0)]/20 font-medium" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-black/70 mb-1.5">Description</label>
                                        <textarea value={course.description} onChange={e => setCourse(c => c ? { ...c, description: e.target.value } : c)} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none min-h-[120px] resize-y transition focus:border-black/25 focus:ring-2 focus:ring-[rgb(255,138,0)]/20 font-medium leading-relaxed text-black/80" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-black/70 mb-1.5">Level</label>
                                            <select value={course.level} onChange={e => setCourse(c => c ? { ...c, level: e.target.value } : c)} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 font-medium">
                                                <option>Beginner</option>
                                                <option>Intermediate</option>
                                                <option>Advanced</option>
                                                <option>Expert</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-black/70 mb-1.5">Category</label>
                                            <input value={course.category || ""} onChange={e => setCourse(c => c ? { ...c, category: e.target.value } : c)} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 font-medium" placeholder="E.g. Development, Design" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-black/70 mb-1.5">Duration</label>
                                            <input value={course.duration || ""} onChange={e => setCourse(c => c ? { ...c, duration: e.target.value } : c)} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 font-medium" placeholder="E.g. 12 Weeks" />
                                        </div>
                                    </div>



                                    <div className="pt-4 border-t border-black/5 flex justify-end">
                                        <PrimaryButton type="submit" disabled={saving} className="px-8 py-2.5 shadow-sm text-sm">{saving ? "Saving…" : "Save Changes"}</PrimaryButton>
                                    </div>
                                </form>
                            </Card>

                            <Card className="p-6 border border-black/5 shadow-sm">
                                <h2 className="text-lg font-semibold mb-6 border-b border-black/5 pb-2 text-black/80">Marketing Metadata</h2>
                                <div className="space-y-6">
                                    <StringListBuilder
                                        title="What You'll Learn (Outcomes)"
                                        description="Add specific skills or outcomes students will achieve. Keep it short and actionable."
                                        itemsJson={course.outcomesData}
                                        onChange={(val) => setCourse(c => c ? { ...c, outcomesData: val } : c)}
                                    />
                                    <StringListBuilder
                                        title="Who It's For (Target Audience)"
                                        description="Describe the ideal student profiles or roles this course is meant for."
                                        itemsJson={course.audienceData}
                                        onChange={(val) => setCourse(c => c ? { ...c, audienceData: val } : c)}
                                    />
                                    <StringListBuilder
                                        title="Prerequisites"
                                        description="List any required skills, tools, or prior knowledge needed before starting."
                                        itemsJson={course.prerequisitesData}
                                        onChange={(val) => setCourse(c => c ? { ...c, prerequisitesData: val } : c)}
                                    />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <SecondaryButton type="button" onClick={handleUpdateCourse} disabled={saving}>{saving ? "Saving…" : "Save Metadata"}</SecondaryButton>
                                </div>
                            </Card>
                        </>
                    )}


                    <div className={activeTab === 'Curriculum' ? '' : 'hidden'}>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold tracking-[-0.02em] text-black/90">Curriculum Builder</h2>
                                <div className="flex items-center gap-4">
                                    {course.modules.length > 0 && (
                                        <button onClick={() => {
                                            const next: Record<string, boolean> = {};
                                            const isAllCollapsed = course!.modules.every(m => collapsedModules[m.id]);
                                            if (!isAllCollapsed) {
                                                course!.modules.forEach(m => next[m.id] = true);
                                            }
                                            setCollapsedModules(next);
                                        }} className="text-[11px] font-bold text-black/40 hover:text-black uppercase tracking-wider transition-colors">
                                            {course.modules.every(m => collapsedModules[m.id]) ? "Expand All ↓" : "Collapse All ↑"}
                                        </button>
                                    )}
                                    {!isAddingModule && <SecondaryButton onClick={() => setIsAddingModule(true)} className="px-4 py-2 text-xs font-semibold">+ Add Module</SecondaryButton>}
                                </div>
                            </div>

                            {isAddingModule && (
                                <div className="mt-4 mb-4 bg-black/[0.02] border border-black/10 p-4 rounded-xl max-w-2xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                                    <div className="flex gap-4 mb-4 border-b border-black/5 pb-2">
                                        <button onClick={() => setBulkModuleMode(false)} className={`text-xs font-semibold ${!bulkModuleMode ? 'text-[rgb(255,90,95)]' : 'text-black/40 hover:text-black transition-colors'}`}>Single Module</button>
                                        <button onClick={() => { setBulkModuleMode(true); setBulkModuleTitlesText(""); }} className={`text-xs font-semibold ${bulkModuleMode ? 'text-[rgb(255,90,95)]' : 'text-black/40 hover:text-black transition-colors'}`}>Bulk Scaffolding</button>
                                    </div>

                                    {bulkModuleMode ? (
                                        <div className="space-y-3">
                                            <textarea
                                                value={bulkModuleTitlesText}
                                                onChange={(e) => setBulkModuleTitlesText(e.target.value)}
                                                placeholder="Paste multiple module titles here...&#10;e.g.&#10;Week 1: Introduction&#10;Week 2: Core Concepts&#10;Week 3: Advanced Methods"
                                                className="w-full h-40 rounded-lg border border-black/10 px-3 py-3 text-sm outline-none focus:border-[rgb(255,90,95)] bg-white resize-none leading-relaxed shadow-sm block"
                                            />
                                            <div className="flex items-center justify-between">
                                                <p className="text-[10px] text-black/40 font-medium">Each non-empty line generates one empty module sequentially.</p>
                                                <div className="flex gap-2">
                                                    <button onClick={() => { setIsAddingModule(false); setBulkModuleMode(false); }} className="px-3 py-1.5 text-black/50 hover:text-black text-xs font-medium transition-colors">Cancel</button>
                                                    <button onClick={() => handleBulkSaveModules()} className="px-5 py-1.5 bg-[rgb(255,90,95)] text-white rounded-lg text-xs font-bold hover:bg-[rgb(255,90,95)]/90 shadow-sm transition-transform active:scale-95">Bulk Create</button>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <input
                                                autoFocus
                                                value={newModuleTitle}
                                                onChange={(e) => setNewModuleTitle(e.target.value)}
                                                placeholder="Enter Module Title (e.g. Introduction)"
                                                className="flex-1 rounded-lg border border-[rgb(255,90,95)]/30 px-3 py-2 text-sm outline-none focus:border-[rgb(255,90,95)] bg-white shadow-sm"
                                                onKeyDown={(e) => e.key === 'Enter' && handleSaveModule()}
                                            />
                                            <button onClick={handleSaveModule} className="px-4 py-2 bg-[rgb(255,90,95)] text-white rounded-lg text-sm font-medium hover:bg-[rgb(255,90,95)]/90 transition-colors shadow-sm active:scale-95">Save</button>
                                            <button onClick={() => { setIsAddingModule(false); setNewModuleTitle(""); }} className="px-3 py-2 text-black/50 hover:text-black text-sm transition-colors">Cancel</button>
                                        </div>
                                    )}
                                </div>
                            )}

                            {course.modules.length === 0 && !isAddingModule ? (
                                <div className="p-10 text-center text-black/40 border-2 border-dashed border-black/10 rounded-2xl bg-white">
                                    <p className="mb-4 font-medium text-sm">No modules created yet.</p>
                                    <SecondaryButton onClick={() => setIsAddingModule(true)} className="px-5 py-2.5 text-xs font-semibold">Build Curriculum →</SecondaryButton>
                                </div>
                            ) : (
                                course.modules.map((mod, i) => (
                                    <Card key={mod.id} className="p-5 border border-black/10 bg-black/[0.01] shadow-sm">
                                        <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/5">
                                            <div className="flex items-center gap-3">
                                                <button onClick={() => setCollapsedModules(p => ({ ...p, [mod.id]: !p[mod.id] }))} className="w-5 h-5 flex items-center justify-center rounded bg-black/5 hover:bg-black/10 text-[9px] text-black/40 hover:text-black transition-colors" title="Toggle collapse">
                                                    {collapsedModules[mod.id] ? "▶" : "▼"}
                                                </button>
                                                <span className="font-semibold text-lg text-black/80">{i + 1}.</span>
                                                <input
                                                    defaultValue={mod.title}
                                                    onBlur={async (e) => {
                                                        const val = e.target.value.trim();
                                                        if (val && val !== mod.title) {
                                                            try {
                                                                const res = await fetch("/api/admin/modules", {
                                                                    method: "PUT",
                                                                    headers: { "Content-Type": "application/json" },
                                                                    body: JSON.stringify({ id: mod.id, title: val })
                                                                });
                                                                if (!res.ok) throw new Error("Failed to rename");
                                                                setCourse(prev => prev ? { ...prev, modules: prev.modules.map(m => m.id === mod.id ? { ...m, title: val } : m) } : prev);
                                                            } catch (err) {
                                                                e.target.value = mod.title;
                                                            }
                                                        }
                                                    }}
                                                    className="font-semibold text-lg text-black/80 outline-none border-b border-transparent hover:border-black/20 focus:border-[rgb(255,138,0)] bg-transparent px-1 rounded transition-colors"
                                                />
                                                {(() => {
                                                    const incompleteCount = mod.lessons.filter(l => {
                                                        if (l.type === "TEXT" && (!(l.content) || l.content.trim().length < 10)) return true;
                                                        if (l.type === "VIDEO" && (!(l.videoUrl) || l.videoUrl.trim().length < 5)) return true;
                                                        if (l.type === "QUIZ" && (!(l.quizData) || l.quizData.trim().length < 10)) return true;
                                                        return false;
                                                    }).length;
                                                    return (
                                                        <div className="flex flex-wrap items-center gap-2 ml-4">
                                                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-black/[0.04] text-black/50 border border-black/5">
                                                                {mod.lessons.length} lessons
                                                            </span>
                                                            {mod.lessons.length > 0 && incompleteCount > 0 && (
                                                                <span className="text-[10px] font-bold text-[#D48924] px-2 py-0.5 rounded-md bg-[#FFF8EC] border border-[rgb(255,138,0)]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,1)]">
                                                                    {incompleteCount} empty
                                                                </span>
                                                            )}
                                                            {mod.lessons.length > 0 && incompleteCount === 0 && (
                                                                <span className="text-[10px] font-bold text-black/40 px-2 py-0.5 rounded-md border border-black/5">
                                                                    ✓ Ready
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                })()}
                                                <div className="flex items-center flex-col -space-y-1 ml-auto px-3 border-l border-black/5">
                                                    <button disabled={i === 0} onClick={() => moveModule(i, "up")} className="text-[10px] text-black/40 hover:text-black disabled:opacity-30">▲</button>
                                                    <button disabled={i === course.modules.length - 1} onClick={() => moveModule(i, "down")} className="text-[10px] text-black/40 hover:text-black disabled:opacity-30">▼</button>
                                                </div>
                                                <div className="flex items-center gap-1 ml-2 border-l border-black/10 pl-2">
                                                    <button
                                                        onClick={async () => {
                                                            if (!confirm(`Duplicate module "${mod.title}"?\n\nThe duplicate will be added to the bottom of this course.`)) return;
                                                            try {
                                                                setSuccessMsg("Duplicating module... please wait.");
                                                                setErrorMsg("");
                                                                const res = await fetch("/api/admin/modules/duplicate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ moduleId: mod.id }) });
                                                                if (!res.ok) {
                                                                    const text = await res.text();
                                                                    throw new Error(text || "Duplication failed");
                                                                }
                                                                const clonedModule = await res.json();
                                                                setCourse(prev => prev ? { ...prev, modules: [...prev.modules, clonedModule] } : prev);
                                                                setSuccessMsg(`Module duplicated successfully!`);
                                                                setTimeout(() => setSuccessMsg(""), 3000);
                                                                // Smooth scroll to bottom where it was inserted
                                                                setTimeout(() => window.scroll({ top: document.body.scrollHeight, behavior: "smooth" }), 200);
                                                            } catch (err: any) {
                                                                setErrorMsg(err.message || "Failed to duplicate module.");
                                                                setSuccessMsg("");
                                                                window.scroll({ top: 0, behavior: "smooth" });
                                                            }
                                                        }}
                                                        className="text-[10px] font-bold text-black/40 hover:text-black bg-black/5 hover:bg-black/10 px-2 py-1 rounded transition-colors"
                                                    >
                                                        ⎘ Duplicate
                                                    </button>
                                                    <button
                                                        onClick={async () => {
                                                            if (!confirm(`Delete module "${mod.title}"?`)) return;
                                                            try {
                                                                const res = await fetch("/api/admin/modules", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: mod.id }) });
                                                                const data = await res.json();
                                                                if (!res.ok) throw new Error(data.error);
                                                                setCourse(prev => prev ? { ...prev, modules: prev.modules.filter(m => m.id !== mod.id) } : prev);
                                                                setSuccessMsg("Module deleted.");
                                                                setTimeout(() => setSuccessMsg(""), 3000);
                                                            } catch (err: any) {
                                                                setErrorMsg(err.message);
                                                                window.scroll({ top: 0, behavior: "smooth" });
                                                            }
                                                        }}
                                                        className="text-[10px] text-red-500 hover:bg-red-50 px-2 py-1 rounded transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                            <button onClick={() => { setCollapsedModules(p => ({ ...p, [mod.id]: false })); setAddingLessonToId(mod.id); }} className="text-xs text-[rgb(255,90,95)] font-bold hover:underline py-1 px-2 rounded hover:bg-[rgb(255,90,95)]/10 transition-colors">+ Add Lesson</button>
                                        </div>
                                        {!collapsedModules[mod.id] && (
                                            <div className="space-y-3">
                                                {mod.lessons.length === 0 && addingLessonToId !== mod.id ? (
                                                    <p className="text-xs text-black/40 italic pl-2 font-medium">Empty module.</p>
                                                ) : mod.lessons.map((lesson, j) => (
                                                    <div key={lesson.id} className="group flex flex-col bg-white border border-black/10 rounded-xl hover:border-black/20 transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
                                                        <div className="flex items-center p-3">
                                                            <div className="flex-1 flex items-center pr-4">
                                                                {(() => {
                                                                    const isComplete = (lesson.type === "TEXT" && (lesson.content?.trim().length || 0) > 10) ||
                                                                        (lesson.type === "VIDEO" && (lesson.videoUrl?.trim().length || 0) > 5) ||
                                                                        (lesson.type === "QUIZ" && (lesson.quizData?.trim().length || 0) > 10);
                                                                    return (
                                                                        <>
                                                                            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/5 text-black/50 mr-3 shrink-0">{lesson.type}</span>
                                                                            <span className="text-sm font-medium text-black/90 mr-4 truncate">{lesson.title}</span>
                                                                            {isComplete ? (
                                                                                <span className="text-[9px] font-bold text-black/30 px-1.5 py-0.5 rounded border border-black/5 mr-auto shrink-0 cursor-default" title="Content Added">✓</span>
                                                                            ) : (
                                                                                <span className="text-[9px] font-bold text-amber-600 px-2 py-0.5 rounded bg-amber-50 border border-amber-200/60 mr-auto shrink-0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] cursor-default">Empty</span>
                                                                            )}
                                                                        </>
                                                                    );
                                                                })()}
                                                                <div className="opacity-0 group-hover:opacity-100 flex items-center flex-col -space-y-1 ml-4 mr-2 px-3 border-r border-black/5 transition-opacity shrink-0">
                                                                    <button disabled={j === 0} onClick={() => moveLesson(mod.id, j, "up")} className="text-[10px] text-black/40 hover:text-black disabled:opacity-30">▲</button>
                                                                    <button disabled={j === mod.lessons.length - 1} onClick={() => moveLesson(mod.id, j, "down")} className="text-[10px] text-black/40 hover:text-black disabled:opacity-30">▼</button>
                                                                </div>
                                                                <button
                                                                    onClick={async () => {
                                                                        if (!confirm(`Duplicate lesson "${lesson.title}"?\n\nThe duplicate will be added to the bottom of this module.`)) return;
                                                                        try {
                                                                            setSuccessMsg("Duplicating lesson...");
                                                                            const res = await fetch("/api/admin/lessons/duplicate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lessonId: lesson.id }) });
                                                                            if (!res.ok) {
                                                                                const text = await res.text();
                                                                                throw new Error(text || "Duplication failed");
                                                                            }
                                                                            const clonedLesson = await res.json();
                                                                            setCourse(prev => prev ? { ...prev, modules: prev.modules.map(m => m.id === mod.id ? { ...m, lessons: [...m.lessons, clonedLesson] } : m) } : prev);
                                                                            setSuccessMsg("Lesson duplicated!");
                                                                            setTimeout(() => setSuccessMsg(""), 3000);
                                                                        } catch (err: any) {
                                                                            setErrorMsg(err.message || "Failed to duplicate lesson.");
                                                                            setSuccessMsg("");
                                                                            window.scroll({ top: 0, behavior: "smooth" });
                                                                        }
                                                                    }}
                                                                    title="Duplicate Lesson"
                                                                    className="opacity-0 group-hover:opacity-100 text-xs text-black/40 hover:text-black transition-opacity ml-1 px-1.5"
                                                                >
                                                                    ⎘
                                                                </button>
                                                                <button
                                                                    onClick={async () => {
                                                                        if (!confirm(`Delete lesson "${lesson.title}"?`)) return;
                                                                        try {
                                                                            const res = await fetch("/api/admin/lessons", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: lesson.id }) });
                                                                            const data = await res.json();
                                                                            if (!res.ok) throw new Error(data.error);
                                                                            setCourse(prev => prev ? { ...prev, modules: prev.modules.map(m => m.id === mod.id ? { ...m, lessons: m.lessons.filter(l => l.id !== lesson.id) } : m) } : prev);
                                                                        } catch (err: any) {
                                                                            setErrorMsg(err.message);
                                                                            window.scroll({ top: 0, behavior: "smooth" });
                                                                        }
                                                                    }}
                                                                    className="opacity-0 group-hover:opacity-100 text-[10px] text-red-400 hover:text-red-600 transition-opacity ml-2"
                                                                >
                                                                    ✕
                                                                </button>
                                                            </div>
                                                            <button onClick={() => setAddingLessonToId(lesson.id + "-edit")} className="opacity-0 group-hover:opacity-100 text-xs bg-white border border-black/20 text-black hover:bg-black hover:text-white rounded-lg transition-all px-4 py-2 font-semibold shadow-sm shrink-0">
                                                                Edit
                                                            </button>
                                                        </div>
                                                        {addingLessonToId === lesson.id + "-edit" && (
                                                            <div className="p-6 bg-[#FAFAFA] border border-black/10 m-2 rounded-xl shadow-sm relative">
                                                                <div className="flex items-center justify-between mb-8">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="w-2.5 h-2.5 rounded-full bg-[rgb(255,90,95)] animate-pulse"></div>
                                                                        <h4 className="text-xs font-extrabold text-black/40 uppercase tracking-widest">Workspace</h4>
                                                                    </div>
                                                                    <div className="flex items-center gap-3">
                                                                        {(() => {
                                                                            const isTxtComplete = lesson.type === "TEXT" && (lesson.content?.trim().length || 0) > 10;
                                                                            const isVidComplete = lesson.type === "VIDEO" && (lesson.videoUrl?.trim().length || 0) > 5;
                                                                            const isQzComplete = lesson.type === "QUIZ" && (lesson.quizData?.trim().length || 0) > 10;
                                                                            const isTitleComplete = (lesson.title?.trim().length || 0) > 0;
                                                                            const isReady = isTitleComplete && (isTxtComplete || isVidComplete || isQzComplete);

                                                                            return isReady ? (
                                                                                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                                                                                    <span className="text-[10px]">✓</span> Ready
                                                                                </div>
                                                                            ) : (
                                                                                <div className="flex items-center gap-2 bg-[#FFF8EC] border border-[rgb(255,138,0)]/30 text-[#D48924] px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm">
                                                                                    <span className="text-[10px]">⚠</span> Draft Content
                                                                                </div>
                                                                            );
                                                                        })()}
                                                                        <a href={`/learn/${course.slug || course.id}/${lesson.id}`} target="_blank" rel="noreferrer" className="text-xs font-bold text-black/50 hover:text-black transition-colors flex items-center gap-1.5 border border-black/10 bg-white px-3 py-1.5 rounded-lg shadow-sm hover:shadow active:scale-95">
                                                                            ⎋ Preview
                                                                        </a>
                                                                    </div>
                                                                </div>

                                                                <div className="mb-10 pb-6 border-b border-black/5">
                                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                        <div className="flex-1 w-full">
                                                                            <input id={`title-${lesson.id}`} defaultValue={lesson.title} placeholder="Untitled Lesson" className="w-full text-2xl font-extrabold text-black/90 placeholder:text-black/20 bg-transparent border-none outline-none focus:ring-0 p-0" />
                                                                            {!lesson.title?.trim() && <span className="text-[rgb(255,90,95)] font-semibold text-[10px] mt-2 block">Lesson Title is required</span>}
                                                                        </div>
                                                                        <div className="shrink-0 bg-white border border-black/10 rounded-xl p-1 shadow-sm">
                                                                            <select id={`type-${lesson.id}`} defaultValue={lesson.type} onChange={(e) => {
                                                                                setCourse(prev => prev ? { ...prev, modules: prev.modules.map(m => m.id === mod.id ? { ...m, lessons: m.lessons.map(l => l.id === lesson.id ? { ...l, type: e.target.value } : l) } : m) } : prev);
                                                                            }} className="text-sm font-bold text-black/80 bg-transparent border-none outline-none cursor-pointer px-3 py-1 focus:ring-0 appearance-none">
                                                                                <option value="TEXT">📝 Text Article</option>
                                                                                <option value="VIDEO">▶️ Video Lecture</option>
                                                                                <option value="QUIZ">❓ Interactive Quiz</option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <h5 className="text-[11px] uppercase tracking-widest font-bold text-black/40 mb-4 ml-1">Primary Content</h5>

                                                                <div className={`mb-8 ${lesson.type === "VIDEO" ? "block" : "hidden"}`}>
                                                                    <div className={`p-1 rounded-2xl border ${(!lesson.videoUrl || lesson.videoUrl.trim().length < 5) ? "border-[rgb(255,138,0)]/40 bg-[#FFF8EC]" : "border-black/5 bg-black/[0.02]"}`}>
                                                                        <div className="flex justify-between items-end px-4 pt-3 pb-3">
                                                                            <span className={`text-[11px] uppercase tracking-wider font-bold ${(!lesson.videoUrl || lesson.videoUrl.trim().length < 5) ? "text-[#D48924]" : "text-black/50"}`}>Video Source URL</span>
                                                                            {(!lesson.videoUrl || lesson.videoUrl.trim().length < 5) && <span className="text-[#D48924] bg-[rgb(255,138,0)]/20 px-2 py-0.5 rounded-md font-bold text-[10px]">Link required</span>}
                                                                        </div>
                                                                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-black/5">
                                                                            <VideoEditorPreview lesson={lesson} />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className={`mb-8 ${lesson.type !== "QUIZ" ? "block" : "hidden"}`}>
                                                                    {lesson.type === "VIDEO" ? (
                                                                        <div className="flex items-center gap-4 border-t border-black/5 pt-8 mt-10 mb-6">
                                                                            <div className="w-2.5 h-2.5 rounded-sm bg-black/10"></div>
                                                                            <h5 className="text-[11px] uppercase tracking-widest font-bold text-black/40">Supporting Materials</h5>
                                                                        </div>
                                                                    ) : null}
                                                                    <div className="flex justify-between items-end mb-3">
                                                                        <span className="text-[11px] uppercase tracking-wider font-bold text-black/50 ml-1">{lesson.type === "VIDEO" ? "Video Context / Reference Notes" : "Article Content"}</span>
                                                                        {lesson.type === "TEXT" && (!lesson.content || lesson.content.trim().length < 10) && <span className="text-[rgb(255,90,95)] bg-[rgb(255,90,95)]/10 px-2 py-0.5 rounded-md font-bold text-[10px]">Content required</span>}
                                                                    </div>
                                                                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-black/10">
                                                                        <MarkdownEditor
                                                                            id={`content-${lesson.id}`}
                                                                            defaultValue={lesson.content}
                                                                            placeholder={lesson.type === "VIDEO" ? "Add supplementary notes, links, or context to frame the video..." : "Write your main lesson text here..."}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                {/* Quiz Builder (Assessment Foundations 2.0) */}
                                                                {(lesson.type === "QUIZ" || (document.getElementById(`type-${lesson.id}`) as HTMLSelectElement)?.value === "QUIZ") && (() => {
                                                                    const payload: QuizDataPayload = (() => {
                                                                        let parsed: any;
                                                                        try { parsed = JSON.parse(lesson.quizData || "[]"); } catch { parsed = []; }
                                                                        if (Array.isArray(parsed)) {
                                                                            return {
                                                                                settings: { passingScore: 80, maxAttempts: null, showScore: true, showAnswers: true, isRequiredToContinue: false },
                                                                                questions: parsed.map((q: any) => ({ id: Math.random().toString(36).substring(7), type: "SINGLE_CHOICE", prompt: q.question, options: q.options || [], correctAnswers: [q.correctIndex?.toString() || "0"] }))
                                                                            };
                                                                        }
                                                                        return { settings: { passingScore: 80, maxAttempts: null, showScore: true, showAnswers: true, isRequiredToContinue: false, ...parsed?.settings }, questions: parsed?.questions || [] };
                                                                    })();

                                                                    const updatePayload = (newPayload: QuizDataPayload) => {
                                                                        setCourse(prev => prev ? { ...prev, modules: prev.modules.map(m => m.id === mod.id ? { ...m, lessons: m.lessons.map(l => l.id === lesson.id ? { ...l, quizData: JSON.stringify(newPayload) } : l) } : m) } : prev);
                                                                    };

                                                                    return (
                                                                        <div className="mb-6 p-5 rounded-xl border border-black/5 bg-white space-y-6 shadow-sm">

                                                                            {/* SETTINGS MODULE */}
                                                                            <div>
                                                                                <h4 className="text-[11px] uppercase tracking-wider font-bold text-black/50 mb-3 block">Quiz Settings</h4>
                                                                                <div className="grid sm:grid-cols-2 gap-4 bg-[#FAFAFA] p-5 rounded-xl border border-black/5">
                                                                                    <div>
                                                                                        <label className="block text-[10px] uppercase font-bold text-black/40 mb-1.5">Passing Score (%)</label>
                                                                                        <input type="number" min="0" max="100" value={payload.settings.passingScore} onChange={(e) => updatePayload({ ...payload, settings: { ...payload.settings, passingScore: parseInt(e.target.value) || 0 } })} className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-[rgb(255,90,95)] bg-white font-medium shadow-sm transition-colors" />
                                                                                    </div>
                                                                                    <div>
                                                                                        <label className="block text-[10px] uppercase font-bold text-black/40 mb-1.5 flex justify-between">Max Attempts <span className="normal-case opacity-60">0 = Unlimited</span></label>
                                                                                        <input type="number" min="0" value={payload.settings.maxAttempts || 0} onChange={(e) => { const val = parseInt(e.target.value) || 0; updatePayload({ ...payload, settings: { ...payload.settings, maxAttempts: val === 0 ? null : val } }); }} className="w-full rounded-lg border border-black/10 px-3 py-2.5 text-sm outline-none focus:border-[rgb(255,90,95)] bg-white font-medium shadow-sm transition-colors" />
                                                                                    </div>
                                                                                    <label className="flex items-center gap-3 cursor-pointer py-1 group mt-2">
                                                                                        <input type="checkbox" checked={payload.settings.showScore} onChange={(e) => updatePayload({ ...payload, settings: { ...payload.settings, showScore: e.target.checked } })} className="w-4 h-4 rounded border-black/20 text-[rgb(255,90,95)] focus:ring-[rgb(255,90,95)] transition-colors" />
                                                                                        <span className="text-xs font-bold text-black/70 group-hover:text-black transition-colors">Show Score on Submit</span>
                                                                                    </label>
                                                                                    <label className="flex items-center gap-3 cursor-pointer py-1 group mt-2">
                                                                                        <input type="checkbox" checked={payload.settings.showAnswers} onChange={(e) => updatePayload({ ...payload, settings: { ...payload.settings, showAnswers: e.target.checked } })} className="w-4 h-4 rounded border-black/20 text-[rgb(255,90,95)] focus:ring-[rgb(255,90,95)] transition-colors" />
                                                                                        <span className="text-xs font-bold text-black/70 group-hover:text-black transition-colors">Show Correct Answers</span>
                                                                                    </label>
                                                                                    <label className="flex items-center gap-3 cursor-pointer py-1 group mt-2 col-span-1 sm:col-span-2 pt-2 border-t border-black/5">
                                                                                        <input type="checkbox" checked={payload.settings.isRequiredToContinue === true} onChange={(e) => updatePayload({ ...payload, settings: { ...payload.settings, isRequiredToContinue: e.target.checked } })} className="w-4 h-4 rounded border-black/20 text-[rgb(255,90,95)] focus:ring-[rgb(255,90,95)] transition-colors" />
                                                                                        <div>
                                                                                            <span className="text-sm font-bold text-black/90 group-hover:text-black transition-colors block">Required to progress</span>
                                                                                            <span className="text-[11px] text-black/50 block">Learners cannot access the next lesson until they pass this quiz.</span>
                                                                                        </div>
                                                                                    </label>
                                                                                </div>
                                                                            </div>

                                                                            {/* QUESTIONS LIST */}
                                                                            <div>
                                                                                <div className="flex justify-between items-center mb-5 border-t border-black/5 pt-6">
                                                                                    <label className="block text-[11px] uppercase tracking-wider font-bold text-black/50 m-0">Questions ({payload.questions.length})</label>
                                                                                    {payload.questions.length === 0 && <span className="text-[10px] text-[#D97D00] font-bold bg-[rgb(255,138,0)]/20 px-2 py-0.5 rounded">No questions added</span>}
                                                                                </div>

                                                                                <div id={`quiz-${lesson.id}`} className="space-y-6">
                                                                                    {payload.questions.map((q, qi) => (
                                                                                        <div key={qi} className="p-5 bg-white border border-black/10 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] relative group transition-all hover:border-black/20">

                                                                                            {/* CARD HEADER */}
                                                                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-black/5 pb-4">
                                                                                                <div className="flex items-center gap-3">
                                                                                                    <span className="w-6 h-6 rounded-full bg-black/5 flex items-center justify-center text-[10px] font-bold text-black/50">{qi + 1}</span>
                                                                                                    <select value={q.type} onChange={(e) => {
                                                                                                        const upd = [...payload.questions];
                                                                                                        upd[qi] = { ...upd[qi], type: e.target.value as QuestionType, correctAnswers: [] }; // reset answers on type change
                                                                                                        updatePayload({ ...payload, questions: upd });
                                                                                                    }} className="text-[11px] font-bold text-[rgb(255,90,95)] bg-[rgb(255,90,95)]/10 border-none outline-none py-1.5 pl-3 pr-8 rounded-lg focus:ring-0 appearance-none cursor-pointer tracking-wide uppercase">
                                                                                                        <option value="SINGLE_CHOICE">Single Choice</option>
                                                                                                        <option value="MULTIPLE_SELECTION">Multiple Select</option>
                                                                                                        <option value="SHORT_ANSWER">Short Answer</option>
                                                                                                    </select>
                                                                                                </div>
                                                                                                <div className="flex items-center gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                                                                    <button type="button" onClick={() => {
                                                                                                        if (qi === 0) return;
                                                                                                        const upd = [...payload.questions];
                                                                                                        const tmp = upd[qi]; upd[qi] = upd[qi - 1]; upd[qi - 1] = tmp;
                                                                                                        updatePayload({ ...payload, questions: upd });
                                                                                                    }} className="w-7 h-7 rounded bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs text-black/50 hover:text-black font-bold disabled:opacity-30 transition-colors">↑</button>
                                                                                                    <button type="button" onClick={() => {
                                                                                                        if (qi === payload.questions.length - 1) return;
                                                                                                        const upd = [...payload.questions];
                                                                                                        const tmp = upd[qi]; upd[qi] = upd[qi + 1]; upd[qi + 1] = tmp;
                                                                                                        updatePayload({ ...payload, questions: upd });
                                                                                                    }} className="w-7 h-7 rounded bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs text-black/50 hover:text-black font-bold disabled:opacity-30 transition-colors">↓</button>
                                                                                                    <div className="w-px h-4 bg-black/10 mx-1"></div>
                                                                                                    <button type="button" onClick={() => {
                                                                                                        const upd = [...payload.questions];
                                                                                                        upd.splice(qi + 1, 0, { ...q, id: Math.random().toString(36).substring(7) });
                                                                                                        updatePayload({ ...payload, questions: upd });
                                                                                                    }} className="text-[10px] text-black/50 hover:bg-black/5 px-2.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-colors">Dup</button>
                                                                                                    <button type="button" onClick={() => {
                                                                                                        const upd = payload.questions.filter((_, i) => i !== qi);
                                                                                                        updatePayload({ ...payload, questions: upd });
                                                                                                    }} className="text-[10px] text-red-500 hover:bg-red-50 px-2.5 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-colors">Del</button>
                                                                                                </div>
                                                                                            </div>

                                                                                            {/* CARD BODY */}
                                                                                            <div className="space-y-5">
                                                                                                <div>
                                                                                                    <input value={q.prompt} onChange={(e) => {
                                                                                                        const upd = [...payload.questions]; upd[qi] = { ...upd[qi], prompt: e.target.value };
                                                                                                        updatePayload({ ...payload, questions: upd });
                                                                                                    }} placeholder="Type the question prompt..." className="w-full rounded-xl border border-black/10 px-4 py-3.5 text-sm outline-none focus:border-[rgb(255,90,95)] bg-black/[0.01] focus:bg-white transition-all font-medium placeholder:font-normal placeholder:text-black/30" />
                                                                                                    {!q.prompt.trim() && <span className="text-[10px] text-red-500 mt-1.5 block font-semibold px-1">Prompt is required.</span>}
                                                                                                </div>

                                                                                                {/* OPTIONS BUILDER */}
                                                                                                {(q.type === "SINGLE_CHOICE" || q.type === "MULTIPLE_SELECTION") && (
                                                                                                    <div className="space-y-3 pl-0 sm:pl-3">
                                                                                                        {q.options?.map((opt, oi) => {
                                                                                                            const isCorrect = q.correctAnswers?.includes(oi.toString());
                                                                                                            return (
                                                                                                                <div key={oi} className="flex items-center gap-3">
                                                                                                                    <button type="button" onClick={() => {
                                                                                                                        const upd = [...payload.questions];
                                                                                                                        const ans = new Set(upd[qi].correctAnswers || []);
                                                                                                                        if (q.type === "SINGLE_CHOICE") {
                                                                                                                            upd[qi] = { ...upd[qi], correctAnswers: [oi.toString()] };
                                                                                                                        } else {
                                                                                                                            if (ans.has(oi.toString())) ans.delete(oi.toString()); else ans.add(oi.toString());
                                                                                                                            upd[qi] = { ...upd[qi], correctAnswers: Array.from(ans) };
                                                                                                                        }
                                                                                                                        updatePayload({ ...payload, questions: upd });
                                                                                                                    }} className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border-2 transition-all shadow-sm ${isCorrect ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-black/10 hover:border-black/30'}`}>
                                                                                                                        {isCorrect && <span className="text-[10px] font-bold">✓</span>}
                                                                                                                    </button>
                                                                                                                    <input value={opt} onChange={(e) => {
                                                                                                                        const upd = [...payload.questions];
                                                                                                                        const opts = [...(upd[qi].options || [])]; opts[oi] = e.target.value;
                                                                                                                        upd[qi] = { ...upd[qi], options: opts };
                                                                                                                        updatePayload({ ...payload, questions: upd });
                                                                                                                    }} placeholder={`Option ${oi + 1}`} className={`flex-1 rounded-lg border px-4 py-2.5 text-sm outline-none transition-all font-medium placeholder:font-normal placeholder:text-black/30 ${isCorrect ? 'border-green-300 bg-green-50/30 focus:border-green-500' : 'border-black/10 bg-black/[0.01] focus:bg-white focus:border-[rgb(255,90,95)]'}`} />
                                                                                                                    {((q.options?.length || 0) > 2) && (
                                                                                                                        <button type="button" onClick={() => {
                                                                                                                            const upd = [...payload.questions];
                                                                                                                            const opts = (upd[qi].options || []).filter((_, i) => i !== oi);
                                                                                                                            const ans = (upd[qi].correctAnswers || []).filter(a => a !== oi.toString()).map(a => parseInt(a) > oi ? (parseInt(a) - 1).toString() : a);
                                                                                                                            upd[qi] = { ...upd[qi], options: opts, correctAnswers: ans };
                                                                                                                            updatePayload({ ...payload, questions: upd });
                                                                                                                        }} className="text-black/20 hover:text-red-500 px-2 font-bold transition-colors">✕</button>
                                                                                                                    )}
                                                                                                                </div>
                                                                                                            );
                                                                                                        })}
                                                                                                        <div className="pt-2 pl-9 flex items-center justify-between">
                                                                                                            <button type="button" onClick={() => {
                                                                                                                const upd = [...payload.questions];
                                                                                                                upd[qi] = { ...upd[qi], options: [...(upd[qi].options || []), ""] };
                                                                                                                updatePayload({ ...payload, questions: upd });
                                                                                                            }} className="text-xs text-[rgb(255,90,95)] font-bold hover:underline py-1 tracking-wide">+ Add Option</button>
                                                                                                            {(!q.correctAnswers || q.correctAnswers.length === 0) && (
                                                                                                                <span className="text-[10px] text-[rgb(255,90,95)] font-bold bg-[rgb(255,90,95)]/10 px-2 py-0.5 rounded">Mark correct answer</span>
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )}

                                                                                                {q.type === "SHORT_ANSWER" && (
                                                                                                    <div className="mt-4 pl-0 sm:pl-3">
                                                                                                        <div className="bg-[#FFF8EC] border border-[rgb(255,138,0)]/30 p-4 rounded-xl flex items-start gap-3 mb-4 shadow-[inset_0_1px_2px_rgba(255,255,255,1)]">
                                                                                                            <span className="text-base mt-0.5">💡</span>
                                                                                                            <p className="text-xs text-[#D97D00] leading-relaxed font-medium">Short answer auto-grading searches for precise matches (case-insensitive). Add all acceptable correct variations below. Learners who match <b>any</b> of them will pass.</p>
                                                                                                        </div>
                                                                                                        {q.correctAnswers?.map((ans, oi) => (
                                                                                                            <div key={oi} className="flex items-center gap-3 mb-2">
                                                                                                                <input value={ans} onChange={(e) => {
                                                                                                                    const upd = [...payload.questions];
                                                                                                                    const answers = [...(upd[qi].correctAnswers || [])]; answers[oi] = e.target.value;
                                                                                                                    upd[qi] = { ...upd[qi], correctAnswers: answers };
                                                                                                                    updatePayload({ ...payload, questions: upd });
                                                                                                                }} placeholder={`Acceptable match ${oi + 1} (e.g. "Paris")`} className="flex-1 rounded-lg border border-green-300 bg-green-50/40 px-4 py-2.5 text-sm outline-none focus:border-green-500 font-mono transition-colors shadow-sm" />
                                                                                                                <button type="button" onClick={() => {
                                                                                                                    const upd = [...payload.questions];
                                                                                                                    const answers = (upd[qi].correctAnswers || []).filter((_, i) => i !== oi);
                                                                                                                    upd[qi] = { ...upd[qi], correctAnswers: answers };
                                                                                                                    updatePayload({ ...payload, questions: upd });
                                                                                                                }} className="text-black/20 hover:text-red-500 px-2 font-bold transition-colors">✕</button>
                                                                                                            </div>
                                                                                                        ))}
                                                                                                        <div className="pt-2 pl-0 flex items-center justify-between">
                                                                                                            <button type="button" onClick={() => {
                                                                                                                const upd = [...payload.questions];
                                                                                                                upd[qi] = { ...upd[qi], correctAnswers: [...(upd[qi].correctAnswers || []), ""] };
                                                                                                                updatePayload({ ...payload, questions: upd });
                                                                                                            }} className="text-xs text-[#5BB381] font-bold hover:underline py-1 tracking-wide">+ Add Accepted Variation</button>
                                                                                                            {(!q.correctAnswers || q.correctAnswers.length === 0) && (
                                                                                                                <span className="text-[10px] text-[rgb(255,90,95)] font-bold bg-[rgb(255,90,95)]/10 px-2 py-0.5 rounded">Needs at least one match</span>
                                                                                                            )}
                                                                                                        </div>
                                                                                                    </div>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                                <button type="button" onClick={() => {
                                                                                    const newQ: QuizQuestionItem = { id: Math.random().toString(36).substring(7), type: "SINGLE_CHOICE", prompt: "", options: ["", ""], correctAnswers: [] };
                                                                                    updatePayload({ ...payload, questions: [...payload.questions, newQ] });
                                                                                }} className="mt-6 px-5 py-4 w-full border-2 border-dashed border-black/10 bg-[#FAFAFA] rounded-2xl text-sm font-bold text-black/50 hover:text-black/80 hover:bg-black/5 hover:border-black/20 transition-all">+ Add New Question</button>

                                                                                {/* CSV Import Section */}
                                                                                {(() => {
                                                                                    const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                        const file = e.target.files?.[0];
                                                                                        if (!file) return;
                                                                                        setCsvFileName(file.name);
                                                                                        const reader = new FileReader();
                                                                                        reader.onload = (ev) => {
                                                                                            const text = ev.target?.result as string;
                                                                                            const { rows, errors: parseErrors } = parseQuizCsv(text);
                                                                                            if (parseErrors.length > 0 && rows.length === 0) {
                                                                                                setCsvPreview({ valid: 0, errors: parseErrors, total: 0, mappedQuestions: [] });
                                                                                                return;
                                                                                            }
                                                                                            const { validRows, errors: valErrors } = validateQuizRows(rows);
                                                                                            const allErrors = [...parseErrors, ...valErrors];
                                                                                            const mapped = mapRowsToQuizQuestions(validRows);
                                                                                            setCsvPreview({ valid: validRows.length, errors: allErrors, total: rows.length, mappedQuestions: mapped });
                                                                                        };
                                                                                        reader.readAsText(file);
                                                                                        e.target.value = "";
                                                                                    };

                                                                                    const handleImport = () => {
                                                                                        if (!csvPreview || csvPreview.mappedQuestions.length === 0) return;
                                                                                        updatePayload({ ...payload, questions: [...payload.questions, ...csvPreview.mappedQuestions] });
                                                                                        setCsvPreview(null);
                                                                                        setCsvFileName("");
                                                                                        setShowCsvImport(false);
                                                                                    };

                                                                                    return (
                                                                                        <div className="mt-4">
                                                                                            <button type="button" onClick={() => setShowCsvImport(!showCsvImport)} className="text-xs font-bold text-black/40 hover:text-black/70 transition-colors flex items-center gap-2">
                                                                                                <span>{showCsvImport ? "▼" : "▶"}</span>
                                                                                                <span>📥 Import from CSV</span>
                                                                                            </button>
                                                                                            {showCsvImport && (
                                                                                                <div className="mt-3 p-5 bg-[#FAFAFA] border border-black/10 rounded-xl space-y-4">
                                                                                                    <div className="flex items-center justify-between">
                                                                                                        <p className="text-xs text-black/50 leading-relaxed max-w-md">Bulk import questions from a CSV file. Use the template to ensure correct formatting.</p>
                                                                                                        <button type="button" onClick={() => downloadQuizCsvTemplate()} className="px-4 py-2 text-xs font-bold text-[#5B6AD0] bg-[#5B6AD0]/10 border border-[#5B6AD0]/20 rounded-lg hover:bg-[#5B6AD0]/20 transition-colors shrink-0">⬇ Download Template</button>
                                                                                                    </div>
                                                                                                    <div className="text-[10px] text-black/35 leading-relaxed space-y-1 border-t border-black/5 pt-3">
                                                                                                        <p><strong>Tips:</strong> Open template in Excel / Google Sheets → fill questions → File → Download as CSV (UTF-8).</p>
                                                                                                        <p>Types: <code className="bg-black/5 px-1 rounded">single_choice</code>, <code className="bg-black/5 px-1 rounded">multiple_selection</code>, <code className="bg-black/5 px-1 rounded">short_answer</code></p>
                                                                                                        <p>Correct answer: A/B/C/D for choices. Use <code className="bg-black/5 px-1 rounded">A|C</code> for multiple. Use <code className="bg-black/5 px-1 rounded">answer1|answer2</code> for short answer.</p>
                                                                                                    </div>
                                                                                                    <div className="flex items-center gap-3">
                                                                                                        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-black/10 hover:border-black/25 rounded-lg text-xs font-semibold text-black/70 transition-colors shadow-sm">
                                                                                                            📄 {csvFileName || "Choose CSV File"}
                                                                                                            <input type="file" accept=".csv" className="hidden" onChange={handleCsvUpload} />
                                                                                                        </label>
                                                                                                    </div>

                                                                                                    {csvPreview && (
                                                                                                        <div className="p-4 bg-white border border-black/10 rounded-xl space-y-3">
                                                                                                            <div className="flex items-center gap-4 text-xs font-bold">
                                                                                                                <span className="text-black/50">Total: {csvPreview.total}</span>
                                                                                                                <span className="text-green-600">✓ Valid: {csvPreview.valid}</span>
                                                                                                                {csvPreview.errors.length > 0 && <span className="text-red-500">✕ Errors: {csvPreview.errors.length}</span>}
                                                                                                            </div>
                                                                                                            {csvPreview.errors.length > 0 && (
                                                                                                                <div className="max-h-32 overflow-y-auto space-y-1">
                                                                                                                    {csvPreview.errors.map((err, ei) => (
                                                                                                                        <p key={ei} className="text-[11px] text-red-500 leading-relaxed">
                                                                                                                            <strong>Row {err.row}:</strong> {err.message}
                                                                                                                        </p>
                                                                                                                    ))}
                                                                                                                </div>
                                                                                                            )}
                                                                                                            <div className="flex items-center gap-3 pt-2 border-t border-black/5">
                                                                                                                {csvPreview.valid > 0 && (
                                                                                                                    <button type="button" onClick={handleImport} className="px-5 py-2 bg-[#5BB381] text-white rounded-lg text-xs font-bold hover:bg-[#5BB381]/90 shadow-sm transition-transform active:scale-95">
                                                                                                                        Import {csvPreview.valid} Valid Question{csvPreview.valid !== 1 ? "s" : ""}
                                                                                                                    </button>
                                                                                                                )}
                                                                                                                <button type="button" onClick={() => { setCsvPreview(null); setCsvFileName(""); }} className="px-4 py-2 text-xs font-medium text-black/50 hover:text-black transition-colors">Cancel</button>
                                                                                                            </div>
                                                                                                        </div>
                                                                                                    )}
                                                                                                </div>
                                                                                            )}
                                                                                        </div>
                                                                                    );
                                                                                })()}
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                })()}
                                                                {/* Lesson Resources */}
                                                                <div className="mb-8">
                                                                    {lesson.type !== "VIDEO" ? (
                                                                        <div className="flex items-center gap-4 border-t border-black/5 pt-8 mt-10 mb-6">
                                                                            <div className="w-2.5 h-2.5 rounded-sm bg-black/10"></div>
                                                                            <h5 className="text-[11px] uppercase tracking-widest font-bold text-black/40">Supporting Materials</h5>
                                                                        </div>
                                                                    ) : null}
                                                                    <label className="block text-[11px] uppercase tracking-wider font-bold text-black/50 mb-3 ml-1">Lesson Files / Attachments</label>
                                                                    <div className="bg-white rounded-2xl shadow-sm border border-black/10 overflow-hidden">
                                                                        <LessonResources lessonId={lesson.id} />
                                                                    </div>
                                                                </div>
                                                                <div className="flex gap-3 justify-end items-center pt-5 border-t border-black/5 mt-auto">
                                                                    <button onClick={() => setAddingLessonToId(null)} className="px-4 py-2 text-xs font-bold text-black/50 hover:text-black transition-colors rounded-lg hover:bg-black/5">Close</button>
                                                                    <button
                                                                        onClick={async (e) => {
                                                                            const btn = e.currentTarget;
                                                                            btn.innerText = "Saving..."; btn.disabled = true;
                                                                            try {
                                                                                const val = (document.getElementById(`content-${lesson.id}`) as HTMLTextAreaElement).value;
                                                                                const typ = (document.getElementById(`type-${lesson.id}`) as HTMLSelectElement).value;
                                                                                const vid = (document.getElementById(`video-${lesson.id}`) as HTMLInputElement).value;
                                                                                const tlt = (document.getElementById(`title-${lesson.id}`) as HTMLInputElement).value;

                                                                                const payload: any = { id: lesson.id, title: tlt, content: val, type: typ, videoUrl: vid.trim() === "" ? null : vid.trim() };
                                                                                if (typ === "QUIZ") { payload.quizData = lesson.quizData || "[]"; }
                                                                                const res = await fetch("/api/admin/lessons", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
                                                                                const data = await res.json();

                                                                                if (!res.ok) throw new Error(data.error || "Update failed");

                                                                                setCourse(prev => prev ? { ...prev, modules: prev.modules.map(m => m.id === mod.id ? { ...m, lessons: m.lessons.map(l => l.id === lesson.id ? { ...l, ...payload } : l) } : m) } : prev);
                                                                                setAddingLessonToId(null);
                                                                            } catch (err: any) {
                                                                                alert(err.message);
                                                                            } finally {
                                                                                btn.innerText = "Save Content"; btn.disabled = false;
                                                                            }
                                                                        }}
                                                                        className="px-6 py-2 bg-[rgb(255,90,95)] text-white rounded-lg font-bold text-xs hover:bg-[rgb(255,90,95)]/90 shadow-sm transition-transform active:scale-95"
                                                                    >
                                                                        Save Content
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}

                                                {addingLessonToId === mod.id && (
                                                    <div className="mt-4 ml-2 bg-black/[0.02] border border-black/10 p-4 rounded-xl max-w-2xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                                                        <div className="flex gap-4 mb-4 border-b border-black/5 pb-2">
                                                            <button onClick={() => setBulkAddMode(null)} className={`text-xs font-semibold ${!bulkAddMode ? 'text-[rgb(255,90,95)]' : 'text-black/40 hover:text-black transition-colors'}`}>Single Lesson</button>
                                                            <button onClick={() => { setBulkAddMode(mod.id); setBulkTitlesText(""); }} className={`text-xs font-semibold ${bulkAddMode === mod.id ? 'text-[rgb(255,90,95)]' : 'text-black/40 hover:text-black transition-colors'}`}>Bulk Scaffolding</button>
                                                        </div>

                                                        {bulkAddMode === mod.id ? (
                                                            <div className="space-y-3">
                                                                <textarea
                                                                    value={bulkTitlesText}
                                                                    onChange={(e) => setBulkTitlesText(e.target.value)}
                                                                    placeholder="Paste multiple lesson titles here...&#10;e.g.&#10;Introduction to React&#10;Components and Props&#10;State and Lifecycle"
                                                                    className="w-full h-40 rounded-lg border border-black/10 px-3 py-3 text-sm outline-none focus:border-[rgb(255,90,95)] bg-white resize-none leading-relaxed shadow-sm block"
                                                                />
                                                                <div className="flex items-center justify-between">
                                                                    <p className="text-[10px] text-black/40 font-medium">Each non-empty line generates one 'TEXT' lesson.</p>
                                                                    <div className="flex gap-2">
                                                                        <button onClick={() => { setAddingLessonToId(null); setBulkAddMode(null); }} className="px-3 py-1.5 text-black/50 hover:text-black text-xs font-medium transition-colors">Cancel</button>
                                                                        <button onClick={() => handleBulkSaveLessons(mod.id)} className="px-5 py-1.5 bg-[rgb(255,90,95)] text-white rounded-lg text-xs font-bold hover:bg-[rgb(255,90,95)]/90 shadow-sm transition-transform active:scale-95">Bulk Create</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center gap-2">
                                                                <input
                                                                    autoFocus
                                                                    value={newLessonTitle}
                                                                    onChange={(e) => setNewLessonTitle(e.target.value)}
                                                                    placeholder="Lesson Title (e.g. Setting up the environment)"
                                                                    className="flex-1 rounded-lg border border-[rgb(255,90,95)]/30 px-3 py-2 text-sm outline-none focus:border-[rgb(255,90,95)] bg-white shadow-sm"
                                                                    onKeyDown={(e) => e.key === 'Enter' && handleSaveLesson(mod.id)}
                                                                />
                                                                <button onClick={() => handleSaveLesson(mod.id)} className="px-4 py-2 bg-[rgb(255,90,95)] text-white rounded-lg text-sm font-medium hover:bg-[rgb(255,90,95)]/90 transition-colors shadow-sm active:scale-95">Add</button>
                                                                <button onClick={() => { setAddingLessonToId(null); setNewLessonTitle(""); }} className="px-3 py-2 text-black/40 hover:text-black transition-colors">✕</button>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </Card>
                                ))
                            )}

                        </div>
                    </div>

                    {activeTab === 'Pricing' && (
                        <div className="space-y-8">
                            <Card className="p-6 border border-black/5 shadow-sm">
                                <h2 className="text-lg font-semibold mb-6 border-b border-black/5 pb-2 text-black/80">Pricing & Access</h2>
                                <form onSubmit={handleUpdateCourse} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-black/70 mb-1.5">Price (IDR, 0 = Free)</label>
                                            <input type="number" min="0" step="1000" value={course.price || 0} onChange={e => setCourse(c => c ? { ...c, price: parseFloat(e.target.value) || 0 } : c)} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 focus:ring-2 focus:ring-[rgb(255,138,0)]/20 font-medium" placeholder="0" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-black/70 mb-1.5">Status</label>
                                            <select value={course.status} onChange={e => {
                                                if (e.target.value === "TEMPLATE" && (course as any)._count?.enrollments > 0) {
                                                    if (!confirm("This course has active learners. Changing it to a TEMPLATE will hide it from the public catalog. Do you want to proceed?")) return;
                                                }
                                                setCourse(c => c ? { ...c, status: e.target.value } : c);
                                            }} className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 font-medium">
                                                <option value="DRAFT">DRAFT</option>
                                                <option value="PUBLISHED">PUBLISHED</option>
                                                <option value="ARCHIVED">ARCHIVED (Hide from Public)</option>
                                                {sessionRole === "ADMIN" && <option value="TEMPLATE">TEMPLATE (Admin Blueprint)</option>}
                                            </select>
                                            {course.status !== "PUBLISHED" && course.status !== "TEMPLATE" && (course as any)._count?.enrollments > 0 && (
                                                <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 leading-relaxed">
                                                    <strong>⚠️ {(course as any)._count.enrollments} learner(s) enrolled.</strong> This course will be hidden from the public catalog, but enrolled learners will retain access to their content and progress.
                                                </div>
                                            )}
                                            {course.status === "TEMPLATE" && (
                                                <div className="mt-2 p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-xs text-indigo-800 leading-relaxed">
                                                    <strong>Admin Blueprint Template.</strong> This course is hidden from learners. Instructors can use this as a starting structure when building new courses.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-black/5 flex justify-end">
                                        <PrimaryButton type="submit" disabled={saving} className="px-8 py-2.5 shadow-sm text-sm">{saving ? "Saving…" : "Save Changes"}</PrimaryButton>
                                    </div>
                                </form>
                            </Card>

                            {/* Certificate Settings */}
                            <Card className="p-6 border border-black/5 shadow-sm">
                                <h2 className="text-lg font-semibold mb-2 border-b border-black/5 pb-2 text-black/80">Certificate Settings</h2>
                                <p className="text-xs text-black/50 mb-6">Configure how certificates are handled for this course.</p>
                                <form onSubmit={handleUpdateCourse} className="space-y-5">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm font-medium text-black/70 mb-1.5">Certificate Mode</label>
                                            <select
                                                value={(course as any).certificateMode || "INCLUDED"}
                                                onChange={e => setCourse(c => c ? { ...c, certificateMode: e.target.value } as any : c)}
                                                className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 focus:ring-2 focus:ring-[rgb(255,138,0)]/20 font-medium"
                                            >
                                                <option value="INCLUDED">INCLUDED — Free with course</option>
                                                <option value="PAID_DIGITAL">PAID_DIGITAL — Requires separate payment</option>
                                                <option value="DISABLED">DISABLED — No certificate</option>
                                            </select>
                                            <p className="text-[10px] text-black/40 mt-1.5 leading-relaxed">
                                                {(course as any).certificateMode === "PAID_DIGITAL"
                                                    ? "Learners must pay separately for a digital certificate after completing the course."
                                                    : (course as any).certificateMode === "DISABLED"
                                                        ? "No certificate will be issued for this course."
                                                        : "Certificate is automatically issued when the learner completes the course."}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-black/70 mb-1.5">Digital Certificate Price (IDR)</label>
                                            <input
                                                type="number"
                                                min="0"
                                                step="1000"
                                                value={(course as any).digitalCertificatePrice ?? ""}
                                                onChange={e => setCourse(c => c ? { ...c, digitalCertificatePrice: e.target.value === "" ? null : parseInt(e.target.value) || 0 } as any : c)}
                                                disabled={(course as any).certificateMode !== "PAID_DIGITAL"}
                                                className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 focus:ring-2 focus:ring-[rgb(255,138,0)]/20 font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                                                placeholder="e.g. 50000"
                                            />
                                            {(course as any).certificateMode === "PAID_DIGITAL" && (!(course as any).digitalCertificatePrice || (course as any).digitalCertificatePrice <= 0) && (
                                                <p className="text-[10px] text-[rgb(255,90,95)] font-semibold mt-1.5">⚠ Price must be set when certificate mode is PAID_DIGITAL.</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-black/5 flex justify-end">
                                        <PrimaryButton type="submit" disabled={saving} className="px-8 py-2.5 shadow-sm text-sm">{saving ? "Saving…" : "Save Certificate Settings"}</PrimaryButton>
                                    </div>
                                </form>
                            </Card>

                            {sessionRole === "ADMIN" && (
                                <Card className="p-6 border border-black/10 shadow-sm bg-white">
                                    <h3 className="font-semibold mb-4 text-xs uppercase tracking-widest text-[rgb(255,90,95)]">Manual Access Override</h3>
                                    <form className="space-y-4" onSubmit={async (e) => {
                                        e.preventDefault();
                                        const submitBtn = (e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement);
                                        submitBtn.disabled = true;
                                        submitBtn.innerText = "Executing...";
                                        try {
                                            const email = (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value;
                                            const action = (e.currentTarget.elements.namedItem("action") as HTMLSelectElement).value;
                                            const res = await fetch("/api/admin/enrollments", {
                                                method: action,
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({ email, courseId: course.id })
                                            });
                                            const data = await res.json();
                                            if (!res.ok) throw new Error(data.error || "Override failed");
                                            alert(data.success ? `Success: ${action === "POST" ? "Access granted." : "Access revoked."}` : "Completed");
                                            (e.target as HTMLFormElement).reset();
                                        } catch (err: any) {
                                            alert(err.message);
                                        } finally {
                                            submitBtn.disabled = false;
                                            submitBtn.innerText = "Execute Override";
                                        }
                                    }}>
                                        <div className="flex gap-4">
                                            <input name="email" required placeholder="Learner Email" className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-black/25" />
                                            <select name="action" className="w-1/3 rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-black/25 font-medium">
                                                <option value="POST">Grant Enrollment</option>
                                                <option value="DELETE">Revoke Enrollment</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between items-center mt-2">
                                            <p className="text-[10px] text-black/40 max-w-sm leading-4">This action bypasses payment gates. Only explicit ADMIN tokens will successfully authorize against the backend.</p>
                                            <SecondaryButton type="submit" className="py-2 px-6 text-xs border font-semibold border-black/10 hover:border-black/20">Execute Override</SecondaryButton>
                                        </div>
                                    </form>
                                </Card>
                            )}
                        </div>
                    )}

                    {activeTab === 'Settings' && (
                        <div className="space-y-8">
                            <Card className="p-6 border border-black/5 shadow-sm">
                                <h2 className="text-lg font-semibold mb-6 border-b border-black/5 pb-2 text-black/80">Danger Zone & Admin Tools</h2>

                                {sessionRole === "ADMIN" && instructors.length > 0 && (
                                    <div className="mb-8 p-5 bg-black/[0.02] border border-black/5 rounded-xl">
                                        <label className="block text-sm font-medium text-black/70 mb-1.5 pt-1">Transfer Instructor Ownership</label>
                                        <select
                                            value={course.instructorId || ""}
                                            onChange={async (e) => {
                                                const newInstructorId = e.target.value;
                                                const instructor = instructors.find(i => i.id === newInstructorId);
                                                if (!instructor) return;
                                                if (!confirm(`Reassign this course to ${instructor.name} (${instructor.email})?`)) {
                                                    e.target.value = course.instructorId || "";
                                                    return;
                                                }
                                                try {
                                                    const res = await fetch("/api/admin/courses", {
                                                        method: "PUT",
                                                        headers: { "Content-Type": "application/json" },
                                                        body: JSON.stringify({ id: course.id, instructorId: newInstructorId }),
                                                    });
                                                    const data = await res.json();
                                                    if (!res.ok) throw new Error(data.error || "Reassignment failed");
                                                    setCourse(c => c ? { ...c, instructorId: newInstructorId } : c);
                                                    setSuccessMsg(`Course reassigned to ${instructor.name}.`);
                                                    setTimeout(() => setSuccessMsg(""), 3000);
                                                } catch (err: any) {
                                                    setErrorMsg(err.message);
                                                }
                                            }}
                                            className="w-full rounded-xl border border-black/10 px-4 py-3 text-sm outline-none transition focus:border-black/25 font-medium mb-1"
                                        >
                                            {!course.instructorId && <option value="">— Unassigned —</option>}
                                            {instructors.map(i => (
                                                <option key={i.id} value={i.id}>{i.name} ({i.email})</option>
                                            ))}
                                        </select>
                                        <p className="text-[10px] text-black/40">Changing the instructor will permanently transfer ownership of this course. Only Admins can undo this.</p>
                                    </div>
                                )}

                                <div className="flex items-center gap-4 pt-4 border-t border-black/5">
                                    <button
                                        onClick={async () => {
                                            if (!confirm(`Duplicate "${course.title}"?\n\nA new independent DRAFT will be created. Learner data and paths will NOT be copied.`)) return;
                                            try {
                                                setSuccessMsg("Duplicating course... please wait.");
                                                setErrorMsg("");
                                                const res = await fetch(`/api/admin/courses/${course.id}/duplicate`, { method: "POST" });
                                                if (!res.ok) {
                                                    const text = await res.text();
                                                    throw new Error(text || "Duplication failed");
                                                }
                                                const data = await res.json();
                                                setSuccessMsg("Course duplicated! Redirecting...");
                                                router.push(`/admin/courses/${data.courseId}/edit`);
                                            } catch (err: any) {
                                                setErrorMsg(err.message || "Failed to duplicate course.");
                                                setSuccessMsg("");
                                                window.scroll({ top: 0, behavior: "smooth" });
                                            }
                                        }}
                                        className="text-xs font-semibold px-4 py-2 border border-black/10 rounded-lg hover:bg-black/5 text-black/70 transition-colors"
                                    >
                                        ⎘ Duplicate Course
                                    </button>
                                    <button
                                        onClick={async () => {
                                            if (!confirm(`Are you sure you want to attempt deleting "${course.title}"?`)) return;
                                            try {
                                                const res = await fetch("/api/admin/courses", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: course.id }) });
                                                const data = await res.json();
                                                if (!res.ok) throw new Error(data.error);
                                                router.push("/admin/courses");
                                            } catch (err: any) {
                                                setErrorMsg(err.message);
                                                window.scroll({ top: 0, behavior: "smooth" });
                                            }
                                        }}
                                        className="text-xs font-semibold px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        ⊘ Attempt Deletion
                                    </button>
                                </div>
                            </Card>
                        </div>
                    )}

                </div>

                <div>
                    {(() => {
                        const isLessonValid = (l: any) => {
                            if (l.type === "TEXT" && l.content && l.content.trim().length > 10) return true;
                            if (l.type === "VIDEO" && l.videoUrl && l.videoUrl.trim().length > 5) return true;
                            if (l.type === "QUIZ" && l.quizData && l.quizData.trim().length > 10) {
                                try { const qs = JSON.parse(l.quizData); if (Array.isArray(qs) && qs.length > 0) return true; } catch { }
                            }
                            return false;
                        };

                        const hasTitle = course.title.trim().length > 0;
                        const hasDescription = course.description.trim().length > 0;
                        const hasThumbnail = !!course.thumbnailUrl;
                        const hasModules = course.modules.length > 0;
                        const totalLessons = course.modules.reduce((acc, m) => acc + m.lessons.length, 0);
                        const hasAnyLesson = totalLessons > 0;
                        const invalidLessonsCount = course.modules.reduce((acc, m) => acc + m.lessons.filter(l => !isLessonValid(l)).length, 0);
                        const allLessonsValid = hasAnyLesson && invalidLessonsCount === 0;

                        const parseArr = (str?: string | null) => {
                            if (!str) return [];
                            try { const p = JSON.parse(str); return Array.isArray(p) ? p : []; } catch { return []; }
                        };
                        const hasOutcomes = parseArr(course.outcomesData).length > 0;
                        const hasAudience = parseArr(course.audienceData).length > 0;
                        const hasPrereqs = parseArr(course.prerequisitesData).length > 0;

                        const CheckItem = ({ label, done, warning }: { label: string, done: boolean, warning?: string }) => (
                            <li className="flex items-start gap-3">
                                <span className={`w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center rounded-full text-[10px] text-white transition-colors ${done ? "bg-green-500" : "bg-black/10"}`}>
                                    {done ? "✓" : ""}
                                </span>
                                <div>
                                    <span className={`block font-medium transition-colors ${done ? "text-black/80" : "text-black/50"}`}>{label}</span>
                                    {!done && warning && <span className="block mt-0.5 text-xs text-red-500/80 font-medium leading-tight">{warning}</span>}
                                </div>
                            </li>
                        );

                        return (
                            <Card className="p-6 sticky top-6 bg-[#FFFdf9] border border-black/10 shadow-sm flex flex-col gap-6">
                                <div>
                                    <h3 className="font-bold mb-4 text-xs uppercase tracking-widest text-[rgb(255,90,95)]">Course Readiness</h3>
                                    <ul className="text-sm space-y-3.5">
                                        <CheckItem done={hasTitle} label="Title provided" />
                                        <CheckItem done={hasDescription} label="Description added" />
                                        <CheckItem done={hasThumbnail} label="Cover Image uploaded" warning="Required for publish." />
                                        <CheckItem done={hasModules} label="At least 1 module" warning="Course structure is empty." />
                                        <CheckItem done={allLessonsValid} label="No empty lessons" warning={invalidLessonsCount > 0 ? `${invalidLessonsCount} lesson(s) missing valid content.` : (hasAnyLesson ? "" : "Course needs at least 1 lesson.")} />
                                    </ul>
                                </div>
                                <div className="pt-5 border-t border-black/5">
                                    <h3 className="font-bold mb-4 text-[10px] uppercase tracking-widest text-black/40">Recommended for Quality</h3>
                                    <ul className="text-sm space-y-3.5">
                                        <CheckItem done={hasOutcomes} label="Learning Outcomes" />
                                        <CheckItem done={hasAudience} label="Target Audience" />
                                        <CheckItem done={hasPrereqs} label="Prerequisites" />
                                    </ul>
                                </div>
                            </Card>
                        );
                    })()}


                </div>
            </div>
        </div >
    );
}

