import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { Section, SectionHeading, Tag } from '../components/ui/Primitives'
import { Modal } from '../components/ui/Modal'
import { engagements, type Engagement } from '../data/engagements'
import { cn } from '../utils/cn'

/** Immersive, horizontally scrolling engagement cards with Challenge → Approach → Technology → Solution → Outcome detail. */
export function Engagements() {
  const scroller = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<Engagement | null>(null)

  const scrollBy = (dir: 1 | -1) => scroller.current?.scrollBy({ left: dir * Math.min(560, scroller.current.clientWidth * 0.85), behavior: 'smooth' })

  return (
    <Section id="engagements" className="overflow-hidden bg-paper-200">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Select engagements" title="Work that spans oncology platforms, managed care, and pharma." lead="Each engagement follows the same discipline: challenge, approach, technology, solution, outcome." />
          <div className="flex gap-2">
            <button onClick={() => scrollBy(-1)} aria-label="Previous engagement" className="grid h-11 w-11 place-items-center rounded-full border border-paper-300 bg-white text-text transition hover:border-ink-900">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => scrollBy(1)} aria-label="Next engagement" className="grid h-11 w-11 place-items-center rounded-full border border-paper-300 bg-white text-text transition hover:border-ink-900">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div ref={scroller} className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-6 no-scrollbar sm:px-8 lg:px-[max(3rem,calc((100vw-1280px)/2+3rem))]" role="list">
        {engagements.map((e, i) => (
          <motion.article
            key={e.id}
            role="listitem"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex w-[86vw] max-w-[560px] shrink-0 snap-start flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 text-white shadow-lift"
          >
            {/* Large visual */}
            <div className="relative h-56 overflow-hidden sm:h-64">
              <EngagementVisual index={i} />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-900 to-transparent" aria-hidden />
              <div className="absolute left-5 top-5 flex gap-2">
                <span className="rounded-full border border-white/15 bg-ink-900/70 px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/80 backdrop-blur">{e.sector}</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="eyebrow-dark">{e.role}</div>
              <h3 className="mt-2 font-display text-2xl font-bold">{e.client}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-dark">{e.headline}</p>
              <dl className="mt-5 grid grid-cols-3 gap-3">
                {e.facts.map((f) => (
                  <div key={f.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-3">
                    <dd className="font-display text-xl font-bold text-accent-300">{f.value}</dd>
                    <dt className="mt-0.5 text-[11px] leading-tight text-white/55">{f.label}</dt>
                  </div>
                ))}
              </dl>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {e.technology.map((t) => (
                  <Tag key={t} dark>
                    {t}
                  </Tag>
                ))}
              </div>
              <button onClick={() => setOpen(e)} className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 transition hover:bg-accent-400">
                Read the engagement <ArrowUpRight className="h-4 w-4" aria-hidden />
              </button>
            </div>
          </motion.article>
        ))}
        <div className="w-4 shrink-0" aria-hidden />
      </div>

      <Modal open={!!open} onClose={() => setOpen(null)} title={open?.client} labelledBy="engagement-title">
        {open && (
          <div className="mt-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent-700">{open.role}</p>
            <p className="mt-3 text-lg font-medium text-text">{open.headline}</p>
            <ol className="mt-6 space-y-5">
              {(
                [
                  ['Challenge', open.challenge],
                  ['Approach', open.approach],
                  ['Technology', open.technology.join(' • ')],
                  ['Solution', open.solution],
                  ['Outcome', open.outcome],
                ] as const
              ).map(([k, v], i) => (
                <li key={k} className="grid gap-1 sm:grid-cols-[130px_1fr]">
                  <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    <span className={cn('h-1.5 w-1.5 rounded-full', i === 4 ? 'bg-signal-500' : 'bg-accent-500')} aria-hidden />
                    {k}
                  </div>
                  <p className="text-[15px] leading-relaxed text-text/85">{v}</p>
                </li>
              ))}
            </ol>
            {open.note && <p className="mt-6 text-xs text-muted">{open.note}</p>}
          </div>
        )}
      </Modal>
    </Section>
  )
}

/** Abstract, brand-consistent visual per engagement (no stock photography). */
function EngagementVisual({ index }: { index: number }) {
  const palettes = [
    ['#19c6a5', '#0e9f84'],
    ['#f2b441', '#19c6a5'],
    ['#6fe3cb', '#f2b441'],
  ]
  const [a, b] = palettes[index % palettes.length]
  return (
    <svg viewBox="0 0 560 260" className="h-full w-full transition-transform duration-700 group-hover:scale-[1.03]" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <linearGradient id={`eg-${index}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={a} stopOpacity="0.35" />
          <stop offset="1" stopColor={b} stopOpacity="0.05" />
        </linearGradient>
        <pattern id={`grid-${index}`} width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="rgba(255,255,255,0.06)" />
        </pattern>
      </defs>
      <rect width="560" height="260" fill="#111821" />
      <rect width="560" height="260" fill={`url(#grid-${index})`} />
      <circle cx={420 - index * 60} cy={80 + index * 30} r="120" fill={`url(#eg-${index})`} />
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <circle cx={80 + i * 80} cy={140 + Math.sin(i + index) * 50} r="5" fill={i % 2 ? a : b} />
          {i < 5 && <line x1={80 + i * 80} y1={140 + Math.sin(i + index) * 50} x2={160 + i * 80} y2={140 + Math.sin(i + 1 + index) * 50} stroke={a} strokeOpacity="0.5" strokeWidth="1.5" />}
        </g>
      ))}
    </svg>
  )
}
