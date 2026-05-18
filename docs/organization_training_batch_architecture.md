# Organization & Training Batch Architecture

## 1. Current Schema Audit

### 1.1 Models Overview (13 models)

| Model | Purpose | Key Relationships |
|:---|:---|:---|
| User | Learner/Instructor/Admin | enrollments, certificates, quizAttempts, courses (instructor) |
| Course | Learning content | modules, enrollments, certificates, learningPaths |
| Module | Course section | lessons |
| Lesson | Content unit | progress, quizAttempts, resources |
| Enrollment | User↔Course access | unique(userId, courseId), source provenance |
| LessonProgress | Per-lesson completion | unique(userId, lessonId) |
| QuizAttempt | Assessment results | score, totalQuestions, passed |
| Certificate | Issued cert with uniqueCode | unique(userId, courseId) |
| PaymentOrder | Transaction record | productType, status, gatewayRef |
| LearningPath | Guided path grouping | courses via LearningPathCourse |
| LearningPathCourse | Path↔Course junction | sortOrder |
| AuditLog | Admin action audit | action, actorId, meta (JSON) |
| Lead | CRM for inquiries | status lifecycle, archivedAt |
| PasswordResetToken | Auth recovery | email, token, expires |

### 1.2 Enrollment Model (Critical for Batch Design)

```
model Enrollment {
  id               String    @id @default(cuid())
  userId           String
  courseId          String
  source           String    @default("UNKNOWN") // "FREE" | "PAID" | "MANUAL" | "UNKNOWN"
  grantedByAdminId String?
  revokedAt        DateTime?
  revokedByAdminId String?
  enrolledAt       DateTime  @default(now())
  completedAt      DateTime?
  @@unique([userId, courseId])
}
```

**Key observations:**
- `source` tracks provenance: FREE, PAID, MANUAL, UNKNOWN
- MANUAL enrollments track `grantedByAdminId` — existing admin grant pattern
- Soft-revoke via `revokedAt` + `revokedByAdminId`
- Admin enrollment API (`/api/admin/enrollments`) already handles:
  - Lookup user by email
  - Check existing enrollment provenance
  - Refuse to override PAID enrollments
  - Reactivate revoked MANUAL access
  - Create new MANUAL enrollment

> [!IMPORTANT]
> The existing MANUAL enrollment flow is the foundation for batch access. We should add "BATCH" as a valid source value but use "MANUAL" initially for MVP safety.

### 1.3 Progress Tracking

- `LessonProgress`: per (userId, lessonId) — `completed`, `completedAt`
- `QuizAttempt`: per (userId, lessonId) — `score`, `totalQuestions`, `passed`
- `Certificate`: per (userId, courseId) — `uniqueCode`, `issuedAt`
- `computeCourseAnalytics()` helper already calculates: enrolled count, completion rate, avg progress, quiz scores

### 1.4 Admin Patterns

| Pattern | Implementation |
|:---|:---|
| Auth guard (ADMIN only) | `requireAdminAPI()` from `src/lib/auth-guards.ts` |
| Auth guard (ADMIN/INSTRUCTOR) | `requireAdminOrInstructorAPI()` |
| Page-level auth | `auth()` + role check + `redirect("/dashboard")` |
| Nav | Admin layout with role-conditional items (ADMIN gets Leads, Paths, Analytics, Users) |
| Server components | Used for all admin pages with direct Prisma queries |
| Client components | Used for interactive forms (`"use client"` + fetch to API) |
| Status badges | `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full` pattern |
| Table pattern | `<Card className="p-0 overflow-hidden">` + `<table>` |
| CSV export | `escapeCSV()` + `formatDate()` helpers + `Content-Disposition: attachment` |
| Validation | Zod schemas from constants file |
| String status | All models use String types (no Prisma enums anywhere) |

### 1.5 Constraints Affecting Batch Design

1. **SQLite database** — No native enum support, no advanced aggregation. String status is correct approach.
2. **Enrollment uniqueness** — `@@unique([userId, courseId])` means one enrollment per user per course regardless of batch. Batch enrollment must check for existing enrollment.
3. **No organization concept exists** — Lead has `organization` as free-text field, not a relation.
4. **User creation is self-service** — Registration via `/api/register`. Batch participants may not have accounts yet.
5. **Certificate is per (userId, courseId)** — Independent of batch context. Certificate reports must be aggregated, not batch-scoped.

---

## 2. Product Requirements

