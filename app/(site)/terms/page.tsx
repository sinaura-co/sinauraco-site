import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'
import { pageMetadata } from '@/lib/seo/metadata'

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Service',
  description:
    'The terms governing use of sinauraco.com and Sinaura Collectives LLC services — eligibility, payments, liability, governing law, and messaging/opt-in consent policy.',
  path: '/terms',
})

// Ported VERBATIM from the live site (legacy/terms.html). Legal copy is not
// rewritten — the §14 messaging/opt-in and Proof-of-Consent blocks especially
// are reproduced word for word, including the source's h3 heading levels for
// that section. Text carrying " / & is written as JS-string expressions so the
// glyphs stay identical to the source and Next's lint still passes.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of" accent="Service" updated="August 19, 2025">
      <h2>1. Acceptance of Terms</h2>
      <p>By using sinauraco.com or our services, you agree to these Terms.</p>

      <h2>2. Services</h2>
      <p>
        Sinaura Collectives provides creator management, marketing, and consulting services. We may
        modify or discontinue services at any time.
      </p>

      <h2>3. Eligibility</h2>
      <p>You must be at least 18 and legally able to enter into these Terms.</p>

      <h2>4. User Responsibilities</h2>
      <p>You agree to:</p>
      <ul>
        <li>Provide accurate information</li>
        <li>Comply with applicable laws</li>
        <li>Not misuse the site/services (e.g., hacking, scraping, fraud)</li>
      </ul>

      <h2>{'5. Payments & Refunds'}</h2>
      <p>
        Payment terms are set out in your proposal/contract. Refunds/cancellations follow our Refund
        &amp; Cancellation Policy.
      </p>

      <h2>6. Intellectual Property</h2>
      <p>
        All website content (text, graphics, logos, media) is owned by Sinaura Collectives LLC or
        its licensors. You may not reproduce or create derivative works without written consent.
      </p>

      <h2>7. Disclaimers</h2>
      <p>
        {'Services are provided "as is." We do not guarantee specific outcomes (e.g., growth, revenue). To the maximum extent permitted by law, we disclaim warranties of any kind.'}
      </p>

      <h2>8. Limitation of Liability</h2>
      <p>
        To the maximum extent permitted by law, Sinaura Collectives&apos; total liability for any
        claim will not exceed the amounts paid to Sinaura Collectives in the 12 months preceding the
        claim.
      </p>

      <h2>9. Indemnity</h2>
      <p>
        You agree to indemnify and hold Sinaura Collectives harmless from claims arising from your
        misuse of the site/services or breach of these Terms.
      </p>

      <h2>10. Termination</h2>
      <p>We may suspend or terminate access for any breach of these Terms.</p>

      <h2>{'11. Governing Law & Dispute Resolution'}</h2>
      <p>
        These Terms are governed by the laws of the State of New Jersey, without regard to conflicts
        of law. Disputes will be resolved via good-faith negotiation, then binding arbitration in
        New Jersey if unresolved.
      </p>

      <h2>12. Changes</h2>
      <p>We may update these Terms; continued use constitutes acceptance.</p>

      <h2>13. Contact</h2>
      <p>
        Support and legal notices: <a href="mailto:contact@sinauraco.com">contact@sinauraco.com</a>
      </p>

      <h3>14. Messaging Consent, Opt-In, and Communications Policy</h3>
      <p>
        By providing your phone number or contact information and engaging with Sinaura Collectives
        through our website, forms, or services, you expressly consent to receive communications
        from Sinaura Collectives, including but not limited to SMS (text messages), email, and other
        electronic communications.
      </p>
      <p>
        <strong>Opt-In Consent:</strong> Consent to receive messages is obtained directly from the
        consumer through clear and affirmative actions, which may include submitting a form,
        checking an opt-in box, or otherwise providing explicit agreement to receive communications.
        Consent is not a condition of purchase.
      </p>
      <p>
        <strong>{'Message Types & Frequency:'}</strong> Messages may include service updates, account
        notifications, promotional content, and customer support communications. Message frequency
        may vary depending on user interaction and service usage.
      </p>
      <p>
        <strong>{'Message & Data Rates:'}</strong> Message and data rates may apply based on your
        mobile carrier and plan.
      </p>
      <p>
        <strong>Opt-Out Instructions:</strong> You may opt out of receiving SMS messages at any time
        by replying STOP to any message. After doing so, you will no longer receive SMS
        communications from us unless you re-subscribe.
      </p>
      <p>
        <strong>Help Instructions:</strong> For assistance, reply HELP to any message or contact us
        at <a href="mailto:contact@sinauraco.com">contact@sinauraco.com</a>.
      </p>

      <h3>Proof of Consent (Opt-In Records)</h3>
      <p>
        {'We maintain verifiable records of consumer consent ("opt-in") for all individuals who receive communications from us. Such consent may be collected directly by us or through authorized third-party platforms acting on our behalf.'}
      </p>
      <p>
        As proof of consent, we may provide documentation demonstrating the opt-in process,
        including but not limited to:
      </p>
      <ul>
        <li>Screenshots or image files of the opt-in submission</li>
        <li>Hosted web pages or consent forms where opt-in was completed</li>
        <li>Time-stamped records of consent</li>
        <li>Links to publicly accessible pages describing the opt-in process</li>
      </ul>
      <p>
        Any URLs submitted as evidence of consent will be reachable, resolvable, publicly accessible
        without restriction, and sufficient to demonstrate clear and informed consumer consent.
        Multiple sources may be provided to establish a complete record of consent.
      </p>

      <h3>Consumer Responsibility</h3>
      <p>By providing your contact information, you confirm that:</p>
      <ul>
        <li>You are the authorized user of the phone number provided</li>
        <li>You consent to receive communications as described above</li>
        <li>You understand you can opt out at any time</li>
      </ul>
    </LegalPage>
  )
}
