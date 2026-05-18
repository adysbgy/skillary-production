import React from 'react';

export const TestimoniSection = () => {
  return (
    <section className="py-16 px-5 bg-white">
<div className="max-w-6xl mx-auto">
<div className="text-center mb-10">
<h2 className="text-2xl md:text-3xl font-extrabold text-skillary-navy mb-2">
        Kebutuhan yang Sering Dibantu{' '}
        <span className="gradient-text">
         Skillary
        </span>
</h2>
<p className="text-skillary-muted text-sm">
        Beberapa tantangan umum yang dapat dibantu oleh platform Skillary.
       </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
{/* Use Case 1 */}
<div className="bg-white rounded-2xl p-6 card-hover flex flex-col gap-4" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{'background': 'rgb(255, 244, 232)'}}>
<svg aria-hidden="true" className="lucide lucide-chart-column w-5 h-5 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3v16a2 2 0 0 0 2 2h16" />
<path d="M18 17V9" />
<path d="M13 17V5" />
<path d="M8 17v-3" />
</svg>
</div>
<h3 className="text-sm font-bold text-skillary-navy">
         HR ingin laporan training lebih cepat.
        </h3>
<p className="text-skillary-navy text-sm leading-relaxed flex-1">
         Skillary membantu menyusun data peserta, progress, assessment, dan sertifikat dalam format yang lebih mudah dipantau.
        </p>
<div className="flex items-center gap-3 pt-3 border-t" style={{'borderColor': 'rgb(240, 217, 200)'}}>
<div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{'background': 'rgb(139, 92, 246)'}}>
          HR
         </div>
<div>
<p className="text-sm font-bold text-skillary-navy">
           Human Resources
          </p>
<p className="text-xs text-skillary-muted">
           Laporan &amp; Monitoring
          </p>
</div>
</div>
</div>

{/* Use Case 2 */}
<div className="bg-white rounded-2xl p-6 card-hover flex flex-col gap-4" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{'background': 'rgb(255, 244, 232)'}}>
<svg aria-hidden="true" className="lucide lucide-users w-5 h-5 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
<path d="M16 3.128a4 4 0 0 1 0 7.744" />
<path d="M22 21v-2a4 4 0 0 0-3-3.87" />
<circle cx="9" cy="7" r="4" />
</svg>
</div>
<h3 className="text-sm font-bold text-skillary-navy">
         L&amp;D ingin progress peserta lebih terlihat.
        </h3>
<p className="text-skillary-navy text-sm leading-relaxed flex-1">
         Setiap batch dapat dipantau melalui status peserta, penyelesaian materi, dan kebutuhan follow-up.
        </p>
<div className="flex items-center gap-3 pt-3 border-t" style={{'borderColor': 'rgb(240, 217, 200)'}}>
<div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{'background': 'rgb(16, 185, 129)'}}>
          LD
         </div>
<div>
<p className="text-sm font-bold text-skillary-navy">
           Learning &amp; Development
          </p>
<p className="text-xs text-skillary-muted">
           Progress &amp; Follow-up
          </p>
</div>
</div>
</div>

{/* Use Case 3 */}
<div className="bg-white rounded-2xl p-6 card-hover flex flex-col gap-4" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
<div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{'background': 'rgb(255, 244, 232)'}}>
<svg aria-hidden="true" className="lucide lucide-award w-5 h-5 text-skillary-orange" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
<circle cx="12" cy="8" r="6" />
</svg>
</div>
<h3 className="text-sm font-bold text-skillary-navy">
         Organisasi ingin sertifikat tidak dibuat manual.
        </h3>
<p className="text-skillary-navy text-sm leading-relaxed flex-1">
         Sertifikat dapat disiapkan sebagai bagian dari alur penyelesaian program dan assessment.
        </p>
<div className="flex items-center gap-3 pt-3 border-t" style={{'borderColor': 'rgb(240, 217, 200)'}}>
<div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0" style={{'background': 'rgb(255, 90, 95)'}}>
          ORG
         </div>
<div>
<p className="text-sm font-bold text-skillary-navy">
           Organisasi
          </p>
<p className="text-xs text-skillary-muted">
           Sertifikat &amp; Assessment
          </p>
</div>
</div>
</div>
</div>
</div>
</section>
  );
};
