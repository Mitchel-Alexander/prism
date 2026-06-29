import styles from "./HomeContent.module.css";

// Static export: prefix public asset URLs with the project base path (empty in dev).
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* ---------------------------------- data ---------------------------------- */

// Mission "How we do this" — the dark-navy inset; bold lead + a full sentence.
const HOW = [
  { lead: "Awareness building", rest: "We communicate digital minds topics to non-expert audiences, encouraging thoughtful public engagement with the questions the field raises." },
  { lead: "Developing talent", rest: "We help the field grow by identifying and developing exceptional people." },
  { lead: "Convening the field", rest: "We create the spaces (events, workshops, and shared resources) where researchers and practitioners can connect and do their best work." },
];

// All six "Our work" tiles, in display order across two rows of three. An external
// `href` (http…) opens in a new tab and the dark bar shows the hostname; otherwise the
// bar reads "More information". The Online Course href is a placeholder until confirmed.
const CARDS: {
  type: string;
  title: string;
  desc: string;
  href?: string;
  img: string;
}[] = [
  {
    type: "Guide",
    title: "Beginner's Guide to Digital Minds",
    desc: "An accessible, in-depth guide for newcomers to the field of digital minds. It sets out structured reading across many of the key questions, alongside regularly updated lists of events and opportunities.",
    href: "https://digitalminds.guide/",
    img: "/card-guide.jpg",
  },
  {
    type: "Newsletter",
    title: "Digital Minds Newsletter",
    desc: "A quarterly newsletter following developments in digital minds research, policy, and public debate.",
    href: "https://www.digitalminds.news/",
    img: "/card-newsletter.jpg",
  },
  {
    type: "Fellowship",
    title: "Digital Minds Fellowship",
    desc: "An intensive residential programme for people aiming to contribute to research on the moral status and welfare of AI systems, and the science behind those questions. Run by Cambridge Digital Minds with Rethink Priorities and PRISM, it gives participants deep engagement with the relevant technical and philosophical debates, alongside strategy and hands-on project development to support future high-impact contributions.",
    href: "https://digitalminds.cam/fellowship",
    img: "/edu-fellowship.jpg",
  },
  {
    type: "Scholarship",
    title: "Neuromatch AI Sentience Scholarship",
    desc: "A six-month, part-time, remote programme supporting early-career researchers working on the science and ethics of AI minds. Run by Neuromatch with PRISM and partners, it pairs each scholar with a mentor for a funded research project alongside interdisciplinary training.",
    href: "https://neuromatch.io/ai-sentience-scholars",
    img: "/edu-scholarship.jpg",
  },
  {
    type: "Course",
    title: "Digital Minds Online Course",
    desc: "A facilitated introductory course, running over eight weeks for a quarterly cohort of 100 participants, that provides an overview of the core concepts and debates in digital minds. The content can also be followed independently at any time on BlueDot Impact's website.",
    href: "#",
    img: "/edu-course.jpg",
  },
  {
    type: "Events",
    title: "Expert Workshops",
    desc: "Regular workshops that bring the field's researchers together to sharpen thinking and seed new collaborations.",
    img: "/card-events.jpg",
  },
];

// Featured podcast episodes, shown inside the dark "Our work" bar. Each links to
// the episode on YouTube (opens in a new tab); images are web-sized long-exposure
// abstracts in /public.
const EPISODES = [
  {
    title: "Exotic Minds and the Design Policies for Conscious AI",
    guest: "Eric Schwitzgebel",
    img: "/episode-1.jpg",
    href: "https://www.youtube.com/watch?v=bddHP58lTHA",
  },
  {
    title: "Metacognition, Neuroscience, and Tests for AI Consciousness",
    guest: "Megan Peters",
    img: "/ep-blue.jpg",
    href: "https://www.youtube.com/watch?v=aHeVicEFozY",
  },
  {
    title: "A Future with Digital Minds? Expert Estimates and Societal Response",
    guest: "Lucius Caviola",
    img: "/ep-dark.jpg",
    href: "https://www.youtube.com/watch?v=r03bVSP44h8",
  },
];

// Confirmed partners only (per Mitchel 2026-06-26); add the rest as confirmed.
const PARTNERS = [
  { name: "Cambridge Digital Minds", logo: "/partner-cdm.png" },
  { name: "Neuromatch", logo: "/partner-neuromatch.png" },
];

// PRISM's stated values — rendered "<lead>. <rest>".
const VALUES = [
  { lead: "Rigour", rest: "We promote the highest standards of inquiry and debate." },
  { lead: "Humility", rest: "We hold our own views loosely, and take seriously the people who think we are wrong." },
  { lead: "Compassion", rest: "We consider the wellbeing of every entity our work touches." },
  { lead: "Moral seriousness", rest: "We treat the potential importance of our work with the gravity it requires." },
  { lead: "Collaboration", rest: "We work to encourage conversation between diverse communities and perspectives." },
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
    body: "We're a small, growing non-profit scaling our research, operations, and communications. If you want to help build the field of digital minds research, we'd love to hear from you, whether or not there's a role currently advertised.",
    cta: "See our open roles",
    href: "#",
  },
];

// One "Our work" card tile. An external href (http…) opens in a new tab and the bar
// shows the host; otherwise the bar reads "More information".
function Card({ c }: { c: (typeof CARDS)[number] }) {
  const external = !!c.href && c.href.startsWith("http");
  const host = external
    ? new URL(c.href as string).hostname.replace(/^www\./, "")
    : null;
  return (
    <div className={styles.card}>
      <img className={styles.cardImg} src={`${BASE}${c.img}`} alt="" />
      <div className={styles.cardBody}>
        <span className={styles.cardType}>{c.type}</span>
        <h3 className={styles.cardTitle}>{c.title}</h3>
        <p className={styles.cardDesc}>{c.desc}</p>
      </div>
      {external ? (
        <a
          className={styles.cardBar}
          href={c.href}
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
                PRISM is a non-profit helping to build the field of digital minds
              </h2>
              <p className={styles.missionBody}>
                We support research and educational initiatives preparing
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
          {/* "Our work" header merged into the featured podcast tile — one flat
              dark-navy module, two columns (header | podcast). */}
          <div className={styles.featured}>
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

            {/* Featured episodes — landscape letterbox strips inside the dark
                bar; each opens the episode on YouTube in a new tab. */}
            <div className={styles.episodes}>
              <span className={styles.kickerDark}>Featured episodes</span>
              <div className={styles.episodeGrid}>
                {EPISODES.map((ep) => (
                  <a
                    className={styles.episodeCard}
                    href={ep.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    key={ep.href}
                  >
                    <div className={styles.episodeImgWrap}>
                      <img
                        className={styles.episodeImg}
                        src={`${BASE}${ep.img}`}
                        alt=""
                      />
                    </div>
                    <div className={styles.episodeMeta}>
                      <h4 className={styles.episodeTitle}>{ep.title}</h4>
                      <span className={styles.episodeGuest}>{ep.guest}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Six "Our work" tiles, two rows of three (CARDS order). */}
          <div className={styles.cards}>
            {CARDS.slice(0, 3).map((c) => (
              <Card c={c} key={c.title} />
            ))}
          </div>
          <div className={styles.cards}>
            {CARDS.slice(3).map((c) => (
              <Card c={c} key={c.title} />
            ))}
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
              <p className={styles.peopleIntro}>
                Meet the people behind our work.
              </p>
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
                      <span className={styles.personName}>{m.name}</span>
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
