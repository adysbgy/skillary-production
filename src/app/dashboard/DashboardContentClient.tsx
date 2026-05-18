"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { PrimaryButton, GradientButton } from "@/components/ui/Button";

type FilterTab = "ALL" | "IN_PROGRESS" | "COMPLETED" | "PATHS" | "CERTIFICATES";

export default function DashboardContentClient({
    activePaths,
    completedPaths,
    inProgressUnsorted,
    remainingInProgress,
    completed,
    certificates,
    certByCourseIdMap
}: {
    activePaths: any[];
    completedPaths: any[];
    inProgressUnsorted: any[];
    remainingInProgress: any[];
    completed: any[];
    certificates: any[];
    certByCourseIdMap: Record<string, any>; // Used simple standard object instead of Map
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<FilterTab>("ALL");

    // Reconstruct the map safely due to Next.js serialization of Map
    const certByCourseId = new Map(Object.entries(certByCourseIdMap));

    // Normalize search query
    const q = searchQuery.toLowerCase().trim();

    // Filters
    const filteredActivePaths = activePaths.filter((item: any) => item.path.title.toLowerCase().includes(q));
    const filteredCompletedPaths = completedPaths.filter((item: any) => item.path.title.toLowerCase().includes(q));

    const filteredInProgress = remainingInProgress.filter((item: any) => item.course.title.toLowerCase().includes(q));
    const filteredCompleted = completed.filter((item: any) => item.course.title.toLowerCase().includes(q));

    // Certificates don't have search text yet usually, but filtering by course title
    const filteredCertificates = certificates.filter((cert: any) => cert.course.title.toLowerCase().includes(q));

    const totalPaths = activePaths.length + completedPaths.length;

    const showPaths = (activeTab === "ALL" || activeTab === "PATHS") && (filteredActivePaths.length > 0 || filteredCompletedPaths.length > 0);
    const showInProgress = (activeTab === "ALL" || activeTab === "IN_PROGRESS") && filteredInProgress.length > 0;
    const showCompleted = (activeTab === "ALL" || activeTab === "COMPLETED") && filteredCompleted.length > 0;
    const showCertificates = (activeTab === "ALL" || activeTab === "CERTIFICATES") && filteredCertificates.length > 0;

    const noResults = !showPaths && !showInProgress && !showCompleted && !showCertificates;

    return (
        <div>
            {/* Search and Filter Controls */}
            <div className="mb-8 space-y-4">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-black/30">🔍</span>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search your courses, paths, and certificates..."
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-black/10 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF8A00] focus:border-transparent transition-all"
                    />
                </div>

                {/* Tabs */}
                <div className="flex flex-wrap gap-2">
                    <TabButton active={activeTab === "ALL"} onClick={() => setActiveTab("ALL")} label="All Enrolled" />
                    <TabButton active={activeTab === "IN_PROGRESS"} onClick={() => setActiveTab("IN_PROGRESS")} label={`In Progress (${inProgressUnsorted.length})`} />
                    <TabButton active={activeTab === "COMPLETED"} onClick={() => setActiveTab("COMPLETED")} label={`Completed (${completed.length})`} />
                    {(totalPaths > 0) && (
                        <TabButton active={activeTab === "PATHS"} onClick={() => setActiveTab("PATHS")} label={`Paths (${totalPaths})`} />
                    )}
                    {(certificates.length > 0) && (
                        <TabButton active={activeTab === "CERTIFICATES"} onClick={() => setActiveTab("CERTIFICATES")} label={`Certificates (${certificates.length})`} />
                    )}
                </div>
            </div>

            {noResults && (
                <Card className="p-12 text-center border-dashed border-black/10 bg-white">
                    <div className="mx-auto w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mb-3">
                        <span className="text-xl opacity-40">🔍</span>
                    </div>
                    <h3 className="text-lg font-medium text-black/80 mb-2">No learning found</h3>
                    <p className="text-sm text-black/50 mb-6">We couldn't find anything matching "{searchQuery}" in your current view.</p>
                    <button onClick={() => { setSearchQuery(""); setActiveTab("ALL"); }} className="px-6 py-2 text-sm font-semibold rounded-xl border border-black/10 hover:bg-black/5 transition-colors">
                        Clear Search
                    </button>
                </Card>
            )}

            <div className="space-y-8">
                {/* Joined Paths */}
                {showPaths && (
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight mb-4">
                            Your Learning Paths
                        </h2>
                        <div className="space-y-4">
                            {filteredActivePaths.map((item: any) => (
                                <Card key={item.id} className="p-5 hover:border-[rgb(255,138,0)]/30 transition-all border-[rgb(255,138,0)]/20 bg-[#FFFDF9] ring-1 ring-[rgb(255,138,0)]/10">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                        <div className="flex-1 min-w-0">
                                            <div className="mb-2">
                                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>
                                                    {item.path.mode === "SEQUENTIAL" ? "Sequential Path" : "Learning Path"}
                                                </span>
                                            </div>
                                            <h3 className="text-base font-semibold tracking-tight truncate mb-1">
                                                {item.path.title}
                                                {item.path.status !== "PUBLISHED" && (
                                                    <span className="ml-2 align-middle inline-block px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-black/5 text-black/40 border border-black/10">Archived</span>
                                                )}
                                            </h3>
                                            <p className="text-xs text-black/50 truncate mb-4">
                                                <span className="font-semibold text-black/70 mr-1.5 uppercase tracking-wider text-[9px]">Up next:</span>
                                                {item.nextCourse?.title || "Finish pending courses"}
                                            </p>

                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-1.5 rounded-full bg-black/8 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full transition-all duration-500"
                                                        style={{ width: `${item.percent}%`, background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-bold text-black/40 shrink-0 uppercase tracking-wider">
                                                    {item.completedCount} / {item.totalCourses}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="shrink-0">
                                            <Link href={`/path/${item.path.slug}`}>
                                                <button className="px-5 py-2.5 text-xs font-semibold rounded-xl bg-[#181818] text-white hover:bg-black/80 transition-colors uppercase tracking-wider whitespace-nowrap">View Path</button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                            {filteredCompletedPaths.map((item: any) => (
                                <Card key={item.id} className="p-5 hover:border-green-200 transition-all border-green-100 bg-green-50/50">
                                    <div className="flex items-center justify-between gap-5">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs shrink-0 font-bold">✓</div>
                                            <div className="min-w-0">
                                                <div className="mb-1">
                                                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-sm bg-[#181818] text-white uppercase tracking-wider">Learning Path</span>
                                                </div>
                                                <h4 className="font-semibold text-sm truncate text-green-900">
                                                    {item.path.title}
                                                    {item.path.status !== "PUBLISHED" && (
                                                        <span className="ml-2 align-top inline-block px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-green-900/10 text-green-900/60 border border-green-900/20">Archived</span>
                                                    )}
                                                </h4>
                                                <p className="text-xs text-green-700/60 font-medium">All {item.totalCourses} courses completed</p>
                                            </div>
                                        </div>
                                        <div className="shrink-0 flex items-center gap-3">
                                            <Link href={`/path/${item.path.slug}`}>
                                                <button className="px-4 py-2 text-xs font-semibold rounded-xl bg-green-200/50 text-green-800 hover:bg-green-200 transition-colors">Review</button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* In Progress Courses */}
                {showInProgress && (
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight mb-4">
                            In Progress
                        </h2>
                        <div className="space-y-4">
                            {filteredInProgress.map((item: any) => (
                                <Card key={item.id} className="p-5 hover:border-black/20 transition-all border-black/5 bg-[#FFFDF9]">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-base font-semibold tracking-tight truncate mb-1">
                                                {item.course.title}
                                                {item.course.status !== "PUBLISHED" && (
                                                    <span className="ml-2 align-middle inline-block px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-black/5 text-black/40 border border-black/10">Archived</span>
                                                )}
                                            </h3>
                                            <p className="text-xs text-black/50 truncate mb-4">
                                                <span className="font-semibold text-black/70 mr-1.5 uppercase tracking-wider text-[9px]">Up next:</span>
                                                {item.nextModule?.title} <span className="mx-1 opacity-50">•</span> {item.nextLesson?.title}
                                            </p>

                                            {/* Progress Bar */}
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 h-1.5 rounded-full bg-black/8 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-black/80 transition-all duration-500"
                                                        style={{ width: `${item.percent}%` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-bold text-black/40 shrink-0 uppercase tracking-wider">
                                                    {item.percent}%
                                                </span>
                                            </div>
                                        </div>
                                        {item.nextLessonSlug && (
                                            <Link href={`/learn/${item.course.slug}/${item.nextLessonSlug}`} className="shrink-0">
                                                <button className="px-5 py-2.5 text-xs font-semibold rounded-xl border border-black/10 hover:bg-black/5 transition-colors uppercase tracking-wider">Continue</button>
                                            </Link>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State for In Progress (only show if viewing ALL and no items match) */}
                {activeTab === "ALL" && !searchQuery && remainingInProgress.length === 0 && inProgressUnsorted.length === 0 && completed.length === 0 && (
                    <Card className="p-10 text-center border-dashed border-black/10">
                        <h3 className="text-lg font-medium text-black/80 mb-2">No active courses</h3>
                        <p className="text-sm text-black/50 mb-6">Explore our catalog and find your next skill.</p>
                        <Link href="/explore">
                            <GradientButton className="px-8">Browse Catalog</GradientButton>
                        </Link>
                    </Card>
                )}

                {/* Completed Courses */}
                {showCompleted && (
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight mb-4">
                            Completed
                        </h2>
                        <div className="space-y-3">
                            {filteredCompleted.map((item: any) => {
                                const cert = certByCourseId.get(item.course.id);
                                return (
                                    <Card key={item.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-black/5 hover:shadow-md transition-shadow bg-white">
                                        <div className="flex items-center gap-3 min-w-0 flex-1">
                                            <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs shrink-0 font-bold">✓</div>
                                            <div className="min-w-0">
                                                <h4 className="font-semibold text-sm truncate">
                                                    {item.course.title}
                                                    {item.course.status !== "PUBLISHED" && (
                                                        <span className="ml-2 align-top inline-block px-1.5 py-0.5 rounded text-[9px] uppercase font-bold tracking-wider bg-black/5 text-black/40 border border-black/10">Archived</span>
                                                    )}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <p className="text-xs text-black/40">{item.totalLessons} lessons</p>
                                                    {item.completedAt && (
                                                        <span className="text-[10px] text-black/30">· Completed {new Date(item.completedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            {cert ? (
                                                <Link href={`/certificate/${cert.uniqueCode}`} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-bold hover:shadow-md transition-all" style={{ background: 'rgba(255, 138, 0, 0.1)', color: 'rgb(255, 138, 0)', borderColor: 'rgba(255, 138, 0, 0.2)' }}>
                                                    🎓 View Certificate
                                                </Link>
                                            ) : (
                                                <Link href={`/learn/${item.course.slug}`} className="text-xs text-black/40 font-semibold hover:text-black/60 transition-colors">
                                                    Review →
                                                </Link>
                                            )}
                                        </div>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Certificates */}
                {showCertificates && (
                    <div>
                        <h2 className="text-xl font-semibold tracking-tight mb-4">Certificates</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {filteredCertificates.map((cert: any) => (
                                <Link key={cert.id} href={`/certificate/${cert.uniqueCode}`}>
                                    <Card className="p-5 flex items-center justify-between border-black/5 hover:border-[rgb(255,138,0)]/30 hover:shadow-md transition-all group">
                                        <div className="min-w-0">
                                            <h4 className="font-semibold text-sm group-hover:text-[rgb(255,138,0)] transition-colors truncate pr-4">{cert.course.title}</h4>
                                            <span className="text-xs text-black/40 mt-1 block font-mono">Issued: {new Date(cert.issuedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                        </div>
                                        <div className="h-10 w-10 shrink-0 rounded-full flex items-center justify-center border" style={{ background: 'rgba(255, 138, 0, 0.1)', color: 'rgb(255, 138, 0)', borderColor: 'rgba(255, 138, 0, 0.2)' }}>
                                            🎓
                                        </div>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-xs font-semibold rounded-full border transition-all ${active
                ? "bg-[#181818] text-white border-[#181818]"
                : "bg-white text-black/60 border-black/10 hover:border-black/30 hover:text-black/80"
                }`}
        >
            {label}
        </button>
    );
}
