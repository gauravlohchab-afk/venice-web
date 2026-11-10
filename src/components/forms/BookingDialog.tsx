import { AnimatePresence, motion } from 'framer-motion'
import { MessageSquare, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useBooking } from '../../context/BookingContext'
import { cn } from '../../lib/cn'
import { BookingForm } from './BookingForm'
import { ConsultationForm } from './ConsultationForm'
import { ThankYou } from './ThankYou'

const tabs = [
  { key: 'consultation', label: 'Consultation', Icon: MessageSquare },
  { key: 'booking', label: 'Direct Booking', Icon: Phone },
] as const

/** Compact centred booking popup with Consultation / Direct Booking tabs. */
export function BookingDialog() {
  const { open, tab, treatment, close, setTab } = useBooking()
  const [done, setDone] = useState<null | 'endpoint' | 'email'>(null)
  const panel = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return
    setDone(null)
    lastFocus.current = document.activeElement as HTMLElement
    document.documentElement.style.overflow = 'hidden'
    const t = setTimeout(() => panel.current?.querySelector<HTMLElement>('[role="tabpanel"] input')?.focus(), 350)
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>('a,button,input,select,textarea')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', key)
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', key)
      document.documentElement.style.overflow = ''
      lastFocus.current?.focus?.()
    }
  }, [open, close])

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] grid place-items-center p-0 sm:p-5" initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.button
            aria-label="Close booking"
            className="absolute inset-0 cursor-default bg-ink/55 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
          />
          <motion.div
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            className="relative grid h-[100svh] w-full max-w-[560px] grid-rows-[minmax(0,1fr)] overflow-hidden bg-bone shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)] sm:h-auto sm:rounded-3xl sm:border sm:border-sand/60"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex min-h-0 flex-col">
              <div className="flex items-start justify-between gap-4 px-5 pt-5 sm:px-6">
                <div>
                  <h2 id="booking-title" className="serif-italic text-[1.75rem] leading-none">Begin Your Journey</h2>
                  <p className="mt-1.5 text-[0.8rem] text-clay">Choose how you’d like to connect with our specialists</p>
                </div>
                <button
                  onClick={close}
                  className="-mr-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-sand transition hover:rotate-90 hover:bg-ink hover:text-bone"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              <div role="tablist" aria-label="Booking type" className="mx-5 mt-4 grid grid-cols-2 border-b hairline sm:mx-6">
                {tabs.map(({ key, label, Icon }) => (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={tab === key}
                    onClick={() => {
                      setTab(key)
                      setDone(null)
                    }}
                    className={cn(
                      'relative flex items-center justify-center gap-2 pb-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] transition-colors',
                      tab === key ? 'text-ink' : 'text-clay/75 hover:text-ink',
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.6} aria-hidden />
                    {label}
                    {tab === key && <motion.span layoutId="booking-tab-line" className="absolute -bottom-px left-0 h-[2px] w-full rounded-full bg-clay" />}
                  </button>
                ))}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:max-h-[min(560px,calc(100svh-150px))] sm:flex-none sm:px-6" role="tabpanel">
                {done ? (
                  <ThankYou via={done} onClose={close} />
                ) : tab === 'consultation' ? (
                  <ConsultationForm key="c" treatment={treatment} onDone={setDone} variant="dialog" />
                ) : (
                  <BookingForm key="b" treatment={treatment} onDone={setDone} variant="dialog" />
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
