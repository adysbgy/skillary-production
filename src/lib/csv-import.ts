/**
 * Lightweight safe CSV parser for admin imports.
 * Handles quoted fields, commas inside quotes, and ignores blank lines.
 */

export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (inQuotes) {
      if (char === '"') {
        if (nextChar === '"') {
          // Escaped quote ""
          currentVal += '"';
          i++;
        } else {
          // End of quote
          inQuotes = false;
        }
      } else {
        currentVal += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        currentRow.push(currentVal);
        currentVal = "";
      } else if (char === "\r" || char === "\n") {
        currentRow.push(currentVal);
        // Only push non-empty rows
        if (currentRow.some((v) => v.trim() !== "")) {
          rows.push(currentRow);
        }
        currentRow = [];
        currentVal = "";
        if (char === "\r" && nextChar === "\n") i++; // skip CRLF
      } else {
        currentVal += char;
      }
    }
  }

  // Push the last remaining value
  if (currentVal !== "" || currentRow.length > 0) {
    currentRow.push(currentVal);
    if (currentRow.some((v) => v.trim() !== "")) {
      rows.push(currentRow);
    }
  }

  return rows;
}

export function mapRowsToObjects(headers: string[], rows: string[][]): Record<string, string>[] {
  const normalizedHeaders = headers.map((h) => h.trim().toLowerCase());
  return rows.map((row) => {
    const obj: Record<string, string> = {};
    normalizedHeaders.forEach((header, index) => {
      obj[header] = row[index] || "";
    });
    return obj;
  });
}

export function validateRequiredHeaders(headers: string[], required: string[]): boolean {
  const normalizedHeaders = headers.map((h) => h.trim().toLowerCase());
  return required.every((req) => normalizedHeaders.includes(req.toLowerCase()));
}
