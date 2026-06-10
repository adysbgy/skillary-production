import React from "react";
import Image from "next/image";

export function Logo() {
    return (
        <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-14 items-center justify-center shrink-0">
                <Image 
                    src="/logo.png" 
                    alt="Skillary Logo" 
                    fill 
                    className="object-contain"
                />
            </div>
            <div>
                <div className="text-lg font-semibold tracking-tight">Skillary</div>
                <div className="text-xs text-black/45">Upgrade Skill, Raih Karir</div>
            </div>
        </div>
    );
}
