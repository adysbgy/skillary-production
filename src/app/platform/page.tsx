import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Platform Skillary | Learning Management System",
  description: "Satu sistem untuk mengelola materi pembelajaran, assessment, sertifikat digital, dan laporan peserta.",
};

export default function PlatformPage() {
  const capabilities = [
    { title: "Materi & module terstruktur", icon: "📚" },
    { title: "Progress peserta", icon: "📈" },
    { title: "Quiz & assessment", icon: "📝" },
    { title: "Gradebook peserta", icon: "📊" },
    { title: "Sertifikat digital", icon: "🎓" },
    { title: "Export laporan", icon: "📑" },
    { title: "Admin/instructor workflow", icon: "⚙️" },
  ];

  const steps = [
    { n: 1, title: "Akses Materi Terstruktur", desc: "Peserta mempelajari modul sesuai urutan yang dirancang." },
    { n: 2, title: "Evaluasi via Assessment", desc: "Peserta mengikuti quiz atau evaluasi akhir secara online." },
    { n: 3, title: "Dashboard & Pelaporan", desc: "Pengelola memantau progress dan hasil assessment, serta menerbitkan sertifikat." },
  ];

  return (
    <>
      <div className="bg-[#FFFDF9] min-h-screen pt-24 pb-32">
        <section className="pt-10 pb-20" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-4xl text-center">
            <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
              Platform LMS
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#181818] mb-6">Platform Skillary</h1>
            <p className="text-xl text-[#181818] font-semibold mb-6">Satu sistem untuk mengelola materi pembelajaran, assessment, sertifikat digital, dan laporan peserta.</p>
            <p className="text-lg text-black/60 leading-relaxed mb-12">Skillary membantu pengelola program memantau proses pembelajaran dari awal hingga evaluasi akhir.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact?type=platform">
                <button className="text-white px-7 py-3.5 shadow-lg font-semibold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  Diskusi Kebutuhan Platform
                </button>
              </Link>
              <Link href="/teams">
                <button className="px-7 py-3.5 font-semibold rounded-full bg-white text-[#334155] hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  Lihat Solusi Organisasi
                </button>
              </Link>
            </div>
          </Container>
        </section>

        <section className="py-20 bg-white">
          <Container className="max-w-5xl">
            <h2 className="text-3xl font-bold text-[#181818] mb-12 text-center">Kapabilitas Platform</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="bg-[#FFFDF9] p-6 rounded-2xl shadow-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  <div className="text-4xl mb-4">{cap.icon}</div>
                  <h3 className="font-bold text-[#181818] text-sm">{cap.title}</h3>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 bg-[#FAF3EA]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)', borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-4xl">
            <div className="bg-white p-10 rounded-3xl shadow-xl relative overflow-hidden" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none opacity-50" style={{ background: 'rgb(255,138,0,0.08)' }} />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#181818] mb-6 pb-4" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
                  Contoh Alur Pembelajaran
                </h3>
                <div className="space-y-6">
                  {steps.map((step) => (
                    <div key={step.n} className="flex gap-4 items-start">
                      <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>
                        {step.n}
                      </div>
                      <div>
                        <p className="font-bold text-[#181818]">{step.title}</p>
                        <p className="text-black/60 text-sm mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-[#94A3B8] italic font-medium mt-10">Contoh tampilan platform untuk ilustrasi alur pembelajaran.</p>
              </div>
            </div>
          </Container>
        </section>

        <section className="py-20 text-center">
          <Container className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-[#181818] mb-6">Siap Menerapkan Platform Skillary?</h2>
            <p className="text-lg text-black/60 mb-10">Hubungi tim kami untuk mendiskusikan kebutuhan platform pelatihan organisasi Anda.</p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact?type=platform">
                <button className="text-white px-8 py-4 shadow-lg font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  Jadwalkan Demo Platform
                </button>
              </Link>
              <Link href="/demo">
                <button className="bg-white text-[#334155] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                  Lihat Demo
                </button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  );
}
