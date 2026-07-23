export const OBSERVABILITY_EVENTS = [
  "system.configuration.missing","system.unhandled_error","auth.provider.unavailable","auth.error","auth.warning",
  "auth.password_reset.email_unavailable","auth.password_reset.request_failed","auth.password_reset.consume_failed",
  "entitlement.progress.denied","entitlement.progress.quiz_blocked","entitlement.progress.completed","entitlement.course.completed",
  "entitlement.quiz.denied","entitlement.quiz.attempted","entitlement.quiz.passed",
  "certificate.claim.rejected","certificate.claim.succeeded","certificate.claim.already_issued","certificate.claim.failed",
  "lead.created","lead.creation_failed","lead.notification.failed",
  "upload.failed","webhook.zoom.unavailable","webhook.zoom.attendance_failed",
] as const;
export type ObservabilityEvent = (typeof OBSERVABILITY_EVENTS)[number];
