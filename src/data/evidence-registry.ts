/** Public claims are fail-closed: only approved, unexpired evidence may render. */
export type EvidenceKind = "testimonial" | "metric" | "client-logo" | "trainer" | "event-result" | "partner";
export type ConsentStatus = "not-required" | "pending" | "approved" | "withdrawn";

export type EvidenceRecord = {
  id: string;
  kind: EvidenceKind;
  sourceReference: string;
  approvedCopy: string;
  consent: ConsentStatus;
  approvedAt?: string;
  expiresAt?: string;
  owner: string;
};

export const PUBLIC_EVIDENCE: readonly EvidenceRecord[] = [];

export function isApprovedEvidence(record: EvidenceRecord, now = new Date()): boolean {
  if (!record.approvedAt || record.consent === "pending" || record.consent === "withdrawn") return false;
  return !record.expiresAt || new Date(record.expiresAt).getTime() > now.getTime();
}

export function getApprovedEvidence(id: string, now = new Date()): EvidenceRecord | null {
  const record = PUBLIC_EVIDENCE.find((item) => item.id === id);
  return record && isApprovedEvidence(record, now) ? record : null;
}
