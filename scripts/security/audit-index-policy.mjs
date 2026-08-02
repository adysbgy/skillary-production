import { readFile } from "node:fs/promises";
import { resolveExactRouteFile } from "./resolve-exact-route-file.mjs";

const config = await readFile("next.config.ts", "utf8");
if (config.includes('source: "/:path+"') && config.includes('rel=\\"canonical\\"')) {
  throw new Error("Unsafe blanket dynamic canonical header remains");
}

const canonicals = {
  "src/app/blog/[slug]/page.tsx": "`/blog/${post.slug}`",
  "src/app/program/[id]/page.tsx": "`/program/${program.slug}`",
  "src/app/path/[slug]/page.tsx": "`/path/${path.slug}`",
  "src/app/trainers/[slug]/page.tsx": "`/trainers/${t.slug}`",
};

for (const [file, needle] of Object.entries(canonicals)) {
  const source = await readFile(file, "utf8");
  if (!source.includes(needle)) throw new Error(`${file} lacks a page-aware canonical`);
}

const retiredEventDetail = await readFile("src/app/events/[slug]/page.tsx", "utf8");
if (!retiredEventDetail.includes("index: false") || !retiredEventDetail.includes("notFound()")) {
  throw new Error("Retired event detail route must remain noindex and unavailable");
}

const privateRoutes = [
  { route: "/admin", candidates: ["src/app/admin/layout.tsx"] },
  { route: "/dashboard", candidates: ["src/app/dashboard/layout.tsx"] },
  { route: "/learn", candidates: ["src/app/learn/layout.tsx"] },
  { route: "/checkout", candidates: ["src/app/checkout/layout.tsx"] },
  { route: "/trainer-review", candidates: ["src/app/trainer-review/layout.tsx", "src/app/(standalone)/trainer-review/layout.tsx"] },
  { route: "/login", candidates: ["src/app/login/layout.tsx", "src/app/(auth)/login/layout.tsx"] },
  { route: "/register", candidates: ["src/app/register/layout.tsx", "src/app/(auth)/register/layout.tsx"] },
  { route: "/forgot-password", candidates: ["src/app/forgot-password/layout.tsx", "src/app/(auth)/forgot-password/layout.tsx"] },
  { route: "/reset-password", candidates: ["src/app/reset-password/layout.tsx", "src/app/(auth)/reset-password/layout.tsx"] },
  { route: "/thank-you", candidates: ["src/app/thank-you/layout.tsx", "src/app/(standalone)/thank-you/layout.tsx"] },
];

for (const privateRoute of privateRoutes) {
  const file = await resolveExactRouteFile(privateRoute);
  const source = await readFile(file, "utf8");
  if (!source.includes("PRIVATE_ROUTE_METADATA")) {
    throw new Error(`${privateRoute.route} lacks private-route metadata (${file})`);
  }
}

const sitemap = await readFile("src/app/sitemap.ts", "utf8");
for (const route of ["/admin", "/dashboard", "/checkout", "/login", "/register", "/trainer-review", "/preview"]) {
  if (sitemap.includes(`"${route}`)) throw new Error(`Private route appears in sitemap: ${route}`);
}

console.log("Canonical and index-policy audit passed.");
