"use client";

import styles from "@/features/marketing/homepage-preview/HomepagePreview.module.css";

export default function HomepagePreviewError({
  unstable_retry,
}: {
  unstable_retry: () => void;
}) {
  return (
    <div className={styles.errorState} role="alert">
      <div>
        <p className={styles.errorCode}>PREVIEW BELUM TERSEDIA</p>
        <h1>Homepage preview belum dapat dimuat.</h1>
        <p>
          Informasi yang belum dapat diperiksa tidak ditampilkan. Coba muat kembali halaman ini.
        </p>
        <button type="button" onClick={() => unstable_retry()}>
          Coba lagi
        </button>
      </div>
    </div>
  );
}
