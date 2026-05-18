# Lead CRM Production QA Checklist

## Pre-Test Requirements
- [ ] `npm run build` passes
- [ ] `npx tsc --noEmit` passes
- [ ] Database is synced (`npx prisma db push`)

## Submission Tests

### 1. Normal Lead Submission
- [ ] Open `/contact`
- [ ] Fill all fields with valid data
- [ ] Submit
- [ ] Verify success message appears
- [ ] Verify lead appears in `/admin/leads`
- [ ] Verify Formspree email received (if configured)
- [ ] Verify Resend notification email received (if `RESEND_API_KEY` + `LEAD_NOTIFICATION_EMAIL` configured)

### 2. Prefilled Lead Submission
- [ ] Open `/contact?type=in-house&program=ai-future-skills&source=program-catalog`
- [ ] Verify inquiry type is prefilled
- [ ] Verify message mentions program name
- [ ] Submit
- [ ] Verify `programInterest` and `sourcePage` stored in DB lead

### 3. Rate Limit Test
- [ ] Submit 5 leads in quick succession
- [ ] Verify 6th submission returns 429 error
- [ ] Verify error message: "Terlalu banyak pengiriman..."
- [ ] Wait 10 minutes and verify submissions work again

### 4. Honeypot Spam Test
- [ ] Send direct POST to `/api/leads` with `_honeypot: "spam"` filled
- [ ] Verify response is `201 { ok: true }` (fake acceptance)
- [ ] Verify NO lead was actually stored in DB

### 5. URL Spam Test
- [ ] Send POST to `/api/leads` with message containing 5+ URLs
- [ ] Verify response is `201 { ok: true }` (fake acceptance)
- [ ] Verify NO lead was actually stored in DB

## Admin Tests

### 6. Summary Cards
- [ ] Open `/admin/leads`
- [ ] Verify 6 summary cards: New, Contacted, Proposal Needed, Proposal Sent, Won, Total Active
- [ ] Click a card and verify it filters the table

### 7. Analytics Panels
- [ ] Verify "By Inquiry Type" panel shows breakdown
- [ ] Verify "Top Source Pages" panel shows top 5
- [ ] Verify "Top Programs" panel shows top 5 (or placeholder)

### 8. Filters
- [ ] Filter by status
- [ ] Filter by inquiry type
- [ ] Search by name/email/org
- [ ] Toggle "Archived" checkbox
- [ ] Click "Reset" to clear filters

### 9. CSV Export
- [ ] Click "Export CSV" button
- [ ] Verify CSV downloads
- [ ] Open CSV and verify:
  - All 17 columns present
  - Lifecycle timestamp columns included
  - Data matches admin table
  - CSV encoding is correct (no broken characters)

### 10. Lead Detail & Status Update
- [ ] Open a lead detail page
- [ ] Verify contact info, inquiry details, timeline, message
- [ ] Change status to CONTACTED
- [ ] Save and verify `lastContactedAt` is populated
- [ ] Change status to PROPOSAL_SENT
- [ ] Save and verify `proposalSentAt` is populated
- [ ] Change status to WON
- [ ] Save and verify `wonAt` is populated

### 11. Archive/Restore
- [ ] Archive a lead from detail page
- [ ] Verify lead is hidden from default list
- [ ] Enable "Archived" checkbox in filters
- [ ] Verify archived lead appears with faded style + badge
- [ ] Open archived lead detail
- [ ] Restore lead
- [ ] Verify lead reappears in default list

### 12. Access Control
- [ ] Verify non-admin user cannot access `/admin/leads`
- [ ] Verify non-admin user cannot access `/api/admin/leads`
- [ ] Verify non-admin user cannot access `/api/admin/leads/export`
- [ ] Verify public user CAN submit to `/api/leads` (no auth required)

## Email Notification Tests (If Configured)

### 13. Notification Content
- [ ] Verify email subject format: "New Skillary Lead: [Type] — [Org/Name]"
- [ ] Verify email contains all lead data fields
- [ ] Verify "View in Lead CRM →" link works
- [ ] Verify email renders correctly in Gmail/Outlook

### 14. Notification Fallback
- [ ] Remove `RESEND_API_KEY` env var
- [ ] Submit lead
- [ ] Verify lead still saves successfully
- [ ] Verify no email errors in response
