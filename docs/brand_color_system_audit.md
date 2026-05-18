# Brand Color System Refinement

## 1. Why Blue Was Reduced
The initial Skillary public website design relied heavily on standard SaaS utility classes (`bg-blue-50`, `bg-slate-50`, `text-blue-700`), which created a cold, generic software platform aesthetic. To accurately represent Skillary as a premium, human-centered training platform with a deep legacy (Allman 1998), the visual language was audited and refined. The goal is to convey warmth, trust, and physical training excellence, distinguishing it from purely digital/transactional SaaS products.

## 2. Final Brand Palette
- **Warm Ivory (`#FFFDF9`)** - Primary page background, replacing white/slate.
- **Warm Cream (`#FAF3EA`)** - Secondary block background, replacing `blue-50`/`slate-50`.
- **Soft Linen (`#FFF8F1`)** - Accent surface background.
- **Warm Border (`#E7DDD4`)** - Structural card borders, replacing cold gray borders.
- **Skillary Amber (`#D88A44`)** - Primary warm accent (icons, focus rings, hover states).
- **Deep Orange (`#C2410C`)** - High-contrast text accent (links, eyebrow text).
- **Deep Navy (`#172554`)** - Primary structural contrast (Main headings, primary CTAs).
- **Muted Warm Text (`#6B625A`)** - Secondary description text.

## 3. Where Navy Remains Appropriate
- **Headings (`h1`, `h2`)**: Deep Navy anchors the page and provides corporate authority.
- **Primary Submit / CTA Buttons**: Navy provides a highly legible, trustworthy target (e.g., "Isi Form Inquiry").
- **Admin Dashboard**: Navy remains structurally appropriate for heavy data views where high contrast is necessary.

## 4. Where Amber/Orange Should Be Used
- **Hover States**: E.g., hovering over a Navy CTA transitions to Amber.
- **Focus Rings**: Form inputs now glow Amber instead of Blue to maintain the warm aesthetic during interaction.
- **Accent Pills & Badges**: "Arsip Allman" and category badges use Amber/Warm variants instead of cold blue/slate.
- **Icon Circles**: Decorative background circles for icons use Cream/Amber.

## 5. What Was Changed
- `src/components/portfolio/PortfolioExplorer.tsx`: Replaced cold blue/slate category and "Arsip Allman" badges with warm Ivory/Amber and distinct warm category variants (orange, rose, fuchsia, etc.).
- `src/components/case-studies/CaseStudyExplorer.tsx`: Replaced cold blue/slate badges with warm variants. Changed the "Perlu Validasi" warning to a softer muted amber.
- `src/components/contact/ContactHero.tsx`: Removed the dominant `bg-[#1E3A8A]` (blue) background and replaced it with Warm Ivory (`#FFFDF9`), shifting the headings to Deep Navy. Replaced the cold blue icon background with Cream/Orange.
- `src/components/contact/ContactForm.tsx`: Updated form focus rings to Amber (`#D88A44`), secondary links to Deep Orange (`#C2410C`), and the primary submit button to Deep Navy with an Amber hover.

## 6. What Should Not Be Changed
- **Admin Data Tables:** Status badges (`COMPLETED`, `NEW`, `INSTRUCTOR`) still utilize functional tailwind colors (`blue-100`, `green-100`) because admin utility overrides brand warmth.
- **Form/Lead Logic:** No backend behavior was altered during the CSS updates.

## 7. Future Visual QA Checklist
- [ ] Are backgrounds ivory/cream instead of slate/gray?
- [ ] Are primary buttons Navy instead of bright blue?
- [ ] Do form inputs glow Amber instead of blue on focus?
- [ ] Are legacy proof badges rendered in warm tones (not cold slate)?
- [ ] Is Navy used strictly for text/accents and not massive background blocks?
