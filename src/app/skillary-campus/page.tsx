"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { WHATSAPP_NUMBER, whatsappLink } from "@/data/config";

/* ═══════════════════════════════════════════════════════
   STATIC DATA
   ═══════════════════════════════════════════════════════ */

const NAV_ITEMS = [
  { label: "Program", href: "#programs" },
  { label: "Untuk Organisasi", href: "#use-cases" },
  { label: "Alur Training", href: "#training-flow" },
  { label: "Resources", href: "#resources" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#final-cta" },
];

const TRUST_CHIPS = [
  "HR & L&D",
  "Corporate Training",
  "Sekolah & Yayasan",
  "Community Batch",
  "Hybrid Learning",
  "Digital Certificate",
];

const STATS = [
  {
    icon: "path",
    title: "Training Path",
    desc: "Alur belajar dapat disusun per batch dan kebutuhan organisasi.",
  },
  {
    icon: "assessment",
    title: "Assessment",
    desc: "Evaluasi peserta sebelum dan sesudah pelatihan.",
  },
  {
    icon: "certificate",
    title: "Certificate",
    desc: "Sertifikat digital untuk dokumentasi peserta.",
  },
  {
    icon: "report",
    title: "Report",
    desc: "Laporan training untuk HR, L&D, dan PIC program.",
  },
];

const VALUE_PROPS = [
  {
    title: "Materi Terstruktur",
    desc: "Program disusun berdasarkan kebutuhan tim, level peserta, dan target kompetensi.",
    icon: "📚",
  },
  {
    title: "Assessment Peserta",
    desc: "Evaluasi pembelajaran membantu organisasi melihat perkembangan peserta secara lebih objektif.",
    icon: "📝",
  },
  {
    title: "Sertifikat Digital",
    desc: "Sertifikat peserta dapat diterbitkan lebih rapi untuk kebutuhan dokumentasi internal.",
    icon: "🏅",
  },
  {
    title: "Training Report",
    desc: "HR/L&D mendapat rangkuman kehadiran, hasil belajar, feedback, dan rekomendasi tindak lanjut.",
    icon: "📊",
  },
];

const PROGRAMS = [
  {
    title: "Power BI Business Dashboard",
    category: "Data & Dashboard",
    desc: "Membantu tim membuat dashboard bisnis yang mudah dibaca dan digunakan untuk pengambilan keputusan.",
    output: "Dashboard, dataset practice, certificate, report",
    color: "#3B82F6",
  },
  {
    title: "AI Productivity for Teams",
    category: "AI Productivity",
    desc: "Pelatihan penggunaan AI untuk meningkatkan efisiensi kerja, membuat draft, merangkum, menganalisis, dan menyusun workflow.",
    output: "AI workflow, prompt library, certificate, report",
    color: "#8B5CF6",
  },
  {
    title: "Business Presentation & Reporting",
    category: "Visual Communication",
    desc: "Membantu peserta menyusun presentasi bisnis yang jelas, visual, dan meyakinkan.",
    output: "Slide deck, storyline, final presentation",
    color: "#EC4899",
  },
  {
    title: "Data-Driven Decision Making",
    category: "Business Analytics",
    desc: "Mendorong tim membaca data, memahami insight, dan membuat keputusan berbasis bukti.",
    output: "Case study, insight report, certificate",
    color: "#10B981",
  },
  {
    title: "Process Improvement",
    category: "Operational Excellence",
    desc: "Pelatihan untuk memahami masalah proses, memetakan alur kerja, dan menyusun rekomendasi perbaikan.",
    output: "Process map, improvement plan, report",
    color: "#F59E0B",
  },
  {
    title: "Leadership & Team Communication",
    category: "Leadership",
    desc: "Membantu leader dan tim membangun komunikasi kerja yang lebih efektif dan terarah.",
    output: "Reflection task, action plan, certificate",
    color: "#EF4444",
  },
];

const BENEFITS = [
  {
    title: "Bisa Disesuaikan",
    desc: "Program dapat mengikuti kebutuhan divisi, level peserta, dan target kompetensi.",
    icon: "⚙️",
  },
  {
    title: "Cocok untuk HR & L&D",
    desc: "Setiap pelatihan dapat dilengkapi alur peserta, assessment, sertifikat, dan laporan.",
    icon: "👥",
  },
  {
    title: "Berbasis Output Nyata",
    desc: "Peserta tidak hanya mengikuti kelas, tetapi menghasilkan tugas, dashboard, laporan, presentasi, atau action plan.",
    icon: "🎯",
  },
  {
    title: "Mendukung Online, Offline, dan Hybrid",
    desc: "Program dapat dijalankan sesuai kebutuhan organisasi dan kondisi peserta.",
    icon: "🌐",
  },
  {
    title: "Dokumentasi Lebih Rapi",
    desc: "Hasil training dapat terdokumentasi melalui attendance, feedback, assessment, sertifikat, dan report.",
    icon: "📋",
  },
  {
    title: "Siap untuk Program Berulang",
    desc: "Cocok untuk onboarding, upskilling, batch training, komunitas, dan program kampus.",
    icon: "🔄",
  },
];

const DOC_CARDS = [
  { title: "Training Session", sub: "Live session overview", accent: "#3B82F6" },
  { title: "Participant Attendance", sub: "Tracking & completion", accent: "#10B981" },
  { title: "Assessment Result", sub: "Pre & post evaluation", accent: "#8B5CF6" },
  { title: "Digital Certificate", sub: "Automated issuance", accent: "#EC4899" },
  { title: "Feedback Summary", sub: "Participant responses", accent: "#F59E0B" },
  { title: "Training Report", sub: "Comprehensive analytics", accent: "#EF4444" },
];

const TRAINING_FLOW = [
  { step: "01", title: "Diskusi kebutuhan", desc: "Brief training dari PIC" },
  { step: "02", title: "Penyusunan program", desc: "Materi & alur belajar" },
  { step: "03", title: "Registrasi peserta", desc: "Enrollment & data" },
  { step: "04", title: "Pelaksanaan training", desc: "Online / offline / hybrid" },
  { step: "05", title: "Assessment", desc: "Evaluasi peserta" },
  { step: "06", title: "Sertifikat digital", desc: "Penerbitan otomatis" },
  { step: "07", title: "Training report", desc: "Laporan lengkap" },
  { step: "08", title: "Rekomendasi tindak lanjut", desc: "Follow-up program" },
];

const RESOURCES = [
  { title: "Company Profile Skillary", icon: "📄" },
  { title: "Corporate Training Proposal", icon: "📑" },
  { title: "Training Brief Template", icon: "📝" },
  { title: "Sample Training Report", icon: "📊" },
];

const USE_CASES = [
  {
    title: "Untuk HR & L&D",
    desc: "Mengelola pelatihan internal dengan alur peserta, assessment, dan laporan yang lebih rapi.",
    icon: "🏢",
    accent: "#3B82F6",
  },
  {
    title: "Untuk Sekolah & Yayasan",
    desc: "Menyusun program peningkatan kompetensi guru, siswa, komunitas, atau pengurus.",
    icon: "🎓",
    accent: "#10B981",
  },
  {
    title: "Untuk Perusahaan",
    desc: "Mendukung upskilling tim dengan output yang bisa ditindaklanjuti.",
    icon: "💼",
    accent: "#8B5CF6",
  },
  {
    title: "Untuk Komunitas",
    desc: "Mengelola batch belajar, sertifikat, dan dokumentasi peserta.",
    icon: "🤝",
    accent: "#EC4899",
  },
];

const FAQS = [
  {
    q: "Apakah Skillary hanya untuk individu?",
    a: "Tidak. Skillary dirancang untuk kebutuhan tim, organisasi, sekolah, komunitas, dan perusahaan.",
  },
  {
    q: "Apakah program bisa in-house?",
    a: "Bisa. Program dapat disesuaikan dengan kebutuhan organisasi, divisi, level peserta, dan target kompetensi.",
  },
  {
    q: "Apakah peserta mendapatkan sertifikat?",
    a: "Ya. Peserta dapat menerima sertifikat digital sesuai ketentuan program.",
  },
  {
    q: "Apakah tersedia laporan hasil training?",
    a: "Ya. Skillary dapat menyiapkan laporan kehadiran, assessment, feedback, dan rekomendasi tindak lanjut.",
  },
  {
    q: "Apakah bisa request program khusus?",
    a: "Bisa. Skillary dapat membantu menyusun program berdasarkan brief kebutuhan organisasi.",
  },
  {
    q: "Apakah training bisa online atau offline?",
    a: "Bisa. Program dapat dijalankan secara online, offline, hybrid, atau in-house.",
  },
];

/* ═══════════════════════════════════════════════════════
   ICON COMPONENTS
   ═══════════════════════════════════════════════════════ */

function StatIcon({ type }: { type: string }) {
  const cls = "w-8 h-8 text-[#F97316]";
  switch (type) {
    case "path":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 8.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
        </svg>
      );
    case "assessment":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case "certificate":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
        </svg>
      );
    case "report":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      );
    default:
      return null;
  }
}

