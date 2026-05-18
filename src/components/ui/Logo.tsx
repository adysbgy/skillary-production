import React from "react";

export function Logo() {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(255,138,0)] via-[rgb(255,138,0)] to-[rgb(255,90,95)] text-lg font-bold text-white shadow-sm">
                S
            </div>
            <div>
                <div className="text-lg font-semibold tracking-tight">Skillary</div>
                <div className="text-xs text-black/45">Upgrade Skill, Raih Karir</div>
            </div>
        </div>
    );
}
