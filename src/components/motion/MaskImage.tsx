import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Img } from '../ui/Img'
import { cn } from '../../lib/cn'

type Props = {
  path: string
  alt: string
  className?: string
  from?: 'bottom' | 'left' | 'right' | 'center'
  parallax?: number
  priority?: boolean
  imgClassName?: string
}

const clips = {
  bottom: 'inset(100% 0% 0% 0%)',
  left: 'inset(0% 100% 0% 0%)',
  right: 'inset(0% 0% 0% 100%)',
  center: 'inset(18% 18% 18% 18%)',
}

/** Image that unveils with a clip-path wipe, then drifts slightly with scroll. */
export function MaskImage({ path, alt, className, from = 'bottom', parallax = 8, priority, imgClassName }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])
  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden rounded-2xl', className)}
      initial={{ clipPath: clips[from] }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.5, ease: [0.77, 0, 0.18, 1] }}
    >
      <motion.div style={{ y, scale: 1 + parallax / 50 }} className="absolute inset-0">
        <Img path={path} alt={alt} priority={priority} frameClassName="h-full w-full" className={imgClassName} />
      </motion.div>
    </motion.div>
  )
}
