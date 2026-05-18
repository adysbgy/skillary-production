import React from "react";
import { Container } from "@/components/ui/Container";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote: "Skillary membantu proses pelatihan menjadi lebih rapi karena materi, assessment, dan sertifikat peserta berada dalam satu alur.",
      role: "Training Coordinator",
    },
    {
      quote: "Fitur laporan membantu kami melihat peserta yang sudah menyelesaikan program dan peserta yang masih perlu follow-up.",
      role: "HR Learning",
    },
    {
      quote: "Untuk program in-house, dashboard assessment dan export data sangat membantu proses evaluasi kinerja tim.",
      role: "Program Manager",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A]">
            Dipercaya untuk Membantu Pembelajaran Lebih Terukur
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-[#FFF8F1] border border-[#E7DDD4] p-8 rounded-2xl flex flex-col justify-between">
              <p className="text-[#334155] leading-relaxed italic mb-8">
                "{t.quote}"
              </p>
              <div className="border-t border-[#E7DDD4] pt-4">
                <p className="text-sm font-bold text-[#1E3A8A]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-center mt-10 text-xs text-[#94A3B8]">
          * Feedback pengguna awal
        </p>
      </Container>
    </section>
  );
}
