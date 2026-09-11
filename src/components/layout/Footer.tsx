import { Link } from 'react-router-dom'
import { MapPin, Phone, Clock } from 'lucide-react'
import { LinkedInIcon as Linkedin } from '../ui/LinkedInIcon'
import { Logo } from './Logo'
import { Button } from '../ui/Button'
import { company } from '../../data/company'
import { solutions } from '../../data/solutions'
import { industries } from '../../data/industries'

export function Footer() {
  return (
    <footer className="relative mt-16 text-white">
      <div aria-hidden className="absolute inset-x-0 bottom-0 top-24 bg-ink-950" />
      <div className="container-x relative">
        {/* CTA band (straddles the page background and the footer) */}
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-ink-800 px-6 py-12 sm:px-12 sm:py-16">
          <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent-500/20 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-signal-500/10 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <div className="eyebrow-dark mb-4">Start a conversation</div>
              <h2 className="display-lg text-balance text-white">Clinical depth. Technical architecture. Executive operations.</h2>
              <p className="mt-4 max-w-xl text-muted-dark">
                Tell us what keeps you up at night. We will match you with the right engagement, from platform architecture to a fractional executive role.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
              <Button to="/contact" size="lg" icon>
                Talk to an Expert
              </Button>
              <Button href={company.phoneHref} size="lg" variant="outline" className="text-white">
                {company.phone}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-12 pb-12 pt-16 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-dark">{company.tagline}. {company.positioning}</p>
            <a
              href={company.linkedin}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
            >
              <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn
            </a>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">Solutions</h3>
            <ul className="space-y-2.5 text-sm">
              {solutions.map((s) => (
                <li key={s.id}>
                  <Link to={`/solutions#${s.id}`} className="text-white/75 transition hover:text-accent-300">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">Industries</h3>
            <ul className="space-y-2.5 text-sm">
              {industries.map((i) => (
                <li key={i.id}>
                  <Link to={`/industries#${i.id}`} className="text-white/75 transition hover:text-accent-300">
                    {i.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">Get in touch</h3>
            <ul className="space-y-3 text-sm text-white/75">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 text-accent-400" aria-hidden />
                <a href={company.phoneHref} className="hover:text-white">
                  {company.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 text-accent-400" aria-hidden />
                <a href={company.mapsHref} target="_blank" rel="noreferrer" className="hover:text-white">
                  {company.location}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 text-accent-400" aria-hidden />
                <span>{company.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/45 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
      <div className="h-20 md:hidden" aria-hidden />
    </footer>
  )
}
