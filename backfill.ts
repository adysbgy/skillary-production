import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function run() {
    const enrollments = await prisma.enrollment.findMany({
        include: { course: true }
    });

    let count = 0;
    for (const e of enrollments) {
        // If it's already set to something other than UNKNOWN
        if (e.source && e.source !== "UNKNOWN") {
            continue;
        }

        // Did they have a paid order?
        const order = await (prisma as any).paymentOrder.findFirst({
            where: { userId: e.userId, courseId: e.courseId, status: "PAID" }
        });

        if (order) {
            await (prisma as any).enrollment.update({
                where: { id: e.id },
                data: { source: "PAID" }
            });
            console.log(`[PAID] Enrollment ${e.id} mapped to PAID`);
            count++;
            continue;
        }

        // If no paid order and course is free
        if (e.course.price <= 0) {
            await (prisma as any).enrollment.update({
                where: { id: e.id },
                data: { source: "FREE" }
            });
            console.log(`[FREE] Enrollment ${e.id} mapped to FREE`);
            count++;
            continue;
        }

        // Paid course but no order? It's a manual bypass.
        await (prisma as any).enrollment.update({
            where: { id: e.id },
            data: { source: "MANUAL", grantedByAdminId: "SYSTEM_BACKFILL" }
        });
        console.log(`[MANUAL] Enrollment ${e.id} mapped to MANUAL fallback`);
        count++;
    }

    console.log(`\nBackfill complete. ${count} enrollments mapped.`);
}

run()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
