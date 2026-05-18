# Organization + Training Batch — Phase 3G1 (CSV Import)

## Implementation Status: COMPLETED

Phase 3G1 introduces a robust, safe CSV import tool for adding batch participants in bulk. It significantly speeds up admin operations for B2B cohorts while strictly adhering to data safety boundaries.

## What Was Implemented

### 1. CSV Parsing Utility (`src/lib/csv-import.ts`)
- Implemented a lightweight, dependency-free CSV parser.
- Safely handles quoted strings, commas inside quotes, Windows (`CRLF`) and Unix (`LF`) line endings.
- Provides header mapping and required-column validation.

### 2. CSV Template Endpoint (`/api/admin/batches/[id]/participants/template.csv`)
- `GET` route protected by `requireAdminAPI`.
- Returns a strict `skillary-batch-participants-template.csv` template.
- Required columns: `name`, `email`.
- Optional columns: `whatsapp`, `role`, `notes`.

### 3. CSV Import Endpoint (`/api/admin/batches/[id]/participants/import`)
- `POST` route accepting `multipart/form-data`.
- **Validation Rules:**
  - Enforces a maximum of 500 rows.
  - Rejects empty files or missing required headers.
  - Uses `batchParticipantCreateSchema` to validate each row.
- **Deduplication Logic:**
  - Skips duplicate emails found within the uploaded CSV file itself.
  - Skips emails already existing in the `BatchParticipant` table for the target batch.
- **Auto-Linking:**
  - Queries `User` by email for each valid row. If a match exists, assigns the `userId` to the participant immediately.
- **Error Handling:**
  - Invalid rows (e.g., malformed email, missing name) are skipped.
  - Returns a detailed breakdown containing `created`, `linkedUsers`, `skippedDuplicates`, `skippedExisting`, and an array of `errors` (row number, email, reason) without failing the entire import.

### 4. Import UI (`BatchParticipantsPanel.tsx`)
- Added an "Import CSV" section togglable from the Participants header.
- Includes a direct "Download Template" link.
- Modern file input.
- Displays a clear summary block showing execution results (Created, Linked, Skipped).
- Displays a scrollable error table for any rejected rows.
- Automatically refreshes the participant table and parent readiness stats upon success.

## What Was Deliberately NOT Implemented
- ❌ **No User Account Creation:** If an email doesn't exist in the `User` table, the participant is created as "Not Registered". They will not receive access until they register.
- ❌ **No Auto-Enrollment:** Importing participants does not grant them course access. Admin must still explicitly click "Grant Access" after import.
- ❌ **No Participant Updating:** Existing participants are skipped, not overwritten. If an admin needs to update an email or role, they must use the inline Edit feature.
- ❌ **No Invitation Emails:** The system does not automatically email imported users yet.

## Next Phase Options
1. **Batch Access Revoke:** Adding a button to revoke `MANUAL` enrollments safely.
2. **Participant Updates via CSV:** Modifying the import script to upsert data instead of skipping.
3. **Invitation Emails:** Integrating Resend to email unlinked participants automatically.

## QA Checklist
- [ ] View batch detail.
- [ ] Open "Import CSV" panel.
- [ ] Click "Download Template" and verify columns.
- [ ] Upload a file with > 500 rows. Verify rejection.
- [ ] Upload a file missing the `email` header. Verify rejection.
- [ ] Upload a valid file containing 1 existing user email, 1 new email, 1 duplicate email inside the file, and 1 malformed email.
- [ ] Verify the success panel correctly reports the created count, linked user count, skipped duplicate count, and displays the malformed email error row.
- [ ] Verify the table refreshes and shows the new participants.
- [ ] Click "Grant Access" and verify it correctly grants access *only* to the linked user from the CSV.
