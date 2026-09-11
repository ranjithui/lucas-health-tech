import { Section, SectionHeading } from '../components/ui/Primitives'
import { EcosystemGraph } from '../components/visuals/EcosystemGraph'

export function Ecosystem() {
  return (
    <Section id="ecosystem" dark className="overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-accent-500/10 blur-3xl" />
      <div className="container-x">
        <SectionHeading
          eyebrow="Healthcare ecosystem"
          dark
          title="Connecting patients, providers, technology, data, and operations."
          lead="Select a node to see how each part of the ecosystem is served, and how they connect to measurable outcomes."
        />
        <div className="mt-14">
          <EcosystemGraph />
        </div>
      </div>
    </Section>
  )
}
