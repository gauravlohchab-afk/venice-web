import { motion, useScroll } from 'framer-motion'
import { Link2, Mail } from 'lucide-react'
import { Facebook } from '../components/ui/BrandIcons'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Img } from '../components/ui/Img'
import { RichBody, slugify } from '../components/ui/RichBody'
import { SplitText } from '../components/motion/SplitText'
import { Button } from '../components/ui/Button'
import { useBooking } from '../context/BookingContext'
import { findPost, formatDate, posts } from '../data/posts'
import { SITE_URL } from '../data/seo'
import NotFound from './NotFound'

export default function Post() {
  const { slug } = useParams()
  const post = findPost(slug)
  const { scrollYProgress } = useScroll()
  const [copied, setCopied] = useState(false)
  const { openBooking } = useBooking()
  if (!post) return <NotFound />

  const url = `${SITE_URL}/${post.slug}/`
  const toc = post.body.filter((l) => l.startsWith('## ')).map((l) => l.slice(3))
  const idx = posts.indexOf(post)
  const prev = posts[idx - 1]
  const next = posts[idx + 1]

  return (
    <article>
      <motion.div aria-hidden className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-clay" style={{ scaleX: scrollYProgress }} />
      <header className="wrap pt-28 sm:pt-36">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.2em] text-stone">
          <Link to="/blogs/" className="link-underline">Blogs</Link> <span aria-hidden>/</span> {post.tags.join(', ')}
        </nav>
        <h1 className="mt-8 max-w-[22ch] font-serif text-[clamp(2.4rem,5.6vw,5.4rem)] leading-[0.98] tracking-[-0.015em]">
          <SplitText immediate delay={0.3} text={post.title} stagger={0.03} />
        </h1>
        <p className="eyebrow mt-8 text-stone">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · Venice Wellness Institute
        </p>
      </header>

      <div className="wrap mt-12">
        <motion.div initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} transition={{ duration: 1.3, ease: [0.77, 0, 0.18, 1], delay: 0.4 }}>
          <Img path={post.image} alt={post.title} priority frameClassName="aspect-[16/9] w-full rounded-2xl" width={1600} height={900} />
        </motion.div>
      </div>

      <div className="wrap grid gap-14 py-20 lg:grid-cols-12">
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28">
            {toc.length > 2 && (
              <nav aria-label="In this article" className="hidden lg:block">
                <p className="eyebrow text-stone">In this article</p>
                <ol className="mt-4 space-y-2 text-sm">
                  {toc.map((t) => (
                    <li key={t}><a href={`#${slugify(t)}`} className="text-graphite transition-colors hover:text-clay">{t}</a></li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="mt-10 flex gap-2 lg:flex-col lg:items-start">
              <p className="eyebrow mr-2 self-center text-stone lg:mb-2 lg:self-auto">Share</p>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="grid h-10 w-10 place-items-center rounded-full border hairline hover:bg-ink hover:text-bone"><Facebook className="h-4 w-4" strokeWidth={1.4} /></a>
              <a href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(url)}`} aria-label="Share by email" className="grid h-10 w-10 place-items-center rounded-full border hairline hover:bg-ink hover:text-bone"><Mail className="h-4 w-4" strokeWidth={1.4} /></a>
              <button
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(url)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  } catch {
                    /* clipboard unavailable */
                  }
                }}
                aria-label="Copy link"
                className="grid h-10 w-10 place-items-center rounded-full border hairline hover:bg-ink hover:text-bone"
              >
                <Link2 className="h-4 w-4" strokeWidth={1.4} />
              </button>
              <span role="status" className="self-center text-xs text-clay">{copied ? 'Link copied' : ''}</span>
            </div>
          </div>
        </aside>
        <div className="max-w-[44rem] lg:col-span-7 lg:col-start-5">
          <RichBody lines={post.body} />
          <div className="mt-16 border-t hairline pt-10">
            <p className="font-serif text-3xl">Ready to begin?</p>
            <p className="mt-3 text-graphite">Book a consultation and our specialists will build a plan around your skin and goals.</p>
            <div className="mt-6"><Button onClick={() => openBooking('booking')}>Book Now</Button></div>
          </div>
        </div>
      </div>

      <nav aria-label="More articles" className="grid border-t hairline md:grid-cols-2">
        {[prev, next].map((p, k) =>
          p ? (
            <Link key={p.slug} to={`/${p.slug}/`} className={`group block p-8 transition-colors hover:bg-plaster sm:p-14 ${k ? 'md:border-l md:text-right hairline' : ''}`}>
              <p className="eyebrow text-stone">{k ? 'Next' : 'Previous'}</p>
              <p className="mt-4 font-serif text-3xl leading-tight transition-colors group-hover:text-clay">{p.title}</p>
            </Link>
          ) : (
            <Link key={k} to="/blogs/" className={`block p-8 sm:p-14 ${k ? 'md:border-l md:text-right hairline' : ''}`}>
              <p className="eyebrow text-stone">Journal</p>
              <p className="mt-4 font-serif text-3xl">All articles</p>
            </Link>
          ),
        )}
      </nav>
    </article>
  )
}