### 2.1 Organization MVP

| Feature | Priority | Notes |
|:---|:---|:---|
| Create organization | P0 | name, sector, contact info |
| Edit organization | P0 | PATCH update |
| View organization detail | P0 | Info + batches list |
| List organizations | P0 | Search + filter |
| Link to Lead (future) | P2 | Lead → Organization via manual link, not in MVP |

### 2.2 Training Batch MVP

| Feature | Priority | Notes |
|:---|:---|:---|
| Create batch under organization | P0 | title, format, dates, status |
| Edit batch | P0 | PATCH update |
| Batch status lifecycle | P0 | DRAFT → ACTIVE → COMPLETED → ARCHIVED |
| Assign courses | P0 | Multiple courses, required flag, order |
| Add participants | P0 | name, email, whatsapp, role |
| View participant progress | P0 | Aggregated from Enrollment + LessonProgress |
| Export progress report CSV | P0 | Per-participant, per-course |
| Grant access (enrollment) | P1 | Manual action, creates Enrollment per participant×course |
| Batch overview stats | P1 | Enrolled count, avg progress, completion rate |

### 2.3 BatchParticipant MVP

| Feature | Priority | Notes |
|:---|:---|:---|
| Add by name/email | P0 | Does not require existing User account |
| Link to User if exists | P0 | Match by email |
| Status tracking | P0 | INVITED / REGISTERED / ACTIVE / COMPLETED |
| Remove participant | P0 | Soft or hard delete |
| Notes per participant | P1 | Internal admin notes |
| CSV import (future) | P2 | Bulk add participants from file |

---

## 3. Proposed Prisma Schema

### 3.1 Organization

```prisma
model Organization {
  id              String   @id @default(cuid())
  name            String
  sector          String?
  contactName     String?
  contactEmail    String?
  contactWhatsapp String?
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  batches         TrainingBatch[]
}
```

### 3.2 TrainingBatch

```prisma
model TrainingBatch {
  id             String   @id @default(cuid())
  organizationId String
  title          String
  description    String?
  format         String   @default("ONLINE")   // "ONLINE" | "OFFLINE" | "HYBRID"
  status         String   @default("DRAFT")     // "DRAFT" | "ACTIVE" | "COMPLETED" | "ARCHIVED"
  startDate      DateTime?
  endDate        DateTime?
  notes          String?
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  organization   Organization       @relation(fields: [organizationId], references: [id], onDelete: Cascade)
  participants   BatchParticipant[]
  courses        BatchCourse[]

  @@index([organizationId])
  @@index([status])
  @@index([startDate])
}
```

### 3.3 BatchParticipant

```prisma
model BatchParticipant {
  id          String    @id @default(cuid())
  batchId     String
  userId      String?
  name        String
  email       String
  whatsapp    String?
  role        String?
  status      String    @default("INVITED")  // "INVITED" | "REGISTERED" | "ACTIVE" | "COMPLETED"
  notes       String?
  invitedAt   DateTime?
  joinedAt    DateTime?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  batch       TrainingBatch @relation(fields: [batchId], references: [id], onDelete: Cascade)
  user        User?         @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@unique([batchId, email])
  @@index([batchId])
  @@index([email])
  @@index([userId])
}
```

### 3.4 BatchCourse

```prisma
model BatchCourse {
  id        String   @id @default(cuid())
  batchId   String
  courseId   String
  required  Boolean  @default(true)
  sortOrder Int      @default(0)
  createdAt DateTime @default(now())

  batch     TrainingBatch @relation(fields: [batchId], references: [id], onDelete: Cascade)
  course    Course        @relation(fields: [courseId], references: [id], onDelete: Cascade)

  @@unique([batchId, courseId])
  @@index([batchId])
  @@index([courseId])
}
```

### 3.5 Required Model Updates

**User model** — Add relation:
```diff
 model User {
   ...
   quizAttempts   QuizAttempt[]
+  batchParticipants BatchParticipant[]
 }
```

**Course model** — Add relation:
```diff
 model Course {
   ...
   learningPaths     LearningPathCourse[]
+  batchCourses      BatchCourse[]
 }
```

### 3.6 Design Decisions

