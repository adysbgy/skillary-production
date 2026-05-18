import React from "react";
import { Container } from "@/components/ui/Container";

export function CorporatePainPointSection() {
  const painPoints = [
    "Materi tersebar di banyak file.",
    "Progress peserta sulit dipantau.",
    "Assessment masih manual.",
    "Sertifikat dibuat terpisah.",
    "Laporan peserta perlu direkap ulang.",
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] leading-tight mb-8">
            Pelatihan Sering Berjalan, tetapi Hasilnya Sulit Diukur?
          </h2>
          <div className="space-y-4 mb-10">
            {painPoints.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-1 h-5 w-5 shrink-0 rounded-full bg-[#FFF7ED] flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-[#D88A44]" />
                </div>
                <p className="text-[#475569] font-medium">{point}</p>
              </div>
            ))}
          </div>
          
          <div className="p-6 rounded-xl bg-[#FFFDF9] border-l-4 border-[#D88A44]">
            <p className="text-[#334155] font-semibold">
              Skillary menyatukan alur pelatihan dalam satu sistem: materi, assessment, sertifikat, dan laporan.
            </p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FFF7ED] to-white rounded-3xl transform rotate-3" />
          <div className="relative bg-white border border-[#E7DDD4] p-8 rounded-2xl shadow-xl">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#64748B] mb-8 text-center border-b border-[#F5F0EB] pb-4">
              Unified Training Workflow
            </h3>
            
            <div className="space-y-6">
              {[
                { num: "1", title: "Materi", desc: "Terstruktur dalam module" },
                { num: "2", title: "Assessment", desc: "Quiz & Evaluasi Online" },
                { num: "3", title: "Sertifikat", desc: "Digital & Terverifikasi" },
                { num: "4", title: "Laporan", desc: "Dashboard & Gradebook" },
              ].map((step, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-lg bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center font-bold border border-[#FED7AA]">{step.num}</div>
                    <div>
                      <p className="font-bold text-[#0F172A]">{step.title}</p>
                      <p className="text-xs text-[#64748B]">{step.desc}</p>
                    </div>
                  </div>
                  {idx < 3 && <div className="h-4 w-[2px] bg-[#E7DDD4] ml-5" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
