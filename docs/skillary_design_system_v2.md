# Skillary Design System v2

**Extracted from:** Approved Landing Page (`src/app/page.tsx`) + `src/app/globals.css`
**Date:** 2026-05-08
**Status:** Canonical reference for all future UI alignment work

---

## 1. Brand Mood

| Attribute | Description |
|-----------|-------------|
| **Personality** | Warm, professional, lively, trustworthy |
| **Feel** | Modern Indonesian B2B edutech — not cold SaaS, not flashy startup |
| **Inspiration** | Skilvul-level clarity, corporate warmth, card-based exploration |
| **Avoid** | Generic blue SaaS, neon accents, brutalist edges, hype-driven B2C copy |

**Tagline tone:** "Platform Pelatihan Terukur untuk Organisasi" — measured, factual, confident.

---

## 2. Color Palette

### 2a. Core Brand Colors

| Token | CSS Variable | HSL | Hex Approx | Usage |
|-------|-------------|-----|------------|-------|
| **Skillary Orange** | `--color-skillary-orange` | `hsl(33, 100%, 50%)` | `#FF8A00` | Primary accent, CTA gradient start, links, icons |
| **Skillary Coral** | `--color-skillary-coral` | `hsl(358, 100%, 67%)` | `#FF5A5F` | CTA gradient midpoint |
| **Skillary Pink** | `--color-skillary-pink` | `hsl(322, 81%, 60%)` | `#EC4899` | CTA gradient end, gradient-text terminus |

### 2b. Surface & Background Colors

| Token | CSS Variable | HSL | Usage |
|-------|-------------|-----|-------|
| **Page Background** | (body rule) | `#FFFDF9` | Global body background |
| **Surface** | `--color-skillary-surface` | `hsl(36, 40%, 98%)` | Card backgrounds, alt sections |
| **Cream** | `--color-skillary-cream` | `hsl(36, 100%, 98%)` | Light surface variant |
| **Peach** | `--color-skillary-peach` | `hsl(36, 100%, 96%)` | Hover backgrounds, warm tint |
| **White** | — | `#FFFFFF` | Cards, inputs |

### 2c. Text Colors

| Token | CSS Variable | HSL | Usage |
|-------|-------------|-----|-------|
| **Navy (Dark)** | `--color-skillary-navy` | `hsl(222, 47%, 9%)` | Headings, primary text |
| **Body Text** | (body rule) | `#181818` | Default body text |
| **Muted** | `--color-skillary-muted` | `hsl(220, 9%, 46%)` | Secondary text, descriptions |

### 2d. Border & Divider

| Token | CSS Variable | Value | Usage |
|-------|-------------|-------|-------|
| **Border** | `--color-skillary-border` | `hsl(26, 43%, 90%)` ≈ `rgb(240, 217, 200)` | Card borders, section dividers, header bottom |

### 2e. Utility Colors

| Token | CSS Variable | HSL | Usage |
|-------|-------------|-----|-------|
| **Blue** | `--color-skillary-blue` | `hsl(221, 83%, 53%)` | Info accents, secondary links |
| **Cyan** | `--color-skillary-cyan` | `hsl(199, 89%, 60%)` | Data/tech accents |
| **Light Blue** | `--color-skillary-light-blue` | `hsl(210, 100%, 95%)` | Info backgrounds |

### 2f. Status Colors (Recommended)

| Status | Background | Text | Border |
|--------|-----------|------|--------|
| **Success** | `bg-green-50` / `bg-green-100` | `text-green-700` | `border-green-500/20` |
| **Warning** | `bg-[#FFF8EC]` / `bg-[#F6C34F]/20` | `text-[#D48924]` / `text-[#D97D00]` | `border-[#F6C34F]/30` |
| **Error** | `bg-red-50` | `text-red-600` | — |
| **Info** | `bg-blue-50` | `text-blue-600` | — |

### 2g. Primary Gradient

