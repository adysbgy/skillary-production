"use client";

import React, { useState, useMemo } from "react";
import type { CaseStudy } from "@/lib/legacy-portfolio";

const ALL_CATEGORIES = [
  "Semua",
  "Infographics & Visual Communication",
  "Data Analytics, Dashboard & Storytelling",
  "Presentation, Reporting & Business Communication",
  "AI & Digital Mindset",
  "Leadership & Problem Solving",
];

const SHORT_LABELS: Record<string, string> = {
  "Infographics & Visual Communication": "Infografis",
  "Data Analytics, Dashboard & Storytelling": "Data & Dashboard",
  "Presentation, Reporting & Business Communication": "Presentasi",
  "Process Improvement, SOP & Quality": "SOP & Quality",
  "AI & Digital Mindset": "AI & Digital",
  "Leadership & Problem Solving": "Leadership",
};

const CATEGORY_ACCENT: Record<string, { badge: string; stripe: string }> = {
  "Infographics & Visual Communication": { badge: "bg-violet-50 text-violet-700 border-violet-200", stripe: "bg-violet-500" },
  "Data Analytics, Dashboard & Storytelling": { badge: "bg-orange-50 text-orange-700 border-orange-200", stripe: "bg-orange-500" },
  "Presentation, Reporting & Business Communication": { badge: "bg-amber-50 text-amber-700 border-amber-200", stripe: "bg-amber-500" },
  "Process Improvement, SOP & Quality": { badge: "bg-rose-50 text-rose-700 border-rose-200", stripe: "bg-rose-500" },
  "AI & Digital Mindset": { badge: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200", stripe: "bg-fuchsia-500" },
  "Leadership & Problem Solving": { badge: "bg-stone-50 text-stone-700 border-stone-200", stripe: "bg-stone-500" },
};

export function CaseStudyExplorer({ cases }: { cases: CaseStudy[] }) {
  const [active, setActive] = useState("Semua");

  const filtered = useMemo(() => {
    if (active === "Semua") return cases;
    return cases.filter((c) => c.category === active);
  }, [active, cases]);

  // Only show categories that have at least one case
  const availableCategories = useMemo(() => {
    const cats = new Set(cases.map((c) => c.category));
    return ALL_CATEGORIES.filter((cat) => cat === "Semua" || cats.has(cat));
  }, [cases]);

  return (
    <div>
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {availableCategories.map((cat) => {
          const isActive = cat === active;
          const count = cat === "Semua" ? cases.length : cases.filter((c) => c.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                isActive
                  ? "bg-[#0F172A] text-white border-[#0F172A]"
                  : "bg-white text-[#475569] border-[#E7DDD4] hover:border-[#CBD5E1]"
              }`}
            >
              {cat === "Semua" ? "Semua" : SHORT_LABELS[cat] || cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map((cs) => {
          const accent = CATEGORY_ACCENT[cs.category] || { badge: "bg-gray-50 text-gray-600 border-gray-200", stripe: "bg-gray-400" };
          const hasProof = cs.proofUrls.length > 0;

          return (
            <article
              key={cs.id}
              className="bg-white border border-[#E7DDD4] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Colored top stripe */}
              <div className={`h-1 ${accent.stripe}`} />

              <div className="p-6 flex-1 flex flex-col">
                {/* Header badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${accent.badge}`}>
                    {SHORT_LABELS[cs.category] || cs.category}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#D88A44] bg-[#FAF3EA] px-2 py-0.5 rounded-full border border-[#E7DDD4]">
                    Arsip Allman
                  </span>
                </div>

                {/* Program title */}
                <h3 className="font-bold text-[#0F172A] text-lg leading-snug mb-2">{cs.program}</h3>

                {/* Client & meta */}
                <div className="space-y-1 text-xs text-[#64748B] mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="font-medium text-[#334155]">{cs.client}</span>
                    <span className="text-[#CBD5E1]">·</span>
                    <span>{cs.sector}</span>
                  </div>
                  {(cs.trainingDate || cs.city || cs.venue) && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {cs.trainingDate && <span>{cs.trainingDate}</span>}
                      {cs.city && (
                        <>
                          <span className="text-[#CBD5E1]">·</span>
                          <span>{cs.city}</span>
                        </>
                      )}
                      {cs.venue && (
                        <>
                          <span className="text-[#CBD5E1]">·</span>
                          <span>{cs.venue}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Training Focus */}
                <div className="mb-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-1">Fokus Pelatihan</p>
                  <p className="text-xs text-[#475569] leading-relaxed">{cs.trainingFocus}</p>
                </div>

                {/* Skillary Relevance */}
                <div className="mb-4 flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#94A3B8] mb-1">Relevansi Skillary</p>
                  <p className="text-xs text-[#475569] leading-relaxed">{cs.skillaryRelevance}</p>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-[#FAFAF8] border-t border-[#F1EDE8] flex items-center justify-between">
                <span className="text-[10px] text-[#94A3B8]">
                  {cs.supportingPosts} post{cs.supportingPosts > 1 ? "s" : ""} pendukung
                </span>

                {hasProof ? (
                  <a
                    href={cs.proofUrls[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#172554] hover:underline flex items-center gap-1"
                  >
                    Lihat Dokumentasi ↗
                    {cs.proofUrls.length > 1 && (
                      <span className="text-[9px] text-[#94A3B8] ml-0.5">+{cs.proofUrls.length - 1}</span>
                    )}
                  </a>
                ) : (
                  <span className="text-[10px] font-medium text-[#C2410C] bg-[#FFF8F1] border border-[#E7DDD4] px-2 py-0.5 rounded">
                    Dokumentasi perlu validasi
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#94A3B8]">
          <p className="text-lg font-medium">Tidak ada studi kasus untuk kategori ini.</p>
        </div>
      )}
    </div>
  );
}
