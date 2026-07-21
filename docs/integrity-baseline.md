# Production Integrity Baseline

Recorded: 2026-07-21
Scope: I0 read-only baseline. Values were never printed or stored.

## Local configuration presence

| Capability | Present locally | Notes |
|---|---:|---|
| Auth secrets | Yes | Both Auth.js/legacy names present; values not inspected |
| Google OAuth client | Yes | Real callback still requires user-controlled browser test |
| App URL | Legacy `NEXTAUTH_URL` only | `NEXT_PUBLIC_APP_URL` absent locally despite runtime consumers |
| Database URLs | Yes | No query or mutation performed |
| Midtrans keys/environment | No | Course UI/API currently fall back to sandbox/unconfigured behavior |
| Resend | No | Email paths may degrade/fail locally |
| Zoom credentials/webhook secret | No | Event fulfillment cannot be validated locally |

## Production configuration status

Unknown from repository/local files. Must be verified read-only in Vercel/Google/Midtrans dashboards by an authorized owner without sharing values.

## Runtime inconsistencies requiring I2/I3 review

- Course checkout API and browser SDK are hard-coded to Midtrans sandbox.
- Certificate checkout infers environment from key shape and Node environment.
- Event checkout uses `MIDTRANS_ENV`.
- Callback handlers do not explicitly compare callback amount with stored order amount.
- Event paid status can be persisted before fulfillment succeeds.
- Raw gateway payloads are stored and ad-hoc console logging remains.
- OAuth automatic matching-email linking is enabled and requires an explicit policy decision.

## Existing controls confirmed in source

- Authenticated course/certificate order creation.
- Server-derived price.
- Object-owner check on course order retrieval.
- SHA-512 notification signatures.
- Central enrollment/content authorization.
- Quiz and sequential lesson checks.
- Certificate eligibility state machine and database uniqueness constraints.

## Protected workspace changes

The following pre-existing local work was not modified or staged:

- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `public/images/skillary_footer_bg.png`

## Outstanding ownership decisions

- Midtrans sandbox vs production intent and account owner.
- Google Cloud OAuth config owner and designated non-admin test identity.
- Observability provider and retention.
- GitHub Actions approval.
- Policy for late settlement after failed/expired status.
- Retry/escalation policy for paid-but-unfulfilled orders.
