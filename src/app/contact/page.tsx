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

// TODO(mitchel): create the form at formspree.io (notifications → will@prism-global.com)
// and replace YOUR_FORM_ID with the real form id. Until then the form won't deliver.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

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
            <Link href="/#work" className={styles.backLink}>
              ← Back to the homepage
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
            you. Fill out the form below and one of our team will be in touch.
          </p>
          <p>
            In the meantime, you can sign up to the{" "}
            <a
              href="https://mailchi.mp/849f2f02ad2d/prism-newsletter"
              target="_blank"
              rel="noopener noreferrer"
            >
              PRISM Newsletter
            </a>{" "}
            for our latest news, events, and opportunities, or email us directly
            at <a href="mailto:info@prism-global.com">info@prism-global.com</a>.
          </p>

          <form className={styles.form} action={FORMSPREE_ENDPOINT} method="POST">
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">Name</label>
              <input className={styles.input} type="text" id="name" name="name" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input className={styles.input} type="email" id="email" name="email" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea className={styles.textarea} id="message" name="message" required />
            </div>
            <button className={styles.submit} type="submit">Send message</button>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  );
}
