"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { whatsappLink, EMAIL_GENERAL } from "@/data/config";

const PROBLEMS = [
  {
    title: "Tidak ada laporan peserta",
    desc: "HR tidak tahu siapa yang hadir, siapa yang lulus, dan siapa yang perlu pelatihan ulang.",
    color: "rgb(220, 38, 38)",
    bg: "rgb(254, 242, 242)",
    icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    title: "Sertifikat tidak terasa resmi",
    desc: "Peserta tidak mau menyimpannya — tidak ada nilai tambah untuk CV atau jenjang karier mereka.",
    color: "rgb(217, 119, 6)",
    bg: "rgb(255, 251, 235)",
    icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
  },
  {
    title: "Tidak bisa diulang dengan mudah",
    desc: "Setiap batch baru mulai dari nol lagi — materi, alur, dan administrasi disusun ulang setiap kali.",
    color: "rgb(180, 83, 9)",
    bg: "rgb(255, 247, 237)",
    icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
  },
];

const SOLUTIONS = [
  "Peserta belajar lewat platform, progress tercatat otomatis",
  "Sertifikat digital resmi yang bisa diverifikasi",
  "Laporan kehadiran dan nilai tersedia setelah batch selesai",
];

const TOPICS = [
  "Data Analytics & Power BI",
  "Presentasi Bisnis",
  "AI & Produktivitas",
  "Leadership & Problem Solving",
  "SOP & Proses",
  "Lainnya",
];

const PARTICIPANT_RANGES = ["<10", "10–30", "30–50", "50–100", ">100"];


const WA_MESSAGE = "Halo Skillary, saya ingin konsultasi program pelatihan untuk organisasi saya.";

