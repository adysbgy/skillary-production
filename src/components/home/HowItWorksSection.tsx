import React from "react";
import { Container } from "@/components/ui/Container";

export function HowItWorksSection() {
  const steps = [
    {
      title: "Susun Program",
      desc: "Materi dibagi menjadi module dan lesson agar peserta mengikuti alur belajar yang jelas.",
    },
    {
      title: "Jalankan Assessment",
      desc: "Peserta mengerjakan quiz atau evaluasi sesuai ketentuan program.",
    },
    {
      title: "Pantau Progress",
      desc: "Tim dapat melihat peserta yang sudah mulai, selesai, atau perlu follow-up.",
    },
    {
      title: "Terbitkan Sertifikat",
      desc: "Peserta yang memenuhi ketentuan dapat menerima sertifikat digital.",
    },
    {
      title: "Unduh Laporan",
      desc: "Data progress dan hasil assessment dapat digunakan untuk evaluasi internal.",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#FFFDF9]">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A]">
            Alur Pelatihan yang Lebih Rapi
          </h2>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Desktop Timeline Line */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-0.5 bg-[#E7DDD4] z-0" />
          
          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="h-12 w-12 rounded-full bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-lg mb-6 shadow-md border-4 border-[#FFFDF9]">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2">{step.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
