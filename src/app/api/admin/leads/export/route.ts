import { NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

function escapeCSV(val: string | null | undefined): string {
  if (val == null) return "";
  const s = String(val);
  if (s.includes(",") || s.includes('"') || s.includes("\n")) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function formatDate(d: Date | string | null): string {
  if (!d) return "";
  return new Date(d).toISOString().slice(0, 19).replace("T", " ");
}

export async function GET(req: Request) {
  const { error } = await requireAdminAPI();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");
  const inquiryType = searchParams.get("inquiryType");
  const includeArchived = searchParams.get("includeArchived") === "true";
  const q = searchParams.get("q");

  const where: any = {};
  if (status) where.status = status;
  if (inquiryType) where.inquiryType = inquiryType;
  if (!includeArchived) where.archivedAt = null;
  if (q) {
    where.OR = [
      { name: { contains: q } },
      { email: { contains: q } },
      { organization: { contains: q } },
    ];
  }

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const headers = [
    "Created At",
    "Name",
    "Email",
    "WhatsApp",
    "Organization",
    "Role",
    "Inquiry Type",
    "Program Interest",
    "Source Page",
    "Status",
    "Last Contacted At",
    "Proposal Sent At",
    "Won At",
    "Lost At",
    "Archived At",
    "Message",
    "Notes",
  ];

  const rows = leads.map((lead: any) =>
    [
      formatDate(lead.createdAt),
      escapeCSV(lead.name),
      escapeCSV(lead.email),
      escapeCSV(lead.whatsapp),
      escapeCSV(lead.organization),
      escapeCSV(lead.role),
      escapeCSV(lead.inquiryType),
      escapeCSV(lead.programInterest),
      escapeCSV(lead.sourcePage),
      escapeCSV(lead.status),
      formatDate(lead.lastContactedAt),
      formatDate(lead.proposalSentAt),
      formatDate(lead.wonAt),
      formatDate(lead.lostAt),
      formatDate(lead.archivedAt),
      escapeCSV(lead.message),
      escapeCSV(lead.notes),
    ].join(",")
  );

  const csv = [headers.join(","), ...rows].join("\n");

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="skillary-leads-export.csv"',
    },
  });
}
