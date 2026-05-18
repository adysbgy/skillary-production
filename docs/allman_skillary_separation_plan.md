# Allman ↔ Skillary: Freeze & Separation Execution Plan

**Created:** 2026-05-09
**Status:** Ready for execution
**Prerequisite:** Contamination audit completed (`cross_project_contamination_audit.md`)

---

## 1. Current State Summary

| Metric | Value |
|---|---|
| Projects | 2 (Allman, Skillary) — forked from same origin |
| Git | ❌ Neither project has version control |
| Diverged files | 47 |
| Identical files | 0 |
| Skillary-only files | 31 |
| Allman-only files | 35 |
| Allman files with Skillary tokens | 40+ (`#FFFDF9`) |
| Active contamination risk | Historical (May 4), not ongoing |

---

## 2. Target Future Structure

```
/Users/aj/Projects/
├── allman/                          # Allman-only repo
│   ├── .git/
│   ├── .project-identity            → "ALLMAN"
│   ├── prisma/
│   ├── src/
│   │   ├── app/                     # Allman routes only
│   │   ├── components/
│   │   │   ├── layout/              # Allman Header/Footer/Nav
│   │   │   ├── ui/                  # Allman Button/Card/Logo
│   │   │   └── sections/            # Allman hero/marquee/faq
│   │   ├── data/                    # Allman nav/footer/programs data
│   │   ├── lib/                     # Shared-safe + Allman brand
│   │   └── styles/                  # Allman tokens (Allman-only)
│   └── public/                      # Allman logo/images
│
└── skillary/                        # Skillary-only repo
    ├── .git/
    ├── .project-identity            → "SKILLARY"
    ├── prisma/
    ├── src/
    │   ├── app/                     # Skillary routes only
    │   ├── components/
    │   │   ├── layout/              # Skillary Header/Footer
    │   │   ├── ui/                  # Skillary Button/Card/Logo (with GradientButton)
    │   │   ├── sections/            # Skillary PageHero/ProgramCard
    │   │   ├── landing/             # Skillary landing sections
    │   │   ├── teams/               # Skillary-only
    │   │   └── ...
    │   ├── data/                    # Skillary config/content
    │   └── lib/                     # Shared-safe + Skillary brand (ui-styles.ts)
    └── public/                      # Skillary logo/images
```

### Recommended Repo Strategy: **Separate Repos**

**NOT monorepo.** Rationale:
- These are two different products with different brand identities
- They share a Prisma schema by origin, not by design — schemas will diverge
- UI components must NEVER be shared (different brand languages)
- Monorepo tooling (Turborepo, Nx) would add complexity with no benefit
- Risk of accidental cross-editing is eliminated by separate repos

---

## 3. File Classification: Must-Split vs. Can-Share

### 🔴 MUST-SPLIT FILES (Brand Layer — Never Share)

These files contain brand identity. Each project MUST maintain its own independent copy. They must never be edited in a "both projects" context.

| File Path | Reason | Allman Version | Skillary Version |
|---|---|---|---|
| `app/page.tsx` | Landing page = product identity | Allman corporate hero | Skillary warm edutech |
| `app/layout.tsx` | Root layout, meta, title | "Allman Indonesia" | "Skillary" |
| `app/globals.css` | Global color tokens, fonts | Allman palette | Skillary warm palette |
| `components/ui/Logo.tsx` | Brand name rendering | "Allman" | "Skillary" + subtitle |
| `components/ui/Button.tsx` | Skillary has GradientButton | Standard buttons | + GradientButton, GhostWarmButton |
| `components/ui/Card.tsx` | Skillary has style prop | No style prop | + style prop |
| `components/layout/Header.tsx` | Nav structure, brand colors | Allman nav | Skillary warm nav |
| `components/layout/Footer.tsx` | Copyright, links, branding | "© Allman" | "© PT Skillary Generasi Cerdas" |
| `components/sections/PageHero.tsx` | Brand gradient/layout | Allman gradient | Skillary warm gradient |
| `components/sections/ProgramCard.tsx` | Card brand styling | Allman style | Skillary warm style |
| `lib/brand-proof-content.ts` | Brand copy/claims | **CONTAMINATED** — has Skillary tagline | Skillary content |
| `lib/ui-styles.ts` | Skillary design tokens | Does not exist in Allman | Skillary-only |
| `public/images/` | Logo files, training photos | Allman assets | Skillary assets |

### 🟡 DIVERGED BUT LOW-RISK (Functional differences, not brand)

