import { prisma } from "@/lib/prisma";

/**
 * Logs a governance audit event.
 *
 * @param action - e.g. "ROLE_CHANGE", "COURSE_REASSIGN", "PUBLISH_CHANGE"
 * @param actorId - the user performing the action
 * @param targetId - the subject of the action (user ID, course ID, etc.)
 * @param meta - optional JSON string with extra context
 */
export async function logAuditEvent(
    action: string,
    actorId: string,
    targetId?: string | null,
    meta?: string | null
): Promise<void> {
    try {
        await (prisma as any).auditLog.create({
            data: {
                action,
                actorId,
                targetId: targetId || null,
                meta: meta || null,
            }
        });
    } catch (err) {
        // Audit logging should never crash the primary operation.
        // Log to console for debugging; in production, ship to an external logger.
        console.error("[AuditLog] Failed to write audit event:", err);
    }
}
