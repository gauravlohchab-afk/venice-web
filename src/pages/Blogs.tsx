import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Img } from '../components/ui/Img'
import { Reveal } from '../components/motion/Reveal'
import { SplitText } from '../components/motion/SplitText'
import { formatDate, posts } from '../data/posts'
import { cn } from '../lib/cn'

export default function Blogs() {
  const tags = useMemo(() => ['All', ...Array.from(new Set(posts.flatMap((p) => p.tags)))], [])
  const [tag, setTag] = useState('All')
  const list = tag === 'All' ? posts : posts.filter((p) => p.tags.includes(tag))
  const [lead, ...rest] = list

  return (
    <>
      <section className="wrap pt-28 sm:pt-36">
        <p className="eyebrow text-clay">Journal</p>
        <h1 className="mt-6 font-serif text-[length:var(--text-display)] leading-[0.82] tracking-[-0.03em]">
          <SplitText immediate delay={0.3} text="Blogs" />
        </h1>
        <div className="mt-12 flex flex-wrap gap-2 border-t hairline pt-8" role="tablist" aria-label="Filter articles">
          {tags.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tag === t}
              onClick={() => setTag(t)}
              className={cn('rounded-full px-4 py-2 text-xs uppercase tracking-[0.18em] transition-colors', tag === t ? 'bg-ink text-bone' : 'text-graphite hover:text-ink')}
            >
              {t}
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div key={tag} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          {lead && (
            <section className="wrap mt-14">
              <Link to={`/${lead.slug}/`} className="group grid gap-8 lg:grid-cols-12 lg:items-center">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl lg:col-span-7">
                  <Img path={lead.image} alt={lead.title} priority frameClassName="h-full w-full" className="transition-transform duration-[1.4s] ease-[var(--ease-silk)] group-hover:scale-105" />
                </div>
                <div className="lg:col-span-5 lg:pl-6">
                  <p className="eyebrow text-stone">{formatDate(lead.date)} · {lead.tags.join(', ')}</p>
                  <h2 className="mt-5 font-serif text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] transition-colors group-hover:text-clay">{lead.title}</h2>
                  <p className="mt-5 text-graphite">{lead.excerpt}</p>
                  <span className="eyebrow mt-8 inline-block border-b border-current pb-1">Read More</span>
                </div>
              </Link>
            </section>
          )}

          <section className="wrap py-20 sm:py-24">
            <ul className="grid gap-x-10 gap-y-20 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={(i % 3) * 0.08}>
                    <Link to={`/${p.slug}/`} className="group block">
                      <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                        <Img path={p.image} alt={p.title} frameClassName="h-full w-full" className="transition-transform duration-[1.2s] ease-[var(--ease-silk)] group-hover:scale-105" />
                      </div>
                      <p className="eyebrow mt-5 text-stone">{formatDate(p.date)}</p>
                      <h2 className="mt-3 font-serif text-[1.85rem] leading-[1.08] transition-colors group-hover:text-clay">{p.title}</h2>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          </section>
        </motion.div>
      </AnimatePresence>
    </>
  )
}
