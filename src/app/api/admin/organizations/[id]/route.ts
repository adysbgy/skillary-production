import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { organizationUpdateSchema } from "@/lib/batch-constants";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id } = await params;
  const org = await prisma.organization.findUnique({
    where: { id },
    include: {
      _count: { select: { batches: true } },
      batches: {
        orderBy: { createdAt: "desc" },
        take: 50,
        select: {
          id: true,
          title: true,
          format: true,
          status: true,
          startDate: true,
          endDate: true,
          createdAt: true,
          _count: { select: { participants: true, courses: true } },
        },
      },
    },
  });

  if (!org) {
    return NextResponse.json({ error: "Organization not found" }, { status: 404 });
  }

  return NextResponse.json(org);
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { id } = await params;

  const body = await req.json();
  const parsed = organizationUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message || "Validation failed" },
      { status: 400 }
    );
  }

  const existing = await prisma.organization.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Organization not found" }, { status: 404 });
  }

  const updateData: any = {};
  const d = parsed.data;
  if (d.name !== undefined) updateData.name = d.name;
  if (d.sector !== undefined) updateData.sector = d.sector || null;
  if (d.contactName !== undefined) updateData.contactName = d.contactName || null;
  if (d.contactEmail !== undefined) updateData.contactEmail = d.contactEmail || null;
  if (d.contactWhatsapp !== undefined) updateData.contactWhatsapp = d.contactWhatsapp || null;
  if (d.notes !== undefined) updateData.notes = d.notes || null;

  const updated = await prisma.organization.update({
    where: { id },
    data: updateData,
  });

  return NextResponse.json(updated);
}
