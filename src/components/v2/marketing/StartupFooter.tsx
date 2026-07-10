import Image from "next/image";
import Link from "next/link";
import { EMAIL_GENERAL, INSTAGRAM_URL, whatsappLink } from "@/data/config";

// Shared final CTA + dark footer used on the homepage and marketing sub-pages
// so the page ending is identical everywhere.
const FOOTER_NAV = [
  { label: "Programs", href: "/v2/catalog" },
  { label: "Free Workshops", href: "/v2/resources" },
  { label: "Events", href: "/v2/events" },
  { label: "Services", href: "/v2/untuk-organisasi" },
  { label: "About", href: "/v2/about" },
  { label: "Request Proposal", href: "/v2/proposal" },
];

export function StartupFooter() {
  return (
    <section className="relative overflow-hidden px-3 md:px-5 pt-20 md:pt-28 pb-3 md:pb-5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/lp-startup-cta-bg.svg" alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" />

      {/* CTA content */}
      <div className="relative max-w-2xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
          Mulai dari event terdekat atau susun program untuk tim Anda
        </h2>
        <p className="text-white/85 mb-9 leading-relaxed max-w-xl mx-auto">
          Ikuti Events Skillary atau ceritakan kebutuhan training tim Anda. Kami bantu rekomendasikan topik, format, durasi, dan timeline yang paling sesuai.
        </p>
        <Link href="/v2/events" className="inline-block m-1.5 text-sm font-bold px-9 py-4 rounded-full text-white transition-colors shadow-xl hover:bg-black" style={{ background: "#0B0A12" }}>
          Lihat Events
        </Link>
        <Link href="/v2/proposal" className="inline-block m-1.5 text-sm font-bold px-9 py-4 rounded-full bg-white text-[#0F172A] hover:bg-white/90 transition-colors shadow-xl">
          Konsultasi Program
        </Link>
        <p className="text-sm text-white/85 mt-6 font-medium">
          Konsultasi gratis <span className="mx-1.5 opacity-70">✦</span> Tanpa komitmen <span className="mx-1.5 opacity-70">✦</span> Respon 1 hari kerja
        </p>
      </div>

      {/* Black rounded footer floating inside the gradient */}
      <footer className="relative max-w-6xl mx-auto mt-16 md:mt-24 rounded-[2rem] md:rounded-[2.75rem] px-7 md:px-14 pt-10 md:pt-14 pb-8 text-white" style={{ background: "#0B0A12" }}>
        <div className="flex flex-col lg:flex-row lg:justify-between gap-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="Skillary" width={58} height={32} className="h-8 w-auto object-contain" />
              <span className="text-xl font-bold tracking-tight">Skillary</span>
            </div>
            <p className="text-sm text-white/45 leading-relaxed">
              Dibangun untuk pembelajaran profesional.
              <br />
              Dirancang untuk hasil yang terukur.
            </p>
          </div>

          {/* Link columns + socials */}
          <div className="flex flex-wrap gap-x-16 gap-y-8">
            <ul className="space-y-3 text-sm text-white/60">
              {FOOTER_NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="hover:text-white transition-colors">{n.label}</Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-3 text-sm text-white/60">
              <li><Link href="/v2/catalog" className="hover:text-white transition-colors">Katalog Program</Link></li>
              <li><Link href="/v2/untuk-organisasi" className="hover:text-white transition-colors">Untuk Organisasi</Link></li>
              <li><Link href="/v2/portfolio" className="hover:text-white transition-colors">Portofolio</Link></li>
              <li><Link href="/v2/about" className="hover:text-white transition-colors">Tentang</Link></li>
              <li><Link href="/v2/proposal" className="hover:text-white transition-colors">Kontak</Link></li>
            </ul>

            {/* Socials */}
            <div className="flex items-start gap-3">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 1.8.25 2.2.41.6.22 1 .48 1.4.9.4.4.7.9.9 1.4.16.4.35 1 .41 2.2.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 1.8-.41 2.2-.22.6-.48 1-.9 1.4-.4.4-.9.7-1.4.9-.4.16-1 .35-2.2.41-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-1.8-.25-2.2-.41-.6-.22-1-.48-1.4-.9-.4-.4-.7-.9-.9-1.4-.16-.4-.35-1-.41-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-1.8.41-2.2.22-.6.48-1 .9-1.4.4-.4.9-.7 1.4-.9.4-.16 1-.35 2.2-.41C8.4 2.2 8.8 2.2 12 2.2m0 2.3c-3.1 0-3.5 0-4.7.07-1.1.05-1.7.24-2.1.4-.5.2-.9.44-1.3.83-.4.4-.63.76-.83 1.3-.16.4-.35 1-.4 2.1-.07 1.2-.07 1.6-.07 4.7s0 3.5.07 4.7c.05 1.1.24 1.7.4 2.1.2.5.44.9.83 1.3.4.4.76.63 1.3.83.4.16 1 .35 2.1.4 1.2.07 1.6.07 4.7.07s3.5 0 4.7-.07c1.1-.05 1.7-.24 2.1-.4.5-.2.9-.44 1.3-.83.4-.4.63-.76.83-1.3.16-.4.35-1 .4-2.1.07-1.2.07-1.6.07-4.7s0-3.5-.07-4.7c-.05-1.1-.24-1.7-.4-2.1-.2-.5-.44-.9-.83-1.3-.4-.4-.76-.63-1.3-.83-.4-.16-1-.35-2.1-.4-1.2-.07-1.6-.07-4.7-.07M12 7.3a4.7 4.7 0 1 1 0 9.4 4.7 4.7 0 0 1 0-9.4m0 2.3a2.4 2.4 0 1 0 0 4.8 2.4 2.4 0 0 0 0-4.8m5.9-2.6a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0"/></svg>
              </a>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.488-1.087z"/></svg>
              </a>
              <a href={`mailto:${EMAIL_GENERAL}`} aria-label="Email" className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors" style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-xs text-white/40" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <span>© 2026 PT Skillary Generasi Cerdas. All rights reserved.</span>
          <span className="flex gap-6">
            <Link href="/privacy" className="hover:text-white/70 transition-colors">Kebijakan Privasi</Link>
            <Link href="/terms" className="hover:text-white/70 transition-colors">Syarat &amp; Ketentuan</Link>
          </span>
        </div>
      </footer>
    </section>
  );
}
