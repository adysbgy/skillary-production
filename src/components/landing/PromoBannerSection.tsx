import React from 'react';
import Link from 'next/link';

const BENEFITS = [
  { icon: '🎯', label: 'Onboarding' },
  { icon: '📈', label: 'Upskilling' },
  { icon: '📋', label: 'Assessment' },
  { icon: '🏅', label: 'Sertifikasi' },
];

export const PromoBannerSection = () => {
  return (
    <section className="px-5 pb-10 max-w-6xl mx-auto">
      <div
        className="relative rounded-3xl overflow-hidden shadow-banner"
        style={{
          background: 'linear-gradient(135deg, rgb(255, 138, 0) 0%, rgb(255, 90, 95) 55%, rgb(236, 72, 153) 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white opacity-5" />
          <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-yellow-300 opacity-10" />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-white opacity-5" />
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-0 min-h-[280px]">
          {/* ─── Left Column ─── */}
          <div className="flex-1 p-8 md:p-10">
            <div className="inline-block bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
              Solusi Training Organisasi
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight tracking-tight">
              Program Pelatihan
              <br />
              Siap Pakai untuk Tim Anda
            </h2>
            <p className="text-orange-100 text-base font-semibold mb-1">
              Dari onboarding hingga sertifikasi —
            </p>
            <p className="text-orange-200 text-sm mb-6">
              <span className="text-white font-bold">
                satu platform untuk semua kebutuhan pengembangan SDM.
              </span>
            </p>

            {/* Benefit Pills */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {BENEFITS.map(({ icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20"
                >
                  <span>{icon}</span>
                  {label}
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/services"
                className="inline-block font-bold text-sm px-7 py-3 rounded-full shadow-lg uppercase tracking-wide transition-all hover:scale-105"
                style={{
                  background: 'white',
                  color: 'rgb(255, 90, 95)',
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 6px 20px',
                }}
              >
                Lihat Solusi Organisasi
              </Link>
              <Link
                href="/proposal"
                className="inline-block font-semibold text-sm px-6 py-3 rounded-full transition-all hover:scale-105 border border-white/40 text-white hover:bg-white/10"
              >
                Jadwalkan Konsultasi
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-white opacity-20 self-stretch my-8" />

          {/* ─── Right Column ─── */}
          <div className="flex-1 p-8 md:p-10 relative">
            {/* Floating Icons */}
            <div className="absolute top-6 left-6 float-1">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg aria-hidden="true" className="lucide lucide-cpu w-5 h-5 text-yellow-200" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 20v2" /><path d="M12 2v2" /><path d="M17 20v2" /><path d="M17 2v2" />
                  <path d="M2 12h2" /><path d="M2 17h2" /><path d="M2 7h2" /><path d="M20 12h2" />
                  <path d="M20 17h2" /><path d="M20 7h2" /><path d="M7 20v2" /><path d="M7 2v2" />
                  <rect height="16" rx="2" width="16" x="4" y="4" /><rect height="8" rx="1" width="8" x="8" y="8" />
                </svg>
              </div>
            </div>
            <div className="absolute top-14 left-24 float-2">
              <div className="w-9 h-9 bg-white/15 rounded-lg flex items-center justify-center">
                <svg aria-hidden="true" className="lucide lucide-code-xml w-4 h-4 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m18 16 4-4-4-4" /><path d="m6 8-4 4 4 4" /><path d="m14.5 4-5 16" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-8 left-8 float-3">
              <div className="w-9 h-9 bg-pink-300/30 rounded-lg flex items-center justify-center">
                <svg aria-hidden="true" className="lucide lucide-palette w-4 h-4 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
                  <circle cx="13.5" cy="6.5" fill="currentColor" r=".5" /><circle cx="17.5" cy="10.5" fill="currentColor" r=".5" />
                  <circle cx="6.5" cy="12.5" fill="currentColor" r=".5" /><circle cx="8.5" cy="7.5" fill="currentColor" r=".5" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-16 left-32 float-4">
              <div className="w-8 h-8 bg-yellow-400/40 rounded-lg flex items-center justify-center">
                <svg aria-hidden="true" className="lucide lucide-chart-column w-4 h-4 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />
                </svg>
              </div>
            </div>
            <div className="absolute top-6 right-6 float-5">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <svg aria-hidden="true" className="lucide lucide-award w-5 h-5 text-yellow-300" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
                  <circle cx="12" cy="8" r="6" />
                </svg>
              </div>
            </div>
            <div className="absolute top-20 right-2 float-6">
              <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                <svg aria-hidden="true" className="lucide lucide-briefcase w-4 h-4 text-orange-100" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect height="14" rx="2" width="20" x="2" y="6" />
                </svg>
              </div>
            </div>

            <p className="text-orange-200 text-sm font-medium mb-1 text-right">
              Platform Pelatihan
            </p>
            <h3 className="text-4xl md:text-5xl font-black text-white leading-tight text-right">
              untuk HR, L&D,
              <br />
              <span className="text-yellow-300">dan Organisasi</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};
