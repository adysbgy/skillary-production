import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function TeamsEngagementOptions() {
  const options = [
    {
      title: "In-House Training",
      desc: "Pelatihan untuk satu organisasi, tim, sekolah, yayasan, atau komunitas.",
    },
    {
      title: "Assessment Program",
      desc: "Evaluasi peserta untuk kelas, batch, atau program tertentu.",
    },
    {
      title: "Managed Learning Program",
      desc: "Program pembelajaran yang dilengkapi materi, assessment, sertifikat, dan laporan.",
    },
    {
      title: "Platform / LMS Discussion",
      desc: "Diskusi kebutuhan platform pembelajaran internal bagi organisasi.",
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#FFFDF9]">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#0F172A] mb-4">
            Bentuk Kerja Sama yang Fleksibel
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {options.map((option, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 hover:-translate-y-1 hover:shadow-md transition-all" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
              <div className="h-10 w-10 rounded-xl flex items-center justify-center font-bold mb-5" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
                {idx + 1}
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">{option.title}</h3>
              <p className="text-sm text-[#475569] leading-relaxed">{option.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/contact">
            <button className="text-white px-8 py-3.5 shadow-lg font-semibold rounded-full hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
              Diskusikan Format yang Tepat
            </button>
          </Link>
        </div>
      </Container>
    </section>
  );
}
