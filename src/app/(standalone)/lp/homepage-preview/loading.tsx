import styles from "@/features/marketing/homepage-preview/HomepagePreview.module.css";

export default function HomepagePreviewLoading() {
  return (
    <div className={styles.loadingState} role="status" aria-live="polite" aria-busy="true">
      <div>
        <p className={styles.loadingTitle}>Menyiapkan homepage preview.</p>
        <p>Skillary sedang memeriksa program, workshop, dan jalur belajar yang aman ditampilkan.</p>
        <div className={styles.loadingGrid} aria-hidden="true">
          <span className={styles.loadingBlock} />
          <span className={styles.loadingBlock} />
          <span className={styles.loadingBlock} />
        </div>
      </div>
    </div>
  );
}
