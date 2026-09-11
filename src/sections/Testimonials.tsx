import { motion } from 'motion/react'
import { Quote } from 'lucide-react'
import { Section, SectionHeading } from '../components/ui/Primitives'
import { testimonials } from '../data/testimonials'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'

export function Testimonials({ limit = 6 }: { limit?: number }) {
  const items = testimonials.slice(0, limit)
  return (
    <Section id="references">
      <div className="container-x">
        <SectionHeading eyebrow="Executive references" title="What leaders in healthcare say." lead="References from health system, clinical, and technology leaders who have worked with Lucas Health Tech." align="center" />
        <motion.ul variants={stagger(0.08)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-12 columns-1 gap-5 md:columns-2 lg:columns-3">
          {items.map((t) => (
            <motion.li key={t.id} variants={fadeUp} className="mb-5 break-inside-avoid">
              <figure className="group rounded-3xl border border-paper-300 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
                <Quote className="h-5 w-5 text-accent-500" aria-hidden />
                {t.headline && <div className="mt-3 font-display text-lg font-bold text-text">{t.headline}</div>}
                <blockquote className="mt-2 text-[15px] leading-relaxed text-muted">“{t.quote}”</blockquote>
                <figcaption className="mt-5 border-t border-paper-200 pt-4">
                  <div className="font-display text-sm font-semibold text-text">{t.name}</div>
                  <div className="mt-0.5 text-xs leading-snug text-muted">{t.title}</div>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  )
}
