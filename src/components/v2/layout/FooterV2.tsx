"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MARKETING_SHELL_ROUTES } from "@/components/v2/layout/StartupHeader";
import { Logo } from "@/components/ui/Logo";
import { EMAIL_GENERAL, EMAIL_TEAMS, INSTAGRAM_URL, whatsappLink } from "@/data/config";

// Footer v2 — Trainocate-style: newsletter strip + accreditation badges + dense link columns
const LINK_COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "Katalog Program", href: "/v2/catalog" },
      { label: "Sertifikat", href: "/v2/certificates" },
      { label: "Sertifikasi Badge", href: "/v2/badge-programs" },
      { label: "Laporan", href: "/reports" },
    ],
  },
  {
    title: "Program",
    links: [
      { label: "Jelajahi Program", href: "/v2/catalog" },
      { label: "Presentasi & Storytelling", href: "/v2/presentation" },
      { label: "Brief Training", href: "/training-brief" },
      { label: "Resources Gratis", href: "/v2/resources" },
    ],
  },
  {
    title: "Untuk Organisasi",
    links: [
      { label: "Solusi Organisasi", href: "/v2/untuk-organisasi" },
      { label: "Diskusikan Kebutuhan", href: "/v2/proposal" },
      { label: "Program Afiliasi", href: "/v2/affiliate" },
      { label: "Portofolio", href: "/v2/portfolio" },
    ],
  },
  {
    title: "Perusahaan",
    links: [
      { label: "Tentang Kami", href: "/v2/about" },
      { label: "Kontak", href: "/v2/proposal" },
      { label: "Kebijakan Privasi", href: "/privacy" },
      { label: "Syarat & Ketentuan", href: "/terms" },
    ],
  },
];

const ACCREDITATIONS = [
  { abbr: "ISO", label: "ISO 9001 Ready" },
  { abbr: "BNSP", label: "Skema BNSP" },
  { abbr: "K3", label: "Sertifikasi K3" },
];

export function FooterV2() {
  const pathname = usePathname();

  const hiddenPaths = ["/lp", "/skillary-campus", "/admin", "/dashboard", "/learn", "/login", "/register"];
  if (pathname === "/" || MARKETING_SHELL_ROUTES.includes(pathname) || hiddenPaths.some((p) => pathname.startsWith(p))) return null;

  return (
    <footer style={{ background: "rgb(17, 24, 39)" }} className="text-white">
      {/* ── Newsletter strip ── */}
      <div style={{ borderBottom: "1px solid rgb(31, 41, 55)" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <p className="text-base font-bold text-white">Dapatkan update program & insight L&D</p>
            <p className="text-xs text-gray-400 mt-1">Sekali sebulan, tanpa spam — langsung dari tim Skillary.</p>
          </div>
          <form
            className="flex w-full md:w-auto gap-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              required
              placeholder="Email kerja Anda"
              className="flex-1 md:w-64 px-4 py-2.5 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none"
              style={{ background: "rgb(31, 41, 55)", border: "1px solid rgb(55, 65, 81)" }}
            />
            <button
              type="submit"
              className="text-white text-sm font-bold px-5 py-2.5 rounded-lg whitespace-nowrap transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))" }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* ── Main columns ── */}
      <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-10 mb-10">

          {/* Brand + contact */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Logo variant="dark" />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed mb-5">
              Platform LMS untuk HR &amp; L&amp;D yang ingin pelatihan tim lebih terukur, bersertifikat,
              dan terdokumentasi.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "rgb(255, 138, 0)" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="text-xs text-gray-400">Jakarta, Indonesia</p>
              </div>
              <div className="flex items-center gap-2">
                <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" style={{ color: "rgb(255, 138, 0)" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect height="16" rx="2" width="20" x="2" y="4" />
                </svg>
                <a className="text-xs text-gray-400 hover:text-white transition-colors" href={`mailto:${EMAIL_GENERAL}`}>
                  {EMAIL_GENERAL}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" style={{ color: "rgb(255, 138, 0)" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a className="text-xs text-gray-400 hover:text-white transition-colors" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                  Chat tim Skillary
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" style={{ color: "rgb(255, 138, 0)" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <a className="text-xs text-gray-400 hover:text-white transition-colors" href={`mailto:${EMAIL_TEAMS}`}>
                  {EMAIL_TEAMS} (B2B)
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-2 mt-6">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Skillary"
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/10"
                style={{ background: "rgb(31, 41, 55)", border: "1px solid rgb(55, 65, 81)" }}
              >
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect height="20" rx="5" width="20" x="2" y="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {LINK_COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-bold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href={link.href}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Accreditation badges */}
        <div className="flex flex-wrap items-center gap-3 py-6" style={{ borderTop: "1px solid rgb(31, 41, 55)" }}>
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mr-2">Standar &amp; Akreditasi</span>
          {ACCREDITATIONS.map((badge) => (
            <div
              key={badge.abbr}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md"
              style={{ background: "rgb(31, 41, 55)", border: "1px solid rgb(55, 65, 81)" }}
            >
              <span className="text-[10px] font-black tracking-wide" style={{ color: "rgb(255, 138, 0)" }}>{badge.abbr}</span>
              <span className="text-[10px] text-gray-400">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgb(31, 41, 55)" }}>
          <p className="text-xs text-gray-500 text-center md:text-left">
            © {new Date().getFullYear()} PT Skillary Generasi Cerdas. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link className="text-xs text-gray-500 hover:text-white transition-colors" href="/privacy">Kebijakan Privasi</Link>
            <Link className="text-xs text-gray-500 hover:text-white transition-colors" href="/terms">Syarat &amp; Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
