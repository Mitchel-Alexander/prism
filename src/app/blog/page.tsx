import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { getCollection, displayDate } from "@/lib/content";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
  title: "Blog — PRISM",
  description:
    "Writing from PRISM on AI consciousness, moral status, and the future of digital minds.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function BlogIndex() {
  const posts = getCollection("blog");

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
          <span className={styles.kickerDark}>Blog</span>
          <h1 className={styles.title}>Writing</h1>
          <p className={styles.lede}>
            Essays and reflections on AI consciousness, moral status, and the
            societal questions raised by digital minds.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        <ul className={styles.list}>
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className={styles.row}>
                <h2 className={styles.rowTitle}>{p.title}</h2>
                <span className={styles.rowDate}>{displayDate(p.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Footer />
    </main>
  );
}
