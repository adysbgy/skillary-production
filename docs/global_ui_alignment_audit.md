# Skillary Global UI/UX Alignment Audit

**Audit Date:** 2026-05-08
**Phase:** 0 — Audit & Design System Extraction
**Source of Truth:** Landing page (`src/app/page.tsx`) and its 14 child components in `src/components/landing/`

---

## 1. Executive Summary

The Skillary landing page establishes a **warm, modern, professional B2B edutech** visual system built on orange/coral/pink accents, cream backgrounds, soft card borders, floating animations, and gradient CTAs. It uses the Skillary design tokens defined in `globals.css`.

**However, the rest of the website is split across three distinct visual eras:**

| Era | Pages | Key Symptoms |
|-----|-------|-------------|
| **V2 (Landing)** | `/` (landing page only) | Skillary tokens, warm palette, gradient CTAs, motion system, `max-w-6xl` container |
| **V1.5 (Aligned Public)** | `/about`, `/not-found`, `/community`, auth pages | Use landing-style warm palette with inline styles, but different container/component patterns |
| **V1 (Old Corporate)** | `/program-catalog`, `/platform`, `/services`, `/demo`, `/proposal`, `/portfolio`, `/reports`, `/case-studies` | Cold navy-blue `#1E3A8A` primary buttons, `#0F172A`/`#475569` Slate palette, `#C2410C`/`#FED7AA` Tailwind orange presets, no motion system |
| **V0 (Functional)** | `/admin/*`, `/dashboard/*`, `/learn/*` | Minimal styling, black-centric buttons, functional over decorative |

**Key finding:** ~70% of public pages still use the old V1 blue-navy-slate corporate style. The landing page is an island of warmth in a sea of cold corporate UI.

---

## 2. Landing Page Style Source of Truth

### Color Tokens (from `globals.css` @theme)
| Token | Value | Usage |
|-------|-------|-------|
| `--color-skillary-orange` | `hsl(33, 100%, 50%)` / `#FF8A00` | Primary accent |
| `--color-skillary-coral` | `hsl(358, 100%, 67%)` / `#FF5A5F` | Gradient endpoint |
| `--color-skillary-pink` | `hsl(322, 81%, 60%)` / `#EC4899` | Gradient terminus |
| `--color-skillary-peach` | `hsl(36, 100%, 96%)` | Hover backgrounds |
| `--color-skillary-cream` | `hsl(36, 100%, 98%)` | Light surface |
| `--color-skillary-navy` | `hsl(222, 47%, 9%)` | Text dark |
| `--color-skillary-surface` | `hsl(36, 40%, 98%)` | Page background |
| `--color-skillary-border` | `hsl(26, 43%, 90%)` / `rgb(240, 217, 200)` | Card/section borders |
| `--color-skillary-muted` | `hsl(220, 9%, 46%)` | Secondary text |
| `--color-skillary-blue` | `hsl(221, 83%, 53%)` | Accent blue |

### Primary Gradient
```
linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))
```
Extended variant: `…rgb(255, 90, 95) 55%, rgb(236, 72, 153) 100%`

### Body Background
```css
body { background: #FFFDF9; color: #181818; }
```

### Containers
- Landing page uses `max-w-6xl mx-auto px-5`
- Shared `<Container>` uses `max-w-7xl px-6 lg:px-10`
- **Inconsistency**: Two container width standards coexist

### Borders
- Landing: `1.5px solid rgb(240, 217, 200)` — the warm cream border
- Shared layout Header: same warm border ✓
- V1 pages: `border-[#E7DDD4]` (close but hardcoded hex, not token)

---

## 3. Pages Already Aligned (✅)

| Page | Status | Notes |
|------|--------|-------|
| `/` (landing) | ✅ Source of truth | 12 sections, own header/footer, full motion system |
| `/not-found` | ✅ Aligned | Uses warm gradient blobs, orange pills, gradient CTA buttons |
| `/login` | ✅ Nearly aligned | Warm background `#FFFDF9`, orange focus rings (`#F49B4F`), shared Card/Button components |
| `/register` | ✅ Nearly aligned | Same pattern as login |
| `/forgot-password` | ✅ Nearly aligned | Same auth card pattern |
| `/reset-password` | ✅ Nearly aligned | Same auth card pattern |

