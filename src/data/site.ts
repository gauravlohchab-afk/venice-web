// Business information, taken from venicewellnessinstitute.com (audited Nov 2026).
export const site = {
  name: 'Venice Wellness Institute',
  legalName: 'Venice Wellness Center Philippines',
  tagline: 'Premium Skin, Hair & Body Aesthetic Treatments',
  url: 'https://venicewellnessinstitute.com',
  established: 2020,
  phone: { display: '+63 966 764 2443', href: 'tel:+639667642443' },
  // The live site shows this address as link text; its mailto targets contain typos
  // (ivenicewellnessinstitute@ / iinfo@). The visible address is used here.
  email: 'venicewellnessinstitute@gmail.com',
  address: {
    line1: 'GF Firrst Commercial Complex',
    line2: 'Brgy. Sabang, Lipa City',
    country: 'Philippines',
    mapEmbed:
      'https://maps.google.com/maps?q=Venice%20Wellness%20Institute%20PH&t=m&z=17&output=embed&iwloc=near',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Venice%20Wellness%20Institute%20PH%20Lipa%20City',
  },
  hours: [
    { days: 'Mon – Fri', time: '8AM – 10PM', offer: 'Any service in just ₱500' },
    { days: 'Sat – Sun', time: '10AM – 10PM', offer: 'Club any two services in just ₱800' },
  ],
  social: {
    facebook: 'https://www.facebook.com/venicewellnessph',
    instagram: 'https://www.instagram.com/venicewellnessinstitute/',
    messenger: 'https://www.m.me/venicewellnessph',
  },
  about:
    'At Venice Wellness Institute, we believe that true beauty and confidence begin with balance, inside and out. Our mission is to provide advanced face, body, and hair treatments that combine modern technology with a holistic approach to self-care.',
} as const

export const mailto = (subject?: string, body?: string) => {
  const q = new URLSearchParams()
  if (subject) q.set('subject', subject)
  if (body) q.set('body', body)
  const qs = q.toString().replace(/\+/g, '%20')
  return `mailto:${site.email}${qs ? `?${qs}` : ''}`
}
