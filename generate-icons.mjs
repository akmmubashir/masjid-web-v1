/**
 * Generates minimal valid PNG icons for PWA using pure Node.js (no dependencies).
 * Creates a simple colored square with a crescent moon symbol.
 */
import { writeFileSync } from 'fs';
import { createHash } from 'crypto';
import zlib from 'zlib';

function crc32(buf) {
  const table = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[i] = c;
    }
    return t;
  })();
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function writePNG(size, bgR, bgG, bgB, fgR, fgG, fgB) {
  // Create RGBA pixel data
  const pixels = new Uint8Array(size * size * 4);

  // Fill background
  for (let i = 0; i < size * size; i++) {
    pixels[i * 4 + 0] = bgR;
    pixels[i * 4 + 1] = bgG;
    pixels[i * 4 + 2] = bgB;
    pixels[i * 4 + 3] = 255;
  }

  // Draw a simple crescent/dome shape in foreground color
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.35;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Outer circle
      const inOuter = dist <= r;
      // Inner circle offset to create crescent
      const innerCx = cx + r * 0.25;
      const innerCy = cy - r * 0.05;
      const innerR = r * 0.78;
      const dxi = x - innerCx;
      const dyi = y - innerCy;
      const distInner = Math.sqrt(dxi * dxi + dyi * dyi);
      const inInner = distInner <= innerR;

      if (inOuter && !inInner) {
        const idx = (y * size + x) * 4;
        pixels[idx + 0] = fgR;
        pixels[idx + 1] = fgG;
        pixels[idx + 2] = fgB;
        pixels[idx + 3] = 255;
      }

      // Draw a small star
      const starCx = cx + r * 0.3;
      const starCy = cy - r * 0.1;
      const starR = r * 0.12;
      const dxs = x - starCx;
      const dys = y - starCy;
      const distStar = Math.sqrt(dxs * dxs + dys * dys);
      if (distStar <= starR) {
        const idx = (y * size + x) * 4;
        pixels[idx + 0] = fgR;
        pixels[idx + 1] = fgG;
        pixels[idx + 2] = fgB;
        pixels[idx + 3] = 255;
      }
    }
  }

  // Build raw image data (filter byte 0 = None per row)
  const rawRows = [];
  for (let y = 0; y < size; y++) {
    const row = Buffer.alloc(1 + size * 4);
    row[0] = 0; // filter type None
    for (let x = 0; x < size; x++) {
      const src = (y * size + x) * 4;
      row[1 + x * 4 + 0] = pixels[src + 0];
      row[1 + x * 4 + 1] = pixels[src + 1];
      row[1 + x * 4 + 2] = pixels[src + 2];
      row[1 + x * 4 + 3] = pixels[src + 3];
    }
    rawRows.push(row);
  }
  const rawData = Buffer.concat(rawRows);
  const compressed = zlib.deflateSync(rawData, { level: 6 });

  function chunk(type, data) {
    const typeBytes = Buffer.from(type, 'ascii');
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);
    const crcInput = Buffer.concat([typeBytes, data]);
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(crcInput), 0);
    return Buffer.concat([lenBuf, typeBytes, data, crcBuf]);
  }

  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type RGBA
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

// Navy blue background (#1e3a5f = 30, 58, 95), gold foreground (#c9a84c = 201, 168, 76)
const bg = [30, 58, 95];
const fg = [201, 168, 76];

writeFileSync('public/pwa-192x192.png', writePNG(192, ...bg, ...fg));
writeFileSync('public/pwa-512x512.png', writePNG(512, ...bg, ...fg));
writeFileSync('public/apple-touch-icon.png', writePNG(180, ...bg, ...fg));

console.log('PWA icons generated successfully in public/');
