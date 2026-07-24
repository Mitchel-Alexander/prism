import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { getPageHtml } from "@/lib/content";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy — PRISM",
  description:
    "How the Partnership for Research Into Sentient Machines collects, uses, and protects your personal data.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Privacy() {
  const html = getPageHtml("privacy.md");

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
          <span className={styles.kickerDark}>Legal</span>
          <h1 className={styles.title}>Privacy Policy &amp; Cookies</h1>
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
