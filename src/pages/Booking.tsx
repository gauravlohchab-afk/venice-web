import { CalendarCheck, Clock, MapPin, MessageCircle, Phone } from 'lucide-react'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Reveal } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { Img } from '../components/ui/Img'
import { img } from '../data/media'
import { useBooking, type BookingTab } from '../context/BookingContext'
import { site } from '../data/site'
import { treatments } from '../data/treatments'

/**
 * /booking/ opens the booking popup straight away. ?tab=consultation picks the other tab and
 * ?treatment=<slug> preselects a treatment. The page behind it keeps the essentials visible
 * once the popup is closed.
 */
export default function Booking() {
  const { openBooking } = useBooking()
  const [params] = useSearchParams()
  const tab: BookingTab = params.get('tab') === 'consultation' ? 'consultation' : 'booking'
  const treatment = treatments.find((t) => t.slug === params.get('treatment'))?.name

  useEffect(() => {
    openBooking(tab, treatment)
  }, [openBooking, tab, treatment])

  const cards = [
    { Icon: Clock, title: 'Opening hours', lines: site.hours.map((h) => `${h.days} · ${h.time}`) },
    { Icon: CalendarCheck, title: 'Current offers', lines: site.hours.map((h) => `${h.days}: ${h.offer}`) },
    { Icon: MapPin, title: 'Visit us', lines: [site.address.line1, site.address.line2], href: site.address.mapLink },
  ]

  return (
    <section className="wrap pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="eyebrow text-clay">Booking</p>
          <h1 className="mt-5 font-serif text-[length:var(--text-mega)] leading-[0.95]">
            Book Your <span className="serif-italic">Visit</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg text-graphite">
            Choose a direct booking with your preferred date, time and payment method, or request a consultation and let a specialist recommend the right treatment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={() => openBooking('booking', treatment)}>Book an appointment</Button>
            <Button variant="line" onClick={() => openBooking('consultation', treatment)}>Request a consultation</Button>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl">
            <Img path={img.welcome} alt="Treatment menu on the reception table" priority frameClassName="h-full w-full" width={800} height={600} />
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {cards.map(({ Icon, title, lines, href }, i) => (
          <Reveal key={title} delay={i * 0.06} className="rounded-2xl border hairline bg-plaster/40 p-6">
            <Icon className="h-5 w-5 text-clay" strokeWidth={1.5} aria-hidden />
            <p className="mt-4 font-serif text-2xl">{title}</p>
            <ul className="mt-3 space-y-1 text-sm text-graphite">
              {lines.map((l) => (
                <li key={l}>{l}</li>
              ))}
            </ul>
            {href && (
              <a href={href} target="_blank" rel="noopener noreferrer" className="link-underline mt-4 inline-block pb-0.5 text-xs uppercase tracking-[0.18em]">
                Open in Maps
              </a>
            )}
          </Reveal>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-4 rounded-2xl bg-ink p-6 text-bone sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="font-serif text-2xl">Call or message us</p>
        <div className="flex flex-wrap gap-3">
          <a href={site.phone.href} className="inline-flex h-12 items-center gap-2.5 rounded-full bg-bone px-6 text-sm text-ink transition-colors hover:bg-sand">
            <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden /> {site.phone.display}
          </a>
          <a href={site.social.messenger} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2.5 rounded-full border border-bone/30 px-6 text-sm transition-colors hover:bg-bone hover:text-ink">
            <MessageCircle className="h-4 w-4" strokeWidth={1.5} aria-hidden /> Messenger
          </a>
        </div>
      </div>
    </section>
  )
}
