import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check } from 'lucide-react'
import { Seo } from '../components/seo/Seo'
import { PageHero } from '../sections/PageHero'
import { Section, Tag } from '../components/ui/Primitives'
import { Button } from '../components/ui/Button'
import { Ecosystem } from '../sections/Ecosystem'
import { industries } from '../data/industries'
import { solutions } from '../data/solutions'
import { cn } from '../utils/cn'

export default function Industries() {
  const [active, setActive] = useState(industries[0].id)
  const current = industries.find((i) => i.id === active) ?? industries[0]

  return (
    <>
      <Seo title="Industries" description="Lucas Health Tech serves enterprise health systems, health tech ventures, managed care and payers, physician practices and specialty networks, and pharmaceutical and life sciences organizations." />
      <PageHero eyebrow="Industries" title="Built for the organizations that deliver, fund, and build healthcare." lead="Every segment we serve appears in our published engagements and executive references. Nothing here is aspirational." />

      <Section>
        <div className="container-x grid gap-8 lg:grid-cols-[360px_1fr]">
          <nav aria-label="Industries" className="flex gap-2 overflow-x-auto no-scrollbar lg:flex-col lg:overflow-visible">
            {industries.map((ind) => {
              const on = ind.id === active
              return (
                <button
                  key={ind.id}
                  id={ind.id}
                  onClick={() => setActive(ind.id)}
                  aria-pressed={on}
                  className={cn(
                    'min-w-[220px] shrink-0 rounded-2xl border px-5 py-4 text-left transition-all duration-300 lg:min-w-0',
                    on ? 'border-ink-900 bg-ink-900 text-white shadow-lift' : 'border-paper-300 bg-white text-text hover:border-ink-900/40',
                  )}
                >
                  <div className="font-display text-[15.5px] font-semibold">{ind.title}</div>
                </button>
              )
            })}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div key={current.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }} className="rounded-[2rem] border border-paper-300 bg-white p-6 shadow-soft sm:p-10">
              <span className="eyebrow">Industry</span>
              <h2 className="display-md mt-3 text-text">{current.title}</h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted">{current.description}</p>

              <div className="mt-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Typical needs</h3>
                  <ul className="mt-3 space-y-2">
                    {current.needs.map((n) => (
                      <li key={n} className="flex items-start gap-2 text-[14.5px] text-text/85">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-500" aria-hidden /> {n}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Relevant solutions</h3>
                  <ul className="mt-3 space-y-2">
                    {current.solutionIds.map((id) => {
                      const s = solutions.find((x) => x.id === id)
                      if (!s) return null
                      return (
                        <li key={id}>
                          <Link to={`/solutions#${id}`} className="group flex items-center justify-between rounded-xl border border-paper-300 px-4 py-3 text-[14.5px] font-medium text-text transition hover:border-accent-500 hover:bg-accent-500/5">
                            {s.title}
                            <ArrowUpRight className="h-4 w-4 text-accent-600 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-paper-100 p-4 text-[13.5px] text-muted">
                <Tag className="mr-2">Evidence</Tag>
                {current.evidence}
              </div>

              <div className="mt-8">
                <Button to={`/contact?intent=solution&industry=${current.id}`} icon variant="secondary">
                  Talk about {current.title.split(' ')[0].toLowerCase()} work
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Section>

      <Ecosystem />
    </>
  )
}
