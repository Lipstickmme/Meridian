'use strict';

/**
 * Draw the Meridian mark: the site icon in the three forms a browser asks for.
 *
 * The mark is the same one the nav draws inline — a folded M sitting on its
 * baseline — so the tab, the home-screen icon and the wordmark cannot drift
 * apart. Geometry is defined once, in a 48 x 48 grid, and rasterised here with
 * no image library: a stroke is every pixel within half a stroke-width of the
 * centreline, which gives round joins and caps for free.
 *
 * Run: npm run icons   (output: public/favicon.svg, favicon.png, apple-touch-icon.png)
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PUBLIC = path.join(__dirname, '..', 'public');

const INK = [10, 26, 36]; // #0a1a24, the site's deep marine
const LINE = [244, 242, 236]; // #f4f2ec, limestone
const BRASS = [217, 164, 65]; // #d9a441

/* The mark, in a 48 x 48 grid. */
const M_STROKE = [
  [[8, 38], [8, 12]],
  [[8, 12], [24, 25]],
  [[24, 25], [40, 12]],
  [[40, 12], [40, 38]],
];
const BASELINE = [[[4, 43], [44, 43]]];

/** Shortest distance from a point to a segment: what makes a stroke a stroke. */
function distToSegment(px, py, [[x1, y1], [x2, y2]]) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  let t = len2 ? ((px - x1) * dx + (py - y1) * dy) / len2 : 0;
  t = Math.max(0, Math.min(1, t));
  const cx = x1 + t * dx;
  const cy = y1 + t * dy;
  return Math.hypot(px - cx, py - cy);
}

const nearest = (px, py, segs) => Math.min(...segs.map((s) => distToSegment(px, py, s)));

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));

/** One pixel's colour, sampled on a 4 x 4 grid so the diagonals stay smooth. */
function sample(x, y, scale, radiusM, radiusBase) {
  let acc = [0, 0, 0];
  const steps = 4;
  for (let sy = 0; sy < steps; sy += 1) {
    for (let sx = 0; sx < steps; sx += 1) {
      const gx = ((x + (sx + 0.5) / steps) / scale) * 48;
      const gy = ((y + (sy + 0.5) / steps) / scale) * 48;
      let c = INK;
      if (nearest(gx, gy, BASELINE) <= radiusBase) c = mix(INK, BRASS, 0.85);
      if (nearest(gx, gy, M_STROKE) <= radiusM) c = LINE;
      acc = [acc[0] + c[0], acc[1] + c[1], acc[2] + c[2]];
    }
  }
  const total = steps * steps;
  return [Math.round(acc[0] / total), Math.round(acc[1] / total), Math.round(acc[2] / total)];
}

/* ------------------------------------------------------------------ png --- */

const crc32 = zlib.crc32
  ? (buf) => zlib.crc32(buf)
  : (() => {
      const table = new Int32Array(256);
      for (let i = 0; i < 256; i += 1) {
        let c = i;
        for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        table[i] = c;
      }
      return (buf) => {
        let c = -1;
        for (let i = 0; i < buf.length; i += 1) c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
        return (c ^ -1) >>> 0;
      };
    })();

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body) >>> 0);
  return Buffer.concat([len, body, crc]);
}

/** Minimal truecolour PNG: no image library, no dependency to keep current. */
function png(size) {
  const radiusM = 1.9;
  const radiusBase = 1.6;
  const raw = Buffer.alloc(size * (size * 3 + 1));
  let o = 0;
  for (let y = 0; y < size; y += 1) {
    raw[o] = 0; // filter: none
    o += 1;
    for (let x = 0; x < size; x += 1) {
      const [r, g, b] = sample(x, y, size, radiusM, radiusBase);
      raw[o] = r;
      raw[o + 1] = g;
      raw[o + 2] = b;
      o += 3;
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // truecolour
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', zlib.deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/* ------------------------------------------------------------------ svg --- */

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48" role="img" aria-label="Meridian Construction">
  <rect width="48" height="48" rx="6" fill="#0a1a24"/>
  <path d="M8 38V12l16 13 16-13v26" fill="none" stroke="#f4f2ec" stroke-width="3.8" stroke-linejoin="round" stroke-linecap="round"/>
  <path d="M4 43h40" stroke="#d9a441" stroke-width="3.2" stroke-linecap="round"/>
</svg>
`;

fs.writeFileSync(path.join(PUBLIC, 'favicon.svg'), svg, 'utf8');
fs.writeFileSync(path.join(PUBLIC, 'favicon.png'), png(512));
fs.writeFileSync(path.join(PUBLIC, 'apple-touch-icon.png'), png(180));

console.log('[icons] wrote favicon.svg, favicon.png (512), apple-touch-icon.png (180)');
