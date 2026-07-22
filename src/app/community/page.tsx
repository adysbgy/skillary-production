import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/sections/PageHero";
import { EVENTS, MENTORS } from "@/data/content";
import type { Metadata } from "next";
import { MarketingShell } from "@/components/v2/marketing/MarketingShell";

export const metadata: Metadata = {
    title: "Komunitas | Skillary",
    description: "Tumbuh bersama rekan dan mentor. Ikuti sesi komunitas, bertemu praktisi, dan bangun koneksi profesional di Skillary.",
};

export default function CommunityPage() {
    return (
        <MarketingShell showFooter={false}>
            <PageHero
                eyebrow="Komunitas"
                title="Tumbuh bersama praktisi, bukan hanya konten"
                description="Skillary menggabungkan pembelajaran platform dengan sesi praktis, mentor, dan momen komunitas yang menjaga pertumbuhan tetap hidup."
            />

            <Container className="py-16 lg:py-24">
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'rgb(255, 138, 0)' }}>Yang Anda Dapatkan</p>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#0F172A' }}>Lebih dari sekadar platform</h2>
                    <p className="mt-3 text-base leading-8 text-black/60">Komunitas Skillary dirancang untuk koneksi nyata, mentorship, dan pertumbuhan bersama.</p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {[
                        ["💬", "Diskusi Rekan Sejawat", "Terhubung dengan sesama peserta untuk berbagi progress, bertanya, dan bertukar insight dunia nyata."],
                        ["👥", "Akses Mentor", "Dapatkan bimbingan langsung dari praktisi saat office hours dan sesi review."],
                        ["📋", "Review Portofolio", "Kirimkan project Anda untuk mendapatkan feedback terstruktur dari mentor dan rekan."],
                        ["📢", "Info Peluang", "Temukan lowongan kerja, proyek freelance, dan peluang kolaborasi yang relevan."],
                        ["🎯", "Tantangan Mingguan", "Asah kemampuan Anda dengan mini-challenge praktis setiap minggu."],
                        ["🎓", "Jaringan Alumni", "Tetap terhubung dengan anggota batch sebelumnya dan perluas jaringan profesional."],
                    ].map(([icon, title, desc]) => (
                        <div key={title} className="p-6 bg-white rounded-2xl transition hover:-translate-y-1 hover:shadow-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl text-2xl shadow-sm" style={{ background: 'rgb(255, 244, 232)' }}>{icon}</div>
                            <h3 className="text-lg font-bold tracking-tight" style={{ color: '#0F172A' }}>{title}</h3>
                            <p className="mt-3 text-sm leading-7 text-black/60">{desc}</p>
                        </div>
                    ))}
                </div>
            </Container>

            <Container className="py-16 lg:py-24">
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'rgb(255, 138, 0)' }}>Mentor</p>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#0F172A' }}>Bertemu dengan praktisi kami</h2>
                    <p className="mt-3 text-base leading-8 text-black/60">Belajar dari profesional yang membangun, mengirimkan, dan memecahkan masalah di dunia nyata.</p>
                </div>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                    {MENTORS.map((mentor) => (
                        <div key={mentor.name} className="p-5 text-center bg-white rounded-2xl transition hover:-translate-y-1 hover:shadow-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                            <div className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${mentor.color} text-2xl font-bold text-white`}>{mentor.initials}</div>
                            <h3 className="text-lg font-bold tracking-tight" style={{ color: '#0F172A' }}>{mentor.name}</h3>
                            <p className="mt-2 text-sm text-black/55">{mentor.role}</p>
                        </div>
                    ))}
                </div>
            </Container>

            <Container className="py-16 lg:py-24">
                <div className="mb-8">
                    <p className="text-sm font-bold uppercase tracking-widest" style={{ color: 'rgb(255, 138, 0)' }}>Segera Hadir</p>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#0F172A' }}>Sesi live & workshop</h2>
                    <p className="mt-3 text-base leading-8 text-black/60">Ikuti sesi diskusi komunitas dan workshop untuk bertemu langsung dengan praktisi.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {EVENTS.map((event) => (
                        <div key={event.title} className="flex flex-col p-6 bg-white rounded-2xl transition hover:-translate-y-1 hover:shadow-lg" style={{ border: '1.5px solid rgb(240, 217, 200)' }}>
                            <div className="flex-1">
                                <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>{event.type}</span>
                                <h3 className="mt-4 text-xl font-bold tracking-tight" style={{ color: '#0F172A' }}>{event.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-black/60">{event.desc}</p>
                            </div>
                            <Link href="/contact">
                                <button className="mt-8 w-full py-2.5 rounded-full bg-white text-sm font-bold transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ border: '1.5px solid rgb(240, 217, 200)', color: '#334155' }}>
                                    Ikuti Sesi
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>
            </Container>

            <Container className="py-16 pb-24 lg:py-24">
                <div className="overflow-hidden rounded-2xl p-8 lg:p-12" style={{ background: 'linear-gradient(135deg, rgb(255, 244, 232), rgb(255, 241, 242))' }}>
                    <div className="flex flex-col items-center text-center">
                        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: '#0F172A' }}>Gabung Komunitas Skillary</h2>
                        <p className="mt-4 max-w-xl text-lg leading-8 text-black/65">Dapatkan akses ke diskusi eksklusif, info peluang, review portofolio, dan terhubung langsung dengan peserta di jalur yang sama.</p>
                        <div className="mt-4 flex flex-wrap gap-3">
                            {["Diskusi Aktif", "Tersedia untuk Peserta Program"].map((tag) => (
                                <span key={tag} className="inline-flex rounded-full px-3 py-1 text-xs font-semibold" style={{ background: 'rgb(255, 244, 232)', color: 'rgb(255, 138, 0)' }}>{tag}</span>
                            ))}
                        </div>
                        <Link href="/contact" className="mt-8">
                            <button className="px-8 py-3.5 text-white font-bold rounded-full shadow-lg hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>
                                Minta Akses
                            </button>
                        </Link>
                    </div>
                </div>
            </Container>
        </MarketingShell>
    );
}
