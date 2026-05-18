# Skillary Global UI Alignment — Sprint 1: Foundation Fixes

**Date:** 2026-05-08
**Phase:** Sprint 1 of 6 — Foundation Fixes
**Build status:** ✅ TypeScript clean · ✅ Build passing
**Refactoring scope:** Foundation only — no public page redesign, no backend changes

---

## 1. Double Footer — Diagnosis & Fix

### Root Cause
`src/app/page.tsx` explicitly imported and rendered `<Footer as LandingFooter />` from `src/components/landing/Footer.tsx` as the last section. At the same time, `src/app/layout.tsx` renders `<Footer />` from `src/components/layout/Footer.tsx` for all routes unconditionally.

Result: homepage rendered **two full footers** stacked.

### Fix Applied
**Option chosen:** Remove `<LandingFooter />` from `page.tsx` and upgrade `layout/Footer.tsx` to match the landing footer's quality. One footer. One source of truth.

**Reason for this option over conditional rendering:**
- Conditional rendering in `layout.tsx` (checking `pathname === "/"`) requires a Client Component wrapper around the Footer, which unnecessarily increases JS bundle for a static element.
- The landing footer and shared footer were 95% identical in content — upgrading the shared one is cleaner and safer.
- All routes retain their footer automatically.

### Changes
| File | Change |
|------|--------|
| `src/app/page.tsx` | Removed `import { Footer as LandingFooter }` and `<LandingFooter />` |
| `src/components/layout/Footer.tsx` | **Upgraded** to 5-column layout, warm brand copy, HQ address, map pin, email — matching landing footer quality |

### Footer Copy (now active on all pages)
```
Platform pelatihan terukur untuk organisasi, berangkat dari pengalaman pelatihan Allman sejak 1998.
```

### Footer Links (now unified)
- **Platform:** Platform, Demo, Laporan, Sertifikat
- **Program:** Jelajahi Program, Training Path, Brief Training
- **Untuk Organisasi:** Solusi Organisasi, Minta Proposal, Kontak, Portofolio, Studi Kasus, Tentang Kami
- **Legal:** Kebijakan Privasi, Syarat & Ketentuan

### Homepage Footer Status (by code inspection)
`page.tsx` no longer imports or renders `LandingFooter`. `layout.tsx` still renders `<Footer />` once. **One footer renders on homepage. ✅**

---

## 2. Logo Treatment

### Finding
`src/components/ui/Logo.tsx` — the shared logo rendered in the layout Header and mobile nav — displayed the subtitle **"Modern Learning Platform"**, a holdover from the early B2C prototype era.

The approved B2B positioning is: **"Platform Pelatihan Terukur"**

### Fix Applied
Updated the single `Logo.tsx` subtitle string. Change propagates automatically to:
- Desktop navigation header (all routes)
- Mobile drawer header

### Logo Consistency Status
| Location | Treatment | Status |
|----------|-----------|--------|
| `components/ui/Logo.tsx` (shared header + mobile) | Box icon + "Skillary" + "Platform Pelatihan Terukur" | ✅ Fixed |
| `components/layout/Footer.tsx` | Inline Skill+**ary** gold wordmark | ✅ Consistent |
| `components/landing/Footer.tsx` | Same inline wordmark | ✅ Consistent (now unused, file kept) |
| `components/landing/Header.tsx` | Gradient "Skillary" + "Platform Pelatihan Terukur" | ✅ Already correct (orphaned, not rendered) |

Remaining minor delta: The shared `Logo.tsx` uses a rounded-2xl badge with gradient "S" initial, while footers use an inline box icon wordmark. This is a deliberate contextual difference (header vs. footer) and is acceptable.

---

## 3. Button Foundation

### Finding
4 distinct primary button styles existed:
- `GradientButton` — inline, landing pages only
- `bg-[#181818]` dark — shared `PrimaryButton`
- `bg-[#1E3A8A]` navy — V1 public pages (hardcoded inline)
- None (admin) — `bg-black` inline

