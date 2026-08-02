import "server-only";

import { getProgramBySlug } from "@/data/v2-programs";
import { homepageProgramAsset } from "./homepage-preview-assets";
import type { ProgramSourceRow } from "./types";

const PROGRAM_RECORD_PREFIX = "program-index:";

export function homepageProgramRecordId(slug: string): string {
  return `${PROGRAM_RECORD_PREFIX}${slug}`;
}

export function readHomepagePrograms(recordIds: readonly string[]): readonly ProgramSourceRow[] {
  return recordIds.flatMap((recordId) => {
    if (!recordId.startsWith(PROGRAM_RECORD_PREFIX)) return [];
    const slug = recordId.slice(PROGRAM_RECORD_PREFIX.length);
    const program = getProgramBySlug(slug);
    const asset = homepageProgramAsset(slug);
    if (!program || !program.hasFullDetail || !asset?.approvedForPreview) return [];

    return [
      {
        id: recordId,
        slug: program.slug,
        title: program.title,
        description: program.desc,
        level: program.level,
        duration: program.duration,
        category: program.category,
        formats: program.formats,
        status: "PUBLISHED" as const,
        thumbnailUrl: asset.derivativePath,
        thumbnailAlt: asset.alt,
        thumbnailLabel: asset.label,
        moduleCount: program.modules.length,
        outcomeCount: program.outcomes.length,
      },
    ];
  });
}
