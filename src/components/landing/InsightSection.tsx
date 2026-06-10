import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const InsightSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-5 md:px-6 lg:px-8" style={{ background: 'rgb(255, 251, 245)' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border bg-white" style={{ borderColor: 'rgb(255, 214, 165)' }}>
            <svg aria-hidden="true" className="lucide lucide-sparkles w-4 h-4 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
              <path d="M20 2v4" />
              <path d="M22 4h-4" />
              <circle cx="4" cy="20" r="2" />
            </svg>
            <span className="text-[10px] font-bold text-skillary-orange uppercase tracking-widest">
              Insight & Template
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-skillary-navy leading-tight mb-5">
            Susun Pelatihan yang Tepat Sasaran dengan{' '}
            <span className="gradient-text">
              Training Brief
            </span>
          </h2>
          <p className="text-skillary-muted text-base leading-relaxed mb-8 max-w-lg">
            Seringkali pelatihan gagal karena brief yang kurang jelas. Unduh template standar industri ini untuk membantu Anda dan tim HR/L&D merumuskan kebutuhan, metrik keberhasilan, dan ekspektasi pelatihan dengan presisi.
          </p>
          <Link href="/training-brief" className="inline-flex items-center gap-2.5 text-white font-bold text-sm px-8 py-3.5 rounded-full hover:opacity-90 transition-transform hover:scale-105 shadow-banner w-full sm:w-auto justify-center" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
            <svg aria-hidden="true" className="lucide lucide-download w-4 h-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 15V3" />
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <path d="m7 10 5 5 5-5" />
            </svg>
            Unduh Template Gratis
          </Link>
        </div>
        
        <div className="flex-1 w-full relative mt-8 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/40 to-pink-200/40 rounded-[2.5rem] transform rotate-3 scale-105" style={{ zIndex: 0 }}></div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white" style={{ zIndex: 1 }}>
            <Image 
              src="/images/resource-template.png" 
              alt="Training Brief Template Mockup" 
              width={600} 
              height={450} 
              className="w-full h-auto object-cover"
            />
          </div>
          {/* Floating badge */}
          <div className="absolute -bottom-6 -left-2 md:-left-6 bg-white py-3 px-5 rounded-2xl shadow-xl border flex items-center gap-3" style={{ zIndex: 2, borderColor: 'rgb(240, 217, 200)' }}>
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 text-green-600">
              <svg aria-hidden="true" className="lucide lucide-check w-5 h-5" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M20 6 9 17l-5-5"/></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-skillary-navy">Siap Pakai</p>
              <p className="text-[10px] text-skillary-muted">Format standar industri</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