---

## 4. Pages Partially Aligned (⚠️)

| Page | Aligned | Not Aligned |
|------|---------|-------------|
| `/about` | ✅ Warm background blobs, orange pills, gradient CTA section, warm borders `rgb(240, 217, 200)` | ⚠️ Uses inline styles instead of tokens; text colors hardcoded as `#0F172A` (Slate 900) / `#475569` (Slate 600) instead of Skillary tokens |
| `/community` | ✅ Uses `rgb(255, 138, 0)` orange accent, warm borders, gradient CTA banner | ⚠️ Uses `PageHero` component (different from landing pattern); claim-safety issue with "Gratis Selamanya" |
| `/dashboard` | ✅ Uses `#FFFDF9` background, warm gradient accents `#F6C34F`→`#EB6C64`, shared Card/Button | ⚠️ Black neo-brutalist card style (`border-2 border-black shadow-[4px_4px_0]`) clashes with soft landing style |
| `/dashboard/layout` | ✅ Warm background, blurred nav bar | ⚠️ Uses generic black/5 nav pills, no active-state gradient |
| `/admin/layout` | ✅ Same subnav bar as dashboard | ⚠️ No gradient active state on nav pills |

---

## 5. Pages NOT Aligned (❌)

### 5a. Public Pages with Old Blue/Slate Style

| Page | Key Issues |
|------|-----------|
| `/program-catalog` | ❌ Primary CTA = `bg-[#1E3A8A]` (navy blue); badge = `#C2410C`/`#FED7AA` (Tailwind orange presets, not Skillary tokens); secondary button = `#FFFDF9` border `#E7DDD4` (close but not tokenized); text = Slate palette `#0F172A`/`#475569`/`#64748B`/`#94A3B8` |
| `/platform` | ❌ Same navy blue `#1E3A8A` primary buttons; workflow step indicators use `#1E3A8A/10` blue tint; no motion or hover lift; fully Slate text palette |
| `/services` | ❌ Navy blue `#1E3A8A` primary buttons; CTA link color `#C2410C` (Tailwind orange-700); rounded-lg buttons (not rounded-full like landing); border `#F1F5F9` (Slate 100, cold) |
| `/demo` | ❌ Same `#1E3A8A` blue buttons; `#CBD5E1` (Slate 300) borders on scenario cards; audience pills use cold border `#E7DDD4` |
| `/proposal` | ❌ Navy `#1E3A8A` primary; `#D88A44` bullet accent (non-token brownish); multiple CTA buttons in rows |
| `/portfolio` | ❌ Navy `#1E3A8A` primary; `#C2410C`/`#FED7AA` prebuilt Tailwind orange palette; disclaimer section uses `#F8FAFC`/`#E2E8F0` (Slate) |
| `/reports` | ❌ Likely old pattern (not yet inspected in detail but in V1 route group) |
| `/case-studies` | ❌ Old pattern |
| `/certificates` | ❌ Old pattern |
| `/resources` | ❌ Old pattern |
| `/training-brief` | ❌ Old pattern |
| `/expert-partner` | ❌ Old pattern |
| `/teams` | ❌ Old pattern |

### 5b. LMS / Learner Pages

| Page | Key Issues |
|------|-----------|
| `/dashboard` | ⚠️ Mixed: warm accents + neo-brutalist card style + `#F6C34F`/`#EB6C64` (similar but uses hex instead of tokens) |
| `/dashboard/settings` | ⚠️ Functional, minimal styling |
| `/learn/[courseSlug]/*` | ⚠️ Functional learning UI, not inspected in detail |
| `/explore` | ⚠️ Client component, likely uses old patterns |

### 5c. Admin Pages

