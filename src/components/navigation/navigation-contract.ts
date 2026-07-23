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

export const NAV_PANEL_IDS = ["programs"] as const;
export const DIRECT_NAV_IDS = ["events", "services", "trainers", "portfolio", "about"] as const;

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


export const NAV_PANELS = [
  { id: "programs", label: "Programs", eyebrow: "Belajar bersama Skillary", title: "Program untuk skill kerja yang nyata.", description: "Temukan program terstruktur, learning path, resource, dan standar faculty untuk langkah berikutnya.", href: "/programs", groups: [
    { title: "Jalur belajar", links: [
      { id: "programs-paths", label: "Learning Paths", href: "/learning-paths", description: "Urutan belajar untuk tujuan yang jelas." },
      { id: "programs-resources", label: "Resource Gratis", href: "/resources", description: "Materi praktis yang dapat langsung digunakan." },
    ]},
    { title: "Kualitas pembelajaran", links: [
      { id: "programs-standards", label: "Standar Trainers", href: "/trainer-verification", description: "Cara profil, bukti, dan designation ditinjau." },
    ]},
  ]},
] as const satisfies readonly NavigationPanel[];

export const TYPED_NAV_PANELS: readonly NavigationPanel[] = NAV_PANELS;

export const DIRECT_NAV = [
  { id: "events", label: "Events", href: "/events" },
  { id: "services", label: "Services", href: "/untuk-organisasi" },
  { id: "trainers", label: "Trainers", href: "/trainers" },
  { id: "portfolio", label: "Portfolio", href: "/portofolio" },
  { id: "about", label: "About", href: "/about" },
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
    ...TYPED_DIRECT_NAV,
    ...TYPED_NAV_PANELS.flatMap((panel) => [
      ...panel.groups.flatMap((group) => group.links),
      ...(panel.action ? [panel.action] : []),
    ]),
  ];
  const allIds = [
    ...TYPED_DIRECT_NAV.map((link) => link.id),
    ...TYPED_NAV_PANELS.map((panel) => panel.id),
    ...allLinks
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
    if (panel.groups.some((group) => group.links.some((link) => link.href === panel.href))) {
      violations.push(`duplicate-featured-destination:${panel.id}`);
    }
    if (panel.action) violations.push(`unexpected-panel-action:${panel.id}`);
  }

  const directHrefs = new Set(TYPED_DIRECT_NAV.map((link) => link.href));
  const panelLinkHrefs = TYPED_NAV_PANELS.flatMap((panel) =>
    panel.groups.flatMap((group) => group.links.map((link) => link.href)),
  );
  for (const href of panelLinkHrefs) {
    if (directHrefs.has(href)) violations.push(`direct-panel-overlap:${href}`);
  }
  if (new Set(panelLinkHrefs).size !== panelLinkHrefs.length) violations.push("duplicate-panel-destination");

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
