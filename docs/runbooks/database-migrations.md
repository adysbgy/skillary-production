# Production database migrations

Application builds and database migrations are separate operations.

## Application build

```bash
npm run build
```

This generates Prisma Client and builds Next.js. It must not change the database schema.

## Migration workflow

1. Create and test a Prisma migration in development.
2. Review generated SQL for destructive operations.
3. Back up the target database.
4. Apply and validate in staging.
5. Obtain explicit approval for production.
6. Run:

```bash
npm run db:migrate:deploy
```

7. Verify migration status:

```bash
npm run db:migrate:status
```

8. Run route and data-integrity smoke checks.

Do not use `prisma db push --accept-data-loss` in CI or production. Destructive migrations require a dedicated plan, backup, explicit consent, and rollback procedure.
