import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SplitText } from '../components/motion/SplitText'
import { Button } from '../components/ui/Button'
import { useBooking } from '../context/BookingContext'
import { site } from '../data/site'
import { byCategory, categories, type Category } from '../data/treatments'
import { cn } from '../lib/cn'

// The original FAQ page carried theme placeholder answers. These answers use only facts
// published elsewhere on venicewellnessinstitute.com (booking forms, About, Contact pages).
function useFaqs(): { q: string; a: ReactNode }[] {
  return [
    {
      q: 'Can I Book My Appointment Online?',
      a: (
        <>
          Yes. Press <strong>Book Now</strong> anywhere on the site and choose <em>Consultation</em> to send a request, or <em>Direct Booking</em> to share your preferred date, time (9:00 AM to 5:00 PM), treatment and payment method. Our team will contact you to confirm your visit. You can also call {site.phone.display} or message us on Messenger.
        </>
      ),
    },
    {
      q: 'What Are Included In Your Services?',
      a: (
        <div className="grid gap-6 sm:grid-cols-3">
          {(Object.keys(categories) as Category[]).map((c) => (
            <div key={c}>
              <p className="eyebrow text-stone">{categories[c].label}</p>
              <ul className="mt-2 space-y-1">
                {byCategory(c).map((t) => (
                  <li key={t.slug}><Link to={`/services/${t.slug}/`} className="link-underline">{t.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ),
    },
    {
      q: 'What Are Your Opening Hours?',
      a: (
        <>
          {site.hours.map((h) => (
            <span key={h.days} className="block">{h.days}: {h.time}</span>
          ))}
        </>
      ),
    },
    {
      q: 'Do You Have Any Offers?',
      a: (
        <>
          {site.hours.map((h) => (
            <span key={h.days} className="block">{h.days}: {h.offer}.</span>
          ))}
        </>
      ),
    },
    {
      q: 'Where Are You Located?',
      a: (
        <>
          {site.address.line1}, {site.address.line2}.{' '}
          <a href={site.address.mapLink} target="_blank" rel="noopener noreferrer" className="link-underline">Open in Google Maps</a>
        </>
      ),
    },
    { q: 'Which Payment Methods Do You Accept?', a: <>Card, GCash and Cash.</> },
    {
      q: 'Will My Treatment Plan Be Personalised?',
      a: <>Yes. Every client receives a tailored plan after a detailed consultation and assessment of their skin, body and goals.</>,
    },
  ]
}

export default function Faq() {
  const faqs = useFaqs()
  const [open, setOpen] = useState<number | null>(0)
  const { openBooking } = useBooking()
  return (
    <section className="wrap grid gap-10 pt-28 pb-20 sm:pt-36 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <p className="eyebrow text-clay">Questions &amp; answers</p>
          <h1 className="mt-6 font-serif text-[length:var(--text-display)] leading-[0.82] tracking-[-0.03em]">
            <SplitText immediate delay={0.3} text="FAQ" />
          </h1>
          <p className="mt-8 max-w-xs text-graphite">Can’t find what you’re looking for? Our team is happy to help.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => openBooking('consultation')}>Ask a specialist</Button>
          </div>
        </div>
      </div>
      <dl className="border-t hairline lg:col-span-7 lg:col-start-6">
        {faqs.map((f, i) => (
          <div key={f.q} className="border-b hairline">
            <dt>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                aria-controls={`faq-${i}`}
                className="group flex w-full items-start gap-6 py-7 text-left"
              >
                <span className="pt-2 text-xs tabular-nums text-stone">{String(i + 1).padStart(2, '0')}</span>
                <span className={cn('flex-1 font-serif text-[clamp(1.5rem,2.6vw,2.3rem)] leading-tight transition-colors', open === i ? 'text-clay' : 'group-hover:text-clay')}>{f.q}</span>
                <Plus className={cn('mt-2 h-6 w-6 shrink-0 transition-transform duration-500', open === i && 'rotate-45')} strokeWidth={1.2} aria-hidden />
              </button>
            </dt>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.dd
                  id={`faq-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pb-8 pl-10 text-lg text-graphite">{f.a}</div>
                </motion.dd>
              )}
            </AnimatePresence>
          </div>
        ))}
      </dl>
    </section>
  )
}
