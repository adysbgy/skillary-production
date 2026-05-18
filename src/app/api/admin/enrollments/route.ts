import { NextRequest, NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const { session, error: authError } = await requireAdminAPI();
    if (authError) return authError;
    const adminId = session.user.id;

    try {
        const { email, courseId } = await req.json();

        if (!email || !courseId) {
            return NextResponse.json({ error: "Missing email or courseId" }, { status: 400 });
        }

        const targetUser = await prisma.user.findUnique({ where: { email } });
        if (!targetUser) {
            return NextResponse.json({ error: "User with this email not found" }, { status: 404 });
        }

        const existing = await (prisma as any).enrollment.findUnique({
            where: { userId_courseId: { userId: targetUser.id, courseId } }
        });

        if (existing) {
            if (existing.source === "PAID") {
                return NextResponse.json({ error: "Cannot manually override a PAID enrollment. Provenance is sacred." }, { status: 409 });
            }
            if (existing.source === "FREE" && existing.revokedAt === null) {
                return NextResponse.json({ success: true, message: "User already has active FREE access. No override necessary." });
            }
            if (existing.source === "MANUAL" && existing.revokedAt === null) {
                return NextResponse.json({ success: true, message: "User already has active MANUAL access. No override necessary." });
            }

            // Reactivate revoked access or overwrite
            const enrollment = await (prisma as any).enrollment.update({
                where: { id: existing.id },
                data: {
                    source: "MANUAL",
                    grantedByAdminId: adminId,
                    revokedAt: null,
                    revokedByAdminId: null
                }
            });
            return NextResponse.json({ success: true, enrollment, message: "Access reactivated manually." });
        }

        // New manual access
        const enrollment = await (prisma as any).enrollment.create({
            data: {
                userId: targetUser.id,
                courseId,
                source: "MANUAL",
                grantedByAdminId: adminId
            }
        });
        return NextResponse.json({ success: true, enrollment, message: "Manual access granted." });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    const { session, error: authError } = await requireAdminAPI();
    if (authError) return authError;
    const adminId = session.user.id;

    try {
        const { email, courseId } = await req.json();

        if (!email || !courseId) {
            return NextResponse.json({ error: "Missing email or courseId" }, { status: 400 });
        }

        const targetUser = await prisma.user.findUnique({ where: { email } });
        if (!targetUser) {
            return NextResponse.json({ error: "User with this email not found" }, { status: 404 });
        }

        const existing = await (prisma as any).enrollment.findUnique({
            where: { userId_courseId: { userId: targetUser.id, courseId } }
        });

        if (!existing) {
            return NextResponse.json({ success: true, message: "User has no matching enrollment to revoke." });
        }

        if (existing.source === "PAID") {
            return NextResponse.json({ error: "Cannot revoke an active PAID enrollment via manual override." }, { status: 409 });
        }
        if (existing.source === "FREE") {
            return NextResponse.json({ error: "Cannot revoke an active FREE enrollment via manual override." }, { status: 409 });
        }

        if (existing.revokedAt !== null) {
            return NextResponse.json({ success: true, message: "Enrollment is already revoked." });
        }

        // Soft-revoke
        await (prisma as any).enrollment.update({
            where: { id: existing.id },
            data: {
                revokedAt: new Date(),
                revokedByAdminId: adminId
            }
        });

        return NextResponse.json({ success: true, message: "Manual access formally revoked." });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
