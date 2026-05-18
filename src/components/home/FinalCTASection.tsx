import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function FinalCTASection() {
  return (
    <section className="py-20 lg:py-28 bg-[#172554] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[500px] h-[500px] bg-[#D88A44] opacity-[0.08] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-white opacity-[0.04] rounded-full blur-[80px] pointer-events-none" />

      <Container className="max-w-3xl text-center relative z-10">
        <h2 className="motion-fade-up text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl text-white leading-tight mb-6">
          Siapkan Training Organisasi yang Lebih Terukur
        </h2>
        <p className="motion-fade-up motion-delay-100 text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
          Ceritakan kebutuhan training Anda. Skillary dapat membantu menyiapkan alur program, peserta, assessment, sertifikat, dan laporan yang lebih mudah dipantau.
        </p>

        <div className="motion-fade-up motion-delay-200 flex flex-wrap justify-center gap-4">
          <Link href="/contact">
            <button className="motion-btn bg-white text-[#172554] font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-[#FFF8F1] text-sm">
              Diskusikan Kebutuhan
            </button>
          </Link>
          <Link href="/proposal">
            <button className="motion-btn px-8 py-4 font-bold rounded-xl border border-white/20 text-white hover:bg-white/10 text-sm">
              Minta Proposal
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
