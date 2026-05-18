import React from "react";
import { Container } from "@/components/ui/Container";

export function ExpandedTestimonialsSection() {
  const featured = [
    {
      quote: "Biasanya setelah training, data peserta masih perlu direkap dari beberapa file. Alur Skillary membantu membuat proses ini terlihat lebih rapi.",
      role: "Pengelola Program",
      tag: "Training Flow",
      initial: "PP",
    },
    {
      quote: "Bagian assessment dan gradebook cukup membantu untuk melihat siapa yang sudah selesai dan siapa yang masih perlu follow-up.",
      role: "HR/Admin Training",
      tag: "Reporting",
      initial: "HR",
    },
    {
      quote: "Sertifikat yang terhubung dengan penyelesaian materi dan assessment membuat hasil training terasa lebih jelas.",
      role: "Corporate Trainer",
      tag: "Evaluation",
      initial: "CT",
    },
  ];

  const miniQuotes = [
    { quote: "Alurnya mudah dipahami untuk kebutuhan training internal.", role: "Training Coordinator" },
    { quote: "Peserta bisa mengikuti materi secara bertahap.", role: "Peserta Program" },
    { quote: "Export laporan menjadi bagian yang paling relevan untuk dokumentasi.", role: "Program Manager" },
    { quote: "Cocok untuk program yang membutuhkan tindak lanjut setelah sesi selesai.", role: "Trainer" },
    { quote: "Lebih rapi dibandingkan hanya membagikan materi lewat file terpisah.", role: "Admin Pelatihan" },
    { quote: "Konsepnya membantu menghubungkan training, evaluasi, dan sertifikat.", role: "Pengelola Sekolah/Yayasan" },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#FFFDF9]">
      <Container>
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A]">
            Feedback dari Pengguna Awal Skillary
          </h2>
        </div>
        <p className="text-center text-[#475569] mb-16 max-w-2xl mx-auto">
          Beberapa catatan dari sesi review, demo, dan pengembangan awal terhadap alur pembelajaran Skillary.
        </p>

        {/* Featured Reviews */}
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          {featured.map((t, idx) => (
            <div key={idx} className="bg-white border border-[#E7DDD4] p-8 rounded-2xl flex flex-col justify-between shadow-sm">
              <div>
                <div className="inline-flex rounded-full bg-[#FFF7ED] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#C2410C] border border-[#FED7AA] mb-4">
                  {t.tag}
                </div>
                <p className="text-[#334155] leading-relaxed italic mb-8">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="border-t border-[#F5F0EB] pt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#FFF7ED] flex items-center justify-center text-xs font-bold text-[#C2410C]">
                  {t.initial}
                </div>
                <p className="text-sm font-bold text-[#0F172A]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mini Quote Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {miniQuotes.map((mq, idx) => (
            <div key={idx} className="bg-white border border-[#E7DDD4] rounded-xl p-5 flex items-start gap-3">
              <div className="mt-1 h-7 w-7 shrink-0 rounded-full bg-[#FFF7ED] flex items-center justify-center text-[10px] font-bold text-[#C2410C]">
                {mq.role.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-[#334155] italic leading-relaxed mb-2">&ldquo;{mq.quote}&rdquo;</p>
                <p className="text-xs font-bold text-[#64748B]">— {mq.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 space-y-1">
          <p className="text-xs text-[#94A3B8]">
            * Feedback pengguna awal dan insight dari proses pengembangan produk.
          </p>
        </div>
      </Container>
    </section>
  );
}
