import { writeFile, unlink, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

/**
 * Storage abstraction layer for Skillary.
 *
 * Phase 1: Local filesystem storage (public/uploads/).
 * Designed so that swapping to Vercel Blob / S3 later requires
 * changing only this file — no API route or component changes.
 *
 * TRADEOFF: Local storage is not persistent across container deploys
 * (Vercel, Docker). This is acceptable for development and demo.
 * Production migration path: replace implementations below with
 * @vercel/blob or @aws-sdk/client-s3 calls.
 */

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg", "image/png", "image/webp", "image/gif",
];

const ALLOWED_RESOURCE_TYPES = [
    ...ALLOWED_IMAGE_TYPES,
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/zip",
    "text/plain",
    "text/csv",
];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;      // 5 MB
const MAX_RESOURCE_SIZE = 20 * 1024 * 1024;   // 20 MB

function sanitizeFilename(original: string): string {
    const ext = path.extname(original).toLowerCase();
    const base = path.basename(original, ext)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
        .slice(0, 60);
    const timestamp = Date.now();
    const rand = Math.random().toString(36).substring(2, 6);
    return `${timestamp}-${rand}-${base}${ext}`;
}

export type UploadCategory = "thumbnails" | "images" | "resources";

interface UploadResult {
    url: string;
    filename: string;
    fileSize: number;
    fileType: string;
}

/**
 * Upload a file to local storage.
 *
 * @param buffer - Raw file bytes
 * @param originalName - Original filename (used for sanitization)
 * @param mimeType - The file's MIME type
 * @param category - Storage subfolder: "thumbnails" | "images" | "resources"
 * @returns Public URL and metadata
 */
export async function uploadFile(
    buffer: Buffer,
    originalName: string,
    mimeType: string,
    category: UploadCategory
): Promise<UploadResult> {
    // Validate MIME type
    const isImage = category === "thumbnails" || category === "images";
    const allowed = isImage ? ALLOWED_IMAGE_TYPES : ALLOWED_RESOURCE_TYPES;
    if (!allowed.includes(mimeType)) {
        throw new Error(`File type "${mimeType}" is not allowed for ${category}. Allowed: ${allowed.join(", ")}`);
    }

    // Validate size
    const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_RESOURCE_SIZE;
    if (buffer.length > maxSize) {
        const maxMB = (maxSize / (1024 * 1024)).toFixed(0);
        throw new Error(`File exceeds maximum size of ${maxMB} MB.`);
    }

    // Ensure directory exists
    const dir = path.join(UPLOAD_ROOT, category);
    if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
    }

    // Write file
    const filename = sanitizeFilename(originalName);
    const filePath = path.join(dir, filename);
    await writeFile(filePath, buffer);

    return {
        url: `/uploads/${category}/${filename}`,
        filename,
        fileSize: buffer.length,
        fileType: mimeType,
    };
}

/**
 * Delete a file from local storage.
 *
 * @param url - The public URL path (e.g. "/uploads/thumbnails/xxx.jpg")
 */
export async function deleteFile(url: string): Promise<void> {
    if (!url || !url.startsWith("/uploads/")) return;

    const filePath = path.join(process.cwd(), "public", url);
    try {
        await unlink(filePath);
    } catch {
        // File may already be deleted or never existed — fail silently
        console.warn(`[Storage] Could not delete file: ${url}`);
    }
}

export { ALLOWED_IMAGE_TYPES, ALLOWED_RESOURCE_TYPES, MAX_IMAGE_SIZE, MAX_RESOURCE_SIZE };
