import { motion } from 'framer-motion'
import { SplitText } from '../../components/motion/SplitText'

// The seven qualities listed on the original homepage under "Advanced Aesthetic Technologies".
const items = [
  'Skin-Safe Formulations',
  'No Harmful Chemicals',
  'Nature-Powered Skin & Body Care',
  'Science-Backed Treatment',
  'Gentle on Sensitive Skin',
  'Pure Formulas',
  'Non-Irritating, Hydration-Focused',
]

export function Principles() {
  return (
    <section className="relative bg-lagoon-deep py-20 text-bone sm:py-28" aria-labelledby="principles-title">
      <div className="wrap grid gap-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <p className="eyebrow opacity-60">Certified and Highly Skilled Specialists</p>
          <h2 id="principles-title" className="mt-6 font-serif text-[length:var(--text-headline)] leading-[0.98]">
            <SplitText text="Advanced Aesthetic Technologies" italicWords={['Technologies']} />
          </h2>
        </div>
        <ol className="lg:col-span-6 lg:col-start-7">
          {items.map((it, i) => (
            <motion.li
              key={it}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.04 * i }}
              className="group relative flex items-baseline gap-6 border-b border-current/15 py-5"
            >
              <span className="font-serif text-[clamp(1.6rem,3vw,2.6rem)] leading-tight transition-transform duration-700 ease-[var(--ease-silk)] group-hover:translate-x-3">
                {it}
              </span>
              <span className="absolute bottom-[-1px] left-0 h-px w-0 bg-current transition-[width] duration-700 ease-[var(--ease-silk)] group-hover:w-full" />
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
