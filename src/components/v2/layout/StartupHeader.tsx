"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Shared final homepage header — the dark morphing pill used on "/" and the
// primary marketing sub-pages so the chrome is identical everywhere.
const DARK = "rgb(13, 16, 28)";

// Sub-pages that swap the default HeaderV2 for this dark header. Keep in sync
// with HeaderV2 (hides itself here) and MarketingHeaderGate (renders here).
export const STARTUP_HEADER_ROUTES = [
  "/programs",
  "/resources",
  "/events",
  "/untuk-organisasi",
  "/about",
  "/contact",
  "/portofolio",
  "/trainers",
  "/trainers/apply",
  "/trainer-verification",
];

export const isStartupHeaderRoute = (pathname: string) =>
  STARTUP_HEADER_ROUTES.includes(pathname) || pathname.startsWith("/trainers/");

// Subset of the above already rebuilt with the landing MarketingShell (dark
// canvas + own footer + own top padding). These get no external spacer and
// hide FooterV2. Grows as each page is restyled.
export const MARKETING_SHELL_ROUTES = ["/about", "/untuk-organisasi", "/programs", "/resources", "/events", "/contact", "/portofolio", "/trainers", "/trainers/apply", "/trainer-verification"];

// B2C-first order: Events (hero webinar product) leads. B2B lives inside
// "Services"; "Request Proposal" is not a top-level item — its CTA lives on
// the Services page.
const NAV = [
  { label: "Events", href: "/events" },
  { label: "Programs", href: "/programs" },
  { label: "Free Workshops", href: "/resources" },
  { label: "Services", href: "/untuk-organisasi" },
  { label: "Trainers", href: "/trainers" },
  { label: "Portfolio", href: "/portofolio" },
  { label: "About", href: "/about" },
];

export function StartupHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar — collapses away on scroll */}
      <div
        className={`overflow-hidden transition-all duration-300 ${scrolled ? "max-h-0 opacity-0" : "max-h-11 opacity-100"}`}
        style={{
          background:
            "radial-gradient(ellipse 55% 220% at 50% 0%, rgba(255,120,30,0.85) 0%, rgba(150,55,10,0.55) 40%, rgb(13,16,28) 100%)",
        }}
      >
        <div className="h-11 flex items-center justify-center gap-3 px-4 text-white">
          <p className="text-[11px] md:text-xs font-semibold truncate">
            ✦ BARU: Events Skillary — webinar praktis dan kelas singkat untuk skill kerja profesional
          </p>
          <Link
            href="/events"
            className="shrink-0 text-[11px] md:text-xs font-bold px-3.5 py-1 rounded-full transition-colors hover:bg-white/20"
            style={{ border: "1px solid rgba(255,255,255,0.35)", background: "rgba(255,255,255,0.12)" }}
          >
            Lihat Events
          </Link>
        </div>
      </div>

      {/* Nav bar — morphs between full-width and centered pill */}
      <div className={`transition-all duration-300 ${scrolled ? "px-3 md:px-4 pt-3" : "px-0 pt-0"}`}>
        <div
          className={`flex items-center justify-between h-14 md:h-16 mx-auto transition-all duration-300 ${
            scrolled
              ? "max-w-5xl rounded-full shadow-xl pl-4 pr-2 md:pl-6 md:pr-2.5"
              : "max-w-[120rem] rounded-none pl-4 pr-3 md:pl-8 md:pr-6"
          }`}
          style={{ background: DARK }}
        >
          {/* Logo */}
          <Link href="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2.5 shrink-0">
            <Image src="/logo.png" alt="Skillary" width={44} height={24} priority className="h-6 w-auto object-contain" />
            <span className="text-white text-base font-bold tracking-tight">Skillary</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="text-sm font-medium text-white/60 hover:text-white transition-colors whitespace-nowrap">
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right cluster */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-white/80 hover:text-white transition-colors">
              Masuk
            </Link>
            <Link
              href="/events"
              className="text-sm font-bold px-5 py-2.5 rounded-full bg-white text-[#0F172A] hover:bg-white/90 transition-colors"
            >
              Mulai
            </Link>
          </div>

          {/* Mobile right cluster */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href="/events" className="text-xs font-bold px-4 py-2 rounded-full bg-white text-[#0F172A]">
              Mulai
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className={`lg:hidden mt-2 rounded-3xl p-5 shadow-xl ${scrolled ? "" : "mx-3"}`} style={{ background: DARK }}>
            <nav className="flex flex-col">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-sm font-semibold text-white/80 hover:text-white transition-colors"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {n.label}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-4">
                <Link href="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-bold py-3 rounded-full text-white" style={{ border: "1px solid rgba(255,255,255,0.25)" }}>
                  Masuk
                </Link>
                <Link href="/events" onClick={() => setMenuOpen(false)} className="flex-1 text-center text-sm font-bold py-3 rounded-full bg-white text-[#0F172A]">
                  Mulai
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
