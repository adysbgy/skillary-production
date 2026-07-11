import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Deprecated V1 "Demo Platform" page — consolidated into the V2 Services
      // page (in-house platform pitch, which funnels to /v2/proposal).
      // Permanent (308) so search engines drop the old indexed URL.
      {
        source: "/demo",
        destination: "/v2/untuk-organisasi",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
