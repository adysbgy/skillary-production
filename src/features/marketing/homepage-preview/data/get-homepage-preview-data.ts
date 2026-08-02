import "server-only";

import { cache } from "react";

import { prisma } from "@/lib/prisma";
import { HOMEPAGE_PREVIEW_REGISTRY } from "./homepage-preview-provenance";
import { buildHomepagePreviewData } from "./homepage-preview-service";
import { readHomepagePrograms } from "./homepage-preview-programs";
import type {
  CourseSourceRow,
  FacultySourceRow,
  HomepagePreviewData,
  HomepagePreviewReaders,
  HomepageSourceFailure,
  LearningPathSourceRow,
} from "./types";

const HOMEPAGE_PHOTO_RIGHTS = [
  "trainer_uploaded",
  "trainer_approved",
  "skillary_produced",
] as const;

function createPrismaReaders(now: Date): HomepagePreviewReaders {
  return {
    async readCourses(recordIds): Promise<readonly CourseSourceRow[]> {
      const rows = await prisma.course.findMany({
        where: {
          id: { in: [...recordIds] },
          status: "PUBLISHED",
          modules: { some: { lessons: { some: {} } } },
        },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          level: true,
          duration: true,
          category: true,
          status: true,
          thumbnailUrl: true,
          modules: { select: { _count: { select: { lessons: true } } } },
        },
      });

      return rows.map(({ modules, ...row }) => ({
        ...row,
        lessonCount: modules.reduce((total, module) => total + module._count.lessons, 0),
      }));
    },

    async readPrograms(recordIds) {
      return readHomepagePrograms(recordIds);
    },

    async readLearningPaths(recordIds): Promise<readonly LearningPathSourceRow[]> {
      const rows = await prisma.learningPath.findMany({
        where: {
          id: { in: [...recordIds] },
          status: "PUBLISHED",
          courses: {
            some: {},
            every: { course: { status: "PUBLISHED" } },
          },
        },
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          status: true,
          mode: true,
          thumbnailUrl: true,
          courses: {
            orderBy: { sortOrder: "asc" },
            select: { course: { select: { status: true } } },
          },
        },
      });

      return rows.map(({ courses, ...row }) => ({
        ...row,
        childCourseStatuses: courses.map(({ course }) => course.status),
      }));
    },

    async readFaculty(recordIds): Promise<readonly FacultySourceRow[]> {
      return prisma.trainerProfile.findMany({
        where: {
          id: { in: [...recordIds] },
          status: "PUBLISHED",
          consentedAt: { not: null },
          publishedAt: { not: null },
          portraitUrl: { not: null },
          photoRights: { in: [...HOMEPAGE_PHOTO_RIGHTS] },
          reviewDueAt: { gt: now },
          OR: [
            { verification: "SELECTED" },
            { verification: "VERIFIED", verifiedAt: { not: null } },
          ],
        },
        select: {
          id: true,
          slug: true,
          name: true,
          headline: true,
          shortBio: true,
          portraitUrl: true,
          expertise: true,
          verification: true,
          status: true,
          photoRights: true,
          consentedAt: true,
          publishedAt: true,
          verifiedAt: true,
          reviewDueAt: true,
        },
      });
    },
  };
}

export interface GetHomepagePreviewDataOptions {
  timeoutMs?: number;
  onSourceFailure?: (failure: HomepageSourceFailure) => void;
}

export async function getHomepagePreviewData(
  options: GetHomepagePreviewDataOptions = {},
): Promise<HomepagePreviewData> {
  const now = new Date();

  return buildHomepagePreviewData({
    readers: createPrismaReaders(now),
    registry: HOMEPAGE_PREVIEW_REGISTRY,
    now,
    timeoutMs: options.timeoutMs,
    onSourceFailure: options.onSourceFailure,
  });
}

export const getCachedHomepagePreviewData = cache(
  async (): Promise<HomepagePreviewData> => getHomepagePreviewData(),
);