### Fix Applied

**A. Upgraded `src/components/ui/Button.tsx`** — added 2 new exported variants:

| Variant | When to use |
|---------|-------------|
| `GradientButton` | Primary CTA on all public pages. **Replace `bg-[#1E3A8A]` with this in Sprint 2+** |
| `GhostWarmButton` | Secondary ghost action on ivory backgrounds |
| `PrimaryButton` *(existing)* | Admin/LMS/mobile nav (dark pill — keep) |
| `SecondaryButton` *(existing)* | Backward compat secondary — keep |

**B. Created `src/lib/ui-styles.ts`** — canonical string constants for cases where React components aren't suitable:

```ts
import { btn, card, pill, text, surface, GRADIENT_STYLE, warmBorder } from "@/lib/ui-styles";

// Example — Sprint 2 page migration:
<button className={btn.gradient} style={{ background: GRADIENT_STYLE }}>
  Minta Proposal
</button>
```

Exports: `btn`, `card`, `pill`, `text`, `surface`, `warmBorder`, `warmPillStyle`, `GRADIENT_STYLE`, `GRADIENT_STYLE_EXTENDED`

### Backward Compatibility
`PrimaryButton` and `SecondaryButton` are **unchanged**. All existing imports still work.

---

## 4. Orphaned Landing Header

### Finding
`src/components/landing/Header.tsx` — 64 lines, no imports anywhere in the codebase. Confirmed orphaned.

### Why it's inferior to the shared header
- No `useSession` → can't show auth state
- No account dropdown
- No mobile drawer / scroll-lock
- No active-route gradient highlight
- Uses `rounded-lg` nav (not `rounded-full` as current system uses)
- No `PrimaryButton` usage

### Decision: Document, do NOT delete yet
Deletion is safe (zero imports), but the convention is to validate QA before cleanup. A `@deprecated` JSDoc comment was added with:
- Clear "DO NOT USE" notice
- List of missing capabilities vs. shared header
- Scheduled deletion milestone: Sprint 3
- Reference ticket to the audit doc

---

## 5. /community Claim-Safety Fix

### Issues Found
| Line | Original | Risk |
|------|----------|------|
| 66 | `"sesi mentoring gratis"` | Implied permanent free offer — unverified commitment |
| 92 | `"Gratis Selamanya"` pill tag | Explicit permanent free claim — high risk |

### Fixes Applied
| Line | New Copy |
|------|---------|
| 66 | `"sesi diskusi komunitas dan workshop untuk bertemu langsung dengan praktisi"` |
| 92 | Pill changed from `"Gratis Selamanya"` → `"Tersedia untuk Peserta Program"` |

### Full /community Scan Result
| Pattern | Found? |
|---------|--------|
| Fake learner count / metrics | ❌ Not found |
| Fake testimonials | ❌ Not found |
| Fake partner logos | ❌ Not found |
| "Trusted by" | ❌ Not found |
| "Bootcamp" | ❌ Not found |
| "10K+" / "10 Ribu+" | ❌ Not found |
| "Beasiswa" | ❌ Not found |
| "Gratis" (unsafe) | ✅ Fixed (2 instances) |

Page is now claim-safe. ✅

---

## 6. Footer Copy Safety

### Shared Footer (layout/Footer.tsx) — Final Copy Audit
| Element | Old Copy | New Copy | Safe? |
|---------|----------|----------|-------|
| Tagline | "Berangkat dari pengalaman pelatihan sejak 1998, Skillary hadir sebagai platform pelatihan terukur untuk organisasi modern." | "Platform pelatihan terukur untuk organisasi, berangkat dari pengalaman pelatihan Allman sejak 1998." | ✅ |
| Copyright | Dynamic `new Date().getFullYear()` | Same | ✅ |
| Forbidden patterns | None found | — | ✅ |

Patterns **not present** in footer: "mencetak talenta digital", "platform belajar digital terpercaya", "siap kerja", "bootcamp", "beasiswa", "10K learner" ✅

