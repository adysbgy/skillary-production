export const HOMEPAGE_BLUEPRINT_VERSION = "HP-S8F.0" as const;

export type HomepageBlueprintBandId =
  | "SK-HP-01"
  | "SK-HP-02"
  | "SK-HP-03"
  | "SK-HP-04"
  | "SK-HP-05"
  | "SK-HP-06"
  | "SK-HP-07"
  | "SK-HP-08"
  | "SK-HP-09"
  | "SK-HP-10"
  | "SK-HP-11"
  | "SK-HP-12"
  | "SK-HP-13";

export type HomepageBlueprintSurface =
  | "ink"
  | "warm-white"
  | "light"
  | "orange-led";

export interface HomepageBlueprintBand {
  id: HomepageBlueprintBandId;
  core: string;
  referenceId: string;
  originalSkillaryLabel: string | null;
  surface: HomepageBlueprintSurface;
  gridRatio: string;
  density: "low" | "medium" | "high";
  cardMediaAnatomy: string;
  tokenAssignment: string;
  responsiveReflow: string;
  interaction: string;
  intentionalDifference: string;
}

/**
 * Structural translation contract for HP-S2.
 *
 * Reference IDs are internal design provenance only. They are never rendered as
 * public marketing copy. The array order is the required server-rendered order.
 */
