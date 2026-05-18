import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function CorporateTrainingBatchSection() {
  const flowSteps = [
    { label: "Organization", desc: "Kelola kebutuhan per organisasi", icon: "🏢" },
    { label: "Batch", desc: "Buat program pelatihan per batch", icon: "📦" },
    { label: "Participants", desc: "Import peserta dan pantau status", icon: "👥" },
    { label: "Courses", desc: "Hubungkan materi/course yang relevan", icon: "📚" },
    { label: "Access", desc: "Berikan atau cabut akses belajar", icon: "🔑" },
    { label: "Report", desc: "Unduh laporan progress dan follow-up", icon: "📊" },
  ];

  const features = [
    {
      title: "Organization Dashboard",
      desc: "Satu dashboard per organisasi untuk memantau seluruh batch pelatihan.",
    },
    {
      title: "Participant CSV Import",
      desc: "Import daftar peserta langsung dari file CSV tanpa input satu per satu.",
    },
    {
      title: "Kontrol Akses Belajar",
      desc: "Atur akses peserta ke course tertentu melalui grant/revoke per batch.",
    },
    {
      title: "Batch Report CSV",
      desc: "Export laporan progress, assessment, dan sertifikat per batch dalam CSV.",
    },
    {
      title: "Follow-up Intelligence",
      desc: "Identifikasi peserta yang belum menyelesaikan materi atau assessment.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#FFFDF9] border-y border-[#E7DDD4]">
      <Container className="max-w-6xl">
        <div className="motion-fade-up text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#172554] leading-tight mb-5">
            Dibuat untuk Training Per Organisasi, Bukan Sekadar Course Individual
          </h2>
          <p className="text-lg text-[#475569] leading-relaxed">
            Skillary membantu admin mengelola pelatihan berdasarkan organisasi dan batch, sehingga peserta, course, akses belajar, dan laporan bisa dipantau dalam satu tempat.
          </p>
        </div>

        {/* Process Flow — Enclosed Card */}
        <div className="motion-scale-in motion-delay-100 bg-white border border-[#E7DDD4] rounded-3xl p-6 sm:p-8 shadow-lg mb-14">
          <p className="text-[9px] font-bold uppercase tracking-widest text-[#94A3B8] text-center mb-6">Contoh alur batch pelatihan</p>

          {/* Desktop: horizontal */}
          <div className="hidden md:flex items-start justify-between gap-1">
            {flowSteps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className={`motion-fade-in motion-delay-${(idx + 2) * 100} flex flex-col items-center gap-2 flex-1 text-center px-1`}>
                  <div className="h-14 w-14 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-xl shadow-sm">
                    {step.icon}
                  </div>
                  <span className="text-[11px] font-bold text-[#172554]">{step.label}</span>
                  <span className="text-[10px] text-[#6B625A] leading-snug">{step.desc}</span>
                </div>
                {idx < flowSteps.length - 1 && (
                  <div className={`motion-fade-in motion-delay-${(idx + 2) * 100 + 50} flex items-center pt-5 shrink-0`}>
                    <div className="w-6 h-[2px] bg-[#D88A44]" />
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent border-l-[6px] border-l-[#D88A44]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden flex flex-col gap-0 relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-[18px] top-3 bottom-3 w-[2px] bg-[#E7DDD4] motion-fade-in motion-delay-200" />
            {flowSteps.map((step, idx) => (
              <div key={idx} className={`motion-fade-in motion-delay-${(idx + 2) * 100} flex items-start gap-4 py-3 relative`}>
                <div className="h-9 w-9 rounded-xl bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-sm shrink-0 z-10 shadow-sm -ml-8">
                  {step.icon}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#172554]">{step.label}</span>
                  <p className="text-[10px] text-[#6B625A] mt-0.5 leading-snug">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {features.map((f, idx) => (
            <div key={idx} className={`motion-hover-lift motion-fade-up motion-delay-${(idx + 2) * 100} bg-white border border-[#E7DDD4] rounded-2xl p-6 flex flex-col`}>
              <div className="h-8 w-8 rounded-lg bg-[#FFF7ED] border border-[#FED7AA] flex items-center justify-center text-[#C2410C] font-bold text-sm mb-4">
                {idx + 1}
              </div>
              <h3 className="text-sm font-bold text-[#172554] mb-1.5">{f.title}</h3>
              <p className="text-xs text-[#6B625A] leading-relaxed flex-1">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="motion-fade-up motion-delay-300 flex flex-wrap justify-center gap-3">
          <Link href="/platform">
            <button className="motion-btn bg-[#172554] hover:bg-[#1E3A8A] text-white px-7 py-3.5 shadow-lg shadow-[#172554]/15 font-semibold rounded-xl text-sm">
              Lihat Platform
            </button>
          </Link>
          <Link href="/demo">
            <button className="motion-btn px-7 py-3.5 hover:bg-[#FFF8F1] font-semibold rounded-xl border border-[#E7DDD4] text-[#334155] bg-white text-sm">
              Minta Demo
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
