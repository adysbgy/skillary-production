export type UserRole = "ADMIN" | "INSTRUCTOR" | "LEARNER";

export interface CourseAccessFacts {
  authenticated: boolean;
  role?: UserRole;
  userId?: string;
  instructorId?: string | null;
  hasActiveEnrollment: boolean;
  coursePublished: boolean;
}

export type CourseAccessDecision = "LOGIN" | "ALLOW" | "DENY" | "PREVIEW";

export function decideCourseAccess(facts: CourseAccessFacts): CourseAccessDecision {
  if (!facts.authenticated || !facts.userId) return "LOGIN";
  const privileged = facts.role === "ADMIN" || facts.instructorId === facts.userId;
  if (!facts.coursePublished) {
    if (privileged) return "PREVIEW";
    return facts.hasActiveEnrollment ? "ALLOW" : "DENY";
  }
  return facts.hasActiveEnrollment || privileged ? "ALLOW" : "DENY";
}
