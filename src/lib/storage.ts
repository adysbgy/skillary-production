import { randomUUID } from "node:crypto";
import { writeFile, unlink, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileTypeFromBuffer } from "file-type";

const UPLOAD_ROOT = path.join(process.cwd(), "public", "uploads");
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PRIVATE_REFERENCE_PREFIX = "storage://";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_RESOURCE_TYPES = [
  ...ALLOWED_IMAGE_TYPES,
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip",
  "text/plain",
  "text/csv",
];
const TEXT_TYPES = new Set(["text/plain", "text/csv"]);
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const MAX_RESOURCE_SIZE = 20 * 1024 * 1024;

export type UploadCategory = "thumbnails" | "images" | "resources";
interface UploadResult { url: string; filename: string; fileSize: number; fileType: string; }

function sanitizeFilename(original: string): string {
  const ext = path.extname(original).toLowerCase().replace(/[^.a-z0-9]/g, "").slice(0, 12);
  return `${randomUUID()}${ext}`;
}

function storageReference(bucket: UploadCategory, filename: string): string {
  return `${PRIVATE_REFERENCE_PREFIX}${bucket}/${filename}`;
}

function parseStorageReference(reference: string): { bucket: UploadCategory; objectPath: string } | null {
  if (!reference.startsWith(PRIVATE_REFERENCE_PREFIX)) return null;
  const value = reference.slice(PRIVATE_REFERENCE_PREFIX.length);
  const slash = value.indexOf("/");
  if (slash < 1) return null;
  const bucket = value.slice(0, slash) as UploadCategory;
  const objectPath = value.slice(slash + 1);
  if (!["thumbnails", "images", "resources"].includes(bucket) || !objectPath || objectPath.includes("..")) return null;
  return { bucket, objectPath };
}

async function verifiedMimeType(buffer: Buffer, claimedMime: string): Promise<string> {
  const detected = await fileTypeFromBuffer(buffer);
  if (detected) {
    if (detected.mime !== claimedMime) throw new Error("File content does not match its declared type.");
    return detected.mime;
  }
  if (TEXT_TYPES.has(claimedMime)) {
    const sample = buffer.subarray(0, 4096);
    if (sample.includes(0)) throw new Error("Invalid text file content.");
    return claimedMime;
  }
  throw new Error("File signature is unsupported or invalid.");
}

export async function uploadFile(
  buffer: Buffer,
  originalName: string,
  mimeType: string,
  category: UploadCategory,
): Promise<UploadResult> {
  const isImage = category === "thumbnails" || category === "images";
  const allowed = isImage ? ALLOWED_IMAGE_TYPES : ALLOWED_RESOURCE_TYPES;
  if (!allowed.includes(mimeType)) throw new Error("File type is not allowed.");
  const maxSize = isImage ? MAX_IMAGE_SIZE : MAX_RESOURCE_SIZE;
  if (buffer.length === 0 || buffer.length > maxSize) throw new Error(`File exceeds maximum size of ${maxSize / 1024 / 1024} MB.`);
  const verifiedType = await verifiedMimeType(buffer, mimeType);
  const filename = sanitizeFilename(originalName);

  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    const response = await fetch(`${SUPABASE_URL}/storage/v1/object/${category}/${filename}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, "Content-Type": verifiedType, "x-upsert": "false" },
      body: new Uint8Array(buffer),
    });
    if (!response.ok) throw new Error("Persistent storage upload failed.");
    return {
      url: category === "resources"
        ? storageReference(category, filename)
        : `${SUPABASE_URL}/storage/v1/object/public/${category}/${filename}`,
      filename,
      fileSize: buffer.length,
      fileType: verifiedType,
    };
  }

  const dir = path.join(UPLOAD_ROOT, category);
  if (!existsSync(dir)) await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, filename), buffer);
  return {
    url: category === "resources" ? storageReference(category, filename) : `/uploads/${category}/${filename}`,
    filename,
    fileSize: buffer.length,
    fileType: verifiedType,
  };
}

export async function createPrivateDownload(reference: string, expiresInSeconds = 300): Promise<{ url?: string; body?: Buffer }> {
  const object = parseStorageReference(reference);
  if (!object || object.bucket !== "resources") throw new Error("Invalid private storage reference.");
  if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    const response = await fetch(`${SUPABASE_URL}/storage/v1/object/sign/${object.bucket}/${object.objectPath}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ expiresIn: expiresInSeconds }),
    });
    if (!response.ok) throw new Error("Could not create private download.");
    const payload = await response.json() as { signedURL?: string; signedUrl?: string };
    const signedPath = payload.signedURL || payload.signedUrl;
    if (!signedPath) throw new Error("Storage returned an invalid signed URL.");
    return { url: new URL(signedPath, SUPABASE_URL).toString() };
  }
  return { body: await readFile(path.join(UPLOAD_ROOT, object.bucket, path.basename(object.objectPath))) };
}

export async function deleteFile(url: string): Promise<void> {
  if (!url) return;
  const privateObject = parseStorageReference(url);
  let bucketAndPath: string | null = privateObject ? `${privateObject.bucket}/${privateObject.objectPath}` : null;
  if (!bucketAndPath && SUPABASE_URL) {
    const publicPrefix = `${SUPABASE_URL}/storage/v1/object/public/`;
    if (url.startsWith(publicPrefix)) bucketAndPath = url.slice(publicPrefix.length);
  }
  if (bucketAndPath && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
    await fetch(`${SUPABASE_URL}/storage/v1/object/${bucketAndPath}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}` },
    });
    return;
  }
  const localReference = privateObject
    ? path.join(UPLOAD_ROOT, privateObject.bucket, path.basename(privateObject.objectPath))
    : url.startsWith("/uploads/") ? path.join(process.cwd(), "public", url) : null;
  if (localReference) await unlink(localReference).catch(() => undefined);
}

export { ALLOWED_IMAGE_TYPES, ALLOWED_RESOURCE_TYPES, MAX_IMAGE_SIZE, MAX_RESOURCE_SIZE };
