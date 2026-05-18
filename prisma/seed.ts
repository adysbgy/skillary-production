/**
 * Skillary — Admin Seed Script
 *
 * Creates the first admin user. Run with:
 *   npx tsx prisma/seed.ts
 */

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@skillary.id";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const ADMIN_NAME = process.env.ADMIN_NAME || "Admin";

const prisma = new PrismaClient();

async function main() {
    try {
        // Check if admin already exists
        const existing = await prisma.user.findUnique({
            where: { email: ADMIN_EMAIL },
        });

        if (existing) {
            console.log(`⚠️  User with email "${ADMIN_EMAIL}" already exists (role: ${existing.role}).`);
            if (existing.role !== "ADMIN") {
                await prisma.user.update({
                    where: { id: existing.id },
                    data: { role: "ADMIN" },
                });
                console.log("✅ Updated role to ADMIN.");
            }
        } else {
            const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 12);
            await prisma.user.create({
                data: {
                    name: ADMIN_NAME,
                    email: ADMIN_EMAIL,
                    passwordHash,
                    role: "ADMIN",
                },
            });
            console.log(`✅ Admin user created.`);
            console.log(`   Email:    ${ADMIN_EMAIL}`);
            console.log(`   Password: ${ADMIN_PASSWORD}`);
        }
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
});
