import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
    uploadFile,
    type UploadCategory,
    MAX_RESOURCE_SIZE,
} from "@/lib/storage";
import { log } from "@/lib/observability/logger";

const MAX_REQUEST_SIZE = MAX_RESOURCE_SIZE + 1024 * 1024;
const CATEGORIES: UploadCategory[] = ["thumbnails", "images", "resources"];

export async function POST(req: NextRequest) {
    const session = await auth();
    const role = session?.user?.role;
    if (!session || (role !== "ADMIN" && role !== "INSTRUCTOR")) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const declaredSize = Number(req.headers.get("content-length") || "0");
    if (declaredSize > MAX_REQUEST_SIZE) {
        return NextResponse.json({ error: "Upload request exceeds 21 MB." }, { status: 413 });
    }

    try {
        const formData = await req.formData();
        const value = formData.get("file");
        const file = value instanceof File ? value : null;
        const rawCategory = String(formData.get("category") || "images");
        if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });
        if (!CATEGORIES.includes(rawCategory as UploadCategory)) {
            return NextResponse.json({ error: "Invalid upload category." }, { status: 400 });
        }
        if (file.size > MAX_RESOURCE_SIZE) {
            return NextResponse.json({ error: "File exceeds maximum size." }, { status: 413 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const result = await uploadFile(buffer, file.name, file.type, rawCategory as UploadCategory);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Upload failed";
        const validationError = message.includes("not allowed") || message.includes("exceeds") || message.includes("does not match");
        if (!validationError) log.error("upload.failed", { error });
        return NextResponse.json(
            { error: validationError ? message : "Upload failed" },
            { status: validationError ? 400 : 500 }
        );
    }
}
