import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";

export const metadata: Metadata = {
  title: "Kolaborasi dengan Expert Terpilih | Skillary",
  description: "Skillary membuka kolaborasi terbatas dengan trainer, praktisi, dan subject matter expert yang sesuai dengan kebutuhan program.",
};

export default function ExpertPartnerPage() {
  const whoFits = [
    "Trainer corporate",
    "Praktisi industri",
    "Subject matter expert",
    "Fasilitator pendidikan",
    "Konsultan pembelajaran",
  ];

  const areas = [
    "Data & digital productivity",
    "Leadership & communication",
    "Risk & compliance",
    "Education & teacher development",
    "AI & future skills",
    "Business presentation",
  ];

  const curationProcess = [
    { title: "Pengajuan profil", desc: "Sampaikan profil dan area keahlian Anda." },
    { title: "Review kesesuaian topik", desc: "Kurasi awal untuk melihat relevansi dengan kebutuhan program saat ini." },
    { title: "Diskusi format program", desc: "Diskusi mengenai format kerja sama dan bentuk pembelajaran." },
    { title: "Penyusunan materi/kelas", desc: "Proses merancang materi, modul, dan assessment bersama." },
    { title: "Pelaksanaan dan evaluasi", desc: "Program dijalankan dengan evaluasi komprehensif." },
  ];

  return (
    <MarketingShell showFooter={false}>
      <div className="bg-[#FFFDF9] min-h-screen pt-24 pb-32">
        {/* Hero Section */}
        <section className="pt-10 pb-20" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-[#0F172A] mb-6">
              Kolaborasi dengan Expert Terpilih
            </h1>
            <p className="text-xl text-[#0F172A] font-semibold mb-6 max-w-2xl mx-auto">
              Skillary membuka kolaborasi terbatas dengan trainer, praktisi, dan subject matter expert yang sesuai dengan kebutuhan program.
            </p>
            <div className="flex justify-center mt-10">
              <Link href="/contact?type=expert">
                <button className="text-white px-8 py-4 shadow-lg font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  Ajukan Kolaborasi Expert
                </button>
              </Link>
            </div>
          </Container>
        </section>

        {/* Content Section */}
        <section className="py-20 bg-white">
          <Container className="max-w-5xl">
            <div className="grid md:grid-cols-2 gap-16">
              
              {/* Left Column: Who Fits & Areas */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6 pb-3" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
                    Profil Kolaborator
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {whoFits.map((item, idx) => (
                      <span key={idx} className="bg-white text-[#334155] px-4 py-2 rounded-full text-sm font-medium" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#0F172A] mb-6 pb-3" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
                    Area Expertise Fokus Saat Ini
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {areas.map((area, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full shrink-0" style={{ background: 'rgb(255, 138, 0)' }} />
                        <span className="text-[#475569] font-medium">{area}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Curation Process */}
              <div className="bg-[#FFFDF9] p-8 rounded-3xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <h2 className="text-2xl font-bold text-[#0F172A] mb-8">
                  Proses Kurasi & Kolaborasi
                </h2>
                <div className="space-y-6">
                  {curationProcess.map((step, idx) => (
                    <div key={idx} className="flex gap-4 items-start relative">
                      {idx !== curationProcess.length - 1 && (
                        <div className="absolute left-4 top-10 bottom-[-24px] w-[2px]" style={{ background: 'rgb(240, 217, 200)' }} />
                      )}
                      <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center font-bold text-sm shrink-0 relative z-10 shadow-sm" style={{ border: '1.5px solid rgb(240, 217, 200)', color: 'rgb(255, 138, 0)' }}>
                        {idx + 1}
                      </div>
                      <div className="pb-2">
                        <p className="font-bold text-[#0F172A]">{step.title}</p>
                        <p className="text-[#475569] text-sm mt-1">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* Benefits & CTA */}
        <section className="py-20 bg-[#FFFDF9] text-center" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
          <Container className="max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] mb-6">
              Fokus pada Penyampaian Materi
            </h2>
            <p className="text-[#475569] text-lg mb-12">
              Dalam kolaborasi ini, Skillary mendukung manajemen platform, alur pendaftaran, distribusi materi, dan penerbitan sertifikat digital, sehingga Anda dapat fokus memberikan pengalaman belajar terbaik bagi organisasi.
            </p>
            <Link href="/contact?type=expert">
              <button className="text-white px-8 py-4 shadow-lg font-bold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                Ajukan Kolaborasi Expert
              </button>
            </Link>
          </Container>
        </section>
      </div>
    </MarketingShell>
  );
}
