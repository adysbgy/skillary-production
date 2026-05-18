import React from "react";

export function SectionTitle({ eyebrow, title, description, actions = null }: { eyebrow?: string; title: string; description?: string; actions?: React.ReactNode }) {
    return (
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
                {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[rgb(255,138,0)]">{eyebrow}</p>}
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h2>
                {description && <p className="mt-3 text-base leading-8 text-black/60">{description}</p>}
            </div>
            {actions && <div className="shrink-0">{actions}</div>}
        </div>
    );
}
