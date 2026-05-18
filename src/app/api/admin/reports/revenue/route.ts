import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateCSV, csvResponse } from "@/lib/csv";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        return new Response("Unauthorized", { status: 401 });
    }

    const userId = session.user.id;
    const isAdmin = role === "ADMIN";

    const whereClause = isAdmin ? {} : { course: { instructorId: userId } };

    const orders = await (prisma as any).paymentOrder.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
        include: {
            user: { select: { name: true, email: true } },
            course: { select: { title: true } }
        }
    });

    const headers = [
        "Date",
        "Product Type",
        "Course Title",
        "Learner Name",
        "Learner Email",
        "Amount (IDR)",
        "Status"
    ];

    const rows = orders.map((o: any) => [
        o.createdAt.toISOString().replace("T", " ").split(".")[0],
        o.productType || "COURSE",
        o.course.title,
        o.user.name || "Unknown",
        o.user.email,
        o.amount.toString(),
        o.status
    ]);

    const csv = generateCSV(headers, rows);
    const prefix = isAdmin ? "Platform_Revenue" : "Instructor_Revenue";
    const filename = `${prefix}_${new Date().toISOString().split('T')[0]}.csv`;

    return csvResponse(csv, filename);
}
