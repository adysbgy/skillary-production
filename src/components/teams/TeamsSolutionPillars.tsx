import React from "react";
import { Container } from "@/components/ui/Container";

export function TeamsSolutionPillars() {
  const pillars = [
    {
      title: "Course Terstruktur",
      desc: "Susun materi training dalam module dan lesson agar peserta mengikuti alur yang jelas.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'rgb(255, 138, 0)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Assessment Online",
      desc: "Ukur pemahaman peserta melalui quiz, evaluasi, dan import soal dari CSV.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'rgb(255, 138, 0)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Sertifikat Digital",
      desc: "Terbitkan sertifikat berdasarkan completion dan assessment sesuai ketentuan program.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'rgb(255, 138, 0)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: "Laporan Peserta",
      desc: "Pantau progress, gradebook, hasil assessment, status sertifikat, dan export data.",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'rgb(255, 138, 0)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#FFFDF9]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-4">
            Satu Sistem untuk Materi, Assessment, Sertifikat, dan Laporan
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl transition-all hover:shadow-lg hover:-translate-y-1" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl" style={{ background: 'rgb(255, 244, 232)', border: '1.5px solid rgb(255, 214, 165)' }}>
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-[#475569]">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