export const HOMEPAGE_BLUEPRINT_BANDS = [
  {
    id: "SK-HP-01",
    core: "Header",
    referenceId: "H01 + MM-W01",
    originalSkillaryLabel: null,
    surface: "ink",
    gridRatio: "single 3-zone navigation row",
    density: "medium",
    cardMediaAnatomy: "Skillary lockup, five primary destinations, search disclosure, login, primary action",
    tokenAssignment: "ink-950, warm-50, brand-orange, border-ink",
    responsiveReflow: "single desktop row becomes a compact header and progressive native dialog drawer",
    interaction: "five-state no-tracking search disclosure, native links, and focus-returning modal dialog",
    intentionalDifference: "Skillary destinations replace marketplace rankings and category sprawl",
  },
  {
    id: "SK-HP-02",
    core: "Hero dua figur",
    referenceId: "H02-H03 + MA-H01",
    originalSkillaryLabel: null,
    surface: "warm-white",
    gridRatio: "25 / 50 / 25",
    density: "medium",
    cardMediaAnatomy: "original cut-out individual portrait, central promise and actions, original cut-out organization portrait, capability strip",
    tokenAssignment: "warm-50, ink-950, brand-orange, display type",
    responsiveReflow: "central copy first; two figure slots remain a balanced pair below on mobile",
    interaction: "two truthful route or anchor actions plus accessible capability tokens",
    intentionalDifference: "reference-like dual-figure composition uses original Skillary people, claims, colors, and evidence language",
  },
  {
    id: "SK-HP-03",
    core: "Audience decision",
    referenceId: "MA-H02",
    originalSkillaryLabel: null,
    surface: "ink",
    gridRatio: "1 / 1 audience split",
    density: "low",
    cardMediaAnatomy: "owned line icon, audience label, safe promise, support copy, one destination",
    tokenAssignment: "ink-950, ink-raised, warm-50, brand-orange",
    responsiveReflow: "dark split becomes a vertical pair while preserving copy-first reading order",
    interaction: "explicit native CTA per audience with visible focus",
    intentionalDifference: "Skillary distinguishes individual and organization routes without a student-count claim",
  },
  {
    id: "SK-HP-04",
    core: "Learning formats",
    referenceId: "MA-H03",
    originalSkillaryLabel: "Skillary learning format map",
    surface: "light",
    gridRatio: "4-up format grid",
    density: "medium",
    cardMediaAnatomy: "owned line icon, format label, source-safe explanation, one destination",
    tokenAssignment: "light, paper, ink-950, brand-orange, bounded accent colors",
    responsiveReflow: "four columns become two columns then a readable single-column stack",
    interaction: "four native destinations to allowlisted anchors with visible focus",
    intentionalDifference: "format cards disclose source verification rather than using popularity or expert claims",
  },
  {
    id: "SK-HP-05",
    core: "Business bridge",
    referenceId: "MA-H04",
    originalSkillaryLabel: "Skillary organization scope wall",
    surface: "ink",
    gridRatio: "5 / 7 business copy and scope wall",
    density: "medium",
    cardMediaAnatomy: "organization promise, scope boundary, six truthful program inputs, one destination",
    tokenAssignment: "ink-950, ink-raised, warm-50, brand-orange seam",
    responsiveReflow: "copy and scope wall stack without changing semantic order",
    interaction: "native route to organization information with visible focus",
    intentionalDifference: "truthful scope tiles replace an unverified client-logo wall and company claim",
  },
  {
    id: "SK-HP-06",
    core: "Guided goals + catalog discovery",
    referenceId: "H08 + MA-H03 + MA-W01",
    originalSkillaryLabel: null,
    surface: "light",
    gridRatio: "4-goal editorial guide followed by 3 server-rendered groups enhanced into one active catalog panel",
    density: "high",
    cardMediaAnatomy: "verified goal-to-program guide, catalog heading, source state or approved card, source-backed module and outcome detail, safe action",
    tokenAssignment: "paper, warm-100, ink-950, brand-orange, state-border",
    responsiveReflow: "goal guide becomes a single readable stack; groups remain sequential and workshop keeps a real hash target",
    interaction: "direct goal-to-program routes plus manual-activation tabs, hash synchronization, tabbable panels, heading focus, and sequential no-JavaScript fallback",
    intentionalDifference: "goal guidance replaces unsupported ranking; no fake dates, price, seat count, or checkout",
  },
  {
    id: "SK-HP-07",
    core: "Proof studio",
    referenceId: "H09 + MA-H05",
    originalSkillaryLabel: "Skillary Product Proof Board",
    surface: "ink",
    gridRatio: "centered proof proposition + three equal showcase specimens",
    density: "high",
    cardMediaAnatomy: "anonymous specimen label, interface canvas, capability-safe caption, explicit evidence action",
    tokenAssignment: "ink-950, paper, warm-100, brand-orange, showcase-shadow",
    responsiveReflow: "three-column showcase becomes a controlled horizontal snap rail on narrow screens",
    interaction: "evidence anchor plus labeled previous/next controls, swipe cue, disabled endpoints, and readable overflow fallback",
    intentionalDifference: "anonymous product mechanics replace learner identities, showcase winners, and outcome statistics",
  },
  {
    id: "SK-HP-08",
    core: "Evidence showcase",
    referenceId: "H09-H11 + MA-H04-H06",
    originalSkillaryLabel: null,
    surface: "light",
    gridRatio: "three-up artifact showcase + five-stage evidence trail",
    density: "high",
    cardMediaAnatomy: "specimen label, equal visual canvas, inspection note, stage-specific evidence copy",
    tokenAssignment: "paper, warm-100, ink-950, brand-orange, ledger-line",
    responsiveReflow: "artifact gallery becomes a controlled snap rail while the evidence ledger becomes vertical",
    interaction: "labeled previous/next controls, swipe cue, reduced-motion scroll, and full no-JavaScript access",
    intentionalDifference: "every artifact remains explicitly illustrative; no Maven work, participant identity, score, ranking, or winner claim is copied",
  },
  {
    id: "SK-HP-09",
    core: "Untuk Organisasi",
    referenceId: "H13 + H15 + MA-H07",
    originalSkillaryLabel: null,
    surface: "orange-led",
    gridRatio: "centered organization proposition + 4-scope strip + 4-step process grid",
    density: "medium",
    cardMediaAnatomy: "organization context brief, four input/output steps, information action",
    tokenAssignment: "brand-orange, ink-950, warm-50, orange-100",
    responsiveReflow: "scope and process move from four columns to two then one while preserving sequence",
    interaction: "safe route to organization information; contact conversion remains explicit later",
    intentionalDifference: "process transparency replaces unverified client outcomes",
  },
  {
    id: "SK-HP-10",
    core: "What Organizations Can Inspect",
    referenceId: "H12 + H14",
    originalSkillaryLabel: "Skillary Inspection Taxonomy",
    surface: "light",
    gridRatio: "5-row organization inspection matrix",
    density: "medium",
    cardMediaAnatomy: "inspection area, data-bound description, checkpoint taxonomy, scope boundary",
    tokenAssignment: "light, paper, ink-950, brand-orange, grid-line",
    responsiveReflow: "three-column matrix rows become readable vertical records",
    interaction: "read-only taxonomy with no metric, ROI, or real-time promise",
    intentionalDifference: "non-quantitative inspectability replaces unsupported KPI claims",
  },
  {
    id: "SK-HP-11",
    core: "FAQ",
    referenceId: "H16 + MA-H08",
    originalSkillaryLabel: null,
    surface: "warm-white",
    gridRatio: "centered factual intro + single wide disclosure stack",
    density: "medium",
    cardMediaAnatomy: "scope explanation, question summary, factual answer, contact path",
    tokenAssignment: "warm-50, ink-950, brand-orange, border-subtle",
    responsiveReflow: "single column remains single column with larger touch targets",
    interaction: "native details and summary without JavaScript dependency",
    intentionalDifference: "answers disclose readiness and payment hold instead of hiding constraints",
  },
  {
    id: "SK-HP-12",
    core: "Dual closing CTA",
    referenceId: "H17 + MA-H08",
    originalSkillaryLabel: null,
    surface: "ink",
    gridRatio: "intro + 1 / 1 audience decision",
    density: "low",
    cardMediaAnatomy: "owned audience icon, audience prompt, preparation checklist, one next step, reassurance",
    tokenAssignment: "ink-950, warm-50, brand-orange, ink-800",
    responsiveReflow: "two decisions stack with one primary action per block",
    interaction: "program anchor or contact route",
    intentionalDifference: "separates individual exploration from organization consultation",
  },
  {
    id: "SK-HP-13",
    core: "Footer",
    referenceId: "H18 + MA-H09",
    originalSkillaryLabel: null,
    surface: "ink",
    gridRatio: "brand statement and contact prompt + 4 audited link groups",
    density: "medium",
    cardMediaAnatomy: "wordmark, dual-audience promise, contact action, grouped safe destinations",
    tokenAssignment: "ink-950, ink-800, warm-50, brand-orange",
    responsiveReflow: "link groups collapse from four to two then one column",
    interaction: "native links only; no newsletter form",
    intentionalDifference: "compact Skillary navigation replaces marketplace acquisition modules",
  },
] as const satisfies readonly HomepageBlueprintBand[];

