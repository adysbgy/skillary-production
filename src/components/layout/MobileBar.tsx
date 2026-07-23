"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileBar() {
    const pathname = usePathname();
    const items = [
        ["home", "Home", "/"],
        ["explore", "Explore", "/explore"],
        ["path", "Paths", "/path"],
        ["teams", "Teams", "/untuk-organisasi"],
        ["contact", "Contact", "/contact"],
    ] as const;

    return (
        <div
            className="fixed inset-x-0 bottom-0 z-50 border-t border-black/8 bg-white/95 px-3 pt-3 backdrop-blur lg:hidden"
            style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}
        >
            <div className="mx-auto flex max-w-xl items-center justify-between gap-2 rounded-full bg-[#FAFAFA] p-2 ring-1 ring-black/5 shadow-lg shadow-black/5">
                {items.map(([key, label, path]) => {
                    const active = pathname === path;
                    return (
                        <Link
                            key={key}
                            href={path}
                            className={`min-w-0 flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold transition ${active ? "bg-[#181818] text-white" : "text-black/60"}`}
                        >
                            {label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
