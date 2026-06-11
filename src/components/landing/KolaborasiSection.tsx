import React from 'react';
import Link from 'next/link';

export const KolaborasiSection = () => {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-5 md:px-6 lg:px-8 relative overflow-hidden">
<div className="absolute inset-0" style={{'background': 'linear-gradient(135deg, rgb(255, 138, 0) 0%, rgb(255, 90, 95) 55%, rgb(236, 72, 153) 100%)'}}>
</div>
<div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none">
</div>
<div className="absolute -bottom-16 -right-16 w-72 h-72 rounded-full bg-white/5 pointer-events-none">
</div>
<div className="relative max-w-2xl mx-auto text-center">
<div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
<svg aria-hidden="true" className="lucide lucide-briefcase w-7 h-7 text-white" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
<rect height="14" rx="2" width="20" x="2" y="6" />
</svg>
</div>
<h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
       Siap Meningkatkan Kompetensi Tim Anda?
      </h2>
<p className="text-orange-100 text-sm md:text-base leading-relaxed mb-8">
       Hubungi kami untuk mendiskusikan program pelatihan yang sesuai dengan kebutuhan organisasi Anda. Konsultasi gratis.
      </p>
<div className="flex flex-col sm:flex-row gap-3 justify-center">
<Link href="/proposal" className="inline-flex items-center justify-center gap-2 font-bold text-sm px-7 py-3.5 rounded-full transition-all hover:scale-105" style={{'background': 'white', 'color': 'rgb(255, 90, 95)', 'boxShadow': 'rgba(0, 0, 0, 0.15) 0px 6px 20px'}}>
        Diskusikan Kebutuhan Training
        <svg aria-hidden="true" className="lucide lucide-arrow-right w-4 h-4" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M5 12h14" />
<path d="m12 5 7 7-7 7" />
</svg>
</Link>
<Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-white/20 text-white border border-white/30 font-bold text-sm px-7 py-3.5 rounded-full hover:bg-white/30 transition-colors">
        Diskusikan Kebutuhan
       </Link>
</div>
</div>
</section>
  );
};
