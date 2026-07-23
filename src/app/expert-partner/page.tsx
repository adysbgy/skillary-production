import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import { GradientText } from "@/components/v2/marketing/MarketingUI";

export const metadata: Metadata = {
  title: "Kolaborasi dengan Expert Terpilih | Skillary",
  description: "Skillary membuka kolaborasi terbatas dengan trainer, praktisi, dan subject matter expert yang sesuai dengan kebutuhan program.",
};

const whoFits = ["Trainer corporate", "Praktisi industri", "Subject matter expert", "Fasilitator pendidikan", "Konsultan pembelajaran"];
const areas = ["Data & digital productivity", "Leadership & communication", "Risk & compliance", "Education & teacher development", "AI & future skills", "Business presentation"];
const curationProcess = [
  { title: "Pengajuan profil", desc: "Sampaikan profil dan area keahlian Anda." },
  { title: "Review kesesuaian topik", desc: "Kurasi awal untuk melihat relevansi dengan kebutuhan program saat ini." },
  { title: "Diskusi format program", desc: "Diskusi mengenai format kerja sama dan bentuk pembelajaran." },
  { title: "Penyusunan materi/kelas", desc: "Proses merancang materi, modul, dan assessment bersama." },
  { title: "Pelaksanaan dan evaluasi", desc: "Program dijalankan dengan evaluasi komprehensif." },
];

export default function ExpertPartnerPage() {
  return (
    <MarketingShell>
      {/* Hero */}
      <section className="relative overflow-hidden px-5 pt-16 md:pt-24 pb-12 md:pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(255,138,0,0.13) 0%, rgba(255,90,95,0.06) 40%, transparent 70%)" }} />
        <div data-reveal className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 text-[#64748B] bg-white" style={{ border: "1px solid rgb(234, 222, 210)", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgb(255,138,0)" }} />
            Expert Partner
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
            Kolaborasi dengan <GradientText>expert terpilih</GradientText>
          </h1>
          <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed mb-10">
            Skillary membuka kolaborasi terbatas dengan trainer, praktisi, dan subject matter expert yang sesuai dengan kebutuhan program.
          </p>
          <Link href="/contact?type=expert">
            <button className="text-white text-sm font-bold px-8 py-4 rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
              Ajukan Kolaborasi Expert
            </button>
          </Link>
        </div>
      </section>

      {/* Who Fits + Areas + Process */}
      <section className="px-5 py-16 md:py-24">
        <Container className="max-w-6xl">
          <div data-reveal className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Who Fits & Areas */}
            <div className="space-y-10">
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "rgb(255,138,0)" }}>Profil Kolaborator</p>
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-5">Siapa yang cocok?</h2>
                <div className="flex flex-wrap gap-2.5">
                  {whoFits.map((item) => (
                    <span key={item} className="bg-white text-[#334155] px-4 py-2 rounded-full text-sm font-medium" style={{ border: "1.5px solid rgb(234, 222, 210)" }}>{item}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "rgb(255,138,0)" }}>Area Fokus</p>
                <h2 className="text-2xl font-semibold text-[#0F172A] mb-5">Kebutuhan saat ini</h2>
                <div className="space-y-3">
                  {areas.map((area) => (
                    <div key={area} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full shrink-0" style={{ background: "rgb(255, 138, 0)" }} />
                      <span className="text-[#475569] font-medium">{area}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Curation Process */}
            <div className="lp-lift bg-white rounded-2xl p-8" style={{ border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
              <p className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: "rgb(255,138,0)" }}>Proses</p>
              <h2 className="text-2xl font-semibold text-[#0F172A] mb-8">Proses Kurasi & Kolaborasi</h2>
              <div className="space-y-6">
                {curationProcess.map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start relative">
                    {idx !== curationProcess.length - 1 && (
                      <div className="absolute left-4 top-10 bottom-[-24px] w-[2px]" style={{ background: "rgb(240, 217, 200)" }} />
                    )}
                    <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 relative z-10 text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>{idx + 1}</div>
                    <div className="pb-2">
                      <p className="font-bold text-[#0F172A]">{step.title}</p>
                      <p className="text-[#475569] text-sm mt-1 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Benefits + CTA */}
      <section className="px-5 py-16 md:py-24" style={{ background: "rgb(13, 16, 28)" }}>
        <div data-reveal className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight text-white mb-5">Fokus pada Penyampaian Materi</h2>
          <p className="text-white/60 text-lg mb-10 leading-relaxed">
            Skillary mendukung manajemen platform, alur pendaftaran, distribusi materi, dan penerbitan sertifikat digital — sehingga Anda dapat fokus memberikan pengalaman belajar terbaik.
          </p>
          <Link href="/contact?type=expert">
            <button className="inline-block text-sm font-bold px-8 py-4 rounded-full text-white hover:opacity-90 transition-opacity shadow-lg" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
              Ajukan Kolaborasi Expert
            </button>
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
