export type QuizQuestionType = "SINGLE_CHOICE" | "MULTIPLE_SELECTION" | "SHORT_ANSWER";

export interface QuizSettings {
    passingScore: number;
    maxAttempts: number | null;
    showScore: boolean;
    showAnswers: boolean;
    isRequiredToContinue: boolean;
}

export interface QuizQuestion {
    id: string;
    type: QuizQuestionType;
    prompt: string;
    options: string[];
    correctAnswers: string[];
}

export interface QuizPayload {
    settings: QuizSettings;
    questions: QuizQuestion[];
}

export interface QuizFeedbackItem {
    correct: boolean;
    correctAnswers: string[];
}

const DEFAULT_SETTINGS: QuizSettings = {
    passingScore: 80,
    maxAttempts: null,
    showScore: true,
    showAnswers: true,
    isRequiredToContinue: false,
};

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asStringArray(value: unknown): string[] {
    if (!Array.isArray(value)) return [];
    return value
        .filter((item): item is string | number => typeof item === "string" || typeof item === "number")
        .map((item) => String(item));
}

function normalizeSettings(value: unknown): QuizSettings {
    const settings = isRecord(value) ? value : {};
    const passingScore = typeof settings.passingScore === "number" && Number.isFinite(settings.passingScore)
        ? Math.min(100, Math.max(0, settings.passingScore))
        : DEFAULT_SETTINGS.passingScore;
    const maxAttempts = typeof settings.maxAttempts === "number"
        && Number.isInteger(settings.maxAttempts)
        && settings.maxAttempts > 0
        ? settings.maxAttempts
        : null;

    return {
        passingScore,
        maxAttempts,
        showScore: typeof settings.showScore === "boolean" ? settings.showScore : DEFAULT_SETTINGS.showScore,
        showAnswers: typeof settings.showAnswers === "boolean" ? settings.showAnswers : DEFAULT_SETTINGS.showAnswers,
        isRequiredToContinue: settings.isRequiredToContinue === true,
    };
}

function normalizeQuestion(
    value: unknown,
    index: number,
    usedIds: Set<string>,
): QuizQuestion | null {
    if (!isRecord(value)) return null;

    const rawType = value.type;
    const type: QuizQuestionType = rawType === "MULTIPLE_SELECTION" || rawType === "SHORT_ANSWER"
        ? rawType
        : "SINGLE_CHOICE";
    const prompt = typeof value.prompt === "string"
        ? value.prompt
        : typeof value.question === "string"
            ? value.question
            : "";
    const options = asStringArray(value.options);
    const legacyCorrectIndex = typeof value.correctIndex === "number" ? String(value.correctIndex) : null;
    const correctAnswers = asStringArray(value.correctAnswers);
    if (correctAnswers.length === 0 && legacyCorrectIndex !== null) correctAnswers.push(legacyCorrectIndex);

    const requestedId = typeof value.id === "string" && value.id.trim() ? value.id.trim() : `question-${index + 1}`;
    let id = requestedId;
    if (usedIds.has(id)) id = `${requestedId}-${index + 1}`;
    usedIds.add(id);

    return { id, type, prompt, options, correctAnswers };
}

export function parseQuizData(raw: string | null | undefined): QuizPayload {
    if (!raw) return { settings: { ...DEFAULT_SETTINGS }, questions: [] };

    let parsed: unknown;
    try {
        parsed = JSON.parse(raw);
    } catch {
        return { settings: { ...DEFAULT_SETTINGS }, questions: [] };
    }

    const usedIds = new Set<string>();
    if (Array.isArray(parsed)) {
        return {
            settings: { ...DEFAULT_SETTINGS },
            questions: parsed
                .map((question, index) => normalizeQuestion(question, index, usedIds))
                .filter((question): question is QuizQuestion => question !== null),
        };
    }

    if (!isRecord(parsed)) return { settings: { ...DEFAULT_SETTINGS }, questions: [] };
    const rawQuestions = Array.isArray(parsed.questions) ? parsed.questions : [];

    return {
        settings: normalizeSettings(parsed.settings),
        questions: rawQuestions
            .map((question, index) => normalizeQuestion(question, index, usedIds))
            .filter((question): question is QuizQuestion => question !== null),
    };
}

