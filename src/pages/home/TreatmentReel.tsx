import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../../components/ui/Img'
import { Button } from '../../components/ui/Button'
import { Reveal } from '../../components/motion/Reveal'
import { categories, treatments } from '../../data/treatments'

/** All fourteen treatments in a swipeable, snap-scrolling carousel with arrow controls. */
export function TreatmentReel() {
  const track = useRef<HTMLOListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: false })

  const update = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdge({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 })
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update])

  const go = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('li')
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8
    el.scrollBy({ left: dir * step * (window.innerWidth >= 1024 ? 2 : 1), behavior: 'smooth' })
  }

  return (
    <section className="bg-plaster py-20 sm:py-24" aria-labelledby="reel-title">
      <div className="wrap flex flex-wrap items-end justify-between gap-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-clay">Services</p>
          <h2 id="reel-title" className="mt-5 font-serif text-[length:var(--text-headline)] leading-[1.02]">
            Advanced Aesthetic Care for <span className="serif-italic">Face, Body &amp; Hair</span>
          </h2>
          <p className="mt-5 max-w-md text-graphite">
            A complete range of treatments designed to rejuvenate your skin, sculpt your body and elevate your confidence.
          </p>
        </Reveal>
        <div className="flex items-center gap-3">
          <Button to="/services/" variant="line" className="hidden sm:inline-flex">All services</Button>
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              onClick={() => go(d)}
              disabled={d === -1 ? edge.start : edge.end}
              aria-label={d === -1 ? 'Previous treatments' : 'Next treatments'}
              className="grid h-12 w-12 place-items-center rounded-full border hairline transition-colors hover:bg-ink hover:text-bone disabled:pointer-events-none disabled:opacity-30"
            >
              {d === -1 ? <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> : <ArrowRight className="h-4 w-4" strokeWidth={1.5} />}
            </button>
          ))}
        </div>
      </div>

      <ol
        ref={track}
        onScroll={update}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-1520px)/2+clamp(1rem,4vw,3.5rem)))] scroll-px-[max(1rem,calc((100vw-1520px)/2+clamp(1rem,4vw,3.5rem)))] pb-2"
      >
        {treatments.map((t) => (
          <li key={t.slug} className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[calc((min(100vw,1520px)-2*clamp(1rem,4vw,3.5rem)-3*1.5rem)/4)]">
            <Link to={`/services/${t.slug}/`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                <Img path={t.image} alt={t.title} frameClassName="h-full w-full" className="transition-transform duration-700 ease-[var(--ease-silk)] group-hover:scale-105" />
                <span className="absolute left-3 top-3 rounded-full bg-bone/90 px-3 py-1 text-[0.62rem] uppercase tracking-[0.18em] text-ink backdrop-blur-sm">
                  {categories[t.category].label.replace(' Treatment', '')}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-[1.65rem] leading-tight transition-colors group-hover:text-clay">{t.short}</h3>
              <p className="mt-1.5 text-sm text-graphite">{t.tagline}</p>
            </Link>
          </li>
        ))}
      </ol>
      <div className="wrap mt-10 sm:hidden">
        <Button to="/services/" variant="line">All services</Button>
      </div>
    </section>
  )
}
