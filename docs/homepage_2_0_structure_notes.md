# Homepage 2.0 — Structure Notes

## 1. Old 15-Section Problem
The previous homepage rendered 15 sections:
1. HeroSection
2. TrustStrip
3. LegacyProofSection
4. CorporatePainPointSection
5. HowItWorksSection
6. DashboardReportingSection
7. TrainingAtmosphereSection
8. CertificateHighlight
9. TrainingExperienceSection
10. LearningProgramsSection
11. ExpertPartnerSection
12. ExpandedTestimonialsSection
13. LeadMagnetSection
14. CorporateCTA
15. FAQSection

**Issues:** Cognitive overload, repetitive trust-building (5 sections doing the same job), abstract copy, scattered CTAs, weak visual hierarchy from stock-photo dependency.

## 2. New 9-Section Structure
1. **HeroSection** — B2B value prop + static UI mockup
2. **LegacyTrustStrip** — Compact 4-metric strip (no logos)
3. **ProblemSection** — 6 concrete pain cards
4. **SolutionPillarsSection** — 4 platform capabilities
5. **CorporateTrainingBatchSection** — Core differentiator with process flow
6. **ProgramAreasSection** — 6 program areas with output tags
7. **LegacyPortfolioPreviewSection** — Sector-based proof (no client logos)
8. **ReportsCertificateSection** — Report table + certificate preview
9. **FinalCTASection** — Dark navy bottom funnel

## 3. Why Old Sections Stopped Rendering
| Old Section | Reason Stopped |
|:---|:---|
| TrustStrip | Replaced by LegacyTrustStrip with legacy-specific metrics |
| LegacyProofSection | Content absorbed into LegacyTrustStrip + PortfolioPreview |
| HowItWorksSection | Replaced by SolutionPillarsSection |
| DashboardReportingSection | Replaced by ReportsCertificateSection |
| TrainingAtmosphereSection | Removed — abstract, stock-photo dependent |
| CertificateHighlight | Absorbed into ReportsCertificateSection |
| TrainingExperienceSection | Removed — abstract, repetitive |
| LearningProgramsSection | Replaced by ProgramAreasSection |
| ExpertPartnerSection | Removed — low-conversion, no proof |
| ExpandedTestimonialsSection | Removed — no real testimonials available |
| LeadMagnetSection | Removed — absorbed into FinalCTASection |
| CorporateCTA | Replaced by FinalCTASection |
| FAQSection | Removed from homepage (can live on /about or standalone) |

**Important:** Old component files are NOT deleted. They can be restored or used on other pages.

## 4. Copy Strategy
- **Headline-first:** Every section starts with a clear, benefit-driven heading.
- **B2B language:** Speaks to HR, L&D, and organizational admin — not individual learners.
- **Concrete over abstract:** Pain cards list specific problems; solution pillars list specific capabilities.
- **No fluff:** Removed vague phrases like "Training Tetap Tentang Manusia".

## 5. Mockup Strategy
- **Hero:** Static Tailwind UI mockup of batch training dashboard (progress bars, participant list, stats).
- **Reports section:** HTML table mockup with progress/assessment/certificate columns.
- **Certificate:** Simplified inline certificate preview card.
- **All mockups labeled:** "Ilustrasi tampilan..." to prevent misrepresentation.

## 6. Claim Safety
- ✅ Allman legacy since 1998
- ✅ Documented digital archive (39+ records)
- ✅ Sectors only (no client names/logos)
- ✅ Illustrative mockup labels on all UI previews
- ✅ Disclaimer on portfolio section
- ❌ No "Trusted by"
- ❌ No client logos
- ❌ No fake testimonials
- ❌ No fake ROI or impact metrics

## 7. Next Phases
- **Phase 2:** Image assets — generate/replace hero imagery, training atmosphere photos
- **Phase 3:** Advanced visual components — interactive batch flow, animated progress
- **Phase 4:** Animation — scroll reveals, staggered entrances, micro-interactions
- **Phase 5:** Final QA — browser visual review, mobile testing, performance audit
