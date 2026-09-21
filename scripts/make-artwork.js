'use strict';

/**
 * Draw the placeholder artwork the site ships with.
 *
 * Meridian's pages are laid out for photography, and until real photography
 * exists every image slot still has to carry something. These are drawings
 * rather than stock pictures: a cyanotype ground, a survey grid, a title block
 * and the structure itself in thin white line. They are honest about being
 * placeholders, they weigh a few kilobytes each, and they never show a
 * building the practice did not build.
 *
 * Run: npm run artwork   (output: public/assets/img/*.svg)
 *
 * Dropping real photography into public/assets/img/ takes over from these
 * automatically; see src/data/images.json and docs/DEPLOYMENT.md.
 */

const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, '..', 'public', 'assets', 'img');

/* Palette. Kept in step with the site tokens in public/css/styles.css.
   These are drawings on paper, not cyanotypes: ink line on a warm sheet, a
   teal wash for solids, and construction yellow on everything that is there
   to be seen from across a site. */
const C = {
  stroke: '#123642',       // line work: deep teal ink
  edge: 'rgba(18,54,66,0.34)',
  faint: 'rgba(18,54,66,0.11)',
  signal: '#0f6d84',       // teal: anything that points or measures
  brass: '#f2a900',        // construction yellow (kept under the old name so
                           // every motif picks it up without an edit)
  hi: '#f2a900',
};

/** Deterministic noise, so a re-run produces byte-identical files. */
function rng(seed) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v) => Number(v.toFixed(1));

/* ---------------------------------------------------------------- frame --- */

