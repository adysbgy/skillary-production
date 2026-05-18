# Organization + Training Batch — Phase 3B

## Implementation Status: COMPLETED

Phase 3B implements Training Batch CRUD attached to Organizations.

## What Was Implemented

### 1. Validation Schemas (`src/lib/batch-constants.ts`)
- `trainingBatchCreateSchema` — Zod: organizationId required, title min 2, format/status validated, date range validation
- `trainingBatchUpdateSchema` — Partial version for PATCH updates
- Dates validated: endDate must not be before startDate

### 2. Admin API Routes
| Route | Method | Purpose |
|:---|:---|:---|
| `/api/admin/batches` | GET | List batches with filters (q, status, format, organizationId) |
| `/api/admin/batches` | POST | Create batch (validates org exists) |
| `/api/admin/batches/[id]` | GET | Get batch detail with org info + counts |
| `/api/admin/batches/[id]` | PATCH | Update batch (validates org if changed) |

### 3. Admin Pages
| Page | Purpose |
|:---|:---|
| `/admin/batches` | List + summary cards + multi-filter |
| `/admin/batches/new` | Create batch (with org prefill from query param) |
| `/admin/batches/[id]` | Batch detail with placeholder sections |
| `/admin/batches/[id]/edit` | Edit batch form |

### 4. Components
- `TrainingBatchForm.tsx` — Reusable create/edit form with org select, format/status selects, date inputs

### 5. Organization Detail Update
- Batch rows now link to `/admin/batches/[id]`
- Added "+ Buat Batch" CTA linking to `/admin/batches/new?organizationId=[id]`
- Removed Phase 3B placeholder text

### 6. Admin Navigation
- Added "Batches" link (ADMIN-only)

## Validation Rules
- `organizationId` — required, must exist in database
- `title` — required, min 2 chars, max 200
- `description` — optional, max 5000
- `format` — must be ONLINE, OFFLINE, or HYBRID (default: ONLINE)
- `status` — must be DRAFT, ACTIVE, COMPLETED, or ARCHIVED (default: DRAFT)
- `startDate` / `endDate` — optional, but endDate must not precede startDate
- `notes` — optional, max 5000

## What Was Deliberately NOT Implemented
- ❌ Participant management (Phase 3C)
- ❌ Course assignment (Phase 3C)
- ❌ Grant access / enrollment (Phase 3D)
- ❌ Batch report CSV (Phase 3E)
- ❌ Batch DELETE (prefer archive via status)
- ❌ CSV participant import
- ❌ Automatic enrollment
- ❌ Enrollment source "BATCH"

## Next Phase: 3C — Participants + Courses Assignment

Phase 3C will implement:
1. Add/remove participants to batch
2. Auto-link userId by email match
3. Assign courses to batch
4. Reorder courses, mark required/optional
5. Remove placeholder sections from batch detail

## QA Checklist

- [ ] Login as admin
- [ ] Visit `/admin/batches`
- [ ] Verify summary cards (Total, Draft, Active, Completed, Archived)
- [ ] Click "+ Batch Baru"
- [ ] Verify organization select is populated
- [ ] Fill form and create batch
- [ ] Verify redirect to batch detail
- [ ] Verify detail shows org link, status badge, dates, counts
- [ ] Verify placeholder sections present
- [ ] Click "Edit" and update fields
- [ ] Verify changes saved
- [ ] Filter batches by status, format, organization
- [ ] Search batches by title
- [ ] Visit organization detail, verify batch listed
- [ ] Click "+ Buat Batch" from org detail, verify org prefilled
- [ ] Verify non-admin cannot access `/admin/batches`
- [ ] Verify existing course/enrollment/certificate flows still work
- [ ] Verify build passes
