import React from "react";
import { Container } from "@/components/ui/Container";

const ICON_MAP: Record<string, React.ReactNode> = {
  "In-House Training": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  "Assessment Program": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  "Managed Learning Program": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  "Platform / LMS Discussion": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  "Expert Partner Collaboration": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  "General Inquiry": (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

export function ContactCards() {
  const cards = [
    {
      title: "In-House Training",
      desc: "Latih tim internal dengan materi yang disesuaikan dengan kebutuhan organisasi.",
    },
    {
      title: "Assessment Program",
      desc: "Ukur kemampuan peserta sebelum dan sesudah pelatihan dengan hasil yang terdokumentasi.",
    },
    {
      title: "Managed Learning Program",
      desc: "Kelola materi, peserta, progress, sertifikat, dan laporan dalam satu alur.",
    },
    {
      title: "Platform / LMS Discussion",
      desc: "Diskusikan kebutuhan ruang belajar digital untuk organisasi Anda.",
    },
    {
      title: "Expert Partner Collaboration",
      desc: "Kolaborasi dengan trainer, praktisi, atau subject matter expert sesuai bidang.",
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
          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-3">
            Pilih Kebutuhan Training Anda
          </h2>
          <p className="text-base text-[#475569] max-w-xl mx-auto">
            Pilih solusi yang paling dekat dengan kondisi tim atau organisasi Anda. Kami siap diskusikan lebih lanjut.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 group"
              style={{ border: '1.5px solid rgb(240, 217, 200)' }}
            >
              <div
                className="h-11 w-11 rounded-xl flex items-center justify-center mb-4 transition-colors"
                style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}
              >
                {ICON_MAP[card.title]}
              </div>
              <h3 className="font-bold text-[#0F172A] mb-2">{card.title}</h3>
              <p className="text-sm text-[#475569] leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
