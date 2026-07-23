import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function LegacyPortfolioPreviewSection() {
  const sectors = [
    { label: "Perbankan", icon: "🏦" },
    { label: "Regulator", icon: "⚖️" },
    { label: "FMCG", icon: "🏭" },
    { label: "Pendidikan", icon: "🎓" },
    { label: "Pemerintahan", icon: "🏛️" },
    { label: "Korporasi", icon: "🏢" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFDF9]">
      <Container className="max-w-5xl">
        <div className="motion-fade-up text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#172554] leading-tight mb-5">
            Pengalaman Pelatihan yang Menjadi Fondasi Skillary
          </h2>
          <p className="text-lg text-[#475569] leading-relaxed">
            Sebagian arsip pengalaman pelatihan Allman telah dikurasi sebagai referensi pengembangan Skillary.
          </p>
        </div>

        {/* Sector Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-10">
          {sectors.map((sector, idx) => (
            <div key={sector.label} className={`motion-hover-lift motion-fade-up motion-delay-${(idx + 1) * 100} bg-[#FFFDF9] border border-[#E7DDD4] rounded-2xl p-5 text-center`}>
              <div className="text-2xl mb-2">{sector.icon}</div>
              <p className="text-[11px] font-bold text-[#172554]">{sector.label}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="motion-fade-up motion-delay-300 flex flex-wrap justify-center gap-3 mb-8">
          <Link href="/portofolio">
            <button className="motion-btn bg-[#172554] hover:bg-[#1E3A8A] text-white px-7 py-3.5 shadow-lg shadow-[#172554]/15 font-semibold rounded-xl text-sm">
              Lihat Portofolio
            </button>
          </Link>
          <Link href="/portofolio">
            <button className="motion-btn px-7 py-3.5 hover:bg-[#FFF8F1] font-semibold rounded-xl border border-[#E7DDD4] text-[#334155] bg-white text-sm">
              Lihat Highlight Studi Kasus
            </button>
          </Link>
        </div>

        {/* Disclaimer */}
        <p className="motion-fade-in motion-delay-500 text-center text-[10px] text-[#94A3B8] italic max-w-lg mx-auto">
          Portofolio adalah arsip pengalaman pelatihan Allman, bukan daftar &ldquo;client Skillary&rdquo;.
        </p>
      </Container>
    </section>
  );
}
