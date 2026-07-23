"use client";

import Link from "next/link";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import { GradientText } from "@/components/v2/marketing/MarketingUI";

const RESOURCE_TYPES = {
  "E-book": { bg: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)", gradient: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" },
  "Template": { bg: "rgb(219, 234, 254)", color: "rgb(37, 99, 235)", gradient: "linear-gradient(135deg, rgb(59,130,246), rgb(99,102,241))" },
  "Modul": { bg: "rgb(237, 233, 254)", color: "rgb(124, 58, 237)", gradient: "linear-gradient(135deg, rgb(139,92,246), rgb(217,70,239))" },
  "Checklist": { bg: "rgb(209, 250, 229)", color: "rgb(5, 150, 105)", gradient: "linear-gradient(135deg, rgb(16,185,129), rgb(5,150,105))" },
} as const;

type ResourceType = keyof typeof RESOURCE_TYPES;

const RESOURCES: { type: ResourceType; title: string; desc: string; status: string; href?: string }[] = [
  { type: "Checklist", title: "Checklist Brief Kebutuhan Training", desc: "Panduan menyiapkan tujuan, profil peserta, format, timeline, serta output sebelum meminta proposal.", status: "Panduan tersedia", href: "/contact?type=proposal&source=proposal" },
  { type: "Template", title: "Template Silabus Pelatihan", desc: "Kerangka silabus untuk menyusun program pelatihan internal yang terstruktur.", status: "Dalam persiapan" },
  { type: "E-book", title: "Panduan Strategi L&D", desc: "Panduan merancang strategi Learning & Development yang terukur untuk organisasi.", status: "Dalam persiapan" },
  { type: "Checklist", title: "Checklist Evaluasi Kirkpatrick", desc: "Daftar periksa empat level evaluasi: reaksi, pembelajaran, perilaku, dan hasil.", status: "Dalam persiapan" },
  { type: "Template", title: "Template Training Needs Analysis", desc: "Form analisis kebutuhan untuk memetakan gap kompetensi tim.", status: "Dalam persiapan" },
  { type: "Modul", title: "Dasar Business Presentation", desc: "Materi pengantar presentasi bisnis yang ringkas dan persuasif.", status: "Dalam persiapan" },
  { type: "E-book", title: "AI untuk Produktivitas Tim", desc: "Panduan praktis penggunaan AI dalam pekerjaan sehari-hari.", status: "Dalam persiapan" },
  { type: "Template", title: "Template Laporan Pasca-Pelatihan", desc: "Format laporan hasil pelatihan untuk kebutuhan evaluasi internal.", status: "Dalam persiapan" },
];

const ICONS: Record<ResourceType, React.ReactNode> = {
  "E-book": <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />,
  "Template": <path strokeLinecap="round" strokeLinejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />,
  "Modul": <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
  "Checklist": <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />,
};

export default function ResourcesPage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden px-5 pt-16 md:pt-24 pb-12 md:pb-14">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[520px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(255,138,0,0.13) 0%, rgba(255,90,95,0.06) 40%, transparent 70%)" }} />
        <div data-reveal className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 text-[#64748B] bg-white" style={{ border: "1px solid rgb(234, 222, 210)" }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgb(255,138,0)" }} />
            Resources untuk HR &amp; L&amp;D
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">Panduan pelatihan <GradientText>praktis</GradientText>{" "}untuk organisasi</h1>
          <p className="text-[#64748B] text-base md:text-lg max-w-2xl mx-auto leading-relaxed">Gunakan panduan brief yang tersedia sekarang. Resource lain sedang kami siapkan dan akan diterbitkan setelah materinya selesai diverifikasi.</p>
        </div>
      </section>

      <section className="px-5 pb-16 md:pb-20">
        <div data-reveal className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {RESOURCES.map((resource) => {
            const style = RESOURCE_TYPES[resource.type];
            return (
              <article key={resource.title} className="bg-white rounded-2xl overflow-hidden flex flex-col" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                <div className="h-28 flex items-center justify-center relative" style={{ background: style.gradient }}>
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{ICONS[resource.type]}</svg>
                  <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-1 rounded-md" style={{ background: "rgba(0,0,0,0.18)" }}>{resource.type}</span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h2 className="font-bold text-[#0F172A] text-sm leading-snug mb-2">{resource.title}</h2>
                  <p className="text-xs text-[#64748B] leading-relaxed flex-1 mb-4">{resource.desc}</p>
                  {resource.href ? (
                    <Link href={resource.href} className="w-full text-center text-sm font-bold py-2.5 rounded-xl hover:opacity-90" style={{ background: style.bg, color: style.color }}>Gunakan Panduan</Link>
                  ) : (
                    <span className="w-full text-center text-xs font-semibold py-2.5 rounded-xl bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]">{resource.status}</span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="py-16 px-5" style={{ borderTop: "1.5px solid rgb(240, 217, 200)" }}>
        <div className="max-w-3xl mx-auto text-center bg-white rounded-3xl p-10 shadow-sm" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
          <h2 className="text-2xl font-bold text-[#0F172A] mb-3">Butuh panduan yang lebih spesifik?</h2>
          <p className="text-sm text-[#64748B] mb-7 max-w-lg mx-auto">Ceritakan kebutuhan tim Anda. Kami akan membantu memetakan program dan output yang relevan tanpa menjanjikan resource yang belum tersedia.</p>
          <Link href="/contact?source=resources" className="inline-flex text-white text-sm font-bold px-7 py-3 rounded-full hover:opacity-90" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>Diskusikan Kebutuhan →</Link>
        </div>
      </section>
    </MarketingShell>
  );
}
