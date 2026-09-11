export interface Engagement {
  id: string
  client: string
  role: string
  sector: string
  headline: string
  challenge: string
  approach: string
  technology: string[]
  solution: string
  outcome: string
  facts: { value: string; label: string }[]
  note?: string
}

/** "Select Engagements" as published on lucashealthtech.com. No results are invented. */
export const engagements: Engagement[] = [
  {
    id: 'lorimdt',
    client: 'LORiMDT',
    role: 'Founding Chief Technology Architect',
    sector: 'Oncology • Nonprofit',
    headline: 'A FHIR-native clinical governance platform for complex oncology care.',
    challenge:
      'Complex oncology care requires coordinated, governed clinical decision-making across teams, with patient-reported outcomes and regulatory considerations built in from the start.',
    approach:
      'Founding technical leadership: defining the technical architecture, product roadmap, ePRO integration strategy, and regulatory positioning.',
    technology: ['FHIR', 'ePRO', 'Clinical Governance', 'Regulatory Positioning'],
    solution: 'A FHIR-native clinical governance platform designed for complex oncology care.',
    outcome:
      'Technical architecture, product roadmap, ePRO integration strategy, and regulatory positioning established for the platform.',
    facts: [
      { value: 'FHIR', label: 'Native architecture' },
      { value: 'ePRO', label: 'Integration strategy' },
    ],
    note: 'Hope for Liver Cancer Foundation (501c3).',
  },
  {
    id: 'trillium',
    client: 'Trillium Health Resources',
    role: 'VP Clinical Systems Operations',
    sector: 'Managed Care • Enterprise Health',
    headline: 'Enterprise stabilization and CMP replacement strategy under regulatory oversight.',
    challenge:
      'An enterprise operating under regulatory oversight needed stabilization and a replacement strategy for its care management platform, across a large vendor portfolio and stakeholder base.',
    approach:
      'Executive operating leadership across 40+ cross-functional stakeholders and a $5M+ vendor portfolio, aligning clinical operations with technical and regulatory requirements.',
    technology: ['Clinical Systems Operations', 'Vendor Governance', 'Care Management Platform'],
    solution: 'Enterprise stabilization program and a care management platform (CMP) replacement strategy.',
    outcome: 'Stabilization and replacement strategy delivered under regulatory oversight, serving 60,000+ members.',
    facts: [
      { value: '40+', label: 'Cross-functional stakeholders' },
      { value: '$5M+', label: 'Vendor portfolio' },
      { value: '60,000+', label: 'Members' },
    ],
  },
  {
    id: 'eli-lilly',
    client: 'Eli Lilly',
    role: 'Principal Digital Consultant',
    sector: 'Pharmaceutical • Enterprise Data',
    headline: 'Enterprise data product and consent modernization at national scale.',
    challenge:
      'Delivering personalization at national scale while modernizing consent and keeping privacy first across an enterprise data estate.',
    approach: 'Principal digital consulting on enterprise data product design and consent modernization.',
    technology: ['AWS', 'Enterprise Data Products', 'Consent Management'],
    solution: 'National-scale, privacy-first personalization across an AWS-based architecture.',
    outcome: 'Enterprise data product and consent modernization delivered on AWS-based architecture.',
    facts: [
      { value: 'AWS', label: 'Architecture' },
      { value: 'National', label: 'Scale' },
    ],
  },
]
