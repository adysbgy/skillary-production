# Frozen Brand-Layer Files — SKILLARY

> **Status:** FROZEN — Do not edit without explicit project confirmation  
> **Created:** 2026-05-10  
> **Purpose:** Prevent accidental cross-project contamination during vibecoding

---

## Freeze List

### 🔴 CRITICAL — Brand Identity Files

#### `src/components/ui/Logo.tsx`
- **Why it's risky:** Defines the visual brand mark. If edited in the wrong project context, the entire site appears under the wrong brand.
- **Ownership:** Skillary-only
- **Requires project confirmation before editing:** YES

#### `src/components/layout/Footer.tsx`
- **Why it's risky:** Contains brand name, copyright text, legal links, social links, and contact info. A single wrong edit leaks one brand's identity into another.
- **Ownership:** Skillary-only
- **Requires project confirmation before editing:** YES

#### `src/components/layout/Header.tsx`
- **Why it's risky:** Primary navigation + logo placement + brand-colored CTA buttons. This is the most visible brand-carrying component on every page.
- **Ownership:** Skillary-only
- **Requires project confirmation before editing:** YES

#### `src/app/page.tsx`
- **Why it's risky:** The homepage is the brand flagship. Hero copy, value propositions, and CTAs are all brand-specific. Historically, both projects have had very similar homepage structures.
- **Ownership:** Skillary-only
- **Requires project confirmation before editing:** YES

---

### 🟠 HIGH RISK — Design System Files

#### `src/app/globals.css`
- **Why it's risky:** Root CSS file defines the entire color palette, typography, and spacing system. Both projects originally shared very similar globals.css files, making accidental paste-overs likely.
- **Ownership:** Skillary-only
- **Requires project confirmation before editing:** YES

#### `src/lib/brand-proof-content.ts`
- **Why it's risky:** Contains brand-specific proof points, testimonials, and marketing claims. This file was found in the audit to have potential contamination vectors between both projects.
- **Ownership:** Must be checked manually — content may reference wrong brand
- **Requires project confirmation before editing:** YES

---

### 🟡 MEDIUM RISK — Shared Design Patterns

#### `src/components/ui/Button.tsx`
- **Why it's risky:** Button styles often carry brand colors. If copied from one project to another, buttons may render in the wrong brand palette.
- **Ownership:** Skillary-only (but pattern originally shared)
- **Requires project confirmation before editing:** Recommended

#### `src/components/ui/Card.tsx`
- **Why it's risky:** Card components define visual hierarchy and may include brand-specific gradients or border treatments.
- **Ownership:** Skillary-only (but pattern originally shared)
- **Requires project confirmation before editing:** Recommended

---

## Rules

1. **Before editing any frozen file**, verify you are in the correct project root
2. **Check `.project-identity`** to confirm `PROJECT_NAME=SKILLARY`
3. **Never copy frozen files** between Allman and Skillary
4. **After editing**, do a quick visual audit to ensure no brand leakage
5. **Commit frozen file changes separately** with descriptive messages like:
   ```
   fix(brand): update Skillary Footer copyright text
   ```
