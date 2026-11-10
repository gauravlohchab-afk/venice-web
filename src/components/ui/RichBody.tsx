import type { ReactNode } from 'react'

export const slugify = (s: string) => s.toLowerCase().replace(/[^\w]+/g, '-').replace(/^-|-$/g, '')

/** Renders the lightweight article format used in data/posts.ts. */
export function RichBody({ lines }: { lines: string[] }) {
  const out: ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const l = lines[i]
    if (l.startsWith('## ')) {
      const t = l.slice(3)
      out.push(<h2 key={i} id={slugify(t)} className="mt-16 scroll-mt-28 font-serif text-[2.4rem] leading-[1.05] first:mt-0">{t}</h2>)
      i++
    } else if (l.startsWith('### ')) {
      out.push(<h3 key={i} className="mt-10 font-serif text-[1.65rem] leading-tight">{l.slice(4)}</h3>)
      i++
    } else if (l.startsWith('- ') || l.startsWith('1. ')) {
      const ordered = l.startsWith('1. ')
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith(ordered ? '1. ' : '- ')) items.push(lines[i++].slice(ordered ? 3 : 2))
      const Tag = ordered ? 'ol' : 'ul'
      out.push(
        <Tag key={i} className="mt-6 space-y-3 border-l border-sand pl-6">
          {items.map((it, k) => (
            <li key={k} className="relative text-graphite">
              {ordered ? (
                <span className="absolute -left-6 top-0 w-5 text-xs tabular-nums text-clay">{k + 1}.</span>
              ) : (
                <span aria-hidden className="absolute -left-4 top-[0.7em] h-1.5 w-1.5 rounded-full bg-clay" />
              )}
              <span className="pl-2">{it}</span>
            </li>
          ))}
        </Tag>,
      )
    } else if (l.startsWith('> ')) {
      out.push(<p key={i} className="serif-italic my-10 border-y hairline py-6 text-2xl text-lagoon">{l.slice(2)}</p>)
      i++
    } else if (l.startsWith('Q: ')) {
      const q = l.slice(3)
      const a = lines[i + 1]?.startsWith('A: ') ? lines[i + 1].slice(3) : ''
      out.push(
        <details key={i} className="group border-b hairline py-5 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-serif text-xl">
            {q}
            <span className="text-2xl transition-transform duration-300 group-open:rotate-45" aria-hidden>+</span>
          </summary>
          <p className="mt-3 text-graphite">{a}</p>
        </details>,
      )
      i += a ? 2 : 1
    } else {
      out.push(<p key={i} className="mt-6 text-lg leading-relaxed text-graphite first:mt-0">{l}</p>)
      i++
    }
  }
  return <div>{out}</div>
}
