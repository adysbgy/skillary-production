export type CertificateMode = "DISABLED" | "INCLUDED" | "PAID_DIGITAL";
export type CertificateDecision = "DISABLED"|"NOT_ENROLLED"|"NOT_COMPLETED"|"ASSESSMENT_NOT_PASSED"|"INCLUDED_READY_TO_CLAIM"|"PAYMENT_REQUIRED"|"PAYMENT_PENDING"|"PAID_READY_TO_CLAIM"|"ISSUED";
export interface CertificateFacts { mode: CertificateMode; activeEnrollment: boolean; completed: boolean; assessmentRequired: boolean; assessmentPassed: boolean; issued: boolean; paidOrder: boolean; pendingOrder: boolean; }
export function decideCertificateEligibility(f: CertificateFacts): CertificateDecision {
  if (f.mode === "DISABLED") return "DISABLED";
  if (!f.activeEnrollment) return "NOT_ENROLLED";
  if (f.issued) return "ISSUED";
  if (!f.completed) return "NOT_COMPLETED";
  if (f.assessmentRequired && !f.assessmentPassed) return "ASSESSMENT_NOT_PASSED";
  if (f.mode === "INCLUDED") return "INCLUDED_READY_TO_CLAIM";
  if (f.paidOrder) return "PAID_READY_TO_CLAIM";
  if (f.pendingOrder) return "PAYMENT_PENDING";
  return "PAYMENT_REQUIRED";
}
