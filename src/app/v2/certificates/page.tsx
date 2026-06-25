import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GradientButton, GhostWarmButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sertifikat Resmi Skillary",
  description: "Sertifikat Skillary diterbitkan berdasarkan penyelesaian pembelajaran dan assessment — dapat diverifikasi online dengan ID unik.",
  robots: { index: false, follow: false },
};

const CERT_TYPES = [
  {
    name: "Sertifikat Kelulusan",
    tag: "Inklusif",
    tagBg: "rgb(209, 250, 229)",
    tagColor: "rgb(5, 150, 105)",
    price: "Gratis",
    desc: "Diterbitkan otomatis saat peserta menyelesaikan seluruh materi kursus dan lulus assessment.",
    features: ["Termasuk dalam setiap program", "Verification ID unik", "Dapat diunduh PDF"],
  },
  {
    name: "Sertifikat Digital Berbayar",
    tag: "Verifiable",
    tagBg: "rgb(255, 244, 232)",
    tagColor: "rgb(255, 138, 0)",
    price: "Opsional",
    desc: "Sertifikat dengan e-badge yang dapat diverifikasi pihak ketiga dan dibagikan di LinkedIn.",
    features: ["E-badge verifiable online", "Halaman verifikasi publik", "Cocok untuk portfolio profesional"],
    featured: true,
  },
  {
    name: "Sertifikat Batch Organisasi",
    tag: "B2B",
    tagBg: "rgb(219, 234, 254)",
    tagColor: "rgb(37, 99, 235)",
    price: "Custom",
    desc: "Sertifikat branded untuk program pelatihan internal — bisa memuat logo dan format organisasi.",
    features: ["Branding organisasi Anda", "Rekap peserta & laporan batch", "Format & kriteria kustom"],
  },
];

const STEPS = [
  { step: "01", title: "Daftar Program", desc: "Peserta terdaftar di program melalui platform atau batch organisasi." },
  { step: "02", title: "Selesaikan Kursus", desc: "Mengikuti seluruh materi pembelajaran hingga tuntas." },
  { step: "03", title: "Lulus Assessment", desc: "Mencapai batas kelulusan assessment yang ditentukan program." },
  { step: "04", title: "Klaim Sertifikat", desc: "Sertifikat digital terbit otomatis dengan ID yang dapat diverifikasi." },
];

const FAQ = [
  { q: "Apakah sertifikat Skillary diakui?", a: "Sertifikat diterbitkan berdasarkan penyelesaian pembelajaran dan assessment terukur. Untuk skema kompetensi standar (ISO, K3, BNSP), tersedia jalur sertifikasi badge melalui partner lembaga sertifikasi." },
  { q: "Bagaimana cara memverifikasi sertifikat?", a: "Setiap sertifikat memiliki Verification ID unik. Pihak ketiga dapat memverifikasi keasliannya melalui halaman verifikasi publik Skillary dengan memasukkan ID tersebut." },
  { q: "Apakah peserta wajib membayar untuk sertifikat?", a: "Tidak. Sertifikat Kelulusan sudah inklusif di setiap program. Sertifikat Digital Berbayar dengan e-badge bersifat opsional untuk yang membutuhkan kredensial verifiable tambahan." },
  { q: "Bisakah sertifikat memuat logo organisasi kami?", a: "Bisa. Sertifikat Batch Organisasi dapat di-branding dengan logo dan format sesuai standar organisasi Anda. Diskusikan kebutuhannya melalui tim kami." },
];

