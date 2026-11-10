import { useState } from 'react'
import { ConsultationForm } from '../forms/ConsultationForm'
import { ThankYou } from '../forms/ThankYou'
import { site } from '../../data/site'
import { cn } from '../../lib/cn'

/** "Schedule A Consultation" block that appears on the original About, Services and treatment pages. */
export function ConsultBand({ treatment, className, title = 'Schedule A Consultation' }: { treatment?: string; className?: string; title?: string }) {
  const [done, setDone] = useState<null | 'endpoint' | 'email'>(null)
  return (
    <section id="consultation" className={cn('bg-lagoon-deep py-20 text-bone sm:py-28', className)} aria-labelledby="consult-title">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-bone/60">Send As A Message</p>
          <h2 id="consult-title" className="mt-6 font-serif text-[length:var(--text-headline)] leading-[0.98]">
            {title.replace(/ Consultation$/, '')}{title.endsWith(' Consultation') && <> <span className="serif-italic">Consultation</span></>}
          </h2>
          <p className="mt-6 max-w-sm text-bone/70">
            Prefer to talk? Call <a className="link-underline text-bone" href={site.phone.href}>{site.phone.display}</a> or{' '}
            <a className="link-underline text-bone" href={site.social.messenger} target="_blank" rel="noopener noreferrer">message us on Messenger</a>.
          </p>
        </div>
        <div className="lg:col-span-6 lg:col-start-7 [&_.text-graphite]:text-bone/70">
          {done ? <ThankYou via={done} /> : <ConsultationForm treatment={treatment} tone="light" onDone={setDone} />}
        </div>
      </div>
    </section>
  )
}
