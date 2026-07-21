"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { WHATSAPP_NUMBER, whatsappLink } from "@/data/config";

/* ═══════════════════════════════════════════════════════
   STATIC DATA
   ═══════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { label: "Homepage", href: "#hero" },
  { label: "Katalog Program", href: "#katalog" },
  { label: "Galeri Skillary", href: "#galeri" },
  { label: "Solusi B2B", href: "#usecases" },
  { label: "Sertifikasi", href: "#sertifikasi" },
  { label: "Tentang Kami", href: "#footer" },
];

const STATS = [
  { value: "X+", label: "Jam Pelatihan" },
  { value: "4.9/5", label: "Corporate Review" },
  { value: "100%", label: "Terdokumentasi" },
];

const TEN_REASONS = [
  { title: "Materi Terstruktur", desc: "Silabus yang dirancang khusus untuk kebutuhan industri dan relevan dengan dunia kerja.", icon: "📚" },
  { title: "Trainer Profesional", desc: "Instruktur bersertifikasi dan praktisi ahli dengan pengalaman lebih dari 5 tahun.", icon: "👨‍🏫" },
  { title: "Hybrid Learning System", desc: "Kombinasi sesi tatap muka dan online untuk memfasilitasi tim di berbagai cabang.", icon: "🌐" },
  { title: "Pre & Post Assessment", desc: "Evaluasi kompetensi peserta secara objektif sebelum dan setelah pelatihan.", icon: "📝" },
  { title: "Digital Certificate", desc: "Sertifikat berstandar yang dapat diverifikasi secara online dengan QR code.", icon: "🏅" },
  { title: "Training Report Lengkap", desc: "Laporan komprehensif kehadiran, nilai, dan rekomendasi bagi divisi HR/L&D.", icon: "📊" },
  { title: "Berbasis Output Nyata", desc: "Peserta langsung mempraktikkan materi ke dalam kasus bisnis nyata di perusahaan.", icon: "🎯" },
  { title: "Dashboard Peserta", desc: "Platform sentral untuk memantau progres belajar dan akses materi selamanya.", icon: "💻" },
  { title: "Modul Custom", desc: "Materi dapat disesuaikan dengan studi kasus atau data internal perusahaan Anda.", icon: "⚙️" },
  { title: "Dukungan Pasca-Training", desc: "Konsultasi lanjutan dan forum diskusi untuk memastikan implementasi berjalan baik.", icon: "🤝" },
];

const USE_CASE_REVIEWS = [
  {
    role: "Untuk Tim HR & L&D",
    desc: "“Sejak awal kami butuh standarisasi training. Skillary memberikan layanan end-to-end dari silabus, assessment, hingga reporting. Sangat memudahkan dokumentasi HR kami.”",
    bg: "#F8FAFC",
  },
  {
    role: "Untuk Pimpinan Divisi",
    desc: "“Materi yang up-to-date dan interaktif. Tim kami bisa langsung mempraktikkan ilmu analisis data untuk memperbaiki efisiensi operasional divisi. Hasilnya sangat nyata.”",
    bg: "#F0F9FF",
  },
  {
    role: "Untuk Sekolah & Yayasan",
    desc: "“Platform yang sangat rapi untuk mengelola pelatihan para guru dan staf. Sertifikat digitalnya sangat membantu dalam pelaporan akreditasi institusi kami.”",
    bg: "#FEF2F2",
  },
];

const PROGRAMS_RECOMMENDED = [
  { title: "Power BI Business Dashboard", cat: "Data", color: "#3B82F6", desc: "Pembuatan dashboard interaktif." },
  { title: "AI Productivity for Teams", cat: "AI", color: "#8B5CF6", desc: "Otomasi dan prompt engineering." },
  { title: "Leadership & Communication", cat: "Management", color: "#F97316", desc: "Komunikasi asertif untuk manajer." },
];

const PROGRAMS_DATA_TRACK = [
  { title: "Data-Driven Decision Making", cat: "Business Analytics", color: "#10B981", desc: "Membaca data dan insight." },
  { title: "Advanced Excel for Business", cat: "Spreadsheet", color: "#06B6D4", desc: "Otomatisasi laporan kompleks." },
];

const PROGRAMS_BUSINESS_TRACK = [
  { title: "Process Improvement", cat: "Operational", color: "#F59E0B", desc: "Lean management & efisiensi." },
  { title: "Business Presentation", cat: "Visual Comms", color: "#EC4899", desc: "Storyline & desain slide premium." },
];

const FAQS = [
  { q: "Mengapa Skillary disebut sebagai Corporate Training Partner?", a: "Karena kami tidak hanya menyediakan kelas, melainkan ekosistem lengkap mulai dari asesmen, materi, sertifikasi, hingga laporan akhir untuk dokumentasi HR." },
  { q: "Apakah program bisa diadakan secara in-house di kantor kami?", a: "Tentu. Kami mendukung pelaksanaan in-house training secara offline di lokasi perusahaan Anda, maupun secara hybrid." },
  { q: "Apakah materi bisa disesuaikan dengan studi kasus perusahaan?", a: "Ya. Tim instruktur kami dapat melakukan sesi briefing sebelum kelas untuk menyesuaikan studi kasus menggunakan data dari industri Anda." },
  { q: "Bagaimana sistem sertifikasi Skillary?", a: "Peserta yang memenuhi syarat kehadiran dan batas nilai kelulusan asesmen akan mendapatkan Sertifikat Digital yang dilengkapi QR Code untuk verifikasi." },
  { q: "Apakah Skillary menyediakan platform Learning Management System (LMS)?", a: "Ya, kami menyediakan dashboard khusus bagi peserta untuk mengakses materi, merekam kehadiran, dan mengunduh sertifikat." },
  { q: "Apakah ada laporan yang diberikan kepada HR atau L&D?", a: "Sangat ada. Setelah batch selesai, kami menerbitkan Training Report komprehensif yang berisi evaluasi kelas, nilai pre-test & post-test, serta feedback." },
  { q: "Apakah ada garansi pembelajaran?", a: "Kami menyediakan sesi konsultasi pasca-training agar peserta dapat bertanya jika mengalami kesulitan saat mengimplementasikan ilmu di pekerjaannya." },
  { q: "Bagaimana cara meminta proposal penawaran?", a: "Anda cukup klik tombol 'Diskusikan Kebutuhan Training' atau hubungi WhatsApp representatif kami. Kami akan segera mengirimkan proposal." },
];

/* ═══════════════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════════════ */

