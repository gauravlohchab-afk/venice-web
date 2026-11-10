import { useLayoutEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../../lib/gsap'
import { cn } from '../../lib/cn'

/** Words brighten one by one as the paragraph scrolls through the viewport (GSAP scrub). */
export function ScrubText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  useLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-w]',
        { opacity: 0.16 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top 78%', end: 'bottom 42%', scrub: true },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [text])
  return (
    <p ref={ref} className={cn(className)}>
      {text.split(' ').map((w, i) => (
        <span key={i} data-w className="inline">
          {w}{' '}
        </span>
      ))}
    </p>
  )
}
