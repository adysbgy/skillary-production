import { prisma } from "@/lib/prisma";
import ExploreClient from "./ExploreClient";

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
    const courses = await prisma.course.findMany({
        where: { status: "PUBLISHED" },
        include: { _count: { select: { enrollments: true } } }
    });

    const mapped = courses.map((c: any) => ({
        slug: c.slug,
        title: c.title,
        description: c.description,
        level: c.level,
        duration: c.duration || "Self-paced",
        format: "Self-paced",
        category: c.category || "General",
        skills: [c.category || "Digital Skills", c.level].filter(Boolean),
        price: c.price || 0,
        thumbnailUrl: c.thumbnailUrl || null,
    }));

    return <ExploreClient programs={mapped} />;
}
