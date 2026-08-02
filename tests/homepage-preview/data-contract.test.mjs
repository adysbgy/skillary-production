import assert from "node:assert/strict";
import test from "node:test";

import {
  getHomepageDestinationContractViolations,
  HOMEPAGE_DESTINATIONS,
  isSafeHomepageHref,
  resolveCourseHref,
  resolveProgramHref,
} from "../../.homepage-preview-test-build/features/marketing/homepage-preview/data/homepage-preview-contract.js";
import {
  getEligibleWorkshopApprovals,
  getHomepageRegistryViolations,
  getProofFeatureGates,
} from "../../.homepage-preview-test-build/features/marketing/homepage-preview/data/homepage-preview-policy.js";
import { buildHomepagePreviewData } from "../../.homepage-preview-test-build/features/marketing/homepage-preview/data/homepage-preview-service.js";

const NOW = new Date("2026-08-01T00:00:00+07:00");

test("default HP-S1 registry is truthful, empty, payment-held, and does not read sources", async () => {
  let readCount = 0;
  const rejectUnexpectedRead = async () => {
    readCount += 1;
    throw new Error("reader must not run for an empty registry");
  };

  const result = await buildHomepagePreviewData({
    readers: {
      readCourses: rejectUnexpectedRead,
      readLearningPaths: rejectUnexpectedRead,
      readFaculty: rejectUnexpectedRead,
    },
    registry: emptyRegistry(),
    now: NOW,
  });

  assert.equal(readCount, 0);
  assert.deepEqual(
    Object.fromEntries(Object.entries(result.sections).map(([key, value]) => [key, value.status])),
    {
      courses: "empty",
      programs: "empty",
      learningPaths: "empty",
      faculty: "empty",
      workshops: "empty",
    },
  );
  assert.equal(result.sections.workshops.title, "Workshop berikutnya belum dijadwalkan.");
  assert.equal(result.sections.workshops.action.href, "/contact");
  assert.deepEqual(result.payment, { policy: "hold", onlineCheckoutAvailable: false });
  assert.equal(result.catalogPresentation.label, "Preview/Prototype");
  assert.equal(result.catalogPresentation.approvedReachableItemCount, 0);
  assert.equal(result.search.queryTracking, "disabled");
  assert.equal(result.search.dynamicEntries.length, 0);
  assert.equal(result.search.staticEntries.length, HOMEPAGE_DESTINATIONS.length);
  assert.equal(Object.values(result.proofFeatureGates).every((gate) => !gate.enabled), true);
  assert.equal(Object.values(result.conditionalProof).every((items) => items.length === 0), true);
});

test("preview payment remains on hold even when payment environment flags are present", async () => {
  const previousEnabled = process.env.PAYMENTS_ENABLED;
  const previousKey = process.env.MIDTRANS_SERVER_KEY;
  process.env.PAYMENTS_ENABLED = "true";
  process.env.MIDTRANS_SERVER_KEY = "SB-Mid-server-synthetic-test";

  try {
    const result = await buildHomepagePreviewData({
      readers: {
        readCourses: async () => [],
        readLearningPaths: async () => [],
        readFaculty: async () => [],
      },
      registry: emptyRegistry(),
      now: NOW,
    });
    assert.deepEqual(result.payment, { policy: "hold", onlineCheckoutAvailable: false });
  } finally {
    restoreEnvironment("PAYMENTS_ENABLED", previousEnabled);
    restoreEnvironment("MIDTRANS_SERVER_KEY", previousKey);
  }
});

