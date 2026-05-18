import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function TeamsCTA() {
  return (
    <section className="bg-[#FFFDF9] py-20 lg:py-32" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
      <Container className="text-center max-w-3xl">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-[#0F172A] mb-6">
          Diskusikan Kebutuhan Training Organisasi Anda
        </h2>
        <p className="text-xl text-[#475569] mb-4">
          Ceritakan kebutuhan pelatihan, jumlah peserta, topik, dan output yang ingin dicapai. Tim Skillary akan membantu menyusun pendekatan yang sesuai.
        </p>
        <p className="text-sm text-[#64748B] mb-10">
          Respons dalam 1–2 hari kerja.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact">
            <button className="text-white font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-lg" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
              Jadwalkan Diskusi
            </button>
          </Link>
          <Link href="/contact">
            <button className="bg-[#FFFDF9] text-[#334155] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] transition-all text-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              Minta Proposal
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
