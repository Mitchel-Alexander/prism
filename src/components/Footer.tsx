import Link from "next/link";
import { CookieSettingsButton } from "./CookieSettingsButton";
import styles from "./Footer.module.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Mirrors the nav (same order). "/#anchor" (not "#anchor") so links also work
// from subpages — a full load to the homepage, then the browser jumps to the
// section. Podcast points at the featured podcast block, matching the nav.
const EXPLORE = [
  { label: "About", href: "/#mission" },
  { label: "Podcast", href: "/#podcast" },
  { label: "Partnerships", href: "/#partnerships" },
  { label: "Who we are", href: "/#people" },
  { label: "Opportunities", href: "/#opportunities" },
];

const PROJECTS = [
  { label: "Digital Minds Guide", href: "https://digitalminds.guide/" },
  { label: "Digital Minds Newsletter", href: "https://www.digitalminds.news/" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Link href="/" aria-label="PRISM — home" className={styles.logoLink}>
            <img
              src={`${BASE}/logo-prism-white.png`}
              alt="PRISM — Partnership for Research Into Sentient Machines"
              className={styles.logo}
              width={150}
              height={33}
            />
          </Link>
          <p className={styles.brandLine}>
            A registered CIO (Charitable Incorporated Organisation) supporting
            research into AI consciousness, digital minds, and AI moral status.
          </p>
        </div>

        <nav className={styles.cols} aria-label="Footer">
          <div className={styles.col}>
            <span className={styles.colLabel}>Explore</span>
            {EXPLORE.map((l) => (
              <Link key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </Link>
            ))}
          </div>
          <div className={styles.col}>
            <span className={styles.colLabel}>Projects</span>
            {PROJECTS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                {l.label}
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © 2026 Partnership for Research Into Sentient Machines
        </p>
        <p className={styles.legal}>
          <Link href="/privacy" className={styles.link}>Privacy Policy</Link>
          <CookieSettingsButton className={styles.cookieBtn} />
          <span className={styles.tag}>A UK non-profit</span>
        </p>
      </div>
    </footer>
  );
}