export function createPublicQuizData(raw: string | null | undefined): string | null {
    if (!raw) return null;
    const payload = parseQuizData(raw);
    return JSON.stringify({
        settings: payload.settings,
        questions: payload.questions.map((question) => ({
            id: question.id,
            type: question.type,
            prompt: question.prompt,
            options: question.options,
        })),
    });
}

export function validateQuizAnswers(
    payload: QuizPayload,
    value: unknown,
): { ok: true; answers: Record<string, unknown> } | { ok: false; error: string } {
    if (!isRecord(value)) return { ok: false, error: "Answers must be an object." };
    if (payload.questions.length === 0) return { ok: false, error: "Quiz has no configured questions." };

    const answers: Record<string, unknown> = {};
    for (const question of payload.questions) {
        if (!Object.prototype.hasOwnProperty.call(value, question.id)) {
            return { ok: false, error: "Please answer every question before submitting." };
        }

        const answer = value[question.id];
        if (question.type === "SINGLE_CHOICE") {
            if (typeof answer !== "string" || !/^\d+$/.test(answer)) {
                return { ok: false, error: "A single-choice answer is invalid." };
            }
            const optionIndex = Number(answer);
            if (!Number.isSafeInteger(optionIndex) || optionIndex < 0 || optionIndex >= question.options.length) {
                return { ok: false, error: "A selected option is outside the quiz choices." };
            }
            answers[question.id] = answer;
            continue;
        }

        if (question.type === "MULTIPLE_SELECTION") {
            if (!Array.isArray(answer) || answer.length > question.options.length) {
                return { ok: false, error: "A multiple-selection answer is invalid." };
            }
            const selections = answer.filter((item): item is string => typeof item === "string");
            if (selections.length !== answer.length || new Set(selections).size !== selections.length) {
                return { ok: false, error: "A multiple-selection answer contains invalid choices." };
            }
            if (selections.some((item) => !/^\d+$/.test(item) || Number(item) >= question.options.length)) {
                return { ok: false, error: "A selected option is outside the quiz choices." };
            }
            answers[question.id] = selections;
            continue;
        }

        if (typeof answer !== "string" || answer.length > 2_000) {
            return { ok: false, error: "A short answer is invalid or too long." };
        }
        answers[question.id] = answer;
    }

    return { ok: true, answers };
}

function normalizeText(value: string): string {
    return value.normalize("NFKC").trim().toLocaleLowerCase("id-ID");
}

export function isQuizAnswerCorrect(question: QuizQuestion, answer: unknown): boolean {
    if (question.type === "SINGLE_CHOICE") {
        return typeof answer === "string" && answer === (question.correctAnswers[0] ?? "");
    }

    if (question.type === "MULTIPLE_SELECTION") {
        if (!Array.isArray(answer)) return false;
        const submitted = new Set(answer.filter((item): item is string => typeof item === "string"));
        const expected = new Set(question.correctAnswers);
        return submitted.size === expected.size && [...submitted].every((item) => expected.has(item));
    }

    if (typeof answer !== "string") return false;
    const submitted = normalizeText(answer);
    return question.correctAnswers.some((expected) => normalizeText(expected) === submitted);
}

export function gradeQuiz(payload: QuizPayload, answers: Record<string, unknown>) {
    const results = payload.questions.map((question) => ({
        question,
        correct: isQuizAnswerCorrect(question, answers[question.id]),
    }));
    const score = results.filter((result) => result.correct).length;
    const totalQuestions = payload.questions.length;
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

    return {
        score,
        totalQuestions,
        percentage,
        passed: totalQuestions > 0 && percentage >= payload.settings.passingScore,
        feedback: Object.fromEntries(results.map(({ question, correct }) => [
            question.id,
            { correct, correctAnswers: [...question.correctAnswers] } satisfies QuizFeedbackItem,
        ])),
    };
}
