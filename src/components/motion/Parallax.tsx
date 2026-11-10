import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

export function Parallax({ children, speed = 12, className }: { children: ReactNode; speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])
  return (
    <motion.div ref={ref} style={{ y: useTransform(y, (v) => `${v}%`) }} className={className}>
      {children}
    </motion.div>
  )
}
