import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Layanan Skillary | Corporate Training Solutions",
  description: "Format kerja sama yang dapat disesuaikan dengan kebutuhan pelatihan organisasi.",
};

export default function ServicesPage() {
  const services = [
    {
      title: "In-House Training",
      desc: "Pelatihan untuk organisasi, tim, sekolah, yayasan, komunitas, atau unit kerja tertentu.",
      solves: "Meningkatkan skill spesifik untuk kelompok kerja dengan konteks internal yang relevan.",
      suitable: "Tim corporate, kelompok guru, staf yayasan.",
      output: "Peningkatan pemahaman, diskusi studi kasus internal.",
    },
    {
      title: "Assessment Program",
      desc: "Evaluasi peserta untuk kelas, batch, program internal, atau pelatihan tertentu.",
      solves: "Mengukur tingkat pemahaman peserta sebelum atau sesudah sebuah program berjalan.",
      suitable: "Program sertifikasi internal, evaluasi pasca-training.",
      output: "Skor peserta, laporan gradebook, sertifikat kelulusan.",
    },
    {
      title: "Managed Learning Program",
      desc: "Program pembelajaran yang dilengkapi materi, assessment, sertifikat, dan laporan peserta.",
      solves: "Kebutuhan menjalankan pelatihan end-to-end tanpa harus membangun sistem sendiri.",
      suitable: "Organisasi yang membutuhkan pelatihan dengan laporan akhir yang rapi.",
      output: "Akses materi digital, monitoring progress, laporan komprehensif.",
    },
    {
      title: "Platform / LMS Discussion",
      desc: "Diskusi kebutuhan platform pembelajaran internal bagi organisasi.",
      solves: "Kebutuhan infrastruktur teknologi untuk menampung program pelatihan mandiri.",
      suitable: "Perusahaan skala menengah-besar, institusi pendidikan.",
      output: "Setup environment pembelajaran, integrasi dengan program yang ada.",
    },
  ];

  return (
    <>
      <div className="bg-[#FFFDF9] min-h-screen pt-24 pb-32">
        {/* Hero Section */}
        <section className="pt-10 pb-20" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-3xl text-center">
            <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
              Solusi Organisasi
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#181818] mb-6">
              Layanan Skillary
            </h1>
            <p className="text-xl text-[#181818] font-semibold mb-6">
              Format kerja sama yang dapat disesuaikan dengan kebutuhan pelatihan organisasi.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
              <Link href="/proposal">
                <button className="text-white px-7 py-3.5 shadow-lg font-semibold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  Minta Proposal
                </button>
              </Link>
              <Link href="/contact">
                <button className="px-7 py-3.5 font-semibold rounded-full bg-white text-[#334155] hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  Diskusi Kebutuhan
                </button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Services List */}
        <section className="py-20">
          <Container className="max-w-5xl">
            <div className="grid gap-8 md:grid-cols-2">
              {services.map((service, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm flex flex-col" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  <h3 className="text-2xl font-bold text-[#181818] mb-3">{service.title}</h3>
                  <p className="text-black/60 text-sm leading-relaxed mb-8">{service.desc}</p>

                  <div className="space-y-4 mb-10 flex-1">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/45 block mb-1">Membantu Solusi</span>
                      <p className="text-[#181818] text-sm font-medium">{service.solves}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/45 block mb-1">Cocok Untuk</span>
                      <p className="text-[#181818] text-sm font-medium">{service.suitable}</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-black/45 block mb-1">Target Output</span>
                      <p className="text-[#181818] text-sm font-medium">{service.output}</p>
                    </div>
                  </div>

                  <div className="pt-6" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
                    <Link href="/contact" className="text-sm font-bold inline-flex items-center gap-1 hover:underline transition-all" style={{ color: 'rgb(255, 138, 0)' }}>
                      Diskusikan Layanan Ini <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Bottom */}
        <section className="py-16 text-center" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-[#181818] mb-6">Mulai Diskusikan Kebutuhan Organisasi Anda</h2>
            <p className="text-lg text-black/60 mb-10">Tim Skillary siap membantu menyusun format kerja sama yang paling sesuai.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact">
                <button className="text-white px-8 py-4 shadow-lg font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  Diskusikan Kebutuhan
                </button>
              </Link>
              <Link href="/proposal">
                <button className="bg-white text-[#334155] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  Minta Proposal
                </button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