| Page | Key Issues |
|------|-----------|
| `/admin` (overview) | ❌ `border-t-[8px] border-black` brutal top stripe; black `bg-black` primary buttons; emoji icons in stat cards (`👤🚀🏆📚`); KPI cards use warm accents but overall style is stark/functional |
| `/admin/courses` | ❌ Functional CRUD |
| `/admin/leads` | ❌ Functional CRUD |
| `/admin/organizations` | ❌ Functional CRUD |
| `/admin/batches` | ❌ Functional CRUD |
| `/admin/users` | ❌ Functional CRUD |
| `/admin/revenue` | ❌ Functional CRUD |
| `/admin/paths` | ❌ Functional CRUD |
| `/admin/analytics` | ❌ Functional CRUD |

---

## 6. Component Inconsistencies

### 6a. Header Duplication
| Component | Used By | Differences |
|-----------|---------|-------------|
| `components/layout/Header.tsx` | All pages via root layout | Shared header with auth menu, mobile drawer, gradient active nav, uses `<Container>` (`max-w-7xl`) |
| `components/landing/Header.tsx` | **NOT** used by any page currently (landing uses layout header) | Different logo (with tagline), different nav items, uses `max-w-6xl`, no mobile drawer logic |

**Risk:** The landing `Header.tsx` exists but is orphaned. The shared header IS already warm-aligned. ✅

### 6b. Footer Duplication
| Component | Used By | Differences |
|-----------|---------|-------------|
| `components/layout/Footer.tsx` | All pages via root layout | Navy `#1a1a2e` bg, Logo component with gold accent, `text-sm` links, `<Container>` max-w-7xl |
| `components/landing/Footer.tsx` | Landing page only (replaces layout footer) | Navy `skillary-navy` bg, gradient-text logo, `text-xs` links, `max-w-6xl` container, more detailed (map pin, HQ address) |

**Risk:** Two footers render on the landing page — the layout footer and the landing footer. The landing `<>` fragment wraps content without suppressing the layout footer, meaning **both footers display**.

### 6c. Logo Variants
| Location | Style |
|----------|-------|
| `components/ui/Logo.tsx` | Rounded-2xl gradient box with "S", text "Skillary" + "Modern Learning Platform" |
| `components/landing/Header.tsx` | Box icon + "Skillary" gradient-text + "Platform Pelatihan Terukur" |
| `components/landing/Footer.tsx` | Box icon + "Skillary" with gold "ary" |
| `components/layout/Footer.tsx` | Box icon + "Skillary" with gold "ary" |

**4 different logo treatments.** Should be unified.

### 6d. Button Styles

| Variant | Location | Style |
|---------|----------|-------|
| `PrimaryButton` (shared) | `components/ui/Button.tsx` | `bg-[#181818]` (black), rounded-full, shadow |
| Landing CTA | Inline styles | `gradient(135deg, #FF8A00, #FF5A5F)`, rounded-full |
| V1 Public CTA | Inline classes | `bg-[#1E3A8A]` (navy blue), rounded-lg |
| Admin CTA | Inline classes | `bg-black`, rounded-xl |

**4 primary button styles.** The shared `PrimaryButton` is black — inconsistent with the gradient landing CTAs.

### 6e. Card Styles

| Variant | Style |
|---------|-------|
| Shared `<Card>` | `rounded-[28px]` border `border-black/6`, hover lift + shadow |
| Landing cards | `rounded-2xl`, `border: 1.5px solid rgb(240, 217, 200)`, `card-hover` class |
| Dashboard "Jump Back In" | `rounded-3xl`, `border-2 border-black`, neo-brutalist `shadow-[4px_4px_0_0_rgba(0,0,0,1)]` |
| V1 public cards | `rounded-2xl` or `rounded-3xl`, `border border-[#E7DDD4]` |

### 6f. Form Input Styles

Auth pages use a consistent pattern:
```
rounded-xl border border-black/10 bg-white px-4 py-3 text-sm
focus:border-[#F49B4F] focus:ring-2 focus:ring-[#F49B4F]/20
```
This is warm-aligned ✅. But admin forms likely use different patterns.

### 6g. Badge/Pill Styles

