# Skillary HP-S3 Hero Asset Provenance

**Scope:** original first-viewport imagery for `/lp/homepage-preview`
**Created:** 1 Agustus 2026
**Status:** selected for HP-S3 preview only; not customer proof or testimonial

## Origin and rights boundary

- All four candidates were generated specifically for Skillary with the built-in OpenAI image generation tool.
- No Maven image, code, identity, or asset was used as an image input.
- No existing Skillary trainer or customer portrait was used as an image input.
- Prompts require fictional Indonesian/Southeast Asian professionals and prohibit public-figure likeness, text, logos, watermarks, certificates, and visible interfaces.
- The people are illustrative brand imagery. They must not be named, attributed, or presented as actual students, facilitators, clients, or organization representatives.

## Candidate register

| ID | Role | Generated source SHA-256 | Decision |
|---|---|---|---|
| `IND-A` | Individual professional, woman, warm background | `7bdec7f9d82d349d39edf51e469da4251a04fed11e60390c5a6548ad6ce88a7c` | Selected |
| `IND-B` | Individual professional, man, warm background | `60aebac39cd05284ecea9aeb9ea51f1dd10adccaa3a5adffaed4eb540d093b3e` | Not selected |
| `ORG-A` | Organization learning leader, man, cool background | `c075eec40006d989a042f4ef92c499b0c918bd9af280559a9386198241016716` | Selected |
| `ORG-B` | Organization learning leader, woman, cool background | `236f740787d115497b355757acbf802e3d6f5db63cb1478e09891cf833b0fca1` | Not selected |

Contact sheet: [`hp-s3-hero-candidate-contact-sheet.jpg`](./hp-s3-hero-candidate-contact-sheet.jpg)

## Selection rationale

`IND-A + ORG-A` provides the clearest audience contrast without relying on costume stereotypes: one learner-oriented smart-casual portrait and one team-lead portrait. Both maintain clean silhouettes, sufficient headroom, neutral expressions, and backgrounds that map directly to Skillary warm/cool surfaces.

## Production derivatives

| Asset | Dimensions | File size target | SHA-256 |
|---|---:|---:|---|
| `public/images/homepage-preview/hero-individual-v1.webp` | `768 × 1619` | `< 60 KB` | `73adbbc7f0d62e6bd30c809c027854860676c1a2dc83d0514eddd2a3b0df522d` |
| `public/images/homepage-preview/hero-organization-v1.webp` | `768 × 1619` | `< 60 KB` | `8e18d35d66d00ad5356a1737237f02a543586717e02f90792ace88fe425dbb13` |

Combined source derivative size is approximately `77 KB`, well below the HP-S3 initial hero budget of `450 KB`. Next.js image optimization supplies responsive derivatives.

## Crop and accessibility contract

| Viewport | Intended composition | Crop rule |
|---|---|---|
| Desktop `≥940px` | `25 / 50 / 25`, two 520px portrait frames | `object-fit: cover`, centered at `50% 42%`; head, hands/prop, and role caption remain visible |
| Tablet `520–939px` | Copy first, then two equal portrait columns | 430px frames; each role remains readable without relying on color |
| Mobile `<520px` | Copy → individual → organization | 400px full-width frames; capability labels remain inside page gutters |

Accessible alt text describes the illustrative role rather than inventing a person identity. Visible captions explicitly distinguish `Untuk individu` and `Untuk organisasi`.

## LCP loading contract

- Static imports preserve intrinsic dimensions and prevent image-driven layout shift.
- Both images use responsive `sizes`.
- The individual portrait uses `fetchPriority="high"`; the organization portrait uses eager loading.
- No third-party image host, runtime image request, client-side image switcher, or borrowed asset is used.
