import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'
import { Section, SectionHeading, Tag } from '../components/ui/Primitives'
import { Button } from '../components/ui/Button'
import { solutions, type Solution } from '../data/solutions'
import { useAudience } from '../hooks/useAudience'
import { AudienceSwitch } from './AudienceSwitch'
import { cn } from '../utils/cn'

/** Interactive solution explorer: selecting a solution updates the description and workflow visual. */
export function SolutionsExplorer({ dark = true, standalone = false }: { dark?: boolean; standalone?: boolean }) {
  const { audience } = useAudience()
  const ordered = useMemo(() => {
    if (!audience) return solutions
    return [...solutions].sort((a, b) => Number(b.audiences.includes(audience)) - Number(a.audiences.includes(audience)))
  }, [audience])
  const [activeId, setActiveId] = useState(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash.replace('#', '') : ''
    return solutions.some((s) => s.id === hash) ? hash : ordered[0].id
  })
  const active = solutions.find((s) => s.id === activeId) ?? solutions[0]

  return (
    <Section id="solutions" dark={dark} className={cn(standalone && 'pt-10 md:pt-14')}>
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Solutions"
            dark={dark}
            title="Executive services for healthcare."
            lead="Four practices, one operating discipline. Select a solution to see how it works and where it applies."
          />
          <AudienceSwitch dark={dark} />
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[400px_1fr] lg:gap-10">
          {/* Selector */}
          <div role="tablist" aria-label="Solutions" aria-orientation="vertical" className="flex gap-3 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible">
            {ordered.map((s) => {
              const on = s.id === active.id
              const relevant = audience ? s.audiences.includes(audience) : true
              return (
                <button
                  key={s.id}
                  role="tab"
                  id={`tab-${s.id}`}
                  aria-selected={on}
                  aria-controls={`panel-${s.id}`}
                  onClick={() => setActiveId(s.id)}
                  onMouseEnter={() => setActiveId(s.id)}
                  className={cn(
                    'group relative min-w-[260px] shrink-0 rounded-2xl border p-5 text-left transition-all duration-400 lg:min-w-0',
                    dark
                      ? on
                        ? 'border-accent-500/50 bg-white/[0.06] shadow-glow'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/25'
                      : on
                        ? 'border-accent-500 bg-white shadow-lift'
                        : 'border-paper-300 bg-white/60 hover:border-ink-900/30',
                    !relevant && 'opacity-60',
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn('font-mono text-[11px] tracking-[0.2em]', on ? 'text-accent-400' : dark ? 'text-white/40' : 'text-muted')}>{s.index}</span>
                    {audience && relevant && (
                      <span className={cn('rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider', dark ? 'bg-accent-500/15 text-accent-300' : 'bg-accent-500/15 text-accent-700')}>
                        For you
                      </span>
                    )}
                  </div>
                  <div className={cn('mt-2 font-display text-lg font-bold', dark ? 'text-white' : 'text-text')}>{s.title}</div>
                  <div className={cn('mt-1 text-[12.5px] leading-snug', dark ? 'text-white/55' : 'text-muted')}>{s.kicker}</div>
                  {on && <motion.span layoutId="sol-indicator" className="absolute inset-y-4 -left-px w-[3px] rounded-full bg-accent-500 hidden lg:block" />}
                </button>
              )
            })}
          </div>

          {/* Detail panel */}
          <div className="relative min-h-[520px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                id={`panel-${active.id}`}
                role="tabpanel"
                aria-labelledby={`tab-${active.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={cn('grid h-full gap-6 rounded-[2rem] border p-6 sm:p-8 lg:grid-cols-[1fr_1fr]', dark ? 'glass' : 'border-paper-300 bg-white shadow-soft')}
              >
                <div>
                  <div className={cn('eyebrow', dark && 'eyebrow-dark')}>Solution {active.index}</div>
                  <h3 className={cn('mt-3 font-display text-2xl font-bold sm:text-3xl', dark ? 'text-white' : 'text-text')}>{active.title}</h3>
                  <p className={cn('mt-4 text-[15.5px] leading-relaxed', dark ? 'text-muted-dark' : 'text-muted')}>{active.description}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {active.capabilities.map((c) => (
                      <li key={c} className={cn('flex items-start gap-2 text-[13.5px]', dark ? 'text-white/85' : 'text-text/85')}>
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {active.technologies.map((t) => (
                      <Tag key={t} dark={dark}>
                        {t}
                      </Tag>
                    ))}
                  </div>
                  {active.proof && (
                    <p className={cn('mt-6 border-l-2 border-accent-500 pl-4 text-[13.5px] leading-relaxed', dark ? 'text-white/70' : 'text-muted')}>{active.proof}</p>
                  )}
                  <div className="mt-8">
                    <Button to={`/contact?intent=solution&topic=${active.id}`} icon variant={dark ? 'primary' : 'secondary'}>
                      Discuss {active.title.split(' ')[0]}
                    </Button>
                  </div>
                </div>

                <WorkflowVisual solution={active} dark={dark} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {!standalone && (
          <div className="mt-10 flex justify-end">
            <Button to="/solutions" variant="ghost" className={dark ? 'text-white' : 'text-text'}>
              All solutions <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Button>
          </div>
        )}
      </div>
    </Section>
  )
}

/** Animated technology workflow for the selected solution. */
function WorkflowVisual({ solution, dark }: { solution: Solution; dark: boolean }) {
  return (
    <div className={cn('relative overflow-hidden rounded-3xl border p-5', dark ? 'border-white/10 bg-ink-900/70 grid-bg' : 'border-paper-300 bg-paper-100 grid-bg-light')} aria-label={`${solution.title} workflow`}>
      <div className={cn('mb-4 font-mono text-[10.5px] uppercase tracking-[0.2em]', dark ? 'text-white/45' : 'text-muted')}>Technology workflow</div>
      <ol className="relative space-y-3">
        <div className={cn('absolute left-[15px] top-4 bottom-4 w-px', dark ? 'bg-white/10' : 'bg-paper-300')} aria-hidden />
        {solution.workflow.map((w, i) => (
          <motion.li
            key={w.label}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 + i * 0.12, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex gap-4"
          >
            <motion.span
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.12 + i * 0.12, type: 'spring', stiffness: 300, damping: 18 }}
              className={cn('relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-[10px]', dark ? 'border-accent-500/50 bg-ink-800 text-accent-300' : 'border-accent-500 bg-white text-accent-700')}
            >
              {i + 1}
            </motion.span>
            <div className={cn('flex-1 rounded-2xl border px-4 py-3', dark ? 'border-white/10 bg-white/[0.03]' : 'border-paper-300 bg-white')}>
              <div className={cn('font-display text-[14.5px] font-semibold', dark ? 'text-white' : 'text-text')}>{w.label}</div>
              <div className={cn('mt-0.5 text-[12.5px] leading-snug', dark ? 'text-white/55' : 'text-muted')}>{w.detail}</div>
            </div>
          </motion.li>
        ))}
      </ol>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-accent-500/20 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
