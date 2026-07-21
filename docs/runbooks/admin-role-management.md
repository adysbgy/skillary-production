# Admin role management

## Approved workflow

Administrative roles may only be changed by an existing authenticated ADMIN through the Admin Users screen or `PATCH /api/admin/users`.

The API protects against self-demotion and demoting the final admin, validates the target role, and records `ROLE_CHANGE` through the audit log.

## Initial admin / recovery

Never add a public bootstrap endpoint or hard-coded secret. For a new or recovered environment:

1. Identify the target user and verify ownership out of band.
2. Back up the database.
3. Use a one-time operator-controlled database command from an authenticated deployment environment.
4. Verify the resulting admin list.
5. Record the operator, target, reason, and timestamp in the incident/change record.
6. Rotate any credentials exposed during recovery.

## Verification

- Anonymous requests to `/api/admin/users` return 401.
- Instructor requests return 401/403.
- Admin role changes create an audit event.
- `/api/admin/bootstrap` always returns 410 and never reads or writes the database.
