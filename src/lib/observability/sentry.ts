import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
let initialized = false;

type SentryContext = Record<string, unknown>;

export function initSentry(): void {
  if (!SENTRY_DSN || initialized) return;
  Sentry.init({
    dsn: SENTRY_DSN,
    enabled: process.env.NODE_ENV === "production",
    environment: process.env.NODE_ENV,
    tracesSampleRate: 0.1,
    sendDefaultPii: false,
  });
  initialized = true;
}

export function captureException(error: unknown, context?: SentryContext): void {
  if (!SENTRY_DSN) return;
  if (context) {
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      Sentry.captureException(error);
    });
    return;
  }
  Sentry.captureException(error);
}

export function captureMessage(message: string, context?: SentryContext): void {
  if (!SENTRY_DSN) return;
  if (context) {
    Sentry.withScope((scope) => {
      scope.setExtras(context);
      Sentry.captureMessage(message);
    });
    return;
  }
  Sentry.captureMessage(message);
}
