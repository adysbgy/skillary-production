import React from 'react';
import Link from 'next/link';

export const BeritaSection = () => {
  return (
    <section className="py-16 px-5 bg-white">
<div className="max-w-6xl mx-auto">
<div className="text-center mb-8">
<h2 className="text-2xl md:text-3xl font-extrabold text-skillary-navy mb-2">
        Resources untuk{' '}
        <span className="gradient-text">
         HR &amp; L&amp;D
        </span>
</h2>
<p className="text-skillary-muted text-sm">
        Materi pendukung untuk membantu menyiapkan kebutuhan training organisasi.
       </p>
</div>
<div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
{/* Resource 1 */}
<div className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-36 flex items-center justify-center relative overflow-hidden" style={{'background': 'rgb(255, 244, 232)'}}>
<div className="absolute top-3 right-3 w-20 h-20 rounded-full opacity-20" style={{'background': 'rgb(255, 138, 0)'}}></div>
<svg aria-hidden="true" className="lucide lucide-briefcase w-12 h-12 opacity-60 relative z-10" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" style={{'color': 'rgb(255, 138, 0)'}} viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
<rect height="14" rx="2" width="20" x="2" y="6" />
</svg>
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
           Lihat Resources
           <svg aria-hidden="true" className="lucide lucide-arrow-right w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
</div>
</div>

{/* Resource 2 */}
<div className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-36 flex items-center justify-center relative overflow-hidden" style={{'background': 'rgb(240, 253, 244)'}}>
<div className="absolute top-3 right-3 w-20 h-20 rounded-full opacity-20" style={{'background': 'rgb(16, 185, 129)'}}></div>
<svg aria-hidden="true" className="lucide lucide-layers w-12 h-12 opacity-60 relative z-10" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" style={{'color': 'rgb(16, 185, 129)'}} viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" />
<path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" />
<path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />
</svg>
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
           Lihat Resources
           <svg aria-hidden="true" className="lucide lucide-arrow-right w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
</div>
</div>

{/* Resource 3 */}
<div className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-36 flex items-center justify-center relative overflow-hidden" style={{'background': 'rgb(245, 243, 255)'}}>
<div className="absolute top-3 right-3 w-20 h-20 rounded-full opacity-20" style={{'background': 'rgb(139, 92, 246)'}}></div>
<svg aria-hidden="true" className="lucide lucide-book-open w-12 h-12 opacity-60 relative z-10" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" style={{'color': 'rgb(139, 92, 246)'}} viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 7v14" />
<path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
</svg>
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
<Link href="/training-brief" className="ml-auto text-skillary-orange text-[10px] font-semibold flex items-center gap-0.5 hover:underline">
           Lihat Resources
           <svg aria-hidden="true" className="lucide lucide-arrow-right w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
</div>
</div>

{/* Resource 4 */}
<div className="flex-shrink-0 w-64 bg-white rounded-2xl overflow-hidden card-hover" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-36 flex items-center justify-center relative overflow-hidden" style={{'background': 'rgb(255, 241, 242)'}}>
<div className="absolute top-3 right-3 w-20 h-20 rounded-full opacity-20" style={{'background': 'rgb(255, 90, 95)'}}></div>
<svg aria-hidden="true" className="lucide lucide-folder-open w-12 h-12 opacity-60 relative z-10" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" style={{'color': 'rgb(255, 90, 95)'}} viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
</svg>
</div>
<div className="p-4">
<h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
          Portfolio Pengalaman
         </h3>
<p className="text-xs text-skillary-muted leading-relaxed line-clamp-3 mb-3">
          Arsip pengalaman pelatihan Allman yang menjadi fondasi Skillary.
         </p>
<div className="pt-3 border-t flex items-center gap-2" style={{'borderColor': 'rgb(240, 217, 200)'}}>
<div className="px-2.5 py-1 rounded text-[9px] font-black" style={{'background': 'rgb(255, 244, 232)', 'color': 'rgb(255, 138, 0)'}}>
           RESOURCE
          </div>
<Link href="/portfolio" className="ml-auto text-skillary-orange text-[10px] font-semibold flex items-center gap-0.5 hover:underline">
           Lihat Resources
           <svg aria-hidden="true" className="lucide lucide-arrow-right w-3 h-3" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
</div>
</div>
</div>
</div>
</section>
  );
};
