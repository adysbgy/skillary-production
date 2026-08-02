# Skillary Execution Anchor

**Status:** ACTIVE — canonical direction
**Effective date:** 2 August 2026
**Owner:** Founder / Product Owner
**Purpose:** Guardrail agar strategi, copy, desain, data, dan implementasi Skillary tidak melenceng
**Supersedes:** Arah lama yang bertentangan, termasuk competing B2B-first homepage, public V2 surfaces, mock commercial catalogs, dan asumsi subscription yang belum disetujui

> **IMPORTANT**
> Baca dokumen ini sebelum membuat plan, schema, page, copy, event, program, trainer workflow, credential, payment, atau public claim. Jika implementasi bertentangan dengan dokumen ini, hentikan pekerjaan dan eskalasikan ke founder.

---

## 1. Keputusan Inti yang Tidak Boleh Bergeser

### Identitas bisnis

```text
Skillary = Live + Self-Paced Learning Platform
```

- Brand publik hanya **Skillary**.
- Skillary berdiri sebagai brand independen.
- Allman tidak digunakan sebagai positioning atau traction Skillary.
- Maven Analytics adalah inspirasi operating model dan kualitas produk—bukan sumber code, copy, taxonomy, desain, asset, data, atau intellectual property.

### Arsitektur bisnis

```text
B2C-first main experience
├── Paid live webinars
├── Self-paced courses
├── Guided learning programs
└── Printable certificates + verified shareable badges

For Business
├── In-house training
├── Customized capability programs
├── Company webinar/learning series
└── Assessment, credentials, and company reports
```

- Homepage utama berorientasi ke **profesional/pembelajar individu**.
- B2B masuk melalui CTA dan funnel jelas bernama **For Business**.
- Ambisi bisnis adalah webinar berbayar setiap hari dan banyak training perusahaan.
- Daily webinar dan audience `200+` adalah **target**, bukan historical claim.

### Product loop

```text
Belajar → Praktik → Buktikan
```

Setiap offer harus menjelaskan apa yang dipelajari, dipraktikkan, bukti yang diperoleh, dan criteria untuk memperoleh bukti tersebut.

---

## 2. Enam Product Types Resmi

| Canonical type | Audience | Delivery | Normal CTA |
|---|---|---|---|
| Live Webinar | Individual / both | scheduled live session | register/checkout |
| Self-Paced Course | Individual | asynchronous learning | enroll/checkout |
| Guided Program | Individual / both | multi-session learning | register |
| In-House Training | Organization | private delivery | request proposal |
| Company Learning Series | Organization | recurring learning | consultation |
| Assessed Credential | Individual / organization | assessment-based | view criteria/register |

Istilah `event`, `workshop`, `course`, `training`, `path`, `service`, `program`, `certification`, dan `cohort` tidak boleh menjadi product type baru tanpa mapping ke salah satu tipe di atas.

---

## 3. Source of Truth

```text
CommercialOffer
├── marketing identity
├── audience and CTA
├── lifecycle/readiness
├── schedule, price, capacity
├── trainer assignments
├── production records
├── evidence links
├── credential rules
└── runtime mappings
    ├── Course
    ├── LearningPath
    ├── WebinarSession
    ├── TrainingBatch
    └── CredentialDefinition
```

### Authority rules

1. Database-backed canonical offer adalah target operational source of truth.
2. Existing `Course`, `LearningPath`, `TrainingBatch`, dan `TrainerProfile` tetap runtime systems—bukan public commercial identity.
3. Public page, sitemap, checkout, dan credential issuance harus membaca canonical records dan policy services setelah migration siap.
4. File registry sementara adalah contracts/policy—not long-term operational stores.
5. Local arrays di page/component tidak boleh menjadi sumber commercial truth baru.

### Quarantined sources

- `src/data/v2-events.ts` adalah illustrative legacy data dan **tidak boleh dimigrasikan**.
- Mock event hosts, dates, price, capacity, urgency, registration, dan certificate claims tidak boleh diaktifkan kembali.
- Legacy program registries hanya boleh diimpor sebagai `DRAFT` setelah mapping.
- Static testimonials, client logos, metrics, dan partner claims tidak boleh dirender tanpa approved evidence.

---

## 4. Offer Lifecycle dan Readiness

```text
DRAFT → INTERNAL_REVIEW → PILOT_READY → PILOT → APPROVED
→ SCHEDULED / LIVE → COMPLETED → ARCHIVED
```

### Publication gate

Offer tidak boleh tampil sebagai available tanpa:

- supported type, audience, action, dan status;
- title, summary, canonical slug, dan owner;
- accepted trainer assignment jika memerlukan trainer;
- approved production record dan non-empty production kit;
- confirmed public action dan explicit credential rule;
- approved evidence untuk setiap claim yang memerlukan proof.

### Checkout gate

Checkout memerlukan seluruh publication gate, ditambah:

