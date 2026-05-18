import React from 'react';
import Link from 'next/link';

export const InsightSection = () => {
  return (
    <section className="py-20 px-5" style={{'background': 'rgb(255, 251, 245)'}}>
<div className="max-w-2xl mx-auto text-center">
<div className="flex items-center justify-center gap-2 mb-6">
<svg aria-hidden="true" className="lucide lucide-sparkles w-4 h-4 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
<path d="M20 2v4" />
<path d="M22 4h-4" />
<circle cx="4" cy="20" r="2" />
</svg>
<span className="text-xs font-semibold text-skillary-muted uppercase tracking-widest">
        Insight &amp; Template
       </span>
<svg aria-hidden="true" className="lucide lucide-sparkles w-4 h-4 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
<path d="M20 2v4" />
<path d="M22 4h-4" />
<circle cx="4" cy="20" r="2" />
</svg>
</div>
<h2 className="text-2xl md:text-3xl font-extrabold text-skillary-navy leading-snug mb-4">
       Insight{' '}
       <span className="gradient-text">
        Pelatihan Organisasi
       </span>
</h2>
<p className="text-skillary-muted text-sm md:text-base mb-3 leading-relaxed max-w-lg mx-auto">
       Panduan dan template untuk membantu HR/L&amp;D menyiapkan training brief, proposal, dan laporan pelatihan.
      </p>
<div className="flex items-center justify-center my-5">
<svg aria-hidden="true" className="lucide lucide-sparkles w-6 h-6 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
<path d="M20 2v4" />
<path d="M22 4h-4" />
<circle cx="4" cy="20" r="2" />
</svg>
</div>
<p className="text-skillary-muted text-sm leading-relaxed mb-8 max-w-md mx-auto">
       Unduh template training brief untuk membantu merumuskan kebutuhan pelatihan organisasi Anda.
      </p>
<Link href="/training-brief" className="inline-flex items-center gap-2.5 text-white font-bold text-sm px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-banner" style={{'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95), rgb(236, 72, 153))'}}>
<svg aria-hidden="true" className="lucide lucide-download w-4 h-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M12 15V3" />
<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
<path d="m7 10 5 5 5-5" />
</svg>
       Unduh Template Training Brief
      </Link>
</div>
</section>
  );
};
