import { AnimatePresence, motion } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { mainNav } from '../../data/nav'
import { site } from '../../data/site'
import { byCategory, categories, type Category } from '../../data/treatments'
import { cn } from '../../lib/cn'
import { Logo } from './Logo'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [services, setServices] = useState(false)
  const { openBooking } = useBooking()
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (!open) setServices(false)
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-lagoon-deep text-bone lg:hidden"
          initial={{ clipPath: 'circle(0% at 92% 4%)' }}
          animate={{ clipPath: 'circle(150% at 92% 4%)' }}
          exit={{ clipPath: 'circle(0% at 92% 4%)' }}
          transition={{ duration: 0.8, ease: [0.77, 0, 0.18, 1] }}
        >
          <div className="wrap flex h-[76px] shrink-0 items-center justify-between">
            <span onClick={onClose}>
              <Logo light />
            </span>
            <button onClick={onClose} className="grid h-11 w-11 place-items-center" aria-label="Close menu">
              <X className="h-6 w-6" strokeWidth={1.3} />
            </button>
          </div>
          <nav aria-label="Mobile" className="wrap flex-1 pt-6">
            <ul>
              {mainNav.map((item, i) => (
                <motion.li
                  key={item.to}
                  className="border-b border-bone/15"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  {'mega' in item ? (
                    <>
                      <div className="flex items-center justify-between">
                        <Link to={item.to} onClick={onClose} className="block py-4 font-serif text-[2.6rem] leading-none">
                          {item.label}
                        </Link>
                        <button
                          onClick={() => setServices((s) => !s)}
                          aria-expanded={services}
                          aria-label="Show treatments"
                          className="grid h-12 w-12 place-items-center"
                        >
                          <Plus className={cn('h-6 w-6 transition-transform duration-500', services && 'rotate-45')} strokeWidth={1.2} />
                        </button>
                      </div>
                      <AnimatePresence initial={false}>
                        {services && (
                          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                            <div className="grid gap-6 pb-6">
                              {(Object.keys(categories) as Category[]).map((c) => (
                                <div key={c}>
                                  <p className="eyebrow mb-2 text-bone/50">{categories[c].label}</p>
                                  <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                                    {byCategory(c).map((t) => (
                                      <li key={t.slug}>
                                        <Link onClick={onClose} to={`/services/${t.slug}/`} className="block py-1.5 text-[0.95rem]">
                                          {t.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link to={item.to} onClick={onClose} className="block py-4 font-serif text-[2.6rem] leading-none">
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="wrap shrink-0 space-y-3 py-8">
            <button
              onClick={() => {
                onClose()
                openBooking('booking')
              }}
              className="h-14 w-full rounded-full bg-bone text-[0.78rem] uppercase tracking-[0.2em] text-ink"
            >
              Book Now
            </button>
            <div className="flex justify-between text-sm text-bone/70">
              <a href={site.phone.href}>{site.phone.display}</a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
