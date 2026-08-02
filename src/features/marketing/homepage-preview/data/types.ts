export type HomepageRecordType =
  | "course"
  | "program"
  | "learningPath"
  | "faculty"
  | "workshop"
  | "clientLogo"
  | "testimonial"
  | "outcomeMetric"
  | "caseStudy";

export type HomepagePermissionStatus =
  | "not-required"
  | "approved"
  | "pending"
  | "denied"
  | "expired";
export type HomepageApprovalStatus = "approved" | "pending" | "rejected";

interface HomepageApprovalRecordCommon<TRecordType extends HomepageRecordType> {
  recordType: TRecordType;
  recordId: string;
  source: string;
  isDemo: boolean;
  claimScope: readonly string[];
  notes: string;
}

export type HomepageApprovalRecord<TRecordType extends HomepageRecordType> =
  HomepageApprovalRecordCommon<TRecordType> &
    (
      | {
          approvedForHomepage: false;
          permissionStatus: HomepagePermissionStatus;
          approvedBy: null;
          approvedAt: null;
          approvalArtifact: string | null;
          reviewAfter: string | null;
        }
      | {
          approvedForHomepage: true;
          permissionStatus: "approved" | "not-required";
          approvedBy: string;
          approvedAt: string;
          approvalArtifact: string;
          reviewAfter: string;
        }
    );

export type CourseApprovalRecord = HomepageApprovalRecord<"course"> & {
  destinationReviewStatus: HomepageApprovalStatus;
};

export type ProgramApprovalRecord = HomepageApprovalRecord<"program"> & {
  destinationReviewStatus: HomepageApprovalStatus;
};

export type LearningPathApprovalRecord = HomepageApprovalRecord<"learningPath"> & {
  destinationReviewStatus: HomepageApprovalStatus;
};

export type FacultyApprovalRecord = HomepageApprovalRecord<"faculty"> & {
  consentStatus: HomepageApprovalStatus;
  photoRightsStatus: HomepageApprovalStatus;
  portraitStatus: HomepageApprovalStatus;
  destinationReviewStatus: HomepageApprovalStatus;
};

export type WorkshopPublishingStatus = "draft" | "scheduled" | "cancelled" | "finished";

export type WorkshopApprovalRecord = HomepageApprovalRecord<"workshop"> & {
  slug: string;
  title: string;
  summary: string;
  kind: string;
  format: string;
  startsAt: string;
  endsAt: string;
  timeZone: string;
  durationMinutes: number;
  level: string;
  sessionOutcome: string;
  registrationState: "interest";
  reviewedAt: string;
  publishingStatus: WorkshopPublishingStatus;
  hostRecordId: string;
  hostValidationStatus: HomepageApprovalStatus;
  registrationHref: "/contact";
};

export type ClientLogoApprovalRecord = HomepageApprovalRecord<"clientLogo"> & {
  organizationName: string;
  assetPath: string;
};

export type TestimonialApprovalRecord = HomepageApprovalRecord<"testimonial"> & {
  quote: string;
  attributionName: string;
  attributionRole: string;
};

export type OutcomeMetricApprovalRecord = HomepageApprovalRecord<"outcomeMetric"> & {
  label: string;
  value: string;
  methodology: string;
  measurementPeriod: string;
};

export type CaseStudyApprovalRecord = HomepageApprovalRecord<"caseStudy"> & {
  title: string;
  summary: string;
  href: string;
};

export interface HomepagePreviewRegistry {
  courses: readonly CourseApprovalRecord[];
  programs: readonly ProgramApprovalRecord[];
  learningPaths: readonly LearningPathApprovalRecord[];
  faculty: readonly FacultyApprovalRecord[];
  workshops: readonly WorkshopApprovalRecord[];
  proof: {
    clientLogos: readonly ClientLogoApprovalRecord[];
    testimonials: readonly TestimonialApprovalRecord[];
    outcomeMetrics: readonly OutcomeMetricApprovalRecord[];
    caseStudies: readonly CaseStudyApprovalRecord[];
  };
}

export interface CourseSourceRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  category: string;
  status: string;
  thumbnailUrl: string | null;
  lessonCount: number;
}

export interface ProgramSourceRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  category: string;
  formats: readonly string[];
  status: "PUBLISHED";
  thumbnailUrl: string;
  thumbnailAlt: string;
  thumbnailLabel: "Ilustrasi program";
  moduleCount: number;
  outcomeCount: number;
}

