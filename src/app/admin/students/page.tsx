import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";

export const dynamic = "force-dynamic";

export default async function AdminStudentsPage() {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || role !== "ADMIN") {
        redirect("/admin");
    }

    const students = await prisma.user.findMany({
        where: { role: "LEARNER" },
        orderBy: { createdAt: "desc" },
        include: {
            _count: { select: { enrollments: true } },
            enrollments: {
                take: 3,
                orderBy: { enrolledAt: "desc" },
                include: { course: { select: { title: true } } },
            },
        },
    });

    return (
        <div>
            <h1 className="text-2xl font-semibold tracking-tight mb-8">Students</h1>

            {students.length === 0 ? (
                <Card className="p-12 text-center">
                    <p className="text-black/50">No students registered yet.</p>
                </Card>
            ) : (
                <Card className="overflow-hidden">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-black/5 bg-black/[0.02]">
                                <th className="px-4 py-3 text-left font-medium text-black/55">Name</th>
                                <th className="px-4 py-3 text-left font-medium text-black/55">Email</th>
                                <th className="px-4 py-3 text-left font-medium text-black/55">Enrolled</th>
                                <th className="px-4 py-3 text-left font-medium text-black/55">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((s) => (
                                <tr key={s.id} className="border-b border-black/5 last:border-0">
                                    <td className="px-4 py-3 font-medium">{s.name}</td>
                                    <td className="px-4 py-3 text-black/60">{s.email}</td>
                                    <td className="px-4 py-3 text-black/70">{s._count.enrollments} courses</td>
                                    <td className="px-4 py-3 text-black/55">{s.createdAt.toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            )}
        </div>
    );
}