```css
/* Standard (buttons, nav active, avatar) */
background: linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95));

/* Extended (banners, CTA sections, promo) */
background: linear-gradient(135deg, rgb(255, 138, 0) 0%, rgb(255, 90, 95) 55%, rgb(236, 72, 153) 100%);

/* Text gradient */
.gradient-text {
  background: linear-gradient(120deg, #ff8a00, #ff5a5f 55%, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 2h. Shadow Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-card-hover` | `0 10px 28px -5px rgba(255,138,0,.18), 0 4px 12px -3px rgba(255,90,95,.1)` | Card hover state |
| `--shadow-banner` | `0 20px 60px -10px rgba(255,90,95,.25)` | Gradient banner |
| `--shadow-bubble` | `0 4px 16px rgba(0,0,0,.08)` | Skill bubbles |
| `--shadow-bubble-hover` | `0 8px 28px rgba(255,138,0,.2)` | Skill bubble hover |

---

## 3. Typography Scale

### 3a. Font Stack

```css
--font-sans: var(--font-geist-sans); /* Geist Sans via next/font */
--font-mono: var(--font-geist-mono); /* Geist Mono */
body { font-family: Arial, Helvetica, sans-serif; } /* fallback */
```

### 3b. Heading Scale

| Level | Landing Usage | Classes |
|-------|--------------|---------|
| **Hero H1** | "Kelola Pelatihan Organisasi" | `text-[2.6rem] md:text-[3.2rem] font-extrabold leading-[1.15] text-skillary-navy` |
| **Banner H2** | "Training Internal Lebih Terstruktur" | `text-5xl md:text-6xl font-black text-white leading-none tracking-tight` |
| **Section H2** | "Program Pelatihan Unggulan" | `text-xl md:text-2xl font-extrabold text-skillary-navy` |
| **Card H3** | Course titles | `font-bold text-sm text-skillary-navy leading-snug line-clamp-2` |
| **CTA Section H2** | Used on about/public pages | `text-3xl font-extrabold tracking-tight sm:text-4xl` |

### 3c. Body Text

| Level | Classes |
|-------|---------|
| **Body** | `text-base text-skillary-muted leading-relaxed` |
| **Body Small** | `text-sm text-skillary-muted leading-relaxed` |
| **Caption** | `text-xs text-skillary-muted` |
| **Micro** | `text-[10px] font-bold uppercase tracking-widest` (labels) |
| **Disclaimer** | `text-[10px] text-[#94A3B8] italic font-medium` |

---

## 4. Button Styles

### 4a. Primary Button (Gradient CTA)

```
Usage: Main CTAs on public pages, hero sections, promo banners
Classes: text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-md
         hover:opacity-90 transition-opacity
Style:   background: linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))
```

### 4b. Primary Button (Dark/System)

```
Usage: Shared PrimaryButton component, admin actions, dashboard
Component: <PrimaryButton> from components/ui/Button.tsx
Classes: rounded-full bg-[#181818] px-6 py-3 text-sm font-semibold text-white
         shadow-lg shadow-black/10 hover:-translate-y-1
         hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)]
         focus-visible:ring-2 focus-visible:ring-[#F6C34F]
```

### 4c. Secondary Button

```
Usage: Alternative actions
Component: <SecondaryButton> from components/ui/Button.tsx
Classes: rounded-full border border-black/10 bg-white px-6 py-3 text-sm
         font-semibold text-black hover:-translate-y-0.5 hover:bg-black/5
         hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#F6C34F]
```

### 4d. Ghost Button

```
Usage: Tertiary actions, "back" links
Classes: text-sm font-bold hover:underline transition-all
Style:   color: rgb(255, 138, 0)
```

### 4e. Button Variant to Add (Recommended)

```
GradientButton: Codify the landing gradient CTA as a reusable component
WhiteButton: White bg + warm border for use on gradient backgrounds
```

### 4f. Button Sizes

| Size | Padding | Font |
|------|---------|------|
| **Small** | `px-4 py-1.5` | `text-xs font-bold` |
| **Default** | `px-5 py-2.5` | `text-sm font-bold` |
| **Large** | `px-8 py-4` | `text-lg font-bold` |

---

## 5. Card Styles

### 5a. Standard Card

