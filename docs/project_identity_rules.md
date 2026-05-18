# Project Identity Rules — SKILLARY

> **Project:** Skillary Training Platform  
> **Type:** B2C/B2B Training & Certification Platform  
> **Safe Edit Scope:** SKILLARY_ONLY  
> **Default Dev Port:** 3001

---

## Mandatory Rules for All Future Vibecoding Sessions

### Rule 1: Always Verify Active Project Root
Before editing ANY file, confirm you are in:
```
/Users/aj/Downloads/Proyek & Klien/skillary-production
```
Check for `.project-identity` with `PROJECT_NAME=SKILLARY`.

### Rule 2: Never Cross-Edit Brand Files
Never edit brand-layer files (Logo, Header, Footer, globals.css, brand-proof-content.ts) in both Allman and Skillary in the same sprint/session.

### Rule 3: Declare Active Project in Every Prompt
Every future vibecoding prompt MUST include:
```
ACTIVE PROJECT: SKILLARY
```

### Rule 4: No Global Style Alignment
Never run a "sync styles across projects" operation. Each project has its own design system:
- **Skillary:** Orange/coral warm palette, modern typography
- **Allman:** Separate brand identity (to be defined post-cleanup)

### Rule 5: High-Risk Files Require Extra Caution
The following files are HIGH RISK for cross-contamination and must be edited with explicit project confirmation:

| File | Risk Level | Reason |
|------|-----------|--------|
| `src/components/ui/Logo.tsx` | 🔴 Critical | Brand identity |
| `src/components/layout/Header.tsx` | 🔴 Critical | Navigation + branding |
| `src/components/layout/Footer.tsx` | 🔴 Critical | Brand links + legal |
| `src/app/page.tsx` | 🔴 Critical | Homepage — brand flagship |
| `src/app/globals.css` | 🟠 High | Design system root |
| `src/lib/brand-proof-content.ts` | 🟠 High | Brand-specific proof content |
| `src/components/ui/Button.tsx` | 🟡 Medium | Shared design pattern |
| `src/components/ui/Card.tsx` | 🟡 Medium | Shared design pattern |

### Rule 6: Git Discipline
- Commit frequently with descriptive messages
- Never force-push without team confirmation
- Tag major milestones (e.g., `containment-complete`, `brand-cleanup-done`)
