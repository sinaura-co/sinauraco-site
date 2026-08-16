import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How Sinaura Collectives LLC collects, uses, and safeguards your personal information — including SMS communication consent, data retention, and your privacy rights.',
  path: '/privacy',
})

// Ported VERBATIM from the live site (legacy/privacy.html). Legal copy is not
// rewritten — the SMS & Communication Consent section especially is reproduced
// word for word. Text carrying " / & / ' is written as JS-string expressions so
// the glyphs stay identical to the source and Next's lint still passes.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy" accent="Policy" updated="August 19, 2025">
      <h2>1. Introduction</h2>
      <p>
        {'Sinaura Collectives LLC ("Sinaura Collectives," "we," "our," or "us") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit sinauraco.com or use our services.'}
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <p>
        <strong>Personal Information:</strong>
      </p>
      <ul>
        <li>Name</li>
        <li>Email address</li>
        <li>Phone number</li>
        <li>Social media handles</li>
        <li>Billing or payment-related information</li>
      </ul>
      <p>
        <strong>Usage Data:</strong>
      </p>
      <ul>
        <li>IP address</li>
        <li>Browser type</li>
        <li>Device information</li>
        <li>Pages visited and interaction data</li>
      </ul>
      <p>
        <strong>Communication Data:</strong>
      </p>
      <ul>
        <li>Messages you send to us</li>
        <li>Responses to campaigns or outreach</li>
        <li>Opt-in records for SMS/email communications</li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>We use your information to:</p>
      <ul>
        <li>Provide and manage our services</li>
        <li>Communicate with you (including SMS, email, and support messages)</li>
        <li>Send updates, promotions, and service-related notifications</li>
        <li>Improve our website, services, and user experience</li>
        <li>Maintain records of consent and compliance</li>
      </ul>

      <h2>{'4. SMS & Communication Consent'}</h2>
      <p>
        By providing your phone number and opting in through our website or services, you consent to
        receive SMS messages from Sinaura Collectives.
      </p>
      <p>
        These messages may include: service updates, account notifications, promotional messages,
        and customer support communications.
      </p>
      <p>Message frequency may vary. Message and data rates may apply.</p>
      <p>
        You can opt out at any time by replying <strong>STOP</strong>. For assistance, reply{' '}
        <strong>HELP</strong> or contact us at contact@sinauraco.com.
      </p>
      <p>
        <strong>Important:</strong> SMS opt-in consent and phone numbers collected for SMS purposes
        will NOT be shared, sold, or disclosed to third parties for marketing purposes.
      </p>

      <h2>5. How We Share Information</h2>
      <p>We do not sell your personal information.</p>
      <p>We may share information only in the following situations:</p>
      <ul>
        <li>
          With service providers who help operate our business (e.g., payment processors,
          communication platforms)
        </li>
        <li>To comply with legal obligations</li>
        <li>To protect our rights, users, or business</li>
      </ul>
      <p>
        All third parties are required to maintain the confidentiality and security of your
        information.
      </p>

      <h2>6. Data Retention</h2>
      <p>
        We retain your information only as long as necessary to provide services, comply with legal
        obligations, and maintain records of consent and transactions.
      </p>

      <h2>7. Data Security</h2>
      <p>
        We implement reasonable administrative, technical, and physical safeguards to protect your
        information. However, no system is completely secure, and we cannot guarantee absolute
        security.
      </p>

      <h2>8. Your Rights</h2>
      <p>
        Depending on your location, you may have the right to access your personal data, request
        corrections, request deletion of your data, and withdraw consent at any time.
      </p>
      <p>
        To exercise these rights, contact us at{' '}
        <a href="mailto:contact@sinauraco.com">contact@sinauraco.com</a>.
      </p>

      <h2>9. Third-Party Links</h2>
      <p>
        Our website may contain links to third-party websites. We are not responsible for their
        privacy practices.
      </p>

      <h2>{"10. Children's Privacy"}</h2>
      <p>
        Our services are not intended for individuals under the age of 18. We do not knowingly
        collect information from minors.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        {'We may update this Privacy Policy at any time. Updates will be posted on this page with a revised "Last Updated" date.'}
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, contact us at:
        <br />
        <a href="mailto:contact@sinauraco.com">contact@sinauraco.com</a>
      </p>
    </LegalPage>
  )
}
