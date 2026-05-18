/**
 * Quiz Import CSV Template V1
 * Client-side CSV parsing, validation, and mapping for bulk quiz question import.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface CsvQuizRow {
    type: string;
    prompt: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: string;
}

export interface CsvValidationError {
    row: number;
    message: string;
}

export interface CsvParseResult {
    rows: CsvQuizRow[];
    errors: CsvValidationError[];
}

export interface QuizQuestionItem {
    id: string;
    type: "SINGLE_CHOICE" | "MULTIPLE_SELECTION" | "SHORT_ANSWER";
    prompt: string;
    options?: string[];
    correctAnswers?: string[];
}

// ─── CSV Template ────────────────────────────────────────────────────────────

const TEMPLATE_HEADERS = "type,prompt,option_a,option_b,option_c,option_d,correct_answer";

const TEMPLATE_EXAMPLES = [
    'single_choice,"What does MVP stand for?",Minimum Viable Product,Most Valuable Player,Market Value Plan,Main Visual Page,A',
    'multiple_selection,"Which are LMS components?",Course,Quiz,Certificate,Motor,A|B|C',
    'short_answer,"What does ROI stand for?",,,,,"roi|return on investment"',
];

export function generateQuizCsvTemplate(): string {
    return [TEMPLATE_HEADERS, ...TEMPLATE_EXAMPLES].join("\n");
}

export function downloadQuizCsvTemplate(): void {
    const csv = generateQuizCsvTemplate();
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skillary_quiz_template.csv";
    a.click();
    URL.revokeObjectURL(url);
}

// ─── RFC 4180 CSV Parser ─────────────────────────────────────────────────────

function parseCsvText(text: string): string[][] {
    const rows: string[][] = [];
    let row: string[] = [];
    let field = "";
    let inQuotes = false;
    let i = 0;

    while (i < text.length) {
        const ch = text[i];

        if (inQuotes) {
            if (ch === '"') {
                if (i + 1 < text.length && text[i + 1] === '"') {
                    field += '"';
                    i += 2;
                } else {
                    inQuotes = false;
                    i++;
                }
            } else {
                field += ch;
                i++;
            }
        } else {
            if (ch === '"') {
                inQuotes = true;
                i++;
            } else if (ch === ",") {
                row.push(field.trim());
                field = "";
                i++;
            } else if (ch === "\n" || (ch === "\r" && text[i + 1] === "\n")) {
                row.push(field.trim());
                field = "";
                if (row.some(c => c !== "")) rows.push(row);
                row = [];
                i += ch === "\r" ? 2 : 1;
            } else {
                field += ch;
                i++;
            }
        }
    }

    // Last field/row
    row.push(field.trim());
    if (row.some(c => c !== "")) rows.push(row);

    return rows;
}

// ─── Parse CSV into typed rows ───────────────────────────────────────────────

const EXPECTED_HEADERS = ["type", "prompt", "option_a", "option_b", "option_c", "option_d", "correct_answer"];

export function parseQuizCsv(text: string): CsvParseResult {
    const raw = parseCsvText(text);
    if (raw.length === 0) return { rows: [], errors: [{ row: 0, message: "CSV file is empty." }] };

    // Normalize headers
    const headers = raw[0].map(h => h.toLowerCase().replace(/[^a-z_]/g, ""));
    const headerMap: Record<string, number> = {};
    headers.forEach((h, i) => { headerMap[h] = i; });

    // Validate headers
    const missingHeaders = EXPECTED_HEADERS.filter(h => !(h in headerMap));
    if (missingHeaders.length > 0) {
        return { rows: [], errors: [{ row: 1, message: `Missing columns: ${missingHeaders.join(", ")}. Required: ${EXPECTED_HEADERS.join(", ")}` }] };
    }

    const rows: CsvQuizRow[] = [];
    const errors: CsvValidationError[] = [];

    const dataRows = raw.slice(1);
    if (dataRows.length > 100) {
        errors.push({ row: 0, message: `Too many rows (${dataRows.length}). Maximum 100 questions per import.` });
        return { rows: [], errors };
    }

    for (let i = 0; i < dataRows.length; i++) {
        const r = dataRows[i];
        const get = (key: string) => (r[headerMap[key]] || "").trim();
        rows.push({
            type: get("type"),
            prompt: get("prompt"),
            option_a: get("option_a"),
            option_b: get("option_b"),
            option_c: get("option_c"),
            option_d: get("option_d"),
            correct_answer: get("correct_answer"),
        });
    }

    return { rows, errors };
}

// ─── Row Validation ──────────────────────────────────────────────────────────

const VALID_TYPES = ["single_choice", "multiple_selection", "short_answer"];
const LETTER_TO_KEY: Record<string, keyof CsvQuizRow> = { A: "option_a", B: "option_b", C: "option_c", D: "option_d" };

export function validateQuizRows(rows: CsvQuizRow[]): { validRows: CsvQuizRow[]; errors: CsvValidationError[] } {
    const validRows: CsvQuizRow[] = [];
    const errors: CsvValidationError[] = [];

    rows.forEach((row, i) => {
        const rowNum = i + 2; // +2 because row 1 = headers, data starts at 2
        const rowErrors: string[] = [];

        const type = row.type.toLowerCase().trim();

        if (!type) {
            rowErrors.push("Type is required.");
        } else if (!VALID_TYPES.includes(type)) {
            rowErrors.push(`Invalid type "${row.type}". Must be: ${VALID_TYPES.join(", ")}`);
        }

        if (!row.prompt.trim()) {
            rowErrors.push("Prompt is required.");
        }

        if (!row.correct_answer.trim()) {
            rowErrors.push("Correct answer is required.");
        }

        if (rowErrors.length === 0 && (type === "single_choice" || type === "multiple_selection")) {
            const options = [row.option_a, row.option_b, row.option_c, row.option_d].filter(o => o.trim() !== "");
            if (options.length < 2) {
                rowErrors.push("At least 2 non-empty options are required for choice questions.");
            }

            const answerLetters = row.correct_answer.toUpperCase().split("|").map(s => s.trim()).filter(Boolean);

            if (type === "single_choice") {
                if (answerLetters.length !== 1) {
                    rowErrors.push("Single choice must have exactly one correct answer letter (A, B, C, or D).");
                }
            }

            for (const letter of answerLetters) {
                if (!LETTER_TO_KEY[letter]) {
                    rowErrors.push(`Invalid answer letter "${letter}". Must be A, B, C, or D.`);
                } else if (!row[LETTER_TO_KEY[letter]].trim()) {
                    rowErrors.push(`Answer "${letter}" points to an empty option.`);
                }
            }
        }

        if (rowErrors.length === 0 && type === "short_answer") {
            const answers = row.correct_answer.split("|").map(s => s.trim()).filter(Boolean);
            if (answers.length === 0) {
                rowErrors.push("Short answer must have at least one accepted answer.");
            }
        }

        if (rowErrors.length > 0) {
            rowErrors.forEach(msg => errors.push({ row: rowNum, message: msg }));
        } else {
            validRows.push(row);
        }
    });

    return { validRows, errors };
}

// ─── Map to Internal Quiz Question Shape ─────────────────────────────────────

function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
}

export function mapRowsToQuizQuestions(rows: CsvQuizRow[]): QuizQuestionItem[] {
    return rows.map(row => {
        const type = row.type.toLowerCase().trim();

        if (type === "single_choice" || type === "multiple_selection") {
            const allOptions = [row.option_a, row.option_b, row.option_c, row.option_d];
            // Keep all 4 slots but filter for correct answer mapping
            const options = allOptions.map(o => o.trim());
            const nonEmptyOptions: string[] = [];
            const indexMap: Record<number, number> = {}; // original index -> new index
            options.forEach((o, i) => {
                if (o) {
                    indexMap[i] = nonEmptyOptions.length;
                    nonEmptyOptions.push(o);
                }
            });

            const letterToOrigIndex: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
            const answerLetters = row.correct_answer.toUpperCase().split("|").map(s => s.trim()).filter(Boolean);
            const correctAnswers = answerLetters
                .map(letter => indexMap[letterToOrigIndex[letter]])
                .filter(idx => idx !== undefined)
                .map(idx => idx.toString());

            return {
                id: generateId(),
                type: type === "single_choice" ? "SINGLE_CHOICE" : "MULTIPLE_SELECTION",
                prompt: row.prompt.trim(),
                options: nonEmptyOptions,
                correctAnswers,
            } as QuizQuestionItem;
        }

        // SHORT_ANSWER
        const answers = row.correct_answer.split("|").map(s => s.trim()).filter(Boolean);
        return {
            id: generateId(),
            type: "SHORT_ANSWER",
            prompt: row.prompt.trim(),
            options: [],
            correctAnswers: answers,
        } as QuizQuestionItem;
    });
}
