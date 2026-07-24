import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { getPageHtml } from "@/lib/content";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
  title: "Past events & projects — PRISM",
  description:
    "A record of PRISM events, announcements, and milestones from earlier in our development.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function History() {
  const html = getPageHtml("history.md");

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
          </div>
          <span className={styles.kickerDark}>Archive</span>
          <h1 className={styles.title}>Past events &amp; projects</h1>
          <p className={styles.lede}>
            Announcements and milestones from earlier in PRISM&rsquo;s
            development.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        <article
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>

      <Footer />
    </main>
  );
}
