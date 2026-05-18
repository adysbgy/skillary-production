import React from "react";
import { Container } from "@/components/ui/Container";

export function LeadMagnetSection() {
  return (
    <Container className="py-20 lg:py-32">
      <div className="flex flex-col md:flex-row items-center gap-10 bg-[#1E3A8A] rounded-2xl p-10 lg:p-16 relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-white opacity-10 rounded-full blur-[80px]" />

        <div className="flex-1 relative z-10">
          <div className="mb-4 inline-flex items-center justify-center h-12 w-12 rounded-xl bg-white/10 border border-white/20">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
            Template Assessment untuk Pelatihan
          </h2>
          <p className="text-[#CBD5E1] leading-relaxed max-w-xl text-lg">
            Siapkan soal assessment di Excel, lalu gunakan format CSV untuk mempercepat penyusunan evaluasi peserta ke dalam sistem Skillary.
          </p>
        </div>
        <div className="flex-shrink-0 w-full md:w-auto relative z-10">
          <a href="/templates/quiz-template.csv" download>
            <button className="w-full px-8 py-4 bg-white text-[#1E3A8A] font-bold rounded-lg shadow-lg hover:-translate-y-0.5 transition-transform">
              Download Template Assessment
            </button>
          </a>
        </div>
      </div>
    </Container>
  );
}
