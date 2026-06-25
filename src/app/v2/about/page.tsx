import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GradientButton, GhostWarmButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Berpengalaman sejak 1998, Skillary adalah evolusi digital dari puluhan tahun pengalaman pelatihan korporat untuk organisasi terkemuka Indonesia.",
  robots: { index: false, follow: false },
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

const CLIENT_CHIPS = [
  { name: "Bank Indonesia", color: "rgb(220, 38, 38)" },
  { name: "BNI", color: "rgb(29, 78, 216)" },
  { name: "OJK", color: "rgb(21, 128, 61)" },
  { name: "Indofood", color: "rgb(234, 88, 12)" },
  { name: "Freeport", color: "rgb(139, 92, 246)" },
  { name: "PPM Manajemen", color: "rgb(37, 99, 235)" },
];

const TEAM = [
  { role: "Lead Instructor, Data & Analytics", tagline: "Mendampingi tim membaca dan memvisualisasikan data untuk keputusan bisnis.", color: "rgb(59, 130, 246)", initial: "DA" },
  { role: "Lead Instructor, Leadership & Soft Skills", tagline: "Membangun kemampuan kepemimpinan dan komunikasi lintas level organisasi.", color: "rgb(245, 158, 11)", initial: "LS" },
  { role: "Platform & Learning Experience Lead", tagline: "Memastikan pengalaman belajar di platform mulus dan terukur.", color: "rgb(20, 184, 166)", initial: "LX" },
  { role: "B2B Partnership & Client Success", tagline: "Mendampingi organisasi dari konsultasi hingga laporan akhir.", color: "rgb(255, 138, 0)", initial: "CS" },
];

export default function AboutV2Page() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen">
      {/* ── Section 1: Hero ── */}
      <section className="pt-16 pb-16 px-5 md:px-6 lg:px-8 relative overflow-hidden" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(circle, rgb(255,138,0) 0%, transparent 70%)" }} />
        <Container className="relative z-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full" style={{ background: "rgb(255, 244, 232)", border: "1.5px solid rgb(255, 214, 165)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgb(255, 138, 0)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgb(255, 138, 0)" }}>Tentang Skillary</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight leading-[1.12] text-[#181818] mb-5">
            Berpengalaman sejak 1998, Sekarang Hadir dalam Platform Digital
          </h1>
          <p className="text-lg text-black/60 leading-relaxed max-w-2xl mx-auto">
            Skillary adalah evolusi digital dari pengalaman puluhan tahun memberikan pelatihan korporat
            kepada organisasi-organisasi terkemuka Indonesia.
          </p>
        </Container>
      </section>

      {/* ── Section 2: Impact Numbers (dark) ── */}
      <section style={{ background: "rgb(17, 24, 39)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-0 md:divide-x" style={{ borderColor: "rgb(55, 65, 81)" }}>
            {IMPACT_STATS.map((s) => (
              <div key={s.label} className="text-center md:px-6">
                <div className="text-3xl md:text-4xl font-extrabold text-white">
                  {s.value}<span style={{ color: "rgb(255, 138, 0)" }}>{s.suffix}</span>
                </div>
                <div className="text-xs text-gray-400 font-medium mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Story / Mission (2 col) ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: narrative */}
            <div>
              <h2 className="text-3xl font-bold text-[#181818] mb-5">Kenapa Skillary Ada</h2>
              <div className="space-y-4 text-black/60 leading-relaxed">
                <p>
                  Selama puluhan tahun, banyak organisasi menghadapi masalah yang sama dalam pelatihan
                  internal: <span className="font-semibold text-[#181818]">hasilnya sulit diukur</span>,
                  sertifikat terasa sekadar formalitas, dan laporan peserta dikerjakan manual berhari-hari.
                </p>
                <p>
                  Kami sudah mendampingi pelatihan korporat sejak 1998 — memahami betul kebutuhan HR dan tim
                  L&amp;D di lapangan. Skillary lahir untuk membawa pengalaman itu ke dalam platform digital:
                  agar setiap pelatihan menjadi <span className="font-semibold text-[#181818]">terukur,
                  bersertifikat, dan terdokumentasi</span> dalam satu sistem.
                </p>
                <p>
                  Tujuannya sederhana — membuat tim HR &amp; L&amp;D bisa fokus pada dampak pengembangan
                  SDM, bukan pada administrasi.
                </p>
              </div>
            </div>

            {/* Right: core values */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-black/45 mb-1">Nilai Inti Kami</h3>
              {VALUES.map((v) => (
                <div key={v.title} className="flex gap-4 p-6 rounded-2xl" style={{ background: "rgb(255, 251, 245)", border: "1.5px solid rgb(240, 217, 200)" }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={v.icon} /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#181818] mb-1">{v.title}</h4>
                    <p className="text-sm text-black/55 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Section 4: Awards & Recognition ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)", borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Rekam Jejak &amp; Pengakuan</h2>
            <p className="text-black/60 max-w-xl mx-auto">Kepercayaan organisasi besar adalah bukti terbaik dari kualitas pelatihan kami.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {RECOGNITION.map((r) => (
              <div key={r.title} className="bg-white rounded-2xl p-7 text-center" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)", border: "1.5px solid rgb(255, 214, 165)" }}>
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={r.icon} /></svg>
                </div>
                <h3 className="font-bold text-[#181818] mb-2">{r.title}</h3>
                <p className="text-sm text-black/55 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>

          {/* Client logo strip */}
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-black/40 mb-5">Dipercaya oleh organisasi terkemuka</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {CLIENT_CHIPS.map((c) => (
              <div key={c.name} className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-black shrink-0" style={{ background: c.color }}>{c.name.charAt(0)}</div>
                <span className="text-xs font-semibold text-[#475569]">{c.name}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Section 5: Team ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 bg-white">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Didukung oleh Praktisi, Bukan Hanya Akademisi</h2>
            <p className="text-black/60 max-w-xl mx-auto">Tim kami terdiri dari instruktur dan profesional dengan pengalaman nyata di industrinya.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TEAM.map((t) => (
              <div key={t.role} className="p-6 rounded-2xl text-center" style={{ background: "rgb(255, 251, 245)", border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-lg font-black" style={{ background: t.color }}>{t.initial}</div>
                <h3 className="font-bold text-[#181818] text-sm mb-2 leading-snug">{t.role}</h3>
                <p className="text-xs text-black/55 leading-relaxed">{t.tagline}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Section 6: CTA ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 text-center" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)" }}>
        <Container className="max-w-2xl">
          <div className="bg-white rounded-3xl p-10 shadow-sm" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
            <h2 className="text-2xl font-bold tracking-tight text-[#181818] mb-3">Siap Bekerjasama?</h2>
            <p className="text-base text-black/60 mb-8 leading-relaxed">Diskusikan kebutuhan pelatihan tim Anda dengan tim kami — konsultasi gratis, respon dalam 1 hari kerja.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/v2/proposal"><GradientButton className="px-7 py-3.5 text-sm">Diskusikan Kebutuhan Training →</GradientButton></Link>
              <Link href="/v2/portfolio"><GhostWarmButton className="px-7 py-3.5 text-sm">Lihat Klien Kami</GhostWarmButton></Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
