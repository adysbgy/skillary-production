# Organization + Training Batch — Phase 3G2 (Revoke Access)

## Implementation Status: COMPLETED

Phase 3G2 introduces a safe, batch-level Access Revoke mechanism. It allows administrators to quickly cut off learning access when a training batch concludes or an organizational contract is canceled, while strictly protecting individually purchased (`PAID`) content.

## What Was Implemented

### 1. Revoke Access API (`/api/admin/batches/[id]/revoke-access`)
- `POST` route protected by `requireAdminAPI`.
- **Targeting Logic:**
  - Iterates through all active participants (who have `userId`s) and all assigned batch courses.
  - Locates the existing `Enrollment` record.
- **Safety Boundaries (NON-NEGOTIABLE):**
  - **Does NOT delete any records.** Deleting enrollments would orphan progress and certificate records.
  - **Does NOT touch `PAID` enrollments.** If an employee previously bought the course with their own money, revoking batch access will not affect their lifetime access.
  - **Strictly targets `MANUAL` enrollments.**
- **Action Taken:**
  - Sets `revokedAt = new Date()`.
  - Sets `revokedByAdminId = currentAdmin.id`.
- Returns a detailed summary of revoked items vs skipped items (PAID, No Enrollment, Already Revoked).

### 2. Access Control UI (`BatchAccessControlPanel.tsx`)
- Replaced the old `BatchGrantAccessPanel` with a unified `BatchAccessControlPanel`.
- Displays preflight statistics (Total participants, Linked accounts, Total courses).
- Explains the behavior explicitly: *"Grant Access membuat Enrollment MANUAL. Revoke Access menonaktifkan Enrollment MANUAL. Enrollment PAID dilindungi."*
- Features two distinct action buttons side-by-side: `Grant Access` and `Revoke Access` (styled distinctly in white/red).
- Requires double-confirmation on Revoke with explicit warning text.
- Displays color-coded success summaries post-execution.

### 3. Grant Access Reactivation
- The existing `Grant Access` script naturally complements the `Revoke Access` script.
- If an admin clicks "Grant Access" on a batch that was previously revoked, the script finds the `revokedAt` enrollment, nullifies `revokedAt`, and restores `source: "MANUAL"`. This makes accidental revokes perfectly recoverable.

### 4. Reporting Updates
- `BatchReportPanel.tsx` updated to explicitly style `REVOKED` enrollments with a red badge, drawing admin attention to cut-off users in the UI preview.

## What Was Deliberately NOT Implemented
- ❌ **No Schema Changes:** We still use `source: "MANUAL"` to indicate batch provenance.
- ❌ **No Automatic Revocation:** Batches do not auto-revoke on their `endDate`. This remains a deliberate admin choice.
- ❌ **No Partial Revocation:** Revoke applies to all participants and courses in the batch simultaneously. (Granular revoke must be done via the main Enrollment CRM).

## QA Checklist
- [ ] Create a batch with at least one linked participant and one course.
- [ ] Click **Grant Access** and verify success.
- [ ] Click **Revoke Access**, accept the prompt, and verify success summary shows exactly how many enrollments were revoked.
- [ ] Export the CSV report and verify the status says `REVOKED`.
- [ ] Click **Grant Access** again. Verify the success summary shows "Akses Diaktifkan Ulang" (Reactivated).
- [ ] If available, test with a user who already has a `PAID` enrollment and verify they are skipped during Revoke.

## Future Improvements
- **Audit Logs:** Record the exact batch ID during Grant/Revoke in a system-wide audit log for compliance.
- **`BATCH` Source Migration:** Eventual migration of `MANUAL` to a strict `BATCH` source enum if cross-batch tracking becomes necessary.
