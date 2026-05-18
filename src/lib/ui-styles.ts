/**
 * Skillary Design System v2 — UI Style Constants
 * ─────────────────────────────────────────────────────────────────────────────
 * Canonical class strings for the Skillary v2 design system.
 *
 * Usage (Sprint 2+ public page refactoring):
 *   import { btn, card, pill } from "@/lib/ui-styles";
 *   <button className={btn.gradient}>Minta Proposal</button>
 *   <div className={card.warm}>…</div>
 *
 * For React components, prefer the typed Button variants in:
 *   @/components/ui/Button.tsx
 *
 * These string constants are for pages that use inline className strings
 * or need finer control without importing a full component.
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ─── Primary Gradient (orange→coral) ─────────────────────────────────────────
// Replace all bg-[#1E3A8A] navy-blue CTA buttons with this on public pages.
export const GRADIENT_STYLE = 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))';
export const GRADIENT_STYLE_EXTENDED = 'linear-gradient(135deg, rgb(255, 138, 0) 0%, rgb(255, 90, 95) 55%, rgb(236, 72, 153) 100%)';

// ─── Button Class Strings ─────────────────────────────────────────────────────
export const btn = {
  /** Primary gradient CTA — public pages (replaces #1E3A8A). Requires inline style GRADIENT_STYLE. */
  gradient: 'rounded-full px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[rgb(255,138,0)] focus-visible:ring-offset-2 outline-none',

  /** Large gradient CTA — section CTAs and promo banners. Requires inline style GRADIENT_STYLE. */
  gradientLg: 'rounded-full px-8 py-4 text-base font-bold text-white shadow-lg transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[rgb(255,138,0)] focus-visible:ring-offset-2 outline-none',

  /** Secondary: white pill with warm border — use on #FFFDF9 backgrounds. */
  ghostWarm: 'rounded-full border bg-white px-6 py-3 text-sm font-semibold text-[#334155] transition-all duration-200 hover:bg-[#FFF8F1] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[rgb(255,138,0)] focus-visible:ring-offset-2 outline-none',

  /** Ghost warm large */
  ghostWarmLg: 'rounded-full border bg-white px-8 py-4 text-base font-bold text-[#334155] transition-all duration-200 hover:bg-[#FFF8F1] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[rgb(255,138,0)] focus-visible:ring-offset-2 outline-none',

  /** White on gradient bg — used inside gradient banners (about CTA, etc). */
  whiteOnGradient: 'rounded-full bg-white px-8 py-4 text-base font-bold shadow-lg hover:scale-105 transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 outline-none',

  /** Transparent on gradient bg — secondary on gradient sections. */
  ghostOnGradient: 'rounded-full bg-white/20 border border-white/30 text-white px-8 py-4 text-base font-bold hover:bg-white/30 transition-colors focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 outline-none',

  /** Dark — admin/LMS primary actions. */
  dark: 'rounded-full bg-[#181818] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] focus-visible:ring-2 focus-visible:ring-[rgb(255,138,0)] focus-visible:ring-offset-2 outline-none',
} as const;

// ─── Warm Border Style ────────────────────────────────────────────────────────
/** Use as style prop: style={warmBorder} */
export const warmBorder = { border: '1.5px solid rgb(240, 217, 200)' } as const;

// ─── Card Class Strings ───────────────────────────────────────────────────────
export const card = {
  /** Standard warm card — use on public pages. */
  warm: 'bg-white rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all duration-200',

  /** Feature/capability card with warm fill background. */
  surface: 'bg-[#FFFDF9] rounded-2xl hover:-translate-y-1 transition-transform',

  /** Dashed empty-state card. */
  empty: 'border border-dashed border-black/10 rounded-xl bg-[#FFFDF9] flex flex-col items-center justify-center text-center p-12',

  /** Admin/data card — inherits from shared Card component; use <Card> directly. */
  admin: 'rounded-[28px] border border-black/6 bg-white shadow-sm',
} as const;

// ─── Pill / Badge Class Strings ───────────────────────────────────────────────
export const pill = {
  /** Warm eyebrow pill — section labels, CTA badges. Requires inline style warmPillStyle. */
  warm: 'inline-flex rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest',

  /** Small warm tag. */
  warmSm: 'inline-flex rounded-full px-3 py-1 text-xs font-semibold',

  /** Neutral muted pill. */
  neutral: 'inline-flex rounded-full px-3 py-1 text-xs font-semibold bg-black/5 text-black/60',

  /** Level: Basic */
  levelBasic: 'text-[10px] font-semibold px-2 py-0.5 rounded-full bg-green-100 text-green-700',

  /** Level: Menengah */
  levelMid: 'text-[10px] font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700',

  /** Level: Lanjutan */
  levelAdv: 'text-[10px] font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-700',
} as const;

/** Inline style for warm pill — use with pill.warm or pill.warmSm */
export const warmPillStyle = {
  background: 'rgb(255, 244, 232)',
  color: 'rgb(255, 138, 0)',
  border: '1.5px solid rgb(255, 214, 165)',
} as const;

// ─── Text Class Strings ───────────────────────────────────────────────────────
export const text = {
  /** Dark heading — replaces text-[#0F172A] Slate 900. */
  heading: 'text-skillary-navy',

  /** Body/description — replaces text-[#475569] Slate 600. */
  body: 'text-skillary-muted',

  /** Light muted — replaces text-[#64748B] Slate 500. */
  light: 'text-black/55',

  /** Orange accent — for links, labels. */
  accent: 'text-skillary-orange',

  /** Gradient text — section headlines or logo. */
  gradient: 'gradient-text',

  /** Disclaimer / micro copy. */
  disclaimer: 'text-[10px] text-[#94A3B8] italic font-medium',
} as const;

// ─── Surface / Section Class Strings ─────────────────────────────────────────
export const surface = {
  /** Warm ivory page/section background. */
  warm: 'bg-[#FFFDF9]',

  /** Pure white section (alternating). */
  white: 'bg-white',

  /** Cream tinted section. */
  cream: 'bg-[#FAF3EA]',
} as const;
