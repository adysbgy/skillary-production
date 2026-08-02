import {
  emptyReasonFor,
  getSourceCopy,
  HOMEPAGE_DESTINATIONS,
  HOMEPAGE_PAYMENT_POLICY,
  HOMEPAGE_PREVIEW_CONTRACT_VERSION,
  HOMEPAGE_SEARCH_UI_STATES,
  HOMEPAGE_STATIC_SEARCH_ENTRIES,
  resolveCourseHref,
  resolveFacultyHref,
  resolveLearningPathHref,
  resolveProgramHref,
  unavailableReason,
} from "./homepage-preview-contract";
import {
  getEligibleCourseApprovals,
  getEligibleFacultyApprovals,
  getEligibleLearningPathApprovals,
  getEligibleProgramApprovals,
  getEligibleProofRecords,
  getEligibleWorkshopApprovals,
  getProofFeatureGates,
  isSafeLocalAssetPath,
} from "./homepage-preview-policy";
import type {
  BuildHomepagePreviewDataOptions,
  CourseApprovalRecord,
  CourseSourceRow,
  FacultyApprovalRecord,
  FacultySourceRow,
  HomepageApprovalRecord,
  HomepageCaseStudyItem,
  HomepageCategory,
  HomepageClientLogoItem,
  HomepageConfirmedSection,
  HomepageCourseCard,
  HomepageEmptySection,
  HomepageFacultyCard,
  HomepageItemProvenance,
  HomepageLearningPathCard,
  HomepageOutcomeMetricItem,
  HomepagePreviewData,
  HomepageProgramCard,
  HomepageRecordType,
  HomepageSearchEntry,
  HomepageSectionState,
  HomepageSourceFailure,
  HomepageSourceId,
  HomepageTestimonialItem,
  HomepageUnavailableSection,
  HomepageWorkshopCard,
  LearningPathApprovalRecord,
  LearningPathSourceRow,
  ProgramApprovalRecord,
  ProgramSourceRow,
  WorkshopApprovalRecord,
} from "./types";

const DEFAULT_SOURCE_TIMEOUT_MS = 1_500;
const MAX_SOURCE_TIMEOUT_MS = 5_000;
const ALLOWED_PHOTO_RIGHTS = new Set([
  "trainer_uploaded",
  "trainer_approved",
  "skillary_produced",
]);

class HomepageSourceTimeoutError extends Error {
  constructor() {
    super("Homepage source timed out");
    this.name = "HomepageSourceTimeoutError";
  }
}

