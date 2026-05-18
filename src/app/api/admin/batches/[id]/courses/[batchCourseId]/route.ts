import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { batchCourseUpdateSchema } from "@/lib/batch-constants";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; batchCourseId: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id: batchId, batchCourseId } = await params;

  const existing = await prisma.batchCourse.findUnique({
    where: { id: batchCourseId },
  });
  if (!existing || existing.batchId !== batchId) {
    return NextResponse.json({ error: "BatchCourse not found in this batch." }, { status: 404 });
  }

  const body = await req.json();
  const parsed = batchCourseUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed" },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const updateData: any = {};
  if (d.required !== undefined) updateData.required = d.required;
  if (d.sortOrder !== undefined) updateData.sortOrder = d.sortOrder;

  const updated = await prisma.batchCourse.update({
    where: { id: batchCourseId },
    data: updateData,
    include: {
      course: {
        select: { id: true, title: true, slug: true, status: true, level: true, category: true },
      },
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; batchCourseId: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id: batchId, batchCourseId } = await params;

  const existing = await prisma.batchCourse.findUnique({
    where: { id: batchCourseId },
  });
  if (!existing || existing.batchId !== batchId) {
    return NextResponse.json({ error: "BatchCourse not found in this batch." }, { status: 404 });
  }

  await prisma.batchCourse.delete({ where: { id: batchCourseId } });

  return NextResponse.json({ ok: true });
}
