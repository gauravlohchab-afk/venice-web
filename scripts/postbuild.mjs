// Runs after `vite build` and the SSR build (.ssr/entry-server.js). For every route it writes:
//   - the full pre-rendered page HTML, so crawlers that do not run JavaScript (most AI search
//     crawlers) see the content, not an empty <div id="root">
//   - a complete <head>: title, description, canonical, Open Graph / Twitter, geo tags and a
//     schema.org JSON-LD graph (business, website, breadcrumbs, page-specific types)
// plus sitemap.xml (with images), robots.txt, llms.txt / llms-full.txt, 404.html and host redirect files.
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import sharp from 'sharp'
import { allPages, SITE_URL, DEFAULT_OG } from '../src/data/seo.ts'
import { site } from '../src/data/site.ts'
import { treatments, categories, byCategory } from '../src/data/treatments.ts'
import { posts } from '../src/data/posts.ts'
import { faqText, treatmentFaq } from '../src/data/faq.ts'
import { treatmentsInPost } from '../src/data/related.ts'
import { execFileSync } from 'node:child_process'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const { render } = await import(pathToFileURL(join(root, '.ssr', 'entry-server.js')).href)
const template = (await readFile(join(dist, 'index.html'), 'utf8')).replace('<html lang="en">', '<html lang="en-PH">')
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const today = new Date().toISOString().slice(0, 10)
const BIZ = `${SITE_URL}/#business`
const WEBSITE = `${SITE_URL}/#website`

// ---------- helpers ----------
const mediaUrl = (path) => `${SITE_URL}/media/${path.replace(/\.[a-z]+$/i, '')}.jpg`
const sizeCache = new Map()
async function imageSize(url) {
  if (!url.startsWith(SITE_URL)) return null
  if (sizeCache.has(url)) return sizeCache.get(url)
  const file = join(root, 'public', url.slice(SITE_URL.length))
  const meta = existsSync(file) ? await sharp(file).metadata() : null
  const size = meta ? { width: meta.width, height: meta.height } : null
  sizeCache.set(url, size)
  return size
}
const treatmentBySlug = Object.fromEntries(treatments.map((t) => [t.slug, t]))
const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p]))
const plain = (line) =>
  line
    .replace(/^#{2,3}\s+/, '')
    .replace(/^[->]\s+/, '')
    .replace(/^\d+\.\s+/, '')
    .replace(/^[QA]:\s+/, '')
    .replace(/\*\*/g, '')

// ---------- schema.org ----------
const business = {
  '@type': ['MedicalBusiness', 'HealthAndBeautyBusiness'],
  '@id': BIZ,
  name: site.name,
  alternateName: ['Venice Wellness', 'Venice Wellness Institute PH', site.legalName],
  legalName: site.legalName,
  slogan: site.tagline,
  description:
    'Aesthetic clinic in Lipa City, Batangas offering non-invasive facial, body and hair treatments, including Pico, Carbon and CO2 lasers, Thermage, HIFU 7D, Hydrafacial, Cryo Fat Freeze, EMS, 10D Slim and laser hair removal.',
  url: `${SITE_URL}/`,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/brand/logo.png` },
  image: [DEFAULT_OG, `${SITE_URL}/media/clinic/reception-desk.jpg`, `${SITE_URL}/media/clinic/waiting-area.jpg`, `${SITE_URL}/media/clinic/treatment-room.jpg`],
  telephone: '+639667642443',
  email: site.email,
  foundingDate: String(site.established),
  priceRange: '₱₱',
  currenciesAccepted: 'PHP',
  paymentAccepted: 'Cash, Credit Card, GCash',
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.line1}, Brgy. Sabang`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  },
  geo: { '@type': 'GeoCoordinates', latitude: site.address.geo.lat, longitude: site.address.geo.lng },
  hasMap: site.address.mapLink,
  areaServed: [
    { '@type': 'City', name: 'Lipa City' },
    { '@type': 'AdministrativeArea', name: 'Batangas' },
  ],
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '22:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Saturday', 'Sunday'], opens: '10:00', closes: '22:00' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+639667642443',
    email: site.email,
    contactType: 'customer service',
    areaServed: 'PH',
    availableLanguage: ['English', 'Filipino'],
  },
  sameAs: [site.social.facebook, site.social.instagram],
  knowsAbout: [...treatments.map((t) => t.title), 'Aesthetic medicine', 'Non-invasive skin treatments', 'Body contouring', 'Laser hair removal'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Treatments',
    itemListElement: Object.keys(categories).map((c) => ({
      '@type': 'OfferCatalog',
      name: categories[c].plural,
      itemListElement: byCategory(c).map((t) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', '@id': `${SITE_URL}/services/${t.slug}/#service`, name: t.name },
      })),
    })),
  },
}

