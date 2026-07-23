import React from 'react';
import Link from 'next/link';

export const LearningPathSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-10 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-extrabold text-skillary-navy mb-2">
              Pilih Alur Pelatihan Sesuai Kebutuhan Organisasi
            </h2>
            <p className="text-skillary-muted text-sm md:text-base">
              Program dapat disusun berdasarkan level peserta, kebutuhan divisi, dan target kompetensi internal.
            </p>
          </div>
          <Link href="/program-catalog" className="inline-flex items-center gap-1 text-skillary-orange text-sm font-semibold hover:underline flex-shrink-0 md:mb-1">
            Lihat Semua Path
            <svg aria-hidden="true" className="lucide lucide-arrow-right w-4 h-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
        <div className="flex gap-4 md:gap-5 lg:gap-6 overflow-x-auto hide-scrollbar pb-6 pt-2 px-5 md:px-6 lg:px-8">
          {/* Path 1: Data-Driven Decision Making */}
<div className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[340px] bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(191, 219, 254)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-2 w-full" style={{'background': 'linear-gradient(90deg, rgb(59, 130, 246), rgba(59, 130, 246, 0.8)'}}></div>
<div className="p-5">
<div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{'background': 'rgb(239, 246, 255)'}}>
<svg aria-hidden="true" className="lucide lucide-chart-column w-6 h-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" style={{'color': 'rgb(59, 130, 246)'}} viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3v16a2 2 0 0 0 2 2h16" />
<path d="M18 17V9" />
<path d="M13 17V5" />
<path d="M8 17v-3" />
</svg>
</div>
<h3 className="font-extrabold text-sm text-skillary-navy mb-3 leading-snug">
          Data-Driven Decision Making Path
         </h3>
<div className="space-y-1.5 mb-4">
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-clock w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6v6l4 2" />
<circle cx="12" cy="12" r="10" />
</svg>
<span>Durasi fleksibel</span>
</div>
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-book-open w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7v14" />
<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
</svg>
<span>4–8 sesi</span>
</div>
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-folder-open w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
</svg>
<span>Output: Report &amp; Sertifikat</span>
</div>
</div>
<Link href="/resources" className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all hover:opacity-90" style={{'background': 'rgb(239, 246, 255)', 'color': 'rgb(59, 130, 246)', 'border': '1.5px solid rgb(191, 219, 254)'}}>
          Susun Path Training
          <svg aria-hidden="true" className="lucide lucide-arrow-right w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
</div>

{/* Path 2: Visual Communication */}
<div className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[340px] bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(221, 214, 254)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-2 w-full" style={{'background': 'linear-gradient(90deg, rgb(139, 92, 246), rgba(139, 92, 246, 0.8)'}}></div>
<div className="p-5">
<div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{'background': 'rgb(245, 243, 255)'}}>
<svg aria-hidden="true" className="lucide lucide-layers w-6 h-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" style={{'color': 'rgb(139, 92, 246)'}} viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
<path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
<path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
</svg>
</div>
<h3 className="font-extrabold text-sm text-skillary-navy mb-3 leading-snug">
          Visual Communication Path
         </h3>
<div className="space-y-1.5 mb-4">
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-clock w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6v6l4 2" />
<circle cx="12" cy="12" r="10" />
</svg>
<span>Durasi fleksibel</span>
</div>
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-book-open w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7v14" />
<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
</svg>
<span>4–6 sesi</span>
</div>
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-folder-open w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
</svg>
<span>Output: Report &amp; Sertifikat</span>
</div>
</div>
<Link href="/resources" className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all hover:opacity-90" style={{'background': 'rgb(245, 243, 255)', 'color': 'rgb(139, 92, 246)', 'border': '1.5px solid rgb(221, 214, 254)'}}>
          Susun Path Training
          <svg aria-hidden="true" className="lucide lucide-arrow-right w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
</div>

{/* Path 3: AI Productivity for Teams */}
<div className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[340px] bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(254, 205, 211)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-2 w-full" style={{'background': 'linear-gradient(90deg, rgb(255, 90, 95), rgba(255, 90, 95, 0.8)'}}></div>
<div className="p-5">
<div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{'background': 'rgb(255, 241, 242)'}}>
<svg aria-hidden="true" className="lucide lucide-brain w-6 h-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" style={{'color': 'rgb(255, 90, 95)'}} viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 18V5" />
<path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
<path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
<path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
<path d="M18 18a4 4 0 0 0 2-7.464" />
<path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
<path d="M6 18a4 4 0 0 1-2-7.464" />
<path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
</svg>
</div>
<h3 className="font-extrabold text-sm text-skillary-navy mb-3 leading-snug">
          AI Productivity for Teams Path
         </h3>
<div className="space-y-1.5 mb-4">
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-clock w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6v6l4 2" />
<circle cx="12" cy="12" r="10" />
</svg>
<span>Durasi fleksibel</span>
</div>
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-book-open w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7v14" />
<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
</svg>
<span>4–6 sesi</span>
</div>
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-folder-open w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
</svg>
<span>Output: Report &amp; Sertifikat</span>
</div>
</div>
<Link href="/resources" className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all hover:opacity-90" style={{'background': 'rgb(255, 241, 242)', 'color': 'rgb(255, 90, 95)', 'border': '1.5px solid rgb(254, 205, 211)'}}>
          Susun Path Training
          <svg aria-hidden="true" className="lucide lucide-arrow-right w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
</div>

{/* Path 4: Leadership & Problem Solving */}
<div className="flex-shrink-0 w-[280px] md:w-[320px] lg:w-[340px] bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(255, 214, 165)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-2 w-full" style={{'background': 'linear-gradient(90deg, rgb(255, 138, 0), rgba(255, 138, 0, 0.8)'}}></div>
<div className="p-5">
<div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{'background': 'rgb(255, 244, 232)'}}>
<svg aria-hidden="true" className="lucide lucide-target w-6 h-6" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" style={{'color': 'rgb(255, 138, 0)'}} viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="10" />
<circle cx="12" cy="12" r="6" />
<circle cx="12" cy="12" r="2" />
</svg>
</div>
<h3 className="font-extrabold text-sm text-skillary-navy mb-3 leading-snug">
          Leadership &amp; Problem Solving Path
         </h3>
<div className="space-y-1.5 mb-4">
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-clock w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 6v6l4 2" />
<circle cx="12" cy="12" r="10" />
</svg>
<span>Durasi fleksibel</span>
</div>
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-book-open w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7v14" />
<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
</svg>
<span>6–8 sesi</span>
</div>
<div className="flex items-center gap-2 text-xs text-skillary-muted">
<svg aria-hidden="true" className="lucide lucide-folder-open w-3.5 h-3.5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
</svg>
<span>Output: Report &amp; Sertifikat</span>
</div>
</div>
<Link href="/resources" className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all hover:opacity-90" style={{'background': 'rgb(255, 244, 232)', 'color': 'rgb(255, 138, 0)', 'border': '1.5px solid rgb(255, 214, 165)'}}>
          Susun Path Training
          <svg aria-hidden="true" className="lucide lucide-arrow-right w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
</div>
        </div>
      </div>
    </section>
  );
};