- status `SCHEDULED` atau `LIVE`;
- authoritative server-side price;
- positive capacity;
- open registration window;
- real session/runtime mapping;
- refund/cancellation/reschedule rules;
- fulfillment readiness;
- payment gateway dan merchant readiness;
- global payment kill switch enabled.

Client tidak boleh menjadi authority untuk title, amount, capacity, eligibility, atau payment status.

---

## 5. Webinar Anchor

- **WebinarDefinition** = reusable topic dan approved content.
- **WebinarSession** = satu delivery dengan date, time, capacity, price, trainer, dan meeting configuration tertentu.

Required session truth:

- date/time/timezone;
- trainer dan moderator;
- price dan capacity;
- registration window;
- meeting provider dan recording policy;
- attendance dan credential rule;
- cancellation/reschedule policy;
- reminder dan support owner.

Scale sequence:

```text
1–2 webinar/week → 3–4/week → 5–7/week → multiple/day when justified
```

Jangan membuat kalender palsu untuk terlihat daily. `200+` harus dibedakan menjadi total registrations, paid registrations, live attendees, atau eligible completers.

---

## 6. Self-Paced Anchor

Recording webinar tidak otomatis menjadi self-paced course.

Minimum course:

- persona, prerequisites, measurable outcomes;
- module/lesson sequence;
- practice dan resource;
- progress tracking;
- quiz/assignment/project;
- completion dan credential criteria;
- trainer/content owner;
- version dan review date.

```text
Proven webinar → recording review → edit/segment → lesson context
→ workbook/practice → assessment → accessibility/QA → trainer approval → publish
```

---

## 7. Trainer Anchor

### Identity readiness ≠ production readiness

Published `TrainerProfile` hanya membuktikan public profile readiness. Trainer belum otomatis siap mengajar atau menulis offer tertentu.

Official roles:

- Subject Matter Expert;
- Live Instructor;
- Program Author;
- Content Producer;
- Assessment Designer;
- Reviewer;
- Content Maintainer.

Minimum production kit:

1. program brief;
2. target persona;
3. prerequisites;
4. learning outcomes;
5. syllabus;
6. instructor deck;
7. facilitator notes;
8. participant workbook;
9. case/example files;
10. practice exercises;
11. question bank;
12. final assignment;
13. rubric/answer guide;
14. credential rule;
15. recording plan;
16. maintenance owner.

---

## 8. Credential Anchor

| Credential | Minimum basis | Competency claim? |
|---|---|---|
| Participation Certificate | verified attendance | No |
| Completion Certificate | verified completion | Not automatically |
| Assessed Badge | passed assessment/project rubric | Yes, within criteria |
| Partner Certification | partner criteria and rights | According to contract |

Credential memerlukan unique verification ID, issuer and criteria snapshot, source linkage, printable PDF, QR/public verification, badge/LinkedIn metadata, expiry bila berlaku, dan revocation status.

Badge bukan sekadar PNG. Partner branding tidak boleh digunakan sebelum identity, criteria, dan rights terverifikasi.

---

## 9. Evidence and Claim Anchor

Governed evidence wajib untuk testimonials, client logos, learner/organization counts, attendance/completion metrics, trainer claims, partner status, event results, credential outcomes, dan historical statements.

Minimum evidence state:

- source reference dan owner;
- consent status dan proof;
- approved wording/date;
- expiry/review date bila perlu;
- withdrawal status;
- approved placement/scope.

Non-negotiable language rules:

```text
Target ≠ achievement
Registration ≠ attendance
Attendance ≠ completion
Completion ≠ competency
Certificate ≠ certification
Demo/example ≠ client evidence
Legacy history ≠ Skillary traction
Logo possession ≠ endorsement
```

Bila proof tidak cukup, hide claim atau gunakan truthful empty state.

---

## 10. Public Information Architecture

Target navigation:

```text
Webinars | Self-Paced | Programs | Certificates & Badges
Trainers | Resources | For Business | Login
```

Target canonical routes:

```text
/
/webinars
/webinars/[slug]
/self-paced
/self-paced/[slug]
/programs
/programs/[slug]
/credentials
/credentials/[slug]
/certificate/[uniqueCode]
/trainers
/trainers/[slug]
/for-business
/resources
/contact
/about
/blog
```

Rules:

- One canonical URL per concept.
- `/v2` tidak boleh menjadi competing production website.
- `/events` transitional menuju `/webinars`.
- `/untuk-organisasi` transitional menuju `/for-business`.
- LP hanya dipertahankan untuk campaign purpose yang jelas.
- Preview routes noindex dan tidak masuk public nav/sitemap.
- Redirect dibuat sebelum duplicate implementation dihapus.

---

## 11. For Business Anchor

```text
Lead → qualification → capability brief → offer selection
→ trainer/resource validation → proposal → contract/invoice
→ organization/batch → delivery → assessment/credentials
→ company report → renewal
```

Jual hanya capability yang tersedia: in-house training, company learning series, participant management, assessment, credentials, dan reports berdasarkan data nyata. Jangan menjanjikan real-time impact atau ROI tanpa measurement design.

