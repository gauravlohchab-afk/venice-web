import { MessageCircle } from 'lucide-react'
import { Facebook, Instagram } from '../ui/BrandIcons'
import { Link } from 'react-router-dom'
import { useBooking } from '../../context/BookingContext'
import { mainNav } from '../../data/nav'
import { site } from '../../data/site'
import { byCategory, categories, type Category } from '../../data/treatments'
import { Button } from '../ui/Button'
import { Logo } from './Logo'

const social = [
  { href: site.social.facebook, label: 'Facebook', Icon: Facebook },
  { href: site.social.instagram, label: 'Instagram', Icon: Instagram },
  { href: site.social.messenger, label: 'Messenger', Icon: MessageCircle },
]

const legal = [
  { label: 'FAQ', to: '/faq/' },
  { label: 'Privacy Policy', to: '/privacy-policy/' },
]

/** Compact footer: a slim booking strip, four short columns and a single-line legal bar. */
export function Footer() {
  const { openBooking } = useBooking()

  return (
    <footer className="bg-ink text-bone">
      <div className="wrap">
        {/* booking strip */}
        <div className="flex flex-col gap-5 border-b border-bone/15 py-9 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-none">
              Your Beauty <span className="serif-italic text-sand">Awaits</span>
            </p>
            <p className="mt-2 text-sm text-bone/60">Expert treatments crafted to reveal your most radiant self.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="light" onClick={() => openBooking('booking')}>Book Now</Button>
            <a
              href={site.phone.href}
              className="inline-flex min-h-12 items-center rounded-full border border-bone/25 px-6 text-[0.8rem] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-bone hover:text-ink"
            >
              Call us
            </a>
          </div>
        </div>

        {/* columns */}
        <div className="grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.25fr_0.7fr_1.5fr_1fr] lg:gap-10">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone/65">
              Advanced face, body and hair treatments that combine modern technology with a holistic approach to self-care.
            </p>
            <div className="mt-5 flex gap-2">
              {social.map(({ href, label, Icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-bone/20 transition hover:bg-bone hover:text-ink">
                  <Icon className="h-4 w-4" strokeWidth={1.4} />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer">
            <h3 className="eyebrow text-bone/45">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {[...mainNav, { label: 'Book Online', to: '/booking/' }].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="text-bone/75 transition-colors hover:text-bone">{n.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="eyebrow text-bone/45">Treatments</h3>
            <div className="mt-4 space-y-3.5">
              {(Object.keys(categories) as Category[]).map((c) => (
                <div key={c}>
                  <p className="text-[0.65rem] uppercase tracking-[0.16em] text-bone/40">{categories[c].label}</p>
                  <p className="mt-1 flex flex-wrap items-baseline gap-y-0.5 text-sm leading-relaxed">
                    {byCategory(c).map((t, i) => (
                      <span key={t.slug}>
                        {i > 0 && <span aria-hidden className="mx-1.5 text-bone/25">·</span>}
                        <Link to={`/services/${t.slug}/`} className="whitespace-nowrap text-bone/75 transition-colors hover:text-bone">{t.short}</Link>
                      </span>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="eyebrow text-bone/45">Contact</h3>
            <address className="mt-4 space-y-2 text-sm not-italic text-bone/75">
              <a href={site.phone.href} className="block font-serif text-xl text-bone">{site.phone.display}</a>
              <a href={`mailto:${site.email}`} className="block break-all transition-colors hover:text-bone">{site.email}</a>
              <a href={site.address.mapLink} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-bone">
                {site.address.line1}, {site.address.line2}
              </a>
              <ul className="pt-1 text-bone/55">
                {site.hours.map((h) => (
                  <li key={h.days}>{h.days} · {h.time}</li>
                ))}
              </ul>
            </address>
          </div>
        </div>
      </div>

      {/* legal bar; right padding on wide screens keeps it clear of the floating Book Now button */}
      <div className="border-t border-bone/10">
        <div className="wrap flex flex-col gap-3 pt-5 pb-20 text-xs text-bone/45 sm:pb-5 md:flex-row md:items-center md:justify-between md:pr-[17rem]">
          {/* the year is baked in at build time; a new year must not break hydration */}
          <p suppressHydrationWarning>© {new Date().getFullYear()} {site.legalName}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-1">
            {legal.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-bone">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