These files differ functionally between projects. They should remain independent copies but are not brand-dangerous.

| File Path | Reason |
|---|---|
| `app/admin/*.tsx` (8 files) | Visual alignment differs (Skillary has warm tokens) |
| `app/dashboard/*.tsx` (2 files) | Visual alignment differs |
| `app/learn/**/*.tsx` (2 files) | LMS UI differs |
| `app/certificate/[uniqueCode]/page.tsx` | Accent color differs |
| `app/explore/ExploreClient.tsx` | Visual alignment differs |
| `app/certificates/page.tsx` | Public cert page styling differs |
| `app/register/page.tsx`, `login/page.tsx` | Auth page styling differs |
| `lib/csv.ts`, `lib/storage.ts`, `lib/video.ts` | Minor utility differences |

### 🟢 CAN REMAIN SHARED (Truly Brand-Neutral)

These files are purely functional with no brand or visual identity. If you ever move to a monorepo, only these could be in a shared package. For separate repos, they exist as independent copies that happen to be identical.

| File Path | Reason |
|---|---|
| `prisma/schema.prisma` | Data model (identical today) |
| `lib/auth.ts` | Auth configuration |
| `lib/auth-guards.ts` | Role-based access |
| `lib/auth-types.ts` | Type definitions |
| `lib/prisma.ts` | Prisma client singleton |
| `lib/analytics.ts` | Course analytics computation |
| `lib/certificate-eligibility.ts` | Cert logic |
| `lib/certificate-display.ts` | Cert display helpers |
| `lib/entitlements.ts` | Access control |
| `lib/rate-limit.ts` | Rate limiting |
| `lib/batch-constants.ts` | Batch enum/labels |
| `lib/lead-constants.ts` | Lead CRM constants |
| `lib/payment-constants.ts` | Payment enums |
| `lib/batch-report.ts` | Report generation |
| `lib/organization-dashboard.ts` | Org dashboard logic |
| `lib/csv-import.ts` | CSV parsing |
| `lib/csv-quiz-import.ts` | Quiz CSV import |
| `components/ui/Container.tsx` | Generic layout wrapper |
| `components/ui/Pill.tsx` | Generic pill (if no brand color) |
| `components/ui/MarkdownRenderer.tsx` | Markdown display |
| `components/ui/MarkdownEditor.tsx` | Markdown editing |
| `components/ui/StringListBuilder.tsx` | List builder |
| `components/admin/*.tsx` (8 files) | Admin panels (forms, data) |
| `components/Providers.tsx` | Session provider |
| All `app/api/**/*.ts` routes | Backend logic |

---

## 4. Migration Sequence

### Phase 0: Freeze & Snapshot (DO FIRST — 15 minutes)

```bash
# 1. Create safety snapshots
cd "/Users/aj/Downloads/Proyek & Klien"
zip -r "Allman-SNAPSHOT-$(date +%Y%m%d).zip" Allman-Website-Production/ -x "*/node_modules/*" "*/.next/*"
zip -r "Skillary-SNAPSHOT-$(date +%Y%m%d).zip" skillary-production/ -x "*/node_modules/*" "*/.next/*"

# 2. Initialize Git on both
cd Allman-Website-Production && git init && git add . && git commit -m "Snapshot: pre-separation freeze"
cd ../skillary-production && git init && git add . && git commit -m "Snapshot: post-Sprint-5, pre-separation"
```

### Phase 1: Identity Markers (5 minutes)

Create a `.project-identity` file in each project root:

**Allman:**
```
PROJECT=ALLMAN
BRAND=Allman Indonesia
PORT=3000
DO_NOT_USE_TOKENS=FF8A00,FF5A5F,GradientButton,GhostWarmButton,ui-styles.ts
```

**Skillary:**
```
PROJECT=SKILLARY
BRAND=Skillary - Platform Pelatihan Terukur
PORT=3001
DO_NOT_USE_TOKENS=1E3A8A,site-header,site-footer,hero-section
```

### Phase 2: Fix Active Contamination in Allman (30 minutes)

These are the minimum changes needed to de-contaminate Allman. Execute in a dedicated session targeting ONLY Allman:

1. **`lib/brand-proof-content.ts`** — Replace "Platform Pelatihan Terukur" with Allman's actual tagline
2. **Audit `#FFFDF9` usage** — Decide if warm ivory is intentional for Allman or if it should revert to Allman's original palette
3. **Verify `Logo.tsx`** — Confirm it says "Allman", not "Skillary" ✅ (already verified clean)
4. **Verify `Footer.tsx`** — Confirm it says "© Allman" ✅ (already verified clean)

