'use strict';

/**
 * Build static HTML pages from shared layout + per-page content.
 * Run with `npm run build`. Output goes to public/*.html.
 */

const fs = require('fs');
const path = require('path');
const { page } = require('../src/site/layout');
const pages = require('../src/site/pages');
const images = require('../src/site/images');
const detail = require('../src/site/detail');

const publicDir = path.join(__dirname, '..', 'public');

/* The shared pages, then one real page per project and per discipline. The
   detail pages live in subdirectories, so /projects/pier-j-berth is served
   from a file rather than resolved in the browser. */
const detailPages = [...detail.projectPages(), ...detail.servicePages()];
const all = [...pages, ...detailPages];

let count = 0;
for (const def of all) {
  const html = page(def);
  const dest = path.join(publicDir, def.file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html, 'utf8');
  count += 1;
  if (!def.file.includes('/')) console.log(`  built ${def.file} (${html.length} bytes)`);
}
console.log(`  built ${detailPages.length} project and service pages`);
console.log(`[build] wrote ${count} pages`);

// Say out loud which real artwork was picked up, so a deploy that is still
// running on placeholders is obvious from the build log rather than the page.
const picked = Array.from(new Set(images._resolved));
if (picked.length) {
  console.log(`[build] using ${picked.length} supplied image(s): ${picked.join(', ')}`);
} else {
  console.log('[build] no meridian1..meridian5 found in public/assets/img: using placeholders');
}
