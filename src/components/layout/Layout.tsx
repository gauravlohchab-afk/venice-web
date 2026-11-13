import { motion } from 'framer-motion'
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
      {/* Each route fades in when navigated to. The first page (location.key "default") is not
          faded, so the pre-rendered HTML is visible before JavaScript runs. There is deliberately
          no exit animation: with AnimatePresence the outgoing <main> re-renders the new route via
          <Outlet>, and the incoming page could stay stuck at opacity 0 until a second click. */}
      <motion.main
        id="main"
        key={location.pathname}
        initial={location.key === 'default' ? false : { opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.45 } }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <FloatingBook />
      <BookingDialog />
    </>
  )
}
