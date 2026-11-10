import { Button } from '../components/ui/Button'
import { Img } from '../components/ui/Img'
import { Seo } from '../components/ui/Seo'
import { img } from '../data/media'

export default function NotFound() {
  return (
    <section className="wrap grid min-h-[80svh] items-center gap-10 pt-28 pb-20 md:grid-cols-2 md:gap-14">
      <Seo title="Page not found | Venice Wellness Institute" description="The page you were looking for could not be found." />
      <div>
        <p className="eyebrow text-clay">404</p>
        <h1 className="mt-6 max-w-[14ch] font-serif text-[length:var(--text-mega)] leading-[0.92]">
          This page has <span className="serif-italic">moved on</span>.
        </h1>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/">Home</Button>
          <Button to="/services/" variant="line">Services</Button>
        </div>
      </div>
      <div className="aspect-[4/5] overflow-hidden rounded-3xl md:max-h-[70svh] md:justify-self-end">
        <Img path={img.corridor} alt="Corridor at Venice Wellness Institute" frameClassName="h-full w-full" width={800} height={1000} />
      </div>
    </section>
  )
}
