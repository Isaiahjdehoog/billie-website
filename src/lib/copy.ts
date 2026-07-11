// -----------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR EVERY USER-FACING STRING ON THE SITE.
//
// Rule: components contain NO copy string literals. They import from here.
// Copy is FINAL (Phase B). Do not paraphrase or "improve" it - if something
// reads wrong, flag it to Isaiah rather than editing.
//
// Wordmark is exactly "BiLLiE": capital B, lowercase i, capital L, capital L,
// lowercase i, capital E. Never "Billie", never "BILLIE".
// -----------------------------------------------------------------------------

export const WORDMARK = "BiLLiE";

export const meta = {
  title: "BiLLiE - Billing Managed",
  description:
    "BiLLiE handles invoice submission for Australian allied health practices. DVA, WorkCover, Allianz, QBE and more - submitted, tracked, chased.",
  ogAlt: "BiLLiE",
};

export const nav = {
  login: { label: "Log in", href: "https://app.getbillie.com.au/login" },
  cta: { label: "Become a founding practice", href: "#apply" },
};

export const status = {
  line: "In private beta - onboarding founding practices now",
};

export const hero = {
  headline: "BiLLiE handles your billing. So you don't have to.",
  sub: "Allied health practices lose ten to twenty hours a week to invoice submission. DVA, WorkCover, Allianz, QBE, ADF - every payer wants a different form, a different portal, a different inbox. BiLLiE does all of it, and chases the reply.",
  ctaLabel: "Become a founding practice",
};

export const problem = {
  blocks: [
    {
      heading: "Ten hours a week, gone",
      body: "Every invoice keyed by hand, into a different system, by someone who should be doing something else. That time never comes back.",
    },
    {
      heading: "Slow to submit, slow to get paid",
      body: "A claim sitting in the pile for a fortnight is a fortnight of cash your practice doesn't have.",
    },
    {
      heading: "Every rejection is the work, twice",
      body: "Wrong item code. Missing referral. An address the payer changed six months ago and never told you. Back it comes.",
    },
  ],
};

export const howItWorks = {
  heading: "How it works",
  steps: [
    {
      heading: "Send BiLLiE the invoice",
      body: "Drop the PDF in. That's the whole job. No new software for your team to learn, no rekeying.",
    },
    {
      heading: "BiLLiE works out where it goes",
      body: "Payer, item codes, amounts, claim details. BiLLiE reads the invoice and checks it against what that payer actually accepts - before it goes anywhere.",
    },
    {
      heading: "BiLLiE submits it, and watches for the reply",
      body: "Every submission logged. Every reply routed back to you. You see the status. You don't see the busywork.",
    },
  ],
};

export const payers = {
  list: "DVA. WorkCover QLD. Allianz. QBE. GIO. ADF. Private health funds. Third-party insurers.",
  tagline: "One BiLLiE. Every payer.",
};

export const credibility = {
  heading: "Built inside a clinic, not a boardroom",
  body: [
    "BiLLiE exists because our own practice was losing whole days to billing. Not a hypothetical practice - ours. Every payer quirk BiLLiE handles is one we hit ourselves first, and every shortcut it takes is one we wanted.",
    "It runs at our clinic today. Founding practices are next.",
  ],
};

export const apply = {
  heading: "Become a founding practice",
  sub: [
    "BiLLiE isn't open to everyone yet, and we're onboarding a small number of practices at a time. Founding practices get founding pricing, locked in, and first access when we open.",
    "And you won't have to go looking for us. Tell us about your practice, and we'll come to you.",
  ],
};

export const success = {
  heading: "You're on the founding list.",
  body: [
    "BiLLiE isn't generally available yet - we're onboarding a small number of practices at a time, and yours is now in front of us.",
    "Isaiah will be in touch personally, usually within a couple of days, to hear how your practice bills today and work out whether BiLLiE's a fit. Nothing for you to do in the meantime.",
  ],
};

