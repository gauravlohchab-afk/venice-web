// Downloads every image the site references from the original WordPress uploads into
// public/media/, and writes AVIF + WebP versions next to each one (max 2000px wide).
// Afterwards build with:  VITE_LOCAL_MEDIA=true npm run build
import { mkdir, readdir, readFile, writeFile, stat } from 'node:fs/promises'
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
  const dest = join(out, p)
  try {
    await stat(dest)
    console.log('skip', p)
    continue
  } catch {}
  const res = await fetch(REMOTE + p)
  if (!res.ok) {
    console.warn('FAILED', res.status, p)
    continue
  }
  const buf = Buffer.from(await res.arrayBuffer())
  await mkdir(dirname(dest), { recursive: true })
  await writeFile(dest, buf)
  const base = dest.replace(/\.[a-z]+$/i, '')
  const img = sharp(buf).resize({ width: 2000, withoutEnlargement: true })
  await img.clone().avif({ quality: 55 }).toFile(base + '.avif')
  await img.clone().webp({ quality: 78 }).toFile(base + '.webp')
  console.log('ok', p)
}
