export type TrainerProductionRole =
  | "subject-matter-expert"
  | "live-instructor"
  | "program-author"
  | "content-producer"
  | "assessment-designer"
  | "reviewer"
  | "content-maintainer";

export type ProductionStage =
  | "topic-proposal"
  | "commercial-review"
  | "program-brief"
  | "syllabus-review"
  | "asset-production"
  | "dry-run"
  | "pilot"
  | "quality-review"
  | "approved"
  | "self-paced-conversion"
  | "maintenance";

export const PROGRAM_PRODUCTION_REQUIREMENTS = [
  "program-brief",
  "target-persona",
  "prerequisites",
  "learning-outcomes",
  "syllabus",
  "instructor-deck",
  "facilitator-notes",
  "participant-workbook",
  "case-files",
  "practice-exercises",
  "question-bank",
  "final-assignment",
  "assessment-rubric",
  "credential-rule",
  "recording-plan",
  "maintenance-owner",
] as const;

export type ProgramProductionRequirement = (typeof PROGRAM_PRODUCTION_REQUIREMENTS)[number];

export type ProgramProductionRecord = {
  id: string;
  offerId: string;
  stage: ProductionStage;
  contributorIds: readonly string[];
  roles: readonly TrainerProductionRole[];
  completedRequirements: readonly ProgramProductionRequirement[];
  ownerId: string;
  reviewedAt?: string;
};

export function isProgramProductionReady(record: ProgramProductionRecord): boolean {
  return (
    record.stage === "approved" &&
    PROGRAM_PRODUCTION_REQUIREMENTS.every((requirement) => record.completedRequirements.includes(requirement))
  );
}
