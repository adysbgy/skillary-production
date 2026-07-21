import { NextResponse } from "next/server";

/**
 * Legacy bootstrap endpoint, permanently disabled.
 *
 * Administrative role changes must go through the authenticated,
 * audited `/api/admin/users` workflow. Keeping an explicit 410 response
 * prevents accidental reintroduction through stale clients or bookmarks.
 */
function gone() {
    return NextResponse.json(
        { error: "This bootstrap endpoint has been permanently disabled." },
        {
            status: 410,
            headers: {
                "Cache-Control": "no-store",
            },
        }
    );
}

export const GET = gone;
export const POST = gone;
export const PUT = gone;
export const PATCH = gone;
export const DELETE = gone;
