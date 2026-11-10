import { motion } from 'framer-motion'
import type { ElementType } from 'react'
import { cn } from '../../lib/cn'

type Props = {
  text: string
  as?: ElementType
  className?: string
  delay?: number
  stagger?: number
  /** animate on mount (hero) instead of on scroll into view */
  immediate?: boolean
  italicWords?: string[]
}

/** Masked word-by-word rise. Words wrap naturally, so it works at any width. */
export function SplitText({ text, as: Tag = 'span', className, delay = 0, stagger = 0.06, immediate, italicWords = [] }: Props) {
  const words = text.split(' ')
  const anim = immediate
    ? { initial: 'hidden', animate: 'show' }
    : { initial: 'hidden', whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <Tag className={className} aria-label={text}>
      <motion.span aria-hidden className="inline" {...anim} transition={{ staggerChildren: stagger, delayChildren: delay }}>
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            <motion.span
              className={cn('inline-block will-change-transform', italicWords.includes(w.replace(/[^\w&—-]/g, '')) && 'serif-italic')}
              variants={{ hidden: { y: '110%' }, show: { y: '0%' } }}
              transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {w}
              {i < words.length - 1 ? ' ' : ''}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  )
}
