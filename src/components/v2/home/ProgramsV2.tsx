"use client";

import { useState } from "react";
import Link from "next/link";

const TABS = ["Semua", "Data & Analytics", "Presentasi", "AI & Digital", "Leadership", "SOP & Quality"] as const;
type Tab = (typeof TABS)[number];

// ─── Clean SVG icon per category (Apple Institute style — no emoji) ──────
const CATEGORY_ICON: Record<string, React.ReactNode> = {
  "Data & Analytics": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  "Presentasi": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
    </svg>
  ),
  "AI & Digital": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  "Leadership": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  "SOP & Quality": (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
};

const PROGRAMS = [
  {
    category: "Data & Analytics",
    level: "Menengah",
    levelColor: "rgb(59, 130, 246)",
    levelBg: "rgb(219, 234, 254)",
    title: "Power BI Business Dashboard",
    desc: "Membangun dashboard interaktif dari data mentah hingga insight siap presentasi untuk tim bisnis.",
    tags: ["In-house", "Online / Hybrid", "Sertifikat"],
    duration: "2 hari",
    sessions: "4–6 sesi",
    thumb: "📊",
    thumbBg: "linear-gradient(135deg, rgb(59,130,246), rgb(99,102,241))",
  },
  {
    category: "Data & Analytics",
    level: "Menengah",
    levelColor: "rgb(59, 130, 246)",
    levelBg: "rgb(219, 234, 254)",
    title: "Data-Driven Decision Making",
    desc: "Membaca, menganalisis, dan mengkomunikasikan data untuk pengambilan keputusan berbasis fakta.",
    tags: ["In-house", "Online / Hybrid", "Sertifikat"],
    duration: "2 hari",
    sessions: "4–6 sesi",
    thumb: "📈",
    thumbBg: "linear-gradient(135deg, rgb(16,185,129), rgb(5,150,105))",
  },
  {
    category: "Presentasi",
    level: "Semua Level",
    levelColor: "rgb(255, 138, 0)",
    levelBg: "rgb(255, 244, 232)",
    title: "Business Presentation & Reporting",
    desc: "Menyusun presentasi bisnis yang persuasif, ringkas, dan mudah dipahami manajemen.",
    tags: ["In-house", "Online / Hybrid", "Sertifikat"],
    duration: "1–2 hari",
    sessions: "4 sesi",
    thumb: "🎯",
    thumbBg: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))",
  },
  {
    category: "Presentasi",
    level: "Lanjutan",
    levelColor: "rgb(139, 92, 246)",
    levelBg: "rgb(245, 243, 255)",
    title: "Infographics & Visual Communication",
    desc: "Mengubah data kompleks dan laporan menjadi infografis visual yang jelas dan menarik.",
    tags: ["In-house", "Online / Hybrid", "Sertifikat"],
    duration: "2 hari",
    sessions: "4–6 sesi",
    thumb: "🎨",
    thumbBg: "linear-gradient(135deg, rgb(139,92,246), rgb(217,70,239))",
  },
  {
    category: "AI & Digital",
    level: "Semua Level",
    levelColor: "rgb(20, 184, 166)",
    levelBg: "rgb(204, 251, 241)",
    title: "AI Productivity for Teams",
    desc: "Pemanfaatan AI tools untuk meningkatkan produktivitas kerja harian tim di berbagai divisi.",
    tags: ["In-house", "Online / Hybrid", "Sertifikat"],
    duration: "1 hari",
    sessions: "3–4 sesi",
    thumb: "🤖",
    thumbBg: "linear-gradient(135deg, rgb(20,184,166), rgb(59,130,246))",
  },
  {
    category: "Leadership",
    level: "Manajerial",
    levelColor: "rgb(245, 158, 11)",
    levelBg: "rgb(254, 243, 199)",
    title: "Creative Problem Solving & Decision Making",
    desc: "Meningkatkan kemampuan berpikir kritis, memecahkan masalah, dan membangun mindset kepemimpinan.",
    tags: ["In-house", "Online / Hybrid", "Sertifikat"],
    duration: "2 hari",
    sessions: "4–6 sesi",
    thumb: "🧭",
    thumbBg: "linear-gradient(135deg, rgb(245,158,11), rgb(220,38,38))",
  },
  {
    category: "SOP & Quality",
    level: "Semua Level",
    levelColor: "rgb(16, 185, 129)",
    levelBg: "rgb(209, 250, 229)",
    title: "SOP & Business Process Improvement",
    desc: "Merapikan proses kerja, menyusun SOP yang efektif, dan meningkatkan kualitas operasional.",
    tags: ["In-house", "Online / Hybrid", "Sertifikat"],
    duration: "2 hari",
    sessions: "4 sesi",
    thumb: "⚙️",
    thumbBg: "linear-gradient(135deg, rgb(16,185,129), rgb(5,150,105))",
  },
  {
    category: "Data & Analytics",
    level: "Dasar",
    levelColor: "rgb(59, 130, 246)",
    levelBg: "rgb(219, 234, 254)",
    title: "Interactive Dashboard with Excel",
    desc: "Membangun dashboard dinamis di Microsoft Excel tanpa coding — cocok untuk semua divisi.",
    tags: ["In-house", "Online / Hybrid", "Sertifikat"],
    duration: "1–2 hari",
    sessions: "3–4 sesi",
    thumb: "📋",
    thumbBg: "linear-gradient(135deg, rgb(34,197,94), rgb(16,185,129))",
  },
];

