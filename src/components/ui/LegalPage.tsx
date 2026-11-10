import type { ReactNode } from 'react'
import { SplitText } from '../motion/SplitText'
import { slugify } from './RichBody'

export type LegalSection = { heading: string; body: ReactNode; sub?: { heading: string; body: ReactNode }[] }

/** Long-form legal layout with a sticky index. */
export function LegalPage({ title, intro, sections, updated }: { title: string; intro?: ReactNode; sections: LegalSection[]; updated?: string }) {
  return (
    <div className="wrap pt-28 pb-20 sm:pt-36">
      <h1 className="max-w-[14ch] font-serif text-[length:var(--text-mega)] leading-[0.92]">
        <SplitText immediate delay={0.3} text={title} />
      </h1>
      {updated && <p className="eyebrow mt-6 text-stone">Last updated {updated}</p>}
      <div className="mt-16 grid gap-14 border-t hairline pt-12 lg:grid-cols-12">
        <nav aria-label="Sections" className="lg:col-span-3">
          <ol className="space-y-2 text-sm lg:sticky lg:top-28">
            {sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#${slugify(s.heading)}`} className="flex gap-3 text-graphite transition-colors hover:text-clay">
                  <span className="tabular-nums text-stone">{String(i + 1).padStart(2, '0')}</span>
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="max-w-[44rem] space-y-14 text-graphite lg:col-span-8 lg:col-start-5 [&_p+p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {intro && <div className="text-lg text-ink">{intro}</div>}
          {sections.map((s) => (
            <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-28">
              <h2 className="font-serif text-3xl text-ink">{s.heading}</h2>
              <div className="mt-4">{s.body}</div>
              {s.sub?.map((x) => (
                <div key={x.heading} className="mt-8">
                  <h3 className="font-serif text-xl text-ink">{x.heading}</h3>
                  <div className="mt-2">{x.body}</div>
                </div>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
