import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { DEFAULT_OG, SITE_URL, metaFor, staticPages } from '../../data/seo'

const setMeta = (attr: 'name' | 'property', key: string, value: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.content = value
}

/** Keeps <title>, description, canonical and Open Graph tags in sync with the route.
 *  The same values are pre-rendered into each route's HTML by scripts/postbuild.mjs. */
export function Seo({ title, description }: { title?: string; description?: string }) {
  const { pathname } = useLocation()
  useEffect(() => {
    const m = metaFor(pathname)
    const t = title ?? m?.title ?? staticPages[0].title
    const d = description ?? m?.description ?? staticPages[0].description
    const url = SITE_URL + (m?.path ?? pathname)
    document.title = t
    setMeta('name', 'description', d)
    setMeta('property', 'og:title', t)
    setMeta('property', 'og:description', d)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', m?.image ?? DEFAULT_OG)
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = url
  }, [pathname, title, description])
  return null
}
