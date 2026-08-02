import type { ComponentPropsWithoutRef, ReactNode } from "react";

import {
  homepageBandAttributes,
  type HomepageBlueprintBandId,
} from "../blueprint";

interface BlueprintBandProps extends ComponentPropsWithoutRef<"section"> {
  bandId: HomepageBlueprintBandId;
  children: ReactNode;
}

export function BlueprintBand({
  bandId,
  children,
  ...sectionProps
}: BlueprintBandProps) {
  return (
    <section {...sectionProps} {...homepageBandAttributes(bandId)}>
      {children}
    </section>
  );
}
