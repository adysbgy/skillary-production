import React from "react";

// ─── Existing variants (backward-compatible) ─────────────────────────────────

/** Dark solid pill — used in admin/LMS/mobile nav. */
export function PrimaryButton({ children, onClick, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            onClick={onClick}
            className={`rounded-full bg-[#181818] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)] focus-visible:ring-2 focus-visible:ring-[rgb(255,138,0)] focus-visible:ring-offset-2 outline-none ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

/** White pill with subtle border — used for secondary actions. */
export function SecondaryButton({ children, onClick, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            onClick={onClick}
            className={`rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-black/5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-[rgb(255,138,0)] focus-visible:ring-offset-2 outline-none ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}

// ─── v2 Design System variants ────────────────────────────────────────────────

/**
 * GradientButton — Primary CTA for all public pages.
 * Orange→coral gradient, rounded-full, hover opacity.
 * Use this instead of bg-[#1E3A8A] on public pages.
 */
export function GradientButton({ children, onClick, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            onClick={onClick}
            className={`rounded-full px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[rgb(255,138,0)] focus-visible:ring-offset-2 outline-none ${className}`}
            style={{ background: 'linear-gradient(135deg, rgb(255, 138, 0), rgb(255, 90, 95))' }}
            {...props}
        >
            {children}
        </button>
    );
}

/**
 * GhostWarmButton — Tertiary/ghost action for public pages.
 * White bg with warm cream border. Use on warm ivory backgrounds.
 */
export function GhostWarmButton({ children, onClick, className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            onClick={onClick}
            className={`rounded-full border bg-white px-6 py-3 text-sm font-semibold text-[#334155] transition-all duration-200 hover:bg-[#FFF8F1] hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[rgb(255,138,0)] focus-visible:ring-offset-2 outline-none ${className}`}
            style={{ borderColor: 'rgb(240, 217, 200)' }}
            {...props}
        >
            {children}
        </button>
    );
}

