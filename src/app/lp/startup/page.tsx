"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Manrope } from "next/font/google";

// Aimfox uses Manrope — bundled with the page so every route rendering it
// (both / and /lp/startup) gets the face without extra layout wiring.
const manrope = Manrope({ subsets: ["latin"] });
import { EMAIL_GENERAL, INSTAGRAM_URL, whatsappLink } from "@/data/config";

// ============================================================
// Skillary "startup" concept page — Aimfox-inspired:
// LIGHT theme + floating dark pill header (desktop & mobile),
// re-skinned to the Skillary brand (orange → coral gradient).
// Standalone chrome: /lp/* routes render no HeaderV2/FooterV2.
// ============================================================

const GRADIENT = "linear-gradient(111deg, rgb(255,138,0) 0%, rgb(255,90,95) 60%, rgb(255,138,0) 120%)";
const GRADIENT_SIMPLE = "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))";
const DARK = "rgb(13, 16, 28)";

const NAV = [
  { label: "Events", href: "#events" },
  { label: "Program", href: "#program" },
  { label: "Platform", href: "#platform" },
  { label: "Testimoni", href: "#testimoni" },
  { label: "Paket", href: "#paket" },
  { label: "FAQ", href: "#faq" },
];

// Staggered "Your Accounts"-style participant cards (hero visual)
const BATCH_CARDS = [
  { initial: "DA", name: "Dian A.", org: "Nusantara Corp", role: "Business Analyst", badge: "active" },
  { initial: "RP", name: "Rizky P.", org: "Nusantara Corp", role: "Head of Marketing", badge: "active" },
  { initial: "JM", name: "Joko M.", org: "Nusantara Corp", role: "Senior Business Development", badge: "active" },
  { initial: "MB", name: "Maya B.", org: "Nusantara Corp", role: "Finance Officer", badge: "cert" },
  { initial: "TE", name: "Tono E.", org: "Nusantara Corp", role: "Operations Supervisor", badge: "cert" },
  { initial: "EJ", name: "Elin J.", org: "Nusantara Corp", role: "HR Generalist", badge: "cert" },
  { initial: "OW", name: "Okta W.", org: "Nusantara Corp", role: "Sales Supervisor", badge: "cert" },
  { initial: "CH", name: "Candra H.", org: "Nusantara Corp", role: "Data Analyst", badge: "cert" },
];

const GRID_CHIPS = ["Data & Analytics", "AI & Produktivitas", "Presentasi Bisnis", "Leadership", "SOP & Proses"];
// Tiny colored square icons inside the chips (Aimfox: #FF5E5E / #F95A9F / blue / purple)
const CHIP_COLORS = ["rgb(255,90,95)", "rgb(249,90,159)", "rgb(59,130,246)", "rgb(139,92,246)", "rgb(22,163,74)"];
// Sparse organic scatter for the mosaic (16 of 56 cells filled ≈ 30%, like the reference)
const MOSAIC_FILLED = [2, 5, 9, 12, 15, 18, 22, 26, 30, 34, 37, 41, 43, 46, 50, 53];

// Floating tool tiles for the integrations-style section — positions mirror
// the LottieFiles layout (absolute % coords, responsive widths).
const FLOAT_TILES = [
  { top: "2%", left: "62%", w: "w-7 md:w-10", bg: "rgb(15,23,42)", icon: "chart" },
  { top: "6%", left: "88%", w: "w-8 md:w-11", bg: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))", icon: "spark" },
  { top: "8%", left: "22%", w: "w-6 md:w-9", bg: "rgb(100,116,139)", icon: "doc" },
  { top: "15%", left: "80%", w: "w-9 md:w-12", bg: "rgb(255,90,95)", icon: "present" },
  { top: "20%", left: "68%", w: "w-7 md:w-10", bg: "rgb(22,163,74)", icon: "table" },
  { top: "25%", left: "13%", w: "w-9 md:w-12", bg: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))", icon: "chart" },
  { top: "34%", left: "91%", w: "w-8 md:w-11", bg: "rgb(37,99,235)", icon: "doc" },
  { top: "45%", left: "17%", w: "w-10 md:w-14", bg: "rgb(15,23,42)", icon: "spark" },
  { top: "54%", left: "5%", w: "w-7 md:w-10", bg: "rgb(255,197,158)", icon: "table", dark: true },
  { top: "55%", left: "82%", w: "w-10 md:w-14", bg: "rgb(255,90,95)", icon: "chart" },
  { top: "76%", left: "90%", w: "w-7 md:w-10", bg: "rgb(100,116,139)", icon: "present" },
  { top: "80%", left: "11%", w: "w-8 md:w-11", bg: "rgb(22,163,74)", icon: "spark" },
] as const;

const TILE_ICONS: Record<string, string> = {
  chart: "M9 17v-6m4 6V7m4 10v-3",
  spark: "M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.6 8.6l2.1 2.1M3 12h3m12 0h3M5.6 18.4l2.1-2.1m8.6-8.6l2.1-2.1",
  doc: "M9 12h6m-6 4h6M9 8h2m8 4v6a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h6l6 6z",
  present: "M8 21l4-4 4 4M4 4h16v12H4V4zm4 5h8",
  table: "M4 6h16M4 12h16M4 18h16M10 6v12",
};

// Avatar-mosaic tiles (initials instead of photos)
const TILE_COLORS = [
  "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))",
  "rgb(255, 205, 160)",
  "rgb(17, 24, 39)",
  "rgb(255, 160, 120)",
  "rgb(100, 116, 139)",
  "rgb(255, 90, 95)",
];
const TILES =
  "AS DW RN BP LK MH SY TP EW FA GH JD KM NP QR ST UV WX YZ AB CD EF GI HJ KL MN OP QS TU VW".split(" ");

