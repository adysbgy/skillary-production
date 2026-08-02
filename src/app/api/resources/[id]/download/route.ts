import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { canAccessCourseContent } from "@/lib/entitlements";
import { createPrivateDownload } from "@/lib/storage";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const resource = await prisma.resource.findUnique({
    where: { id },
    include: { lesson: { include: { module: { select: { courseId: true } } } } },
  });
  if (!resource) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const courseId = resource.lesson.module.courseId;
  if (!await canAccessCourseContent(session.user.id, courseId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  if (!resource.url.startsWith("storage://resources/")) {
    return NextResponse.redirect(resource.url);
  }
  const download = await createPrivateDownload(resource.url, 300);
  if (download.url) return NextResponse.redirect(download.url);
  return new NextResponse(new Uint8Array(download.body!), {
    headers: {
      "Content-Type": resource.fileType,
      "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(resource.filename)}`,
      "Cache-Control": "private, no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
