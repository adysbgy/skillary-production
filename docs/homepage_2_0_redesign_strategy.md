# Skillary Homepage 2.0 - Redesign Strategy

## 1. Old Homepage Weaknesses
- **Cognitive Overload:** The current homepage renders 15 distinct sections, creating a sprawling, exhausting user experience.
- **Repetitive Proofing:** Multiple sections (`TrustStrip`, `LegacyProofSection`, `HumanProofSection`, `ExpertPartnerSection`, `ExpandedTestimonialsSection`) attempt to establish trust using the same narrative angle, diluting the impact.
- **Abstract Copy:** Sections like `TrainingAtmosphereSection` and `TrainingExperienceSection` focus on abstract concepts ("Training Tetap Tentang Manusia") rather than concrete platform capabilities.
- **Lack of Metadata Clarity:** Unlike reference platforms (e.g., Skilvul) that show concrete course cards with tags, modules, and clear metadata, Skillary's current page feels too conceptual.
- **CTA Scatter:** Conversion points are randomly distributed without a clear funnel flow (Hero -> Certificate -> Lead Magnet -> Corporate CTA).
- **Weak Visual Hierarchy:** The reliance on generic stock photos diminishes the perception of Skillary as a *software platform*.

## 2. New Homepage Narrative
The new narrative must clearly position Skillary as a **B2B SaaS product for corporate training**, backed by real-world legacy.
- **The Hook:** A powerful, measurable training platform for organizations.
- **The Context:** Born from Allman's real-world corporate training experience since 1998.
- **The Problem:** Managing corporate training is chaotic (scattered files, manual assessments, disjointed reporting).
- **The Solution:** Unified Batches, Assessments, and Automated Certificates.
- **The Proof:** Tangible legacy portfolio data.
- **The Action:** Request a proposal or schedule a demo.

## 3. Recommended Section Structure (9 Sections)
1. `HeroSection`: Strong B2B value prop. Clear primary CTA. UI-focused mockup.
2. `LegacyTrustStrip`: Condensed, text-based proof of the 1998 Allman legacy (No client logos).
3. `ProblemSection`: Highlighting the scattered nature of current corporate training vs. Skillary's unified approach.
4. `SolutionPillarsSection`: Concrete platform features (Organization Management, Assessment Engine, Reporting).
5. `CorporateTrainingBatchSection`: Detailed visual mockup of managing a specific training batch (participant lists, progress bars).
6. `ProgramAreasSection`: Concrete categories of what can be learned.
7. `LegacyPortfolioPreviewSection`: A curated, safe slice of the `/portfolio` data to prove enterprise experience.
8. `ReportsCertificateSection`: Focusing on the output HR/L&D cares about (Automated certificates and CSV reports).
9. `FinalCTASection`: The bottom funnel conversion (Minta Proposal).

## 4. Hero Strategy
- **Visuals:** Move away from stock photos in the hero. Use a high-fidelity, stylized UI mockup of the Skillary dashboard (e.g., showing a Batch Dashboard with progress bars) to immediately communicate "Software".
- **Copy:** Focus on the B2B buyer (HR, L&D). "Platform Pelatihan Terukur untuk Organisasi".
- **CTAs:** Primary: "Minta Proposal" (Deep Navy). Secondary: "Jelajahi Fitur" (Warm Ivory/Amber outline).

## 5. Image Strategy
- **UI First:** Prioritize clean, abstracted UI mockups built with Tailwind over generic photography.
- **Legacy Photography:** When using real training photos (`isRealDocumentation`), treat them stylistically (e.g., monochrome with amber accents) to frame them as "historical legacy" rather than "current software UI".
- **No Stock Padding:** Remove filler images that don't explain a specific feature or prove a specific claim.

## 6. Animation Strategy
- **Scroll Reveal:** Subtle fade-up animations for section headers to create reading rhythm.
- **Mockup Interactions:** UI mockups in the Hero or Batch section should have staggered entrance animations (e.g., a list of participants sliding in one by one) to make the software feel dynamic.
- **Micro-interactions:** Amber focus rings and hover lifts on all interactive elements.

## 7. Component Plan (Consolidation)
- Delete: `HumanProofSection`, `ExpertPartnerSection`, `TrainingAtmosphereSection`, `TrainingExperienceSection`, `HowItWorksSection`.
- Refactor: `DashboardReportingSection` and `CertificateHighlight` into the new `ReportsCertificateSection`.
- Create: `CorporateTrainingBatchSection` (net new, highly detailed UI mockup).
- Create: `LegacyPortfolioPreviewSection` (pulling safe data from `legacy-portfolio.ts`).

## 8. Mobile QA Checklist
- [ ] Complex UI mockups must be hidden, scaled down, or scrollable horizontally (`overflow-x-auto`) on screens < 768px.
- [ ] Minimum tap target size of 44x44px for all buttons and links.
- [ ] Ensure scroll animations (Framer Motion or CSS transitions) do not cause layout thrashing or horizontal scrolling on mobile.
- [ ] Reduce padding from `py-32` to `py-16` on mobile devices.

## 9. Claim Safety Rules (Strict Enforcement)
- **NO Client Logos:** Do not add logo carousels.
- **NO "Trusted By":** Do not use language implying current SaaS endorsement by historical clients. Use "Pengalaman melayani pelatihan sejak 1998".
- **NO Fake Testimonials:** Do not invent quotes. Use generic "Feedback Peserta" only if completely anonymized and representative of the legacy data.
- **Brand Boundary:** Skillary is the digital platform. Allman is the legacy experience. Do not mix them (e.g., do not say "Skillary has trained 10,000 people since 1998").

## 10. Implementation Phases
1. **Phase 1 (Scaffolding):** Create empty placeholder components for the new 9-section structure.
2. **Phase 2 (Migration):** Move relevant copy and data fetching (like the course catalog and legacy portfolio) into the new components.
3. **Phase 3 (UI Polish):** Build out the Tailwind UI mockups and animations within the new components.
4. **Phase 4 (Swap & Clean):** Update `src/app/page.tsx` to use only the new components, then delete all deprecated components from the codebase.
