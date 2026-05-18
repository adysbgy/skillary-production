import { prisma } from "../src/lib/prisma";

async function run() {
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    console.log("Admin Email:", admin?.email);

    const learner = await prisma.user.findFirst({ where: { role: "LEARNER" } });
    console.log("Learner Email:", learner?.email);

    const course = await prisma.course.findFirst({ where: { status: "PUBLISHED" } });
    console.log("Course Slug:", course?.slug);
}
run().catch(console.error);
