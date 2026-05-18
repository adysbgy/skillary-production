# Corporate Training MVP — Regression QA

This document outlines the full end-to-end Quality Assurance and Regression testing flow for the Skillary Corporate Training MVP (Phases 3A - 3G3).

## Setup
1. **Run demo seed:** Run `npm run seed:corporate-demo` to ensure safe dummy data is available.
2. **Login as admin:** Sign into the application using an admin account.
3. **Open Organizations:** Navigate to `/admin/organizations`.
4. **Open Demo Dashboard:** Click on **"Skillary Demo Organization"**.

## Organization Dashboard
5. **Verify summary cards:** Ensure the total batches, active batches, participants, and progress metrics display correctly and are not `NaN`.
6. **Verify batch performance table:** Confirm that the 3 demo batches ("Data Productivity", "AI for Work", "Leadership Communication") appear with correct formats and statuses.
7. **Verify follow-up panel:** Ensure the "Perlu Perhatian" panel lists unlinked participants (`unlinked.a@skillary.demo`) with the `NO_USER_ACCOUNT` reason.

## Batch Management
8. **Open Demo Batch — Data Productivity:** Click `Manage →` on the batch from the dashboard.
9. **Verify readiness checklist:** Confirm the checklist correctly identifies that participants exist and courses are assigned.
10. **Verify participants panel:** Check that "Demo Learner 1" and "Demo Learner 2" are marked as "Linked".
11. **Verify courses panel:** Ensure "[DEMO] Data Productivity Fundamentals" is listed.
12. **Verify grant/revoke panel:** Ensure the Access Control panel calculates the correct number of unlinked vs linked participants.
13. **Verify report panel:** Confirm the preview table renders without crashing and shows enrollment statuses.

## Participants
14. **Add manual participant:** Click `+ Tambah Manual` and add `test.qa@skillary.demo`. Verify it appears in the table.
15. **Import CSV participant sample:** Download the template, or use `sample_batch_participants.csv`, and upload it. Verify the success modal reports the exact number of created/skipped rows.
16. **Verify linked/unlinked user states:** Ensure any user without an existing account shows as "Not Registered".
17. **Remove participant:** Click `Remove` on `test.qa@skillary.demo`. Verify the status changes to `REMOVED`.

## Courses
18. **Assign course:** Add another course to the batch. Verify it appears.
19. **Prevent duplicate course:** Attempt to add the exact same course again. Verify the system rejects it gracefully.
20. **Remove course:** Click remove on the newly added course and confirm it disappears.

## Access Control (Entitlement)
21. **Grant access:** Click **Grant Access** in the Access Control panel. Confirm success.
22. **Verify Enrollment source:** In the report preview, confirm the status shows `ACTIVE`. (Behind the scenes, this is `source: MANUAL`).
23. **Revoke access:** Click **Revoke Access**. Confirm the warning dialogue appears. Proceed.
24. **Verify revokedAt set:** In the report preview, confirm the status now shows `REVOKED` (highlighted in red).
25. **Grant again:** Click **Grant Access** again to restore access.
26. **Verify revokedAt cleared:** Confirm the status returns to `ACTIVE`.
27. **Verify PAID enrollment protected:** If a participant already bought the course previously (source: PAID), verify that clicking Revoke Access explicitly skips them in the result summary.

## Learner Auth & Completion (Simulated)
28. **Login as demo learner:** Open an incognito window and login using `demo.learner3@skillary.demo` with password `DemoSkillary123!`.
29. **Open assigned course:** Verify the learner can access the course *only after* Admin has clicked Grant Access for the batch.
30. **Complete lesson if available:** Navigate through the course and mark a lesson as completed.
31. **Return to admin:** Go back to the Admin Dashboard.
32. **Verify progress in batch report:** Ensure the "Progress %" column reflects the exact completion percentage of the learner.
33. **Export CSV:** Confirm the exported report matches the real-time activity of the learner.

## Report & Export
34. **Verify progress %:** Check that average progress is calculating properly based on the seeded lesson completions.
35. **Export CSV:** Click `⬇ Export CSV Report`.
36. **Confirm columns:** Open the CSV and verify it contains columns: `Participant Name`, `Email`, `Course Title`, `Enrollment Status`, `Progress %`, `Follow-up Needed`.

## Security & API
31. **Non-admin blocked:** Attempt to access `/admin/batches` logged in as a normal user. Ensure redirect to dashboard.
32. **Public users blocked:** Attempt to hit `/api/admin/batches/[id]/report.csv` from an incognito window. Ensure a `401 Unauthorized` response.
33. **APIs use requireAdminAPI:** Confirm all new `POST` and `PATCH` routes successfully reject unauthorized calls.

## Global Regression
34. **Contact form:** Ensure public website contact routes are untouched.
35. **Lead CRM:** Ensure `/admin/leads` still lists corporate inquiries correctly.
36. **Course detail:** Ensure public `/explore` and `/learn/[slug]` still render course content.
37. **Certificate flow:** Ensure `Certificate` generation models were not broken.
38. **Payment routes:** Ensure `PaymentOrder` webhooks and checkout routes continue to build and function normally.
