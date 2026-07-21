import { PROGRAMS, BLOG_POSTS } from "@/data/content";
import { EVENTS } from "@/data/v2-events";
import { TRAINERS } from "@/data/trainers";
import type { MetadataRoute } from "next";

const BASE_URL = "https://skillary.my.id";

export default function sitemap(): MetadataRoute.Sitemap {
    // Only live, non-redirecting URLs are advertised. Legacy V1 pages
    // redirected to their /v2 equivalents in next.config.ts (/about, /services,
    // /teams, /platform, /reports, /program-catalog, /proposal, /contact,
    // /resources, /portfolio, /certificates, /case-studies, /training-brief,
    // /demo) are omitted. The canonical /v2 marketing pages are the primary
    // surface and listed first.
    const staticRoutes = [
        "",
        // Canonical V2 marketing surface
        "/programs",
        "/events",
        "/resources",
        "/untuk-organisasi",
        "/about",
        "/contact",
        "/portofolio",
        "/v2/certificates",
        "/trainers",
        "/trainer-verification",
        // Live V1 pages kept (functional / no V2 equivalent yet)
        "/learning-paths",
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

    const eventRoutes = EVENTS.map((event) => ({
        url: `${BASE_URL}/events/${event.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.6,
    }));

    const trainerRoutes = TRAINERS.map((trainer) => ({
        url: `${BASE_URL}/trainers/${trainer.slug}`,
        lastModified: new Date(trainer.updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.7,
    }));

    return [...staticRoutes, ...programRoutes, ...blogRoutes, ...eventRoutes, ...trainerRoutes];
}
