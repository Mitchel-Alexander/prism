// The chaos game + log-density tone mapping. Isomorphic: returns a raw RGBA
// buffer that Node hands to sharp, or the browser draws via putImageData.

import { mulberry32, hashSeed } from './rng.mjs';
import { palettes, bgColors } from './palettes.mjs';

function lerp3(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

function lerpStops(stops, v) {
  if (v < 0) v = 0;
  else if (v > 1) v = 1;
  const n = stops.length - 1;
  const f = v * n;
  let i = Math.floor(f);
  if (i >= n) i = n - 1;
  return lerp3(stops[i], stops[i + 1], f - i);
}

// Non-linear "variation" applied after the affine map (the flame trick).
function applyNL(type, amt, x, y) {
  if (amt <= 0 || type === 'none') return [x, y];
  if (type === 'spherical') {
    const r2 = x * x + y * y || 1e-9;
    return [x * (1 - amt) + (x / r2) * amt, y * (1 - amt) + (y / r2) * amt];
  }
  if (type === 'sinusoidal') {
    return [x * (1 - amt) + Math.sin(x) * amt, y * (1 - amt) + Math.sin(y) * amt];
  }
  // swirl
  const r2 = x * x + y * y;
  const s = Math.sin(r2 * 1.4);
  const c = Math.cos(r2 * 1.4);
  return [x * (1 - amt) + (x * c - y * s) * amt, y * (1 - amt) + (x * s + y * c) * amt];
}

// opts: { genome, width, height, seed, iterations?, gamma?, palette?, background?, zoom?, flip? }
export function renderToRGBA(opts) {
  const { genome, width: W, height: H } = opts;
  const seed = opts.seed != null ? opts.seed : 1;
  const gamma = opts.gamma || 2.2;
  const paletteName = opts.palette || 'prism';
  const background = opts.background || 'ink';
  const zoom = opts.zoom || 1;
  const flip = opts.flip !== false;
  // 'cover' fills the frame (bleeds off-edge, great for the symmetric snowflakes);
  // 'contain' fits the whole form centred with margin (safer for wide/irregular forms).
  const fit = opts.fit || genome.fit || 'contain';

  const hist = new Float32Array(W * H);
  const R = mulberry32(hashSeed(seed) ^ 0xc2b2ae35);
  const maps = genome.maps;
  const N = maps.length;
  const cum = genome.cum;
  const total = genome.total;
  const nlType = genome.nl.type;
  const nlAmt = genome.nl.amount;

  let x = R() * 2 - 1;
  let y = R() * 2 - 1;

  function step() {
    const r = R() * total;
    let i = 0;
    while (i < N - 1 && cum[i] < r) i++;
    const m = maps[i];
    let nx = m.a * x + m.b * y + m.c;
    let ny = m.d * x + m.e * y + m.f;
    if (nlAmt > 0) {
      const p = applyNL(nlType, nlAmt, nx, ny);
      nx = p[0];
      ny = p[1];
    }
    if (!(isFinite(nx) && isFinite(ny))) {
      nx = R() * 2 - 1;
      ny = R() * 2 - 1;
    }
    x = nx;
    y = ny;
  }

  // settle onto the attractor before measuring/plotting
  for (let i = 0; i < 30; i++) step();

  // auto-frame: probe the bounds, then fit (cover) into the canvas
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
  for (let i = 0; i < 40000; i++) {
    step();
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  const spanX = maxX - minX || 1;
  const spanY = maxY - minY || 1;
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const fitScale = fit === 'cover' ? Math.max(W / spanX, H / spanY) : Math.min(W / spanX, H / spanY);
  const pad = fit === 'cover' ? 1.02 : 0.92; // cover bleeds slightly; contain leaves a margin
  const scale = fitScale * pad * zoom;
  const offX = W / 2 - cx * scale;
  const offY = H / 2 - cy * scale;

  const iters = opts.iterations || Math.round(W * H * 5);
  for (let i = 0; i < iters; i++) {
    step();
    const px = (x * scale + offX) | 0;
    let py = (y * scale + offY) | 0;
    if (flip) py = H - py;
    if (px >= 0 && px < W && py >= 0 && py < H) hist[py * W + px]++;
  }

  // tone map: log of hit-count, normalised, gamma-corrected
  let mx = 0;
  for (let i = 0; i < hist.length; i++) if (hist[i] > mx) mx = hist[i];
  const lm = mx > 0 ? 1 / Math.log(mx + 1) : 0;

  let stops = (palettes[paletteName] || palettes.prism).map((s) => s.slice());
  const transparent = background === 'transparent';
  if (!transparent && bgColors[background]) stops[0] = bgColors[background].slice();
  const dustStops = transparent ? stops.slice(1) : stops;

  const ig = 1 / gamma;
  const rgba = new Uint8ClampedArray(W * H * 4);
  for (let i = 0; i < hist.length; i++) {
    const h = hist[i];
    const v = h > 0 ? Math.pow(Math.log(h + 1) * lm, ig) : 0;
    const j = i << 2;
    if (transparent) {
      const col = lerpStops(dustStops, v);
      rgba[j] = col[0];
      rgba[j + 1] = col[1];
      rgba[j + 2] = col[2];
      rgba[j + 3] = Math.round(255 * Math.min(1, Math.pow(v, 0.9)));
    } else {
      const col = lerpStops(stops, v);
      rgba[j] = col[0];
      rgba[j + 1] = col[1];
      rgba[j + 2] = col[2];
      rgba[j + 3] = 255;
    }
  }
  return { width: W, height: H, rgba };
}
