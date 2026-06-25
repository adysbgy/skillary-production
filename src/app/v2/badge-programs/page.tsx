import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GradientButton, GhostWarmButton } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

export const metadata: Metadata = {
  title: "Program Sertifikasi & Badge Kompetensi — Skillary",
  description: "Program sertifikasi ISO, K3, Microsoft Office, dan digital skills dengan badge kompetensi yang dapat diverifikasi.",
};

// NetCampus-style — kategori badge dengan level & issuing body
const BADGE_CATEGORIES = [
  {
    category: "Mutu & Kepatuhan",
    badges: [
      { name: "ISO 9001 Awareness", level: "Foundation", duration: "1 hari", issuer: "Internal Skillary" },
      { name: "ISO 9001 Lead Auditor", level: "Advanced", duration: "3 hari", issuer: "Partner Lembaga Sertifikasi" },
      { name: "ISO 27001 Awareness", level: "Foundation", duration: "1 hari", issuer: "Internal Skillary" },
    ],
  },
  {
    category: "Keselamatan Kerja (K3)",
    badges: [
      { name: "Ahli Muda K3 Umum", level: "Foundation", duration: "5 hari", issuer: "Skema BNSP" },
      { name: "K3 Konstruksi", level: "Intermediate", duration: "3 hari", issuer: "Skema BNSP" },
    ],
  },
  {
    category: "Skill Digital & Aplikasi",
    badges: [
      { name: "Microsoft Office Specialist (Excel)", level: "Intermediate", duration: "2 hari", issuer: "Partner Sertifikasi MOS" },
      { name: "Microsoft Office Specialist (PowerPoint)", level: "Foundation", duration: "1 hari", issuer: "Partner Sertifikasi MOS" },
      { name: "Power BI Data Analyst", level: "Advanced", duration: "3 hari", issuer: "Internal Skillary" },
    ],
  },
  {
    category: "Manajemen & Kepemimpinan",
    badges: [
      { name: "Project Management Essentials", level: "Intermediate", duration: "2 hari", issuer: "Internal Skillary" },
      { name: "Skema BNSP Manajer SDM", level: "Advanced", duration: "5 hari", issuer: "Skema BNSP" },
    ],
  },
];

const LEVEL_TONE: Record<string, "neutral" | "warm" | "white"> = {
  Foundation: "neutral",
  Intermediate: "warm",
  Advanced: "warm",
};

const EARNING_STEPS = [
  {
    step: "01",
    title: "Pilih Skema Badge",
    desc: "Tentukan badge yang relevan dengan kebutuhan tim — mutu, K3, digital, atau manajemen.",
  },
  {
    step: "02",
    title: "Ikuti Pelatihan & Assessment",
    desc: "Peserta menyelesaikan materi di platform lalu mengikuti uji kompetensi sesuai standar issuing body.",
  },
  {
    step: "03",
    title: "Verifikasi Kelulusan",
    desc: "Hasil assessment diverifikasi oleh Skillary atau partner lembaga sertifikasi terkait.",
  },
  {
    step: "04",
    title: "Badge Diterbitkan",
    desc: "Badge digital terbit dengan ID unik, dapat diverifikasi online dan dibagikan di LinkedIn.",
  },
];

export default function BadgeProgramsPage() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen pb-24">
      {/* Hero */}
      <section className="pt-16 pb-16 relative overflow-hidden" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: "rgba(255,138,0,0.12)" }} />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "rgba(255,90,95,0.10)" }} />
        <Container className="max-w-4xl text-center relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)", border: "1.5px solid rgb(255, 214, 165)" }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Badge Kompetensi Terverifikasi
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 text-[#181818]">
            Sertifikasi Badge yang Diakui Industri
          </h1>
          <p className="text-xl text-black/60 leading-relaxed mb-10 max-w-2xl mx-auto">
            Berbeda dari sertifikat penyelesaian kursus — badge ini diterbitkan berdasarkan skema kompetensi
            standar (ISO, K3, BNSP, MOS) yang dapat diverifikasi pihak ketiga.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/v2/proposal">
              <GradientButton className="px-8 py-4">Diskusikan Skema Badge untuk Tim →</GradientButton>
            </Link>
            <Link href="/v2/certificates">
              <GhostWarmButton className="px-8 py-4">Bedanya dengan Sertifikat Kursus?</GhostWarmButton>
            </Link>
          </div>
        </Container>
      </section>

      {/* Badge categories */}
      <section className="py-20 bg-white">
        <Container className="max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Skema Badge yang Tersedia</h2>
            <p className="text-black/60 max-w-xl mx-auto">
              Dikelompokkan berdasarkan area kompetensi. Setiap skema dapat disesuaikan jadwal dan jumlah
              pesertanya untuk kebutuhan organisasi Anda.
            </p>
          </div>

          <div className="space-y-12">
            {BADGE_CATEGORIES.map((cat) => (
              <div key={cat.category}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-black/45 mb-5">{cat.category}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.badges.map((badge) => (
                    <div
                      key={badge.name}
                      className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                      style={{ border: "1.5px solid rgb(240, 217, 200)" }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)", border: "1.5px solid rgb(255, 214, 165)" }}
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 15.5L7 21l5-2.5 5 2.5-2.5-5.5" />
                          </svg>
                        </div>
                        <Pill tone={LEVEL_TONE[badge.level]}>{badge.level}</Pill>
                      </div>
                      <h4 className="font-bold text-[#181818] text-base mb-1.5 leading-snug">{badge.name}</h4>
                      <p className="text-xs text-black/45 mb-4">{badge.issuer}</p>
                      <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid rgb(240, 217, 200)" }}>
                        <span className="text-xs font-semibold text-black/50">{badge.duration}</span>
                        <Link href="/v2/proposal" className="text-xs font-bold hover:underline" style={{ color: "rgb(255, 138, 0)" }}>
                          Diskusikan →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Earning process */}
      <section className="py-20" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)" }}>
        <Container className="max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Cara Tim Anda Mendapatkan Badge</h2>
            <p className="text-black/60 max-w-xl mx-auto">Alur sama untuk semua skema — terdokumentasi penuh di platform.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {EARNING_STEPS.map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 shadow-sm" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="text-3xl font-extrabold mb-3" style={{ color: "rgb(255, 138, 0)" }}>{s.step}</div>
                <h3 className="font-bold text-[#181818] text-sm mb-2">{s.title}</h3>
                <p className="text-xs text-black/55 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <Container className="max-w-2xl">
          <div className="bg-white rounded-3xl p-10 shadow-sm" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
            <h2 className="text-2xl font-bold tracking-tight text-[#181818] mb-3">
              Ingin Skema Badge Khusus untuk Organisasi Anda?
            </h2>
            <p className="text-base text-black/60 mb-8 leading-relaxed">
              Kami bisa membantu menyusun skema kompetensi baru, menghubungkan dengan lembaga sertifikasi
              partner, dan mengintegrasikannya ke platform pelaporan Anda.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/v2/proposal">
                <GradientButton className="px-7 py-3.5 text-sm">Diskusikan Skema Badge →</GradientButton>
              </Link>
              <Link href="/v2/catalog">
                <GhostWarmButton className="px-7 py-3.5 text-sm">Lihat Katalog Program</GhostWarmButton>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
