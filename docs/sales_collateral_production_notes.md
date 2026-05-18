# Sales Collateral Production Notes

## 1. Overview
Due to the absence of dedicated PDF/PPTX generation libraries (e.g., Puppeteer, jsPDF, pptxgenjs) in the Next.js production bundle, we have implemented **HTML Print-Ready Fallbacks**. These are highly polished Next.js routes designed specifically to be exported as PDFs via the browser's native "Print to PDF" functionality.

## 2. Files Generated
- **Sales Deck (HTML/PDF):** `src/app/resources/sales-deck/page.tsx`
- **Company Profile (HTML/PDF):** `src/app/resources/company-profile/page.tsx`
- **Corporate Proposal (HTML/PDF):** `src/app/resources/corporate-proposal/page.tsx`

## 3. Source Markdown Files
The copy for these files was derived from:
- `docs/final_sales_deck_copy.md`
- `docs/final_company_profile_copy.md`
- `docs/final_corporate_proposal_copy.md`

## 4. Design & Claim-Safety Rules Applied
- **Colors:** Deep Navy, Warm Ivory, and Skillary Amber.
- **Layout:** A4 Portrait for Proposal/Profile, 16:9 Landscape for Sales Deck (managed via CSS `@page` rules).
- **Logos:** **ZERO** client logos used.
- **Disclaimers:** The mandatory Allman legacy disclaimer is hardcoded into the portfolio reference pages/slides.
- **Testimonials/ROI:** None. All copy strictly follows the safe, verified narrative.

## 5. How to Export to PDF
To generate the final PDFs for clients:
1. Open the route in Chrome or Edge (e.g., `localhost:3000/resources/company-profile`).
2. Press `Cmd + P` (or `Ctrl + P`).
3. Set **Destination** to "Save as PDF".
4. Set **Layout**:
   - Portrait for Profile & Proposal.
   - Landscape for Sales Deck.
5. Set **Paper Size**: A4 (or Letter).
6. Ensure **Background graphics** is CHECKED.
7. Set **Margins** to "None" (the CSS handles padding).
8. Click **Save** and store in `public/resources/` or your local drive.

## 6. Pre-Flight Manual Checklist (Before Sending)
Before emailing the generated PDF to a client, you **MUST** check:
- [ ] **Proof URLs:** Are the Instagram links referenced in your pitch still alive? (Check `docs/proof_url_manual_validation_tracker.md`).
- [ ] **Contact Info:** Have you customized the placeholder contact info in the HTML if needed?
- [ ] **Proposal Recipient:** If modifying the proposal for a specific client, ensure their name is spelled correctly.

## 7. Versioning Recommendation
Save exported PDFs with a date stamp or version number, e.g., `Skillary_Company_Profile_v1.0_2026.pdf`. Do not overwrite the same file name repeatedly to avoid client caching issues.
