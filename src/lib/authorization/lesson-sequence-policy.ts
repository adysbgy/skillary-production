export interface LessonSequenceFacts {
  lessonExistsInCourse: boolean;
  lessonIndex: number;
  previousLessonCompleted: boolean;
  privileged: boolean;
}
export type LessonSequenceDecision = "NOT_FOUND" | "ALLOW" | "RETURN_TO_OVERVIEW";
export function decideLessonSequence(facts: LessonSequenceFacts): LessonSequenceDecision {
  if (!facts.lessonExistsInCourse || facts.lessonIndex < 0) return "NOT_FOUND";
  if (facts.privileged || facts.lessonIndex === 0 || facts.previousLessonCompleted) return "ALLOW";
  return "RETURN_TO_OVERVIEW";
}
