export type NavigationLink = Readonly<{
  id: string;
  label: string;
  href: string;
  description: string;
}>;

export type NavigationGroup = Readonly<{
  title: string;
  links: readonly NavigationLink[];
}>;

export const NAV_PANEL_IDS = ["programs", "organizations", "about"] as const;
export const DIRECT_NAV_IDS = ["faculty", "portfolio"] as const;

export type NavigationPanelId = (typeof NAV_PANEL_IDS)[number];
export type DirectNavigationId = (typeof DIRECT_NAV_IDS)[number];

export type NavigationPanel = Readonly<{
  id: NavigationPanelId;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  groups: readonly NavigationGroup[];
  action?: NavigationLink;
}>;

export type DirectNavigationLink = Readonly<{
  id: DirectNavigationId;
  label: string;
  href: string;
}>;

export type UtilityNavigationLink = Readonly<{
  id: "find-program" | "business";
  label: string;
  href: string;
}>;

export const NAV_ANNOUNCEMENT = {
  message: "✦ BARU: Skillary Events — kelas singkat untuk skill kerja profesional",
  label: "Lihat Events",
  href: "/events",
} as const;

export const NAV_PRIMARY_ACTION = {
  label: "Lihat Events",
  compactLabel: "Events",
  href: "/events",
} as const;

export const NAV_UTILITY_LINKS = [
  { id: "find-program", label: "Cari program", href: "/programs" },
  { id: "business", label: "Untuk Bisnis", href: "/untuk-organisasi" },
] as const satisfies readonly UtilityNavigationLink[];

export const NAV_PANELS = [
  { id: "programs", label: "Program", eyebrow: "Belajar bersama Skillary", title: "Program untuk skill kerja yang nyata.", description: "Temukan program terstruktur, kelas singkat, resource, dan faculty untuk langkah berikutnya.", href: "/programs", groups: [
    { title: "Format", links: [
      { id: "programs-all", label: "Semua Program", href: "/programs", description: "Program terstruktur untuk individu dan tim." },
      { id: "programs-events", label: "Events & Kelas Singkat", href: "/events", description: "Webinar praktis dan sesi berdurasi ringkas." },
      { id: "programs-paths", label: "Learning Paths", href: "/learning-paths", description: "Urutan belajar untuk tujuan yang jelas." },
      { id: "programs-resources", label: "Resource Gratis", href: "/resources", description: "Materi praktis yang dapat langsung digunakan." },
    ]},
    { title: "Pilih dengan percaya diri", links: [
      { id: "programs-faculty", label: "Kenali Faculty", href: "/trainers", description: "Praktisi terpilih untuk pembelajaran relevan." },
      { id: "programs-standards", label: "Standar Faculty", href: "/trainer-verification", description: "Cara profil, bukti, dan designation ditinjau." },
      { id: "programs-organizations", label: "Program untuk Organisasi", href: "/untuk-organisasi", description: "Program yang disesuaikan dengan konteks tim." },
    ]},
  ]},
  { id: "organizations", label: "Untuk Organisasi", eyebrow: "Capability partner", title: "Program yang dirancang untuk konteks tim Anda.", description: "Mulai dari kebutuhan bisnis, pilih faculty dan format, lalu susun hasil belajar yang dapat dipertanggungjawabkan.", href: "/untuk-organisasi", groups: [
    { title: "Solusi", links: [
      { id: "org-training", label: "Pelatihan In-House", href: "/untuk-organisasi", description: "Solusi organisasi yang dapat disesuaikan." },
      { id: "org-programs", label: "Katalog Program", href: "/programs", description: "Lihat cakupan topik dan format." },
      { id: "org-paths", label: "Learning Path Tim", href: "/learning-paths", description: "Susun urutan belajar yang lebih terarah." },
      { id: "org-faculty", label: "Pilih Faculty", href: "/trainers", description: "Kenali praktisi dan fokus pembelajarannya." },
    ]},
    { title: "Bukti & kepercayaan", links: [
      { id: "org-portfolio", label: "Portofolio", href: "/portofolio", description: "Lihat pekerjaan dan program terpilih." },
      { id: "org-standards", label: "Standar Faculty", href: "/trainer-verification", description: "Pahami designation dan proses review." },
      { id: "org-about", label: "Tentang Skillary", href: "/about", description: "Misi dan pendekatan kami." },
    ]},
  ], action: { id: "org-contact", label: "Diskusikan kebutuhan", href: "/contact", description: "Mulai percakapan dengan tim Skillary." } },
  { id: "about", label: "Tentang", eyebrow: "Tentang Skillary", title: "Pembelajaran yang terhubung dengan pekerjaan nyata.", description: "Kenali pendekatan Skillary, standar faculty, dan cara menghubungi tim kami.", href: "/about", groups: [
    { title: "Skillary", links: [
      { id: "about-company", label: "Tentang Kami", href: "/about", description: "Misi dan pendekatan Skillary." },
      { id: "about-standards", label: "Standar Faculty", href: "/trainer-verification", description: "Cara profil dan bukti faculty ditinjau." },
      { id: "about-contact", label: "Hubungi Kami", href: "/contact", description: "Pertanyaan, kebutuhan program, dan dukungan." },
    ]},
    { title: "Legal & dukungan", links: [
      { id: "about-privacy", label: "Kebijakan Privasi", href: "/privacy", description: "Cara data dan privasi dikelola." },
      { id: "about-terms", label: "Syarat & Ketentuan", href: "/terms", description: "Ketentuan penggunaan layanan Skillary." },
    ]},
  ]},
] as const satisfies readonly NavigationPanel[];

