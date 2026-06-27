import type { ReactElement } from "react";
import styles from "./HomeContent.module.css";

// Static export: prefix public asset URLs with the project base path (empty in dev).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* ---------------------------------- data ---------------------------------- */

// Mission "How we do this" — the dark-navy inset; bold lead + a full sentence.
const HOW = [
  { lead: "Awareness building", rest: "We bring digital minds to a wider audience, encouraging thoughtful public engagement with the questions the field raises." },
  { lead: "Developing talent", rest: "We help newcomers find their way in and grow the field's capacity by identifying and developing exceptional people." },
  { lead: "Convening the field", rest: "We create the spaces — events, workshops, and shared resources — where researchers and practitioners can connect and do their best work." },
];

// Project cards below the featured podcast bar. An external `href` (http…) opens in a
// new tab and the dark bar shows the hostname; otherwise the bar reads "More information".
const PROJECTS: {
  type: string;
  title: string;
  desc: string;
  href?: string;
  img?: string;
}[] = [
  {
    type: "Guide",
    title: "Beginner's Guide to Digital Minds",
    desc: "An accessible, in-depth guide to the science and ethics of digital minds. It gathers the key questions, evidence, and arguments into one clear resource for newcomers and experts alike.",
    href: "https://digitalminds.guide/",
    img: "/card-guide.jpg",
  },
  {
    type: "Newsletter",
    title: "Digital Minds Newsletter",
    desc: "A regular newsletter tracking developments in digital minds research, policy, and public debate — keeping the community current on a fast-moving field.",
    href: "https://www.digitalminds.news/",
    img: "/card-newsletter.jpg",
  },
  {
    type: "Events",
    title: "Expert Workshops",
    desc: "We run regular workshops that bring the field's researchers together to sharpen thinking and seed new collaborations.",
    img: "/card-events.jpg",
  },
];

// Featured podcast episodes, shown inside the dark "Our work" bar. TEMPLATE
// placeholders — the real episode titles / guests / links get filled in once
// chosen; images are web-sized long-exposure photos in /public (episode-1..3).
const EPISODES = [
  { no: "01", title: "Episode title", guest: "Guest name", img: "/episode-1.jpg", href: "#" },
  { no: "02", title: "Episode title", guest: "Guest name", img: "/episode-2.jpg", href: "#" },
  { no: "03", title: "Episode title", guest: "Guest name", img: "/episode-3.jpg", href: "#" },
];

// "Education" block in Our work — programs PRISM convenes / supports operationally.
const EDUCATION = [
  { name: "Digital Minds Fellowship", href: "https://digitalminds.cam/fellowship" },
  { name: "Neuromatch AI Sentience Scholarship", href: "https://neuromatch.io/ai-sentience-scholars" },
];

// Confirmed partners only (per Mitchel 2026-06-26); add the rest as confirmed.
const PARTNERS = [
  { name: "Cambridge Digital Minds", logo: "/partner-cdm.png" },
  { name: "Neuromatch", logo: "/partner-neuromatch.png" },
];

// PRISM's stated values — rendered "<lead>. <rest>".
const VALUES = [
  { lead: "Rigour", rest: "We promote the highest standards of inquiry and discussion." },
  { lead: "Humility", rest: "We admit our uncertainty, treat unfamiliar ideas seriously and stay willing to change our minds." },
  { lead: "Compassion", rest: "We care about the wellbeing of every entity our work might affect." },
  { lead: "Moral seriousness", rest: "We treat the stakes of our situation with the gravity it requires." },
  { lead: "Collaboration", rest: "We work across disciplines and share our thinking openly." },
];

// "Who we are" — three groups of people (name + role / affiliation).
const TEAM = [
  { name: "Will Millership", role: "CEO" },
  { name: "Mitch Alexander", role: "Special Projects" },
  { name: "Güney Ulaş Türker", role: "Field Building" },
  { name: "Ria Viswanathan", role: "Field Building and Research" },
];

