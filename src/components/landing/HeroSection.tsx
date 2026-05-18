import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export const HeroSection = () => {
  return (
    <section className="bg-white py-14 px-5 overflow-hidden">
<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
<div className="flex-1 min-w-0">
<div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border" style={{'background': 'rgb(255, 244, 232)', 'borderColor': 'rgb(255, 214, 165)', 'color': 'rgb(255, 138, 0)'}}>
<span className="w-1.5 h-1.5 rounded-full bg-skillary-orange inline-block">
</span>
        🚀 Platform Pelatihan Digital #1 di Indonesia
       </div>
<h1 className="text-[2.6rem] md:text-[3.2rem] font-extrabold leading-[1.15] text-skillary-navy mb-5">
        Bangun{' '}
        <span className="gradient-text">
         Skill Profesional
        </span>
<br className="hidden md:block" />
        yang Dibutuhkan Industri
       </h1>
<p className="text-base text-skillary-muted leading-relaxed mb-6 max-w-md">
        Skillary menyediakan kursus praktis, assessment terstruktur, dan sertifikat digital untuk membantu Anda dan organisasi Anda berkembang lebih cepat.
       </p>
<Link href="/program-catalog" className="flex items-center gap-2 max-w-md bg-white rounded-full px-4 py-2.5 mb-4" style={{'border': '2px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(255, 138, 0, 0.08) 0px 2px 12px'}}>
<svg aria-hidden="true" className="lucide lucide-search w-4 h-4 text-skillary-muted flex-shrink-0" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
<path d="m21 21-4.34-4.34" />
<circle cx="11" cy="11" r="8" />
</svg>
<span className="text-sm text-skillary-muted flex-1">
         Cari program pelatihan...
        </span>
<span className="text-white text-xs font-bold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity" style={{'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))'}}>
         Cari
        </span>
</Link>
<div className="flex flex-wrap items-center gap-2 mb-7">
<span className="text-xs text-skillary-muted font-medium">
         Populer:
        </span>
<Link href="/program-catalog" className="text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-150 hover:scale-105" style={{'background': 'rgb(255, 244, 232)', 'borderColor': 'rgb(255, 214, 165)', 'color': 'rgb(255, 138, 0)'}}>
         Data Analytics
        </Link>
<Link href="/program-catalog" className="text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-150 hover:scale-105" style={{'background': 'rgb(255, 244, 232)', 'borderColor': 'rgb(255, 214, 165)', 'color': 'rgb(255, 138, 0)'}}>
         Power BI
        </Link>
<Link href="/program-catalog" className="text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-150 hover:scale-105" style={{'background': 'rgb(255, 244, 232)', 'borderColor': 'rgb(255, 214, 165)', 'color': 'rgb(255, 138, 0)'}}>
         Infografis
        </Link>
<Link href="/program-catalog" className="text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-150 hover:scale-105" style={{'background': 'rgb(255, 244, 232)', 'borderColor': 'rgb(255, 214, 165)', 'color': 'rgb(255, 138, 0)'}}>
         Presentasi Bisnis
        </Link>
<Link href="/program-catalog" className="text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-150 hover:scale-105" style={{'background': 'rgb(255, 244, 232)', 'borderColor': 'rgb(255, 214, 165)', 'color': 'rgb(255, 138, 0)'}}>
         AI Produktivitas
        </Link>
<Link href="/program-catalog" className="text-xs font-semibold px-3 py-1 rounded-full border transition-all duration-150 hover:scale-105" style={{'background': 'rgb(255, 244, 232)', 'borderColor': 'rgb(255, 214, 165)', 'color': 'rgb(255, 138, 0)'}}>
         SOP &amp; Proses
        </Link>
</div>
<div className="flex items-center gap-3">
<div className="flex items-center">
<div className="w-9 h-9 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{'marginLeft': '0px', 'zIndex': '5'}}>
          A
         </div>
<div className="w-9 h-9 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{'marginLeft': '-8px', 'zIndex': '4'}}>
          S
         </div>
<div className="w-9 h-9 rounded-full bg-green-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{'marginLeft': '-8px', 'zIndex': '3'}}>
          K
         </div>
<div className="w-9 h-9 rounded-full bg-pink-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{'marginLeft': '-8px', 'zIndex': '2'}}>
          P
         </div>
<div className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{'marginLeft': '-8px', 'background': 'rgb(255, 244, 232)', 'color': 'rgb(255, 138, 0)'}}>
          98
         </div>
</div>
<p className="text-sm text-skillary-muted">
         Dipercaya oleh{' '}
         <span className="font-semibold text-skillary-navy">
          500+ profesional
         </span>
         {' '}di berbagai industri
        </p>
</div>
</div>
<div className="flex-shrink-0 w-full md:w-[460px] h-[420px] rounded-3xl relative overflow-hidden" style={{'background': 'rgb(250, 250, 248)'}}>
<Image 
 src="/images/hero-training.png" 
 alt="Corporate Training Session" 
 fill 
 priority 
 className="object-cover" 
/>
<div className="absolute inset-0 bg-skillary-navy/10"></div>
<div className="skill-bubble absolute float-1" style={{'top': '6%', 'left': '8%', 'background': 'white', 'border': '1.5px solid rgb(240, 217, 200)', 'borderRadius': '999px', 'padding': '7px 14px', 'fontSize': '12px', 'fontWeight': '700', 'color': 'rgb(17, 24, 39)', 'whiteSpace': 'nowrap', 'boxShadow': 'rgba(0, 0, 0, 0.08) 0px 4px 16px', 'display': 'flex', 'alignItems': 'center', 'gap': '6px'}}>
<span style={{'display': 'inline-block', 'width': '6px', 'height': '6px', 'borderRadius': '50%', 'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(236, 72, 153))', 'flexShrink': '0'}}>
</span>
        Data Analytics
        <span style={{'position': 'absolute', 'bottom': '-8px', 'left': '18px', 'width': '0px', 'height': '0px', 'borderLeft': '6px solid transparent', 'borderRight': '6px solid transparent', 'borderTop': '8px solid rgb(240, 217, 200)'}}>
</span>
<span style={{'position': 'absolute', 'bottom': '-6px', 'left': '19px', 'width': '0px', 'height': '0px', 'borderLeft': '5px solid transparent', 'borderRight': '5px solid transparent', 'borderTop': '7px solid white'}}>
</span>
</div>
<div className="skill-bubble absolute float-2" style={{'top': '18%', 'left': '52%', 'background': 'white', 'border': '1.5px solid rgb(240, 217, 200)', 'borderRadius': '999px', 'padding': '7px 14px', 'fontSize': '12px', 'fontWeight': '700', 'color': 'rgb(17, 24, 39)', 'whiteSpace': 'nowrap', 'boxShadow': 'rgba(0, 0, 0, 0.08) 0px 4px 16px', 'display': 'flex', 'alignItems': 'center', 'gap': '6px'}}>
<span style={{'display': 'inline-block', 'width': '6px', 'height': '6px', 'borderRadius': '50%', 'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(236, 72, 153))', 'flexShrink': '0'}}>
</span>
        Power BI Dashboard
        <span style={{'position': 'absolute', 'bottom': '-8px', 'left': '18px', 'width': '0px', 'height': '0px', 'borderLeft': '6px solid transparent', 'borderRight': '6px solid transparent', 'borderTop': '8px solid rgb(240, 217, 200)'}}>
</span>
<span style={{'position': 'absolute', 'bottom': '-6px', 'left': '19px', 'width': '0px', 'height': '0px', 'borderLeft': '5px solid transparent', 'borderRight': '5px solid transparent', 'borderTop': '7px solid white'}}>
</span>
</div>
<div className="skill-bubble absolute float-3" style={{'top': '38%', 'left': '4%', 'background': 'white', 'border': '1.5px solid rgb(240, 217, 200)', 'borderRadius': '999px', 'padding': '7px 14px', 'fontSize': '12px', 'fontWeight': '700', 'color': 'rgb(17, 24, 39)', 'whiteSpace': 'nowrap', 'boxShadow': 'rgba(0, 0, 0, 0.08) 0px 4px 16px', 'display': 'flex', 'alignItems': 'center', 'gap': '6px'}}>
<span style={{'display': 'inline-block', 'width': '6px', 'height': '6px', 'borderRadius': '50%', 'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(236, 72, 153))', 'flexShrink': '0'}}>
</span>
        Infografis
        <span style={{'position': 'absolute', 'bottom': '-8px', 'left': '18px', 'width': '0px', 'height': '0px', 'borderLeft': '6px solid transparent', 'borderRight': '6px solid transparent', 'borderTop': '8px solid rgb(240, 217, 200)'}}>
</span>
<span style={{'position': 'absolute', 'bottom': '-6px', 'left': '19px', 'width': '0px', 'height': '0px', 'borderLeft': '5px solid transparent', 'borderRight': '5px solid transparent', 'borderTop': '7px solid white'}}>
</span>
</div>
<div className="skill-bubble absolute float-4" style={{'top': '32%', 'right': '6%', 'background': 'white', 'border': '1.5px solid rgb(240, 217, 200)', 'borderRadius': '999px', 'padding': '7px 14px', 'fontSize': '12px', 'fontWeight': '700', 'color': 'rgb(17, 24, 39)', 'whiteSpace': 'nowrap', 'boxShadow': 'rgba(0, 0, 0, 0.08) 0px 4px 16px', 'display': 'flex', 'alignItems': 'center', 'gap': '6px'}}>
<span style={{'display': 'inline-block', 'width': '6px', 'height': '6px', 'borderRadius': '50%', 'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(236, 72, 153))', 'flexShrink': '0'}}>
</span>
        Presentasi Bisnis
        <span style={{'position': 'absolute', 'bottom': '-8px', 'left': '18px', 'width': '0px', 'height': '0px', 'borderLeft': '6px solid transparent', 'borderRight': '6px solid transparent', 'borderTop': '8px solid rgb(240, 217, 200)'}}>
</span>
<span style={{'position': 'absolute', 'bottom': '-6px', 'left': '19px', 'width': '0px', 'height': '0px', 'borderLeft': '5px solid transparent', 'borderRight': '5px solid transparent', 'borderTop': '7px solid white'}}>
</span>
</div>
<div className="skill-bubble absolute float-5" style={{'top': '53%', 'left': '28%', 'background': 'white', 'border': '1.5px solid rgb(240, 217, 200)', 'borderRadius': '999px', 'padding': '7px 14px', 'fontSize': '12px', 'fontWeight': '700', 'color': 'rgb(17, 24, 39)', 'whiteSpace': 'nowrap', 'boxShadow': 'rgba(0, 0, 0, 0.08) 0px 4px 16px', 'display': 'flex', 'alignItems': 'center', 'gap': '6px'}}>
<span style={{'display': 'inline-block', 'width': '6px', 'height': '6px', 'borderRadius': '50%', 'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(236, 72, 153))', 'flexShrink': '0'}}>
</span>
        AI Productivity
        <span style={{'position': 'absolute', 'bottom': '-8px', 'left': '18px', 'width': '0px', 'height': '0px', 'borderLeft': '6px solid transparent', 'borderRight': '6px solid transparent', 'borderTop': '8px solid rgb(240, 217, 200)'}}>
</span>
<span style={{'position': 'absolute', 'bottom': '-6px', 'left': '19px', 'width': '0px', 'height': '0px', 'borderLeft': '5px solid transparent', 'borderRight': '5px solid transparent', 'borderTop': '7px solid white'}}>
</span>
</div>
<div className="skill-bubble absolute float-6" style={{'top': '63%', 'right': '8%', 'background': 'white', 'border': '1.5px solid rgb(240, 217, 200)', 'borderRadius': '999px', 'padding': '7px 14px', 'fontSize': '12px', 'fontWeight': '700', 'color': 'rgb(17, 24, 39)', 'whiteSpace': 'nowrap', 'boxShadow': 'rgba(0, 0, 0, 0.08) 0px 4px 16px', 'display': 'flex', 'alignItems': 'center', 'gap': '6px'}}>
<span style={{'display': 'inline-block', 'width': '6px', 'height': '6px', 'borderRadius': '50%', 'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(236, 72, 153))', 'flexShrink': '0'}}>
</span>
        SOP &amp; Quality
        <span style={{'position': 'absolute', 'bottom': '-8px', 'left': '18px', 'width': '0px', 'height': '0px', 'borderLeft': '6px solid transparent', 'borderRight': '6px solid transparent', 'borderTop': '8px solid rgb(240, 217, 200)'}}>
</span>
<span style={{'position': 'absolute', 'bottom': '-6px', 'left': '19px', 'width': '0px', 'height': '0px', 'borderLeft': '5px solid transparent', 'borderRight': '5px solid transparent', 'borderTop': '7px solid white'}}>
</span>
</div>
<div className="skill-bubble absolute float-7" style={{'top': '76%', 'left': '10%', 'background': 'white', 'border': '1.5px solid rgb(240, 217, 200)', 'borderRadius': '999px', 'padding': '7px 14px', 'fontSize': '12px', 'fontWeight': '700', 'color': 'rgb(17, 24, 39)', 'whiteSpace': 'nowrap', 'boxShadow': 'rgba(0, 0, 0, 0.08) 0px 4px 16px', 'display': 'flex', 'alignItems': 'center', 'gap': '6px'}}>
<span style={{'display': 'inline-block', 'width': '6px', 'height': '6px', 'borderRadius': '50%', 'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(236, 72, 153))', 'flexShrink': '0'}}>
</span>
        Leadership
        <span style={{'position': 'absolute', 'bottom': '-8px', 'left': '18px', 'width': '0px', 'height': '0px', 'borderLeft': '6px solid transparent', 'borderRight': '6px solid transparent', 'borderTop': '8px solid rgb(240, 217, 200)'}}>
</span>
<span style={{'position': 'absolute', 'bottom': '-6px', 'left': '19px', 'width': '0px', 'height': '0px', 'borderLeft': '5px solid transparent', 'borderRight': '5px solid transparent', 'borderTop': '7px solid white'}}>
</span>
</div>
<div className="skill-bubble absolute float-8" style={{'top': '82%', 'left': '52%', 'background': 'white', 'border': '1.5px solid rgb(240, 217, 200)', 'borderRadius': '999px', 'padding': '7px 14px', 'fontSize': '12px', 'fontWeight': '700', 'color': 'rgb(17, 24, 39)', 'whiteSpace': 'nowrap', 'boxShadow': 'rgba(0, 0, 0, 0.08) 0px 4px 16px', 'display': 'flex', 'alignItems': 'center', 'gap': '6px'}}>
<span style={{'display': 'inline-block', 'width': '6px', 'height': '6px', 'borderRadius': '50%', 'background': 'linear-gradient(135deg, rgb(255, 138, 0), rgb(236, 72, 153))', 'flexShrink': '0'}}>
</span>
        Problem Solving
        <span style={{'position': 'absolute', 'bottom': '-8px', 'left': '18px', 'width': '0px', 'height': '0px', 'borderLeft': '6px solid transparent', 'borderRight': '6px solid transparent', 'borderTop': '8px solid rgb(240, 217, 200)'}}>
</span>
<span style={{'position': 'absolute', 'bottom': '-6px', 'left': '19px', 'width': '0px', 'height': '0px', 'borderLeft': '5px solid transparent', 'borderRight': '5px solid transparent', 'borderTop': '7px solid white'}}>
</span>
</div>
<div className="absolute" style={{'top': '50%', 'left': '50%', 'transform': 'translate(-50%, -50%)', 'width': '160px', 'height': '160px', 'borderRadius': '50%', 'background': 'radial-gradient(circle, rgba(255, 138, 0, 0.1) 0%, transparent 70%)', 'pointerEvents': 'none'}}>
</div>
</div>
</div>
</section>
  );
};
