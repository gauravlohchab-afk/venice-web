import { useState, type ImgHTMLAttributes } from 'react'
import { media } from '../../data/media'
import { cn } from '../../lib/cn'

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  path: string
  alt: string
  priority?: boolean
  frameClassName?: string
}

/** Responsive picture with AVIF/WebP sources when media is self-hosted. Lazy by default. */
export function Img({ path, alt, priority, className, frameClassName, width = 1200, height = 1500, ...rest }: Props) {
  const m = media(path)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  return (
    <span className={cn(!/\b(absolute|fixed)\b/.test(frameClassName ?? '') && 'relative', 'block overflow-hidden bg-plaster', frameClassName)}>
      {failed ? (
        <span className="absolute inset-0 flex items-end p-4 text-xs text-stone">{alt}</span>
      ) : (
        <picture>
          {m.avif && <source srcSet={m.avif} type="image/avif" />}
          {m.webp && <source srcSet={m.webp} type="image/webp" />}
          <img
            src={m.src}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={cn(
              'h-full w-full object-cover transition-opacity duration-700',
              loaded ? 'opacity-100' : 'opacity-0',
              className,
            )}
            {...rest}
          />
        </picture>
      )}
    </span>
  )
}
