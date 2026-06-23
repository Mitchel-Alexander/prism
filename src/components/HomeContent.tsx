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

// PLACEHOLDER values — draft for review. Replace with PRISM's actual stated values.
const VALUES = [
  {
    lead: "Rigour",
    rest: "we follow the evidence and reason carefully, even on hard questions.",
  },
  {
    lead: "Humility",
    rest: "we hold uncertainty honestly and avoid overclaiming about machine minds.",
  },
  {
    lead: "Moral seriousness",
    rest: "we take the possibility of digital suffering and moral status seriously.",
  },
  {
    lead: "Collaboration",
    rest: "we build across disciplines and institutions, not in isolation.",
  },
];

// PRISM's field-building projects (podcast, events, guide, newsletter). Draft for review.
const PROJECTS: { type: string; title: string; desc: string; href?: string }[] = [
  {
    type: "Podcast",
    title: "Exploring Machine Consciousness",
    desc: "Our podcast brings leading thinkers in philosophy, cognitive science, and AI to a curious general audience. Each episode explores a different facet of whether — and how — machines might be conscious.",
  },
  {
    type: "Events",
    title: "Workshops & convenings",
    desc: "We bring researchers, philosophers, and practitioners together through expert workshops and gatherings — building connections and shared agendas across a young, scattered field.",
  },
  {
    type: "Guide",
    title: "Digital Minds Guide",
    desc: "An accessible, in-depth guide to the science and ethics of digital minds. It gathers the key questions, evidence, and arguments into one clear resource for newcomers and experts alike.",
    href: "https://digitalminds.guide/",
  },
  {
    type: "Newsletter",
    title: "Digital Minds Newsletter",
    desc: "A regular newsletter tracking developments in digital minds research, policy, and public debate — keeping the community current on a fast-moving field.",
    href: "https://www.digitalminds.news/",
  },
];

// Collaborators PRISM works with on its projects (Lucius's framing — collaboration,
// not formal partnership). DRAFT — confirm phrasing; TODO: add "AICI/RP" once its
// full name is known, and decide org names vs. "researchers at X".
const COLLABORATORS = [
  "Cambridge Digital Minds",
  "University of Oxford",
  "NYU Center for Mind, Ethics & Policy",
  "Eleos AI Research",
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
      <section className={styles.mission} id="mission">
        <p className={styles.sectionLabel}>Our mission</p>
        <div className={styles.inner}>
          <h2 className={styles.missionHeading}>
            Preparing society for conscious machines
          </h2>
          <p className={styles.missionIntro}>
            PRISM is a non-profit building the field of digital minds research —
            readying the world for the possibility of consciousness, sentience,
            and moral status in artificial minds.
          </p>
          <div className={styles.dualBoxes}>
            <div className={styles.missionBox}>
              <h3 className={styles.boxTitle}>Mission</h3>
              <p className={styles.boxLead}>
                We pursue this through three connected aims.
              </p>
              <div className={styles.boxList}>
                {STEPS.map((s) => (
                  <p className={styles.boxItem} key={s.lead}>
                    <strong>{s.lead}</strong> {s.rest}
                  </p>
                ))}
              </div>
            </div>
            <div className={styles.missionBox}>
              <h3 className={styles.boxTitle}>Values</h3>
              <p className={styles.boxLead}>
                The commitments that guide how we work.
              </p>
              <div className={styles.boxList}>
                {VALUES.map((v) => (
                  <p className={styles.boxItem} key={v.lead}>
                    <strong>{v.lead}</strong> {v.rest}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.work} id="work">
        <p className={styles.sectionLabel}>Our work</p>
        <div className={styles.inner}>
          <p className={styles.splitLead}>
            We build the field through public-facing projects — a podcast,
            events, an introductory guide, and a newsletter — several run in
            collaboration with researchers and organisations across digital
            minds.
          </p>
          <div className={styles.workGrid}>
            {PROJECTS.map((p) => {
              const inner = (
                <>
                  <span className={styles.workType}>{p.type}</span>
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
      </section>

      <section className={styles.partners} id="collaborators">
        <p className={styles.sectionLabel}>Collaborators</p>
        <div className={styles.inner}>
          <p className={styles.splitLead}>
            Much of our work is carried out in collaboration with researchers
            and organisations across the field of digital minds.
          </p>
          <div className={styles.partnerGrid}>
            {COLLABORATORS.map((c) => (
              <div className={styles.partner} key={c}>
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.opportunities} id="opportunities">
        <p className={styles.sectionLabel}>Opportunities</p>
        <div className={styles.inner}>
          <p className={styles.splitLead}>
            If this resonates with you, there are several ways to take part in
            our work and join the community.
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
      </section>
    </div>
  );
}
