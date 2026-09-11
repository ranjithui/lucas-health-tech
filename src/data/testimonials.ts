export interface Testimonial {
  id: string
  name: string
  title: string
  headline?: string
  quote: string
}

/** Executive references and endorsements published on lucashealthtech.com. */
export const testimonials: Testimonial[] = [
  {
    id: 'lake',
    name: 'Patrick Lake',
    title: 'Clinical Applications Manager, University Hospitals of Cleveland',
    headline: 'An asset to any organization',
    quote: 'She excels in patience and attention to detail, with valuable leadership and application knowledge.',
  },
  {
    id: 'marx',
    name: 'Edward Marx',
    title: 'Former CIO, Cleveland Clinic & University Hospitals of Cleveland; CEO, Marx Advisory',
    headline: 'Superior clinical ops leader',
    quote: 'She had command of technical skills and was a strong communicator; peers and customers loved her.',
  },
  {
    id: 'neu',
    name: 'Michael Neu, PMP',
    title: 'Senior Information Services Project Manager, UW Health',
    headline: 'The right people',
    quote: 'Her approach to AI was thoughtful and professional, keeping projects aligned through effective communication.',
  },
  {
    id: 'maduskar',
    name: 'Tejus Maduskar',
    title: 'Sr. Director, Healthcare Programs & Projects',
    quote:
      'She brings solid understanding of the healthcare business (payer and provider) and was instrumental in helping clients identify automation use cases with meaningful impact.',
  },
  {
    id: 'whiteside',
    name: 'Bryan Whiteside',
    title: 'Sr. Director, Healthcare Programs & Projects',
    quote:
      'Consultants demonstrate knowledge, professionalism, and dependability, consistently exceeding customer expectations on multiple projects.',
  },
  {
    id: 'arguello',
    name: 'Sofia Arguello',
    title: 'Premier Account Director, Healthcare IT Leaders',
    quote:
      'I have had the pleasure of working with LHT’s CEO on RPA healthcare projects and I can confidently say that she has exceptional knowledge in this field. Her technical skills and ability to analyze complex digital healthcare processes and workflows have been essential to our team.',
  },
  {
    id: 'kangas',
    name: 'Erik Kangas',
    title: 'Founder & CTO, LuxSci',
    quote:
      'I would highly recommend LHT for any digital project in which attention to detail, communication and business development were key to the company’s success.',
  },
  {
    id: 'patel',
    name: 'Rajshree Patel',
    title: 'Sr. Data Scientist',
    quote:
      'She demonstrated exceptional delivery leadership, consistently exceeding expectations and delivering outstanding results. Her clear and concise communication skills enable effective collaboration and ensure that all stakeholders are well-informed.',
  },
]
