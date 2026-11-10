import { useState, type FormEvent } from 'react'
import { submitForm } from '../../lib/submit'
import { Button } from '../ui/Button'
import { TextArea, TextField, formToObject } from './fields'
import { ThankYou } from './ThankYou'

export function ContactForm() {
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState<null | 'endpoint' | 'email'>(null)
  const [error, setError] = useState('')
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const data = formToObject(e.currentTarget)
    data.sendCopy = data.sendCopy ? 'Yes' : ''
    const r = await submitForm('Website enquiry', data)
    setBusy(false)
    if (r.ok) setDone(r.via)
    else setError(r.error)
  }
  if (done) return <ThankYou via={done} onClose={() => setDone(null)} />
  return (
    <form onSubmit={submit} className="grid gap-7 sm:grid-cols-2">
      <TextField label="Full Name" name="name" required autoComplete="name" />
      <TextField label="Email Address" name="email" type="email" required autoComplete="email" />
      <TextField label="Phone Number" name="phone" type="tel" autoComplete="tel" className="sm:col-span-2" />
      <TextArea label="Message" name="message" required rows={4} className="sm:col-span-2" />
      <label className="flex cursor-pointer items-center gap-3 text-sm text-graphite sm:col-span-2">
        <input type="checkbox" name="sendCopy" value="yes" className="h-4 w-4 accent-[var(--color-lagoon)]" />
        Send copy of this message to my e-mail address
      </label>
      {error && <p role="alert" className="text-sm text-clay sm:col-span-2">{error}</p>}
      <div className="sm:col-span-2">
        <Button type="submit" disabled={busy}>{busy ? 'Sending…' : 'Send Message'}</Button>
      </div>
    </form>
  )
}
