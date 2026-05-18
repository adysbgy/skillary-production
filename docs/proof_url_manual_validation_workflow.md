# Manual Proof Validation Workflow

## Why Manual Validation is Required

Automated link checking (via `npm run validate:proof-links`) is limited because platforms like Instagram block automated requests and redirect them to a login page (HTTP 200 `PRIVATE_OR_LOGIN_REQUIRED`). This prevents the script from knowing if a post is truly public or deleted. To ensure the integrity of Skillary's public portfolio, human validation via a web browser is required.

## How to Validate Each URL

1. Open a new Incognito / Private Browsing window.
2. Paste the proof URL.
3. If the post is visible without logging in, the status is **PUBLIC**.
4. If it redirects to a login page immediately, log in to a standard Instagram account (not a brand account with special permissions).
5. If the post is visible after logging in, the status is **LOGIN_REQUIRED**.
6. If the post shows "Account Private" or "Post Unavailable", the status is **PRIVATE** or **BROKEN**.

## Status Definitions

| Status | Meaning | Action |
|:---|:---|:---|
| **PUBLIC** | Visible in browser without any issue or login. | Safe to use in public UI. |
| **LOGIN_REQUIRED** | URL exists but Instagram requires the user to log in to view it. | Acceptable, but less ideal. |
| **PRIVATE** | Account or post is set to private. | Do not use as primary proof. Mark for review. |
| **BROKEN** | Post deleted, 404, or permanently unavailable. | Remove public link or show validation badge. |
| **NEEDS_REVIEW** | Unclear status or requires input from content owner. | Escalate. |
| **NOT_CHECKED** | Not yet reviewed manually. | Pending manual validation. |

## How to Update the Registry

1. Open `src/lib/legacy-proof-validation.ts`.
2. Locate the specific URL block in the `legacyProofManualValidation` array.
3. Update `manualStatus` to the appropriate value.
4. Update `checkedBy` with your name/initials.
5. Update `lastCheckedAt` with the current ISO date (`YYYY-MM-DD`).
6. Add context in `notes` if necessary.
7. Run `npm run generate:proof-tracker` to update the Markdown report.

## What NOT to Do

- ❌ **Do NOT scrape:** Do not manually download or save images, captions, or comments from the external source.
- ❌ **Do NOT invent replacement proof:** If a link is broken, do not fabricate a new link.
- ❌ **Do NOT remove cards without review:** The event still happened even if the digital proof is gone. Use the "Perlu validasi dokumentasi" badge instead.

## Validation Cadence

- **Before sending a proposal:** Verify proof URLs associated with the specific sector/category being pitched.
- **Before client demo:** Ensure the top case studies displayed in the demo environment have valid proof.
- **Quarterly:** Complete an end-to-end audit of all URLs in the registry to catch link decay.

## Escalation Path

If a critical proof URL (e.g., for a top case study) is marked `BROKEN` or `PRIVATE`:
1. Ask the content owner or legacy training coordinator if there is an alternative public post.
2. If offline documentation (e.g., PDF reports, photos) exists, ensure legal safety and client permission before uploading.
3. If no alternative exists, keep the portfolio card but ensure the UI displays the "Perlu validasi dokumentasi" badge to maintain honesty.