const BAND_BY_ID = new Map(
  HOMEPAGE_BLUEPRINT_BANDS.map((band) => [band.id, band] as const),
);

export function getHomepageBlueprintBand(
  id: HomepageBlueprintBandId,
): HomepageBlueprintBand {
  const band = BAND_BY_ID.get(id);
  if (!band) throw new Error(`Unknown homepage blueprint band: ${id}`);
  return band;
}

export function getHomepageBlueprintViolations(
  bands: readonly HomepageBlueprintBand[] = HOMEPAGE_BLUEPRINT_BANDS,
): string[] {
  const violations: string[] = [];
  const ids = new Set<string>();
  const requiredTextFields = [
    "core",
    "surface",
    "gridRatio",
    "density",
    "cardMediaAnatomy",
    "tokenAssignment",
    "responsiveReflow",
    "interaction",
    "intentionalDifference",
  ] as const;

  if (bands.length !== 13) violations.push(`expected-13-bands:received-${bands.length}`);

  for (const band of bands) {
    if (ids.has(band.id)) violations.push(`duplicate-id:${band.id}`);
    ids.add(band.id);

    if (!band.referenceId.trim() && !band.originalSkillaryLabel?.trim()) {
      violations.push(`missing-reference:${band.id}`);
    }

    for (const field of requiredTextFields) {
      if (!String(band[field]).trim()) violations.push(`missing-${field}:${band.id}`);
    }
  }

  return violations;
}

export function homepageBandAttributes(id: HomepageBlueprintBandId) {
  getHomepageBlueprintBand(id);
  return { "data-homepage-band": id } as const;
}
