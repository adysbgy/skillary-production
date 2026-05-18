# Organization + Training Batch — Phase 3G3 (Organization Dashboard)

## Implementation Status: COMPLETED

Phase 3G3 transforms the basic Organization Detail page into a comprehensive B2B Client Dashboard. It rolls up training data across all batches associated with an organization, giving administrators an instant health check of participant engagement.

## What Was Implemented

### 1. Organization Analytics Helper (`src/lib/organization-dashboard.ts`)
- Reuses the existing `getBatchReportData` to ensure absolute consistency in metrics computation.
- Iterates over all non-archived batches for the organization.
- **Rolls up summary metrics:**
  - `totalBatches`, `activeBatches`
  - `totalParticipants`, `linkedParticipants`, `unlinkedParticipants`
  - `assignedCourses`
  - `averageProgress` (calculated as an average of batch averages)
  - `certificatesIssued`
  - `followUpNeededCount`
- **Extracts Top Follow-up Items:**
  - Scans every participant across all batches.
  - Sorts them by urgency based on the reason (e.g., `NO_USER_ACCOUNT` is highest priority, `LOW_PROGRESS` is lower priority).
  - Returns the top 10 actionable items to avoid overwhelming the UI.

### 2. Organization Dashboard UI (`/admin/organizations/[id]/page.tsx`)
- Completely overhauled the page layout.
- **Header:** Shows organization name, sector, creation date, and contact details compactly.
- **Summary Cards (Top):** 6 key metrics immediately visible.
- **Main Layout (Bottom-Left):** Batch Performance Table showing batches, participant counts, and average progress.
- **Sidebar (Bottom-Right):** Follow-up alerts and internal notes.
- **Empty States:** Clear messaging if no batches exist or if no participants require follow-up.

## Performance Considerations
- **Current Strategy:** The helper loops through batches and calls the batch report builder sequentially. Since `batch-report.ts` performs bulk SQL queries per batch, this is acceptable for MVP where organizations typically have 1-10 batches.
- **Future Scale Risk:** If an organization accumulates hundreds of batches, this sequential map-reduce pattern will become slow. 
- **Mitigation:** In the future, we should write dedicated raw SQL aggregations or cache the batch-level reports. For now, it remains real-time to guarantee data accuracy.

## What Was Deliberately NOT Implemented
- ❌ **No Schema Changes:** The dashboard relies entirely on existing relational data.
- ❌ **No Public Dashboard:** This dashboard is strictly for `ADMIN` users at `/admin/...`. Client self-serve portals are deferred to a later phase.
- ❌ **No Data Caching:** We calculate real-time to ensure admins see the immediate impact of Grant/Revoke operations.

## QA Checklist
- [ ] View an organization with no batches. Verify empty state.
- [ ] View an organization with batches but no assigned courses/participants. Verify zeros.
- [ ] View an organization with active learning data.
- [ ] Verify summary cards roll up correctly.
- [ ] Verify Follow-up items display correct reasons (`NO_USER_ACCOUNT`, `NOT_GRANTED`, `ACCESS_REVOKED`, `CERTIFICATE_NOT_ISSUED`, `LOW_PROGRESS (%)`).
- [ ] Verify clicking "Review" on a follow-up item routes to the correct batch.
- [ ] Ensure non-admins are redirected away from the page.
