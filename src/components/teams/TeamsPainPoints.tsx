import React from "react";
import { Container } from "@/components/ui/Container";

export function TeamsPainPoints() {
  const painPoints = [
    "Materi pelatihan tersebar di banyak file dan platform.",
    "Progress peserta sulit dipantau.",
    "Assessment masih manual dan tidak terintegrasi.",
    "Sertifikat dibuat terpisah dari proses pembelajaran.",
    "Laporan peserta perlu direkap ulang setelah training selesai.",
    "Tim sulit melihat siapa yang sudah selesai dan siapa yang perlu follow-up.",
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container className="max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] leading-tight mb-10 text-center">
          Masalah yang Sering Terjadi dalam Pelatihan Internal
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-12">
          {painPoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl p-5">
              <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full bg-[#FEE2E2] flex items-center justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-[#EF4444]" />
              </div>
              <p className="text-[#334155] font-medium text-sm leading-relaxed">{point}</p>
            </div>
          ))}
        </div>

        <div className="p-6 rounded-xl border-l-4 text-center" style={{ background: 'rgb(255, 244, 232)', borderColor: 'rgb(255, 138, 0)' }}>
          <p className="text-[#334155] font-semibold">
            Skillary membantu menyatukan proses tersebut dalam satu alur pelatihan yang lebih rapi dan terukur.
          </p>
        </div>
      </Container>
    </section>
  );
}
