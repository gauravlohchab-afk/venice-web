import { MotionConfig } from 'framer-motion'
import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { BookingProvider } from './context/BookingContext'
import Home from './pages/Home'

const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Treatment = lazy(() => import('./pages/Treatment'))
const Contact = lazy(() => import('./pages/Contact'))
const Blogs = lazy(() => import('./pages/Blogs'))
const Post = lazy(() => import('./pages/Post'))
const Faq = lazy(() => import('./pages/Faq'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Shop = lazy(() => import('./pages/Shop'))
const Booking = lazy(() => import('./pages/Booking'))
const NotFound = lazy(() => import('./pages/NotFound'))

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <BookingProvider>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="about-us" element={<About />} />
                <Route path="services" element={<Services />} />
                <Route path="services/:slug" element={<Treatment />} />
                <Route path="contact-us" element={<Contact />} />
                <Route path="blogs" element={<Blogs />} />
                <Route path="faq" element={<Faq />} />
                <Route path="privacy-policy" element={<Privacy />} />
                <Route path="refund_returns" element={<Navigate to="/contact-us/" replace />} />
                <Route path="shop" element={<Shop />} />
                <Route path="booking" element={<Booking />} />
                {/* WooCommerce utility pages from the original site; there are no products yet */}
                {['cart-2', 'checkout', 'my-account', 'wishlist', 'yith-compare'].map((p) => (
                  <Route key={p} path={p} element={<Navigate to="/shop/" replace />} />
                ))}
                {/* The original /popup/ page is the booking modal template */}
                <Route path="popup" element={<Navigate to="/#book" replace />} />
                <Route path=":slug" element={<Post />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BookingProvider>
      </BrowserRouter>
    </MotionConfig>
  )
}
