// Single source of truth for page titles, descriptions and the sitemap.
// Used by the <Seo> component at runtime and by scripts/postbuild.mjs at build time.
import { treatments } from './treatments.ts'
import { posts } from './posts.ts'

export const SITE_URL = 'https://venicewellnessinstitute.com'
export const SUFFIX = 'Venice Wellness Institute'
export const DEFAULT_OG = 'https://venicewellnessinstitute.com/wp-content/uploads/2025/11/venice-ph-main.png'

export type PageMeta = { path: string; title: string; description: string; image?: string; noindex?: boolean }

const MEDIA = 'https://venicewellnessinstitute.com/wp-content/uploads/'

export const staticPages: PageMeta[] = [
  {
    path: '/',
    title: 'Venice Wellness Institute | Premium Skin, Hair & Body Aesthetic Treatments',
    description:
      'Advanced laser treatments, body contouring and skin rejuvenation with expert care and visible results in Lipa City. Book your consultation today.',
  },
  {
    path: '/about-us/',
    title: `About Us | ${SUFFIX}`,
    description:
      'Science-backed treatments and advanced aesthetic technologies for face, body and hair, with tailored plans for every skin and body type.',
  },
  {
    path: '/services/',
    title: `Services | ${SUFFIX}`,
    description:
      'Discover our facial, body and hair treatments: Pico, Carbon and CO₂ lasers, Thermage, HIFU 7D, Hydrafacial, Cryo, EMS, 10D Slim, sauna pod and more.',
  },
  {
    path: '/contact-us/',
    title: `Contact Us | ${SUFFIX}`,
    description:
      "We're here to guide you towards clearer skin, a healthier body and total wellness. Book a treatment, ask for expert recommendations or learn more.",
  },
  {
    path: '/blogs/',
    title: `Journal | ${SUFFIX}`,
    description:
      'Guides to aesthetic treatments, from laser resurfacing and Thermage to body contouring and choosing the right treatment for your skin.',
  },
  {
    path: '/faq/',
    title: `FAQ | ${SUFFIX}`,
    description: 'Answers about booking, treatments, opening hours, location and payment at Venice Wellness Institute.',
  },
  {
    path: '/privacy-policy/',
    title: `Privacy Policy | ${SUFFIX}`,
    description: 'How venicewellnessinstitute.com collects, uses and stores personal data.',
  },
  {
    path: '/shop/',
    title: `Shop | ${SUFFIX}`,
    description: 'Our store is in the works and will be launching soon.',
  },
  {
    path: '/booking/',
    title: `Book an Appointment | ${SUFFIX}`,
    description: 'Book a facial, body or hair treatment at Venice Wellness Institute in Lipa City, or request a consultation with our specialists.',
  },
]

export const treatmentPages: PageMeta[] = treatments.map((t) => ({
  path: `/services/${t.slug}/`,
  title: `${t.name} | ${t.title} | ${SUFFIX}`,
  description: t.metaDescription,
  image: MEDIA + t.image,
}))

export const postPages: PageMeta[] = posts.map((p) => ({
  path: `/${p.slug}/`,
  title: `${p.title} | ${SUFFIX}`,
  description: p.excerpt,
  image: MEDIA + p.image,
}))

export const allPages = [...staticPages, ...treatmentPages, ...postPages]

const norm = (p: string) => (p.endsWith('/') ? p : p + '/')
export const metaFor = (path: string): PageMeta | undefined => allPages.find((m) => m.path === norm(path))
