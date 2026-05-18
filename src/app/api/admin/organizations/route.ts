import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { organizationCreateSchema } from "@/lib/batch-constants";

export async function GET(req: Request) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  const where: any = {};
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { sector: { contains: q } },
      { contactName: { contains: q } },
      { contactEmail: { contains: q } },
    ];
  }

  const organizations = await prisma.organization.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { batches: true } } },
    take: 200,
  });

  return NextResponse.json(organizations);
}

export async function POST(req: Request) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  try {
    const body = await req.json();
    const parsed = organizationCreateSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;
    const org = await prisma.organization.create({
      data: {
        name: data.name,
        sector: data.sector || null,
        contactName: data.contactName || null,
        contactEmail: data.contactEmail || null,
        contactWhatsapp: data.contactWhatsapp || null,
        notes: data.notes || null,
      },
    });

    return NextResponse.json(org, { status: 201 });
  } catch (err) {
    console.error("Organization creation failed:", err);
    return NextResponse.json(
      { error: "Gagal membuat organisasi." },
      { status: 500 }
    );
  }
}
