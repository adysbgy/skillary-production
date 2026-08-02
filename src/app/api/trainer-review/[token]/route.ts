import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { hashTrainerReviewToken } from "@/lib/trainer-review-token";

const schema = z.object({ approved: z.literal(true), corrections: z.string().max(5000).optional().default(""), photoApproved: z.literal(true) });
const securityHeaders = { "Cache-Control": "no-store, max-age=0", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex, nofollow, noarchive" };
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: securityHeaders });
async function find(token: string) { const tokenHash = hashTrainerReviewToken(token); if (!tokenHash) return null; return prisma.trainerReviewToken.findUnique({ where: { tokenHash }, include: { trainer: true } }); }

export async function GET(_: Request, { params }: { params: Promise<{ token: string }> }) {
  const rec = await find((await params).token);
  if (!rec || rec.usedAt || rec.expiresAt < new Date()) return json({ error: "Review link invalid or expired" }, 410);
  const t = rec.trainer;
  return json({ name: t.name, headline: t.headline, shortBio: t.shortBio, fullBio: t.fullBio, portraitUrl: t.portraitUrl, linkedinUrl: t.linkedinUrl, expertise: t.expertise, outcomes: t.outcomes, expiresAt: rec.expiresAt });
}

export async function POST(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const tokenHash = hashTrainerReviewToken((await params).token);
  if (!tokenHash) return json({ error: "Review link invalid or expired" }, 410);
  let payload: unknown;
  try { payload = await req.json(); } catch { return json({ error: "Invalid review submission" }, 400); }
  const parsed = schema.safeParse(payload);
  if (!parsed.success) return json({ error: "Approval and photo confirmation are required" }, 400);
  const now = new Date();
  const result = await prisma.$transaction(async tx => {
    const rec = await tx.trainerReviewToken.findUnique({ where: { tokenHash }, select: { id: true, trainerId: true } });
    if (!rec) return null;
    const consumed = await tx.trainerReviewToken.updateMany({ where: { id: rec.id, usedAt: null, expiresAt: { gt: now } }, data: { usedAt: now } });
    if (consumed.count !== 1) return null;
    await tx.trainerProfile.update({ where: { id: rec.trainerId }, data: { consentedAt: now, status: parsed.data.corrections ? "CHANGES_REQUESTED" : "READY_TO_PUBLISH" } });
    await tx.trainerAuditEvent.create({ data: { trainerId: rec.trainerId, action: "TRAINER_REVIEW_SUBMITTED", metadata: { photoApproved: true, corrections: parsed.data.corrections } } });
    return { changesRequested: Boolean(parsed.data.corrections) };
  });
  if (!result) return json({ error: "Review link invalid or expired" }, 410);
  return json({ ok: true, ...result });
}
