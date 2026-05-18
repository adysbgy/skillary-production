import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function requireAdminOrInstructorAPI() {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), session: null, role: null };
    }
    return { error: null, session, role };
}

export async function requireAdminAPI() {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session || role !== "ADMIN") {
        return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }), session: null, role: null };
    }
    return { error: null, session, role };
}

export function requireCourseOwnershipAPI(
    role: string | null | undefined,
    courseInstructorId: string | null | undefined,
    userId: string,
    errorMessage = "Unauthorized: You do not own this course"
) {
    if (role === "INSTRUCTOR" && courseInstructorId !== userId) {
        return { error: NextResponse.json({ error: errorMessage }, { status: 403 }) };
    }
    return { error: null };
}
