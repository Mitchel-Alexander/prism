import styles from "./Hero.module.css";
import { NavMenu } from "./NavMenu";

// Deterministic PRNG so the generated mosaic is identical on the server and on
// the client (no hydration mismatch — must not use Math.random here).
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

// Smooth, deterministic 2-octave value noise — used to spread the shimmer in
// organic, branching fronts (its iso-contours are the cascade shapes).
function makeNoise(seed: number) {
  const hash = (xi: number, yi: number) => {
    let h =
      (Math.imul(xi | 0, 374761393) +
        Math.imul(yi | 0, 668265263) +
        Math.imul(seed, 1274126177)) |
      0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
  const sstep = (t: number) => t * t * (3 - 2 * t);
  const sample = (x: number, y: number) => {
    const xi = Math.floor(x);
    const yi = Math.floor(y);
    const u = sstep(x - xi);
    const v = sstep(y - yi);
    const a = hash(xi, yi);
    const b = hash(xi + 1, yi);
    const c = hash(xi, yi + 1);
    const d = hash(xi + 1, yi + 1);
    return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
  };
  return (x: number, y: number) =>
    sample(x, y) * 0.65 + sample(x * 2.3 + 11, y * 2.3 + 7) * 0.35;
}

// Each diamond cell is split into four triangles; each triangle is its own
// <polygon> so it can shimmer/move independently. Colours are blue-only.
function Mosaic() {
  const rnd = mulberry32(20260623);
  const noise = makeNoise(7);
  const COLS = 27;
  const ROWS = 16;
  const T = 56;
  const W = COLS * T;
  const H = ROWS * T;
  const tiles = [];
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
        const animate = rnd() < 0.4;
        const hue = Math.round(214 + rnd() * 14); // blue only
        const sat = Math.round(34 + rnd() * 28);
        const light = animate
          ? Math.round(62 + rnd() * 18) // ripple tiles glint a lighter blue
          : Math.round(30 + rnd() * 30);
        const op = (animate ? 0.28 + rnd() * 0.08 : 0.08 + rnd() * 0.1).toFixed(3);
        // Delay sampled from a smooth noise field → activation spreads in organic,
        // branching fronts (neuronal-cascade-like) rather than straight waves.
        const mx = (ax + bx + cx) / 3;
        const my = (ay + by + cy) / 3;
        const phase = noise(mx / 150, my / 150) * 16 + (mx / W) * 3.2;
        tiles.push(
          <polygon
            key={k++}
            points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
            fill={`hsl(${hue} ${sat}% ${light}%)`}
            fillOpacity={op}
            className={animate ? styles.shimmer : undefined}
            style={animate ? { animationDelay: `${(-phase).toFixed(2)}s` } : undefined}
          />,
        );
      }
    }
  }
  return (
    <svg
      className={styles.mosaic}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g stroke="#ffffff" strokeOpacity="0.04" strokeWidth="1">
        {tiles}
      </g>
    </svg>
  );
}

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={styles.glow} />
        <span className={styles.glow2} />
      </div>
      <Mosaic />
      <div className={styles.depth} aria-hidden="true" />
      <div className={styles.grain} aria-hidden="true" />

      <header className={styles.nav}>
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo-prism-white.png`}
          alt="PRISM — Partnership for Research Into Sentient Machines"
          className={styles.logo}
          width={138}
          height={30}
        />
        <NavMenu />
      </header>

      <div className={styles.center}>
        <h1 className={styles.headline}>
          Partnership for Research Into Sentient Machines
        </h1>
        <img
          className={styles.crest}
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo-prism-mark-white.png`}
          alt="PRISM"
          width={74}
          height={48}
        />
        <a className={styles.hiring} href="#opportunities">
          <span className={styles.hiringDot} aria-hidden="true" />
          We&rsquo;re hiring
          <span className={styles.hiringArrow} aria-hidden="true">
            →
          </span>
        </a>
      </div>

      <div className={styles.chevron} aria-hidden="true">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 8l6 6 6-6" />
        </svg>
      </div>
    </section>
  );
}
