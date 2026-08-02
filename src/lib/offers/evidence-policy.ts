export type EvidencePolicyInput = {
  status: string;
  consentStatus: string;
  approvedCopy: string | null;
  approvedAt: Date | null;
  expiresAt: Date | null;
  withdrawnAt: Date | null;
};

export function isEvidencePubliclyUsable(record: EvidencePolicyInput, now = new Date()): boolean {
  return (
    record.status === "APPROVED" &&
    (record.consentStatus === "APPROVED" || record.consentStatus === "NOT_REQUIRED") &&
    Boolean(record.approvedCopy?.trim()) &&
    Boolean(record.approvedAt) &&
    !record.withdrawnAt &&
    (!record.expiresAt || record.expiresAt > now)
  );
}
