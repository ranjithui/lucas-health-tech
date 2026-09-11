import { motion } from 'motion/react'
import { MapPin, Phone, Clock } from 'lucide-react'
import { LinkedInIcon as Linkedin } from '../components/ui/LinkedInIcon'
import { Seo } from '../components/seo/Seo'
import { PageHero } from '../sections/PageHero'
import { Section, SectionHeading, Reveal, Tag } from '../components/ui/Primitives'
import { Button } from '../components/ui/Button'
import { WhyLHT } from '../sections/WhyLHT'
import { Testimonials } from '../sections/Testimonials'
import { company, founder, technologies } from '../data/company'
import { fadeUp, stagger, viewportOnce } from '../animations/variants'

export default function About() {
  return (
    <>
      <Seo
        title="About"
        description="Lucas Health Tech is led by Casi Vician Ischay, a former clinician, Board Director at Signature Health, and fractional and standing CTO/COO for health tech ventures and enterprise health systems."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: founder.name,
          jobTitle: founder.role,
          worksFor: { '@type': 'Organization', name: company.name },
          sameAs: founder.linkedin,
        }}
      />
      <PageHero eyebrow="About" title="Clinical depth. Technical architecture. Executive operations." lead="An executive services firm for healthcare, founded and led by a former clinician who architects platforms and leads operations at enterprise scale." />

      {/* Founder */}
      <Section>
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 p-8 text-white grid-bg sm:p-10">
              <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-accent-500/20 blur-3xl" />
              <div className="relative">
                <span className="eyebrow-dark">About the founder</span>
                <h2 className="mt-4 font-display text-3xl font-bold">{founder.name}</h2>
                <p className="mt-1 text-accent-300">{founder.role}</p>
                <ul className="mt-6 space-y-2">
                  {founder.credentials.map((c) => (
                    <li key={c} className="flex items-center gap-2 text-sm text-white/85">
                      <span className="h-1.5 w-1.5 rounded-full bg-signal-500" aria-hidden /> {c}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[15px] leading-relaxed text-muted-dark">{founder.summary}</p>
                <a href={founder.linkedin} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white transition hover:border-accent-400 hover:text-accent-300">
                  <Linkedin className="h-4 w-4" aria-hidden /> Connect on LinkedIn
                </a>
              </div>
            </div>
          </Reveal>

          <motion.div variants={stagger(0.1)} initial="hidden" whileInView="show" viewport={viewportOnce}>
            <motion.blockquote variants={fadeUp} className="display-md text-balance text-text">
              “{founder.quote}”
            </motion.blockquote>
            <motion.p variants={fadeUp} className="mt-8 text-[16px] leading-relaxed text-muted">
              Lucas Health Tech brings over 20 years of healthcare expertise, with consultants armed with clinical degrees. We provide personal IT, business, and executive attention rather than ticket-based support, and we work where clinical workflows, regulatory requirements, and enterprise scale intersect.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-1.5" aria-label="Technologies and platforms">
              {technologies.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10">
              <Button to="/contact?intent=consultation" icon variant="secondary">
                Book a consultation
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <WhyLHT />

      {/* Location */}
      <Section className="bg-paper-200">
        <div className="container-x grid gap-10 lg:grid-cols-2 lg:items-center">
          <SectionHeading eyebrow="Location" title="Based in Concord, Ohio. Working with organizations nationally." lead="Engagements have spanned Ohio, Wisconsin, North Carolina, and national-scale enterprise programs." />
          <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { Icon: MapPin, label: 'Address', value: company.location, href: company.mapsHref },
              { Icon: Phone, label: 'Phone', value: company.phone, href: company.phoneHref },
              { Icon: Clock, label: 'Hours', value: company.hours },
            ].map(({ Icon, label, value, href }) => (
              <li key={label} className="flex items-start gap-4 rounded-2xl border border-paper-300 bg-white p-5 shadow-soft">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent-500/15 text-accent-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">{label}</div>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="mt-1 block font-medium text-text hover:text-accent-700">
                      {value}
                    </a>
                  ) : (
                    <div className="mt-1 font-medium text-text">{value}</div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Testimonials limit={8} />
    </>
  )
}
