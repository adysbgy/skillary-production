import { BLOG_POSTS } from "@/data/content";
import { PROGRAM_INDEX, slugify } from "@/data/v2-programs";
import { EVENTS } from "@/data/v2-events";
import { TRAINERS } from "@/data/trainers";
import type { MetadataRoute } from "next";

const BASE_URL = "https://skillary.my.id";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Primary canonical marketing routes. Legacy `/v2/**` variants are
    // preserved through permanent redirects and intentionally excluded here.
    const staticRoutes = [
        "",
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
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1.0 : 0.8,
    }));

    const programRoutes = PROGRAM_INDEX.map((program) => ({
        url: `${BASE_URL}/programs/${slugify(program.title)}`,
        lastModified: now,
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
