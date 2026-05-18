# Skillary Global UI Alignment — Sprint 2: High-Traffic Public Pages

**Date:** 2026-05-08
**Phase:** Sprint 2 of 6 — Public Pages Visual Alignment
**Scope:** `/program-catalog`, `/platform`, `/services`, `/demo`, `/reports`, `/certificates`

---

## 1. Pages Updated

| Page | File |
|------|------|
| `/program-catalog` | `src/app/program-catalog/page.tsx` |
| `/platform` | `src/app/platform/page.tsx` |
| `/services` | `src/app/services/page.tsx` |
| `/demo` | `src/app/demo/page.tsx` |
| `/reports` | `src/app/reports/page.tsx` |
| `/certificates` | `src/app/certificates/page.tsx` |

---

## 2. Old Style Issues Found

### Universal Issues (all 6 pages)
| Element | Old Value | Problem |
|---------|-----------|---------|
| Primary CTA button | `bg-[#1E3A8A]` + `rounded-lg` | Navy blue — clashes with warm orange landing |
| Dark navy button | `bg-[#172554]` + `rounded-lg` | Even darker navy — /certificates hero |
| Secondary button | `rounded-lg` + `border-2` | Wrong radius vs. landing `rounded-full` |
| Eyebrow pill | `bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]` | Tailwind preset, not Skillary token |
| Accent dot/indicator | `bg-[#C2410C]` | Tailwind orange-700 preset |
| Section border | `border-[#E7DDD4]` | Hardcoded hex, not token |
| Card border (cold) | `border-[#CBD5E1]` | Slate-300 — cold blue-gray |
| Step indicator BG | `bg-[#1E3A8A]/10 text-[#1E3A8A]` | Blue-tinted — `/platform` workflow |
| Link accent | `text-[#1E3A8A]` / `text-[#C2410C]` | Blue or Tailwind orange |
| Text dark | `text-[#0F172A]` | Slate-900 (acceptable, kept as-is) |
| Section divider | `border-[#F1F5F9]` | Slate-100 — cold |

### Page-Specific Issues
| Page | Additional Issues |
|------|------------------|
| `/reports` | Table header `bg-[#0F172A]` — cold dark navy |
| `/certificates` | Certificate mockup border `border-[#CBD5E1]`, "Skillary" wordmark in `text-[#1E3A8A]` blue |
| `/demo` | Scenario card `border-[#CBD5E1]`, `text-[#1E3A8A]` "Minta Demo" link |
| `/program-catalog` | No search/category filter UI (noted for Sprint 3 UX pass) |

---

## 3. Landing Style Applied

### Buttons
| Old | New |
|-----|-----|
| `bg-[#1E3A8A] rounded-lg` | `style={{ background: 'linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))' }}` + `rounded-full` |
| `bg-[#172554] rounded-lg` | Same gradient + `rounded-full` |
| Secondary `rounded-lg border-2` | `rounded-full` + `style={{ border: '1.5px solid rgb(240,217,200)' }}` |
| Hover: `hover:bg-[#1E3A8A]/90` | `hover:opacity-90 hover:-translate-y-0.5` |

### Eyebrow Pills
All 6 pages now use the canonical Skillary warm pill style:
```
background: rgb(255, 244, 232)
color: rgb(255, 138, 0)
border: 1.5px solid rgb(255, 214, 165)
```

### Card Borders
```
border: 1.5px solid rgb(240, 217, 200)  ← warm cream
```
Replaced all instances of: `border-[#CBD5E1]`, `border-[#E7DDD4]`, `border-[#F1F5F9]`

### Step Indicators (Platform)
```
Old: bg-[#1E3A8A]/10 text-[#1E3A8A]
New: background: rgb(255,244,232)  color: rgb(255,138,0)
```

### Link Accent
```
Old: text-[#C2410C] or text-[#1E3A8A]
New: style={{ color: 'rgb(255, 138, 0)' }}
```

### Table Header (Reports)
```
Old: bg-[#0F172A]  (cold dark navy)
New: background: linear-gradient(135deg, rgb(255,138,0), rgb(255,90,95))
```

### Certificate Mockup (Certificates)
```
Old: border-[#D88A44] double border, text-[#1E3A8A] "Skillary"
New: border-color: rgb(255,138,0), color: rgb(255,138,0)
```

---

## 4. Button/Card/Pill Changes

### No imports changed
All changes use inline `style={{}}` prop for gradient/border values — consistent with landing page pattern and Header.tsx.

### Hover behavior standardized
All CTAs: `hover:opacity-90 hover:-translate-y-0.5 transition-all`
All cards: `hover:-translate-y-1 transition-transform` or `transition-all duration-200`

### Section spacing preserved
No structural section changes. Padding, grid columns, and content hierarchy are unchanged.

---

## 5. Page-Specific Notes

