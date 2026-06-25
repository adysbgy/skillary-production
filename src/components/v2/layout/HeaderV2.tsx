"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

// ─── Program Catalog dropdown items ───────────────────────────
const PROGRAM_CATEGORIES = [
  {
    label: "Data & Dashboard",
    desc: "Power BI, Excel, Data Analytics",
    href: "/v2/catalog",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "Presentasi Bisnis",
    desc: "Business Presentation, Storytelling",
    href: "/v2/presentation",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    label: "AI & Digital Mindset",
    desc: "AI Productivity, Digital Transformation",
    href: "/v2/catalog",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: "Leadership & Problem Solving",
    desc: "Creative Problem Solving, Decision Making",
    href: "/v2/catalog",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    label: "SOP & Process Improvement",
    desc: "Business Process, ISO, Quality",
    href: "/v2/badge-programs",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Infographics & Visual Comm",
    desc: "Infographics, Data Visualization",
    href: "/v2/catalog",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const NAV_LINKS = [
  { label: "Untuk Organisasi", href: "/v2/untuk-organisasi" },
  { label: "Portofolio", href: "/v2/portfolio" },
  { label: "Tentang", href: "/v2/about" },
  { label: "Resources", href: "/v2/resources" },
  { label: "Kontak", href: "/v2/proposal" },
];

export function HeaderV2() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const [programOpen, setProgramOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setProgramOpen(false);
    setMobileOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setProgramOpen(false);
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) setAccountOpen(false);
    }
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") { setProgramOpen(false); setAccountOpen(false); }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEsc);
    return () => { document.removeEventListener("mousedown", handleOutside); document.removeEventListener("keydown", handleEsc); };
  }, []);

  const role = session?.user?.role as string | undefined;
  const userInitial = session?.user?.name?.charAt(0)?.toUpperCase() || "U";

  // Hide marketing chrome on standalone landing pages and authed app/auth routes
  const hiddenPaths = ["/lp", "/skillary-campus", "/admin", "/dashboard", "/learn", "/login", "/register"];
  if (hiddenPaths.some(p => pathname.startsWith(p))) return null;

  return (
    <>
      {/* ── TOP BAR ── */}
      <div className="hidden md:flex items-center justify-center gap-8 text-xs font-semibold py-2 px-6" style={{ background: "rgb(17, 24, 39)", color: "rgb(156, 163, 175)" }}>
        <span style={{ color: "rgb(255, 138, 0)" }}>✦</span>
        <span>Platform pelatihan terukur untuk HR, L&D, dan organisasi Indonesia</span>
        <span className="mx-2 opacity-30">|</span>
        <Link href="/v2/proposal" className="hover:text-white transition-colors underline underline-offset-2">
          Konsultasi gratis — Jadwalkan sekarang →
        </Link>
      </div>

      {/* ── MAIN HEADER ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-200 ${scrolled ? "shadow-sm" : ""}`}
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "white",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "1.5px solid rgb(240, 217, 200)",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/v2" className="flex items-center gap-2.5 shrink-0">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                <span className="text-white font-black text-sm">S</span>
              </div>
              <div>
                <span className="font-black text-[17px] tracking-tight text-[#181818]">Skill</span>
                <span className="font-black text-[17px] tracking-tight" style={{ color: "rgb(255, 138, 0)" }}>ary</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">

              {/* Program dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProgramOpen(!programOpen)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${programOpen ? "bg-orange-50 text-[rgb(255,138,0)]" : "text-[#334155] hover:text-[rgb(255,138,0)] hover:bg-orange-50"}`}
                >
                  Program
                  <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${programOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Mega dropdown */}
                {programOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] rounded-2xl bg-white shadow-2xl overflow-hidden"
                    style={{ border: "1.5px solid rgb(240, 217, 200)" }}
                  >
                    <div className="p-3 grid grid-cols-2 gap-1">
                      {PROGRAM_CATEGORIES.map((cat) => (
                        <Link
                          key={cat.label}
                          href={cat.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-orange-50 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform" style={{ background: "rgb(255, 244, 232)", color: "rgb(255, 138, 0)" }}>
                            {cat.icon}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#181818] leading-tight">{cat.label}</p>
                            <p className="text-xs text-black/40 mt-0.5">{cat.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 py-3 flex items-center justify-between" style={{ background: "rgb(255, 251, 245)", borderTop: "1.5px solid rgb(240, 217, 200)" }}>
                      <span className="text-xs text-black/40 font-medium">Semua program dapat disesuaikan untuk tim Anda</span>
                      <Link href="/v2/catalog" className="text-xs font-bold hover:underline" style={{ color: "rgb(255, 138, 0)" }}>
                        Lihat Katalog →
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${pathname === link.href ? "text-[rgb(255,138,0)] bg-orange-50" : "text-[#334155] hover:text-[rgb(255,138,0)] hover:bg-orange-50"}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="hidden lg:flex items-center gap-3">
              {session ? (
                <div className="relative" ref={accountRef}>
                  <button
                    onClick={() => setAccountOpen(!accountOpen)}
                    className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border hover:bg-gray-50 transition-colors"
                    style={{ borderColor: "rgb(240, 217, 200)" }}
                  >
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                      {userInitial}
                    </div>
                    <span className="text-sm font-semibold text-[#334155]">{session.user?.name?.split(" ")[0]}</span>
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </button>
                  {accountOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl overflow-hidden" style={{ border: "1.5px solid rgb(240, 217, 200)" }}>
                      <div className="p-2">
                        <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-orange-50 text-sm font-medium text-[#334155]">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                          Dashboard
                        </Link>
                        {(role === "ADMIN" || role === "INSTRUCTOR") && (
                          <Link href="/admin" className="flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-orange-50 text-sm font-medium text-[#334155]">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            Admin Panel
                          </Link>
                        )}
                      </div>
                      <div style={{ borderTop: "1.5px solid rgb(240, 217, 200)" }} className="p-2">
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="flex items-center gap-2 w-full px-3 py-2.5 rounded-lg hover:bg-red-50 text-sm font-medium text-red-600"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                          Keluar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login" className="text-sm font-semibold text-[#334155] hover:text-[rgb(255,138,0)] transition-colors px-3 py-2">
                  Masuk
                </Link>
              )}

              <Link
                href="/v2/proposal"
                className="text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md"
                style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
              >
                Diskusikan Training →
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 top-[calc(16px+1.5px+40px)] bg-white z-40 overflow-y-auto" style={{ borderTop: "1.5px solid rgb(240, 217, 200)" }}>
            <div className="p-5 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 px-3 pb-1">Area Program</p>
              {PROGRAM_CATEGORIES.map((cat) => (
                <Link key={cat.label} href={cat.href} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-orange-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgb(255,244,232)", color: "rgb(255,138,0)" }}>{cat.icon}</div>
                  <div>
                    <p className="text-sm font-semibold text-[#181818]">{cat.label}</p>
                    <p className="text-xs text-black/40">{cat.desc}</p>
                  </div>
                </Link>
              ))}
              <div className="h-px my-4" style={{ background: "rgb(240, 217, 200)" }} />
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="block px-3 py-3 rounded-xl text-sm font-semibold text-[#334155] hover:bg-orange-50 hover:text-[rgb(255,138,0)] transition-colors">
                  {link.label}
                </Link>
              ))}
              <div className="h-px my-4" style={{ background: "rgb(240, 217, 200)" }} />
              {session ? (
                <>
                  <Link href="/dashboard" className="block px-3 py-3 rounded-xl text-sm font-semibold text-[#334155] hover:bg-orange-50">Dashboard</Link>
                  <button onClick={() => signOut({ callbackUrl: "/" })} className="block w-full text-left px-3 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50">Keluar</button>
                </>
              ) : (
                <Link href="/login" className="block px-3 py-3 rounded-xl text-sm font-semibold text-[#334155] hover:bg-orange-50">Masuk</Link>
              )}
              <div className="pt-2">
                <Link href="/v2/proposal" className="block w-full text-center text-white text-sm font-bold px-5 py-3.5 rounded-2xl" style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}>
                  Diskusikan Kebutuhan Training →
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
