import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Platform Skillary | Learning Management System",
  description:
    "Satu sistem untuk mengelola materi pembelajaran, assessment, sertifikat digital, dan laporan peserta — dari onboarding hingga evaluasi akhir.",
};

const FEATURES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Materi & Modul Terstruktur",
    desc: "Susun kurikulum per modul dan lesson — teks, video, atau quiz. Peserta mengikuti urutan yang sudah Anda rancang, tanpa perlu back-and-forth manual.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: "Progress Tracking Real-Time",
    desc: "Pantau siapa saja yang sudah menyelesaikan lesson mana, berapa persen progress per peserta, dan siapa yang tertinggal — langsung dari dashboard admin.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Quiz & Assessment Online",
    desc: "Buat soal pilihan ganda dengan feedback otomatis. Atur passing score, tentukan apakah quiz wajib diselesaikan sebelum lanjut ke modul berikutnya.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: "Gradebook & Laporan Peserta",
    desc: "Lihat skor quiz, status penyelesaian, dan histori per peserta dalam satu tabel. Export ke CSV kapan saja untuk laporan ke manajemen atau HR.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    title: "Sertifikat Digital Otomatis",
    desc: "Sertifikat diterbitkan otomatis setelah peserta memenuhi syarat penyelesaian. Setiap sertifikat punya ID unik yang bisa diverifikasi secara online.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: "Manajemen Batch & Peserta",
    desc: "Kelola peserta per batch atau per organisasi. Import data peserta via CSV, atur akses kursus per grup, dan pantau progres semua batch dalam satu dashboard.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Admin & Instructor Workflow",
    desc: "Role terpisah untuk Admin dan Instructor. Admin mengelola semua aspek platform; Instructor fokus ke konten kursus mereka sendiri tanpa akses data sensitif.",
  },
];

const FLOW_STEPS = [
  {
    step: "01",
    role: "Admin / L&D",
    title: "Setup Program",
    desc: "Buat kursus, susun modul dan lesson, tentukan passing score, dan atur mode sertifikat. Import daftar peserta via CSV atau undang manual.",
    color: "rgb(255, 138, 0)",
    bg: "rgb(255, 244, 232)",
  },
  {
    step: "02",
    role: "Peserta",
    title: "Belajar & Assessment",
    desc: "Peserta login, akses materi sesuai urutan, mengerjakan quiz di setiap modul. Progress tersimpan otomatis — bisa dilanjutkan kapan saja.",
    color: "rgb(59, 130, 246)",
    bg: "rgb(239, 246, 255)",
  },
  {
    step: "03",
    role: "Admin / L&D",
    title: "Monitor & Evaluasi",
    desc: "Pantau progress real-time di gradebook. Lihat siapa yang lulus, siapa yang tertinggal, dan berapa skor rata-rata per batch.",
    color: "rgb(16, 185, 129)",
    bg: "rgb(236, 253, 245)",
  },
  {
    step: "04",
    role: "Sistem Otomatis",
    title: "Sertifikat & Laporan",
    desc: "Sertifikat digital diterbitkan otomatis setelah syarat terpenuhi. Laporan batch bisa di-export kapan saja untuk keperluan HR atau manajemen.",
    color: "rgb(139, 92, 246)",
    bg: "rgb(245, 243, 255)",
  },
];

const FOR_WHO = [
  { label: "HR Manager", desc: "Kelola program onboarding dan pelatihan karyawan tanpa spreadsheet manual." },
  { label: "L&D Team", desc: "Rancang kurikulum, pantau progress, dan buat laporan untuk manajemen." },
  { label: "Training Manager", desc: "Jalankan batch training B2B dengan alur peserta, assessment, dan sertifikat yang rapi." },
  { label: "Institusi Pendidikan", desc: "Distribusikan materi ke siswa/mahasiswa dengan progress tracking dan sertifikat kelulusan." },
];

