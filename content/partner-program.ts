// Single source of truth for the Partner Program landing page
// (app/partner-program) AND the application API (app/api/partner-applications).
//
// The commission rate is defined ONCE here (COMMISSION_RATE) and referenced
// everywhere — hero trust strip, the Offer section, the worked example, and the
// FAQ. Change the program terms here, never in the markup.
//
// LAUNCH GATE (owner-confirmed): the program is real and being built to launch,
// but every FAQ answer + disclaimer must match the signed Referral Partnership
// Agreement and clear legal review before the page goes PUBLIC. Copy below is the
// owner-approved working draft.

export const SEGMENTS = ['Lifestyle', 'Fitness', 'Fashion', 'Gaming', 'Adult', 'Other'] as const
export type Segment = (typeof SEGMENTS)[number]

const COMMISSION_RATE = 5 // percent — THE single definition
const EXAMPLE_MONTHLY = 20_000 // illustrative creator monthly revenue

export const PROGRAM = {
  name: 'Sinaura Partner Program',
  agreementName: 'Referral Partnership Agreement',
  route: '/partner-program',
  commissionRate: COMMISSION_RATE,
  commissionLabel: `${COMMISSION_RATE}%`,
  // Worked example — the commission is DERIVED from the rate, never hardcoded,
  // so the two can never drift.
  example: {
    monthly: EXAMPLE_MONTHLY,
    commission: (EXAMPLE_MONTHLY * COMMISSION_RATE) / 100,
  },
  segments: SEGMENTS,
  creatorsCountOptions: ['1 creator', '2–5 creators', '5–10 creators', '10+ creators'],
  audienceSizeOptions: ['Under 50K', '50K–100K', '100K–500K', '500K+', 'Mixed / Not sure'],
  aboutMaxLength: 2000,
} as const

// ── page copy ────────────────────────────────────────────────────────────────
// The phrase "no creator identity required" (in various forms) is repeated in 7
// places on purpose — it kills the single objection that sinks referral programs
// in this space ("if I name them, you'll cut me out"). Do not trim it. The 7
// spots are tagged [ID#n] below.

