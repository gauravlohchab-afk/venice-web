import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { SplitText } from '../components/motion/SplitText'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { ConsultBand } from '../components/ui/ConsultBand'
import { TreatmentCard } from '../components/ui/TreatmentCard'
import { useBooking } from '../context/BookingContext'
import { categories, treatments, type Category } from '../data/treatments'
import { cn } from '../lib/cn'

type Filter = 'all' | Category

export default function Services() {
  const [filter, setFilter] = useState<Filter>('all')
  const { openBooking } = useBooking()
  const list = useMemo(() => (filter === 'all' ? treatments : treatments.filter((t) => t.category === filter)), [filter])

  return (
    <>
      <section className="wrap pt-28 sm:pt-36">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-clay">Services</p>
            <h1 className="mt-5 font-serif text-[length:var(--text-mega)] leading-[0.95]">
              <SplitText immediate delay={0.2} text="Transform Your Skin, Body & Hair" italicWords={['Hair']} />
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-graphite">
              Beauty meets technology for results you can see and feel. Discover science-backed solutions to rejuvenate, sculpt and restore your confidence. Our expert-led treatments deliver visible results with comfort, safety and care at every step.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => openBooking('booking')}>Book Now</Button>
              <Button variant="line" onClick={() => openBooking('consultation')}>Ask a specialist</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-14 pb-20 sm:pb-28" aria-labelledby="discover">
        <div className="wrap">
          <div className="flex flex-col gap-5 border-t hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
            <h2 id="discover" className="font-serif text-[clamp(1.6rem,2.4vw,2.2rem)] leading-none">
              Discover the Treatments <span className="serif-italic">We Offer</span>
            </h2>
            <div role="tablist" aria-label="Filter treatments" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              {(['all', 'facial', 'body', 'hair'] as Filter[]).map((f) => (
                <button
                  key={f}
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    'shrink-0 rounded-full border px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] transition-colors',
                    filter === f ? 'border-ink bg-ink text-bone' : 'hairline hover:border-ink',
                  )}
                >
                  {f === 'all' ? `All (${treatments.length})` : `${categories[f].label.replace(' Treatment', '')} (${treatments.filter((t) => t.category === f).length})`}
                </button>
              ))}
            </div>
          </div>

          <motion.ol layout className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence initial={false} mode="popLayout">
              {list.map((t) => (
                <motion.li
                  layout
                  key={t.slug}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <TreatmentCard t={t} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ol>
        </div>
      </section>

      <Reveal className="wrap pb-20">
        <p className="mx-auto max-w-3xl text-center font-serif text-3xl leading-snug text-graphite sm:text-4xl">
          Not sure which treatment is right for you? Every plan begins with a <span className="serif-italic text-ink">detailed consultation</span>.
        </p>
      </Reveal>

      <ConsultBand />
    </>
  )
}
