import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const BeritaSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-5 md:px-6 lg:px-8 bg-white">
      {/* Section Header — title left, action link right */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-10 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-skillary-navy mb-2">
              Resources untuk{' '}
              <span className="gradient-text">HR &amp; L&amp;D</span>
            </h2>
            <p className="text-skillary-muted text-sm">
              Materi pendukung untuk membantu menyiapkan kebutuhan training organisasi.
            </p>
          </div>
          <Link href="/resources" className="inline-flex items-center gap-1 text-skillary-orange text-sm font-semibold hover:underline flex-shrink-0 sm:mb-1">
            Lihat Semua Resources
            <svg aria-hidden="true" className="w-4 h-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Card row — aligned with heading, right-fade mask */}
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <div className="flex gap-4 md:gap-5 overflow-x-auto hide-scrollbar pb-2 px-5 md:px-6 lg:px-8">

          {/* Resource 1 */}
          <div className="flex-shrink-0 w-[240px] md:w-[260px] bg-white rounded-2xl overflow-hidden card-hover group" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
            <div className="h-36 relative overflow-hidden bg-gray-100 border-b" style={{'borderColor': 'rgb(240, 217, 200)'}}>
              <Image src="/images/resource-profile.png" alt="Company Profile Skillary" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
                Company Profile Skillary
              </h3>
              <p className="text-xs text-skillary-muted leading-relaxed line-clamp-3 mb-3">
                Ringkasan profil Skillary dan arah solusi pelatihan organisasi.
              </p>
              <div className="pt-3 border-t flex items-center gap-2" style={{'borderColor': 'rgb(240, 217, 200)'}}>
                <div className="px-2.5 py-1 rounded text-[9px] font-black" style={{'background': 'rgb(255, 244, 232)', 'color': 'rgb(255, 138, 0)'}}>
                  RESOURCE
                </div>
                <Link href="/resources" className="ml-auto text-skillary-orange text-[10px] font-semibold flex items-center gap-0.5 hover:underline">
                  Lihat
                  <svg aria-hidden="true" className="w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Resource 2 */}
          <div className="flex-shrink-0 w-[240px] md:w-[260px] bg-white rounded-2xl overflow-hidden card-hover group" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
            <div className="h-36 relative overflow-hidden bg-gray-100 border-b" style={{'borderColor': 'rgb(240, 217, 200)'}}>
              <Image src="/images/resource-proposal.png" alt="Corporate Proposal" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
                Corporate Proposal
              </h3>
              <p className="text-xs text-skillary-muted leading-relaxed line-clamp-3 mb-3">
                Materi proposal untuk diskusi awal kebutuhan training organisasi.
              </p>
              <div className="pt-3 border-t flex items-center gap-2" style={{'borderColor': 'rgb(240, 217, 200)'}}>
                <div className="px-2.5 py-1 rounded text-[9px] font-black" style={{'background': 'rgb(255, 244, 232)', 'color': 'rgb(255, 138, 0)'}}>
                  RESOURCE
                </div>
                <Link href="/resources" className="ml-auto text-skillary-orange text-[10px] font-semibold flex items-center gap-0.5 hover:underline">
                  Lihat
                  <svg aria-hidden="true" className="w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Resource 3 */}
          <div className="flex-shrink-0 w-[240px] md:w-[260px] bg-white rounded-2xl overflow-hidden card-hover group" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
            <div className="h-36 relative overflow-hidden bg-gray-100 border-b" style={{'borderColor': 'rgb(240, 217, 200)'}}>
              <Image src="/images/resource-template.png" alt="Training Brief Template" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
                Training Brief Template
              </h3>
              <p className="text-xs text-skillary-muted leading-relaxed line-clamp-3 mb-3">
                Template untuk membantu HR/L&amp;D merumuskan kebutuhan pelatihan.
              </p>
              <div className="pt-3 border-t flex items-center gap-2" style={{'borderColor': 'rgb(240, 217, 200)'}}>
                <div className="px-2.5 py-1 rounded text-[9px] font-black" style={{'background': 'rgb(255, 244, 232)', 'color': 'rgb(255, 138, 0)'}}>
                  RESOURCE
                </div>
                <Link href="/resources" className="ml-auto text-skillary-orange text-[10px] font-semibold flex items-center gap-0.5 hover:underline">
                  Lihat
                  <svg aria-hidden="true" className="w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Resource 4 */}
          <div className="flex-shrink-0 w-[240px] md:w-[260px] bg-white rounded-2xl overflow-hidden card-hover group" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
            <div className="h-36 relative overflow-hidden bg-gray-100 border-b" style={{'borderColor': 'rgb(240, 217, 200)'}}>
              <Image src="/images/resource-portfolio.png" alt="Portfolio Pengalaman" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
                Portfolio Pengalaman
              </h3>
              <p className="text-xs text-skillary-muted leading-relaxed line-clamp-3 mb-3">
                Arsip pengalaman pelatihan profesional yang menjadi fondasi Skillary.
              </p>
              <div className="pt-3 border-t flex items-center gap-2" style={{'borderColor': 'rgb(240, 217, 200)'}}>
                <div className="px-2.5 py-1 rounded text-[9px] font-black" style={{'background': 'rgb(255, 244, 232)', 'color': 'rgb(255, 138, 0)'}}>
                  RESOURCE
                </div>
                <Link href="/portofolio" className="ml-auto text-skillary-orange text-[10px] font-semibold flex items-center gap-0.5 hover:underline">
                  Lihat
                  <svg aria-hidden="true" className="w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