export async function buildHomepagePreviewData(
  options: BuildHomepagePreviewDataOptions,
): Promise<HomepagePreviewData> {
  const now = options.now;
  const checkedAt = safeIso(now);
  const timeoutMs = normalizeTimeout(options.timeoutMs);

  const courseApprovals = getEligibleCourseApprovals(options.registry.courses, now);
  const programApprovals = getEligibleProgramApprovals(options.registry.programs, now);
  const learningPathApprovals = getEligibleLearningPathApprovals(
    options.registry.learningPaths,
    now,
  );
  const facultyApprovals = getEligibleFacultyApprovals(options.registry.faculty, now);

  const sourcePromises = [
    readApprovedSource(
      courseApprovals,
      () => options.readers.readCourses(courseApprovals.map(({ recordId }) => recordId)),
      timeoutMs,
    ),
    readApprovedSource(
      programApprovals,
      () => {
        if (!options.readers.readPrograms) {
          throw new Error("Program index reader is not configured");
        }
        return options.readers.readPrograms(
          programApprovals.map(({ recordId }) => recordId),
        );
      },
      timeoutMs,
    ),
    readApprovedSource(
      learningPathApprovals,
      () =>
        options.readers.readLearningPaths(
          learningPathApprovals.map(({ recordId }) => recordId),
        ),
      timeoutMs,
    ),
    readApprovedSource(
      facultyApprovals,
      () => options.readers.readFaculty(facultyApprovals.map(({ recordId }) => recordId)),
      timeoutMs,
    ),
  ] as const;

  const [courseResult, programResult, learningPathResult, facultyResult] = await Promise.allSettled(
    sourcePromises,
  );

  const courses = resolveCourseSection({
    result: courseResult,
    approvals: courseApprovals,
    checkedAt,
    onSourceFailure: options.onSourceFailure,
  });
  const programs = resolveProgramSection({
    result: programResult,
    approvals: programApprovals,
    checkedAt,
    onSourceFailure: options.onSourceFailure,
  });
  const learningPaths = resolveLearningPathSection({
    result: learningPathResult,
    approvals: learningPathApprovals,
    checkedAt,
    onSourceFailure: options.onSourceFailure,
  });
  const faculty = resolveFacultySection({
    result: facultyResult,
    approvals: facultyApprovals,
    checkedAt,
    now,
    onSourceFailure: options.onSourceFailure,
  });
  const workshops = resolveWorkshopSection({
    approvals: getEligibleWorkshopApprovals(options.registry.workshops, now),
    faculty,
    checkedAt,
  });
  const proofRecords = getEligibleProofRecords(options.registry, now);
  const conditionalProof = {
    clientLogos: proofRecords.clientLogos.flatMap(
      (record): HomepageClientLogoItem[] =>
        record.approvedForHomepage
          ? [
              {
                kind: "clientLogo",
                id: record.recordId,
                organizationName: record.organizationName.trim(),
                assetPath: record.assetPath,
                provenance: provenanceFrom(record),
              },
            ]
          : [],
    ),
    testimonials: proofRecords.testimonials.flatMap(
      (record): HomepageTestimonialItem[] =>
        record.approvedForHomepage
          ? [
              {
                kind: "testimonial",
                id: record.recordId,
                quote: record.quote.trim(),
                attributionName: record.attributionName.trim(),
                attributionRole: record.attributionRole.trim(),
                provenance: provenanceFrom(record),
              },
            ]
          : [],
    ),
    outcomeMetrics: proofRecords.outcomeMetrics.flatMap(
      (record): HomepageOutcomeMetricItem[] =>
        record.approvedForHomepage
          ? [
              {
                kind: "outcomeMetric",
                id: record.recordId,
                label: record.label.trim(),
                value: record.value.trim(),
                methodology: record.methodology.trim(),
                measurementPeriod: record.measurementPeriod.trim(),
                provenance: provenanceFrom(record),
              },
            ]
          : [],
    ),
    caseStudies: proofRecords.caseStudies.flatMap(
      (record): HomepageCaseStudyItem[] =>
        record.approvedForHomepage
          ? [
              {
                kind: "caseStudy",
                id: record.recordId,
                title: record.title.trim(),
                summary: record.summary.trim(),
                href: record.href,
                provenance: provenanceFrom(record),
              },
            ]
          : [],
    ),
  } as const;

  const dynamicSearchEntries = [
    ...searchEntriesFromCourses(courses),
    ...searchEntriesFromPrograms(programs),
    ...searchEntriesFromLearningPaths(learningPaths),
  ];
  const approvedReachableItemCount =
    (courses.status === "confirmed" ? courses.items.length : 0) +
    (programs.status === "confirmed" ? programs.items.length : 0) +
    (learningPaths.status === "confirmed" ? learningPaths.items.length : 0);

  return {
    contractVersion: HOMEPAGE_PREVIEW_CONTRACT_VERSION,
    generatedAt: checkedAt,
    payment: {
      policy: HOMEPAGE_PAYMENT_POLICY.status,
      onlineCheckoutAvailable: HOMEPAGE_PAYMENT_POLICY.onlineCheckoutAvailable,
    },
    destinations: HOMEPAGE_DESTINATIONS,
    searchUiStates: HOMEPAGE_SEARCH_UI_STATES,
    search: {
      queryTracking: "disabled",
      staticEntries: HOMEPAGE_STATIC_SEARCH_ENTRIES,
      dynamicEntries: dynamicSearchEntries,
      entries: [...HOMEPAGE_STATIC_SEARCH_ENTRIES, ...dynamicSearchEntries],
      dynamicSourceStatus: {
        courses: courses.status,
        programs: programs.status,
        learningPaths: learningPaths.status,
      },
    },
    catalogPresentation: {
      mode: approvedReachableItemCount >= 3 ? "catalog" : "preview",
      label: approvedReachableItemCount >= 3 ? "Katalog terkurasi" : "Preview/Prototype",
      approvedReachableItemCount,
      minimumCatalogItemCount: 3,
    },
    sections: { courses, programs, learningPaths, faculty, workshops },
    conditionalProof,
    proofFeatureGates: getProofFeatureGates(options.registry, now),
  };
}