### /program-catalog
- Program card CTA converted from `<Link><button bg-[#1E3A8A]>` to inline gradient link button
- Card border: `border-[#E7DDD4]` → warm token
- Section borders: same warm token
- Topic tag pills: `border-[#E7DDD4]` → warm, `text-[#475569]` → `text-black/60`
- **Note for Sprint 3:** A search bar + category pill filter row would elevate this page closer to landing UX. Deferred to Sprint 3 as it may require client-side state.

### /platform
- Step indicators: blue replaced with warm orange circle
- Workflow card border: `border-[#CBD5E1]` → warm
- Section divider: `border-[#F1F5F9]` → warm
- Added second CTA button in bottom section (was solo button)

### /services
- `text-[#C2410C]` ghost link → warm orange
- Card border-top divider: `border-[#F1F5F9]` → warm
- Added bottom CTA gradient section (was absent)

### /demo
- Scenario card border: `border-[#CBD5E1]` → warm
- `text-[#1E3A8A]` scenario links → warm orange
- Audience pills: `border-[#E7DDD4]` → warm token

### /reports
- Table header: `bg-[#0F172A]` → gradient orange→coral (visually striking, aligned to brand)
- Table row dividers: `border-[#E7DDD4]` → warm token
- Use-case card border: `border-[#CBD5E1]` → warm
- Role indicator dot: `bg-[#C2410C]` → `rgb(255,138,0)`

### /certificates
- Hero CTA: `bg-[#172554]` → gradient
- Certificate mockup: removed `border-[#CBD5E1]` outer card, "Skillary" text color `#1E3A8A` → orange
- Certificate double border: `border-[#D88A44]` → `rgb(255,138,0)`
- Step number accent: `text-[#D88A44]` → `rgb(255,138,0)`
- Benefits icon badge: `text-[#C2410C]` → warm orange
- Added bottom CTA section (was absent)

---

## 6. Claim-Safety Scan Results

Scan performed on all 6 changed pages after edits:

| Pattern | /program-catalog | /platform | /services | /demo | /reports | /certificates |
|---------|-----------------|-----------|-----------|-------|----------|---------------|
| Gratis | ❌ Not found | ❌ | ❌ | ❌ | ❌ | ❌ |
| 10K+ / 10 Ribu+ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Trusted by | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Bootcamp | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Diakui Industri | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| #1 Indonesia | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Satu Juta | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Fake reviews | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Fake learner counts | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| CareerPlus | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Ulasan / Lulusan | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

All 6 pages are **claim-safe**. ✅

Disclaimer labels preserved:
- `/reports` line: "Contoh tampilan laporan untuk ilustrasi monitoring peserta." ✅
- `/platform`: "Contoh tampilan platform untuk ilustrasi alur pembelajaran." ✅
- `/demo`: "Contoh tampilan platform untuk ilustrasi demo." ✅
- `/certificates`: "ILUSTRASI DESAIN SERTIFIKAT" label retained on mockup ✅

---

## 7. Remaining Public Pages for Sprint 3

| Page | Priority | Key Issues |
|------|----------|-----------|
| `/about` | High | Already partially aligned but uses Slate text + inline styles |
| `/proposal` | High | Navy `#1E3A8A` CTA, `#D88A44` brownish accent |
| `/portfolio` | Medium | Navy CTA, `#C2410C`/`#FED7AA` Tailwind orange preset |
| `/case-studies` | Medium | Old pattern |
| `/certificates` | ✅ Done | — |
| `/resources` | Low | Old pattern |
| `/training-brief` | Low | Old pattern |
| `/expert-partner` | Low | Old pattern |
| `/teams` | Low | Old pattern |
| `/explore` | Medium | Client component, ExploreClient.tsx |
| `/program-catalog` | ⚠️ Sprint 3 UX | Add search bar + category pill filter (client-side state needed) |

---

## 8. QA Checklist

### Automated (completed)
- [x] `npx tsc --noEmit` — Clean
- [x] `npm run build` — Clean, exit 0
- [x] No broken imports on any of the 6 pages
- [x] No placeholder `href="#"` introduced
- [x] No new npm dependencies
- [x] No backend/API/Prisma files changed
- [x] Landing page `src/app/page.tsx` — unchanged (verified by inspection)
- [x] Claim-safety scan — all 6 pages clean
- [x] All existing query params preserved (`?type=`, `?source=`, `?program=`)
- [x] All existing `<Link href>` routes preserved — no broken nav

### Manual Browser QA Required
- [ ] Verify gradient buttons render correctly on each of the 6 pages
- [ ] Verify `rounded-full` buttons look correct at mobile and desktop
- [ ] Verify table header gradient in `/reports` is readable (white text contrast)
- [ ] Verify `/certificates` mockup card renders correctly with new warm border
- [ ] Verify `/platform` step indicators orange circle renders correctly
- [ ] Hover transitions: cards lift and buttons dim on hover
- [ ] Run in deploy preview before merging to main
