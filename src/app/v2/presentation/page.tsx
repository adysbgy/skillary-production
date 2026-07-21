import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GradientButton, GhostWarmButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Business Presentation & Storytelling Training — Skillary",
  description: "Program pelatihan presentasi bisnis dan business storytelling untuk manajer, konsultan, dan tim profesional.",
};

const PAINS = [
  { title: "Slide penuh teks", desc: "Audiens membaca slide, bukan mendengarkan Anda. Pesan utama tenggelam." },
  { title: "Tidak ada alur cerita", desc: "Data dilempar tanpa narasi — sulit diingat dan tidak menggerakkan keputusan." },
  { title: "Delivery kaku", desc: "Gugup, monoton, dan kehilangan perhatian ruangan dalam 2 menit pertama." },
];

const LEARN = [
  { title: "Struktur Cerita", desc: "Kerangka naratif yang mengubah laporan menjadi cerita yang persuasif dan mudah diingat.", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
  { title: "Desain Slide Profesional", desc: "Prinsip visual hierarchy, tipografi, dan layout untuk slide yang bersih dan kredibel.", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
  { title: "Teknik Delivery", desc: "Mengelola bahasa tubuh, suara, dan interaksi audiens agar percaya diri di atas panggung.", icon: "M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" },
  { title: "Data Storytelling", desc: "Menyederhanakan data kompleks menjadi grafik dan pesan yang langsung dimengerti.", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
];

const AUDIENCE = ["Manajer & Team Lead", "Tim Sales & Business Development", "Konsultan & Analis", "Tim L&D & Trainer Internal"];

const VARIANTS = [
  { name: "Half-day Workshop", duration: "4 jam", desc: "Sesi intensif fundamental presentasi untuk tim kecil atau pengenalan cepat.", points: ["Struktur cerita esensial", "Tips desain slide cepat", "Latihan singkat"], featured: false },
  { name: "Full-day Intensif", duration: "8 jam", desc: "Pendalaman lengkap dengan praktik delivery dan feedback langsung dari fasilitator.", points: ["Seluruh modul cerita & desain", "Praktik delivery + rekaman", "Feedback personal per peserta", "Sertifikat kelulusan"], featured: true },
  { name: "In-house Custom", duration: "Fleksibel", desc: "Dirancang khusus dengan studi kasus dan materi presentasi internal organisasi Anda.", points: ["Materi disesuaikan industri", "Studi kasus internal", "Jadwal & lokasi fleksibel", "Laporan hasil peserta"], featured: false },
];

export default function PresentationPage() {
  return (
    <div className="bg-[#FFFDF9] min-h-screen">
      {/* ── Hero ── */}
      <section className="pt-16 pb-16 px-5 md:px-6 lg:px-8 relative overflow-hidden" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(circle, rgb(255,138,0) 0%, transparent 70%)" }} />
        <Container className="relative z-10 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full" style={{ background: "rgb(255, 244, 232)", border: "1.5px solid rgb(255, 214, 165)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgb(255, 138, 0)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgb(255, 138, 0)" }}>Program Presentasi & Storytelling</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.1] text-[#181818] mb-5">
            Presentasi yang Meyakinkan, Bukan Membosankan
          </h1>
          <p className="text-lg text-black/60 leading-relaxed mb-8 max-w-2xl mx-auto">
            Ubah slide penuh teks dan laporan datar menjadi presentasi yang punya alur cerita, desain
            bersih, dan delivery yang percaya diri — menggerakkan keputusan, bukan sekadar menginformasikan.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact"><GradientButton className="px-7 py-3.5">Diskusikan untuk Tim Anda →</GradientButton></Link>
            <Link href="#variants"><GhostWarmButton className="px-7 py-3.5">Lihat Pilihan Program</GhostWarmButton></Link>
          </div>
        </Container>
      </section>

      {/* ── Pain points ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 bg-white">
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Kenapa Presentasi Sering Gagal?</h2>
            <p className="text-black/60 max-w-xl mx-auto">Tiga masalah yang paling sering membuat audiens kehilangan minat.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {PAINS.map((p) => (
              <div key={p.title} className="p-7 rounded-2xl" style={{ background: "rgb(254, 242, 242)", border: "1.5px solid rgb(254, 202, 202)" }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "white", color: "rgb(220, 38, 38)", border: "1.5px solid rgb(254, 202, 202)" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
                <h3 className="font-bold text-[#181818] mb-2">{p.title}</h3>
                <p className="text-sm text-black/55 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What you learn ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)", borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Yang Akan Dipelajari</h2>
            <p className="text-black/60 max-w-xl mx-auto">Empat pilar yang membentuk presenter yang efektif.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {LEARN.map((l) => (
              <div key={l.title} className="flex gap-5 p-7 rounded-2xl bg-white" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={l.icon} /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-[#181818] mb-2">{l.title}</h3>
                  <p className="text-sm text-black/55 leading-relaxed">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Audience ── */}
      <section className="py-16 px-5 md:px-6 lg:px-8 bg-white">
        <Container className="max-w-4xl text-center">
          <h2 className="text-2xl font-bold text-[#181818] mb-8">Untuk Siapa Program Ini?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AUDIENCE.map((a) => (
              <div key={a} className="p-5 rounded-2xl flex flex-col items-center gap-3" style={{ background: "rgb(255, 251, 245)", border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <span className="text-sm font-semibold text-[#334155]">{a}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Variants ── */}
      <section id="variants" className="py-20 px-5 md:px-6 lg:px-8" style={{ background: "rgb(255, 248, 241)", borderTop: "1.5px solid rgb(240, 217, 200)" }}>
        <Container>
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-[#181818] mb-3">Pilihan Format Program</h2>
            <p className="text-black/60 max-w-xl mx-auto">Dari workshop singkat hingga program in-house yang sepenuhnya disesuaikan.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {VARIANTS.map((v) => (
              <div
                key={v.name}
                className="rounded-2xl p-7 bg-white flex flex-col relative transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ border: v.featured ? "2px solid rgb(255, 138, 0)" : "1.5px solid rgb(240, 217, 200)" }}
              >
                {v.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-wider px-3 py-1 rounded-full text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                    PALING DIMINATI
                  </span>
                )}
                <span className="text-[11px] font-bold uppercase tracking-widest text-black/45 mb-2">{v.duration}</span>
                <h3 className="font-bold text-lg text-[#181818] mb-2">{v.name}</h3>
                <p className="text-sm text-black/55 leading-relaxed mb-5">{v.desc}</p>
                <ul className="space-y-2.5 mb-7 flex-1">
                  {v.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5">
                      <span className="h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: "rgb(209, 250, 229)", color: "rgb(5, 150, 105)" }}>✓</span>
                      <span className="text-sm text-[#334155]">{pt}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="block w-full text-center text-sm font-bold py-3 rounded-xl transition-all hover:opacity-90"
                  style={v.featured
                    ? { background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))", color: "white" }
                    : { background: "rgb(255,244,232)", color: "rgb(255,138,0)", border: "1.5px solid rgb(255,214,165)" }}
                >
                  Diskusikan Program
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Social proof ── */}
      <section className="py-16 px-5 md:px-6 lg:px-8 bg-white">
        <Container className="max-w-3xl">
          <div className="rounded-2xl p-8 md:p-10 text-center" style={{ background: "rgb(255, 251, 245)", border: "1.5px solid rgb(240, 217, 200)" }}>
            <div className="flex justify-center gap-1 mb-5">
              {[1, 2, 3, 4, 5].map((n) => (
                <svg key={n} className="w-5 h-5" fill="rgb(255,138,0)" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
              ))}
            </div>
            <p className="text-lg md:text-xl text-[#181818] font-medium leading-relaxed mb-6">
              “Setelah workshop ini, tim sales kami menyusun pitch yang jauh lebih ringkas dan meyakinkan.
              Slide tidak lagi penuh teks, dan presentasi terasa seperti cerita yang mengalir.”
            </p>
            <div className="flex items-center justify-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>R</div>
              <div className="text-left">
                <p className="text-sm font-bold text-[#181818]">Head of Sales</p>
                <p className="text-xs text-black/50">Perusahaan FMCG Nasional</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-5 md:px-6 lg:px-8 text-center" style={{ borderTop: "1.5px solid rgb(240, 217, 200)" }}>
        <Container className="max-w-2xl">
          <div className="bg-white rounded-3xl p-10 shadow-sm" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
            <h2 className="text-2xl font-bold tracking-tight text-[#181818] mb-3">Siap Membuat Tim Anda Lebih Meyakinkan?</h2>
            <p className="text-base text-black/60 mb-8 leading-relaxed">Diskusikan kebutuhan tim Anda — kami bantu rancang program presentasi yang sesuai industri, level, dan tujuan organisasi.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact"><GradientButton className="px-7 py-3.5 text-sm">Diskusikan Program Presentasi →</GradientButton></Link>
              <Link href="/programs"><GhostWarmButton className="px-7 py-3.5 text-sm">Lihat Program Lain</GhostWarmButton></Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
