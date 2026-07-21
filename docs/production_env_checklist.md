# Production Environment Variables Checklist

This checklist defines the environment variables required to safely deploy Skillary to a production environment (e.g., Vercel).

## Core Requirements

### `DATABASE_URL` (Required)
- **Purpose:** Connection string for the PostgreSQL database (e.g., Neon, Supabase, AWS RDS).
- **Format:** `postgres://user:password@host:port/database`
- **Failure Behavior:** Build will fail during Prisma client generation, or the application will crash on any database read/write.

### `AUTH_SECRET` (Required)
- **Purpose:** Cryptographic key used by Auth.js to encrypt session cookies and tokens.
- **Format:** Random 32-byte string (Generate via `npx auth secret` or `openssl rand -base64 32`).
- **Compatibility:** `NEXTAUTH_SECRET` may remain temporarily during migration, but it must match `AUTH_SECRET`. New environments should use `AUTH_SECRET`.
- **Failure Behavior:** Login flows will fail or throw server errors.

### `AUTH_URL` / canonical host (Recommended)
- **Purpose:** Canonical application origin for redirects and OAuth callbacks. Vercel can infer the production host, but the intended origin must be documented.
- **Production origin:** `https://skillary.my.id`
- **Google redirect URI:** `https://skillary.my.id/api/auth/callback/google`
- **Compatibility:** If `NEXTAUTH_URL` remains during migration, it must equal the canonical production origin.
- **Failure Behavior:** OAuth callbacks may use an old domain or fail provider validation.

### `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` (Required for Google login)
- **Google authorized origin:** `https://skillary.my.id`
- **Google authorized redirect URI:** `https://skillary.my.id/api/auth/callback/google`
- **Security:** Never expose either value to browser bundles or logs.

## Integrations

### `RESEND_API_KEY` (Optional but Recommended)
- **Purpose:** API key for Resend to send transactional emails (e.g., Lead notifications, password resets).
- **Format:** `re_...`
- **Failure Behavior:** If missing, the `notifyNewLead` function safely catches the error. The lead is still saved to the CRM, and the user sees a success screen, but internal teams will not receive an email alert.

### `LEAD_NOTIFICATION_EMAIL` (Optional)
- **Purpose:** The internal destination email address that receives alerts when a new prospect fills out the `/contact` or `/proposal` form.
- **Format:** Valid email address (e.g., `sales@skillary.id`).
- **Failure Behavior:** If missing, notifications may default to a hardcoded fallback or fail silently.

## Seed Configuration (Optional)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_NAME`
- **Purpose:** Used only if running `npx tsx prisma/seed.ts` in production to provision the initial admin account. Should not be required for the Next.js runtime.

---
⚠️ **Security Warning:** Never expose production secrets in client-side bundles. Ensure no sensitive key is prefixed with `NEXT_PUBLIC_` unless it is explicitly designed for public browser access.
