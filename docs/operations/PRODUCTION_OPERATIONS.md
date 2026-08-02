# Skillary Production Operations Standard

## Environment isolation

| Runtime | Database/Storage | Providers | Data policy |
|---|---|---|---|
| Local | dedicated development project | sandbox/disabled | synthetic only |
| Vercel Preview | dedicated staging project | sandbox | anonymized fixtures |
| Production | production project | approved production credentials | real data |

Preview deployments must never receive production database, Storage service-role, payment,
Zoom, email audience, or webhook credentials.

## Production requirements

- Supabase Pro before paid launch.
- Vercel `DATABASE_URL` uses Supavisor transaction pooling; migration connection remains direct.
- `resources` bucket is private; `thumbnails` and approved marketing `images` may be public.
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are mandatory.
- `CRON_SECRET`, `ZOOM_WEBHOOK_SECRET_TOKEN`, and `HEALTHCHECK_SECRET` are independent random secrets.
- `PAYMENTS_ENABLED=false` and `CANONICAL_OFFERS_ENABLED=false` until separate approval.
- PostHog/GA4 remain disabled until browser consent.

## SLO and alerting baseline

| Signal | Initial objective | Alert |
|---|---:|---|
| Public availability | 99.9% monthly | two failed checks in 5 minutes |
| API p95 excluding providers | <500 ms | >750 ms for 10 minutes |
| Checkout callback success | 99.95% | any sustained failure or signature rejection spike |
| Reminder attempt completion | >99% | failed run or dead-letter item |
| Database readiness | 100% expected | immediate production page |

Monitor `GET /api/health/live` publicly. Monitor `GET /api/health/ready` using
`Authorization: Bearer $HEALTHCHECK_SECRET`. Never place that secret in a URL.

## Deployment and rollback

1. Merge only after required CI checks pass.
2. Apply migrations to staging; run smoke and compatibility checks.
3. Confirm backup/restore point and named rollback owner.
4. Deploy production application before activating new readers/flags.
5. Verify liveness, protected readiness, login, lead, entitlement, and admin authorization.
6. Activate a feature flag separately only after QA.
7. On regression, disable the feature flag first, then roll back the deployment.
8. Never use a destructive database rollback without founder approval and verified restore point.

## Disaster recovery

Initial targets: RPO <=24 hours and RTO <=4 hours. Before scaled paid operations, target
RPO <=1 hour through PITR.

Quarterly drill:

1. Restore the latest production backup into an isolated recovery project.
2. Restore/export Storage objects separately; database backups do not cover Storage.
3. validate schema, row counts, login, entitlement, resource download, and certificate lookup.
4. Record actual RPO/RTO and missing objects.
5. Destroy the isolated recovery copy only after evidence review and explicit approval.

## Incident response

1. **Detect:** alert, Sentry, provider dashboard, security report, or readiness failure.
2. **Contain:** disable affected feature flag/provider, rotate exposed credentials, block abusive keys.
3. **Preserve:** retain redacted logs, release SHA, request IDs, timestamps, and provider event IDs.
4. **Recover:** rollback or restore; replay only idempotent callbacks/jobs.
5. **Communicate:** name incident owner, severity, user impact, and next update time.
6. **Review:** timeline, root cause, corrective action, owner, deadline, and verification evidence.

Never log authorization headers, cookies, passwords, email/phone, payment payloads, webinar
join URLs, signed Storage URLs, service-role keys, or webhook raw bodies.

## Secret rotation

Rotate immediately after suspected exposure and at least annually for dormant credentials.
Use provider-specific overlap where available. Validate new credentials in staging, rotate
production, verify readiness, then revoke the old credential.
