# Venice Wellness Institute — website

React 19 · TypeScript · Vite · Tailwind CSS 4 · Framer Motion · GSAP ScrollTrigger · React Router 7 · Lucide

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check, build, pre-render <head> per route, sitemap.xml
npm run preview
```

On Windows machines where Smart App Control blocks Rolldown's native binary, install the WebAssembly build
(`npm i --no-save @rolldown/binding-wasm32-wasi`) and prefix commands with `NAPI_RS_FORCE_WASI=1`.

## Images

All images are self-hosted in `public/media/` as AVIF + WebP with a small JPG fallback, so the site does not depend
on the old WordPress site.

- `public/media/20xx/...` are the clinic's photos from the old site. Their paths keep the original upload names.
  If an image is added in `src/data`, run `npm run fetch-media` to download and convert it.
- `public/media/clinic/` are interior photos supplied directly by the clinic.
- `public/brand/` holds the logo (light and dark versions), favicons and app icons.

## Forms

- **Booking popup** (Book Now, Appointment, Request Consultation) posts to the clinic's leads API:
  `…/api/leads?type=booking` for direct bookings and `…/api/leads?type=call` for consultations, with
  `center=venice-wellness-institute`. Defaults are built in; override with `VITE_LEADS_URL` / `VITE_LEADS_CENTER`.
- **Contact page form** posts JSON to `VITE_FORM_ENDPOINT` if set, otherwise it opens the visitor's email app with
  the message addressed to venicewellnessinstitute@gmail.com.

## Hosting

`dist/` is static. `dist/_redirects` (Netlify) and `dist/vercel.json` redirect old URLs from the WordPress site:
WooCommerce pages and `/shop/` to `/services/`, `/refund_returns/` to `/contact-us/`, and `/popup/` to the booking
popup. Configure the host to serve `404.html` for unknown paths and keep trailing slashes.

The privacy policy describes how this site handles data and should be reviewed by the clinic before launch.

## Structure

```
src/
  data/          site facts, treatments, journal articles, media paths, SEO meta (single source of truth)
  components/
    layout/      Header (mega menu), MobileMenu, Footer, Logo, Layout, FloatingBook
    motion/      SplitText, Reveal, MaskImage, ScrubText (GSAP), Parallax
    forms/       BookingDialog, BookingForm, ConsultationForm, ContactForm, fields
    ui/          Button, Img (AVIF/WebP + lazy), TreatmentCard, BeforeAfter, ConsultBand, LegalPage, RichBody, Seo
  lib/           leads.ts (leads API), submit.ts (contact form)
  pages/         one file per page; home/ and treatment/ hold page-specific sections
scripts/         postbuild.mjs (head pre-render, sitemap, redirects), fetch-media.mjs
```
