import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import { SectionHeading, GradientText, Check } from "@/components/v2/marketing/MarketingUI";

export const metadata: Metadata = {
  title: "Tentang Skillary — Berpengalaman sejak 1998",
  description:
    "Skillary adalah evolusi digital dari pengalaman 25+ tahun pelatihan korporat. Platform LMS modern dengan rekam jejak nyata.",
};

const IMPACT_STATS = [
  { value: "1998", suffix: "", label: "Tahun mulai beroperasi" },
  { value: "25", suffix: "+", label: "Tahun pengalaman" },
  { value: "21", suffix: "+", label: "Organisasi dilayani" },
  { value: "39", suffix: "+", label: "Program terdokumentasi" },
  { value: "500", suffix: "+", label: "Peserta tersertifikasi" },
];

const VALUES = [
  {
    title: "Terukur",
    desc: "Setiap pelatihan punya data peserta dan assessment — bukan sekadar kehadiran, tapi bukti kompetensi.",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    title: "Bersertifikat",
    desc: "Sertifikat resmi yang dapat diverifikasi dengan ID unik — kredensial yang benar-benar berarti.",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    title: "Terdokumentasi",
    desc: "Laporan lengkap untuk HR dan manajemen — kehadiran, nilai, dan progress, semua terpusat dan rapi.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
  },
];