export const autoReply = {
  // {name} is interpolated into the subject server-side.
  subject: "Welcome to BiLLiE, {name}",
  // {name} and {practice} are interpolated server-side from the submitted form.
  body: `Hi {name},

I'm Isaiah. I built BiLLiE, and I built it inside our own clinic - because we were the ones losing whole days to billing.

Thanks for putting {practice} forward. Welcome aboard.

Here's the honest position: BiLLiE isn't open to everyone yet. We're taking on a small number of founding practices as we go, and yours is now one of the ones in front of me.

What that means for you:

- Founding pricing, locked in
- First access when we open
- We come to you. You don't have to keep checking back.

I'll be in touch personally over the next few days. I want to hear how {practice} handles billing right now - what's slow, what keeps coming back, what you'd never hand over to software. That's how BiLLiE gets built, and founding practices are the ones who get to shape it.

Nothing for you to do in the meantime. Just reply to this email if you've got questions - it comes straight to me.

Isaiah de Hoog
Founder, BiLLiE
isaiah@getbillie.com.au`,
};

export const footer = {
  // NOTE: line 2 is deliberate and load-bearing (aligns with the AWS SES
  // production-access use-case writeup). Do not shorten, move, or merge it.
  lines: [
    "BiLLiE is operated by Vilosoft, Australia. Clinic and claim data is hosted in Australia (AWS ap-southeast-2) and used only to operate BiLLiE.",
    "BiLLiE sends individual, claim-specific correspondence to payers on your clinic's behalf. Never bulk email. Never marketing email.",
    "Contact info@getbillie.com.au",
    "(c) 2026 Vilosoft",
  ],
  contactEmail: "info@getbillie.com.au",
};

// -----------------------------------------------------------------------------
// Form option arrays. Canonical here; the zod schema (lib/lead-schema.ts)
// derives its enums from these so display and validation never drift.
// -----------------------------------------------------------------------------

export const roleOptions = [
  "Practice manager",
  "Principal clinician",
  "Practice owner",
  "Admin",
  "Other",
] as const;

export const stateOptions = [
  "QLD",
  "NSW",
  "VIC",
  "SA",
  "WA",
  "TAS",
  "NT",
  "ACT",
] as const;

export const disciplineOptions = [
  "Physiotherapy",
  "Occupational therapy",
  "Hand therapy",
  "Podiatry",
  "Psychology",
  "Exercise physiology",
  "Other",
] as const;

export const payerOptions = [
  "DVA",
  "WorkCover QLD",
  "Other state WorkCover",
  "Allianz",
  "QBE",
  "Other third-party insurers",
  "ADF",
  "Private health funds",
  "Medicare",
] as const;

export const billingHoursOptions = [
  "Under 5",
  "5-10",
  "10-20",
  "20+",
] as const;

export const form = {
  heading: apply.heading,
  submitLabel: "Become a founding practice",
  submittingLabel: "Sending...",
  selectPlaceholder: "Select...",
  fields: {
    name: { label: "Your name", autoComplete: "name" },
    practice: { label: "Practice name", autoComplete: "organization" },
    role: { label: "Your role", options: roleOptions },
    email: { label: "Email", autoComplete: "email" },
    phone: { label: "Phone", autoComplete: "tel" },
    state: { label: "State", options: stateOptions },
    discipline: { label: "Discipline", options: disciplineOptions },
    payers: {
      label: "Which payers does your practice handle?",
      options: payerOptions,
    },
    billing_hours: {
      label:
        "Roughly how many hours a week does your practice spend on billing?",
      options: billingHoursOptions,
    },
    notes: { label: "Anything else we should know?", optional: "Optional" },
  },
  errors: {
    required: "Required",
    email: "Enter a valid email",
    payers: "Choose at least one",
    tooLong: "That's too long",
    generic:
      "Something went wrong sending your details. Please try again, or email info@getbillie.com.au.",
  },
} as const;

// Labels used to build the plain-text lead notification email, in send order.
export const leadEmailLabels: { key: string; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "practice", label: "Practice name" },
  { key: "role", label: "Role" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "state", label: "State" },
  { key: "discipline", label: "Discipline" },
  { key: "payers", label: "Payers" },
  { key: "billing_hours", label: "Billing hours per week" },
  { key: "notes", label: "Notes" },
];
