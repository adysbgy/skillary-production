import React from "react";
import { Container } from "@/components/ui/Container";

export function TeamsCapabilities() {
  const capabilities = [
    "Course dan module builder",
    "Lesson progress tracking",
    "Quiz dan assessment online",
    "Import soal dari CSV",
    "Live assessment monitoring",
    "Gradebook peserta",
    "Sertifikat digital dengan verification ID",
    "Export laporan peserta (CSV)",
    "Dashboard instructor/admin",
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-4">
            Dilengkapi Platform Pembelajaran yang Siap Digunakan
          </h2>
          <p className="text-lg text-[#475569]">
            Fitur-fitur yang tersedia untuk mendukung proses pelatihan organisasi Anda.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-5">
              <span className="h-6 w-6 shrink-0 rounded-full bg-[#10B981]/10 flex items-center justify-center text-[#10B981] text-xs font-bold">✓</span>
              <span className="text-sm font-semibold text-[#334155]">{cap}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
