# Homepage 2.0 — Image System

## 1. Why New Images Were Needed
The previous homepage relied on 4 generic training stock images that were older-generation and gave the site a "training agency" feel rather than a "B2B platform" feel. The Homepage 2.0 redesign required a fresh set of images that:
- Support the warm, premium, corporate training atmosphere
- Feel authentically Indonesian
- Balance product/system clarity (70%) with human warmth (30%)
- Complement UI mockups rather than compete with them

## 2. Image Style Direction
All generated images follow a consistent visual language:
- **Setting:** Warm ivory/wood corporate Indonesian boardroom or training room
- **Lighting:** Natural daylight, warm tones
- **People:** Indonesian professionals aged 25–55, business casual with subtle batik
- **Mood:** Calm, professional, focused — no exaggerated poses or smiles
- **Props:** Laptops, notebooks, workshop materials
- **Restrictions:** No visible logos, no readable text, no fake brand names

## 3. Generated Assets List

### Priority Assets (Used on Homepage)
| File | Size | Used In |
|:---|:---|:---|
| `hero-training-session.webp` | 92KB | HeroSection — warm context strip below UI mockup |
| `hr-report-review.webp` | 92KB | ReportsCertificateSection — below report table |
| `assessment-session-v2.webp` | 120KB | Available for assessment/certificate pages |

### Supporting Assets (Available for Other Pages)
| File | Size | Intended Use |
|:---|:---|:---|
| `group-discussion-v2.webp` | 92KB | About page, services page, or case studies |
| `trainer-guidance-v2.webp` | 102KB | Platform page, trainer partner section |
| `certificate-moment.webp` | 108KB | Certificate page, closing ceremony context |

### Legacy Assets (Preserved)
| File | Size | Status |
|:---|:---|:---|
| `training-session.webp` | 104KB | Preserved for backward compatibility |
| `group-discussion.webp` | 111KB | Preserved — older generation |
| `assessment-session.webp` | 86KB | Preserved — older generation |
| `trainer-guidance.webp` | 83KB | Preserved — older generation |

## 4. Where Each Image Is Used
- **HeroSection:** `hero-training-session.webp` appears as a warm context strip (16:6 aspect) below the main UI mockup. The mockup remains dominant; the image provides human training warmth.
- **ReportsCertificateSection:** `hr-report-review.webp` appears as a subtle context image (16:5 aspect) below the report table, showing HR professionals reviewing training data.
- **Other pages:** Available via `src/lib/training-image-assets.ts` but not yet integrated beyond the homepage.

## 5. Claim Safety
> **These are AI-generated illustrative visuals, not real documentation of Skillary or Allman training sessions.**

Every image used in the UI must include:
- `isRealDocumentation: false` in the image registry
- A visible label: "Ilustrasi suasana pelatihan" or equivalent
- The `alt` attribute must begin with "Ilustrasi"

## 6. Future Replacement Rule
When real training documentation becomes available:
1. Only replace images if explicit publication permission exists
2. Set `isRealDocumentation: true` for verified real photos
3. Update the caption to "Dokumentasi kegiatan pelatihan"
4. Never use participant faces without written consent

## 7. Image Optimization Notes
- All images generated as PNG, then converted to WebP (quality 82) using sharp
- All priority images are under 120KB
- Next.js `<Image>` component handles lazy loading and responsive sizing automatically
- `sizes` prop is set to appropriate viewport-relative values for each usage
