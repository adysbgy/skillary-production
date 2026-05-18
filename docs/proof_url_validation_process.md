# Proof URL Validation Process

## Why Proof URL Validation Matters

Skillary's `/portfolio` and `/case-studies` pages display external proof URLs (primarily Instagram links) as documentation references for Allman's legacy training experience. These URLs can become invalid if:

- The Instagram post is deleted or archived by the account owner.
- The account is switched to private.
- Instagram changes its URL structure or access policy.
- The post is flagged or removed by the platform.

If a visitor clicks a broken proof link, it damages credibility. Running periodic validation ensures we catch these issues before they reach external stakeholders.

## How to Run

```bash
npm run validate:proof-links
```

This runs `scripts/validate_legacy_proof_links.ts` which:
1. Loads all unique proof URLs from `src/lib/legacy-portfolio.ts`
2. Sends a GET request to each (with 400ms delay between requests)
3. Classifies the response status
4. Writes reports to `docs/proof_url_validation_report.json` and `docs/proof_url_validation_report.md`

## What Statuses Mean

| Status | Meaning | Action |
|:---|:---|:---|
| `OK` | URL returned 200 | No action needed |
| `REDIRECT` | URL redirected but resolved | Review redirect destination manually |
| `PRIVATE_OR_LOGIN_REQUIRED` | Instagram returned login page or 401/403 | Verify manually in browser — may still be valid for logged-in users |
| `NOT_FOUND` | 404 response | Post likely deleted — mark for review |
| `TIMEOUT` | Request exceeded 10s | Retry later — may be transient |
| `NETWORK_ERROR` | DNS or connection failure | Check network, retry later |
| `INVALID_URL` | Malformed URL string | Fix in source data |
| `UNKNOWN` | Unexpected HTTP status | Investigate manually |

## How to Handle Broken/Private Links

1. **PRIVATE_OR_LOGIN_REQUIRED**: Open the URL in a browser while logged in to Instagram. If the post is visible, it's likely a false positive caused by Instagram blocking automated requests. Keep the link.
2. **NOT_FOUND**: The post is likely permanently deleted. Options:
   - Search for an alternative proof URL for the same event.
   - Keep the card but ensure the "Perlu validasi dokumentasi" badge is shown in the UI.
   - Do NOT remove the card entirely — the training event still happened.
3. **REDIRECT**: Instagram redirects are normal. If the redirect goes to `/accounts/login`, treat as `PRIVATE_OR_LOGIN_REQUIRED`.

## What NOT to Do

- ❌ Do NOT automatically remove proof URLs from source data.
- ❌ Do NOT replace broken links with fabricated URLs.
- ❌ Do NOT scrape Instagram images or content.
- ❌ Do NOT bypass private/login walls.
- ❌ Do NOT run this script aggressively (no parallel requests, respect delay).

## Manual Validation Checklist

After running the script:

1. Open `docs/proof_url_validation_report.md`
2. Review all entries in the "Problem URLs" table
3. For each `PRIVATE_OR_LOGIN_REQUIRED`: open in browser, verify visibility
4. For each `NOT_FOUND`: search for alternative proof or flag for badge display
5. Update source data only if you have a verified replacement URL

## Recommended Validation Cadence

| When | Why |
|:---|:---|
| Before outreach / sales pitch | Ensure all public proof links work during a demo |
| Before proposal / deck delivery | Verify portfolio page integrity before sending to prospects |
| Quarterly | Catch gradual link decay from deleted or archived posts |
