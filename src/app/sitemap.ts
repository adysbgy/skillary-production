import { PROGRAMS, BLOG_POSTS } from "@/data/content";
import type { MetadataRoute } from "next";

const BASE_URL = "https://skillary.id";

export default function sitemap(): MetadataRoute.Sitemap {
    // NOTE: routes redirected to their /v2 equivalents in next.config.ts
    // (/about, /services, /program-catalog, /proposal, /contact, /resources,
    // /portfolio, /certificates, /demo) are intentionally omitted so the
    // sitemap only advertises live, non-redirecting URLs.
    const staticRoutes = [
        "",
        "/teams",
        "/platform",
        "/reports",
        "/learning-paths",
        "/training-brief",
        "/case-studies",
        "/expert-partner",
        "/explore",
        "/community",
        "/path",
        "/blog",
        "/privacy",
        "/terms",
    ].map((route) => ({
        url: `${BASE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1.0 : 0.8,
    }));

    const programRoutes = PROGRAMS.map((program) => ({
        url: `${BASE_URL}/program/${program.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    const blogRoutes = BLOG_POSTS.map((post) => ({
        url: `${BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...programRoutes, ...blogRoutes];
}
