import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { BuzzsproutPlayer } from "@/components/BuzzsproutPlayer";
import { getSlugs, getEntry, displayDate } from "@/lib/content";
import styles from "@/components/content.module.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Pre-render one static page per published episode at build time.
export function generateStaticParams() {
  return getSlugs("podcast");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry("podcast", slug);
  if (!entry) return {};
  return {
    title: `${entry.title} — PRISM`,
    description: entry.excerpt.slice(0, 155),
    // Episode artwork becomes the page's own share card when present
    // (falls back to the site-wide og.png from the root layout otherwise).
    ...(entry.image && {
      openGraph: { images: [{ url: entry.image }] },
      twitter: { images: [entry.image] },
    }),
  };
}

export default async function Episode({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry("podcast", slug);
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
            <Link href="/podcast" className={styles.backLink}>
              ← All episodes
            </Link>
          </div>
          <span className={styles.kickerDark}>Podcast</span>
          <h1 className={styles.title}>{entry.title}</h1>
          {entry.date && <p className={styles.meta}>{displayDate(entry.date)}</p>}
        </div>
      </header>

      <div className={styles.body}>
        {/* Episode artwork isn't shown here — the Buzzsprout player carries it.
            entry.image is still used as the page's og:image share card. */}
        {entry.buzzsprout && (
          <div className={styles.player}>
            <BuzzsproutPlayer episode={entry.buzzsprout} />
          </div>
        )}
        <div className={styles.listenRow}>
          {entry.youtube && (
            <a
              className={styles.submit}
              href={entry.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ Watch on YouTube
            </a>
          )}
          <a
            className={styles.submit}
            href="https://open.spotify.com/show/3UIunv0XnAke98WPRSzM48"
            target="_blank"
            rel="noopener noreferrer"
          >
            Listen on Spotify
          </a>
        </div>
        <article
          className={styles.prose}
          dangerouslySetInnerHTML={{ __html: entry.html }}
        />
      </div>

      <Footer />
    </main>
  );
}