```
Component: <Card> from components/ui/Card.tsx
Classes: rounded-[28px] border border-black/6 bg-white shadow-sm
         hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)]
         transition-all duration-300
```

### 5b. Landing Card (Program/Course)

```
Classes: bg-white rounded-2xl overflow-hidden
Style:   border: 1.5px solid rgb(240, 217, 200)
         box-shadow: rgba(0, 0, 0, 0.06) 0px 1px 4px
CSS:     .card-hover (translateY(-4px) + var(--shadow-card-hover))
```

### 5c. Soft Card

```
Component: <SoftCard> from components/ui/Card.tsx
Classes: rounded-[24px] bg-[#FAFAFA] ring-1 ring-black/5
         hover:bg-black/[0.03] transition-all duration-300
```

### 5d. Info Card (Feature/Capability)

```
Classes: bg-[#FFFDF9] border border-skillary-border rounded-2xl p-6
         shadow-sm hover:-translate-y-1 transition-transform
```

### 5e. Card Radius Reference

| Context | Radius |
|---------|--------|
| Shared Card component | `rounded-[28px]` |
| Landing cards | `rounded-2xl` (16px) |
| Banners | `rounded-3xl` (24px) |
| Inner elements | `rounded-xl` (12px) or `rounded-lg` (8px) |
| Pills/badges | `rounded-full` |

---

## 6. Form Styles

### 6a. Text Input

```
Classes: w-full rounded-xl border border-black/10 bg-white px-4 py-3
         text-sm outline-none transition
         focus:border-[#F49B4F] focus:ring-2 focus:ring-[#F49B4F]/20
```

**Recommended token migration:** Replace `#F49B4F` with `var(--color-skillary-orange)`.

### 6b. Label

```
Classes: block text-sm font-medium text-black/70 mb-1.5
```

### 6c. Error Message

```
Classes: text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2
```

### 6d. Form Card Wrapper

```
Classes: w-full max-w-md p-8 shadow-[0_25px_80px_rgba(0,0,0,0.08)]
Component: <Card> with custom shadow override
```

---

## 7. Search / Filter Styles

### 7a. Search Bar (Hero)

```
Classes: flex items-center gap-2 max-w-md bg-white rounded-full px-4 py-2.5
Style:   border: 2px solid rgb(240, 217, 200)
         box-shadow: rgba(255, 138, 0, 0.08) 0px 2px 12px
Icon:    Search icon (lucide) text-skillary-muted
Button:  gradient pill inside search bar
```

### 7b. Category Pills (Filter)

```
Classes: text-xs font-semibold px-3 py-1 rounded-full border
         transition-all duration-150 hover:scale-105
Style:   background: rgb(255, 244, 232)
         borderColor: rgb(255, 214, 165)
         color: rgb(255, 138, 0)
```

---

## 8. Badge / Pill Styles

### 8a. Warm Badge (Primary)

```
Classes: inline-flex rounded-full px-4 py-2 text-[11px] font-bold
         uppercase tracking-widest
Style:   background: rgb(255, 244, 232)
         color: rgb(255, 138, 0)
         border: 1.5px solid rgb(255, 214, 165)
```

### 8b. Pill Component

```
Component: <Pill> from components/ui/Pill.tsx
Tones:
  neutral → bg-black/5 text-black/60
  warm    → bg-[#FFF3E4] text-[#D46E32]
  white   → bg-white text-black/65 ring-1 ring-black/5
```

### 8c. Level Badge

```
Classes: text-[10px] font-semibold px-2 py-0.5 rounded-full
Variants:
  Basic      → bg-green-100 text-green-700
  Menengah   → bg-amber-100 text-amber-700
  Lanjutan   → bg-red-100 text-red-700
```

### 8d. Status Badge

```
Classes: text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full
Variants:
  PUBLISHED → bg-green-100 text-green-700
  DRAFT     → bg-black/10 text-black/60
  ARCHIVED  → bg-black/5 text-black/50
  FAILED    → bg-[#EB6C64]/10 text-[#EB6C64]
```

---

## 9. Table Styles

