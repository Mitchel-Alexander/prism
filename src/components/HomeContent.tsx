import styles from "./HomeContent.module.css";

// High-level mission themes — deliberately not tied to specific projects.
const STEPS = [
  {
    lead: "Understand",
    body: "Advance rigorous, responsible research into whether and how AI systems could be conscious, sentient, or hold moral status.",
  },
  {
    lead: "Connect",
    body: "Build the emerging field — bringing together philosophy, cognitive science, AI research, and policy.",
  },
  {
    lead: "Prepare",
    body: "Help society get ready, intellectually and institutionally, for the minds we may create.",
  },
];

// The concrete work. Template copy drafted from PRISM's materials — for review.
const PROJECTS = [
  {
    kicker: "Podcast",
    title: "Exploring Machine Consciousness",
    body: "Our podcast brings leading thinkers — among them Henry Shevlin, Susan Schneider, Mark Solms, Jeff Sebo, and Keith Frankish — to a curious general audience, on the science and philosophy of conscious AI.",
  },
  {
    kicker: "Convening",
    title: "Field-building & convening",
    body: "We grow the community through expert workshops and partnerships, connecting researchers, philosophers, and policymakers working on digital minds.",
  },
];

export function HomeContent() {
  return (
    <>
      <section className={styles.banner}>
        <div className={styles.bannerInner}>
          <h2 className={styles.bannerHeading}>
            Preparing society for conscious machines
          </h2>
          <p className={styles.bannerText}>
            PRISM works to ready the world for the possibility of consciousness,
            sentience, and moral status in artificial minds — across three
            connected aims.
          </p>
        </div>
      </section>

      <section className={styles.mission}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Our mission</p>
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div className={styles.step} key={s.lead}>
                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={styles.stepText}>
                  <strong>{s.lead}.</strong> {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.work}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Our work</p>
          <div className={styles.projects}>
            {PROJECTS.map((p) => (
              <article className={styles.project} key={p.title}>
                <span className={styles.kicker}>{p.kicker}</span>
                <h3 className={styles.projectTitle}>{p.title}</h3>
                <p className={styles.projectBody}>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
