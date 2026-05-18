import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const KelasUnggulanSection = () => {
  return (
    <section className="py-12" style={{'background': 'rgb(255, 251, 245)'}}>
<div className="max-w-6xl mx-auto px-5">
<div className="flex items-center justify-between mb-6">
<h2 className="text-xl md:text-2xl font-extrabold text-skillary-navy">
        Program Pelatihan Unggulan
       </h2>
<Link href="/program-catalog" className="flex items-center gap-1 text-skillary-orange text-sm font-semibold hover:underline">
        Lihat Semua Program
        <svg aria-hidden="true" className="lucide lucide-arrow-right w-4 h-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
</div>
<div className="flex gap-4 overflow-x-auto hide-scrollbar pb-3">
{/* Card 1: Power BI Business Dashboard */}
<div className="flex-shrink-0 w-60 bg-white rounded-2xl overflow-hidden card-hover group" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-36 relative overflow-hidden bg-gray-100">
<Image src="/images/thumb-powerbi.png" alt="Power BI Dashboard" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
<div className="absolute inset-0 bg-gradient-to-t from-skillary-navy/60 to-transparent pointer-events-none"></div>
<div className="absolute top-2.5 left-2.5 bg-white/95 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
          Program Organisasi
         </div>
</div>
<div className="p-4">
<h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
          Power BI Business Dashboard
         </h3>
<div className="flex items-center gap-2 mb-2">
<span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
           Menengah
          </span>
<span className="text-[10px] text-skillary-muted">
           In-house / Hybrid
          </span>
</div>
<div className="flex items-center gap-1.5 mb-3">
<svg aria-hidden="true" className="lucide lucide-award w-3 h-3 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
<circle cx="12" cy="8" r="6" />
</svg>
<span className="text-[10px] text-skillary-muted">
           Assessment • Sertifikat • Report
          </span>
</div>
<Link href="/proposal" className="block w-full text-center text-white text-xs font-bold py-2 rounded-lg transition-all hover:opacity-90 hover:shadow-md" style={{'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))'}}>
          Minta Proposal
         </Link>
</div>
</div>

{/* Card 2: Data-Driven Decision Making */}
<div className="flex-shrink-0 w-60 bg-white rounded-2xl overflow-hidden card-hover group" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-36 relative overflow-hidden bg-gray-100">
<Image src="/images/thumb-data.png" alt="Data-Driven Decision Making" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
<div className="absolute inset-0 bg-gradient-to-t from-skillary-navy/60 to-transparent pointer-events-none"></div>
<div className="absolute top-2.5 left-2.5 bg-white/95 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
          Program Organisasi
         </div>
</div>
<div className="p-4">
<h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
          Data-Driven Decision Making
         </h3>
<div className="flex items-center gap-2 mb-2">
<span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
           Menengah
          </span>
<span className="text-[10px] text-skillary-muted">
           In-house / Hybrid
          </span>
</div>
<div className="flex items-center gap-1.5 mb-3">
<svg aria-hidden="true" className="lucide lucide-award w-3 h-3 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
<circle cx="12" cy="8" r="6" />
</svg>
<span className="text-[10px] text-skillary-muted">
           Assessment • Sertifikat • Report
          </span>
</div>
<Link href="/proposal" className="block w-full text-center text-white text-xs font-bold py-2 rounded-lg transition-all hover:opacity-90 hover:shadow-md" style={{'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))'}}>
          Minta Proposal
         </Link>
</div>
</div>

{/* Card 3: Infographics & Visual Communication */}
<div className="flex-shrink-0 w-60 bg-white rounded-2xl overflow-hidden card-hover group" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-36 relative overflow-hidden bg-gray-100">
<Image src="/images/thumb-infographic.png" alt="Infographics & Visual Communication" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
<div className="absolute inset-0 bg-gradient-to-t from-skillary-navy/60 to-transparent pointer-events-none"></div>
<div className="absolute top-2.5 left-2.5 bg-white/95 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
          Program Organisasi
         </div>
</div>
<div className="p-4">
<h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
          Infographics &amp; Visual Communication
         </h3>
<div className="flex items-center gap-2 mb-2">
<span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
           Basic
          </span>
<span className="text-[10px] text-skillary-muted">
           In-house / Hybrid
          </span>
</div>
<div className="flex items-center gap-1.5 mb-3">
<svg aria-hidden="true" className="lucide lucide-award w-3 h-3 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
<circle cx="12" cy="8" r="6" />
</svg>
<span className="text-[10px] text-skillary-muted">
           Assessment • Sertifikat • Report
          </span>
</div>
<Link href="/proposal" className="block w-full text-center text-white text-xs font-bold py-2 rounded-lg transition-all hover:opacity-90 hover:shadow-md" style={{'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))'}}>
          Minta Proposal
         </Link>
</div>
</div>

{/* Card 4: Business Presentation & Reporting */}
<div className="flex-shrink-0 w-60 bg-white rounded-2xl overflow-hidden card-hover group" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-36 relative overflow-hidden bg-gray-100">
<Image src="/images/thumb-presentation.png" alt="Business Presentation" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
<div className="absolute inset-0 bg-gradient-to-t from-skillary-navy/60 to-transparent pointer-events-none"></div>
<div className="absolute top-2.5 left-2.5 bg-white/95 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
          Program Organisasi
         </div>
</div>
<div className="p-4">
<h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
          Business Presentation &amp; Reporting
         </h3>
<div className="flex items-center gap-2 mb-2">
<span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
           Basic
          </span>
<span className="text-[10px] text-skillary-muted">
           In-house / Hybrid
          </span>
</div>
<div className="flex items-center gap-1.5 mb-3">
<svg aria-hidden="true" className="lucide lucide-award w-3 h-3 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
<circle cx="12" cy="8" r="6" />
</svg>
<span className="text-[10px] text-skillary-muted">
           Assessment • Sertifikat • Report
          </span>
</div>
<Link href="/program-catalog" className="block w-full text-center text-white text-xs font-bold py-2 rounded-lg transition-all hover:opacity-90 hover:shadow-md" style={{'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))'}}>
          Lihat Program
         </Link>
</div>
</div>

{/* Card 5: AI Productivity for Teams */}
<div className="flex-shrink-0 w-60 bg-white rounded-2xl overflow-hidden card-hover group" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="h-36 relative overflow-hidden bg-gray-100">
<Image src="/images/cert-mockup.png" alt="Sertifikat Resmi Skillary" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
<div className="absolute inset-0 bg-gradient-to-t from-skillary-navy/60 to-transparent pointer-events-none"></div>
<div className="absolute top-2.5 left-2.5 bg-white/95 text-gray-800 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
          Sertifikasi Resmi
         </div>
</div>
<div className="p-4">
<h3 className="font-bold text-sm text-skillary-navy leading-snug mb-2 line-clamp-2">
          Sertifikasi Berstandar Industri
         </h3>
<div className="flex items-center gap-2 mb-2">
<span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
           Basic
          </span>
<span className="text-[10px] text-skillary-muted">
           In-house / Hybrid
          </span>
</div>
<div className="flex items-center gap-1.5 mb-3">
<svg aria-hidden="true" className="lucide lucide-award w-3 h-3 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
<circle cx="12" cy="8" r="6" />
</svg>
<span className="text-[10px] text-skillary-muted">
           Assessment • Sertifikat • Report
          </span>
</div>
<Link href="/proposal" className="block w-full text-center text-white text-xs font-bold py-2 rounded-lg transition-all hover:opacity-90 hover:shadow-md" style={{'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))'}}>
          Minta Proposal
         </Link>
</div>
</div>
</div>
</div>
</section>
  );
};
