/**
 * Source of truth: lucashealthtech.com (root page, Intelligent Automation and
 * Digital Innovation pages, privacy policy). Nothing here is invented.
 * Merge the client report here when it is supplied.
 */
export const company = {
  name: 'Lucas Health Tech',
  shortName: 'LHT',
  legalName: 'Lucas Health Tech, Inc.',
  url: 'https://lucashealthtech.com',
  tagline: 'Clinical Systems Architecture & Executive Operations for Healthcare',
  motto: 'Clinical depth. Technical architecture. Executive operations.',
  positioning:
    'Fractional & Standing CTO/COO • Platform Strategy • AI & Automation • Clinical Governance',
  phone: '(440) 343-0399',
  phoneHref: 'tel:+14403430399',
  location: 'Concord, OH 44077, United States',
  locationShort: 'Concord, Ohio',
  mapsHref: 'https://www.google.com/maps/search/?api=1&query=Concord%2C+OH+44077',
  hours: 'Mon–Fri, 9:00am–5:00pm (ET)',
  linkedin: 'https://www.linkedin.com/in/casi-vician/',
} as const

export const founder = {
  name: 'Casi Vician Ischay',
  role: 'CEO & Founder',
  credentials: ['Former Clinician', 'Board Director, Signature Health'],
  summary:
    'Fractional and standing CTO/COO for health tech ventures and enterprise health systems.',
  quote:
    'Healthcare organizations struggle when clinical systems are fragmented, misaligned, or poorly governed — and when technical leadership doesn’t understand clinical reality. I architect platforms and lead operations where clinical workflows, regulatory requirements, and enterprise scale intersect.',
  linkedin: 'https://www.linkedin.com/in/casi-vician/',
} as const

/** Verified numbers published on lucashealthtech.com */
export const metrics = [
  {
    value: 200,
    suffix: '+',
    label: 'Production automations delivered',
    detail: 'Across Epic, Oracle Health, payer portals, and specialty networks.',
  },
  {
    value: 2.1,
    suffix: 'M+',
    decimals: 1,
    label: 'Annual transactions',
    detail: 'Aligned to quantified ROI.',
  },
  {
    value: 20,
    suffix: '+',
    label: 'Years of healthcare expertise',
    detail: 'Consultants with clinical degrees.',
  },
  {
    value: 60000,
    suffix: '+',
    label: 'Members served',
    detail: 'Enterprise stabilization engagement at Trillium Health Resources.',
  },
] as const

export const differentiators = [
  {
    step: '01',
    title: 'Clinical depth',
    body:
      'Leadership by a former clinician. Consultants armed with clinical degrees who understand how care is actually delivered.',
  },
  {
    step: '02',
    title: 'Technical architecture',
    body:
      'FHIR-native design, HL7 interoperability, and SaMD regulatory positioning, built for clinical workflows and enterprise scale.',
  },
  {
    step: '03',
    title: 'Executive operations',
    body:
      'CTO, COO, and VP-level operating roles that bridge clinical teams, technical architecture, and board-level strategy.',
  },
  {
    step: '04',
    title: 'Automation at scale',
    body:
      '200+ production automations and 2.1M+ annual transactions aligned to quantified ROI across Epic, Oracle Health, payer portals, and specialty networks.',
  },
  {
    step: '05',
    title: 'Personal attention',
    body:
      'Personal IT, marketing, and business attention rather than ticket-based support. Over 20 years of healthcare expertise.',
  },
] as const

export const technologies = [
  'FHIR',
  'HL7',
  'SaMD',
  'Epic',
  'Oracle Health',
  'ePRO',
  'RPA',
  'API Orchestration',
  'Predictive Models',
  'AWS',
  'Payer Portals',
  'Specialty Networks',
] as const
