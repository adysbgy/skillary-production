import React from "react";

interface LogoProps {
    variant?: 'light' | 'dark';
}

export function Logo({ variant = 'light' }: LogoProps) {
    const isDark = variant === 'dark';
    
    return (
        <div className="flex items-center gap-3">
            <div 
                className="flex h-10 w-10 items-center justify-center shrink-0 rounded-xl shadow-sm"
                style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
            >
                <span className="text-white font-extrabold text-xl">S</span>
            </div>
            <div>
                <div className={`text-lg font-semibold tracking-tight ${isDark ? 'text-white' : 'text-skillary-navy'}`}>Skillary</div>
                <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-black/45'}`}>Upgrade Skill, Raih Karir</div>
            </div>
        </div>
    );
}
