import type {
  HomepageDestination,
  HomepageEmptyReason,
  HomepageSafeAction,
  HomepageSearchEntry,
  HomepageSearchUiState,
  HomepageUnavailableReason,
} from "./types";

export const HOMEPAGE_PREVIEW_CONTRACT_VERSION = "HP-S9P.1" as const;

export const HOMEPAGE_PAYMENT_POLICY = {
  status: "hold",
  onlineCheckoutAvailable: false,
  allowedActionIntents: ["learn-more", "register-interest", "contact"],
  message: "Pembayaran online belum tersedia pada preview. Gunakan detail atau konsultasi.",
} as const;

export const SAFE_STATIC_DESTINATIONS = {
  preview: "/lp/homepage-preview",
  programSection: "#program",
  workshopSection: "#workshop",
  learningPathSection: "#jalur-belajar",
  productProofSection: "#product-heading",
  organizationJourneySection: "#organization-heading",
  certifications: "/certifications",
  portfolio: "/portofolio",
  faculty: "/trainers",
  resources: "/resources",
  organization: "/untuk-organisasi",
  login: "/login",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const HOMEPAGE_DESTINATIONS = [
  {
    id: "program",
    label: "Program",
    href: SAFE_STATIC_DESTINATIONS.programSection,
    kind: "anchor",
    searchAliases: ["kelas", "course", "belajar"],
  },
  {
    id: "workshop",
    label: "Workshop berikutnya",
    href: SAFE_STATIC_DESTINATIONS.workshopSection,
    kind: "anchor",
    searchAliases: ["event", "live", "kelas singkat"],
  },
  {
    id: "learning-path",
    label: "Jalur Belajar",
    href: SAFE_STATIC_DESTINATIONS.learningPathSection,
    kind: "anchor",
    searchAliases: ["path", "jalur", "kurikulum"],
  },
  {
    id: "certifications",
    label: "Sertifikasi",
    href: SAFE_STATIC_DESTINATIONS.certifications,
    kind: "route",
    searchAliases: ["sertifikat", "credential"],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    href: SAFE_STATIC_DESTINATIONS.portfolio,
    kind: "route",
    searchAliases: ["hasil belajar", "bukti karya"],
  },
  {
    id: "faculty",
    label: "Faculty",
    href: SAFE_STATIC_DESTINATIONS.faculty,
    kind: "route",
    searchAliases: ["trainer", "pengajar", "fasilitator"],
  },
  {
    id: "resources",
    label: "Materi Gratis",
    href: SAFE_STATIC_DESTINATIONS.resources,
    kind: "route",
    searchAliases: ["resource", "materi", "gratis"],
  },
  {
    id: "organization",
    label: "Untuk Organisasi",
    href: SAFE_STATIC_DESTINATIONS.organization,
    kind: "route",
    searchAliases: ["bisnis", "tim", "perusahaan", "b2b"],
  },
  {
    id: "login",
    label: "Masuk",
    href: SAFE_STATIC_DESTINATIONS.login,
    kind: "route",
    searchAliases: ["login", "akun"],
  },
  {
    id: "contact",
    label: "Hubungi Skillary",
    href: SAFE_STATIC_DESTINATIONS.contact,
    kind: "route",
    searchAliases: ["kontak", "konsultasi", "daftar minat"],
  },
] as const satisfies readonly HomepageDestination[];

export const HOMEPAGE_SEARCH_UI_STATES = [
  "idle",
  "loading",
  "results",
  "empty",
  "unavailable",
] as const satisfies readonly HomepageSearchUiState[];

export const SAFE_CTA_COPY = {
  exploreCatalog: "Jelajahi Program & Workshop",
  designTeamProgram: "Rancang Program untuk Tim",
  viewDetail: "Lihat detail",
  viewLearningPath: "Lihat jalur",
  viewFaculty: "Lihat profil",
  askWorkshopSchedule: "Tanyakan jadwal workshop",
  registerInterest: "Daftar minat",
  contact: "Hubungi kami",
} as const;

export const SAFE_CAPABILITY_COPY = {
  learn: "Belajar melalui program terstruktur",
  practice: "Contoh praktik dan project tersedia pada program tertentu",
  assessment: "Penilaian mengikuti struktur program",
  evidence: "Tunjukkan contoh hasil belajar",
  certification: "Sertifikat tersedia sesuai kriteria program",
  progress: "Pantau penyelesaian program",
  reporting: "Ringkasan hasil mengikuti data program",
} as const;

export const HOMEPAGE_SAFE_SOURCE_COPY = {
  courses: {
    empty: {
      title: "Program terkurasi sedang disiapkan.",
      message: "Kami hanya menampilkan program yang sudah melewati pemeriksaan konten dan tujuan.",
      action: contactAction("Diskusikan kebutuhan belajar"),
    },
    unavailable: {
      title: "Daftar program belum dapat dimuat.",
      message: "Halaman tetap dapat digunakan. Hubungi kami jika Anda ingin mendiskusikan kebutuhan belajar.",
      action: contactAction("Hubungi kami"),
    },
  },
  programs: {
    empty: {
      title: "Program terkurasi sedang disiapkan.",
      message: "Kami hanya menampilkan program yang sudah melewati pemeriksaan konten dan tujuan.",
      action: contactAction("Diskusikan kebutuhan belajar"),
    },
    unavailable: {
      title: "Daftar program belum dapat dimuat.",
      message: "Halaman tetap dapat digunakan. Hubungi kami jika Anda ingin mendiskusikan kebutuhan belajar.",
      action: contactAction("Hubungi kami"),
    },
  },
  learningPaths: {
    empty: {
      title: "Jalur belajar terkurasi sedang disiapkan.",
      message: "Jalur hanya akan tampil setelah seluruh program di dalamnya siap dibuka.",
      action: contactAction("Diskusikan jalur belajar"),
    },
    unavailable: {
      title: "Jalur belajar belum dapat dimuat.",
      message: "Anda tetap dapat menghubungi kami untuk menyusun urutan belajar yang sesuai.",
      action: contactAction("Hubungi kami"),
    },
  },
  faculty: {
    empty: {
      title: "Profil faculty terkurasi sedang disiapkan.",
      message: "Profil hanya akan tampil setelah consent, hak foto, dan masa review dinyatakan valid.",
      action: contactAction("Tanyakan fasilitator"),
    },
    unavailable: {
      title: "Profil faculty belum dapat dimuat.",
      message: "Informasi yang belum terverifikasi tidak ditampilkan saat sumber data bermasalah.",
      action: contactAction("Hubungi kami"),
    },
  },
  workshops: {
    empty: {
      title: "Workshop berikutnya belum dijadwalkan.",
      message: "Daftarkan minat agar tim Skillary dapat menghubungi Anda saat topik dan jadwal telah terverifikasi.",
      action: registerInterestAction("Daftarkan minat workshop"),
    },
    unavailable: {
      title: "Jadwal workshop belum dapat dikonfirmasi.",
      message: "Kami tidak menampilkan jadwal atau host yang belum dapat diverifikasi.",
      action: registerInterestAction("Daftarkan minat workshop"),
    },
  },
} as const;

export const HOMEPAGE_STATIC_SEARCH_ENTRIES = HOMEPAGE_DESTINATIONS.map(
  (destination): HomepageSearchEntry => ({
    id: `destination:${destination.id}`,
    label: destination.label,
    description:
      destination.kind === "anchor"
        ? "Bagian pada homepage preview Skillary"
        : "Halaman Skillary yang tersedia",
    href: destination.href,
    kind: "destination",
    keywords: destination.searchAliases,
  }),
);

const STATIC_HREFS = new Set<string>(Object.values(SAFE_STATIC_DESTINATIONS));
const SAFE_SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const FORBIDDEN_ROUTE_PREFIXES = ["/events", "/checkout", "/api", "/v2"] as const;

export function isSafeHomepageSlug(slug: string): boolean {
  return SAFE_SLUG.test(slug);
}

export function isSafeHomepageHref(href: string): boolean {
  if (!href || href.includes("?") || href.startsWith("//") || href.includes("://")) return false;
  if (href.startsWith("#")) return STATIC_HREFS.has(href);
  if (!href.startsWith("/") || href.includes("#")) return false;
  if (
    FORBIDDEN_ROUTE_PREFIXES.some(
      (prefix) => href === prefix || href.startsWith(`${prefix}/`),
    )
  ) {
    return false;
  }
  if (STATIC_HREFS.has(href)) return true;

  const dynamicMatch = href.match(/^\/(program|programs|path|trainers)\/([^/]+)$/);
  return dynamicMatch ? isSafeHomepageSlug(dynamicMatch[2]) : false;
}

export function resolveProgramHref(input: {
  recordId: string;
  slug: string;
  sourceStatus: string;
  approvedRecordIds: ReadonlySet<string>;
}): `/programs/${string}` | null {
  if (!isApprovedPublishedInput(input)) return null;
  return `/programs/${input.slug}`;
}

export function resolveCourseHref(input: {
  recordId: string;
  slug: string;
  sourceStatus: string;
  approvedRecordIds: ReadonlySet<string>;
}): `/program/${string}` | null {
  if (!isApprovedPublishedInput(input)) return null;
  return `/program/${input.slug}`;
}

export function resolveLearningPathHref(input: {
  recordId: string;
  slug: string;
  sourceStatus: string;
  approvedRecordIds: ReadonlySet<string>;
}): `/path/${string}` | null {
  if (!isApprovedPublishedInput(input)) return null;
  return `/path/${input.slug}`;
}

export function resolveFacultyHref(input: {
  recordId: string;
  slug: string;
  sourceStatus: string;
  approvedRecordIds: ReadonlySet<string>;
}): `/trainers/${string}` | null {
  if (!isApprovedPublishedInput(input)) return null;
  return `/trainers/${input.slug}`;
}

export function getHomepageDestinationContractViolations(
  destinations: readonly HomepageDestination[] = HOMEPAGE_DESTINATIONS,
): string[] {
  const violations: string[] = [];
  const ids = new Set<string>();
  const hrefs = new Set<string>();

  for (const destination of destinations) {
    if (ids.has(destination.id)) violations.push(`duplicate-id:${destination.id}`);
    if (hrefs.has(destination.href)) violations.push(`duplicate-href:${destination.href}`);
    if (!isSafeHomepageHref(destination.href)) violations.push(`unsafe-href:${destination.href}`);
    if (destination.kind === "anchor" && !destination.href.startsWith("#")) {
      violations.push(`anchor-kind-mismatch:${destination.id}`);
    }
    if (destination.kind === "route" && !destination.href.startsWith("/")) {
      violations.push(`route-kind-mismatch:${destination.id}`);
    }
    ids.add(destination.id);
    hrefs.add(destination.href);
  }

  return violations;
}

export function getSourceCopy(
  source: keyof typeof HOMEPAGE_SAFE_SOURCE_COPY,
  state: "empty" | "unavailable",
): {
  title: string;
  message: string;
  action: HomepageSafeAction;
} {
  return HOMEPAGE_SAFE_SOURCE_COPY[source][state];
}

export function emptyReasonFor(
  source: keyof typeof HOMEPAGE_SAFE_SOURCE_COPY,
  approvedRecordCount: number,
): HomepageEmptyReason {
  if (source === "workshops") return "no-upcoming-workshops";
  return approvedRecordCount === 0 ? "no-approved-records" : "no-eligible-records";
}

export function unavailableReason(timedOut: boolean): HomepageUnavailableReason {
  return timedOut ? "source-timeout" : "source-error";
}

function contactAction(label: string): HomepageSafeAction {
  return { label, href: SAFE_STATIC_DESTINATIONS.contact, intent: "contact" };
}

function registerInterestAction(label: string): HomepageSafeAction {
  return {
    label,
    href: SAFE_STATIC_DESTINATIONS.contact,
    intent: "register-interest",
  };
}

function isApprovedPublishedInput(input: {
  recordId: string;
  slug: string;
  sourceStatus: string;
  approvedRecordIds: ReadonlySet<string>;
}): boolean {
  return (
    input.approvedRecordIds.has(input.recordId) &&
    input.sourceStatus === "PUBLISHED" &&
    isSafeHomepageSlug(input.slug)
  );
}
