import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function ExpertPartnerSection() {
  return (
    <section className="py-20 lg:py-32 bg-[#FAF3EA] border-y border-[#E7DDD4]">
      <Container className="max-w-4xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-6">
          Kolaborasi dengan Expert Terpilih
        </h2>
        <p className="text-lg text-[#475569] leading-relaxed mb-4">
          Skillary bekerja sama dengan trainer, praktisi, dan subject matter expert terpilih untuk menghadirkan program pembelajaran yang relevan, terstruktur, dan berkualitas.
        </p>
        <p className="text-sm font-medium text-[#64748B] mb-10">
          Setiap calon partner melalui proses kurasi agar kualitas program tetap terjaga.
        </p>
        
        <Link href="/contact?type=expert">
          <button className="bg-white border-2 border-[#172554] text-[#172554] font-bold px-8 py-3.5 rounded-lg shadow-sm hover:bg-[#FFF8F1] transition-all">
            Ajukan Kolaborasi Expert
          </button>
        </Link>
      </Container>
    </section>
  );
}
