export type SubmitResult = { ok: true; via: 'endpoint' | 'email' } | { ok: false; error: string }

// Leads go to the clinic's CRM. Both values can be overridden per environment.
const LEADS_URL =
  (import.meta.env.VITE_LEADS_URL as string | undefined) || 'https://miraculous-serenity-production-5d5a.up.railway.app/api/leads'
const CENTER = (import.meta.env.VITE_LEADS_CENTER as string | undefined) || 'venice-wellness-institute'

export type LeadType = 'call' | 'booking'

/** "2:00 PM" -> "14:00" */
const to24h = (t: string) => {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(t.trim())
  if (!m) return t
  let h = Number(m[1]) % 12
  if (m[3].toUpperCase() === 'PM') h += 12
  return `${String(h).padStart(2, '0')}:${m[2]}`
}

/**
 * POST a lead. The API requires fullname, email, phone and treatment, plus schedule for
 * bookings. Schedule is sent as an ISO date-time in Philippine time (UTC+8).
 */
export async function submitLead(type: LeadType, f: Record<string, string>): Promise<SubmitResult> {
  const body: Record<string, string> = {
    fullname: f.name ?? '',
    email: f.email ?? '',
    phone: f.phone ?? '',
    treatment: f.treatment ?? '',
    source: 'website',
    page: typeof window !== 'undefined' ? window.location.pathname : '',
  }
  if (f.message) body.message = f.message
  if (type === 'booking') {
    body.schedule = `${f.preferredDate}T${to24h(f.preferredTime)}:00+08:00`
    body.preferredDate = f.preferredDate
    body.preferredTime = f.preferredTime
    if (f.age) body.age = f.age
    if (f.paymentMethod) body.paymentMethod = f.paymentMethod
  }

  try {
    const res = await fetch(`${LEADS_URL}?type=${type}&center=${encodeURIComponent(CENTER)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as { error?: string } | null
      throw new Error(data?.error || `Status ${res.status}`)
    }
    return { ok: true, via: 'endpoint' }
  } catch (e) {
    console.error('Lead submission failed', e)
    return { ok: false, error: 'We could not send your request. Please try again, or call or message us instead.' }
  }
}
