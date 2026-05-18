/**
 * Lightweight CSV generator for Skillary LMS reports.
 * Escapes commas, double-quotes, and newlines per RFC 4180.
 */

function escapeCSVField(value: unknown): string {
    const str = value === null || value === undefined ? "" : String(value);
    if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

export function generateCSV(headers: string[], rows: (string | number | null | undefined)[][]): string {
    const headerLine = headers.map(escapeCSVField).join(",");
    const dataLines = rows.map(row => row.map(escapeCSVField).join(","));
    return [headerLine, ...dataLines].join("\r\n");
}

export function csvResponse(csv: string, filename: string): Response {
    return new Response(csv, {
        status: 200,
        headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": `attachment; filename="${filename}"`,
        },
    });
}
