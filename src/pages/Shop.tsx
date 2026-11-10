import { motion } from 'framer-motion'
import { SplitText } from '../components/motion/SplitText'
import { Button } from '../components/ui/Button'

/** The original /shop/ is a "coming soon" page; there are no products yet. */
export default function Shop() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden bg-lagoon-deep pt-32 text-bone">
      <div className="wrap">
        <h1 className="eyebrow text-sand">Shop</h1>
        <h2 className="mt-8 max-w-[12ch] font-serif text-[length:var(--text-mega)] leading-[0.92]">
          <SplitText immediate delay={0.3} text="Great things are on the horizon" italicWords={['horizon']} />
        </h2>
        <p className="mt-8 max-w-md text-lg text-bone/75">Something big is brewing! Our store is in the works and will be launching soon!</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/services/" variant="light">Explore treatments</Button>
          <Button href="https://www.instagram.com/venicewellnessinstitute/" external variant="line">Follow on Instagram</Button>
        </div>
      </div>
      <div aria-hidden className="mt-20 overflow-hidden border-t border-bone/15 py-6">
        <motion.div
          className="flex w-max gap-12 whitespace-nowrap font-serif text-[9vw] leading-none text-bone/15"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-12">
              <span>Coming soon</span><span className="serif-italic">Venice Wellness</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
