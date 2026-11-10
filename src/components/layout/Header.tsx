import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ChevronDown, Menu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { mainNav } from '../../data/nav'
import { byCategory, categories, treatments, type Category } from '../../data/treatments'
import { cn } from '../../lib/cn'
import { Img } from '../ui/Img'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mega, setMega] = useState(false)
  const [mobile, setMobile] = useState(false)
  const [preview, setPreview] = useState(treatments[0])
  const { openBooking } = useBooking()
  const { pathname } = useLocation()
  const closeTimer = useRef<number>(0)
  // Pages that open on a dark full-bleed hero need light header text until the bar fills in.
  const darkHero = pathname === '/shop/'
  const light = darkHero && !scrolled && !mega

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 40)
    setHidden(y > 400 && y > prev && !mega)
  })

  useEffect(() => {
    setMega(false)
    setMobile(false)
  }, [pathname])

  const openMega = () => {
    window.clearTimeout(closeTimer.current)
    setMega(true)
  }
  const closeMega = () => {
    closeTimer.current = window.setTimeout(() => setMega(false), 160)
  }

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:bg-ink focus:px-4 focus:py-2 focus:text-bone">
        Skip to content
      </a>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500',
          mega ? 'border-b hairline bg-bone' : scrolled ? 'border-b hairline bg-bone/85 backdrop-blur-xl' : 'border-b border-transparent',
          light && 'text-bone',
        )}
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onMouseLeave={closeMega}
      >
        <div className="wrap flex h-[76px] items-center justify-between gap-6">
          <Logo light={light} />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[0.78rem] uppercase tracking-[0.2em]">
              {mainNav.map((item) =>
                'mega' in item ? (
                  <li key={item.to} onMouseEnter={openMega} className="flex items-center gap-1">
                    <NavLink to={item.to} className={({ isActive }) => cn('link-underline py-2', isActive && 'text-clay')}>
                      {item.label}
                    </NavLink>
                    <button
                      aria-expanded={mega}
                      aria-controls="mega-menu"
                      aria-label="Show treatments"
                      onClick={() => (mega ? setMega(false) : openMega())}
                      className="p-1"
                    >
                      <ChevronDown className={cn('h-3.5 w-3.5 transition-transform duration-500', mega && 'rotate-180')} strokeWidth={1.5} />
                    </button>
                  </li>
                ) : (
                  <li key={item.to} onMouseEnter={closeMega}>
                    <NavLink end to={item.to} className={({ isActive }) => cn('link-underline py-2', isActive && 'text-clay')}>
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => openBooking('booking')}
              className={cn(
                'group relative hidden h-11 overflow-hidden rounded-full px-6 text-[0.72rem] uppercase tracking-[0.2em] transition-colors duration-500 sm:block',
                light ? 'bg-bone text-ink hover:text-bone' : 'bg-ink text-bone',
              )}
            >
              <span className="relative z-10">Book Now</span>
              <span className="absolute inset-0 origin-left scale-x-0 bg-lagoon transition-transform duration-500 ease-[var(--ease-silk)] group-hover:scale-x-100" />
            </button>
            <button onClick={() => setMobile(true)} className="grid h-11 w-11 place-items-center lg:hidden" aria-label="Open menu" aria-expanded={mobile}>
              <Menu className="h-6 w-6" strokeWidth={1.3} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mega && (
            <motion.div
              id="mega-menu"
              onMouseEnter={openMega}
              onKeyDown={(e) => e.key === 'Escape' && setMega(false)}
              className="hidden overflow-hidden border-t hairline bg-bone text-ink lg:block"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="wrap grid grid-cols-[minmax(0,2.3fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(240px,1fr)] gap-x-6 pt-8 pb-6 xl:gap-x-8">
                {(Object.keys(categories) as Category[]).map((c) => {
                  const list = byCategory(c)
                  return (
                    <div key={c}>
                      <p className="mb-3 flex items-center gap-2 px-3 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-stone">
                        {categories[c].label}
                        <span className="rounded-full bg-plaster px-2 py-0.5 text-[0.6rem] tracking-normal text-graphite">{list.length}</span>
                      </p>
                      <ul className={cn('grid gap-1', c === 'facial' ? 'grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-2' : 'grid-cols-[minmax(0,1fr)]')}>
                        {list.map((t) => (
                          <li key={t.slug}>
                            <Link
                              to={`/services/${t.slug}/`}
                              onMouseEnter={() => setPreview(t)}
                              onFocus={() => setPreview(t)}
                              className={cn(
                                'group flex items-center gap-3 rounded-xl p-2 pr-3 transition-colors hover:bg-plaster focus-visible:bg-plaster',
                                preview.slug === t.slug && 'bg-plaster/60',
                              )}
                            >
                              <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg">
                                <Img path={t.image} alt="" frameClassName="h-full w-full" width={88} height={88} />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-[0.95rem] font-medium leading-tight transition-colors group-hover:text-clay">{t.short}</span>
                                <span className="mt-0.5 block truncate text-xs text-stone">{t.tagline}</span>
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}

                <Link to={`/services/${preview.slug}/`} className="group flex flex-col overflow-hidden rounded-2xl bg-plaster">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.div
                        key={preview.slug}
                        className="absolute inset-0"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <Img path={preview.image} alt={preview.title} frameClassName="h-full w-full" width={560} height={420} />
                      </motion.div>
                    </AnimatePresence>
                    <span className="absolute left-3 top-3 rounded-full bg-bone/90 px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] backdrop-blur-sm">
                      {categories[preview.category].label.replace(' Treatment', '')}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-serif text-2xl leading-tight">{preview.title}</p>
                    <p className="mt-1.5 text-sm text-graphite">{preview.tagline}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-medium uppercase tracking-[0.18em] text-clay">
                      View treatment
                      <ChevronDown className="h-3.5 w-3.5 -rotate-90 transition-transform group-hover:translate-x-1" strokeWidth={1.8} />
                    </span>
                  </div>
                </Link>
              </div>

              <div className="border-t hairline">
                <div className="wrap flex items-center justify-between gap-6 py-4 text-sm">
                  <p className="text-graphite">
                    Not sure which treatment suits you? <span className="text-ink">Every plan begins with a consultation.</span>
                  </p>
                  <div className="flex items-center gap-2">
                    <Link to="/services/" className="rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors hover:bg-plaster">
                      All services
                    </Link>
                    <button
                      onClick={() => {
                        setMega(false)
                        openBooking('consultation')
                      }}
                      className="rounded-full bg-ink px-5 py-2 text-xs font-medium uppercase tracking-[0.18em] text-bone transition-colors hover:bg-lagoon"
                    >
                      Book a consultation
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
      <AnimatePresence>
        {mega && (
          <motion.div
            aria-hidden
            className="fixed inset-0 z-40 hidden bg-ink/25 lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setMega(false)}
          />
        )}
      </AnimatePresence>
      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </>
  )
}
