import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import { GradientText } from "@/components/v2/marketing/MarketingUI";

export const metadata: Metadata = {
  title: "Learning Path untuk Organisasi | Skillary",
  description: "Susun alur pembelajaran bertahap sesuai kebutuhan kompetensi peserta dan output program.",
};

const paths = [
  { title: "Data Productivity Path", audience: "Staff keuangan, analis, dan admin yang bekerja dengan data harian.", modules: ["Dasar Spreadsheet", "Data Cleaning & Validation", "Pivot Table & Dashboard", "Studi Kasus Internal"], assessment: "Pre-test kompetensi dasar, final project berbasis data internal.", output: "Peserta mampu mengolah data lebih cepat dan membuat laporan visual." },
  { title: "AI for Work Path", audience: "Profesional yang ingin memanfaatkan AI untuk produktivitas kerja.", modules: ["Pengenalan AI Tools", "AI untuk Penulisan & Riset", "AI untuk Presentasi", "Etika & Batasan AI"], assessment: "Quiz pemahaman konsep, project implementasi AI dalam tugas harian.", output: "Peserta memahami cara menggunakan AI tools secara aman dan produktif." },
  { title: "Leadership Communication Path", audience: "Supervisor, manajer, dan calon pemimpin tim.", modules: ["Komunikasi Asertif", "Feedback & Coaching", "Presentation Skill", "Conflict Resolution"], assessment: "Roleplay assessment, peer evaluation.", output: "Peserta mampu memimpin tim dengan komunikasi yang lebih terstruktur." },
  { title: "Teacher Development Path", audience: "Guru, dosen, dan pengelola pendidikan.", modules: ["Digital Classroom", "AI untuk Pembelajaran", "Evaluasi Berbasis Kompetensi", "Desain Kurikulum"], assessment: "Portfolio pengajaran, refleksi tertulis.", output: "Pendidik mampu merancang pembelajaran yang lebih interaktif dan terukur." },
];

const steps = [
  { step: "1", title: "Analisis Kebutuhan", desc: "Tim Skillary berdiskusi dengan organisasi untuk memahami profil peserta, gap kompetensi, dan output yang diinginkan." },
  { step: "2", title: "Rancang Kurikulum", desc: "Modul disusun secara bertahap, dari dasar ke lanjutan, dengan assessment di setiap milestone." },
  { step: "3", title: "Eksekusi & Monitoring", desc: "Program dijalankan melalui platform Skillary. Progress peserta dapat dipantau secara real-time." },
  { step: "4", title: "Evaluasi & Laporan", desc: "Setelah program selesai, organisasi menerima laporan lengkap dan sertifikat bagi peserta yang lulus." },
];

const pillars = [
  { label: "Terstruktur", desc: "Modul disusun bertahap dari dasar ke lanjutan." },
  { label: "Terukur", desc: "Assessment di setiap milestone untuk mengukur progress." },
  { label: "Kustom", desc: "Disesuaikan dengan kebutuhan dan profil peserta." },
];

export default function LearningPathsPage() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(255,138,0,0.13) 0%, rgba(255,90,95,0.06) 40%, transparent 70%)" }} />
        <div data-reveal className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 text-[#64748B] bg-white" style={{ border: "1px solid rgb(234, 222, 210)", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgb(255,138,0)" }} />
            Learning Path
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
            Alur belajar yang <GradientText>terstruktur dan terukur</GradientText>
          </h1>
          <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed mb-10">
            Susun alur pembelajaran bertahap sesuai kebutuhan kompetensi peserta dan output program — dirancang kustom, bukan template generik.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/contact?type=in-house&source=learning-paths">
              <button className="text-white text-sm font-bold px-8 py-4 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>Diskusikan Learning Path</button>
            </Link>
            <Link href="/programs">
              <button className="text-sm font-bold px-8 py-4 rounded-full bg-white hover:bg-gray-50 transition-colors text-[#0F172A]">Lihat Area Program</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="px-5 pb-16 md:pb-20">
        <Container className="max-w-5xl">
          <div data-reveal className="text-center mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "rgb(255,138,0)" }}>Prinsip Desain</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Apa itu Learning Path?</h2>
            <p className="text-[#64748B] mt-4 max-w-2xl mx-auto leading-relaxed">Learning path menghubungkan modul menjadi satu program koheren, dengan assessment dan output yang jelas di setiap tahap.</p>
          </div>
          <div data-reveal className="grid sm:grid-cols-3 gap-5">
            {pillars.map((item) => (
              <div key={item.label} className="lp-lift bg-white rounded-2xl p-7 text-center" style={{ border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-5 font-bold text-lg" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)" }}>{item.label[0]}</div>
                <h3 className="font-bold text-[#0F172A] mb-2">{item.label}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Example Paths */}
      <section className="px-5 py-16 md:py-24" style={{ background: "rgb(250, 247, 244)" }}>
        <Container className="max-w-6xl">
          <div data-reveal className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "rgb(255,138,0)" }}>Contoh Program</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Contoh Learning Path</h2>
            <p className="text-[#64748B] mt-4 max-w-2xl mx-auto">Berikut contoh alur pembelajaran yang dapat dirancang bersama tim Skillary.</p>
          </div>
          <div data-reveal className="grid md:grid-cols-2 gap-6">
            {paths.map((path) => (
              <div key={path.title} className="lp-lift bg-white rounded-2xl p-7" style={{ border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: "rgb(255,138,0)" }} />
                  <h3 className="font-bold text-lg text-[#0F172A]">{path.title}</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div><span className="font-semibold text-[#334155]">Audiens:</span> <span className="text-[#475569]">{path.audience}</span></div>
                  <div>
                    <span className="font-semibold text-[#334155]">Modul:</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {path.modules.map((m) => (
                        <span key={m} className="inline-block text-xs px-2.5 py-1 rounded-full font-medium" style={{ background: "rgb(255, 244, 232)", color: "rgb(180, 90, 0)", border: "1px solid rgb(255, 214, 165)" }}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <div><span className="font-semibold text-[#334155]">Assessment:</span> <span className="text-[#475569]">{path.assessment}</span></div>
                  <div><span className="font-semibold text-[#334155]">Output:</span> <span className="text-[#475569]">{path.output}</span></div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process Steps */}
      <section className="px-5 py-16 md:py-24">
        <Container className="max-w-4xl">
          <div data-reveal className="text-center mb-12">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "rgb(255,138,0)" }}>Proses</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Bagaimana Skillary Menyusun Learning Path?</h2>
          </div>
          <div data-reveal className="space-y-5">
            {steps.map((item) => (
              <div key={item.step} className="lp-lift flex gap-5 items-start bg-white rounded-2xl p-6" style={{ border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>{item.step}</div>
                <div>
                  <p className="font-bold text-[#0F172A]">{item.title}</p>
                  <p className="text-[#475569] text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="px-5 py-16 md:py-24" style={{ background: "rgb(13, 16, 28)" }}>
        <div data-reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-white mb-5">Siap Merancang Learning Path?</h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">Diskusikan kebutuhan kompetensi organisasi Anda dan tim Skillary akan membantu menyusun alur pembelajaran yang terukur.</p>
          <Link href="/contact?type=in-house&source=learning-paths">
            <button className="inline-block text-sm font-bold px-8 py-4 rounded-full text-white hover:opacity-90 transition-opacity shadow-lg" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>Diskusikan Learning Path</button>
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