### 9a. Data Table (Admin)

```
Wrapper: <Card className="p-0 overflow-hidden">
Table:   w-full text-left text-sm
Thead:   border-b border-black/5 bg-black/5
Th:      px-5 py-3 font-medium text-black/60
Tbody:   divide-y divide-black/5 bg-white
Td:      px-5 py-3
Row hover: hover:bg-black/[0.02] transition-colors
```

---

## 10. Progress / Status Styles

### 10a. Progress Bar

```
Background: bg-black/5 rounded-full (track)
Fill:       bg-gradient-to-r from-[#F6C34F] to-[#EB6C64] rounded-full
Animation:  .motion-progress-fill (CSS keyframe)
Height:     h-2 or h-1.5
```

### 10b. Completion Status

```
In-progress: gradient text bg-clip-text text-transparent
             bg-gradient-to-br from-[#F6C34F] to-[#EB6C64]
Completed:   text-green-600 or bg-green-50 text-green-700
```

### 10c. Empty State

```
Container: p-12 flex flex-col items-center justify-center text-center
           border border-dashed border-black/10 rounded-xl bg-[#FFFDF9]
Icon:      h-14 w-14 bg-[#F6C34F]/20 text-[#D48924] rounded-2xl
Title:     text-xl font-semibold tracking-tight
Body:      text-black/50 text-sm max-w-sm
```

---

## 11. Motion Rules

### 11a. Keyframes (defined in globals.css)

| Animation | Effect | Duration |
|-----------|--------|----------|
| `fade-in-up` | opacity 0→1 + translateY(20→0) | 0.7-0.8s |
| `scale-fade-in` | opacity 0→1 + translateY(18→0) + scale(0.97→1) | 0.8s |
| `fade-in` | opacity 0→1 | 0.6s |
| `progress-fill` | width 0%→target | 1s |
| `float-up/down/side` | Gentle floating loop | 3-4.2s infinite |
| `pulse-dot` | opacity + scale pulse | infinite |
| `shimmer-move` | background-position sweep | infinite |

### 11b. Utility Classes

| Class | Usage |
|-------|-------|
| `.motion-fade-up` | Section entrance |
| `.motion-scale-in` | Card entrance |
| `.motion-fade-in` | Subtle reveal |
| `.motion-progress-fill` | Progress bars |
| `.motion-hover-lift` | Cards: translateY(-3px) on hover |
| `.motion-btn` | Buttons: translateY(-1px) on hover, 0 on active |
| `.card-hover` | Landing cards: translateY(-4px) + warm shadow |
| `.skill-bubble` | Floating skill labels: scale(1.06) on hover |

### 11c. Stagger Delays

```css
.motion-delay-100 through .motion-delay-1000
(100ms increments)
```

### 11d. Easing

```css
cubic-bezier(0.22, 1, 0.36, 1)  /* Primary easing — snappy decelerate */
ease-out                          /* Simple transitions */
ease-in-out                       /* Float loops */
```

### 11e. Reduced Motion

All motion classes have `@media (prefers-reduced-motion: reduce)` overrides that:
- Set `animation: none !important`
- Reset `opacity: 1 !important`
- Reset `transform: none !important`

**This is production-safe. ✅**

---

## 12. Usage Rules

### 12a. Public Pages

| Rule | Details |
|------|---------|
| **Primary CTA** | Use gradient button (`#FF8A00 → #FF5A5F`), `rounded-full` |
| **Secondary CTA** | White bg + warm border `rgb(240, 217, 200)`, `rounded-full` |
| **Tertiary CTA** | Ghost text link in `skillary-orange` |
| **Page background** | `#FFFDF9` or `white` alternating sections |
| **Section dividers** | `border-skillary-border` (warm cream) |
| **Card borders** | Use `border-skillary-border` token, not hardcoded hex |
| **Text colors** | Use `text-skillary-navy` (headings), `text-skillary-muted` (body) |
| **Badges** | Use warm badge pattern (`rgb(255, 244, 232)` bg) |
| **Motion** | Apply `.motion-fade-up` to sections, `.card-hover` to cards |
| **Container** | Use `<Container>` component (`max-w-7xl px-6 lg:px-10`) |
| **DO NOT** | Use `#1E3A8A` (navy blue) as primary CTA |
| **DO NOT** | Use Tailwind Slate preset colors (`#0F172A`, `#475569`) for text |
| **DO NOT** | Use `#C2410C` / `#FED7AA` — use Skillary tokens instead |

