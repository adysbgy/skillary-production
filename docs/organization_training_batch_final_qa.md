# Organization + Training Batch — Final End-to-End QA

This document outlines the final End-to-End QA checklist for the Phase 3 MVP rollout of Organization and Training Batches.

## Setup
1. [ ] Log in as Admin.
2. [ ] Navigate to `/admin/organizations` and click **Create Organization**.
3. [ ] Create a test organization (e.g., "QA Corp").
4. [ ] Navigate to `/admin/batches` and click **Create Batch**. Link it to QA Corp.
5. [ ] On the Batch Detail page, verify the **Batch Readiness** checklist shows everything incomplete except "Organization".
6. [ ] Add a **Linked Participant** (use an email of an existing learner account).
7. [ ] Add an **Unlinked Participant** (use a dummy email like `no-account@qacorp.local`).
8. [ ] Assign a **Published Course** to the batch.
9. [ ] (Optional) Assign a Draft course to ensure it is handled gracefully by UI/Enrollment.

## Grant Access
10. [ ] Review the **Grant Access** panel pre-flight numbers. It should show 1 linked and 1 unlinked participant, estimating 1 new enrollment.
11. [ ] Click **Grant Access** and confirm the alert prompt.
12. [ ] Verify the success panel shows 1 Created and 1 Skipped No User.
13. [ ] **Idempotency Test:** Click Grant Access again. It should safely show 0 Created, 1 Skipped Existing.
14. [ ] **Paid Protection Test:** If a participant already bought the course previously (`source: PAID`), verify the script skipped them and incremented `Skipped Paid`.
15. [ ] Check the DB or Admin Enrollment list to verify the new enrollment has `source: MANUAL`.

## Learning & Reporting
16. [ ] Log out as Admin, log in as the Linked Learner.
17. [ ] Go to the assigned course and complete at least one lesson.
18. [ ] Log out as Learner, log back in as Admin.
19. [ ] Open the Batch Detail page.
20. [ ] Scroll to the **Report & Progress Summary** panel.
21. [ ] Verify the Average Progress percentage matches the learner's completion status.
22. [ ] Click **Export CSV Report**.
23. [ ] Open the downloaded CSV file.
24. [ ] Verify all 18 columns match the expected headers.
25. [ ] Verify the Unlinked Participant row shows `NO_USER` for Enrollment Status and `Yes` for Follow-up Needed.
26. [ ] Verify the Linked Participant row shows `ACTIVE` (or `PAID`) for Enrollment Status, proper Progress %, and logical Follow-up Needed status.
27. [ ] Verify Certificate Status reads existing system certificates accurately without generating false ones.

## Security Boundaries
28. [ ] Verify a non-admin account gets redirected to `/dashboard` when attempting to access `/admin/batches`.
29. [ ] Verify `POST /api/admin/batches/[id]/grant-access` throws unauthorized for non-admin.
30. [ ] Verify `GET /api/admin/batches/[id]/report.csv` throws unauthorized for non-admin.

## Regression Checks
31. [ ] **B2C Purchases:** Verify a normal user can still buy a course via the public website (Midtrans flow unaffected).
32. [ ] **Certificate Claims:** Verify learners can still claim their certificates at 100% completion (Certificate flow unaffected).
33. [ ] **Lead CRM:** Verify public contact forms still generate Leads in the admin panel.

*Note: Phase 3F completes the MVP. Any bugs discovered during this checklist should be patched immediately.*
