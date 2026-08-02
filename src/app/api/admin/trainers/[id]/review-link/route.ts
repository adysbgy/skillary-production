import { NextResponse } from "next/server";
import { Resend } from "resend";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { escapeHtml, generateTrainerReviewToken, getCanonicalAppOrigin, hashTrainerReviewToken, TRAINER_REVIEW_TOKEN_TTL_MS } from "@/lib/trainer-review-token";

const noStore = { "Cache-Control": "no-store, max-age=0" };
export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { error, session } = await requireAdminAPI(); if (error) return error;
  const id = (await params).id;
  const trainer = await prisma.trainerProfile.findUnique({ where: { id } });
  if (!trainer) return NextResponse.json({ error: "Trainer not found" }, { status: 404, headers: noStore });
  let origin: string;
  try { origin = getCanonicalAppOrigin(); } catch { return NextResponse.json({ error: "Review link origin is not configured" }, { status: 503, headers: noStore }); }
  const token = generateTrainerReviewToken(); const tokenHash = hashTrainerReviewToken(token)!; const expiresAt = new Date(Date.now() + TRAINER_REVIEW_TOKEN_TTL_MS); const now = new Date();
  await prisma.$transaction(async tx => {
    await tx.trainerReviewToken.updateMany({ where: { trainerId: id, usedAt: null }, data: { usedAt: now } });
    await tx.trainerReviewToken.create({ data: { trainerId: id, tokenHash, expiresAt } });
    await tx.trainerProfile.update({ where: { id }, data: { status: "AWAITING_TRAINER_APPROVAL" } });
    await tx.trainerAuditEvent.create({ data: { trainerId: id, actorId: session?.user?.id, action: "REVIEW_LINK_CREATED", metadata: { expiresAt, priorUnusedTokensRevokedAt: now } } });
  });
  const url = new URL(`/trainer-review/${token}`, origin).toString(); let delivered = false;
  if (process.env.RESEND_API_KEY) { try { const resend = new Resend(process.env.RESEND_API_KEY); await resend.emails.send({ from: process.env.RESEND_FROM_EMAIL || "Skillary <onboarding@resend.dev>", to: trainer.email, subject: "Tinjau profil Skillary Trainer Anda", html: `<p>Halo ${escapeHtml(trainer.name)},</p><p>Skillary meminta Anda meninjau dan menyetujui draft profil trainer.</p><p><a href="${escapeHtml(url)}">Tinjau profil</a></p><p>Link berlaku 7 hari dan hanya dapat digunakan sekali.</p>` }); delivered = true; } catch { console.error("Trainer review email delivery failed"); } }
  return NextResponse.json({
    ok: true,
    delivered,
    expiresAt,
    ...(!delivered && { manualDeliveryUrl: url }),
  }, { headers: noStore });
}
