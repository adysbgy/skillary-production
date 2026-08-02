import { isSafeHomepageHref, isSafeHomepageSlug } from "./homepage-preview-contract";
import type {
  CaseStudyApprovalRecord,
  ClientLogoApprovalRecord,
  CourseApprovalRecord,
  FacultyApprovalRecord,
  HomepageApprovalRecord,
  HomepagePreviewRegistry,
  HomepageProofFeature,
  HomepageProofFeatureGate,
  HomepageRecordType,
  LearningPathApprovalRecord,
  OutcomeMetricApprovalRecord,
  ProgramApprovalRecord,
  TestimonialApprovalRecord,
  WorkshopApprovalRecord,
} from "./types";

const COURSE_CLAIMS = ["catalog-identity", "catalog-summary"] as const;
const FACULTY_CLAIMS = ["profile-identity", "portrait", "biography"] as const;
const WORKSHOP_CLAIMS = [
  "catalog-identity",
  "catalog-summary",
  "schedule",
  "host",
  "session-outcome",
] as const;
const CASE_STUDY_CLAIMS = ["case-challenge", "case-intervention", "case-result"] as const;

export function isApprovalCurrent(
  record: HomepageApprovalRecord<HomepageRecordType>,
  now: Date,
): record is HomepageApprovalRecord<HomepageRecordType> & {
  approvedForHomepage: true;
  approvedBy: string;
  approvedAt: string;
  approvalArtifact: string;
  reviewAfter: string;
} {
  if (
    !record.approvedForHomepage ||
    record.isDemo ||
    (record.permissionStatus !== "approved" && record.permissionStatus !== "not-required") ||
    !record.recordId.trim() ||
    !record.source.trim() ||
    !record.approvedBy.trim() ||
    !record.approvalArtifact.trim() ||
    !record.notes.trim() ||
    record.claimScope.length === 0
  ) {
    return false;
  }

  const approvedAt = timestamp(record.approvedAt);
  const reviewAfter = timestamp(record.reviewAfter);
  const nowTime = now.getTime();

  return (
    Number.isFinite(nowTime) &&
    approvedAt !== null &&
    reviewAfter !== null &&
    approvedAt <= nowTime &&
    reviewAfter > nowTime &&
    reviewAfter > approvedAt
  );
}

export function getEligibleCourseApprovals(
  records: readonly CourseApprovalRecord[],
  now: Date,
): readonly CourseApprovalRecord[] {
  return deduplicate(
    records.filter(
      (record) =>
        isApprovalCurrent(record, now) &&
        record.destinationReviewStatus === "approved" &&
        hasClaims(record.claimScope, COURSE_CLAIMS),
    ),
  );
}

export function getEligibleProgramApprovals(
  records: readonly ProgramApprovalRecord[],
  now: Date,
): readonly ProgramApprovalRecord[] {
  return deduplicate(
    records.filter(
      (record) =>
        isApprovalCurrent(record, now) &&
        record.destinationReviewStatus === "approved" &&
        hasClaims(record.claimScope, COURSE_CLAIMS),
    ),
  );
}

export function getEligibleLearningPathApprovals(
  records: readonly LearningPathApprovalRecord[],
  now: Date,
): readonly LearningPathApprovalRecord[] {
  return deduplicate(
    records.filter(
      (record) =>
        isApprovalCurrent(record, now) &&
        record.destinationReviewStatus === "approved" &&
        hasClaims(record.claimScope, COURSE_CLAIMS),
    ),
  );
}

export function getEligibleFacultyApprovals(
  records: readonly FacultyApprovalRecord[],
  now: Date,
): readonly FacultyApprovalRecord[] {
  return deduplicate(
    records.filter(
      (record) =>
        isApprovalCurrent(record, now) &&
        record.consentStatus === "approved" &&
        record.photoRightsStatus === "approved" &&
        record.portraitStatus === "approved" &&
        record.destinationReviewStatus === "approved" &&
        hasClaims(record.claimScope, FACULTY_CLAIMS),
    ),
  );
}

export function getEligibleWorkshopApprovals(
  records: readonly WorkshopApprovalRecord[],
  now: Date,
): readonly WorkshopApprovalRecord[] {
  const nowTime = now.getTime();

  return deduplicate(
    records.filter((record) => {
      const startsAt = timestamp(record.startsAt);
      const endsAt = timestamp(record.endsAt);
      const reviewedAt = timestamp(record.reviewedAt);

      return (
        isApprovalCurrent(record, now) &&
        record.publishingStatus === "scheduled" &&
        record.hostValidationStatus === "approved" &&
        record.registrationHref === "/contact" &&
        record.registrationState === "interest" &&
        record.timeZone === "Asia/Jakarta" &&
        isSafeHomepageSlug(record.slug) &&
        record.durationMinutes > 0 &&
        record.durationMinutes <= 24 * 60 &&
        Number.isInteger(record.durationMinutes) &&
        [
          record.title,
          record.summary,
          record.kind,
          record.format,
          record.level,
          record.sessionOutcome,
          record.hostRecordId,
        ].every((value) => value.trim().length > 0) &&
        startsAt !== null &&
        endsAt !== null &&
        reviewedAt !== null &&
        reviewedAt <= nowTime &&
        startsAt > nowTime &&
        endsAt > startsAt &&
        hasClaims(record.claimScope, WORKSHOP_CLAIMS)
      );
    }),
  );
}

