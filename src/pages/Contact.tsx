import { ArrowUpRight, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { ContactForm } from '../components/forms/ContactForm'
import { Reveal } from '../components/motion/Reveal'
import { SplitText } from '../components/motion/SplitText'
import { Button } from '../components/ui/Button'
import { Facebook, Instagram } from '../components/ui/BrandIcons'
import { useBooking } from '../context/BookingContext'
import { site } from '../data/site'

const channels = [
  { label: 'Call us', value: site.phone.display, note: `${site.hours[0].days}, ${site.hours[0].time}`, href: site.phone.href, Icon: Phone },
  { label: 'Email', value: site.email, note: '', href: `mailto:${site.email}`, Icon: Mail, small: true },
  { label: 'Visit', value: site.address.line1, note: site.address.line2, href: site.address.mapLink, Icon: MapPin, ext: true },
  { label: 'Messenger', value: 'venicewellnessph', note: 'm.me/venicewellnessph', href: site.social.messenger, Icon: MessageCircle, ext: true },
]

export default function Contact() {
  const { openBooking } = useBooking()
  return (
    <>
      <section className="wrap pt-28 sm:pt-36">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="eyebrow text-clay">Contact</p>
            <h1 className="mt-5 font-serif text-[length:var(--text-mega)] leading-[0.95]">
              <SplitText immediate delay={0.2} text="Contact Us" italicWords={['Us']} />
            </h1>
          </div>
          <div className="lg:col-span-5">
            <p className="text-graphite">
              We’re here to guide you on your journey to clearer skin, a healthier body and total wellness. Whether you’re looking to book a treatment, need expert recommendations or simply want more information about our services, our team is ready to help.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button onClick={() => openBooking('booking')}>Book Now</Button>
              <Button variant="line" onClick={() => openBooking('consultation')}>Ask a specialist</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {channels.map(({ label, value, note, href, Icon, ext, small }, i) => (
            <Reveal key={label} delay={i * 0.05}>
              <a
                href={href}
                {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full flex-col rounded-2xl border hairline bg-plaster/40 p-6 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-bone"
              >
                <span className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-bone text-ink transition-colors group-hover:bg-bone/10 group-hover:text-bone">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.5} aria-hidden />
                  </span>
                  <ArrowUpRight className="h-5 w-5 opacity-40 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" strokeWidth={1.4} aria-hidden />
                </span>
                <span className="mt-6 text-[0.68rem] uppercase tracking-[0.18em] opacity-60">{label}</span>
                <span className={small ? 'mt-1.5 break-all text-[0.98rem] font-medium leading-snug' : 'mt-1.5 break-words font-serif text-[1.45rem] leading-tight'}>{value}</span>
                <span className="mt-1 text-sm opacity-60">{note}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="wrap grid gap-6 lg:grid-cols-12">
          <Reveal className="rounded-2xl border hairline bg-plaster/30 p-6 sm:p-10 lg:col-span-7">
            <h2 className="font-serif text-[length:var(--text-headline)] leading-none">
              Write to <span className="serif-italic">us</span>
            </h2>
            <p className="mt-3 max-w-md text-graphite">Send us a message and our team will get back to you.</p>
            <div className="form-boxed mt-8"><ContactForm /></div>
          </Reveal>

          <div className="grid gap-6 lg:col-span-5">
            <Reveal className="relative min-h-[300px] overflow-hidden rounded-2xl bg-plaster">
              <iframe
                title="Map: Venice Wellness Institute, Lipa City"
                src={site.address.mapEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full grayscale-[0.85] contrast-[0.95] transition-[filter] duration-700 hover:grayscale-0"
              />
            </Reveal>
            <Reveal delay={0.06} className="rounded-2xl bg-ink p-6 text-bone sm:p-8">
              <p className="flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-bone/55">
                <Clock className="h-4 w-4" strokeWidth={1.5} aria-hidden /> Opening hours &amp; offers
              </p>
              <dl className="mt-4 divide-y divide-bone/10">
                {site.hours.map((h) => (
                  <div key={h.days} className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 py-3.5">
                    <dt className="font-serif text-xl">{h.days}</dt>
                    <dd className="text-right">
                      <span className="block">{h.time}</span>
                      <span className="serif-italic block text-sand">{h.offer}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex items-center gap-2 border-t border-bone/10 pt-5">
                <span className="mr-2 text-[0.68rem] uppercase tracking-[0.18em] text-bone/55">Follow us</span>
                {[
                  { href: site.social.facebook, label: 'Facebook', Icon: Facebook },
                  { href: site.social.instagram, label: 'Instagram', Icon: Instagram },
                ].map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-bone/20 transition hover:bg-bone hover:text-ink">
                    <Icon className="h-4 w-4" strokeWidth={1.4} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
