import "server-only";

export type HomepageProgramAsset = {
  slug: string;
  origin: "existing-skillary-homepage";
  sourcePath: string;
  sourceSha256: string;
  derivativePath: string;
  derivativeSha256: string;
  isIllustrative: true;
  allowedUse: readonly ["homepage-program-card"];
  label: "Ilustrasi program";
  alt: string;
  approvedForPreview: true;
};

export const HOMEPAGE_PROGRAM_ASSETS = {
  "power-bi-business-dashboard": {
    slug: "power-bi-business-dashboard",
    origin: "existing-skillary-homepage",
    sourcePath: "/images/thumb-powerbi.png",
    sourceSha256: "d11127c8b3eebd2f333766b9cde397e68eb131bd0eca0c739c90355c51cc8993",
    derivativePath: "/images/homepage-preview/programs/power-bi-business-dashboard.webp",
    derivativeSha256: "87384f164b0d495ff61df0d8e05e1317319f8561aba71a908699d45e3f55b3b2",
    isIllustrative: true,
    allowedUse: ["homepage-program-card"],
    label: "Ilustrasi program",
    alt: "Ilustrasi profesional meninjau dashboard data",
    approvedForPreview: true,
  },
  "data-driven-decision-making": {
    slug: "data-driven-decision-making",
    origin: "existing-skillary-homepage",
    sourcePath: "/images/thumb-data.png",
    sourceSha256: "fbb8b7af79496fea913fe74c95c37c8ac3078b9cc112cebed42093fda58c98e8",
    derivativePath: "/images/homepage-preview/programs/data-driven-decision-making.webp",
    derivativeSha256: "fddd4f88177541004a22e6bbf31c80402caecc9e6218fe0146e4c93be08dd861",
    isIllustrative: true,
    allowedUse: ["homepage-program-card"],
    label: "Ilustrasi program",
    alt: "Ilustrasi tim profesional meninjau informasi untuk pengambilan keputusan",
    approvedForPreview: true,
  },
  "ai-productivity-for-teams": {
    slug: "ai-productivity-for-teams",
    origin: "existing-skillary-homepage",
    sourcePath: "/images/hero-training.png",
    sourceSha256: "5a382ae9d0e1a65757958bde427b3a626ea8687c5436b97a6d0f4ff59cae11ed",
    derivativePath: "/images/homepage-preview/programs/ai-productivity-for-teams.webp",
    derivativeSha256: "f8d0ea461f39fbab7d81fba3c29d91cd40c30cb03e21e62c68ce091d1a7c4f1b",
    isIllustrative: true,
    allowedUse: ["homepage-program-card"],
    label: "Ilustrasi program",
    alt: "Ilustrasi tim berkolaborasi menggunakan perangkat digital",
    approvedForPreview: true,
  },
  "business-presentation-reporting": {
    slug: "business-presentation-reporting",
    origin: "existing-skillary-homepage",
    sourcePath: "/images/thumb-presentation.png",
    sourceSha256: "2f4e2b47f34fd9abd07635d60641bf8c62aba551a5f6b5868163cec894f1f3b1",
    derivativePath: "/images/homepage-preview/programs/business-presentation-reporting.webp",
    derivativeSha256: "4df286ebe013df26c38c8946ee62050981e4584d3a6b22a42b7f8edb90a1275a",
    isIllustrative: true,
    allowedUse: ["homepage-program-card"],
    label: "Ilustrasi program",
    alt: "Ilustrasi profesional membawakan presentasi bisnis",
    approvedForPreview: true,
  },
} as const satisfies Record<string, HomepageProgramAsset>;

export function homepageProgramAsset(slug: string): HomepageProgramAsset | null {
  return HOMEPAGE_PROGRAM_ASSETS[slug as keyof typeof HOMEPAGE_PROGRAM_ASSETS] ?? null;
}