---

## 12. Payment and Commerce Anchor

**Current state: HOLD.**

Aktivasi memerlukan provider/merchant confirmation, production credentials, webhook integrity, real approved offer, authoritative price/capacity, order/refund/reschedule lifecycle, invoice/tax decision, reconciliation, support SOP, sandbox E2E, dan controlled production smoke test.

```text
PAYMENTS_ENABLED=false
CANONICAL_OFFERS_ENABLED=false
```

Jangan mengubah flag menjadi true sebagai shortcut development.

---

## 13. Current Implementation Baseline

### Complete

- mock event and unsupported proof containment;
- Phase A route/data/offer/trainer/database mapping;
- additive Phase B1 Prisma design and migration SQL;
- destructive migration scan;
- offer publication, checkout, evidence, and feature-flag policies;
- 15 passing integrity tests;
- passing TypeScript and production build.

### Not complete / not active

- B1 migration application;
- B2 webinar DB models;
- canonical repositories/admin workflow;
- real webinar operations;
- public B2C/For Business migration;
- trainer production workspace;
- upgraded credential lifecycle;
- payment activation;
- legacy deletion;
- daily cadence and 200+ scale.

The generated B1 migration is additive and has not been applied to any database.

---

## 14. Execution Order

```text
A. Canonical mapping                         COMPLETE
B1. Additive offer/evidence foundation       IMPLEMENTED, NOT APPLIED
B2. Webinar operational model                NEXT
C. Admin operations
D. Public B2C + For Business migration
E. Webinar fulfillment
F. Self-paced + Trainer Studio
G. Credential lifecycle
H. Payment activation
I. Legacy cleanup
J. Measured daily/200+ scale
```

Public redesign must not run ahead of data, admin, readiness, dan evidence governance.

---

## 15. Definition of Done

Page, component, route, mock, atau schema saja bukan berarti selesai.

Done memerlukan sesuai scope:

- canonical data source dan authorization;
- readiness policy dan truthful states;
- operational owner dan end-to-end fulfillment;
- error/retry/rollback behavior;
- analytics/audit trail;
- TypeScript, lint, policy tests, dan production build;
- responsive/accessibility review untuk UI;
- evidence/consent untuk public claims;
- documentation/status update.

| Status | Meaning |
|---|---|
| Draft | exists but not approved |
| Implemented | code exists, not necessarily active |
| Tested | relevant checks pass |
| Migrated | environment change applied and verified |
| Active | intentionally exposed |
| Production-ready | operational and rollback gates pass |
| Hold | intentionally disabled |
| Quarantined | retained only for safety/migration |
| Archived | historical, not active direction |

---

## 16. Change Control

Untuk mengubah business direction, taxonomy, canonical routes, schema, credential, payment, proof policy, atau activation gate:

1. state proposed change and reason;
2. list affected routes, data, APIs, operations, and claims;
3. identify migration and rollback impact;
4. obtain founder approval;
5. update this anchor first;
6. update plan, task status, tests, and walkthrough;
7. only then execute.

---

## 17. Stop Conditions

Stop dan tanya founder jika pekerjaan memerlukan:

- publishing unverified event, trainer, testimonial, client, partner, atau metric;
- activating payment/checkout;
- destructive data migration;
- choosing certification partner;
- defining `200+` as measured KPI;
- changing B2C-first direction;
- introducing a seventh commercial product type;
- making `/v2` or LP a competing canonical surface;
- issuing competency badge without assessment evidence;
- using Allman history as Skillary traction;
- importing mock events as real operations.

---

## 18. Required Founder Inputs Before Activation

1. First real webinar: title, date, time, timezone, trainer, price, capacity.
2. Definition of `200+` target.
3. Trainer author/delivery roles.
4. Approved syllabus, production kit, attendance, credential criteria.
5. Payment provider and merchant of record.
6. Refund/cancellation/reschedule policy.
7. Certification partner, criteria, and branding rights.
8. Historical evidence approved for publication.
9. Owners for webinar operations, content quality, B2B sales, credentials, finance, and support.

---

## 19. Authority and References

**Authority order:**

1. Founder-approved changes recorded in this anchor.
2. This `SKILLARY_EXECUTION_ANCHOR.md`.
3. Active implementation plan and ADRs consistent with this anchor.
4. `PRODUCT.md` for general context.
5. Historical documents only where consistent.

References:

- `PRODUCT.md`
- `docs/skillary_master_project_management.md`
- `prisma/schema.prisma`
- `src/lib/offers/offer-policy.ts`
- `src/lib/offers/evidence-policy.ts`
- `prisma/migrations/20260802073500_add_canonical_offer_foundation/migration.sql`

## One-Sentence Test

> Apakah perubahan ini memperkuat Skillary sebagai B2C-first live + self-paced learning platform dengan For Business yang terpisah, memakai data nyata, trainer dan materi yang siap, credential yang jujur, serta activation gate yang aman?

Jika jawabannya tidak jelas **ya**, jangan ship.
