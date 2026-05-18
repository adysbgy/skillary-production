import React from 'react';
import Image from 'next/image';

const TESTIMONIALS = [
  {
    quote: "Skillary membantu saya belajar dengan lebih terstruktur. Alur pembelajaran jelas, materinya praktis, dan saya bisa langsung menerapkan apa yang dipelajari.",
    name: "Alya N.",
    role: "Junior Data Analyst",
    image: "/images/testimonial-alya.png",
  },
  {
    quote: "Yang paling saya suka bukan hanya kontennya, tapi perasaan bahwa saya terus berkembang selangkah demi selangkah.",
    name: "Raka M.",
    role: "Career Switcher",
    image: "/images/testimonial-raka.png",
  },
  {
    quote: "Guided projects membuat belajar terasa nyata. Bukan sekadar menonton materi — saya benar-benar membangun sesuatu.",
    name: "Dina K.",
    role: "Front-End Learner",
    image: "/images/testimonial-dina.png",
  },
];

export const TestimoniSection = () => {
  return (
    <section className="py-16 px-5 bg-white">
<div className="max-w-6xl mx-auto">
<div className="text-center mb-10">
<h2 className="text-2xl md:text-3xl font-extrabold text-skillary-navy mb-2">
        Apa Kata{' '}
        <span className="gradient-text">
         Mereka
        </span>
</h2>
<p className="text-skillary-muted text-sm">
        Cerita nyata dari para profesional yang telah belajar bersama Skillary.
       </p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-5">
{TESTIMONIALS.map((t, i) => (
<div key={i} className="bg-white rounded-2xl p-6 card-hover flex flex-col gap-4" style={{'border': '1.5px solid rgb(240, 217, 200)', 'boxShadow': 'rgba(0, 0, 0, 0.06) 0px 1px 4px'}}>
  {/* Quote icon */}
  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{'background': 'rgb(255, 244, 232)'}}>
    <svg aria-hidden="true" className="w-5 h-5 text-skillary-orange" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
    </svg>
  </div>
  
  {/* Quote text */}
  <p className="text-skillary-navy text-sm leading-relaxed flex-1 italic">
    &ldquo;{t.quote}&rdquo;
  </p>
  
  {/* Person info with real photo */}
  <div className="flex items-center gap-3 pt-3 border-t" style={{'borderColor': 'rgb(240, 217, 200)'}}>
    <Image
      src={t.image}
      alt={t.name}
      width={40}
      height={40}
      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
      style={{ border: '2px solid rgb(255, 214, 165)' }}
    />
    <div>
      <p className="text-sm font-bold text-skillary-navy">
        {t.name}
      </p>
      <p className="text-xs text-skillary-muted">
        {t.role}
      </p>
    </div>
  </div>
</div>
))}
</div>
</div>
</section>
  );
};
