import { ArrowUpRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MaskImage } from '../components/motion/MaskImage'
import { Reveal } from '../components/motion/Reveal'
import { SplitText } from '../components/motion/SplitText'
import { Button } from '../components/ui/Button'
import { ConsultBand } from '../components/ui/ConsultBand'
import { Img } from '../components/ui/Img'
import { useBooking } from '../context/BookingContext'
import { img } from '../data/media'
import { site } from '../data/site'
import { byCategory, categories, type Category } from '../data/treatments'


const gallery = [
  { path: img.reception, caption: 'Reception', alt: 'Reception desk with the Venice Wellness Institute sign' },
  { path: img.waiting, caption: 'Waiting area', alt: 'Waiting area with blue sofas by the windows' },
  { path: img.treatmentRoom, caption: 'Treatment room', alt: 'Treatment room with a round mirror and folded towels' },
  { path: img.corridor, caption: 'Corridor', alt: 'Lit corridor leading to the treatment rooms' },
  { path: img.trolley, caption: 'Treatment trolley', alt: 'Treatment trolley with bamboo and Venice Wellness Institute water' },
]

export default function About() {
  const { openBooking } = useBooking()
  const cats = Object.keys(categories) as Category[]

  return (
    <>
      {/* hero */}
      <section className="wrap pt-28 sm:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <p className="eyebrow text-clay">About us</p>
            <h1 className="mt-5 font-serif text-[length:var(--text-mega)] leading-[0.95] tracking-[-0.01em]">
              <SplitText immediate delay={0.2} text="Your Destination for Face, Body & Hair Wellness" italicWords={['Face,', 'Body', 'Hair']} />
            </h1>
            <p className="mt-6 max-w-xl text-lg text-graphite">
              At Venice Wellness Institute, our goal is to combine science-backed treatments with advanced aesthetic technologies, so you look and feel your best. Whether you want to rejuvenate your skin, sculpt your body or restore healthy hair, our personalised solutions are designed to deliver visible, lasting results.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => openBooking('booking')}>Book Now</Button>
              <Button to="/services/" variant="line">Our services</Button>
            </div>
          </div>

          <div className="relative pb-10 pr-6 sm:pr-10 lg:col-span-6">
            <MaskImage path={img.lounge} alt="Marble lounge at Venice Wellness Institute" priority className="aspect-[5/4] w-full rounded-3xl" from="bottom" />
            <div className="absolute bottom-0 right-0 w-[38%] rounded-[1.4rem] bg-bone p-2 shadow-[0_24px_60px_-20px_rgba(29,28,26,0.4)]">
              <div className="aspect-square overflow-hidden rounded-2xl">
                <Img path={img.welcome} alt="Treatment menu on the reception table" frameClassName="h-full w-full" width={400} height={400} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* mission */}
      <section className="wrap pt-6 pb-20 sm:pb-28">
        <Reveal className="relative overflow-hidden rounded-3xl bg-ink px-6 py-12 text-bone sm:px-12 sm:py-16">
          <div className="relative grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="eyebrow text-bone/50">Our mission</p>
            </div>
            <blockquote className="lg:col-span-9">
              <p className="font-serif text-[clamp(1.9rem,3.6vw,3.4rem)] leading-[1.08]">
                True beauty and confidence begin with <span className="serif-italic text-sand">balance</span>, inside and out.
              </p>
              <footer className="mt-6 max-w-xl text-bone/70">
                Our mission is to provide advanced face, body and hair treatments that combine modern technology with a holistic approach to self-care.
              </footer>
              <p className="mt-6 text-sm text-sand">
                Tailored plans for all skin and body types
              </p>
            </blockquote>
          </div>
        </Reveal>
      </section>

      {/* the clinic */}
      <section className="wrap pb-20 sm:pb-28" aria-labelledby="clinic">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow text-clay">The clinic</p>
            <h2 id="clinic" className="mt-4 font-serif text-[length:var(--text-headline)] leading-none">
              Inside <span className="serif-italic">Venice</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm text-graphite">
            {site.address.line1}, {site.address.line2}
          </p>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
          {gallery.map((g, i) => (
            <Reveal key={g.path} delay={i * 0.05} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
              <figure className="group relative h-full overflow-hidden rounded-2xl">
                <div className={i === 0 ? 'aspect-square h-full' : 'aspect-square'}>
                  <Img
                    path={g.path}
                    alt={g.alt}
                    frameClassName="h-full w-full"
                    width={i === 0 ? 1000 : 500}
                    height={i === 0 ? 1000 : 500}
                    className="transition-transform duration-700 ease-[var(--ease-silk)] group-hover:scale-105"
                  />
                </div>
                <figcaption className="absolute bottom-3 left-3 rounded-full bg-bone/90 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] backdrop-blur-sm">
                  {g.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* core services */}
      <section className="wrap pb-20 sm:pb-28" aria-labelledby="core">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-clay">Our core services</p>
            <h2 id="core" className="mt-4 font-serif text-[length:var(--text-headline)] leading-none">
              Skilled and certified <span className="serif-italic">professionals</span>
            </h2>
          </div>
          <Button to="/services/" variant="line">All services</Button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {cats.map((c, i) => {
            const list = byCategory(c)
            return (
              <Reveal key={c} delay={i * 0.08} className="flex flex-col overflow-hidden rounded-3xl border hairline bg-plaster/30">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Img path={list[0].image} alt={categories[c].plural} frameClassName="h-full w-full" width={640} height={400} />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-serif text-3xl leading-tight">{categories[c].plural}</h3>
                  <p className="mt-2 text-sm text-graphite">{categories[c].intro}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {list.map((t) => (
                      <li key={t.slug}>
                        <Link to={`/services/${t.slug}/`} className="inline-flex rounded-full border hairline bg-bone px-3 py-1.5 text-xs transition-colors hover:border-ink hover:bg-ink hover:text-bone">
                          {t.short}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link to="/services/" className="group mt-auto inline-flex items-center gap-1.5 pt-6 text-xs font-medium uppercase tracking-[0.18em] text-clay">
                    Explore {categories[c].plural.toLowerCase()}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.6} />
                  </Link>
                </div>
              </Reveal>
            )
          })}
        </div>
      </section>

      {/* hours & offers */}
      <section className="wrap pb-20 sm:pb-28" aria-labelledby="hours">
        <Reveal className="grid gap-6 rounded-3xl bg-plaster p-6 sm:p-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <p className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-clay">
              <Clock className="h-4 w-4" strokeWidth={1.5} aria-hidden /> Opening hours &amp; offers
            </p>
            <h2 id="hours" className="mt-3 font-serif text-[clamp(1.8rem,2.8vw,2.6rem)] leading-tight">
              Opening hours
            </h2>
          </div>
          <dl className="grid gap-3 sm:grid-cols-2 lg:col-span-5">
            {site.hours.map((h) => (
              <div key={h.days} className="rounded-2xl bg-bone p-5">
                <dt className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-2xl">{h.days}</span>
                  <span className="text-sm text-graphite">{h.time}</span>
                </dt>
                <dd className="serif-italic mt-2 text-lg text-lagoon">{h.offer}</dd>
              </div>
            ))}
          </dl>
          <div className="lg:col-span-3 lg:flex lg:justify-end">
            <Button onClick={() => openBooking('booking')}>Book a visit</Button>
          </div>
        </Reveal>
      </section>

      <ConsultBand />
    </>
  )
}
