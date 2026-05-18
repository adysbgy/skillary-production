import { PROGRAMS, BLOG_POSTS } from "@/data/content";
import type { MetadataRoute } from "next";

const BASE_URL = "https://skillary.id";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        "",
        "/about",
        "/teams",
        "/platform",
        "/services",
        "/program-catalog",
        "/demo",
        "/reports",
        "/learning-paths",
        "/training-brief",
        "/proposal",
        "/contact",
        "/resources",
        "/portfolio",
        "/case-studies",
        "/expert-partner",
        "/certificates",
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
