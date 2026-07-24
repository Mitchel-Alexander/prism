# PRISM fractal generator

Generative dust-fractals for the PRISM site. One algorithm, a small family of
forms, a shared palette — so the images vary while reading as a set.

It's an **iterated function system** rendered with the **chaos game**: scatter
millions of points by repeatedly applying a handful of affine maps, count the hits
per pixel, and tone-map that density through a logarithm. Dense regions glow, sparse
regions fade to dust. Each image is fully described by a compact *genome* + a *seed*,
so it's reproducible and tunable.

No new dependencies — it reuses `sharp`, which the Next site already ships.

## Workflow

1. **Pick seeds** in the browser playground (live, fast, throwaway thumbnails).
2. **Render the keepers** at full resolution with `generate.mjs`.
3. **Drop them into the site** (`public/fractals/…`) as section/hero backgrounds.

### 1. Playground

Module imports need http (not `file://`). From the repo root:

```bash
cd tools/fractals && python3 -m http.server 8000
# open http://localhost:8000/playground.html
```

Tweak species / variation / palette / background, hit **Regenerate** for a fresh
batch, and click any **seed** to copy the exact full-res command for that image.

### 2. Render full-res

```bash
# a mixed set of 12 portrait images + a contact sheet to eyeball them
node tools/fractals/generate.mjs --count 12 --preset hero --contact

# one specific image you liked in the playground
node tools/fractals/generate.mjs --species fern --seeds 482910 --palette prism --preset hero

# transparent PNGs to composite over the hero's glow
node tools/fractals/generate.mjs --species hexaflake --bg transparent --out public/fractals
```

Output (default `tools/fractals/out/`): one `.png` + one `.webp` per image, plus a
`manifest.json` recording every image's species/seed/palette for reproducibility.

## Options

| Flag | Default | Notes |
|------|---------|-------|
| `--species` | `mix` | `hexaflake`, `fern`, `dragon`, `dust`, `crystal`, `mix`, or a comma list |
| `--count` | `12` | how many images (ignored if `--seeds` given) |
| `--seeds` | — | comma list of seeds (numbers or strings) — overrides `--count` |
| `--preset` | `hero` | `hero` 1600×2400, `portrait`, `tall`, `square`, `banner` |
| `--width` / `--height` | from preset | explicit size overrides the preset |
| `--palette` | `prism` | `prism`, `prism-teal`, `ice`, `mono`, `ember` |
| `--bg` | `ink` | `ink` `#0a0e1a`, `hero` `#0b0e1c`, `black`, `transparent` |
| `--spread` | `0.55` | 0 = clean anchor form, 1 = far from anchor |
| `--ss` | `2` | supersample factor (render at N×, downscale for crisp edges) |
| `--density` | `4` | iterations per output pixel (higher = smoother, slower) |
| `--gamma` | `2.2` | tone-map gamma (higher = more faint dust visible) |
| `--zoom` | `1` | <1 zooms out (more margin), >1 fills tighter |
| `--format` | `both` | `png`, `webp`, or `both` |
| `--out` | `tools/fractals/out` | output directory |
| `--contact` | off | also write `_contact.png`, a grid of everything rendered |

## The species

All share the dusty grayscale-on-dark look and the PRISM palette — that's the
continuity. They differ in structure:

- **hexaflake** — the original reference; six copies in hexagonal symmetry, lacy snowflake clusters.
- **dust** — generalised 3–7-fold fractal dust; the widest structural range.
- **fern** — a Barnsley fern, gently perturbed; naturally vertical, good for tall panels.
- **dragon** — Heighway dragon; swirling, ribboned self-similar sweeps.
- **crystal** — flame-style with a spherical variation; curvy, organic, less regular.

## Continuity vs. variation

- **Same family** comes from the fixed structure of each species + the shared
  renderer + the shared palette.
- **Variation** comes from the seed. `--spread` is the dial: low values stay near
  each species' clean anchor (very consistent), high values let seeds roam.
- For a tightly-matched site set, keep one or two species, one palette, and a
  modest spread (≈0.4–0.6).

## Using them in the PRISM site

CSS background (already-known dimensions, covers the box):

```css
.section-art {
  background: #0a0e1a url('/fractals/fern-482910-prism.webp') center / cover no-repeat;
}
```

Or `next/image` with the committed file. Transparent renders (`--bg transparent`)
layer over the hero's radial glow without a hard edge.

## Files

- `rng.mjs` — seeded PRNG + seed hashing (isomorphic)
- `palettes.mjs` — colour ramps + named backgrounds
- `species.mjs` — the genome generators (the family)
- `core-render.mjs` — chaos game + tone mapping → RGBA (isomorphic)
- `generate.mjs` — Node CLI (sharp encode, supersample, manifest, contact sheet)
- `playground.html` — browser seed-picker (imports the same core)