| Decision | Choice | Rationale |
|:---|:---|:---|
| Status type | String (not enum) | Consistent with all 13 existing models |
| Organization cascade | Cascade delete batches | Organization removal should clean up batches |
| Participant cascade | Cascade on batch delete | Participants are batch-scoped |
| User relation | Optional, SetNull | Participant can exist without user account |
| Participant uniqueness | `@@unique([batchId, email])` | Same email cannot be added twice to same batch |
| Course uniqueness | `@@unique([batchId, courseId])` | Same course cannot be assigned twice to same batch |

---

## 4. Enrollment Interaction Design

### 4.1 Analysis of Options

**Option A: BatchParticipant as tracking container only**
- Enrollment handled separately through existing `/api/admin/enrollments`
- ✅ Safest: no automatic access grant
- ❌ Worse UX: admin must enroll each participant×course individually

**Option B: Auto-enroll on batch activation**
- When status → ACTIVE, create Enrollment for all participant×course pairs
- ✅ Best UX: one-click access grant
- ❌ Risk: unintended enrollment if participant list or course list changes

**Option C (Recommended): Admin action "Grant Access"**
- BatchParticipant exists independently
- Admin explicitly clicks "Grant Access" for a batch
- System creates Enrollment records for each participant×course pair
- Uses existing `source: "MANUAL"` with `grantedByAdminId`
- Skips already-enrolled users, reports results

### 4.2 Recommended MVP Flow

```
1. Create Organization
2. Create Training Batch under Organization
3. Add Courses to Batch
4. Add Participants to Batch (by name/email)
5. System auto-links userId if User with that email exists
6. Admin clicks "Grant Access" → creates Enrollment records
7. Participants log in and see enrolled courses
8. Admin monitors progress via batch report
9. Admin exports CSV report
10. When complete, set batch status → COMPLETED
```

### 4.3 Enrollment Source Handling

Current `Enrollment.source` values: `FREE`, `PAID`, `MANUAL`, `UNKNOWN`

For MVP, batch-created enrollments should use `source: "MANUAL"` with `grantedByAdminId` set to the admin performing the action. This avoids schema changes to the Enrollment model.

> [!TIP]
> In a future phase, consider adding `"BATCH"` as a source value and optionally adding `batchId` to Enrollment for precise tracking. This is not required for MVP.

### 4.4 Grant Access Logic

```
For each BatchParticipant where userId is not null:
  For each BatchCourse:
    Check existing Enrollment(userId, courseId):
      - If exists with source=PAID → skip (provenance sacred)
      - If exists with source=FREE/MANUAL and not revoked → skip (already active)
      - If exists but revoked → reactivate with source=MANUAL
      - If not exists → create with source=MANUAL
    Track: granted, skipped, failed counts
Return summary report to admin
```

---

## 5. Admin UI Design

### 5.1 Navigation

Add to admin layout (ADMIN-only section):
```
Organizations  →  /admin/organizations
Batches        →  /admin/batches
```

### 5.2 Page Structure

#### `/admin/organizations`
- List: Name, Sector, Contact, Batches count, Created
- Search by name/sector
- Create Organization button

#### `/admin/organizations/[id]`
- Organization info card
- Batches list (linked from this org)
- Edit form (inline or modal)

#### `/admin/batches`
- List: Title, Organization, Format, Status, Dates, Participants count
- Filter: status, organization, format
- Create Batch button (select organization)

#### `/admin/batches/[id]`
Tab-based or section-based layout:

| Section | Content |
|:---|:---|
| Overview | Title, org, dates, format, status, description |
| Courses | Assigned courses list + add/remove + reorder |
| Participants | Participant list + add + status + user link indicator |
| Progress | Per-participant per-course progress table |
| Report | Progress table + "Export CSV" button |
| Actions | Grant Access button, Complete Batch button |

### 5.3 UI Patterns

Follow existing admin patterns:
- Server component pages with direct Prisma queries
- Client components for forms (`LeadStatusForm` pattern)
- Card-based layouts with `border-black/5`
- Status badges with color maps from constants files
- Zod validation for API payloads

---

## 6. API Route Design

### 6.1 Organization Routes

| Route | Method | Auth | Purpose |
|:---|:---|:---|:---|
| `/api/admin/organizations` | GET | Admin | List organizations |
| `/api/admin/organizations` | POST | Admin | Create organization |
| `/api/admin/organizations/[id]` | GET | Admin | Get organization detail |
| `/api/admin/organizations/[id]` | PATCH | Admin | Update organization |

### 6.2 Batch Routes

