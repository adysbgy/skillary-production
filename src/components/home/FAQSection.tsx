import React from "react";
import { Container } from "@/components/ui/Container";

export function FAQSection() {
  const faqs = [
    {
      q: "Apakah Skillary cocok untuk training internal perusahaan?",
      a: "Ya, platform kami dirancang untuk mendukung pelatihan internal dengan fitur module terstruktur, penilaian online, dan pelaporan.",
    },
    {
      q: "Apakah peserta bisa mengerjakan assessment?",
      a: "Tentu. Anda dapat menyusun quiz pilihan ganda maupun evaluasi lain untuk mengukur tingkat pemahaman peserta setelah mengikuti materi.",
    },
    {
      q: "Apakah Skillary menyediakan sertifikat digital?",
      a: "Ya, sertifikat digital dapat diterbitkan secara otomatis bagi peserta yang memenuhi kriteria kelulusan (menyelesaikan materi dan lulus assessment).",
    },
    {
      q: "Apakah hasil peserta bisa diekspor?",
      a: "Sangat bisa. Anda dapat mengunduh laporan nilai (gradebook) dan data penyelesaian peserta dalam format CSV untuk kebutuhan dokumentasi HR/L&D.",
    },
    {
      q: "Apakah Skillary bisa digunakan untuk in-house training satu kelas atau satu batch?",
      a: "Ya, Skillary sangat fleksibel. Anda dapat menggunakannya untuk onboarding rutin, maupun pelatihan batch tertentu.",
    },
    {
      q: "Apakah Skillary juga menyediakan program untuk peserta individual?",
      a: "Ya, kami memiliki program pembelajaran pilihan yang disusun oleh expert partner kami bagi individu yang ingin meningkatkan kompetensi spesifik.",
    },
    {
      q: "Bagaimana Skillary memilih trainer atau expert partner?",
      a: "Setiap subject matter expert melalui tahap seleksi dan kurasi untuk memastikan kualitas penyampaian materi sesuai standar industri.",
    },
    {
      q: "Apakah Skillary bisa disesuaikan dengan kebutuhan organisasi?",
      a: "Dapat didiskusikan sesuai kebutuhan program. Silakan hubungi tim kami untuk konsultasi lebih lanjut.",
    },
  ];

  return (
    <Container className="py-20 lg:py-32 max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A]">
          Pertanyaan Seputar Platform
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group rounded-xl border border-[#E7DDD4] bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between font-bold text-lg text-[#0F172A]">
              {faq.q}
              <span className="ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFF8F1] text-[#D88A44] group-open:rotate-180 transition-transform">
                ↓
              </span>
            </summary>
            <p className="mt-4 text-[#475569] leading-relaxed pr-8">
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </Container>
  );
}
