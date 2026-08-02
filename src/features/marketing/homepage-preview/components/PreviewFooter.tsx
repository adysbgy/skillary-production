import { homepageBandAttributes } from "../blueprint";
import { SAFE_STATIC_DESTINATIONS } from "../data/homepage-preview-contract";
import styles from "../HomepagePreview.module.css";

const FOOTER_GROUPS = [
  {
    label: "Jelajahi",
    links: [
      { label: "Program", href: SAFE_STATIC_DESTINATIONS.programSection },
      { label: "Workshop berikutnya", href: SAFE_STATIC_DESTINATIONS.workshopSection },
      { label: "Jalur Belajar", href: SAFE_STATIC_DESTINATIONS.learningPathSection },
    ],
  },
  {
    label: "Hasil belajar",
    links: [
      { label: "Sertifikasi", href: SAFE_STATIC_DESTINATIONS.certifications },
      { label: "Portfolio", href: SAFE_STATIC_DESTINATIONS.portfolio },
      { label: "Materi Gratis", href: SAFE_STATIC_DESTINATIONS.resources },
    ],
  },
  {
    label: "Organisasi",
    links: [
      { label: "Untuk Organisasi", href: SAFE_STATIC_DESTINATIONS.organization },
      { label: "Faculty", href: SAFE_STATIC_DESTINATIONS.faculty },
      { label: "Hubungi Skillary", href: SAFE_STATIC_DESTINATIONS.contact },
    ],
  },
  {
    label: "Akun & Legal",
    links: [
      { label: "Masuk", href: SAFE_STATIC_DESTINATIONS.login },
      { label: "Kebijakan Privasi", href: SAFE_STATIC_DESTINATIONS.privacy },
      { label: "Syarat & Ketentuan", href: SAFE_STATIC_DESTINATIONS.terms },
    ],
  },
] as const;

export function PreviewFooter() {
  return (
    <footer
      className={styles.previewFooter}
      data-preview-owner="footer"
      {...homepageBandAttributes("SK-HP-13")}
    >
      <div className={styles.footerInner}>
        <div className={styles.footerBrand}>
          <a className={styles.footerWordmark} href={SAFE_STATIC_DESTINATIONS.preview}>
            Skillary
          </a>
          <p>
            Program pembelajaran untuk individu dan organisasi—dari pemahaman dan praktik,
            hingga bentuk hasil yang dapat ditinjau sesuai program.
          </p>
          <a className={styles.footerContactAction} href={SAFE_STATIC_DESTINATIONS.contact}>
            Diskusikan kebutuhan tim
          </a>
        </div>
        <nav className={styles.footerNav} aria-label="Navigasi footer preview">
          {FOOTER_GROUPS.map((group) => (
            <div className={styles.footerGroup} key={group.label}>
              <h2>{group.label}</h2>
              {group.links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </nav>
      </div>
      <div className={styles.footerBase}>
        <p>© {new Date().getFullYear()} Skillary.</p>
        <p>Homepage preview terisolasi · pembayaran online belum tersedia.</p>
      </div>
    </footer>
  );
}
