import React from 'react';
import Link from 'next/link';

const CATEGORIES = [
  "Data & Dashboard",
  "Visual Communication",
  "Business Presentation",
  "AI Productivity",
  "Process Improvement",
  "Leadership",
  "Risk & Compliance",
  "Sales & Marketing",
  "Customer Service"
];

export const CategoryPillsSection = () => {
  return (
    <section className="py-6 w-full bg-[#fcfcfc] border-y border-[#f0d9c8] overflow-hidden relative motion-reduce:overflow-x-auto">
      {/* Fade Masks for smooth entry/exit on desktop */}
      <div className="absolute top-0 left-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#fcfcfc] to-transparent z-10 pointer-events-none hidden md:block"></div>
      <div className="absolute top-0 right-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#fcfcfc] to-transparent z-10 pointer-events-none hidden md:block"></div>
      
      {/* Marquee Track Container */}
      {/* We use double list to make the loop seamless. motion-reduce will stop animation. */}
      <div className="flex w-max animate-marquee motion-reduce:animate-none md:hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] py-2 px-4 md:px-0">
        {[...CATEGORIES, ...CATEGORIES].map((category, index) => (
          <div
            key={index}
            className="flex-shrink-0 mx-2 md:mx-3 bg-white text-skillary-navy text-sm font-semibold px-6 py-3 rounded-full transition-all duration-200 hover:shadow-md cursor-default"
            style={{
              border: '1.5px solid rgb(240, 217, 200)',
              boxShadow: 'rgba(0, 0, 0, 0.04) 0px 2px 4px'
            }}
          >
            {category}
          </div>
        ))}
      </div>
    </section>
  );
};
