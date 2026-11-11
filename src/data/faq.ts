// Plain-text versions of the FAQ page answers, for FAQPage structured data and llms.txt.
// They state the same facts as src/pages/Faq.tsx; keep the two in step when editing.
import { site } from './site.ts'
import { byCategory, categories, type Category, type Treatment } from './treatments.ts'

const cats = Object.keys(categories) as Category[]

export const faqText: { q: string; a: string }[] = [
  {
    q: 'Can I book my appointment online?',
    a: 'Yes. Press Book Now anywhere on the website and choose Consultation to send a request, or Direct Booking to share your preferred date, time (9:00 AM to 5:00 PM), treatment and payment method. Our team will contact you to confirm your visit. You can also call ' +
      site.phone.display +
      ' or message us on Messenger.',
  },
  {
    q: 'What services do you offer?',
    a: cats.map((c) => `${categories[c].plural}: ${byCategory(c).map((t) => t.name).join(', ')}.`).join(' '),
  },
  {
    q: 'What are your opening hours?',
    a: site.hours.map((h) => `${h.days}: ${h.time}.`).join(' '),
  },
  {
    q: 'Do you have any offers?',
    a: site.hours.map((h) => `${h.days}: ${h.offer}.`).join(' '),
  },
  {
    q: 'Where are you located?',
    a: `${site.address.line1}, ${site.address.line2}, Batangas, Philippines.`,
  },
  { q: 'Which payment methods do you accept?', a: 'Card, GCash and Cash.' },
  {
    q: 'Will my treatment plan be personalised?',
    a: 'Yes. Every client receives a tailored plan after a detailed consultation and assessment of their skin, body and goals.',
  },
]

/**
 * Short question-and-answer block for each treatment page. Answer-first wording that AI
 * assistants and search snippets can quote directly. It only restates facts already published
 * on the site (the treatment copy, address, hours, offers and consultation policy); no prices,
 * durations or session counts are added because the clinic does not publish them.
 */
export function treatmentFaq(t: Treatment): { q: string; a: string }[] {
  const [weekday, weekend] = site.hours
  return [
    {
      q: `What is ${t.title}?`,
      a: `${t.summary} ${t.body[0]}`,
    },
    ...(t.areas
      ? [{ q: `Which areas can ${t.short} treat?`, a: `${t.areas.join(', ')}.` }]
      : []),
    {
      q: `Where can I get ${t.short} in Lipa City?`,
      a: `At ${site.name}, ${site.address.line1}, ${site.address.line2}, ${site.address.region}, Philippines. The clinic has offered face, body and hair treatments in Lipa City since ${site.established}.`,
    },
    {
      q: `How much does ${t.short} cost?`,
      a: `Current offers: ${weekday.days}, ${weekday.offer.toLowerCase()}; ${weekend.days}, ${weekend.offer.toLowerCase()}. For a plan matched to your goals, request a consultation. Payment is by card, GCash or cash.`,
    },
    {
      q: `How do I book ${t.short}?`,
      a: `Book online with Book Now, call ${site.phone.display} or message the clinic on Messenger. Opening hours are ${weekday.days} ${weekday.time} and ${weekend.days} ${weekend.time}.`,
    },
    {
      q: `Is ${t.short} right for me?`,
      a: 'Every client receives a tailored plan after a detailed consultation and assessment of their skin, body and goals, so the team will confirm whether this treatment suits you before you start.',
    },
  ]
}
