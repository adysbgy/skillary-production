# Skillary Production Launch Checklist

This checklist ensures the Skillary website is safe, professional, and fully functional before launching to corporate prospects.

## 1. Core Configuration & Environment
- [ ] Environment variables configured correctly (e.g., `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`).
- [ ] Formspree endpoint ID set correctly in production `.env.local` or environment config.
- [ ] Analytics / Tag Manager (if applicable) installed and tracking correctly.

## 2. SEO & Discoverability
- [ ] `robots.txt` is properly generated and excludes private/transactional routes (e.g., `/admin`, `/dashboard`, `/checkout`, `/thank-you`).
- [ ] `sitemap.xml` includes all public educational pages (`/about`, `/platform`, `/services`, etc.) and dynamically generated catalog/blog routes.
- [ ] Global metadata correctly reflects the brand positioning ("Platform Pelatihan Terukur untuk Organisasi").
- [ ] Page-specific metadata (titles and descriptions) exist on all top-level public pages.
- [ ] Open Graph (OG) and Twitter Card tags are correctly referencing production absolute URLs.

## 3. Brand Trust & Content Integrity
- [ ] **NO FAKE CLAIMS:** Verified zero fake client logos, zero fake metrics (e.g., "10,000+ users"), and zero fake testimonials.
- [ ] Legacy claims strictly adhere to the permitted "pengalaman pelatihan sejak 1998" phrasing.
- [ ] Legal claims (e.g., "Resmi Nasional", "Terakreditasi") have been audited and removed if not strictly proven.
- [ ] All placeholders ("Lorem Ipsum") and mock images have been replaced or explicitly labeled as illustrations.

## 4. User Experience & Funnel Safety
- [ ] **Contact Form:** End-to-end test submitted via `/contact` verifying correct Formspree payload delivery.
- [ ] **Thank You State:** Contact form successfully routes to `/thank-you` without errors.
- [ ] **CTA Link Audit:** Verified all major CTA buttons map to the expected internal routing destinations (see `cta_link_audit.md`).
- [ ] **404 Not Found Page:** Custom `not-found.tsx` is active, branded, and provides helpful fallback navigation.
- [ ] **Broken Links:** Header, Footer, and in-body links audited for dead ends.

## 5. Performance & Accessibility
- [ ] **Image Optimization:** All heavy assets (especially people/training photos) are optimized `.webp` and served via `next/image` with proper `sizes` and `alt` attributes.
- [ ] **Mobile QA:** Tested on 390px viewport to ensure no horizontal scrolling, overlapping text, or inaccessible buttons.
- [ ] **Performance:** Lighthouse performance score passes baseline requirements (no major blocking scripts).
- [ ] **Accessibility:** Sufficient color contrast (especially text over amber/navy), standard focus states, and semantic HTML structure.

## 6. Final Deployment
- [ ] TypeScript compiler runs clean (`npx tsc --noEmit`).
- [ ] Production build succeeds (`npm run build`).
- [ ] Vercel/Hosting deployment logs indicate no critical runtime warnings.
