import React from "react";
import { Container } from "@/components/ui/Container";

export function UseCasesSection() {
  const useCases = [
    { title: "Onboarding karyawan baru" },
    { title: "Training kompetensi internal" },
    { title: "Assessment peserta pelatihan" },
    { title: "Program sertifikasi internal" },
    { title: "Pelatihan guru & tenaga pendidik" },
    { title: "Workshop corporate" },
    { title: "Evaluasi pasca-training" },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#FAF3EA]">
      <Container>
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-6">
            Cocok untuk Berbagai Kebutuhan Training
          </h2>
          <p className="text-lg text-[#475569]">
            Skillary dapat digunakan untuk berbagai kebutuhan pembelajaran organisasi, mulai dari pelatihan singkat hingga program internal yang membutuhkan assessment dan sertifikat.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {useCases.map((uc, idx) => (
            <div key={idx} className="bg-white border border-[#E7DDD4] rounded-full px-6 py-3 shadow-sm text-sm font-semibold text-[#334155] hover:border-[#D88A44] hover:text-[#C2410C] transition-colors">
              {uc.title}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
