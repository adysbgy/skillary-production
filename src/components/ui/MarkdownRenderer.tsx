import React, { useMemo } from 'react';

/**
 * MarkdownRenderer — Rich content rendering for Skillary lesson content.
 *
 * Supports:
 * - Headings (h1-h3)
 * - Bold, italic, inline code
 * - Links (external)
 * - Images: ![alt](url)
 * - Unordered lists (- or *)
 * - Numbered/ordered lists (1. 2. 3.)
 * - Blockquotes (>)
 * - Fenced code blocks (``` ... ```)
 * - Horizontal rules (--- or ***)
 * - Simple tables (| col | col |)
 */
export function MarkdownRenderer({ content, className = '' }: { content: string, className?: string }) {
    const parsedNodes = useMemo(() => {
        if (!content) return null;

        const lines = content.split('\n');
        const nodes: React.ReactNode[] = [];

        // State trackers
        let inUl = false;
        let ulItems: React.ReactNode[] = [];
        let inOl = false;
        let olItems: React.ReactNode[] = [];
        let inCodeBlock = false;
        let codeLines: string[] = [];
        let codeLang = '';
        let inTable = false;
        let tableHeaders: string[] = [];
        let tableRows: string[][] = [];

        const processInlineTokens = (text: string, baseKey: string): React.ReactNode[] => {
            // Process: images, inline code, bold, italic (* or _), links
            const parts = text.split(/(!\[.*?\]\(.*?\)|`[^`]+`|\*\*.*?\*\*|_.*?_|\*[^*]+\*|\[.*?\]\(.*?\))/g);
            return parts.map((part, i) => {
                const k = `${baseKey}-t-${i}`;
                // Images: ![alt](url)
                const imgMatch = part.match(/^!\[(.*?)\]\((.*?)\)$/);
                if (imgMatch) {
                    const safeUrl = imgMatch[2].trim().toLowerCase().startsWith('javascript:') ? '#' : imgMatch[2];
                    return (
                        <figure key={k} className="my-6">
                            <img
                                src={safeUrl}
                                alt={imgMatch[1]}
                                className="rounded-xl max-w-full h-auto border border-black/5 shadow-sm"
                                loading="lazy"
                            />
                            {imgMatch[1] && (
                                <figcaption className="mt-2 text-center text-xs text-black/40 italic">{imgMatch[1]}</figcaption>
                            )}
                        </figure>
                    );
                }
                // Inline code
                if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
                    return <code key={k} className="px-1.5 py-0.5 rounded-md bg-black/[0.06] text-violet-600 text-[0.9em] font-mono">{part.slice(1, -1)}</code>;
                }
                // Bold
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={k} className="font-bold text-black">{part.slice(2, -2)}</strong>;
                }
                // Italic
                if ((part.startsWith('_') && part.endsWith('_')) || (part.startsWith('*') && part.endsWith('*') && !part.startsWith('**'))) {
                    if (part.length > 2) {
                        return <em key={k} className="italic">{part.slice(1, -1)}</em>;
                    }
                }
                // Links
                const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
                if (linkMatch) {
                    const safeUrl = linkMatch[2].trim().toLowerCase().startsWith('javascript:') ? '#' : linkMatch[2];
                    return <a key={k} href={safeUrl} target="_blank" rel="noopener noreferrer" className="text-[rgb(255,90,95)] hover:text-[rgb(255,138,0)] underline underline-offset-2 transition-colors font-medium">{linkMatch[1]}</a>;
                }
                return part;
            });
        };

        const flushUl = (key: string) => {
            if (ulItems.length > 0) {
                nodes.push(<ul key={`ul-${key}`} className="my-6 space-y-1 text-black/80">{ulItems}</ul>);
                ulItems = [];
            }
            inUl = false;
        };

        const flushOl = (key: string) => {
            if (olItems.length > 0) {
                nodes.push(<ol key={`ol-${key}`} className="my-6 space-y-1 text-black/80 list-decimal list-inside">{olItems}</ol>);
                olItems = [];
            }
            inOl = false;
        };

        const flushTable = (key: string) => {
            if (tableHeaders.length > 0) {
                nodes.push(
                    <div key={`tbl-${key}`} className="my-6 overflow-x-auto rounded-xl border border-black/10">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-black/10 bg-black/[0.03]">
                                    {tableHeaders.map((h, hi) => (
                                        <th key={hi} className="px-4 py-2.5 text-left font-semibold text-black/70 text-xs uppercase tracking-wider">{h.trim()}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.map((row, ri) => (
                                    <tr key={ri} className="border-b border-black/5 last:border-0">
                                        {row.map((cell, ci) => (
                                            <td key={ci} className="px-4 py-2.5 text-black/70">{cell.trim()}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
                tableHeaders = [];
                tableRows = [];
            }
            inTable = false;
        };

        lines.forEach((line, index) => {
            const key = `line-${index}`;

            // --- Fenced code block ---
            if (line.trim().startsWith('```')) {
                if (inCodeBlock) {
                    // End of code block
                    nodes.push(
                        <pre key={`code-${key}`} className="my-6 rounded-xl bg-[#1e1e2e] text-[#cdd6f4] p-5 overflow-x-auto text-sm leading-relaxed font-mono border border-black/10 shadow-sm">
                            {codeLang && <div className="text-[10px] uppercase tracking-widest text-white/30 mb-3 font-sans font-bold">{codeLang}</div>}
                            <code>{codeLines.join('\n')}</code>
                        </pre>
                    );
                    inCodeBlock = false;
                    codeLines = [];
                    codeLang = '';
                } else {
                    // Flush any open lists/tables
                    if (inUl) flushUl(key);
                    if (inOl) flushOl(key);
                    if (inTable) flushTable(key);
                    // Start code block
                    inCodeBlock = true;
                    codeLang = line.trim().slice(3).trim();
                }
                return;
            }
            if (inCodeBlock) {
                codeLines.push(line);
                return;
            }

            const rawLine = line.trim();

            // --- Table rows ---
            if (rawLine.startsWith('|') && rawLine.endsWith('|')) {
                const cells = rawLine.slice(1, -1).split('|');
                // Check if separator row (|---|---|)
                if (cells.every(c => /^[\s:-]+$/.test(c))) {
                    return; // Skip separator row
                }
                if (!inTable) {
                    if (inUl) flushUl(key);
                    if (inOl) flushOl(key);
                    inTable = true;
                    tableHeaders = cells;
                } else {
                    tableRows.push(cells);
                }
                return;
            } else if (inTable) {
                flushTable(key);
            }

            // --- Horizontal rule ---
            if (/^(-{3,}|\*{3,}|_{3,})$/.test(rawLine)) {
                if (inUl) flushUl(key);
                if (inOl) flushOl(key);
                nodes.push(<hr key={key} className="my-8 border-t border-black/10" />);
                return;
            }

            // --- Unordered list ---
            if (rawLine.startsWith('- ') || rawLine.startsWith('* ')) {
                if (inOl) flushOl(key);
                inUl = true;
                ulItems.push(<li key={key} className="ml-4 mb-2 pl-2 border-l-2 border-[rgb(255,138,0)]/30">{processInlineTokens(rawLine.substring(2), key)}</li>);
                return;
            } else if (inUl && rawLine === '') {
                flushUl(key);
                return;
            } else if (inUl && !rawLine.startsWith('- ') && !rawLine.startsWith('* ')) {
                flushUl(key);
            }

            // --- Ordered list ---
            const olMatch = rawLine.match(/^(\d+)\.\s+(.*)$/);
            if (olMatch) {
                if (inUl) flushUl(key);
                inOl = true;
                olItems.push(<li key={key} className="ml-4 mb-2 pl-2 border-l-2 border-[rgb(255,90,95)]/20">{processInlineTokens(olMatch[2], key)}</li>);
                return;
            } else if (inOl && rawLine === '') {
                flushOl(key);
                return;
            } else if (inOl) {
                flushOl(key);
            }

            // --- Standalone image line ---
            const imgLineMatch = rawLine.match(/^!\[(.*?)\]\((.*?)\)$/);
            if (imgLineMatch) {
                const safeUrl = imgLineMatch[2].trim().toLowerCase().startsWith('javascript:') ? '#' : imgLineMatch[2];
                nodes.push(
                    <figure key={key} className="my-6">
                        <img
                            src={safeUrl}
                            alt={imgLineMatch[1]}
                            className="rounded-xl max-w-full h-auto border border-black/5 shadow-sm"
                            loading="lazy"
                        />
                        {imgLineMatch[1] && (
                            <figcaption className="mt-2 text-center text-xs text-black/40 italic">{imgLineMatch[1]}</figcaption>
                        )}
                    </figure>
                );
                return;
            }

            // --- Headings ---
            if (rawLine.startsWith('### ')) {
                nodes.push(<h3 key={key} className="text-xl font-bold tracking-tight text-black mt-8 mb-4">{processInlineTokens(rawLine.substring(4), key)}</h3>);
            } else if (rawLine.startsWith('## ')) {
                nodes.push(<h2 key={key} className="text-2xl font-bold tracking-[-0.01em] text-black mt-10 mb-5 border-b border-black/5 pb-2">{processInlineTokens(rawLine.substring(3), key)}</h2>);
            } else if (rawLine.startsWith('# ')) {
                nodes.push(<h1 key={key} className="text-3xl font-bold tracking-[-0.02em] text-black mt-12 mb-6">{processInlineTokens(rawLine.substring(2), key)}</h1>);
            } else if (rawLine.startsWith('> ')) {
                // Blockquotes
                nodes.push(<blockquote key={key} className="pl-4 py-1 my-6 border-l-4 border-black/10 bg-black/[0.02] text-black/60 italic rounded-r-lg"><p>{processInlineTokens(rawLine.substring(2), key)}</p></blockquote>);
            } else if (rawLine === '') {
                // Blank lines
                nodes.push(<div key={key} className="h-4" aria-hidden="true" />);
            } else {
                // Standard Paragraph
                nodes.push(<p key={key} className="mb-4 leading-relaxed text-black/75">{processInlineTokens(rawLine, key)}</p>);
            }
        });

        // Flush remaining state
        if (inUl) flushUl('end');
        if (inOl) flushOl('end');
        if (inTable) flushTable('end');
        if (inCodeBlock && codeLines.length > 0) {
            nodes.push(
                <pre key="code-end" className="my-6 rounded-xl bg-[#1e1e2e] text-[#cdd6f4] p-5 overflow-x-auto text-sm leading-relaxed font-mono border border-black/10 shadow-sm">
                    <code>{codeLines.join('\n')}</code>
                </pre>
            );
        }

        return nodes;
    }, [content]);

    return (
        <div className={`markdown-body ${className}`}>
            {parsedNodes}
        </div>
    );
}
