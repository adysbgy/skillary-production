import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GradientButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Portofolio Klien — Skillary",
  description: "Dipercaya oleh BNI, Bank Indonesia, OJK, Indofood, Freeport, dan 17+ organisasi terkemuka Indonesia.",
};

const IMPACT_STATS = [
  { value: "1998", suffix: "", label: "Berpengalaman sejak" },
  { value: "21", suffix: "+", label: "Organisasi klien" },
  { value: "39", suffix: "+", label: "Program terdokumentasi" },
  { value: "6", suffix: "+", label: "Sektor industri" },
  { value: "500", suffix: "+", label: "Peserta tersertifikasi" },
];

// Client names + sectors are kept (curated track-record), but per-client
// engagement descriptions are softened to a neutral, sector-framed archive
// note so no specific unverifiable claim about the work delivered is made.
const CLIENTS = [
  { name: "Bank Indonesia", abbr: "BI", color: "rgb(220, 38, 38)", sector: "Perbankan & Regulasi", context: "Bagian dari arsip pengalaman pelatihan korporat lintas sektor." },
  { name: "BNI (Bank Negara Indonesia)", abbr: "BNI", color: "rgb(29, 78, 216)", sector: "Perbankan", context: "Bagian dari arsip pengalaman pelatihan korporat lintas sektor." },
  { name: "OJK (Otoritas Jasa Keuangan)", abbr: "OJK", color: "rgb(21, 128, 61)", sector: "Regulasi Keuangan", context: "Bagian dari arsip pengalaman pelatihan korporat lintas sektor." },
  { name: "Indofood", abbr: "IF", color: "rgb(234, 88, 12)", sector: "FMCG & Manufaktur", context: "Bagian dari arsip pengalaman pelatihan korporat lintas sektor." },
  { name: "Freeport Indonesia", abbr: "FCX", color: "rgb(139, 92, 246)", sector: "Pertambangan & Energi", context: "Bagian dari arsip pengalaman pelatihan korporat lintas sektor." },
  { name: "Mandiri University", abbr: "MU", color: "rgb(5, 150, 105)", sector: "Perbankan", context: "Bagian dari arsip pengalaman pelatihan korporat lintas sektor." },
  { name: "Indosat Ooredoo", abbr: "IO", color: "rgb(220, 38, 38)", sector: "Telekomunikasi", context: "Bagian dari arsip pengalaman pelatihan korporat lintas sektor." },
  { name: "PPM Manajemen", abbr: "PPM", color: "rgb(37, 99, 235)", sector: "Pendidikan & Konsultansi", context: "Bagian dari arsip pengalaman pelatihan korporat lintas sektor." },
];

const PLACEHOLDER_COUNT = 4;

const SECTORS = [
  { name: "Perbankan", icon: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M9 14v3m6-3v3" },
  { name: "FMCG", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
  { name: "Pertambangan", icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" },
  { name: "Telekomunikasi", icon: "M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" },
  { name: "Pendidikan", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
  { name: "Pemerintahan", icon: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" },
];

export default function PortfolioV2Page() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-16 pb-14 px-5 md:px-6 lg:px-8 relative overflow-hidden" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(circle, rgb(255,138,0) 0%, transparent 70%)" }} />
        <Container className="relative z-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full" style={{ background: "rgb(255, 244, 232)", border: "1.5px solid rgb(255, 214, 165)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgb(255, 138, 0)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgb(255, 138, 0)" }}>Track Record</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1] text-[#181818] mb-5">
            Dipercaya oleh Organisasi Terkemuka Indonesia
          </h1>
          <p className="text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
            Selama lebih dari dua dekade, program pelatihan kami telah dijalankan bersama institusi
            keuangan, BUMN, manufaktur, hingga pertambangan terbesar di Indonesia.
          </p>
        </Container>
      </section>

      {/* ── Impact stats (dark) ── */}
      <section style={{ background: "rgb(17, 24, 39)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0 md:divide-x" style={{ borderColor: "rgb(55, 65, 81)" }}>
            {IMPACT_STATS.map((s, i) => (
              <div key={s.label} className={`text-center md:px-6 ${i === IMPACT_STATS.length - 1 ? "col-span-2 md:col-span-1" : ""}`}>
                <div className="text-3xl md:text-4xl font-extrabold text-white">
                  {s.value}<span style={{ color: "rgb(255, 138, 0)" }}>{s.suffix}</span>
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client grid ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 bg-white">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Organisasi yang Pernah Dilayani</h2>
            <p className="text-black/60 max-w-xl mx-auto">Lintas sektor — dari regulator keuangan hingga industri pertambangan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {CLIENTS.map((c) => (
              <div key={c.name} className="bg-white rounded-2xl p-6 hover:-translate-y-1 hover:shadow-lg transition-all" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-sm font-black shrink-0" style={{ background: c.color }}>{c.abbr}</div>
                  <div>
                    <h3 className="font-bold text-[#181818] text-sm leading-tight">{c.name}</h3>
                    <p className="text-[11px] font-semibold uppercase tracking-wider mt-0.5" style={{ color: "rgb(255, 138, 0)" }}>{c.sector}</p>
                  </div>
                </div>
                <p className="text-xs text-black/55 leading-relaxed">{c.context}</p>
              </div>
            ))}

            {/* Placeholders */}
            {Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
              <div key={`ph-${i}`} className="rounded-2xl p-6 flex items-center gap-3" style={{ background: "rgb(250, 250, 250)", border: "1.5px dashed rgb(226, 217, 205)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgb(229, 231, 235)" }}>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" /></svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-400">Klien lainnya</p>
                  <p className="text-[11px] text-gray-400">Sektor beragam</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Sector coverage ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)", borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Cakupan Sektor Industri</h2>
            <p className="text-black/60 max-w-xl mx-auto">Pengalaman lintas industri membuat program kami adaptif untuk berbagai konteks.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {SECTORS.map((s) => (
              <div key={s.name} className="bg-white rounded-2xl p-6 flex flex-col items-center gap-3 text-center" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={s.icon} /></svg>
                </div>
                <span className="text-sm font-semibold text-[#334155]">{s.name}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] text-black/40 mt-8 max-w-2xl mx-auto">
            Nama klien merujuk pada arsip dokumentasi pelatihan yang dijalankan.
          </p>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 text-center bg-white">
        <Container className="max-w-2xl">
          <div className="rounded-3xl p-10 shadow-sm" style={{ background: "rgb(255, 251, 245)", border: "1.5px solid rgb(240, 217, 200)" }}>
            <h2 className="text-2xl font-bold tracking-tight text-[#181818] mb-3">Jadikan Organisasi Anda yang Berikutnya</h2>
            <p className="text-base text-black/60 mb-8 leading-relaxed">Diskusikan kebutuhan pelatihan tim Anda dengan tim kami — konsultasi gratis, respon dalam 1 hari kerja.</p>
            <Link href="/v2/proposal"><GradientButton className="px-7 py-3.5 text-sm">Diskusikan Kebutuhan Training →</GradientButton></Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
