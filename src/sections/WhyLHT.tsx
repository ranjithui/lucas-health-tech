import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'motion/react'
import { Section, SectionHeading } from '../components/ui/Primitives'
import { differentiators, founder } from '../data/company'
import { cn } from '../utils/cn'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

/** Vertical story: Clinical depth → Technical architecture → Executive operations → Automation → Attention. */
export function WhyLHT() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 60%', 'end 60%'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(differentiators.length - 1, Math.floor(v * differentiators.length))
    if (idx !== active) setActive(idx)
  })

  return (
    <Section id="why">
      <div className="container-x">
        <SectionHeading eyebrow="Why Lucas Health Tech" title="Where clinical reality meets technical leadership." lead="Five reasons organizations bring us in when platforms and operations have to work together." />

        <div ref={ref} className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Sticky visual */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-900 p-8 text-white grid-bg">
              <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent-500/20 blur-3xl" />
              <ol className="relative space-y-3">
                {differentiators.map((d, i) => {
                  const on = i === active
                  return (
                    <li key={d.step} className="flex items-center gap-4">
                      <motion.span
                        animate={{ scale: on ? 1 : 0.9, backgroundColor: on ? '#19c6a5' : 'rgba(255,255,255,0.06)', color: on ? '#0a0e14' : 'rgba(255,255,255,0.6)' }}
                        transition={{ duration: 0.4 }}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 font-mono text-[11px]"
                      >
                        {d.step}
                      </motion.span>
                      <div className="relative flex-1">
                        <motion.div animate={{ opacity: on ? 1 : 0.45, x: on ? 6 : 0 }} transition={{ duration: 0.4 }} className="font-display text-lg font-semibold">
                          {d.title}
                        </motion.div>
                        {i < differentiators.length - 1 && <span className="absolute -left-[26px] top-9 h-4 w-px bg-white/15" aria-hidden />}
                      </div>
                      {on && !reduced && <motion.span layoutId="why-dot" className="h-2 w-2 rounded-full bg-signal-500" />}
                    </li>
                  )
                })}
              </ol>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-[13.5px] leading-relaxed text-white/70">“{founder.quote}”</p>
                <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-accent-300">
                  {founder.name} · {founder.role}
                </p>
              </div>
            </div>
          </div>

          {/* Scrolling cards */}
          <ol className="space-y-5">
            {differentiators.map((d, i) => (
              <motion.li
                key={d.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={cn('rounded-3xl border bg-white p-6 shadow-soft transition-colors duration-500 sm:p-8', i === active ? 'border-accent-500/60' : 'border-paper-300')}
              >
                <span className="font-mono text-[11px] tracking-[0.22em] text-accent-600">{d.step}</span>
                <h3 className="mt-2 font-display text-2xl font-bold text-text">{d.title}</h3>
                <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{d.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}
