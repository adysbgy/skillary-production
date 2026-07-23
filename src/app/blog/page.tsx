import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { BLOG_POSTS } from "@/data/content";
import type { Metadata } from "next";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";
import { GradientText } from "@/components/v2/marketing/MarketingUI";

export const metadata: Metadata = {
    title: "Blog | Skillary",
    description: "Insight, panduan, dan tips praktis seputar pelatihan organisasi, pengembangan SDM, dan skill digital.",
};

export default function BlogPage() {
    return (
        <MarketingShell>
            {/* Hero */}
            <section className="relative overflow-hidden px-5 pt-16 md:pt-24 pb-12 md:pb-16 text-center">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[480px] pointer-events-none" style={{ background: "radial-gradient(ellipse at center top, rgba(255,138,0,0.13) 0%, rgba(255,90,95,0.06) 40%, transparent 70%)" }} />
                <div data-reveal className="relative max-w-3xl mx-auto">
                    <div className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-1.5 rounded-full mb-7 text-[#64748B] bg-white" style={{ border: "1px solid rgb(234, 222, 210)", boxShadow: "0 1px 3px rgba(15,23,42,0.06)" }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "rgb(255,138,0)" }} />
                        Blog
                    </div>
                    <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] mb-6">
                        Insight untuk <GradientText>HR &amp; L&amp;D</GradientText>
                    </h1>
                    <p className="text-base md:text-lg text-[#64748B] max-w-2xl mx-auto leading-relaxed">
                        Pemikiran praktis seputar pelatihan organisasi, pengembangan SDM, dan skill digital — dari tim Skillary.
                    </p>
                </div>
            </section>

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
        </MarketingShell>
    );
}
