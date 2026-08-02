# HP-S8A Cutout Asset Provenance

**Created:** 1 Agustus 2026
**Purpose:** original Skillary first-viewport portraits for the visual-parity correction sprint
**Tool path:** built-in ImageGen edit, followed by the bundled chroma-key removal helper

## Source assets

- `public/images/homepage-preview/hero-individual-v1.webp`
- `public/images/homepage-preview/hero-organization-v1.webp`

Both source portraits were already original Skillary preview assets. No Maven photo, logo, UI capture, or downloaded reference asset was used as an image input.

## Edit prompts

### Individual

Use case `background-extraction`. Preserve the supplied Indonesian professional woman's identity, face, hair, expression, proportions, navy blouse, beige trousers, notebook, pose, crop, camera angle, and photorealistic studio quality. Change only the peach background to a perfectly flat `#00ff00` chroma-key field. Add no shadow, text, logo, watermark, object, or facial change.

### Organization

Use case `background-extraction`. Preserve the supplied Indonesian male team leader's identity, face, hair, glasses, expression, proportions, navy clothing, light blue shirt, portfolio, pose, crop, camera angle, and photorealistic studio quality. Change only the gray background to a perfectly flat `#00ff00` chroma-key field. Add no shadow, text, logo, watermark, object, or facial change.

## Stored outputs

| Role | Path |
|---|---|
| Individual chroma source | `docs/references/skillary-hero/2026-08-01/hero-individual-cutout-v2-chroma-source.png` |
| Organization chroma source | `docs/references/skillary-hero/2026-08-01/hero-organization-cutout-v2-chroma-source.png` |
| Individual transparent production asset | `public/images/homepage-preview/hero-individual-cutout-v2.png` |
| Organization transparent production asset | `public/images/homepage-preview/hero-organization-cutout-v2.png` |

The production PNGs were validated to contain transparent border pixels and natural subject coverage. They are illustrative portraits, not customers, instructors, employees, or testimonial evidence.
