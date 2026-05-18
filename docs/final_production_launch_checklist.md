# Final Production Launch Checklist

This checklist must be reviewed by the deployment team immediately before and after deploying Skillary to the production environment.

## A. Pre-Launch Configuration
- [ ] **Environment Variables Set:** Ensure `DATABASE_URL`, `AUTH_SECRET`, `NEXTAUTH_URL`, and `RESEND_API_KEY` are configured in the Vercel/Production dashboard.
- [ ] **Database Connectivity:** Verify the production database is accessible and migrations (`npx prisma migrate deploy`) have been applied.
- [ ] **Admin Account Exists:** Ensure at least one `ADMIN` account exists in the production database (run seed manually if entirely fresh, or create via direct DB access).
- [ ] **Email Provider Verified:** Verify the Resend domain is verified to ensure lead notifications don't bounce.
- [ ] **Sitemap & Robots:** Confirmed that `sitemap.xml` includes all public pages and `robots.txt` excludes `/admin` and print-ready resources.
- [ ] **Claim Safety Check:** Confirmed no unauthorized logos, fake ROI, or "Trusted by" claims exist in the public UI.
- [ ] **Print Collateral Exported:** The sales team has exported the latest `/resources/sales-deck` etc., to PDF.
- [ ] **Demo Seed Disabled:** Ensure `npm run seed:corporate-demo` is **NOT** run on the production database to avoid polluting live metrics.

## B. Smoke Testing (Live Environment)
- [ ] **Homepage:** Loads correctly, hero text scales appropriately on mobile.
- [ ] **Contact/Proposal Form:** Submit a test lead to ensure it saves to the database.
- [ ] **Portfolio & Case Studies:** Filter buttons work, external proof URLs correctly open (or show "PRIVATE").
- [ ] **Resources:** Links to print-ready documents function correctly.
- [ ] **Admin Login:** Successfully log in using an `ADMIN` account.
- [ ] **Admin Leads:** The test lead submitted above appears in the `/admin/leads` dashboard.
- [ ] **Admin Organizations & Batches:** Can view the B2B dashboard.
- [ ] **Grant/Revoke Access:** Manually grant and revoke access for a test user in a batch.
- [ ] **Report CSV:** Download a Batch Report CSV and verify the file opens correctly.

## C. Post-Launch Monitoring
- [ ] **Check Lead Notification:** Did the internal sales team receive the email for the test lead?
- [ ] **Check Vercel Logs:** Look for any silent 500 errors or unhandled exceptions in the deployment logs.
- [ ] **Check Route Indexing:** Submit `sitemap.xml` to Google Search Console.
- [ ] **Monitor 404s:** Watch for any broken links in the first 48 hours.
- [ ] **Backup Database:** Ensure automated backups are enabled on the production Postgres provider.
- [ ] **Review First 5 Leads:** Manually verify the first real organic leads to ensure data integrity.

## D. Rollback Protocol
If a catastrophic failure occurs (e.g., database crash, severe admin leakage):
- [ ] **Revert Deployment:** Instantly rollback to the previous stable commit via Vercel dashboard.
- [ ] **Disable Contact CTA:** If the lead API is broken, temporarily change "Minta Proposal" buttons to `mailto:hello@skillary.id`.
- [ ] **Preserve Data:** Do NOT run destructive DB commands during a panic rollback.
- [ ] **Communicate Internally:** Alert the sales and L&D teams of the temporary downtime.
