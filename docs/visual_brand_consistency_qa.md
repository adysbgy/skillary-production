# Visual Brand Consistency QA

## 1. Pages and Components Audited
The following areas were systematically audited for cold-blue/slate leftovers to align with the Warm Premium Corporate brand:
- **Public Core:** `src/app/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/platform/page.tsx`, `src/app/services/page.tsx`, `src/app/demo/page.tsx`
- **Catalog & Proof:** `src/app/program-catalog/page.tsx`, `src/app/portfolio/page.tsx`, `src/app/case-studies/page.tsx`, `src/app/learning-paths/page.tsx`, `src/app/path/[slug]/page.tsx`
- **Output & Sales:** `src/app/reports/page.tsx`, `src/app/certificates/page.tsx`, `src/app/certificate/[uniqueCode]/page.tsx`, `src/app/proposal/page.tsx`, `src/app/resources/page.tsx`
- **Print Collateral:** `src/app/resources/sales-deck/page.tsx`, `src/app/resources/company-profile/page.tsx`, `src/app/resources/corporate-proposal/page.tsx`
- **Homepage Components:** `src/components/home/*`
- **Contact Components:** `src/components/contact/*`
- **Portfolio/Case Components:** `src/components/portfolio/*`, `src/components/case-studies/*`

## 2. Cold-Blue/Slate Leftovers Found
During the audit, the following legacy Tailwind classes were identified on public pages:
- **Backgrounds:** `bg-[#F8FAFC]` (slate-50), `bg-[#F1F5F9]` (slate-100), `bg-[#EFF6FF]` (blue-50), `bg-[#DBEAFE]` (blue-100)
- **Borders:** `border-[#E2E8F0]` (slate-200), `border-[#CBD5E1]` (slate-300), `border-[#DBEAFE]` (blue-200)
- **Text:** `text-[#CBD5E1]` (slate-300) in sub-headings, `text-blue-700` in badges.
- **Components:** Found heavily in `ExpertPartnerSection`, `FeatureValueSection`, `TestimonialsSection`, `DashboardReportingSection`, `LearningProgramsSection`, `CertificateHighlight`, `ContactCards`, `ContactGuide`, and multiple standalone pages (`platform`, `services`, `demo`, `reports`, `certificates`).

## 3. Fixes Applied
- **Page Backgrounds:** Replaced `bg-slate-50` with Warm Ivory (`#FFFDF9`) globally across standalone pages like `/certificates` and `/certificate/[uniqueCode]`.
- **Section Blocks:** Replaced `bg-[#F8FAFC]` with Warm Cream (`#FAF3EA`).
- **Cards & Surfaces:** Replaced `bg-[#F1F5F9]` and `bg-[#F8FAFC]` cards with White (`#FFFFFF`) or Soft Linen (`#FFF8F1`).
- **Borders:** Replaced cold slate borders (`#E2E8F0`, `#CBD5E1`) with Warm Border (`#E7DDD4`).
- **Accents:** Replaced blue icon circles (`bg-[#EFF6FF] text-[#1E3A8A]`) with amber variants (`bg-[#FFF8F1] text-[#D88A44]`).
- **CTAs:** Updated secondary button hover states to use warm cream/linen instead of slate. Ensured primary buttons use Deep Navy (`#172554` or `#1E3A8A`).
- **Badges:** Replaced cold blue "In Progress" badges in learning paths with Warm Amber/Orange (`bg-[#FFF7ED] text-[#C2410C]`).

## 4. Remaining Visual QA Checklist
- [ ] **Contrast:** Ensure Amber text (`#D88A44`) on White/Ivory is legible (Deep Orange `#C2410C` is safer for small text).
- [ ] **Over-Warming:** Ensure the site doesn't feel "too orange". The primary background must remain Ivory, not yellow/orange.
- [ ] **Admin Area:** Confirm that admin tables still retain their functional blue/green status pills without interference from this brand sweep.
- [ ] **Print Output:** Print the `/resources/*` pages to PDF to confirm the Ivory/Amber palette renders correctly without bleeding into margins.

## 5. Mobile QA Checklist
- [ ] **Padding/Margins:** Verify that `lg:py-32` vs `py-20` responsive paddings don't cause excessive whitespace on mobile due to the new background section demarcations.
- [ ] **Overflow:** Check horizontal scrolling on the `DashboardReportingSection` and `CertificateHighlight` mockups on 320px screens.
- [ ] **Touch Targets:** Verify that secondary CTAs with new warm borders remain easily tappable.

## 6. Rules for Future Developers
1. **Never use `bg-slate-50` or `bg-blue-50`** for main section backgrounds on public pages. Use `bg-[#FFFDF9]` (Ivory) or `bg-[#FAF3EA]` (Cream).
2. **Never use generic blue** for focus rings (`focus:ring-blue-500`). Use `focus:ring-[#D88A44]` (Amber).
3. **Navy is for Authority:** Use Deep Navy (`#172554`) for main headings and primary buttons. Do not use it as a massive full-page background flood unless absolutely necessary for a dark-mode hero segment.
4. **Admin is Functional:** Admin pages ( `/admin/*` ) are exempt from strict warmth rules. Data readability is more important than brand consistency there.
