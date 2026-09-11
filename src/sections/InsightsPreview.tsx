import { Link } from 'react-router-dom'
import { motion } from 'motion/react'
import { ArrowUpRight, Clock } from 'lucide-react'
import { Section, SectionHeading } from '../components/ui/Primitives'
import { Button } from '../components/ui/Button'
import { insights } from '../data/insights'
import { readingTime, formatDate } from '../utils/format'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'

export function InsightsPreview() {
  const featured = insights.find((i) => i.featured) ?? insights[0]
  const rest = insights.filter((i) => i.slug !== featured.slug).slice(0, 3)
  return (
    <Section id="insights-preview" className="bg-paper-200">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Insights" title="Perspectives from the intersection of clinic and code." />
          <Button to="/insights" variant="ghost" className="text-text">
            All insights <ArrowUpRight className="h-4 w-4" aria-hidden />
          </Button>
        </div>
        <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewportOnce} className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_1fr]">
          <motion.article variants={fadeUp} className="group relative overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-white shadow-lift sm:p-10">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl transition-transform duration-700 group-hover:scale-125" />
            <div className="relative">
              <span className="eyebrow-dark">{featured.category} · Featured</span>
              <h3 className="mt-4 font-display text-3xl font-bold leading-tight text-balance">
                <Link to={`/insights/${featured.slug}`} className="after:absolute after:inset-0">
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-muted-dark">{featured.excerpt}</p>
              <div className="mt-8 flex items-center gap-4 text-xs text-white/55">
                <span>{formatDate(featured.date)}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden /> {readingTime(featured.body)} min read
                </span>
              </div>
            </div>
          </motion.article>
          <div className="grid gap-5">
            {rest.map((i) => (
              <motion.article key={i.slug} variants={fadeUp} className="group relative rounded-3xl border border-paper-300 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-0.5 hover:shadow-lift">
                <span className="eyebrow">{i.category}</span>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug text-text">
                  <Link to={`/insights/${i.slug}`} className="after:absolute after:inset-0">
                    {i.title}
                  </Link>
                </h3>
                <div className="mt-3 flex items-center gap-3 text-xs text-muted">
                  <span>{formatDate(i.date)}</span>
                  <span>· {readingTime(i.body)} min</span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
