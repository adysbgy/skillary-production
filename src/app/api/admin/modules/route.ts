import { NextResponse } from "next/server";
import { requireAdminOrInstructorAPI, requireCourseOwnershipAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const moduleSchema = z.object({
    courseId: z.string().min(1, "Course ID is required"),
    title: z.string().min(1, "Title is required").max(150),
});

export async function POST(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const body = await req.json();
        const parsed = moduleSchema.parse(body);

        const course = await prisma.course.findUnique({ where: { id: parsed.courseId } });
        const ownershipError = requireCourseOwnershipAPI(role, course?.instructorId, session.user.id);
        if (ownershipError.error) return ownershipError.error;

        const maxOrder = await prisma.module.aggregate({
            where: { courseId: parsed.courseId },
            _max: { sortOrder: true },
        });

        const mod = await prisma.module.create({
            data: {
                courseId: parsed.courseId,
                title: parsed.title,
                sortOrder: (maxOrder._max.sortOrder ?? -1) + 1,
            },
        });

        return NextResponse.json(mod, { status: 201 });
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
        if (!id) return NextResponse.json({ error: "Module ID is required" }, { status: 400 });

        const mod = await prisma.module.findUnique({ where: { id }, include: { course: true } });
        if (!mod) return NextResponse.json({ error: "Module not found" }, { status: 404 });

        const ownershipError = requireCourseOwnershipAPI(role, mod.course?.instructorId, session.user.id);
        if (ownershipError.error) return ownershipError.error;

        const enrollmentCount = await prisma.enrollment.count({ where: { courseId: mod.courseId } });
        if (enrollmentCount > 0) {
            return NextResponse.json({
                error: `Safety Block: Cannot delete module. The parent course has ${enrollmentCount} active learner(s). Structure cannot be dynamically altered while populated.`
            }, { status: 400 });
        }

        await prisma.module.delete({ where: { id } });
        return NextResponse.json({ ok: true });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

const moduleUpdateSchema = z.object({
    id: z.string().min(1, "Module ID is required"),
    title: z.string().min(1, "Title is required").max(150),
});

export async function PUT(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const body = await req.json();
        const parsed = moduleUpdateSchema.parse(body);

        const mod = await prisma.module.findUnique({ where: { id: parsed.id }, include: { course: true } });
        if (!mod) return NextResponse.json({ error: "Module not found" }, { status: 404 });

        const ownershipError = requireCourseOwnershipAPI(role, mod.course?.instructorId, session.user.id);
        if (ownershipError.error) return ownershipError.error;

        const updated = await prisma.module.update({
            where: { id: parsed.id },
            data: { title: parsed.title },
        });

        return NextResponse.json(updated);
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation error", issues: error.issues }, { status: 400 });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

const reorderSchema = z.array(z.object({
    id: z.string().min(1),
    sortOrder: z.number(),
}));

export async function PATCH(req: Request) {
    const { session, role, error: authError } = await requireAdminOrInstructorAPI();
    if (authError) return authError;

    try {
        const body = await req.json();
        const parsed = reorderSchema.parse(body);

        if (parsed.length > 0 && role === "INSTRUCTOR") {
            const firstMod = await prisma.module.findUnique({ where: { id: parsed[0].id }, include: { course: true } });
            const ownershipError = requireCourseOwnershipAPI(role, firstMod?.course.instructorId, session.user.id, "Unauthorized");
            if (ownershipError.error) return ownershipError.error;
        }

        await prisma.$transaction(
            parsed.map(item =>
                prisma.module.update({
                    where: { id: item.id },
                    data: { sortOrder: item.sortOrder }
                })
            )
        );

        return NextResponse.json({ ok: true });
    } catch (error) {
        if (error instanceof z.ZodError) return NextResponse.json({ error: "Validation error", issues: error.issues }, { status: 400 });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
