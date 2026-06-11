import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function CorporateCTA() {
  return (
    <section className="bg-[#FFFDF9] py-20 lg:py-32 border-t border-[#E7DDD4]">
      <Container className="text-center max-w-3xl">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#0F172A] mb-6">
          Siap Menjalankan Training yang Lebih Terukur?
        </h2>
        <p className="text-xl text-[#475569] mb-10">
          Diskusikan kebutuhan pelatihan organisasi Anda bersama Skillary.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact">
            <button className="bg-[#1E3A8A] text-white font-bold px-8 py-4 rounded-lg shadow-lg hover:bg-[#1E3A8A]/90 hover:-translate-y-0.5 transition-all text-lg">
              Jadwalkan Diskusi
            </button>
          </Link>
          <Link href="/proposal">
            <button className="bg-white border-2 border-[#E7DDD4] text-[#334155] font-bold px-8 py-4 rounded-lg shadow-sm hover:bg-[#FFF8F1] transition-all text-lg">
              Diskusikan Kebutuhan Training
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
