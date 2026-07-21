import type { NextConfig } from "next";

// Legacy V1 marketing pages are superseded by the /v2/* surface that the live
// homepage + header now point to. Redirect the old URLs (all still indexed) to
// their V2 equivalents so there is a single funnel and no duplicate content.
// Permanent (308) so search engines drop the old URLs.
const CANONICAL_ORIGIN = "https://skillary.my.id";

const LEGACY_HOST_REDIRECTS = [
  {
    source: "/:path*",
    has: [{ type: "host", value: "datacamp.id" }],
    destination: `${CANONICAL_ORIGIN}/:path*`,
    permanent: true,
  },
  {
    source: "/:path*",
    has: [{ type: "host", value: "www.datacamp.id" }],
    destination: `${CANONICAL_ORIGIN}/:path*`,
    permanent: true,
  },
];

const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  // Replaced V2 route families → clean canonical paths. Put the most-specific
  // checkout/detail patterns before their collection routes.
  { source: "/v2/events/:slug/checkout", destination: "/events/:slug/checkout" },
  { source: "/v2/events/:slug", destination: "/events/:slug" },
  { source: "/v2/events", destination: "/events" },
  { source: "/v2/program/:slug", destination: "/programs/:slug" },
  { source: "/v2/catalog", destination: "/programs" },
  { source: "/v2/untuk-organisasi", destination: "/untuk-organisasi" },
  { source: "/v2/about", destination: "/about" },
  { source: "/v2/resources", destination: "/resources" },
  { source: "/v2/proposal", destination: "/contact" },
  { source: "/v2/portfolio", destination: "/portofolio" },

  // Older duplicate routes → their final clean destinations (no redirect
  // chains through /v2).
  { source: "/proposal", destination: "/contact" },
  { source: "/demo", destination: "/untuk-organisasi" },
  { source: "/services", destination: "/untuk-organisasi" },
  { source: "/teams", destination: "/untuk-organisasi" },
  { source: "/platform", destination: "/untuk-organisasi" },
  { source: "/reports", destination: "/untuk-organisasi" },
  { source: "/portfolio", destination: "/portofolio" },
  { source: "/portfolio-arsip", destination: "/portofolio" },
  { source: "/case-studies", destination: "/portofolio" },
  { source: "/program-catalog", destination: "/programs" },
  { source: "/training-brief", destination: "/contact" },

  // No clean replacement has been approved for this route yet.
  { source: "/certificates", destination: "/v2/certificates" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...LEGACY_HOST_REDIRECTS,
      ...LEGACY_REDIRECTS.map((redirect) => ({ ...redirect, permanent: true })),
    ];
  },

};

export default nextConfig;
