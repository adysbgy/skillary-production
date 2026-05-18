import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { legacyCaseStudies } from "@/lib/legacy-portfolio";
import { CaseStudyExplorer } from "@/components/case-studies/CaseStudyExplorer";

export const metadata: Metadata = {
  title: "Studi Kasus Pengalaman Pelatihan",
  description: "Ringkasan pengalaman pelatihan terkurasi dari arsip Allman yang relevan dengan pengembangan Skillary sebagai platform pelatihan terukur.",
};

export default function CaseStudiesPage() {
  const cases = legacyCaseStudies;
  const uniqueCategories = new Set(cases.map((c) => c.category));
  const uniqueSectors = new Set(cases.map((c) => c.sector));

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFFDF9] py-20 lg:py-28" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(240,217,200,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(240,217,200,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
            Studi Kasus
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl text-[#0F172A] mb-6">
            Studi Kasus Pengalaman Pelatihan
          </h1>
          <p className="text-lg leading-relaxed text-[#475569] mb-4 max-w-3xl mx-auto">
            Ringkasan pengalaman pelatihan terkurasi dari arsip Allman yang relevan dengan pengembangan Skillary sebagai platform pelatihan terukur.
          </p>
        </Container>
      </section>

      {/* Safety Notice */}
      <section className="py-8 bg-[#FFFDF9]" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <Container className="max-w-3xl mx-auto">
          <div className="flex items-start gap-3">
            <span className="text-amber-500 text-lg shrink-0 mt-0.5">ℹ️</span>
            <p className="text-xs text-[#92400E] leading-relaxed">
              Case cards ini merupakan ringkasan pengalaman pelatihan berdasarkan dokumentasi yang tersedia, bukan laporan dampak formal. Hasil, angka capaian, atau testimoni hanya ditampilkan jika tersedia bukti dan izin publikasi.
            </p>
          </div>
        </Container>
      </section>

      {/* Summary Metrics */}
      <section className="py-14 lg:py-18 bg-white" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center p-5 bg-[#FFFDF9] rounded-2xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <p className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{cases.length}</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">Highlight Terkurasi</p>
            </div>
            <div className="text-center p-5 bg-[#FFFDF9] rounded-2xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <p className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{uniqueCategories.size}</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">Kategori Program</p>
            </div>
            <div className="text-center p-5 bg-[#FFFDF9] rounded-2xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <p className="text-3xl font-extrabold text-[#0F172A] tracking-tight">{uniqueSectors.size}</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">Sektor Industri</p>
            </div>
            <div className="text-center p-5 bg-[#FFFDF9] rounded-2xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <p className="text-sm font-extrabold text-[#0F172A] tracking-tight leading-tight">Allman<br/>Archive</p>
              <p className="text-xs text-[#64748B] mt-1 font-medium">Sumber Data</p>
            </div>
          </div>
          <p className="text-center text-[10px] text-[#94A3B8] mt-5 italic max-w-xl mx-auto">
            Dipilih dari 39+ arsip dokumentasi digital berdasarkan kelengkapan bukti, keragaman sektor, dan keragaman kategori program.
          </p>
        </Container>
      </section>

      {/* Case Study Explorer */}
      <section className="py-16 lg:py-24 bg-[#FFFDF9]">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] sm:text-3xl">
              Arsip Pengalaman Pelatihan Terkurasi
            </h2>
            <p className="text-sm text-[#64748B] mt-2 max-w-xl mx-auto">
              Setiap card merepresentasikan ringkasan pengalaman pelatihan yang terdokumentasi dalam arsip digital Allman.
            </p>
          </div>

          <CaseStudyExplorer cases={cases} />
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
            Ingin Menjalankan Program Serupa?
          </h2>
          <p className="text-lg text-[#475569] mb-10">
            Diskusikan kebutuhan pelatihan organisasi Anda atau lihat portofolio lengkap pengalaman pelatihan Allman.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="text-white font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-lg" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                Diskusikan Program Serupa
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="bg-[#FFFDF9] text-[#334155] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] transition-all text-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                Lihat Portofolio Lengkap
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
