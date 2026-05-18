import React from "react";
import { Container } from "@/components/ui/Container";

export function ProblemSection() {
  const painCards = [
    { icon: "📁", title: "Materi tersebar di banyak file" },
    { icon: "📋", title: "Daftar peserta tidak terpusat" },
    { icon: "📉", title: "Progress peserta sulit dipantau" },
    { icon: "📝", title: "Assessment tidak terdokumentasi" },
    { icon: "🏷️", title: "Sertifikat dibuat manual" },
    { icon: "📊", title: "Laporan harus direkap ulang" },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container className="max-w-5xl">
        <div className="motion-fade-up text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#172554] leading-tight mb-5">
            Training berjalan, tapi datanya sering tercecer.
          </h2>
          <p className="text-lg text-[#475569] leading-relaxed">
            Banyak organisasi sudah rutin menjalankan pelatihan, tetapi masih kesulitan memantau progress peserta, mengelola assessment, menerbitkan sertifikat, dan menyusun laporan akhir training.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {painCards.map((card, idx) => (
            <div key={idx} className={`motion-hover-lift motion-fade-up motion-delay-${(idx + 1) * 100} bg-[#FFFDF9] border border-[#E7DDD4] rounded-2xl p-5`}>
              <div className="text-xl mb-3">{card.icon}</div>
              <p className="text-sm font-semibold text-[#1F2937] leading-snug">{card.title}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
