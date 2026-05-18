import React from "react";
import { Container } from "@/components/ui/Container";

export function TeamsUseCases() {
  const useCases = [
    "Onboarding karyawan baru",
    "Training kompetensi internal",
    "Workshop corporate",
    "Assessment peserta training",
    "Program sertifikasi internal",
    "Pelatihan guru & tenaga pendidik",
    "Program komunitas/yayasan",
    "Evaluasi pasca-training",
    "Training produk atau SOP internal",
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-6">
            Cocok untuk Berbagai Program Pelatihan
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {useCases.map((uc, idx) => (
            <div key={idx} className="bg-white rounded-full px-6 py-3 text-sm font-semibold text-[#334155] hover:shadow-md hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              {uc}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
