import React from "react";
import { Container } from "@/components/ui/Container";

export function TeamsWorkflow() {
  const steps = [
    {
      title: "Diskusi Kebutuhan",
      desc: "Tim Skillary memahami target peserta, topik, durasi, dan output pelatihan.",
    },
    {
      title: "Desain Program",
      desc: "Materi, assessment, dan alur pembelajaran disusun sesuai kebutuhan organisasi.",
    },
    {
      title: "Pelaksanaan Training",
      desc: "Program dijalankan secara online, hybrid, atau sesuai format yang disepakati.",
    },
    {
      title: "Assessment & Sertifikat",
      desc: "Peserta mengikuti evaluasi dan menerima sertifikat sesuai ketentuan program.",
    },
    {
      title: "Laporan & Evaluasi",
      desc: "Organisasi menerima data progress, hasil assessment, dan laporan peserta.",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#FFFDF9]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A]">
            Alur Kerja Sama yang Jelas
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Desktop horizontal line */}
          <div className="hidden lg:block absolute top-6 left-0 right-0 h-[1.5px] z-0" style={{ background: 'rgb(240, 217, 200)' }} />

          <div className="grid lg:grid-cols-5 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10">
                <div className="h-12 w-12 rounded-full text-white flex items-center justify-center font-bold text-lg mb-6 shadow-md border-[3px] border-[#FFFDF9] mx-auto lg:mx-0" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[#0F172A] mb-2 text-center lg:text-left">{step.title}</h3>
                <p className="text-sm text-[#475569] leading-relaxed text-center lg:text-left">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
