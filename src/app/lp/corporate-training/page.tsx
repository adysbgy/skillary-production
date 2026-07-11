"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface FormState {
  nama: string;
  perusahaan: string;
  jabatan: string;
  whatsapp: string;
  email: string;
  kebutuhan: string;
  peserta: string;
  _honeypot: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

// ─────────────────────────────────────────────
// ICONS  (outline 2px)
// ─────────────────────────────────────────────
const IconDatabase = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7c0-1.657 3.582-3 8-3s8 1.343 8 3M4 7v5c0 1.657 3.582 3 8 3s8-1.343 8-3V7M4 7c0 1.657 3.582 3 8 3s8-1.343 8-3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 12v5c0 1.657 3.582 3 8 3s8-1.343 8-3v-5" />
  </svg>
);
const IconCertificate = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
  </svg>
);
const IconReport = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);
const IconPortfolio = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
);
const IconCheck = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`${className} shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);
const IconChevron = ({ open }: { open: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`w-5 h-5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

// ─────────────────────────────────────────────
// BUTTON PRIMITIVES
// ─────────────────────────────────────────────
type BtnSize = "sm" | "md" | "lg";
const BTN_SIZES: Record<BtnSize, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-8 py-4 text-base",
};
const GRADIENT = "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))";

function CTAButton({
  children, onClick, href, size = "md", className = "", type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  size?: BtnSize;
  className?: string;
  type?: "button" | "submit";
}) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-bold text-white shadow-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 ${BTN_SIZES[size]} ${className}`;
  if (href) return <Link href={href} className={base} style={{ background: GRADIENT }}>{children}</Link>;
  return <button type={type} onClick={onClick} className={base} style={{ background: GRADIENT }}>{children}</button>;
}

function SecondaryButton({
  children, href, onClick, size = "md", className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  size?: BtnSize;
  className?: string;
}) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 border ${BTN_SIZES[size]} ${className}`;
  const style = { borderColor: "rgb(240,217,200)", color: "#334155", background: "#fff" };
  if (href) return <Link href={href} className={base} style={style}>{children}</Link>;
  return <button type="button" onClick={onClick} className={base} style={style}>{children}</button>;
}

