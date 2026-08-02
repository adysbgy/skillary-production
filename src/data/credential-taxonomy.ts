export type CredentialType = "participation-certificate" | "completion-certificate" | "assessed-badge" | "partner-certification";

export type CredentialPolicy = {
  type: CredentialType;
  verifiesCompetency: boolean;
  requiresAttendance: boolean;
  requiresCompletion: boolean;
  requiresAssessment: boolean;
  printable: boolean;
  shareableToLinkedIn: boolean;
  requiresEvidence: boolean;
};

export const CREDENTIAL_POLICIES: Record<CredentialType, CredentialPolicy> = {
  "participation-certificate": {
    type: "participation-certificate",
    verifiesCompetency: false,
    requiresAttendance: true,
    requiresCompletion: false,
    requiresAssessment: false,
    printable: true,
    shareableToLinkedIn: false,
    requiresEvidence: false,
  },
  "completion-certificate": {
    type: "completion-certificate",
    verifiesCompetency: false,
    requiresAttendance: false,
    requiresCompletion: true,
    requiresAssessment: false,
    printable: true,
    shareableToLinkedIn: true,
    requiresEvidence: false,
  },
  "assessed-badge": {
    type: "assessed-badge",
    verifiesCompetency: true,
    requiresAttendance: false,
    requiresCompletion: true,
    requiresAssessment: true,
    printable: true,
    shareableToLinkedIn: true,
    requiresEvidence: true,
  },
  "partner-certification": {
    type: "partner-certification",
    verifiesCompetency: true,
    requiresAttendance: false,
    requiresCompletion: false,
    requiresAssessment: true,
    printable: true,
    shareableToLinkedIn: true,
    requiresEvidence: true,
  },
};
