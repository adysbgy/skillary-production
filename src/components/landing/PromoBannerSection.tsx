import React from 'react';
import Link from 'next/link';

export const PromoBannerSection = () => {
  return (
    <section className="py-16 md:py-20 px-5 md:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
      <div
        className="relative rounded-3xl overflow-hidden shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #0B1220 0%, #1E293B 100%)',
        }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white opacity-5" />
          <div className="absolute -bottom-16 -left-12 w-64 h-64 rounded-full bg-[#F97316] opacity-10" />
          <div className="absolute top-1/2 right-1/4 w-48 h-48 rounded-full bg-white opacity-5" />
        </div>

        <div className="relative flex flex-col md:flex-row items-center gap-0 min-h-[280px]">
          {/* ─── Left Column ─── */}
          <div className="flex-1 p-8 md:p-10">
            <div className="inline-block bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Solusi Training Organisasi
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight tracking-tight">
              Program Pelatihan
              <br />
              Siap Pakai untuk Tim Anda
            </h2>
            <p className="text-[#94A3B8] text-base font-medium mb-8 max-w-lg">
              Dari onboarding hingga sertifikasi — satu platform terpusat untuk semua kebutuhan pengembangan SDM.
            </p>

            {/* Benefit Pills */}
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm text-white text-xs font-semibold px-3.5 py-2 rounded-full border border-white/10 shadow-sm">
                <svg className="w-4 h-4 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
                Onboarding
              </span>
              <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm text-white text-xs font-semibold px-3.5 py-2 rounded-full border border-white/10 shadow-sm">
                <svg className="w-4 h-4 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" /></svg>
                Upskilling
              </span>
              <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm text-white text-xs font-semibold px-3.5 py-2 rounded-full border border-white/10 shadow-sm">
                <svg className="w-4 h-4 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" /></svg>
                Assessment
              </span>
              <span className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm text-white text-xs font-semibold px-3.5 py-2 rounded-full border border-white/10 shadow-sm">
                <svg className="w-4 h-4 text-[#F97316]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.675v.525a1.5 1.5 0 01-1.5 1.5H9a1.5 1.5 0 01-1.5-1.5v-.525m9-10.05v.525a1.5 1.5 0 01-1.5 1.5H9a1.5 1.5 0 01-1.5-1.5v-.525m9 10.05c0 1.036-.84 1.875-1.875 1.875h-5.25A1.875 1.875 0 017.5 19.2V4.8C7.5 3.764 8.34 2.925 9.375 2.925h5.25c1.035 0 1.875.84 1.875 1.875v13.875zM12 9.75v3m0 0l-1.5-1.5m1.5 1.5l1.5-1.5" /></svg>
                Sertifikasi
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/untuk-organisasi"
                className="inline-block font-bold text-sm px-7 py-3 rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: '#F97316',
                  color: '#FFFFFF',
                  boxShadow: '0 10px 25px -5px rgba(249, 115, 22, 0.4)',
                }}
              >
                Lihat Solusi Organisasi
              </Link>
              <Link
                href="/contact?type=proposal&source=proposal"
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
      </div>
    </section>
  );
};
