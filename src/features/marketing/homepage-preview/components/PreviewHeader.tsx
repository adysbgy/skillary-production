import { homepageBandAttributes } from "../blueprint";
import { SAFE_STATIC_DESTINATIONS } from "../data/homepage-preview-contract";
import { getCachedHomepagePreviewData } from "../data/get-homepage-preview-data";
import { PreviewMobileNavigation } from "./PreviewMobileNavigation";
import { PreviewSearch } from "./PreviewSearch";
import { SearchIcon } from "./PreviewIcons";
import { PREVIEW_PRIMARY_LINKS } from "./preview-navigation";
import styles from "../HomepagePreview.module.css";

export async function PreviewHeader() {
  const data = await getCachedHomepagePreviewData();

  return (
    <>
      <header
        className={styles.previewHeader}
        data-preview-owner="header"
        {...homepageBandAttributes("SK-HP-01")}
      >
        <div className={styles.headerUtility}>
          <SkillaryWordmark />

          <nav className={styles.utilityNav} aria-label="Navigasi utama Skillary">
            {PREVIEW_PRIMARY_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a href={SAFE_STATIC_DESTINATIONS.organization}>Untuk Organisasi</a>
            <a href={SAFE_STATIC_DESTINATIONS.resources}>Materi Gratis</a>
          </nav>

          <div className={styles.desktopHeaderActions}>
            <details className={styles.desktopSearchPopover}>
              <summary aria-label="Buka pencarian Skillary">
                <SearchIcon />
              </summary>
              <div className={styles.desktopSearchPanel}>
                <PreviewSearch entries={data.search.entries} />
              </div>
            </details>
            <a className={styles.headerLogin} href={SAFE_STATIC_DESTINATIONS.login}>
              Masuk
            </a>
            <a className={styles.headerAction} href={SAFE_STATIC_DESTINATIONS.programSection}>
              Mulai Belajar
            </a>
          </div>

          <div className={styles.mobileHeaderActions}>
            <a href={SAFE_STATIC_DESTINATIONS.workshopSection}>Workshop berikutnya</a>
            <PreviewMobileNavigation searchEntries={data.search.entries} />
          </div>
        </div>
      </header>
    </>
  );
}

function SkillaryWordmark() {
  return (
    <a
      aria-label="Skillary homepage preview"
      className={styles.wordmark}
      href={SAFE_STATIC_DESTINATIONS.preview}
    >
      <svg aria-hidden="true" className={styles.wordmarkMark} viewBox="0 0 32 32">
        <rect height="28" rx="8" width="28" x="2" y="2" />
        <path d="M22 9.5h-8.5c-2 0-3.5 1.4-3.5 3.1s1.5 3.1 3.5 3.1h5c2 0 3.5 1.4 3.5 3.1s-1.5 3.1-3.5 3.1H10" />
      </svg>
      <span className={styles.wordmarkLockup}>
        <span className={styles.wordmarkText}>Skillary</span>
        <span className={styles.wordmarkDescriptor}>Learn · Practice · Prove</span>
      </span>
    </a>
  );
}
