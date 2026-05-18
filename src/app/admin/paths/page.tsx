import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPathsPage() {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session || role !== "ADMIN") {
        redirect("/dashboard");
    }

    const paths = await prisma.learningPath.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { courses: true } } }
    });

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">Learning Paths</h1>
                    <p className="text-sm text-black/60 mt-1">Manage structured multi-course sequences.</p>
                </div>
                <Link href="/admin/paths/new">
                    <button className="text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                        Create Path
                    </button>
                </Link>
            </div>

            <Card className="overflow-hidden bg-white" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                {paths.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-black/50 text-sm">No learning paths created yet.</p>
                    </div>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-black/5 bg-black/[0.02]">
                                <th className="px-4 py-3 text-left font-medium text-black/60">Path</th>
                                <th className="px-4 py-3 text-left font-medium text-black/60">Courses</th>
                                <th className="px-4 py-3 text-left font-medium text-black/60">Status</th>
                                <th className="px-4 py-3 text-right font-medium text-black/60">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paths.map(path => (
                                <tr key={path.id} className="border-b border-black/5 last:border-0 hover:bg-black/[0.01]">
                                    <td className="px-4 py-3">
                                        <p className="font-semibold text-black/90">{path.title}</p>
                                        <p className="text-xs text-black/50">{path.slug}</p>
                                    </td>
                                    <td className="px-4 py-3 text-black/70">
                                        {path._count.courses} courses
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${path.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-black/5 text-black/50"
                                            }`}>
                                            {path.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right flex justify-end gap-3">
                                        <Link href={`/admin/paths/${path.id}/analytics`} className="text-black/60 hover:text-[#FF8A00] font-medium text-xs">
                                            Analytics
                                        </Link>
                                        <Link href={`/admin/paths/${path.id}/edit`} className="text-[#FF8A00] hover:opacity-80 font-medium text-xs">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Card>
        </div>
    );
}
