export interface ProgressMutationFacts {
  authenticated: boolean;
  lessonExists: boolean;
  hasActiveEnrollment: boolean;
  requiredQuiz: boolean;
  hasPassingAttempt: boolean;
}
export type ProgressMutationDecision = "UNAUTHORIZED" | "NOT_FOUND" | "FORBIDDEN" | "QUIZ_NOT_PASSED" | "ALLOW";
export function decideProgressMutation(facts: ProgressMutationFacts): ProgressMutationDecision {
  if (!facts.authenticated) return "UNAUTHORIZED";
  if (!facts.lessonExists) return "NOT_FOUND";
  if (!facts.hasActiveEnrollment) return "FORBIDDEN";
  if (facts.requiredQuiz && !facts.hasPassingAttempt) return "QUIZ_NOT_PASSED";
  return "ALLOW";
}
export function isCourseComplete(totalLessons: number, completedLessons: number): boolean {
  return totalLessons > 0 && completedLessons >= totalLessons;
}
