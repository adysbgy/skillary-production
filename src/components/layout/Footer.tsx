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
        <footer className="bg-skillary-navy text-white pt-14 pb-8">
            <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">

                    {/* Brand + Address */}
                    <div className="md:col-span-2">
                        <div className="mb-8">
                            <Logo variant="dark" />
                        </div>
                        <div className="space-y-2.5">
                            <div className="flex items-start gap-2">
                                <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: 'rgb(255, 138, 0)' }} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <div>
                                    <p className="text-xs font-semibold text-white">Skillary HQ</p>
                                    <p className="text-xs text-gray-400">Jakarta, Indonesia</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0" style={{ color: 'rgb(255, 138, 0)' }} fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                                    <rect height="16" rx="2" width="20" x="2" y="4" />
                                </svg>
                                <a className="text-xs text-gray-400 hover:text-white transition-colors" href="mailto:hello@skillary.id">
                                    hello@skillary.id
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="text-sm font-bold text-white mb-4">Platform</h4>
                        <ul className="space-y-2.5">
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/platform">Platform</Link></li>
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/demo">Demo</Link></li>
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/untuk-organisasi">Laporan</Link></li>
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/certificates">Sertifikat</Link></li>
                        </ul>
                    </div>

                    {/* Program */}
                    <div>
                        <h4 className="text-sm font-bold text-white mb-4">Program</h4>
                        <ul className="space-y-2.5">
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/program-catalog">Jelajahi Program</Link></li>
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/learning-paths">Training Path</Link></li>
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/resources">Brief Training</Link></li>
                        </ul>
                    </div>

                    {/* Untuk Organisasi + Skillary */}
                    <div>
                        <h4 className="text-sm font-bold text-white mb-4">Untuk Organisasi</h4>
                        <ul className="space-y-2.5">
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/untuk-organisasi">Solusi Organisasi</Link></li>
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/contact?type=proposal&source=proposal">Diskusikan Kebutuhan Training</Link></li>
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/contact">Kontak</Link></li>
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/portofolio">Portofolio</Link></li>
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/portofolio">Studi Kasus</Link></li>
                            <li><Link className="text-xs text-gray-400 hover:text-white transition-colors hover:underline" href="/about">Tentang Kami</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="border-t pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderColor: 'rgb(31, 41, 55)' }}>
                    <p className="text-xs text-gray-500 text-center md:text-left">
                        © {new Date().getFullYear()} PT Skillary Generasi Cerdas. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link className="text-xs text-gray-500 hover:text-white transition-colors" href="/privacy">Kebijakan Privasi</Link>
                        <Link className="text-xs text-gray-500 hover:text-white transition-colors" href="/terms">Syarat &amp; Ketentuan</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