function resolveProgramSection(input: {
  result: PromiseSettledResult<readonly ProgramSourceRow[]>;
  approvals: readonly ProgramApprovalRecord[];
  checkedAt: string;
  onSourceFailure: BuildHomepagePreviewDataOptions["onSourceFailure"];
}): HomepageSectionState<HomepageProgramCard> {
  const source = "manual.programIndex" as const;
  if (input.approvals.length === 0) {
    return emptySection("programs", source, 0, input.checkedAt);
  }
  if (input.result.status === "rejected") {
    return unavailableSection(
      "programs",
      source,
      input.approvals.length,
      input.checkedAt,
      input.result.reason,
      input.onSourceFailure,
    );
  }

  const approvedIds = new Set(input.approvals.map(({ recordId }) => recordId));
  const rowsById = new Map(input.result.value.map((row) => [row.id, row]));
  const items: HomepageProgramCard[] = [];

  for (const approval of input.approvals) {
    if (!approval.approvedForHomepage) continue;
    const row = rowsById.get(approval.recordId);
    if (!row || !isCompleteProgramRow(row)) continue;
    const href = resolveProgramHref({
      recordId: row.id,
      slug: row.slug,
      sourceStatus: row.status,
      approvedRecordIds: approvedIds,
    });
    if (!href) continue;

    const category = normalizeCategory(row.category);
    items.push({
      kind: "program",
      id: row.id,
      slug: row.slug,
      title: row.title.trim(),
      description: row.description.trim(),
      level: row.level.trim(),
      duration: row.duration.trim(),
      category,
      categoryLabel: categoryLabel(category),
      formats: row.formats.map((format) => format.trim()).filter(Boolean),
      moduleCount: row.moduleCount,
      outcomeCount: row.outcomeCount,
      thumbnailUrl: row.thumbnailUrl,
      thumbnailAlt: row.thumbnailAlt.trim(),
      thumbnailLabel: row.thumbnailLabel,
      href,
      actionLabel: "Lihat detail",
      provenance: provenanceFrom(approval),
    });
  }

  return items.length > 0
    ? confirmedSection(source, input.approvals.length, input.checkedAt, items)
    : emptySection("programs", source, input.approvals.length, input.checkedAt);
}

