import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function RevenueDashboard() {
    const session = await auth();
    const role = (session?.user as { role?: string })?.role;

    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        redirect("/dashboard");
    }

    const userId = session.user.id;
    const isAdmin = role === "ADMIN";

    // 1. Resolve safe data boundaries based on role 
    // INSTRUCTOR: Only their courses. ADMIN: Platform-wide fallback.
    const coursesWhereClause = isAdmin ? {} : { instructorId: userId };

    const courses = await prisma.course.findMany({
        where: coursesWhereClause,
        select: { id: true, title: true, status: true, price: true }
    });

    const courseIds = courses.map(c => c.id);

    // If an instructor has 0 courses, prevent unnecessary queries
    const enrollments = courseIds.length > 0 ? await prisma.enrollment.findMany({
        where: { courseId: { in: courseIds } },
        select: { source: true, courseId: true }
    }) : [];

    const orders = courseIds.length > 0 ? await (prisma as any).paymentOrder.findMany({
        where: { courseId: { in: courseIds } },
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { name: true, email: true } }, course: { select: { title: true } } }
    }) : [];

    let grossTrackedRevenue = 0;
    let courseRevenue = 0;
    let certificateRevenue = 0;
    let successfulOrders = 0;
    let pendingOrders = 0;
    let failedOrders = 0;

    for (const order of orders) {
        if (order.status === "PAID") {
            const amount = Number(order.amount);
            grossTrackedRevenue += amount;
            if (order.productType === "DIGITAL_CERTIFICATE") {
                certificateRevenue += amount;
            } else {
                courseRevenue += amount;
            }
            successfulOrders++;
        } else if (order.status === "PENDING") {
            pendingOrders++;
        } else if (order.status === "FAILED" || order.status === "EXPIRED") {
            failedOrders++;
        }
    }

    let paidEnrollments = 0;
    let freeEnrollments = 0;
    let manualEnrollments = 0;

    for (const enr of enrollments) {
        if (enr.source === "PAID") paidEnrollments++;
        else if (enr.source === "MANUAL") manualEnrollments++;
        else freeEnrollments++; // Treats FREE and UNKNOWN as free paths
    }

    // 3. Compute Revenue by Course 
    const courseMetrics = courses.map(c => {
        const cOrders = orders.filter((o: any) => o.courseId === c.id);
        const cEnrollments = enrollments.filter((e: any) => e.courseId === c.id);

        let cRevenue = 0;
        let cSuccess = 0;
        let cPending = 0;

        for (const o of cOrders) {
            if (o.status === "PAID") { cRevenue += Number(o.amount); cSuccess++; }
            if (o.status === "PENDING") cPending++;
        }

        return {
            id: c.id,
            title: c.title,
            status: c.status,
            price: c.price,
            grossRevenue: cRevenue,
            successfulOrders: cSuccess,
            pendingOrders: cPending,
            paidEnrolled: cEnrollments.filter((e: any) => e.source === "PAID").length,
            totalEnrolled: cEnrollments.length
        };
    }).filter(c => c.totalEnrolled > 0 || c.price > 0); // Only show courses that are active or monetized

    // Sort by revenue descending
    courseMetrics.sort((a, b) => b.grossRevenue - a.grossRevenue);

    // Format currency IDR helper
    const formatIDR = (num: number) => {
        return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(num);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-10">
            <div>
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-semibold tracking-[-0.02em]">Revenue & Business Health</h1>
                    {isAdmin && <span className="bg-sky-50 text-sky-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Admin View</span>}
                </div>
                <p className="text-sm text-black/55 mt-1">Track successful payments, source tracking, and active order states. {isAdmin ? 'Showing platform-wide metrics.' : 'Scoped to your published courses.'}</p>
            </div>

            {/* HONEST LIMITATIONS DISCLAIMER */}
            <div className="bg-[#FFF8EC] border border-[rgb(255,138,0)]/30 px-5 py-4 rounded-xl flex gap-4 items-start shadow-sm shadow-[rgb(255,138,0)]/5">
                <span className="text-xl">⚠️</span>
                <div>
                    <h4 className="text-sm font-semibold text-[#D48924]">Honest Data Limitations</h4>
                    <p className="text-xs text-[#D48924]/80 mt-0.5 leading-relaxed">
                        Metrics shown represent <strong className="font-bold">Gross Tracked Revenue</strong> from confirmed `PaymentOrder` records only.
                        Platform fee splits, payouts, taxes, and refunds are not configured in this dashboard yet.
                    </p>
                </div>
            </div>

            {/* KPI ROW */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Card className="p-5 border-black/5 shadow-sm">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">Gross Tracked Revenue</h3>
                    <p className="text-2xl font-extrabold tracking-tight text-[rgb(255,90,95)] truncate">{formatIDR(grossTrackedRevenue)}</p>
                </Card>
                <Card className="p-5 border-black/5 shadow-sm">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">Course Revenue</h3>
                    <p className="text-2xl font-extrabold tracking-tight text-black truncate">{formatIDR(courseRevenue)}</p>
                </Card>
                <Card className="p-5 border-black/5 shadow-sm">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">Certificate Revenue</h3>
                    <p className="text-2xl font-extrabold tracking-tight text-purple-600 truncate">{formatIDR(certificateRevenue)}</p>
                </Card>
                <Card className="p-5 border-black/5 shadow-sm">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">Successful Orders</h3>
                    <p className="text-2xl font-extrabold tracking-tight text-black">{successfulOrders}</p>
                </Card>
                <Card className="p-5 border-black/5 shadow-sm">
                    <h3 className="text-[10px] font-bold tracking-widest uppercase text-black/45 mb-1">Filtered / Dropped</h3>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-black/80">{pendingOrders} <span className="text-xs font-normal text-black/45">pending</span></span>
                        <span className="text-black/20">|</span>
                        <span className="text-sm font-semibold text-black/80">{failedOrders} <span className="text-xs font-normal text-black/45">failed</span></span>
                    </div>
                </Card>
            </div>

            {/* ENROLLMENT MIX */}
            <div className="p-4 bg-gradient-to-r from-black/5 to-transparent rounded-xl flex flex-wrap items-center gap-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-black/50">Enrollment Source Mix</h3>
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-medium">{paidEnrollments} <span className="text-black/50 font-normal">Paid</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[rgb(255,138,0)]"></div>
                        <span className="text-sm font-medium">{freeEnrollments} <span className="text-black/50 font-normal">Free</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-[rgb(255,90,95)]"></div>
                        <span className="text-sm font-medium">{manualEnrollments} <span className="text-black/50 font-normal">Manual</span></span>
                    </div>
                </div>
            </div>

            {/* SPLIT LAYOUT: REVENUE BY COURSE & RECENT TRANSACTIONS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Revenue by Course (Left, 2/3) */}
                <div className="space-y-4 lg:col-span-2">
                    <h2 className="text-lg font-semibold tracking-tight">Revenue by Course</h2>
                    {courseMetrics.length > 0 ? (
                        <Card className="p-0 overflow-hidden border-black/5">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-black/5 bg-black/5">
                                        <th className="px-5 py-3 font-medium text-black/60 w-1/2">Course</th>
                                        <th className="px-5 py-3 font-medium text-black/60 text-right">Orders</th>
                                        <th className="px-5 py-3 font-medium text-black/60 text-right">Gross Rev</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5 bg-white">
                                    {courseMetrics.map((c) => (
                                        <tr key={c.id} className="hover:bg-black/[0.02] transition-colors">
                                            <td className="px-5 py-3">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${c.status === 'PUBLISHED' ? 'bg-green-100 text-green-700' : 'bg-black/10 text-black/60'
                                                        }`}>{c.status}</span>
                                                </div>
                                                <div className="font-semibold text-black/90 truncate max-w-[200px] sm:max-w-xs">{c.title}</div>
                                                <div className="text-xs text-black/45 mt-0.5">List: {c.price > 0 ? formatIDR(c.price) : 'Free'}</div>
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                                <div className="font-medium">{c.successfulOrders} <span className="text-xs font-normal text-black/45">success</span></div>
                                                {c.pendingOrders > 0 && <div className="text-xs text-[rgb(255,90,95)] mt-0.5">{c.pendingOrders} pending</div>}
                                            </td>
                                            <td className="px-5 py-3 text-right font-semibold text-[rgb(255,90,95)]">
                                                {formatIDR(c.grossRevenue)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Card>
                    ) : (
                        <Card className="p-8 text-center border-dashed border-black/10 bg-[#FFFDF9]">
                            <h3 className="text-sm font-semibold tracking-tight">No active revenue streams</h3>
                            <p className="text-xs text-black/50 mt-1 max-w-sm mx-auto">Courses with tracked enrollments or payment orders will surface here automatically.</p>
                        </Card>
                    )}
                </div>

                {/* Recent Transactions (Right, 1/3) */}
                <div className="space-y-4 lg:col-span-1">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold tracking-tight">Recent Transactions</h2>
                        <a href="/api/admin/reports/revenue" className="text-[10px] uppercase font-bold tracking-widest text-[#D48924] hover:text-[#B36F15] transition-colors border border-[rgb(255,138,0)]/30 bg-[#FFF8EC] px-2 py-1 rounded">Export CSV</a>
                    </div>
                    {orders.length > 0 ? (
                        <div className="space-y-3">
                            {orders.slice(0, 8).map((o: any) => (
                                <Card key={o.id} className="p-4 border-black/5 flex flex-col gap-2">
                                    <div className="flex justify-between items-start">
                                        <div className="font-medium text-xs truncate max-w-[150px]">{o.user.name}</div>
                                        <div className="flex items-center gap-1.5">
                                            <span className={`text-[9px] font-bold px-1 py-0.5 rounded tracking-widest uppercase ${
                                                o.productType === "DIGITAL_CERTIFICATE" ? "bg-purple-100 text-purple-700" : "bg-blue-50 text-blue-600"
                                            }`}>
                                                {o.productType === "DIGITAL_CERTIFICATE" ? "CERT" : "COURSE"}
                                            </span>
                                            <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded tracking-widest uppercase ${o.status === "PAID" ? "bg-green-100 text-green-700" :
                                                o.status === "PENDING" ? "bg-[rgb(255,138,0)]/20 text-[#D48924]" :
                                                    "bg-red-50 text-red-600"
                                                }`}>
                                                {o.status}
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold">{formatIDR(Number(o.amount))}</div>
                                        <div className="text-[10px] text-black/50 truncate mt-0.5">{o.course.title}</div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <Card className="p-6 text-center border-dashed border-black/10 bg-[#FFFDF9]">
                            <p className="text-xs font-semibold text-black/60">No payment records found.</p>
                        </Card>
                    )}
                </div>
            </div>

            <div className="pt-8"></div>
        </div>
    );
}