export function ProgramsV2() {
  const [activeTab, setActiveTab] = useState<Tab>("Semua");

  const filtered = activeTab === "Semua"
    ? PROGRAMS
    : PROGRAMS.filter((p) => p.category === activeTab);

  return (
    <section className="py-20 px-5 md:px-6 lg:px-8 bg-[#FAFAFA]" style={{ borderTop: "1.5px solid rgb(240, 217, 200)", borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest" style={{ background: "rgb(255,244,232)", color: "rgb(255,138,0)", border: "1.5px solid rgb(255,214,165)" }}>
              Katalog Program
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
              Program Siap Pakai untuk Tim Anda
            </h2>
            <p className="text-[#64748B] mt-2 text-base">
              Setiap program dapat disesuaikan — topik, durasi, format, dan output sesuai kebutuhan organisasi.
            </p>
          </div>
          <Link
            href="/program-catalog"
            className="text-sm font-bold shrink-0 hover:underline"
            style={{ color: "rgb(255, 138, 0)" }}
          >
            Lihat Semua Program →
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="text-sm font-semibold px-4 py-2 rounded-full transition-all"
              style={
                activeTab === tab
                  ? { background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))", color: "white" }
                  : { background: "white", color: "#64748B", border: "1.5px solid rgb(240, 217, 200)" }
              }
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Program grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((program, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col"
              style={{ border: "1.5px solid rgb(240, 217, 200)" }}
            >
              {/* Thumbnail — gradient + frosted icon badge */}
              <div
                className="h-32 flex items-center justify-center relative overflow-hidden"
                style={{ background: program.thumbBg }}
              >
                <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: "radial-gradient(circle at 78% 18%, white 0%, transparent 55%)" }} />
                <div
                  className="absolute -bottom-6 -right-4 w-24 h-24 rounded-2xl rotate-12"
                  style={{ background: "rgba(255,255,255,0.10)" }}
                />
                <div
                  className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center text-white"
                  style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.25)" }}
                >
                  {CATEGORY_ICON[program.category] ?? CATEGORY_ICON["Data & Analytics"]}
                </div>
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded-md" style={{ background: "rgba(0,0,0,0.16)" }}>
                  {program.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                {/* Level badge */}
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 w-fit"
                  style={{ background: program.levelBg, color: program.levelColor }}
                >
                  {program.level}
                </span>

                <h3 className="font-bold text-[#0F172A] text-sm leading-snug mb-2">{program.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed flex-1 mb-4">{program.desc}</p>

                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-[#94A3B8] mb-4">
                  <span className="flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {program.duration}
                  </span>
                  <span>·</span>
                  <span>{program.sessions}</span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {program.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-gray-50 text-gray-500 border border-gray-100">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/contact?type=in-house&program=${encodeURIComponent(program.title)}`}
                  className="block w-full text-center text-sm font-bold py-2.5 rounded-xl transition-all hover:opacity-90"
                  style={{ background: "rgb(255,244,232)", color: "rgb(255,138,0)", border: "1.5px solid rgb(255,214,165)" }}
                >
                  Diskusikan Program Ini
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 rounded-2xl" style={{ background: "rgb(255,251,245)", border: "1.5px solid rgb(240,217,200)" }}>
          <p className="text-[#0F172A] font-semibold mb-2">Tidak menemukan yang sesuai?</p>
          <p className="text-sm text-[#64748B] mb-5">Setiap program dapat dirancang ulang berdasarkan kebutuhan spesifik organisasi Anda — topik, durasi, format, dan output dapat didiskusikan.</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-white text-sm font-bold px-7 py-3 rounded-full shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all"
            style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
          >
            Diskusikan Kebutuhan Kustom →
          </Link>
        </div>
      </div>
    </section>
  );
}
