import React from "react";
import { Container } from "@/components/ui/Container";

export function ContactCards() {
  const cards = [
    {
      title: "In-House Training",
      desc: "Pelatihan untuk satu organisasi, tim, sekolah, yayasan, atau komunitas.",
    },
    {
      title: "Assessment Program",
      desc: "Evaluasi peserta untuk kelas, batch, atau program tertentu.",
    },
    {
      title: "Managed Learning Program",
      desc: "Program pembelajaran dengan materi, assessment, sertifikat, dan laporan peserta.",
    },
    {
      title: "Platform / LMS Discussion",
      desc: "Diskusi kebutuhan platform pembelajaran internal bagi organisasi.",
    },
    {
      title: "Expert Partner Collaboration",
      desc: "Kolaborasi dengan trainer, praktisi, atau subject matter expert terpilih.",
    },
    {
      title: "General Inquiry",
      desc: "Pertanyaan umum seputar program dan layanan Skillary.",
    },
  ];

  return (
    <section className="py-16 lg:py-24" style={{ background: 'rgb(255, 251, 245)' }}>
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A]">
            Kebutuhan yang Bisa Anda Diskusikan
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-sm transition-colors hover:shadow-md" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <h3 className="font-bold text-[#0F172A] mb-2">{card.title}</h3>
              <p className="text-sm text-[#475569] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
