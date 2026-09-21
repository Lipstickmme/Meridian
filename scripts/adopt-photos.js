'use strict';

/**
 * Swap placeholder drawings for real photography.
 *
 * Every project and service image in src/data/*.json points at a drawing from
 * scripts/make-artwork.js. Drop a photograph next to that drawing with the
 * same name — `pier-j-berth-02.jpg` beside `pier-j-berth-02.svg` — run this,
 * and the data files are rewritten to use the photograph. Nothing else in the
 * site has to change, and the drawing stays on disk as the fallback if the
 * photograph is ever pulled.
 *
 * The page-level slots (meridian1 to meridian5) need none of this: they are
 * resolved at build time by src/site/images.js, so those really are a file
 * drop. See docs/IMAGE-PROMPTS.md for what to shoot and where it goes.
 *
 * Run: npm run adopt-photos          (writes)
 *      npm run adopt-photos -- --dry (reports only)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');
const DRY = process.argv.includes('--dry');

/* Best format first: a WebP beside a JPEG of the same name wins. */
const RASTER = ['.webp', '.avif', '.jpg', '.jpeg', '.png'];

/** The best real photograph for a placeholder path, or null for none yet. */
function photographFor(src) {
  if (typeof src !== 'string' || !src.startsWith('/assets/')) return null;
  const dir = path.join(PUBLIC, path.dirname(src));
  const base = path.basename(src, path.extname(src));
  let entries = [];
  try {
    entries = fs.readdirSync(dir);
  } catch (err) {
    return null;
  }
  const index = new Map(entries.map((f) => [f.toLowerCase(), f]));
  for (const ext of RASTER) {
    const hit = index.get(`${base}${ext}`.toLowerCase());
    if (hit) return `${path.dirname(src)}/${hit}`;
  }
  return null;
}

/** Walk an entry's image fields, reporting what changed and what is still a drawing. */
function adopt(entry, label, report) {
  let changed = false;
  const swap = (current, set, what) => {
    const real = photographFor(current);
    if (real && real !== current) {
      set(real);
      report.adopted.push(`${label} ${what}: ${real}`);
      changed = true;
    } else if (String(current).endsWith('.svg')) {
      report.waiting.push(`${label} ${what}: ${current}`);
    }
  };

  swap(entry.image, (v) => { entry.image = v; }, 'main');
  (entry.gallery || []).forEach((g, i) => {
    swap(g.src, (v) => { g.src = v; }, `gallery ${i + 1}`);
  });
  return changed;
}

const files = [
  { file: 'src/data/projects.json', label: (e) => `project ${e.id}` },
  { file: 'src/data/services.json', label: (e) => `service ${e.id}` },
  { file: 'src/data/leadership.json', label: (e) => `leadership ${e.id}` },
];

const report = { adopted: [], waiting: [] };
let written = 0;

for (const spec of files) {
  const full = path.join(ROOT, spec.file);
  const data = JSON.parse(fs.readFileSync(full, 'utf8'));
  let changed = false;
  data.forEach((entry) => {
    if (adopt(entry, spec.label(entry), report)) changed = true;
  });
  if (changed && !DRY) {
    fs.writeFileSync(full, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
    written += 1;
  }
}

report.adopted.forEach((line) => console.log(`  photo  ${line}`));
console.log(
  `[photos] ${report.adopted.length} adopted, ${report.waiting.length} still on drawings` +
    (DRY ? ' (dry run, nothing written)' : `, ${written} data file(s) updated`)
);
if (report.waiting.length && process.argv.includes('--list')) {
  report.waiting.forEach((line) => console.log(`  todo   ${line}`));
}
if (report.adopted.length && !DRY) console.log('[photos] run `npm run build` to rebuild the pages');
