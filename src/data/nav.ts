export const mainNav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about-us/' },
  { label: 'Services', to: '/services/', mega: true },
  { label: 'Contact Us', to: '/contact-us/' },
  { label: 'Blogs', to: '/blogs/' },
] as const

export const footerNav = [
  { label: 'FAQ', to: '/faq/' },
  { label: 'Privacy Policy', to: '/privacy-policy/' },
] as const
