import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { getSlugs, getEntry } from "@/lib/content";
import styles from "@/components/content.module.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function generateStaticParams() {
  return getSlugs("transcripts");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("transcripts", slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — PRISM`,
    description: entry.excerpt.slice(0, 155),
  };
}

export default async function Transcript({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry("transcripts", slug);
  if (!entry || !entry.published) notFound();

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
            <Link href="/podcast-transcripts" className={styles.backLink}>
              ← All transcripts
            </Link>
          </div>
          <span className={styles.kickerDark}>Transcript</span>
          <h1 className={styles.title}>{entry.title}</h1>
        </div>
      </header>

      <div className={styles.body}>
        <article
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: entry.html }}
        />
      </div>

      <Footer />
    </main>
  );
}
