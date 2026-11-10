import { motion } from 'framer-motion'
import { Img } from '../../components/ui/Img'
import { Reveal } from '../../components/motion/Reveal'
import { treatments } from '../../data/treatments'

const inline = (path: string, alt: string, delay: number) => (
  <motion.span
    className="mx-[0.15em] inline-block h-[0.78em] w-[1.6em] overflow-hidden rounded-full align-[-0.06em]"
    initial={{ width: '0em' }}
    whileInView={{ width: '1.6em' }}
    viewport={{ once: true }}
    transition={{ duration: 1.2, ease: [0.77, 0, 0.18, 1], delay }}
  >
    <Img path={path} alt={alt} frameClassName="h-full w-full" width={320} height={160} />
  </motion.span>
)

/** Typographic statement with photographs set inside the line, a nod to the original's image-in-heading. */
export function Expertise() {
  const thermage = treatments.find((t) => t.slug === 'thermage-treatment')!
  const hydra = treatments.find((t) => t.slug === 'hydra-treatment')!
  return (
    <section className="py-20 sm:py-28" aria-labelledby="expertise">
      <div className="wrap">
        <h2 id="expertise" className="mx-auto max-w-[18ch] text-center font-serif text-[length:var(--text-mega)] leading-[1] tracking-[-0.015em]">
          Every treatment is guided by {inline(thermage.image, thermage.title, 0.1)} <span className="serif-italic">expertise,</span> innovation,{' '}
          {inline(hydra.image, hydra.title, 0.3)} and genuine care.
        </h2>
        <Reveal className="mx-auto mt-8 max-w-xl text-center text-lg text-graphite">
          Our results look natural, feel comfortable and enhance your well-being from the inside out, delivered with world-class technology and a highly trained team.
        </Reveal>
      </div>
    </section>
  )
}
