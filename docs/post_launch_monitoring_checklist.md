# Post-Launch Monitoring Checklist

This checklist is used by the Skillary operations and engineering teams immediately following the production deployment.

## A. First 1 Hour After Deploy
- [ ] Homepage loads successfully.
- [ ] `/contact` form loads.
- [ ] Test submission on contact form succeeds.
- [ ] The submitted test lead appears in `/admin/leads`.
- [ ] Email notification for the test lead is received (if configured).
- [ ] `/portfolio` loads correctly without errors.
- [ ] `/case-studies` loads correctly without errors.
- [ ] `/resources` page loads and collateral links function.
- [ ] Admin login successfully authenticates.
- [ ] Checked Vercel deployment logs for any silent errors.
- [ ] Confirmed no 500 errors across main routes.

## B. First 24 Hours
- [ ] Review Vercel logs for any unhandled exceptions or elevated response times.
- [ ] Check `/admin/leads` for any organic entries.
- [ ] Verify Resend/Email delivery logs.
- [ ] Run a basic page speed check (e.g., Lighthouse) on the live production URL.
- [ ] Verify mobile views on physical devices (Homepage, Tables, Portfolio).
- [ ] Check 404 logs (if analytics are configured) to spot broken links.
- [ ] Perform a random test of legacy proof URLs to ensure they haven't broken.
- [ ] Export at least one collateral PDF (Sales Deck) from the live `/resources/sales-deck` route.
- [ ] Export one Batch Report CSV from the admin dashboard to ensure the backend generation works.

## C. First 7 Days
- [ ] Review all incoming organic leads.
- [ ] Categorize lead quality (Hot/Warm/Nurture/Not Fit).
- [ ] Collect initial sales team feedback regarding the clarity of the public collateral.
- [ ] Gather user/visitor feedback on website clarity (what was confusing?).
- [ ] List the top 3 most confusing sections of the site/platform.
- [ ] List the top bugs or layout breaks found by users.
- [ ] Decide priorities for the first Patch Sprint.

## D. Weekly Routine
- [ ] **Review Leads:** Analyze lead quality and volume.
- [ ] **Review Proof Links:** Run the manual proof URL validation tracker to ensure Instagram links haven't become private.
- [ ] **Review Content Claims:** Ensure the marketing narrative hasn't drifted toward fake claims or "Trusted by" unauthorized logos.
- [ ] **Review Admin Errors:** Check logs for any failed CSV imports or admin actions.
- [ ] **Update Sales Docs:** If common objections arise, update the sales playbook templates accordingly.