### 12b. LMS Pages

| Rule | Details |
|------|---------|
| **Priority** | Usability over decoration |
| **Background** | `#FFFDF9` ✅ (already used) |
| **Accent colors** | Keep `#F6C34F → #EB6C64` gradient for stats/progress |
| **Cards** | Shared `<Card>` component is fine; avoid neo-brutalist borders |
| **Buttons** | `<PrimaryButton>` (dark) is acceptable; gradient for major CTAs |
| **Progress bars** | Warm gradient fill on neutral track |
| **Tables** | Admin table style is acceptable |
| **Motion** | Minimal: hover lifts and transitions only |
| **DO NOT** | Over-decorate learning interfaces; keep content legible |
| **DO NOT** | Add floating animations to study areas |

### 12c. Admin Pages

| Rule | Details |
|------|---------|
| **Priority** | Functionality and data clarity |
| **Background** | `#FFFDF9` ✅ (already used) |
| **Navigation** | Pill-style nav matching dashboard layout |
| **Cards** | Shared `<Card>` with subtle borders |
| **Buttons** | Dark `bg-[#181818]` for actions; gradient for publish/important |
| **Status badges** | Use defined status badge palette |
| **Tables** | Admin table style (black/5 stripes) |
| **Motion** | Hover transitions only, no entrance animations |
| **DO NOT** | Change business logic, data flows, or CRUD behavior |
| **DO NOT** | Add decorative gradients or floating elements |
| **DO NOT** | Refactor component structure — cosmetic changes only |

### 12d. Auth Pages

| Rule | Details |
|------|---------|
| **Background** | `#FFFDF9` with warm gradient blobs ✅ (already implemented) |
| **Card** | Shared `<Card>` with elevated shadow |
| **Inputs** | Standard form input with orange focus ring |
| **CTA** | `<PrimaryButton>` (dark) for submit |
| **Links** | `#E68052` for secondary actions ✅ |
| **Motion** | Ambient background blobs only |
| **Already aligned** | Auth pages only need token migration, not redesign |

---

## 13. Token Migration Guide

When aligning a V1 page to V2, replace these patterns:

| V1 (Old) | V2 (New) |
|----------|----------|
| `bg-[#1E3A8A]` button | Gradient button or `bg-skillary-navy` |
| `text-[#0F172A]` | `text-skillary-navy` |
| `text-[#475569]` | `text-skillary-muted` |
| `text-[#64748B]` | `text-skillary-muted` (or `text-black/55`) |
| `text-[#94A3B8]` | `text-black/40` or `text-skillary-muted/70` |
| `border-[#E7DDD4]` | `border-skillary-border` |
| `bg-[#FFF7ED]` | `bg-skillary-peach` (close equivalent) |
| `text-[#C2410C]` | `text-skillary-orange` |
| `border-[#FED7AA]` | Use `rgb(255, 214, 165)` or `border-amber-200` |
| `rounded-lg` buttons | `rounded-full` for CTAs |
| No hover effects | Add `.card-hover` or `.motion-hover-lift` |

---

## 14. File Reference

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Token definitions, motion system, utility classes |
| `src/components/ui/Button.tsx` | `PrimaryButton`, `SecondaryButton` |
| `src/components/ui/Card.tsx` | `Card`, `SoftCard` |
| `src/components/ui/Container.tsx` | Layout container |
| `src/components/ui/Pill.tsx` | Badge/pill component |
| `src/components/ui/Logo.tsx` | Logo component |
| `src/components/ui/SectionTitle.tsx` | Section header component |
| `src/components/layout/Header.tsx` | Global header (warm-aligned) |
| `src/components/layout/Footer.tsx` | Global footer |
