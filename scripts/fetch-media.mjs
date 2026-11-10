// Downloads every image the site references from the original WordPress uploads into
// public/media/ as AVIF + WebP (max 2000px wide) plus a small JPG fallback. The results are
// committed and the site always serves them locally; rerun only if images are added.
import { mkdir, readdir, readFile, stat } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const REMOTE = 'https://venicewellnessinstitute.com/wp-content/uploads/'
const out = join(root, 'public', 'media')

async function walk(dir) {
  const files = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) files.push(...(await walk(p)))
    else if (/\.(ts|tsx)$/.test(e.name)) files.push(p)
  }
  return files
}

const paths = new Set()
for (const f of await walk(join(root, 'src'))) {
  for (const m of (await readFile(f, 'utf8')).matchAll(/'(20\d\d\/\d\d\/[^']+\.(?:png|jpe?g|webp))'/gi)) paths.add(m[1])
}
console.log(`Found ${paths.size} images`)

for (const p of paths) {
  const base = join(out, p).replace(/\.[a-z]+$/i, '')
  try {
    await stat(base + '.avif')
    console.log('skip', p)
    continue
  } catch {}
  const res = await fetch(REMOTE + p)
  if (!res.ok) {
    console.warn('FAILED', res.status, p)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await mkdir(dirname(base), { recursive: true })
  const img = sharp(buf).resize({ width: 2000, withoutEnlargement: true })
  await img.clone().avif({ quality: 55 }).toFile(base + '.avif')
  await img.clone().webp({ quality: 78 }).toFile(base + '.webp')
  // Small JPG fallback for browsers without AVIF/WebP; the full-size original is not kept.
  await sharp(buf).resize({ width: 1600, withoutEnlargement: true }).flatten({ background: '#f3eee7' }).jpeg({ quality: 80, mozjpeg: true }).toFile(base + '.jpg')
  console.log('ok', p)
}
