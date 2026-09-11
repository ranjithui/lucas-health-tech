export interface EcosystemNode {
  id: string
  label: string
  short: string
  description: string
  capabilities: string[]
  x: number
  y: number
}

/** Ecosystem map: only capabilities supported by the published website. */
export const ecosystemNodes: EcosystemNode[] = [
  {
    id: 'patients',
    label: 'Patients',
    short: 'Where care and data begin',
    description:
      'Patient communication, experience, and electronic patient-reported outcomes (ePRO) feed the clinical platform.',
    capabilities: ['Patient communication & experience', 'ePRO integration strategy', 'Privacy-first personalization'],
    x: 8,
    y: 50,
  },
  {
    id: 'providers',
    label: 'Providers',
    short: 'Clinical teams and workflows',
    description:
      'Health systems, physician practices, and specialty networks whose clinical workflows shape every platform decision.',
    capabilities: ['Clinical workflow design', 'Multi-site clinical operations', 'Clinically trained staff focus on meaningful work'],
    x: 26,
    y: 22,
  },
  {
    id: 'technology',
    label: 'Technology',
    short: 'FHIR-native platforms',
    description:
      'FHIR-native platforms, HL7 interoperability, and SaMD pathways connecting Epic, Oracle Health, payer portals, and specialty networks.',
    capabilities: ['FHIR-native architecture', 'HL7 interoperability', 'SaMD regulatory positioning', 'Epic & Oracle Health'],
    x: 44,
    y: 70,
  },
  {
    id: 'data',
    label: 'Data',
    short: 'Enterprise data products',
    description:
      'Enterprise data products, consent modernization, and predictive models built on interoperable clinical data.',
    capabilities: ['Enterprise data products', 'Consent modernization', 'Predictive models', 'AWS-based architecture'],
    x: 62,
    y: 26,
  },
  {
    id: 'operations',
    label: 'Operations',
    short: 'Automation and governance',
    description:
      'Automation Centers of Excellence, RPA, and API orchestration embedded in clinical workflows under executive governance.',
    capabilities: ['RPA & API orchestration', 'Automation Centers of Excellence', 'Executive governance alignment', 'Vendor portfolio governance'],
    x: 78,
    y: 64,
  },
  {
    id: 'outcomes',
    label: 'Outcomes',
    short: 'Quantified ROI',
    description:
      'Production automations and transactions aligned to quantified ROI; platforms that hold at enterprise scale.',
    capabilities: ['200+ production automations', '2.1M+ annual transactions', 'Quantified ROI'],
    x: 94,
    y: 38,
  },
]

export const ecosystemLinks: [string, string][] = [
  ['patients', 'providers'],
  ['patients', 'technology'],
  ['providers', 'technology'],
  ['providers', 'data'],
  ['technology', 'data'],
  ['technology', 'operations'],
  ['data', 'operations'],
  ['data', 'outcomes'],
  ['operations', 'outcomes'],
]

export interface PipelineStage {
  id: string
  label: string
  title: string
  description: string
  signals: string[]
}

/** DATA → PROCESSING → INTELLIGENCE → INSIGHT → ACTION, grounded in published services. */
export const intelligencePipeline: PipelineStage[] = [
  {
    id: 'data',
    label: 'Data',
    title: 'Interoperable clinical data',
    description: 'FHIR-native platforms and HL7 interoperability make clinical data usable across Epic, Oracle Health, payer portals, and specialty networks.',
    signals: ['FHIR', 'HL7', 'ePRO'],
  },
  {
    id: 'processing',
    label: 'Processing',
    title: 'Orchestration and automation',
    description: 'API orchestration and RPA digital workers move and process transactions inside clinical workflows.',
    signals: ['API orchestration', 'RPA', 'Payer portals'],
  },
  {
    id: 'intelligence',
    label: 'Intelligence',
    title: 'Predictive models',
    description: 'Predictive models embedded where they add decision value, governed through an Automation Center of Excellence.',
    signals: ['Predictive models', 'Automation CoE'],
  },
  {
    id: 'insight',
    label: 'Insight',
    title: 'Quantified ROI',
    description: 'Enterprise automation investment models align every transaction to quantified return.',
    signals: ['Investment models', '2.1M+ transactions'],
  },
  {
    id: 'action',
    label: 'Action',
    title: 'Production at scale',
    description: '200+ production automations delivered, letting clinically trained staff focus on more meaningful work.',
    signals: ['200+ automations', 'Epic', 'Oracle Health'],
  },
]
