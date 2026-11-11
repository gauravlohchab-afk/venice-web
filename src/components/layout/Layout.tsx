import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { BookingDialog } from '../forms/BookingDialog'
import { Seo } from '../ui/Seo'
import { ScrollTrigger } from '../../lib/gsap'
import { Footer } from './Footer'
import { Header } from './Header'
import { FloatingBook } from './FloatingBook'

export function Layout() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
    const t = setTimeout(() => ScrollTrigger.refresh(), 700)
    return () => clearTimeout(t)
  }, [location.pathname, location.hash])

  return (
    <>
      <Seo />
      <Header />
      {/* initial={false}: the first page is visible in the pre-rendered HTML; only route changes fade */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="main"
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.45 } }}
          exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      <FloatingBook />
      <BookingDialog />
    </>
  )
}
