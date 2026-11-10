// Writes a pre-rendered <head> for every route (title, description, canonical, Open Graph,
// JSON-LD), plus sitemap.xml, 404.html and host redirect files. Run after `vite build`.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { allPages, SITE_URL, DEFAULT_OG } from '../src/data/seo.ts'
import { site } from '../src/data/site.ts'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const template = await readFile(join(dist, 'index.html'), 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

const business = {
  '@context': 'https://schema.org',
  '@type': 'HealthAndBeautyBusiness',
  name: site.name,
  url: SITE_URL,
  image: DEFAULT_OG,
  telephone: site.phone.display,
  email: site.email,
  foundingDate: String(site.established),
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.line1,
    addressLocality: 'Lipa City',
    addressRegion: 'Batangas',
    addressCountry: 'PH',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '10:00', closes: '22:00' },
  ],
  sameAs: [site.social.facebook, site.social.instagram],
}

const head = (p) => {
  const url = SITE_URL + p.path
  const img = p.image ?? DEFAULT_OG
  const isPost = !p.path.startsWith('/services/') && !['/', '/about-us/', '/services/', '/contact-us/', '/blogs/', '/faq/', '/privacy-policy/', '/shop/', '/booking/'].includes(p.path)
  const tags = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:type" content="${isPost ? 'article' : 'website'}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:locale" content="en_PH" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
  ]
  if (p.path === '/' || p.path === '/contact-us/') tags.push(`<script type="application/ld+json">${JSON.stringify(business)}</script>`)
  return tags.join('\n    ')
}

const render = (p) => template.replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, head(p))

for (const p of allPages) {
  const file = p.path === '/' ? join(dist, 'index.html') : join(dist, p.path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, render(p))
}

await writeFile(
  join(dist, '404.html'),
  render({ path: '/404/', title: `Page not found | ${site.name}`, description: 'The page you were looking for could not be found.' }).replace(
    '<link rel="canonical" href="https://venicewellnessinstitute.com/404/" />',
    '<meta name="robots" content="noindex" />',
  ),
)

const today = new Date().toISOString().slice(0, 10)
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allPages
    .map((p) => `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.path === '/' ? '1.0' : p.path.startsWith('/services/') ? '0.8' : '0.6'}</priority></url>`)
    .join('\n')}\n</urlset>\n`,
)

// Legacy WooCommerce / template URLs from the old site, and the SPA fallback.
const redirects = [
  ['/cart-2/', '/shop/'],
  ['/checkout/', '/shop/'],
  ['/my-account/', '/shop/'],
  ['/wishlist/', '/shop/'],
  ['/yith-compare/', '/shop/'],
  ['/popup/', '/#book'],
  ['/refund_returns/', '/contact-us/'],
]
await writeFile(join(dist, '_redirects'), redirects.map(([a, b]) => `${a} ${b} 301`).join('\n') + '\n/* /404.html 404\n')
await writeFile(
  join(dist, 'vercel.json'),
  JSON.stringify({ trailingSlash: true, redirects: redirects.map(([source, destination]) => ({ source, destination, permanent: true })) }, null, 2),
)
console.log(`postbuild: ${allPages.length} routes pre-rendered, sitemap.xml written`)
