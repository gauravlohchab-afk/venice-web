import { ChevronsLeftRight } from 'lucide-react'
import { useId, useState } from 'react'
import { Img } from './Img'
import { cn } from '../../lib/cn'

/** Drag (or use arrow keys) to compare. Mirrors the original site's before/after slider. */
export function BeforeAfter({ before, after, label, className }: { before: string; after: string; label: string; className?: string }) {
  const [pos, setPos] = useState(50)
  const id = useId()
  return (
    <div className={cn('group relative select-none overflow-hidden rounded-2xl bg-plaster', className)}>
      <Img path={after} alt={`${label}, after`} frameClassName="absolute inset-0" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img path={before} alt={`${label}, before`} frameClassName="absolute inset-0" />
      </div>
      <span className="pointer-events-none absolute left-3 top-3 bg-bone/90 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em]">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 bg-ink/85 px-2.5 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-bone">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-bone" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-bone bg-ink/40 text-[0.6rem] uppercase tracking-[0.2em] text-bone backdrop-blur-sm transition-transform group-active:scale-90">
          <ChevronsLeftRight className="h-5 w-5" strokeWidth={1.4} aria-hidden />
        </span>
      </div>
      <label htmlFor={id} className="sr-only">Compare before and after: {label}</label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}
