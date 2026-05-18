import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Memulai proses seeding data demo Skillary Corporate Training...");

  if (process.env.NODE_ENV === "production") {
    console.warn("⚠️ PERINGATAN: Menjalankan seed di environment produksi!");
    console.warn("Membatalkan eksekusi seed untuk melindungi data produksi.");
    return;
  }

  try {
    // 1. Create Demo Organization
    const orgData = {
      id: "org_demo_1",
      name: "Skillary Demo Organization",
      sector: "Demo / Internal",
      contactName: "Demo HR Manager",
      contactEmail: "demo.hr@skillary.test",
      notes: "DEMO DATA — not a real client. Ini adalah data seed untuk keperluan demonstrasi dan QA.",
    };

    const org = await prisma.organization.upsert({
      where: { id: orgData.id },
      update: orgData,
      create: orgData,
    });
    console.log(`✅ Organization dibuat: ${org.name}`);

    // 2. Fetch or Create Demo Courses
    // Using simple upsert so we don't duplicate
    const demoCourses = [
      { id: "course_demo_1", title: "[DEMO] Data Productivity Fundamentals", slug: "demo-data-prod", price: 0 },
      { id: "course_demo_2", title: "[DEMO] AI for Work Basics", slug: "demo-ai-work", price: 0 },
      { id: "course_demo_3", title: "[DEMO] Leadership Communication Essentials", slug: "demo-leadership-comm", price: 0 },
    ];

    for (const dc of demoCourses) {
      await prisma.course.upsert({
        where: { slug: dc.slug },
        update: { title: dc.title },
        create: {
          id: dc.id,
          title: dc.title,
          slug: dc.slug,
          description: "Materi demo untuk Corporate Training MVP",
          level: "Beginner",
          duration: "2 hours",
          category: "Business",
          price: dc.price,
        },
      });
    }
    console.log(`✅ Demo courses berhasil diverifikasi/dibuat.`);

    const c1 = await prisma.course.findUnique({ where: { slug: "demo-data-prod" } });
    const c2 = await prisma.course.findUnique({ where: { slug: "demo-ai-work" } });
    const c3 = await prisma.course.findUnique({ where: { slug: "demo-leadership-comm" } });

    // 3. Create Demo Users (to represent linked participants)
    const demoPasswordHash = await bcrypt.hash("DemoSkillary123!", 10);
    
    const demoUsers = [
      { id: "user_demo_1", email: "demo.learner1@skillary.demo", name: "Demo Learner 1", passwordHash: demoPasswordHash },
      { id: "user_demo_2", email: "demo.learner2@skillary.demo", name: "Demo Learner 2", passwordHash: demoPasswordHash },
      { id: "user_demo_3", email: "demo.learner3@skillary.demo", name: "Demo Learner 3", passwordHash: demoPasswordHash },
    ];

    for (const du of demoUsers) {
      await prisma.user.upsert({
        where: { email: du.email },
        update: { name: du.name, passwordHash: du.passwordHash },
        create: {
          id: du.id,
          email: du.email,
          name: du.name,
          passwordHash: du.passwordHash,
        },
      });
    }
    console.log(`✅ Demo users berhasil diverifikasi/dibuat. Password diset ke: DemoSkillary123!`);

    // 4. Create Batches
    const batches = [
      { id: "batch_demo_1", title: "Demo Batch — Data Productivity", format: "HYBRID", status: "ACTIVE" },
      { id: "batch_demo_2", title: "Demo Batch — AI for Work", format: "ONLINE", status: "DRAFT" },
      { id: "batch_demo_3", title: "Demo Batch — Leadership Communication", format: "OFFLINE", status: "COMPLETED" },
    ];

    for (const b of batches) {
      await prisma.trainingBatch.upsert({
        where: { id: b.id },
        update: { title: b.title, format: b.format, status: b.status },
        create: {
          id: b.id,
          organizationId: org.id,
          title: b.title,
          format: b.format,
          status: b.status,
          notes: "Demo batch",
          startDate: new Date(),
        },
      });
    }
    console.log(`✅ Batches dibuat.`);

    // 5. Batch Course Assignments
    if (c1) {
      await prisma.batchCourse.upsert({
        where: { batchId_courseId: { batchId: "batch_demo_1", courseId: c1.id } },
        update: {},
        create: { batchId: "batch_demo_1", courseId: c1.id },
      });
    }
    if (c2) {
      await prisma.batchCourse.upsert({
        where: { batchId_courseId: { batchId: "batch_demo_2", courseId: c2.id } },
        update: {},
        create: { batchId: "batch_demo_2", courseId: c2.id },
      });
    }
    if (c3) {
      await prisma.batchCourse.upsert({
        where: { batchId_courseId: { batchId: "batch_demo_3", courseId: c3.id } },
        update: {},
        create: { batchId: "batch_demo_3", courseId: c3.id },
      });
    }
    console.log(`✅ Courses di-assign ke batch.`);

    // 6. Participants
    const participants = [
      // Batch 1 (Data Prod)
      { id: "bp_demo_1", batchId: "batch_demo_1", name: "Demo Learner 1", email: "demo.learner1@skillary.demo", userId: "user_demo_1", status: "ACCEPTED" },
      { id: "bp_demo_2", batchId: "batch_demo_1", name: "Demo Learner 2", email: "demo.learner2@skillary.demo", userId: "user_demo_2", status: "ACCEPTED" },
      { id: "bp_demo_3", batchId: "batch_demo_1", name: "Unlinked Learner A", email: "unlinked.a@skillary.demo", userId: null, status: "INVITED" },
      
      // Batch 2 (AI)
      { id: "bp_demo_4", batchId: "batch_demo_2", name: "Demo Learner 3", email: "demo.learner3@skillary.demo", userId: "user_demo_3", status: "INVITED" },
      { id: "bp_demo_5", batchId: "batch_demo_2", name: "Unlinked Learner B", email: "unlinked.b@skillary.demo", userId: null, status: "INVITED" },

      // Batch 3 (Leadership)
      { id: "bp_demo_6", batchId: "batch_demo_3", name: "Demo Learner 1", email: "demo.learner1@skillary.demo", userId: "user_demo_1", status: "COMPLETED" },
      { id: "bp_demo_7", batchId: "batch_demo_3", name: "Demo Learner 2", email: "demo.learner2@skillary.demo", userId: "user_demo_2", status: "COMPLETED" },
    ];

    for (const p of participants) {
      await prisma.batchParticipant.upsert({
        where: { id: p.id },
        update: { status: p.status, userId: p.userId },
        create: {
          id: p.id,
          batchId: p.batchId,
          name: p.name,
          email: p.email,
          userId: p.userId,
          status: p.status,
          invitedAt: new Date(),
        },
      });
    }
    console.log(`✅ Participants di-seed.`);

    // 7. Demo Enrollments
    if (c1) {
      await (prisma as any).enrollment.upsert({
        where: { userId_courseId: { userId: "user_demo_1", courseId: c1.id } },
        update: {},
        create: {
          userId: "user_demo_1",
          courseId: c1.id,
          source: "MANUAL",
        },
      });
      await (prisma as any).enrollment.upsert({
        where: { userId_courseId: { userId: "user_demo_2", courseId: c1.id } },
        update: {},
        create: {
          userId: "user_demo_2",
          courseId: c1.id,
          source: "MANUAL",
        },
      });
    }

    if (c3) {
      await (prisma as any).enrollment.upsert({
        where: { userId_courseId: { userId: "user_demo_1", courseId: c3.id } },
        update: {},
        create: {
          userId: "user_demo_1",
          courseId: c3.id,
          source: "MANUAL",
        },
      });
      await (prisma as any).enrollment.upsert({
        where: { userId_courseId: { userId: "user_demo_2", courseId: c3.id } },
        update: {},
        create: {
          userId: "user_demo_2",
          courseId: c3.id,
          source: "MANUAL",
        },
      });
    }
    console.log(`✅ Demo Enrollments di-seed.`);

    // 8. Create Module & Lessons for Courses
    const courses = [c1, c2, c3].filter(Boolean);
    const allDemoLessons = [];
    
    for (const c of courses) {
      const mod = await prisma.module.upsert({
        where: { id: `mod_${c!.id}` },
        update: { title: "Modul Utama" },
        create: {
          id: `mod_${c!.id}`,
          courseId: c!.id,
          title: "Modul Utama",
          sortOrder: 1,
        },
      });
      
      const lessons = [
        { id: `les_1_${c!.id}`, title: "[DEMO] Introduction", slug: `${c!.slug}-intro`, sortOrder: 1 },
        { id: `les_2_${c!.id}`, title: "[DEMO] Practice", slug: `${c!.slug}-practice`, sortOrder: 2 },
        { id: `les_3_${c!.id}`, title: "[DEMO] Reflection", slug: `${c!.slug}-reflection`, sortOrder: 3 },
      ];

      for (const l of lessons) {
        const createdLesson = await prisma.lesson.upsert({
          where: { id: l.id },
          update: { title: l.title, slug: l.slug },
          create: {
            id: l.id,
            moduleId: mod.id,
            title: l.title,
            slug: l.slug,
            type: "TEXT",
            content: "<p>Ini adalah konten dummy untuk keperluan demonstrasi Corporate Training.</p>",
            sortOrder: l.sortOrder,
          },
        });
        allDemoLessons.push({ courseId: c!.id, lessonId: createdLesson.id });
      }
    }
    console.log(`✅ Demo Modules & Lessons di-seed.`);

    // 9. Lesson Progress Seed
    // Learner 1: 100% on c1, c3
    // Learner 2: 50% on c1, c3 (1 or 2 lessons)
    
    for (const l of allDemoLessons) {
      if (l.courseId === c1?.id || l.courseId === c3?.id) {
        // Learner 1 finishes everything
        await prisma.lessonProgress.upsert({
          where: { userId_lessonId: { userId: "user_demo_1", lessonId: l.lessonId } },
          update: { completed: true },
          create: { userId: "user_demo_1", lessonId: l.lessonId, completed: true, completedAt: new Date() },
        });

        // Learner 2 finishes only the first lesson
        if (l.lessonId.startsWith("les_1_")) {
          await prisma.lessonProgress.upsert({
            where: { userId_lessonId: { userId: "user_demo_2", lessonId: l.lessonId } },
            update: { completed: true },
            create: { userId: "user_demo_2", lessonId: l.lessonId, completed: true, completedAt: new Date() },
          });
        }
      }
    }
    console.log(`✅ Demo Progress di-seed (Learner 1: 100%, Learner 2: Partial).`);

    console.log("\n========================================================");
    console.log("🎉 Seeding Corporate Training Demo selesai.");
    console.log("Kredensial Demo Learner (Hanya untuk QA Local/Staging):");
    console.log("Email: demo.learner1@skillary.demo");
    console.log("Email: demo.learner2@skillary.demo");
    console.log("Email: demo.learner3@skillary.demo");
    console.log("Password: DemoSkillary123!");
    console.log("========================================================\n");
  } catch (error) {
    console.error("❌ Seeding gagal:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
