import { useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'motion/react'
import { ecosystemLinks, ecosystemNodes, type EcosystemNode } from '../../data/ecosystem'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { cn } from '../../utils/cn'

const W = 1000
const H = 420

/** Interactive SVG ecosystem: Patients → Providers → Technology → Data → Operations → Outcomes. */
export function EcosystemGraph() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })
  const reduced = usePrefersReducedMotion()
  const [selected, setSelected] = useState<EcosystemNode>(ecosystemNodes[2])

  const pos = useMemo(() => Object.fromEntries(ecosystemNodes.map((n) => [n.id, { x: (n.x / 100) * W, y: (n.y / 100) * H }])), [])

  const linked = new Set(
    ecosystemLinks.filter(([a, b]) => a === selected.id || b === selected.id).flatMap(([a, b]) => [a, b]),
  )

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
      <p className="sr-only">Ecosystem: Patients, Providers, Technology, Data, Operations, and Outcomes are connected. Select a node to read its capabilities.</p>
      <div className="relative hidden overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 p-4 grid-bg sm:block sm:p-6">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="group" aria-label="Healthcare ecosystem map">
          <defs>
            <linearGradient id="eco-link" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#19c6a5" stopOpacity="0.9" />
              <stop offset="1" stopColor="#f2b441" stopOpacity="0.7" />
            </linearGradient>
            <filter id="eco-glow">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {ecosystemLinks.map(([a, b], i) => {
            const p1 = pos[a]
            const p2 = pos[b]
            const mx = (p1.x + p2.x) / 2
            const my = (p1.y + p2.y) / 2 - 40
            const d = `M ${p1.x} ${p1.y} Q ${mx} ${my} ${p2.x} ${p2.y}`
            const isActive = a === selected.id || b === selected.id
            return (
              <g key={`${a}-${b}`}>
                <motion.path
                  d={d}
                  fill="none"
                  stroke={isActive ? 'url(#eco-link)' : 'rgba(154,164,177,0.28)'}
                  strokeWidth={isActive ? 2.2 : 1.2}
                  strokeLinecap="round"
                  initial={reduced ? { pathLength: 1 } : { pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.1, delay: 0.12 * i, ease: [0.16, 1, 0.3, 1] }}
                />
                {isActive && !reduced && (
                  <circle r={4} fill="#6fe3cb" filter="url(#eco-glow)">
                    <animateMotion dur={`${2.4 + i * 0.3}s`} repeatCount="indefinite" path={d} />
                  </circle>
                )}
              </g>
            )
          })}
          {ecosystemNodes.map((n, i) => {
            const p = pos[n.id]
            const isSel = n.id === selected.id
            const dim = !isSel && !linked.has(n.id)
            return (
              <motion.g
                key={n.id}
                initial={reduced ? {} : { opacity: 0, scale: 0.6 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * i + 0.3, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                className="cursor-pointer outline-none"
                role="button"
                tabIndex={0}
                aria-pressed={isSel}
                aria-label={`${n.label}: ${n.short}`}
                onClick={() => setSelected(n)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setSelected(n)
                  }
                }}
              >
                {isSel && (
                  <circle cx={p.x} cy={p.y} r={30} fill="none" stroke="#19c6a5" strokeOpacity={0.5}>
                    {!reduced && <animate attributeName="r" values="22;40" dur="1.8s" repeatCount="indefinite" />}
                    {!reduced && <animate attributeName="stroke-opacity" values="0.6;0" dur="1.8s" repeatCount="indefinite" />}
                  </circle>
                )}
                <circle cx={p.x} cy={p.y} r={22} fill={isSel ? '#19c6a5' : '#111821'} stroke={isSel ? '#6fe3cb' : dim ? 'rgba(154,164,177,0.3)' : '#19c6a5'} strokeWidth={2} opacity={dim ? 0.55 : 1} />
                <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize={11} fontFamily="ui-monospace, monospace" fill={isSel ? '#0a0e14' : '#e8ecf0'} opacity={dim ? 0.7 : 1}>
                  {String(i + 1).padStart(2, '0')}
                </text>
                <text x={p.x} y={p.y + 44} textAnchor="middle" fontSize={13} fontWeight={600} fontFamily="Manrope, Inter, sans-serif" fill={dim ? 'rgba(232,236,240,0.5)' : '#fff'}>
                  {n.label}
                </text>
              </motion.g>
            )
          })}
        </svg>
      </div>

      <div className="relative min-h-[260px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass rounded-3xl p-6 sm:p-8"
            aria-live="polite"
          >
            <div className="eyebrow-dark mb-3">{selected.short}</div>
            <h3 className="font-display text-2xl font-bold text-white">{selected.label}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-dark">{selected.description}</p>
            <ul className="mt-5 space-y-2">
              {selected.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-sm text-white/85">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <div className="mt-4 flex flex-wrap gap-2 sm:mt-4" role="tablist" aria-label="Ecosystem nodes">
          {ecosystemNodes.map((n) => (
            <button
              key={n.id}
              role="tab"
              aria-selected={n.id === selected.id}
              onClick={() => setSelected(n)}
              className={cn(
                'rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition',
                n.id === selected.id ? 'border-accent-400 bg-accent-500/15 text-accent-300' : 'border-white/12 text-white/60 hover:border-white/30 hover:text-white',
              )}
            >
              {n.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
