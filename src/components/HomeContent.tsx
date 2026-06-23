import styles from "./HomeContent.module.css";

// High-level mission aims — one line each.
const STEPS = [
  {
    lead: "Understand",
    rest: "if AI systems could be conscious or hold moral status.",
  },
  {
    lead: "Connect",
    rest: "the field across philosophy, cognitive science, and AI.",
  },
  {
    lead: "Prepare",
    rest: "society and institutions for the minds we may create.",
  },
];

// Our work + projects we run or support. Links are live; copy is draft for review.
const PROJECTS: { title: string; desc: string; href?: string }[] = [
  {
    title: "Exploring Machine Consciousness",
    desc: "Our podcast brings leading thinkers in philosophy, cognitive science, and AI to a curious general audience. Each episode explores a different facet of whether — and how — machines might be conscious.",
  },
  {
    title: "Digital Minds Guide",
    desc: "An accessible, in-depth guide to the science and ethics of digital minds. It gathers the key questions, evidence, and arguments into one clear resource for newcomers and experts alike.",
    href: "https://digitalminds.guide/",
  },
  {
    title: "Digital Minds Newsletter",
    desc: "A regular newsletter tracking developments in digital minds research, policy, and public debate — keeping the community current on a fast-moving field.",
    href: "https://www.digitalminds.news/",
  },
  {
    title: "Cambridge Digital Minds",
    desc: "We support several of Cambridge Digital Minds' projects, helping advance rigorous academic work on AI consciousness and moral status. Our collaboration spans research, events, and field-building.",
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
// CTA hrefs are placeholders ("#").
const OPPORTUNITIES: { title: string; body: string; cta: string; href: string }[] =
  [
    {
      title: "Trustee vacancy",
      body: "We're seeking trustees to help steer PRISM's mission and growth. We're especially keen to hear from people with governance, research, or non-profit leadership experience who share our commitment to taking digital minds seriously.",
      cta: "Learn about the trustee role",
      href: "#",
    },
    {
      title: "Join the team",
      body: "We're a small, growing non-profit scaling our research, operations, and communications. If you want to help build the field of digital minds research, we'd love to hear from you — whether or not there's a role currently advertised.",
      cta: "See our open roles",
      href: "#",
    },
  ];

export function HomeContent() {
  return (
    <div className={styles.below}>
      <section className={styles.mission}>
        <div className={styles.inner}>
          <div className={styles.split}>
            <p className={styles.splitLabel}>Our mission</p>
            <div className={styles.splitContent}>
              <h2 className={styles.missionHeading}>
                Preparing society for conscious machines
              </h2>
              <p className={styles.missionIntro}>
                PRISM works to ready the world for the possibility of
                consciousness, sentience, and moral status in artificial minds —
                across three connected aims.
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
          </div>
        </div>
      </section>

      <section className={styles.work}>
        <div className={styles.inner}>
          <div className={styles.split}>
            <p className={styles.splitLabel}>Our work</p>
            <div className={styles.splitContent}>
              <p className={styles.splitLead}>
                We grow the emerging field through expert workshops,
                partnerships, and convenings. By connecting researchers,
                philosophers, and policymakers, we help turn scattered work into
                a coherent community.
              </p>
              <div className={styles.workList}>
                {PROJECTS.map((p) => {
                  const inner = (
                    <>
                      <h3 className={styles.workTitle}>{p.title}</h3>
                      <p className={styles.workDesc}>{p.desc}</p>
                      {p.href && (
                        <span className={styles.workLink}>
                          {new URL(p.href).hostname.replace(/^www\./, "")}
                          <span aria-hidden="true">&nbsp;↗</span>
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
                      {inner}
                    </a>
                  ) : (
                    <div className={styles.workItem} key={p.title}>
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.partners}>
        <div className={styles.inner}>
          <div className={styles.split}>
            <p className={styles.splitLabel}>Partners</p>
            <div className={styles.splitContent}>
              <p className={styles.splitLead}>
                We build the field together — collaborating with researchers,
                institutes, and organisations advancing the science and ethics
                of digital minds.
              </p>
              <div className={styles.partnerGrid}>
                {PARTNERS.map((p) => (
                  <div className={styles.partner} key={p}>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.opportunities}>
        <div className={styles.inner}>
          <div className={styles.split}>
            <p className={styles.splitLabel}>Opportunities</p>
            <div className={styles.splitContent}>
              <p className={styles.splitLead}>
                If this resonates with you, there are several ways to take part
                in our work and join the community.
              </p>
              <div className={styles.oppCards}>
                {OPPORTUNITIES.map((o) => (
                  <div className={styles.oppCard} key={o.title}>
                    <h3 className={styles.oppTitle}>{o.title}</h3>
                    <p className={styles.oppBody}>{o.body}</p>
                    <a className={styles.oppCta} href={o.href}>
                      {o.cta}
                      <span aria-hidden="true" className={styles.oppArrow}>
                        →
                      </span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
