import React from "react";

export function Pill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "warm" | "white" }) {
    const tones = {
        neutral: "bg-black/5 text-black/60",
        warm: "bg-[#FFF3E4] text-[#D46E32]",
        white: "bg-white text-black/65 ring-1 ring-black/5",
    };
    return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
