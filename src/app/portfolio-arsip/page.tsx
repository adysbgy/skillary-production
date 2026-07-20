import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { StartupHeader } from "@/components/v2/layout/StartupHeader";
import { StartupFooter } from "@/components/v2/marketing/StartupFooter";
import { Container } from "@/components/ui/Container";
import { legacyPortfolioMetrics, legacyServiceCatalog, legacyPortfolioCards } from "@/lib/legacy-portfolio";
import { PortfolioExplorer } from "@/components/portfolio/PortfolioExplorer";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portofolio Pelatihan & Dokumentasi Event | Skillary",
  description: "Jelajahi arsip program pelatihan lintas industri yang menjadi fondasi pengalaman Skillary, lengkap dengan dokumentasi autentik di Instagram.",
  alternates: { canonical: "/portfolio-arsip" },
};

const CATEGORY_ICONS: Record<string, string> = {
  "Infographics & Visual Communication": "🎨",
  "Data Analytics, Dashboard & Storytelling": "📊",
  "Presentation, Reporting & Business Communication": "📈",
  "Process Improvement, SOP & Quality": "⚙️",
  "AI & Digital Mindset": "🤖",
  "Leadership & Problem Solving": "🧭",
};

export default function PortfolioPage() {
  const metrics = legacyPortfolioMetrics;

  return (
    <main className={`${manrope.className} overflow-hidden bg-white`}>
      <StartupHeader />
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0D101C] pt-44 pb-24 lg:pt-52 lg:pb-32" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:48px_48px]" /><div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[850px] h-[650px] rounded-full opacity-30 blur-3xl" style={{ background: "radial-gradient(circle, rgb(255,138,0), rgb(255,90,95) 38%, transparent 70%)" }} />
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
            Portofolio Pelatihan
          </div>
          <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl text-white mb-6">
            Pengalaman Nyata di Balik <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(111deg, rgb(255,138,0), rgb(255,90,95))" }}>Skillary</span>
          </h1>
          <p className="text-lg leading-relaxed text-white/70 mb-5 max-w-3xl mx-auto">
            Dokumentasi pengalaman pelatihan Allman yang menjadi salah satu fondasi pengembangan Skillary sebagai platform pelatihan terukur untuk organisasi.
          </p>
          <p className="text-sm text-white/40 max-w-2xl mx-auto">
            Data ini menampilkan sebagian arsip digital yang berhasil dikurasi. Pengalaman Allman sejak 1998 jauh lebih luas daripada dokumentasi yang tampil di halaman ini.
          </p>
        </Container>
      </section>

      {/* Summary Metrics */}
      <section className="py-16 lg:py-20 bg-white" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-[#FFFDF9] rounded-2xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <p className="text-3xl font-extrabold text-[#0F172A] tracking-tight">1998</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">Pengalaman Sejak</p>
            </div>
            <div className="text-center p-6 bg-[#FFFDF9] rounded-2xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <p className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{metrics.unique_valid_events}+</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">Dokumentasi Terkurasi</p>
            </div>
            <div className="text-center p-6 bg-[#FFFDF9] rounded-2xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <p className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{metrics.unique_clients_detected}+</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">Organisasi dalam Arsip</p>
            </div>
            <div className="text-center p-6 bg-[#FFFDF9] rounded-2xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <p className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{Object.keys(metrics.dominant_categories).length}</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">Area Program Utama</p>
            </div>
          </div>
          <p className="text-center text-[10px] text-[#94A3B8] mt-6 italic max-w-xl mx-auto">
            * Angka dokumentasi digital merujuk pada arsip konten yang berhasil dikurasi, bukan total keseluruhan pengalaman Allman sejak 1998.
          </p>
        </Container>
      </section>

      {/* Category Overview */}
      <section className="py-16 lg:py-24 bg-[#FFFDF9]" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
              Area Program Pelatihan
            </h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-xl mx-auto">
              Distribusi area program berdasarkan arsip dokumentasi digital Allman.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {legacyServiceCatalog.map((svc, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-5 hover:shadow-md transition-shadow" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="text-lg">{CATEGORY_ICONS[svc.category] || "📋"}</span>
                  <h3 className="font-bold text-[#0F172A] text-sm leading-snug">{svc.category}</h3>
                </div>
                <p className="text-xs text-[#475569] leading-relaxed mb-3">{svc.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1px solid rgb(255, 214, 165)' }}>
                    {svc.valid_event_count} dokumentasi
                  </span>
                  <span className="text-[10px] text-[#94A3B8]">{svc.example_programs.length} program</span>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Portfolio Explorer */}
      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
              Arsip Pengalaman Pelatihan
            </h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-xl mx-auto">
              Portofolio pengalaman pelatihan Allman yang terdokumentasi dalam arsip digital.
            </p>
          </div>

          <PortfolioExplorer cards={legacyPortfolioCards} />
        </Container>
      </section>

      {/* Claim Safety Disclaimer */}
      <section className="py-10 bg-[#FFFDF9]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)', borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <Container className="max-w-3xl mx-auto text-center">
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Portofolio ini disusun dari arsip dokumentasi pelatihan Allman dan digunakan sebagai referensi pengalaman yang melatarbelakangi pengembangan Skillary. Data yang tampil merupakan dokumentasi digital terkurasi dan tidak mewakili total keseluruhan riwayat pelatihan. Penggunaan nama organisasi mengacu pada catatan dokumentasi arsip, bukan klaim kerjasama aktif atau endorsement.
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white">
        <Container className="text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-6">
            Butuh Program Serupa untuk Organisasi Anda?
          </h2>
          <p className="text-lg text-[#475569] mb-10">
            Diskusikan kebutuhan pelatihan Anda dan kami akan membantu menyusun pendekatan program yang sesuai.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="text-white font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-lg" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                Diskusikan Kebutuhan Training
              </button>
            </Link>
            <Link href="/case-studies">
              <button className="bg-[#FFFDF9] text-[#334155] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] transition-all text-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                Lihat Highlight Studi Kasus
              </button>
            </Link>
          </div>
        </Container>
      </section>
      <StartupFooter />
    </main>
  );
}
