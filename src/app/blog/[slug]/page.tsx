import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/content";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) return { title: "Article Not Found | Skillary" };
    return {
        title: `${post.title} | Blog | Skillary`,
        description: post.excerpt,
        alternates: { canonical: `/blog/${post.slug}` },
    };
}

export function generateStaticParams() {
    return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    const post = getBlogPostBySlug(slug);
    if (!post) notFound();

    const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 2);

    return (
        <>
            <PageHero
                eyebrow={post.category}
                title={post.title}
                description={`${new Date(post.date).toLocaleDateString("id-ID", { month: "long", day: "numeric", year: "numeric" })} · ${post.readTime}`}
            >
                <Link href="/blog">
                    <button className="mt-2 px-4 py-2 rounded-full bg-white text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ border: '1.5px solid rgb(240, 217, 200)', color: '#334155' }}>
                        ← Kembali ke Blog
                    </button>
                </Link>
            </PageHero>

            <Container className="py-16 lg:py-24">
                <div className="grid gap-12 lg:grid-cols-[1fr_0.35fr] lg:items-start">
                    <article className="prose prose-neutral max-w-none text-black/75 [&_p]:text-base [&_p]:leading-8 [&_p]:mb-6">
                        {post.content.map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </article>

                    <aside className="space-y-6">
                        <div className="p-6 bg-white rounded-2xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                            <p className="text-xs font-bold uppercase tracking-widest text-black/40">Tentang artikel ini</p>
                            <div className="mt-4 space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-black/50">Kategori</span>
                                    <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>{post.category}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-black/50">Waktu baca</span>
                                    <span className="text-sm font-medium">{post.readTime}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-black/50">Dipublikasikan</span>
                                    <span className="text-sm font-medium">{new Date(post.date).toLocaleDateString("id-ID", { month: "short", day: "numeric", year: "numeric" })}</span>
                                </div>
                            </div>
                        </div>

                        {otherPosts.length > 0 && (
                            <div className="p-6 bg-white rounded-2xl" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                                <p className="text-xs font-bold uppercase tracking-widest text-black/40">Artikel lainnya</p>
                                <div className="mt-4 space-y-4">
                                    {otherPosts.map((other) => (
                                        <Link key={other.slug} href={`/blog/${other.slug}`} className="group block">
                                            <h4 className="text-sm font-bold leading-snug tracking-tight transition" style={{ color: '#0F172A' }}>{other.title}</h4>
                                            <p className="mt-1 text-xs text-black/45">{other.readTime}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <Link href="/explore" className="block">
                            <div className="overflow-hidden rounded-2xl p-6 text-center" style={{ background: 'rgb(255, 251, 245)', border: '1.5px solid rgb(240, 217, 200)' }}>
                                <p className="text-sm font-bold" style={{ color: '#0F172A' }}>Siap belajar?</p>
                                <p className="mt-2 text-xs leading-5 text-black/55">Jelajahi program pelatihan yang dirancang untuk pertumbuhan praktis.</p>
                                <button className="mt-4 w-full px-4 py-2 rounded-full bg-white text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ border: '1.5px solid rgb(240, 217, 200)', color: '#334155' }}>
                                    Jelajahi Program
                                </button>
                            </div>
                        </Link>
                    </aside>
                </div>
            </Container>
        </>
    );
}
