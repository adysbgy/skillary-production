"use client";

import React, { useState, useMemo } from "react";
import type { PortfolioCard } from "@/lib/legacy-portfolio";

const ALL_CATEGORIES = [
  "Semua",
  "Infographics & Visual Communication",
  "Data Analytics, Dashboard & Storytelling",
  "Presentation, Reporting & Business Communication",
  "Process Improvement, SOP & Quality",
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

const CATEGORY_COLORS: Record<string, string> = {
  "Infographics & Visual Communication": "bg-violet-50 text-violet-700 border-violet-200",
  "Data Analytics, Dashboard & Storytelling": "bg-orange-50 text-orange-700 border-orange-200",
  "Presentation, Reporting & Business Communication": "bg-amber-50 text-amber-700 border-amber-200",
  "Process Improvement, SOP & Quality": "bg-rose-50 text-rose-700 border-rose-200",
  "AI & Digital Mindset": "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
  "Leadership & Problem Solving": "bg-stone-50 text-stone-700 border-stone-200",
};

export function PortfolioExplorer({ cards }: { cards: PortfolioCard[] }) {
  const [active, setActive] = useState("Semua");

  const filtered = useMemo(() => {
    if (active === "Semua") return cards;
    return cards.filter((c) => c.category === active);
  }, [active, cards]);

  return (
    <div>
      {/* Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {ALL_CATEGORIES.map((cat) => {
          const isActive = cat === active;
          const count = cat === "Semua" ? cards.length : cards.filter((c) => c.category === cat).length;
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((card) => {
          const catColor = CATEGORY_COLORS[card.category] || "bg-gray-50 text-gray-600 border-gray-200";
          const hasProof = card.proof_urls.length > 0;
          return (
            <div
              key={card.id}
              className="bg-white border border-[#E7DDD4] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
            >
              {/* Card Header */}
              <div className="px-5 pt-5 pb-3 flex-1">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${catColor}`}>
                    {SHORT_LABELS[card.category] || card.category}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#D88A44] bg-[#FAF3EA] px-2 py-0.5 rounded-full border border-[#E7DDD4]">
                    Arsip Allman
                  </span>
                </div>

                <h3 className="font-bold text-[#0F172A] leading-snug mb-1.5 text-[15px]">{card.program}</h3>

                <div className="space-y-1 text-xs text-[#64748B]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#94A3B8]">•</span>
                    <span className="font-medium text-[#334155]">{card.client}</span>
                    <span className="text-[#CBD5E1]">—</span>
                    <span>{card.sector}</span>
                  </div>
                  {(card.training_date || card.city || card.venue) && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[#94A3B8]">•</span>
                      {card.training_date && <span>{card.training_date}</span>}
                      {card.city && <span className="text-[#94A3B8]">· {card.city}</span>}
                      {card.venue && <span className="text-[#94A3B8]">· {card.venue}</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-5 py-3 bg-[#FAFAF8] border-t border-[#F1EDE8] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {card.status === "case_candidate" && (
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#C2410C] bg-[#FFF7ED] border border-[#FED7AA] px-1.5 py-0.5 rounded">
                      Case Study
                    </span>
                  )}
                  <span className="text-[10px] text-[#94A3B8]">
                    {card.supporting_posts} post{card.supporting_posts > 1 ? "s" : ""}
                  </span>
                </div>

                {hasProof ? (
                  <a
                    href={card.proof_urls[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-bold text-[#172554] hover:underline flex items-center gap-1"
                  >
                    Lihat Dokumentasi ↗
                    {card.proof_urls.length > 1 && (
                      <span className="text-[9px] text-[#94A3B8] ml-1">+{card.proof_urls.length - 1}</span>
                    )}
                  </a>
                ) : (
                  <span className="text-[10px] font-medium text-[#C2410C] bg-[#FFF8F1] border border-[#E7DDD4] px-2 py-0.5 rounded">
                    Perlu validasi dokumentasi
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-[#94A3B8]">
          <p className="text-lg font-medium">Tidak ada portfolio untuk kategori ini.</p>
        </div>
      )}
    </div>
  );
}