function svg({ w, h, title, code, scale, body }) {
  const bar = 54;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="ground" x1="0" y1="0" x2="0.5" y2="1">
      <stop offset="0" stop-color="#f6f4ec"/><stop offset="0.6" stop-color="#eceee7"/><stop offset="1" stop-color="#dfe7e6"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="${C.faint}" stroke-width="1"/>
    </pattern>
    <pattern id="grid-fine" width="8" height="8" patternUnits="userSpaceOnUse">
      <path d="M8 0H0V8" fill="none" stroke="rgba(18,54,66,0.055)" stroke-width="0.6"/>
    </pattern>
    <linearGradient id="wash" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${C.signal}" stop-opacity="0.34"/><stop offset="1" stop-color="${C.signal}" stop-opacity="0.06"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#ground)"/>
  <rect width="${w}" height="${h}" fill="url(#grid-fine)"/>
  <rect width="${w}" height="${h}" fill="url(#grid)"/>
  <rect x="14" y="14" width="${w - 28}" height="${h - 28}" fill="none" stroke="${C.edge}" stroke-width="1.4"/>
  <text x="34" y="46" fill="${C.signal}" font-family="'IBM Plex Mono',monospace" font-size="13" letter-spacing="3">${code}</text>
  <text x="${w - 34}" y="46" text-anchor="end" fill="rgba(18,54,66,0.45)" font-family="'IBM Plex Mono',monospace" font-size="12" letter-spacing="2">${scale}</text>
${body}
  <rect x="14" y="${h - 14 - bar}" width="${w - 28}" height="${bar}" fill="${C.hi}"/>
  <rect x="14" y="${h - 14 - bar}" width="${w - 28}" height="3" fill="${C.stroke}"/>
  <text x="34" y="${h - 14 - bar / 2 + 6}" fill="${C.stroke}" font-family="'IBM Plex Mono',monospace" font-size="15" letter-spacing="2.4" font-weight="500">${title}</text>
  <text x="${w - 34}" y="${h - 14 - bar / 2 + 6}" text-anchor="end" fill="${C.stroke}" font-family="'IBM Plex Mono',monospace" font-size="13" letter-spacing="3" opacity="0.72">MERIDIAN</text>
</svg>
`;
}

/* --------------------------------------------------------------- pieces --- */

const S = (d, width = 2, opacity = 1) =>
  `  <path d="${d}" fill="none" stroke="${C.stroke}" stroke-width="${width}" opacity="${opacity}"/>`;
const A = (d, width = 3, colour = C.signal) =>
  `  <path d="${d}" fill="none" stroke="${colour}" stroke-width="${width}" stroke-linecap="round"/>`;
const R = (x, y, w, h, fill = 'none', width = 2) =>
  `  <rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${fill}" stroke="${C.stroke}" stroke-width="${width}"/>`;

/** The dimension string every engineering drawing carries along its base. */
function dimline(x1, x2, y, ticks = 10) {
  const parts = [`  <line x1="${n(x1)}" y1="${n(y)}" x2="${n(x2)}" y2="${n(y)}" stroke="${C.signal}" stroke-width="2"/>`];
  for (let i = 0; i <= ticks; i += 1) {
    const x = x1 + ((x2 - x1) / ticks) * i;
    parts.push(`  <line x1="${n(x)}" y1="${n(y - 8)}" x2="${n(x)}" y2="${n(y + 8)}" stroke="${C.edge}" stroke-width="1"/>`);
  }
  return parts.join('\n');
}

/** Ground: the hatched band everything above it has to be carried by. */
function ground(w, y, h = 60) {
  const parts = [`  <line x1="0" y1="${n(y)}" x2="${w}" y2="${n(y)}" stroke="${C.stroke}" stroke-width="2" opacity="0.8"/>`];
  for (let x = -h; x < w; x += 26) {
    parts.push(`  <line x1="${n(x)}" y1="${n(y + h)}" x2="${n(x + h)}" y2="${n(y)}" stroke="${C.edge}" stroke-width="1"/>`);
  }
  return parts.join('\n');
}

/* --------------------------------------------------------------- motifs --- */

const motifs = {
  /* A tall frame in elevation, braced by a diagrid. */
  tower(w, h, seed) {
    const r = rng(seed);
    const bw = w * 0.3;
    const x = w * 0.14;
    const top = h * 0.12;
    const base = h * 0.82;
    const bays = 8;
    const out = [R(x, top, bw, base - top), `  <rect x="${n(x)}" y="${n(top)}" width="${n(bw)}" height="${n(base - top)}" fill="url(#wash)" opacity="0.5"/>`];
    for (let i = 0; i < bays; i += 1) {
      const y0 = top + ((base - top) / bays) * i;
      const y1 = top + ((base - top) / bays) * (i + 1);
      out.push(S(`M${n(x)} ${n(y0)}L${n(x + bw)} ${n(y1)}`, 1.4, 0.75));
      out.push(S(`M${n(x + bw)} ${n(y0)}L${n(x)} ${n(y1)}`, 1.4, 0.75));
      out.push(S(`M${n(x)} ${n(y0)}H${n(x + bw)}`, 1, 0.45));
    }
    /* The second, lower mass beside it, and the core line through both. */
    const x2 = x + bw + w * 0.12;
    const bw2 = w * 0.22;
    const top2 = top + (base - top) * (0.3 + r() * 0.12);
    out.push(R(x2, top2, bw2, base - top2));
    for (let y = top2; y < base - 10; y += (base - top2) / 6) out.push(S(`M${n(x2)} ${n(y)}H${n(x2 + bw2)}`, 1, 0.4));
    out.push(A(`M${n(x + bw / 2)} ${n(top - 26)}V${n(base)}`, 2, C.brass));
    out.push(ground(w, base));
    out.push(dimline(x, x2 + bw2, base + 34, 9));
    return out.join('\n');
  },

  /* A block of work in elevation: several masses on one datum. Reads across a
     wide band, where a single tower leaves two thirds of the sheet empty. */
  skyline(w, h, seed) {
    const r = rng(seed);
    const base = h * 0.8;
    const out = [];
    let x = w * 0.06;
    let i = 0;
    while (x < w * 0.9) {
      const bw = w * (0.06 + r() * 0.07);
      const bh = h * (0.2 + r() * 0.44);
      out.push(R(x, base - bh, bw, bh));
      if (i % 3 === 0) {
        out.push(`  <rect x="${n(x)}" y="${n(base - bh)}" width="${n(bw)}" height="${n(bh)}" fill="url(#wash)" opacity="0.4"/>`);
        const bays = 5;
        for (let b = 0; b < bays; b += 1) {
          const y0 = base - bh + (bh / bays) * b;
          const y1 = base - bh + (bh / bays) * (b + 1);
          out.push(S(`M${n(x)} ${n(y0)}L${n(x + bw)} ${n(y1)}`, 1.2, 0.6));
          out.push(S(`M${n(x + bw)} ${n(y0)}L${n(x)} ${n(y1)}`, 1.2, 0.6));
        }
      } else {
        for (let y = base - bh + 26; y < base - 8; y += 26) out.push(S(`M${n(x)} ${n(y)}H${n(x + bw)}`, 1, 0.3));
      }
      if (i % 4 === 1) out.push(A(`M${n(x + bw / 2)} ${n(base - bh - h * 0.06)}V${n(base - bh)}`, 2, C.brass));
      x += bw + w * (0.02 + r() * 0.025);
      i += 1;
    }
    /* The datum every one of them is set out from. */
    out.push(A(`M${n(w * 0.04)} ${n(base - h * 0.52)}H${n(w * 0.96)}`, 1.6, C.signal));
    out.push(ground(w, base, 44));
    out.push(dimline(w * 0.06, w * 0.94, base + 30, 14));
    return out.join('\n');
  },

  /* Cable-stayed crossing: two pylons, a deck, stays under tension. */
  bridge(w, h, seed) {
    const r = rng(seed);
    const deck = h * 0.62;
    const p1 = w * 0.3;
    const p2 = w * 0.72;
    const topY = h * 0.14;
    const out = [
      S(`M${n(w * 0.05)} ${n(deck)}H${n(w * 0.95)}`, 3),
      S(`M${n(w * 0.05)} ${n(deck + 16)}H${n(w * 0.95)}`, 1.4, 0.6),
      S(`M${n(p1)} ${n(topY)}V${n(deck + 40)}`, 3),
      S(`M${n(p2)} ${n(topY + 10)}V${n(deck + 40)}`, 3),
    ];
    for (let i = 1; i <= 7; i += 1) {
      const s = i / 8;
      out.push(A(`M${n(p1)} ${n(topY + 16 * i)}L${n(p1 - (p1 - w * 0.06) * s)} ${n(deck)}`, 1.4, C.signal));
      out.push(A(`M${n(p1)} ${n(topY + 16 * i)}L${n(p1 + (p2 - p1) * 0.5 * s)} ${n(deck)}`, 1.4, C.signal));
      out.push(A(`M${n(p2)} ${n(topY + 10 + 16 * i)}L${n(p2 + (w * 0.94 - p2) * s)} ${n(deck)}`, 1.4, C.signal));
      out.push(A(`M${n(p2)} ${n(topY + 10 + 16 * i)}L${n(p2 - (p2 - p1) * 0.5 * s)} ${n(deck)}`, 1.4, C.signal));
    }
    /* Water line and the piers going down into it. */
    const water = h * 0.86;
    out.push(S(`M0 ${n(water)}H${w}`, 1.4, 0.5));
    for (let i = 0; i < 3; i += 1) {
      out.push(S(`M${n(w * 0.06)} ${n(water + 12 + i * 12)}h${n(w * 0.2 + r() * 60)}`, 1, 0.25));
      out.push(S(`M${n(w * 0.6)} ${n(water + 18 + i * 12)}h${n(w * 0.3)}`, 1, 0.25));
    }
    out.push(R(p1 - 16, deck + 40, 32, water - deck - 40));
    out.push(R(p2 - 16, deck + 40, 32, water - deck - 40));
    out.push(dimline(w * 0.3, w * 0.72, deck - 30, 6));
    return out.join('\n');
  },

  /* Process plant: vessels, a pipe rack and the stair tower beside them. */
  plant(w, h, seed) {
    const r = rng(seed);
    const base = h * 0.8;
    const out = [];
    let x = w * 0.1;
    for (let i = 0; i < 5; i += 1) {
      const vw = 60 + r() * 70;
      const vh = 150 + r() * 260;
      out.push(R(x, base - vh, vw, vh));
      out.push(`  <rect x="${n(x)}" y="${n(base - vh)}" width="${n(vw)}" height="${n(vh)}" fill="url(#wash)" opacity="0.45"/>`);
      out.push(`  <ellipse cx="${n(x + vw / 2)}" cy="${n(base - vh)}" rx="${n(vw / 2)}" ry="11" fill="none" stroke="${C.stroke}" stroke-width="2"/>`);
      for (let y = base - vh + 40; y < base - 20; y += 52) out.push(S(`M${n(x)} ${n(y)}H${n(x + vw)}`, 1, 0.35));
      x += vw + 40 + r() * 50;
      if (x > w * 0.82) break;
    }
    /* Pipe rack: the run that decides the operating cost. */
    const rackY = base - 120;
    out.push(A(`M${n(w * 0.06)} ${n(rackY)}H${n(w * 0.94)}`, 3, C.brass));
    out.push(A(`M${n(w * 0.06)} ${n(rackY + 14)}H${n(w * 0.94)}`, 2, C.signal));
    for (let px = w * 0.1; px < w * 0.92; px += 110) out.push(S(`M${n(px)} ${n(rackY - 8)}V${n(base)}`, 1.4, 0.5));
    out.push(ground(w, base));
    out.push(dimline(w * 0.08, w * 0.92, base + 36, 12));
    return out.join('\n');
  },

  /* Long-span canopy over a concourse: the transit motif. */
  canopy(w, h) {
    const out = [];
    const springing = h * 0.55;
    const crown = h * 0.2;
    out.push(S(`M${n(w * 0.06)} ${n(springing)}Q${n(w / 2)} ${n(crown - 60)} ${n(w * 0.94)} ${n(springing)}`, 3));
    out.push(S(`M${n(w * 0.06)} ${n(springing + 28)}Q${n(w / 2)} ${n(crown - 20)} ${n(w * 0.94)} ${n(springing + 28)}`, 2, 0.7));
    for (let i = 0; i <= 18; i += 1) {
      const t = i / 18;
      const x = w * 0.06 + (w * 0.88) * t;
      const yTop = (1 - t) * (1 - t) * springing + 2 * (1 - t) * t * (crown - 60) + t * t * springing;
      const yBot = (1 - t) * (1 - t) * (springing + 28) + 2 * (1 - t) * t * (crown - 20) + t * t * (springing + 28);
      out.push(S(`M${n(x)} ${n(yTop)}L${n(x)} ${n(yBot)}`, 1.2, 0.55));
      if (i % 3 === 0) out.push(S(`M${n(x)} ${n(yBot)}V${n(h * 0.8)}`, 1.4, 0.45));
    }
    /* Concourse below, and the platform edge. */
    out.push(S(`M${n(w * 0.04)} ${n(h * 0.8)}H${n(w * 0.96)}`, 2.4));
    out.push(A(`M${n(w * 0.12)} ${n(h * 0.86)}H${n(w * 0.88)}`, 3, C.brass));
    for (let x = w * 0.12; x < w * 0.88; x += 40) out.push(S(`M${n(x)} ${n(h * 0.8)}V${n(h * 0.86)}`, 1, 0.3));
    out.push(dimline(w * 0.06, w * 0.94, h * 0.93, 12));
    return out.join('\n');
  },

  /* Arched viaduct marching across the sheet. */
  viaduct(w, h) {
    const deck = h * 0.42;
    const base = h * 0.82;
    const bays = 6;
    const bw = (w * 0.9) / bays;
    const out = [S(`M${n(w * 0.05)} ${n(deck)}H${n(w * 0.95)}`, 3), S(`M${n(w * 0.05)} ${n(deck + 20)}H${n(w * 0.95)}`, 1.6, 0.6)];
    for (let i = 0; i < bays; i += 1) {
      const x0 = w * 0.05 + bw * i;
      out.push(S(`M${n(x0 + 14)} ${n(base)}V${n(deck + 60)}Q${n(x0 + bw / 2)} ${n(deck - 10)} ${n(x0 + bw - 14)} ${n(deck + 60)}V${n(base)}`, 2));
      out.push(S(`M${n(x0 + bw / 2)} ${n(deck + 20)}V${n(deck + 64)}`, 1.2, 0.45));
    }
    out.push(A(`M${n(w * 0.05)} ${n(deck - 6)}H${n(w * 0.95)}`, 3, C.brass));
    out.push(ground(w, base));
    out.push(dimline(w * 0.05, w * 0.95, base + 34, bays));
    return out.join('\n');
  },

  /* Portal-framed shed: the warehouse and terminal motif. */
  portal(w, h, seed) {
    const r = rng(seed);
    const base = h * 0.8;
    const eaves = h * 0.44;
    const ridge = h * 0.3;
    const out = [
      S(`M${n(w * 0.08)} ${n(base)}V${n(eaves)}L${n(w / 2)} ${n(ridge)}L${n(w * 0.92)} ${n(eaves)}V${n(base)}`, 3),
      S(`M${n(w * 0.08)} ${n(eaves + 18)}H${n(w * 0.92)}`, 1.4, 0.5),
    ];
    for (let i = 1; i < 8; i += 1) {
      const x = w * 0.08 + ((w * 0.84) / 8) * i;
      const roof = x < w / 2
        ? eaves - ((eaves - ridge) * (x - w * 0.08)) / (w / 2 - w * 0.08)
        : ridge + ((eaves - ridge) * (x - w / 2)) / (w * 0.92 - w / 2);
      out.push(S(`M${n(x)} ${n(base)}V${n(roof)}`, 1.4, 0.5));
      if (i % 2 === 0) out.push(S(`M${n(x)} ${n(roof + 30)}L${n(x + 60)} ${n(base)}`, 1, 0.3));
    }
    /* Doors along the base, and a crane rail inside. */
    for (let i = 0; i < 4; i += 1) {
      const dx = w * 0.14 + i * (w * 0.2);
      out.push(R(dx, base - 70 - r() * 20, 80, 70 + r() * 20, 'none', 1.4));
    }
    out.push(A(`M${n(w * 0.1)} ${n(eaves + 42)}H${n(w * 0.9)}`, 3, C.signal));
    out.push(ground(w, base));
    return out.join('\n');
  },

  /* Foundations in section: piles, pile cap, the load coming down. */
  piles(w, h, seed) {
    const r = rng(seed);
    const gl = h * 0.36;
    const out = [ground(w, gl, 40)];
    const capY = gl + 40;
    out.push(R(w * 0.2, capY, w * 0.6, 54, 'none', 2.4));
    out.push(`  <rect x="${n(w * 0.2)}" y="${n(capY)}" width="${n(w * 0.6)}" height="54" fill="url(#wash)" opacity="0.4"/>`);
    out.push(S(`M${n(w * 0.44)} ${n(h * 0.06)}H${n(w * 0.56)}V${n(capY)}H${n(w * 0.44)}Z`, 2.4));
    for (let i = 0; i < 6; i += 1) {
      const x = w * 0.24 + i * (w * 0.104);
      const depth = h * 0.78 + r() * h * 0.12;
      out.push(R(x, capY + 54, 34, depth - capY - 54, 'none', 2));
      for (let y = capY + 80; y < depth - 10; y += 30) out.push(S(`M${n(x)} ${n(y)}H${n(x + 34)}`, 1, 0.3));
    }
    /* Strata lines: the ground investigation the design is actually built on. */
    [0.52, 0.64, 0.78].forEach((f, i) => {
      out.push(A(`M0 ${n(h * f)}H${w}`, 1.6, i === 1 ? C.brass : C.signal));
    });
    out.push(dimline(w * 0.2, w * 0.8, gl - 26, 6));
    return out.join('\n');
  },

  /* Refinery: columns, a flare stack and the header running between them. */
  refinery(w, h, seed) {
    const r = rng(seed);
    const base = h * 0.82;
    const out = [];
    for (let i = 0; i < 4; i += 1) {
      const x = w * 0.12 + i * (w * 0.18);
      const vh = 220 + r() * 280;
      out.push(R(x, base - vh, 54 + r() * 26, vh));
      out.push(S(`M${n(x - 16)} ${n(base - vh + 40)}H${n(x + 90)}`, 1.2, 0.4));
    }
    const fx = w * 0.86;
    out.push(S(`M${n(fx)} ${n(base)}V${n(h * 0.1)}`, 3));
    out.push(A(`M${n(fx)} ${n(h * 0.1)}q18 -34 42 -18`, 3, C.brass));
    out.push(S(`M${n(fx - 30)} ${n(base - 60)}L${n(fx)} ${n(h * 0.26)}`, 1.2, 0.4));
    out.push(S(`M${n(fx + 30)} ${n(base - 60)}L${n(fx)} ${n(h * 0.26)}`, 1.2, 0.4));
    out.push(A(`M${n(w * 0.06)} ${n(base - 96)}H${n(w * 0.9)}`, 3, C.signal));
    out.push(ground(w, base));
    return out.join('\n');
  },

  /* A facade grid: the retrofit and envelope motif. */
  facade(w, h, seed) {
    const r = rng(seed);
    const x0 = w * 0.12;
    const y0 = h * 0.12;
    const cols = 9;
    const rows = 7;
    const cw = (w * 0.76) / cols;
    const ch = (h * 0.7) / rows;
    const out = [R(x0, y0, cw * cols, ch * rows, 'none', 2.4)];
    for (let c = 0; c < cols; c += 1) {
      for (let rr = 0; rr < rows; rr += 1) {
        const filled = r() > 0.72;
        out.push(R(x0 + c * cw, y0 + rr * ch, cw, ch, filled ? 'url(#wash)' : 'none', 1));
      }
    }
    out.push(A(`M${n(x0)} ${n(y0 + ch * 3)}H${n(x0 + cw * cols)}`, 3, C.brass));
    out.push(A(`M${n(x0 + cw * 4)} ${n(y0)}V${n(y0 + ch * rows)}`, 2, C.signal));
    out.push(dimline(x0, x0 + cw * cols, y0 + ch * rows + 34, cols));
    return out.join('\n');
  },

  /* Lock chamber in section: gates, sills, water levels. */
  lock(w, h) {
    const top = h * 0.3;
    const bed = h * 0.78;
    const out = [
      S(`M${n(w * 0.06)} ${n(top)}H${n(w * 0.2)}V${n(bed)}H${n(w * 0.8)}V${n(top)}H${n(w * 0.94)}`, 3),
      A(`M${n(w * 0.06)} ${n(top + 30)}H${n(w * 0.2)}`, 2.4, C.signal),
      A(`M${n(w * 0.8)} ${n(top + 96)}H${n(w * 0.94)}`, 2.4, C.signal),
      A(`M${n(w * 0.2)} ${n(top + 64)}H${n(w * 0.8)}`, 2.4, C.signal),
    ];
    out.push(R(w * 0.2 - 12, top - 40, 24, bed - top + 40, 'none', 2.4));
    out.push(R(w * 0.8 - 12, top - 40, 24, bed - top + 40, 'none', 2.4));
    out.push(A(`M${n(w * 0.2)} ${n(top - 40)}V${n(bed)}`, 2, C.brass));
    out.push(A(`M${n(w * 0.8)} ${n(top - 40)}V${n(bed)}`, 2, C.brass));
    for (let x = w * 0.22; x < w * 0.78; x += 46) out.push(S(`M${n(x)} ${n(bed)}v18`, 1, 0.3));
    out.push(ground(w, bed, 44));
    out.push(dimline(w * 0.2, w * 0.8, top - 60, 8));
    return out.join('\n');
  },

  /* Site plan: blocks, access, contours. The campus and masterplan motif. */
  plan(w, h, seed) {
    const r = rng(seed);
    const out = [];
    for (let i = 0; i < 6; i += 1) {
      const bw = 110 + r() * 190;
      const bh = 90 + r() * 150;
      const x = w * 0.1 + r() * (w * 0.72 - bw);
      const y = h * 0.14 + r() * (h * 0.6 - bh);
      out.push(R(x, y, bw, bh, i % 3 === 0 ? 'url(#wash)' : 'none', 2));
      out.push(S(`M${n(x)} ${n(y)}L${n(x + bw)} ${n(y + bh)}`, 1, 0.22));
    }
    /* Contours, and the access road cutting through them. */
    for (let i = 0; i < 5; i += 1) {
      const y = h * 0.2 + i * (h * 0.14);
      out.push(S(`M0 ${n(y)}C${n(w * 0.3)} ${n(y - 40 - r() * 30)} ${n(w * 0.7)} ${n(y + 40 + r() * 30)} ${w} ${n(y - 10)}`, 1, 0.3));
    }
    out.push(A(`M0 ${n(h * 0.78)}C${n(w * 0.3)} ${n(h * 0.7)} ${n(w * 0.62)} ${n(h * 0.88)} ${w} ${n(h * 0.72)}`, 3, C.brass));
    out.push(A(`M${n(w * 0.08)} ${n(h * 0.1)}v${n(h * 0.72)}`, 2, C.signal));
    out.push(`  <circle cx="${n(w * 0.9)}" cy="${n(h * 0.16)}" r="26" fill="none" stroke="${C.stroke}" stroke-width="1.6"/>`);
    out.push(A(`M${n(w * 0.9)} ${n(h * 0.16 - 34)}v${68}`, 2, C.brass));
    return out.join('\n');
  },

  /* Federated model: an axonometric wireframe. The digital-engineering motif. */
  model(w, h) {
    const out = [];
    const cx = w * 0.5;
    const cy = h * 0.56;
    /* The isometric unit scales with the sheet, so a wide band and a portrait
       plate both hold the whole model rather than cropping into it. */
    const k = h / 1040;
    const ux = 78 * k;
    const uy = 40 * k;
    const uz = 62 * k;
    const p = (a, b, c) => [cx + (a - b) * ux, cy + (a + b) * uy - c * uz];
    /* Wider than it is deep, so the model fills a landscape band instead of
       sitting as a small cluster in the middle of it. */
    for (let a = -5; a <= 5; a += 1) {
      for (let b = -2; b <= 2; b += 1) {
        const levels = 2 + ((a + b + 4) % 3);
        for (let c = 0; c <= levels; c += 1) {
          const [x1, y1] = p(a, b, c);
          const [x2, y2] = p(a + 1, b, c);
          const [x3, y3] = p(a, b + 1, c);
          out.push(S(`M${n(x1)} ${n(y1)}L${n(x2)} ${n(y2)}`, 1, c === levels ? 0.7 : 0.3));
          out.push(S(`M${n(x1)} ${n(y1)}L${n(x3)} ${n(y3)}`, 1, c === levels ? 0.7 : 0.3));
        }
        const [xa, ya] = p(a, b, 0);
        const [xb, yb] = p(a, b, levels);
        out.push(S(`M${n(xa)} ${n(ya)}L${n(xb)} ${n(yb)}`, 1.2, 0.45));
      }
    }
    const [hx, hy] = p(0, 0, 4);
    out.push(A(`M${n(hx - 120 * k)} ${n(hy)}L${n(hx)} ${n(hy - 44 * k)}L${n(hx + 120 * k)} ${n(hy)}`, 2.4, C.signal));
    out.push(A(`M${n(cx - w * 0.3)} ${n(cy + 170 * k)}H${n(cx + w * 0.3)}`, 3, C.brass));
    return out.join('\n');
  },

  /* Load path under test: the practice chapter. */
  loads(w, h) {
    const base = h * 0.78;
    const out = [S(`M${n(w * 0.08)} ${n(base)}H${n(w * 0.92)}`, 3)];
    const span = w * 0.84;
    for (let i = 0; i <= 12; i += 1) {
      const x = w * 0.08 + (span / 12) * i;
      const drop = Math.sin((i / 12) * Math.PI) * h * 0.1;
      out.push(A(`M${n(x)} ${n(h * 0.2)}V${n(h * 0.34)}`, 2, C.signal));
      out.push(S(`M${n(x)} ${n(h * 0.34)}l-6 -12h12Z`, 1.4, 0.8));
      out.push(S(`M${n(x)} ${n(base)}V${n(base + 20 + drop)}`, 1, 0.3));
    }
    out.push(S(`M${n(w * 0.08)} ${n(h * 0.42)}Q${n(w / 2)} ${n(h * 0.62)} ${n(w * 0.92)} ${n(h * 0.42)}`, 2.4));
    out.push(A(`M${n(w * 0.08)} ${n(h * 0.42)}Q${n(w / 2)} ${n(h * 0.56)} ${n(w * 0.92)} ${n(h * 0.42)}`, 2, C.brass));
    out.push(`  <path d="M${n(w * 0.08)} ${n(h * 0.42)}Q${n(w / 2)} ${n(h * 0.62)} ${n(w * 0.92)} ${n(h * 0.42)}L${n(w * 0.92)} ${n(base)}H${n(w * 0.08)}Z" fill="url(#wash)" opacity="0.35"/>`);
    out.push(ground(w, base));
    out.push(dimline(w * 0.08, w * 0.92, base + 36, 12));
    return out.join('\n');
  },

  /* Drawing board: the careers and studio motif. */
  studio(w, h, seed) {
    const r = rng(seed);
    const out = [R(w * 0.1, h * 0.16, w * 0.52, h * 0.6, 'none', 2.4)];
    out.push(`  <rect x="${n(w * 0.1)}" y="${n(h * 0.16)}" width="${n(w * 0.52)}" height="${n(h * 0.6)}" fill="url(#wash)" opacity="0.3"/>`);
    for (let i = 1; i < 7; i += 1) out.push(S(`M${n(w * 0.1)} ${n(h * 0.16 + (h * 0.6 / 7) * i)}H${n(w * 0.62)}`, 1, 0.25));
    for (let i = 1; i < 5; i += 1) out.push(S(`M${n(w * 0.1 + (w * 0.52 / 5) * i)} ${n(h * 0.16)}V${n(h * 0.76)}`, 1, 0.25));
    out.push(A(`M${n(w * 0.16)} ${n(h * 0.62)}L${n(w * 0.3)} ${n(h * 0.34)}L${n(w * 0.44)} ${n(h * 0.62)}Z`, 2.4, C.signal));
    out.push(A(`M${n(w * 0.12)} ${n(h * 0.7)}H${n(w * 0.58)}`, 3, C.brass));
    /* Three people at the board, drawn as the simplest thing that reads as one. */
    for (let i = 0; i < 3; i += 1) {
      const x = w * 0.7 + i * (w * 0.09);
      const head = h * 0.34 + r() * h * 0.05;
      out.push(`  <circle cx="${n(x)}" cy="${n(head)}" r="24" fill="none" stroke="${C.stroke}" stroke-width="2"/>`);
      out.push(S(`M${n(x - 34)} ${n(h * 0.76)}q0 -${n(h * 0.24)} 34 -${n(h * 0.24)}q34 0 34 ${n(h * 0.24)}`, 2));
    }
    out.push(ground(w, h * 0.8, 40));
    return out.join('\n');
  },

  /* Portrait plate: the frame a leadership photograph will drop into, set out
     the way a drawing sheet is rather than left as an empty rectangle. */
  portrait(w, h) {
    const cx = w / 2;
    const top = h * 0.14;
    const left = w * 0.12;
    const right = w * 0.88;
    const bottom = h * 0.84;
    const out = [
      `  <rect x="${n(left)}" y="${n(top)}" width="${n(right - left)}" height="${n(bottom - top)}" fill="url(#wash)" opacity="0.28" stroke="${C.edge}" stroke-width="1"/>`,
    ];
    /* Crop marks on the four corners of the plate. */
    [[left, top, 1, 1], [right, top, -1, 1], [left, bottom, 1, -1], [right, bottom, -1, -1]].forEach(([x, y, sx, sy]) => {
      out.push(A(`M${n(x)} ${n(y + 34 * sy)}V${n(y)}H${n(x + 34 * sx)}`, 2.4, C.brass));
    });
    /* Head and shoulders, drawn as a setting-out diagram. */
    const headR = h * 0.115;
    const headY = h * 0.38;
    out.push(`  <circle cx="${n(cx)}" cy="${n(headY)}" r="${n(headR)}" fill="none" stroke="${C.stroke}" stroke-width="2.6"/>`);
    out.push(S(`M${n(cx - w * 0.26)} ${n(bottom)}q0 -${n(h * 0.26)} ${n(w * 0.26)} -${n(h * 0.26)}q${n(w * 0.26)} 0 ${n(w * 0.26)} ${n(h * 0.26)}`, 2.6));
    out.push(`  <path d="M${n(cx - w * 0.26)} ${n(bottom)}q0 -${n(h * 0.26)} ${n(w * 0.26)} -${n(h * 0.26)}q${n(w * 0.26)} 0 ${n(w * 0.26)} ${n(h * 0.26)}Z" fill="url(#wash)" opacity="0.35"/>`);
    /* Centre line and the two levels a portrait is set out from. */
    out.push(A(`M${n(cx)} ${n(top - 20)}V${n(bottom + 20)}`, 1.4, C.signal));
    out.push(A(`M${n(left)} ${n(headY)}H${n(right)}`, 1.6, C.signal));
    out.push(A(`M${n(left)} ${n(headY + headR * 2.4)}H${n(right)}`, 2, C.brass));
    for (let i = 0; i < 9; i += 1) {
      const y = top + ((bottom - top) / 9) * i;
      out.push(S(`M${n(left - 14)} ${n(y)}h14`, 1, 0.35));
      out.push(S(`M${n(right)} ${n(y)}h14`, 1, 0.35));
    }
    return out.join('\n');
  },

  /* Enquiry: a site plan with a north point and a marked entrance. */
  contact(w, h, seed) {
    const r = rng(seed);
    const out = [R(w * 0.14, h * 0.2, w * 0.4, h * 0.44, 'url(#wash)', 2.4)];
    out.push(R(w * 0.6, h * 0.34, w * 0.26, h * 0.3, 'none', 2));
    for (let i = 1; i < 5; i += 1) out.push(S(`M${n(w * 0.14)} ${n(h * 0.2 + (h * 0.44 / 5) * i)}H${n(w * 0.54)}`, 1, 0.22));
    out.push(A(`M${n(w * 0.06)} ${n(h * 0.74)}H${n(w * 0.94)}`, 3, C.brass));
    for (let i = 0; i < 8; i += 1) out.push(S(`M${n(w * 0.08 + i * (w * 0.11))} ${n(h * 0.74)}v${n(14 + r() * 10)}`, 1, 0.3));
    out.push(A(`M${n(w * 0.34)} ${n(h * 0.64)}V${n(h * 0.74)}`, 3, C.signal));
    out.push(`  <circle cx="${n(w * 0.34)}" cy="${n(h * 0.64)}" r="12" fill="none" stroke="${C.signal}" stroke-width="2.4"/>`);
    out.push(`  <circle cx="${n(w * 0.88)}" cy="${n(h * 0.16)}" r="24" fill="none" stroke="${C.stroke}" stroke-width="1.6"/>`);
    out.push(A(`M${n(w * 0.88)} ${n(h * 0.16 - 32)}v64`, 2, C.brass));
    return out.join('\n');
  },

  /* Offshore: a fixed jacket, its deck and the riser bundle coming up it. */
  platform(w, h, seed) {
    const r = rng(seed);
    const sea = h * 0.4;
    const bed = h * 0.86;
    const cx = w * 0.46;
    const legTop = h * 0.3;
    const out = [];
    /* Water column, drawn as a tint rather than a colour block. */
    out.push(`  <rect x="0" y="${n(sea)}" width="${w}" height="${n(bed - sea)}" fill="url(#wash)" opacity="0.5"/>`);
    out.push(A(`M0 ${n(sea)}H${w}`, 2.4, C.signal));
    for (let i = 0; i < 4; i += 1) {
      out.push(S(`M${n(w * 0.04 + r() * 40)} ${n(sea + 26 + i * 30)}h${n(w * (0.2 + r() * 0.16))}`, 1, 0.24));
      out.push(S(`M${n(w * 0.62 + r() * 40)} ${n(sea + 40 + i * 30)}h${n(w * (0.16 + r() * 0.14))}`, 1, 0.24));
    }
    /* Deck box and topsides. */
    out.push(R(cx - w * 0.2, legTop - h * 0.12, w * 0.4, h * 0.12, 'url(#wash)', 2.6));
    out.push(S(`M${n(cx - w * 0.2)} ${n(legTop)}H${n(cx + w * 0.2)}`, 3));
    for (let i = 1; i < 4; i += 1) out.push(S(`M${n(cx - w * 0.2 + (w * 0.4 / 4) * i)} ${n(legTop - h * 0.12)}V${n(legTop)}`, 1.2, 0.4));
    out.push(A(`M${n(cx + w * 0.17)} ${n(legTop - h * 0.12)}V${n(h * 0.08)}`, 3, C.stroke));
    out.push(A(`M${n(cx + w * 0.17)} ${n(h * 0.08)}q16 -30 40 -14`, 3, C.brass));
    /* Jacket legs and bracing down to the mudline. */
    const spread = w * 0.16;
    const spreadBase = w * 0.24;
    [[-1], [1]].forEach(([s]) => {
      out.push(S(`M${n(cx + s * spread)} ${n(legTop)}L${n(cx + s * spreadBase)} ${n(bed)}`, 3));
    });
    for (let i = 0; i < 5; i += 1) {
      const t0 = i / 5;
      const t1 = (i + 1) / 5;
      const y0 = legTop + (bed - legTop) * t0;
      const y1 = legTop + (bed - legTop) * t1;
      const x0 = spread + (spreadBase - spread) * t0;
      const x1 = spread + (spreadBase - spread) * t1;
      out.push(S(`M${n(cx - x0)} ${n(y0)}L${n(cx + x1)} ${n(y1)}`, 1.4, 0.7));
      out.push(S(`M${n(cx + x0)} ${n(y0)}L${n(cx - x1)} ${n(y1)}`, 1.4, 0.7));
      out.push(S(`M${n(cx - x0)} ${n(y0)}H${n(cx + x0)}`, 1.2, 0.45));
    }
    /* Riser bundle and the clamp that holds it. */
    out.push(A(`M${n(cx + spread * 0.55)} ${n(legTop)}V${n(bed)}`, 2.6, C.signal));
    out.push(A(`M${n(cx + spread * 0.55 - 26)} ${n(sea + (bed - sea) * 0.45)}h52`, 4, C.brass));
    out.push(ground(w, bed, 44));
    out.push(dimline(cx - spreadBase, cx + spreadBase, bed + 26, 6));
    return out.join('\n');
  },

  /* Underwater: a diver on the structure, umbilical back to the surface. */
  diver(w, h, seed) {
    const r = rng(seed);
    const sea = h * 0.2;
    const bed = h * 0.88;
    const out = [`  <rect x="0" y="${n(sea)}" width="${w}" height="${n(bed - sea)}" fill="url(#wash)" opacity="0.55"/>`];
    out.push(A(`M0 ${n(sea)}H${w}`, 2.6, C.signal));
    for (let i = 0; i < 5; i += 1) {
      out.push(S(`M${n(w * 0.05 + r() * 60)} ${n(sea + 22 + i * 26)}h${n(w * (0.18 + r() * 0.2))}`, 1, 0.22));
    }
    /* Pile with a repair jacket, which is what the diver is down there for. */
    const px = w * 0.68;
    out.push(R(px, sea - h * 0.1, w * 0.07, bed - sea + h * 0.1, 'none', 2.6));
    out.push(R(px - 10, h * 0.5, w * 0.07 + 20, h * 0.22, 'url(#wash)', 2.2));
    out.push(A(`M${n(px - 10)} ${n(h * 0.5)}h${n(w * 0.07 + 20)}`, 3.4, C.brass));
    out.push(A(`M${n(px - 10)} ${n(h * 0.72)}h${n(w * 0.07 + 20)}`, 3.4, C.brass));
    /* Diver: helmet, rig, fins, and the umbilical run back up. */
    const dx = w * 0.42;
    const dy = h * 0.56;
    out.push(`  <circle cx="${n(dx)}" cy="${n(dy)}" r="26" fill="url(#wash)" stroke="${C.stroke}" stroke-width="2.6"/>`);
    out.push(A(`M${n(dx + 16)} ${n(dy - 14)}q10 -8 16 -2`, 2.4, C.brass));
    out.push(S(`M${n(dx - 6)} ${n(dy + 26)}q-26 34 -10 76`, 2.6));
    out.push(S(`M${n(dx + 14)} ${n(dy + 26)}q24 32 8 74`, 2.6));
    out.push(S(`M${n(dx - 4)} ${n(dy + 40)}L${n(px - 12)} ${n(h * 0.56)}`, 2.2));
    out.push(S(`M${n(dx + 12)} ${n(dy + 46)}L${n(px - 14)} ${n(h * 0.64)}`, 2.2));
    out.push(A(`M${n(dx - 18)} ${n(dy - 10)}C${n(w * 0.3)} ${n(h * 0.44)} ${n(w * 0.2)} ${n(h * 0.3)} ${n(w * 0.12)} ${n(sea)}`, 2.6, C.brass));
    /* Dive stage hanging off the surface spread. */
    out.push(R(w * 0.08, sea - h * 0.06, w * 0.09, h * 0.05, 'none', 2.2));
    out.push(S(`M${n(w * 0.125)} ${n(sea - h * 0.06)}V${n(h * 0.02)}`, 2));
    out.push(ground(w, bed, 40));
    return out.join('\n');
  },

  /* A tank farm in elevation, inside its bund. */
  tankfarm(w, h, seed) {
    const r = rng(seed);
    const base = h * 0.76;
    const out = [];
    let x = w * 0.08;
    let i = 0;
    while (x < w * 0.88) {
      const tw = w * (0.13 + r() * 0.06);
      const th = h * (0.26 + r() * 0.2);
      out.push(R(x, base - th, tw, th, i % 2 ? 'url(#wash)' : 'none', 2.6));
      out.push(`  <ellipse cx="${n(x + tw / 2)}" cy="${n(base - th)}" rx="${n(tw / 2)}" ry="${n(th * 0.06)}" fill="none" stroke="${C.stroke}" stroke-width="2.2"/>`);
      /* Shell courses and the spiral stair. */
      for (let y = base - th + 22; y < base - 10; y += 26) out.push(S(`M${n(x)} ${n(y)}H${n(x + tw)}`, 1, 0.3));
      out.push(A(`M${n(x + tw)} ${n(base)}q${n(tw * 0.35)} -${n(th * 0.5)} 0 -${n(th)}`, 2, C.brass));
      x += tw + w * 0.04;
      i += 1;
    }
    /* Bund wall and the manifold running in front of it. */
    out.push(S(`M${n(w * 0.04)} ${n(base)}H${n(w * 0.96)}`, 2.6));
    out.push(S(`M${n(w * 0.04)} ${n(base)}V${n(base - h * 0.08)}`, 2.6));
    out.push(S(`M${n(w * 0.96)} ${n(base)}V${n(base - h * 0.08)}`, 2.6));
    out.push(A(`M${n(w * 0.06)} ${n(base + h * 0.06)}H${n(w * 0.94)}`, 4, C.signal));
    out.push(A(`M${n(w * 0.06)} ${n(base + h * 0.1)}H${n(w * 0.94)}`, 2.4, C.brass));
    for (let px = w * 0.12; px < w * 0.92; px += w * 0.1) out.push(S(`M${n(px)} ${n(base + h * 0.04)}V${n(base + h * 0.13)}`, 1.6, 0.5));
    out.push(ground(w, base + h * 0.16, 40));
    return out.join('\n');
  },

  /* A dam in section, with the outlet works through it. */
  dam(w, h) {
    const crest = h * 0.26;
    const toe = h * 0.82;
    const out = [];
    out.push(`  <path d="M${n(w * 0.34)} ${n(crest)}H${n(w * 0.46)}L${n(w * 0.64)} ${n(toe)}H${n(w * 0.28)}Z" fill="url(#wash)" stroke="${C.stroke}" stroke-width="3"/>`);
    /* Reservoir side, with the water surface and the drawdown line. */
    out.push(`  <rect x="0" y="${n(crest + 26)}" width="${n(w * 0.34)}" height="${n(toe - crest - 26)}" fill="url(#wash)" opacity="0.5"/>`);
    out.push(A(`M0 ${n(crest + 26)}H${n(w * 0.34)}`, 2.6, C.signal));
    out.push(A(`M0 ${n(crest + 62)}H${n(w * 0.33)}`, 1.6, C.brass));
    /* Intake tower, conduit and the jet-flow gate at the far end. */
    out.push(R(w * 0.24, crest, w * 0.05, toe - crest, 'none', 2.4));
    out.push(A(`M${n(w * 0.265)} ${n(crest)}V${n(toe)}`, 1.6, C.signal));
    out.push(A(`M${n(w * 0.265)} ${n(toe - h * 0.08)}H${n(w * 0.78)}`, 5, C.signal));
    out.push(A(`M${n(w * 0.72)} ${n(toe - h * 0.12)}v${n(h * 0.08)}`, 4, C.brass));
    out.push(S(`M${n(w * 0.78)} ${n(toe - h * 0.12)}l${n(w * 0.1)} ${n(h * 0.04)}l-${n(w * 0.1)} ${n(h * 0.04)}Z`, 2.4));
    out.push(ground(w, toe, 46));
    out.push(dimline(w * 0.28, w * 0.64, toe + 28, 6));
    return out.join('\n');
  },

  /* A switchyard: lattice structures, bus, and a transformer on its pad. */
  substation(w, h, seed) {
    const r = rng(seed);
    const base = h * 0.76;
    const out = [];
    for (let i = 0; i < 5; i += 1) {
      const x = w * 0.1 + i * (w * 0.17);
      const sh = h * (0.32 + r() * 0.16);
      out.push(S(`M${n(x)} ${n(base)}L${n(x + 16)} ${n(base - sh)}`, 2.2));
      out.push(S(`M${n(x + 60)} ${n(base)}L${n(x + 44)} ${n(base - sh)}`, 2.2));
      for (let k = 0; k < 6; k += 1) {
        const t0 = k / 6;
        const t1 = (k + 1) / 6;
        const y0 = base - sh * t0;
        const y1 = base - sh * t1;
        out.push(S(`M${n(x + 60 - 44 * t0)} ${n(y0)}L${n(x + 16 + 44 * (1 - t1))} ${n(y1)}`, 1, 0.45));
      }
      out.push(S(`M${n(x + 10)} ${n(base - sh)}H${n(x + 50)}`, 2.2));
      /* Insulator stacks carrying the bus. */
      out.push(A(`M${n(x + 30)} ${n(base - sh)}v-${n(h * 0.06)}`, 2.4, C.brass));
    }
    out.push(A(`M${n(w * 0.08)} ${n(base - h * 0.44)}H${n(w * 0.94)}`, 2.6, C.signal));
    out.push(A(`M${n(w * 0.08)} ${n(base - h * 0.4)}H${n(w * 0.94)}`, 2.6, C.signal));
    /* Transformer, on the pad it needed drilled piers for. */
    out.push(R(w * 0.76, base - h * 0.18, w * 0.16, h * 0.18, 'url(#wash)', 2.6));
    for (let f = 0; f < 6; f += 1) out.push(S(`M${n(w * 0.77 + f * (w * 0.026))} ${n(base - h * 0.18)}V${n(base)}`, 1.4, 0.45));
    out.push(A(`M${n(w * 0.74)} ${n(base)}H${n(w * 0.95)}`, 4, C.brass));
    out.push(ground(w, base, 40));
    return out.join('\n');
  },

  /* Subsea pipeline with a split clamp over the damaged section. */
  pipeline(w, h, seed) {
    const r = rng(seed);
    const sea = h * 0.16;
    const bed = h * 0.72;
    const out = [`  <rect x="0" y="${n(sea)}" width="${w}" height="${n(bed - sea)}" fill="url(#wash)" opacity="0.5"/>`];
    out.push(A(`M0 ${n(sea)}H${w}`, 2.4, C.signal));
    /* The line itself, sagging between two touchdown points. */
    out.push(S(`M0 ${n(bed - 40)}C${n(w * 0.3)} ${n(bed + 10)} ${n(w * 0.7)} ${n(bed + 10)} ${w} ${n(bed - 52)}`, 4));
    out.push(S(`M0 ${n(bed - 12)}C${n(w * 0.3)} ${n(bed + 42)} ${n(w * 0.7)} ${n(bed + 42)} ${w} ${n(bed - 24)}`, 4));
    /* Clamp, bolted over the dent. */
    out.push(R(w * 0.46, bed - 34, w * 0.14, 68, 'url(#wash)', 3));
    out.push(A(`M${n(w * 0.46)} ${n(bed - 34)}h${n(w * 0.14)}`, 4, C.brass));
    out.push(A(`M${n(w * 0.46)} ${n(bed + 34)}h${n(w * 0.14)}`, 4, C.brass));
    for (let i = 0; i < 4; i += 1) {
      out.push(`  <circle cx="${n(w * 0.475 + i * (w * 0.036))}" cy="${n(bed - 34)}" r="5" fill="${C.stroke}"/>`);
      out.push(`  <circle cx="${n(w * 0.475 + i * (w * 0.036))}" cy="${n(bed + 34)}" r="5" fill="${C.stroke}"/>`);
    }
    /* Seabed, and the ROV watching the job. */
    out.push(ground(w, bed + 58, 40));
    out.push(R(w * 0.18, sea + h * 0.14, w * 0.09, h * 0.09, 'none', 2.2));
    out.push(A(`M${n(w * 0.225)} ${n(sea + h * 0.14)}V${n(sea)}`, 2, C.brass));
    for (let i = 0; i < 3; i += 1) out.push(S(`M${n(w * 0.27)} ${n(sea + h * 0.17 + i * 10)}h${n(w * 0.06 + r() * 20)}`, 1.4, 0.4));
    return out.join('\n');
  },

  /* A welded joint, drawn the way a weld map draws it. */
  weld(w, h) {
    const cy = h * 0.46;
    const out = [];
    /* Two plates, bevelled, with the weld metal between them. */
    out.push(`  <path d="M${n(w * 0.08)} ${n(cy - 46)}H${n(w * 0.46)}L${n(w * 0.49)} ${n(cy)}L${n(w * 0.46)} ${n(cy + 46)}H${n(w * 0.08)}Z" fill="url(#wash)" stroke="${C.stroke}" stroke-width="2.6"/>`);
    out.push(`  <path d="M${n(w * 0.92)} ${n(cy - 46)}H${n(w * 0.54)}L${n(w * 0.51)} ${n(cy)}L${n(w * 0.54)} ${n(cy + 46)}H${n(w * 0.92)}Z" fill="url(#wash)" stroke="${C.stroke}" stroke-width="2.6"/>`);
    /* Weld passes, root first. */
    for (let i = 0; i < 5; i += 1) {
      const rx = 14 + i * 7;
      const ry = 9 + i * 5;
      out.push(`  <ellipse cx="${n(w * 0.5)}" cy="${n(cy - 20 + i * 10)}" rx="${n(rx)}" ry="${n(ry)}" fill="none" stroke="${C.brass}" stroke-width="2.2"/>`);
    }
    out.push(A(`M${n(w * 0.5)} ${n(cy + 60)}V${n(cy + 120)}`, 2.4, C.signal));
    out.push(A(`M${n(w * 0.5)} ${n(cy + 120)}H${n(w * 0.78)}`, 2.4, C.signal));
    out.push(S(`M${n(w * 0.56)} ${n(cy + 120)}l18 -16v32Z`, 2));
    out.push(dimline(w * 0.08, w * 0.92, h * 0.78, 12));
    return out.join('\n');
  },

  /* Tower crane over a rising frame: the commercial-site motif. */
  crane(w, h, seed) {
    const r = rng(seed);
    const base = h * 0.78;
    const mast = w * 0.26;
    const jibY = h * 0.18;
    const out = [];
    /* Frame going up under it. */
    const fx = w * 0.44;
    const fw = w * 0.4;
    const fh = h * 0.44;
    out.push(R(fx, base - fh, fw, fh, 'url(#wash)', 2.4));
    for (let i = 1; i < 6; i += 1) out.push(S(`M${n(fx)} ${n(base - fh + (fh / 6) * i)}H${n(fx + fw)}`, 1.2, 0.4));
    for (let i = 1; i < 5; i += 1) out.push(S(`M${n(fx + (fw / 5) * i)} ${n(base - fh)}V${n(base)}`, 1.2, 0.4));
    /* Mast, jib and counter-jib. */
    out.push(S(`M${n(mast - 16)} ${n(base)}V${n(jibY)}`, 2.6));
    out.push(S(`M${n(mast + 16)} ${n(base)}V${n(jibY)}`, 2.6));
    for (let y = jibY; y < base - 10; y += 34) out.push(S(`M${n(mast - 16)} ${n(y)}L${n(mast + 16)} ${n(y + 34)}`, 1.2, 0.5));
    out.push(A(`M${n(mast - w * 0.1)} ${n(jibY)}H${n(w * 0.9)}`, 3.4, C.brass));
    out.push(S(`M${n(mast - w * 0.1)} ${n(jibY - 22)}H${n(w * 0.86)}`, 1.6, 0.6));
    for (let x = mast; x < w * 0.86; x += w * 0.07) out.push(S(`M${n(x)} ${n(jibY)}L${n(x + w * 0.035)} ${n(jibY - 22)}`, 1.2, 0.45));
    /* Hoist rope and the load on the end of it. */
    const hx = w * 0.64 + r() * w * 0.08;
    out.push(A(`M${n(hx)} ${n(jibY)}V${n(base - fh - 40)}`, 2, C.signal));
    out.push(R(hx - 34, base - fh - 40, 68, 22, 'none', 2.2));
    out.push(ground(w, base, 40));
    return out.join('\n');
  },

  /* Rebar cage in a column, before the pour. */
  rebar(w, h) {
    const x = w * 0.3;
    const bw = w * 0.4;
    const top = h * 0.12;
    const base = h * 0.8;
    const out = [R(x, top, bw, base - top, 'url(#wash)', 2.4)];
    /* Verticals. */
    for (let i = 0; i <= 6; i += 1) {
      const vx = x + (bw / 6) * i;
      out.push(S(`M${n(vx)} ${n(top)}V${n(base)}`, i % 3 === 0 ? 2.6 : 1.6, i % 3 === 0 ? 1 : 0.6));
    }
    /* Ties, closer together at the ends where the shear is. */
    let y = top + 14;
    let step = 18;
    while (y < base) {
      out.push(A(`M${n(x - 8)} ${n(y)}H${n(x + bw + 8)}`, 2, y < top + 120 || y > base - 120 ? C.brass : C.signal));
      step = y < top + 120 || y > base - 120 ? 18 : 34;
      y += step;
    }
    out.push(dimline(x, x + bw, base + 30, 6));
    out.push(ground(w, base + 54, 34));
    return out.join('\n');
  },

};

/* ----------------------------------------------------------------- sheets --- */

const LAND = { w: 1200, h: 820 };
/* The page-level bands are cropped to a wide strip on the site, so the sheet
   is drawn at that shape rather than being trimmed to it. */
const WIDE = { w: 1920, h: 660 };
const TALL = { w: 760, h: 900 };

/* The page-level slots, which images.json falls back on. */
const pageSheets = [
  { file: 'site-underlay.svg', motif: 'plan', title: 'MERIDIAN · SITE SURVEY', code: 'GA-00', scale: 'SCALE 1:2500', size: WIDE },
  { file: 'capabilities.svg', motif: 'model', title: 'FEDERATED MODEL · AXONOMETRIC', code: 'DE-01', scale: 'SCALE 1:200', size: WIDE },
  { file: 'practice.svg', motif: 'loads', title: 'LOAD PATH · TEST CASE', code: 'ST-02', scale: 'SCALE 1:100', size: WIDE },
  { file: 'selected-work.svg', motif: 'skyline', title: 'SELECTED WORK · ELEVATION', code: 'GA-03', scale: 'SCALE 1:500', size: WIDE },
  { file: 'contact.svg', motif: 'contact', title: 'MERIDIAN STUDIO · SITE PLAN', code: 'GA-05', scale: 'SCALE 1:400', size: LAND },
  { file: 'careers.svg', motif: 'studio', title: 'THE STUDIO · SECTION', code: 'HR-01', scale: 'SCALE 1:75', size: LAND },
  { file: 'leadership.svg', motif: 'portrait', title: 'PRINCIPAL-LED DELIVERY', code: 'LDR-01', scale: 'PORTRAIT PLATE', size: TALL },
];

/**
 * The shared plate library.
 *
 * Every project and every discipline draws from these rather than owning a
 * picture each: a wharf repair looks like a wharf repair whichever job it was
 * on, and twenty-nine plates is a set somebody can actually go and shoot.
 * Two rules keep the reuse from reading as a mistake — no plate appears twice
 * on the same page, and no two projects share a hero — and both are checked
 * below rather than trusted.
 */
const libSheets = [
  { file: 'lib/steel-frame-erection.svg', motif: 'crane', title: 'STEEL FRAME ERECTION', code: 'L-01' },
  { file: 'lib/bolt-up-height.svg', motif: 'weld', title: 'BOLTED CONNECTION · DETAIL', code: 'L-02' },
  { file: 'lib/core-slipform.svg', motif: 'tower', title: 'CORE SLIPFORM · ELEVATION', code: 'L-03' },
  { file: 'lib/rebar-cage.svg', motif: 'rebar', title: 'REINFORCEMENT · SECTION', code: 'L-04' },
  { file: 'lib/curtain-wall.svg', motif: 'facade', title: 'CURTAIN WALL · ELEVATION', code: 'L-05' },
  { file: 'lib/night-pour.svg', motif: 'loads', title: 'DECK POUR · LOAD CASE', code: 'L-06' },
  { file: 'lib/crane-lift.svg', motif: 'tower', title: 'MODULE LIFT · RIGGING', code: 'L-07' },
  { file: 'lib/fabrication-shop.svg', motif: 'canopy', title: 'SHOP FABRICATION · JOINT', code: 'L-08' },
  { file: 'lib/retrofit-interior.svg', motif: 'facade', title: 'EXISTING FRAME · SURVEY', code: 'L-09' },
  { file: 'lib/pipe-rack.svg', motif: 'plant', title: 'PIPE RACK · GENERAL ARRANGEMENT', code: 'L-10' },
  { file: 'lib/tank-shell.svg', motif: 'tankfarm', title: 'TANK SHELL · ELEVATION', code: 'L-11' },
  { file: 'lib/weld-habitat-tent.svg', motif: 'weld', title: 'WELD PROCEDURE · JOINT DETAIL', code: 'L-12' },
  { file: 'lib/turnaround-scaffold.svg', motif: 'refinery', title: 'PROCESS UNIT · TURNAROUND', code: 'L-13' },
  { file: 'lib/diver-underwater.svg', motif: 'diver', title: 'DIVE REPAIR · SECTION', code: 'L-14' },
  { file: 'lib/dive-spread-deck.svg', motif: 'platform', title: 'SURFACE SPREAD · DIVE STATION', code: 'L-15' },
  { file: 'lib/dive-bell-moonpool.svg', motif: 'lock', title: 'SATURATION SPREAD · MOON POOL', code: 'L-16' },
  { file: 'lib/subsea-clamp.svg', motif: 'pipeline', title: 'SUBSEA CLAMP · SECTION', code: 'L-17' },
  { file: 'lib/wharf-underdeck.svg', motif: 'piles', title: 'WHARF UNDERDECK · SECTION', code: 'L-18' },
  { file: 'lib/offshore-platform.svg', motif: 'platform', title: 'FIXED PLATFORM · ELEVATION', code: 'L-19' },
  { file: 'lib/port-wharf-cranes.svg', motif: 'portal', title: 'CONTAINER BERTH · SECTION', code: 'L-20' },
  { file: 'lib/bridge-girder-set.svg', motif: 'bridge', title: 'GIRDER ERECTION · ELEVATION', code: 'L-21' },
  { file: 'lib/deck-rebar-falsework.svg', motif: 'viaduct', title: 'DECK AND FALSEWORK · ELEVATION', code: 'L-22' },
  { file: 'lib/dam-cofferdam.svg', motif: 'dam', title: 'DAM OUTLET · SECTION', code: 'L-23' },
  { file: 'lib/channel-earthworks.svg', motif: 'plan', title: 'CHANNEL WORKS · SITE PLAN', code: 'L-24' },
  { file: 'lib/switchyard-lattice.svg', motif: 'substation', title: 'SWITCHYARD · ELEVATION', code: 'L-25' },
  { file: 'lib/transformer-set.svg', motif: 'crane', title: 'TRANSFORMER · SETTING OUT', code: 'L-26' },
  { file: 'lib/piling-rig.svg', motif: 'piles', title: 'PILING · SECTION', code: 'L-27' },
  { file: 'lib/plant-room.svg', motif: 'portal', title: 'PLANT ROOM · LAYOUT', code: 'L-28' },
  { file: 'lib/model-review.svg', motif: 'model', title: 'FEDERATED MODEL · REVIEW', code: 'L-29' },
].map((s) => ({ ...s, scale: 'SCALE 1:100', size: LAND }));

const projects = require('../src/data/projects.json');
const services = require('../src/data/services.json');

/* --------------------------------------------------------------- checks --- */

const plates = (entry) => [entry.image, ...(entry.gallery || []).map((g) => g.src)];
const drawn = new Set([...pageSheets, ...libSheets].map((s) => `/assets/img/${s.file}`));
const problems = [];

[...projects, ...services].forEach((entry) => {
  const list = plates(entry);
  list
    .filter((src) => src.endsWith('.svg') && !drawn.has(src))
    .forEach((src) => problems.push(`${entry.id}: nothing draws ${src}`));
  const seen = new Set();
  list.forEach((src) => {
    if (seen.has(src)) problems.push(`${entry.id}: ${src} appears twice on the same page`);
    seen.add(src);
  });
});

const heroes = new Map();
projects.forEach((p) => {
  if (heroes.has(p.image)) problems.push(`${p.id} and ${heroes.get(p.image)} share a hero image`);
  heroes.set(p.image, p.id);
});

/* Until the photographs land, every plate is a drawing, and two drawings from
   the same motif look like the same picture however different the jobs are.
   So motifs have to be distinct within a page, and across the twelve heroes
   the projects listing shows side by side. */
const motifOf = new Map(libSheets.map((s) => [`/assets/img/${s.file}`, s.motif]));
[...projects, ...services].forEach((entry) => {
  const seen = new Map();
  plates(entry).forEach((src) => {
    const motif = motifOf.get(src);
    if (!motif) return;
    if (seen.has(motif)) problems.push(`${entry.id}: ${src} and ${seen.get(motif)} are both drawn as "${motif}"`);
    seen.set(motif, src);
  });
});
const heroMotifs = new Map();
projects.forEach((p) => {
  const motif = motifOf.get(p.image);
  if (!motif) return;
  if (heroMotifs.has(motif)) problems.push(`${p.id} and ${heroMotifs.get(motif)} have heroes drawn as "${motif}"`);
  heroMotifs.set(motif, p.id);
});

if (problems.length) {
  problems.forEach((line) => console.error(`[artwork] ${line}`));
  process.exit(1);
}

/* ---------------------------------------------------------------- write --- */

let written = 0;
for (const sheet of [...pageSheets, ...libSheets]) {
  const { w, h } = sheet.size;
  const draw = motifs[sheet.motif];
  if (!draw) {
    console.error(`[artwork] unknown motif "${sheet.motif}" for ${sheet.file}`);
    process.exit(1);
  }
  const out = svg({ w, h, title: sheet.title, code: sheet.code, scale: sheet.scale, body: draw(w, h, sheet.file) });
  const dest = path.join(OUT, sheet.file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, out, 'utf8');
  written += 1;
}

const referenced = new Set([...projects, ...services].flatMap(plates));
console.log(
  `[artwork] wrote ${written} drawings: ${pageSheets.length} page bands and ` +
    `${libSheets.length} library plates, carrying ${referenced.size} image slots across the site`
);