### Phase 3: TypeScript Verification on Both (10 minutes each)

```bash
# Allman
cd Allman-Website-Production && npx tsc --noEmit && npm run build

# Skillary
cd skillary-production && npx tsc --noEmit && npm run build
```

### Phase 4: Optional — Move to Separate Parent Directories

```bash
mkdir -p /Users/aj/Projects/allman
mkdir -p /Users/aj/Projects/skillary
# Move projects to dedicated locations (reduces confusion)
```

---

## 5. Freeze Rules During Migration

### HARD RULES (non-negotiable)

| Rule | Reason |
|---|---|
| **Do NOT edit both projects in the same coding session** | Prevents accidental cross-contamination |
| **Do NOT copy files from Skillary to Allman or vice versa** | Brand layers have diverged beyond safe copying |
| **Do NOT run "global UI alignment" across both projects** | Each project has its own visual identity |
| **Always verify `pwd` before editing** | Confirm you're in the right project directory |
| **Always `git commit` before starting new work** | Creates rollback points |
| **Do NOT modify Prisma schema without coordinating both** | Shared data model requires sync |

### SOFT RULES (strongly recommended)

| Rule | Reason |
|---|---|
| Use different terminal tabs/windows for each project | Visual separation |
| Run each project on a fixed port (Allman=3000, Skillary=3001) | Avoid confusion |
| Prefix commit messages with `[ALLMAN]` or `[SKILLARY]` | Clear attribution |

---

## 6. Safe Git Strategy

### For Each Project (Independent)

```
main          ← production-ready state
├── develop   ← active development
├── feature/* ← individual features
└── hotfix/*  ← emergency fixes
```

### Commit Discipline

```bash
# Always commit before starting a new task
git add . && git commit -m "[SKILLARY] Sprint 5: admin alignment complete"

# Always check status before editing
git status

# Tag milestones
git tag -a v1.0-sprint5 -m "Sprint 5 admin alignment"
```

### Never

- Never `git push` one project's commits to the other's remote
- Never create a shared remote for both projects
- Never merge branches across projects

---

## 7. Future Vibecoding Guardrails

### Pre-Session Checklist

Before EVERY coding session, the AI assistant must:

1. **Declare the active project root** at the start of the conversation
2. **Verify the project identity** by checking `package.json` name or `.project-identity`
3. **Never assume** the other project needs the same changes
4. **Never run** style alignment sprints that reference both codebases
5. **Refuse** to edit brand-layer files without explicit user confirmation of which project

### Safe Prompt Patterns

✅ **Good:**
> "You are working on the Skillary Production codebase at `/Users/aj/.../skillary-production`."

❌ **Bad:**
> "Align all projects to the new design system."
> "Update both Allman and Skillary."
> "Apply this change globally."

### Import Audit Rule

Before any refactor that touches `components/ui/`, `components/layout/`, or `lib/`:
1. Verify the file exists ONLY in the active project
2. Verify no brand tokens are being introduced from the other project
3. Verify the change does not assume shared component APIs (e.g., Card with `style` prop)

---

## 8. Risks If Ignored

| Risk | Severity | Consequence |
|---|---|---|
| No Git initialized | 🔴 CRITICAL | One bad edit = permanent loss, no rollback |
| Continued editing without project verification | 🔴 HIGH | Skillary tokens leak into Allman production |
| Allman ships with `#FFFDF9` and Skillary tagline | 🟡 MEDIUM | Brand confusion, unprofessional appearance |
| Schema diverges without coordination | 🟡 MEDIUM | One project's migrations break the other |
| Shared `Card.tsx` API difference | 🟢 LOW | TypeScript errors if code is copied between projects |

---

## 9. Decision Matrix

| Decision | Options | Recommendation |
|---|---|---|
| Repo strategy | Separate repos vs. monorepo | **Separate repos** — simplest, safest |
| `#FFFDF9` in Allman | Keep vs. revert to Allman palette | **User decision needed** — depends on Allman brand intent |
| `brand-proof-content.ts` | Fix now vs. defer | **Fix now** — 1 line change, high brand risk |
| Directory relocation | Move to `/Projects/` vs. keep in Downloads | **Recommend move** — reduces confusion |
| Prisma schema sync | Active sync vs. independent evolution | **Independent** — schema changes are rare |