export default function PlatformPage() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen">

      {/* ── HERO ── */}
      <section className="pt-20 pb-20" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <Container className="max-w-5xl text-center">
          <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)", border: "1.5px solid rgb(255, 214, 165)" }}>
            Platform LMS
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#181818] mb-6 leading-[1.1]">
            Satu Platform untuk Semua<br className="hidden sm:block" /> Alur Pelatihan Organisasi
          </h1>
          <p className="text-lg text-black/60 leading-relaxed mb-10 max-w-2xl mx-auto">
            Dari materi dan assessment, hingga sertifikat digital dan laporan peserta — semuanya dikelola dalam satu sistem yang terukur dan mudah dioperasikan.
          </p>

          {/* Stats row */}
          <div className="flex flex-wrap items-center justify-center gap-8 mb-12">
            {[
              { n: "7", label: "Fitur inti terintegrasi" },
              { n: "3", label: "Role: Admin, Instructor, Peserta" },
              { n: "1", label: "Alur dari materi → laporan" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-extrabold bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))" }}>
                  {s.n}
                </div>
                <div className="text-xs text-black/50 font-medium mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact?type=platform">
              <button className="text-white px-8 py-3.5 shadow-lg font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: "linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))" }}>
                Jadwalkan Demo Platform
              </button>
            </Link>
            <Link href="/demo">
              <button className="px-8 py-3.5 font-semibold rounded-full bg-white text-[#334155] hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                Lihat Demo
              </button>
            </Link>
          </div>
        </Container>
      </section>

      {/* ── DASHBOARD MOCKUP ── */}
      <section className="py-20 bg-white" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <Container className="max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Tampilan Dashboard Admin</h2>
            <p className="text-black/50 text-sm">Semua data peserta, progress, dan laporan dalam satu layar.</p>
          </div>

          {/* Dashboard Mockup */}
          <div className="rounded-2xl overflow-hidden shadow-2xl" style={{ border: "1.5px solid rgb(226, 232, 240)" }}>
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#F1F5F9]" style={{ borderBottom: "1px solid rgb(226, 232, 240)" }}>
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <div className="mx-auto flex-1 max-w-xs">
                <div className="bg-white rounded-md px-3 py-1.5 text-xs text-gray-400 text-center" style={{ border: "1px solid rgb(226, 232, 240)" }}>
                  app.skillary.id/admin
                </div>
              </div>
            </div>

            {/* Dashboard body */}
            <div className="bg-white flex" style={{ minHeight: "360px" }}>
              {/* Sidebar */}
              <div className="w-48 shrink-0 bg-[#181818] text-white flex flex-col py-5 px-4 gap-1">
                <div className="flex items-center gap-2 mb-6 px-2">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                    <span className="text-white font-black text-[10px]">S</span>
                  </div>
                  <span className="font-bold text-sm">Skillary Admin</span>
                </div>
                {[
                  { label: "Dashboard", active: true },
                  { label: "Kursus" },
                  { label: "Peserta" },
                  { label: "Batch" },
                  { label: "Laporan" },
                  { label: "Sertifikat" },
                ].map((item) => (
                  <div key={item.label} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium cursor-default ${item.active ? "bg-white/10 text-white" : "text-gray-400"}`}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.active ? "rgb(255,138,0)" : "transparent", border: item.active ? "none" : "1.5px solid rgb(75,85,99)" }} />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Main content */}
              <div className="flex-1 p-6 bg-[#F8FAFC]">
                {/* Stat cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {[
                    { label: "Peserta Aktif", value: "48", color: "rgb(255,138,0)" },
                    { label: "Sudah Selesai", value: "31", color: "rgb(16,185,129)" },
                    { label: "Rata-rata Skor", value: "82%", color: "rgb(59,130,246)" },
                    { label: "Sertifikat Terbit", value: "29", color: "rgb(139,92,246)" },
                  ].map((card) => (
                    <div key={card.label} className="bg-white rounded-xl p-4 shadow-sm" style={{ border: "1px solid rgb(226,232,240)" }}>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-2">{card.label}</p>
                      <p className="text-2xl font-extrabold" style={{ color: card.color }}>{card.value}</p>
                    </div>
                  ))}
                </div>

                {/* Progress table */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ border: "1px solid rgb(226,232,240)" }}>
                  <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: "1px solid rgb(226,232,240)" }}>
                    <span className="text-xs font-bold text-[#181818]">Progress Peserta — Batch Q2 2026</span>
                    <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-1 rounded-md border border-gray-200">Export CSV</span>
                  </div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-[#F8FAFC]" style={{ borderBottom: "1px solid rgb(226,232,240)" }}>
                        {["Nama", "Progress", "Skor Terakhir", "Status"].map((h) => (
                          <th key={h} className="px-4 py-2.5 text-left font-semibold text-gray-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Rina Dewi", progress: 100, score: 90, status: "Lulus", statusColor: "rgb(16,185,129)", statusBg: "rgb(209,250,229)" },
                        { name: "Bagas Prakoso", progress: 75, score: 78, status: "Dalam Progress", statusColor: "rgb(59,130,246)", statusBg: "rgb(219,234,254)" },
                        { name: "Siti Rahma", progress: 100, score: 85, status: "Lulus", statusColor: "rgb(16,185,129)", statusBg: "rgb(209,250,229)" },
                        { name: "Doni Kurniawan", progress: 40, score: 60, status: "Perlu Follow-up", statusColor: "rgb(245,158,11)", statusBg: "rgb(254,243,199)" },
                      ].map((row, i) => (
                        <tr key={i} style={{ borderBottom: i < 3 ? "1px solid rgb(241,245,249)" : "none" }}>
                          <td className="px-4 py-3 font-medium text-[#181818]">{row.name}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full max-w-[80px]">
                                <div className="h-1.5 rounded-full" style={{ width: `${row.progress}%`, background: "linear-gradient(90deg, rgb(255,138,0), rgb(255,90,95))" }} />
                              </div>
                              <span className="text-gray-500 text-[10px]">{row.progress}%</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">{row.score}</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-[10px] font-bold" style={{ color: row.statusColor, background: row.statusBg }}>
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] text-black/30 mt-4 italic">Ilustrasi tampilan dashboard — data adalah contoh fiktif.</p>
        </Container>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20 bg-[#FFFDF9]" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <Container className="max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Fitur Platform</h2>
            <p className="text-black/50 text-sm max-w-lg mx-auto">Setiap fitur dirancang untuk mengurangi pekerjaan manual tim L&D dan memudahkan evaluasi pelatihan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl hover:-translate-y-1 transition-transform" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)" }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-[#181818] text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-black/50 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── ALUR ── */}
      <section className="py-20 bg-white" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <Container className="max-w-4xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Alur Kerja Platform</h2>
            <p className="text-black/50 text-sm">Dari setup program hingga laporan akhir — semua dalam satu alur yang terstruktur.</p>
          </div>
          <div className="space-y-5">
            {FLOW_STEPS.map((s, i) => (
              <div key={i} className="flex gap-5 p-6 rounded-2xl bg-white hover:-translate-y-0.5 transition-transform" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="shrink-0 flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg" style={{ background: s.bg, color: s.color }}>
                    {s.step}
                  </div>
                  {i < FLOW_STEPS.length - 1 && <div className="w-px flex-1 min-h-[24px]" style={{ background: "rgb(240, 217, 200)" }} />}
                </div>
                <div className="pt-1">
                  <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full mb-2" style={{ background: s.bg, color: s.color }}>
                    {s.role}
                  </span>
                  <h3 className="font-bold text-[#181818] mb-1">{s.title}</h3>
                  <p className="text-sm text-black/50 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── FOR WHO ── */}
      <section className="py-20 bg-[#FFFDF9]" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <Container className="max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Platform Ini untuk Siapa?</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {FOR_WHO.map((w, i) => (
              <div key={i} className="flex items-start gap-4 bg-white p-6 rounded-2xl" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#181818] mb-1">{w.label}</h4>
                  <p className="text-sm text-black/50">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 text-center">
        <Container className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full mb-6" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)", border: "1.5px solid rgb(255, 214, 165)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(255,138,0)] inline-block" />
            Konsultasi gratis
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-[#181818] mb-5">
            Siap Menerapkan Platform Skillary di Organisasi Anda?
          </h2>
          <p className="text-lg text-black/50 mb-10 max-w-xl mx-auto">
            Diskusikan kebutuhan platform, jumlah peserta, dan program yang ingin dijalankan. Tim Skillary siap membantu.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact?type=platform">
              <button className="text-white px-8 py-4 shadow-lg font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all text-base" style={{ background: "linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))" }}>
                Diskusi Kebutuhan Platform →
              </button>
            </Link>
            <Link href="/untuk-organisasi">
              <button className="bg-white text-[#334155] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all text-base" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                Lihat Solusi Organisasi
              </button>
            </Link>
          </div>
        </Container>
      </section>

    </div>
  );
}