---

## 7. What Remains for Sprint 2

### High-Traffic Public Pages (Priority)
Pages still using `bg-[#1E3A8A]` navy buttons and Slate text palette:

| Page | Primary Issue |
|------|--------------|
| `/services` | Navy `bg-[#1E3A8A]` CTA, Slate text `#0F172A`/`#475569` |
| `/platform` | Navy `bg-[#1E3A8A]` CTA, blue step indicators `#1E3A8A/10` |
| `/demo` | Navy `bg-[#1E3A8A]` CTA, cold `#CBD5E1` card borders |
| `/proposal` | Navy `bg-[#1E3A8A]` CTA, `#D88A44` brownish bullet accent |
| `/program-catalog` | Navy badge + CTA, `#C2410C`/`#FED7AA` Tailwind orange |

**Sprint 2 pattern:** Replace all `bg-[#1E3A8A]` with `<GradientButton>` or `btn.gradient`. Replace Slate text with Skillary tokens. Import `warmBorder` for card borders.

### Lower Priority (Sprint 3+)
- `/portfolio`, `/certificates`, `/case-studies`, `/resources`, `/training-brief`, `/expert-partner`, `/teams`
- `/explore` client component (ExploreClient)
- `/dashboard` (neo-brutalist card softening)
- `/admin` (minimal cosmetic polish)

### Orphaned Component Cleanup
- Delete `src/components/landing/Header.tsx` in Sprint 3 (post full-site QA)
- Optionally archive `src/components/landing/Footer.tsx` (no longer rendered) in Sprint 3

---

## 8. QA Checklist

### Automated (completed)
- [x] `npx tsc --noEmit` — **CLEAN**
- [x] `npm run build` — **CLEAN, exit 0**
- [x] Zero imports of `LandingFooter` remain in codebase
- [x] Zero broken imports from Button.tsx changes (additive only)
- [x] `/community` claim-safety scan — **clean**
- [x] Footer copy scan — **clean**
- [x] No backend/API files changed
- [x] No Prisma/auth/payment/enrollment/certificate files changed
- [x] No new npm dependencies added
- [x] Landing page section count unchanged (12 sections)

### Manual Browser QA Required
- [ ] Homepage: verify one footer renders (not two)
- [ ] Homepage: verify landing page sections intact + animations working
- [ ] Mobile: verify Logo subtitle reads "Platform Pelatihan Terukur" in drawer
- [ ] /community: verify body copy and pill copy changes render correctly
- [ ] Footer: verify 5-column layout renders on desktop, stacks on mobile
- [ ] Footer links: spot-check 3–4 links navigate correctly
- [ ] Header: verify auth/nav still works on login/dashboard
- [ ] Run in deploy preview before merging to main

---

## Files Changed in This Sprint

| File | Type | Reason |
|------|------|--------|
| `src/app/page.tsx` | **Modified** | Removed `<LandingFooter />` + its import — fixes double footer |
| `src/components/layout/Footer.tsx` | **Modified** | Upgraded to 5-col landing-quality layout, B2B copy, address block |
| `src/components/ui/Logo.tsx` | **Modified** | Subtitle: "Modern Learning Platform" → "Platform Pelatihan Terukur" |
| `src/components/ui/Button.tsx` | **Modified** | Added `GradientButton` + `GhostWarmButton` variants (additive, backward-compat) |
| `src/lib/ui-styles.ts` | **Created** | Style constants library for Sprint 2+ page migrations |
| `src/app/community/page.tsx` | **Modified** | Claim-safety: removed "gratis" language from 2 locations |
| `src/components/landing/Header.tsx` | **Modified** | Added `@deprecated` JSDoc — marked for deletion in Sprint 3 |
| `docs/global_ui_alignment_sprint_1_foundation.md` | **Created** | This document |
| `docs/skillary_handoff_summary.md` | **Modified** | Sprint 1 status appended |
