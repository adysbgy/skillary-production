import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { batchParticipantUpdateSchema, normalizeEmail } from "@/lib/batch-constants";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; participantId: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id: batchId, participantId } = await params;

  const existing = await prisma.batchParticipant.findUnique({
    where: { id: participantId },
  });
  if (!existing || existing.batchId !== batchId) {
    return NextResponse.json({ error: "Participant not found in this batch." }, { status: 404 });
  }

  const body = await req.json();
  const parsed = batchParticipantUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed" },
      { status: 400 }
    );
  }

  const d = parsed.data;
  const updateData: any = {};

  if (d.name !== undefined) updateData.name = d.name;
  if (d.whatsapp !== undefined) updateData.whatsapp = d.whatsapp || null;
  if (d.role !== undefined) updateData.role = d.role || null;
  if (d.status !== undefined) updateData.status = d.status;
  if (d.notes !== undefined) updateData.notes = d.notes || null;

  // Handle email update with re-link
  if (d.email !== undefined) {
    const newEmail = normalizeEmail(d.email);
    if (newEmail !== existing.email) {
      // Check duplicate
      const dup = await prisma.batchParticipant.findUnique({
        where: { batchId_email: { batchId, email: newEmail } },
      });
      if (dup) {
        return NextResponse.json(
          { error: `Email ${newEmail} sudah digunakan peserta lain di batch ini.` },
          { status: 409 }
        );
      }
      updateData.email = newEmail;
      // Re-link user
      const user = await prisma.user.findUnique({ where: { email: newEmail } });
      updateData.userId = user?.id || null;
    }
  }

  // Track joinedAt on status change to JOINED
  if (d.status === "JOINED" && !existing.joinedAt) {
    updateData.joinedAt = new Date();
  }

  const updated = await prisma.batchParticipant.update({
    where: { id: participantId },
    data: updateData,
    include: {
      user: { select: { id: true, name: true, email: true } },
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; participantId: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id: batchId, participantId } = await params;

  const existing = await prisma.batchParticipant.findUnique({
    where: { id: participantId },
  });
  if (!existing || existing.batchId !== batchId) {
    return NextResponse.json({ error: "Participant not found in this batch." }, { status: 404 });
  }

  // Soft-remove: set status to REMOVED
  const updated = await prisma.batchParticipant.update({
    where: { id: participantId },
    data: { status: "REMOVED" },
  });

  return NextResponse.json(updated);
}
