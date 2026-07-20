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
      <div className="flex flex-wrap gap-2.5 mb-12 justify-center" role="group" aria-label="Filter kategori portofolio">
        {ALL_CATEGORIES.map((cat) => {
          const isActive = cat === active;
          const count = cat === "Semua" ? cards.length : cards.filter((c) => c.category === cat).length;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={isActive}
              className={`min-h-11 text-xs font-bold px-4 py-2.5 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
                isActive
                  ? "text-white border-transparent shadow-lg shadow-orange-500/15"
                  : "bg-white text-[#475569] border-[#E7DDD4] hover:border-orange-300 hover:bg-orange-50/60"
              }`}
              style={isActive ? { background: "linear-gradient(111deg, rgb(255,138,0), rgb(255,90,95))" } : undefined}
            >
              {cat === "Semua" ? "Semua dokumentasi" : SHORT_LABELS[cat] || cat}
              <span className={`ml-2 text-[10px] ${isActive ? "text-white/75" : "text-[#94A3B8]"}`}>{count}</span>
            </button>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((card) => {
          const catColor = CATEGORY_COLORS[card.category] || "bg-gray-50 text-gray-600 border-gray-200";
          const hasProof = card.proof_urls.length > 0;
          return (
            <article
              key={card.id}
              className="group bg-white border border-[#E7DDD4] rounded-[1.35rem] overflow-hidden hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.10)] transition-all duration-300 flex flex-col"
            >
              <div className="h-1.5 w-full" style={{ background: "linear-gradient(111deg, rgb(255,138,0), rgb(255,90,95))" }} />
              <div className="px-5 pt-5 pb-4 flex-1">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <span className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${catColor}`}>
                    {SHORT_LABELS[card.category] || card.category}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#C2410C] bg-[#FFF7ED] px-2.5 py-1 rounded-full border border-[#FED7AA]">
                    Arsip terkurasi
                  </span>
                </div>

                <h3 className="font-extrabold text-[#0F172A] leading-snug mb-4 text-base group-hover:text-[#C2410C] transition-colors">{card.program}</h3>

                <div className="space-y-2.5 text-xs text-[#64748B]">
                  <div className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0H5m14 0h2M5 21H3m6-14h6m-6 4h6m-6 4h3" /></svg>
                    <div><span className="font-bold text-[#334155]">{card.client}</span><span className="block text-[#94A3B8] mt-0.5">{card.sector}</span></div>
                  </div>
                  {(card.training_date || card.city || card.venue) && (
                    <div className="flex items-start gap-2.5">
                      <svg className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M5 11h14M5 5h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" /></svg>
                      <div>
                        {card.training_date && <span className="font-medium text-[#475569]">{card.training_date}</span>}
                        {(card.city || card.venue) && <span className="block text-[#94A3B8] mt-0.5">{[card.city, card.venue].filter(Boolean).join(" · ")}</span>}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-5 py-4 bg-[#FAFAF8] border-t border-[#F1EDE8] flex items-center justify-between gap-3">
                <span className="text-[10px] font-semibold text-[#94A3B8]">
                  {card.supporting_posts} dokumentasi
                </span>
                {hasProof ? (
                  <a
                    href={card.proof_urls[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Lihat dokumentasi Instagram ${card.program}`}
                    className="min-h-11 inline-flex items-center justify-center gap-2 text-xs font-bold text-white px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
                    style={{ background: "linear-gradient(111deg, rgb(255,138,0), rgb(255,90,95))" }}
                  >
                    Lihat di Instagram
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5m0-5L10 14M5 7v12h12" /></svg>
                    {card.proof_urls.length > 1 && <span className="text-[9px] text-white/75">+{card.proof_urls.length - 1}</span>}
                  </a>
                ) : (
                  <span className="text-[10px] font-medium text-[#C2410C] bg-[#FFF8F1] border border-[#E7DDD4] px-2.5 py-1 rounded-full">
                    Dokumentasi belum tersedia
                  </span>
                )}
              </div>
            </article>
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
