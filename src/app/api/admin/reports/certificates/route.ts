import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateCSV, csvResponse } from "@/lib/csv";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        return new Response("Unauthorized", { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

    if (!courseId) {
        return new Response("Missing courseId", { status: 400 });
    }

    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
            certificates: {
                include: { user: { select: { name: true, email: true } } },
                orderBy: { issuedAt: "desc" }
            }
        }
    });

    if (!course) return new Response("Course not found", { status: 404 });

    if (role === "INSTRUCTOR" && (course as any).instructorId !== session.user.id) {
        return new Response("Forbidden", { status: 403 });
    }

    const headers = [
        "Course Title",
        "Learner Name",
        "Learner Email",
        "Certificate Code",
        "Issued Date"
    ];

    const rows = course.certificates.map(cert => [
        course.title,
        cert.user.name || "Unknown",
        cert.user.email,
        cert.uniqueCode,
        cert.issuedAt.toISOString().split("T")[0]
    ]);

    const csv = generateCSV(headers, rows);
    const filename = `Certificates_${course.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${new Date().toISOString().split('T')[0]}.csv`;

    return csvResponse(csv, filename);
}
