import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import styles from "./workshops.module.css";

export const metadata: Metadata = {
  title: "Expert workshops — PRISM",
  description:
    "We organise events where the field's leading researchers present their work to a growing community.",
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// Recent online-meetup sessions (hosted with Conscium); each links to the
// session recording on YouTube.
const MEETUPS = [
  {
    title: "Rethink Priorities: Early Results from the Digital Consciousness Model",
    text: "Researchers from Rethink Priorities presented early results from their digital consciousness model, which estimates the probability that near-future AI systems are conscious.",
    href: "https://www.youtube.com/watch?v=AAiV8ldtIuE",
  },
  {
    title: "Brain-inspired computation for machine consciousness",
    text: "Nikola Kasabov discussed his work in neuromorphic systems and what it means for machine consciousness.",
    href: "https://www.youtube.com/watch?v=6s5LhRx-azg",
  },
  {
    title: "Benjamin Rosman: Acting rationally, the challenges of building intelligent agents",
    text: "Benji Rosman discussed what building reinforcement learning systems has taught him about agency and its role in machine consciousness.",
    href: "https://www.youtube.com/watch?v=C4OzfHneKAQ",
  },
];

export default function Workshops() {
  return (
    <main className={styles.page}>
      {/* Dark header band — logo home link + page title, echoing the hero. */}
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
          <span className={styles.kickerDark}>Our work</span>
          <h1 className={styles.title}>Expert workshops</h1>
          <p className={styles.lede}>
            We organise events where the field&rsquo;s leading researchers
            present their work to a growing community.
          </p>
        </div>
      </header>

      {/* Light editorial content on the warm sheet. */}
      <div className={styles.body}>
        <section className={styles.section}>
          <span className={styles.kicker}>In-person workshops</span>
          <p className={styles.prose}>
            Our workshops bring together small groups of experts for focused
            interdisciplinary discussion of the potential impacts of digital
            minds. In 2025 we ran a workshop at the Turing Institute on the
            responsible development of AI consciousness, and, with the Centre
            for the Future of AI, Mind and Society, co-convened an expert
            discussion that brought 25 leading researchers together for a
            day&rsquo;s work on the challenges facing the field.
          </p>
        </section>

        <section className={styles.section}>
          <span className={styles.kicker}>Online meetups</span>
          <p className={styles.prose}>
            With Conscium, we host a series of online meetups where researchers
            and interested members of the public can engage with new work. The
            series extends our community beyond in-person events and reaches
            people who would not otherwise have access to specialist discussion
            in this area.
          </p>
          <p className={styles.prose}>Recent sessions include:</p>
          <ul className={styles.meetupList}>
            {MEETUPS.map((m) => (
              <li key={m.href}>
                <a
                  className={styles.meetupItem}
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.meetupBody}>
                    <h3 className={styles.meetupTitle}>{m.title}</h3>
                    <p className={styles.prose}>{m.text}</p>
                  </div>
                  <span className={styles.meetupWatch}>Watch</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <Footer />
    </main>
  );
}
