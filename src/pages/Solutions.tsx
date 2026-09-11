import { Seo } from '../components/seo/Seo'
import { PageHero } from '../sections/PageHero'
import { SolutionsExplorer } from '../sections/SolutionsExplorer'
import { Intelligence } from '../sections/Intelligence'
import { Testimonials } from '../sections/Testimonials'
import { company } from '../data/company'
import { solutions } from '../data/solutions'

export default function Solutions() {
  return (
    <>
      <Seo
        title="Solutions"
        description="Clinical Platform Architecture, Executive Operating Roles (fractional and standing CTO/COO), AI & Automation Strategy, and Digital Innovation for healthcare organizations."
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: solutions.map((s, i) => ({
            '@type': 'Service',
            position: i + 1,
            name: s.title,
            description: s.summary,
            provider: { '@type': 'Organization', name: company.name },
          })),
        }}
      />
      <PageHero eyebrow="Solutions" title="Platform strategy, executive operations, and automation for healthcare." lead={company.positioning} />
      <SolutionsExplorer dark={false} standalone />
      <Intelligence />
      <Testimonials limit={3} />
    </>
  )
}
