import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.glow} />
        <span className={styles.glow2} />
      </div>
      <div className={styles.facets} aria-hidden="true" />
      <div className={styles.depth} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.nav}>
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo-prism-white.png`}
          alt="PRISM — Partnership for Research Into Sentient Machines"
          className={styles.logo}
          width={138}
          height={30}
        />
        <button className={styles.menu} type="button" aria-label="Open menu">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <line x1="4" y1="8" x2="22" y2="8" />
            <line x1="4" y1="13" x2="22" y2="13" />
            <line x1="4" y1="18" x2="22" y2="18" />
          </svg>
        </button>
      </header>

      <div className={styles.center}>
        <h1 className={styles.headline}>
          Partnership for Research Into Sentient Machines
        </h1>
        <img
          className={styles.crest}
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo-prism-mark-white.png`}
          alt="PRISM"
          width={74}
          height={48}
        />
        <p className={styles.subhead}>
          A non-profit fostering responsible research into AI consciousness
        </p>
      </div>

      <div className={styles.chevron} aria-hidden="true">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 8l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