const FEATURES = [
  {
    title: "Events yang praktis dan terjadwal",
    desc: "Ikuti webinar berbayar dan sesi praktis untuk topik kerja yang relevan: AI, data, presentasi, produktivitas, karier, dan leadership.",
    tags: ["Webinar", "Praktis", "Terjadwal"],
    wide: false,
  },
  {
    title: "Materi yang dipraktikkan",
    desc: "Modul, studi kasus, dan mini-project membantu peserta menerapkan materi pada konteks pekerjaan sehari-hari.",
    tags: ["Studi kasus", "Mini-project", "Praktik"],
    wide: false,
  },
  {
    title: "Assessment yang terstruktur",
    desc: "Pre-test, post-test, quiz, dan capstone membantu mengukur pemahaman peserta dari awal hingga akhir program.",
    tags: ["Pre-test", "Post-test", "Capstone"],
    wide: false,
  },
  {
    title: "Sertifikat digital terverifikasi",
    desc: "Peserta yang memenuhi kriteria dapat menerima sertifikat digital dengan ID verifikasi sebagai bukti penyelesaian program.",
    tags: ["ID Verifikasi", "Digital", "Siap arsip"],
    wide: false,
  },
  {
    title: "Laporan batch untuk HR/L&D",
    desc: "Kehadiran, progress, nilai, dan status sertifikat dirangkum agar tim HR/L&D tidak perlu merekap semuanya dari nol.",
    tags: ["Kehadiran", "Nilai", "Completion"],
    wide: false,
  },
  {
    title: "Format yang fleksibel",
    desc: "Program dapat dijalankan sebagai webinar, online training, in-house workshop, atau hybrid sesuai kebutuhan tim.",
    tags: ["Events", "Online", "Hybrid"],
    wide: false,
  },
];

