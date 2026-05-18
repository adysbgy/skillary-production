import React from "react";
import { Container } from "@/components/ui/Container";

export function LegacyTrustStrip() {
  const items = [
    { metric: "Sejak 1998", desc: "Pengalaman pelatihan Allman" },
    { metric: "39+ arsip digital", desc: "Dokumentasi pelatihan terkurasi" },
    { metric: "6 area program", desc: "Data, visual, presentasi, AI, proses, leadership" },
    { metric: "Batch–Report–Sertifikat", desc: "Dalam satu alur digital" },
  ];

  return (
    <section className="border-y border-[#E7DDD4] bg-[#FAF3EA] py-8">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {items.map((item, idx) => (
            <div key={idx} className="text-center lg:border-r last:border-r-0 border-[#E7DDD4] px-2">
              <p className="text-sm font-bold text-[#172554] tracking-tight">{item.metric}</p>
              <p className="text-[11px] text-[#6B625A] mt-1 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-[10px] text-[#94A3B8] mt-6 italic">
          Dokumentasi digital adalah arsip terkurasi, bukan total keseluruhan pengalaman Allman sejak 1998.
        </p>
      </Container>
    </section>
  );
}
