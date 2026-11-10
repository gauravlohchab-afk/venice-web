import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

/**
 * The clinic's logo from /public/brand. `light` swaps in the version with cream lettering
 * for dark backgrounds; the gold mark is the same in both.
 */
export function Logo({ className, light }: { className?: string; light?: boolean }) {
  const file = light ? 'logo-light' : 'logo'
  return (
    <Link to="/" aria-label="Venice Wellness Institute home" className={cn('flex shrink-0 items-center', className)}>
      <picture>
        <source srcSet={`/brand/${file}.webp`} type="image/webp" />
        <img
          src={`/brand/${file}.png`}
          alt="Venice Wellness Institute"
          width={720}
          height={274}
          className="h-12 w-auto sm:h-14"
        />
      </picture>
    </Link>
  )
}
