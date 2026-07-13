import sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const PUBLIC = join(ROOT, 'public');

async function generateFaviconPng(svgPath, size) {
  const buffer = await sharp(svgPath)
    .resize(size, size)
    .png({ quality: 100 })
    .toBuffer();
  return buffer;
}

async function generateIco(svgPath) {
  const sizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of sizes) {
    const buf = await sharp(svgPath)
      .resize(size, size)
      .png({ quality: 100 })
      .toBuffer();
    pngBuffers.push({ size, buffer: buf });
  }

  const headerLen = 6;
  const dirEntryLen = 16;
  const dirLen = dirEntryLen * pngBuffers.length;
  let dataOffset = headerLen + dirLen;

  const header = Buffer.alloc(headerLen);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngBuffers.length, 4);

  const dirEntries = [];
  for (const { size, buffer } of pngBuffers) {
    const entry = Buffer.alloc(dirEntryLen);
    entry.writeUInt8(size === 256 ? 0 : size, 0);
    entry.writeUInt8(size === 256 ? 0 : size, 1);
    entry.writeUInt16LE(0, 2);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(buffer.length, 8);
    entry.writeUInt32LE(dataOffset, 12);
    dirEntries.push(entry);
    dataOffset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...pngBuffers.map(b => b.buffer)]);
}

async function main() {
  console.log('Generating favicon assets...');

  const svgPath = join(PUBLIC, 'favicon.svg');
  const ogSvgPath = join(PUBLIC, 'og-image.svg');

  const faviconSizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'android-chrome-192x192.png' },
    { size: 512, name: 'android-chrome-512x512.png' },
  ];

  for (const { size, name } of faviconSizes) {
    const png = await generateFaviconPng(svgPath, size);
    writeFileSync(join(PUBLIC, name), png);
    console.log(`  ${name} (${size}x${size})`);
  }

  const ico = await generateIco(svgPath);
  writeFileSync(join(PUBLIC, 'favicon.ico'), ico);
  console.log('  favicon.ico (16, 32, 48)');

  const ogPng = await sharp(ogSvgPath)
    .resize(1200, 630)
    .png({ quality: 90 })
    .toBuffer();
  writeFileSync(join(PUBLIC, 'og-image.png'), ogPng);
  console.log('  og-image.png (1200x630)');

  console.log('\nAll assets generated in public/');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
