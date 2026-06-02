import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = 'images/fotos novas';
const files = fs.readdirSync(dir)
  .filter(file => /\.(png|jpe?g)$/i.test(file))
  .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true, sensitivity: 'base' }));

let count = 1;
for (const file of files) {
  const inputPath = path.join(dir, file);
  const newName = `momento-${count}.webp`;
  const outputPath = path.join('images', newName);

  await sharp(inputPath)
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(outputPath);

  console.log(`Converted ${file} to ${newName}`);
  count++;
}

console.log(`Done: ${count - 1} photos converted.`);
