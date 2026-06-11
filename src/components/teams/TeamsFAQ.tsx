import React from "react";
import { Container } from "@/components/ui/Container";

export function TeamsFAQ() {
  const faqs = [
    {
      q: "Apakah Skillary bisa digunakan untuk training internal perusahaan?",
      a: "Ya. Skillary dirancang untuk mendukung pelatihan internal dengan materi terstruktur, penilaian online, sertifikat digital, dan pelaporan peserta.",
    },
    {
      q: "Apakah Skillary cocok untuk satu kelas atau satu batch peserta?",
      a: "Ya. Anda dapat menjalankan program untuk batch tertentu, kelas onboarding, maupun training rutin dengan peserta yang berbeda-beda.",
    },
    {
      q: "Apakah peserta bisa mengerjakan assessment?",
      a: "Tentu. Anda dapat menyusun quiz pilihan ganda atau evaluasi lainnya untuk mengukur pemahaman peserta setelah mengikuti materi.",
    },
    {
      q: "Apakah laporan peserta bisa diekspor?",
      a: "Ya. Data gradebook, progress, dan hasil assessment dapat diunduh dalam format CSV untuk kebutuhan dokumentasi HR/L&D.",
    },
    {
      q: "Apakah peserta mendapatkan sertifikat?",
      a: "Ya. Sertifikat digital dapat diterbitkan secara otomatis bagi peserta yang memenuhi kriteria kelulusan program.",
    },
    {
      q: "Apakah pelatihan bisa disesuaikan dengan kebutuhan organisasi?",
      a: "Dapat didiskusikan sesuai kebutuhan program. Silakan hubungi tim kami untuk konsultasi lebih lanjut.",
    },
    {
      q: "Apakah Skillary menyediakan trainer?",
      a: "Skillary bekerja sama dengan expert partner terpilih. Untuk program yang membutuhkan trainer, kebutuhan ini dapat didiskusikan bersama tim kami.",
    },
    {
      q: "Bagaimana cara meminta proposal?",
      a: "Anda dapat menghubungi tim kami melalui halaman kontak atau klik tombol 'Diskusikan Kebutuhan Training' di halaman ini. Tim kami akan merespons dalam 1–2 hari kerja.",
    },
  ];

  return (
    <Container className="py-20 lg:py-32 max-w-3xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A]">
          Pertanyaan Seputar Kerja Sama
        </h2>
      </div>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <details
            key={idx}
            className="group rounded-xl bg-white p-6 shadow-sm [&_summary::-webkit-details-marker]:hidden"
            style={{ border: '1.5px solid rgb(240, 217, 200)' }}
          >
            <summary className="flex cursor-pointer items-center justify-between font-bold text-lg text-[#0F172A]">
              {faq.q}
              <span className="ml-6 flex h-7 w-7 shrink-0 items-center justify-center rounded-full group-open:rotate-180 transition-transform" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>
                ↓
              </span>
            </summary>
            <p className="mt-4 text-[#475569] leading-relaxed pr-8">{faq.a}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
