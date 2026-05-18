"use client";

import React, { useRef, useState, useEffect } from "react";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface MarkdownEditorProps {
    id: string;
    defaultValue: string;
    placeholder?: string;
    className?: string;
}

export default function MarkdownEditor({ id, defaultValue, placeholder, className }: MarkdownEditorProps) {
    const [content, setContent] = useState(defaultValue);
    const [mode, setMode] = useState<"edit" | "preview">("edit");
    const [uploading, setUploading] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setContent(defaultValue);
    }, [defaultValue]);

    const insertRawText = (text: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        const newText = content.substring(0, start) + text + content.substring(end);
        setContent(newText);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + text.length, start + text.length);
        }, 0);
    };

    const wrapText = (before: string, after: string = "", placeholder: string = "") => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selectedText = content.substring(start, end);

        const injectedText = selectedText || placeholder;
        const newText = content.substring(0, start) + before + injectedText + after + content.substring(end);

        setContent(newText);

        setTimeout(() => {
            textarea.focus();
            if (!selectedText && placeholder) {
                // Highlight the placeholder text for instant replacing
                textarea.setSelectionRange(start + before.length, start + before.length + placeholder.length);
            } else {
                // Keep the cursor encompassing the wrapped text
                textarea.setSelectionRange(start + before.length, start + before.length + injectedText.length);
            }
        }, 0);
    };

    const prependLine = (prefix: string) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const start = textarea.selectionStart;

        // Backtrack to find the start of the current line
        let lineStart = start;
        while (lineStart > 0 && content.charAt(lineStart - 1) !== '\n') {
            lineStart--;
        }

        const newText = content.substring(0, lineStart) + prefix + content.substring(lineStart);
        setContent(newText);

        setTimeout(() => {
            textarea.focus();
            // Move cursor past the injected prefix relative to where it was
            textarea.setSelectionRange(start + prefix.length, start + prefix.length);
        }, 0);
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload?category=images", {
                method: "POST",
                body: formData
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Upload failed");
            }

            const { url } = await res.json();
            insertRawText(`![${file.name.split('.')[0]}](${url})`);
        } catch (err: any) {
            alert("Error uploading image: " + err.message);
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    return (
        <div className={`border border-black/10 rounded-xl overflow-hidden bg-white shadow-[inset_0_2px_10px_rgba(0,0,0,0.01)] ${className || ""}`}>
            <div className="flex items-center justify-between px-3 py-2 bg-black/[0.02] border-b border-black/10">
                <div className="flex items-center gap-1">
                    <button type="button" onClick={() => setMode("edit")} className={`px-4 py-1 text-[11px] uppercase tracking-wider font-bold rounded-md transition-colors ${mode === "edit" ? "bg-white shadow-sm border border-black/10 text-black" : "text-black/50 hover:text-black hover:bg-black/5"}`}>Edit</button>
                    <button type="button" onClick={() => setMode("preview")} className={`px-4 py-1 text-[11px] uppercase tracking-wider font-bold rounded-md transition-colors ${mode === "preview" ? "bg-white shadow-sm border border-black/10 text-black" : "text-black/50 hover:text-black hover:bg-black/5"}`}>Preview</button>
                </div>

                {mode === "edit" && (
                    <div className="flex items-center gap-1 bg-white border border-black/10 rounded-md p-1 shadow-sm">
                        <button type="button" onClick={() => wrapText("**", "**", "bold text")} className="p-1 px-2 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors" title="Bold">
                            <span className="font-bold text-xs">B</span>
                        </button>
                        <button type="button" onClick={() => wrapText("*", "*", "italic text")} className="p-1 px-2 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors" title="Italic">
                            <span className="italic text-xs font-serif">I</span>
                        </button>
                        <span className="w-px h-3 bg-black/10 mx-0.5"></span>
                        <button type="button" onClick={() => prependLine("### ")} className="p-1 px-2 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors flex items-center justify-center font-bold font-mono text-[10px]" title="Heading">
                            H3
                        </button>
                        <button type="button" onClick={() => prependLine("> ")} className="p-1 px-2 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors font-serif font-bold text-xs" title="Quote">
                            "
                        </button>
                        <span className="w-px h-3 bg-black/10 mx-0.5"></span>
                        <button type="button" onClick={() => prependLine("- ")} className="p-1 px-2 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors flex items-center gap-1" title="Bullet List (use '- item'). ⚠️ Nested lists are not supported — keep all items at the same level.">
                            <span className="w-1 h-1 bg-current rounded-full"></span>
                            <span className="w-2.5 h-0.5 bg-current rounded-sm"></span>
                        </button>
                        <button type="button" onClick={() => prependLine("1. ")} className="p-1 px-2 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors text-[10px] font-bold tracking-tighter" title="Numbered List (use '1. item'). ⚠️ Nested lists are not supported — keep all items at the same level.">
                            1.
                        </button>
                        <span className="w-px h-3 bg-black/10 mx-0.5"></span>
                        <button type="button" onClick={() => wrapText("```\n", "\n```", "paste code here")} className="p-1 px-2 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors font-mono text-[10px]" title="Fenced Code Block. ⚠️ Always close with matching ``` or the rest of the content will break.">
                            {"<>"}
                        </button>
                        <button type="button" onClick={() => wrapText("[", "](url)", "link text")} className="p-1 px-2 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors text-[10px]" title="Link">
                            🔗
                        </button>
                        <span className="w-px h-3 bg-black/10 mx-0.5"></span>
                        <button type="button" disabled={uploading} onClick={() => fileInputRef.current?.click()} className="p-1 px-2 text-black/60 hover:text-black hover:bg-black/5 rounded transition-colors text-[10px] disabled:opacity-50 flex items-center gap-1 font-semibold" title="Upload Image">
                            {uploading ? "⏳" : "🖼️ Image"}
                        </button>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileUpload} />
                    </div>
                )}
            </div>

            {/* Formatting hints strip — edit mode only */}
            {mode === "edit" && (
                <div className="flex items-center gap-x-3 gap-y-1 flex-wrap px-4 py-2 bg-black/[0.015] border-b border-black/[0.06] text-[10px] text-black/40 font-mono leading-relaxed select-none">
                    <span className="font-sans font-semibold text-black/30 uppercase tracking-widest mr-1">Tips:</span>
                    <span title="Bold"><strong>**bold**</strong></span>
                    <span className="text-black/20">·</span>
                    <span title="Italic"><em>*italic*</em></span>
                    <span className="text-black/20">·</span>
                    <span title="Heading">## Heading</span>
                    <span className="text-black/20">·</span>
                    <span title="Bullet list — nested lists are NOT supported">- item <span className="text-amber-400/80 font-sans not-italic">⚠ no nesting</span></span>
                    <span className="text-black/20">·</span>
                    <span title="Fenced code block — always close with matching backticks">{"```lang … ```"} <span className="text-amber-400/80 font-sans not-italic">⚠ must close</span></span>
                    <span className="text-black/20">·</span>
                    <span title="Link">{"[text](url)"}</span>
                    <span className="text-black/20">·</span>
                    <span title="Image">{"![alt](url)"}</span>
                </div>
            )}

            {mode === "edit" ? (
                <textarea
                    id={id}
                    ref={textareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={placeholder}
                    className="w-full min-h-[250px] p-4 text-[13px] outline-none resize-y font-mono leading-relaxed bg-transparent"
                />
            ) : (
                <div className="relative">
                    <textarea id={id} value={content} readOnly className="hidden" />
                    <div className="min-h-[250px] max-h-[600px] overflow-y-auto p-6 bg-[#FAFAFA]">
                        {content.split('```').length % 2 === 0 && (
                            <div className="mb-4 flex items-start gap-2 p-3 rounded-xl border border-amber-300/60 bg-amber-50/80 text-amber-800 text-xs font-medium">
                                <span className="text-base leading-none mt-0.5">⚠️</span>
                                <span><strong>Unclosed code block detected.</strong> Make sure every opening <code className="bg-amber-100 px-1 rounded font-mono">```</code> has a matching closing <code className="bg-amber-100 px-1 rounded font-mono">```</code> on its own line, or the preview below may look broken.</span>
                            </div>
                        )}
                        {content.trim() === "" ? (
                            <p className="text-sm text-black/40 italic">Preview is empty. Add some content.</p>
                        ) : (
                            <MarkdownRenderer content={content} />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
