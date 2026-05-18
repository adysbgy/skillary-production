import React from "react";
import { Container } from "@/components/ui/Container";

export function FeatureValueSection() {
  const features = [
    {
      title: "Course Terstruktur",
      desc: "Susun materi pelatihan dalam module dan lesson agar peserta mengikuti alur belajar yang jelas.",
      icon: (
        <svg className="w-6 h-6 text-[#D88A44]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Assessment Online",
      desc: "Ukur pemahaman peserta melalui quiz, evaluasi, dan import soal dari CSV.",
      icon: (
        <svg className="w-6 h-6 text-[#D88A44]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Sertifikat Digital",
      desc: "Terbitkan sertifikat digital dengan verification ID sebagai bukti penyelesaian program.",
      icon: (
        <svg className="w-6 h-6 text-[#D88A44]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      title: "Laporan Peserta",
      desc: "Pantau progress, gradebook, completion rate, dan export data peserta untuk evaluasi internal.",
      icon: (
        <svg className="w-6 h-6 text-[#D88A44]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <Container className="py-20 lg:py-32 bg-white border-t border-[#E7DDD4]">
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] leading-tight mb-4">
          Bukan hanya menjalankan training.<br /> Skillary membantu Anda mengukur hasilnya.
        </h2>
        <p className="text-lg text-[#475569]">
          Dari materi pembelajaran, assessment, sertifikat, hingga laporan peserta, Skillary membantu proses pelatihan menjadi lebih rapi dan mudah dievaluasi.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-[#FFF8F1] border border-[#E7DDD4] p-8 rounded-2xl transition-all hover:border-[#D88A44]/40 hover:shadow-md">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-white shadow-sm border border-[#E7DDD4]">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-3">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-[#475569]">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </Container>
  );
}