// ─────────────────────────────────────────────
// COMPACT LANDING HEADER
// ─────────────────────────────────────────────
function LPHeader({ onCTAClick }: { onCTAClick: () => void }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#F0D9C8]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="shrink-0" aria-label="Skillary beranda">
          <Image src="/logo.png" alt="Skillary" width={120} height={36} className="h-8 w-auto object-contain" priority />
        </Link>

        {/* Trust Badges — hide on small mobile */}
        <div className="hidden md:flex items-center gap-2" aria-hidden="true">
          {["Sertifikat Digital", "Training Report", "Dokumentasi Event"].map((badge) => (
            <span key={badge} className="text-[10px] font-bold px-3 py-1.5 rounded-full" style={{ background: "rgb(255,244,232)", color: "rgb(180,100,0)", border: "1px solid rgb(255,214,165)" }}>
              {badge}
            </span>
          ))}
        </div>

        {/* Header CTA — scrolls to form */}
        <CTAButton size="sm" onClick={onCTAClick} aria-label="Minta Proposal Training">
          Minta Proposal
        </CTAButton>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────
// HERO VISUAL MOCKUP
// Communicates: training report, certificate, participant DB, event docs
// ─────────────────────────────────────────────
function HeroVisual() {
  return (
    <div className="flex flex-col gap-3 w-full" aria-hidden="true">
      {/* Training Report Card */}
      <div className="bg-white rounded-2xl p-5 shadow-lg border border-[#E2D4C8]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest">Training Report</p>
            <p className="text-sm font-bold text-[#0F172A] mt-0.5">Corporate Training — Jun 2025</p>
          </div>
          <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">✓ Completed</span>
        </div>
        {/* KPI Strip */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[["48", "Peserta"], ["92%", "Kehadiran"], ["4.7★", "Rating"]].map(([val, lbl]) => (
            <div key={lbl} className="bg-[#FFFDF9] rounded-xl p-3 text-center border border-[#F0D9C8]">
              <p className="text-lg font-extrabold" style={{ color: "rgb(255,138,0)" }}>{val}</p>
              <p className="text-[9px] text-[#64748B] font-semibold">{lbl}</p>
            </div>
          ))}
        </div>
        {/* Progress Bars */}
        <div className="space-y-2">
          {[["Data Literacy", 88], ["Power BI Dashboard", 76], ["Presentasi Bisnis", 93]].map(([topic, pct]) => (
            <div key={topic as string}>
              <div className="flex justify-between text-[9px] font-semibold mb-1">
                <span className="text-[#475569]">{topic}</span>
                <span style={{ color: "rgb(255,138,0)" }}>{pct}%</span>
              </div>
              <div className="h-1.5 bg-[#F0D9C8] rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: GRADIENT }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certificate + Database row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Sertifikat Digital */}
        <div className="bg-[#0F172A] rounded-2xl p-4 shadow-lg">
          <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-widest mb-3">Sertifikat Digital</p>
          <div className="space-y-2">
            {["Andi S.", "Dewi R.", "Budi W.", "Sari M."].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full shrink-0" style={{ background: GRADIENT }} />
                <span className="text-[11px] text-white font-medium flex-1 truncate">{n}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
            ))}
          </div>
        </div>

        {/* Database Peserta */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-[#E2D4C8]">
          <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-widest mb-3">Database Peserta</p>
          <div className="space-y-2.5">
            {[["Total Peserta", "48"], ["Selesai Program", "44"], ["Bersertifikat", "38"], ["Pass Assessment", "91%"]].map(([label, val]) => (
              <div key={label} className="flex justify-between items-center">
                <span className="text-[9px] text-[#64748B]">{label}</span>
                <span className="text-[10px] font-extrabold text-[#0F172A]">{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Event Documentation strip */}
      <div className="bg-[#FFFDF9] rounded-xl px-4 py-3 border border-[#E2D4C8] flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgb(255,244,232)" }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="rgb(255,138,0)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
          </div>
          <div>
            <p className="text-[9px] font-bold text-[#94A3B8] uppercase tracking-wider">Dokumentasi Event</p>
            <p className="text-[11px] font-bold text-[#0F172A]">Foto, Absensi, Feedback — Tersimpan</p>
          </div>
        </div>
        <span className="text-[9px] font-bold px-2 py-1 rounded-lg bg-green-50 text-green-700 border border-green-100">Siap Laporan</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LEAD FORM
// Payload validated against /api/leads schema:
// name, email, whatsapp, organization, role,
// inquiryType, programInterest, sourcePage, message, _honeypot
// ─────────────────────────────────────────────
const KEBUTUHAN_OPTIONS = [
  "In-House Training",
  "Assessment Program",
  "Managed Learning Program",
  "Platform / LMS Discussion",
  "Expert Partner Collaboration",
  "General Inquiry",
] as const;

const PESERTA_OPTIONS = ["< 20 peserta", "20–50 peserta", "50–100 peserta", "100–200 peserta", "> 200 peserta"] as const;

const SOURCE_PAGE = "/lp/corporate-training";

function LeadForm({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const [form, setForm] = useState<FormState>({
    nama: "", perusahaan: "", jabatan: "", whatsapp: "",
    email: "", kebutuhan: "", peserta: "", _honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.nama.trim()) e.nama = "Nama wajib diisi";
    if (!form.perusahaan.trim()) e.perusahaan = "Nama perusahaan/instansi wajib diisi";
    if (!form.whatsapp.trim()) e.whatsapp = "Nomor WhatsApp wajib diisi";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Format email tidak valid";
    if (!form.kebutuhan) e.kebutuhan = "Pilih kebutuhan training";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormState]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setServerError("");
    try {
      // Build payload matching the /api/leads schema exactly:
      // { name, email, whatsapp?, organization?, role?, inquiryType,
      //   programInterest?, sourcePage?, message, _honeypot? }
      const payload = {
        name: form.nama.trim(),
        email: form.email.trim(),
        whatsapp: form.whatsapp.trim(),
        organization: form.perusahaan.trim(),
        role: form.jabatan.trim(),
        inquiryType: form.kebutuhan,                         // maps to inquiryType — required
        programInterest: form.peserta ? `Perkiraan peserta: ${form.peserta}` : "",
        sourcePage: SOURCE_PAGE,                             // identifies this lead's origin
        // message encodes campaign context for admin CRM view
        message: [
          "[Corporate Training LP]",
          `Kebutuhan: ${form.kebutuhan}`,
          form.peserta ? `Jumlah peserta: ${form.peserta}` : "",
          form.jabatan ? `Jabatan: ${form.jabatan}` : "",
        ].filter(Boolean).join(" | "),
        _honeypot: form._honeypot,
      };

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data: { ok?: boolean; error?: string } = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim formulir");
      setSuccess(true);
    } catch (err: unknown) {
      setServerError(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldBase = "w-full rounded-xl border px-4 py-3 text-sm text-[#1e293b] placeholder:text-[#94a3b8] outline-none transition-all duration-150 focus:ring-2 bg-white";
  const fieldOk = "border-[#E2D4C8] focus:border-[#FF8A00] focus:ring-[#FF8A00]/20";
  const fieldErr = "border-red-400 bg-red-50 focus:ring-red-200";
  const fc = (err?: string) => `${fieldBase} ${err ? fieldErr : fieldOk}`;

  return (
    <div ref={formRef} className="bg-white rounded-2xl shadow-xl p-6 md:p-8" style={{ border: "1.5px solid rgb(240,217,200)" }}>
      {success ? (
        /* ── Success state ── */
        <div className="text-center py-8" role="alert" aria-live="polite">
          <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5 border-2 border-green-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-3">Terima Kasih!</h3>
          <p className="text-sm text-[#475569] leading-relaxed max-w-xs mx-auto">
            Tim Skillary akan menghubungi Anda untuk mendiskusikan kebutuhan training organisasi Anda.
          </p>
          <p className="mt-4 text-xs text-[#94A3B8]">
            Cek WhatsApp atau email Anda dalam 1×24 jam kerja.
          </p>
        </div>
      ) : (
        <>
          <h3 className="text-lg font-bold text-[#0F172A] mb-1">Minta Proposal Training</h3>
          <p className="text-sm text-[#64748B] mb-6">Isi form berikut — tim kami akan menghubungi Anda.</p>

          {/* Server error banner */}
          {serverError && (
            <div role="alert" aria-live="assertive" className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4" aria-label="Form Minta Proposal Training">
            {/* Honeypot — hidden from real users, catches bots */}
            <input type="text" name="_honeypot" value={form._honeypot} onChange={handleChange} className="sr-only" tabIndex={-1} aria-hidden="true" autoComplete="off" />

            {/* Row: Nama + Perusahaan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lp-nama" className="block text-xs font-semibold text-[#475569] mb-1.5">
                  Nama <span className="text-red-500" aria-label="wajib">*</span>
                </label>
                <input id="lp-nama" name="nama" type="text" placeholder="Nama lengkap" value={form.nama} onChange={handleChange} className={fc(errors.nama)} aria-describedby={errors.nama ? "err-nama" : undefined} autoComplete="name" />
                {errors.nama && <p id="err-nama" role="alert" className="text-xs text-red-500 mt-1">{errors.nama}</p>}
              </div>
              <div>
                <label htmlFor="lp-perusahaan" className="block text-xs font-semibold text-[#475569] mb-1.5">
                  Perusahaan / Instansi <span className="text-red-500" aria-label="wajib">*</span>
                </label>
                <input id="lp-perusahaan" name="perusahaan" type="text" placeholder="PT / Yayasan / Lembaga" value={form.perusahaan} onChange={handleChange} className={fc(errors.perusahaan)} aria-describedby={errors.perusahaan ? "err-perusahaan" : undefined} autoComplete="organization" />
                {errors.perusahaan && <p id="err-perusahaan" role="alert" className="text-xs text-red-500 mt-1">{errors.perusahaan}</p>}
              </div>
            </div>

            {/* Jabatan */}
            <div>
              <label htmlFor="lp-jabatan" className="block text-xs font-semibold text-[#475569] mb-1.5">Jabatan</label>
              <input id="lp-jabatan" name="jabatan" type="text" placeholder="HR Manager, Training Manager, dll." value={form.jabatan} onChange={handleChange} className={fc()} autoComplete="organization-title" />
            </div>

            {/* Row: WhatsApp + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="lp-whatsapp" className="block text-xs font-semibold text-[#475569] mb-1.5">
                  WhatsApp <span className="text-red-500" aria-label="wajib">*</span>
                </label>
                <input id="lp-whatsapp" name="whatsapp" type="tel" placeholder="08xxxxxxxxxx" value={form.whatsapp} onChange={handleChange} className={fc(errors.whatsapp)} aria-describedby={errors.whatsapp ? "err-wa" : undefined} autoComplete="tel" />
                {errors.whatsapp && <p id="err-wa" role="alert" className="text-xs text-red-500 mt-1">{errors.whatsapp}</p>}
              </div>
              <div>
                <label htmlFor="lp-email" className="block text-xs font-semibold text-[#475569] mb-1.5">
                  Email <span className="text-red-500" aria-label="wajib">*</span>
                </label>
                <input id="lp-email" name="email" type="email" placeholder="email@perusahaan.com" value={form.email} onChange={handleChange} className={fc(errors.email)} aria-describedby={errors.email ? "err-email" : undefined} autoComplete="email" />
                {errors.email && <p id="err-email" role="alert" className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Kebutuhan */}
            <div>
              <label htmlFor="lp-kebutuhan" className="block text-xs font-semibold text-[#475569] mb-1.5">
                Kebutuhan Training <span className="text-red-500" aria-label="wajib">*</span>
              </label>
              <select id="lp-kebutuhan" name="kebutuhan" value={form.kebutuhan} onChange={handleChange} className={fc(errors.kebutuhan)} aria-describedby={errors.kebutuhan ? "err-kebutuhan" : undefined}>
                <option value="">Pilih kebutuhan…</option>
                {KEBUTUHAN_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
              {errors.kebutuhan && <p id="err-kebutuhan" role="alert" className="text-xs text-red-500 mt-1">{errors.kebutuhan}</p>}
            </div>

            {/* Peserta */}
            <div>
              <label htmlFor="lp-peserta" className="block text-xs font-semibold text-[#475569] mb-1.5">Perkiraan Jumlah Peserta</label>
              <select id="lp-peserta" name="peserta" value={form.peserta} onChange={handleChange} className={fc()}>
                <option value="">Pilih jumlah…</option>
                {PESERTA_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            {/* Submit — type="submit" explicit */}
            <CTAButton type="submit" size="lg" className="w-full justify-center" aria-label="Kirim formulir minta proposal training">
              {submitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                  Mengirim…
                </span>
              ) : "Minta Proposal Training →"}
            </CTAButton>

            <p className="text-center text-xs text-[#94A3B8] leading-relaxed">
              Mulai dari diskusi kebutuhan. Tim Skillary akan membantu menyesuaikan program dengan kebutuhan organisasi Anda.
            </p>
          </form>
        </>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
function HeroSection({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <section className="bg-gradient-to-b from-[#FFFDF9] to-white py-16 md:py-24 px-5 md:px-8 overflow-x-hidden" style={{ borderBottom: "1.5px solid rgb(240,217,200)" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

        {/* LEFT — copy + hero CTA */}
        <div>
          {/* Badge — QA fix: updated to match spec */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest mb-6 flex-wrap" style={{ background: "rgb(255,244,232)", color: "rgb(180,100,0)", border: "1.5px solid rgb(255,214,165)" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse inline-block shrink-0" aria-hidden="true" />
            Corporate Training &nbsp;·&nbsp; Sertifikat Digital &nbsp;·&nbsp; Training Report
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.15] text-[#0F172A] mb-5 tracking-tight">
            Pelatihan Korporat yang{" "}
            <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Terdokumentasi, Tersertifikasi
            </span>
            , dan Siap Dilaporkan
          </h1>

          <p className="text-base md:text-lg text-[#475569] leading-relaxed mb-8 max-w-lg">
            Skillary membantu perusahaan menjalankan program pelatihan yang lebih terstruktur melalui materi, database peserta, absensi, dokumentasi event, sertifikat digital, evaluasi, dan laporan hasil training.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-2 mb-8" aria-label="Fitur utama Skillary">
            {["✓ Sertifikat Digital", "✓ Training Report", "✓ Database Peserta", "✓ Dokumentasi Event"].map((t) => (
              <span key={t} className="text-xs font-semibold text-[#334155] px-3 py-1.5 rounded-full bg-white border border-[#E2D4C8] shadow-sm">{t}</span>
            ))}
          </div>

          {/* Hero CTAs — both scroll to form */}
          <div className="flex flex-wrap gap-3">
            <CTAButton size="lg" onClick={scrollToForm} aria-label="Isi form untuk minta proposal training">
              Minta Proposal Training
            </CTAButton>
            <SecondaryButton size="lg" onClick={scrollToForm} aria-label="Scroll ke form diskusi kebutuhan tim">
              Diskusikan Kebutuhan Tim
            </SecondaryButton>
          </div>

          {/* Reassurance */}
          <p className="mt-5 text-xs text-[#94A3B8] leading-relaxed max-w-sm">
            Respon dalam 1×24 jam kerja. Tidak ada komitmen di awal—mulai dari diskusi.
          </p>
        </div>

        {/* RIGHT — Lead Form on top + Hero Visual below on desktop */}
        <div className="flex flex-col gap-6">
          <LeadForm formRef={formRef} />
          {/* Dashboard visual — hidden on mobile to keep page fast */}
          <div className="hidden lg:block">
            <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-bold mb-3 text-center">Contoh Output yang Dihasilkan</p>
            <HeroVisual />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PROBLEM SECTION
// ─────────────────────────────────────────────
const PROBLEMS = [
  {
    icon: <IconDatabase />,
    title: "Data Peserta Tersebar",
    desc: "Peserta hadir, tetapi data tidak masuk ke database yang bisa dipakai untuk follow-up atau laporan.",
  },
  {
    icon: <IconCertificate />,
    title: "Sertifikat Masih Manual",
    desc: "Sertifikat dibuat satu per satu, sulit diverifikasi, dan tidak tersimpan sebagai riwayat pelatihan.",
  },
  {
    icon: <IconReport />,
    title: "Laporan Training Tidak Siap",
    desc: "Setelah event selesai, dokumentasi, feedback, attendance, dan insight sering tidak dirangkum menjadi laporan profesional.",
  },
];

function ProblemSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-[#0F172A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Tantangan Umum</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Training Sering Berjalan, Tapi Hasilnya Tidak Selalu Tercatat
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {PROBLEMS.map((p, i) => (
            <div key={i} className="rounded-2xl p-6 flex flex-col gap-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgba(255,138,0,0.12)", color: "rgb(255,175,80)" }}>
                {p.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// SOLUTION SECTION
// ─────────────────────────────────────────────
const SOLUTIONS = [
  { icon: <IconDatabase />, title: "Event & Participant Database", desc: "Setiap training memiliki data peserta, absensi, feedback, dan dokumentasi yang lebih rapi." },
  { icon: <IconCertificate />, title: "Sertifikat Digital", desc: "Peserta mendapatkan sertifikat digital yang dapat dikembangkan menjadi database sertifikasi." },
  { icon: <IconReport />, title: "Training Report", desc: "Organisasi mendapatkan laporan berisi ringkasan kegiatan, peserta, dokumentasi, feedback, dan rekomendasi lanjutan." },
  { icon: <IconPortfolio />, title: "Portfolio Dokumentasi", desc: "Setiap event dapat menjadi portofolio digital yang bisa digunakan untuk evaluasi dan follow-up program berikutnya." },
];

function SolutionSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-white" style={{ borderBottom: "1.5px solid rgb(240,217,200)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgb(180,100,0)" }}>Solusi Skillary</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] leading-tight">
            Skillary Mengubah Training Menjadi Aset Digital
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SOLUTIONS.map((s, i) => (
            <div key={i} className="rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow" style={{ background: "rgb(255,251,245)", border: "1.5px solid rgb(240,217,200)" }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: "rgb(255,244,232)", color: "rgb(255,138,0)", border: "1.5px solid rgb(255,214,165)" }}>
                {s.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] mb-2 leading-snug">{s.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TRUST / ALLMAN EXPERIENCE
// ─────────────────────────────────────────────
const TRUST_POINTS = [
  "Pengalaman event dan training",
  "Program online, offline, dan hybrid",
  "Dokumentasi kegiatan",
  "Sertifikat digital",
  "Laporan pasca-training",
  "Program dapat disesuaikan",
];
const SECTORS = ["Korporasi", "Pendidikan", "Komunitas", "Pemerintahan", "Teknologi", "Keuangan"];

function TrustSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-[#FFFDF9]" style={{ borderBottom: "1.5px solid rgb(240,217,200)" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgb(180,100,0)" }}>Dibangun dari Pengalaman Nyata</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-5 leading-tight">
            Dibangun dari Pengalaman Event dan Training Allman
          </h2>
          <p className="text-base text-[#475569] leading-relaxed mb-8">
            Skillary dikembangkan untuk membawa pengalaman event dan training Allman ke sistem digital yang lebih rapi. Dengan Skillary, setiap program tidak hanya berjalan sebagai event, tetapi juga menghasilkan data peserta, sertifikat, dokumentasi, laporan, dan portofolio yang dapat digunakan kembali.
          </p>
          <ul className="space-y-3" aria-label="Keunggulan Skillary">
            {TRUST_POINTS.map((pt) => (
              <li key={pt} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-green-600 bg-green-50 border border-green-200">
                  <IconCheck />
                </span>
                <span className="text-sm font-medium text-[#334155]">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-5">
          <div className="grid grid-cols-3 gap-4">
            {[["1998", "Mulai training"], ["39+", "Dokumentasi"], ["21+", "Organisasi"]].map(([val, lbl]) => (
              <div key={lbl} className="bg-white rounded-2xl p-5 text-center shadow-sm border border-[#E2D4C8]">
                <p className="text-2xl font-extrabold" style={{ color: "rgb(255,138,0)" }}>{val}</p>
                <p className="text-[10px] text-[#64748B] font-medium mt-1 leading-snug">{lbl}</p>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#E2D4C8]">
            <p className="text-xs font-bold uppercase tracking-widest text-[#94A3B8] mb-4">Sektor yang Pernah Dilayani</p>
            <div className="flex flex-wrap gap-2">
              {SECTORS.map((s) => (
                <span key={s} className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: "rgb(255,244,232)", color: "rgb(180,100,0)", border: "1px solid rgb(255,214,165)" }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// HOW IT WORKS
// ─────────────────────────────────────────────
const HOW_STEPS = [
  { num: "01", title: "Diskusi Kebutuhan", desc: "Tim Skillary memahami kebutuhan training, profil peserta, tujuan organisasi, dan format pelaksanaan." },
  { num: "02", title: "Susun Program & Proposal", desc: "Skillary menyusun rekomendasi program, materi, durasi, trainer, output, dan estimasi biaya." },
  { num: "03", title: "Jalankan Training", desc: "Training dijalankan secara offline, online, atau hybrid dengan dukungan dokumentasi, absensi, dan feedback." },
  { num: "04", title: "Sertifikat & Report", desc: "Peserta mendapatkan sertifikat, sementara organisasi mendapatkan laporan kegiatan dan rekomendasi lanjutan." },
];

function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-white" style={{ borderBottom: "1.5px solid rgb(240,217,200)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgb(180,100,0)" }}>Alur Kerja</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A]">Cara Kerja Skillary</h2>
        </div>
        {/* Desktop: horizontal */}
        <div className="hidden lg:grid grid-cols-4 gap-0 relative">
          <div className="absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-200" aria-hidden="true" />
          {HOW_STEPS.map((step) => (
            <div key={step.num} className="relative flex flex-col items-center text-center px-4">
              <div className="w-20 h-20 rounded-full bg-white border-4 border-orange-100 flex items-center justify-center mb-5 relative z-10 shadow-sm">
                <span className="text-2xl font-extrabold" style={{ color: "rgb(255,138,0)" }}>{step.num}</span>
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] mb-2 leading-snug">{step.title}</h3>
              <p className="text-xs text-[#475569] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
        {/* Mobile: vertical */}
        <ol className="lg:hidden space-y-0 relative" aria-label="Langkah-langkah cara kerja Skillary">
          <div className="absolute left-7 top-10 bottom-10 w-0.5 bg-gradient-to-b from-orange-200 to-orange-100" aria-hidden="true" />
          {HOW_STEPS.map((step) => (
            <li key={step.num} className="flex gap-5 pb-8 relative">
              <div className="w-14 h-14 rounded-full bg-white border-4 border-orange-100 flex items-center justify-center shrink-0 z-10 shadow-sm">
                <span className="text-lg font-extrabold" style={{ color: "rgb(255,138,0)" }}>{step.num}</span>
              </div>
              <div className="pt-2">
                <h3 className="text-sm font-bold text-[#0F172A] mb-1.5">{step.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PROGRAM OPTIONS
// ─────────────────────────────────────────────
const PROGRAMS = [
  { title: "AI Productivity for Teams", desc: "Pelatihan penggunaan AI tools untuk meningkatkan produktivitas kerja, membuat laporan, menyusun ide, dan mempercepat workflow harian.", format: "Hybrid" },
  { title: "Data & Dashboard Training", desc: "Pelatihan dashboard, data reading, dan pengambilan keputusan berbasis data menggunakan tools seperti Excel atau Power BI.", format: "Offline / Online" },
  { title: "Business Presentation & Reporting", desc: "Pelatihan menyusun presentasi bisnis, laporan visual, dan komunikasi data yang lebih meyakinkan.", format: "Offline / Online" },
  { title: "Leadership & Problem Solving", desc: "Pelatihan kepemimpinan, komunikasi tim, pemecahan masalah, dan pengambilan keputusan.", format: "Offline" },
  { title: "OpenClaw Setup Workshop", desc: "Workshop teknis untuk mengenal dan mempraktikkan setup OpenClaw sebagai bagian dari eksplorasi AI automation.", format: "Online / Offline" },
  { title: "iOS Developer / App Development", desc: "Program pengembangan aplikasi iOS, SwiftUI, mobile product thinking, dan app portfolio untuk mahasiswa atau tim teknologi.", format: "Hybrid" },
];

function ProgramOptionsSection({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const scroll = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-[#FFFDF9]" style={{ borderBottom: "1.5px solid rgb(240,217,200)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgb(180,100,0)" }}>Program Tersedia</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] leading-tight">
            Program yang Bisa Disesuaikan untuk Tim Anda
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {PROGRAMS.map((prog) => (
            <div key={prog.title} className="bg-white rounded-2xl p-6 flex flex-col gap-3 hover:shadow-md transition-shadow" style={{ border: "1.5px solid rgb(240,217,200)" }}>
              <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full self-start" style={{ background: "rgb(255,244,232)", color: "rgb(180,100,0)", border: "1px solid rgb(255,214,165)" }}>
                {prog.format}
              </span>
              <h3 className="text-sm font-bold text-[#0F172A] leading-snug">{prog.title}</h3>
              <p className="text-xs text-[#475569] leading-relaxed flex-1">{prog.desc}</p>
              {/* Program card CTA — scrolls to form */}
              <button
                type="button"
                onClick={scroll}
                className="text-xs font-bold mt-2 text-left hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded"
                style={{ color: "rgb(255,138,0)" }}
                aria-label={`Diskusikan program ${prog.title}`}
              >
                Diskusikan Program →
              </button>
            </div>
          ))}
        </div>
        <div className="text-center">
          <CTAButton size="md" onClick={scroll} aria-label="Minta proposal training dari halaman program">
            Minta Proposal Training
          </CTAButton>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// DELIVERABLES
// ─────────────────────────────────────────────
const DELIVERABLES = [
  "Materi pelatihan", "Absensi peserta", "Dokumentasi kegiatan", "Feedback peserta",
  "Sertifikat digital", "Laporan training", "Rekomendasi tindak lanjut",
  "Database peserta", "Portfolio event", "Follow-up program lanjutan",
];

function DeliverablesSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-white" style={{ borderBottom: "1.5px solid rgb(240,217,200)" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Dark mockup visual */}
        <div className="relative" aria-hidden="true">
          <div className="bg-[#0F172A] rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-[10px] text-[#64748B] ml-2 font-mono">laporan-training-final.pdf</span>
            </div>
            <div className="space-y-3">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="text-white text-xs font-bold">Laporan Training Korporat</p>
                    <p className="text-[#64748B] text-[10px]">Periode: 10–11 Juni 2025</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-green-500/20 text-green-400">Final</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[["Peserta Hadir", "48"], ["Assessment", "91%"], ["Sertifikat", "44 orang"], ["Rating", "4.8 / 5.0"]].map(([l, v]) => (
                    <div key={l} className="bg-white/5 rounded-lg p-2.5">
                      <p className="text-[9px] text-[#64748B]">{l}</p>
                      <p className="text-sm font-extrabold text-white">{v}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <p className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-widest mb-2">Output Tersedia</p>
                <div className="flex flex-wrap gap-1.5">
                  {["Absensi", "Sertifikat", "Materi", "Laporan", "Feedback", "Database"].map((tag) => (
                    <span key={tag} className="text-[9px] font-semibold px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgb(180,100,0)" }}>Output yang Didapat</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A] mb-5 leading-tight">
            Klien Tidak Hanya Mendapat Training, Tapi Juga Output yang Bisa Dipakai
          </h2>
          <p className="text-sm text-[#475569] leading-relaxed mb-8">
            Dengan output yang jelas, HR/L&D lebih mudah membuktikan bahwa training sudah berjalan, peserta tercatat, dan hasilnya dapat dievaluasi.
          </p>
          <ul className="space-y-3" aria-label="Daftar deliverable Skillary">
            {DELIVERABLES.map((d) => (
              <li key={d} className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-green-600 bg-green-50 border border-green-200">
                  <IconCheck />
                </span>
                <span className="text-sm font-medium text-[#334155]">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// WHY SKILLARY
// ─────────────────────────────────────────────
const WHY_ITEMS = [
  { title: "Berbasis Event dan Training Nyata", desc: "Skillary dikembangkan dari pengalaman menjalankan event dan training, bukan hanya dari konsep platform digital." },
  { title: "Dokumentasi Lebih Rapi", desc: "Setiap kegiatan dapat diarahkan menghasilkan database, dokumentasi, sertifikat, dan laporan." },
  { title: "Program Fleksibel", desc: "Program bisa disesuaikan untuk kebutuhan perusahaan, kampus, komunitas, atau tim internal." },
  { title: "Online, Offline, atau Hybrid", desc: "Skillary dapat mendukung berbagai format pelatihan." },
  { title: "Bisa Menjadi Sistem Jangka Panjang", desc: "Training tidak berhenti pada satu event, tetapi dapat dikembangkan menjadi training path, database peserta, dan program lanjutan." },
];

function WhySkillarySection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-[#FFFDF9]" style={{ borderBottom: "1.5px solid rgb(240,217,200)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgb(180,100,0)" }}>Kenapa Skillary</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A]">Kenapa Memilih Skillary?</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {WHY_ITEMS.map((item, idx) => (
            <div key={item.title} className="bg-white rounded-2xl p-6 shadow-sm flex gap-4" style={{ border: "1.5px solid rgb(240,217,200)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-extrabold text-sm" style={{ background: "rgb(255,244,232)", color: "rgb(255,138,0)", border: "1.5px solid rgb(255,214,165)" }}>
                {String(idx + 1).padStart(2, "0")}
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] mb-1.5 leading-snug">{item.title}</h3>
                <p className="text-xs text-[#475569] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CLIENT MARQUEE (DUMMY)
// ─────────────────────────────────────────────
// Industry sectors (not fabricated client names) — honest trust framing.
const SECTOR_STRIP = [
  "PERBANKAN", "REGULATOR", "FMCG", "ENERGI", "TELEKOMUNIKASI", "PENDIDIKAN"
];

function ClientMarqueeSection() {
  return (
    <section className="py-8 bg-white border-b border-[#F0D9C8]">
      <div className="max-w-6xl mx-auto px-5 md:px-8 text-center">
        <p className="text-[10px] font-bold text-[#94A3B8] uppercase tracking-widest mb-4">Pengalaman pelatihan lintas sektor industri</p>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 opacity-60 grayscale">
          {SECTOR_STRIP.map((sector) => (
            <div key={sector} className="text-sm md:text-base font-extrabold text-[#334155] tracking-tighter">
              {sector}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TESTIMONIALS (DUMMY)
// ─────────────────────────────────────────────
const DUMMY_TESTIMONIALS = [
  {
    quote: "Sistem Skillary membuat kami tidak perlu pusing lagi memikirkan sertifikat dan rekap absensi. Semua sudah diatur dan dilaporkan di akhir.",
    name: "Budi Santoso",
    title: "HR Director, Tech Nusantara",
  },
  {
    quote: "Program data storytelling mereka mengubah cara tim kami melakukan presentasi bulanan. Laporannya sangat komprehensif.",
    name: "Sari Wulandari",
    title: "L&D Manager, Bank Syariah",
  },
  {
    quote: "Database peserta sangat membantu kami melacak siapa saja yang sudah lulus sertifikasi dasar sebelum lanjut ke materi advance.",
    name: "Andi Permana",
    title: "VP of People, Corp Global",
  },
];

function TestimonialSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-[#0F172A]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-3">Apa Kata Klien Kami</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
            Bukti Nyata dari Organisasi yang Telah Bekerja Sama
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {DUMMY_TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-5">
              <div className="text-orange-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
              </div>
              <p className="text-sm text-[#CBD5E1] leading-relaxed flex-1">"{t.quote}"</p>
              <div>
                <p className="text-sm font-bold text-white mb-0.5">{t.name}</p>
                <p className="text-xs text-[#94A3B8]">{t.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// GALLERY / DOKUMENTASI (DUMMY)
// ─────────────────────────────────────────────
function GallerySection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-white" style={{ borderBottom: "1.5px solid rgb(240,217,200)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgb(180,100,0)" }}>Dokumentasi Kegiatan</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A]">Suasana Training Skillary</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="aspect-square rounded-2xl bg-[#F8FAFC] border border-[#E2D4C8] flex flex-col items-center justify-center relative overflow-hidden group">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#CBD5E1] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              <p className="text-[10px] font-bold text-[#94A3B8]">Placeholder {item}</p>
              {/* Overlay hover effect */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-[10px] font-bold text-white px-3 py-1.5 rounded-full border border-white/30 backdrop-blur-sm">In-House Training</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FAQ  (accessible accordion)
// ─────────────────────────────────────────────
const FAQ_ITEMS = [
  { q: "Apakah program bisa disesuaikan dengan kebutuhan perusahaan?", a: "Ya. Skillary dapat menyesuaikan topik, durasi, format, dan output berdasarkan kebutuhan organisasi." },
  { q: "Apakah peserta mendapat sertifikat?", a: "Ya. Peserta dapat memperoleh sertifikat digital setelah mengikuti program sesuai ketentuan." },
  { q: "Apakah perusahaan mendapatkan laporan?", a: "Ya. Skillary dapat menyediakan laporan training yang berisi ringkasan kegiatan, jumlah peserta, dokumentasi, feedback, dan rekomendasi." },
  { q: "Apakah training bisa offline?", a: "Bisa. Program dapat dilakukan secara offline, online, atau hybrid." },
  { q: "Apakah Skillary bisa membantu webinar gratis lalu lanjut ke workshop berbayar?", a: "Bisa. Skillary dapat membantu membuat funnel dari webinar gratis ke kelas lanjutan atau workshop offline." },
  { q: "Apakah tersedia program untuk kampus?", a: "Ya. Skillary juga dapat menyiapkan program seminar, workshop, dan internship berbasis proyek untuk kampus." },
];

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);
  const id = `faq-answer-${index}`;
  return (
    <div className="border rounded-2xl overflow-hidden" style={{ borderColor: "rgb(240,217,200)" }}>
      <button
        type="button"
        id={`faq-btn-${index}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls={id}
        className="w-full flex items-center justify-between text-left px-6 py-4 bg-white hover:bg-[#FFFDF9] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-orange-400"
      >
        <span className="text-sm font-bold text-[#0F172A] pr-4">{q}</span>
        <IconChevron open={open} />
      </button>
      <div id={id} role="region" aria-labelledby={`faq-btn-${index}`} hidden={!open}>
        <div className="px-6 pb-5 bg-[#FFFDF9]">
          <p className="text-sm text-[#475569] leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function FAQSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-white" style={{ borderBottom: "1.5px solid rgb(240,217,200)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: "rgb(180,100,0)" }}>FAQ</p>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0F172A]">Pertanyaan Umum</h2>
        </div>
        <div className="space-y-3" role="list" aria-label="Pertanyaan yang sering ditanyakan">
          {FAQ_ITEMS.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FINAL CTA
// ─────────────────────────────────────────────
function FinalCTASection({ formRef }: { formRef: React.RefObject<HTMLDivElement | null> }) {
  const scroll = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-[#0F172A]">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
          Siap Membuat Training Perusahaan Lebih Terukur?
        </h2>
        <p className="text-base text-[#94A3B8] mb-10 leading-relaxed max-w-xl mx-auto">
          Diskusikan kebutuhan tim Anda bersama Skillary dan dapatkan rekomendasi program yang sesuai.
        </p>
        {/* Final CTA — scrolls to form at top */}
        <CTAButton size="lg" onClick={scroll} className="mb-4" aria-label="Scroll ke form untuk minta proposal training">
          Minta Proposal Training
        </CTAButton>
        <p className="text-xs text-[#475569] max-w-sm mx-auto leading-relaxed">
          Mulai dari diskusi kebutuhan. Tim Skillary akan membantu menyusun program, format, dan output yang paling relevan.
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// COMPACT FOOTER
// ─────────────────────────────────────────────
function LPFooter() {
  return (
    <footer className="bg-[#020817] py-10 px-5 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-6 pb-6 border-b border-white/10">
          <div>
            <Image src="/logo.png" alt="Skillary" width={100} height={30} className="h-7 w-auto object-contain mb-2" />
            <p className="text-xs text-[#475569]">Upgrade Skill, Raih Karir</p>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-5 gap-y-2 text-xs text-[#475569]" aria-label="Footer landing page navigation">
            {([["Program", "/program-catalog"], ["Corporate Training", "/lp/corporate-training"], ["Kontak", "/contact"], ["Privacy", "/privacy"]] as [string, string][]).map(([label, href]) => (
              <Link key={label} href={href} className="hover:text-white transition-colors focus:outline-none focus-visible:underline">{label}</Link>
            ))}
          </nav>
        </div>
        <p className="text-center text-[10px] text-[#334155]">© {new Date().getFullYear()} Skillary. Semua hak dilindungi.</p>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────
export default function CorporateTrainingLandingPage() {
  // Single ref passed down — all CTAs scroll to the lead form
  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  return (
    <div className="min-h-screen font-sans antialiased overflow-x-hidden">
      {/* Isolated compact header — no global nav */}
      <LPHeader onCTAClick={scrollToForm} />
      <main id="main-content">
        <HeroSection formRef={formRef} />
        <ClientMarqueeSection />
        <ProblemSection />
        <SolutionSection />
        <TrustSection />
        <HowItWorksSection />
        <ProgramOptionsSection formRef={formRef} />
        <DeliverablesSection />
        <TestimonialSection />
        <WhySkillarySection />
        <GallerySection />
        <FAQSection />
        <FinalCTASection formRef={formRef} />
      </main>
      <LPFooter />
    </div>
  );
}