| Variant | Style |
|---------|-------|
| `<Pill>` shared component | 3 tones: neutral (black/5), warm (#FFF3E4 + #D46E32), white |
| Landing pills | `bg: rgb(255, 244, 232)`, `border: rgb(255, 214, 165)`, `color: rgb(255, 138, 0)` — inline styles |
| V1 public page badges | `bg-[#FFF7ED]` + `text-[#C2410C]` + `border-[#FED7AA]` (Tailwind preset orange) |
| Admin status badges | `bg-green-100 text-green-700` or `bg-black/10 text-black/60` |
| Dashboard badges | `bg-[#F6C34F]/20 text-[#D97D00]` |

**At least 5 different badge palettes.**

---

## 7. Color Inconsistencies Summary

| Element | Landing (V2) | Public Pages (V1) | Admin (V0) |
|---------|-------------|-------------------|------------|
| **Primary CTA** | `gradient(#FF8A00 → #FF5A5F)` | `#1E3A8A` (navy blue) | `bg-black` |
| **Text Dark** | `skillary-navy` / `#181818` | `#0F172A` (Slate 900) | `text-black` |
| **Text Muted** | `skillary-muted` | `#475569` (Slate 600) | `text-black/55` |
| **Text Light** | — | `#64748B` (Slate 500) | `text-black/45` |
| **Text Lightest** | — | `#94A3B8` (Slate 400) | `text-black/40` |
| **Border** | `rgb(240, 217, 200)` token | `#E7DDD4` (close but hex) | `border-black/5` |
| **Surface** | `#FFFDF9` | `#FFFDF9` ✅ | `#FFFDF9` ✅ |
| **Accent Orange** | `rgb(255, 138, 0)` token | `#C2410C` (Tailwind orange-700) | `#F6C34F` / `#D48924` |
| **Badge BG** | `rgb(255, 244, 232)` | `#FFF7ED` (close) | `#F6C34F/20` |

---

## 8. LMS Risks

| Risk | Severity | Notes |
|------|----------|-------|
| Dashboard neo-brutalist card | Medium | Visual clash with soft landing style but functional; refactor cosmetically |
| Learn pages not audited in detail | Low | Functional focus is correct; align colors minimally |
| Progress bars / completion UI | Low | Uses `#F6C34F`→`#EB6C64` gradient (close to landing) |
| Course detail page (`/program/[id]`) | Medium | Uses shared `SectionTitle` component, B2C language ("learners") |

---

## 9. Admin Risks

| Risk | Severity | Notes |
|------|----------|-------|
| `border-t-[8px] border-black` stripe | Low | Stark design choice, functional |
| All admin buttons are `bg-black` | Medium | Should match system but admin can be more neutral |
| Admin CRUD pages use functional styling | Low | No need for premium polish; align colors only |
| Business logic deeply embedded | **HIGH** | Do NOT refactor admin components structurally |
| Report export routes | **HIGH** | CSV/data routes — zero UI changes allowed |

---

## 10. Auth / Header / Footer Risks

| Risk | Severity | Notes |
|------|----------|-------|
| Double footer on landing page | **HIGH** | Layout footer + Landing footer both render |
| Orphaned `landing/Header.tsx` | Low | Not used; can be deleted or consolidated |
| Logo: 4 variants | Medium | Should converge to 1-2 patterns |
| Shared header already warm-aligned | ✅ None | Uses gradient nav, orange accent ✅ |

---

## 11. Claim-Safety Findings

### Public UI Issues Found

| Phrase | Location | Severity | Action |
|--------|----------|----------|--------|
| `"gratis"` | `/community/page.tsx` line 66: "sesi mentoring gratis" | ⚠️ Medium | Reword to "sesi komunitas terbuka" or similar |
| `"Gratis Selamanya"` | `/community/page.tsx` line 92: tag pill | ⚠️ Medium | Remove or reword — implies permanent free commitment |
| `"Learner"` (as user-facing role label) | `/dashboard/page.tsx` lines 182, 198, 199; `/dashboard/layout.tsx` line 21; `/dashboard/settings/page.tsx` line 24 | ℹ️ Low | Used as fallback name, acceptable in logged-in context |
| `"CareerPlus"` | `/page.tsx` line 6 (import `CareerPlusSection`) | ℹ️ Low | Internal component name, not user-facing text — check section content |
| `"Learner"` in API/backend | Multiple API routes | ✅ Safe | Backend labels, not public-facing |
| `"Skillary Clients"` | `/lib/legacy-portfolio.ts` line 10 | ✅ Safe | Used as a **forbidden example** in comments |

### Items NOT Found (Good ✅)
- ❌ "Platform Belajar Digital #1 Indonesia" — not found
- ❌ "10 Ribu+" / "10K+" — not found
- ❌ "GRAAATISSS" — not found
- ❌ "Talenta Digital untuk Indonesia" — not found
- ❌ "Trusted by" — not found
- ❌ "Ulasan" — not found
- ❌ "Lulusan" — not found
- ❌ "Beasiswa Gratis" — not found
- ❌ "Media coverage" — not found
- ❌ "Diakui Industri" — not found
- ❌ "Satu Juta" — not found
- ❌ "Bootcamp" — not found (in public UI)

---

## 12. Recommended Sprint Order

### Sprint 1 — Foundation & Quick Wins
- [ ] Fix double footer on landing page
- [ ] Consolidate logo to 1 canonical treatment
- [ ] Remove/clean orphaned `landing/Header.tsx`
- [ ] Fix claim-safety: `/community` "Gratis Selamanya" and "gratis"
- [ ] Add Skillary gradient button variant to `Button.tsx`

### Sprint 2 — High-Traffic Public Pages
- [ ] `/program-catalog` — Replace navy `#1E3A8A` buttons with Skillary gradient CTA; replace Slate text with Skillary tokens; add motion
- [ ] `/services` — Same button/color alignment
- [ ] `/platform` — Same button/color alignment; convert blue step indicators to orange
- [ ] `/demo` — Same treatment

### Sprint 3 — Remaining Public Pages
- [ ] `/proposal` — Button/color alignment
- [ ] `/portfolio` — Button/color alignment; unify disclaimer section styling
- [ ] `/case-studies`, `/reports`, `/certificates` — Color alignment
- [ ] `/resources`, `/training-brief`, `/expert-partner`, `/teams` — Color alignment
- [ ] `/explore` — Align ExploreClient card styles

### Sprint 4 — LMS / Learner Pages
- [ ] `/dashboard` — Soften neo-brutalist card to warm style; align stat card accents to tokens
- [ ] `/dashboard/layout` — Add gradient active state to nav pills
- [ ] `/learn/*` — Minimal color alignment (border, accent colors)
- [ ] `/program/[id]` — Align card/button styles; verify B2B copy

### Sprint 5 — Admin Pages (Minimal)
- [ ] `/admin/layout` — Add gradient active state to nav pills
- [ ] `/admin` overview — Replace `border-t-[8px] border-black` with warm gradient stripe; align KPI card colors
- [ ] Admin CRUD pages — Minimal: swap black buttons to Skillary dark style; align borders
- [ ] **DO NOT** change business logic, data flows, or structural patterns

### Sprint 6 — Auth Pages (Polish)
- [ ] Already well-aligned; only need token migration (replace hardcoded `#F49B4F` with `skillary-orange`)
- [ ] Unify card shadow patterns

---

## 13. Summary Statistics

| Category | Count | Aligned | Partial | Not Aligned |
|----------|-------|---------|---------|-------------|
| Landing | 1 | 1 | 0 | 0 |
| Auth pages | 4 | 4 | 0 | 0 |
| Public pages | ~15 | 2 | 1 | ~12 |
| LMS pages | ~5 | 0 | 3 | 2 |
| Admin pages | ~10 | 0 | 1 | ~9 |
| **Total** | **~35** | **7** | **5** | **~23** |

**Alignment rate: ~20%.** The landing page is the sole fully-aligned surface.
