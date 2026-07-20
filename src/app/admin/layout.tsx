import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;
    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        redirect("/dashboard");
    }

    const navItems = [
        { label: "Overview", href: "/admin" },
        { label: "Courses", href: "/admin/courses" },
        { label: "Revenue", href: "/admin/revenue" },
        ...(role === "ADMIN" ? [
            { label: "Leads", href: "/admin/leads" },
            { label: "Trainers", href: "/admin/trainers" },
            { label: "Organizations", href: "/admin/organizations" },
            { label: "Batches", href: "/admin/batches" },
            { label: "Paths", href: "/admin/paths" },
            { label: "Analytics", href: "/admin/analytics" },
            { label: "Users", href: "/admin/users" }
        ] : []),
    ];

    return (
        <section className="bg-[#FFFDF9] min-h-screen">
            <div className="border-b bg-white/60 backdrop-blur" style={{ borderColor: 'rgb(240, 217, 200)' }}>
                <Container className="flex items-center gap-6 py-3 overflow-x-auto">
                    <span className="text-sm font-bold tracking-tight shrink-0">{role === "INSTRUCTOR" ? "Instructor" : "Admin"}</span>
                    <nav className="flex gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-full px-4 py-2 text-sm font-medium text-black/65 transition hover:bg-[#FFF8F1] hover:text-[#FF8A00] shrink-0"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </Container>
            </div>
            <Container className="py-8 lg:py-12">
                {children}
            </Container>
        </section>
    );
}
