import { NextRequest, NextResponse } from "next/server";
import { requireAdminOrInstructorAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { uploadFile, deleteFile } from "@/lib/storage";

/**
 * Resource CRUD API for lesson file attachments.
 *
 * GET    /api/admin/resources?lessonId=xxx  — list resources for a lesson
 * POST   /api/admin/resources              — upload a file and create a resource record
 * DELETE /api/admin/resources              — remove a resource record and its file
 *
 * Auth: ADMIN or INSTRUCTOR (with ownership verification).
 */

async function verifyLessonOwnership(lessonId: string, userId: string, role: string): Promise<boolean> {
    if (role === "ADMIN") return true;
    const lesson = await prisma.lesson.findUnique({
        where: { id: lessonId },
        include: { module: { include: { course: true } } },
    });
    return lesson?.module.course.instructorId === userId;
}

const MAX_RESOURCES_PER_LESSON = 10;

export async function GET(req: NextRequest) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    const lessonId = req.nextUrl.searchParams.get("lessonId");
    if (!lessonId) {
        return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
    }

    const isOwner = await verifyLessonOwnership(lessonId, session.user.id, role);
    if (!isOwner) {
        return NextResponse.json({ error: "Unauthorized: You do not own this course" }, { status: 403 });
    }

    const resources = await (prisma as any).resource.findMany({
        where: { lessonId },
        orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(resources);
}

export async function POST(req: NextRequest) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const lessonId = formData.get("lessonId") as string;

        if (!file || !lessonId) {
            return NextResponse.json({ error: "file and lessonId are required" }, { status: 400 });
        }

        const isOwner = await verifyLessonOwnership(lessonId, session.user.id, role);
        if (!isOwner) {
            return NextResponse.json({ error: "Unauthorized: You do not own this course" }, { status: 403 });
        }

        // Check resource limit
        const existingCount = await (prisma as any).resource.count({ where: { lessonId } });
        if (existingCount >= MAX_RESOURCES_PER_LESSON) {
            return NextResponse.json(
                { error: `Maximum ${MAX_RESOURCES_PER_LESSON} resources per lesson.` },
                { status: 400 }
            );
        }

        // Upload file via storage abstraction
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadResult = await uploadFile(buffer, file.name, file.type, "resources");

        // Get next sort order
        const maxOrder = await (prisma as any).resource.aggregate({
            where: { lessonId },
            _max: { sortOrder: true },
        });

        const resource = await (prisma as any).resource.create({
            data: {
                lessonId,
                filename: file.name,
                url: uploadResult.url,
                fileType: uploadResult.fileType,
                fileSize: uploadResult.fileSize,
                sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
            },
        });

        return NextResponse.json(resource, { status: 201 });
    } catch (error: any) {
        const status = error.message?.includes("not allowed") || error.message?.includes("exceeds") ? 400 : 500;
        return NextResponse.json({ error: error.message || "Upload failed" }, { status });
    }
}

export async function DELETE(req: NextRequest) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "Resource ID is required" }, { status: 400 });
        }

        const resource = await (prisma as any).resource.findUnique({
            where: { id },
            include: { lesson: { include: { module: { include: { course: true } } } } },
        });

        if (!resource) {
            return NextResponse.json({ error: "Resource not found" }, { status: 404 });
        }

        // Verify ownership
        const courseOwnerId = resource.lesson.module.course.instructorId;
        if (role !== "ADMIN" && courseOwnerId !== session.user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Delete file from storage
        await deleteFile(resource.url);

        // Delete record
        await (prisma as any).resource.delete({ where: { id } });

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
