import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

const STATS = [
  { value: "1998", label: "Mulai mendampingi pelatihan" },
  { value: "39+", label: "Dokumentasi terkurasi" },
  { value: "21+", label: "Organisasi dalam arsip" },
  { value: "6+", label: "Sektor industri" },
];

const SECTORS = [
  {
    label: "Perbankan",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l9-4 9 4M3 6v14l9 4 9-4V6M3 6l9 4 9-4" />
      </svg>
    ),
  },
  {
    label: "Regulator",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    label: "FMCG",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    label: "Pendidikan",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Pemerintahan",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
      </svg>
    ),
  },
  {
    label: "Korporasi",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const GALLERY = [
  {
    src: "/images/training/hero-training-session.webp",
    alt: "Suasana training korporat Skillary",
    caption: "Sesi Training",
    colSpan: "md:col-span-2",
    rowSpan: "md:row-span-2",
  },
  {
    src: "/images/training/group-discussion-v2.webp",
    alt: "Diskusi kelompok peserta pelatihan",
    caption: "Diskusi Peserta",
  },
  {
    src: "/images/training/trainer-guidance-v2.webp",
    alt: "Trainer mendampingi peserta",
    caption: "Pendampingan Trainer",
  },
  {
    src: "/images/training/assessment-session-v2.webp",
    alt: "Sesi assessment program pelatihan",
    caption: "Assessment Program",
  },
  {
    src: "/images/training/hr-report-review.webp",
    alt: "HR meninjau laporan peserta training",
    caption: "Laporan HR / L&D",
  },
];

export function DocumentasiSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#0F172A]" id="dokumentasi">
      <Container>
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest mb-5"
            style={{
              background: 'rgba(255, 138, 0, 0.12)',
              color: 'rgb(255, 175, 80)',
              border: '1px solid rgba(255, 138, 0, 0.25)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(255,138,0)] inline-block" />
            Dokumentasi & Portofolio
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white mb-4 leading-tight">
            Pengalaman Nyata di Balik Platform Ini
          </h2>
          <p className="text-[#94A3B8] text-lg leading-relaxed">
            Skillary lahir dari pengalaman mendampingi pelatihan korporat sejak 1998 di berbagai sektor—dari perbankan, regulasi, hingga pendidikan dan pemerintahan.
          </p>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 text-center"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="text-3xl font-extrabold text-white mb-1">{stat.value}</p>
              <p className="text-xs text-[#64748B] font-medium leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Photo Gallery Mosaic */}
        <div className="grid md:grid-cols-3 gap-3 mb-12 auto-rows-[200px]">
          {GALLERY.map((photo, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl overflow-hidden group ${photo.colSpan ?? ''} ${photo.rowSpan ?? ''}`}
              style={{ border: '1px solid rgba(255,255,255,0.07)' }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-4 text-xs font-bold text-white/80 tracking-wide">
                {photo.caption}
              </span>
            </div>
          ))}
        </div>

        {/* Sector Pills */}
        <div className="mb-10">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-[#475569] mb-5">
            Sektor yang Pernah Dilayani
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {SECTORS.map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#CBD5E1',
                }}
              >
                <span className="text-[rgb(255,138,0)]">{s.icon}</span>
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/portofolio">
            <button
              className="px-7 py-3.5 rounded-full font-bold text-sm text-white shadow-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
              style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
            >
              Lihat Portofolio Lengkap
            </button>
          </Link>
          <Link href="/contact">
            <button
              className="px-7 py-3.5 rounded-full font-bold text-sm hover:-translate-y-0.5 transition-all"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#CBD5E1',
              }}
            >
              Diskusikan Kebutuhan Training
            </button>
          </Link>
        </div>

        <p className="text-center mt-8 text-[10px] text-[#475569] italic">
          Dokumentasi adalah arsip pengalaman pelatihan Allman yang dikurasi sebagai referensi pengembangan Skillary.
        </p>
      </Container>
    </section>
  );
}
