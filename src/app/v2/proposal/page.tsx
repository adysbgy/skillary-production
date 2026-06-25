"use client";

import { useState } from "react";
import Link from "next/link";
import { whatsappLink, EMAIL_TEAMS } from "@/data/config";

const TOPIC_CHIPS = ["Power BI", "Excel", "Presentasi", "AI & Digital", "Leadership", "SOP & Quality", "Data Analytics", "Problem Solving"];

const WHY_POINTS = [
  {
    title: "Konsultasi gratis tanpa komitmen",
    desc: "Diskusikan kebutuhan tim Anda dulu — kami bantu petakan program yang paling relevan.",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
  },
  {
    title: "Pengalaman sejak 1998",
    desc: "Instruktur dan kurikulum yang telah dipercaya organisasi besar Indonesia selama puluhan tahun.",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
  {
    title: "Program disesuaikan kebutuhan",
    desc: "Topik, durasi, format, dan output dirancang spesifik untuk konteks organisasi Anda.",
    icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.196-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z",
  },
  {
    title: "Respon dalam 1 hari kerja",
    desc: "Tim kami akan menghubungi Anda dengan rekomendasi awal secepatnya.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
  },
];

const CLIENT_LOGOS = [
  { name: "BNI", abbr: "BNI", color: "rgb(29, 78, 216)" },
  { name: "OJK", abbr: "OJK", color: "rgb(21, 128, 61)" },
  { name: "Indofood", abbr: "IF", color: "rgb(234, 88, 12)" },
];

export default function ProposalV2Page() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggleTopic = (t: string) =>
    setSelectedTopics((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

  const waMessage = "Halo Skillary, saya ingin berkonsultasi mengenai kebutuhan training tim kami.";

  return (
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* ── Hero ── */}
      <section className="bg-white pt-16 pb-12 px-5 md:px-6 lg:px-8 relative overflow-hidden" style={{ borderBottom: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none opacity-20" style={{ background: "radial-gradient(circle, rgb(255,138,0) 0%, transparent 70%)" }} />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-1.5 rounded-full" style={{ background: "rgb(255, 244, 232)", border: "1.5px solid rgb(255, 214, 165)" }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "rgb(255, 138, 0)" }} />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "rgb(255, 138, 0)" }}>Konsultasi Training</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#0F172A] mb-4">
            Ceritakan Kebutuhan Training Anda
          </h1>
          <p className="text-[#64748B] text-base md:text-lg max-w-xl mx-auto">
            Konsultasi gratis, respon dalam 1 hari kerja. Tim kami akan membantu menyusun program
            pelatihan yang paling sesuai untuk organisasi Anda.
          </p>
        </div>
      </section>

      {/* ── Form + sidebar ── */}
      <section className="py-14 px-5 md:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8 items-start">

          {/* Form (left, wider) */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-7 md:p-9" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
            {!submitted ? (
              <form action="#" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Nama lengkap" placeholder="Nama Anda" type="text" required />
                  <Field label="Nama organisasi" placeholder="PT / Instansi" type="text" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Jabatan" placeholder="HR Manager, L&D, dll" type="text" required />
                  <Field label="Email" placeholder="nama@organisasi.com" type="email" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="No. WhatsApp" placeholder="08xxxxxxxxxx" type="tel" required />
                  <div>
                    <label className="block text-sm font-semibold text-[#334155] mb-1.5">Jumlah peserta</label>
                    <select required defaultValue="" className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] bg-white focus:outline-none focus:ring-2" style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }}>
                      <option value="" disabled>Pilih jumlah</option>
                      <option value="<10">Kurang dari 10</option>
                      <option value="10-30">10 – 30</option>
                      <option value="30-50">30 – 50</option>
                      <option value="50-100">50 – 100</option>
                      <option value=">100">Lebih dari 100</option>
                    </select>
                  </div>
                </div>

                {/* Format checkboxes */}
                <div>
                  <label className="block text-sm font-semibold text-[#334155] mb-2">Format pelatihan</label>
                  <div className="flex flex-wrap gap-3">
                    {["Online", "Offline", "Hybrid"].map((f) => (
                      <label key={f} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer text-sm font-medium text-[#334155] transition-colors hover:bg-orange-50" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                        <input type="checkbox" name="format" value={f} className="accent-[rgb(255,138,0)] w-4 h-4" />
                        {f}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Topic textarea */}
                <div>
                  <label className="block text-sm font-semibold text-[#334155] mb-1.5">Topik pelatihan yang dibutuhkan</label>
                  <textarea rows={3} required placeholder="Ceritakan singkat topik atau skill yang ingin ditingkatkan timnya..." className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 resize-none" style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }} />
                </div>

                {/* Interactive topic chips */}
                <div>
                  <label className="block text-sm font-semibold text-[#334155] mb-2">Atau pilih topik yang sering diminta</label>
                  <div className="flex flex-wrap gap-2">
                    {TOPIC_CHIPS.map((t) => {
                      const active = selectedTopics.includes(t);
                      return (
                        <button key={t} type="button" onClick={() => toggleTopic(t)} className="text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all" style={active ? { background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))", color: "white" } : { background: "white", color: "#64748B", border: "1.5px solid rgb(240, 217, 200)" }}>
                          {active && "✓ "}{t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Optional message */}
                <div>
                  <label className="block text-sm font-semibold text-[#334155] mb-1.5">Pesan tambahan <span className="font-normal text-[#94A3B8]">(opsional)</span></label>
                  <textarea rows={2} placeholder="Timeline, budget range, atau hal lain yang ingin disampaikan..." className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 resize-none" style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }} />
                </div>

                <button type="submit" className="w-full text-white text-sm font-bold py-3.5 rounded-xl shadow-md transition-all hover:opacity-90 hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                  Kirim Permintaan Konsultasi →
                </button>
                <p className="text-[11px] text-[#94A3B8] text-center">Data Anda hanya digunakan untuk keperluan konsultasi training. Tidak akan dibagikan ke pihak ketiga.</p>
              </form>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: "rgb(209, 250, 229)", color: "rgb(5, 150, 105)" }}>
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">Permintaan Terkirim!</h3>
                <p className="text-sm text-[#64748B] max-w-sm mx-auto mb-6">Terima kasih. Tim Skillary akan menghubungi Anda dalam 1 hari kerja dengan rekomendasi program awal.</p>
                <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full bg-white hover:bg-orange-50 transition-colors" style={{ border: "1.5px solid rgb(240, 217, 200)", color: "#334155" }}>
                  Atau chat kami sekarang via WhatsApp
                </a>
              </div>
            )}
          </div>

          {/* Sidebar (right) */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl p-7" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
              <h3 className="font-bold text-[#0F172A] mb-5">Kenapa konsultasi dengan Skillary?</h3>
              <div className="space-y-5">
                {WHY_POINTS.map((p) => (
                  <div key={p.title} className="flex gap-3.5">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                      <svg className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={p.icon} /></svg>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-[#0F172A] mb-0.5">{p.title}</p>
                      <p className="text-xs text-[#64748B] leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct contact */}
            <div className="rounded-2xl p-7" style={{ background: "rgb(255, 251, 245)", border: "1.5px solid rgb(240, 217, 200)" }}>
              <p className="text-xs font-bold uppercase tracking-widest text-black/45 mb-4">Atau hubungi kami langsung</p>
              <a href={whatsappLink(waMessage)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 mb-3 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: "rgb(34, 197, 94)" }}>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.488-1.087z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A] group-hover:underline">Chat via WhatsApp</p>
                  <p className="text-xs text-[#64748B]">Respon cepat di jam kerja</p>
                </div>
              </a>
              <a href={`mailto:${EMAIL_TEAMS}`} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#0F172A] group-hover:underline">{EMAIL_TEAMS}</p>
                  <p className="text-xs text-[#64748B]">Email tim B2B</p>
                </div>
              </a>
            </div>

            {/* Social proof */}
            <div className="bg-white rounded-2xl p-6 text-center" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
              <p className="text-xs text-[#64748B] mb-4">Dipercaya oleh organisasi terkemuka</p>
              <div className="flex items-center justify-center gap-3">
                {CLIENT_LOGOS.map((c) => (
                  <div key={c.name} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: "rgb(250,250,250)", border: "1.5px solid rgb(240, 217, 200)" }}>
                    <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-black shrink-0" style={{ background: c.color }}>{c.abbr.charAt(0)}</div>
                    <span className="text-xs font-semibold text-[#475569]">{c.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, placeholder, type, required }: { label: string; placeholder: string; type: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#334155] mb-1.5">{label}</label>
      <input type={type} required={required} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl text-sm text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2" style={{ border: "1.5px solid rgb(240, 217, 200)", ["--tw-ring-color" as string]: "rgb(255,138,0)" }} />
    </div>
  );
}
