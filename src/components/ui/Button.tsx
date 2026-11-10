import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import type { ReactNode, MouseEventHandler } from 'react'
import { cn } from '../../lib/cn'

type Base = { children: ReactNode; className?: string; variant?: 'solid' | 'line' | 'light'; icon?: boolean }
type AsLink = Base & { to: string; href?: never; onClick?: never; type?: never }
type AsAnchor = Base & { href: string; to?: never; onClick?: never; type?: never; external?: boolean }
type AsButton = Base & { onClick?: MouseEventHandler<HTMLButtonElement>; type?: 'button' | 'submit'; to?: never; href?: never; disabled?: boolean }

const styles = {
  solid: 'bg-ink text-bone',
  light: 'bg-bone text-ink',
  line: 'text-current border hairline',
}

/** Text slides up and is replaced on hover; arrow travels out and back in. */
export function Button(props: AsLink | AsAnchor | AsButton) {
  const { children, className, variant = 'solid', icon = true } = props
  const cls = cn(
    'group relative inline-flex min-h-12 items-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500',
    styles[variant],
    variant === 'line' && 'hover:bg-ink hover:text-bone hover:border-ink',
    className,
  )
  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-500 ease-[var(--ease-silk)] group-hover:-translate-y-full">{children}</span>
        <span aria-hidden className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
      {icon && (
        <span className="relative block h-4 w-4 overflow-hidden" aria-hidden>
          <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-full group-hover:-translate-y-full" strokeWidth={1.4} />
          <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-full translate-y-full transition-transform duration-500 ease-[var(--ease-silk)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={1.4} />
        </span>
      )}
    </>
  )
  if ('to' in props && props.to) return <Link to={props.to} className={cls}>{inner}</Link>
  if ('href' in props && props.href) {
    const ext = (props as AsAnchor).external
    return (
      <a href={props.href} className={cls} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    )
  }
  const b = props as AsButton
  return (
    <button type={b.type ?? 'button'} onClick={b.onClick} disabled={b.disabled} className={cn(cls, 'disabled:opacity-50')}>
      {inner}
    </button>
  )
}

export function TextLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link to={to} className={cn('group inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em]', className)}>
      <span className="link-underline pb-1">{children}</span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.4} />
    </Link>
  )
}
