"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Logo } from "@/components/ui/Logo";
import { PrimaryButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const NAV_ITEMS = [
    ["programs", "Program", "/program-catalog"],
    ["organizations", "Untuk Organisasi", "/services"],
    ["certificates", "Sertifikat", "/certificates"],
    ["portfolio", "Portofolio", "/portfolio"],
    ["contact", "Kontak", "/contact"],
] as const;

export function Header() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const accountMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 15);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setMenuOpen(false);
        setAccountMenuOpen(false);
    }, [pathname]);

    // Handle click outside and Esc for desktop account menu
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
                setAccountMenuOpen(false);
            }
        }
        function handleEsc(e: KeyboardEvent) {
            if (e.key === "Escape") setAccountMenuOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    const role = session?.user?.role;
    const isCreator = role === "ADMIN" || role === "INSTRUCTOR";
    const creatorLabel = role === "ADMIN" ? "Admin" : "Instructor";
    const userInitial = session?.user?.name?.charAt(0)?.toUpperCase() || "U";

    return (
        <>
            <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur shadow-sm" : "bg-white"}`} style={{ borderBottom: '1.5px solid rgb(240, 217, 200)' }}>
                <div className="max-w-7xl mx-auto px-5 md:px-6 lg:px-8 flex items-center justify-between py-4">
                    <Link href="/" className="text-left">
                        <Logo />
                    </Link>

                    <nav className="hidden items-center gap-2 lg:flex">
                        {NAV_ITEMS.map(([key, label, path]) => (
                            <Link
                                key={key}
                                href={path}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${pathname === path ? "text-white" : "text-black/80 hover:text-[rgb(255,138,0)]"}`}
                                style={pathname === path ? { background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' } : { }}
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        {session ? (
                            <>
                                {isCreator && (
                                    <Link href="/admin" className="hidden rounded-full px-4 py-2 text-sm font-medium text-black/70 transition hover:bg-black/5 lg:inline-flex">
                                        {creatorLabel}
                                    </Link>
                                )}
                                <div className="relative hidden lg:block" ref={accountMenuRef}>
                                    <button
                                        id="account-menu-trigger"
                                        aria-haspopup="menu"
                                        aria-controls="account-menu"
                                        onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                                        className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white transition hover:opacity-90 ring-2 ring-transparent focus:ring-[rgb(255,138,0)] outline-none"
                                        style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
                                        aria-label="Account menu"
                                        aria-expanded={accountMenuOpen}
                                    >
                                        {userInitial}
                                    </button>

                                    <div
                                        id="account-menu"
                                        role="menu"
                                        aria-labelledby="account-menu-trigger"
                                        className={`absolute right-0 top-full mt-2 w-48 rounded-xl border border-black/10 bg-white shadow-xl transition-all origin-top-right overflow-hidden ${accountMenuOpen ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"}`}
                                    >
                                        <div role="presentation" className="px-3 py-2 border-b border-black/5 bg-black/[0.02] select-none">
                                            <p className="text-sm font-medium text-black truncate">{session.user?.name || "Learner"}</p>
                                            <p className="text-[11px] font-medium text-black/50 truncate mt-0.5">{session.user?.email}</p>
                                        </div>
                                        <div className="p-1.5 flex flex-col gap-0.5">
                                            <Link
                                                href="/dashboard"
                                                className="flex w-full items-center rounded-md px-2.5 py-1.5 text-sm font-medium text-black/70 hover:bg-black/5 hover:text-black focus:bg-black/5 focus:text-black focus:outline-none transition"
                                                role="menuitem"
                                                tabIndex={accountMenuOpen ? 0 : -1}
                                                onClick={() => setAccountMenuOpen(false)}
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={() => { setAccountMenuOpen(false); signOut(); }}
                                                className="flex w-full items-center rounded-md px-2.5 py-1.5 text-sm font-medium text-black/70 hover:bg-black/5 hover:text-black focus:bg-black/5 focus:text-black focus:outline-none transition"
                                                role="menuitem"
                                                tabIndex={accountMenuOpen ? 0 : -1}
                                            >
                                                Sign out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <Link
                                    href="/dashboard"
                                    className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white transition hover:opacity-90 lg:hidden"
                                    style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
                                    aria-label="Dashboard"
                                >
                                    {userInitial}
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link href="/login" className="hidden rounded-full px-4 py-2 text-sm font-medium text-black/70 transition hover:bg-black/5 lg:inline-flex">
                                    Masuk
                                </Link>
                                <Link href="/proposal" className="hidden sm:inline-flex">
                                    <button className="px-5 py-2.5 text-sm font-bold text-white rounded-full shadow-md hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>Diskusikan Kebutuhan Training</button>
                                </Link>
                            </>
                        )}

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="relative flex h-10 w-10 items-center justify-center rounded-2xl transition hover:bg-black/5 lg:hidden"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                        >
                            <div className="flex w-5 flex-col gap-[5px]">
                                <span className={`block h-[2px] w-full rounded-full bg-[#181818] transition-all duration-300 ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                                <span className={`block h-[2px] w-full rounded-full bg-[#181818] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
                                <span className={`block h-[2px] w-full rounded-full bg-[#181818] transition-all duration-300 ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu overlay */}
            <div
                className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${menuOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
                aria-hidden="true"
                onClick={() => setMenuOpen(false)}
            />
            <div
                role="dialog"
                aria-label="Mobile navigation"
                className={`fixed right-0 top-0 z-40 flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
                    <Logo />
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="flex h-10 w-10 items-center justify-center rounded-2xl transition hover:bg-black/5"
                        aria-label="Close menu"
                    >
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-black/70">
                            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
                    {NAV_ITEMS.map(([key, label, path]) => (
                        <Link
                            key={key}
                            href={path}
                            onClick={() => setMenuOpen(false)}
                            className={`rounded-2xl px-4 py-3 text-base font-medium transition ${pathname === path ? "text-white" : "text-black/75 hover:bg-black/5"}`}
                            style={pathname === path ? { background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' } : {}}
                        >
                            {label}
                        </Link>
                    ))}

                    {session && (
                        <>
                            <hr className="my-3 border-black/5" />
                            <Link
                                href="/dashboard"
                                onClick={() => setMenuOpen(false)}
                                className={`rounded-2xl px-4 py-3 text-base font-medium transition ${pathname.startsWith("/dashboard") ? "text-white" : "text-black/75 hover:bg-black/5"}`}
                                style={pathname.startsWith("/dashboard") ? { background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' } : {}}
                            >
                                Dashboard
                            </Link>
                            {isCreator && (
                                <Link
                                    href="/admin"
                                    onClick={() => setMenuOpen(false)}
                                    className={`rounded-2xl px-4 py-3 text-base font-medium transition ${pathname.startsWith("/admin") ? "text-white" : "text-black/75 hover:bg-black/5"}`}
                                    style={pathname.startsWith("/admin") ? { background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' } : {}}
                                >
                                    {creatorLabel}
                                </Link>
                            )}
                        </>
                    )}
                </nav>

                <div className="border-t border-black/5 px-6 py-6">
                    {session ? (
                        <>
                            <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                                <PrimaryButton className="w-full">Dashboard</PrimaryButton>
                            </Link>
                            <button
                                onClick={() => { setMenuOpen(false); signOut(); }}
                                className="mt-3 block w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-center text-sm font-semibold text-black/70 transition hover:bg-black/5"
                            >
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/proposal" onClick={() => setMenuOpen(false)}>
                                <button className="w-full px-6 py-3 text-sm font-bold text-white rounded-full shadow-md hover:opacity-90 transition-opacity" style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}>Diskusikan Kebutuhan Training</button>
                            </Link>
                            <Link
                                href="/login"
                                onClick={() => setMenuOpen(false)}
                                className="mt-3 block w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-center text-sm font-semibold text-black/70 transition hover:bg-black/5"
                            >
                                Masuk
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
