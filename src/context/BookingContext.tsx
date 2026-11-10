import { useLocation, useNavigate } from 'react-router-dom'
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export type BookingTab = 'consultation' | 'booking'
type State = { open: boolean; tab: BookingTab; treatment?: string }
type Ctx = State & { openBooking: (tab?: BookingTab, treatment?: string) => void; close: () => void; setTab: (t: BookingTab) => void }

const BookingCtx = createContext<Ctx | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>({ open: false, tab: 'consultation' })
  const openBooking = useCallback((tab: BookingTab = 'consultation', treatment?: string) => setState({ open: true, tab, treatment }), [])
  const close = useCallback(() => setState((s) => ({ ...s, open: false })), [])
  const setTab = useCallback((tab: BookingTab) => setState((s) => ({ ...s, tab })), [])

  // The original site opens the booking modal from "#book" and "#booking" links.
  const { hash, pathname, search } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (/^#book(ing)?\/?$/.test(hash)) {
      openBooking(hash.startsWith('#booking') ? 'booking' : 'consultation')
      navigate(pathname + search, { replace: true })
    }
  }, [hash, pathname, search, navigate, openBooking])

  return <BookingCtx.Provider value={{ ...state, openBooking, close, setTab }}>{children}</BookingCtx.Provider>
}

export const useBooking = () => {
  const c = useContext(BookingCtx)
  if (!c) throw new Error('useBooking must be used inside BookingProvider')
  return c
}
