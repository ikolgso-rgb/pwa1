import { writeFileSync } from "node:fs";
import { deflateSync } from "node:zlib";

const crcTable = new Uint32Array(256).map((_, index) => {
  let c = index;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
});

function crc32(buffer) {
  let c = 0xffffffff;
  for (const byte of buffer) {
    c = crcTable[(c ^ byte) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function pixel(size, x, y) {
  const cx = size / 2;
  const cy = size / 2;
  const dx = x - cx;
  const dy = y - cy;
  const radius = Math.sqrt(dx * dx + dy * dy) / (size / 2);
  const diagonal = (x + y) / (size * 2);

  let r = Math.round(16 + diagonal * 28);
  let g = Math.round(24 + diagonal * 66);
  let b = Math.round(40 + diagonal * 110);

  if (radius < 0.42) {
    r = 37;
    g = 99;
    b = 235;
  }

  if (Math.abs(dx) < size * 0.09 || Math.abs(dy) < size * 0.09) {
    r = Math.min(255, r + 28);
    g = Math.min(255, g + 34);
    b = Math.min(255, b + 38);
  }

  return [r, g, b, 255];
}

function makePng(size) {
  const raw = Buffer.alloc((size * 4 + 1) * size);
  let offset = 0;

  for (let y = 0; y < size; y += 1) {
    raw[offset] = 0;
    offset += 1;
    for (let x = 0; x < size; x += 1) {
      const [r, g, b, a] = pixel(size, x, y);
      raw[offset] = r;
      raw[offset + 1] = g;
      raw[offset + 2] = b;
      raw[offset + 3] = a;
      offset += 4;
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

for (const size of [192, 512]) {
  writeFileSync(`public/icons/icon-${size}.png`, makePng(size));
}
