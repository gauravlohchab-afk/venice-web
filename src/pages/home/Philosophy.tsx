import { MaskImage } from '../../components/motion/MaskImage'
import { ScrubText } from '../../components/motion/ScrubText'
import { Button } from '../../components/ui/Button'
import { useBooking } from '../../context/BookingContext'
import { img } from '../../data/media'


/** Photo pair on one side; the belief statement, mission and actions on the other. */
export function Philosophy() {
  const { openBooking } = useBooking()
  return (
    <section className="py-20 sm:py-28" aria-labelledby="philosophy">
      <div className="wrap grid items-center gap-12 md:grid-cols-2 lg:gap-20">
        {/* photos: the main frame with a smaller one overlapping its lower corner */}
        <div className="relative pb-10 pr-10 sm:pb-14 sm:pr-14">
          <MaskImage path={img.reception} alt="Reception desk at Venice Wellness Institute" className="aspect-[4/5] w-full" from="bottom" />
          <div className="absolute bottom-0 right-0 w-[42%] rounded-[1.4rem] bg-bone p-2 shadow-[0_24px_60px_-20px_rgba(29,28,26,0.35)]">
            <MaskImage path={img.trolley} alt="Treatment room trolley with Venice Wellness Institute water" className="aspect-[3/4] w-full rounded-2xl" from="left" parallax={4} />
          </div>
        </div>

        <div>
          <p id="philosophy" className="eyebrow text-clay">Our belief</p>
          <ScrubText
            className="mt-5 font-serif text-[length:var(--text-headline)] leading-[1.06] tracking-[-0.01em]"
            text="We believe that true beauty and confidence begin with balance, inside and out."
          />
          <p className="mt-6 max-w-lg text-lg text-graphite">
            Our mission is to provide advanced face, body and hair treatments that combine modern technology with a holistic approach to self-care.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button to="/about-us/">About us</Button>
            <Button variant="line" onClick={() => openBooking('consultation')}>Book a consultation</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