| Route | Method | Auth | Purpose |
|:---|:---|:---|:---|
| `/api/admin/batches` | GET | Admin | List batches (filter by org/status) |
| `/api/admin/batches` | POST | Admin | Create batch |
| `/api/admin/batches/[id]` | GET | Admin | Get batch detail |
| `/api/admin/batches/[id]` | PATCH | Admin | Update batch |

### 6.3 Batch Sub-Resource Routes

| Route | Method | Auth | Purpose |
|:---|:---|:---|:---|
| `/api/admin/batches/[id]/participants` | POST | Admin | Add participant |
| `/api/admin/batches/[id]/participants/[pid]` | PATCH | Admin | Update participant |
| `/api/admin/batches/[id]/participants/[pid]` | DELETE | Admin | Remove participant |
| `/api/admin/batches/[id]/courses` | POST | Admin | Assign course |
| `/api/admin/batches/[id]/courses/[bcId]` | DELETE | Admin | Remove course |
| `/api/admin/batches/[id]/grant-access` | POST | Admin | Bulk enroll participants |
| `/api/admin/batches/[id]/report` | GET | Admin | Export batch report CSV |

---

## 7. Batch Report Logic

### 7.1 Report Generation

For each `BatchParticipant` × `BatchCourse`:
1. Find `User` by `participant.userId` (or match by email)
2. Find `Enrollment` for (userId, courseId)
3. Count total lessons in course (via Module→Lesson)
4. Count completed `LessonProgress` for user in course lessons
5. Calculate progress percentage
6. Find latest `QuizAttempt` for quiz lessons in course
7. Check `Certificate` existence for (userId, courseId)
8. Determine follow-up status

### 7.2 Report CSV Columns

| Column | Source |
|:---|:---|
| Batch | TrainingBatch.title |
| Organization | Organization.name |
| Participant Name | BatchParticipant.name |
| Email | BatchParticipant.email |
| Course | Course.title |
| Enrollment Status | Enrollment exists? ENROLLED / NOT_ENROLLED |
| Progress % | completedLessons / totalLessons × 100 |
| Lessons Completed | count of LessonProgress(completed=true) |
| Total Lessons | count of Lesson in course |
| Assessment Status | PASSED / FAILED / NOT_ATTEMPTED / N/A |
| Certificate Status | ISSUED / PENDING |
| Completed At | Enrollment.completedAt |
| Follow-up Needed | YES if progress < 100% and batch is ACTIVE |
| Notes | BatchParticipant.notes |

---

## 8. Risk Analysis

| Risk | Impact | Mitigation |
|:---|:---|:---|
| Duplicate participants | Data confusion | `@@unique([batchId, email])` constraint |
| Email mismatch | Progress not found | Auto-link userId on add; manual link option |
| Participant without user account | Cannot enroll or track progress | Skip in grant-access; UI shows "Belum terdaftar" |
| Unintended enrollment | User gets access before batch is ready | Grant-access is explicit admin action, not automatic |
| Certificate outside batch | Cert issued by course rules, not batch | Report reads existing certs; doesn't create |
| Report performance on large batches | Slow page load | Limit to 200 participants per batch; paginate later |
| Deleting organization cascades all batches | Data loss | Add confirmation dialog; consider soft-delete later |
| Privacy in CSV export | PII exposure | Admin-only endpoint; documented in hardening docs |
| Course deletion breaks batch reports | Missing data | BatchCourse cascade deletes; report handles missing gracefully |
| Role permission confusion | Instructor shouldn't see org/batch | Admin-only guards (not instructor) for all org/batch routes |

---

## 9. Implementation Phases

### Phase 3A — Schema + Organization Admin
**Files:**
- `prisma/schema.prisma` — Add Organization, TrainingBatch, BatchParticipant, BatchCourse; update User/Course relations
- `src/lib/batch-constants.ts` — Status labels, colors, Zod schemas
- `src/app/api/admin/organizations/route.ts` — GET + POST
- `src/app/api/admin/organizations/[id]/route.ts` — GET + PATCH
- `src/app/admin/organizations/page.tsx` — List page
- `src/app/admin/organizations/[id]/page.tsx` — Detail page
- `src/app/admin/layout.tsx` — Add nav item

**Verification:** `prisma generate` → `db push` → `tsc` → `build`
**Rollback:** Remove new models from schema; reverse db push is safe for new tables only
**Acceptance:** Can create, edit, list organizations from admin

---