test("approved, published, reachable records become confirmed in registry order", async () => {
  const registry = emptyRegistry({
    courses: [courseApproval("course-db-id")],
    learningPaths: [learningPathApproval("path-db-id")],
    faculty: [facultyApproval("faculty-db-id")],
    workshops: [workshopApproval("workshop-registry-id", "faculty-db-id")],
  });
  const calls = [];

  const result = await buildHomepagePreviewData({
    readers: {
      readCourses: async (ids) => {
        calls.push(["courses", [...ids]]);
        return [courseRow()];
      },
      readLearningPaths: async (ids) => {
        calls.push(["paths", [...ids]]);
        return [learningPathRow()];
      },
      readFaculty: async (ids) => {
        calls.push(["faculty", [...ids]]);
        return [facultyRow()];
      },
    },
    registry,
    now: NOW,
  });

  assert.deepEqual(calls, [
    ["courses", ["course-db-id"]],
    ["paths", ["path-db-id"]],
    ["faculty", ["faculty-db-id"]],
  ]);
  assert.equal(result.sections.courses.status, "confirmed");
  assert.equal(result.sections.learningPaths.status, "confirmed");
  assert.equal(result.sections.faculty.status, "confirmed");
  assert.equal(result.sections.workshops.status, "confirmed");
  assert.equal(result.sections.courses.items[0].href, "/program/data-analytics-fundamentals");
  assert.notEqual(result.sections.courses.items[0].href, "/program/course-db-id");
  assert.equal(result.sections.learningPaths.items[0].href, "/path/data-career-starter");
  assert.equal(result.sections.workshops.items[0].href, "/contact");
  assert.equal(result.sections.workshops.items[0].level, "Menengah");
  assert.equal(result.sections.workshops.items[0].registrationState, "interest");
  assert.equal(
    result.sections.workshops.items[0].sessionOutcome,
    "Peserta menyusun rencana analisis yang dapat ditinjau.",
  );
  assert.equal(result.sections.workshops.items[0].reviewedAt, "2026-07-31T10:00:00.000Z");
  assert.equal("price" in result.sections.workshops.items[0], false);
  assert.equal(result.search.dynamicEntries.length, 2);
  assert.equal(result.catalogPresentation.approvedReachableItemCount, 2);
  assert.equal(result.catalogPresentation.mode, "preview");
});

test("approved internal programs become a curated catalog with safe canonical destinations", async () => {
  const registry = emptyRegistry({
    programs: [programApproval("program-index:power-bi-business-dashboard")],
  });
  const result = await buildHomepagePreviewData({
    readers: {
      readCourses: async () => [],
      readPrograms: async (ids) => [programRow(ids[0])],
      readLearningPaths: async () => [],
      readFaculty: async () => [],
    },
    registry,
    now: NOW,
  });

  assert.equal(result.sections.programs.status, "confirmed");
  assert.equal(result.sections.programs.items[0].href, "/programs/power-bi-business-dashboard");
  assert.equal(result.sections.programs.items[0].thumbnailLabel, "Ilustrasi program");
  assert.equal(result.sections.programs.items[0].moduleCount, 4);
  assert.equal(result.sections.programs.items[0].outcomeCount, 4);
  assert.equal(result.search.dynamicEntries[0].kind, "program");
  assert.equal(result.catalogPresentation.approvedReachableItemCount, 1);
});

test("healthy source rows that fail publication readiness return empty, not placeholder data", async () => {
  const result = await buildHomepagePreviewData({
    readers: {
      readCourses: async () => [{ ...courseRow(), lessonCount: 0 }],
      readLearningPaths: async () => [
        { ...learningPathRow(), childCourseStatuses: ["PUBLISHED", "DRAFT"] },
      ],
      readFaculty: async () => [{ ...facultyRow(), portraitUrl: "https://example.test/photo.jpg" }],
    },
    registry: emptyRegistry({
      courses: [courseApproval("course-db-id")],
      learningPaths: [learningPathApproval("path-db-id")],
      faculty: [facultyApproval("faculty-db-id")],
    }),
    now: NOW,
  });

  assert.equal(result.sections.courses.status, "empty");
  assert.equal(result.sections.learningPaths.status, "empty");
  assert.equal(result.sections.faculty.status, "empty");
  assert.equal(result.search.dynamicEntries.length, 0);
});

test("one failed source stays unavailable while independent sources and static search survive", async () => {
  const failures = [];
  const result = await buildHomepagePreviewData({
    readers: {
      readCourses: () => {
        throw new Error("db-password=must-not-leak");
      },
      readLearningPaths: async () => [learningPathRow()],
      readFaculty: async () => [],
    },
    registry: emptyRegistry({
      courses: [courseApproval("course-db-id")],
      learningPaths: [learningPathApproval("path-db-id")],
    }),
    now: NOW,
    onSourceFailure: (failure) => failures.push(failure),
  });

  assert.equal(result.sections.courses.status, "unavailable");
  assert.equal(result.sections.courses.reason, "source-error");
  assert.equal(result.sections.learningPaths.status, "confirmed");
  assert.equal(result.search.staticEntries.length, HOMEPAGE_DESTINATIONS.length);
  assert.equal(result.search.dynamicEntries.length, 1);
  assert.equal(failures.length, 1);
  assert.equal(failures[0].source, "prisma.course");
  assert.equal(JSON.stringify(result).includes("db-password"), false);
});

