import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function ProgramAreasSection() {
  const programs = [
    {
      title: "Data Analytics, Dashboard & Storytelling",
      desc: "Membantu tim mengolah data menjadi insight yang mudah dipahami dan ditindaklanjuti.",
    },
    {
      title: "Infographics & Visual Communication",
      desc: "Menyusun informasi kompleks menjadi visual yang menarik dan mudah dicerna.",
    },
    {
      title: "Presentation, Reporting & Business Communication",
      desc: "Meningkatkan kemampuan menyampaikan laporan dan presentasi secara profesional.",
    },
    {
      title: "AI & Digital Mindset",
      desc: "Memperkenalkan pola pikir digital dan pemanfaatan AI untuk produktivitas kerja.",
    },
    {
      title: "Process Improvement, SOP & Quality",
      desc: "Menyusun proses kerja yang lebih efisien melalui standarisasi dan perbaikan berkelanjutan.",
    },
    {
      title: "Leadership & Problem Solving",
      desc: "Mengembangkan kemampuan memimpin tim dan menyelesaikan masalah secara sistematis.",
    },
  ];

  const outputTags = ["Assessment", "Sertifikat", "Report"];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <Container className="max-w-5xl">
        <div className="motion-fade-up text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#172554] leading-tight mb-5">
            Area Program yang Bisa Dikembangkan
          </h2>
          <p className="text-lg text-[#475569] leading-relaxed">
            Skillary dapat digunakan untuk mengelola berbagai program pelatihan internal, terutama area yang berangkat dari pengalaman Allman.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {programs.map((prog, idx) => (
            <div key={idx} className={`motion-hover-lift motion-fade-up motion-delay-${(idx + 1) * 100} bg-white border border-[#E7DDD4] rounded-2xl p-6 flex flex-col`}>
              <div className="h-8 w-8 rounded-lg bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#D88A44] font-bold text-sm mb-4">
                {idx + 1}
              </div>
              <h3 className="text-sm font-bold text-[#172554] mb-2 leading-snug">{prog.title}</h3>
              <p className="text-xs text-[#6B625A] leading-relaxed flex-1">{prog.desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[#E7DDD4]">
                {outputTags.map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold text-[#C2410C] bg-[#FFF7ED] border border-[#FED7AA] px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="motion-fade-up motion-delay-300 text-center">
          <Link href="/program-catalog">
            <button className="motion-btn bg-[#172554] hover:bg-[#1E3A8A] text-white px-7 py-3.5 shadow-lg shadow-[#172554]/15 font-semibold rounded-xl text-sm">
              Lihat Area Program
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
