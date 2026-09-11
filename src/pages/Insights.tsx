import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { Clock, Search, X } from 'lucide-react'
import { Seo } from '../components/seo/Seo'
import { PageHero } from '../sections/PageHero'
import { Section } from '../components/ui/Primitives'
import { insights, insightCategories, type InsightCategory } from '../data/insights'
import { readingTime, formatDate } from '../utils/format'
import { cn } from '../utils/cn'

export default function Insights() {
  const [params, setParams] = useSearchParams()
  const [q, setQ] = useState(params.get('q') ?? '')
  const cat = (params.get('category') as InsightCategory | null) ?? null

  const setCat = (c: InsightCategory | null) => {
    const p = new URLSearchParams(params)
    if (c) p.set('category', c)
    else p.delete('category')
    setParams(p, { replace: true })
  }

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return insights
      .filter((i) => !cat || i.category === cat)
      .filter((i) => !t || [i.title, i.excerpt, i.tags.join(' '), i.category].join(' ').toLowerCase().includes(t))
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [q, cat])

  const featured = !q && !cat ? insights.find((i) => i.featured) : undefined
  const list = featured ? filtered.filter((i) => i.slug !== featured.slug) : filtered
  const counts = useMemo(() => Object.fromEntries(insightCategories.map((c) => [c, insights.filter((i) => i.category === c).length])), [])

  return (
    <>
      <Seo title="Insights" description="Articles, industry insights, healthcare technology perspectives, and engagement case studies from Lucas Health Tech." />
      <PageHero eyebrow="Insights" title="A knowledge hub for healthcare technology leaders." lead="Perspectives on clinical governance, FHIR-native architecture, automation, and executive operations.">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="relative max-w-xl">
          <label htmlFor="insights-search" className="sr-only">
            Search insights
          </label>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" aria-hidden />
          <input
            id="insights-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, topics, technologies…"
            className="glass h-13 w-full rounded-full py-3.5 pl-11 pr-11 text-[15px] text-white outline-none placeholder:text-white/40 focus:border-accent-400"
          />
          {q && (
            <button type="button" onClick={() => setQ('')} aria-label="Clear search" className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full text-white/60 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          )}
        </form>
      </PageHero>

      <Section className="pt-10 md:pt-14">
        <div className="container-x">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
            <FilterChip on={!cat} onClick={() => setCat(null)}>
              All <span className="ml-1 opacity-60">{insights.length}</span>
            </FilterChip>
            {insightCategories.map((c) => (
              <FilterChip key={c} on={cat === c} onClick={() => setCat(cat === c ? null : c)} disabled={counts[c] === 0}>
                {c} <span className="ml-1 opacity-60">{counts[c]}</span>
              </FilterChip>
            ))}
          </div>

          {featured && (
            <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="group relative mt-10 grid overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 text-white shadow-lift lg:grid-cols-[1.2fr_1fr]">
              <div className="relative p-8 sm:p-12">
                <div aria-hidden className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" />
                <span className="eyebrow-dark relative">Featured · {featured.category}</span>
                <h2 className="relative mt-4 font-display text-3xl font-bold leading-tight text-balance sm:text-4xl">
                  <Link to={`/insights/${featured.slug}`} className="after:absolute after:inset-0">
                    {featured.title}
                  </Link>
                </h2>
                <p className="relative mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted-dark">{featured.excerpt}</p>
                <Meta date={featured.date} body={featured.body} dark className="relative mt-8" />
              </div>
              <div className="relative hidden min-h-[280px] lg:block">
                <EditorialArt seed={0} />
              </div>
            </motion.article>
          )}

          {/* Editorial list */}
          <div className="mt-10 border-t border-paper-300">
            <AnimatePresence mode="popLayout">
              {list.map((i, idx) => (
                <motion.article
                  key={i.slug}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, delay: idx * 0.04 }}
                  className="group relative grid gap-4 border-b border-paper-300 py-8 md:grid-cols-[160px_1fr_200px] md:items-start md:gap-8"
                >
                  <div className="text-xs text-muted">
                    <span className="eyebrow block">{i.category}</span>
                    <span className="mt-2 block">{formatDate(i.date)}</span>
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-bold leading-snug text-text transition group-hover:text-accent-700 sm:text-2xl">
                      <Link to={`/insights/${i.slug}`} className="after:absolute after:inset-0">
                        {i.title}
                      </Link>
                    </h2>
                    <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-muted">{i.excerpt}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {i.tags.map((t) => (
                        <span key={t} className="rounded-full bg-paper-200 px-2.5 py-0.5 font-mono text-[10.5px] text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted md:justify-end">
                    <Clock className="h-3.5 w-3.5" aria-hidden /> {readingTime(i.body)} min read
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
            {list.length === 0 && !featured && (
              <p className="py-16 text-center text-muted" role="status">
                No insights match “{q}”{cat ? ` in ${cat}` : ''}. Try another term or clear the filters.
              </p>
            )}
          </div>
        </div>
      </Section>
    </>
  )
}

function FilterChip({ on, onClick, disabled, children }: { on: boolean; onClick: () => void; disabled?: boolean; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      disabled={disabled}
      className={cn(
        'rounded-full border px-3.5 py-1.5 text-[13px] font-medium transition-all duration-300 disabled:opacity-40',
        on ? 'border-ink-900 bg-ink-900 text-white' : 'border-paper-300 bg-white text-muted hover:border-ink-900/40 hover:text-text',
      )}
    >
      {children}
    </button>
  )
}

export function Meta({ date, body, dark, className }: { date: string; body: string; dark?: boolean; className?: string }) {
  return (
    <div className={cn('flex items-center gap-4 text-xs', dark ? 'text-white/55' : 'text-muted', className)}>
      <span>{formatDate(date)}</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" aria-hidden /> {readingTime(body)} min read
      </span>
    </div>
  )
}

export function EditorialArt({ seed }: { seed: number }) {
  return (
    <svg viewBox="0 0 400 400" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id={`ea-${seed}`} cx="50%" cy="50%" r="60%">
          <stop offset="0" stopColor="#19c6a5" stopOpacity="0.5" />
          <stop offset="1" stopColor="#19c6a5" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill="#0a0e14" />
      <circle cx="220" cy="200" r="170" fill={`url(#ea-${seed})`} />
      {Array.from({ length: 9 }).map((_, i) => (
        <circle key={i} cx={200} cy={200} r={30 + i * 22} fill="none" stroke="rgba(255,255,255,0.07)" strokeDasharray={`${4 + i * 2} ${8 + i * 3}`} />
      ))}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i / 12) * Math.PI * 2 + seed
        const r = 90 + (i % 3) * 45
        return <circle key={`p${i}`} cx={200 + Math.cos(a) * r} cy={200 + Math.sin(a) * r} r={i % 4 === 0 ? 5 : 3} fill={i % 5 === 0 ? '#f2b441' : '#19c6a5'} />
      })}
    </svg>
  )
}
