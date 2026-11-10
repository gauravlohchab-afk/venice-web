import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import { useBooking } from '../../context/BookingContext'
import { site } from '../../data/site'

/** "Book Now" and Messenger shortcuts, as on the original site, shown after the first screen. */
export function FloatingBook() {
  const { scrollY } = useScroll()
  const [show, setShow] = useState(false)
  const { openBooking } = useBooking()
  useMotionValueEvent(scrollY, 'change', (y) => setShow(y > window.innerHeight * 0.8))
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-40 flex items-center gap-2 sm:bottom-6 sm:right-6"
      initial={false}
      animate={{ y: show ? 0 : 120, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href={site.social.messenger}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on Messenger"
        tabIndex={show ? 0 : -1}
        className="grid h-12 w-12 place-items-center rounded-full bg-bone text-ink shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition hover:bg-plaster"
      >
        <MessageCircle className="h-5 w-5" strokeWidth={1.4} />
      </a>
      <button
        onClick={() => openBooking('booking')}
        tabIndex={show ? 0 : -1}
        className="h-12 rounded-full bg-ink px-6 ring-1 ring-bone/25 text-[0.72rem] uppercase tracking-[0.2em] text-bone shadow-[0_8px_30px_rgba(0,0,0,0.18)] transition hover:bg-lagoon"
      >
        Book Now
      </button>
    </motion.div>
  )
}