const website = {
  '@type': 'WebSite',
  '@id': WEBSITE,
  url: `${SITE_URL}/`,
  name: site.name,
  inLanguage: 'en-PH',
  publisher: { '@id': BIZ },
}

const crumbName = {
  '/about-us/': 'About Us',
  '/services/': 'Services',
  '/contact-us/': 'Contact Us',
  '/blogs/': 'Blogs',
  '/faq/': 'FAQ',
  '/privacy-policy/': 'Privacy Policy',
  '/booking/': 'Booking',
}

function breadcrumbs(path) {
  const items = [{ name: 'Home', url: `${SITE_URL}/` }]
  const slug = path.replace(/^\/|\/$/g, '')
  if (path.startsWith('/services/') && path !== '/services/') {
    const t = treatmentBySlug[path.split('/')[2]]
    items.push({ name: 'Services', url: `${SITE_URL}/services/` }, { name: t.name, url: SITE_URL + path })
  } else if (postBySlug[slug]) {
    items.push({ name: 'Blogs', url: `${SITE_URL}/blogs/` }, { name: postBySlug[slug].title, url: SITE_URL + path })
  } else if (crumbName[path]) {
    items.push({ name: crumbName[path], url: SITE_URL + path })
  }
  if (items.length === 1) return null
  return {
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}${path}#breadcrumb`,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  }
}

