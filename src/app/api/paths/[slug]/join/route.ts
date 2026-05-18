import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const session = await auth();
        if (!session?.user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { slug } = await params;
        const path = await prisma.learningPath.findUnique({
            where: { slug }
        });

        if (!path) {
            return new NextResponse("Not Found", { status: 404 });
        }

        // Create intent if not exists
        const enrollment = await prisma.pathEnrollment.upsert({
            where: {
                userId_learningPathId: {
                    userId: session.user.id,
                    learningPathId: path.id
                }
            },
            create: {
                userId: session.user.id,
                learningPathId: path.id
            },
            update: {} // do nothing if already joined
        });

        return NextResponse.json(enrollment);
    } catch (e) {
        console.error("Join path error", e);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