test("all source failures resolve to a complete fail-soft contract", async () => {
  const fail = async () => {
    throw new Error("source unavailable");
  };
  const result = await buildHomepagePreviewData({
    readers: { readCourses: fail, readLearningPaths: fail, readFaculty: fail },
    registry: emptyRegistry({
      courses: [courseApproval("course-db-id")],
      learningPaths: [learningPathApproval("path-db-id")],
      faculty: [facultyApproval("faculty-db-id")],
      workshops: [workshopApproval("workshop-registry-id", "faculty-db-id")],
    }),
    now: NOW,
  });

  assert.equal(result.sections.courses.status, "unavailable");
  assert.equal(result.sections.learningPaths.status, "unavailable");
  assert.equal(result.sections.faculty.status, "unavailable");
  assert.equal(result.sections.workshops.status, "unavailable");
  assert.equal(result.search.entries.length, HOMEPAGE_DESTINATIONS.length);
  assert.equal(result.catalogPresentation.label, "Preview/Prototype");
});

test("a timed-out source is bounded and reported without rejecting the loader", async () => {
  const never = new Promise(() => {});
  const result = await buildHomepagePreviewData({
    readers: {
      readCourses: async () => never,
      readLearningPaths: async () => [],
      readFaculty: async () => [],
    },
    registry: emptyRegistry({ courses: [courseApproval("course-db-id")] }),
    now: NOW,
    timeoutMs: 5,
  });

  assert.equal(result.sections.courses.status, "unavailable");
  assert.equal(result.sections.courses.reason, "source-timeout");
});

test("workshop policy excludes stale, invalid, demo, unapproved, expired-review and closed records", () => {
  const valid = workshopApproval("valid", "faculty-db-id");
  const exactlyNow = { ...valid, recordId: "exactly-now", startsAt: NOW.toISOString() };
  const invalidDate = { ...valid, recordId: "invalid-date", startsAt: "not-a-date" };
  const demo = { ...valid, recordId: "demo", isDemo: true };
  const pendingPermission = {
    ...valid,
    recordId: "pending-permission",
    permissionStatus: "pending",
  };
  const expiredReview = {
    ...valid,
    recordId: "expired-review",
    reviewAfter: "2026-07-31T16:59:59.000Z",
  };
  const past = {
    ...valid,
    recordId: "past",
    startsAt: "2026-07-20T02:00:00.000Z",
    endsAt: "2026-07-20T04:00:00.000Z",
  };
  const cancelled = { ...valid, recordId: "cancelled", publishingStatus: "cancelled" };
  const finished = { ...valid, recordId: "finished", publishingStatus: "finished" };
  const unapproved = {
    ...valid,
    recordId: "unapproved",
    approvedForHomepage: false,
    permissionStatus: "pending",
    approvedBy: null,
    approvedAt: null,
    approvalArtifact: null,
    reviewAfter: null,
  };

  const eligible = getEligibleWorkshopApprovals(
    [
      valid,
      exactlyNow,
      invalidDate,
      demo,
      pendingPermission,
      expiredReview,
      past,
      cancelled,
      finished,
      unapproved,
    ],
    NOW,
  );

  assert.deepEqual(eligible.map(({ recordId }) => recordId), ["valid"]);
});

test("destination contract rejects event, payment, API, legacy, external and query destinations", () => {
  assert.deepEqual(getHomepageDestinationContractViolations(), []);
  assert.deepEqual(
    HOMEPAGE_DESTINATIONS.map(({ id, label, href, kind }) => [id, label, href, kind]),
    [
      ["program", "Program", "#program", "anchor"],
      ["workshop", "Workshop berikutnya", "#workshop", "anchor"],
      ["learning-path", "Jalur Belajar", "#jalur-belajar", "anchor"],
      ["certifications", "Sertifikasi", "/certifications", "route"],
      ["portfolio", "Portfolio", "/portofolio", "route"],
      ["faculty", "Faculty", "/trainers", "route"],
      ["resources", "Materi Gratis", "/resources", "route"],
      ["organization", "Untuk Organisasi", "/untuk-organisasi", "route"],
      ["login", "Masuk", "/login", "route"],
      ["contact", "Hubungi Skillary", "/contact", "route"],
    ],
  );
  for (const href of [
    "/events",
    "/events/example",
    "/checkout/order",
    "/api/checkout",
    "/v2/events",
    "https://example.test",
    "//example.test/path",
    "/contact?payment=1",
  ]) {
    assert.equal(isSafeHomepageHref(href), false, href);
  }
  for (const href of [
    "#program",
    "#workshop",
    "#jalur-belajar",
    "/contact",
    "/lp/homepage-preview",
    "/privacy",
    "/terms",
    "/programs/power-bi-business-dashboard",
  ]) {
    assert.equal(isSafeHomepageHref(href), true, href);
  }

  assert.equal(
    resolveCourseHref({
      recordId: "approved-id",
      slug: "safe-course-slug",
      sourceStatus: "PUBLISHED",
      approvedRecordIds: new Set(["approved-id"]),
    }),
    "/program/safe-course-slug",
  );
  assert.equal(
    resolveProgramHref({
      recordId: "program-index:power-bi-business-dashboard",
      slug: "power-bi-business-dashboard",
      sourceStatus: "PUBLISHED",
      approvedRecordIds: new Set(["program-index:power-bi-business-dashboard"]),
    }),
    "/programs/power-bi-business-dashboard",
  );
  assert.equal(
    resolveCourseHref({
      recordId: "not-approved",
      slug: "safe-course-slug",
      sourceStatus: "PUBLISHED",
      approvedRecordIds: new Set(["approved-id"]),
    }),
    null,
  );
  assert.equal(
    resolveCourseHref({
      recordId: "approved-id",
      slug: "Unsafe Slug",
      sourceStatus: "PUBLISHED",
      approvedRecordIds: new Set(["approved-id"]),
    }),
    null,
  );
});

