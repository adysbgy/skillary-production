import React from "react";
import { Container } from "@/components/ui/Container";

export function SolutionPillarsSection() {
  const pillars = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      title: "Materi Terstruktur",
      desc: "Program dan materi lebih mudah disusun untuk kebutuhan organisasi.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Assessment",
      desc: "Evaluasi peserta terdokumentasi dalam alur pelatihan.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      title: "Sertifikat Digital",
      desc: "Sertifikat dapat diterbitkan berdasarkan penyelesaian program.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: "Laporan Peserta",
      desc: "HR/L&D dapat melihat progress, status, dan kebutuhan follow-up.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF3EA] border-y border-[#E7DDD4]">
      <Container className="max-w-5xl">
        <div className="motion-fade-up text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#172554] leading-tight mb-5">
            Skillary mengubah training menjadi sistem yang bisa dikelola.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pillars.map((pillar, idx) => (
            <div key={idx} className={`motion-hover-lift motion-fade-up motion-delay-${(idx + 1) * 100} bg-white border border-[#E7DDD4] rounded-2xl p-6`}>
              <div className="h-12 w-12 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#D88A44] mb-5">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-[#172554] mb-2">{pillar.title}</h3>
              <p className="text-sm text-[#6B625A] leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
