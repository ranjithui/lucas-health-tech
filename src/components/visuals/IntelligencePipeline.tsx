import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'motion/react'
import { intelligencePipeline } from '../../data/ecosystem'
import { usePrefersReducedMotion } from '../../hooks/useMediaQuery'
import { cn } from '../../utils/cn'

/** DATA → PROCESSING → INTELLIGENCE → INSIGHT → ACTION with animated stream and auto-advance. */
export function IntelligencePipeline() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.4 })
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!inView || paused || reduced) return
    const t = setInterval(() => setActive((a) => (a + 1) % intelligencePipeline.length), 2600)
    return () => clearInterval(t)
  }, [inView, paused, reduced])

  const stage = intelligencePipeline[active]

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      {/* Stage rail */}
      <ol className="relative" aria-label="Intelligence pipeline stages">
        <div className="absolute left-[19px] top-6 bottom-6 w-px bg-white/10" aria-hidden />
        {!reduced && (
          <motion.div
            aria-hidden
            className="absolute left-[19px] top-6 w-px bg-gradient-to-b from-accent-500 via-accent-400 to-signal-500"
            initial={{ height: 0 }}
            animate={{ height: `${(active / (intelligencePipeline.length - 1)) * 100}%` }}
            style={{ maxHeight: 'calc(100% - 3rem)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        {intelligencePipeline.map((s, i) => {
          const on = i === active
          return (
            <li key={s.id}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                aria-current={on ? 'step' : undefined}
                className={cn(
                  'group relative flex w-full items-center gap-5 rounded-2xl px-2 py-3 text-left transition',
                  on ? 'text-white' : 'text-white/50 hover:text-white/80',
                )}
              >
                <span
                  className={cn(
                    'relative z-10 flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border font-mono text-[11px] transition-all duration-500',
                    on ? 'border-accent-400 bg-accent-500 text-ink-900 shadow-glow' : 'border-white/15 bg-ink-800 text-white/60',
                  )}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>
                  <span className="block font-mono text-[11px] uppercase tracking-[0.2em]">{s.label}</span>
                  <span className={cn('block font-display text-lg font-semibold transition', on ? 'text-white' : 'text-white/70')}>{s.title}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>

      {/* Interface panel */}
      <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-400" aria-hidden />
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">Live pipeline</span>
          </div>
          <span className="font-mono text-[11px] text-white/40">
            {String(active + 1).padStart(2, '0')} / {String(intelligencePipeline.length).padStart(2, '0')}
          </span>
        </div>

        {/* Data stream */}
        <div className="relative mb-6 h-24 overflow-hidden rounded-2xl border border-white/10 bg-ink-900/70" aria-hidden>
          <div className="absolute inset-0 grid-bg opacity-70" />
          {Array.from({ length: 7 }).map((_, r) => (
            <div key={r} className="absolute left-0 right-0 h-px" style={{ top: `${12 + r * 12}%` }}>
              {!reduced && (
                <motion.span
                  className="absolute h-px w-16 rounded-full bg-gradient-to-r from-transparent via-accent-400 to-transparent"
                  initial={{ left: '-20%' }}
                  animate={{ left: '110%' }}
                  transition={{ duration: 2.2 + r * 0.35, repeat: Infinity, ease: 'linear', delay: r * 0.4 }}
                />
              )}
            </div>
          ))}
          <div className="absolute inset-y-0 left-1/2 w-px bg-accent-500/40" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-400/50 bg-ink-900 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-accent-300">
            {stage.label}
          </div>
        </div>

        <motion.div key={stage.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} aria-live="polite">
          <h3 className="font-display text-2xl font-bold text-white">{stage.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-dark">{stage.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {stage.signals.map((s) => (
              <span key={s} className="rounded-full border border-accent-500/30 bg-accent-500/10 px-3 py-1 font-mono text-[11px] tracking-wide text-accent-300">
                {s}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Progress bars */}
        <div className="mt-8 grid grid-cols-5 gap-1.5" aria-hidden>
          {intelligencePipeline.map((s, i) => (
            <div key={s.id} className="h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-accent-400"
                initial={false}
                animate={{ width: i < active ? '100%' : i === active ? '100%' : '0%' }}
                transition={{ duration: i === active && !reduced && !paused ? 2.5 : 0.3, ease: 'linear' }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
