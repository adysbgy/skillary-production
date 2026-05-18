import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { batchParticipantCreateSchema, normalizeEmail } from "@/lib/batch-constants";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id } = await params;

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const where: any = { batchId: id };
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
    ];
  }

  const participants = await prisma.batchParticipant.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json(participants);
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id: batchId } = await params;

  // Verify batch exists
  const batch = await prisma.trainingBatch.findUnique({ where: { id: batchId } });
  if (!batch) {
    return NextResponse.json({ error: "Batch tidak ditemukan." }, { status: 404 });
  }

  const body = await req.json();
  const parsed = batchParticipantCreateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed" },
      { status: 400 }
    );
  }

  const data = parsed.data;
  const email = normalizeEmail(data.email);

  // Check duplicate
  const existing = await prisma.batchParticipant.findUnique({
    where: { batchId_email: { batchId, email } },
  });
  if (existing) {
    return NextResponse.json(
      { error: `Peserta dengan email ${email} sudah ada di batch ini.` },
      { status: 409 }
    );
  }

  // Try to link existing user by email
  const existingUser = await prisma.user.findUnique({ where: { email } });

  const participant = await prisma.batchParticipant.create({
    data: {
      batchId,
      name: data.name,
      email,
      whatsapp: data.whatsapp || null,
      role: data.role || null,
      status: data.status as string,
      notes: data.notes || null,
      userId: existingUser?.id || null,
      invitedAt: new Date(),
    },
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json(participant, { status: 201 });
}
