"use client";

import { useEffect } from "react";
import { StartupFooter } from "./StartupFooter";

// Landing-page design shell for marketing sub-pages: dark canvas +
// white rounded container + scroll-reveal + shared dark footer. Provides its
// own top padding so the fixed SkillaryMarketingHeader clears the content.
// Font (Manrope) is inherited from the root layout — no per-shell re-load.

export function MarketingShell({ children, showFooter = true }: { children: React.ReactNode; showFooter?: boolean }) {
  useEffect(() => {
    const els = document.querySelectorAll("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("lp-on"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("lp-on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen font-sans text-[#0F172A] antialiased" style={{ background: "rgb(13, 16, 28)" }}>
      <style>{`
        [data-reveal] { opacity: 0; transform: translateY(26px); transition: opacity 0.7s ease, transform 0.7s ease; }
        [data-reveal].lp-on { opacity: 1; transform: translateY(0); }
        .lp-lift { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .lp-lift:hover { transform: translateY(-4px); }
        @media (prefers-reduced-motion: reduce) {
          [data-reveal] { opacity: 1; transform: none; transition: none; }
          .lp-lift, .lp-lift:hover { transition: none; transform: none; }
        }
      `}</style>

      {/* Clearance for the fixed StartupHeader (announcement + pill) */}
      <div className="pt-[100px] md:pt-[108px]">
        <main className="bg-white rounded-[2rem] md:rounded-[2.75rem] overflow-hidden">
          {children}
        </main>
      </div>

      {showFooter && <StartupFooter />}
    </div>
  );
}
