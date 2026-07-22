import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { getCollection } from "@/lib/content";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
  title: "Podcast transcripts — PRISM",
  description:
    "Full written transcripts of Exploring Machine Consciousness podcast episodes.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function TranscriptsIndex() {
  const transcripts = getCollection("transcripts");

  return (
    <main className={styles.page}>
      <header className={styles.head}>
        <div className={styles.headInner}>
          <div className={styles.topBar}>
            <Link href="/" className={styles.logoLink}>
              <img
                src={`${BASE}/logo-prism-white.png`}
                alt="PRISM — Partnership for Research Into Sentient Machines"
                className={styles.logo}
                width={138}
                height={30}
              />
            </Link>
            <Link href="/podcast" className={styles.backLink}>
              ← Podcast
            </Link>
          </div>
          <span className={styles.kickerDark}>Podcast</span>
          <h1 className={styles.title}>Transcripts</h1>
          <p className={styles.lede}>
            Full written transcripts of Exploring Machine Consciousness episodes.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        <ul className={styles.list}>
          {transcripts.map((t) => (
            <li key={t.slug}>
              <Link href={`/podcast-transcripts/${t.slug}`} className={styles.row}>
                <h2 className={styles.rowTitle}>{t.title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </main>
  );
}
