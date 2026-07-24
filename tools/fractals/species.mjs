// The "family" of fractals. Each species is a generator (rng, spread) -> genome.
//
//   spread = 0   -> the clean canonical form (the family anchor)
//   spread = 1   -> the seed is free to wander far from the anchor
//
// Continuity comes from the fixed structure of each species + the shared renderer
// + the shared palette. Variation comes from the seed (and the spread dial).
//
// A genome is { maps:[{a,b,c,d,e,f,w}], nl:{type,amount} } where each map is the
// affine  x' = a*x + b*y + c ,  y' = d*x + e*y + f  with selection weight w,
// and nl is an optional non-linear "variation" applied after the affine.

import { mulberry32, hashSeed } from './rng.mjs';

// Build a similarity map (uniform scale s, rotation rot, translation tx,ty).
function sim(rot, s, tx, ty, w) {
  const c = Math.cos(rot) * s;
  const sn = Math.sin(rot) * s;
  return { a: c, b: -sn, c: tx, d: sn, e: c, f: ty, w: w == null ? 1 : w };
}

// --- hexaflake: the original reference. Six copies in hexagonal symmetry. ---
function hexaflake(R, spread) {
  const N = 6;
  const baseR = 0.667;
  const baseScale = 0.333;
  const twist = R() * Math.PI * 2 * spread;
  const arm = (R() * 2 - 1) * 1.1 * spread; // how much each copy spins outward
  const maps = [];
  for (let i = 0; i < N; i++) {
    const ang = (Math.PI * 2 * i) / N + twist;
    const s = baseScale * (1 + (R() * 2 - 1) * 0.16 * spread);
    const rot = arm * ang + (R() * 2 - 1) * 0.35 * spread + twist * 0.2;
    maps.push(sim(rot, s, baseR * Math.cos(ang), baseR * Math.sin(ang), s * s));
  }
  return { maps, fit: 'cover', nl: { type: 'swirl', amount: R() * 0.16 * spread } };
}

// --- dust: generalised n-fold fractal dust (3..7 arms). Wider structural range. ---
function dust(R, spread) {
  const N = 3 + Math.floor(R() * 5);
  const baseR = 0.5 + R() * 0.3;
  const baseScale = (1 / Math.sqrt(N)) * (0.78 + R() * 0.12); // stay contractive
  const twist = R() * Math.PI * 2;
  const arm = (R() * 2 - 1) * 1.3 * spread;
  const maps = [];
  for (let i = 0; i < N; i++) {
    const ang = (Math.PI * 2 * i) / N + twist;
    const s = baseScale * (1 + (R() * 2 - 1) * 0.18 * spread);
    const rot = arm * ang + (R() * 2 - 1) * 0.5 * spread;
    maps.push(sim(rot, s, baseR * Math.cos(ang), baseR * Math.sin(ang), s * s));
  }
  return { maps, fit: 'cover', nl: { type: 'swirl', amount: R() * 0.18 * spread } };
}

// --- fern: Barnsley fern, gently perturbed. Naturally vertical / portrait. ---
function fern(R, spread) {
  const j = (amt) => (R() * 2 - 1) * amt * spread;
  const maps = [
    { a: 0, b: 0, c: 0, d: 0, e: 0.16 + j(0.02), f: 0, w: 0.01 },
    { a: 0.85 + j(0.03), b: 0.04 + j(0.03), c: 0, d: -0.04 + j(0.03), e: 0.85 + j(0.03), f: 1.6, w: 0.85 },
    { a: 0.2 + j(0.05), b: -0.26 + j(0.05), c: 0, d: 0.23 + j(0.05), e: 0.22 + j(0.05), f: 1.6, w: 0.07 },
    { a: -0.15 + j(0.05), b: 0.28 + j(0.05), c: 0, d: 0.26 + j(0.05), e: 0.24 + j(0.05), f: 0.44, w: 0.07 },
  ];
  return { maps, fit: 'contain', nl: { type: 'none', amount: 0 } };
}

// --- dragon: Heighway dragon (two maps), perturbed. Swirling self-similar sweeps. ---
function dragon(R, spread) {
  const j = () => (R() * 2 - 1) * 0.05 * spread; // jitter linear parts only
  const maps = [
    { a: 0.5 + j(), b: -0.5 + j(), c: 0, d: 0.5 + j(), e: 0.5 + j(), f: 0, w: 1 },
    { a: -0.5 + j(), b: -0.5 + j(), c: 1, d: 0.5 + j(), e: -0.5 + j(), f: 0, w: 1 },
  ];
  return { maps, fit: 'contain', nl: { type: 'swirl', amount: R() * 0.1 * spread } };
}

// --- crystal: flame-style. Ring-placed maps + a light spherical variation => curvy,
// organic petals. Ring placement (vs. random offsets) keeps it from collapsing to a point. ---
function crystal(R, spread) {
  const N = 3;
  const baseR = 0.8 + R() * 0.4;
  const twist = R() * Math.PI * 2;
  const maps = [];
  for (let i = 0; i < N; i++) {
    const ang = (Math.PI * 2 * i) / N + twist;
    const s = 0.5 + R() * 0.12;
    const rot = ang + (R() * 2 - 1) * 0.6 * (0.4 + spread);
    maps.push(sim(rot, s, baseR * Math.cos(ang), baseR * Math.sin(ang), 1));
  }
  return { maps, fit: 'contain', nl: { type: 'spherical', amount: 0.18 + R() * 0.22 } };
}

export const speciesNames = ['hexaflake', 'fern', 'dragon', 'dust', 'crystal'];
const generators = { hexaflake, fern, dragon, dust, crystal };

export function makeGenome(name, seed, spread = 0.55) {
  // xor with a constant so genome RNG and point-scatter RNG don't share a stream.
  const R = mulberry32(hashSeed(seed) ^ 0x9e3779b9);
  const gen = generators[name] || hexaflake;
  const g = gen(R, spread);
  let acc = 0;
  const cum = [];
  for (const m of g.maps) {
    acc += m.w == null ? 1 : m.w;
    cum.push(acc);
  }
  g.cum = cum;
  g.total = acc;
  g.species = name;
  if (!g.nl) g.nl = { type: 'swirl', amount: 0 };
  return g;
}
