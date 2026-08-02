import type { ReactNode } from "react";

import { PreviewFooter } from "./PreviewFooter";
import { PreviewHeader } from "./PreviewHeader";
import styles from "../HomepagePreview.module.css";

export function HomepagePreviewShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.previewRoot} data-homepage-preview-shell="true">
      <a className={styles.skipLink} href="#homepage-preview-content">
        Lewati navigasi preview
      </a>
      <PreviewHeader />
      <div
        className={styles.previewContent}
        id="homepage-preview-content"
        tabIndex={-1}
      >
        {children}
      </div>
      <PreviewFooter />
    </div>
  );
}
