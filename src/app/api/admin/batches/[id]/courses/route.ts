import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { batchCourseCreateSchema } from "@/lib/batch-constants";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id } = await params;

  const courses = await prisma.batchCourse.findMany({
    where: { batchId: id },
    orderBy: { sortOrder: "asc" },
    include: {
      course: {
        select: { id: true, title: true, slug: true, status: true, level: true, category: true },
      },
    },
  });

  return NextResponse.json(courses);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id: batchId } = await params;

  const batch = await prisma.trainingBatch.findUnique({ where: { id: batchId } });
  if (!batch) {
    return NextResponse.json({ error: "Batch tidak ditemukan." }, { status: 404 });
  }

  const body = await req.json();
  const parsed = batchCourseCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed" },
      { status: 400 }
    );
  }

  const data = parsed.data;

  // Verify course exists
  const course = await prisma.course.findUnique({ where: { id: data.courseId } });
  if (!course) {
    return NextResponse.json({ error: "Course tidak ditemukan." }, { status: 404 });
  }

  // Check duplicate
  const existing = await prisma.batchCourse.findUnique({
    where: { batchId_courseId: { batchId, courseId: data.courseId } },
  });
  if (existing) {
    return NextResponse.json(
      { error: `Course "${course.title}" sudah ada di batch ini.` },
      { status: 409 }
    );
  }

  const batchCourse = await prisma.batchCourse.create({
    data: {
      batchId,
      courseId: data.courseId,
      required: data.required,
      sortOrder: data.sortOrder,
    },
    include: {
      course: {
        select: { id: true, title: true, slug: true, status: true, level: true, category: true },
      },
    },
  });

  return NextResponse.json(batchCourse, { status: 201 });
}
