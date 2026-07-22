import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { getPageHtml } from "@/lib/content";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
  title: "Are current LLMs conscious? — PRISM",
  description:
    "Why most experts think today's large language models are extremely unlikely to be conscious.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function AreCurrentLLMsConscious() {
  const html = getPageHtml("are-current-llms-conscious.md");

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
          <span className={styles.kickerDark}>Explainer</span>
          <h1 className={styles.title}>Are current LLMs conscious?</h1>
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