function resolveCourseSection(input: {
  result: PromiseSettledResult<readonly CourseSourceRow[]>;
  approvals: readonly CourseApprovalRecord[];
  checkedAt: string;
  onSourceFailure: BuildHomepagePreviewDataOptions["onSourceFailure"];
}): HomepageSectionState<HomepageCourseCard> {
  const source = "prisma.course" as const;
  if (input.approvals.length === 0) return emptySection("courses", source, 0, input.checkedAt);
  if (input.result.status === "rejected") {
    return unavailableSection(
      "courses",
      source,
      input.approvals.length,
      input.checkedAt,
      input.result.reason,
      input.onSourceFailure,
    );
  }

  const approvedIds = new Set(input.approvals.map(({ recordId }) => recordId));
  const rowsById = new Map(input.result.value.map((row) => [row.id, row]));
  const items: HomepageCourseCard[] = [];

  for (const approval of input.approvals) {
    if (!approval.approvedForHomepage) continue;
    const row = rowsById.get(approval.recordId);
    if (!row || !isCompleteCourseRow(row)) continue;
    const href = resolveCourseHref({
      recordId: row.id,
      slug: row.slug,
      sourceStatus: row.status,
      approvedRecordIds: approvedIds,
    });
    if (!href) continue;

    const category = normalizeCategory(row.category);
    items.push({
      kind: "course",
      id: row.id,
      slug: row.slug,
      title: row.title.trim(),
      description: row.description.trim(),
      level: row.level.trim(),
      duration: row.duration.trim(),
      category,
      categoryLabel: categoryLabel(category),
      format: "Self-paced",
      thumbnailUrl:
        row.thumbnailUrl && isSafeLocalAssetPath(row.thumbnailUrl) ? row.thumbnailUrl : null,
      href,
      actionLabel: "Lihat detail",
      provenance: provenanceFrom(approval),
    });
  }

  return items.length > 0
    ? confirmedSection(source, input.approvals.length, input.checkedAt, items)
    : emptySection("courses", source, input.approvals.length, input.checkedAt);
}

function resolveLearningPathSection(input: {
  result: PromiseSettledResult<readonly LearningPathSourceRow[]>;
  approvals: readonly LearningPathApprovalRecord[];
  checkedAt: string;
  onSourceFailure: BuildHomepagePreviewDataOptions["onSourceFailure"];
}): HomepageSectionState<HomepageLearningPathCard> {
  const source = "prisma.learningPath" as const;
  if (input.approvals.length === 0) {
    return emptySection("learningPaths", source, 0, input.checkedAt);
  }
  if (input.result.status === "rejected") {
    return unavailableSection(
      "learningPaths",
      source,
      input.approvals.length,
      input.checkedAt,
      input.result.reason,
      input.onSourceFailure,
    );
  }

  const approvedIds = new Set(input.approvals.map(({ recordId }) => recordId));
  const rowsById = new Map(input.result.value.map((row) => [row.id, row]));
  const items: HomepageLearningPathCard[] = [];

  for (const approval of input.approvals) {
    if (!approval.approvedForHomepage) continue;
    const row = rowsById.get(approval.recordId);
    if (!row || !isCompleteLearningPathRow(row)) continue;
    const href = resolveLearningPathHref({
      recordId: row.id,
      slug: row.slug,
      sourceStatus: row.status,
      approvedRecordIds: approvedIds,
    });
    if (!href) continue;

    items.push({
      kind: "learningPath",
      id: row.id,
      slug: row.slug,
      title: row.title.trim(),
      description: row.description.trim(),
      mode: row.mode,
      courseCount: row.childCourseStatuses.length,
      thumbnailUrl:
        row.thumbnailUrl && isSafeLocalAssetPath(row.thumbnailUrl) ? row.thumbnailUrl : null,
      href,
      actionLabel: "Lihat jalur",
      provenance: provenanceFrom(approval),
    });
  }

  return items.length > 0
    ? confirmedSection(source, input.approvals.length, input.checkedAt, items)
    : emptySection("learningPaths", source, input.approvals.length, input.checkedAt);
}

