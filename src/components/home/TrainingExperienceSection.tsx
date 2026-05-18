import React from "react";
import { Container } from "@/components/ui/Container";

export function TrainingExperienceSection() {
  const experiences = [
    {
      title: "Data & Digital Productivity",
      desc: "Excel, Power BI, data-driven decision making, dan produktivitas kerja berbasis teknologi.",
    },
    {
      title: "Leadership & Communication",
      desc: "Komunikasi profesional, presentasi, pelayanan, leadership, dan kolaborasi tim.",
    },
    {
      title: "Risk, Audit & Compliance",
      desc: "Pelatihan risk management, audit, investigasi, dan tata kelola proses.",
    },
    {
      title: "Education & Teacher Development",
      desc: "Program pengembangan guru, sekolah, yayasan, dan pembelajaran berbasis teknologi.",
    },
    {
      title: "AI & Future Skills",
      desc: "Pemanfaatan AI untuk produktivitas, pembelajaran, konten, dan pekerjaan modern.",
    },
    {
      title: "Business Presentation",
      desc: "Penguatan presentasi, storytelling, visualisasi informasi, dan komunikasi bisnis.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFDF9] border-t border-[#E7DDD4]">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex rounded-full bg-[#FFF7ED] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#C2410C] border border-[#FED7AA] mb-4">
            Area Pembelajaran
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-4">
            Pengalaman Lintas Kebutuhan Pelatihan
          </h2>
          <p className="text-[#475569] text-lg">
            Skillary dikembangkan dari pengalaman menangani beragam kebutuhan pembelajaran organisasi, mulai dari produktivitas digital, data, komunikasi, leadership, hingga pengembangan kompetensi profesional.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, idx) => (
            <div key={idx} className="bg-white border border-[#E7DDD4] rounded-2xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-2 w-2 rounded-full bg-[#C2410C]" />
                <h3 className="font-bold text-[#0F172A]">{exp.title}</h3>
              </div>
              <p className="text-sm text-[#475569] leading-relaxed pl-5">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-[#64748B] italic">
            * Topik dan materi dapat disesuaikan berdasarkan kebutuhan, durasi, dan karakter peserta.
          </p>
        </div>
      </Container>
    </section>
  );
}
