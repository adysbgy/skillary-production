# Production Route Inventory

## 1. Public Marketing Routes
These routes are intended for public access, lead generation, and SEO visibility.
- `/` - Homepage. Should be indexed. Main CTA: Program Catalog / Proposal.
- `/about` - About Skillary & Legacy Story. Should be indexed.
- `/platform` - Core features. Should be indexed.
- `/services` - Managed learning / options. Should be indexed.
- `/program-catalog` - Training topics. Should be indexed.
- `/program/[id]` - Specific program detail. Should be indexed.
- `/demo` - Demo request form. Should be indexed.
- `/reports` - Public landing for report capabilities. Should be indexed.
- `/learning-paths` & `/path` & `/path/[slug]` - Learning journeys. Should be indexed.
- `/portfolio` - Legacy proof index. Should be indexed.
- `/case-studies` - Curated case studies. Should be indexed.
- `/resources` - Sales collateral portal. Should be indexed.
- `/proposal` - Proposal intake form. Should be indexed.
- `/contact` - General contact form. Should be indexed.
- `/training-brief` - Training brief form. Should be indexed.
- `/expert-partner` - Partner info. Should be indexed.
- `/teams` - Corporate solutions. Should be indexed.
- `/certificates` & `/certificate/[uniqueCode]` - Certificate verification. Should be indexed (index page, not necessarily individual codes if private, but usually public).
- `/thank-you` - Post-form submission. **Must be NOINDEX**.

## 2. Print-Ready Resources
These are functional HTML pages designed for PDF export via browser. They are not intended for general public browsing or SEO discovery.
- `/resources/sales-deck`
- `/resources/company-profile`
- `/resources/corporate-proposal`
- **Indexing:** Should be **NOINDEX** to prevent them from showing up as awkward standalone pages in Google search results.

## 3. Learner / User Routes
Protected by user session (not admin).
- `/login`, `/register`, `/forgot-password`, `/reset-password` - Auth flow.
- `/dashboard`, `/dashboard/courses`, `/dashboard/settings` - Learner dashboard.
- `/learn/[courseSlug]`, `/learn/[courseSlug]/[lessonSlug]` - LMS content consumption.
- `/community` - Learner community.
- `/checkout/[orderId]` - Payment flow.

## 4. Admin Routes
Strictly protected by `ADMIN` role. **Must not leak data to public or standard users.**
- `/admin` - Admin dashboard.
- `/admin/analytics`, `/admin/revenue` - High-level stats.
- `/admin/leads`, `/admin/leads/[id]` - CRM / lead management.
- `/admin/organizations`, `/admin/organizations/new`, `/admin/organizations/[id]`, `/admin/organizations/[id]/edit` - B2B Organization management.
- `/admin/batches`, `/admin/batches/new`, `/admin/batches/[id]`, `/admin/batches/[id]/edit` - Training Batch management.
- `/admin/courses/*`, `/admin/paths/*` - Content management.
- `/admin/students`, `/admin/users` - User management.

## 5. API Routes
- `/api/leads` - Public-facing POST endpoint for contact forms. Needs rate limiting and honeypot validation.
- `/api/admin/*` - Protected endpoints for admin actions (grant/revoke, batch CSV generation, etc). Must use strict session/role validation.
- `/api/upload` - File uploads. Must validate auth and mime types.
- `/api/quiz` - Assessment submission.

## Launch Risk Summary
- **Admin Exposure:** Critical risk if middleware or layout protection is missing on `/admin`.
- **Form Spam:** High risk on `/contact` and `/proposal` if `/api/leads` lacks rate limiting.
- **SEO Leakage:** Medium risk if `/thank-you` or print-ready resources are indexed, leading to poor user experience from search engines.
