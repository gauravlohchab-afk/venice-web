import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { SplitText } from '../../components/motion/SplitText'
import { Button } from '../../components/ui/Button'
import { Img } from '../../components/ui/Img'
import { useBooking } from '../../context/BookingContext'
import { img } from '../../data/media'
import { site } from '../../data/site'

/**
 * Opening sequence: the headline sits over a portrait frame; as you scroll, the frame
 * opens to full-bleed and the second statement rises over the photograph.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { openBooking } = useBooking()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const clip = useTransform(scrollYProgress, [0, 0.55], ['inset(14% 8% 10% 52% round 0px)', 'inset(0% 0% 0% 0% round 0px)'])
  const clipMobile = useTransform(scrollYProgress, [0, 0.55], ['inset(72% 4% 3% 4%)', 'inset(0% 0% 0% 0%)'])
  // The source photo is only 1280px wide, so keep the zoom gentle to avoid visible softness.
  const scale = useTransform(scrollYProgress, [0, 0.6], [1.08, 1])
  const headY = useTransform(scrollYProgress, [0, 0.4], ['0%', '-30%'])
  const headO = useTransform(scrollYProgress, [0, 0.32], [1, 0])
  const veil = useTransform(scrollYProgress, [0.32, 0.65], [0, 0.6])
  const secondO = useTransform(scrollYProgress, [0.55, 0.75], [0, 1])
  const secondY = useTransform(scrollYProgress, [0.55, 0.8], ['12%', '0%'])

  return (
    <section ref={ref} className="relative h-[220vh]" aria-label="Introduction">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* photograph */}
        <motion.div className="absolute inset-0 hidden md:block" style={{ clipPath: clip }}>
          <motion.div className="absolute inset-0" style={{ scale }}>
            <Img path={img.about} alt="Reception at Venice Wellness Institute" priority frameClassName="h-full w-full" className="object-[70%_50%]" width={1280} height={720} />
          </motion.div>
          <motion.div className="absolute inset-0 bg-ink" style={{ opacity: veil }} />
        </motion.div>
        <motion.div className="absolute inset-0 md:hidden" style={{ clipPath: clipMobile }}>
          {/* taller than the screen so the closed strip at the bottom frames the reception sign */}
          <motion.div className="absolute inset-x-0 top-0 h-[130%]" style={{ scale }}>
            <Img path={img.about} alt="Reception at Venice Wellness Institute" priority frameClassName="h-full w-full" className="object-[72%_50%]" width={1280} height={720} />
          </motion.div>
          <motion.div className="absolute inset-0 bg-ink" style={{ opacity: veil }} />
        </motion.div>

        {/* first statement */}
        <motion.div style={{ y: headY, opacity: headO }} className="wrap relative z-10 flex h-full flex-col pt-[104px] pb-8 md:justify-center md:pt-[96px] md:pb-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="eyebrow flex flex-wrap gap-x-6 gap-y-1 text-stone"
          >
            <span>Est. {site.established}</span>
            <span>Lipa City, Philippines</span>
            <span className="hidden sm:inline">Face · Body · Hair</span>
          </motion.p>
          {/* sized by height as well as width so wide, short screens don't push it under the header */}
          <h1 className="mt-6 max-w-[11ch] font-serif text-[length:var(--text-display)] leading-[0.92] tracking-[-0.015em] md:max-w-[9ch]">
            <SplitText immediate delay={0.5} text="Transform Your Skin, Body & Hair" italicWords={['Body']} />
          </h1>
          <div className="mt-6 grid gap-6 md:mt-10 md:max-w-[46%] md:grid-cols-[auto_1fr] md:items-start md:gap-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 1 }}
              className="serif-italic text-3xl leading-none text-clay md:text-4xl"
            >
              Safely &amp;
              <br />
              effortlessly.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.45, duration: 1 }}>
              <p className="max-w-sm text-[0.98rem] text-graphite">
                Step into a sanctuary of modern wellness, where non-invasive face, body and hair treatments deliver visible results with comfort, precision and zero downtime.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <Button onClick={() => openBooking('booking')}>Appointment</Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* second statement over the photograph */}
        <motion.div style={{ opacity: secondO, y: secondY }} className="pointer-events-none absolute inset-0 z-20 flex items-end text-bone">
          <div className="wrap pointer-events-auto pb-[12vh]">
            <p className="eyebrow text-bone/70">About Us</p>
            <h2 className="mt-5 max-w-[14ch] font-serif text-[length:var(--text-mega)] leading-[0.92]">
              Where Beauty Meets <span className="serif-italic">Advanced Aesthetics</span>
            </h2>
            <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <p className="max-w-md text-bone/80">
                Experience the perfect blend of science, technology and personalised care. From radiant skin to sculpted curves and healthy hair, our treatments are designed to elevate your confidence naturally.
              </p>
              <Button to="/about-us/" variant="light">About Us</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
