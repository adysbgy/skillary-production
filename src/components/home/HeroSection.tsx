import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FFFDF9] pb-16 pt-12 lg:pb-24 lg:pt-20">
      {/* Warm ambient background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#D4A57408_1px,transparent_1px),linear-gradient(to_bottom,#D4A57408_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute left-1/4 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#D88A44] opacity-[0.07] blur-[120px]" />
      <div className="absolute right-1/3 bottom-0 -z-10 h-[300px] w-[300px] rounded-full bg-[#172554] opacity-[0.06] blur-[100px]" />

      <Container className="relative z-10 grid items-center gap-16 lg:grid-cols-2">
        {/* Left — Copy */}
        <div className="max-w-xl">
          <div className="motion-fade-up mb-5 inline-flex items-center gap-2 rounded-full border border-[#E7DDD4] bg-[#FAF3EA] px-4 py-2 text-[11px] font-bold uppercase tracking-widest text-[#C2410C]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D88A44]" />
            Berangkat dari pengalaman pelatihan sejak 1998
          </div>

          <h1 className="motion-fade-up motion-delay-100 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.5rem] text-[#172554]">
            Platform Pelatihan Terukur untuk Organisasi
          </h1>

          <p className="motion-fade-up motion-delay-200 mt-6 text-lg leading-8 text-[#475569] max-w-lg">
            Skillary membantu HR, L&D, dan tim organisasi mengelola training internal — dari peserta, materi, assessment, sertifikat, hingga laporan progress dalam satu alur digital.
          </p>

          <div className="motion-fade-up motion-delay-300 mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact?type=proposal&source=proposal">
              <button className="motion-btn bg-[#172554] hover:bg-[#1E3A8A] text-white px-7 py-3.5 shadow-lg shadow-[#172554]/15 font-semibold rounded-xl text-sm">
                Diskusikan Kebutuhan Training
              </button>
            </Link>
            <Link href="/portofolio">
              <button className="motion-btn px-7 py-3.5 hover:bg-[#FFF8F1] font-semibold rounded-xl border border-[#E7DDD4] text-[#334155] bg-white text-sm">
                Lihat Portofolio
              </button>
            </Link>
          </div>

          {/* Value Chips */}
          <div className="motion-fade-up motion-delay-400 mt-8 flex flex-wrap gap-2">
            {["Training Batch", "Sertifikat Digital", "Report Peserta"].map((chip) => (
              <span key={chip} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-[#E7DDD4] px-3.5 py-1.5 text-xs font-semibold text-[#6B625A]">
                <span className="h-1 w-1 rounded-full bg-[#D88A44]" />
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Right — Static UI Mockup */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="motion-scale-in motion-delay-200 relative bg-white border border-[#E7DDD4] rounded-3xl shadow-2xl shadow-[#172554]/[0.06] overflow-hidden">
            {/* Product Chrome */}
            <div className="px-5 py-2.5 border-b border-[#E7DDD4] bg-[#FAF3EA] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#E7DDD4]" />
                <span className="h-2 w-2 rounded-full bg-[#E7DDD4]" />
                <span className="h-2 w-2 rounded-full bg-[#E7DDD4]" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest">Skillary</span>
              </div>
              <div className="w-12" />
            </div>

            {/* Dashboard Header */}
            <div className="px-5 py-3 border-b border-[#E7DDD4] flex items-center justify-between bg-white">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#10B981]" />
                <span className="text-xs font-bold text-[#172554] tracking-tight">Batch Training Aktif</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold text-[#6B625A] bg-[#FAF3EA] border border-[#E7DDD4] px-2.5 py-1 rounded-md">Data Storytelling untuk Tim Internal</span>
                <span className="text-[9px] font-bold text-[#D88A44] bg-[#FFF7ED] border border-[#FED7AA] px-2 py-0.5 rounded-md">Export CSV</span>
              </div>
            </div>

            {/* Dashboard Body */}
            <div className="p-5 space-y-4">
              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Peserta Aktif", value: "24", accent: "bg-[#172554]", delay: "motion-delay-400" },
                  { label: "Progress Rata-rata", value: "72%", accent: "bg-[#D88A44]", delay: "motion-delay-500" },
                  { label: "Assessment Selesai", value: "18", accent: "bg-[#10B981]", delay: "motion-delay-600" },
                  { label: "Sertifikat Terbit", value: "12", accent: "bg-[#C2410C]", delay: "motion-delay-700" },
                ].map((stat) => (
                  <div key={stat.label} className={`motion-fade-up ${stat.delay} bg-[#FFFDF9] border border-[#E7DDD4] rounded-xl p-3`}>
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className={`h-1.5 w-1.5 rounded-full ${stat.accent}`} />
                      <span className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">{stat.label}</span>
                    </div>
                    <div className="text-xl font-bold text-[#172554] tracking-tight">{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Participant List Mockup */}
              <div className="motion-fade-up motion-delay-700 border border-[#E7DDD4] rounded-xl overflow-hidden">
                <div className="overflow-x-auto pb-1">
                  <div className="min-w-[300px]">
                    <div className="grid grid-cols-[1fr_80px_60px_60px] gap-2 px-4 py-2.5 bg-[#FAF3EA] text-[9px] font-bold text-[#6B625A] uppercase tracking-wider">
                  <span>Peserta</span>
                  <span className="text-center">Progress</span>
                  <span className="text-center">Quiz</span>
                  <span className="text-center">Sertifikat</span>
                </div>
                {[
                  { name: "Peserta A", progress: 100, quiz: "Lulus", cert: true },
                  { name: "Peserta B", progress: 85, quiz: "Lulus", cert: false },
                  { name: "Peserta C", progress: 40, quiz: "—", cert: false },
                ].map((row, i) => (
                  <div key={i} className="grid grid-cols-[1fr_80px_60px_60px] gap-2 px-4 py-2.5 border-t border-[#E7DDD4] items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-[#FAF3EA] border border-[#E7DDD4] flex items-center justify-center text-[9px] font-bold text-[#6B625A]">
                        {row.name.slice(-1)}
                      </div>
                      <span className="text-xs font-semibold text-[#1F2937]">{row.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5 justify-center">
                      <div className="h-1.5 w-12 bg-[#E7DDD4] rounded-full overflow-hidden">
                        <div className={`h-full rounded-full motion-progress-fill ${row.progress === 100 ? "bg-[#10B981]" : "bg-[#D88A44]"}`} style={{ width: `${row.progress}%` }} />
                      </div>
                      <span className="text-[10px] font-bold text-[#6B625A]">{row.progress}%</span>
                    </div>
                    <div className="flex justify-center">
                      {row.quiz === "Lulus" ? (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#D1FAE5] text-[#065F46]">Lulus</span>
                      ) : (
                        <span className="text-[10px] text-[#94A3B8]">{row.quiz}</span>
                      )}
                    </div>
                    <div className="flex justify-center">
                      {row.cert ? (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#FFF7ED] text-[#D88A44]">Terbit</span>
                      ) : (
                        <span className="text-[10px] text-[#94A3B8]">—</span>
                      )}
                    </div>
                  </div>
                ))}
                  </div>
                </div>
              </div>

              {/* Follow-up card */}
              <div className="motion-fade-up motion-delay-800 bg-[#FFF7ED] border border-[#FED7AA] rounded-xl p-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-[#C2410C]/10 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 text-[#C2410C]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-[#C2410C]">Follow-up Diperlukan</p>
                  <p className="text-[10px] text-[#6B625A]">1 peserta belum menyelesaikan assessment</p>
                </div>
              </div>
            </div>

            {/* Mockup Footer */}
            <div className="px-5 py-2.5 border-t border-[#E7DDD4] bg-[#FFFDF9]">
              <p className="text-[10px] text-[#94A3B8] italic font-medium">Ilustrasi tampilan monitoring training</p>
            </div>
          </div>

          {/* Warm Human Context Strip */}
          <div className="motion-fade-in motion-delay-900 mt-5 relative rounded-2xl overflow-hidden border border-[#E7DDD4] shadow-md aspect-[16/6]">
            <Image
              src="/images/training/hero-training-session.webp"
              alt="Ilustrasi suasana pelatihan korporat dengan trainer dan peserta"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#172554]/40 to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="text-[10px] text-white/80 font-medium italic">Ilustrasi suasana pelatihan</span>
              <span className="text-[9px] text-white/60 bg-white/10 backdrop-blur-sm px-2 py-0.5 rounded-md">Sejak 1998</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
