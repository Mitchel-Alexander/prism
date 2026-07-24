// Build-time renderer. Produces high-res PNG/WebP fractals + a manifest.
// Uses sharp (already a dependency of the Next site) for supersample downscale
// and encoding. Run from the prism repo root:
//
//   node tools/fractals/generate.mjs --count 12 --preset hero --contact
//   node tools/fractals/generate.mjs --species fern --seeds 12345 --palette prism-teal
//   node tools/fractals/generate.mjs --species hexaflake --bg transparent --out public/fractals
//
// See README.md for the full option list.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { makeGenome, speciesNames } from './species.mjs';
import { renderToRGBA } from './core-render.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const presets = {
  hero: { w: 1600, h: 2400 },
  portrait: { w: 1400, h: 2100 },
  tall: { w: 1200, h: 2000 },
  square: { w: 1600, h: 1600 },
  banner: { w: 1920, h: 760 },
};

function parseArgs(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) {
    const t = argv[i];
    if (t.startsWith('--')) {
      const k = t.slice(2);
      const nx = argv[i + 1];
      if (nx == null || nx.startsWith('--')) a[k] = true;
      else {
        a[k] = nx;
        i++;
      }
    }
  }
  return a;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const preset = args.preset && presets[args.preset] ? presets[args.preset] : null;

  const W = +(args.width || (preset ? preset.w : 1600));
  const H = +(args.height || (preset ? preset.h : 2400));
  const ss = Math.max(1, +(args.ss || 2)); // supersample factor
  const palette = args.palette || 'prism';
  const bg = args.bg || 'ink';
  const spread = args.spread != null ? +args.spread : 0.55;
  const format = args.format || 'both'; // png | webp | both
  const density = +(args.density || 4); // iterations per output pixel
  const gamma = +(args.gamma || 2.2);
  const zoom = +(args.zoom || 1);
  const fit = typeof args.fit === 'string' ? args.fit : undefined; // else per-species default
  const speciesArg = args.species || 'mix';
  const outDir = path.resolve(process.cwd(), args.out || path.join(__dirname, 'out'));

  let seeds;
  if (args.seeds) {
    seeds = String(args.seeds).split(',').map((s) => s.trim()).filter(Boolean);
  } else {
    const count = +(args.count || 12);
    seeds = Array.from({ length: count }, () => Math.floor(Math.random() * 1e9));
  }
  const speciesList = speciesArg === 'mix' ? speciesNames : String(speciesArg).split(',').map((s) => s.trim());
  const items = seeds.map((seed, i) => ({ seed, species: speciesList[i % speciesList.length] }));

  await fs.mkdir(outDir, { recursive: true });
  const manifest = [];
  const t0 = Date.now();

  for (let n = 0; n < items.length; n++) {
    const it = items[n];
    const genome = makeGenome(it.species, it.seed, spread);
    const Wss = W * ss;
    const Hss = H * ss;
    const iters = Math.round(Wss * Hss * density);
    const { rgba } = renderToRGBA({
      genome, width: Wss, height: Hss, seed: it.seed,
      palette, background: bg, iterations: iters, gamma, zoom, fit,
    });

    const pipe = () => {
      let p = sharp(Buffer.from(rgba.buffer), { raw: { width: Wss, height: Hss, channels: 4 } });
      if (ss !== 1) p = p.resize(W, H, { kernel: 'lanczos3' });
      return p;
    };

    const safeSeed = String(it.seed).replace(/[^a-z0-9_-]/gi, '');
    const base = `${it.species}-${safeSeed}-${palette}${bg === 'transparent' ? '-t' : ''}`;
    const wrote = [];
    if (format === 'png' || format === 'both') {
      const f = base + '.png';
      await pipe().png({ compressionLevel: 9 }).toFile(path.join(outDir, f));
      wrote.push(f);
    }
    if (format === 'webp' || format === 'both') {
      const f = base + '.webp';
      await pipe().webp({ quality: 90 }).toFile(path.join(outDir, f));
      wrote.push(f);
    }
    manifest.push({ files: wrote, species: it.species, seed: it.seed, palette, background: bg, spread, width: W, height: H });
    console.log(`[${n + 1}/${items.length}] ${base}`);
  }

  await fs.writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  if (args.contact) {
    const cols = Math.min(4, manifest.length);
    const tw = 240;
    const th = Math.round((tw * H) / W);
    const rows = Math.ceil(manifest.length / cols);
    const comps = [];
    for (let i = 0; i < manifest.length; i++) {
      const src = path.join(outDir, manifest[i].files[0]);
      const tbuf = await sharp(src).resize(tw, th, { fit: 'cover' }).toBuffer();
      comps.push({ input: tbuf, left: (i % cols) * tw, top: Math.floor(i / cols) * th });
    }
    await sharp({ create: { width: cols * tw, height: rows * th, channels: 3, background: { r: 10, g: 14, b: 26 } } })
      .composite(comps)
      .png()
      .toFile(path.join(outDir, '_contact.png'));
    console.log('contact sheet -> _contact.png');
  }

  console.log(`done: ${manifest.length} image(s) -> ${outDir}  (${((Date.now() - t0) / 1000).toFixed(1)}s)`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
