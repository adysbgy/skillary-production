"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { slugify } from "@/data/v2-programs";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import { GradientText } from "@/components/v2/marketing/MarketingUI";

// ─── Category visual system (gradient + SVG icon, no emoji) ──────────────
const CATEGORY_STYLE: Record<string, { gradient: string; icon: React.ReactNode }> = {
  "Data & Analytics": {
    gradient: "linear-gradient(135deg, rgb(59,130,246), rgb(99,102,241))",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  "AI & Digital": {
    gradient: "linear-gradient(135deg, rgb(20,184,166), rgb(59,130,246))",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  "Presentasi": {
    gradient: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  "Leadership": {
    gradient: "linear-gradient(135deg, rgb(245,158,11), rgb(220,38,38))",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  "SOP & Quality": {
    gradient: "linear-gradient(135deg, rgb(16,185,129), rgb(5,150,105))",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
};

const CATEGORIES = ["Semua", "Data & Analytics", "AI & Digital", "Presentasi", "Leadership", "SOP & Quality"] as const;
const FORMATS = ["Semua Format", "In-house", "Online", "Hybrid"] as const;
const DURATIONS = ["Semua Durasi", "1 hari", "2 hari", "3+ hari"] as const;

type Program = {
  category: keyof typeof CATEGORY_STYLE;
  title: string;
  desc: string;
  duration: string;
  durationBucket: "1 hari" | "2 hari" | "3+ hari";
  formats: ("In-house" | "Online" | "Hybrid")[];
  level: string;
};

const PROGRAMS: Program[] = [
  { category: "Data & Analytics", title: "Power BI Business Dashboard", desc: "Membangun dashboard interaktif dari data mentah hingga insight siap presentasi.", duration: "2 hari", durationBucket: "2 hari", formats: ["In-house", "Hybrid"], level: "Menengah" },
  { category: "Data & Analytics", title: "Data-Driven Decision Making", desc: "Membaca, menganalisis, dan mengkomunikasikan data untuk keputusan berbasis fakta.", duration: "2 hari", durationBucket: "2 hari", formats: ["In-house", "Online"], level: "Menengah" },
  { category: "Data & Analytics", title: "Interactive Dashboard with Excel", desc: "Membangun dashboard dinamis di Microsoft Excel tanpa coding — cocok semua divisi.", duration: "1 hari", durationBucket: "1 hari", formats: ["Online", "Hybrid"], level: "Dasar" },
  { category: "Data & Analytics", title: "SQL untuk Analis Bisnis", desc: "Query database, agregasi, dan join untuk kebutuhan pelaporan operasional.", duration: "3 hari", durationBucket: "3+ hari", formats: ["In-house"], level: "Menengah" },
  { category: "AI & Digital", title: "AI Productivity for Teams", desc: "Memanfaatkan AI tools untuk meningkatkan produktivitas kerja harian tim.", duration: "1 hari", durationBucket: "1 hari", formats: ["In-house", "Online", "Hybrid"], level: "Semua Level" },
  { category: "AI & Digital", title: "Prompt Engineering Esensial", desc: "Menyusun prompt efektif untuk menulis, menganalisis, dan menyelesaikan tugas.", duration: "1 hari", durationBucket: "1 hari", formats: ["Online"], level: "Dasar" },
  { category: "AI & Digital", title: "Digital Transformation Mindset", desc: "Membangun pola pikir adaptif menghadapi perubahan teknologi di organisasi.", duration: "2 hari", durationBucket: "2 hari", formats: ["In-house", "Hybrid"], level: "Manajerial" },
  { category: "Presentasi", title: "Business Presentation & Reporting", desc: "Menyusun presentasi bisnis yang persuasif, ringkas, dan mudah dipahami manajemen.", duration: "2 hari", durationBucket: "2 hari", formats: ["In-house", "Online", "Hybrid"], level: "Semua Level" },
  { category: "Presentasi", title: "Business Storytelling", desc: "Merangkai narasi data dan ide menjadi cerita yang meyakinkan audiens.", duration: "1 hari", durationBucket: "1 hari", formats: ["In-house", "Online"], level: "Menengah" },
  { category: "Presentasi", title: "Infographics & Visual Communication", desc: "Mengubah data kompleks menjadi infografis visual yang jelas dan menarik.", duration: "2 hari", durationBucket: "2 hari", formats: ["In-house", "Hybrid"], level: "Lanjutan" },
  { category: "Leadership", title: "Creative Problem Solving", desc: "Meningkatkan kemampuan berpikir kritis dan memecahkan masalah kompleks.", duration: "2 hari", durationBucket: "2 hari", formats: ["In-house"], level: "Manajerial" },
  { category: "Leadership", title: "Effective Decision Making", desc: "Kerangka pengambilan keputusan di bawah ketidakpastian dan tekanan waktu.", duration: "1 hari", durationBucket: "1 hari", formats: ["In-house", "Online"], level: "Manajerial" },
  { category: "Leadership", title: "Coaching & Mentoring untuk Manajer", desc: "Teknik coaching praktis untuk mengembangkan performa anggota tim.", duration: "3 hari", durationBucket: "3+ hari", formats: ["In-house", "Hybrid"], level: "Manajerial" },
  { category: "SOP & Quality", title: "SOP & Business Process Improvement", desc: "Merapikan proses kerja, menyusun SOP efektif, dan meningkatkan kualitas operasional.", duration: "2 hari", durationBucket: "2 hari", formats: ["In-house"], level: "Semua Level" },
  { category: "SOP & Quality", title: "ISO 9001 Awareness", desc: "Memahami prinsip sistem manajemen mutu dan penerapannya di organisasi.", duration: "1 hari", durationBucket: "1 hari", formats: ["In-house", "Online"], level: "Dasar" },
  { category: "SOP & Quality", title: "Lean Process & Continuous Improvement", desc: "Mengidentifikasi pemborosan dan menerapkan perbaikan berkelanjutan.", duration: "3 hari", durationBucket: "3+ hari", formats: ["In-house", "Hybrid"], level: "Menengah" },
];

const PAGE_SIZE = 8;

export default function CatalogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("Semua");
  const [format, setFormat] = useState<string>("Semua Format");
  const [duration, setDuration] = useState<string>("Semua Durasi");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return PROGRAMS.filter((p) => {
      if (category !== "Semua" && p.category !== category) return false;
      if (format !== "Semua Format" && !p.formats.includes(format as Program["formats"][number])) return false;
      if (duration !== "Semua Durasi" && p.durationBucket !== duration) return false;
      if (query.trim() && !`${p.title} ${p.desc} ${p.category}`.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }, [query, category, format, duration]);

  const shown = filtered.slice(0, visible);

  const resetVisible = () => setVisible(PAGE_SIZE);

  return (
    <MarketingShell>
      {/* ── Hero + search ── */}
      <section className="pt-16 md:pt-24 pb-12 px-5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(255,138,0,0.13) 0%, rgba(255,90,95,0.06) 40%, transparent 70%)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 text-[#64748B] bg-white" style={{ border: "1px solid rgb(234, 222, 210)", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgb(255,138,0)" }} />
            Katalog Program Pelatihan
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
            Temukan <GradientText>program</GradientText>{" "}untuk tim Anda
          </h1>
          <p className="text-[#64748B] text-base md:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Jelajahi program pelatihan yang dapat disesuaikan topik, durasi, dan formatnya sesuai kebutuhan organisasi.
          </p>

          {/* Big search bar */}
          <div className="relative max-w-xl mx-auto">
            <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); resetVisible(); }}
              placeholder="Cari program pelatihan..."
              className="w-full pl-14 pr-5 py-4 rounded-2xl text-sm md:text-base text-[#0F172A] placeholder:text-[#94A3B8] shadow-sm focus:outline-none focus:ring-2"
              style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }}
            />
          </div>
        </div>
      </section>

      {/* ── Filters + grid ── */}
      <section className="py-12 px-5 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Filter chip rows */}
          <div className="space-y-3 mb-8">
            <FilterRow label="Kategori" options={CATEGORIES as readonly string[]} active={category} onSelect={(v) => { setCategory(v); resetVisible(); }} />
            <div className="flex flex-col sm:flex-row gap-3">
              <FilterRow label="Format" options={FORMATS as readonly string[]} active={format} onSelect={(v) => { setFormat(v); resetVisible(); }} compact />
              <FilterRow label="Durasi" options={DURATIONS as readonly string[]} active={duration} onSelect={(v) => { setDuration(v); resetVisible(); }} compact />
            </div>
          </div>

          {/* Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-[#64748B]">
              Menampilkan <span className="font-bold text-[#0F172A]">{shown.length}</span> dari{" "}
              <span className="font-bold text-[#0F172A]">{filtered.length}</span> program
            </p>
            {(category !== "Semua" || format !== "Semua Format" || duration !== "Semua Durasi" || query) && (
              <button
                onClick={() => { setQuery(""); setCategory("Semua"); setFormat("Semua Format"); setDuration("Semua Durasi"); resetVisible(); }}
                className="text-sm font-semibold hover:underline"
                style={{ color: "rgb(255, 138, 0)" }}
              >
                Reset filter
              </button>
            )}
          </div>

          {/* Grid */}
          {shown.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {shown.map((program, i) => {
                const style = CATEGORY_STYLE[program.category];
                return (
                  <div
                    key={`${program.title}-${i}`}
                    className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col"
                    style={{ border: "1.5px solid rgb(240, 217, 200)" }}
                  >
                    {/* Thumbnail */}
                    <div className="h-28 flex items-center justify-center relative overflow-hidden" style={{ background: style.gradient }}>
                      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)" }} />
                      <div className="text-white relative z-10 opacity-90">{style.icon}</div>
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded-md" style={{ background: "rgba(0,0,0,0.18)" }}>
                        {program.category}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3 w-fit" style={{ background: "rgb(255,244,232)", color: "rgb(255,138,0)" }}>
                        {program.level}
                      </span>
                      <h3 className="font-bold text-[#0F172A] text-sm leading-snug mb-2">{program.title}</h3>
                      <p className="text-xs text-[#64748B] leading-relaxed flex-1 mb-4">{program.desc}</p>

                      <div className="flex items-center gap-2 text-xs text-[#94A3B8] mb-3">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        {program.duration}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {program.formats.map((tag) => (
                          <span key={tag} className="text-[10px] font-semibold px-2 py-1 rounded-md bg-gray-50 text-gray-500 border border-gray-100">{tag}</span>
                        ))}
                      </div>

                      <div className="space-y-2.5">
                        <Link
                          href={`/v2/program/${slugify(program.title)}`}
                          className="flex items-center justify-center gap-1 text-sm font-bold py-3 rounded-xl hover:underline"
                          style={{ color: "rgb(255,138,0)" }}
                        >
                          Lihat Detail
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </Link>
                        <Link
                          href={`/v2/proposal?program=${encodeURIComponent(program.title)}`}
                          className="block w-full text-center text-sm font-bold py-2.5 rounded-xl transition-all hover:opacity-90"
                          style={{ background: "rgb(255,244,232)", color: "rgb(255,138,0)", border: "1.5px solid rgb(255,214,165)" }}
                        >
                          Diskusikan Program
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-[#0F172A] font-semibold mb-1">Tidak ada program yang cocok</p>
              <p className="text-sm text-[#64748B]">Coba ubah kata kunci atau reset filter.</p>
            </div>
          )}

          {/* Load more */}
          {visible < filtered.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="inline-flex items-center gap-2 text-sm font-bold px-7 py-3 rounded-full bg-white hover:bg-orange-50 transition-colors"
                style={{ border: "1.5px solid rgb(240, 217, 200)", color: "#334155" }}
              >
                Muat lebih banyak
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
          )}

          {/* Custom CTA */}
          <div className="text-center mt-14 p-8 rounded-2xl" style={{ background: "rgb(255,251,245)", border: "1.5px solid rgb(240,217,200)" }}>
            <p className="text-[#0F172A] font-semibold mb-2">Tidak menemukan yang sesuai?</p>
            <p className="text-sm text-[#64748B] mb-5 max-w-lg mx-auto">Setiap program dapat dirancang ulang berdasarkan kebutuhan spesifik organisasi Anda — topik, durasi, format, dan output dapat didiskusikan.</p>
            <Link
              href="/v2/proposal"
              className="inline-flex items-center gap-2 text-white text-sm font-bold px-7 py-3 rounded-full shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all"
              style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
            >
              Diskusikan Kebutuhan Kustom →
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}

function FilterRow({ label, options, active, onSelect, compact }: {
  label: string;
  options: readonly string[];
  active: string;
  onSelect: (v: string) => void;
  compact?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${compact ? "flex-1" : ""}`}>
      <span className="text-[11px] font-bold uppercase tracking-widest text-[#94A3B8] mr-1">{label}</span>
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className="text-xs font-semibold px-3.5 py-2.5 rounded-full transition-all"
          style={
            active === opt
              ? { background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))", color: "white" }
              : { background: "white", color: "#64748B", border: "1.5px solid rgb(240, 217, 200)" }
          }
        >
          {opt}
        </button>
      ))}
    </div>
  );
}