### Phase 3B — Training Batch CRUD
**Files:**
- `src/app/api/admin/batches/route.ts` — GET + POST
- `src/app/api/admin/batches/[id]/route.ts` — GET + PATCH
- `src/app/admin/batches/page.tsx` — List page with filters
- `src/app/admin/batches/[id]/page.tsx` — Detail page (overview tab)
- `src/app/admin/layout.tsx` — Add nav item

**Verification:** `tsc` → `build`
**Rollback:** Remove new pages/routes only
**Acceptance:** Can create, edit, list batches linked to organizations

---

### Phase 3C — Participants + Courses Assignment
**Files:**
- `src/app/api/admin/batches/[id]/participants/route.ts` — POST
- `src/app/api/admin/batches/[id]/participants/[pid]/route.ts` — PATCH + DELETE
- `src/app/api/admin/batches/[id]/courses/route.ts` — POST
- `src/app/api/admin/batches/[id]/courses/[bcId]/route.ts` — DELETE
- `src/components/admin/BatchParticipantForm.tsx` — Add participant client form
- `src/components/admin/BatchCourseForm.tsx` — Assign course client form
- Update `src/app/admin/batches/[id]/page.tsx` — Participants + Courses sections

**Verification:** `tsc` → `build`
**Rollback:** Remove new API routes and components
**Acceptance:** Can add/remove participants and courses to a batch

---

### Phase 3D — Manual Grant Access
**Files:**
- `src/app/api/admin/batches/[id]/grant-access/route.ts` — POST
- Update `src/app/admin/batches/[id]/page.tsx` — Grant Access button + results
- Uses existing Enrollment creation logic from `/api/admin/enrollments`

**Verification:** `tsc` → `build` → manual test grant access
**Rollback:** Remove grant-access route
**Acceptance:** Clicking "Grant Access" creates Enrollment records with source=MANUAL

---

### Phase 3E — Batch Report CSV
**Files:**
- `src/app/api/admin/batches/[id]/report/route.ts` — GET (CSV)
- Update `src/app/admin/batches/[id]/page.tsx` — Progress table + export button
- `src/lib/batch-report.ts` — Report generation helper

**Verification:** `tsc` → `build` → export CSV → verify columns
**Rollback:** Remove report route and helper
**Acceptance:** CSV contains correct progress, quiz, certificate data per participant per course

---

### Phase 3F — UI Polish + QA
**Files:**
- Polish all admin pages
- Summary stats on batch detail
- Status badges
- Empty states
- Mobile responsiveness
- Documentation update

**Verification:** Full `tsc` → `build` → manual QA walkthrough
**Acceptance:** All batch management workflows operational from admin panel

---

## 10. Final Recommendation

The proposed architecture:
- **Extends** the existing data model with 4 new models (Organization, TrainingBatch, BatchParticipant, BatchCourse)
- **Reuses** the existing Enrollment provenance system (`source: "MANUAL"`)
- **Follows** all established admin patterns (auth guards, server components, Zod validation, Card/Table UI)
- **Does not touch** payment, certificate backend, enrollment logic, or course progress
- **Adds no fake data** — all models are empty until real organizational data is entered

The safe starting point is **Phase 3A** (schema + organization CRUD), which establishes the foundation without touching any existing production logic.

> [!IMPORTANT]
> **Recommendation:** Start with `"MANUAL"` for MVP. Add `"BATCH"` in a follow-up phase when tracking batch provenance becomes operationally important.

---

## 11. Phase 3 MVP Completion Note
**Phase 3F completed as UI polish and QA hardening.** 
The MVP now robustly supports:
Organization → Batch → Participants/Courses → Manual Grant Access → Batch Report CSV.

## 12. Phase 3G1 Note
**Phase 3G1 completed: Batch Participant CSV Import.**
Added safe bulk import functionality with max 500 rows, deduplication, auto-linking, and UI error reporting. Does not create Users or Enrollments automatically.

## 13. Phase 3G2 Note
**Phase 3G2 completed: Batch Access Revoke.**
Added safe batch-level revoke API that sets `revokedAt = now()` exclusively for `source: "MANUAL"` enrollments. `PAID` enrollments are strictly protected. Integrated into unified `BatchAccessControlPanel`.

## 14. Phase 3G3 Note
**Phase 3G3 completed: Organization Dashboard.**
Overhauled the Organization Detail page to roll up analytics across all organization batches using a new `getOrganizationDashboardData` helper. Displays high-level summary metrics, batch performance, and top actionable follow-up items.