export const TYPED_NAV_PANELS: readonly NavigationPanel[] = NAV_PANELS;

export const DIRECT_NAV = [
  { id: "faculty", label: "Faculty", href: "/trainers" },
  { id: "portfolio", label: "Portofolio", href: "/portofolio" },
] as const satisfies readonly DirectNavigationLink[];

export const TYPED_DIRECT_NAV: readonly DirectNavigationLink[] = DIRECT_NAV;

export const CANONICAL_NAVIGATION_HREFS = [
  "/",
  "/about",
  "/contact",
  "/events",
  "/learning-paths",
  "/login",
  "/portofolio",
  "/privacy",
  "/programs",
  "/resources",
  "/terms",
  "/trainer-verification",
  "/trainers",
  "/untuk-organisasi",
] as const;

export const FORBIDDEN_NAVIGATION_PREFIXES = [
  "/admin",
  "/blog",
  "/case-studies",
  "/checkout",
  "/community",
  "/dashboard",
  "/explore",
  "/learn",
  "/lp",
  "/skillary-campus",
  "/v2",
] as const;

export function getCanonicalNavigationHrefs() {
  const hrefs = [
    "/",
    "/login",
    NAV_ANNOUNCEMENT.href,
    NAV_PRIMARY_ACTION.href,
    ...NAV_UTILITY_LINKS.map((link) => link.href),
    ...TYPED_DIRECT_NAV.map((link) => link.href),
    ...TYPED_NAV_PANELS.flatMap((panel) => [
      panel.href,
      ...panel.groups.flatMap((group) => group.links.map((link) => link.href)),
      ...(panel.action ? [panel.action.href] : []),
    ]),
  ];

  return [...new Set(hrefs)].sort();
}

export function getNavigationContractViolations() {
  const violations: string[] = [];
  const allLinks = [
    ...NAV_UTILITY_LINKS,
    ...TYPED_DIRECT_NAV,
    ...TYPED_NAV_PANELS.flatMap((panel) => [
      ...panel.groups.flatMap((group) => group.links),
      ...(panel.action ? [panel.action] : []),
    ]),
  ];
  const allIds = [
    ...NAV_UTILITY_LINKS.map((link) => link.id),
    ...TYPED_DIRECT_NAV.map((link) => link.id),
    ...TYPED_NAV_PANELS.map((panel) => panel.id),
    ...allLinks
      .filter((link) => !("id" in link && NAV_UTILITY_LINKS.some((utility) => utility.id === link.id)))
      .filter((link) => !("id" in link && TYPED_DIRECT_NAV.some((direct) => direct.id === link.id)))
      .map((link) => link.id),
  ];

  if (TYPED_NAV_PANELS.map((panel) => panel.id).join(",") !== NAV_PANEL_IDS.join(",")) {
    violations.push("panel-id-order");
  }
  if (TYPED_DIRECT_NAV.map((link) => link.id).join(",") !== DIRECT_NAV_IDS.join(",")) {
    violations.push("direct-id-order");
  }
  if (new Set(allIds).size !== allIds.length) violations.push("duplicate-id");

  for (const panel of TYPED_NAV_PANELS) {
    if (panel.groups.length !== 2) violations.push(`panel-group-count:${panel.id}`);
    if (!panel.groups.some((group) => group.links.some((link) => link.href === panel.href))) {
      violations.push(`missing-featured-destination:${panel.id}`);
    }
    if (panel.action && panel.id !== "organizations") violations.push(`unexpected-panel-action:${panel.id}`);
  }
  const organizationPanel = TYPED_NAV_PANELS.find((panel) => panel.id === "organizations");
  if (organizationPanel?.action?.href !== "/contact") violations.push("organization-contact-action");

  const hrefOccurrences = new Map<string, number>();
  for (const link of allLinks) hrefOccurrences.set(link.href, (hrefOccurrences.get(link.href) ?? 0) + 1);
  for (const [href, count] of hrefOccurrences) {
    if (count > 3) violations.push(`href-multiplicity:${href}:${count}`);
  }

  const canonical = new Set<string>(CANONICAL_NAVIGATION_HREFS);
  for (const href of getCanonicalNavigationHrefs()) {
    if (!href.startsWith("/") || href.includes("?") || href.includes("#") || href.includes("//")) {
      violations.push(`unsafe-href:${href}`);
    }
    if (!canonical.has(href)) violations.push(`noncanonical-href:${href}`);
    if (FORBIDDEN_NAVIGATION_PREFIXES.some((prefix) => href === prefix || href.startsWith(`${prefix}/`))) {
      violations.push(`forbidden-href:${href}`);
    }
  }

  return violations;
}
