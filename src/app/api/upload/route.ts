import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadFile, type UploadCategory } from "@/lib/storage";

/**
 * POST /api/upload
 *
 * General-purpose file upload endpoint.
 * Auth-gated: ADMIN or INSTRUCTOR only.
 *
 * Accepts multipart/form-data with:
 * - file: the file to upload
 * - category: "thumbnails" | "images" | "resources"
 *
 * Returns: { url, filename, fileSize, fileType }
 */
export async function POST(req: NextRequest) {
    const session = await auth();
    const role = session?.user?.role;

    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;
        const category = (formData.get("category") as string) || "images";

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        if (!["thumbnails", "images", "resources"].includes(category)) {
            return NextResponse.json(
                { error: 'Invalid category. Must be "thumbnails", "images", or "resources".' },
                { status: 400 }
            );
        }

        // Convert Web API File to Node Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await uploadFile(
            buffer,
            file.name,
            file.type,
            category as UploadCategory
        );

        return NextResponse.json(result, { status: 201 });
    } catch (error: unknown) {
        // Validation errors from storage.ts come as thrown Error objects
        const message = error instanceof Error ? error.message : "Upload failed";
        const status = message.includes("not allowed") || message.includes("exceeds") ? 400 : 500;
        return NextResponse.json({ error: message }, { status });
    }
}
