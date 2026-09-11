import { motion } from 'motion/react'
import { Section, SectionHeading } from '../components/ui/Primitives'
import { Counter } from '../components/visuals/Counter'
import { metrics, technologies } from '../data/company'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'

export function Impact() {
  return (
    <Section id="impact">
      <div className="container-x">
        <SectionHeading eyebrow="Impact" title="Numbers we publish, and stand behind." lead="Only verified figures from Lucas Health Tech engagements." />

        <motion.dl variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              variants={fadeUp}
              className="group relative overflow-hidden rounded-3xl border border-paper-300 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <div aria-hidden className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-500/10 blur-2xl transition group-hover:bg-accent-500/20" />
              <dd className="font-display text-[44px] font-bold leading-none tracking-[-0.03em] text-text">
                <Counter value={m.value} suffix={m.suffix} decimals={'decimals' in m ? m.decimals : 0} />
              </dd>
              <dt className="mt-3 font-display text-[15px] font-semibold text-text">{m.label}</dt>
              <p className="mt-1.5 text-[13px] leading-snug text-muted">{m.detail}</p>
              <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-accent-500 transition-all duration-700 group-hover:w-full" aria-hidden style={{ transitionDelay: `${i * 40}ms` }} />
            </motion.div>
          ))}
        </motion.dl>

        {/* Technology marquee */}
        <div className="mt-14 mask-fade-x overflow-hidden" aria-label="Technologies and platforms">
          <div className="flex w-max animate-marquee gap-3 [animation-play-state:running] hover:[animation-play-state:paused]">
            {[...technologies, ...technologies].map((t, i) => (
              <span key={`${t}-${i}`} className="rounded-full border border-paper-300 bg-white px-4 py-2 font-mono text-[12px] tracking-wide text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
