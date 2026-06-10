"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { ProgramCard } from "@/components/sections/ProgramCard";

interface Program {
    slug: string;
    title: string;
    description: string;
    level: string;
    format: string;
    duration: string;
    category: string;
    skills: string[];
    price: number;
    thumbnailUrl?: string | null;
}

export default function ExploreClient({ programs }: { programs: Program[] }) {
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");
    const categories = ["All", ...new Set(programs.map((p) => p.category))];

    const filtered = useMemo(() => {
        return programs.filter((item) => {
            const categoryMatch = category === "All" || item.category === category;
            const q = search.toLowerCase();
            const searchMatch = !q || item.title.toLowerCase().includes(q) || item.skills.join(" ").toLowerCase().includes(q);
            return categoryMatch && searchMatch;
        });
    }, [category, search, programs]);

    return (
        <>
            <PageHero
                eyebrow="Jelajahi Program"
                title="Temukan program pelatihan untuk pertumbuhan nyata."
                description="Jelajahi program pelatihan, guided project, dan learning path terstruktur yang dirancang untuk kebutuhan organisasi dan pengembangan SDM."
            />

            <Container className="pt-8">
                <div className="rounded-2xl p-6 lg:p-8 flex items-center justify-between gap-6 flex-wrap" style={{ background: 'rgb(255, 244, 232)', border: '1.5px solid rgb(255, 214, 165)' }}>
                    <div>
                        <h2 className="text-xl font-bold mb-2" style={{ color: 'rgb(255, 138, 0)' }}>Mencari jalur terstruktur?</h2>
                        <p className="text-sm max-w-xl" style={{ color: 'rgb(255, 138, 0)', opacity: 0.8 }}>Koleksi program terkurasi yang disusun menjadi learning path terstruktur dari dasar hingga mahir.</p>
                    </div>
                    <Link href="/path" className="px-5 py-2.5 text-white font-bold rounded-full text-sm transition-opacity hover:opacity-90 whitespace-nowrap" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                        Lihat Learning Path →
                    </Link>
                </div>
            </Container>

            <Container className="py-8">
                <div className="rounded-2xl bg-white p-5 shadow-sm lg:p-6" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                    <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari berdasarkan topik, skill, atau program"
                            className="w-full rounded-xl px-4 py-3 text-sm outline-none placeholder:text-black/35 focus-visible:ring-2 focus-visible:ring-offset-2"
                            style={{ border: '1.5px solid rgb(240, 217, 200)', background: '#FAFAFA', }}
                        />
                        <div className="flex flex-wrap gap-3">
                            {categories.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setCategory(item)}
                                    className="rounded-full px-4 py-2 text-sm font-medium transition"
                                    style={category === item
                                        ? { background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))', color: 'white' }
                                        : { border: '1.5px solid rgb(240, 217, 200)', background: 'white', color: 'rgba(0,0,0,0.65)' }
                                    }
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>

            <Container className="py-8 pb-20">
                {filtered.length > 0 ? (
                    <>
                        <div className="mb-8 flex flex-col gap-2">
                            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#0F172A' }}>Katalog Program</h2>
                            <div className="flex items-center gap-2">
                                <span className="px-2.5 py-1 text-xs font-bold rounded bg-gray-100 text-gray-700">{filtered.length} program ditemukan</span>
                            </div>
                            <p className="mt-2 text-base leading-7 text-black/60">Program terkurasi untuk bisnis, pertumbuhan digital, dan pembelajaran praktis.</p>
                        </div>
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {filtered.map((item) => (
                                <ProgramCard key={item.slug} {...item} />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center py-16 text-center">
                        <div className="mb-4 h-16 w-16 rounded-full" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0, 0.15), rgb(255, 90, 95, 0.15))' }} />
                        <h3 className="text-xl font-bold tracking-tight" style={{ color: '#0F172A' }}>Program tidak ditemukan</h3>
                        <p className="mt-2 max-w-md text-sm leading-7 text-black/55">
                            Kami tidak menemukan program yang cocok dengan pencarian Anda. Coba sesuaikan filter atau kata kunci.
                        </p>
                        <button
                            onClick={() => { setSearch(""); setCategory("All"); }}
                            className="mt-6 rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
                            style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
                        >
                            Hapus Filter
                        </button>
                    </div>
                )}
            </Container>
        </>
    );
}
