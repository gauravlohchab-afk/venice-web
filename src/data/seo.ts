// Single source of truth for page titles, descriptions and the sitemap.
// Used by the <Seo> component at runtime and by scripts/postbuild.mjs at build time.
import { treatments } from './treatments.ts'
import { posts } from './posts.ts'

export const SITE_URL = 'https://venicewellnessinstitute.com'
export const SUFFIX = 'Venice Wellness Institute'
// Share images use the self-hosted JPGs in /public/media.
const ogImage = (path: string) => SITE_URL + '/media/' + path.replace(/\.[a-z]+$/i, '') + '.jpg'
export const DEFAULT_OG = ogImage('2025/11/venice-ph-main.png')

export type PageMeta = {
  path: string
  title: string
  description: string
  /** Source photo (schema.org, image sitemap). Defaults to DEFAULT_OG. */
  image?: string
  /** 1200×630 share image generated from `image` by scripts/postbuild.mjs. */
  ogImage?: string
  kind?: 'page' | 'treatment' | 'post'
  noindex?: boolean
}

/** Where postbuild writes the share image for a route: /og/home.jpg, /og/services-pico-treatment.jpg … */
export const ogImageFor = (path: string) =>
  `${SITE_URL}/og/${path.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home'}.jpg`

export const staticPages: PageMeta[] = [
  {
    path: '/',
    title: 'Venice Wellness Institute | Aesthetic Clinic in Lipa City',
    description:
      'Aesthetic clinic in Lipa City, Batangas: laser treatments, body contouring and skin rejuvenation with expert care and visible results. Book your consultation.',
  },
  {
    path: '/about-us/',
    title: `About Us | ${SUFFIX}, Lipa City`,
    description:
      'Venice Wellness Institute is an aesthetic clinic in Lipa City, Batangas, offering science-backed face, body and hair treatments with tailored plans since 2020.',
  },
  {
    path: '/services/',
    title: 'Facial, Body & Hair Treatments, Lipa City | Venice Wellness',
    description:
      'Discover our facial, body and hair treatments: Pico, Carbon and CO₂ lasers, Thermage, HIFU 7D, Hydrafacial, Cryo, EMS, 10D Slim, sauna pod and more.',
  },
  {
    path: '/contact-us/',
    title: `Contact Us | ${SUFFIX}, Lipa City`,
    description:
      'Visit us at GF Firrst Commercial Complex, Brgy. Sabang, Lipa City, Batangas, open daily. Call +63 966 764 2443 or send a message to book or ask a question.',
  },
  {
    path: '/blogs/',
    title: `Skin & Body Care Journal | ${SUFFIX}`,
    description:
      'Guides to aesthetic treatments, from laser resurfacing and Thermage to body contouring and choosing the right treatment for your skin.',
  },
  {
    path: '/faq/',
    title: `FAQ | ${SUFFIX}, Lipa City`,
    description: 'Answers about booking, treatments, opening hours, offers, location and payment at Venice Wellness Institute in Lipa City, Batangas.',
  },
  {
    path: '/privacy-policy/',
    title: `Privacy Policy | ${SUFFIX}`,
    description: 'How venicewellnessinstitute.com collects, uses and stores personal data.',
  },
  {
    path: '/booking/',
    title: 'Book an Appointment in Lipa City | Venice Wellness',
    description: 'Book a facial, body or hair treatment at Venice Wellness Institute in Lipa City, or request a consultation with our specialists.',
  },
]

// Short descriptions also name the location, as long as they stay within ~160 characters.
const localise = (d: string) => {
  const extra = ' Available at Venice Wellness Institute, Lipa City.'
  return d.length + extra.length <= 160 ? d + extra : d
}

export const treatmentPages: PageMeta[] = treatments.map((t) => ({
  kind: 'treatment',
  path: `/services/${t.slug}/`,
  title: `${t.name} in Lipa City | Venice Wellness`,
  description: localise(t.metaDescription),
  image: ogImage(t.image),
}))

export const postPages: PageMeta[] = posts.map((p) => ({
  kind: 'post',
  path: `/${p.slug}/`,
  // Long article titles stand alone; Google truncates around 60 characters.
  title: p.title.length <= 32 ? `${p.title} | ${SUFFIX}` : p.title,
  description: p.excerpt,
  image: ogImage(p.image),
}))

export const allPages: PageMeta[] = [...staticPages, ...treatmentPages, ...postPages].map((p) => ({
  kind: 'page',
  ...p,
  ogImage: ogImageFor(p.path),
}))

const norm = (p: string) => (p.endsWith('/') ? p : p + '/')
export const metaFor = (path: string): PageMeta | undefined => allPages.find((m) => m.path === norm(path))
