import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const groups = [
  {
    source: path.join('images', 'fotos novas', 'fotos2.0'),
    output: path.join('images', 'galeria', 'ambientes'),
    prefix: 'pousada'
  },
  {
    source: path.join('images', 'fotos novas', 'fotos2.0', 'Cama em beliche compartilhado misto'),
    output: path.join('images', 'galeria', 'beliche-misto'),
    prefix: 'beliche-misto'
  }
];

function naturalOrderName(file) {
  const name = path.parse(file).name.toLowerCase();
  if (name === 'image') return 0;
  if (name === 'image copy') return 1;

  const number = name.match(/\d+/)?.[0];
  return number ? Number(number) : Number.MAX_SAFE_INTEGER;
}

function getImages(dir) {
  return fs.readdirSync(dir, { withFileTypes: true })
    .filter(entry => entry.isFile() && /\.(png|jpe?g)$/i.test(entry.name))
    .map(entry => entry.name)
    .sort((a, b) => naturalOrderName(a) - naturalOrderName(b) || a.localeCompare(b, 'pt-BR'));
}

let total = 0;

for (const group of groups) {
  fs.mkdirSync(group.output, { recursive: true });

  const files = getImages(group.source);
  let index = 1;

  for (const file of files) {
    const input = path.join(group.source, file);
    const output = path.join(group.output, `${group.prefix}-${String(index).padStart(2, '0')}.webp`);

    await sharp(input)
      .rotate()
      .resize({ width: 1600, height: 1200, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(output);

    console.log(`${input} -> ${output}`);
    index++;
    total++;
  }
}

console.log(`Converted ${total} photos.`);
