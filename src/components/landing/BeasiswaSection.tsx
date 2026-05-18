import React from 'react';
import Link from 'next/link';

export const BeasiswaSection = () => {
  return (
    <section className="py-14 px-5" style={{'background': 'rgb(255, 251, 245)'}}>
<div className="max-w-6xl mx-auto">
<div className="flex items-center gap-3 mb-6">
<div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{'background': 'rgb(255, 244, 232)'}}>
<svg aria-hidden="true" className="lucide lucide-briefcase w-5 h-5 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
<rect height="14" rx="2" width="20" x="2" y="6" />
</svg>
</div>
<h2 className="text-xl md:text-2xl font-extrabold text-skillary-navy">
        Solusi untuk Organisasi
       </h2>
</div>
<div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
{/* Card 1: In-House Training */}
<div className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-32 flex flex-col items-center justify-center gap-2 relative overflow-hidden" style={{'background': 'linear-gradient(135deg, rgb(124, 58, 237), rgb(167, 139, 250))'}}>
<div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-white/10"></div>
<div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
<svg aria-hidden="true" className="lucide lucide-layers w-6 h-6 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
<path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
<path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
</svg>
</div>
<div className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          Solusi Organisasi
         </div>
</div>
<div className="p-4">
<div className="flex items-center gap-1.5 mb-2">
<div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
<span className="text-[10px] text-green-600 font-semibold">Tersedia untuk Diskusi</span>
</div>
<h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
          In-House Training
         </h3>
<p className="text-[10px] text-skillary-muted mb-3">
          Program pelatihan untuk kebutuhan internal organisasi.
         </p>
<Link href="/contact" className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all hover:opacity-90" style={{'background': 'rgb(255, 244, 232)', 'color': 'rgb(255, 138, 0)', 'border': '1.5px solid rgb(255, 214, 165)'}}>
          Diskusikan Solusi
          <svg aria-hidden="true" className="lucide lucide-arrow-right w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
</div>

{/* Card 2: Managed Learning */}
<div className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-32 flex flex-col items-center justify-center gap-2 relative overflow-hidden" style={{'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(251, 191, 36))'}}>
<div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-white/10"></div>
<div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
<svg aria-hidden="true" className="lucide lucide-chart-column w-6 h-6 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3v16a2 2 0 0 0 2 2h16" />
<path d="M18 17V9" />
<path d="M13 17V5" />
<path d="M8 17v-3" />
</svg>
</div>
<div className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          Solusi Organisasi
         </div>
</div>
<div className="p-4">
<div className="flex items-center gap-1.5 mb-2">
<div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
<span className="text-[10px] text-green-600 font-semibold">Tersedia untuk Diskusi</span>
</div>
<h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
          Managed Learning
         </h3>
<p className="text-[10px] text-skillary-muted mb-3">
          Alur pelatihan, peserta, dan progress dikelola lebih terstruktur.
         </p>
<Link href="/contact" className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all hover:opacity-90" style={{'background': 'rgb(255, 244, 232)', 'color': 'rgb(255, 138, 0)', 'border': '1.5px solid rgb(255, 214, 165)'}}>
          Diskusikan Solusi
          <svg aria-hidden="true" className="lucide lucide-arrow-right w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
</div>

{/* Card 3: Assessment Program */}
<div className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-32 flex flex-col items-center justify-center gap-2 relative overflow-hidden" style={{'background': 'linear-gradient(135deg, rgb(5, 150, 105), rgb(52, 211, 153))'}}>
<div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-white/10"></div>
<div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
<svg aria-hidden="true" className="lucide lucide-award w-6 h-6 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
<circle cx="12" cy="8" r="6" />
</svg>
</div>
<div className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          Solusi Organisasi
         </div>
</div>
<div className="p-4">
<div className="flex items-center gap-1.5 mb-2">
<div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
<span className="text-[10px] text-green-600 font-semibold">Tersedia untuk Diskusi</span>
</div>
<h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
          Assessment Program
         </h3>
<p className="text-[10px] text-skillary-muted mb-3">
          Evaluasi peserta terdokumentasi dalam satu alur.
         </p>
<Link href="/contact" className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all hover:opacity-90" style={{'background': 'rgb(255, 244, 232)', 'color': 'rgb(255, 138, 0)', 'border': '1.5px solid rgb(255, 214, 165)'}}>
          Diskusikan Solusi
          <svg aria-hidden="true" className="lucide lucide-arrow-right w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
</div>

{/* Card 4: Platform Setup */}
<div className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-32 flex flex-col items-center justify-center gap-2 relative overflow-hidden" style={{'background': 'linear-gradient(135deg, rgb(255, 90, 95), rgb(236, 72, 153))'}}>
<div className="absolute top-2 right-2 w-16 h-16 rounded-full bg-white/10"></div>
<div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
<svg aria-hidden="true" className="lucide lucide-cpu w-6 h-6 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 20v2" />
<path d="M12 2v2" />
<path d="M17 20v2" />
<path d="M17 2v2" />
<path d="M2 12h2" />
<path d="M2 17h2" />
<path d="M2 7h2" />
<path d="M20 12h2" />
<path d="M20 17h2" />
<path d="M20 7h2" />
<path d="M7 20v2" />
<path d="M7 2v2" />
<rect height="16" rx="2" width="16" x="4" y="4" />
<rect height="8" rx="1" width="8" x="8" y="8" />
</svg>
</div>
<div className="bg-white/20 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
          Solusi Organisasi
         </div>
</div>
<div className="p-4">
<div className="flex items-center gap-1.5 mb-2">
<div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
<span className="text-[10px] text-green-600 font-semibold">Tersedia untuk Diskusi</span>
</div>
<h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
          Platform Setup
         </h3>
<p className="text-[10px] text-skillary-muted mb-3">
          Diskusi setup platform untuk kebutuhan training organisasi.
         </p>
<Link href="/contact" className="w-full flex items-center justify-center gap-1.5 text-xs font-bold py-2.5 rounded-xl transition-all hover:opacity-90" style={{'background': 'rgb(255, 244, 232)', 'color': 'rgb(255, 138, 0)', 'border': '1.5px solid rgb(255, 214, 165)'}}>
          Diskusikan Solusi
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
