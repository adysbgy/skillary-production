import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Demo Platform Skillary | Lihat Cara Kerja LMS",
  description: "Lihat bagaimana Skillary membantu organisasi mengelola pelatihan dari materi, assessment, sertifikat, hingga laporan peserta.",
};

const demoItems = [
  { icon: "📋", title: "Alur Penyusunan Program", desc: "Lihat bagaimana admin menyusun modul, lesson, dan materi dalam satu alur terstruktur." },
  { icon: "📖", title: "Tampilan Materi & Lesson", desc: "Peserta mengakses materi teks, video, atau file secara berurutan sesuai kurikulum." },
  { icon: "📈", title: "Progress Peserta", desc: "Pengelola memantau status pembelajaran setiap peserta secara real-time." },
  { icon: "📝", title: "Assessment & Gradebook", desc: "Quiz dan evaluasi terintegrasi, dengan nilai otomatis tersimpan di gradebook." },
  { icon: "🎓", title: "Sertifikat Digital", desc: "Sertifikat diterbitkan otomatis setelah peserta memenuhi kriteria kelulusan." },
  { icon: "📊", title: "Export Laporan Peserta", desc: "Data progress, skor, dan status sertifikat dapat diexport untuk kebutuhan HR/manajemen." },
];

const demoScenarios = [
  { title: "In-House Training", desc: "Program pelatihan khusus internal perusahaan dengan kurikulum tailor-made.", href: "/contact?type=in-house&source=demo" },
  { title: "Assessment Program", desc: "Evaluasi kompetensi peserta melalui pre-test dan post-test terstruktur.", href: "/contact?type=assessment&source=demo" },
  { title: "Managed Learning", desc: "Skillary mengelola seluruh alur pelatihan dari awal hingga pelaporan akhir.", href: "/contact?type=managed&source=demo" },
  { title: "Platform / LMS Discussion", desc: "Diskusi teknis tentang penggunaan platform untuk kebutuhan spesifik organisasi.", href: "/contact?type=platform&source=demo" },
];

const audiences = [
  "HR Manager & L&D",
  "Training Coordinator",
  "Kepala Sekolah / Yayasan",
  "Corporate Decision Maker",
  "Pengelola Program Internal",
];

export default function DemoPage() {
  return (
    <>
      <div className="bg-[#FFFDF9] min-h-screen pt-24 pb-32">
        {/* Hero */}
        <section className="pt-10 pb-20" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-4xl text-center">
            <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
              Demo Platform
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#181818] mb-6">
              Demo Platform Skillary
            </h1>
            <p className="text-xl text-[#181818] font-semibold mb-6">
              Lihat bagaimana Skillary membantu organisasi mengelola pelatihan dari materi, assessment, sertifikat, hingga laporan peserta.
            </p>
            <p className="text-lg text-black/60 leading-relaxed mb-12">
              Jadwalkan sesi demo singkat bersama tim kami untuk melihat langsung cara kerja platform.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact?type=platform&source=demo">
                <button className="text-white px-7 py-3.5 shadow-lg font-semibold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  Minta Demo Platform
                </button>
              </Link>
              <Link href="/proposal">
                <button className="px-7 py-3.5 font-semibold rounded-full bg-white text-[#334155] hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  Minta Proposal
                </button>
              </Link>
            </div>
          </Container>
        </section>

        {/* What you'll see */}
        <section className="py-20 bg-white">
          <Container className="max-w-5xl">
            <h2 className="text-3xl font-bold text-[#181818] mb-4 text-center">Apa yang Akan Anda Lihat dalam Demo</h2>
            <p className="text-black/60 text-center mb-12 max-w-2xl mx-auto">Sesi demo mencakup fitur utama platform Skillary yang langsung relevan dengan kebutuhan pengelolaan pelatihan organisasi.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoItems.map((item, idx) => (
                <div key={idx} className="bg-[#FFFDF9] p-6 rounded-2xl shadow-sm hover:-translate-y-1 transition-transform" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-bold text-[#181818] mb-2">{item.title}</h3>
                  <p className="text-sm text-black/60 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#94A3B8] italic font-medium mt-8 text-center">Contoh tampilan platform untuk ilustrasi demo.</p>
          </Container>
        </section>

        {/* Demo Scenarios */}
        <section className="py-20 bg-[#FAF3EA]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)', borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-5xl">
            <h2 className="text-3xl font-bold text-[#181818] mb-4 text-center">Skenario Demo</h2>
            <p className="text-black/60 text-center mb-12 max-w-2xl mx-auto">Pilih skenario yang paling relevan dengan kebutuhan organisasi Anda.</p>
            <div className="grid sm:grid-cols-2 gap-6">
              {demoScenarios.map((scenario, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  <h3 className="font-bold text-lg text-[#181818] mb-2">{scenario.title}</h3>
                  <p className="text-sm text-black/60 leading-relaxed mb-4">{scenario.desc}</p>
                  <Link href={scenario.href} className="text-sm font-semibold hover:underline transition-all" style={{ color: 'rgb(255, 138, 0)' }}>
                    Minta Demo →
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Who should request */}
        <section className="py-20 bg-white">
          <Container className="max-w-3xl text-center">
            <h2 className="text-3xl font-bold text-[#181818] mb-4">Siapa yang Sebaiknya Minta Demo?</h2>
            <p className="text-black/60 mb-10">Demo platform cocok untuk siapa saja yang bertanggung jawab atas pengelolaan program pelatihan dan pengembangan SDM di organisasi.</p>
            <div className="flex flex-wrap justify-center gap-3">
              {audiences.map((audience, idx) => (
                <span key={idx} className="inline-block bg-white text-[#334155] text-sm font-medium px-4 py-2 rounded-full" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  {audience}
                </span>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA Bottom */}
        <section className="py-20 text-center" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-[#181818] mb-6">Siap Melihat Platform Skillary?</h2>
            <p className="text-lg text-black/60 mb-10">Jadwalkan demo singkat bersama tim kami untuk melihat bagaimana Skillary dapat mendukung program pelatihan Anda.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact?type=platform&source=demo">
                <button className="text-white px-8 py-4 shadow-lg font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  Minta Demo Platform
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
