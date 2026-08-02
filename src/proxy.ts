import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(req: NextRequest) {
    const session = await auth();
    const { pathname } = req.nextUrl;

    const protectedPaths = ["/dashboard", "/learn"];
    const adminPaths = ["/admin"];

    const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
    const isAdmin = adminPaths.some((p) => pathname.startsWith(p));
    const isLoggedIn = !!session;
    const role = (session?.user as { role?: string } | undefined)?.role;

    if ((isProtected || isAdmin) && !isLoggedIn) {
        const loginUrl = new URL("/login", req.nextUrl.origin);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (isAdmin) {
        if (role === "ADMIN") return NextResponse.next();
        if (role === "INSTRUCTOR") {
            // Instructors can access /admin overview and /admin/courses only
            // Block /admin/students and any future admin-only routes
            if (pathname.startsWith("/admin/students") || pathname.startsWith("/admin/users")) {
                return NextResponse.redirect(new URL("/admin", req.nextUrl.origin));
            }
            if (pathname === "/admin" || pathname.startsWith("/admin/courses")) {
                return NextResponse.next();
            }
        }
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/learn/:path*", "/admin/:path*"],
};
