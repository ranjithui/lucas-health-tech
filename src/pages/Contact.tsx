import { useSearchParams } from 'react-router-dom'
import { Phone, MapPin, Clock } from 'lucide-react'
import { LinkedInIcon as Linkedin } from '../components/ui/LinkedInIcon'
import { Seo } from '../components/seo/Seo'
import { PageHero } from '../sections/PageHero'
import { Section } from '../components/ui/Primitives'
import { ContactWizard } from '../components/forms/ContactWizard'
import { company } from '../data/company'

const validIntents = ['solution', 'partnership', 'consultation', 'business', 'other'] as const
type Intent = (typeof validIntents)[number]

export default function Contact() {
  const [params] = useSearchParams()
  const raw = params.get('intent')
  const intent = (validIntents as readonly string[]).includes(raw ?? '') ? (raw as Intent) : null

  return (
    <>
      <Seo title="Talk to an Expert" description="Start a conversation with Lucas Health Tech about clinical platform architecture, fractional CTO/COO roles, AI and automation strategy, or digital transformation." />
      <PageHero eyebrow="Contact" title="We’re here to help you." lead="You are our top priority. Tell us what keeps you up at night and we will start a conversation." className="pb-8 md:pb-12" />

      <Section className="pt-6 md:pt-8">
        <div className="container-x grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:gap-12">
          <ContactWizard initialIntent={intent} />

          <aside className="space-y-4 lg:pt-4">
            <div className="rounded-3xl border border-paper-300 bg-white p-6 shadow-soft">
              <h2 className="font-display text-lg font-bold text-text">Prefer to talk?</h2>
              <ul className="mt-4 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 text-accent-600" aria-hidden />
                  <div>
                    <a href={company.phoneHref} className="font-medium text-text hover:text-accent-700">
                      {company.phone}
                    </a>
                    <div className="text-muted">{company.hours}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-accent-600" aria-hidden />
                  <a href={company.mapsHref} target="_blank" rel="noreferrer" className="text-text hover:text-accent-700">
                    {company.location}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 text-accent-600" aria-hidden />
                  <span className="text-text">Responses during business hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <Linkedin className="mt-0.5 h-4 w-4 text-accent-600" aria-hidden />
                  <a href={company.linkedin} target="_blank" rel="noreferrer" className="text-text hover:text-accent-700">
                    Connect with the founder on LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div className="rounded-3xl bg-ink-900 p-6 text-white">
              <div className="eyebrow-dark">Privacy</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-dark">
                We only collect what we need to respond: your name, company, email, phone, and requirement. We do not sell your information to marketing lists, and we ask that you do not share patient or medical information in this form.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  )
}