export function getProofFeatureGates(
  registry: HomepagePreviewRegistry,
  now: Date,
): Record<HomepageProofFeature, HomepageProofFeatureGate> {
  const eligible = getEligibleProofRecords(registry, now);
  const counts: Record<HomepageProofFeature, number> = {
    clientLogos: eligible.clientLogos.length,
    testimonials: eligible.testimonials.length,
    outcomeMetrics: eligible.outcomeMetrics.length,
    caseStudies: eligible.caseStudies.length,
  };

  return {
    clientLogos: gateFromCount(counts.clientLogos),
    testimonials: gateFromCount(counts.testimonials),
    outcomeMetrics: gateFromCount(counts.outcomeMetrics),
    caseStudies: gateFromCount(counts.caseStudies),
  };
}

export function getEligibleProofRecords(registry: HomepagePreviewRegistry, now: Date) {
  return {
    clientLogos: deduplicate(
      registry.proof.clientLogos.filter((record) => isEligibleClientLogo(record, now)),
    ),
    testimonials: deduplicate(
      registry.proof.testimonials.filter((record) => isEligibleTestimonial(record, now)),
    ),
    outcomeMetrics: deduplicate(
      registry.proof.outcomeMetrics.filter((record) => isEligibleOutcomeMetric(record, now)),
    ),
    caseStudies: deduplicate(
      registry.proof.caseStudies.filter((record) => isEligibleCaseStudy(record, now)),
    ),
  } as const;
}

export function getHomepageRegistryViolations(
  registry: HomepagePreviewRegistry,
  now: Date,
): string[] {
  const violations: string[] = [];
  const groups: ReadonlyArray<{
    key: string;
    expectedType: HomepageRecordType;
    records: readonly HomepageApprovalRecord<HomepageRecordType>[];
  }> = [
    { key: "courses", expectedType: "course", records: registry.courses },
    { key: "programs", expectedType: "program", records: registry.programs },
    { key: "learningPaths", expectedType: "learningPath", records: registry.learningPaths },
    { key: "faculty", expectedType: "faculty", records: registry.faculty },
    { key: "workshops", expectedType: "workshop", records: registry.workshops },
    { key: "proof.clientLogos", expectedType: "clientLogo", records: registry.proof.clientLogos },
    { key: "proof.testimonials", expectedType: "testimonial", records: registry.proof.testimonials },
    { key: "proof.outcomeMetrics", expectedType: "outcomeMetric", records: registry.proof.outcomeMetrics },
    { key: "proof.caseStudies", expectedType: "caseStudy", records: registry.proof.caseStudies },
  ];

  for (const group of groups) {
    const ids = new Set<string>();
    for (const record of group.records) {
      const prefix = `${group.key}:${record.recordId || "<missing>"}`;
      if (record.recordType !== group.expectedType) violations.push(`${prefix}:record-type`);
      if (!record.recordId.trim()) violations.push(`${prefix}:record-id`);
      if (!record.source.trim()) violations.push(`${prefix}:source`);
      if (!record.notes.trim()) violations.push(`${prefix}:notes`);
      if (record.claimScope.length === 0) violations.push(`${prefix}:claim-scope`);
      if (ids.has(record.recordId)) violations.push(`${prefix}:duplicate`);
      if (record.approvedForHomepage && !isApprovalCurrent(record, now)) {
        violations.push(`${prefix}:approval-not-current`);
      }
      ids.add(record.recordId);
    }
  }

  return violations;
}

export function isSafeLocalAssetPath(path: string): boolean {
  return (
    path.startsWith("/") &&
    !path.startsWith("//") &&
    !path.includes("..") &&
    !path.includes("\\") &&
    !path.includes("?") &&
    !path.includes("#")
  );
}

function isEligibleClientLogo(record: ClientLogoApprovalRecord, now: Date): boolean {
  return (
    isApprovalCurrent(record, now) &&
    record.organizationName.trim().length > 0 &&
    isSafeLocalAssetPath(record.assetPath) &&
    record.claimScope.includes("endorsement")
  );
}

function isEligibleTestimonial(record: TestimonialApprovalRecord, now: Date): boolean {
  return (
    isApprovalCurrent(record, now) &&
    record.quote.trim().length > 0 &&
    record.attributionName.trim().length > 0 &&
    record.attributionRole.trim().length > 0 &&
    record.claimScope.includes("quote")
  );
}

function isEligibleOutcomeMetric(record: OutcomeMetricApprovalRecord, now: Date): boolean {
  return (
    isApprovalCurrent(record, now) &&
    record.label.trim().length > 0 &&
    record.value.trim().length > 0 &&
    record.methodology.trim().length > 0 &&
    record.measurementPeriod.trim().length > 0 &&
    record.claimScope.includes("quantitative-metric") &&
    record.claimScope.includes("outcome")
  );
}

function isEligibleCaseStudy(record: CaseStudyApprovalRecord, now: Date): boolean {
  return (
    isApprovalCurrent(record, now) &&
    record.title.trim().length > 0 &&
    record.summary.trim().length > 0 &&
    isSafeHomepageHref(record.href) &&
    hasClaims(record.claimScope, CASE_STUDY_CLAIMS)
  );
}

function hasClaims(claimScope: readonly string[], required: readonly string[]): boolean {
  return required.every((claim) => claimScope.includes(claim));
}

function deduplicate<TRecord extends { recordId: string }>(records: readonly TRecord[]): readonly TRecord[] {
  const seen = new Set<string>();
  return records.filter((record) => {
    if (seen.has(record.recordId)) return false;
    seen.add(record.recordId);
    return true;
  });
}

function gateFromCount(approvedItemCount: number): HomepageProofFeatureGate {
  return approvedItemCount > 0
    ? { enabled: true, approvedItemCount, reason: "approved-evidence" }
    : { enabled: false, approvedItemCount: 0, reason: "no-approved-evidence" };
}

function timestamp(value: string): number | null {
  const result = Date.parse(value);
  return Number.isFinite(result) ? result : null;
}
