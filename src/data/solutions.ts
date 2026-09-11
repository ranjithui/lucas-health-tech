export type WorkflowStep = { label: string; detail: string }

export type Audience = 'provider' | 'venture' | 'partner'

export interface Solution {
  id: string
  index: string
  title: string
  kicker: string
  summary: string
  description: string
  capabilities: string[]
  workflow: WorkflowStep[]
  technologies: string[]
  audiences: Audience[]
  proof?: string
}

export const audiences: { id: Audience; label: string; description: string }[] = [
  {
    id: 'provider',
    label: 'Healthcare Provider',
    description: 'Health systems, physician practices, and specialty networks.',
  },
  {
    id: 'venture',
    label: 'Health Tech Venture',
    description: 'Digital health companies building clinical platforms and SaMD.',
  },
  {
    id: 'partner',
    label: 'Technology Partner',
    description: 'Consultancies, vendors, and enterprise data teams.',
  },
]

export const solutions: Solution[] = [
  {
    id: 'clinical-platform-architecture',
    index: '01',
    title: 'Clinical Platform Architecture',
    kicker: 'FHIR-Native Platforms • SaMD Pathways • Enterprise Governance',
    summary:
      'Architecture of clinical governance platforms and platform modernization addressing clinical workflows, regulatory requirements, and enterprise scale.',
    description:
      'We architect clinical governance platforms and lead platform modernization where clinical workflows, regulatory requirements, and enterprise scale intersect. The focus is FHIR-native design, HL7 interoperability, and SaMD regulatory positioning.',
    capabilities: [
      'FHIR-native platform design',
      'HL7 interoperability',
      'SaMD regulatory positioning',
      'Clinical governance platforms',
      'Platform modernization',
      'Enterprise governance',
    ],
    workflow: [
      { label: 'Clinical workflows', detail: 'Map how care is delivered before designing the system.' },
      { label: 'Regulatory requirements', detail: 'Position SaMD pathways and governance early.' },
      { label: 'FHIR-native architecture', detail: 'Interoperable by design with HL7 and FHIR.' },
      { label: 'Enterprise scale', detail: 'Governance that holds across sites and vendors.' },
    ],
    technologies: ['FHIR', 'HL7', 'SaMD', 'ePRO'],
    audiences: ['venture', 'provider'],
    proof: 'Founding Chief Technology Architect for a FHIR-native oncology governance platform (LORiMDT).',
  },
  {
    id: 'executive-operating-roles',
    index: '02',
    title: 'Executive Operating Roles',
    kicker: 'Fractional & Standing CTO • COO • VP Clinical Systems',
    summary: 'CTO, COO, and VP-level roles for health tech ventures and enterprise health systems.',
    description:
      'Fractional and standing CTO, COO, and VP Clinical Systems roles for health tech ventures and enterprise health systems. Enterprise product strategy, multi-site clinical operations, executive governance alignment, and leadership that bridges clinical teams with technical architecture and board-level strategy.',
    capabilities: [
      'Fractional & standing CTO',
      'Fractional & standing COO',
      'VP Clinical Systems',
      'Enterprise product strategy',
      'Multi-site clinical operations',
      'Executive governance alignment',
    ],
    workflow: [
      { label: 'Board-level strategy', detail: 'Align executive governance and product direction.' },
      { label: 'Technical architecture', detail: 'Translate strategy into platform decisions.' },
      { label: 'Clinical teams', detail: 'Bridge the people delivering care and the systems they use.' },
      { label: 'Multi-site operations', detail: 'Run clinical operations at enterprise scale.' },
    ],
    technologies: ['Epic', 'Oracle Health', 'Enterprise Governance'],
    audiences: ['venture', 'provider'],
    proof:
      'VP Clinical Systems Operations at Trillium Health Resources: 40+ stakeholders, $5M+ vendor portfolio, 60,000+ members.',
  },
  {
    id: 'ai-automation-strategy',
    index: '03',
    title: 'AI & Automation Strategy',
    kicker: 'RPA • API Orchestration • Predictive Models • Centers of Excellence',
    summary:
      'AI-driven automation embedded in clinical workflows, with Automation Centers of Excellence and enterprise investment models.',
    description:
      'AI-driven automation embedded in clinical workflows. We design Automation Centers of Excellence, build enterprise automation investment models, and deliver production automations across Epic, Oracle Health, payer portals, and specialty networks.',
    capabilities: [
      'Robotic Process Automation (RPA)',
      'API orchestration',
      'Predictive models',
      'Automation Centers of Excellence',
      'Enterprise automation investment models',
      'Production automations in Epic & Oracle Health',
    ],
    workflow: [
      { label: 'Identify use cases', detail: 'Find automation candidates with meaningful impact.' },
      { label: 'Design the CoE', detail: 'Governance, investment model, and operating cadence.' },
      { label: 'Build & orchestrate', detail: 'RPA, API orchestration, and predictive models.' },
      { label: 'Quantify ROI', detail: 'Transactions aligned to quantified return.' },
    ],
    technologies: ['RPA', 'API Orchestration', 'Predictive Models', 'Epic', 'Oracle Health', 'Payer Portals'],
    audiences: ['provider', 'partner', 'venture'],
    proof: '200+ production automations delivered. 2.1M+ annual transactions aligned to quantified ROI.',
  },
  {
    id: 'digital-transformation',
    index: '04',
    title: 'Digital Innovation & Transformation',
    kicker: 'Infrastructure Modernization • Patient Experience • Workflow Efficiency',
    summary: 'Align technology with your practice’s business needs for operational transformation.',
    description:
      'We help physician practices harness the power of technology. Our experts identify and implement solutions tailored to your needs, whether updating infrastructure, enhancing current digital tools, or streamlining workflows. Technology should work for you, making your work life easier, not more difficult.',
    capabilities: [
      'Modernize digital infrastructure',
      'Enhance patient communication and experience',
      'Optimize workflow efficiency',
      'Technology inventory analysis',
      'Long-term cost-effectiveness evaluation',
      'Dedicated to seamless technology',
    ],
    workflow: [
      { label: 'Technology inventory', detail: 'Evaluate what you have and what it costs long term.' },
      { label: 'Strategy', detail: 'Plan how technology meets your objectives.' },
      { label: 'Implement', detail: 'Update infrastructure or enhance existing tools.' },
      { label: 'Streamline', detail: 'Workflows that make work life easier.' },
    ],
    technologies: ['Digital Infrastructure', 'Patient Communication', 'Workflow Design'],
    audiences: ['provider'],
  },
]

export const rpaBenefits = [
  'Accelerate digital transformation',
  'Achieve operational efficiency goals',
  'Reduce labor, operations, and software costs rapidly',
  'Enhance workflow accuracy and strengthen compliance',
  'Boost worker productivity with personal robotic assistants',
  'Grow profits by automating administrative tasks',
]
