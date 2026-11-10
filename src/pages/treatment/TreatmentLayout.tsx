import { motion } from 'framer-motion'
import { Img } from '../../components/ui/Img'
import { Reveal } from '../../components/motion/Reveal'
import { useBooking } from '../../context/BookingContext'
import { site } from '../../data/site'
import { categories, type Treatment } from '../../data/treatments'
import { BookCtas, Crumbs } from './shared'

/** One layout for every treatment: split hero, "why choose" with numbered cards, then the clinic's offers. */
export function TreatmentLayout({ t }: { t: Treatment }) {
  const { openBooking } = useBooking()
  const weekday = site.hours[0]

  return (
    <>
      {/* hero */}
      <section className="wrap pt-28 sm:pt-32">
        <Crumbs t={t} />
        <div className="mt-8 grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <p className="eyebrow text-clay">{categories[t.category].label}</p>
            <h1 className="mt-5 font-serif text-[length:var(--text-mega)] leading-[0.95] tracking-[-0.01em]">{t.title}</h1>
            <p className="serif-italic mt-4 text-2xl text-clay sm:text-[1.7rem]">{t.tagline}</p>
            <p className="mt-5 max-w-lg text-lg text-graphite">{t.summary}</p>
            <div className="mt-8"><BookCtas t={t} /></div>
            <p className="mt-5 text-sm text-stone">
              {weekday.days}: <span className="text-ink">{weekday.offer.toLowerCase()}</span>
            </p>
          </div>

          <div className="relative lg:col-span-6">
            <motion.div
              className="relative aspect-[4/3] overflow-hidden rounded-3xl lg:aspect-[5/4]"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <Img path={t.image} alt={t.title} priority frameClassName="h-full w-full" width={1200} height={960} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* why choose */}
      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-clay">{t.whyHeading}</p>
            <p className="mt-5 font-serif text-[length:var(--text-headline)] leading-[1.06]">{t.lead}</p>
            {t.areas && (
              <div className="mt-8">
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-stone">Areas treated</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {t.areas.map((a) => (
                    <li key={a} className="rounded-full bg-plaster px-4 py-1.5 text-sm">{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
          <div className="grid gap-8 lg:col-span-7 lg:pt-10">
            {t.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.06} className="border-l-2 border-sand pl-6">
                <p className={i === 0 ? 'text-lg text-ink' : 'text-graphite'}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* offers */}
      <section className="wrap pb-20 sm:pb-28">
        <Reveal className="grid gap-4 rounded-3xl bg-ink p-6 text-bone sm:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <p className="eyebrow text-bone/55">Opening hours</p>
            <p className="mt-3 font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] leading-tight">
              Book your <span className="serif-italic text-sand">{t.short}</span>
            </p>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
            {site.hours.map((h) => (
              <div key={h.days} className="rounded-2xl border border-bone/15 p-4">
                <dt className="text-[0.65rem] uppercase tracking-[0.18em] text-bone/55">{h.days} · {h.time}</dt>
                <dd className="serif-italic mt-1.5 text-lg text-sand">{h.offer}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-wrap gap-3 lg:col-span-3 lg:justify-end">
            <button
              onClick={() => openBooking('booking', t.name)}
              className="inline-flex h-12 items-center rounded-full bg-bone px-6 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-sand"
            >
              Book now
            </button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
