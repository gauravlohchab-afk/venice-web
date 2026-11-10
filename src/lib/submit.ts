import { mailto } from '../data/site'

export type SubmitResult = { ok: true; via: 'endpoint' | 'email' } | { ok: false; error: string }

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

/**
 * The original site's forms post to WordPress, which this static build cannot reach.
 * Set VITE_FORM_ENDPOINT (e.g. a Formspree, Web3Forms, Basin or your own API URL that
 * accepts JSON) to deliver submissions directly. Without it, the request is handed to
 * the visitor's email app, addressed to the clinic, so nothing is silently lost.
 */
export async function submitForm(kind: string, fields: Record<string, string>): Promise<SubmitResult> {
  const clean = Object.fromEntries(Object.entries(fields).filter(([, v]) => v !== ''))
  if (ENDPOINT) {
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ form: kind, ...clean, _subject: `${kind}: ${clean.name ?? ''}` }),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      return { ok: true, via: 'endpoint' }
    } catch {
      return { ok: false, error: 'We could not send your request. Please call or message us instead.' }
    }
  }
  const body = Object.entries(clean)
    .map(([k, v]) => `${k.replace(/([A-Z])/g, ' $1').replace(/^./, (c) => c.toUpperCase())}: ${v}`)
    .join('\n')
  window.location.href = mailto(`${kind}: ${clean.name ?? 'Website'}`, body)
  return { ok: true, via: 'email' }
}
