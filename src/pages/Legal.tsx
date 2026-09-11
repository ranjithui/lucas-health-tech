import { Seo } from '../components/seo/Seo'
import { Section } from '../components/ui/Primitives'
import { company } from '../data/company'

/**
 * Legal pages summarise the policies published on lucashealthtech.com
 * (effective January 1, 2026). Replace with the client's full legal text before launch.
 */
export function PrivacyPolicy() {
  return (
    <>
      <Seo title="Privacy Policy" description="How Lucas Health Tech, Inc. collects, uses, and protects information on this website." noIndex />
      <LegalShell title="Privacy Policy" effective="Effective January 1, 2026">
        <p>
          {company.legalName}, and its subsidiaries, are dedicated to safeguarding your online privacy. This policy explains how information you provide on this website is collected, used, and protected.
        </p>
        <h2>Information we collect</h2>
        <p>
          Visitors may voluntarily provide details such as name, title, company, and email address to use specific features of the website, including the contact form. We do not gather information such as age, gender, or financial details.
        </p>
        <h2>How we use information</h2>
        <p>
          Collected information helps us operate and improve the website, understand how it is used, and respond to enquiries. Personal information may be used to contact you, enforce agreements, and comply with applicable laws.
        </p>
        <h2>Sharing</h2>
        <p>
          Information may be disclosed to Lucas Health Tech subsidiaries and to external parties who perform services on our behalf, such as data analysis, marketing support, and legal compliance. We do not sell your information to marketing lists.
        </p>
        <h2>Cookies and tracking technologies</h2>
        <p>
          The website may use cookies, IP logging, pixel tags, and web beacons to monitor usage patterns. You may adjust your browser settings to manage cookie preferences. The website assistant runs entirely in your browser and does not transmit what you type.
        </p>
        <h2>Your rights</h2>
        <p>
          You may review or correct your information, request that we do not contact you, ask to be removed from solicitation lists, or request deletion by contacting us at {company.phone}.
        </p>
        <h2>Data location</h2>
        <p>Information is transferred to and processed on servers in the United States, where the company operates.</p>
        <h2>Changes</h2>
        <p>We may update this policy from time to time. The updated privacy policy takes effect immediately upon posting, and the revision date will be updated accordingly.</p>
      </LegalShell>
    </>
  )
}

export function Terms() {
  return (
    <>
      <Seo title="Terms & Conditions" description="Terms and conditions governing use of the Lucas Health Tech website." noIndex />
      <LegalShell title="Terms & Conditions" effective="Effective January 1, 2026">
        <h2>1. Terms</h2>
        <p>By accessing this website you agree to be bound by these terms and conditions and to comply with all applicable laws and regulations.</p>
        <h2>2. Use license</h2>
        <p>
          Permission is granted to temporarily view the materials on this website for personal, non-commercial use only. You may not modify or copy the materials, use them for any commercial purpose, attempt to reverse engineer any software on the website, remove any copyright or proprietary notations, or mirror the materials on any other server.
        </p>
        <h2>3. Disclaimer</h2>
        <p>The materials on this website are provided “as is”. {company.name} makes no warranties, expressed or implied, regarding accuracy, merchantability, or fitness for a particular purpose.</p>
        <h2>4. Limitations</h2>
        <p>{company.name} shall not be liable for any damages arising out of the use of, or inability to use, the materials on this website, even if notified of the possibility of such damage.</p>
        <h2>5. Accuracy of materials</h2>
        <p>The materials on this website may include technical, typographical, or photographic errors. {company.name} does not commit to updating the materials.</p>
        <h2>6. Links</h2>
        <p>{company.name} is not responsible for the contents of any linked site and does not endorse linked sites.</p>
        <h2>7. Modifications</h2>
        <p>These terms may be revised at any time without notice. By using this website you agree to be bound by the current version.</p>
        <h2>8. Governing law</h2>
        <p>These terms are governed by the laws of the State of Texas, and you submit to the exclusive jurisdiction of the courts in that state.</p>
      </LegalShell>
    </>
  )
}

function LegalShell({ title, effective, children }: { title: string; effective: string; children: React.ReactNode }) {
  return (
    <Section className="pt-36 md:pt-44">
      <div className="container-x max-w-3xl">
        <span className="eyebrow">{effective}</span>
        <h1 className="display-lg mt-4 text-text">{title}</h1>
        <div className="prose-lht mt-10">{children}</div>
      </div>
    </Section>
  )
}
