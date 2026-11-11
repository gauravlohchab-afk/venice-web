import { useState, type FormEvent } from 'react'
import { submitLead } from '../../lib/leads'
import { Button } from '../ui/Button'
import { SelectField, TextArea, TextField, TreatmentOptions, formToObject } from './fields'
import { ThankYou } from './ThankYou'

/** Contact page form. Sent to the leads API as a call request, tagged with the page it came from. */
export function ContactForm() {
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState<null | 'endpoint' | 'email'>(null)
  const [error, setError] = useState('')
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const r = await submitLead('call', formToObject(e.currentTarget))
    setBusy(false)
    if (r.ok) setDone(r.via)
    else setError(r.error)
  }
  if (done) return <ThankYou via={done} onClose={() => setDone(null)} />
  return (
    <form onSubmit={submit} className="grid gap-7 sm:grid-cols-2">
      <TextField label="Full Name" name="name" required autoComplete="name" />
      <TextField label="Email Address" name="email" type="email" required autoComplete="email" />
      <TextField label="Phone Number" name="phone" type="tel" required autoComplete="tel" inputMode="tel" />
      <SelectField label="Treatment of interest" name="treatment" required defaultValue="General enquiry">
        <TreatmentOptions general />
      </SelectField>
      <TextArea label="Message" name="message" required rows={4} className="sm:col-span-2" />
      {error && <p role="alert" className="text-sm text-clay sm:col-span-2">{error}</p>}
      <div className="sm:col-span-2">
        <Button type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send Message'}</Button>
      </div>
    </form>
  )
}
