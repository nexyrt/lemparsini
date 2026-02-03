import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, parse } from 'path';

const publicDir = './public';

async function optimizeImages() {
  const files = await readdir(publicDir);

  for (const file of files) {
    const filePath = join(publicDir, file);
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) continue;

    const ext = parse(file).ext.toLowerCase();
    const name = parse(file).name;

    if (['.png', '.jpg', '.jpeg'].includes(ext)) {
      console.log(`Processing: ${file}`);

      const originalSize = fileStat.size;

      // Convert to WebP
      const webpPath = join(publicDir, `${name}.webp`);
      await sharp(filePath)
        .webp({ quality: 80 })
        .toFile(webpPath);

      const webpStat = await stat(webpPath);
      const savings = ((originalSize - webpStat.size) / originalSize * 100).toFixed(1);

      console.log(`  Original: ${(originalSize / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  WebP: ${(webpStat.size / 1024 / 1024).toFixed(2)} MB`);
      console.log(`  Savings: ${savings}%`);
      console.log('');
    }
  }

  console.log('Done! WebP versions created.');
  console.log('Update your code to use .webp files instead of .png');
}

optimizeImages().catch(console.error);
