import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createLeadSchema, detectSpam } from "@/lib/lead-constants";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { notifyNewLead } from "@/lib/lead-notification";

export async function POST(req: Request) {
  try {
    // Rate limiting: 5 submissions per 10 minutes per IP
    const clientKey = getClientKey(req);
    if (!checkRateLimit(clientKey, 5, 10 * 60 * 1000)) {
      return NextResponse.json(
        { error: "Terlalu banyak pengiriman. Silakan coba lagi beberapa saat." },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Anti-spam: silently accept but don't store
    if (detectSpam(body)) {
      return NextResponse.json({ ok: true, leadId: "received" }, { status: 201 });
    }

    const parsed = createLeadSchema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.issues[0]?.message || "Validation failed";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const data = parsed.data;

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp || null,
        organization: data.organization || null,
        role: data.role || null,
        inquiryType: data.inquiryType,
        programInterest: data.programInterest || null,
        sourcePage: data.sourcePage || null,
        message: data.message,
      },
    });

    // Fire-and-forget email notification (never blocks response)
    notifyNewLead(lead).catch((err) =>
      console.warn("Lead notification fire-and-forget error:", err)
    );

    return NextResponse.json({ ok: true, leadId: lead.id }, { status: 201 });
  } catch (error) {
    console.error("Lead creation failed:", error);
    return NextResponse.json(
      { error: "Terjadi kesalahan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