// One combined advisors + trustees list (per Will, confirmed by Lucius), placed
// below Team as a grid; trustees carry a "(trustee)" tag. Ordered by surname.
// NB Lucius Caviola stays listed while the site is circulated privately — REMOVE
// before the public launch. New advisors (Jeff / Patrick / Andreas / Rosie /
// Winnie) to be added once full names + affiliations are confirmed.
const ADVISORS: { name: string; role: string; trustee?: boolean }[] = [
  { name: "Cameron Berg", role: "Reciprocal Research", trustee: true },
  { name: "Lucius Caviola", role: "University of Cambridge" },
  { name: "Calum Chace", role: "Conscium", trustee: true },
  { name: "Radhika Chadwick", role: "Nisai", trustee: true },
  { name: "Karl Friston", role: "UCL" },
  { name: "Nicholas Humphrey", role: "London School of Economics" },
  { name: "Arvo Muñoz Morán", role: "Rethink Priorities", trustee: true },
  { name: "Megan Peters", role: "UCI / UCL" },
  { name: "Susan Schneider", role: "Florida Atlantic University" },
  { name: "Henry Shevlin", role: "University of Cambridge" },
  { name: "Mark Solms", role: "University of Cape Town" },
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
          <div className={styles.twoTone}>
            <div className={styles.missionLead}>
              <h2 className={styles.missionHeading}>
                Preparing society for digital minds
              </h2>
              <p className={styles.missionBody}>
                PRISM is a non-profit helping to build the field of digital
                minds. We support research and educational initiatives preparing
                society for the challenges posed by AI consciousness, digital
                minds, and AI moral status.
              </p>
            </div>
            {/* Dark-navy inset — "How we do this" (replaces the old "Our aims"). */}
            <div className={styles.how}>
              <span className={styles.kickerDark}>How we do this</span>
              <div className={styles.howList}>
                {HOW.map((h) => (
                  <div className={styles.howItem} key={h.lead}>
                    <p className={styles.howText}>
                      <strong>{h.lead}.</strong> {h.rest}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== OUR WORK ===================== */}
      <section id="work" className={styles.work}>
        <div className={styles.flow}>
          {/* "Our work" header merged into the featured podcast tile — one dark
              module, two columns (header | podcast) on the shared mosaic. */}
          <div className={styles.featured}>
            <FeatureMosaic />
            <div className={styles.featuredRow}>
              <div className={styles.featuredIntro}>
                <h2 className={styles.title}>Our work</h2>
                <p className={styles.workIntro}>
                  We build the infrastructure a young field needs: helping
                  newcomers orient themselves, and keeping researchers and
                  practitioners connected and collaborating.
                </p>
              </div>
              <div className={styles.featuredText}>
                <span className={styles.kickerDark}>Podcast</span>
                <h3 className={styles.featuredTitle}>Exploring Machine Consciousness</h3>
                <p className={styles.featuredBody}>
                  Our podcast brings leading thinkers in philosophy, cognitive
                  science, and AI to a curious general audience. Each episode
                  explores pressing issues in digital minds and AI consciousness.
                </p>
                <a className={`${styles.btnWhite} ${styles.btnFeatured}`} href="#">
                  Listen to every episode →
                </a>
              </div>
            </div>

            {/* Featured episodes — three image tiles inside the dark bar.
                TEMPLATE: swap in the chosen episodes (title / guest / link), and
                reorder the images if needed, once episodes are selected. */}
            <div className={styles.episodes}>
              <span className={styles.kickerDark}>Featured episodes</span>
              <div className={styles.episodeGrid}>
                {EPISODES.map((ep) => (
                  <a className={styles.episodeCard} href={ep.href} key={ep.no}>
                    <img
                      className={styles.episodeImg}
                      src={`${BASE}${ep.img}`}
                      alt=""
                    />
                    <div className={styles.episodeMeta}>
                      <span className={styles.episodeNo}>Episode {ep.no}</span>
                      <h4 className={styles.episodeTitle}>{ep.title}</h4>
                      <span className={styles.episodeGuest}>{ep.guest}</span>
                    </div>
                  </a>
                ))}
              </div>
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
                  {p.img ? (
                    <img className={styles.cardImg} src={`${BASE}${p.img}`} alt="" />
                  ) : (
                    <div className={styles.cardImg} aria-hidden="true" />
                  )}
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

          {/* Education — programs PRISM convenes / supports */}
          <div className={styles.eduPanel}>
            <span className={styles.kicker}>Education</span>
            <p className={styles.eduIntro}>
              We partner to convene and provide operational support to programs
              that develop the field's next generation of talent, including:
            </p>
            <div className={styles.eduList}>
              {EDUCATION.map((e) => (
                <a
                  className={styles.eduRow}
                  key={e.name}
                  href={e.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className={styles.eduName}>{e.name}</span>
                  <span className={styles.eduLink} aria-hidden="true">
                    ↗
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PARTNERSHIPS ===================== */}
      {/* Two-tone, colours swapped vs Mission: dark statement | light org list. */}
      <section id="partnerships" className={styles.collab}>
        <div className={styles.flow}>
          <div className={`${styles.twoTone} ${styles.twoToneJoined}`}>
            <div className={styles.pStatement}>
              <h2 className={styles.missionHeading}>Partnerships</h2>
              <p className={styles.missionBody}>
                We build the field together, collaborating with researchers,
                institutes, and organisations advancing the science and ethics
                of digital minds.
              </p>
            </div>
            <div className={styles.pOrgs}>
              <span className={styles.kicker}>Our collaborators</span>
              <div className={styles.pOrgsList}>
                {PARTNERS.map((p) => (
                  <div className={styles.pOrgItem} key={p.name}>
                    <img
                      className={styles.pOrgLogo}
                      src={`${BASE}${p.logo}`}
                      alt=""
                    />
                    <p className={styles.pOrgName}>{p.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== VALUES ===================== */}
      <section id="values" className={styles.values}>
        <div className={styles.flow}>
          <div className={styles.valuesStrip}>
            <span className={styles.kicker}>Values</span>
            <p className={styles.valuesLede}>
              The commitments that guide how we work.
            </p>
            <div className={styles.valuesGrid}>
              {VALUES.map((v) => (
                <p className={styles.value} key={v.lead}>
                  <strong>{v.lead}.</strong> {v.rest}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHO WE ARE ===================== */}
      {/* Dark "Who we are" header joined to the light team grid in one block. */}
      <section id="people" className={styles.people}>
        <div className={styles.peopleWrap}>
          <div className={styles.peopleBlock}>
            <div className={styles.peopleHead}>
              <h2 className={styles.missionHeading}>Who we are</h2>
            </div>
            <div className={styles.peopleBody}>
              <div className={styles.peopleSection}>
                <span className={styles.peopleKicker}>Team</span>
                <div className={styles.peopleGridRow}>
                  {TEAM.map((m) => (
                    <div className={styles.person} key={m.name}>
                      <span className={styles.personName}>{m.name}</span>
                      <span className={styles.personRole}>{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.peopleSection}>
                <span className={styles.peopleKicker}>Advisors &amp; Trustees</span>
                <div className={styles.peopleGridRow}>
                  {ADVISORS.map((m) => (
                    <div className={styles.person} key={m.name}>
                      <span className={styles.personName}>
                        {m.name}
                        {m.trustee && (
                          <span className={styles.trusteeTag}> (trustee)</span>
                        )}
                      </span>
                      <span className={styles.personRole}>{m.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== GET INVOLVED ===================== */}
      <section id="opportunities" className={styles.ctaSection}>
        <div className={styles.cta}>
          <div className={styles.ctaWrap}>
            <div className={styles.ctaHead}>
              <h2 className={styles.ctaTitle}>Opportunities</h2>
            </div>
            <p className={styles.ctaLede}>
              If this resonates with you, there are several ways to take part in
              our work and join the community.
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
