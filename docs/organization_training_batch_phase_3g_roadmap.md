# Phase 3G Roadmap — Batch Enhancements

With the Phase 3 MVP completed (Phases 3A - 3F), Skillary now supports basic B2B batch management. However, several enterprise features were deliberately deferred to ensure safety and speed of delivery.

This roadmap outlines the recommended next enhancements for the Organization + Training Batch module.

## Priority 1: High Impact, Low Risk

These features directly improve operational efficiency for admins without requiring major database migrations.

### 1. Participant CSV Import (✅ IMPLEMENTED IN PHASE 3G1)
- **Purpose:** Allow admins to upload an Excel/CSV file of participant emails and names to populate a batch instantly.
- **Value:** Saves massive amounts of time compared to manual entry for 50+ participants.
- **Status:** Completed. Includes safe parser, deduplication, auto-linking, and UI error tables.

### 2. Batch Access Revoke (✅ IMPLEMENTED IN PHASE 3G2)
- **Purpose:** Add a "Revoke Access" button next to "Grant Access" that updates `revokedAt` for batch enrollments.
- **Value:** Closes the loop on batch management if an organization cancels or a batch date passes.
- **Status:** Completed. Safely targets `MANUAL` enrollments, updates `revokedAt`, and protects `PAID` enrollments.

### 3. Organization Dashboard (✅ IMPLEMENTED IN PHASE 3G3)
- **Purpose:** Transform the organization detail page into a rolled-up analytics dashboard for all batches under the organization.
- **Value:** Gives admins an immediate health check on B2B clients, highlighting top participants needing follow-up.
- **Status:** Completed. Includes summary metrics, batch performance table, and top follow-up alerts based on existing report logic.

## Priority 2: Core Data Upgrades

These features require database migrations and careful data governance updates.

### 3. Dedicated `BATCH` Enrollment Source
- **Purpose:** Add `BATCH` to the `Enrollment.source` enum and migrate batch-granted `MANUAL` enrollments to `BATCH`. Add a `batchId` foreign key to `Enrollment` for strict provenance tracking.
- **Value:** Complete data safety. It explicitly links learning progress to a specific batch event.
- **Risk:** High. Requires modifying Prisma enums and relations across core LMS logic.

### 4. Report Filters & Sorting
- **Purpose:** Add UI toggles to filter the Batch Report (e.g., "Show only Follow-up Needed", "Show only Completed").
- **Value:** Makes large reports (100+ rows) actionable inside the Admin dashboard without requiring an Excel export.
- **Risk:** Low. Purely frontend filtering of the aggregated report data.

## Priority 3: B2B Enterprise Enhancements

These features transition the platform from "Admin Managed" to "Client Facing".

### 5. Participant Invitation Emails
- **Purpose:** Automatically send "Welcome to Skillary" or "You've been added to a Batch" emails (via Resend) when unlinked participants are added to a batch, containing a magic link to register.
- **Value:** Solves the unlinked participant gap proactively.
- **Risk:** Medium. Requires email template setup and token generation.

### 6. Batch Dashboard Analytics (Charts)
- **Purpose:** Replace simple summary cards with Recharts graphs showing progress distribution curves and assessment scores over time.
- **Value:** Impresses B2B buyers during demos; provides better at-a-glance insight.
- **Risk:** Low frontend addition.

### 7. Manager/Client Report Portal
- **Purpose:** Create a secure, read-only dashboard (`/client/[orgId]`) where the client's HR manager can view their batches and download CSV reports themselves.
- **Value:** True B2B SaaS capability. Reduces admin support overhead.
- **Risk:** High. Requires implementing a new B2B Auth Role (e.g., `CLIENT_MANAGER`) and restricting data access strictly to their organization's batches.

### 8. Batch-Level Certificate Policy
- **Purpose:** Allow custom signatures or organization logos on certificates generated for specific batches.
- **Value:** High value upsell for corporate training.
- **Risk:** High. Touches the core certificate PDF generation backend.

---

## Recommended Next Action
Begin Phase 3G by implementing **Participant CSV Import** followed immediately by **Batch Access Revoke**, keeping the data model stable while vastly improving admin operational speed.
