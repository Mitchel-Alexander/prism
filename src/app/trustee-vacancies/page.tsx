import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { getPageHtml } from "@/lib/content";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
  title: "Trustee vacancy — PRISM",
  description:
    "PRISM is seeking trustees to help govern and steer a growing digital-minds research charity.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function TrusteeVacancies() {
  const html = getPageHtml("trustee-vacancies.md");

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
            <Link href="/#opportunities" className={styles.backLink}>
              ← Opportunities
            </Link>
          </div>
          <span className={styles.kickerDark}>Opportunities</span>
          <h1 className={styles.title}>We&rsquo;re looking for trustees</h1>
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
