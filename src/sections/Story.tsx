import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { Section, Eyebrow } from '../components/ui/Primitives'
import { usePrefersReducedMotion } from '../hooks/useMediaQuery'
import { cn } from '../utils/cn'

/** Scroll-based storytelling: Problem → Technology → Solution → Impact → Future */
const chapters = [
  {
    key: 'Problem',
    title: 'Clinical systems are fragmented, misaligned, or poorly governed.',
    body: 'And too often, technical leadership doesn’t understand clinical reality. The result is platforms that fight the workflows they were meant to support.',
  },
  {
    key: 'Technology',
    title: 'Architecture that starts with the clinic, not the vendor.',
    body: 'FHIR-native design, HL7 interoperability, and SaMD regulatory positioning, engineered for clinical workflows, regulatory requirements, and enterprise scale.',
  },
  {
    key: 'Solution',
    title: 'Executive operating leadership that bridges both worlds.',
    body: 'Fractional and standing CTO, COO, and VP Clinical Systems roles that connect clinical teams, technical architecture, and board-level strategy.',
  },
  {
    key: 'Impact',
    title: 'Automation embedded in clinical workflows, aligned to ROI.',
    body: '200+ production automations and 2.1M+ annual transactions across Epic, Oracle Health, payer portals, and specialty networks.',
  },
  {
    key: 'Future',
    title: 'Platforms and operations that hold at enterprise scale.',
    body: 'Clinical governance, Automation Centers of Excellence, and enterprise investment models that keep delivering after the engagement ends.',
  },
]

export function Story() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 40%'] })
  const line = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <Section id="story" className="pt-20 md:pt-28">
      <div className="container-x">
        <div className="mb-16 max-w-2xl">
          <Eyebrow>The story</Eyebrow>
          <h2 className="display-lg mt-5 text-balance">From fragmented systems to governed platforms.</h2>
        </div>

        <div ref={ref} className="relative grid gap-x-12 lg:grid-cols-[220px_1fr]">
          {/* Vertical rail */}
          <div className="relative hidden lg:block" aria-hidden>
            <div className="sticky top-32">
              <div className="relative h-[60vh] w-px bg-paper-300">
                <motion.div className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent-500 to-signal-500" style={{ height: reduced ? '100%' : line }} />
              </div>
            </div>
          </div>

          <ol className="space-y-10 md:space-y-16">
            {chapters.map((c, i) => (
              <Chapter key={c.key} index={i} title={c.title} body={c.body} />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  )
}

function Chapter({ index, title, body }: { index: number; title: string; body: string }) {
  const label = chapters[index].key
  return (
    <motion.li
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn('group grid gap-4 rounded-3xl border border-paper-300 bg-white p-6 shadow-soft transition-shadow duration-500 hover:shadow-lift sm:grid-cols-[120px_1fr] sm:p-8')}
    >
      <div>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-600">{String(index + 1).padStart(2, '0')}</span>
        <div className="mt-1 font-display text-lg font-bold text-text">{label}</div>
      </div>
      <div>
        <h3 className="font-display text-xl font-semibold leading-snug text-text md:text-2xl">{title}</h3>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">{body}</p>
      </div>
    </motion.li>
  )
}
