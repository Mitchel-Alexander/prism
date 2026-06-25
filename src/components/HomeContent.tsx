import type { ReactElement } from "react";
import styles from "./HomeContent.module.css";

/* ---------------------------------- data ---------------------------------- */

// Mission "Our aims" — numbered, one line each.
const STEPS = [
  { n: "1", lead: "Understand", rest: "if AI systems could be conscious or hold moral status." },
  { n: "2", lead: "Connect", rest: "the field across philosophy, cognitive science, and AI." },
  { n: "3", lead: "Prepare", rest: "society and institutions for the minds we may create." },
];

// DRAFT — replace with PRISM's actual stated values.
const VALUES = [
  { lead: "Rigour", rest: "we follow the evidence and reason carefully, even on hard questions." },
  { lead: "Humility", rest: "we hold uncertainty honestly and avoid overclaiming about machine minds." },
  { lead: "Moral seriousness", rest: "we take the possibility of digital suffering and moral status seriously." },
  { lead: "Collaboration", rest: "we build across disciplines and institutions, not in isolation." },
];

// Project cards below the featured podcast bar. An external `href` (http…) opens in a
// new tab and the dark bar shows the hostname; otherwise the bar reads "More information".
const PROJECTS: { type: string; title: string; desc: string; href?: string }[] = [
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

// DRAFT — confirm names/phrasing before launch.
const COLLABORATORS = [
  "Cambridge Digital Minds",
  "University of Oxford",
  "NYU Center for Mind, Ethics & Policy",
  "Eleos AI Research",
];

// CTA hrefs are placeholders ("#") until the real destinations exist.
const OPPORTUNITIES = [
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

/* -------- generative low-poly "prism facets" mosaic (static, SSR-safe) --------
   Same motif as the hero, darker and non-animated. Deterministic (seeded PRNG) so the
   server render is identical every time — no client JS, no hydration mismatch. */
function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function FeatureMosaic() {
  const rnd = mulberry32(99173);
  const COLS = 24;
  const ROWS = 8;
  const T = 56;
  const W = COLS * T;
  const H = ROWS * T;
  const tris: ReactElement[] = [];
  let k = 0;
  for (let gy = 0; gy < ROWS; gy++) {
    for (let gx = 0; gx < COLS; gx++) {
      const x0 = gx * T;
      const y0 = gy * T;
      const x1 = x0 + T;
      const y1 = y0 + T;
      const cx = x0 + T / 2;
      const cy = y0 + T / 2;
      const corners = [
        [x0, y0, x1, y0],
        [x1, y0, x1, y1],
        [x1, y1, x0, y1],
        [x0, y1, x0, y0],
      ];
      for (const [ax, ay, bx, by] of corners) {
        const r = rnd();
        const hue = Math.round(218 + rnd() * 10);
        const sat = Math.round(32 + rnd() * 16);
        let light = 5.5 + rnd() * 3;
        if (r > 0.9) light = 9.5 + rnd() * 3;
        tris.push(
          <polygon
            key={k++}
            points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
            fill={`hsl(${hue} ${sat}% ${light.toFixed(1)}%)`}
          />,
        );
      }
    }
  }
  return (
    <svg
      className={styles.featureMosaic}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="#ffffff" strokeOpacity="0.03" strokeWidth="1">
        {tris}
      </g>
    </svg>
  );
}

export function HomeContent() {
  return (
    <div className={styles.below}>
      {/* ===================== MISSION ===================== */}
      <section id="mission" className={styles.mission}>
        <div className={styles.flow}>
          <div className={styles.band}>
            <h2 className={styles.title}>Mission</h2>
            <span className={styles.bandMeta}>01 — Our mission</span>
          </div>

          <div className={styles.twoTone}>
            <div className={styles.missionLead}>
              <h3 className={styles.missionHeading}>
                Preparing society for conscious machines
              </h3>
              <p className={styles.missionBody}>
                PRISM is a non-profit building the field of digital minds research —
                readying the world for the possibility of consciousness, sentience,
                and moral status in artificial minds.
              </p>
            </div>
            <div className={styles.aims}>
              <span className={styles.kicker}>Our aims</span>
              <div className={styles.aimsList}>
                {STEPS.map((s) => (
                  <div className={styles.aim} key={s.n}>
                    <span className={styles.aimNum}>{s.n}</span>
                    <p className={styles.aimText}>
                      <strong>{s.lead}</strong> {s.rest}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.valuesStrip}>
            <span className={styles.kicker}>Values — what guides our work</span>
            <div className={styles.valuesGrid}>
              {VALUES.map((v) => (
                <p className={styles.value} key={v.lead}>
                  <strong>{v.lead}</strong> {v.rest}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== OUR WORK ===================== */}
      <section id="work" className={styles.work}>
        <div className={styles.flow}>
          <div className={styles.workHeader}>
            <div className={styles.workHeaderRow}>
              <h2 className={styles.title}>Our work</h2>
              <a className={styles.btnDark} href="#opportunities">
                View all projects →
              </a>
            </div>
            <p className={styles.workIntro}>
              We build the field through public-facing projects — a podcast, events,
              an introductory guide, and a newsletter — several run in collaboration
              with researchers and organisations across digital minds.
            </p>
          </div>

          {/* Featured podcast bar — generative mosaic behind an (optional) image + text */}
          <div className={styles.featured}>
            <FeatureMosaic />
            {/* Podcast image goes here; the mosaic shows through until one is added. */}
            <div className={styles.featuredImg} aria-hidden="true" />
            <div className={styles.featuredText}>
              <span className={styles.kickerTeal}>Podcast — featured</span>
              <h3 className={styles.featuredTitle}>Exploring Machine Consciousness</h3>
              <p className={styles.featuredBody}>
                Our podcast brings leading thinkers in philosophy, cognitive science,
                and AI to a curious general audience — each episode exploring whether,
                and how, machines might be conscious.
              </p>
              <a className={`${styles.btnWhite} ${styles.btnFeatured}`} href="#">
                More information →
              </a>
            </div>
          </div>

          {/* Project cards */}
          <div className={styles.cards}>
            {PROJECTS.map((p) => {
              const external = !!p.href && p.href.startsWith("http");
              const host = external
                ? new URL(p.href as string).hostname.replace(/^www\./, "")
                : null;
              return (
                <div className={styles.card} key={p.title}>
                  <div className={styles.cardImg} aria-hidden="true" />
                  <div className={styles.cardBody}>
                    <span className={styles.cardType}>{p.type}</span>
                    <h3 className={styles.cardTitle}>{p.title}</h3>
                    <p className={styles.cardDesc}>{p.desc}</p>
                  </div>
                  {external ? (
                    <a
                      className={styles.cardBar}
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {host}
                      <span aria-hidden="true"> ↗</span>
                    </a>
                  ) : (
                    <div className={styles.cardBar}>More information</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== COLLABORATORS ===================== */}
      <section id="collaborators" className={styles.collab}>
        <div className={styles.collabWrap}>
          <span className={styles.kickerCollab}>Collaborators — across the field</span>
          <p className={styles.collabIntro}>
            Much of our work is carried out with researchers and organisations across
            the field of digital minds.
          </p>
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

      {/* ===================== GET INVOLVED ===================== */}
      <section id="opportunities" className={styles.ctaSection}>
        <div className={styles.cta}>
          <div className={styles.ctaWrap}>
            <div className={styles.ctaHead}>
              <h2 className={styles.ctaTitle}>Get involved</h2>
              <span className={styles.kickerTeal}>Opportunities</span>
            </div>
            <p className={styles.ctaLede}>
              If this resonates with you, there are several ways to take part in our
              work and join the community.
            </p>
            <div className={styles.ctaGrid}>
              {OPPORTUNITIES.map((o) => (
                <div className={styles.ctaCard} key={o.title}>
                  <h3 className={styles.ctaCardTitle}>{o.title}</h3>
                  <p className={styles.ctaCardBody}>{o.body}</p>
                  <a className={`${styles.btnWhite} ${styles.btnCta}`} href={o.href}>
                    {o.cta} →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