test("proof gates require current, scoped, permission-backed evidence", () => {
  const empty = getProofFeatureGates(emptyRegistry(), NOW);
  assert.equal(Object.values(empty).every((gate) => !gate.enabled), true);

  const registry = emptyRegistry({
    proof: {
      clientLogos: [
        { ...approved("clientLogo", "logo-1", ["endorsement"]), organizationName: "Example", assetPath: "/images/example.svg" },
      ],
      testimonials: [
        { ...approved("testimonial", "quote-1", ["quote"]), quote: "Contoh terverifikasi", attributionName: "Nama", attributionRole: "Peran" },
      ],
      outcomeMetrics: [
        { ...approved("outcomeMetric", "metric-1", ["quantitative-metric", "outcome"]), label: "Penyelesaian", value: "Nilai terverifikasi", methodology: "Metode terdokumentasi", measurementPeriod: "Periode terdokumentasi" },
      ],
      caseStudies: [
        { ...approved("caseStudy", "case-1", ["case-challenge", "case-intervention", "case-result"]), title: "Kasus terverifikasi", summary: "Ringkasan yang disetujui", href: "/portofolio" },
      ],
    },
  });
  const enabled = getProofFeatureGates(registry, NOW);
  assert.equal(Object.values(enabled).every((gate) => gate.enabled), true);
});

test("proof presentation omits approver identity, notes, and approval artifacts", async () => {
  const registry = emptyRegistry({
    proof: {
      testimonials: [
        {
          ...approved("testimonial", "quote-safe", ["quote"]),
          quote: "Kutipan yang telah disetujui",
          attributionName: "Nama Publik",
          attributionRole: "Peran Publik",
        },
      ],
    },
  });
  const result = await buildHomepagePreviewData({
    readers: {
      readCourses: async () => [],
      readLearningPaths: async () => [],
      readFaculty: async () => [],
    },
    registry,
    now: NOW,
  });
  const serialized = JSON.stringify(result);

  assert.equal(result.conditionalProof.testimonials.length, 1);
  assert.equal(serialized.includes("content-owner"), false);
  assert.equal(serialized.includes("approval-artifact"), false);
  assert.equal(serialized.includes("Synthetic policy-test fixture"), false);
});

test("registry validation rejects duplicate and expired approvals", () => {
  const expired = {
    ...courseApproval("duplicate"),
    reviewAfter: "2026-07-31T16:59:59.000Z",
  };
  const registry = emptyRegistry({ courses: [expired, expired] });
  const violations = getHomepageRegistryViolations(registry, NOW);
  assert.equal(violations.some((violation) => violation.endsWith(":duplicate")), true);
  assert.equal(violations.some((violation) => violation.endsWith(":approval-not-current")), true);
});

function emptyRegistry(overrides = {}) {
  const base = {
    courses: [],
    programs: [],
    learningPaths: [],
    faculty: [],
    workshops: [],
    proof: { clientLogos: [], testimonials: [], outcomeMetrics: [], caseStudies: [] },
  };
  return {
    ...base,
    ...overrides,
    proof: { ...base.proof, ...(overrides.proof ?? {}) },
  };
}

function programApproval(recordId) {
  return {
    ...approved("program", recordId, ["catalog-identity", "catalog-summary"]),
    destinationReviewStatus: "approved",
  };
}

