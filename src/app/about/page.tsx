import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { legacyTimeline, trainingProgramAreas } from "@/lib/brand-proof-content";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang Skillary",
  description: "Kenali Skillary sebagai wajah digital baru dari pengalaman pelatihan sejak 1998 untuk pembelajaran organisasi yang lebih terstruktur dan mudah dievaluasi.",
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 lg:py-28" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(240,217,200,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(240,217,200,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-30" style={{ background: 'rgb(255, 138, 0, 0.12)' }} />
        <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full blur-3xl opacity-20" style={{ background: 'rgb(255, 90, 95, 0.10)' }} />
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
            Tentang Skillary
          </div>
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl mb-8" style={{ color: '#0F172A' }}>
            Wajah Digital Baru dari Pengalaman Pelatihan Sejak 1998
          </h1>
          <p className="text-xl leading-relaxed" style={{ color: '#475569' }}>
            Skillary adalah wujud platform modern dari pengalaman panjang di dunia pelatihan, hadir untuk membantu organisasi menjalankan pembelajaran yang lebih rapi, terukur, dan mudah dievaluasi.
          </p>
        </Container>
      </section>

      {/* Rebrand Story */}
      <section className="py-20 lg:py-28 bg-white">
        <Container className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6" style={{ color: '#0F172A' }}>
            Dari Allman ke <span className="gradient-text">Skillary</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#334155' }}>
            Skillary lahir dari pengalaman panjang Allman dalam mendampingi pelatihan korporat sejak 1998. Selama perjalanan tersebut, Allman telah terlibat dalam ratusan sesi pembelajaran di berbagai organisasi. Setelah bertahun-tahun mendampingi berbagai kebutuhan pembelajaran, kami melihat bahwa organisasi membutuhkan pelatihan yang dapat dipantau, diukur, dan dilaporkan dengan lebih rapi. Itulah mengapa Skillary dikembangkan—sebagai fondasi digital untuk menyatukan materi, assessment, sertifikat, dan laporan dalam satu alur yang terintegrasi.
          </p>
        </Container>
      </section>

      {/* Legacy Timeline */}
      <section className="py-20 lg:py-28" style={{ background: 'rgb(255, 251, 245)', borderTop: '1.5px solid rgb(240, 217, 200)', borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#0F172A' }}>
              Perjalanan Kami
            </h2>
          </div>
          <div className="max-w-5xl mx-auto grid gap-8 md:grid-cols-5">
            {legacyTimeline.map((item, idx) => (
              <div key={idx} className="relative bg-white p-6 rounded-2xl shadow-sm text-center" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold rounded-full" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
                  {item.period}
                </div>
                <h3 className="mt-4 text-lg font-bold mb-2" style={{ color: '#0F172A' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What Skillary Helps With */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#0F172A' }}>
              Membantu Proses Pelatihan Anda
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              "Materi Pembelajaran",
              "Assessment & Evaluasi",
              "Sertifikat Digital",
              "Laporan Peserta",
              "Progress Tracking",
              "Dokumentasi Pelatihan",
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-white" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="h-2 w-2 rounded-full flex-shrink-0" style={{ background: 'rgb(255, 138, 0)' }} />
                <span className="font-semibold" style={{ color: '#334155' }}>{feature}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Program Areas */}
      <section className="py-20 lg:py-28" style={{ background: 'rgb(255, 251, 245)', borderTop: '1.5px solid rgb(240, 217, 200)' }}>
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#0F172A' }}>
              Area Pengembangan Program
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {trainingProgramAreas.map((area, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl hover:shadow-md transition-shadow" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <h3 className="font-bold mb-2" style={{ color: '#0F172A' }}>{area.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#475569' }}>{area.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0) 0%, rgb(255, 90, 95) 55%, rgb(236, 72, 153) 100%)' }}>
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none" />
        <Container className="relative text-center max-w-3xl">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl text-white mb-6">
            Siap Menjalankan Training yang Lebih Terukur?
          </h2>
          <p className="text-xl text-orange-100 mb-10">
            Diskusikan kebutuhan pelatihan organisasi Anda bersama Skillary.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="bg-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-all text-lg" style={{ color: 'rgb(255, 90, 95)' }}>
                Jadwalkan Diskusi
              </button>
            </Link>
            <Link href="/proposal">
              <button className="bg-white/20 text-white border border-white/30 font-bold px-8 py-4 rounded-full hover:bg-white/30 transition-colors text-lg">
                Minta Proposal
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
