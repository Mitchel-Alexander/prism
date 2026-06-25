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
      {/* ---- Mission ---- */}
      <section className={styles.section} id="mission">
        <div className={styles.wrap}>
          <div className={styles.band}>
            <h2 className={styles.bandTitle}>Mission</h2>
            <span className={styles.bandMeta}>01 / Our mission</span>
          </div>
          <div className={styles.panel}>
            <h3 className={styles.missionHeading}>
              Preparing society for conscious machines
            </h3>
            <p className={styles.missionIntro}>
              PRISM is a non-profit building the field of digital minds research
              — readying the world for the possibility of consciousness,
              sentience, and moral status in artificial minds.
            </p>
          </div>
          <div className={styles.dualBoxes}>
            <div className={styles.missionBox}>
              <span className={styles.boxLabel}>Mission</span>
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
            <div className={`${styles.missionBox} ${styles.missionBoxRight}`}>
              <span className={styles.boxLabel}>Values</span>
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

      {/* ---- Our work ---- */}
      <section className={styles.section} id="work">
        <div className={styles.wrap}>
          <div className={styles.band}>
            <h2 className={styles.bandTitle}>Our work</h2>
            <a className={styles.bandBtn} href="#opportunities">
              View all projects →
            </a>
          </div>
          <div className={styles.panel}>
            <p className={styles.panelLede}>
              We build the field through public-facing projects — a podcast,
              events, an introductory guide, and a newsletter — several run in
              collaboration with researchers and organisations across digital
              minds.
            </p>
          </div>
          <div className={styles.workGrid}>
            {PROJECTS.map((p) => {
              const barLabel = p.href
                ? `${new URL(p.href).hostname.replace(/^www\./, "")} ↗`
                : "More information";
              return (
                <div className={styles.workItem} key={p.title}>
                  <div className={styles.workBody}>
                    <span className={styles.workType}>{p.type}</span>
                    <h3 className={styles.workTitle}>{p.title}</h3>
                    <p className={styles.workDesc}>{p.desc}</p>
                  </div>
                  {p.href ? (
                    <a
                      className={styles.workBar}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {barLabel}
                    </a>
                  ) : (
                    <span className={styles.workBar}>{barLabel}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---- Collaborators ---- */}
      <section className={styles.section} id="collaborators">
        <div className={styles.wrap}>
          <div className={styles.band}>
            <h2 className={styles.bandTitle}>Collaborators</h2>
            <span className={styles.bandMeta}>Across the field</span>
          </div>
          <div className={styles.panel}>
            <p className={styles.panelLede}>
              Much of our work is carried out in collaboration with researchers
              and organisations across the field of digital minds.
            </p>
          </div>
          <div className={styles.collabList}>
            {COLLABORATORS.map((c, i) => (
              <div className={styles.collabRow} key={c}>
                <span className={styles.collabNum}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.collabName}>{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Get involved ---- */}
      <section className={styles.section} id="opportunities">
        <div className={styles.wrap}>
          <div className={styles.band}>
            <h2 className={styles.bandTitle}>Get involved</h2>
            <span className={styles.bandMeta}>Opportunities</span>
          </div>
          <div className={styles.panel}>
            <p className={styles.panelLede}>
              If this resonates with you, there are several ways to take part in
              our work and join the community.
            </p>
          </div>
          <div className={styles.oppGrid}>
            {OPPORTUNITIES.map((o) => (
              <div className={styles.oppCard} key={o.title}>
                <h3 className={styles.oppTitle}>{o.title}</h3>
                <p className={styles.oppBody}>{o.body}</p>
                <a className={styles.oppCta} href={o.href}>
                  {o.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
