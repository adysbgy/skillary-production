import { prisma } from "../src/lib/prisma";
import { getCertificateEligibility } from "../src/lib/certificate-eligibility";
import { PRODUCT_TYPE } from "../src/lib/payment-constants";

async function run() {
    console.log("=== SETUP ===");
    const user = await prisma.user.findFirst({ where: { role: "LEARNER" } });
    if (!user) {
        console.error("No learner found");
        return;
    }
    const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
    
    // Create a fresh test course
    const course = await prisma.course.create({
        data: {
            title: "Test Digital Cert Course",
            slug: "test-digital-cert-course",
            description: "Test description",
            level: "Beginner",
            duration: "1h",
            category: "Test",
            price: 0,
            status: "PUBLISHED",
            certificateMode: "PAID_DIGITAL",
            digitalCertificatePrice: 49000,
            instructorId: admin?.id || user.id,
        }
    });

    console.log("Course created with PAID_DIGITAL and price 49000");

    console.log("\n=== SECURITY / NEGATIVE TESTS ===");
    // 1. Not enrolled
    let elig = await getCertificateEligibility(user.id, course.id);
    console.log("Not enrolled state:", elig.state);

    // 2. Enrolled but incomplete
    const enrollment = await prisma.enrollment.create({
        data: { userId: user.id, courseId: course.id, source: "FREE" }
    });
    elig = await getCertificateEligibility(user.id, course.id);
    console.log("Incomplete state:", elig.state);

    // 3. Completed
    await prisma.enrollment.update({
        where: { id: enrollment.id },
        data: { completedAt: new Date() }
    });
    elig = await getCertificateEligibility(user.id, course.id);
    console.log("Completed state:", elig.state);
    if (elig.state === "PAYMENT_REQUIRED") {
        console.log("PASSED: Completed PAID_DIGITAL course requires payment, not auto-issued");
    }

    // 4. Create a payment order manually (simulating POST /api/checkout/certificate)
    const order = await prisma.paymentOrder.create({
        data: {
            userId: user.id,
            courseId: course.id,
            productType: PRODUCT_TYPE.DIGITAL_CERTIFICATE,
            amount: 49000,
            status: "PENDING"
        }
    });
    elig = await getCertificateEligibility(user.id, course.id);
    console.log("After pending checkout state:", elig.state);

    // 5. Simulate Midtrans callback paying it
    await prisma.paymentOrder.update({
        where: { id: order.id },
        data: { status: "PAID" }
    });
    elig = await getCertificateEligibility(user.id, course.id);
    console.log("After payment state:", elig.state);

    // 6. Claim certificate
    if (elig.state === "PAID_READY_TO_CLAIM") {
        const cert = await prisma.certificate.create({
            data: { userId: user.id, courseId: course.id }
        });
        console.log("Claimed certificate code:", cert.uniqueCode);
    }
    
    elig = await getCertificateEligibility(user.id, course.id);
    console.log("Final state:", elig.state);

    console.log("\n=== INCLUDED REGRESSION TEST ===");
    await prisma.course.update({
        where: { id: course.id },
        data: { certificateMode: "INCLUDED", digitalCertificatePrice: null }
    });
    // Delete cert and payment order
    await prisma.certificate.deleteMany({ where: { courseId: course.id } });
    await prisma.paymentOrder.deleteMany({ where: { courseId: course.id } });
    
    elig = await getCertificateEligibility(user.id, course.id);
    console.log("Completed INCLUDED course state:", elig.state);
    if (elig.state === "INCLUDED_READY_TO_CLAIM") {
        console.log("PASSED: INCLUDED course ready to claim");
    }

    // Cleanup
    await prisma.enrollment.deleteMany({ where: { courseId: course.id } });
    await prisma.course.delete({ where: { id: course.id } });
    console.log("Cleanup complete");
}

run().catch(console.error);