export default function TrainingOrganisasiLpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const whatsapp = String(fd.get("whatsapp") || "");
    const organization = String(fd.get("organization") || "");
    const topic = String(fd.get("topic") || "");
    const participants = String(fd.get("participants") || "");

    // This form intentionally has no email field (WhatsApp converts better
    // for Indonesian B2B traffic). The shared /api/leads schema requires a
    // valid email, so we derive a non-deliverable placeholder from the
    // WhatsApp number purely to satisfy validation — lead notifications are
    // sent to the internal admin address, never to this placeholder.
    const waDigits = whatsapp.replace(/\D/g, "") || "0000000000";
    const placeholderEmail = `wa${waDigits}@lead.skillary.my.id`;

    const message = `Jumlah peserta: ${participants}. ${name} dari ${organization} tertarik: ${topic}`;

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: placeholderEmail,
          whatsapp,
          organization,
          inquiryType: "Meta Ads — Training Organisasi",
          programInterest: topic,
          sourcePage: "/lp/training-organisasi",
          message,
          _honeypot: fd.get("_honeypot") || "",
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim. Coba lagi.");
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* ── Section 1: Minimal top bar ── */}
      <header className="py-4 px-5 md:px-8">
        <Logo />
      </header>

      {/* ── Section 2: Hero ── */}
      <section className="px-5 md:px-8 pt-4 pb-10 relative overflow-hidden">
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, rgb(255,138,0) 0%, transparent 70%)" }}
        />
        <div className="relative max-w-xl mx-auto text-center">
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#0F172A] leading-[1.2] mb-4">
            Pelatihan Tim Sudah Jalan — Tapi Hasilnya Tidak Terukur?
          </h1>
          <p className="text-base text-[#475569] leading-relaxed mb-6">
            Banyak organisasi rutin mengadakan training, tapi tidak punya data peserta, laporan kehadiran, atau sertifikat resmi yang bisa dipertanggungjawabkan.
          </p>

          {/* Social proof strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-7">
            <span className="text-xs font-semibold text-[#94A3B8] mr-1">Pengalaman lintas sektor:</span>
            {["Perbankan", "Regulator", "FMCG", "Energi"].map((c) => (
              <span
                key={c}
                className="text-xs font-bold px-3 py-1.5 rounded-full"
                style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)", border: "1.5px solid rgb(255, 214, 165)" }}
              >
                {c}
              </span>
            ))}
          </div>

          <a
            href="#form-konsultasi"
            className="inline-flex items-center gap-2 text-white text-sm font-bold px-7 py-4 rounded-full shadow-md hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
            style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
          >
            Konsultasikan Kebutuhan Training →
          </a>
        </div>
      </section>

      {/* ── Section 3: Problems ── */}
      <section className="px-5 md:px-8 py-10" style={{ background: "rgb(250, 250, 250)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] text-center mb-7">
            Ini yang Biasanya Terjadi
          </h2>
          <div className="space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-5 border" style={{ borderColor: "rgb(229, 231, 235)" }}>
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: p.bg, color: p.color }}
                >
                  <svg className="w-5.5 h-5.5" style={{ width: 22, height: 22 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={p.icon} />
                  </svg>
                </div>
                <h3 className="font-bold text-[#0F172A] text-sm mb-1.5">{p.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Solution ── */}
      <section className="px-5 md:px-8 py-10 bg-white">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[#0F172A] mb-6">
            Skillary Menangani Itu Semua
          </h2>
          <div className="space-y-3.5 mb-6 text-left">
            {SOLUTIONS.map((s) => (
              <div key={s} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "rgb(255, 251, 245)", border: "1.5px solid rgb(240, 217, 200)" }}>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-white"
                  style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-[#334155] leading-relaxed pt-0.5">{s}</p>
              </div>
            ))}
          </div>
          <p className="text-sm font-semibold text-[#64748B]">
            Sudah digunakan oleh 21+ organisasi dari perbankan, regulasi, hingga manufaktur.
          </p>
        </div>
      </section>

      {/* ── Section 5: Form + WA ── */}
      <section id="form-konsultasi" className="px-5 md:px-8 py-12" style={{ background: "rgb(255, 248, 241)" }}>
        <div className="max-w-4xl mx-auto grid lg:grid-cols-5 gap-8 items-start">
          {/* Form column */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 md:p-8" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
            {!submitted ? (
              <>
                <h2 className="text-xl font-bold text-[#0F172A] mb-1">Minta Konsultasi Gratis</h2>
                <p className="text-sm text-[#64748B] mb-6">Isi form di bawah, tim kami hubungi dalam 1 hari kerja.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot — hidden from humans, catches bots */}
                  <input type="text" name="_honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] w-px h-px opacity-0" />

                  <Field label="Nama lengkap" name="name" placeholder="Nama Anda" type="text" required />
                  <Field label="Nomor WhatsApp" name="whatsapp" placeholder="08xxxxxxxxxx" type="tel" required />
                  <Field label="Nama organisasi" name="organization" placeholder="PT / Instansi" type="text" required />

                  <div>
                    <label className="block text-sm font-semibold text-[#334155] mb-1.5">Topik pelatihan yang dibutuhkan</label>
                    <select name="topic" required defaultValue="" className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] bg-white focus:outline-none focus:ring-2" style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }}>
                      <option value="" disabled>Pilih topik</option>
                      {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-[#334155] mb-1.5">Jumlah peserta</label>
                    <select name="participants" required defaultValue="" className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] bg-white focus:outline-none focus:ring-2" style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }}>
                      <option value="" disabled>Pilih jumlah</option>
                      {PARTICIPANT_RANGES.map((r) => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  {error && (
                    <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl text-sm" style={{ background: "rgb(254, 242, 242)", border: "1.5px solid rgb(252, 165, 165)", color: "rgb(185, 28, 28)" }} role="alert">
                      <svg className="w-5 h-5 shrink-0 mt-px" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      <span className="font-medium">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-white text-sm font-bold py-4 rounded-xl shadow-md transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
                  >
                    {isLoading ? "Mengirim..." : "Minta Konsultasi Gratis →"}
                  </button>
                </form>

                {/* WA backup */}
                <div className="mt-6 pt-6 text-center" style={{ borderTop: "1px solid rgb(240, 217, 200)" }}>
                  <p className="text-xs text-[#64748B] mb-3">Atau langsung chat via WhatsApp:</p>
                  <a
                    href={whatsappLink(WA_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full transition-colors hover:bg-green-50 w-full sm:w-auto justify-center"
                    style={{ border: "1.5px solid rgb(34, 197, 94)", color: "rgb(21, 128, 61)" }}
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.488-1.087z" /></svg>
                    Chat via WhatsApp
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgb(209, 250, 229)", color: "rgb(5, 150, 105)" }}>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Permintaan Terkirim!</h3>
                <p className="text-sm text-[#64748B] max-w-sm mx-auto mb-6">Terima kasih. Tim Skillary akan menghubungi Anda dalam 1 hari kerja.</p>
                <a
                  href={whatsappLink(WA_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full transition-colors hover:bg-green-50"
                  style={{ border: "1.5px solid rgb(34, 197, 94)", color: "rgb(21, 128, 61)" }}
                >
                  Atau chat kami sekarang via WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* Info column — desktop only */}
          <div className="hidden lg:block lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl p-6" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
              <h3 className="font-bold text-[#0F172A] mb-4 text-sm">Kenapa konsultasi dengan Skillary?</h3>
              <div className="space-y-3.5">
                {[
                  "Konsultasi 100% gratis, tanpa komitmen",
                  "Program dapat disesuaikan dengan kebutuhan dan budget",
                  "Respon dalam 1 hari kerja",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-2.5">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "rgb(255, 138, 0)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    <p className="text-sm text-[#334155] leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
              <h3 className="font-bold text-[#0F172A] mb-3 text-sm">Yang akan dibahas dalam konsultasi</h3>
              <p className="text-sm text-[#334155] leading-relaxed">
                Tim Skillary akan mengonfirmasi tujuan, peserta, format, trainer, materi, evaluasi, dan keluaran program sebelum proposal diterbitkan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lg:hidden px-5 md:px-8 py-10 bg-white">
        <div className="max-w-xl mx-auto rounded-2xl p-5" style={{ background: "rgb(255, 251, 245)", border: "1.5px solid rgb(240, 217, 200)" }}>
          <h3 className="text-sm font-bold text-[#0F172A] mb-2">Proposal berdasarkan kebutuhan nyata</h3>
          <p className="text-sm text-[#334155] leading-relaxed">
            Jadwal, trainer, harga, format evaluasi, dan ketentuan sertifikat akan dikonfirmasi sebelum program dibuka.
          </p>
        </div>
      </section>

      {/* ── Section 7: Minimal footer ── */}
      <footer className="px-5 md:px-8 py-8 text-center" style={{ borderTop: "1px solid rgb(240, 217, 200)" }}>
        <div className="flex justify-center mb-3">
          <Logo />
        </div>
        <p className="text-xs text-[#94A3B8]">© 2026 PT Skillary Generasi Cerdas</p>
        <p className="text-xs text-[#94A3B8] mt-1">{EMAIL_GENERAL}</p>
      </footer>
    </div>
  );
}

function Field({ label, name, placeholder, type, required }: { label: string; name: string; placeholder: string; type: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#334155] mb-1.5">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2"
        style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }}
      />
    </div>
  );
}
