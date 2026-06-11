import React from 'react';
import Link from 'next/link';

const TOPIC_BUBBLES = [
  { label: 'Data Analytics', top: '8%', left: '10%', animClass: 'float-1' },
  { label: 'Power BI', top: '20%', left: '58%', animClass: 'float-2' },
  { label: 'AI Productivity', top: '38%', left: '6%', animClass: 'float-3' },
  { label: 'Presentasi Bisnis', top: '34%', right: '8%', animClass: 'float-4' },
  { label: 'SOP & Quality', top: '56%', left: '30%', animClass: 'float-5' },
  { label: 'Leadership', top: '68%', left: '8%', animClass: 'float-6' },
  { label: 'Problem Solving', top: '72%', left: '54%', animClass: 'float-7' },
];

export const HeroSection = () => {
  return (
    <section className="bg-white py-12 md:py-16 lg:py-20 px-5 md:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* ─── Left Column ─── */}
        <div className="flex-1 min-w-0">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-6 border"
            style={{
              background: 'rgb(255, 244, 232)',
              borderColor: 'rgb(255, 214, 165)',
              color: 'rgb(255, 138, 0)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-skillary-orange inline-block" />
            🚀 Platform Pelatihan Digital #1 di Indonesia
          </div>

          {/* Headline */}
          <h1 className="text-[2.6rem] md:text-[3.2rem] font-extrabold leading-[1.15] text-skillary-navy mb-5">
            Training Digital untuk Tim yang Butuh Skill{' '}
            <span className="gradient-text">Data, AI, dan Presentasi Bisnis</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base text-skillary-muted leading-relaxed mb-8 max-w-md">
            Skillary membantu organisasi menjalankan pelatihan terstruktur dengan materi, assessment, sertifikat digital, dan laporan peserta dalam satu alur.
          </p>

          {/* ─── CTA Buttons ─── */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
            >
              Diskusikan Kebutuhan Training
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center rounded-full px-7 py-3 text-sm font-semibold transition-all duration-200 hover:bg-[#FFF8F1] hover:-translate-y-0.5 border bg-white"
              style={{ borderColor: 'rgb(240, 217, 200)', color: '#334155' }}
            >
              Lihat Program untuk Tim
            </Link>
          </div>

          {/* ─── Social Proof ─── */}
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {[1, 2, 3, 4].map((num, i) => (
                <img
                  key={num}
                  src={`/images/avatar/skillary-avatar-0${num}.png`}
                  alt={`Skillary professional learner avatar ${num}`}
                  className="w-10 h-10 rounded-full border-2 border-white object-cover flex-shrink-0 shadow-sm"
                  style={{
                    marginLeft: i === 0 ? '0px' : '-12px',
                    zIndex: 5 - i,
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-skillary-muted">
              Dipakai untuk kebutuhan HR, L&D, sekolah, yayasan, komunitas, dan organisasi.
            </p>
          </div>
        </div>

        {/* ─── Right Column — Perspective Grid Background + Speech Bubbles ─── */}
        <div
          className="flex-shrink-0 w-full md:w-[460px] h-[420px] rounded-3xl relative overflow-hidden"
          style={{ background: 'rgb(252, 251, 249)' }}
        >
          {/* Perspective Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.35]" 
            style={{
              backgroundImage: `
                radial-gradient(circle at 0px 0px, #64748B 2px, transparent 2.5px),
                linear-gradient(to right, rgba(148, 163, 184, 0.25) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(148, 163, 184, 0.25) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px',
              backgroundPosition: '0 0, 0 0, 0 0',
              transform: 'perspective(800px) rotateX(60deg) scale(2) translateY(-20px)',
              transformOrigin: 'top center',
              maskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 70%)',
            }}
          />

          {/* Soft orange accent glow */}
          <div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '240px',
              height: '240px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 138, 0, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Topic Speech Bubbles */}
          {TOPIC_BUBBLES.map((bubble) => (
            <Link
              href={`/program-catalog?q=${encodeURIComponent(bubble.label)}`}
              key={bubble.label}
              className={`skill-bubble absolute ${bubble.animClass} group flex items-center justify-center px-5 py-2.5 rounded-full font-extrabold text-[12px] md:text-[13px] whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-300 border-[1.5px] bg-white text-gray-800 border-gray-200 hover:bg-skillary-orange hover:text-white hover:border-skillary-orange hover:shadow-[0_8px_25px_rgba(255,138,0,0.25)]`}
              style={{
                top: bubble.top,
                left: bubble.left,
                right: bubble.right,
              }}
            >
              {bubble.label}
              {/* Speech bubble tail */}
              <span className="absolute -bottom-[6.5px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-white border-r-[1.5px] border-b-[1.5px] border-gray-200 rotate-45 rounded-[2px] group-hover:bg-skillary-orange group-hover:border-skillary-orange transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