export interface LearningPathSourceRow {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: string;
  mode: string;
  thumbnailUrl: string | null;
  childCourseStatuses: readonly string[];
}

export type HomepageDateValue = Date | string | null;

export interface FacultySourceRow {
  id: string;
  slug: string;
  name: string;
  headline: string;
  shortBio: string;
  portraitUrl: string | null;
  expertise: readonly string[];
  verification: string;
  status: string;
  photoRights: string | null;
  consentedAt: HomepageDateValue;
  publishedAt: HomepageDateValue;
  verifiedAt: HomepageDateValue;
  reviewDueAt: HomepageDateValue;
}

export type HomepageCategory =
  | "data-analytics"
  | "ai-digital"
  | "presentation-communication"
  | "leadership"
  | "process-quality"
  | "other";

export interface HomepagePreviewReaders {
  readCourses(recordIds: readonly string[]): Promise<readonly CourseSourceRow[]>;
  readPrograms?(recordIds: readonly string[]): Promise<readonly ProgramSourceRow[]>;
  readLearningPaths(recordIds: readonly string[]): Promise<readonly LearningPathSourceRow[]>;
  readFaculty(recordIds: readonly string[]): Promise<readonly FacultySourceRow[]>;
}

export type HomepageSourceId =
  | "prisma.course"
  | "manual.programIndex"
  | "prisma.learningPath"
  | "prisma.trainerProfile"
  | "manual.workshopRegistry";

export interface HomepageItemProvenance {
  recordType: HomepageRecordType;
  recordId: string;
  source: string;
  approvedAt: string;
  reviewAfter: string;
  claimScope: readonly string[];
}

export interface HomepageCourseCard {
  kind: "course";
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  category: HomepageCategory;
  categoryLabel: string;
  format: "Self-paced";
  thumbnailUrl: string | null;
  href: `/program/${string}`;
  actionLabel: "Lihat detail";
  provenance: HomepageItemProvenance;
}

export interface HomepageProgramCard {
  kind: "program";
  id: string;
  slug: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  category: HomepageCategory;
  categoryLabel: string;
  formats: readonly string[];
  moduleCount: number;
  outcomeCount: number;
  thumbnailUrl: string;
  thumbnailAlt: string;
  thumbnailLabel: "Ilustrasi program";
  href: `/programs/${string}`;
  actionLabel: "Lihat detail";
  provenance: HomepageItemProvenance;
}

export interface HomepageLearningPathCard {
  kind: "learningPath";
  id: string;
  slug: string;
  title: string;
  description: string;
  mode: "GUIDED" | "SEQUENTIAL";
  courseCount: number;
  thumbnailUrl: string | null;
  href: `/path/${string}`;
  actionLabel: "Lihat jalur";
  provenance: HomepageItemProvenance;
}

export interface HomepageFacultyCard {
  kind: "faculty";
  id: string;
  slug: string;
  name: string;
  headline: string;
  shortBio: string;
  portraitUrl: string;
  expertise: readonly string[];
  verificationLabel: "Selected" | "Verified";
  href: `/trainers/${string}`;
  actionLabel: "Lihat profil";
  provenance: HomepageItemProvenance;
}

export interface HomepageWorkshopCard {
  kind: "workshop";
  id: string;
  slug: string;
  title: string;
  summary: string;
  workshopKind: string;
  format: string;
  startsAt: string;
  endsAt: string;
  timeZone: string;
  durationMinutes: number;
  level: string;
  sessionOutcome: string;
  registrationState: "interest";
  reviewedAt: string;
  host: HomepageFacultyCard;
  href: "/contact";
  actionLabel: "Daftar minat";
  provenance: HomepageItemProvenance;
}

export interface HomepageClientLogoItem {
  kind: "clientLogo";
  id: string;
  organizationName: string;
  assetPath: string;
  provenance: HomepageItemProvenance;
}

export interface HomepageTestimonialItem {
  kind: "testimonial";
  id: string;
  quote: string;
  attributionName: string;
  attributionRole: string;
  provenance: HomepageItemProvenance;
}

export interface HomepageOutcomeMetricItem {
  kind: "outcomeMetric";
  id: string;
  label: string;
  value: string;
  methodology: string;
  measurementPeriod: string;
  provenance: HomepageItemProvenance;
}

export interface HomepageCaseStudyItem {
  kind: "caseStudy";
  id: string;
  title: string;
  summary: string;
  href: string;
  provenance: HomepageItemProvenance;
}

