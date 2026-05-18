import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { trainingBatchCreateSchema } from "@/lib/batch-constants";

export async function GET(req: Request) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const status = searchParams.get("status");
  const format = searchParams.get("format");
  const organizationId = searchParams.get("organizationId");

  const where: any = {};
  if (status) where.status = status;
  if (format) where.format = format;
  if (organizationId) where.organizationId = organizationId;
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { description: { contains: q } },
      { organization: { name: { contains: q } } },
    ];
  }

  const batches = await prisma.trainingBatch.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      organization: { select: { id: true, name: true } },
      _count: { select: { participants: true, courses: true } },
    },
    take: 200,
  });

  return NextResponse.json(batches);
}

export async function POST(req: Request) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  try {
    const body = await req.json();
    const parsed = trainingBatchCreateSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    // Verify organization exists
    const org = await prisma.organization.findUnique({
      where: { id: data.organizationId },
    });
    if (!org) {
      return NextResponse.json({ error: "Organisasi tidak ditemukan." }, { status: 404 });
    }

    const batch = await prisma.trainingBatch.create({
      data: {
        organizationId: data.organizationId,
        title: data.title,
        description: data.description || null,
        format: data.format as string,
        status: data.status as string,
        startDate: data.startDate ? new Date(data.startDate) : null,
        endDate: data.endDate ? new Date(data.endDate) : null,
        notes: data.notes || null,
      },
    });

    return NextResponse.json(batch, { status: 201 });
  } catch (err) {
    console.error("Batch creation failed:", err);
    return NextResponse.json(
      { error: "Gagal membuat training batch." },
      { status: 500 }
    );
  }
}
