import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import styles from "@/components/content.module.css";

export const metadata: Metadata = {
  title: "Contact — PRISM",
  description:
    "Get in touch with the Partnership for Research Into Sentient Machines.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Contact() {
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
          <span className={styles.kickerDark}>Get in touch</span>
          <h1 className={styles.title}>Contact us</h1>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.prose}>
          <p>
            If you&rsquo;re interested in getting involved with the Partnership
            for Research Into Sentient Machines, we&rsquo;d love to hear from
            you. Send us an email and one of our team will be in touch.
          </p>
          <p>
            <a className={styles.submit} href="mailto:info@prism-global.com">
              Email us
            </a>
          </p>
          <p>
            You can also sign up to the{" "}
            <a
              href="https://mailchi.mp/849f2f02ad2d/prism-newsletter"
              target="_blank"
              rel="noopener noreferrer"
            >
              PRISM Newsletter
            </a>{" "}
            for our latest news, events, and opportunities.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