export interface HomepageSafeAction {
  label: string;
  href: string;
  intent: "learn-more" | "register-interest" | "contact";
}

export type HomepageEmptyReason =
  | "no-approved-records"
  | "no-eligible-records"
  | "no-upcoming-workshops";

export type HomepageUnavailableReason = "source-error" | "source-timeout";

interface HomepageSectionBase {
  source: HomepageSourceId;
  checkedAt: string;
  approvedRecordCount: number;
}

export interface HomepageConfirmedSection<TItem> extends HomepageSectionBase {
  status: "confirmed";
  items: readonly TItem[];
}

export interface HomepageEmptySection extends HomepageSectionBase {
  status: "empty";
  items: readonly [];
  reason: HomepageEmptyReason;
  title: string;
  message: string;
  action: HomepageSafeAction;
}

export interface HomepageUnavailableSection extends HomepageSectionBase {
  status: "unavailable";
  items: readonly [];
  reason: HomepageUnavailableReason;
  title: string;
  message: string;
  action: HomepageSafeAction;
}

export type HomepageSectionState<TItem> =
  | HomepageConfirmedSection<TItem>
  | HomepageEmptySection
  | HomepageUnavailableSection;

export type HomepageProofFeature =
  | "clientLogos"
  | "testimonials"
  | "outcomeMetrics"
  | "caseStudies";

export interface HomepageProofFeatureGate {
  enabled: boolean;
  approvedItemCount: number;
  reason: "approved-evidence" | "no-approved-evidence";
}

export type HomepageDestinationKind = "anchor" | "route";

export interface HomepageDestination {
  id: string;
  label: string;
  href: string;
  kind: HomepageDestinationKind;
  searchAliases: readonly string[];
}

export type HomepageSearchUiState = "idle" | "loading" | "results" | "empty" | "unavailable";

export interface HomepageSearchEntry {
  id: string;
  label: string;
  description: string;
  href: string;
  kind: "destination" | "course" | "program" | "learningPath";
  keywords: readonly string[];
}

export interface HomepageSearchIndex {
  queryTracking: "disabled";
  staticEntries: readonly HomepageSearchEntry[];
  dynamicEntries: readonly HomepageSearchEntry[];
  entries: readonly HomepageSearchEntry[];
  dynamicSourceStatus: {
    courses: HomepageSectionState<HomepageCourseCard>["status"];
    programs: HomepageSectionState<HomepageProgramCard>["status"];
    learningPaths: HomepageSectionState<HomepageLearningPathCard>["status"];
  };
}

export interface HomepageCatalogPresentation {
  mode: "preview" | "catalog";
  label: "Preview/Prototype" | "Katalog terkurasi";
  approvedReachableItemCount: number;
  minimumCatalogItemCount: 3;
}

export interface HomepagePreviewData {
  contractVersion: "HP-S9P.1";
  generatedAt: string;
  payment: {
    policy: "hold";
    onlineCheckoutAvailable: false;
  };
  destinations: readonly HomepageDestination[];
  searchUiStates: readonly HomepageSearchUiState[];
  search: HomepageSearchIndex;
  catalogPresentation: HomepageCatalogPresentation;
  sections: {
    courses: HomepageSectionState<HomepageCourseCard>;
    programs: HomepageSectionState<HomepageProgramCard>;
    learningPaths: HomepageSectionState<HomepageLearningPathCard>;
    faculty: HomepageSectionState<HomepageFacultyCard>;
    workshops: HomepageSectionState<HomepageWorkshopCard>;
  };
  conditionalProof: {
    clientLogos: readonly HomepageClientLogoItem[];
    testimonials: readonly HomepageTestimonialItem[];
    outcomeMetrics: readonly HomepageOutcomeMetricItem[];
    caseStudies: readonly HomepageCaseStudyItem[];
  };
  proofFeatureGates: Record<HomepageProofFeature, HomepageProofFeatureGate>;
}

export interface HomepageSourceFailure {
  source: Exclude<HomepageSourceId, "manual.workshopRegistry">;
  reason: HomepageUnavailableReason;
  cause: unknown;
}

export interface BuildHomepagePreviewDataOptions {
  readers: HomepagePreviewReaders;
  registry: HomepagePreviewRegistry;
  now: Date;
  timeoutMs?: number;
  onSourceFailure?: (failure: HomepageSourceFailure) => void;
}
