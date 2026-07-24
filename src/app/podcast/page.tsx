import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { PodcastPlatforms } from "@/components/PodcastPlatforms";
import { getCollection, displayDate } from "@/lib/content";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
  title: "Podcast — PRISM",
  description:
    "Exploring Machine Consciousness — conversations with leading researchers on AI consciousness, moral status, and digital minds.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function PodcastIndex() {
  const episodes = getCollection("podcast");

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
            <Link href="/#work" className={styles.backLink}>
              ← Back to the homepage
            </Link>
          </div>
          <span className={styles.kickerDark}>Podcast</span>
          <h1 className={styles.title}>Exploring Machine Consciousness</h1>
          <p className={styles.lede}>
            Conversations with the researchers shaping how we think about AI
            consciousness, moral status, and digital minds.
          </p>
          <PodcastPlatforms />
        </div>
      </header>

      <div className={styles.body}>
        <ul className={styles.list}>
          {episodes.map((e) => (
            <li key={e.slug}>
              <Link href={`/podcast/${e.slug}`} className={styles.row}>
                <h2 className={styles.rowTitle}>{e.title}</h2>
                <span className={styles.rowDate}>{displayDate(e.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </main>
  );
}
