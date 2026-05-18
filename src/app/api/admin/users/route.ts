import { NextRequest, NextResponse } from "next/server";
import { requireAdminAPI } from "@/lib/auth-guards";
import { prisma } from "@/lib/prisma";
import { logAuditEvent } from "@/lib/audit";

const VALID_ROLES = ["LEARNER", "INSTRUCTOR", "ADMIN"] as const;

/**
 * GET /api/admin/users
 * List all users. Supports ?role= filter.
 * ADMIN only.
 */
export async function GET(req: NextRequest) {
    const { error: authError } = await requireAdminAPI();
    if (authError) return authError;

    const { searchParams } = new URL(req.url);
    const roleFilter = searchParams.get("role");

    const whereClause: any = {};
    if (roleFilter && VALID_ROLES.includes(roleFilter as any)) {
        whereClause.role = roleFilter;
    }

    const users = await prisma.user.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            _count: {
                select: { enrollments: true, courses: true, certificates: true }
            }
        }
    });

    return NextResponse.json(users);
}

/**
 * PATCH /api/admin/users
 * Change a user's role.
 * ADMIN only.
 *
 * Body: { userId: string, newRole: "LEARNER" | "INSTRUCTOR" | "ADMIN" }
 *
 * Guards:
 * - Cannot demote yourself
 * - Cannot demote the last remaining ADMIN
 * - Cannot set an invalid role
 */
export async function PATCH(req: NextRequest) {
    const { session, error: authError } = await requireAdminAPI();
    if (authError) return authError;
    const actorId = session.user.id;

    try {
        const { userId, newRole } = await req.json();

        if (!userId || !newRole) {
            return NextResponse.json({ error: "Missing userId or newRole" }, { status: 400 });
        }

        if (!VALID_ROLES.includes(newRole)) {
            return NextResponse.json({ error: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}` }, { status: 400 });
        }

        // Cannot change your own role
        if (userId === actorId) {
            return NextResponse.json({ error: "Cannot change your own role. Ask another admin." }, { status: 403 });
        }

        const targetUser = await prisma.user.findUnique({ where: { id: userId } });
        if (!targetUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const oldRole = targetUser.role;

        if (oldRole === newRole) {
            return NextResponse.json({ success: true, message: "User already has this role. No change needed." });
        }

        // If demoting an ADMIN, ensure at least one ADMIN remains
        if (oldRole === "ADMIN" && newRole !== "ADMIN") {
            const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
            if (adminCount <= 1) {
                return NextResponse.json({ error: "Cannot demote the last remaining admin. Promote another admin first." }, { status: 400 });
            }
        }

        const updated = await prisma.user.update({
            where: { id: userId },
            data: { role: newRole },
            select: { id: true, name: true, email: true, role: true }
        });

        await logAuditEvent("ROLE_CHANGE", actorId, userId, JSON.stringify({
            oldRole, newRole, userName: targetUser.name, userEmail: targetUser.email
        }));

        return NextResponse.json({
            success: true,
            user: updated,
            message: `Role changed from ${oldRole} to ${newRole}.`
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
