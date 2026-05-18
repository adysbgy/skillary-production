import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Area Program Pelatihan Skillary",
  description: "Lihat area program pelatihan yang dapat dikembangkan sesuai kebutuhan organisasi, mulai dari data, leadership, AI, hingga komunikasi bisnis.",
};

const programAreas = [
  {
    slug: "infographics-visual-communication",
    title: "Infographics & Visual Communication",
    image: "/images/thumb-infographic.png",
    topics: ["Data Visualization & Infographics", "Infographics Design with PowerPoint", "Advanced Visual Communication"],
    output: "Mengubah data, laporan, dan ide kompleks menjadi visual infografis yang jelas, menarik, dan profesional.",
  },
  {
    slug: "data-analytics-dashboard-storytelling",
    title: "Data Analytics, Dashboard & Storytelling",
    image: "/images/thumb-data.png",
    topics: ["Business Analytics Using Power BI", "Interactive Dashboard with Excel", "Storytelling with Data"],
    output: "Membantu tim membaca data, membangun dashboard, menemukan insight, dan menyampaikan rekomendasi bisnis.",
  },
  {
    slug: "presentation-reporting",
    title: "Presentasi Bisnis & Reporting",
    image: "/images/thumb-presentation.png",
    topics: ["Advanced PowerPoint", "Business Report with PowerPoint & Excel", "High Impact Presentation"],
    output: "Meningkatkan kualitas presentasi bisnis, laporan manajemen, dan komunikasi visual agar lebih berdampak.",
  },
  {
    slug: "process-improvement-quality",
    title: "SOP, Business Process & Quality",
    image: "/images/resource-proposal.png",
    topics: ["Business Process Management", "Pelatihan ISO", "SOP for Business Process Improvement"],
    output: "Membantu organisasi merapikan proses, menyusun SOP, dan meningkatkan kualitas kerja.",
  },
  {
    slug: "ai-digital-mindset",
    title: "AI & Digital Mindset",
    image: "/images/thumb-powerbi.png",
    topics: ["Data Analysis & AI", "AI for Productivity", "Digital Transformation"],
    output: "Mengenalkan pemanfaatan AI untuk meningkatkan produktivitas, pembelajaran, dan pekerjaan sehari-hari.",
  },
  {
    slug: "leadership-problem-solving",
    title: "Leadership & Creative Problem Solving",
    image: "/images/hero-training.png",
    topics: ["Creative Problem Solving", "Motivational Leadership", "Decision Making"],
    output: "Membantu peserta memecahkan masalah, mengambil keputusan, dan membangun sikap kepemimpinan.",
  },
];

export default function ProgramCatalogPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFFDF9] py-20 lg:py-28" style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(240,217,200,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgb(240,217,200,0.07)_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full blur-3xl opacity-40" style={{ background: 'rgb(255,138,0,0.12)' }} />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full blur-3xl opacity-30" style={{ background: 'rgb(255,90,95,0.10)' }} />
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest mb-6" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)', border: '1.5px solid rgb(255, 214, 165)' }}>
            Area Pembelajaran
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl text-[#181818] mb-6">
            Area Program Pelatihan Skillary
          </h1>
          <p className="text-lg leading-relaxed text-black/60 mb-4">
            Berangkat dari pengalaman pelatihan sejak 1998, Skillary dapat membantu organisasi menyusun program pembelajaran sesuai kebutuhan, khususnya pada bidang data, visualisasi, dan presentasi bisnis.
          </p>
          <p className="text-sm text-[#94A3B8] italic">
            * Sebagian pengalaman terdokumentasi dalam arsip digital dan kini dikurasi sebagai portofolio awal yang melatarbelakangi pengembangan Skillary.
          </p>
        </Container>
      </section>

      {/* Program Cards */}
      <section className="py-20 lg:py-28 bg-white">
        <Container>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programAreas.map((area, idx) => (
              <div key={idx} className="bg-[#FFFDF9] rounded-2xl flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-200 overflow-hidden" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="h-44 relative w-full border-b" style={{ borderColor: 'rgb(240, 217, 200)' }}>
                  <Image src={area.image} alt={area.title} fill className="object-cover" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-2.5 w-2.5 rounded-full shrink-0" style={{ background: 'rgb(255, 138, 0)' }} />
                    <h2 className="font-bold text-lg text-[#181818]">{area.title}</h2>
                  </div>

                  <div className="mb-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-black/45 mb-2">Contoh Topik</p>
                  <div className="flex flex-wrap gap-1.5">
                    {area.topics.map((topic, tIdx) => (
                      <span key={tIdx} className="inline-block bg-white text-black/60 text-xs px-2.5 py-1 rounded-full" style={{ border: '1px solid rgb(240, 217, 200)' }}>
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6 flex-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-black/45 mb-2">Output</p>
                  <p className="text-sm text-black/60 leading-relaxed">{area.output}</p>
                </div>

                <Link href={`/contact?type=in-house&program=${area.slug}&source=program-catalog`} className="inline-flex items-center justify-center text-white font-bold text-sm px-5 py-2.5 rounded-full shadow-md hover:opacity-90 hover:-translate-y-0.5 transition-all" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                  Diskusikan Program Ini
                </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Customization Note */}
      <section className="py-16 lg:py-20 bg-[#FFFDF9]" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
        <Container className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold tracking-tight text-[#181818] mb-4">
            Program Dapat Disesuaikan
          </h2>
          <p className="text-black/60 leading-relaxed mb-8">
            Setiap program dapat dirancang ulang berdasarkan kebutuhan organisasi. Topik, durasi, jumlah sesi, format pelaksanaan, dan output yang diharapkan dapat didiskusikan bersama tim Skillary.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: "Format", desc: "Online, offline, atau hybrid" },
              { label: "Durasi", desc: "Setengah hari hingga multi-sesi" },
              { label: "Output", desc: "Assessment, sertifikat, dan laporan" },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                <p className="font-bold text-[#181818] mb-1">{item.label}</p>
                <p className="text-black/55">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-white" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
        <Container className="text-center max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-[#181818] mb-6">
            Butuh Program untuk Organisasi Anda?
          </h2>
          <p className="text-lg text-black/60 mb-10">
            Ceritakan kebutuhan pelatihan Anda dan tim Skillary akan membantu menyusun pendekatan program yang sesuai.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <button className="text-white font-bold px-8 py-4 rounded-full shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all text-lg" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                Diskusi Kebutuhan Training
              </button>
            </Link>
            <Link href="/teams">
              <button className="bg-white text-[#334155] font-bold px-8 py-4 rounded-full shadow-sm hover:bg-[#FFF8F1] hover:-translate-y-0.5 transition-all text-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                Lihat Solusi Organisasi
              </button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
