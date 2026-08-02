import "server-only";

import type { HomepagePreviewRegistry } from "./types";

/**
 * HP-S5A activates only the four complete programs approved in the founder
 * revision plan. Every other group stays empty until its own evidence gate passes.
 * The server loader re-checks the canonical program source and asset manifest.
 */
export const HOMEPAGE_PREVIEW_REGISTRY = {
  courses: [],
  programs: [
    {
      recordType: "program",
      recordId: "program-index:power-bi-business-dashboard",
      source: "src/data/v2-programs.ts#power-bi-business-dashboard",
      approvedForHomepage: true,
      isDemo: false,
      claimScope: ["catalog-identity", "catalog-summary"],
      permissionStatus: "not-required",
      approvedBy: "Founder / Product Owner",
      approvedAt: "2026-08-01T00:00:00+07:00",
      approvalArtifact: "docs/skillary_homepage_preview_founder_revision_plan.md#hp-s5a--internal-asset--content-reconciliation",
      reviewAfter: "2026-11-01T00:00:00+07:00",
      destinationReviewStatus: "approved",
      notes: "Existing Skillary program with complete modules, outcomes, canonical route, and an internal illustrative cover.",
    },
    {
      recordType: "program",
      recordId: "program-index:data-driven-decision-making",
      source: "src/data/v2-programs.ts#data-driven-decision-making",
      approvedForHomepage: true,
      isDemo: false,
      claimScope: ["catalog-identity", "catalog-summary"],
      permissionStatus: "not-required",
      approvedBy: "Founder / Product Owner",
      approvedAt: "2026-08-01T00:00:00+07:00",
      approvalArtifact: "docs/skillary_homepage_preview_founder_revision_plan.md#hp-s5a--internal-asset--content-reconciliation",
      reviewAfter: "2026-11-01T00:00:00+07:00",
      destinationReviewStatus: "approved",
      notes: "Existing Skillary program with complete modules, outcomes, canonical route, and an internal illustrative cover.",
    },
    {
      recordType: "program",
      recordId: "program-index:ai-productivity-for-teams",
      source: "src/data/v2-programs.ts#ai-productivity-for-teams",
      approvedForHomepage: true,
      isDemo: false,
      claimScope: ["catalog-identity", "catalog-summary"],
      permissionStatus: "not-required",
      approvedBy: "Founder / Product Owner",
      approvedAt: "2026-08-01T00:00:00+07:00",
      approvalArtifact: "docs/skillary_homepage_preview_founder_revision_plan.md#hp-s5a--internal-asset--content-reconciliation",
      reviewAfter: "2026-11-01T00:00:00+07:00",
      destinationReviewStatus: "approved",
      notes: "Existing Skillary program with complete modules, outcomes, canonical route, and an internal illustrative cover.",
    },
    {
      recordType: "program",
      recordId: "program-index:business-presentation-reporting",
      source: "src/data/v2-programs.ts#business-presentation-reporting",
      approvedForHomepage: true,
      isDemo: false,
      claimScope: ["catalog-identity", "catalog-summary"],
      permissionStatus: "not-required",
      approvedBy: "Founder / Product Owner",
      approvedAt: "2026-08-01T00:00:00+07:00",
      approvalArtifact: "docs/skillary_homepage_preview_founder_revision_plan.md#hp-s5a--internal-asset--content-reconciliation",
      reviewAfter: "2026-11-01T00:00:00+07:00",
      destinationReviewStatus: "approved",
      notes: "Existing Skillary program with complete modules, outcomes, canonical route, and an internal illustrative cover.",
    },
  ],
  learningPaths: [],
  faculty: [],
  workshops: [],
  proof: {
    clientLogos: [],
    testimonials: [],
    outcomeMetrics: [],
    caseStudies: [],
  },
} as const satisfies HomepagePreviewRegistry;
