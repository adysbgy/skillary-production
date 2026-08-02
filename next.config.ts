import type { NextConfig } from "next";

// Legacy V1 marketing pages are superseded by the /v2/* surface that the live
// homepage + header now point to. Redirect the old URLs (all still indexed) to
// their V2 equivalents so there is a single funnel and no duplicate content.
// Permanent (308) so search engines drop the old URLs.
const CANONICAL_ORIGIN = "https://skillary.my.id";

const GLOBAL_SECURITY_HEADERS = [
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "X-DNS-Prefetch-Control", value: "off" },
  { key: "Cross-Origin-Resource-Policy", value: "same-site" },
];

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
  poweredByHeader: false,
  experimental: {
    // Resource uploads are validated at 20 MB in src/lib/storage.ts. Proxy
    // buffering must be slightly larger so valid multipart bodies are not cut.
    proxyClientMaxBodySize: "21mb",
  },
  async headers() {
    return [
      { source: "/:path*", headers: GLOBAL_SECURITY_HEADERS },
      { source: "/trainer-review/:path*", headers: [
        { key: "Cache-Control", value: "private, no-store, max-age=0" },
        { key: "Referrer-Policy", value: "no-referrer" },
        { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
      ] },
    ];
  },
  async redirects() {
    return [
      ...LEGACY_HOST_REDIRECTS,
      ...LEGACY_REDIRECTS.map((redirect) => ({ ...redirect, permanent: true })),
    ];
  },

};

export default nextConfig;
