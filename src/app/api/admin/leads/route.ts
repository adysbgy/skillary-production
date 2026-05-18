import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const inquiryType = searchParams.get("inquiryType");
  const q = searchParams.get("q");
  const includeArchived = searchParams.get("includeArchived") === "true";

  const where: any = {};
  if (status) where.status = status;
  if (inquiryType) where.inquiryType = inquiryType;
  if (!includeArchived) where.archivedAt = null;
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
      { organization: { contains: q } },
      { message: { contains: q } },
    ];
  }

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  return NextResponse.json(leads);
}
