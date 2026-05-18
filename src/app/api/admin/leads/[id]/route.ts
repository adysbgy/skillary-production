import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { updateLeadSchema, STATUS_TIMESTAMP_MAP, type LeadStatus } from "@/lib/lead-constants";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id } = await params;

  const body = await req.json();
  const parsed = updateLeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed" },
      { status: 400 }
    );
  }

  const existing = await prisma.lead.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const updateData: any = {};

  // Status update with lifecycle timestamps
  if (parsed.data.status !== undefined) {
    updateData.status = parsed.data.status;
    const tsField = STATUS_TIMESTAMP_MAP[parsed.data.status as LeadStatus];
    if (tsField && !(existing as any)[tsField]) {
      updateData[tsField] = new Date();
    }
  }

  // Notes update
  if (parsed.data.notes !== undefined) {
    updateData.notes = parsed.data.notes;
  }

  // Archive/restore
  if (parsed.data.archived === true) {
    updateData.archivedAt = new Date();
  } else if (parsed.data.archived === false) {
    updateData.archivedAt = null;
  }

  const updated = await prisma.lead.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(updated);
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id } = await params;
  const lead = await prisma.lead.findUnique({ where: { id } });
  if (!lead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(lead);
}
