import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { trainingBatchUpdateSchema } from "@/lib/batch-constants";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id } = await params;
  const batch = await prisma.trainingBatch.findUnique({
    where: { id },
    include: {
      organization: { select: { id: true, name: true, sector: true } },
      _count: { select: { participants: true, courses: true } },
    },
  });

  if (!batch) {
    return NextResponse.json({ error: "Batch not found" }, { status: 404 });
  }

  return NextResponse.json(batch);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id } = await params;

  const body = await req.json();
  const parsed = trainingBatchUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed" },
      { status: 400 }
    );
  }

  const existing = await prisma.trainingBatch.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Batch not found" }, { status: 404 });
  }

  const d = parsed.data;

  // Verify organization if changed
  if (d.organizationId && d.organizationId !== existing.organizationId) {
    const org = await prisma.organization.findUnique({
      where: { id: d.organizationId },
    });
    if (!org) {
      return NextResponse.json({ error: "Organisasi tidak ditemukan." }, { status: 404 });
    }
  }

  const updateData: any = {};
  if (d.organizationId !== undefined) updateData.organizationId = d.organizationId;
  if (d.title !== undefined) updateData.title = d.title;
  if (d.description !== undefined) updateData.description = d.description || null;
  if (d.format !== undefined) updateData.format = d.format;
  if (d.status !== undefined) updateData.status = d.status;
  if (d.notes !== undefined) updateData.notes = d.notes || null;
  if (d.startDate !== undefined) {
    updateData.startDate = d.startDate ? new Date(d.startDate) : null;
  }
  if (d.endDate !== undefined) {
    updateData.endDate = d.endDate ? new Date(d.endDate) : null;
  }

  const updated = await prisma.trainingBatch.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(updated);
}
