import { useState, type FormEvent } from 'react'
import { Lock, Phone } from 'lucide-react'
import { submitLead } from '../../lib/leads'
import { cn } from '../../lib/cn'
import { Button } from '../ui/Button'
import { PAYMENTS, SelectField, TIMES, TextField, TreatmentOptions, formToObject } from './fields'
import { DialogSubmitRow } from './FormIntro'

const today = () => new Date().toISOString().slice(0, 10)

type Props = { treatment?: string; onDone?: (via: 'endpoint' | 'email') => void; variant?: 'default' | 'dialog' }

export function BookingForm({ treatment, onDone, variant = 'default' }: Props) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const dialog = variant === 'dialog'
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    const r = await submitLead('booking', formToObject(e.currentTarget))
    setBusy(false)
    if (r.ok) onDone?.(r.via)
    else setError(r.error)
  }
  return (
    <form onSubmit={submit} className={cn('grid sm:grid-cols-2', dialog ? 'form-boxed gap-x-3 gap-y-3.5' : 'gap-6')}>
      {!dialog && (
        <p className="text-sm text-graphite sm:col-span-2">Share your preferred schedule and payment method so our team can confirm your visit.</p>
      )}
      <TextField label="Full Name" name="name" required autoComplete="name" placeholder="e.g. Maria Santos" />
      <TextField label="Email Address" name="email" type="email" required autoComplete="email" placeholder="you@email.com" />
      <TextField label="Phone Number" name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="+63 9XX XXX XXXX" />
      <TextField label="Age" name="age" type="number" min={1} max={120} required inputMode="numeric" placeholder="e.g. 28" />
      <TextField label="Preferred Date" name="preferredDate" type="date" min={today()} required />
      <SelectField label="Preferred Time" name="preferredTime" required defaultValue="">
        <option value="">Select a time</option>
        {TIMES.map((t) => (
          <option key={t}>{t}</option>
        ))}
      </SelectField>
      <SelectField label="Treatment Interest" name="treatment" required defaultValue={treatment ?? ''} className="sm:col-span-2">
        <TreatmentOptions />
      </SelectField>
      <fieldset className="sm:col-span-2">
        <legend className="field-label eyebrow mb-1.5 text-[0.66rem] opacity-70">
          Payment Method <span aria-hidden className="req">*</span>
        </legend>
        <div className={dialog ? 'grid grid-cols-3 gap-2.5' : 'flex flex-wrap gap-3'}>
          {PAYMENTS.map((p, i) => (
            <label key={p} className="relative cursor-pointer">
              <input type="radio" name="paymentMethod" value={p} required defaultChecked={i === 0} className="peer sr-only" />
              <span
                className={cn(
                  'block border text-sm transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-bone peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-clay',
                  dialog ? 'rounded-[0.7rem] border-sand bg-[#fffdf9] py-2.5 text-center text-[0.85rem] font-medium hover:border-clay' : 'rounded-full hairline px-5 py-2.5',
                )}
              >
                {p}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      {error && <p role="alert" className="text-sm text-clay sm:col-span-2">{error}</p>}
      {dialog ? (
        <DialogSubmitRow busy={busy} label="Confirm Booking" icon={Phone} className="sm:col-span-2" />
      ) : (
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <Button type="submit" disabled={busy}>{busy ? 'Sending…' : 'Confirm Booking'}</Button>
          <span className="inline-flex items-center gap-1.5 text-xs opacity-60">
            <Lock className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden /> Secure &amp; Confidential
          </span>
        </div>
      )}
    </form>
  )
}
