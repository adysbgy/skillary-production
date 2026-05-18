"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FORMSPREE_ID } from "@/data/config";

const TYPE_MAP: Record<string, string> = {
  "in-house": "In-House Training",
  assessment: "Assessment Program",
  managed: "Managed Learning Program",
  platform: "Platform / LMS Discussion",
  expert: "Expert Partner Collaboration",
  proposal: "General Inquiry",
};

const PROGRAM_MAP: Record<string, string> = {
  "data-digital-productivity": "Data & Digital Productivity",
  "leadership-communication": "Leadership & Communication",
  "risk-audit-compliance": "Risk, Audit & Compliance",
  "education-teacher-development": "Education & Teacher Development",
  "ai-future-skills": "AI & Future Skills",
  "business-presentation-visual-communication": "Business Presentation & Visual Communication",
};

export function ContactForm() {
  const searchParams = useSearchParams();
  const prefillType = searchParams.get("type");
  const prefillProgram = searchParams.get("program");
  const prefillSource = searchParams.get("source");
  const initialType = (prefillType && TYPE_MAP[prefillType]) || "In-House Training";
  const programName = prefillProgram ? PROGRAM_MAP[prefillProgram] : null;
  const initialMessage = programName
    ? `Saya tertarik berdiskusi tentang program ${programName}.`
    : "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    org: "",
    role: "",
    inquiryType: initialType,
    message: initialMessage,
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Nama wajib diisi";
    if (!formData.email.trim()) errs.email = "Email wajib diisi";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "Format email tidak valid";
    if (!formData.whatsapp.trim()) errs.whatsapp = "Nomor WhatsApp wajib diisi";
    if (!formData.org.trim()) errs.org = "Nama Organisasi wajib diisi";
    if (!formData.message.trim()) errs.message = "Pesan kebutuhan wajib diisi";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    setSubmitError("");

    const leadPayload = {
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      organization: formData.org,
      role: formData.role,
      inquiryType: formData.inquiryType,
      message: formData.message,
      programInterest: prefillProgram || "",
      sourcePage: prefillSource || "direct",
      _honeypot: honeypot,
    };

    const formspreePayload = {
      name: formData.name,
      email: formData.email,
      whatsapp: formData.whatsapp,
      organization: formData.org,
      role: formData.role,
      inquiryType: formData.inquiryType,
      message: formData.message,
      sourcePage: prefillSource || "direct",
    };

    try {
      // Primary: store in DB
      const dbRes = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadPayload),
      });

      // Secondary: Formspree (fire-and-forget, don't block user)
      fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formspreePayload),
      }).catch((err) => console.warn("Formspree submission failed:", err));

      if (dbRes.ok) {
        setStatus("sent");
      } else {
        const data = await dbRes.json().catch(() => null);
        setSubmitError(data?.error || "Terjadi kesalahan. Silakan coba lagi.");
        setStatus("error");
      }
    } catch {
      setSubmitError("Koneksi gagal. Periksa jaringan Anda dan coba lagi.");
      setStatus("error");
    }
  };

  const inputBase = "w-full rounded-xl border bg-[#FAFAFA] px-4 py-3 text-sm outline-none placeholder:text-[#94A3B8] transition-colors focus:border-[#D88A44] focus:bg-white focus:ring-1 focus:ring-[#D88A44]";

  if (status === "sent") {
    return (
      <div className="bg-white border border-[#E2E8F0] rounded-2xl p-10 text-center shadow-sm">
        <div className="mb-6 mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D1FAE5] text-[#065F46] text-2xl font-bold">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-[#0F172A] mb-3">Terima kasih, inquiry Anda sudah kami terima.</h3>
        <p className="text-[#475569] mb-8 leading-relaxed">
          Tim Skillary akan meninjau kebutuhan Anda dan menghubungi kembali pada hari kerja.
        </p>
        <div className="flex flex-col gap-2 mb-6">
          <a href="/program-catalog" className="text-sm font-semibold text-[#C2410C] hover:underline">Lihat Area Program →</a>
          <a href="/teams" className="text-sm font-semibold text-[#C2410C] hover:underline">Solusi untuk Organisasi →</a>
          <a href="/about" className="text-sm font-semibold text-[#C2410C] hover:underline">Tentang Skillary →</a>
        </div>
        <button
          onClick={() => {
            setStatus("idle");
            setFormData({ name: "", email: "", whatsapp: "", org: "", role: "", inquiryType: "In-House Training", message: "" });
          }}
          className="text-xs font-medium text-[#64748B] hover:underline"
        >
          Kirim pesan lainnya
        </button>
      </div>
    );
  }

  return (
    <div id="form" className="bg-white border border-[#E2E8F0] rounded-2xl p-6 lg:p-10 shadow-sm">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Ceritakan Kebutuhan Anda</h2>
        <p className="text-sm text-[#475569]">
          Semakin jelas informasi yang Anda berikan, semakin mudah bagi tim Skillary untuk menyiapkan rekomendasi format pelatihan yang sesuai.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {submitError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-medium">
            {submitError}
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">Nama Lengkap <span className="text-red-500">*</span></label>
            <input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Bapak/Ibu [Nama]"
              className={`${inputBase} ${errors.name ? "border-red-400" : "border-[#E2E8F0]"}`}
            />
            {errors.name && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">Email Kerja <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@perusahaan.com"
              className={`${inputBase} ${errors.email ? "border-red-400" : "border-[#E2E8F0]"}`}
            />
            {errors.email && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">Nomor WhatsApp <span className="text-red-500">*</span></label>
            <input
              type="tel"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              placeholder="08123456789"
              className={`${inputBase} ${errors.whatsapp ? "border-red-400" : "border-[#E2E8F0]"}`}
            />
            {errors.whatsapp && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.whatsapp}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">Nama Organisasi <span className="text-red-500">*</span></label>
            <input
              value={formData.org}
              onChange={(e) => setFormData({ ...formData, org: e.target.value })}
              placeholder="PT / Sekolah / Yayasan"
              className={`${inputBase} ${errors.org ? "border-red-400" : "border-[#E2E8F0]"}`}
            />
            {errors.org && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.org}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">Jabatan / Peran (Opsional)</label>
            <input
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="HR Manager, L&D, dll."
              className={`${inputBase} border-[#E2E8F0]`}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">Jenis Kebutuhan <span className="text-red-500">*</span></label>
            <select
              value={formData.inquiryType}
              onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
              className={`${inputBase} border-[#E2E8F0] appearance-none cursor-pointer`}
            >
              <option value="In-House Training">In-House Training</option>
              <option value="Assessment Program">Assessment Program</option>
              <option value="Managed Learning Program">Managed Learning Program</option>
              <option value="Platform / LMS Discussion">Platform / LMS Discussion</option>
              <option value="Expert Partner Collaboration">Expert Partner Collaboration</option>
              <option value="General Inquiry">General Inquiry</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-[#334155] mb-1.5 uppercase tracking-wider">Pesan / Catatan Kebutuhan <span className="text-red-500">*</span></label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Contoh: Kami ingin training untuk 40 peserta, topik Excel/Power BI, durasi 1 hari, membutuhkan assessment dan sertifikat."
              rows={5}
              className={`${inputBase} ${errors.message ? "border-red-400" : "border-[#E2E8F0]"} resize-y`}
            />
            {errors.message && <p className="mt-1.5 text-xs text-red-500 font-medium">{errors.message}</p>}
          </div>
        </div>

        {/* Honeypot anti-spam — invisible to real users */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
          <input
            type="text"
            name="_honeypot"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full bg-[#172554] text-white font-bold py-4 px-6 rounded-xl shadow-md hover:bg-[#D88A44] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Mengirim..." : "Kirim Kebutuhan Training"}
          </button>
        </div>

        <p className="mt-6 text-center text-xs text-[#64748B] leading-relaxed">
          Informasi yang Anda kirimkan akan digunakan untuk menindaklanjuti kebutuhan program dan tidak ditampilkan secara publik.
        </p>
      </form>
    </div>
  );
}