function approved(recordType, recordId, claimScope) {
  return {
    recordType,
    recordId,
    source: `approval-test:${recordType}:${recordId}`,
    approvedForHomepage: true,
    isDemo: false,
    claimScope,
    permissionStatus: "approved",
    approvedBy: "content-owner",
    approvedAt: "2026-07-01T00:00:00.000Z",
    approvalArtifact: `approval-artifact:${recordId}`,
    reviewAfter: "2027-08-01T00:00:00.000Z",
    notes: "Synthetic policy-test fixture; never shipped as homepage content.",
  };
}

function courseApproval(recordId) {
  return {
    ...approved("course", recordId, ["catalog-identity", "catalog-summary"]),
    destinationReviewStatus: "approved",
  };
}

function learningPathApproval(recordId) {
  return {
    ...approved("learningPath", recordId, ["catalog-identity", "catalog-summary"]),
    destinationReviewStatus: "approved",
  };
}

function facultyApproval(recordId) {
  return {
    ...approved("faculty", recordId, ["profile-identity", "portrait", "biography"]),
    consentStatus: "approved",
    photoRightsStatus: "approved",
    portraitStatus: "approved",
    destinationReviewStatus: "approved",
  };
}

function workshopApproval(recordId, hostRecordId) {
  return {
    ...approved("workshop", recordId, [
      "catalog-identity",
      "catalog-summary",
      "schedule",
      "host",
      "session-outcome",
    ]),
    slug: "future-data-workshop",
    title: "Workshop Data Mendatang",
    summary: "Sesi terjadwal dengan output yang ditinjau.",
    kind: "Workshop",
    format: "Online",
    startsAt: "2026-08-15T02:00:00.000Z",
    endsAt: "2026-08-15T04:00:00.000Z",
    timeZone: "Asia/Jakarta",
    durationMinutes: 120,
    level: "Menengah",
    sessionOutcome: "Peserta menyusun rencana analisis yang dapat ditinjau.",
    registrationState: "interest",
    reviewedAt: "2026-07-31T10:00:00.000Z",
    publishingStatus: "scheduled",
    hostRecordId,
    hostValidationStatus: "approved",
    registrationHref: "/contact",
  };
}

function courseRow() {
  return {
    id: "course-db-id",
    slug: "data-analytics-fundamentals",
    title: "Data Analytics Fundamentals",
    description: "Program terstruktur untuk memahami alur kerja analisis data.",
    level: "Pemula",
    duration: "4 minggu",
    category: "Data Analytics",
    status: "PUBLISHED",
    thumbnailUrl: "/images/programs/data-analytics.webp",
    lessonCount: 8,
  };
}

function programRow(id = "program-index:power-bi-business-dashboard") {
  return {
    id,
    slug: "power-bi-business-dashboard",
    title: "Power BI Business Dashboard",
    description: "Membangun dashboard interaktif dari data mentah hingga insight siap presentasi.",
    level: "Menengah",
    duration: "2 hari",
    category: "Data & Analytics",
    formats: ["In-house", "Hybrid"],
    status: "PUBLISHED",
    thumbnailUrl: "/images/homepage-preview/programs/power-bi-business-dashboard.webp",
    thumbnailAlt: "Ilustrasi profesional meninjau dashboard data",
    thumbnailLabel: "Ilustrasi program",
    moduleCount: 4,
    outcomeCount: 4,
  };
}

function learningPathRow() {
  return {
    id: "path-db-id",
    slug: "data-career-starter",
    title: "Data Career Starter",
    description: "Urutan program untuk memulai pembelajaran data.",
    status: "PUBLISHED",
    mode: "GUIDED",
    thumbnailUrl: null,
    childCourseStatuses: ["PUBLISHED", "PUBLISHED"],
  };
}

function facultyRow() {
  return {
    id: "faculty-db-id",
    slug: "faculty-example",
    name: "Faculty Example",
    headline: "Data facilitator",
    shortBio: "Mendampingi pembelajaran berbasis praktik.",
    portraitUrl: "/images/faculty/example.webp",
    expertise: ["Data Analytics"],
    verification: "SELECTED",
    status: "PUBLISHED",
    photoRights: "trainer_approved",
    consentedAt: "2026-06-01T00:00:00.000Z",
    publishedAt: "2026-06-10T00:00:00.000Z",
    verifiedAt: null,
    reviewDueAt: "2027-06-10T00:00:00.000Z",
  };
}

function restoreEnvironment(name, value) {
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
}
