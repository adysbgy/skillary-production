import { NextResponse } from "next/server";
import { requireAdminOrInstructorAPI, requireCourseOwnershipAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { logAuditEvent } from "@/lib/audit";
import { deleteFile } from "@/lib/storage";

const courseSchema = z.object({
    title: z.string().min(1, "Title is required").max(120),
    description: z.string().optional(),
    level: z.string().optional(),
    duration: z.string().optional(),
    category: z.string().optional(),
    price: z.number().min(0).optional(),
    status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
    thumbnailUrl: z.string().nullable().optional(),
    outcomesData: z.string().nullable().optional(),
    audienceData: z.string().nullable().optional(),
    prerequisitesData: z.string().nullable().optional(),
    certificateMode: z.enum(["INCLUDED", "PAID_DIGITAL", "DISABLED"]).optional(),
    digitalCertificatePrice: z.number().int().min(0).nullable().optional(),
});

function generateSlug(title: string) {
    const baseSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const randomSuffix = Math.random().toString(36).substring(2, 7);
    return `${baseSlug}-${randomSuffix}`;
}

export async function GET(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const fetchTemplates = searchParams.get("templates") === "true";

    let whereClause: any = {};
    if (fetchTemplates) {
        whereClause = { status: "TEMPLATE" };
    } else {
        whereClause = role === "INSTRUCTOR" ? { instructorId: session.user.id } : {};
    }

    if (id) {
        whereClause.id = id;
    }

    const courses = await prisma.course.findMany({
        where: whereClause,
        orderBy: { updatedAt: "desc" },
        include: {
            modules: {
                orderBy: { sortOrder: "asc" },
                include: {
                    lessons: { orderBy: { sortOrder: "asc" } },
                },
            },
            _count: { select: { enrollments: true } },
        },
    });

    if (id) {
        if (courses.length === 0) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(courses[0]);
    }

    return NextResponse.json(courses);
}

export async function POST(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const body = await req.json();
        const parsed = courseSchema.parse(body);

        // ADMIN can assign a different instructor; INSTRUCTOR auto-assigns to self
        let assignedInstructorId = session.user.id;
        if (role === "ADMIN" && body.instructorId) {
            const targetInstructor = await prisma.user.findUnique({ where: { id: body.instructorId } });
            if (!targetInstructor || (targetInstructor.role !== "INSTRUCTOR" && targetInstructor.role !== "ADMIN")) {
                return NextResponse.json({ error: "Target instructor must have INSTRUCTOR or ADMIN role" }, { status: 400 });
            }
            assignedInstructorId = body.instructorId;
        }

        const course = await prisma.course.create({
            data: {
                slug: generateSlug(parsed.title),
                title: parsed.title,
                description: parsed.description || "",
                level: parsed.level || "Beginner",
                duration: parsed.duration || "",
                category: parsed.category || "General",
                price: parsed.price ?? 0,
                status: parsed.status || "DRAFT",
                instructorId: assignedInstructorId,
            } as any,
        });

        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation error", issues: error.issues }, { status: 400 });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const body = await req.json();
        const { id, ...updateData } = body;
        if (!id) return NextResponse.json({ error: "Course ID is required" }, { status: 400 });

        const courseToUpdate = await prisma.course.findUnique({ where: { id } });
        if (!courseToUpdate) return NextResponse.json({ error: "Course not found" }, { status: 404 });

        const ownershipError = requireCourseOwnershipAPI(role, courseToUpdate.instructorId, session.user.id);
        if (ownershipError.error) return ownershipError.error;

        const parsed = courseSchema.partial().parse(updateData);

        // --- Phase 3: Course ownership reassignment (ADMIN only) ---
        let ownershipChanged = false;
        if (body.instructorId !== undefined && body.instructorId !== courseToUpdate.instructorId) {
            if (role !== "ADMIN") {
                return NextResponse.json({ error: "Only admins can reassign course ownership" }, { status: 403 });
            }
            const targetInstructor = await prisma.user.findUnique({ where: { id: body.instructorId } });
            if (!targetInstructor || (targetInstructor.role !== "INSTRUCTOR" && targetInstructor.role !== "ADMIN")) {
                return NextResponse.json({ error: "Target instructor must have INSTRUCTOR or ADMIN role" }, { status: 400 });
            }
            ownershipChanged = true;
        }

        // --- Phase 4: Publish authority enforcement ---
        if (parsed.status && parsed.status !== courseToUpdate.status) {
            // Only ADMIN or the course owner can change publish status
            if (role === "INSTRUCTOR" && courseToUpdate.instructorId !== session.user.id) {
                return NextResponse.json({ error: "You can only change the publish status of your own courses" }, { status: 403 });
            }

            // STRICT GOVERNANCE: Templates cannot be published to the live catalog
            if (courseToUpdate.status === "TEMPLATE" && parsed.status === "PUBLISHED") {
                return NextResponse.json({ error: "Template blueprints cannot be published directly. Duplicate the template into a draft course first." }, { status: 400 });
            }
        }

        if (parsed.status === "PUBLISHED") {
            const courseState = await prisma.course.findUnique({
                where: { id },
                include: { modules: { include: { lessons: true } } }
            });

            if (!courseState) return NextResponse.json({ error: "Course not found" }, { status: 404 });

            const effectiveTitle = parsed.title ?? courseState.title;
            const effectiveDesc = parsed.description ?? courseState.description;
            const effectiveThumbnail = parsed.thumbnailUrl !== undefined ? parsed.thumbnailUrl : (courseState as any).thumbnailUrl;

            if (!effectiveTitle?.trim()) return NextResponse.json({ error: "Cannot publish: Title is required" }, { status: 400 });
            if (!effectiveDesc?.trim()) return NextResponse.json({ error: "Cannot publish: Description is required" }, { status: 400 });
            if (!effectiveThumbnail?.trim()) return NextResponse.json({ error: "Cannot publish: Course Cover Image (Thumbnail) is required" }, { status: 400 });
            if (courseState.modules.length === 0) return NextResponse.json({ error: "Cannot publish: Course must have at least one module" }, { status: 400 });

            let hasValidLessons = false;
            for (const m of courseState.modules) {
                for (const l of m.lessons) {
                    let hasContent = false;
                    if (l.type === "TEXT" && l.content && l.content.trim().length > 10) hasContent = true;
                    if (l.type === "VIDEO" && l.videoUrl && l.videoUrl.trim().length > 5) hasContent = true;
                    if (l.type === "QUIZ" && l.quizData && l.quizData.trim().length > 10) {
                        try {
                            const qs = JSON.parse(l.quizData);
                            if (Array.isArray(qs) && qs.length > 0) hasContent = true;
                        } catch { }
                    }
                    if (!hasContent) {
                        return NextResponse.json({ error: `Cannot publish: Lesson "${l.title}" has no substantive content.` }, { status: 400 });
                    }
                    hasValidLessons = true;
                }
            }
            if (!hasValidLessons) return NextResponse.json({ error: "Cannot publish: Course must have at least one valid lesson" }, { status: 400 });
        }

        const dataToUpdate: any = { ...parsed };
        if (ownershipChanged) {
            dataToUpdate.instructorId = body.instructorId;
        }

        // --- Phase 2B: Certificate settings validation ---
        const effectiveCertMode = parsed.certificateMode ?? (courseToUpdate as any).certificateMode ?? "INCLUDED";
        const effectiveCertPrice = parsed.digitalCertificatePrice !== undefined ? parsed.digitalCertificatePrice : (courseToUpdate as any).digitalCertificatePrice;

        if (effectiveCertMode === "PAID_DIGITAL") {
            if (effectiveCertPrice === null || effectiveCertPrice <= 0) {
                return NextResponse.json({ error: "PAID_DIGITAL mode requires a digitalCertificatePrice greater than 0" }, { status: 400 });
            }
            dataToUpdate.digitalCertificatePrice = effectiveCertPrice;
        } else {
            // Clear the price if mode is not PAID_DIGITAL
            dataToUpdate.digitalCertificatePrice = null;
        }

        // Track prior thumbnail for cleanup
        const oldThumbnailUrl = (parsed.thumbnailUrl !== undefined && parsed.thumbnailUrl !== (courseToUpdate as any).thumbnailUrl)
            ? (courseToUpdate as any).thumbnailUrl
            : null;

        const course = await prisma.course.update({
            where: { id },
            data: dataToUpdate,
        });

        // --- Phase 5: Audit logging ---
        if (ownershipChanged) {
            await logAuditEvent("COURSE_REASSIGN", session.user.id, id, JSON.stringify({
                courseTitle: courseToUpdate.title,
                oldInstructorId: courseToUpdate.instructorId,
                newInstructorId: body.instructorId
            }));
        }
        if (parsed.status && parsed.status !== courseToUpdate.status) {
            await logAuditEvent("PUBLISH_CHANGE", session.user.id, id, JSON.stringify({
                courseTitle: courseToUpdate.title,
                oldStatus: courseToUpdate.status,
                newStatus: parsed.status
            }));
        }

        // GC old thumbnail
        if (oldThumbnailUrl) {
            await deleteFile(oldThumbnailUrl);
        }

        return NextResponse.json(course);
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation error", issues: error.issues }, { status: 400 });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const { id } = await req.json();
        if (!id) return NextResponse.json({ error: "Course ID is required" }, { status: 400 });

        const courseToUpdate = await prisma.course.findUnique({ where: { id } });
        const ownershipError = requireCourseOwnershipAPI(role, courseToUpdate?.instructorId, session.user.id);
        if (ownershipError.error) return ownershipError.error;

        const count = await prisma.enrollment.count({ where: { courseId: id } });
        if (count > 0) {
            return NextResponse.json({
                error: `Cannot hard delete: This course has ${count} active learner enrollment(s). Data preservation constraint active. Set status to ARCHIVED instead.`
            }, { status: 400 });
        }

        // Fetch all resources to delete physical files
        const resources = await (prisma as any).resource.findMany({
            where: { lesson: { module: { courseId: id } } }
        });

        await prisma.course.delete({ where: { id } });

        // Physical cleanup
        if ((courseToUpdate as any)?.thumbnailUrl) {
            await deleteFile((courseToUpdate as any).thumbnailUrl);
        }
        for (const res of resources) {
            await deleteFile(res.url);
        }

        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
