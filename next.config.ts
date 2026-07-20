import type { NextConfig } from "next";

// Legacy V1 marketing pages are superseded by the /v2/* surface that the live
// homepage + header now point to. Redirect the old URLs (all still indexed) to
// their V2 equivalents so there is a single funnel and no duplicate content.
// Permanent (308) so search engines drop the old URLs.
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  // Lead-capture funnel → single canonical proposal form
  { source: "/contact", destination: "/v2/proposal" },
  { source: "/proposal", destination: "/v2/proposal" },
  // Duplicated marketing pages → their V2 counterparts
  { source: "/demo", destination: "/v2/untuk-organisasi" },
  { source: "/services", destination: "/v2/untuk-organisasi" },
  { source: "/teams", destination: "/v2/untuk-organisasi" },
  { source: "/platform", destination: "/v2/untuk-organisasi" },
  { source: "/reports", destination: "/v2/untuk-organisasi" },
  { source: "/about", destination: "/v2/about" },
  { source: "/portfolio", destination: "/portofolio" },
  { source: "/portfolio-arsip", destination: "/portofolio" },
  { source: "/case-studies", destination: "/portofolio" },
  { source: "/v2/portfolio", destination: "/portofolio" },
  { source: "/resources", destination: "/v2/resources" },
  { source: "/certificates", destination: "/v2/certificates" },
  { source: "/program-catalog", destination: "/v2/catalog" },
  { source: "/training-brief", destination: "/v2/proposal" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return LEGACY_REDIRECTS.map((r) => ({ ...r, permanent: true }));
  },
};

export default nextConfig;
