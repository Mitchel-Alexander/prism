import Link from "next/link";
import { Footer } from "@/components/Footer";
import styles from "@/components/content.module.css";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Branded 404 — replaces Next's default error screen. Served by GitHub Pages
// as 404.html for any path that isn't a page or redirect stub.
export default function NotFound() {
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
          <span className={styles.kickerDark}>404</span>
          <h1 className={styles.title}>Page not found</h1>
          <p className={styles.lede}>
            This page doesn&rsquo;t exist — it may have been retired when we
            rebuilt our website.
          </p>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.prose}>
          <p>
            <a className={styles.submit} href={`${BASE}/`}>
              Go to the homepage
            </a>
          </p>
          <p>
            Looking for something specific? Try our{" "}
            <Link href="/podcast">podcast</Link>,{" "}
            <Link href="/blog">blog</Link>, or{" "}
            <Link href="/contact">contact us</Link>
            {" and we'll point you the right way."}
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
