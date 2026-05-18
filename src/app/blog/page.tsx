import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { BLOG_POSTS } from "@/data/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Skillary",
    description: "Insight, panduan, dan tips praktis seputar pelatihan organisasi, pengembangan SDM, dan skill digital.",
};

export default function BlogPage() {
    return (
        <>
            <PageHero
                eyebrow="Blog"
                title="Insight untuk HR & L&D"
                description="Pemikiran praktis seputar pelatihan organisasi, pengembangan SDM, dan skill digital — dari tim Skillary."
            />

            <Container className="py-16 lg:py-24">
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'rgb(255, 138, 0)' }}>Terbaru</p>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#0F172A' }}>Artikel Terkini</h2>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {BLOG_POSTS.map((post) => (
                        <Link key={post.slug} href={`/blog/${post.slug}`}>
                            <div className="group flex h-full flex-col p-6 bg-white rounded-2xl transition hover:-translate-y-1 hover:shadow-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                                <div className="flex items-center gap-2">
                                    <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>{post.category}</span>
                                    <span className="text-xs text-black/40">{post.readTime}</span>
                                </div>
                                <h3 className="mt-4 text-lg font-bold leading-snug tracking-tight" style={{ color: '#0F172A' }}>{post.title}</h3>
                                <p className="mt-3 flex-1 text-sm leading-7 text-black/60">{post.excerpt}</p>
                                <div className="mt-5 flex items-center justify-between">
                                    <span className="text-xs text-black/35">{new Date(post.date).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })}</span>
                                    <span className="text-sm font-bold transition" style={{ color: 'rgb(255, 138, 0)' }}>Baca →</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </Container>

            <Container className="pb-24 lg:pb-32">
                <div className="overflow-hidden rounded-2xl p-8 text-center lg:p-12" style={{ background: 'rgb(255, 251, 245)', border: '1.5px solid rgb(240, 217, 200)' }}>
                    <p className="text-sm font-bold uppercase tracking-widest text-black/40">Segera Hadir</p>
                    <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl" style={{ color: '#0F172A' }}>Lebih banyak artikel segera hadir</h2>
                    <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-black/55">Kami sedang menyusun panduan praktis, studi kasus, dan insight pelatihan organisasi. Kembali lagi nanti atau hubungi kami untuk menyarankan topik.</p>
                    <Link href="/contact" className="mt-6 inline-block">
                        <button className="rounded-full bg-white px-6 py-3 text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ border: '1.5px solid rgb(240, 217, 200)', color: '#334155' }}>
                            Sarankan Topik
                        </button>
                    </Link>
                </div>
            </Container>
        </>
    );
}