function pageGraph(p) {
  const url = SITE_URL + p.path
  const slug = p.path.replace(/^\/|\/$/g, '')
  const crumb = breadcrumbs(p.path)
  const pageType =
    p.path === '/about-us/' ? 'AboutPage' : p.path === '/contact-us/' ? 'ContactPage' : p.path === '/faq/' ? 'FAQPage' : p.path === '/services/' || p.path === '/blogs/' ? 'CollectionPage' : 'WebPage'
  const page = {
    '@type': pageType,
    '@id': `${url}#webpage`,
    url,
    name: p.title,
    description: p.description,
    inLanguage: 'en-PH',
    isPartOf: { '@id': WEBSITE },
    about: { '@id': BIZ },
    primaryImageOfPage: { '@type': 'ImageObject', url: p.image ?? DEFAULT_OG },
    ...(crumb ? { breadcrumb: { '@id': crumb['@id'] } } : {}),
  }
  const graph = [business, website, page]
  if (crumb) graph.push(crumb)

  if (p.path === '/faq/') {
    page.mainEntity = faqText.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
  }

  if (p.path === '/services/') {
    page.mainEntity = {
      '@type': 'ItemList',
      itemListElement: treatments.map((t, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/services/${t.slug}/`, name: t.name })),
    }
  }

  if (p.path === '/blogs/') {
    page.mainEntity = {
      '@type': 'ItemList',
      itemListElement: posts.map((post, i) => ({ '@type': 'ListItem', position: i + 1, url: `${SITE_URL}/${post.slug}/`, name: post.title })),
    }
  }

  const t = p.path.startsWith('/services/') ? treatmentBySlug[p.path.split('/')[2]] : null
  if (t) {
    // Treatment pages carry both the service and its visible Q&A section.
    page['@type'] = ['WebPage', 'FAQPage']
    page.about = [{ '@id': `${url}#service` }, { '@id': BIZ }]
    page.mainEntity = treatmentFaq(t).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: t.name,
      alternateName: t.title,
      serviceType: t.short,
      category: categories[t.category].label,
      description: [t.summary, t.lead, ...t.body].join(' '),
      image: mediaUrl(t.image),
      url,
      provider: { '@id': BIZ },
      areaServed: [{ '@type': 'City', name: 'Lipa City' }, { '@type': 'AdministrativeArea', name: 'Batangas' }],
      ...(t.areas ? { audience: { '@type': 'Audience', audienceType: `Treatment areas: ${t.areas.join(', ')}` } } : {}),
    })
  }

  const post = postBySlug[slug]
  if (post) {
    page['@type'] = 'WebPage'
    page.mainEntity = { '@id': `${url}#article` }
    graph.push({
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.title,
      description: post.excerpt,
      image: mediaUrl(post.image),
      datePublished: post.date,
      dateModified: post.date,
      inLanguage: 'en-PH',
      keywords: post.tags.join(', '),
      articleSection: post.tags[0],
      wordCount: post.body.join(' ').split(/\s+/).length,
      author: { '@id': BIZ },
      publisher: { '@id': BIZ },
      mentions: treatmentsInPost(post).map((m) => ({ '@type': 'Service', '@id': `${SITE_URL}/services/${m.slug}/#service`, name: m.name, url: `${SITE_URL}/services/${m.slug}/` })),
      mainEntityOfPage: { '@id': `${url}#webpage` },
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

// ---------- <head> ----------
async function head(p, { noindex = false } = {}) {
  const url = SITE_URL + p.path
  const img = p.ogImage ?? DEFAULT_OG
  const size = p.ogImage ? { width: OG_W, height: OG_H } : await imageSize(img)
  const post = postBySlug[p.path.replace(/^\/|\/$/g, '')]
  const tags = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    noindex ? '<meta name="robots" content="noindex" />' : `<link rel="canonical" href="${url}" />`,
    noindex ? '' : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:type" content="${post ? 'article' : 'website'}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${img}" />`,
    size ? `<meta property="og:image:width" content="${size.width}" />` : '',
    size ? `<meta property="og:image:height" content="${size.height}" />` : '',
    `<meta property="og:image:alt" content="${esc(p.title)}" />`,
    `<meta property="og:locale" content="en_PH" />`,
    post ? `<meta property="article:published_time" content="${post.date}" />` : '',
    post ? post.tags.map((t) => `<meta property="article:tag" content="${esc(t)}" />`).join('\n    ') : '',
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
    `<meta name="geo.region" content="PH-BTG" />`,
    `<meta name="geo.placename" content="${site.address.city}, ${site.address.region}" />`,
    `<meta name="geo.position" content="${site.address.geo.lat};${site.address.geo.lng}" />`,
    `<meta name="ICBM" content="${site.address.geo.lat}, ${site.address.geo.lng}" />`,
    noindex ? '' : `<script type="application/ld+json">${JSON.stringify(pageGraph(p)).replace(/</g, '\\u003c')}</script>`,
  ]
  return tags.filter(Boolean).join('\n    ')
}

async function renderPage(p, opts) {
  const body = await render(p.path)
  return template
    .replace(/<!--seo-->[\s\S]*?<!--\/seo-->/, await head(p, opts))
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

// ---------- share images (1200×630, the size Facebook, Messenger, X and LinkedIn expect) ----------
const OG_W = 1200
const OG_H = 630
await mkdir(join(dist, 'og'), { recursive: true })
for (const p of allPages) {
  const src = join(root, 'public', (p.image ?? DEFAULT_OG).slice(SITE_URL.length))
  const out = join(dist, p.ogImage.slice(SITE_URL.length))
  await sharp(src).resize(OG_W, OG_H, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out)
}

// ---------- pages ----------
const problems = []
for (const p of allPages) {
  const file = p.path === '/' ? join(dist, 'index.html') : join(dist, p.path, 'index.html')
  await mkdir(dirname(file), { recursive: true })
  const html = await renderPage(p)
  const h1 = (html.match(/<h1[\s>]/g) || []).length
  if (h1 !== 1) problems.push(`${p.path}: ${h1} <h1> elements`)
  await writeFile(file, html)
}

await writeFile(
  join(dist, '404.html'),
  await renderPage({ path: '/404/', title: `Page not found | ${site.name}`, description: 'The page you were looking for could not be found.' }, { noindex: true }),
)

// ---------- sitemap ----------
// lastmod = last commit touching the files behind the page (build date if uncommitted / no git),
// so it changes only when content does; search engines ignore lastmod that moves every build.
const gitDate = (files) => {
  try {
    const dirty = execFileSync('git', ['status', '--porcelain', '--', ...files], { cwd: root, encoding: 'utf8' }).trim()
    if (dirty) return today
    return execFileSync('git', ['log', '-1', '--format=%cs', '--', ...files], { cwd: root, encoding: 'utf8' }).trim() || today
  } catch {
    return today
  }
}
const pageFiles = {
  '/': 'src/pages/Home.tsx src/pages/home',
  '/about-us/': 'src/pages/About.tsx',
  '/services/': 'src/pages/Services.tsx src/data/treatments.ts',
  '/contact-us/': 'src/pages/Contact.tsx src/data/site.ts',
  '/blogs/': 'src/pages/Blogs.tsx src/data/posts.ts',
  '/faq/': 'src/pages/Faq.tsx src/data/faq.ts',
  '/privacy-policy/': 'src/pages/Privacy.tsx',
  '/booking/': 'src/pages/Booking.tsx',
}
const lastmodCache = new Map()
const lastmod = (p) => {
  const post = postBySlug[p.path.replace(/^\/|\/$/g, '')]
  const key = pageFiles[p.path] ?? (post ? 'src/data/posts.ts src/pages/Post.tsx' : 'src/data/treatments.ts src/data/faq.ts src/pages/Treatment.tsx src/pages/treatment')
  if (!lastmodCache.has(key)) lastmodCache.set(key, gitDate(key.split(' ')))
  const d = lastmodCache.get(key)
  return post && post.date > d ? post.date : d
}
const priority = (p) => (p.path === '/' ? '1.0' : p.path === '/services/' || p.path === '/booking/' ? '0.9' : p.path.startsWith('/services/') ? '0.8' : p.path === '/privacy-policy/' ? '0.3' : '0.6')
await writeFile(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages
  .map(
    (p) =>
      `  <url><loc>${SITE_URL}${p.path}</loc><lastmod>${lastmod(p)}</lastmod><priority>${priority(p)}</priority><image:image><image:loc>${p.image ?? DEFAULT_OG}</image:loc></image:image></url>`,
  )
  .join('\n')}
</urlset>
`,
)

// ---------- robots.txt (search and AI crawlers explicitly welcome) ----------
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'CCBot']
await writeFile(
  join(dist, 'robots.txt'),
  `User-agent: *
Allow: /
Disallow: /popup/

${aiBots.map((b) => `User-agent: ${b}`).join('\n')}
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`,
)

// ---------- llms.txt (https://llmstxt.org) ----------
const facts = [
  `- Address: ${site.address.line1}, ${site.address.line2}, ${site.address.region} ${site.address.postalCode}, ${site.address.country} (Google Maps plus code ${site.address.plusCode})`,
  `- Phone: ${site.phone.display}`,
  `- Email: ${site.email}`,
  ...site.hours.map((h) => `- Hours ${h.days}: ${h.time}. Offer: ${h.offer}`),
  `- Payment: Card, GCash, Cash`,
  `- Established: ${site.established}`,
  `- Booking: ${SITE_URL}/booking/ (direct booking with date, time 9:00 AM to 5:00 PM, and payment method, or a consultation request)`,
  `- Facebook: ${site.social.facebook} | Instagram: ${site.social.instagram} | Messenger: ${site.social.messenger}`,
]
const llms = `# ${site.name}

> ${site.name} is an aesthetic clinic in Lipa City, Batangas, Philippines, offering non-invasive facial, body and hair treatments that combine modern technology with a holistic approach to self-care. Established in ${site.established}.

## Key facts

${facts.join('\n')}

## Treatments

${Object.keys(categories)
  .map((c) => `### ${categories[c].plural}\n\n${byCategory(c).map((t) => `- [${t.name}](${SITE_URL}/services/${t.slug}/): ${t.summary}`).join('\n')}`)
  .join('\n\n')}

## Pages

- [About Us](${SITE_URL}/about-us/): mission, core services and the clinic
- [Services](${SITE_URL}/services/): all ${treatments.length} treatments
- [Book an appointment](${SITE_URL}/booking/): direct booking or consultation request
- [Contact Us](${SITE_URL}/contact-us/): phone, email, map and opening hours
- [FAQ](${SITE_URL}/faq/): booking, hours, offers, location and payment

## Articles

${posts.map((p) => `- [${p.title}](${SITE_URL}/${p.slug}/): ${p.excerpt}`).join('\n')}

## Optional

- [Full text for AI assistants](${SITE_URL}/llms-full.txt): every treatment, FAQ answer and article in plain text
`
await writeFile(join(dist, 'llms.txt'), llms)

const llmsFull = `# ${site.name}: full reference

> ${site.name} is an aesthetic clinic in Lipa City, Batangas, Philippines. This file holds the complete treatment descriptions, FAQ answers and articles from ${SITE_URL} in plain text.

## Key facts

${facts.join('\n')}

## Treatments

${treatments
  .map(
    (t) => `### ${t.name} (${categories[t.category].label})

URL: ${SITE_URL}/services/${t.slug}/

${t.title}: ${t.tagline}.

${t.summary}

${t.whyHeading}: ${t.lead}

${t.body.join('\n\n')}${t.areas ? `\n\nAreas treated: ${t.areas.join(', ')}.` : ''}

${treatmentFaq(t)
  .slice(1)
  .map((f) => `Q: ${f.q}\nA: ${f.a}`)
  .join('\n\n')}`,
  )
  .join('\n\n')}

## Frequently asked questions

${faqText.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

## Articles

${posts
  .map((p) => `### ${p.title}\n\nURL: ${SITE_URL}/${p.slug}/\nPublished: ${p.date}\n\n${p.body.map(plain).join('\n\n')}`)
  .join('\n\n')}
`
await writeFile(join(dist, 'llms-full.txt'), llmsFull)

// ---------- redirects ----------
// Legacy WooCommerce / template URLs from the old site, and the SPA fallback.
const redirects = [
  ['/cart-2/', '/services/'],
  ['/checkout/', '/services/'],
  ['/my-account/', '/services/'],
  ['/wishlist/', '/services/'],
  ['/yith-compare/', '/services/'],
  ['/popup/', '/#book'],
  ['/refund_returns/', '/contact-us/'],
  ['/shop/', '/services/'],
]
await writeFile(join(dist, '_redirects'), redirects.map(([a, b]) => `${a} ${b} 301`).join('\n') + '\n/* /404.html 404\n')
await writeFile(
  join(dist, 'vercel.json'),
  JSON.stringify({ trailingSlash: true, redirects: redirects.map(([source, destination]) => ({ source, destination, permanent: true })) }, null, 2),
)

if (problems.length) console.warn('postbuild warnings:\n  ' + problems.join('\n  '))
console.log(`postbuild: ${allPages.length} routes pre-rendered with content, sitemap.xml, robots.txt, llms.txt written`)
