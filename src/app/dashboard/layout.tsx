import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session) redirect("/login");

    const navItems = [
        { label: "Dashboard", href: "/dashboard" },
        { label: "My Courses", href: "/dashboard/courses" },
        { label: "Settings", href: "/dashboard/settings" },
    ];

    return (
        <section className="bg-[#FFFDF9] min-h-screen">
            <div className="border-b border-black/5 bg-white/60 backdrop-blur">
                <Container className="flex items-center gap-6 py-3 overflow-x-auto">
                    <span className="text-sm font-bold tracking-tight shrink-0">
                        Hi, {session.user?.name?.split(" ")[0] || "Learner"} 👋
                    </span>
                    <nav className="flex gap-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="rounded-full px-4 py-2 text-sm font-medium text-black/65 transition hover:bg-black/5 hover:text-black shrink-0"
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