function ProgramCard({ title, cat, color, desc }: { title: string; cat: string; color: string; desc: string }) {
  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="h-2" style={{ background: color }} />
      <div className="p-6 flex flex-col flex-1">
        <span
          className="inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md w-fit mb-4"
          style={{ backgroundColor: `${color}15`, color: color }}
        >
          {cat}
        </span>
        <h3 className="text-lg font-bold text-[#0B1220] mb-2 group-hover:text-[#F97316] transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-[#64748B] mb-6 flex-1 line-clamp-2">{desc}</p>
        <a
          href={whatsappLink(`Halo Skillary, saya tertarik dengan program ${title}`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-between w-full py-2.5 px-4 rounded-xl border border-[#E5E7EB] text-sm font-semibold text-[#0B1220] group-hover:bg-[#0B1220] group-hover:text-white transition-all"
        >
          Selengkapnya
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function FaqItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="border-b border-[#E5E7EB] last:border-0">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between py-5 text-left group"
        aria-expanded={open}
      >
        <span className="text-sm md:text-base font-semibold text-[#0B1220] pr-4 group-hover:text-[#F97316] transition-colors">
          {q}
        </span>
        <span
          className={`shrink-0 w-7 h-7 rounded-full border border-[#E5E7EB] flex items-center justify-center transition-all duration-300 ${
            open ? "bg-[#F97316] border-[#F97316] rotate-180" : ""
          }`}
        >
          <svg
            className={`w-4 h-4 transition-colors ${open ? "text-white" : "text-[#64748B]"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{
          maxHeight: open ? contentRef.current?.scrollHeight ?? 0 : 0,
          opacity: open ? 1 : 0,
        }}
      >
        <p className="pb-5 text-sm text-[#64748B] leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════ */

export default function SkillaryCampusDeepRedesign() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollTo(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const ctaPrimary = whatsappLink("Halo Skillary, saya ingin berdiskusi mengenai kebutuhan training untuk perusahaan kami.");

  return (
    <div className="bg-[#FFFDF9] text-[#181818] min-h-screen selection:bg-[#F97316]/20 selection:text-[#F97316]">
      
      {/* ─── HEADER ─── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b ${
          scrolled ? "bg-white/95 backdrop-blur-md border-[#E5E7EB] shadow-sm py-3" : "bg-white border-[#E5E7EB] py-4"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/skillary-campus" className="flex items-center gap-3 shrink-0 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <span className="text-white font-extrabold text-lg">S</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight leading-none text-[#0B1220]">Skillary</span>
                <span className="text-[10px] font-semibold text-[#F97316] uppercase tracking-widest mt-0.5">Corporate Partner</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="px-4 py-2.5 text-sm font-semibold text-[#64748B] hover:text-[#0B1220] rounded-xl hover:bg-[#F8FAFC] transition-all"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="hidden xl:flex items-center gap-4">
            <a
              href={ctaPrimary}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all"
            >
              Let's Go!
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden p-2 rounded-xl border border-[#E5E7EB] bg-white text-[#0B1220]"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="xl:hidden absolute top-full left-0 right-0 bg-white border-b border-[#E5E7EB] shadow-lg p-5 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-[#0B1220] rounded-xl hover:bg-[#F8FAFC]"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-2">
              <a
                href={ctaPrimary}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-3 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white text-sm font-bold"
              >
                Let's Go!
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ─── HERO SECTION ─── */}
      <section id="hero" className="pt-32 pb-20 md:pt-44 md:pb-28 relative overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-b from-[#F97316]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-[#EC4899]/5 to-transparent rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

        <div className="relative max-w-[1000px] mx-auto px-5 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full border border-[#F97316]/20 bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-widest mb-6">
            #StructuredCorporateTraining
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-[#0B1220] mb-8">
            Skillary: Corporate Gateway to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F97316] to-[#EC4899]">
              Digital Success
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-[#64748B] leading-relaxed mb-10 max-w-3xl mx-auto">
            Awali transformasi tim Anda bersama Skillary – Training Provider dengan pendekatan end-to-end. Kami mengelola materi terstruktur, assessment, laporan analitik, hingga sertifikat digital.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href={ctaPrimary}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-10 py-4 rounded-xl bg-[#0B1220] hover:bg-[#111827] text-white text-lg font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Mulai Konsultasi
            </a>
            <button
              onClick={() => scrollTo("#katalog")}
              className="w-full sm:w-auto px-10 py-4 rounded-xl border-2 border-[#E5E7EB] bg-white text-[#0B1220] text-lg font-bold hover:border-[#0B1220] transition-all"
            >
              Lihat Katalog
            </button>
          </div>

          {/* Social Proof Badges under Hero */}
          <div className="pt-10 border-t border-[#E5E7EB] flex flex-wrap justify-center gap-6 sm:gap-12 opacity-80">
            {STATS.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-2xl sm:text-3xl font-black text-[#0B1220]">{stat.value}</span>
                <span className="text-xs sm:text-sm font-bold text-[#64748B] uppercase tracking-wider mt-1">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── USE CASES / "TESTIMONIALS" ─── */}
      <section id="usecases" className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1220] mb-6">
              Dipercaya Para Pimpinan Divisi, HR, & L&D
            </h2>
            <p className="text-lg text-[#64748B]">
              Sejak awal, Skillary menunjukkan komitmen pada standar corporate training. Layanan end-to-end kami seringkali menjadi solusi bagi masalah dokumentasi yang tersebar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {USE_CASE_REVIEWS.map((review, i) => (
              <div key={i} className="rounded-3xl border border-[#E5E7EB] bg-white p-8 sm:p-10 hover:shadow-xl transition-shadow relative overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-50" style={{ backgroundColor: review.bg }} />
                
                <svg className="w-10 h-10 text-[#F97316] mb-6 relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-base font-medium text-[#0B1220] leading-relaxed mb-8 relative z-10">
                  {review.desc}
                </p>
                <div className="relative z-10">
                  <p className="text-sm font-black text-[#F97316] uppercase tracking-wider">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10 REASONS / WHY CHOOSE US ─── */}
      <section className="py-20 md:py-28 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <span className="text-[#F97316] font-bold tracking-widest uppercase text-sm mb-4 block">
              Skillary Certification Partner
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1220] leading-tight">
              Berikut Alasan Mengapa Organisasi Memilih<br />Skillary Sebagai Corporate Training Partner
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-x-6 gap-y-10">
            {TEN_REASONS.map((r, i) => (
              <div key={i} className="flex flex-col gap-4 group">
                <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center text-2xl group-hover:bg-[#F97316] group-hover:text-white group-hover:border-[#F97316] transition-colors shadow-sm">
                  {r.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0B1220] mb-2">{r.title}</h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── GALLERY / #WeAreSkillary ─── */}
      <section id="galeri" className="py-20 md:py-28 bg-[#111827] text-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">#WeAreSkillary</h2>
            <p className="text-lg text-white/60">Bukan sekadar kelas biasa. Lihat bagaimana ekosistem dokumentasi kami bekerja.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mockup 1: Certificate */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur flex flex-col gap-6">
              <div className="h-48 rounded-2xl bg-[#0B1220] border border-white/10 relative overflow-hidden flex flex-col justify-between p-4">
                <div className="flex justify-between items-start">
                  <div className="w-8 h-8 bg-white/10 rounded-lg" />
                  <div className="w-16 h-16 rounded-full border-4 border-[#F97316] opacity-80" />
                </div>
                <div className="space-y-2">
                  <div className="h-2 w-1/2 bg-white/20 rounded-full" />
                  <div className="h-4 w-3/4 bg-white/40 rounded-full" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Sertifikat Digital Valid</h3>
                <p className="text-sm text-white/50">Otomatis terbit setelah evaluasi dengan QR Code yang mencegah pemalsuan.</p>
              </div>
            </div>

            {/* Mockup 2: Dashboard */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur flex flex-col gap-6">
              <div className="h-48 rounded-2xl bg-[#0B1220] border border-white/10 relative overflow-hidden flex flex-col p-4 gap-3">
                <div className="flex gap-2 mb-2">
                  <div className="w-10 h-10 rounded-full bg-white/10 shrink-0" />
                  <div className="space-y-1.5 flex-1 mt-1">
                    <div className="h-2 w-1/3 bg-white/20 rounded-full" />
                    <div className="h-2 w-1/4 bg-white/10 rounded-full" />
                  </div>
                </div>
                <div className="flex-1 bg-white/5 rounded-xl border border-white/10 p-3">
                  <div className="flex gap-1 items-end h-full pt-4">
                    {[30, 50, 40, 70, 60, 90, 80].map((v, i) => (
                      <div key={i} className="flex-1 bg-[#EC4899]/80 rounded-t-sm" style={{ height: `${v}%` }} />
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Participant Dashboard</h3>
                <p className="text-sm text-white/50">Tracking progres belajar dan analitik komprehensif real-time.</p>
              </div>
            </div>

            {/* Mockup 3: Report */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur flex flex-col gap-6 lg:col-span-1 md:col-span-2">
              <div className="h-48 rounded-2xl bg-[#0B1220] border border-white/10 relative overflow-hidden p-4 flex flex-col justify-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 shrink-0 rounded-full border-[6px] border-[#10B981] flex items-center justify-center">
                    <span className="text-xs font-bold text-white">92%</span>
                  </div>
                  <div className="space-y-2 flex-1">
                    <div className="h-3 w-full bg-white/10 rounded-full" />
                    <div className="h-3 w-4/5 bg-white/10 rounded-full" />
                  </div>
                </div>
                <div className="h-10 rounded-lg bg-[#F97316]/20 border border-[#F97316]/50 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-[#F97316] uppercase tracking-widest">Download Report .PDF</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">Training Report HR</h3>
                <p className="text-sm text-white/50">Laporan evaluasi komprehensif bagi PIC program untuk tindak lanjut.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CALL TO ACTION MID ─── */}
      <section className="py-20 bg-[#F97316]">
        <div className="max-w-[1000px] mx-auto px-5 lg:px-8 text-center text-white">
          <span className="inline-block border border-white/30 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6 bg-black/10">
            #GakPakeNantiNanti
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-6">Sekarang Giliran Tim Anda!</h2>
          <p className="text-lg text-white/90 mb-10">Mulai dari sekarang atau tertinggal dalam optimalisasi efisiensi.</p>
          <button
            onClick={() => scrollTo("#katalog")}
            className="px-10 py-4 rounded-xl bg-white text-[#F97316] text-lg font-bold shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all"
          >
            Ya, Mulai Sekarang
          </button>
        </div>
      </section>

      {/* ─── MEGA COURSE CATALOG ─── */}
      <section id="katalog" className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 space-y-24">
          
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-[#0B1220] mb-4">Come on, pilih program yang paling match buat tim kamu</h2>
            <p className="text-lg text-[#64748B]">Katalog program korporasi yang dirancang khusus untuk eksekusi langsung.</p>
          </div>

          {/* Group 1: Recommended */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-[#0B1220]">Recommended Banget Nih</h3>
              <div className="h-px bg-[#E5E7EB] flex-1" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROGRAMS_RECOMMENDED.map((p, i) => (
                <ProgramCard key={i} {...p} />
              ))}
            </div>
          </div>

          {/* Group 2: Data Track */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-[#0B1220]">Data & Analytics Track</h3>
              <div className="h-px bg-[#E5E7EB] flex-1" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROGRAMS_DATA_TRACK.map((p, i) => (
                <ProgramCard key={i} {...p} />
              ))}
            </div>
          </div>

          {/* Group 3: Business Track */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-2xl font-bold text-[#0B1220]">Business & Ops Excellence</h3>
              <div className="h-px bg-[#E5E7EB] flex-1" />
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PROGRAMS_BUSINESS_TRACK.map((p, i) => (
                <ProgramCard key={i} {...p} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ─── CONTACT CHAT BLOCK ─── */}
      <section className="py-20 bg-white border-y border-[#E5E7EB]">
        <div className="max-w-[1000px] mx-auto px-5 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-10 bg-[#F8FAFC] rounded-3xl p-8 md:p-12 border border-[#E5E7EB]">
            <div className="w-24 h-24 md:w-32 md:h-32 shrink-0 bg-gradient-to-br from-[#F97316] to-[#EC4899] rounded-full shadow-lg flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
              </svg>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-black text-[#0B1220] mb-3">Belum ketemu program yang Anda cari?</h2>
              <p className="text-[#64748B] mb-8 text-lg">Hai! Dengan senang hati kami siap membantu merancang program custom untuk perusahaan Anda.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href={whatsappLink("Halo Tim Skillary, saya ingin request program training khusus.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold shadow hover:shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                  Chat Tim Representative
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B1220] mb-4">Yang Sering Ditanyakan</h2>
          </div>

          <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={i}
                q={faq.q}
                a={faq.a}
                open={openFaq === i}
                toggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer id="footer" className="bg-[#0B1220] text-white pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-12 mb-16">
            
            <div className="xl:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                  <span className="text-white font-extrabold text-xl">S</span>
                </div>
                <span className="text-2xl font-extrabold tracking-tight">Skillary</span>
              </div>
              <p className="text-white/60 leading-relaxed mb-8 max-w-sm">
                Gateway to Corporate IT Success. Kami merancang solusi pelatihan end-to-end yang mengintegrasikan materi, sertifikasi, dan laporan analitik untuk perusahaan Anda.
              </p>
              <div className="flex items-start gap-3 text-sm text-white/50 mb-4">
                <svg className="w-5 h-5 shrink-0 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p>
                  <span className="block font-bold text-white mb-1">Skillary Training Center</span>
                  Jl. Contoh Jalan No. 123, Jakarta Selatan<br />DKI Jakarta, Indonesia
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-base font-bold mb-6">Program Training</h4>
              <ul className="space-y-4">
                {PROGRAMS_RECOMMENDED.map((p, i) => (
                  <li key={i}><button onClick={() => scrollTo("#katalog")} className="text-sm text-white/60 hover:text-[#F97316] transition-colors">{p.title}</button></li>
                ))}
                <li><button onClick={() => scrollTo("#katalog")} className="text-sm text-white/60 hover:text-[#F97316] transition-colors">Lihat Semua Program</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-bold mb-6">Tentang Kita</h4>
              <ul className="space-y-4">
                <li><a href="/about" className="text-sm text-white/60 hover:text-[#F97316] transition-colors">Profil Skillary</a></li>
                <li><a href="/untuk-organisasi" className="text-sm text-white/60 hover:text-[#F97316] transition-colors">Layanan Konsultasi</a></li>
                <li><a href="/v2/certificates" className="text-sm text-white/60 hover:text-[#F97316] transition-colors">Verifikasi Sertifikat</a></li>
                <li><button onClick={() => scrollTo("#faq")} className="text-sm text-white/60 hover:text-[#F97316] transition-colors">Frequently Asked Questions</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-base font-bold mb-6">Hubungi Kami</h4>
              <ul className="space-y-4">
                <li className="text-sm text-white/60">
                  <span className="block text-white/40 text-xs uppercase mb-1">Sales Representative</span>
                  0822-2361-7700
                </li>
                <li className="text-sm text-white/60">
                  <span className="block text-white/40 text-xs uppercase mb-1">Email</span>
                  hello@skillary.my.id
                </li>
                <li className="text-sm text-white/60">
                  <span className="block text-white/40 text-xs uppercase mb-1">Jam Operasional</span>
                  Senin - Jumat 09:00 - 17:00
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} PT Skillary. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <a href="/privacy" className="text-xs text-white/40 hover:text-white transition-colors">Kebijakan Privasi</a>
              <a href="/terms" className="text-xs text-white/40 hover:text-white transition-colors">Syarat &amp; Ketentuan</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING WHATSAPP ─── */}
      <a
        href={ctaPrimary}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-sm"
        aria-label="WhatsApp"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
