import styles from "./Footer.module.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const EXPLORE = [
  { label: "Mission", href: "#mission" },
  { label: "Our work", href: "#work" },
  { label: "Collaborators", href: "#collaborators" },
  { label: "Get involved", href: "#opportunities" },
];

const PROJECTS = [
  { label: "Digital Minds Guide", href: "https://digitalminds.guide/" },
  { label: "Digital Minds Newsletter", href: "https://www.digitalminds.news/" },
  { label: "Cambridge Digital Minds", href: "https://digitalminds.cam/" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <img
            src={`${BASE}/logo-prism-white.png`}
            alt="PRISM — Partnership for Research Into Sentient Machines"
            className={styles.logo}
            width={150}
            height={33}
          />
          <p className={styles.brandLine}>
            A non-profit fostering responsible research into AI consciousness,
            moral status, and digital minds.
          </p>
        </div>

        <nav className={styles.cols} aria-label="Footer">
          <div className={styles.col}>
            <span className={styles.colLabel}>Explore</span>
            {EXPLORE.map((l) => (
              <a key={l.href} href={l.href} className={styles.link}>
                {l.label}
              </a>
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
                <span aria-hidden="true" className={styles.ext}>
                  &nbsp;↗
                </span>
              </a>
            ))}
          </div>
        </nav>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copy}>
          © 2026 Partnership for Research Into Sentient Machines
        </p>
        <p className={styles.tag}>A UK non-profit</p>
      </div>
    </footer>
  );
}
