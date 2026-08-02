import test from "node:test";
import assert from "node:assert/strict";
import {
  createPublicQuizData,
  gradeQuiz,
  parseQuizData,
  validateQuizAnswers,
} from "../../.integrity-test-build/lib/quiz-integrity.js";

const structuredQuiz = JSON.stringify({
  settings: { passingScore: 75, maxAttempts: 2, showScore: true, showAnswers: true },
  questions: [
    { id: "single", type: "SINGLE_CHOICE", prompt: "Pick one", options: ["A", "B"], correctAnswers: ["1"] },
    { id: "multi", type: "MULTIPLE_SELECTION", prompt: "Pick two", options: ["A", "B", "C"], correctAnswers: ["0", "2"] },
    { id: "short", type: "SHORT_ANSWER", prompt: "Name it", correctAnswers: ["Jakarta"] },
    { id: "single-2", type: "SINGLE_CHOICE", prompt: "Pick again", options: ["A", "B"], correctAnswers: ["0"] },
  ],
});

test("public quiz payload never exposes answer keys", () => {
  const publicPayload = createPublicQuizData(structuredQuiz);
  assert.ok(publicPayload);
  assert.equal(publicPayload.includes("correctAnswers"), false);
  assert.equal(publicPayload.includes("Jakarta"), false);

  const legacyPayload = createPublicQuizData(JSON.stringify([
    { question: "Legacy", options: ["A", "B"], correctIndex: 1 },
  ]));
  assert.ok(legacyPayload);
  assert.equal(legacyPayload.includes("correctIndex"), false);
});

test("server grading handles single, multiple and normalized short answers", () => {
  const quiz = parseQuizData(structuredQuiz);
  const answers = { single: "1", multi: ["2", "0"], short: "  JAKARTA  ", "single-2": "1" };
  const validation = validateQuizAnswers(quiz, answers);
  assert.equal(validation.ok, true);
  if (!validation.ok) return;

  const result = gradeQuiz(quiz, validation.answers);
  assert.equal(result.score, 3);
  assert.equal(result.totalQuestions, 4);
  assert.equal(result.percentage, 75);
  assert.equal(result.passed, true);
});

test("submission validation rejects missing and out-of-range answers", () => {
  const quiz = parseQuizData(structuredQuiz);
  assert.equal(validateQuizAnswers(quiz, { single: "1" }).ok, false);
  assert.equal(validateQuizAnswers(quiz, {
    single: "9",
    multi: ["0", "2"],
    short: "Jakarta",
    "single-2": "0",
  }).ok, false);
});

test("client-supplied score cannot influence grading", () => {
  const quiz = parseQuizData(structuredQuiz);
  const answers = { single: "0", multi: ["1"], short: "Bandung", "single-2": "1" };
  const validation = validateQuizAnswers(quiz, answers);
  assert.equal(validation.ok, true);
  if (!validation.ok) return;

  const result = gradeQuiz(quiz, validation.answers);
  assert.equal(result.score, 0);
  assert.equal(result.passed, false);
});
