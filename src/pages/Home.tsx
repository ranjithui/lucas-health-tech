import { lazy, Suspense } from 'react'
import { Seo } from '../components/seo/Seo'
import { Hero } from '../sections/Hero'
import { Story } from '../sections/Story'
import { SolutionsExplorer } from '../sections/SolutionsExplorer'
import { Impact } from '../sections/Impact'
import { WhyLHT } from '../sections/WhyLHT'
import { Engagements } from '../sections/Engagements'
import { Testimonials } from '../sections/Testimonials'
import { InsightsPreview } from '../sections/InsightsPreview'

const Ecosystem = lazy(() => import('../sections/Ecosystem').then((m) => ({ default: m.Ecosystem })))
const Intelligence = lazy(() => import('../sections/Intelligence').then((m) => ({ default: m.Intelligence })))

const Skeleton = () => <div className="min-h-[60vh] bg-ink-900" aria-hidden />

export default function Home() {
  return (
    <>
      <Seo
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Lucas Health Tech',
          url: 'https://lucashealthtech.com/',
        }}
      />
      <Hero />
      <Story />
      <SolutionsExplorer />
      <Suspense fallback={<Skeleton />}>
        <Ecosystem />
      </Suspense>
      <Suspense fallback={<Skeleton />}>
        <Intelligence />
      </Suspense>
      <Impact />
      <WhyLHT />
      <Engagements />
      <Testimonials />
      <InsightsPreview />
    </>
  )
}
