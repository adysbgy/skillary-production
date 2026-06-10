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

const POPULAR_CHIPS = [
  'Data Analytics',
  'Power BI',
  'Infografis',
  'Presentasi Bisnis',
  'AI Produktivitas',
  'SOP & Proses',
];

export const HeroSection = () => {
  return (
    <section className="bg-white py-14 px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
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
            Bangun{' '}
            <span className="gradient-text">Skill Profesional</span>
            <br className="hidden md:block" />
            {' '}yang Dibutuhkan Industri
          </h1>

          {/* Subheadline */}
          <p className="text-base text-skillary-muted leading-relaxed mb-6 max-w-md">
            Skillary menyediakan kursus praktis, assessment terstruktur, dan sertifikat digital untuk membantu Anda dan organisasi Anda berkembang lebih cepat.
          </p>

          {/* ─── CTA Buttons ─── */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <Link
              href="/program-catalog"
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
            >
              Cari Program
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
              Untuk Organisasi
            </Link>
          </div>

          {/* ─── Search Bar ─── */}
          <Link
            href="/program-catalog"
            className="flex items-center gap-2 max-w-md bg-white rounded-full px-4 py-2.5 mb-4"
            style={{
              border: '2px solid rgb(240, 217, 200)',
              boxShadow: 'rgba(255, 138, 0, 0.08) 0px 2px 12px',
            }}
          >
            <svg
              aria-hidden="true"
              className="lucide lucide-search w-4 h-4 text-skillary-muted flex-shrink-0"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m21 21-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </svg>
            <span className="text-sm text-skillary-muted flex-1">
              Cari program pelatihan...
            </span>
            <span
              className="text-white text-xs font-bold px-4 py-1.5 rounded-full hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
            >
              Cari
            </span>
          </Link>

          {/* ─── Popular Chips ─── */}
          <div className="flex flex-wrap items-center gap-2 mb-7">
            <span className="text-xs text-skillary-muted font-medium">Populer:</span>
            {POPULAR_CHIPS.map((label) => (
              <Link
                key={label}
                href="/program-catalog"
                className="text-xs font-medium px-3 py-1 rounded-full border transition-all duration-150 hover:scale-105"
                style={{
                  background: 'rgb(255, 249, 243)',
                  borderColor: 'rgb(255, 224, 188)',
                  color: 'rgb(200, 100, 0)',
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* ─── Social Proof ─── */}
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              {['S', 'A', 'D', 'R'].map((initial, i) => (
                <div
                  key={initial}
                  className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{
                    marginLeft: i === 0 ? '0px' : '-8px',
                    zIndex: 5 - i,
                    background: 'linear-gradient(135deg, rgb(255, 158, 50), rgb(255, 110, 100))',
                  }}
                >
                  {initial}
                </div>
              ))}
              <div
                className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                style={{
                  marginLeft: '-8px',
                  background: 'rgb(255, 244, 232)',
                  color: 'rgb(255, 138, 0)',
                }}
              >
                +
              </div>
            </div>
            <p className="text-sm text-skillary-muted">
              Dipercaya oleh{' '}
              <span className="font-bold text-skillary-navy">500+ profesional</span>
              {' '}di berbagai industri
            </p>
          </div>
        </div>

        {/* ─── Right Column — Clean Dot Background + Topic Bubbles ─── */}
        <div
          className="flex-shrink-0 w-full md:w-[460px] h-[420px] rounded-3xl relative overflow-hidden"
          style={{ background: 'rgb(252, 251, 249)' }}
        >
          {/* Dot pattern background */}
          <div className="absolute inset-0 hero-dot-pattern opacity-40" />

          {/* Soft orange accent glow */}
          <div
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '220px',
              height: '220px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 138, 0, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Topic Bubbles */}
          {TOPIC_BUBBLES.map((bubble) => (
            <div
              key={bubble.label}
              className={`skill-bubble absolute ${bubble.animClass}`}
              style={{
                top: bubble.top,
                left: bubble.left,
                right: bubble.right,
                background: 'white',
                border: '1.5px solid rgb(240, 217, 200)',
                borderRadius: '999px',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: '600',
                color: 'rgb(17, 24, 39)',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 12px rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))',
                  flexShrink: 0,
                }}
              />
              {bubble.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
