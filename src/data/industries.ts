export interface Industry {
  id: string
  title: string
  description: string
  needs: string[]
  solutionIds: string[]
  evidence: string
}

/** Segments that appear in the company's published services, engagements, and references. */
export const industries: Industry[] = [
  {
    id: 'health-systems',
    title: 'Enterprise Health Systems',
    description:
      'Multi-site clinical operations, platform modernization, and executive governance for enterprise health systems.',
    needs: [
      'Platform modernization',
      'Multi-site clinical operations',
      'Executive governance alignment',
      'Production automation across Epic and Oracle Health',
    ],
    solutionIds: ['executive-operating-roles', 'clinical-platform-architecture', 'ai-automation-strategy'],
    evidence: 'References from leaders at University Hospitals of Cleveland, Cleveland Clinic, and UW Health.',
  },
  {
    id: 'health-tech-ventures',
    title: 'Health Tech Ventures',
    description:
      'Founding-level technical architecture, SaMD regulatory positioning, and fractional CTO/COO leadership for digital health companies.',
    needs: ['FHIR-native platform design', 'SaMD pathways', 'Product roadmap', 'Fractional CTO / COO'],
    solutionIds: ['clinical-platform-architecture', 'executive-operating-roles'],
    evidence: 'Founding Chief Technology Architect for LORiMDT.',
  },
  {
    id: 'managed-care',
    title: 'Managed Care & Payers',
    description:
      'Enterprise stabilization, care management platform strategy, and payer-portal automation under regulatory oversight.',
    needs: [
      'Care management platform strategy',
      'Vendor portfolio governance',
      'Payer portal automation',
      'Regulatory oversight',
    ],
    solutionIds: ['executive-operating-roles', 'ai-automation-strategy'],
    evidence: 'VP Clinical Systems Operations at Trillium Health Resources, serving 60,000+ members.',
  },
  {
    id: 'physician-practices',
    title: 'Physician Practices & Specialty Networks',
    description:
      'Digital transformation, workflow efficiency, and RPA that lets clinically trained staff focus on meaningful work.',
    needs: [
      'Digital infrastructure modernization',
      'Patient communication and experience',
      'Workflow efficiency',
      'Administrative task automation',
    ],
    solutionIds: ['digital-transformation', 'ai-automation-strategy'],
    evidence:
      'Assisting physicians and their practices in achieving substantial savings through faster and more efficient digital care.',
  },
  {
    id: 'life-sciences',
    title: 'Pharmaceutical & Life Sciences',
    description:
      'Enterprise data products, consent modernization, and privacy-first personalization at national scale.',
    needs: ['Enterprise data products', 'Consent modernization', 'Privacy-first personalization', 'AWS-based architecture'],
    solutionIds: ['clinical-platform-architecture', 'ai-automation-strategy'],
    evidence: 'Principal Digital Consultant for Eli Lilly.',
  },
]
