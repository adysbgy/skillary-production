"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
    const pathname = usePathname();

    // Hide global footer on standalone landing pages that have their own footer
    const hiddenPaths = ["/lp", "/skillary-campus"];
    if (hiddenPaths.some(p => pathname.startsWith(p))) return null;

    return (
        <section className="relative bg-[url('/images/skillary_footer_bg.png')] bg-cover bg-center bg-no-repeat pt-[100px] pb-[60px] mt-[-1px] border-t border-white/5">
            {/* Pre-Footer CTA */}
            <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 text-center mb-16 relative z-10">
                <h2 className="text-[clamp(2.5rem,5vw,4rem)] font-bold tracking-tight text-white mb-6 leading-tight">
                    Mulai Bangun Karier Anda<br />Bersama Skillary
                </h2>
                <p className="text-lg text-white/80 max-w-2xl mx-auto mb-10">
                    Kuasai keterampilan digital dan manajerial dari para ahli. Daftar sekarang untuk akses pembelajaran interaktif yang siap membawa karier Anda ke level berikutnya.
                </p>
                <Link href="/program-catalog" className="inline-block bg-white text-black px-10 py-4 rounded-full font-bold text-lg border border-white/10 hover:bg-gray-100 transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    Mulai Belajar Sekarang
                </Link>
                <div className="mt-6 text-sm text-white/60 tracking-wide">
                    Akses Selamanya ✦ Bersertifikat ✦ Mentor Ahli
                </div>
            </div>

            {/* Floating Footer Card */}
            <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 relative z-10">
                <footer className="bg-[#0B0E14] rounded-[40px] p-8 md:p-12 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">
                        {/* Brand + Address */}
                        <div className="md:col-span-2">
                            <div className="mb-8">
                                <Logo variant="dark" />
                            </div>
                            <div className="space-y-4">
                                <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                                    Platform Pembelajaran Inovatif.<br/>Akses selamanya, investasi sekali.
                                </p>
                                <div className="flex items-center gap-2 mt-4">
                                    <svg aria-hidden="true" className="w-4 h-4 text-[rgb(255,138,0)]" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                                        <rect height="16" rx="2" width="20" x="2" y="4" />
                                    </svg>
                                    <a className="text-sm text-gray-400 hover:text-white transition-colors" href="mailto:hello@skillary.id">
                                        hello@skillary.id
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Platform */}
                        <div>
                            <h4 className="text-sm font-bold text-white mb-6">Platform</h4>
                            <ul className="space-y-4">
                                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/platform">Platform</Link></li>
                                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/demo">Demo</Link></li>
                                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/certificates">Sertifikat</Link></li>
                            </ul>
                        </div>

                        {/* Program */}
                        <div>
                            <h4 className="text-sm font-bold text-white mb-6">Program</h4>
                            <ul className="space-y-4">
                                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/program-catalog">Jelajahi Program</Link></li>
                                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/learning-paths">Training Path</Link></li>
                            </ul>
                        </div>

                        {/* Untuk Organisasi + Skillary */}
                        <div>
                            <h4 className="text-sm font-bold text-white mb-6">Organisasi</h4>
                            <ul className="space-y-4">
                                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/services">Solusi Organisasi</Link></li>
                                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/portfolio">Portofolio</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
                        <p className="text-sm text-gray-500">
                            © {new Date().getFullYear()} PT Skillary Generasi Cerdas. All rights reserved.
                        </p>
                        <div className="flex gap-6">
                            <Link className="text-sm text-gray-500 hover:text-white transition-colors" href="/privacy">Kebijakan Privasi</Link>
                            <Link className="text-sm text-gray-500 hover:text-white transition-colors" href="/terms">Syarat &amp; Ketentuan</Link>
                        </div>
                    </div>
                </footer>
            </div>
        </section>
    );
}

