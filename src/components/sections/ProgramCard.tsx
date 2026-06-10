import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";
import { PrimaryButton } from "@/components/ui/Button";

interface ProgramCardProps {
    slug: string;
    title: string;
    description: string;
    level: string;
    duration: string;
    format: string;
    category: string;
    skills: readonly string[];
    price: number;
    thumbnailUrl?: string | null;
}

const mapLevel = (lvl: string) => {
    const map: Record<string, string> = {
        "Intermediate": "Menengah",
        "All Levels": "Semua Level",
        "Advanced": "Lanjutan",
        "Beginner": "Pemula"
    };
    return map[lvl] || lvl;
}

const mapFormat = (fmt: string) => {
    const map: Record<string, string> = {
        "Self-paced": "Mandiri",
        "Live Cohort": "Live Cohort",
        "Bootcamp": "Bootcamp"
    };
    return map[fmt] || fmt;
}

export function ProgramCard({ slug, title, description, level, duration, format, category, skills, price, thumbnailUrl }: ProgramCardProps) {
    const href = `/program/${slug}`;

    return (
        <Card className="flex flex-col h-full overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
            {/* Thumbnail */}
            <div className="w-full h-40 bg-gradient-to-br from-[rgb(255,138,0)]/20 via-[#FFF8EC] to-[rgb(255,90,95)]/15 relative overflow-hidden shrink-0">
                {thumbnailUrl ? (
                    <img src={thumbnailUrl} alt={title} className="w-full h-full object-cover" />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-black/[0.06] tracking-tight">Skillary</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-1 p-5">
                <div className="flex-1">
                    <div className="mb-4 flex items-center justify-between">
                        <Pill>{mapFormat(format)}</Pill>
                        <span className="text-xs text-black/45">{mapLevel(level)}</span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight line-clamp-2">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-black/60 line-clamp-2">{description}</p>
                    <div className="mt-4 flex flex-wrap gap-2 items-center">
                        {skills.slice(0, 2).map((skill) => <Pill key={skill} tone="warm">{skill}</Pill>)}
                        {skills.length > 2 && <span className="text-xs text-black/40">+{skills.length - 2}</span>}
                    </div>
                </div>
                
                {/* Footer/CTA Row */}
                <div className="mt-auto flex flex-col gap-3 pt-6">
                    <div className="flex items-center justify-between text-xs text-black/50">
                        <span>{duration}</span>
                        <span>{category}</span>
                    </div>
                    <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-black/40">Pendaftaran</span>
                        <span className={`text-sm font-bold ${price > 0 ? "text-black" : "text-green-600"}`}>
                            {price > 0 ? `Rp ${price.toLocaleString('id-ID')}` : "Gratis"}
                        </span>
                    </div>
                    <Link href={href} className="mt-2">
                        <PrimaryButton className="w-full px-4">Lihat Program</PrimaryButton>
                    </Link>
                </div>
            </div>
        </Card>
    );
}
