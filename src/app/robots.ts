import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ['/dashboard/', '/admin/', '/api/', '/checkout/', '/thank-you', '/login', '/register', '/forgot-password', '/reset-password', '/resources/sales-deck', '/resources/company-profile', '/resources/corporate-proposal'],
        },
        sitemap: "https://skillary.id/sitemap.xml",
    };
}
