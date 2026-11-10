import { BeforeAfter } from '../../components/ui/BeforeAfter'
import { Img } from '../../components/ui/Img'
import { Reveal } from '../../components/motion/Reveal'
import { img } from '../../data/media'

const results = [
  {
    title: 'Facial Treatment Results',
    text: 'Every transformation reflects our commitment to excellence.',
    media: <BeforeAfter before={img.before1} after={img.after1} label="Facial treatment result" className="aspect-[4/5] w-full" />,
  },
  {
    title: 'Transformations You Can Feel',
    text: 'Our advanced facial treatments smooth fine lines and clear pigmentation, revealing your most confident, radiant skin.',
    media: <BeforeAfter before={img.before2} after={img.after2} label="Skin treatment result" className="aspect-[4/5] w-full" />,
  },
  {
    title: 'Real Hair Rejuvenation',
    text: 'Our specialised regrowth therapies strengthen roots, boost density and restore natural volume, one transformation at a time.',
    media: (
      <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
        <Img path={img.hairResult} alt="Hair rejuvenation at Venice Wellness Institute" frameClassName="h-full w-full" />
      </div>
    ),
  },
]

/** Heading row, then three results side by side (stacked on phones). */
export function Transformations() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="results-title">
      <div className="wrap">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-clay">Results</p>
            <h2 id="results-title" className="mt-5 font-serif text-[length:var(--text-headline)] leading-[1.02]">
              Visible Transformations, <span className="serif-italic">Real Results</span>
            </h2>
          </div>
          <p className="max-w-sm text-graphite md:col-span-4 md:col-start-9 md:justify-self-end">
            Drag the sliders to compare before and after.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {results.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.08}>
              {r.media}
              <h3 className="mt-5 font-serif text-2xl leading-tight">{r.title}</h3>
              <p className="mt-2 text-sm text-graphite">{r.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
