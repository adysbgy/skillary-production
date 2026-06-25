"use client";

import { useState } from "react";
import Link from "next/link";

// Lead-gen resources — semua gratis, gated dengan email capture (static)
const RESOURCE_TYPES = {
  "E-book": { bg: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)", gradient: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" },
  "Template": { bg: "rgb(219, 234, 254)", color: "rgb(37, 99, 235)", gradient: "linear-gradient(135deg, rgb(59,130,246), rgb(99,102,241))" },
  "Modul": { bg: "rgb(237, 233, 254)", color: "rgb(124, 58, 237)", gradient: "linear-gradient(135deg, rgb(139,92,246), rgb(217,70,239))" },
  "Checklist": { bg: "rgb(209, 250, 229)", color: "rgb(5, 150, 105)", gradient: "linear-gradient(135deg, rgb(16,185,129), rgb(5,150,105))" },
} as const;

type ResourceType = keyof typeof RESOURCE_TYPES;

const ICONS: Record<ResourceType, React.ReactNode> = {
  "E-book": (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  "Template": (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
    </svg>
  ),
  "Modul": (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  "Checklist": (
    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
};

const RESOURCES: { type: ResourceType; title: string; desc: string; pages: string }[] = [
  { type: "Template", title: "Template Silabus Pelatihan", desc: "Kerangka silabus siap pakai untuk menyusun program pelatihan internal yang terstruktur.", pages: "8 halaman" },
  { type: "E-book", title: "E-book Panduan L&D 2026", desc: "Panduan lengkap merancang strategi Learning & Development yang terukur untuk organisasi.", pages: "42 halaman" },
  { type: "Checklist", title: "Checklist Evaluasi Kirkpatrick", desc: "Daftar periksa 4 level evaluasi pelatihan: reaksi, pembelajaran, perilaku, dan hasil.", pages: "5 halaman" },
  { type: "Template", title: "Template Training Needs Analysis", desc: "Form analisis kebutuhan pelatihan untuk memetakan gap kompetensi tim Anda.", pages: "6 halaman" },
  { type: "Modul", title: "Modul Dasar Business Presentation", desc: "Materi pengantar menyusun presentasi bisnis yang ringkas dan persuasif.", pages: "24 halaman" },
  { type: "E-book", title: "E-book AI untuk Produktivitas Tim", desc: "Panduan praktis memanfaatkan AI tools dalam pekerjaan sehari-hari berbagai divisi.", pages: "30 halaman" },
  { type: "Checklist", title: "Checklist Onboarding Karyawan Baru", desc: "Langkah-langkah onboarding 30-60-90 hari agar karyawan baru cepat produktif.", pages: "4 halaman" },
  { type: "Template", title: "Template Laporan Pasca-Pelatihan", desc: "Format laporan hasil pelatihan yang siap dipresentasikan ke manajemen.", pages: "7 halaman" },
];

export default function ResourcesPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-white pt-16 pb-14 px-5 md:px-6 lg:px-8 relative overflow-hidden" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(circle, rgb(255,138,0) 0%, transparent 70%)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full" style={{ background: "rgb(255, 244, 232)", border: "1.5px solid rgb(255, 214, 165)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgb(255, 138, 0)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgb(255, 138, 0)" }}>Gratis untuk HR &amp; L&amp;D</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-4">
            Unduh Resource Pelatihan Gratis
          </h1>
          <p className="text-[#64748B] text-base md:text-lg max-w-xl mx-auto">
            Template, e-book, modul, dan checklist praktis untuk membantu tim L&amp;D Anda merancang
            program pelatihan yang lebih terukur. Semua gratis — tanpa biaya tersembunyi.
          </p>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="py-14 px-5 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {RESOURCES.map((r) => {
              const style = RESOURCE_TYPES[r.type];
              return (
                <div key={r.title} className="bg-white rounded-2xl overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all flex flex-col" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                  {/* Cover */}
                  <div className="h-32 flex items-center justify-center relative overflow-hidden" style={{ background: style.gradient }}>
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)" }} />
                    <div className="text-white relative z-10 opacity-90">{ICONS[r.type]}</div>
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded-md" style={{ background: "rgba(0,0,0,0.18)" }}>{r.type}</span>
                  </div>
                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-[#0F172A] text-sm leading-snug mb-2">{r.title}</h3>
                    <p className="text-xs text-[#64748B] leading-relaxed flex-1 mb-3">{r.desc}</p>
                    <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] mb-4">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                      PDF · {r.pages}
                    </div>
                    <button
                      onClick={() => { setSelected(r.title); setSubmitted(false); }}
                      className="w-full text-center text-sm font-bold py-2.5 rounded-xl transition-all hover:opacity-90"
                      style={{ background: style.bg, color: style.color }}
                    >
                      Unduh Gratis
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Bottom newsletter CTA ── */}
      <section className="py-16 px-5 md:px-6 lg:px-8" style={{ borderTop: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="max-w-3xl mx-auto text-center bg-white rounded-3xl p-10 shadow-sm" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Dapatkan Resource Baru Setiap Bulan</h2>
          <p className="text-sm text-[#64748B] mb-7 max-w-md mx-auto">Berlangganan untuk menerima template, e-book, dan insight L&amp;D terbaru langsung ke email Anda.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Email kerja Anda"
              className="flex-1 px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2"
              style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }}
            />
            <button type="submit" className="text-white text-sm font-bold px-6 py-3 rounded-xl whitespace-nowrap transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
              Berlangganan
            </button>
          </form>
        </div>
      </section>

      {/* ── Gated download modal (email capture) ── */}
      {selected && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ background: "rgba(15,23,42,0.5)" }} onClick={() => setSelected(null)}>
          <div className="bg-white rounded-2xl w-full max-w-md p-7 relative" style={{ border: "1.5px solid rgb(240, 217, 200)" }} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setSelected(null)} aria-label="Tutup" className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            {!submitted ? (
              <>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)" }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1">Unduh “{selected}”</h3>
                <p className="text-sm text-[#64748B] mb-5">Masukkan email Anda untuk menerima tautan unduhan. Gratis, tanpa spam.</p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="nama@perusahaan.com"
                    className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2"
                    style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }}
                  />
                  <button type="submit" className="w-full text-white text-sm font-bold py-3 rounded-xl transition-opacity hover:opacity-90" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                    Kirim Tautan Unduhan
                  </button>
                </form>
                <p className="text-[11px] text-[#94A3B8] text-center mt-3">Dengan mengunduh, Anda setuju menerima email dari Skillary sesekali.</p>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: "rgb(209, 250, 229)", color: "rgb(5, 150, 105)" }}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-1">Berhasil!</h3>
                <p className="text-sm text-[#64748B] mb-6">Tautan unduhan “{selected}” telah kami kirim ke <span className="font-semibold text-[#0F172A]">{email}</span>.</p>
                <button onClick={() => setSelected(null)} className="text-sm font-bold px-6 py-2.5 rounded-full bg-white hover:bg-orange-50 transition-colors" style={{ border: "1.5px solid rgb(240, 217, 200)", color: "#334155" }}>
                  Tutup
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
