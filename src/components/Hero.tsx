"use client";

import { useRef } from "react";
import styles from "./Hero.module.css";

export function Hero() {
  const auroraRef = useRef<HTMLDivElement>(null);

  function handleMove(e: React.MouseEvent<HTMLElement>) {
    const el = auroraRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    // Parallax: the light drifts gently opposite the cursor.
    el.style.setProperty("--mx", `${(-x * 36).toFixed(1)}px`);
    el.style.setProperty("--my", `${(-y * 36).toFixed(1)}px`);
  }

  function handleLeave() {
    const el = auroraRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0px");
    el.style.setProperty("--my", "0px");
  }

  return (
    <section
      className={styles.hero}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <div className={styles.refraction} ref={auroraRef} aria-hidden="true">
        <span className={`${styles.band} ${styles.c1}`} />
        <span className={`${styles.band} ${styles.c2}`} />
        <span className={`${styles.band} ${styles.c3}`} />
        <span className={`${styles.band} ${styles.c4}`} />
        <span className={`${styles.band} ${styles.c5}`} />
      </div>
      <div className={styles.depth} aria-hidden="true" />

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
        <span className={styles.rule} />
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
