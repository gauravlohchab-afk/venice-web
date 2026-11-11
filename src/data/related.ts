// Cross-links between treatments and journal articles, matched on the treatment names the
// articles actually use. Feeds the "Related reading" / "Treatments in this article" links and
// the schema.org `mentions` on articles.
import { posts, type Post } from './posts.ts'
import { treatments, type Treatment } from './treatments.ts'

const patterns: Record<string, RegExp> = {
  'acne-treatment': /\bacne[- ]cleanse\b|\bacne treatment\b/i,
  'pico-treatment': /\bpico\b/i,
  'carbon-treatment': /\bcarbon (laser|peel|treatment)\b/i,
  'thermage-treatment': /\bthermage\b/i,
  'organic-botox-treatment': /\borganic botox\b/i,
  'hydra-treatment': /\bhydra ?facial\b|\bhydra treatment\b/i,
  'hifu-7d-treatment': /\bhifu\b/i,
  'co2-treatment': /\bco[2₂] laser\b|\bco[2₂] treatment\b/i,
  '10d-slim-treatment': /\b10d\b/i,
  'cryo-treatment': /\bcryo\b/i,
  'sauna-treatment': /\bsauna\b/i,
  'ems-treatment': /\bems\b/i,
  'hair-regrowth-treatment': /\bhair regrowth\b/i,
  'hair-removal-treatment': /\bhair removal\b/i,
}

const text = (p: Post) => [p.title, ...p.tags, ...p.body].join('\n')
const hits = (p: Post, t: Treatment) => (text(p).match(new RegExp(patterns[t.slug].source, 'gi')) ?? []).length

/** Treatments an article discusses, most-mentioned first. */
export function treatmentsInPost(p: Post, limit = 6): Treatment[] {
  return treatments
    .map((t) => ({ t, n: patterns[t.slug] ? hits(p, t) : 0 }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n)
    .slice(0, limit)
    .map((x) => x.t)
}

/** Articles that discuss a treatment, most relevant first. */
export function postsForTreatment(t: Treatment, limit = 3): Post[] {
  if (!patterns[t.slug]) return []
  return posts
    .map((p) => ({ p, n: hits(p, t) }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n || b.p.date.localeCompare(a.p.date))
    .slice(0, limit)
    .map((x) => x.p)
}