const RECOGNITION = [
  {
    title: "Klien dari 6 Sektor",
    desc: "Perbankan, FMCG, pertambangan, telekomunikasi, pendidikan, dan pemerintahan.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
  },
  {
    title: "Digunakan di 3 Kota Besar",
    desc: "Program pelatihan dijalankan untuk organisasi di Jakarta, Bandung, dan Surabaya.",
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
  },
  {
    title: "Penyelenggara Pelatihan Resmi",
    desc: "Terdaftar dan beroperasi sebagai penyelenggara pelatihan korporat sejak 1998.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const INDUSTRY_CHIPS = ["Perbankan", "Regulator", "FMCG", "Energi", "Pendidikan", "Organisasi Publik", "Telekomunikasi", "Transportasi"];

const TEAM = [
  { role: "Lead Instructor, Data & Analytics", tagline: "Mendampingi tim membaca dan memvisualisasikan data untuk keputusan bisnis.", av: 3 },
  { role: "Lead Instructor, Leadership & Soft Skills", tagline: "Membangun kemampuan kepemimpinan dan komunikasi lintas level organisasi.", av: 1 },
  { role: "Platform & Learning Experience Lead", tagline: "Memastikan pengalaman belajar di platform mulus dan terukur.", av: 8 },
  { role: "B2B Partnership & Client Success", tagline: "Mendampingi organisasi dari konsultasi hingga laporan akhir.", av: 6 },
];

const BAND = { backgroundImage: "url(/images/lp-startup-band.svg)", backgroundSize: "100% 100%" } as const;

export default function AboutV2Page() {
  return (
    <MarketingShell>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden px-5 pt-16 md:pt-24 pb-12 md:pb-16">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center top, rgba(255,138,0,0.13) 0%, rgba(255,90,95,0.06) 40%, transparent 70%)" }}
        />
        <div data-reveal className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 text-[#64748B] bg-white" style={{ border: "1px solid rgb(234, 222, 210)", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgb(255,138,0)" }} />
            Tentang Skillary
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
            <GradientText>Berpengalaman sejak 1998</GradientText>, kini hadir dalam platform digital
          </h1>
          <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Skillary adalah evolusi digital dari pengalaman puluhan tahun memberikan pelatihan korporat kepada organisasi-organisasi terkemuka Indonesia.
          </p>
        </div>
      </section>

      {/* ── Impact stats — dark panel ── */}
      <section className="px-5 pb-16 md:pb-20">
        <div data-reveal className="max-w-6xl mx-auto rounded-[2rem] px-6 md:px-10 py-10 md:py-12" style={{ background: "rgb(13, 16, 28)" }}>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 gap-x-4">
            {IMPACT_STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-5xl font-bold tracking-tight text-white">
                  {s.value}<span style={{ color: "rgb(255,138,0)" }}>{s.suffix}</span>
                </div>
                <div className="text-xs text-white/45 mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Story + core values ── */}
      <section className="px-5 py-16 md:py-24" style={BAND}>
        <div data-reveal className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "rgb(255,138,0)" }}>Kisah Kami</p>
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-5">Kenapa Skillary ada</h2>
            <div className="space-y-4 text-[#64748B] leading-relaxed">
              <p>
                Selama puluhan tahun, banyak organisasi menghadapi masalah yang sama dalam pelatihan internal:{" "}
                <span className="font-semibold text-[#0F172A]">hasilnya sulit diukur</span>, sertifikat terasa sekadar formalitas, dan laporan peserta dikerjakan manual berhari-hari.
              </p>
              <p>
                Kami sudah mendampingi pelatihan korporat sejak 1998 — memahami betul kebutuhan HR dan tim L&amp;D di lapangan. Skillary lahir untuk membawa pengalaman itu ke dalam platform digital: agar setiap pelatihan menjadi{" "}
                <span className="font-semibold text-[#0F172A]">terukur, bersertifikat, dan terdokumentasi</span> dalam satu sistem.
              </p>
              <p>Tujuannya sederhana — membuat tim HR &amp; L&amp;D fokus pada dampak pengembangan SDM, bukan pada administrasi.</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#94A3B8] mb-1">Nilai Inti Kami</h3>
            {VALUES.map((v) => (
              <div key={v.title} className="lp-lift flex gap-4 p-6 rounded-2xl bg-white" style={{ border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={v.icon} /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-[#0F172A] mb-1">{v.title}</h4>
                  <p className="text-sm text-[#64748B] leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recognition + safe portfolio framing ── */}
      <section className="px-5 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div data-reveal>
            <SectionHeading eyebrow="Rekam Jejak" title="Rekam jejak & pengakuan" sub="Pengalaman lintas sektor sejak 1998 menjadi fondasi kualitas program Skillary." />
          </div>
          <div data-reveal className="grid md:grid-cols-3 gap-4 mt-12">
            {RECOGNITION.map((r) => (
              <div key={r.title} className="lp-lift bg-white rounded-2xl p-7 text-center" style={{ border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)", border: "1px solid rgb(255, 214, 165)" }}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={r.icon} /></svg>
                </div>
                <h3 className="font-bold text-[#0F172A] mb-2">{r.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>

          <div data-reveal className="text-center mt-14">
            <p className="text-sm font-semibold text-[#475569] mb-4">Berangkat dari arsip pengalaman pelatihan korporat sejak 1998</p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {INDUSTRY_CHIPS.map((c) => (
                <span key={c} className="text-xs font-semibold px-3.5 py-1.5 rounded-full bg-white text-[#475569]" style={{ border: "1px solid rgb(226, 232, 240)" }}>
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="px-5 py-16 md:py-24" style={BAND}>
        <div className="max-w-6xl mx-auto">
          <div data-reveal>
            <SectionHeading eyebrow="Tim" title="Didukung praktisi, bukan hanya akademisi" sub="Instruktur dan profesional dengan pengalaman nyata di industrinya." />
          </div>
          <div data-reveal className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {TEAM.map((t) => (
              <div key={t.role} className="lp-lift p-6 rounded-2xl text-center bg-white" style={{ border: "1px solid rgb(234, 237, 243)", boxShadow: "0 1px 3px rgba(15,23,42,0.04)" }}>
                <Image src={`/images/avatars/av${t.av}.svg`} alt="" width={64} height={64} className="w-16 h-16 rounded-full mx-auto mb-4" />
                <h3 className="font-bold text-[#0F172A] text-sm mb-2 leading-snug">{t.role}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{t.tagline}</p>
              </div>
            ))}
          </div>

          <div data-reveal className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-[#94A3B8] mt-10">
            <span className="flex items-center gap-1.5"><Check /> Konsultasi gratis</span>
            <span className="flex items-center gap-1.5"><Check /> Tanpa komitmen</span>
            <Link href="/contact" className="font-semibold" style={{ color: "rgb(255,138,0)" }}>
              Diskusikan kebutuhan training →
            </Link>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