function resolveFacultySection(input: {
  result: PromiseSettledResult<readonly FacultySourceRow[]>;
  approvals: readonly FacultyApprovalRecord[];
  checkedAt: string;
  now: Date;
  onSourceFailure: BuildHomepagePreviewDataOptions["onSourceFailure"];
}): HomepageSectionState<HomepageFacultyCard> {
  const source = "prisma.trainerProfile" as const;
  if (input.approvals.length === 0) return emptySection("faculty", source, 0, input.checkedAt);
  if (input.result.status === "rejected") {
    return unavailableSection(
      "faculty",
      source,
      input.approvals.length,
      input.checkedAt,
      input.result.reason,
      input.onSourceFailure,
    );
  }

  const approvedIds = new Set(input.approvals.map(({ recordId }) => recordId));
  const rowsById = new Map(input.result.value.map((row) => [row.id, row]));
  const items: HomepageFacultyCard[] = [];

  for (const approval of input.approvals) {
    if (!approval.approvedForHomepage) continue;
    const row = rowsById.get(approval.recordId);
    if (!row || !isCompleteFacultyRow(row, input.now)) continue;
    const href = resolveFacultyHref({
      recordId: row.id,
      slug: row.slug,
      sourceStatus: row.status,
      approvedRecordIds: approvedIds,
    });
    if (!href || !row.portraitUrl) continue;

    items.push({
      kind: "faculty",
      id: row.id,
      slug: row.slug,
      name: row.name.trim(),
      headline: row.headline.trim(),
      shortBio: row.shortBio.trim(),
      portraitUrl: row.portraitUrl,
      expertise: row.expertise.map((item) => item.trim()).filter(Boolean),
      verificationLabel: row.verification === "VERIFIED" ? "Verified" : "Selected",
      href,
      actionLabel: "Lihat profil",
      provenance: provenanceFrom(approval),
    });
  }

  return items.length > 0
    ? confirmedSection(source, input.approvals.length, input.checkedAt, items)
    : emptySection("faculty", source, input.approvals.length, input.checkedAt);
}

function resolveWorkshopSection(input: {
  approvals: readonly WorkshopApprovalRecord[];
  faculty: HomepageSectionState<HomepageFacultyCard>;
  checkedAt: string;
}): HomepageSectionState<HomepageWorkshopCard> {
  const source = "manual.workshopRegistry" as const;
  if (input.approvals.length === 0) return emptySection("workshops", source, 0, input.checkedAt);
  if (input.faculty.status === "unavailable") {
    const copy = getSourceCopy("workshops", "unavailable");
    return {
      status: "unavailable",
      source,
      checkedAt: input.checkedAt,
      approvedRecordCount: input.approvals.length,
      items: [],
      reason: "source-error",
      ...copy,
    };
  }

  const facultyById = new Map(
    input.faculty.status === "confirmed"
      ? input.faculty.items.map((faculty) => [faculty.id, faculty])
      : [],
  );
  const items: HomepageWorkshopCard[] = [];

  for (const approval of input.approvals) {
    if (!approval.approvedForHomepage) continue;
    const host = facultyById.get(approval.hostRecordId);
    if (!host) continue;

    items.push({
      kind: "workshop",
      id: approval.recordId,
      slug: approval.slug,
      title: approval.title.trim(),
      summary: approval.summary.trim(),
      workshopKind: approval.kind.trim(),
      format: approval.format.trim(),
      startsAt: new Date(approval.startsAt).toISOString(),
      endsAt: new Date(approval.endsAt).toISOString(),
      timeZone: approval.timeZone,
      durationMinutes: approval.durationMinutes,
      level: approval.level.trim(),
      sessionOutcome: approval.sessionOutcome.trim(),
      registrationState: approval.registrationState,
      reviewedAt: new Date(approval.reviewedAt).toISOString(),
      host,
      href: "/contact",
      actionLabel: "Daftar minat",
      provenance: provenanceFrom(approval),
    });
  }

  return items.length > 0
    ? confirmedSection(source, input.approvals.length, input.checkedAt, items)
    : emptySection("workshops", source, input.approvals.length, input.checkedAt);
}

