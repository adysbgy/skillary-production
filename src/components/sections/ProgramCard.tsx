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

export function ProgramCard({ slug, title, description, level, duration, format, category, skills, price, thumbnailUrl }: ProgramCardProps) {
    const href = `/program/${slug}`;

    return (
        <Card className="flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
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
                        <Pill>{format}</Pill>
                        <span className="text-xs text-black/45">{level}</span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-black/60">{description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {skills.map((skill) => <Pill key={skill} tone="warm">{skill}</Pill>)}
                    </div>
                </div>
                <div className="mt-5 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-black/50">
                        <span>{duration}</span>
                        <span>{category}</span>
                    </div>
                    <div className="pt-3 border-t border-black/5 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-black/40">Enrollment</span>
                        <span className={`text-sm font-bold ${price > 0 ? "text-black" : "text-green-600"}`}>
                            {price > 0 ? `Rp ${price.toLocaleString('id-ID')}` : "Free"}
                        </span>
                    </div>
                </div>
                <Link href={href} className="mt-5">
                    <PrimaryButton className="w-full px-4">View Program</PrimaryButton>
                </Link>
            </div>
        </Card>
    );
}
