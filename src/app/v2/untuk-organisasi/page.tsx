import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GradientButton, GhostWarmButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Untuk Organisasi — Pelatihan In-House",
  description: "Platform pelatihan in-house untuk tim Anda — dari kebutuhan sampai laporan peserta, Skillary handle semuanya.",
  robots: { index: false, follow: false },
};

const PAINS = [
  { title: "Pelatihan tidak terukur hasilnya", desc: "Sulit membuktikan apakah pelatihan benar-benar meningkatkan kompetensi tim.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { title: "Laporan peserta manual dan lama", desc: "Rekap kehadiran dan nilai dikerjakan manual, memakan waktu HR berhari-hari.", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { title: "Sertifikat tidak terasa resmi", desc: "Sertifikat sekadar formalitas tanpa assessment dan tanpa cara verifikasi.", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
];

const FEATURES = [
  { title: "Platform LMS khusus batch organisasi", desc: "Kelola peserta per batch, atur akses materi, dan pantau progress seluruh tim dari satu dashboard.", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { title: "Instruktur berpengalaman sejak 1998", desc: "Praktisi dan trainer yang telah dipercaya organisasi besar Indonesia selama puluhan tahun.", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" },
  { title: "Sertifikat digital resmi + badge", desc: "Sertifikat berbasis assessment dengan ID unik yang dapat diverifikasi, plus badge kompetensi.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
  { title: "Laporan peserta otomatis", desc: "Kehadiran, nilai assessment, dan progress belajar terekap otomatis — siap dipresentasikan ke manajemen.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { title: "Program custom sesuai kebutuhan", desc: "Topik, durasi, format, dan studi kasus dirancang spesifik untuk konteks dan industri organisasi Anda.", icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" },
];

const COMPARISON = [
  { aspect: "Struktur program", conv: "Materi seadanya, tidak terstandar", skillary: "Kurikulum terstruktur & terukur" },
  { aspect: "Assessment peserta", conv: "Jarang ada, sekadar hadir", skillary: "Assessment dengan batas kelulusan" },
  { aspect: "Sertifikat", conv: "Formalitas tanpa verifikasi", skillary: "Digital resmi + ID terverifikasi" },
  { aspect: "Laporan hasil", conv: "Manual, berhari-hari", skillary: "Otomatis, real-time per batch" },
  { aspect: "Dokumentasi", conv: "Tercecer, sulit dilacak", skillary: "Terpusat di platform" },
  { aspect: "Tindak lanjut", conv: "Berhenti setelah sesi", skillary: "Progress & path berkelanjutan" },
];

const STEPS = [
  { step: "01", title: "Konsultasi", desc: "Diskusikan kebutuhan, gap kompetensi, dan tujuan pelatihan tim Anda." },
  { step: "02", title: "Program Disusun", desc: "Kami rancang kurikulum, assessment, dan jadwal sesuai konteks organisasi." },
  { step: "03", title: "Peserta Belajar", desc: "Tim mengikuti materi & assessment melalui platform, terpantau penuh." },
  { step: "04", title: "Laporan + Sertifikat", desc: "Laporan peserta otomatis dan sertifikat digital resmi diterbitkan." },
];

const PERSONAS = [
  { title: "Perusahaan", desc: "Tingkatkan kompetensi karyawan lintas divisi dengan program terukur.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
  { title: "Instansi Pemerintah", desc: "Pelatihan ASN & aparatur dengan dokumentasi dan sertifikat yang rapi.", icon: "M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11m16-11v11M8 14v3m4-3v3m4-3v3" },
  { title: "Kampus", desc: "Bekali mahasiswa & alumni dengan sertifikasi skill siap kerja.", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" },
  { title: "Komunitas", desc: "Jalankan program pelatihan untuk anggota dengan alur terstruktur.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
];

export default function UntukOrganisasiPage() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-16 pb-16 px-5 md:px-6 lg:px-8 relative overflow-hidden" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(circle, rgb(255,138,0) 0%, transparent 70%)" }} />
        <Container className="relative z-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full" style={{ background: "rgb(255, 244, 232)", border: "1.5px solid rgb(255, 214, 165)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgb(255, 138, 0)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgb(255, 138, 0)" }}>Solusi B2B untuk HR &amp; L&amp;D</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1] text-[#181818] mb-5">
            Platform Pelatihan In-House untuk Tim Anda
          </h1>
          <p className="text-lg text-black/60 leading-relaxed mb-8 max-w-2xl mx-auto">
            Dari kebutuhan sampai laporan peserta, Skillary handle semuanya — sehingga tim HR &amp; L&amp;D
            Anda bisa fokus pada dampak, bukan administrasi.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/v2/proposal"><GradientButton className="px-7 py-3.5">Diskusikan Kebutuhan Tim →</GradientButton></Link>
            <Link href="/v2/catalog"><GhostWarmButton className="px-7 py-3.5">Lihat Katalog Program</GhostWarmButton></Link>
          </div>
        </Container>
      </section>

      {/* ── Pain points (semantic colors) ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 bg-white">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Tantangan yang Sering Dihadapi Tim L&amp;D</h2>
            <p className="text-black/60 max-w-xl mx-auto">Tiga masalah yang membuat program pelatihan terasa sia-sia.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PAINS.map((p) => (
              <div key={p.title} className="p-7 rounded-2xl" style={{ background: "rgb(254, 242, 242)", border: "1.5px solid rgb(254, 202, 202)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "white", color: "rgb(220, 38, 38)", border: "1.5px solid rgb(254, 202, 202)" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={p.icon} /></svg>
                </div>
                <h3 className="font-bold text-[#181818] mb-2">{p.title}</h3>
                <p className="text-sm text-black/55 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)", borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Yang Skillary Tangani untuk Anda</h2>
            <p className="text-black/60 max-w-xl mx-auto">Lima hal yang membuat pelatihan in-house jadi terukur dan terdokumentasi.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-7" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={f.icon} /></svg>
                </div>
                <h3 className="font-bold text-[#181818] mb-2">{f.title}</h3>
                <p className="text-sm text-black/55 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Comparison table ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 bg-white">
        <Container className="max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Training Konvensional vs Skillary</h2>
            <p className="text-black/60 max-w-xl mx-auto">Perbedaan yang terasa langsung di hasil dan dokumentasi.</p>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
            <div className="grid grid-cols-3" style={{ background: "rgb(255, 248, 241)", borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
              <div className="p-4 text-xs font-bold uppercase tracking-widest text-black/45">Aspek</div>
              <div className="p-4 text-xs font-bold uppercase tracking-widest text-black/45 text-center" style={{ borderLeft: "1.5px solid rgb(240, 217, 200)" }}>Konvensional</div>
              <div className="p-4 text-xs font-bold uppercase tracking-widest text-center text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>Skillary</div>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={row.aspect} className="grid grid-cols-3 text-sm" style={{ borderTop: i === 0 ? "none" : "1px solid rgb(240, 217, 200)", background: i % 2 === 0 ? "white" : "rgb(255, 251, 245)" }}>
                <div className="p-4 font-semibold text-[#181818]">{row.aspect}</div>
                <div className="p-4 text-black/55 flex items-center gap-2" style={{ borderLeft: "1.5px solid rgb(240, 217, 200)" }}>
                  <svg className="w-4 h-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  {row.conv}
                </div>
                <div className="p-4 font-medium text-[#181818] flex items-center gap-2" style={{ borderLeft: "1.5px solid rgb(240, 217, 200)", background: "rgb(255, 251, 245)" }}>
                  <svg className="w-4 h-4 shrink-0" style={{ color: "rgb(5,150,105)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  {row.skillary}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Workflow ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)", borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Bagaimana Cara Kerjanya</h2>
            <p className="text-black/60 max-w-xl mx-auto">Empat langkah dari kebutuhan hingga laporan.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 relative" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="text-3xl font-extrabold mb-3" style={{ color: "rgb(255, 138, 0)" }}>{s.step}</div>
                <h3 className="font-bold text-[#181818] text-sm mb-2">{s.title}</h3>
                <p className="text-xs text-black/55 leading-relaxed">{s.desc}</p>
                {i < STEPS.length - 1 && (
                  <svg className="hidden lg:block absolute top-1/2 -right-3.5 w-5 h-5 text-[rgb(255,138,0)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                )}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Personas ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 bg-white">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Untuk Siapa Skillary?</h2>
            <p className="text-black/60 max-w-xl mx-auto">Solusi yang sudah dipercaya berbagai jenis organisasi.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERSONAS.map((p) => (
              <div key={p.title} className="p-7 rounded-2xl text-center" style={{ background: "rgb(255, 251, 245)", border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)" }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={p.icon} /></svg>
                </div>
                <h3 className="font-bold text-[#181818] mb-2">{p.title}</h3>
                <p className="text-sm text-black/55 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 text-center" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)" }}>
        <Container className="max-w-2xl">
          <div className="bg-white rounded-3xl p-10 shadow-sm" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
            <h2 className="text-2xl font-bold tracking-tight text-[#181818] mb-3">Siap Membuat Pelatihan Tim Lebih Terukur?</h2>
            <p className="text-base text-black/60 mb-8 leading-relaxed">Konsultasi gratis dengan tim kami — respon dalam 1 hari kerja. Kami bantu rancang program yang sesuai kebutuhan organisasi Anda.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/v2/proposal"><GradientButton className="px-7 py-3.5 text-sm">Diskusikan Kebutuhan Training →</GradientButton></Link>
              <Link href="/v2/portfolio"><GhostWarmButton className="px-7 py-3.5 text-sm">Lihat Portofolio Klien</GhostWarmButton></Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
