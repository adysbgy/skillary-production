import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * GET /api/auth/session
 * Lightweight session endpoint for client components
 * to determine the current user's role and authority.
 */
export async function GET() {
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
        authenticated: true,
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: (session.user as any).role,
    });
}
