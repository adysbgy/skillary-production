import React from "react";

export function Card({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    return <div className={`group rounded-[28px] border border-black/6 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,0,0,0.06)] ${className}`} style={style}>{children}</div>;
}

export function SoftCard({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    return <div className={`group rounded-[24px] bg-[#FAFAFA] ring-1 ring-black/5 transition-all duration-300 hover:bg-black/[0.03] ${className}`} style={style}>{children}</div>;
}
