export type InsightCategory =
  | 'Industry Insights'
  | 'Healthcare Technology'
  | 'Case Studies'
  | 'News'
  | 'Research'
  | 'Articles'

export interface Insight {
  slug: string
  title: string
  category: InsightCategory
  excerpt: string
  date: string
  featured?: boolean
  tags: string[]
  /** Markdown-lite: paragraphs separated by blank lines, "## " headings, "- " bullets. */
  body: string
}

/**
 * Editorial content derived from Lucas Health Tech's published positioning,
 * service descriptions, and engagements. No external statistics or third-party
 * claims are introduced. Review and extend with the client report.
 */
export const insights: Insight[] = [
  {
    slug: 'when-technical-leadership-doesnt-understand-clinical-reality',
    title: 'When technical leadership doesn’t understand clinical reality',
    category: 'Industry Insights',
    excerpt:
      'Fragmented, misaligned, or poorly governed clinical systems are rarely a technology problem alone. They are a leadership problem at the intersection of clinical workflows, regulation, and scale.',
    date: '2026-01-15',
    featured: true,
    tags: ['Clinical Governance', 'Executive Leadership', 'Platform Strategy'],
    body: `Healthcare organizations struggle when clinical systems are fragmented, misaligned, or poorly governed. Just as often, they struggle because the people leading technology have never worked inside a clinical workflow.

## Three intersecting forces

Every clinical platform decision sits where three forces meet:

- Clinical workflows: how care is actually delivered, documented, and coordinated.
- Regulatory requirements: what governance, privacy, and device pathways demand.
- Enterprise scale: what has to hold across sites, vendors, and systems.

Architecture that optimizes one of these at the expense of the others creates the fragmentation that leadership then spends years trying to stabilize.

## What executive operating leadership looks like

Fractional and standing CTO, COO, and VP Clinical Systems roles exist to bridge clinical teams with technical architecture and board-level strategy. That means enterprise product strategy, multi-site clinical operations, and executive governance alignment handled by the same leadership, rather than split across a technical team that doesn’t see the clinic and a clinical team that doesn’t see the platform.

## Where to start

Start with the workflows. Map how care is delivered before designing the system, position regulatory pathways early, and build governance that survives enterprise scale. Clinical depth, technical architecture, and executive operations are one discipline, not three.`,
  },
  {
    slug: 'fhir-native-by-design',
    title: 'FHIR-native by design: architecting clinical governance platforms',
    category: 'Healthcare Technology',
    excerpt:
      'Interoperability is a design decision, not an integration afterthought. Why FHIR-native architecture, HL7 interoperability, and SaMD positioning belong in the first sprint.',
    date: '2026-02-10',
    tags: ['FHIR', 'HL7', 'SaMD', 'Architecture'],
    body: `Platform modernization in healthcare fails most often at the seams: the places where clinical data has to move between systems, teams, and regulators.

## FHIR-native, not FHIR-adjacent

A FHIR-native platform treats FHIR resources as its core data model rather than a translation layer bolted on at the edge. Combined with HL7 interoperability for the systems that already speak it, the platform can participate in the enterprise from day one.

## SaMD pathways start early

If any part of a clinical platform may be regulated as Software as a Medical Device, its regulatory positioning shapes the architecture. Deciding this after the product is built means rebuilding it.

## Governance at enterprise scale

Clinical governance platforms need governance of their own: who decides, how change is controlled, and how the platform behaves across sites and vendors. Enterprise governance is part of the architecture, not a policy document written afterwards.

Our Clinical Platform Architecture practice focuses on exactly these three elements: FHIR-native design, HL7 interoperability, and SaMD regulatory positioning.`,
  },
  {
    slug: 'what-is-rpa-in-healthcare',
    title: 'What is RPA, and why does it matter for healthcare operations?',
    category: 'Articles',
    excerpt:
      'Robotic Process Automation uses digital workers to automate tasks within workflows, so clinically trained staff can focus on more meaningful work.',
    date: '2025-11-20',
    tags: ['RPA', 'Intelligent Automation', 'Operations'],
    body: `Robotic Process Automation (RPA) utilizes digital workers to automate tasks within workflows. This enhances operational efficiency, allowing your human employees and clinically trained staff to focus on more meaningful work.

## Why RPA in healthcare

Administrative tasks in healthcare are repetitive, high-volume, and spread across systems such as EHRs, payer portals, and specialty networks. Those are the conditions under which digital workers do their best work.

## How practices and health systems benefit

- Accelerate digital transformation
- Achieve operational efficiency goals
- Reduce labor, operations, and software costs rapidly
- Enhance workflow accuracy and strengthen compliance
- Boost worker productivity with personal robotic assistants
- Grow profits by automating administrative tasks

## From pilot to production

Automation delivers value when it is embedded in clinical workflows and governed as an enterprise capability. Lucas Health Tech has delivered 200+ production automations across Epic, Oracle Health, payer portals, and specialty networks, with 2.1M+ annual transactions aligned to quantified ROI.`,
  },
  {
    slug: 'automation-centers-of-excellence',
    title: 'Building an Automation Center of Excellence that pays for itself',
    category: 'Healthcare Technology',
    excerpt:
      'Individual automations save hours. A Center of Excellence turns them into an enterprise investment with quantified return.',
    date: '2026-03-05',
    tags: ['Automation CoE', 'AI Strategy', 'ROI'],
    body: `One automation is a project. Two hundred are an operating model. The difference is a Center of Excellence.

## What a CoE actually does

An Automation Center of Excellence sets the governance, investment model, and operating cadence for automation across the enterprise. It decides which use cases matter, how they are built, and how their return is measured.

## The investment model

Enterprise automation investment models tie every automation to transactions and to quantified ROI. That discipline is what lets leadership fund automation as a capability rather than a series of one-off requests.

## RPA, orchestration, and prediction together

Modern automation combines RPA for system-level tasks, API orchestration for connecting platforms, and predictive models where they add real decision value. Embedding these in clinical workflows, rather than beside them, is where the impact comes from.

Our AI & Automation Strategy practice designs Automation Centers of Excellence and enterprise automation investment models, and delivers production automations across Epic, Oracle Health, payer portals, and specialty networks.`,
  },
  {
    slug: 'lorimdt-fhir-native-oncology-governance',
    title: 'Engagement: a FHIR-native governance platform for complex oncology care',
    category: 'Case Studies',
    excerpt:
      'As Founding Chief Technology Architect for LORiMDT, Lucas Health Tech defined the technical architecture, product roadmap, ePRO integration strategy, and regulatory positioning.',
    date: '2026-04-02',
    tags: ['FHIR', 'Oncology', 'ePRO', 'Case Study'],
    body: `LORiMDT is a FHIR-native clinical governance platform for complex oncology care, associated with the Hope for Liver Cancer Foundation (501c3).

## The role

Founding Chief Technology Architect.

## The work

- Technical architecture for a FHIR-native clinical governance platform
- Product roadmap
- ePRO (electronic patient-reported outcomes) integration strategy
- Regulatory positioning

## Why it matters

Complex oncology care depends on coordinated, governed decision-making across teams. Designing the platform FHIR-native from the start, with ePRO and regulatory positioning built into the roadmap, avoids the fragmentation that so often follows a fast first release.`,
  },
  {
    slug: 'digital-transformation-for-physician-practices',
    title: 'Digital transformation for physician practices: technology that works for you',
    category: 'Articles',
    excerpt:
      'Technology should make your work life easier, not more difficult. A practical approach to modernizing infrastructure, patient communication, and workflows.',
    date: '2025-10-08',
    tags: ['Digital Innovation', 'Physician Practices', 'Workflow'],
    body: `We specialize in assisting physician practices harness technology’s power. Whether updating infrastructure, enhancing current digital tools, or streamlining workflows, the right approach starts with what the practice needs, not with what a vendor wants to sell.

## Start with an inventory

A technology inventory analysis evaluates the long-term cost-effectiveness of implementing new infrastructure versus optimizing the existing setup. Most practices already own more capability than they use.

## Three outcomes to design for

- Modernize digital infrastructure
- Enhance patient communication and experience
- Optimize workflow efficiency

## Strategy before tools

With the correct approach, digital transformation can elevate a practice’s return on investment and success. That approach is a plan for how technology meets your objectives, chosen deliberately, and dedicated to seamless technology in daily work.`,
  },
  {
    slug: 'enterprise-stabilization-under-regulatory-oversight',
    title: 'Engagement: enterprise stabilization and CMP replacement strategy',
    category: 'Case Studies',
    excerpt:
      'As VP Clinical Systems Operations at Trillium Health Resources: 40+ cross-functional stakeholders, a $5M+ vendor portfolio, and 60,000+ members under regulatory oversight.',
    date: '2026-05-12',
    tags: ['Managed Care', 'Clinical Systems', 'Case Study'],
    body: `Trillium Health Resources engaged Lucas Health Tech in a VP Clinical Systems Operations role for enterprise stabilization and a care management platform (CMP) replacement strategy under regulatory oversight.

## Scale of the engagement

- 40+ cross-functional stakeholders
- $5M+ vendor portfolio
- 60,000+ members

## The approach

Executive operating leadership aligned clinical operations with technical and regulatory requirements across the stakeholder base and vendor portfolio, producing a stabilization program and a replacement strategy for the care management platform.`,
  },
]

export const insightCategories: InsightCategory[] = [
  'Industry Insights',
  'Healthcare Technology',
  'Articles',
  'Case Studies',
  'News',
  'Research',
]
