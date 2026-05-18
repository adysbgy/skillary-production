# Homepage 2.0 — Core Visual Polish Notes

## 1. Visual Weaknesses Found

### Hero Mockup
- Missing "product chrome" (window dots) — made it feel like a data card, not a product preview
- Stat cards used emoji icons (👥, 📊) — felt unprofessional for B2B
- No participant avatars in the table — flat text list
- Follow-up alert used emoji bell — not premium
- No Export CSV chip — missing a key HR-relevant output signal
- Stats grid was 4-col on all sizes — cramped on mobile 320px

### Batch Flow
- Flow steps lacked benefit descriptions — just icon + label
- Flow panel was not visually contained — blended into page
- Mobile vertical flow had no continuous connector line
- Feature cards used flat emoji icons instead of numbered badges

### Reports/Certificate
- Report table missing product chrome — felt like a plain data table
- Certificate used "Peserta A" — could be misread as a real person
- Certificate outer container was rounded-2xl — inconsistent with rounded-3xl system
- Table column headers used `text-[#6B625A]` — too dark for header labels
- No participant avatars in report rows

### Cross-Section Rhythm
- Three consecutive tinted sections (Cream → Ivory → Cream) between SolutionPillars and LegacyPortfolio

## 2. Hero Mockup Polish Decisions
- Added 3-dot product chrome bar (macOS-style) to establish "software preview" framing
- Split dashboard header from chrome for visual hierarchy
- Replaced emoji stat icons with colored accent dots + uppercase labels
- Added `grid-cols-2 sm:grid-cols-4` for mobile-safe stat cards
- Added circular participant avatar initials in the progress list
- Replaced emoji bell with SVG notification icon
- Added "Export CSV" amber chip in dashboard header
- Changed quiz/cert column values to use pill badges (bg + text)
- Green dot for "Batch Aktif" status indicator

## 3. Batch Flow Polish Decisions
- Enclosed entire flow in a white rounded-3xl product card with shadow
- Added "Contoh alur batch pelatihan" illustrative label
- Added benefit description under each flow step
- Desktop: flex with amber arrow connectors, descriptions below icons
- Mobile: vertical timeline with left-rail connector line (absolute positioned)
- Replaced flat emoji feature cards with numbered badges (1–5)
- Changed section bg from white to Ivory (#FFFDF9) for rhythm

## 4. Report/Certificate Mockup Decisions
- Added 3-dot product chrome to both report and certificate panels
- Report panel: changed outer container to rounded-3xl
- Added "Contoh Laporan Batch" header with subtitle
- Column headers now use `bg-[#FFFDF9]` and lighter text `text-[#94A3B8]`
- Added participant avatar initials in report rows
- Changed assessment badges from "Lulus/Belum" to "Selesai/Belum"
- Certificate: changed "Peserta A" to "Nama Peserta" (generic)
- Certificate: changed "Data Storytelling" to "Program Pelatihan" (generic)
- Certificate chrome includes "Preview" label
- Outer certificate card now rounded-3xl with inner rounded-2xl frame

## 5. Cross-Section Rhythm (Final)
| # | Section | Background |
|:--|:--|:--|
| 1 | HeroSection | Ivory `#FFFDF9` |
| 2 | LegacyTrustStrip | Cream `#FAF3EA` |
| 3 | ProblemSection | White |
| 4 | SolutionPillarsSection | Cream `#FAF3EA` |
| 5 | CorporateTrainingBatchSection | Ivory `#FFFDF9` |
| 6 | ProgramAreasSection | White |
| 7 | LegacyPortfolioPreviewSection | Ivory `#FFFDF9` |
| 8 | ReportsCertificateSection | Cream `#FAF3EA` |
| 9 | FinalCTASection | Navy `#172554` |

## 6. Mobile Handling
- Hero stat cards: `grid-cols-2 sm:grid-cols-4` — safe at 320px
- Hero table: fixed grid with readable columns
- Batch flow: vertical timeline on `md:hidden` with left-rail line
- Report table: `overflow-x-auto` with `min-w-[500px]`
- Certificate: responsive padding `p-5 sm:p-6`
- All buttons: full width stack on mobile

## 7. Claim-Safety Labels Used
- "Ilustrasi tampilan monitoring training" (Hero mockup)
- "Contoh alur batch pelatihan" (Batch flow)
- "Contoh Laporan Batch" (Report table)
- "Ilustrasi tampilan laporan batch training" (Report footer)
- "Ilustrasi review laporan training" (HR photo)
- "ILUSTRASI DESAIN SERTIFIKAT" (Certificate badge)
- "Ilustrasi suasana pelatihan" (Hero photo)
- "Nama Peserta" (Certificate — not a real person)
- "Program Pelatihan" (Certificate — not a real program)

## 8. Remaining Browser QA Checklist
- [ ] Hero mockup on mobile 320px — verify stat cards don't clip
- [ ] Batch flow vertical timeline alignment on iOS Safari
- [ ] Report table horizontal scroll smoothness
- [ ] Certificate text sizing on small screens
- [ ] Cross-section background transitions (no jarring color jumps)
- [ ] Button focus ring visibility
- [ ] Overall page scroll performance

## 9. Next Phase: Animation/Microinteraction
Phase 4 should add subtle motion only AFTER visual layout is approved:
- Scroll-reveal fade-up for section headings
- Staggered entrance for stat cards and flow steps
- Progress bar fill animation on scroll into view
- Hover micro-lift on interactive cards
- Smooth focus ring transitions
