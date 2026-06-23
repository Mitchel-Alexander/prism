import styles from "./HomeContent.module.css";

// High-level mission aims — one line each.
const STEPS = [
  {
    lead: "Understand",
    rest: "whether and how AI systems could be conscious, sentient, or hold moral status.",
  },
  {
    lead: "Connect",
    rest: "the emerging field — philosophy, cognitive science, AI research, and policy.",
  },
  {
    lead: "Prepare",
    rest: "society, intellectually and institutionally, for the minds we may create.",
  },
];

// Our work + projects we run or support. Links are live.
const PROJECTS: { title: string; desc: string; href?: string }[] = [
  {
    title: "Exploring Machine Consciousness",
    desc: "Our podcast on the science and philosophy of conscious AI.",
  },
  {
    title: "Field-building & convening",
    desc: "Expert workshops and partnerships across the field.",
  },
  {
    title: "Digital Minds Guide",
    desc: "An accessible guide to the science and ethics of digital minds.",
    href: "https://digitalminds.guide/",
  },
  {
    title: "Digital Minds News",
    desc: "Tracking developments in digital minds research and policy.",
    href: "https://www.digitalminds.news/",
  },
  {
    title: "Cambridge Digital Minds",
    desc: "We support several of CDM's projects.",
    href: "https://digitalminds.cam/",
  },
];

// PLACEHOLDER partners — illustrative ecosystem orgs, NOT confirmed partnerships.
// Replace with PRISM's actual partner organisations before publishing.
const PARTNERS = [
  "Cambridge Digital Minds",
  "Eleos AI Research",
  "NYU Center for Mind, Ethics & Policy",
  "Sentience Institute",
];

// Template opportunities — confirm/replace with PRISM's live calls and roles.
const OPPORTUNITIES = [
  {
    kicker: "Research",
    title: "Research sprints",
    body: "Time-bound, collaborative sprints on open problems in machine consciousness and moral status, supported by prize funds.",
    cta: "Get involved",
  },
  {
    kicker: "Careers",
    title: "Join the team",
    body: "We're a small, growing non-profit. Explore open roles across research, operations, and communications.",
    cta: "See open roles",
  },
  {
    kicker: "Governance",
    title: "Trustee vacancy",
    body: "We're seeking trustees to help steer PRISM's mission and growth — bringing governance, research, or non-profit experience.",
    cta: "Learn more",
  },
];

export function HomeContent() {
  return (
    <div className={styles.below}>
      <section className={styles.mission}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Our mission</p>
          <h2 className={styles.missionHeading}>
            Preparing society for conscious machines
          </h2>
          <p className={styles.missionIntro}>
            PRISM works to ready the world for the possibility of consciousness,
            sentience, and moral status in artificial minds — across three
            connected aims.
          </p>
          <div className={styles.steps}>
            {STEPS.map((s, i) => (
              <div className={styles.step} key={s.lead}>
                <span className={styles.num}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={styles.stepText}>
                  <strong>{s.lead}</strong> {s.rest}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.work}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Our work</p>
          <div className={styles.workList}>
            {PROJECTS.map((p) => {
              const content = (
                <>
                  <span className={styles.workTitle}>{p.title}</span>
                  <span className={styles.workDesc}>{p.desc}</span>
                  {p.href && (
                    <span className={styles.workArrow} aria-hidden="true">
                      ↗
                    </span>
                  )}
                </>
              );
              return p.href ? (
                <a
                  className={styles.workItem}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={p.title}
                >
                  {content}
                </a>
              ) : (
                <div className={styles.workItem} key={p.title}>
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.partners}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Partners</p>
          <p className={styles.lead}>
            We build the field together — collaborating with researchers,
            institutes, and organisations advancing the science and ethics of
            digital minds.
          </p>
          <div className={styles.partnerGrid}>
            {PARTNERS.map((p) => (
              <div className={styles.partner} key={p}>
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.opportunities}>
        <div className={styles.inner}>
          <p className={styles.eyebrow}>Opportunities</p>
          <p className={styles.lead}>
            Ways to take part in our work — from collaborative research to
            joining the team.
          </p>
          <div className={styles.oppsGrid}>
            {OPPORTUNITIES.map((o) => (
              <article className={styles.project} key={o.title}>
                <span className={styles.kicker}>{o.kicker}</span>
                <h3 className={styles.projectTitle}>{o.title}</h3>
                <p className={styles.projectBody}>{o.body}</p>
                <a className={styles.cta} href="#">
                  {o.cta} <span aria-hidden="true">→</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
