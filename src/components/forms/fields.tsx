import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { byCategory, categories, type Category } from '../../data/treatments'
import { cn } from '../../lib/cn'

type Wrap = { label: string; required?: boolean; className?: string; hint?: ReactNode }

const Label = ({ id, label, required }: { id: string; label: string; required?: boolean }) => (
  <label htmlFor={id} className="field-label eyebrow block text-[0.66rem] opacity-70">
    {label}
    {required && <span aria-hidden className="req"> *</span>}
  </label>
)

export function TextField({ label, required, className, hint, ...rest }: Wrap & InputHTMLAttributes<HTMLInputElement>) {
  const id = useId()
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label id={id} label={label} required={required} />
      <input id={id} required={required} className="field" {...rest} />
      {hint}
    </div>
  )
}

export function TextArea({ label, required, className, ...rest }: Wrap & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label id={id} label={label} required={required} />
      <textarea id={id} required={required} rows={3} className="field resize-none" {...rest} />
    </div>
  )
}

export function SelectField({ label, required, className, children, ...rest }: Wrap & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId()
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <Label id={id} label={label} required={required} />
      <select id={id} required={required} className="field" {...rest}>
        {children}
      </select>
    </div>
  )
}

/** Grouped treatment list, identical to the original site's booking forms. */
export function TreatmentOptions() {
  return (
    <>
      <option value="">Select a treatment</option>
      {(Object.keys(categories) as Category[]).map((c) => (
        <optgroup key={c} label={categories[c].label}>
          {byCategory(c).map((t) => (
            <option key={t.slug} value={t.name}>
              {t.name}
            </option>
          ))}
        </optgroup>
      ))}
    </>
  )
}

export const TIMES = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM']
export const PAYMENTS = ['Card', 'GCash', 'Cash']

export const formToObject = (form: HTMLFormElement) =>
  Object.fromEntries(Array.from(new FormData(form).entries()).map(([k, v]) => [k, String(v)])) as Record<string, string>
