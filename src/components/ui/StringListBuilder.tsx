"use client";

import React, { useState } from "react";
import { SoftCard } from "./Card";

interface StringListBuilderProps {
    title: string;
    description: string;
    itemsJson: string | null | undefined;
    onChange: (newJson: string) => void;
}

export function StringListBuilder({ title, description, itemsJson, onChange }: StringListBuilderProps) {
    const items: string[] = itemsJson ? JSON.parse(itemsJson) : [];
    const [newItem, setNewItem] = useState("");

    const handleAdd = () => {
        if (!newItem.trim()) return;
        const mapped = [...items, newItem.trim()];
        onChange(JSON.stringify(mapped));
        setNewItem("");
    };

    const handleRemove = (index: number) => {
        const mapped = items.filter((_, i) => i !== index);
        onChange(JSON.stringify(mapped));
    };

    return (
        <div className="mb-6">
            <label className="block text-sm font-medium text-black/80 mb-1">{title}</label>
            <p className="text-[11px] text-black/50 mb-3">{description}</p>
            <div className="space-y-2 mb-3">
                {items.length === 0 && <p className="text-xs text-black/35 italic px-1">None added yet.</p>}
                {items.map((item, i) => (
                    <SoftCard key={i} className="flex items-start justify-between gap-3 px-3 py-2 border border-black/5">
                        <p className="text-sm text-black/80 flex-1 leading-snug">{item}</p>
                        <button type="button" onClick={() => handleRemove(i)} className="text-black/30 hover:text-red-500 transition-colors shrink-0 text-xs mt-0.5">✕</button>
                    </SoftCard>
                ))}
            </div>
            <div className="flex items-center gap-2">
                <input
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAdd())}
                    placeholder="Enter an item..."
                    className="flex-1 rounded-lg border border-black/10 px-3 py-2 text-sm outline-none transition focus:border-black/25 focus:ring-1 focus:ring-black/10"
                />
                <button type="button" onClick={handleAdd} className="px-3 py-2 bg-black/5 text-black/70 hover:text-black hover:bg-black/10 rounded-lg text-sm font-medium transition-colors">Add</button>
            </div>
        </div>
    );
}
