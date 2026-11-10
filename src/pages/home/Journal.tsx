import { Link } from 'react-router-dom'
import { Img } from '../../components/ui/Img'
import { TextLink } from '../../components/ui/Button'
import { Reveal } from '../../components/motion/Reveal'
import { formatDate, posts } from '../../data/posts'

export function Journal() {
  const [a, b, c] = posts
  return (
    <section className="bg-plaster py-20 sm:py-28" aria-labelledby="journal-title">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-clay">Hot News &amp; Updates</p>
            <h2 id="journal-title" className="mt-5 font-serif text-[length:var(--text-headline)] leading-none">
              Our Latest <span className="serif-italic">Blog</span>
            </h2>
          </div>
          <TextLink to="/blogs/">All articles</TextLink>
        </div>
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          {[a, b, c].map((p, i) => (
            <Reveal
              key={p.slug}
              delay={i * 0.08}
              className={i === 0 ? 'md:col-span-7 md:row-span-2' : 'md:col-span-5'}
            >
              <Link to={`/${p.slug}/`} className="group block">
                <div className={`overflow-hidden rounded-2xl ${i === 0 ? 'aspect-[5/4]' : 'aspect-[16/10]'}`}>
                  <Img path={p.image} alt={p.title} frameClassName="h-full w-full" className="transition-transform duration-[1.2s] ease-[var(--ease-silk)] group-hover:scale-105" />
                </div>
                <p className="eyebrow mt-5 text-stone">{formatDate(p.date)}</p>
                <h3 className={`mt-3 font-serif leading-[1.05] transition-colors group-hover:text-clay ${i === 0 ? 'text-4xl sm:text-5xl' : 'text-2xl sm:text-3xl'}`}>{p.title}</h3>
                {i === 0 && <p className="mt-4 max-w-lg text-graphite">{p.excerpt}</p>}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