export default function CertificatesV2Page() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-16 pb-16 px-5 md:px-6 lg:px-8 relative overflow-hidden" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full blur-3xl opacity-30 pointer-events-none" style={{ background: "rgba(255,138,0,0.12)" }} />
        <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full blur-3xl opacity-20 pointer-events-none" style={{ background: "rgba(255,90,95,0.10)" }} />
        <Container className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full" style={{ background: "rgb(255, 244, 232)", border: "1.5px solid rgb(255, 214, 165)" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgb(255, 138, 0)" }} />
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgb(255, 138, 0)" }}>Dokumen Resmi & Terverifikasi</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1] text-[#181818] mb-5">
                Sertifikat Resmi Skillary
              </h1>
              <p className="text-lg text-black/60 leading-relaxed mb-8 max-w-lg">
                Bukan sekadar bukti kehadiran. Sertifikat Skillary diterbitkan berdasarkan penyelesaian
                pembelajaran dan assessment — setiap dokumen dapat diverifikasi online dengan ID unik.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/proposal"><GradientButton className="px-7 py-3.5">Sertifikat untuk Organisasi →</GradientButton></Link>
                <Link href="/v2/catalog"><GhostWarmButton className="px-7 py-3.5">Jelajahi Program</GhostWarmButton></Link>
              </div>
            </div>

            {/* SVG certificate mockup */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="lg:rotate-2">
                <CertificateMockup />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── 3 types ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 bg-white">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Tiga Jenis Sertifikat</h2>
            <p className="text-black/60 max-w-xl mx-auto">Disesuaikan dengan kebutuhan individu maupun organisasi.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {CERT_TYPES.map((c) => (
              <div
                key={c.name}
                className="rounded-2xl p-7 flex flex-col bg-white transition-all hover:-translate-y-1 hover:shadow-lg relative"
                style={{ border: c.featured ? "2px solid rgb(255, 138, 0)" : "1.5px solid rgb(240, 217, 200)" }}
              >
                {c.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                    PALING POPULER
                  </span>
                )}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" style={{ background: c.tagBg, color: c.tagColor }}>{c.tag}</span>
                  <span className="text-sm font-bold text-[#181818]">{c.price}</span>
                </div>
                <h3 className="font-bold text-lg text-[#181818] mb-2">{c.name}</h3>
                <p className="text-sm text-black/55 leading-relaxed mb-5 flex-1">{c.desc}</p>
                <ul className="space-y-2.5">
                  {c.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <span className="h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "rgb(209, 250, 229)", color: "rgb(5, 150, 105)" }}>✓</span>
                      <span className="text-sm text-[#334155]">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── How to earn ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)", borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Cara Mendapatkan Sertifikat</h2>
            <p className="text-black/60 max-w-xl mx-auto">Alur otomatis yang sama untuk semua program — terdokumentasi penuh di platform.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((s, i) => (
              <div key={s.step} className="bg-white rounded-2xl p-6 shadow-sm relative" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
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

      {/* ── FAQ ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 bg-white">
        <Container className="max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Pertanyaan Umum</h2>
          </div>
          <div className="space-y-4">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-2xl bg-white overflow-hidden" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 list-none">
                  <span className="font-semibold text-[#181818] text-sm pr-4">{item.q}</span>
                  <svg className="w-5 h-5 text-[rgb(255,138,0)] shrink-0 transition-transform group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                </summary>
                <p className="px-6 pb-5 text-sm text-black/60 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 text-center" style={{ borderTop: "1.5px solid rgb(240, 217, 200)" }}>
        <Container className="max-w-2xl">
          <div className="bg-white rounded-3xl p-10 shadow-sm" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
            <h2 className="text-2xl font-bold tracking-tight text-[#181818] mb-3">Ingin Sertifikat untuk Program Internal Anda?</h2>
            <p className="text-base text-black/60 mb-8 leading-relaxed">Kami membantu menyusun alur assessment, kriteria kelulusan, format sertifikat digital, dan laporan peserta sesuai kebutuhan organisasi.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/proposal"><GradientButton className="px-7 py-3.5 text-sm">Diskusikan Sertifikat B2B →</GradientButton></Link>
              <Link href="/program-catalog"><GhostWarmButton className="px-7 py-3.5 text-sm">Sertifikat Individual</GhostWarmButton></Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}

// ─── SVG/HTML certificate mockup (no image) ───────────────────────────
function CertificateMockup() {
  return (
    <div className="relative bg-[#FFFDF9] rounded-2xl shadow-2xl p-3" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider shadow-sm z-20" style={{ background: "rgb(255, 244, 232)", color: "rgb(180, 100, 0)", border: "1px solid rgb(255, 214, 165)" }}>
        ILUSTRASI DESAIN SERTIFIKAT
      </div>
      <div className="p-7 bg-white rounded-xl" style={{ border: "5px double rgb(255, 138, 0)" }}>
        {/* Header: brand + verification id */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
              <span className="text-white font-black text-xs">S</span>
            </div>
            <span className="text-base font-extrabold tracking-tight text-[#181818]">Skillary</span>
          </div>
          <div className="text-right">
            <div className="text-[8px] uppercase tracking-widest text-black/40 font-bold mb-0.5">Verification ID</div>
            <div className="font-mono text-[10px] font-bold text-[#181818] px-1.5 py-0.5 rounded inline-block" style={{ background: "rgb(255, 244, 232)" }}>SK-8849201A</div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-serif text-2xl font-bold mb-1" style={{ color: "rgb(255, 138, 0)" }}>Certificate</h3>
          <p className="text-black/40 tracking-[0.2em] uppercase text-[8px] font-bold mb-5">Of Completion</p>
          <p className="text-[10px] text-black/50 mb-1">Diberikan kepada</p>
          <p className="font-serif text-xl text-[#181818] inline-block pb-1.5 px-6 mb-4" style={{ borderBottom: "1px solid rgb(240, 217, 200)" }}>
            Nama Peserta
          </p>
          <p className="text-[10px] text-black/55 mb-1">atas penyelesaian dan kelulusan assessment program</p>
          <p className="font-bold text-sm mb-6 text-[#181818]">Business Presentation &amp; Reporting</p>
        </div>

        {/* Footer: date + signature + QR */}
        <div className="flex justify-between items-end pt-3" style={{ borderTop: "1px solid rgb(240, 217, 200)" }}>
          <div className="text-left">
            <p className="text-[8px] text-black/40 font-bold uppercase tracking-widest">Tanggal Terbit</p>
            <p className="text-[10px] font-bold mt-0.5 text-[#181818]">25 Juni 2026</p>
          </div>
          <div className="text-center">
            <svg className="w-14 h-6 mx-auto" viewBox="0 0 80 30" fill="none">
              <path d="M2 22 Q10 4 18 18 T34 16 Q42 6 50 20 T66 14 Q72 10 78 18" stroke="rgb(255,138,0)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-[8px] text-black/40 font-bold uppercase tracking-widest mt-0.5 pt-1" style={{ borderTop: "1px solid rgb(240, 217, 200)" }}>Authorized Signature</p>
          </div>
          {/* QR placeholder */}
          <div className="w-11 h-11 p-1 rounded" style={{ background: "white", border: "1px solid rgb(240, 217, 200)" }}>
            <svg viewBox="0 0 100 100" className="w-full h-full" shapeRendering="crispEdges">
              <rect width="100" height="100" fill="white" />
              <g fill="#181818">
                <rect x="8" y="8" width="26" height="26" /><rect x="14" y="14" width="14" height="14" fill="white" /><rect x="18" y="18" width="6" height="6" fill="#181818" />
                <rect x="66" y="8" width="26" height="26" /><rect x="72" y="14" width="14" height="14" fill="white" /><rect x="76" y="18" width="6" height="6" fill="#181818" />
                <rect x="8" y="66" width="26" height="26" /><rect x="14" y="72" width="14" height="14" fill="white" /><rect x="18" y="76" width="6" height="6" fill="#181818" />
                <rect x="44" y="8" width="6" height="6" /><rect x="56" y="8" width="6" height="6" /><rect x="44" y="20" width="6" height="6" /><rect x="8" y="44" width="6" height="6" /><rect x="20" y="44" width="6" height="6" /><rect x="44" y="44" width="6" height="6" /><rect x="56" y="56" width="6" height="6" /><rect x="68" y="44" width="6" height="6" /><rect x="80" y="56" width="6" height="6" /><rect x="44" y="68" width="6" height="6" /><rect x="68" y="68" width="6" height="6" /><rect x="80" y="80" width="6" height="6" /><rect x="56" y="80" width="6" height="6" />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