export const COPY = {
  hero: {
    eyebrow: PROGRAM.name,
    titleLine1: 'Turn your network into',
    titleLine2: 'recurring revenue.', // accent line
    // [ID#1]
    sub: 'Have creators in your network? Build a referral partnership with Sinaura and get rewarded when the creators you introduce join us — without revealing who they are until you’re ready.',
    primaryCta: 'Become a Referral Partner',
    ghostCta: 'How it works',
    trust: [
      `${PROGRAM.commissionLabel} referral commission`,
      'Simple introductions',
      'Long-term earning potential',
    ],
  },

  offer: {
    label: 'Referral commission',
    body: `${PROGRAM.commissionLabel} is our standard referral commission for eligible successful referrals. Commission conditions depend on your referral agreement — long-term partners may access enhanced conditions.`,
    example: {
      tag: 'Example',
      fromLabel: 'Creator generates',
      fromValue: '$20,000 / mo',
      toLabel: `Your ${PROGRAM.commissionLabel} commission`,
      toValue: '$1,000',
    },
    disclaimer:
      'Example shown for illustration purposes only. Actual commissions depend on the applicable referral agreement and creator activity.',
    callout:
      'Bring us multiple successful creators and unlock access to enhanced long-term referral conditions.',
  },

  process: {
    eyebrow: 'The process',
    title: 'How it works',
    // [ID#2]
    sub: 'No creator identity required until you’re ready.',
    steps: [
      {
        title: 'Apply as a Referral Partner',
        // [ID#3]
        body: 'Tell us about yourself and your network. No creator names required at this stage.',
      },
      {
        title: 'Speak with Sinaura',
        body: 'We contact you to discuss the program, your network and the potential partnership.',
      },
      {
        title: 'Formalize the Partnership',
        body: `A ${PROGRAM.agreementName} establishes the terms, attribution and commission conditions.`,
      },
      {
        title: 'Register Your Referral',
        body: 'Once the partnership is in place, register eligible referrals before we contact them.',
      },
      {
        title: 'We Handle the Rest',
        body: 'Sinaura handles qualification, onboarding and creator management.',
      },
      {
        title: 'Earn Your Commission',
        body: `Commissions are paid according to your ${PROGRAM.agreementName}.`,
      },
    ],
  },

  tiers: {
    eyebrow: 'Long-term partnership',
    title: 'More referrals. More rewards.',
    // No numbers on the ladder — aspiration without a published rate card.
    items: [
      { title: '1 Creator', label: 'Referral Partner', highlight: false },
      { title: 'Multiple Successful Creators', label: 'Established Partner', highlight: false },
      { title: 'Long-Term Partnership', label: 'Enhanced Referral Conditions', highlight: true },
    ],
  },

  qualify: {
    eyebrow: 'Referral profiles',
    title: 'Who should you refer?',
    sub: 'Quality over quantity.',
    items: [
      {
        title: 'Established Creators',
        body: 'Creators already generating revenue who want to scale.',
      },
      {
        title: 'Social Media Creators',
        body: 'Creators with an audience on Instagram, TikTok, X or similar platforms.',
      },
      {
        title: 'High-Potential Profiles',
        body: 'Creators with strong branding or engagement who could perform well with professional management.',
      },
      {
        title: 'Creators Seeking Management',
        body: 'Creators actively looking for a professional team to grow their business.',
      },
    ],
    closing: 'One exceptional referral beats dozens of random profiles.',
  },

  whyUs: {
    eyebrow: 'Why Sinaura',
    title: 'Your network deserves the right team.',
    items: [
      {
        title: 'Professional Management',
        body: 'Experienced team with structured systems handling every referred creator.',
      },
      {
        title: 'Growth Focused',
        body: 'We build sustainable creator businesses, not short-term results.',
      },
      {
        title: 'Dedicated Support',
        body: 'Every accepted creator gets professional support from our team.',
      },
      {
        title: 'Transparent Partnership',
        body: 'You always know how your referrals are handled and how commissions work.',
      },
    ],
  },

  structured: {
    eyebrow: 'A structured partnership',
    title: 'Built on clear terms.',
    sub: `Every approved partnership is formalized through a ${PROGRAM.agreementName} — before any creator is introduced.`,
    items: [
      {
        title: 'Clear Attribution',
        body: 'Referrals are formally registered and attributed to the right partner.',
      },
      {
        title: 'Defined Commission',
        body: 'Your commission structure is set as part of the agreement.',
      },
      {
        title: 'Professional Agreement',
        body: `The partnership is documented through a formal ${PROGRAM.agreementName}.`,
      },
    ],
  },

  form: {
    eyebrow: 'Partner Program',
    title: 'Become a Referral Partner',
    // [ID#4]
    sub: 'Tell us about yourself and your network. No creator identity required at this stage.',
    // [ID#5]
    reassurance:
      'Your referral stays yours. You don’t need to reveal a creator’s identity when applying. Approved partners first establish their partnership with Sinaura, after which eligible creator referrals can be formally registered before our team contacts them.',
    infoHeading: 'Your Information',
    networkHeading: 'Your Network',
    creatorsCountLabel: 'How many creators could you potentially refer?',
    creatorTypesLabel: 'What type of creators are in your network?',
    audienceSizeLabel: 'Typical Audience Size',
    aboutLabel: 'Tell us briefly about your network or potential referral(s)',
    // [ID#6]
    aboutPlaceholder:
      'You can tell us about the type of creators you know, their approximate audience size, current situation, or anything else you think would be useful. No names or profile links are required.',
    selectPlaceholder: 'Select an option',
    requiredBanner: 'Please fill in all required fields.',
    emailInvalid: 'Enter a valid email address.',
    submitLabel: 'Become a Referral Partner',
    submittingLabel: 'Submitting…',
    networkErrorMessage: 'Failed to submit. Please try again.',
    helper: 'Professional, confidential and reviewed personally by our team.',
    success: {
      eyebrow: 'Application received',
      title: 'Thanks for your interest in partnering with Sinaura',
      body: 'Our team will review your information and contact you to discuss the referral process and next steps.',
    },
  },

  faq: {
    eyebrow: 'Questions',
    title: 'Referral program FAQ',
    items: [
      {
        q: 'How much can I earn?',
        a: `Our standard referral commission starts at ${PROGRAM.commissionLabel} for eligible successful referrals. Specific conditions depend on your ${PROGRAM.agreementName}.`,
      },
      {
        // [ID#7]
        q: 'Do I need to share the creator’s identity when I apply?',
        a: 'No. You don’t need to provide the creator’s name, social media profiles or account when applying to become a referral partner. Our team will first contact you to discuss the partnership and referral process.',
      },
      {
        q: 'Is there a formal agreement between me and Sinaura?',
        a: `Yes. Approved referral partnerships are formalized through a ${PROGRAM.agreementName} that establishes the applicable referral attribution, commission terms and partnership conditions before eligible creator referrals are introduced.`,
      },
      {
        q: 'How is my referral protected?',
        a: 'Once your partnership with Sinaura is established, eligible creator referrals can be registered before our team contacts the creator, allowing the referral to be properly attributed to you.',
      },
      {
        q: 'Can I refer multiple creators?',
        a: 'Yes. We are especially interested in building long-term relationships with partners who consistently introduce high-quality creators.',
      },
      {
        q: 'Do I need to manage the creator?',
        a: 'No. Your role is to make the introduction. Sinaura handles qualification, onboarding and management.',
      },
      {
        q: 'What happens if the creator stops working with Sinaura?',
        a: 'Referral commissions are subject to the conditions of your partner agreement and the creator’s active relationship with Sinaura.',
      },
      {
        q: 'Can I become a long-term referral partner?',
        a: `Yes. Partners who consistently introduce high-quality creators may access enhanced referral conditions and build a long-term partnership with Sinaura.`,
      },
    ],
  },

  finalCta: {
    eyebrow: PROGRAM.name,
    titleLine1: 'Know the right',
    titleLine2: 'creators?', // accent line
    sub: 'Turn your network into a long-term partnership with Sinaura.',
    cta: 'Become a Referral Partner',
  },
} as const

export const SEO = {
  title: 'Partner Program',
  description:
    'Join the Sinaura Partner Program and earn commissions by introducing high-potential creators to our management team. No creator identity required to apply.',
} as const
