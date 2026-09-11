import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowDown } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { company } from '../data/company'
import { stagger, wordReveal, fadeUp } from '../animations/variants'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'

const NetworkCanvas = lazy(() => import('../components/visuals/NetworkCanvas').then((m) => ({ default: m.NetworkCanvas })))

const headline = ['Clinical', 'systems', 'architecture', 'and', 'executive', 'operations', 'for', 'healthcare.']

const chips = [
  { label: 'FHIR-native platforms', x: '6%', y: '10%', d: 0 },
  { label: 'Fractional CTO / COO', x: '58%', y: '4%', d: 0.6 },
  { label: '200+ production automations', x: '52%', y: '84%', d: 1.2 },
  { label: 'Epic • Oracle Health', x: '4%', y: '78%', d: 1.8 },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const yText = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const scaleVis = useTransform(scrollYProgress, [0, 1], [1, reduced ? 1 : 1.08])

  return (
    <section ref={ref} id="hero" className="relative isolate min-h-[100svh] overflow-hidden bg-ink-900 text-white">
      {/* Background: slow gradient movement + grid */}
      <div aria-hidden className="absolute inset-0 grid-bg opacity-60" />
      <div
        aria-hidden
        className="animate-gradient absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(60% 50% at 80% 30%, rgba(25,198,165,0.16), transparent 60%), radial-gradient(40% 40% at 15% 80%, rgba(242,180,65,0.10), transparent 60%)',
        }}
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-paper-100 to-transparent" />

      <div className="container-x relative grid min-h-[100svh] items-center gap-10 pb-24 pt-32 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-16">
        <motion.div style={{ y: yText, opacity }} className="relative z-10">
          <motion.div variants={stagger(0.06, 0.1)} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-300">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-400" />
              </span>
              Executive services for healthcare
            </motion.div>

            <h1 className="display-xl text-balance" style={{ perspective: 800 }}>
              {headline.map((w, i) => (
                <motion.span key={i} variants={wordReveal} className="inline-block whitespace-pre" style={{ transformOrigin: 'bottom' }}>
                  {i === 0 || i === 4 ? <span className="text-accent-400">{w}</span> : w}{' '}
                </motion.span>
              ))}
            </h1>

            <motion.p variants={fadeUp} className="mt-7 max-w-xl text-lg leading-relaxed text-muted-dark md:text-xl">
              Healthcare organizations struggle when clinical systems are fragmented, misaligned, or poorly governed. We architect platforms and lead operations where clinical workflows, regulatory requirements, and enterprise scale intersect.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button to="/contact" size="lg" icon>
                Talk to an Expert
              </Button>
              <Button to="/solutions" size="lg" variant="outline" className="text-white">
                Explore solutions
              </Button>
            </motion.div>

            <motion.dl variants={fadeUp} className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-6">
              {[
                ['Fractional & Standing', 'CTO / COO'],
                ['Platform', 'Strategy'],
                ['AI &', 'Automation'],
              ].map(([a, b]) => (
                <div key={b}>
                  <dt className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/45">{a}</dt>
                  <dd className="mt-1 font-display text-[15px] font-semibold text-white">{b}</dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>
        </motion.div>

        {/* Signature visual */}
        <motion.div style={{ scale: scaleVis }} className="relative h-[380px] sm:h-[460px] lg:h-[600px]">
          <div className="absolute inset-0 rounded-[2rem] border border-white/8 bg-ink-800/40 backdrop-blur-[2px]" aria-hidden />
          <Suspense fallback={<div className="absolute inset-0" aria-hidden />}>
            <NetworkCanvas className="rounded-[2rem]" />
          </Suspense>
          {chips.map((c) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + c.d * 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass pointer-events-none absolute rounded-full px-3.5 py-2 font-mono text-[11px] tracking-wide text-white/85 animate-float"
              style={{ left: c.x, top: c.y, animationDelay: `${c.d}s` }}
              aria-hidden
            >
              {c.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.a
        href="#story"
        aria-label="Scroll to the story"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45 transition hover:text-white lg:flex"
        style={{ opacity }}
      >
        Scroll
        <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
      </motion.a>
      <span className="sr-only">{company.motto}</span>
    </section>
  )
}
