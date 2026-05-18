# Organization + Training Batch — Phase 3C

## Implementation Status: COMPLETED

Phase 3C implements Participant Management and Course Assignment for Training Batches.

## What Was Implemented

### 1. Validation Schemas (`src/lib/batch-constants.ts`)
- `batchParticipantCreateSchema` / `batchParticipantUpdateSchema` (name, email, whatsapp, role, status, notes)
- `batchCourseCreateSchema` / `batchCourseUpdateSchema` (courseId, required, sortOrder)
- `normalizeEmail` helper for consistent email linking.

### 2. Participant Management (`BatchParticipantsPanel`)
- Inline Add/Edit/Soft-Remove participant.
- Validates duplicate emails within the same batch.
- **Auto-linking:** When an email matches an existing `User`, the `userId` is linked automatically and displays a "Linked" badge.
- Removing a participant sets their status to `REMOVED` (soft delete) to preserve historical data.

### 3. Course Assignment (`BatchCoursesPanel`)
- Inline Assign/Edit/Remove course.
- Lists all active and draft courses. Drafts are badged explicitly.
- Allows setting a course as `Required` or `Optional`.
- Allows defining `sortOrder`.
- Prevents duplicate course assignment in the same batch.
- **Hard delete:** Removing a course assignment deletes the `BatchCourse` record since no dependent enrollments are created yet.

### 4. Batch Detail UI Updates
- Replaced Participant and Course placeholders with real interactive React components.
- Retained Progress and Report placeholders.
- Added a `Phase 3C Warning` block explicitly stating that access is NOT granted yet.

## API Routes
| Route | Method | Purpose |
|:---|:---|:---|
| `/api/admin/batches/[id]/participants` | GET | List participants |
| `/api/admin/batches/[id]/participants` | POST | Add participant (checks dup, links User) |
| `/api/admin/batches/[id]/participants/[pid]` | PATCH | Update participant (re-links User if email changes) |
| `/api/admin/batches/[id]/participants/[pid]` | DELETE| Soft-remove (set status = REMOVED) |
| `/api/admin/batches/[id]/courses` | GET | List assigned courses |
| `/api/admin/batches/[id]/courses` | POST | Assign course |
| `/api/admin/batches/[id]/courses/[cid]` | PATCH | Update order / required |
| `/api/admin/batches/[id]/courses/[cid]` | DELETE| Remove assigned course |

## What Was Deliberately NOT Implemented
- ❌ **Grant Access / Enrollment creation:** Participants do not get course access yet.
- ❌ Automatic Enrollment triggers.
- ❌ Enrollment source `BATCH`.
- ❌ Batch Progress tracking.
- ❌ Batch Report CSV.
- ❌ CSV Participant Import (kept manual for MVP).

## Next Phase: 3D — Grant Access

Phase 3D will implement the core logic connecting Batches to Enrollments:
1. Admin button "Grant Access"
2. Iterates through `BatchParticipant`s with linked `userId` (where status is JOINED/INVITED).
3. Creates `Enrollment` records for each `BatchCourse` assigned.
4. Uses `source: MANUAL` to skip Enrollment schema changes for now.
5. Safely skips participants that are already enrolled via other means.

## QA Checklist

- [ ] Add participant with new email -> Shows "Not Registered"
- [ ] Add participant with existing User email -> Shows "Linked" badge
- [ ] Attempt duplicate email -> Blocked with 409
- [ ] Update participant email to match User -> Links User
- [ ] Remove participant -> Status becomes REMOVED, participant grayed out
- [ ] Assign course -> Appears in list
- [ ] Attempt duplicate course -> Blocked with 409
- [ ] Change required status and order -> Updates successfully
- [ ] Remove course -> Disappears from list
- [ ] Verify detail page counters update
- [ ] Verify **no** `Enrollment` records are created
- [ ] Verify Build passes
