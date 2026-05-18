# Demo Seed Data Safety Guidelines

## Purpose
The `seed:corporate-demo` script is designed to populate a local development or staging environment with realistic, B2B corporate training data (Organizations, Batches, Participants, Courses, and Enrollments) for QA regression and live product demonstrations.

## Production Guard
The script contains a hardcoded environment check:
```typescript
if (process.env.NODE_ENV === "production") {
  // Abort
}
```
**This script will NOT run in a production environment.** This guarantees that real production databases are never polluted with demo users or fake organizational data.

## Demo Naming Conventions
To ensure demo data is never accidentally presented as real client proof (which violates our internal integrity policies), all generated data adheres to the following conventions:
- **Emails:** Uses `@skillary.demo` or `@skillary.test` domains.
- **Names:** Prefixed or explicitly containing `Demo` (e.g., `Skillary Demo Organization`, `Demo Learner 1`).
- **Course Titles:** Prefixed with `[DEMO]`.
- **Notes:** Contains explicit warnings: `DEMO DATA — not a real client.`

## How to Run
```bash
npm run seed:corporate-demo
```
The script uses `upsert` where possible to remain idempotent. Running it multiple times will not create duplicates of the core demo entities.

## What It Does NOT Create
- **No PAID Enrollments:** To avoid interfering with actual payment testing, the script only seeds `MANUAL` enrollments.
- **No Payment Orders:** The script does not touch the payment gateway logs or tables.
- **No Certificates:** To avoid PDF generation overhead during seeding, certificates are left empty (testing the `NOT_ISSUED` follow-up logic).
- **No Admin Users:** It does not change existing admin access.

## Demo Learner Credentials
The script seeds test users representing corporate learners. Their passwords are automatically hashed with `bcryptjs` using standard salt rounds, making them fully compatible with the existing auth logic.

**Credentials:**
- Email: `demo.learner1@skillary.demo` (100% progress simulated)
- Email: `demo.learner2@skillary.demo` (Partial progress simulated)
- Email: `demo.learner3@skillary.demo` (No progress)
- Password (for all): `DemoSkillary123!`

**WARNING:** These credentials are for local/staging environment QA only. If this seed is run in a shared staging environment accessible by external parties, you must immediately reset these passwords or restrict staging access to authorized IP ranges.

## Cleanup
If you need to clean up this data, you must manually delete the records matching the `@skillary.demo` pattern or drop your local development database. The script does not include an auto-teardown function to prevent accidental deletion of non-demo data.
