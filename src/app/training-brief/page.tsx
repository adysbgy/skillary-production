import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Brief Kebutuhan Training | Skillary",
  description: "Panduan menyiapkan informasi awal sebelum berdiskusi dengan tim Skillary mengenai program pelatihan organisasi Anda.",
};

export default function TrainingBriefPage() {
  const checklist = [
    "Nama organisasi",
    "Jumlah peserta",
    "Profil peserta",
    "Topik pelatihan",
    "Target output",
    "Durasi",
    "Format: online/offline/hybrid",
    "Kebutuhan assessment",
    "Kebutuhan sertifikat",
    "Kebutuhan laporan",
    "Target waktu pelaksanaan",
    "Catatan khusus",
  ];

  return (
    <>
      <div className="bg-[#FFFDF9] min-h-screen pt-24 pb-32">
        {/* Hero Section */}
        <section className="pt-10 pb-20" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#0F172A] mb-6">
              Brief Kebutuhan Training
            </h1>
            <p className="text-xl text-[#475569] leading-relaxed mb-10">
              Panduan menyiapkan informasi awal sebelum berdiskusi dengan tim Skillary.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <button className="text-white px-7 py-3.5 shadow-lg font-semibold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  Isi Form Diskusi
                </button>
              </Link>
              <Link href="/proposal">
                <button className="px-7 py-3.5 font-semibold rounded-full bg-white text-[#334155] hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  Diskusikan Kebutuhan Training
                </button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Content Sections */}
        <section className="py-20">
          <Container className="max-w-4xl">
            <div className="grid gap-16 md:grid-cols-2">
              
              {/* Left Column */}
              <div>
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-4">
                    Mengapa Menyiapkan Brief?
                  </h2>
                  <p className="text-[#475569] leading-relaxed">
                    Brief yang jelas membantu kami memahami konteks spesifik dari kebutuhan organisasi Anda. Hal ini memastikan solusi pembelajaran, platform, maupun expert partner yang kami sarankan sangat relevan dengan target output pelatihan Anda.
                  </p>
                </div>

                {/* Add Mockup Image Here */}
                <div className="mb-12 rounded-3xl overflow-hidden shadow-xl border-4 border-white transform -rotate-1 hidden md:block">
                  <Image src="/images/resource-template.png" alt="Training Brief Template Mockup" width={600} height={400} className="w-full h-[280px] object-cover" />
                </div>

                <div className="bg-[#FFFDF9] p-8 rounded-2xl shadow-sm relative" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  <div className="absolute top-0 right-0 -mt-3 -mr-3 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-sm" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                    Contoh Brief
                  </div>
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#64748B] mb-4">
                    Format Paragraf
                  </h3>
                  <p className="text-[#0F172A] italic leading-relaxed text-lg border-l-4 pl-5 py-2" style={{ borderColor: 'rgb(255, 138, 0)' }}>
                    &ldquo;Kami membutuhkan pelatihan Power BI untuk 30 peserta level pemula-menengah, durasi 2 hari, dengan assessment akhir, sertifikat digital, dan laporan progress peserta.&rdquo;
                  </p>
                </div>
              </div>

              {/* Right Column: Checklist */}
              <div>
                <div className="bg-white p-8 rounded-3xl shadow-sm" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6">
                    Checklist Kebutuhan
                  </h2>
                  <ul className="space-y-4">
                    {checklist.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1 h-5 w-5 shrink-0 rounded-full flex items-center justify-center" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[#334155] font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* Next Step */}
        <section className="py-12 bg-[#FFFDF9]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)', borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-3xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[#0F172A] mb-4">
              Langkah Selanjutnya
            </h2>
            <p className="text-[#475569] mb-8">
              Jika Anda sudah memiliki gambaran awal, jadwalkan diskusi bersama kami untuk menyusun program pelatihan yang tepat bagi organisasi Anda.
            </p>
            <Link href="/contact">
              <button className="text-white px-8 py-3.5 shadow-md transition-all font-bold rounded-full hover:-translate-y-0.5 hover:opacity-90" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                Mulai Diskusi
              </button>
            </Link>
          </Container>
        </section>
      </div>
    </>
  );
}
