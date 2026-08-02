import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";

export const dynamic = "force-dynamic";

export default async function PathsCatalogue() {
    const paths = await prisma.learningPath.findMany({
        where: { status: "PUBLISHED" },
        include: { _count: { select: { courses: true } } },
        orderBy: { createdAt: "desc" }
    });

    return (
        <>
            <PageHero
                eyebrow="Learning Path"
                title="Jalur pelatihan terstruktur untuk organisasi"
                description="Ikuti progres belajar terstruktur yang dirancang untuk membawa peserta dari dasar hingga mahir."
            />

            <Container className="py-12 lg:py-20">
                {paths.length === 0 ? (
                    <div className="text-center py-24 rounded-2xl bg-white" style={{ border: '1.5px dashed rgb(240, 217, 200)' }}>
                        <div className="mx-auto mb-4 h-16 w-16 rounded-full" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0, 0.12), rgb(255, 90, 95, 0.12))' }} />
                        <h3 className="text-xl font-bold tracking-tight" style={{ color: '#0F172A' }}>Belum ada learning path tersedia</h3>
                        <p className="mt-2 max-w-md mx-auto text-sm leading-7 text-black/55">Learning path sedang disiapkan. Kembali lagi nanti atau hubungi kami untuk kebutuhan pelatihan terstruktur.</p>
                        <Link href="/contact" className="mt-6 inline-block">
                            <button className="px-6 py-2.5 text-sm font-bold text-white rounded-full hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                                Hubungi Kami
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {paths.map(path => (
                            <Link key={path.id} href={`/path/${path.slug}`} className="group relative rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md block flex flex-col justify-between" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight leading-tight mb-3" style={{ color: '#0F172A' }}>
                                        {path.title}
                                    </h2>
                                    <p className="text-sm text-black/50 leading-relaxed mb-6 line-clamp-3">
                                        {path.description}
                                    </p>
                                </div>
                                <div className="flex items-center justify-between pt-4 mt-auto" style={{ borderTop: '1.5px solid rgb(240, 217, 200)' }}>
                                    <span className="text-xs font-bold uppercase tracking-widest text-black/40">
                                        {path._count.courses} Program
                                    </span>
                                    <span className="text-sm font-bold transition-colors" style={{ color: 'rgb(255, 138, 0)' }}>
                                        Lihat Path →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </Container>
        </>
    );
}