function readApprovedSource<TApproval, TRow>(
  approvals: readonly TApproval[],
  read: () => Promise<readonly TRow[]>,
  timeoutMs: number,
): Promise<readonly TRow[]> {
  if (approvals.length === 0) return Promise.resolve([]);
  return withTimeout(Promise.resolve().then(read), timeoutMs);
}

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new HomepageSourceTimeoutError()), timeoutMs);
  });

  return Promise.race([promise, timeout]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

function confirmedSection<TItem>(
  source: HomepageSourceId,
  approvedRecordCount: number,
  checkedAt: string,
  items: readonly TItem[],
): HomepageConfirmedSection<TItem> {
  return { status: "confirmed", source, approvedRecordCount, checkedAt, items };
}

function emptySection(
  key: "courses" | "programs" | "learningPaths" | "faculty" | "workshops",
  source: HomepageSourceId,
  approvedRecordCount: number,
  checkedAt: string,
): HomepageEmptySection {
  const copy = getSourceCopy(key, "empty");
  return {
    status: "empty",
    source,
    checkedAt,
    approvedRecordCount,
    items: [],
    reason: emptyReasonFor(key, approvedRecordCount),
    ...copy,
  };
}

function unavailableSection(
  key: "courses" | "programs" | "learningPaths" | "faculty",
  source: Exclude<HomepageSourceId, "manual.workshopRegistry">,
  approvedRecordCount: number,
  checkedAt: string,
  cause: unknown,
  onSourceFailure: BuildHomepagePreviewDataOptions["onSourceFailure"],
): HomepageUnavailableSection {
  const timedOut = cause instanceof HomepageSourceTimeoutError;
  const reason = unavailableReason(timedOut);
  notifySourceFailure(onSourceFailure, { source, reason, cause });
  return {
    status: "unavailable",
    source,
    checkedAt,
    approvedRecordCount,
    items: [],
    reason,
    ...getSourceCopy(key, "unavailable"),
  };
}

function notifySourceFailure(
  callback: BuildHomepagePreviewDataOptions["onSourceFailure"],
  failure: HomepageSourceFailure,
): void {
  try {
    callback?.(failure);
  } catch {
    // Observability must never become a homepage availability dependency.
  }
}

function isCompleteCourseRow(row: CourseSourceRow): boolean {
  return (
    row.status === "PUBLISHED" &&
    row.lessonCount > 0 &&
    Number.isInteger(row.lessonCount) &&
    [row.title, row.description, row.level, row.duration, row.category].every(
      (value) => value.trim().length > 0,
    )
  );
}

function isCompleteProgramRow(row: ProgramSourceRow): boolean {
  return (
    row.status === "PUBLISHED" &&
    row.moduleCount > 0 &&
    Number.isInteger(row.moduleCount) &&
    row.outcomeCount > 0 &&
    Number.isInteger(row.outcomeCount) &&
    row.formats.length > 0 &&
    row.formats.every((format) => format.trim().length > 0) &&
    isSafeLocalAssetPath(row.thumbnailUrl) &&
    row.thumbnailLabel === "Ilustrasi program" &&
    [
      row.title,
      row.description,
      row.level,
      row.duration,
      row.category,
      row.thumbnailAlt,
    ].every((value) => value.trim().length > 0)
  );
}

function isCompleteLearningPathRow(
  row: LearningPathSourceRow,
): row is LearningPathSourceRow & { mode: "GUIDED" | "SEQUENTIAL" } {
  return (
    row.status === "PUBLISHED" &&
    (row.mode === "GUIDED" || row.mode === "SEQUENTIAL") &&
    row.childCourseStatuses.length > 0 &&
    row.childCourseStatuses.every((status) => status === "PUBLISHED") &&
    [row.title, row.description].every((value) => value.trim().length > 0)
  );
}

function isCompleteFacultyRow(row: FacultySourceRow, now: Date): boolean {
  const nowTime = now.getTime();
  const consentedAt = dateTimestamp(row.consentedAt);
  const publishedAt = dateTimestamp(row.publishedAt);
  const verifiedAt = dateTimestamp(row.verifiedAt);
  const reviewDueAt = dateTimestamp(row.reviewDueAt);
  const verificationIsValid =
    row.verification === "SELECTED" ||
    (row.verification === "VERIFIED" && verifiedAt !== null && verifiedAt <= nowTime);

  return (
    row.status === "PUBLISHED" &&
    verificationIsValid &&
    consentedAt !== null &&
    consentedAt <= nowTime &&
    publishedAt !== null &&
    publishedAt <= nowTime &&
    reviewDueAt !== null &&
    reviewDueAt > nowTime &&
    row.photoRights !== null &&
    ALLOWED_PHOTO_RIGHTS.has(row.photoRights) &&
    row.portraitUrl !== null &&
    isSafeLocalAssetPath(row.portraitUrl) &&
    [row.name, row.headline, row.shortBio].every((value) => value.trim().length > 0)
  );
}

function provenanceFrom(
  approval: HomepageApprovalRecord<HomepageRecordType>,
): HomepageItemProvenance {
  if (!approval.approvedForHomepage) {
    throw new Error("Unapproved records cannot be mapped to homepage items");
  }
  return {
    recordType: approval.recordType,
    recordId: approval.recordId,
    source: approval.source,
    approvedAt: approval.approvedAt,
    reviewAfter: approval.reviewAfter,
    claimScope: approval.claimScope,
  };
}

function searchEntriesFromCourses(
  section: HomepageSectionState<HomepageCourseCard>,
): readonly HomepageSearchEntry[] {
  if (section.status !== "confirmed") return [];
  return section.items.map((item) => ({
    id: `course:${item.id}`,
    label: item.title,
    description: item.description,
    href: item.href,
    kind: "course",
    keywords: [item.categoryLabel, item.level, item.duration],
  }));
}

function searchEntriesFromPrograms(
  section: HomepageSectionState<HomepageProgramCard>,
): readonly HomepageSearchEntry[] {
  if (section.status !== "confirmed") return [];
  return section.items.map((item) => ({
    id: `program:${item.id}`,
    label: item.title,
    description: item.description,
    href: item.href,
    kind: "program",
    keywords: [item.categoryLabel, item.level, item.duration, ...item.formats],
  }));
}

function searchEntriesFromLearningPaths(
  section: HomepageSectionState<HomepageLearningPathCard>,
): readonly HomepageSearchEntry[] {
  if (section.status !== "confirmed") return [];
  return section.items.map((item) => ({
    id: `learningPath:${item.id}`,
    label: item.title,
    description: item.description,
    href: item.href,
    kind: "learningPath",
    keywords: ["jalur belajar", item.mode, `${item.courseCount} program`],
  }));
}

function normalizeCategory(value: string): HomepageCategory {
  const normalized = value.trim().toLocaleLowerCase("id-ID");
  if (/data|analytics|analitik|excel|power bi|sql/.test(normalized)) return "data-analytics";
  if (/\bai\b|artificial|digital|teknologi|technology|tech/.test(normalized)) return "ai-digital";
  if (/presentasi|presentation|komunikasi|communication/.test(normalized)) {
    return "presentation-communication";
  }
  if (/leadership|kepemimpinan|management|manajemen/.test(normalized)) return "leadership";
  if (/process|proses|quality|kualitas|operation|operasi/.test(normalized)) {
    return "process-quality";
  }
  return "other";
}

function categoryLabel(category: HomepageCategory): string {
  const labels: Record<HomepageCategory, string> = {
    "data-analytics": "Data & Analytics",
    "ai-digital": "AI & Digital",
    "presentation-communication": "Presentasi & Komunikasi",
    leadership: "Leadership",
    "process-quality": "Proses & Kualitas",
    other: "Skill Profesional",
  };
  return labels[category];
}

function dateTimestamp(value: Date | string | null): number | null {
  if (value === null) return null;
  const result = value instanceof Date ? value.getTime() : Date.parse(value);
  return Number.isFinite(result) ? result : null;
}

function normalizeTimeout(timeoutMs: number | undefined): number {
  if (timeoutMs === undefined) return DEFAULT_SOURCE_TIMEOUT_MS;
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) return DEFAULT_SOURCE_TIMEOUT_MS;
  return Math.min(MAX_SOURCE_TIMEOUT_MS, Math.max(1, Math.floor(timeoutMs)));
}

function safeIso(value: Date): string {
  return Number.isFinite(value.getTime()) ? value.toISOString() : new Date(0).toISOString();
}
