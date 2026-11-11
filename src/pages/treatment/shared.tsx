import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { Img } from '../../components/ui/Img'
import { TreatmentCard } from '../../components/ui/TreatmentCard'
import { Reveal } from '../../components/motion/Reveal'
import { useBooking } from '../../context/BookingContext'
import { byCategory, categories, treatments, type Treatment } from '../../data/treatments'
import { treatmentFaq } from '../../data/faq'
import { formatDate } from '../../data/posts'
import { postsForTreatment } from '../../data/related'

export function Crumbs({ t, light }: { t: Treatment; light?: boolean }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-xs uppercase tracking-[0.2em] ${light ? 'text-bone/70' : 'text-stone'}`}>
      <ol className="flex flex-wrap items-center gap-2">
        <li><Link to="/services/" className="link-underline">Services</Link></li>
        <li aria-hidden>/</li>
        <li><span>{categories[t.category].label}</span></li>
        <li aria-hidden>/</li>
        <li aria-current="page" className={light ? 'text-bone' : 'text-ink'}>{t.name}</li>
      </ol>
    </nav>
  )
}

export function BookCtas({ t, light }: { t: Treatment; light?: boolean }) {
  const { openBooking } = useBooking()
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant={light ? 'light' : 'solid'} onClick={() => openBooking('booking', t.name)}>Book Now</Button>
      <Button variant="line" icon={false} onClick={() => openBooking('consultation', t.name)}>Request Consultation</Button>
    </div>
  )
}

/** Other treatments in the same category as cards, then a compact link to the next treatment. */
export function MoreTreatments({ t }: { t: Treatment }) {
  const siblings = byCategory(t.category).filter((s) => s.slug !== t.slug).slice(0, 4)
  const next = treatments[(treatments.indexOf(t) + 1) % treatments.length]
  return (
    <section className="pb-20 sm:pb-28" aria-labelledby="more">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t hairline pt-10">
          <h2 id="more" className="font-serif text-[clamp(1.6rem,2.4vw,2.2rem)] leading-none">
            More <span className="serif-italic">{categories[t.category].plural.toLowerCase()}</span>
          </h2>
          <Link to="/services/" className="group inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em]">
            <span className="link-underline pb-0.5">All services</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
          </Link>
        </div>
        <ul className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {siblings.map((s) => (
            <li key={s.slug}>
              <TreatmentCard t={s} text="tagline" />
            </li>
          ))}
        </ul>

        <Reveal className="mt-14">
          <Link to={`/services/${next.slug}/`} className="group grid items-center gap-5 rounded-3xl border hairline bg-plaster/40 p-3 pr-6 transition-colors hover:bg-plaster sm:grid-cols-[180px_1fr_auto]">
            <div className="aspect-[16/9] overflow-hidden rounded-2xl sm:aspect-[4/3]">
              <Img path={next.image} alt="" frameClassName="h-full w-full" width={360} height={270} className="transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="px-2 sm:px-0">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-stone">Next treatment</p>
              <p className="mt-1.5 font-serif text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight transition-colors group-hover:text-clay">{next.name}</p>
              <p className="mt-1 text-sm text-graphite">{next.tagline}</p>
            </div>
            <span className="mx-2 mb-2 grid h-12 w-12 place-items-center rounded-full bg-ink text-bone transition-transform group-hover:translate-x-1 sm:m-0">
              <ArrowRight className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

/** Answer-first questions about the treatment (also emitted as FAQPage data by the build). */
export function TreatmentQA({ t }: { t: Treatment }) {
  const qa = treatmentFaq(t)
  return (
    <section className="wrap pb-20 sm:pb-28" aria-labelledby="qa">
      <div className="grid gap-10 border-t hairline pt-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <p className="eyebrow text-clay">Good to know</p>
          <h2 id="qa" className="mt-4 font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] leading-tight">
            {t.short} <span className="serif-italic">questions</span>
          </h2>
        </div>
        <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
          {qa.map((f) => (
            <div key={f.q}>
              <dt className="font-serif text-xl leading-snug">{f.q}</dt>
              <dd className="mt-2 text-graphite">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

/** Journal articles that discuss this treatment. */
export function RelatedReading({ t }: { t: Treatment }) {
  const list = postsForTreatment(t)
  if (!list.length) return null
  return (
    <section className="wrap pb-20 sm:pb-28" aria-labelledby="reading">
      <h2 id="reading" className="border-t hairline pt-10 font-serif text-[clamp(1.6rem,2.4vw,2.2rem)] leading-none">
        Related <span className="serif-italic">reading</span>
      </h2>
      <ul className="mt-8 grid gap-5 md:grid-cols-3">
        {list.map((p) => (
          <li key={p.slug}>
            <Link to={`/${p.slug}/`} className="group block h-full rounded-3xl border hairline p-6 transition-colors hover:bg-plaster">
              <p className="text-[0.65rem] uppercase tracking-[0.18em] text-stone">{formatDate(p.date)}</p>
              <p className="mt-3 font-serif text-xl leading-snug transition-colors group-hover:text-clay">{p.title}</p>
              <p className="mt-2 line-clamp-3 text-sm text-graphite">{p.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
