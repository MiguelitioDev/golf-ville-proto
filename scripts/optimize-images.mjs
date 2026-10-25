// Generates AVIF/WebP/JPEG variants (never upscaled) and metadata for each source image.
// Run: npm run images
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC_DIR = 'assets-src/pending'
const OUT_DIR = 'public/images/pending'
const JSON_OUT = 'src/assets/images.generated.json'
const TARGET_WIDTHS = [480, 800, 1200]

await mkdir(OUT_DIR, { recursive: true })
await mkdir(path.dirname(JSON_OUT), { recursive: true })

const result = {}
for (const file of (await readdir(SRC_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f))) {
  const id = path.parse(file).name
  const input = sharp(path.join(SRC_DIR, file))
  const { width, height } = await input.metadata()
  const stats = await input.clone().resize(1, 1, { fit: 'cover' }).raw().toBuffer()
  const placeholderColor = '#' + [...stats.subarray(0, 3)].map((v) => v.toString(16).padStart(2, '0')).join('')

  const widths = [...new Set([...TARGET_WIDTHS.filter((w) => w < width), width])]
  for (const w of widths) {
    const base = input.clone().resize({ width: w, withoutEnlargement: true })
    const stem = path.join(OUT_DIR, `${id}-${w}`)
    await base.clone().avif({ quality: 55, effort: 5 }).toFile(`${stem}.avif`)
    await base.clone().webp({ quality: 78 }).toFile(`${stem}.webp`)
    await base.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(`${stem}.jpg`)
  }
  result[id] = { width, height, placeholderColor, widths, basePath: `/images/pending/${id}` }
  console.log(id, `${width}x${height}`, placeholderColor, widths.join(','))
}

// Social preview crop (1200x630) from the hero image, upscaled intentionally small only if needed.
const heroPath = path.join(SRC_DIR, 'aerial-pools-golf.jpg')
await sharp(heroPath).resize(1200, 630, { fit: 'cover', position: 'centre' }).jpeg({ quality: 82 }).toFile('public/og-preview.jpg')

await writeFile(JSON_OUT, JSON.stringify(result, null, 2) + '\n')