/* ═══════════════════════════════════════════════════════
   HERO DASHBOARD MOCKUP
   ═══════════════════════════════════════════════════════ */

function HeroDashboardMockup() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Main dashboard card */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Training Dashboard</p>
            <p className="text-lg font-bold text-[#0B1220] mt-0.5">Data Analytics Batch 3</p>
          </div>
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
        </div>

        {/* Progress bars */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#64748B]">Progress Peserta</span>
              <span className="font-semibold text-[#0B1220]">78%</span>
            </div>
            <div className="h-2 rounded-full bg-[#F1F5F9]">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#F97316] to-[#EC4899]" style={{ width: "78%" }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-[#64748B]">Assessment Completion</span>
              <span className="font-semibold text-[#0B1220]">64%</span>
            </div>
            <div className="h-2 rounded-full bg-[#F1F5F9]">
              <div className="h-2 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6]" style={{ width: "64%" }} />
            </div>
          </div>
        </div>

        {/* Mini chart */}
        <div className="flex items-end gap-1.5 pt-2">
          {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-[#F97316]/20 to-[#F97316]/60"
              style={{ height: `${h * 0.5}px` }}
            />
          ))}
        </div>
      </div>

      {/* Floating certificate card */}
      <div className="absolute -bottom-4 -left-4 md:-left-8 rounded-xl border border-[#E5E7EB] bg-white shadow-lg p-3 w-48">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs font-bold text-[#0B1220]">Certificate</p>
        </div>
        <div className="h-12 rounded-lg border border-dashed border-[#E5E7EB] bg-[#F8FAFC] flex items-center justify-center">
          <p className="text-[10px] text-[#64748B]">Digital Certificate Preview</p>
        </div>
      </div>

      {/* Floating report card */}
      <div className="absolute -top-3 -right-3 md:-right-6 rounded-xl border border-[#E5E7EB] bg-white shadow-lg p-3 w-44">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
            <svg className="w-4 h-4 text-[#8B5CF6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <p className="text-xs font-bold text-[#0B1220]">Training Report</p>
        </div>
        <div className="space-y-1">
          <div className="h-1.5 rounded-full bg-[#E5E7EB] w-full" />
          <div className="h-1.5 rounded-full bg-[#E5E7EB] w-3/4" />
          <div className="h-1.5 rounded-full bg-[#E5E7EB] w-1/2" />
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute bottom-12 -right-2 md:-right-4 flex flex-col gap-1.5">
        {["Assessment", "Digital Certificate", "Training Report"].map((label) => (
          <span
            key={label}
            className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full bg-[#0B1220] text-white shadow-md"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FAQ ACCORDION ITEM
   ═══════════════════════════════════════════════════════ */

function FaqItem({ q, a, open, toggle }: { q: string; a: string; open: boolean; toggle: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  return (
    <div className="border-b border-[#E5E7EB]">
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
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════════════════ */

export default function SkillaryCampusPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  function scrollTo(href: string) {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const ctaLink = whatsappLink("Halo Skillary, saya ingin berdiskusi tentang kebutuhan training untuk tim/organisasi kami.");
  const programCtaLink = whatsappLink("Halo Skillary, saya tertarik dengan program training. Bisa diskusi lebih lanjut?");
  const resourceCtaLink = whatsappLink("Halo Skillary, saya ingin minta resource (company profile / proposal / training brief).");

  return (
    <div className="bg-white text-[#0B1220] overflow-x-hidden">

      {/* ─── STICKY HEADER ─── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.06)]" : "bg-white"
        }`}
        style={{ borderBottom: "1px solid #E5E7EB" }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 flex items-center justify-between h-16 md:h-[72px]">
          {/* Logo */}
          <Link href="/skillary-campus" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">S</span>
            </div>
            <span className="text-xl font-extrabold tracking-tight text-[#0B1220]">Skillary</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="px-3.5 py-2 text-sm font-medium text-[#64748B] hover:text-[#0B1220] transition-colors rounded-lg hover:bg-[#F8FAFC]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={ctaLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            Diskusikan Training
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#F8FAFC]"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav overlay */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 top-16 bg-white z-40 px-5 py-6 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="block w-full text-left px-4 py-3.5 text-base font-medium text-[#0B1220] rounded-xl hover:bg-[#F8FAFC] transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4">
              <a
                href={ctaLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-5 py-3.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white text-base font-semibold"
              >
                Diskusikan Training
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ─── HERO SECTION ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] to-white">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-[#F97316]/5 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#EC4899]/5 blur-3xl translate-x-1/3 translate-y-1/3" />

        <div className="relative max-w-7xl mx-auto px-5 md:px-6 lg:px-8 pt-16 md:pt-24 pb-20 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F97316]/10 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-pulse" />
                Corporate Digital Training Platform
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-[44px] lg:text-[52px] font-extrabold leading-[1.1] tracking-tight text-[#0B1220] mb-6">
                Training Digital Terstruktur untuk Tim yang Butuh Skill{" "}
                <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                  Data, AI, dan Presentasi Bisnis
                </span>
              </h1>

              <p className="text-base md:text-lg text-[#64748B] leading-relaxed mb-8 max-w-xl">
                Skillary membantu HR, L&D, sekolah, yayasan, komunitas, dan organisasi menjalankan pelatihan dengan materi, assessment, sertifikat digital, dan laporan peserta dalam satu alur.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <a
                  href={ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] text-sm md:text-base"
                >
                  Diskusikan Kebutuhan Training
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
                <button
                  onClick={() => scrollTo("#programs")}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-[#E5E7EB] text-[#0B1220] font-semibold hover:bg-[#F8FAFC] transition-colors text-sm md:text-base"
                >
                  Lihat Program
                </button>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap gap-2">
                {TRUST_CHIPS.map((chip) => (
                  <span
                    key={chip}
                    className="px-3 py-1.5 rounded-full bg-white border border-[#E5E7EB] text-xs font-medium text-[#64748B] shadow-sm"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — Dashboard Mockup */}
            <div className="hidden lg:block">
              <HeroDashboardMockup />
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST / STATS SECTION ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B1220]">
              Dirancang untuk Program Training yang Lebih{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                Terukur
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.title}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 hover:shadow-lg hover:border-[#F97316]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[#F97316]/10 flex items-center justify-center mb-4 group-hover:bg-[#F97316]/20 transition-colors">
                  <StatIcon type={stat.icon} />
                </div>
                <h3 className="text-lg font-bold text-[#0B1220] mb-2">{stat.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUE PROPOSITION ─── */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B1220]">
              Satu Alur untuk Semua Kebutuhan Training{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                Organisasi
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_PROPS.map((vp) => (
              <div
                key={vp.title}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 hover:shadow-lg hover:border-[#F97316]/30 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{vp.icon}</div>
                <h3 className="text-base font-bold text-[#0B1220] mb-2">{vp.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROGRAMS ─── */}
      <section id="programs" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B1220]">
              Program Skillary yang Bisa{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                Disesuaikan untuk Tim
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.title}
                className="group rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Colored top bar */}
                <div className="h-1.5" style={{ background: `linear-gradient(to right, ${prog.color}, ${prog.color}80)` }} />
                <div className="p-6">
                  <span
                    className="inline-block px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider mb-3"
                    style={{ background: `${prog.color}15`, color: prog.color }}
                  >
                    {prog.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B1220] mb-2 group-hover:text-[#F97316] transition-colors">
                    {prog.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed mb-4">{prog.desc}</p>
                  <div className="flex items-start gap-2 mb-5">
                    <svg className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-[#64748B]">
                      <span className="font-semibold text-[#0B1220]">Output:</span> {prog.output}
                    </p>
                  </div>
                  <a
                    href={programCtaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#F97316] hover:underline"
                  >
                    Diskusikan Program
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY SKILLARY ─── */}
      <section className="py-20 md:py-28 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B1220]">
              Mengapa Organisasi Memilih{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                Skillary?
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 hover:shadow-lg hover:border-[#F97316]/30 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{b.icon}</div>
                <h3 className="text-base font-bold text-[#0B1220] mb-2">{b.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DOCUMENTATION SECTION ─── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B1220]">
              Bukan Sekadar Kelas, tetapi Sistem Training yang{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                Terdokumentasi
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOC_CARDS.map((doc) => (
              <div
                key={doc.title}
                className="group rounded-2xl border border-[#E5E7EB] bg-white overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Simulated dashboard preview */}
                <div className="h-36 bg-[#F8FAFC] border-b border-[#E5E7EB] p-4 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: doc.accent }} />
                      <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{doc.title}</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
                      <div className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
                      <div className="w-2 h-2 rounded-full bg-[#E5E7EB]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 rounded-full bg-[#E5E7EB] w-full" />
                    <div className="h-2 rounded-full bg-[#E5E7EB] w-4/5" />
                    <div className="h-2 rounded-full w-3/5" style={{ backgroundColor: `${doc.accent}30` }} />
                    <div className="flex gap-2">
                      <div className="h-6 rounded-md flex-1" style={{ backgroundColor: `${doc.accent}15` }} />
                      <div className="h-6 rounded-md flex-1 bg-[#F1F5F9]" />
                      <div className="h-6 rounded-md flex-1 bg-[#F1F5F9]" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-[#0B1220]">{doc.title}</h3>
                  <p className="text-xs text-[#64748B] mt-0.5">{doc.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRAINING FLOW ─── */}
      <section id="training-flow" className="py-20 md:py-28 bg-[#0B1220] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              Dari Brief Training sampai{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                Laporan Peserta
              </span>
            </h2>
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block">
            <div className="grid grid-cols-4 gap-6 mb-6">
              {TRAINING_FLOW.slice(0, 4).map((item) => (
                <div key={item.step} className="relative group">
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 hover:bg-white/10 transition-all duration-300">
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                      {item.step}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-2 mb-1">{item.title}</h3>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-6">
              {TRAINING_FLOW.slice(4).map((item) => (
                <div key={item.step} className="relative group">
                  <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-5 hover:bg-white/10 transition-all duration-300">
                    <span className="text-2xl font-extrabold bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                      {item.step}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-2 mb-1">{item.title}</h3>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden space-y-4">
            {TRAINING_FLOW.map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center shrink-0">
                    <span className="text-xs font-extrabold text-white">{item.step}</span>
                  </div>
                  <div className="w-px flex-1 bg-white/10 mt-2" />
                </div>
                <div className="pb-6">
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESOURCES ─── */}
      <section id="resources" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B1220]">
              Resource untuk HR, L&D, dan{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                PIC Program
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESOURCES.map((res) => (
              <div
                key={res.title}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center hover:shadow-lg hover:border-[#F97316]/30 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{res.icon}</div>
                <h3 className="text-sm font-bold text-[#0B1220] mb-4">{res.title}</h3>
                <a
                  href={resourceCtaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F97316] hover:underline"
                >
                  Minta Resource
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── USE CASES ─── */}
      <section id="use-cases" className="py-20 md:py-28 bg-[#F8FAFC] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B1220]">
              Skillary untuk Berbagai{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                Kebutuhan
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {USE_CASES.map((uc) => (
              <div
                key={uc.title}
                className="group rounded-2xl border border-[#E5E7EB] bg-white p-6 hover:shadow-lg transition-all duration-300"
                style={{ borderTopColor: uc.accent, borderTopWidth: "3px" }}
              >
                <div className="text-3xl mb-3">{uc.icon}</div>
                <h3 className="text-base font-bold text-[#0B1220] mb-2">{uc.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{uc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section id="faq" className="py-20 md:py-28 bg-white scroll-mt-20">
        <div className="max-w-3xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B1220]">
              Pertanyaan yang Sering{" "}
              <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
                Ditanyakan
              </span>
            </h2>
          </div>

          <div className="divide-y divide-[#E5E7EB] border-t border-[#E5E7EB]">
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

      {/* ─── FINAL CTA ─── */}
      <section id="final-cta" className="py-20 md:py-28 bg-[#0B1220] scroll-mt-20">
        <div className="max-w-3xl mx-auto px-5 md:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-5">
            Siap Membuat Training Internal Lebih{" "}
            <span className="bg-gradient-to-r from-[#F97316] to-[#EC4899] bg-clip-text text-transparent">
              Terukur?
            </span>
          </h2>
          <p className="text-base md:text-lg text-white/60 leading-relaxed mb-10 max-w-2xl mx-auto">
            Diskusikan kebutuhan training tim Anda. Skillary dapat membantu menyusun program, materi, assessment, sertifikat digital, dan laporan peserta dalam satu alur.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#F97316] to-[#EC4899] text-white font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] text-sm md:text-base"
            >
              Diskusikan Kebutuhan Training
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            <button
              onClick={() => scrollTo("#programs")}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors text-sm md:text-base"
            >
              Lihat Program Skillary
            </button>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#111827] text-white pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                  <span className="text-white font-extrabold text-sm">S</span>
                </div>
                <span className="text-xl font-extrabold">Skillary</span>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                Skillary membantu organisasi menjalankan training digital yang lebih terstruktur, terdokumentasi, dan terukur.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Navigasi</h4>
              <ul className="space-y-2.5">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => scrollTo(item.href)}
                      className="text-sm text-white/60 hover:text-[#F97316] transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-4">Kontak</h4>
              <ul className="space-y-2.5">
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <svg className="w-4 h-4 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21.75 6.75-9.513 7.048a1.5 1.5 0 01-1.974 0L.75 6.75M2.25 18h19.5a1.5 1.5 0 001.5-1.5V7.5a1.5 1.5 0 00-1.5-1.5H2.25a1.5 1.5 0 00-1.5 1.5v9a1.5 1.5 0 001.5 1.5z" />
                  </svg>
                  hello@skillary.my.id
                </li>
                <li className="flex items-center gap-2 text-sm text-white/60">
                  <svg className="w-4 h-4 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                  </svg>
                  skillary.my.id
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-xs text-white/30">
              © {new Date().getFullYear()} Skillary. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ─── FLOATING WHATSAPP BUTTON ─── */}
      <a
        href={whatsappLink("Halo Skillary, saya ingin diskusi tentang training.")}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[#25D366] text-white font-semibold shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-sm"
        aria-label="WhatsApp"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="hidden sm:inline">Diskusi Training</span>
      </a>
    </div>
  );
}
