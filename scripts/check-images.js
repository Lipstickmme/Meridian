'use strict';

/**
 * Check every picture the site claims to have.
 *
 * The site runs on one shared library of photographs, reused across projects,
 * disciplines and page bands, so the failure modes are: a path that points at
 * nothing, the same plate twice on one page, and two projects sharing a hero
 * so the listing shows the same thumbnail twice. All three are silent in a
 * browser and obvious to a visitor, so the build fails on them instead.
 *
 * Run on its own with `npm run check:images`; the build runs it first.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PUBLIC = path.join(ROOT, 'public');

const projects = require('../src/data/projects.json');
const services = require('../src/data/services.json');
const leadership = require('../src/data/leadership.json');
const images = require('../src/data/images.json');

const problems = [];
const plates = (entry) => [entry.image, ...(entry.gallery || []).map((g) => g.src)].filter(Boolean);
const exists = (src) => fs.existsSync(path.join(PUBLIC, src.replace(/^\//, '')));

/* 1. Everything the data points at is on disk. */
const referenced = new Map();
const note = (src, where) => {
  if (!src) return;
  referenced.set(src, [...(referenced.get(src) || []), where]);
  if (!exists(src)) problems.push(`${where}: ${src} is not in public/`);
};

[...projects, ...services].forEach((entry) => {
  plates(entry).forEach((src) => note(src, entry.id));
});
leadership.forEach((person) => note(person.image, `leadership ${person.id}`));
Object.entries(images.slots).forEach(([slot, spec]) => note(spec.fallback, `slot ${slot}`));
images.heroSlides.forEach((spec, i) => note(spec.fallback, `hero slide ${i + 1}`));

/* 2. No plate appears twice on the same page. */
[...projects, ...services].forEach((entry) => {
  const seen = new Set();
  plates(entry).forEach((src) => {
    if (seen.has(src)) problems.push(`${entry.id}: ${src} appears twice on the same page`);
    seen.add(src);
  });
});

/* 3. No two projects share a hero: the listing shows all of them side by side. */
const heroes = new Map();
projects.forEach((p) => {
  if (heroes.has(p.image)) problems.push(`${p.id} and ${heroes.get(p.image)} share a hero image`);
  heroes.set(p.image, p.id);
});

/* 4. Nothing in the library goes unused — an orphan is either a mistake or dead weight. */
const libDir = path.join(PUBLIC, 'assets', 'img', 'lib');
const onDisk = fs.existsSync(libDir) ? fs.readdirSync(libDir) : [];
const orphans = onDisk.filter((file) => !referenced.has(`/assets/img/lib/${file}`));

if (problems.length) {
  problems.forEach((line) => console.error(`[images] ${line}`));
  process.exit(1);
}

console.log(
  `[images] ${referenced.size} plates, all present: ` +
    `${projects.length} projects, ${services.length} disciplines, ` +
    `${Object.keys(images.slots).length + images.heroSlides.length} page slots`
);
if (orphans.length) console.log(`[images] unused in lib/: ${orphans.join(', ')}`);