const TABS = [
  {
    id: "peserta",
    label: "Peserta",
    title: "Semua peserta dalam satu daftar",
    desc: "Lihat siapa yang terdaftar, siapa yang aktif, siapa yang perlu follow-up, dan siapa yang sudah memenuhi kriteria sertifikasi.",
  },
  {
    id: "progress",
    label: "Progress",
    title: "Progress belajar terlihat real-time",
    desc: "Setiap modul, quiz, dan project tercatat otomatis. HR tahu persis posisi setiap peserta.",
  },
  {
    id: "laporan",
    label: "Laporan",
    title: "Laporan batch siap untuk manajemen",
    desc: "Ringkasan kehadiran, nilai, dan tingkat kelulusan — siap diunduh begitu batch selesai.",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

const PARTICIPANTS = [
  { initial: "DA", name: "Dian Anggraini", role: "Business Analyst", progress: 92 },
  { initial: "RP", name: "Rizky Pratama", role: "Marketing Lead", progress: 84 },
  { initial: "SN", name: "Sari Nurhaliza", role: "Finance Officer", progress: 76 },
  { initial: "BS", name: "Bayu Santoso", role: "Operations Supervisor", progress: 68 },
  { initial: "LW", name: "Lina Wibowo", role: "HR Generalist", progress: 55 },
];

const WALL_TESTIMONIALS = [
  {
    title: "Laporan batch tanpa rekap manual",
    body: "Yang paling membantu adalah laporan batch. Tim tidak perlu lagi menggabungkan kehadiran, nilai, dan status peserta dari banyak file berbeda.",
    name: "HR Manager",
    role: "Use case · Manufaktur",
  },
  {
    title: "Sertifikat yang mudah diarsipkan",
    body: "Sertifikat digital dengan ID verifikasi membantu proses penyelesaian program lebih rapi dan mudah diarsipkan.",
    name: "L&D Lead",
    role: "Use case · Institusi Keuangan",
  },
  {
    title: "Batch berikutnya tanpa mulai dari nol",
    body: "Materi, assessment, dan alur program tersimpan lebih rapi. Batch berikutnya bisa dijalankan tanpa mulai dari nol.",
    name: "Training Coordinator",
    role: "Use case · BUMN",
  },
  {
    title: "Praktis untuk pekerjaan harian",
    body: "Webinarnya praktis dan langsung bisa diterapkan untuk pekerjaan harian, bukan hanya teori umum.",
    name: "Peserta Webinar",
    role: "Events · AI Productivity",
  },
  {
    title: "Format mengikuti kondisi tim",
    body: "Format training bisa disesuaikan dengan kondisi tim, baik online, in-house, maupun hybrid.",
    name: "People Development",
    role: "Use case · Retail",
  },
  {
    title: "Data untuk evaluasi pelatihan",
    body: "Completion, nilai assessment, dan status sertifikat per divisi terangkum — evaluasi dan perencanaan pelatihan jadi lebih terarah.",
    name: "Human Capital",
    role: "Use case · Energi",
  },
];

const PLANS = [
  {
    name: "Program Batch",
    icon: "bolt" as const,
    desc: "Untuk satu program training terstruktur dengan satu batch peserta.",
    aurora: "/images/lp-startup-aurora-1.svg",
    pill: "disusun sesuai kebutuhan",
    listHeader: "Untuk tim & departemen",
    highlight: false,
    features: [
      "10–25 peserta per batch",
      "Online, in-house, atau hybrid",
      "Materi + assessment terstruktur",
      "Sertifikat digital dengan ID verifikasi",
      "Laporan batch untuk HR/L&D",
    ],
    cta: "Diskusikan Kebutuhan",
  },
  {
    name: "Corporate Plan",
    icon: "briefcase" as const,
    desc: "Untuk organisasi dengan kebutuhan pembelajaran dan training berkelanjutan.",
    aurora: "/images/lp-startup-aurora-2.svg",
    pill: "multi-program · multi-batch",
    listHeader: "Semua yang organisasi butuhkan",
    highlight: true,
    features: [
      "Semua fitur Program Batch",
      "Multi-program & multi-batch",
      "Kustomisasi silabus penuh",
      "Dashboard organisasi",
      "Dedicated account manager",
      "Prioritas jadwal trainer",
      "Laporan evaluasi berkala",
    ],
    cta: "Jadwalkan Konsultasi",
  },
];

const FAQS = [
  {
    q: "Apakah Skillary hanya untuk perusahaan?",
    a: "Tidak. Skillary melayani profesional yang mengikuti events berbayar secara individu, sekaligus tim, HR/L&D, dan organisasi yang membutuhkan program training terstruktur.",
  },
  {
    q: "Bagaimana cara mengikuti Events berbayar Skillary?",
    a: "Jadwal events diumumkan berkala melalui kanal Skillary. Pilih topik yang relevan, lakukan pendaftaran, dan ikuti sesinya — materi sesi dibagikan kepada peserta.",
  },
  {
    q: "Apakah webinar Skillary mendapatkan sertifikat?",
    a: "Peserta yang memenuhi kriteria kehadiran dapat menerima sertifikat keikutsertaan digital. Untuk program batch dan korporat, tersedia sertifikat penyelesaian dengan ID verifikasi.",
  },
  {
    q: "Apakah program bisa diadakan in-house di kantor kami?",
    a: "Bisa. Program dapat dijalankan in-house — trainer hadir di lokasi Anda, dan peserta tetap mendapat akses materi, assessment, dan sertifikat melalui platform.",
  },
  {
    q: "Berapa jumlah peserta ideal per batch?",
    a: "10–25 orang per batch untuk sesi yang efektif. Untuk kebutuhan lebih besar, program dibagi menjadi beberapa batch dengan laporan terpisah per batch.",
  },
  {
    q: "Apakah materi bisa disesuaikan dengan kebutuhan tim kami?",
    a: "Bisa. Silabus, studi kasus, dan kedalaman materi disesuaikan lewat sesi konsultasi sebelum program berjalan.",
  },
  {
    q: "Laporan seperti apa yang diterima HR/L&D setelah program?",
    a: "Laporan batch berisi kehadiran, progress modul, nilai assessment, dan status sertifikat setiap peserta — siap dipakai untuk evaluasi dan pelaporan ke manajemen.",
  },
  {
    q: "Bagaimana cara memulai konsultasi program?",
    a: "Mulai dari konsultasi gratis. Ceritakan kebutuhan tim Anda, kami bantu rekomendasikan topik, format, durasi, dan timeline yang paling sesuai — respon dalam 1 hari kerja.",
  },
];

export default function StartupConceptPage() {
  const [tab, setTab] = useState<TabId>("peserta");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeTab = TABS.find((t) => t.id === tab)!;

  // Aimfox-style header morph: full-width dark bar at top of page,
  // collapses into a floating centered pill once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // LottieFiles-style scroll reveal: fade-up section content the first time
  // it enters the viewport. Reduced-motion users get everything instantly
  // (the CSS media query also neutralizes the initial hidden state).
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("lp-on"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("lp-on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`${manrope.className} min-h-screen text-[#0F172A] antialiased`} style={{ background: DARK }}>
      <style>{`
        @keyframes lp-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .lp-marquee { animation: lp-marquee 55s linear infinite; }
        .lp-marquee:hover { animation-play-state: paused; }
        @keyframes lp-float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .lp-float { animation: lp-float 6s ease-in-out infinite; }
        @keyframes lp-fadein { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .lp-tabfade { animation: lp-fadein 0.35s ease both; }
        [data-reveal] { opacity: 0; transform: translateY(26px); transition: opacity 0.7s ease, transform 0.7s ease; }
        [data-reveal].lp-on { opacity: 1; transform: translateY(0); }
        .lp-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .lp-lift:hover { transform: translateY(-4px); }
        @keyframes lp-growx { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        .lp-grow { transform-origin: left; animation: lp-growx 0.9s ease both; }
        @media (prefers-reduced-motion: reduce) {
          .lp-marquee, .lp-float, .lp-tabfade, .lp-grow { animation: none; }
          [data-reveal] { opacity: 1; transform: none; transition: none; }
          .lp-lift, .lp-lift:hover { transition: none; transform: none; }
        }
      `}</style>
      {/* ── Morphing header: full-width bar at top → floating pill on scroll ── */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Announcement bar — collapses away on scroll */}
        <div
          className={`overflow-hidden transition-all duration-300 ${scrolled ? "max-h-0 opacity-0" : "max-h-11 opacity-100"}`}
          style={{
            background:
              "radial-gradient(ellipse 55% 220% at 50% 0%, rgba(255,120,30,0.85) 0%, rgba(150,55,10,0.55) 40%, rgb(13,16,28) 100%)",
          }}
        >
          <div className="h-11 flex items-center justify-center gap-3 px-4 text-white">
            <p className="text-[11px] md:text-xs font-semibold truncate">
              ✦ BARU: Events Skillary — webinar praktis dan kelas singkat untuk skill kerja profesional
            </p>
            <Link
              href="#events"
              className="shrink-0 text-[11px] md:text-xs font-bold px-3.5 py-1 rounded-full transition-colors hover:bg-white/20"
              style={{ border: "1px solid rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.12)" }}
            >
              Lihat Events
            </Link>
          </div>
        </div>

        {/* Nav bar — morphs between full-width and centered pill */}
        <div className={`transition-all duration-300 ${scrolled ? "px-3 md:px-4 pt-3" : "px-0 pt-0"}`}>
          <div
            className={`flex items-center justify-between h-14 md:h-16 mx-auto transition-all duration-300 ${
              scrolled
                ? "max-w-5xl rounded-full shadow-xl pl-4 pr-2 md:pl-6 md:pr-2.5"
                : "max-w-[120rem] rounded-none pl-4 pr-3 md:pl-8 md:pr-6"
            }`}
            style={{ background: DARK }}
          >
          {/* Logo */}
          <Link href="#" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 shrink-0">
            <Image src="/logo.png" alt="Skillary" width={44} height={24} priority className="h-6 w-auto object-contain" />
            <span className="text-white text-base font-bold tracking-tight">Skillary</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV.map((n) => (
              <a key={n.href} href={n.href} className="text-sm font-medium text-white/60 hover:text-white transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          {/* Desktop right cluster */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/v2/proposal" className="text-sm font-semibold text-white/80 hover:text-white transition-colors">
              Jadwalkan Konsultasi
            </Link>
            <span className="w-px h-5 bg-white/20" />
            <Link href="/login" className="text-sm font-semibold text-white/80 hover:text-white transition-colors">
              Masuk
            </Link>
            <Link
              href="/v2/proposal"
              className="text-sm font-bold px-5 py-2.5 rounded-full bg-white text-[#0F172A] hover:bg-white/90 transition-colors"
            >
              Konsultasi Gratis
            </Link>
          </div>

          {/* Mobile right cluster */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href="/v2/proposal" className="text-xs font-bold px-4 py-2 rounded-full bg-white text-[#0F172A]">
              Konsultasi Gratis
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>
          </div>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div className={`lg:hidden mt-2 rounded-3xl p-5 shadow-xl ${scrolled ? "" : "mx-3"}`} style={{ background: DARK }}>
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {n.label}
                </a>
              ))}
              <div className="flex items-center gap-3 pt-4">
                <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-bold py-3 rounded-full text-white" style={{ border: "1px solid rgba(255,255,255,0.25)" }}>
                  Masuk
                </Link>
                <Link href="/v2/proposal" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-bold py-3 rounded-full bg-white text-[#0F172A]">
                  Konsultasi Gratis
                </Link>
              </div>
            </nav>
            </div>
          )}
        </div>
      </header>

      {/* ── White mega-container on dark canvas (Aimfox `rounded-8xl` structure) ── */}
      <div className="pt-[100px] md:pt-[108px]">
      <main className="bg-white rounded-[2rem] md:rounded-[2.75rem] overflow-hidden">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-5 pt-12 md:pt-20 pb-10 md:pb-14">
        {/* Soft warm glow (Aimfox lavender → Skillary peach) */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center top, rgba(255,138,0,0.14) 0%, rgba(255,90,95,0.07) 40%, transparent 70%)" }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div data-reveal className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 text-[#64748B] bg-white" style={{ border: "1px solid rgb(234, 222, 210)", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgb(255,138,0)" }} />
            Untuk Profesional, Tim, HR & L&D
          </div>

          <h1 data-reveal style={{ transitionDelay: "0.1s" }} className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] mb-6">
            Dari{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
              webinar praktis
            </span>{" "}
            hingga training korporat. Semua lebih terukur.
          </h1>

          <p data-reveal style={{ transitionDelay: "0.2s" }} className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto mb-8 leading-relaxed">
            Skillary membantu profesional, tim, HR, dan L&D menjalankan pembelajaran yang lebih rapi — mulai dari events berbayar, program batch, assessment, sertifikat digital, hingga laporan pelatihan.
          </p>

          <div data-reveal style={{ transitionDelay: "0.3s" }} className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <Link
              href="#events"
              className="w-full sm:w-auto text-center text-sm font-bold px-8 py-4 rounded-full text-white hover:opacity-90 transition-opacity shadow-lg"
              style={{ background: GRADIENT_SIMPLE }}
            >
              Lihat Events →
            </Link>
            <Link
              href="/v2/proposal"
              className="w-full sm:w-auto text-center text-sm font-bold px-8 py-4 rounded-full text-[#0F172A] bg-white hover:bg-gray-50 transition-colors"
              style={{ border: "1.5px solid rgb(226, 232, 240)" }}
            >
              Konsultasi Program
            </Link>
          </div>

          <div data-reveal style={{ transitionDelay: "0.4s" }} className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-[#94A3B8]">
            <span className="flex items-center gap-1.5"><Check /> Events berbayar rutin</span>
            <span className="flex items-center gap-1.5"><Check /> Program tim & korporat</span>
            <span className="flex items-center gap-1.5"><Check /> Respon 1 hari kerja</span>
          </div>
        </div>
      </section>

      {/* ── Full-bleed warm gradient wash spanning batch + mosaic (Aimfox features bg) ── */}
      <div
        style={{
          background:
            "radial-gradient(75% 42% at 50% 6%, rgba(255,206,166,0.5) 0%, rgba(255,232,214,0.3) 40%, rgba(255,255,255,0) 72%), radial-gradient(55% 30% at 22% 30%, rgba(255,214,196,0.28) 0%, rgba(255,255,255,0) 70%), radial-gradient(55% 30% at 78% 30%, rgba(255,224,186,0.28) 0%, rgba(255,255,255,0) 70%)",
        }}
      >

      {/* ── "Peserta Batch Anda" — staggered white cards (Aimfox "Your Accounts") ── */}
      <section className="relative px-5 pt-14 md:pt-20 pb-14 md:pb-20 overflow-hidden">
        {/* Perspective-grid background asset (Skillary warm re-skin of Aimfox floor) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/lp-startup-grid-bg.svg"
          alt=""
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 top-16 md:top-8 w-[900px] md:w-[1300px] max-w-none pointer-events-none select-none"
        />

        <div data-reveal className="relative max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-center max-w-2xl mx-auto mb-10 md:mb-14">
            Pelatihan terskala dengan peserta terpantau
          </h2>

          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="hidden md:block flex-1 border-t border-dashed" style={{ borderColor: "rgb(205, 200, 195)" }} />
            <p className="text-sm font-semibold text-[#475569]">Peserta Batch Anda</p>
            <span className="hidden md:block flex-1 border-t border-dashed" style={{ borderColor: "rgb(205, 200, 195)" }} />
          </div>

          {/* Legend — icons match the card badges */}
          <div className="flex items-center justify-center gap-2 mb-10 text-xs font-semibold text-[#64748B]">
            <span className="flex items-center gap-1.5">
              Aktif belajar
              <svg className="w-3.5 h-3.5" style={{ color: "rgb(255,138,0)" }} fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L4.5 12.5h5L11 22l8.5-10.5h-5L13 2z" /></svg>
            </span>
            <span className="text-[#CBD5E1]">·</span>
            <span className="flex items-center gap-1.5">
              Tersertifikasi
              <svg className="w-3.5 h-3.5" style={{ color: "rgb(255,90,95)" }} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l2.4 4.8 5.6.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.6-.8L12 2z" /></svg>
            </span>
          </div>

          {/* Staggered rows: 3 / 3 / 2 (Aimfox brick layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:-translate-x-5">
            {BATCH_CARDS.slice(0, 3).map((c) => (
              <BatchCard key={c.initial} c={c} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4 lg:translate-x-5">
            {BATCH_CARDS.slice(3, 6).map((c) => (
              <BatchCard key={c.initial} c={c} />
            ))}
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4 mt-4 max-w-2xl mx-auto">
            {BATCH_CARDS.slice(6).map((c) => (
              <BatchCard key={c.initial} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Avatar mosaic + floating stat card (Aimfox "+381 booked calls") ── */}
      <section className="relative px-5 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto">
          {/* Chips + stat card — ONE centered band, card in the middle flanked by
              chips; its lower half overlaps the grid top (Aimfox composition) */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-4 md:mb-0 md:-mb-9">
            {GRID_CHIPS.slice(0, 3).map((chip, i) => (
              <span key={chip} className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-[#334155] shadow-[0_1px_4px_rgba(0,0,0,0.10)]">
                <span className="w-3.5 h-3.5 rounded-[4px] shrink-0" style={{ background: CHIP_COLORS[i] }} />
                {chip}
              </span>
            ))}

            {/* Dark stat card, inline in the band */}
            <div className="rounded-2xl px-5 py-4 text-white shadow-2xl w-56 shrink-0" style={{ background: DARK }}>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="font-semibold text-white/85">Sertifikat terbit</span>
                <span className="text-white/45">Bulan lalu</span>
              </div>
              <div className="flex items-end justify-between gap-3">
                <span className="text-4xl font-bold tracking-tight"><CountUp end={120} prefix="+" /></span>
                <svg viewBox="0 0 100 36" className="w-20 h-9">
                  <defs>
                    <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(255,138,0)" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="rgb(255,90,95)" stopOpacity="0.15" />
                    </linearGradient>
                  </defs>
                  <path d="M0 26 Q12 20 22 24 T44 18 T66 22 T88 8 L100 4 L100 36 L0 36 Z" fill="url(#spark)" />
                  <path d="M0 26 Q12 20 22 24 T44 18 T66 22 T88 8 L100 4" fill="none" stroke="rgb(255,138,0)" strokeWidth="2" />
                </svg>
              </div>
            </div>

            {GRID_CHIPS.slice(3).map((chip, i) => (
              <span key={chip} className="flex items-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-xs font-semibold text-[#334155] shadow-[0_1px_4px_rgba(0,0,0,0.10)]">
                <span className="w-3.5 h-3.5 rounded-[4px] shrink-0" style={{ background: CHIP_COLORS[i + 3] }} />
                {chip}
              </span>
            ))}
          </div>

          {/* Mosaic grid — small tiles, tight gap, ~30% filled organic scatter */}
          <div className="grid grid-cols-7 md:grid-cols-14 gap-1.5 md:gap-2">
            {Array.from({ length: 56 }).map((_, i) => {
              const fillIdx = MOSAIC_FILLED.indexOf(i);
              const filled = fillIdx !== -1;
              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg md:rounded-xl items-center justify-center text-[9px] md:text-[11px] font-bold ${i >= 28 ? "hidden md:flex" : "flex"}`}
                  style={
                    filled
                      ? { background: TILE_COLORS[fillIdx % TILE_COLORS.length], color: "white", boxShadow: "0 2px 5px rgba(15,23,42,0.12)" }
                      : { background: "rgb(250, 251, 253)", border: "1px solid rgb(241, 245, 249)" }
                  }
                >
                  {filled ? TILES[fillIdx % TILES.length] : ""}
                </div>
              );
            })}
          </div>

          {/* Trust strip */}
          <div className="text-center mt-10">
            <p className="text-xs text-[#94A3B8] mb-3">Berangkat dari arsip pengalaman pelatihan korporat sejak 1998</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["Perbankan", "Regulator", "FMCG", "Energi", "Pendidikan", "Organisasi Publik"].map((c) => (
                <span key={c} className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white text-[#475569]" style={{ border: "1px solid rgb(226, 232, 240)" }}>
                  {c}
                </span>
              ))}
            </div>
            <p className="text-[10px] text-[#CBD5E1] mt-3">
              Pengalaman program di sektor perbankan, regulator, FMCG, energi, pendidikan, dan organisasi publik. Logo klien hanya ditampilkan jika telah mendapat persetujuan penggunaan.
            </p>
          </div>
        </div>
      </section>
      </div>

      {/* ── Features grid ── */}
      <section id="events" className="px-5 py-16 md:py-24 scroll-mt-24" style={{ background: "rgb(250, 250, 251)" }}>
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Fitur"
            title={
              <>
                Dibuat agar pembelajaran menghasilkan <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>bukti nyata</span>
              </>
            }
            sub="Dari events rutin sampai training korporat, Skillary membantu setiap program memiliki alur, peserta, assessment, sertifikat, dan laporan yang lebih rapi."
          />

          <div data-reveal className="grid md:grid-cols-6 gap-4 mt-12">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className={`lp-lift rounded-2xl p-6 md:p-7 bg-white ${f.wide ? "md:col-span-3" : "md:col-span-2"}`}
                style={{ border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}
              >
                <h3 className="text-lg font-bold mb-2 leading-snug">{f.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed mb-4">{f.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {f.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: "rgb(255, 244, 232)", color: "rgb(220, 110, 0)", border: "1px solid rgb(255, 214, 165)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Control tower (tabs) ── */}
      <section id="platform" className="px-5 py-16 md:py-24 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeading
            eyebrow="Platform"
            title="Dashboard kendali pembelajaran dan training"
            sub="Pantau event, peserta, batch, progress, assessment, sertifikat, dan laporan dalam satu alur yang lebih rapi."
          />

          <div className="flex justify-center gap-2 mt-10 mb-8">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className="text-sm font-bold px-5 py-2.5 rounded-full transition-all"
                style={
                  tab === t.id
                    ? { background: GRADIENT_SIMPLE, color: "white" }
                    : { background: "white", color: "#64748B", border: "1px solid rgb(226, 232, 240)" }
                }
              >
                {t.label}
              </button>
            ))}
          </div>

          <div data-reveal className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3">{activeTab.title}</h3>
              <p className="text-[#64748B] leading-relaxed mb-6">{activeTab.desc}</p>
              <div className="rounded-2xl p-5 bg-white" style={{ border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                <p className="text-sm text-[#475569] leading-relaxed mb-3">
                  &ldquo;Koordinator training dapat memantau beberapa batch dari satu dashboard, mulai dari progress peserta sampai laporan akhir.&rdquo;
                </p>
                <p className="text-sm font-bold">Learning Operations</p>
                <p className="text-xs text-[#94A3B8]">Corporate Training</p>
              </div>
            </div>

            {/* Tab panel mockup — dark card for contrast, like Aimfox product shots */}
            <div key={tab} className="lp-tabfade rounded-2xl p-5 shadow-xl" style={{ background: DARK }}>
              {tab === "peserta" && (
                <div className="space-y-2.5">
                  {PARTICIPANTS.map((p) => (
                    <div key={p.name} className="flex items-center gap-3 rounded-xl px-3.5 py-2.5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0" style={{ background: GRADIENT_SIMPLE }}>
                        {p.initial}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                        <p className="text-[11px] text-white/40 truncate">{p.role}</p>
                      </div>
                      <div className="w-16 md:w-24 shrink-0">
                        <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div className="lp-grow h-full rounded-full" style={{ width: `${p.progress}%`, background: GRADIENT_SIMPLE }} />
                        </div>
                        <p className="text-[10px] text-white/40 mt-1 text-right">{p.progress}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === "progress" && (
                <div className="space-y-4 py-2">
                  {[
                    { label: "Modul 1 — Fondasi", pct: 100 },
                    { label: "Modul 2 — Praktik Terapan", pct: 88 },
                    { label: "Modul 3 — Mini-project", pct: 64 },
                    { label: "Capstone Assessment", pct: 41 },
                  ].map((m) => (
                    <div key={m.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-white/75 font-medium">{m.label}</span>
                        <span className="text-white/45">{m.pct}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                        <div className="lp-grow h-full rounded-full" style={{ width: `${m.pct}%`, background: GRADIENT_SIMPLE }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === "laporan" && (
                <div className="space-y-2.5">
                  {[
                    { name: "Laporan Kehadiran — Batch Q3", meta: "PDF · siap diunduh" },
                    { name: "Rekap Nilai Assessment", meta: "XLSX · siap diunduh" },
                    { name: "Status Sertifikasi Peserta", meta: "PDF · siap diunduh" },
                    { name: "Ringkasan Eksekutif Batch", meta: "PDF · siap diunduh" },
                  ].map((r) => (
                    <div key={r.name} className="flex items-center justify-between rounded-xl px-4 py-3" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                      <div>
                        <p className="text-sm font-semibold text-white">{r.name}</p>
                        <p className="text-[11px] text-white/40">{r.meta}</p>
                      </div>
                      <span className="text-xs font-bold" style={{ color: "rgb(255,150,40)" }}>Unduh</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Program — integrations-style with floating tool tiles (LottieFiles) ── */}
      <section id="program" className="relative px-5 py-24 md:py-36 overflow-hidden scroll-mt-24">
        {/* Floating tiles field */}
        <div className="absolute inset-0 max-w-6xl mx-auto pointer-events-none select-none" aria-hidden>
          {FLOAT_TILES.map((t, i) => (
            <div
              key={i}
              className={`lp-float absolute ${t.w} aspect-square rounded-xl md:rounded-2xl flex items-center justify-center shadow-md`}
              style={{ top: t.top, left: t.left, background: t.bg, animationDelay: `${(i % 6) * 0.7}s`, animationDuration: `${5 + (i % 4)}s` }}
            >
              <svg
                className="w-1/2 h-1/2"
                style={{ color: "dark" in t && t.dark ? "rgb(122,60,10)" : "white" }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d={TILE_ICONS[t.icon]} />
              </svg>
            </div>
          ))}
        </div>

        <div data-reveal className="relative max-w-xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight mb-5">
            Program untuk berbagai kebutuhan belajar dan training
          </h2>
          <p className="text-[#64748B] leading-relaxed mb-8 max-w-md mx-auto">
            Dari events singkat sampai corporate batch, Skillary menyiapkan topik yang relevan untuk pekerjaan, tim, dan organisasi.
          </p>
          <Link
            href="/v2/catalog"
            className="inline-block text-sm font-bold px-8 py-4 rounded-full text-white hover:opacity-90 transition-opacity shadow-lg"
            style={{ background: GRADIENT_SIMPLE }}
          >
            Lihat Katalog Program
          </Link>
        </div>
      </section>

      {/* ── Testimonial wall — slow marquee sliding left (LottieFiles) ── */}
      <section id="testimoni" className="px-0 py-16 md:py-24 scroll-mt-24 overflow-hidden" style={{ background: "rgb(250, 250, 251)" }}>
        <div data-reveal className="max-w-6xl mx-auto px-5">
          <SectionHeading
            eyebrow="Testimoni"
            title="Yang dibutuhkan HR, L&D, dan peserta profesional"
            sub="Beberapa kebutuhan yang sering muncul saat organisasi dan peserta mengikuti program pembelajaran terstruktur."
          />
        </div>
        <div className="mt-12">
          <div className="lp-marquee flex w-max gap-4 items-start">
            <MarqueeGroup />
            <MarqueeGroup ariaHidden />
          </div>
        </div>
      </section>

      {/* ── Pricing — dark band with aurora cards (Aimfox card-bg style) ── */}
      <section id="paket" className="px-3 md:px-5 py-16 md:py-24 scroll-mt-24">
        <div data-reveal className="max-w-6xl mx-auto rounded-[2rem] md:rounded-[2.5rem] px-5 md:px-12 py-14 md:py-20" style={{ background: DARK }}>
          <div className="text-center max-w-2xl mx-auto text-white">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "rgb(255,138,0)" }}>
              Paket
            </p>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">Paket yang mengikuti skala Anda</h2>
            <p className="text-white/50 mt-4 leading-relaxed">
              Mulai dari satu batch, berkembang ke program tahunan — penawaran disusun sesuai kebutuhan dan budget. Untuk jadwal webinar berbayar, lihat bagian Events.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 mt-12">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className="lp-lift relative overflow-hidden rounded-3xl p-7 md:p-8 text-white"
                style={{ border: "1px solid rgba(255,255,255,0.14)" }}
              >
                {/* Aurora background asset */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={plan.aurora} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />

                <div className="relative">
                  {plan.highlight && (
                    <span className="absolute -top-4 right-0 text-[11px] font-bold px-3 py-1 rounded-full text-white" style={{ background: GRADIENT_SIMPLE }}>
                      Paling Populer
                    </span>
                  )}

                  {/* Icon + name */}
                  <div className="flex items-center gap-2.5 mb-5">
                    {plan.icon === "bolt" ? (
                      <svg className="w-5 h-5" style={{ color: "rgb(255,150,40)" }} fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L4.5 12.5h5L11 22l8.5-10.5h-5L13 2z" /></svg>
                    ) : (
                      <svg className="w-5 h-5" style={{ color: "rgb(255,150,40)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    )}
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                  </div>

                  <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-[230px]">{plan.desc}</p>

                  {/* Price row */}
                  <div className="flex items-end gap-3 mb-8 flex-wrap">
                    <span className="text-5xl font-bold tracking-tight">Custom</span>
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full mb-1.5"
                      style={{ background: "rgba(255,138,0,0.22)", border: "1px solid rgba(255,158,60,0.45)", color: "rgb(255,200,150)" }}
                    >
                      {plan.pill}
                    </span>
                  </div>

                  {/* Glass CTA */}
                  <Link
                    href="/v2/proposal"
                    className="block text-center text-sm font-bold py-3.5 rounded-full transition-colors hover:bg-white/20"
                    style={{ background: "rgba(255,255,255,0.10)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(8px)" }}
                  >
                    {plan.cta}
                  </Link>

                  {/* Feature list */}
                  <p className="text-base font-bold mt-9 mb-4">{plan.listHeader}</p>
                  <ul className="space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/80">
                        <svg className="w-4 h-4 shrink-0 mt-0.5 text-white/90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Liquid-glass CTA (Aimfox "View Integrations") — glows on hover */}
          <div className="mt-12 flex justify-center">
            <GlassButton href="/v2/catalog">Lihat Katalog Program</GlassButton>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="px-5 py-16 md:py-24 scroll-mt-24" style={{ background: "rgb(250, 250, 251)" }}>
        <div data-reveal className="max-w-2xl mx-auto">
          <SectionHeading eyebrow="FAQ" title="Pertanyaan yang sering diajukan" sub="" />
          <div className="mt-10 space-y-3">
            {FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl px-5 py-1 bg-white" style={{ border: "1px solid rgb(234, 237, 243)" }}>
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-4 text-sm font-bold">
                  {f.q}
                  <svg className="w-4 h-4 shrink-0 text-[#94A3B8] transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="pb-5 text-sm text-[#64748B] leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Close white mega-container — final CTA + footer live on the dark canvas ── */}
      </main>
      </div>

      {/* ── Final CTA + footer — saturated warm gradient section (Aimfox "Start scaling") ── */}
      <section className="relative overflow-hidden px-3 md:px-5 pt-20 md:pt-28 pb-3 md:pb-5">
        {/* Gradient + grid + chevron + grain background asset */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/lp-startup-cta-bg.svg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />

        {/* CTA content */}
        <div data-reveal className="relative max-w-2xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
            Mulai dari event terdekat atau susun program untuk tim Anda
          </h2>
          <p className="text-white/85 mb-9 leading-relaxed max-w-xl mx-auto">
            Ikuti Events Skillary atau ceritakan kebutuhan training tim Anda. Kami bantu rekomendasikan topik, format, durasi, dan timeline yang paling sesuai.
          </p>
          <Link
            href="#events"
            className="inline-block m-1.5 text-sm font-bold px-9 py-4 rounded-full text-white transition-colors shadow-xl hover:bg-black"
            style={{ background: "#0B0A12" }}
          >
            Lihat Events
          </Link>
          <Link
            href="/v2/proposal"
            className="inline-block m-1.5 text-sm font-bold px-9 py-4 rounded-full bg-white text-[#0F172A] hover:bg-white/90 transition-colors shadow-xl"
          >
            Konsultasi Program
          </Link>
          <p className="text-sm text-white/85 mt-6 font-medium">
            Konsultasi gratis <span className="mx-1.5 opacity-70">✦</span> Tanpa komitmen <span className="mx-1.5 opacity-70">✦</span> Respon 1 hari kerja
          </p>
        </div>

        {/* ── Black rounded footer floating inside the gradient ── */}
        <footer className="relative max-w-6xl mx-auto mt-16 md:mt-24 rounded-[2rem] md:rounded-[2.75rem] px-7 md:px-14 pt-10 md:pt-14 pb-8 text-white" style={{ background: "#0B0A12" }}>
          <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
            {/* Brand */}
            <div className="max-w-xs">
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo.png" alt="Skillary" width={58} height={32} className="h-8 w-auto object-contain" />
                <span className="text-xl font-bold tracking-tight">Skillary</span>
              </div>
              <p className="text-sm text-white/45 leading-relaxed">
                Dibangun untuk pembelajaran profesional.
                <br />
                Dirancang untuk hasil yang terukur.
              </p>
            </div>

            {/* Link columns + socials */}
            <div className="flex flex-wrap gap-x-16 gap-y-8">
              <ul className="space-y-3 text-sm text-white/60">
                {NAV.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="hover:text-white transition-colors">{n.label}</a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3 text-sm text-white/60">
                <li><Link href="/v2/catalog" className="hover:text-white transition-colors">Katalog Program</Link></li>
                <li><Link href="/v2/untuk-organisasi" className="hover:text-white transition-colors">Untuk Organisasi</Link></li>
                <li><Link href="/v2/portfolio" className="hover:text-white transition-colors">Portofolio</Link></li>
                <li><Link href="/v2/about" className="hover:text-white transition-colors">Tentang</Link></li>
                <li><Link href="/v2/proposal" className="hover:text-white transition-colors">Kontak</Link></li>
              </ul>

              {/* Socials */}
              <div className="flex items-start gap-3">
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.41.6.22 1 .48 1.4.9.4.4.7.9.9 1.4.16.4.35 1 .41 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.41 2.2-.22.6-.48 1-.9 1.4-.4.4-.9.7-1.4.9-.4.16-1 .35-2.2.41-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.41-.6-.22-1-.48-1.4-.9-.4-.4-.7-.9-.9-1.4-.16-.4-.35-1-.41-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.41-2.2.22-.6.48-1 .9-1.4.4-.4.9-.7 1.4-.9.4-.16 1-.35 2.2-.41C8.4 2.2 8.8 2.2 12 2.2m0 2.3c-3.1 0-3.5 0-4.7.07-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.83-.4.4-.63.76-.83 1.3-.16.4-.35 1-.4 2.1-.07 1.2-.07 1.6-.07 4.7s0 3.5.07 4.7c.05 1.1.24 1.7.4 2.1.2.5.44.9.83 1.3.4.4.76.63 1.3.83.4.16 1 .35 2.1.4 1.2.07 1.6.07 4.7.07s3.5 0 4.7-.07c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.83.4-.4.63-.76.83-1.3.16-.4.35-1 .4-2.1.07-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.05-1.1-.24-1.7-.4-2.1-.2-.5-.44-.9-.83-1.3-.4-.4-.76-.63-1.3-.83-.4-.16-1-.35-2.1-.4-1.2-.07-1.6-.07-4.7-.07M12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4m0 2.3a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8m5.9-2.6a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0"/></svg>
                </a>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.488-1.087z"/></svg>
                </a>
                <a href={`mailto:${EMAIL_GENERAL}`} aria-label="Email" className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/40" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
            <span>© 2026 PT Skillary Generasi Cerdas. All rights reserved.</span>
            <span className="flex gap-6">
              <Link href="/privacy" className="hover:text-white/70 transition-colors">Kebijakan Privasi</Link>
              <Link href="/terms" className="hover:text-white/70 transition-colors">Syarat &amp; Ketentuan</Link>
            </span>
          </div>
        </footer>
      </section>
    </div>
  );
}

// ── Small building blocks ──

/**
 * LottieFiles-style counter: renders 0, counts up (ease-out) the first time
 * it enters the viewport. Reduced-motion users see the final value at once.
 */
function CountUp({ end, prefix = "", suffix = "", duration = 1200 }: { end: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setFinal = () => { el.textContent = `${prefix}${end}${suffix}`; };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setFinal(); return; }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const pr = Math.max(0, Math.min(1, (t - t0) / duration));
          const eased = 1 - Math.pow(1 - pr, 3);
          el.textContent = `${prefix}${Math.round(end * eased)}${suffix}`;
          if (pr < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [end, prefix, suffix, duration]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

/**
 * Aimfox "View Integrations" liquid-glass button, re-skinned warm.
 * Default: translucent dark pill + white inset rim. Hover: an ::after layer
 * fades in carrying 2 outer halos + 5 stacked warm inset glows (backlit glass).
 */
function GlassButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative inline-flex items-center justify-center h-12 px-7 rounded-full text-sm font-semibold text-white bg-black/20 shadow-[0_0_16.8px_0_rgba(255,255,255,0.40)_inset] after:absolute after:inset-0 after:rounded-full after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100 after:shadow-[0_0_4.2px_0_rgba(255,170,100,0.30),0_0_35px_0_rgba(255,150,70,0.30),0_-6.3px_7px_-5.6px_#FFE4CC_inset,0_-14px_16px_-11.2px_#FFEDDC_inset,0_0_7px_1.4px_#FFD2A8_inset,0_0_16px_0_#FFA14D_inset,0_0_42px_0_#FF8A00_inset]"
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}

/** One pass of the sliding testimonial/media wall (duplicated for the loop). */
function MarqueeGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const card = "lp-lift rounded-2xl p-6 bg-white";
  const cardStyle = { border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" } as const;
  // LottieFiles quote-card anatomy: avatar row on top, quote body,
  // company wordmark at the bottom.
  const T = (i: number) => {
    const t = WALL_TESTIMONIALS[i];
    const [role, org] = t.role.split(" · ");
    const initials = t.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
    return (
      <div className={card} style={cardStyle}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: GRADIENT_SIMPLE }}>
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold leading-tight">{t.name}</p>
            <p className="text-xs text-[#94A3B8]">{role}</p>
          </div>
        </div>
        <p className="text-sm text-[#64748B] leading-relaxed mb-5">&ldquo;{t.body}&rdquo;</p>
        <p className="text-sm font-black tracking-tight text-[#334155] uppercase">{org}</p>
      </div>
    );
  };
  const col = "flex flex-col gap-4 w-72 md:w-80 shrink-0";
  const colOffset = `${col} mt-10`;

  return (
    <div className="flex gap-4 items-start" aria-hidden={ariaHidden}>
      <div className={col}>{T(0)}</div>

      <div className={colOffset}>
        {/* Visual: gradient program tile */}
        <div className="rounded-2xl p-6 h-52 flex flex-col justify-between text-white" style={{ background: GRADIENT_SIMPLE }}>
          <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2L4.5 12.5h5L11 22l8.5-10.5h-5L13 2z" /></svg>
          <div>
            <p className="text-lg font-bold leading-snug">AI Productivity untuk Tim</p>
            <p className="text-xs text-white/75 mt-1">Live Webinar · Paid Event</p>
          </div>
        </div>
        {T(1)}
      </div>

      <div className={col}>
        {/* Visual: certificate mockup */}
        <div className="rounded-2xl overflow-hidden bg-white" style={cardStyle}>
          <div className="h-2.5" style={{ background: GRADIENT_SIMPLE }} />
          <div className="p-6 text-center">
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#94A3B8] uppercase mb-1.5">Sertifikat Kelulusan</p>
            <p className="text-base font-bold mb-1">Dian Anggraini</p>
            <p className="text-[11px] text-[#64748B] mb-4">Power BI Business Dashboard</p>
            <div className="w-10 h-10 mx-auto rounded-full flex items-center justify-center text-white" style={{ background: GRADIENT_SIMPLE }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <p className="text-[10px] text-[#94A3B8] mt-3 font-mono">ID: SKL-2026-0128 · terverifikasi</p>
          </div>
        </div>
        {T(2)}
      </div>

      <div className={colOffset}>
        {T(3)}
        {/* Visual: dark stats tile */}
        <div className="rounded-2xl p-6 h-44 flex flex-col justify-between text-white" style={{ background: DARK }}>
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-white/85">Sertifikat terbit</span>
            <span className="text-white/45">Bulan lalu</span>
          </div>
          <div>
            <p className="text-4xl font-bold tracking-tight">+120</p>
            <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="lp-grow h-full w-4/5 rounded-full" style={{ background: GRADIENT_SIMPLE }} />
            </div>
          </div>
        </div>
      </div>

      <div className={col}>
        {/* Visual: coral program tile */}
        <div className="rounded-2xl p-6 h-52 flex flex-col justify-between text-white" style={{ background: "rgb(255,90,95)" }}>
          <svg className="w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-6m4 6V7m4 10v-3M5 21h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
          <div>
            <p className="text-lg font-bold leading-snug">Power BI Business Dashboard</p>
            <p className="text-xs text-white/75 mt-1">2 hari · in-house / hybrid</p>
          </div>
        </div>
        {T(4)}
      </div>

      <div className={col}>{T(5)}</div>
    </div>
  );
}

function Check() {
  return (
    <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "rgb(255,138,0)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "rgb(255,138,0)" }}>
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">{title}</h2>
      {sub && <p className="text-[#64748B] mt-4 leading-relaxed">{sub}</p>}
    </div>
  );
}

function BatchCard({ c }: { c: (typeof BATCH_CARDS)[number] }) {
  return (
    <div className="lp-lift flex items-center gap-3 rounded-full bg-white pl-2 pr-3 py-2" style={{ border: "1px solid rgb(240, 242, 247)", boxShadow: "0 2px 11px -6px rgba(0,0,0,0.10), 0 12px 32px -18px rgba(255,120,50,0.18)" }}>
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: GRADIENT_SIMPLE }}>
        {c.initial}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-bold truncate">
          {c.name} <span className="font-medium text-[#94A3B8] text-xs">· {c.org}</span>
        </p>
        <p className="text-xs text-[#64748B] truncate">{c.role}</p>
      </div>
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ border: "1px solid rgb(238, 241, 246)", background: c.badge === "active" ? "rgb(255, 247, 237)" : "rgb(245, 243, 255)" }}
      >
        {c.badge === "active" ? (
          <svg className="w-4 h-4" style={{ color: "rgb(255,138,0)" }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 2L4.5 12.5h5L11 22l8.5-10.5h-5L13 2z" />
          </svg>
        ) : (
          <svg className="w-4 h-4" style={{ color: "rgb(255,90,95)" }} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l2.4 4.8 5.6.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.6-.8L12 2z" />
          </svg>
        )}
      </div>
    </div>
  );
}
