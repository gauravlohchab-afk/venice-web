import { useState, type FormEvent } from 'react'
import { Lock, MessageSquare } from 'lucide-react'
import { submitLead } from '../../lib/leads'
import { Button } from '../ui/Button'
import { TextArea, TextField, SelectField, TreatmentOptions, formToObject } from './fields'
import { DialogSubmitRow } from './FormIntro'
import { cn } from '../../lib/cn'

type Props = {
  treatment?: string
  onDone?: (via: 'endpoint' | 'email') => void
  className?: string
  tone?: 'dark' | 'light'
  variant?: 'default' | 'dialog'
}

export function ConsultationForm({ treatment, onDone, className, tone = 'dark', variant = 'default' }: Props) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const dialog = variant === 'dialog'
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    setBusy(true)
    setError('')
    const r = await submitLead('call', formToObject(form))
    setBusy(false)
    if (r.ok) {
      form.reset()
      onDone?.(r.via)
    } else setError(r.error)
  }
  return (
    <form onSubmit={submit} className={cn('grid sm:grid-cols-2', dialog ? 'form-boxed gap-x-3 gap-y-3.5' : 'gap-6', className)}>
      <TextField label="Full Name" name="name" required autoComplete="name" placeholder={dialog ? 'e.g. Maria Santos' : undefined} />
      <TextField label="Email Address" name="email" type="email" required autoComplete="email" placeholder={dialog ? 'you@email.com' : undefined} />
      <TextField label="Phone Number" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder={dialog ? '+63 9XX XXX XXXX' : undefined} />
      <SelectField label="Treatment" name="treatment" required defaultValue={treatment ?? ''}>
        <TreatmentOptions />
      </SelectField>
      <TextArea label="Message" name="message" className="sm:col-span-2" rows={3} placeholder={dialog ? 'Your skin, body or hair goals, questions or concerns…' : undefined} />
      {error && <p role="alert" className="text-sm text-clay sm:col-span-2">{error}</p>}
      {dialog ? (
        <DialogSubmitRow busy={busy} label="Request Consultation" icon={MessageSquare} className="sm:col-span-2" />
      ) : (
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <Button type="submit" variant={tone === 'dark' ? 'solid' : 'light'} disabled={busy}>
            {busy ? 'Sending…' : 'Request Consultation'}
          </Button>
          <span className="inline-flex items-center gap-1.5 text-xs opacity-60">
            <Lock className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden /> Secure &amp; Confidential
          </span>
        </div>
      )}
    </form>
  )
}
