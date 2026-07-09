import Link from "next/link";

const GRADIENT = "linear-gradient(111deg, rgb(255,138,0) 0%, rgb(255,90,95) 60%, rgb(255,138,0) 120%)";

/** Orange checkmark used in feature/benefit lists. */
export function Check() {
  return (
    <svg className="w-4 h-4 shrink-0 mt-0.5" style={{ color: "rgb(255,138,0)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/** Centered eyebrow + gradient-capable heading + optional sub. */
export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: "rgb(255,138,0)" }}>
        {eyebrow}
      </p>
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">{title}</h2>
      {sub && <p className="text-[#64748B] mt-4 leading-relaxed">{sub}</p>}
    </div>
  );
}

/** Inline gradient-text span (matches the landing hero accent). */
export function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-clip-text text-transparent" style={{ backgroundImage: GRADIENT }}>
      {children}
    </span>
  );
}

/** Aimfox "liquid-glass" button — glows warm on hover. Best on dark surfaces. */
export function GlassButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="relative inline-flex items-center justify-center h-12 px-7 rounded-full text-sm font-semibold text-white bg-black/20 shadow-[0_0_16.8px_0_rgba(255,255,255,0.40)_inset] after:absolute after:inset-0 after:rounded-full after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100 after:shadow-[0_0_4.2px_0_rgba(255,170,100,0.30),0_0_35px_0_rgba(255,150,70,0.30),0_-6.3px_7px_-5.6px_#FFE4CC_inset,0_-14px_16px_-11.2px_#FFEDDC_inset,0_0_7px_1.4px_#FFD2A8_inset,0_0_16px_0_#FFA14D_inset,0_0_42px_0_#FF8A00_inset]"
    >
      <span className="relative z-10">{children}</span>
    </Link>
  );
}
