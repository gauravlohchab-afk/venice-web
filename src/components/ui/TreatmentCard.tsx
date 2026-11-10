import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { categories, type Treatment } from '../../data/treatments'
import { Img } from './Img'

/** Photo card for a treatment: category tag, name and one-line summary. Used on Services and treatment pages. */
export function TreatmentCard({ t, text = 'summary' }: { t: Treatment; text?: 'summary' | 'tagline' }) {
  return (
    <Link to={`/services/${t.slug}/`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Img
          path={t.image}
          alt={t.title}
          frameClassName="h-full w-full"
          width={600}
          height={450}
          className="transition-transform duration-700 ease-[var(--ease-silk)] group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-bone/90 px-3 py-1 text-[0.6rem] uppercase tracking-[0.18em] backdrop-blur-sm">
          {categories[t.category].label.replace(' Treatment', '')}
        </span>
        <span className="absolute bottom-3 right-3 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-bone text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} aria-hidden />
        </span>
      </div>
      <h3 className="mt-4 font-serif text-2xl leading-tight transition-colors group-hover:text-clay">{t.name}</h3>
      <p className="mt-1.5 text-sm text-graphite">{text === 'summary' ? t.summary : t.tagline}</p>
    </Link>
  )
}
