import { Lock, type LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

/** "Secure & Confidential" on the left, a dark pill submit button on the right, above a hairline. */
export function DialogSubmitRow({ busy, label, icon: Icon, className }: { busy: boolean; label: string; icon: LucideIcon; className?: string }) {
  return (
    <div className={cn('sticky -bottom-5 z-10 -mb-5 flex flex-wrap items-center justify-between gap-3 border-t hairline bg-bone pt-4 pb-5', className)}>
      <span className="inline-flex items-center gap-1.5 text-[0.8rem] text-clay">
        <Lock className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden /> Secure &amp; Confidential
      </span>
      <button
        type="submit"
        disabled={busy}
        className="inline-flex h-11 items-center gap-2.5 rounded-full bg-ink px-6 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-bone shadow-[0_12px_30px_-10px_rgba(29,28,26,0.55)] transition-colors hover:bg-lagoon disabled:opacity-50"
      >
        {busy ? 'Sending…' : label}
        <Icon className="h-4 w-4" strokeWidth={1.6} aria-hidden />
      </button>
    </div>
  )
}
