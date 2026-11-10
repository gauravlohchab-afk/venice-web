# Venice Wellness Institute — website redesign

React 19 · TypeScript · Vite · Tailwind CSS 4 · Framer Motion · GSAP ScrollTrigger · React Router 7 · Lucide

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # type-check, build, pre-render <head> per route, sitemap.xml
npm run preview
```

## Before going live

1. **Images.** All photographs are the clinic's own files from `venicewellnessinstitute.com/wp-content/uploads/`.
   By default they load from the live WordPress site. To self-host them as AVIF/WebP:
   ```bash
   npm run fetch-media                  # downloads + converts into public/media/
   VITE_LOCAL_MEDIA=true npm run build
   ```
   Do this before the old WordPress site is switched off, or every image will break.
2. **Forms.** The old forms posted to WordPress. Set `VITE_FORM_ENDPOINT` (see `.env.example`) to a service that
   accepts JSON. Without it, Book Now / Consultation / Contact open the visitor's email app with the request
   pre-filled and addressed to venicewellnessinstitute@gmail.com, so nothing is lost but nothing is sent automatically either.
3. **Hosting.** `dist/` is static. `dist/_redirects` (Netlify) and `dist/vercel.json` redirect the old WooCommerce
   URLs (`/cart-2/`, `/checkout/`, `/my-account/`, `/wishlist/`, `/yith-compare/`) to `/shop/` and `/popup/` to the booking dialog.
   Configure the host to serve `404.html` for unknown paths and keep trailing slashes.
4. Review the content notes in `AUDIT.md` (privacy and refund policies are carried over as-is and are template text).

## Structure

```
src/
  data/          site facts, treatments, journal articles, SEO meta (single source of truth)
  components/
    layout/      Header (mega menu), MobileMenu, Footer, Layout (route curtain), FloatingBook
    motion/      SplitText, Reveal, MaskImage, ScrubText (GSAP), Parallax, Cursor
    forms/       BookingDialog, ConsultationForm, BookingForm, ContactForm, fields
    ui/          Button, Img (AVIF/WebP + lazy), BeforeAfter, ConsultBand, LegalPage, RichBody, Seo
  pages/         one file per page; home/ and treatment/ hold page-specific sections
scripts/         postbuild.mjs (head pre-render, sitemap, redirects), fetch-media.mjs
```

Treatment pages use three compositions by category: facial (sticky split screen), body (cinematic full-bleed that
recedes), hair (centred editorial spread). Motion respects `prefers-reduced-motion` (Framer `MotionConfig` +
GSAP `matchMedia`); the horizontal treatment reel only pins on desktop.
