/**
 * Rule-based website assistant. It answers ONLY from approved company content
 * below and never provides medical diagnosis or advice. No external AI service
 * is called, so no visitor text leaves the browser.
 */
export interface AssistantAnswer {
  id: string
  keywords: string[]
  answer: string
  links?: { label: string; to: string }[]
}

export const medicalKeywords = [
  'diagnos', 'symptom', 'treatment', 'prescri', 'medication', 'dose', 'pain', 'doctor appointment',
  'am i sick', 'should i take', 'cancer treatment', 'my health', 'medical advice', 'emergency',
]

export const assistantAnswers: AssistantAnswer[] = [
  {
    id: 'greeting',
    keywords: ['hello', 'hi ', 'hey', 'good morning', 'good afternoon', 'help me', 'what can you do'],
    answer:
      'Hello. I can explain Lucas Health Tech’s solutions, the industries we serve, our engagements and insights, and how to reach the team. What would you like to know?',
    links: [
      { label: 'Solutions', to: '/solutions' },
      { label: 'Talk to an expert', to: '/contact' },
    ],
  },
  {
    id: 'what',
    keywords: ['what do you do', 'what does lucas', 'who are you', 'about lucas', 'company', 'what is lht', 'services', 'offer'],
    answer:
      'Lucas Health Tech provides clinical systems architecture and executive operations for healthcare: fractional and standing CTO/COO roles, platform strategy, AI and automation, and clinical governance. Clinical depth, technical architecture, executive operations.',
    links: [
      { label: 'Explore solutions', to: '/solutions' },
      { label: 'About the founder', to: '/about' },
    ],
  },
  {
    id: 'architecture',
    keywords: ['fhir', 'hl7', 'samd', 'architecture', 'platform', 'interoperab', 'modernization', 'governance platform'],
    answer:
      'Our Clinical Platform Architecture practice covers FHIR-native platform design, HL7 interoperability, SaMD regulatory positioning, and clinical governance platform modernization at enterprise scale.',
    links: [{ label: 'Clinical Platform Architecture', to: '/solutions#clinical-platform-architecture' }],
  },
  {
    id: 'executive',
    keywords: ['cto', 'coo', 'fractional', 'executive', 'vp clinical', 'leadership', 'interim', 'operating role'],
    answer:
      'We provide fractional and standing CTO, COO, and VP Clinical Systems roles for health tech ventures and enterprise health systems, including enterprise product strategy, multi-site clinical operations, and executive governance alignment.',
    links: [{ label: 'Executive Operating Roles', to: '/solutions#executive-operating-roles' }],
  },
  {
    id: 'automation',
    keywords: ['ai', 'automation', 'rpa', 'robotic', 'predictive', 'orchestration', 'center of excellence', 'coe', 'epic', 'oracle'],
    answer:
      'Our AI & Automation Strategy practice delivers AI-driven automation embedded in clinical workflows: RPA, API orchestration, predictive models, and Automation Centers of Excellence. 200+ production automations delivered and 2.1M+ annual transactions aligned to quantified ROI across Epic, Oracle Health, payer portals, and specialty networks.',
    links: [{ label: 'AI & Automation Strategy', to: '/solutions#ai-automation-strategy' }],
  },
  {
    id: 'practice',
    keywords: ['practice', 'physician', 'digital transformation', 'digital innovation', 'infrastructure', 'workflow'],
    answer:
      'For physician practices, we align technology with business needs: modernizing digital infrastructure, enhancing patient communication and experience, and optimizing workflow efficiency, starting with a technology inventory analysis.',
    links: [{ label: 'Digital Innovation & Transformation', to: '/solutions#digital-transformation' }],
  },
  {
    id: 'industries',
    keywords: ['industr', 'who do you serve', 'clients', 'payer', 'health system', 'venture', 'pharma', 'life science', 'startup'],
    answer:
      'We work with enterprise health systems, health tech ventures, managed care and payers, physician practices and specialty networks, and pharmaceutical and life sciences organizations.',
    links: [{ label: 'Industries', to: '/industries' }],
  },
  {
    id: 'engagements',
    keywords: ['case stud', 'engagement', 'example', 'work you have done', 'portfolio', 'lorimdt', 'trillium', 'lilly', 'results'],
    answer:
      'Select engagements include LORiMDT (Founding Chief Technology Architect for a FHIR-native oncology governance platform), Trillium Health Resources (VP Clinical Systems Operations: 40+ stakeholders, $5M+ vendor portfolio, 60,000+ members), and Eli Lilly (Principal Digital Consultant for enterprise data product and consent modernization on AWS).',
    links: [{ label: 'View engagements', to: '/#engagements' }],
  },
  {
    id: 'founder',
    keywords: ['founder', 'casi', 'ceo', 'who leads', 'team', 'clinician', 'background', 'experience'],
    answer:
      'Lucas Health Tech is led by Casi Vician Ischay, CEO & Founder: a former clinician, Board Director at Signature Health, and fractional and standing CTO/COO for health tech ventures and enterprise health systems. The firm brings over 20 years of healthcare expertise with consultants holding clinical degrees.',
    links: [{ label: 'About', to: '/about' }],
  },
  {
    id: 'contact',
    keywords: ['contact', 'talk', 'call', 'phone', 'email', 'reach', 'meeting', 'consult', 'hire', 'price', 'cost', 'quote', 'engage', 'in touch', 'get started', 'book', 'schedule', 'speak'],
    answer:
      'The fastest way to start is the contact experience: choose what you are looking for and share a few details. You can also call (440) 343-0399, Mon–Fri 9:00am–5:00pm ET. We are based in Concord, Ohio.',
    links: [{ label: 'Talk to an expert', to: '/contact' }],
  },
  {
    id: 'insights',
    keywords: ['insight', 'article', 'blog', 'read', 'learn', 'knowledge', 'research', 'news'],
    answer:
      'The Insights hub has articles on clinical governance, FHIR-native architecture, RPA in healthcare, Automation Centers of Excellence, and our engagement write-ups.',
    links: [{ label: 'Browse insights', to: '/insights' }],
  },
  {
    id: 'location',
    keywords: ['where', 'location', 'based', 'address', 'ohio', 'concord', 'hours', 'open'],
    answer: 'Lucas Health Tech is based in Concord, OH 44077, United States. Hours are Mon–Fri, 9:00am–5:00pm (ET).',
    links: [{ label: 'Contact', to: '/contact' }],
  },
]

export const assistantSuggestions = [
  'What does Lucas Health Tech do?',
  'Tell me about AI & automation',
  'Do you offer fractional CTO roles?',
  'How do I get in touch?',
]

export const assistantFallback =
  'I can only answer questions about Lucas Health Tech’s services, industries, engagements, insights, and how to get in touch. Try one of the suggestions below, or talk to an expert directly.'

export const assistantMedicalRefusal =
  'I’m a website assistant and can’t provide medical diagnosis or medical advice. If you need care, please contact a licensed clinician or, in an emergency, your local emergency services. I can help with questions about Lucas Health Tech’s services.'
