// -----------------------------------------------------------------------------
// SINGLE SOURCE OF TRUTH FOR EVERY USER-FACING STRING ON THE SITE.
//
// Rule: components contain NO copy string literals. They import from here.
//
// Wordmark is exactly "BiLLiE": capital B, lowercase i, capital L, capital L,
// lowercase i, capital E. Never "Billie", never "BILLIE".
//
// Governing filters for every line (see the copy-pass brief):
//   1. No "duh" lines - a line must make the reader ask "how?" not nod along.
//   2. Grade 4-6 reading level - short words, short sentences, plain English.
// Banned: "AI" (anywhere, incl. metadata), leverage, streamline, seamless,
// solution, platform, empower, revolutionise, cutting-edge, game-changing.
// No dollar figure. No named payers beyond DVA / WorkCover / third parties.
// The pilot clinic is never named - "our clinic" / "our practice" only.
//
// Vocabulary of clinic billing (use these): portal, log in, email, invoice,
// claim, item code, referral, rejection. NEVER: form, submission workflow,
// keying, rekeying, data entry, paperwork. If a practice manager wouldn't say
// it, it doesn't go on the page. (The <form> element and the `form` config
// object below are code identifiers, not rendered copy - those are fine.)
// -----------------------------------------------------------------------------

export const WORDMARK = "BiLLiE";

export const meta = {
  title: "BiLLiE - Billing Managed",
  description:
    "DVA, WorkCover, third-party insurers - every claim from one place. BiLLiE sends it, tracks it, and chases the reply. Built inside a working clinic.",
  ogAlt: "BiLLiE",
};

export const nav = {
  cta: { label: "Become a founding practice", href: "#apply" },
};

export const status = {
  line: "Private beta. Seven founding practices, then we close the list.",
};

export const hero = {
  headline: "Every claim. One portal.",
  sub: "DVA has a portal. WorkCover has another one. Third parties want an email. Your clinic loses two to seven hours a week to it. BiLLiE does the lot.",
  ctaLabel: "Become a founding practice",
};

export const problem = {
  blocks: [
    {
      heading: "The wrong person is doing it",
      body: "Your practice manager should be running the practice. Not typing the same details into a different portal for the fifth time today.",
    },
    {
      heading: "It never ends",
      body: "Every week the pile comes back. Same portals. Same logins. Same job. And none of it gets any faster.",
    },
    {
      heading: "A rejection means doing it twice",
      body: "One wrong code. One missing referral. Back it comes, and someone starts again from the top.",
    },
  ],
};

// The comparison is the centrepiece: a long, cramped "Right now" column against
// a two-line "With BiLLiE" column. The imbalance is the argument - do not
// balance the two.
export const comparison = {
  heading: "Right now, versus with BiLLiE",
  leftLabel: "Right now",
  // The final line is the point of the section: the rejection loop. The
  // component styles the last item as a Clay beat.
  leftSteps: [
    "Log in to the DVA portal. Type it all in.",
    "Log out. Log in to the WorkCover portal. Type it all in again.",
    "Dig through a folder for the right insurer's email address.",
    "Type the message. Attach the invoice. Send.",
    "Write it down somewhere so you remember you sent it.",
    "Wait.",
    "Check.",
    "Chase.",
    "Rejected. Start again.",
  ],
  rightLabel: "With BiLLiE",
  rightSteps: [
    "Drag the invoice in. Or email it to your clinic's BiLLiE address.",
    "Done.",
  ],
};

// The Bite (Change 2): a quiet manifesto beat between the comparison and How It
// Works. No card, no icon - it needs silence around it to land.
export const manifesto = {
  // Two-part heading: the component renders a line break between the sentences.
  heading: ["Nobody ever fixed this.", "So we did."],
  body: [
    "Clinics have been doing claims by hand for as long as there have been claims. Not because anyone chose to. Because nobody ever built them anything better.",
    "Portals that don't talk to each other. Item codes that change without warning. An inbox full of insurers who each want it their own way.",
    "That was never your fault. It was just never anyone's job to fix it.",
    "Now it is.",
  ],
};

export const howItWorks = {
  heading: "How it works",
  steps: [
    {
      heading: "Send it in",
      body: "Drag the invoice in, or email it to your clinic's own BiLLiE address. That is your job done.",
    },
    {
      heading: "BiLLiE works out where it goes",
      body: "It reads the invoice, finds the payer, and checks it against what that payer actually accepts. Before it goes anywhere.",
    },
    {
      heading: "BiLLiE sends it and watches for the reply",
      body: "Every claim logged. Every reply comes back to you. You see where things are at. You just don't do the work.",
    },
  ],
};

export const payers = {
  // The emotional payoff on the green band (the payer list was dropped). Both
  // lines cream/bone; the bottom stands out via a heavier weight + bigger size
  // (the two lines are size-matched so their left/right edges line up).
  payoff: {
    line1: "Watching invoices go out on their own.",
    line2: "You won't go back.",
  },
};

// First person. This is Isaiah speaking - the trust section. It must not read
// like marketing.
export const origin = {
  // Two-part heading: the component renders a line break between the sentences.
  heading: ["This wasn't built for clinics.", "It was built in one."],
  body: [
    "I didn't set out to build software. I set out to stop losing my Fridays.",
    "Our clinic bills DVA, WorkCover, and a long tail of third parties. Every one of them wants something different. For years the answer was the same: someone sits down and does it.",
    "BiLLiE is what happens when you stop accepting that. Every payer quirk it handles is one that bit us first. Every shortcut it takes is one we wished for.",
    "It runs in our clinic today. Founding practices are next.",
  ],
  attribution: "Isaiah de Hoog, founder",
  // Desktop-only pull quote. Dropped on mobile (it duplicates the first body
  // line and there is no room for it). Two lines, rendered as a quote.
  pullQuote: [
    "I didn't set out to build software.",
    "I set out to stop losing my Fridays.",
  ],
};

export const apply = {
  heading: "Become a founding practice",
  sub: [
    "BiLLiE isn't open to everyone yet. We're taking on seven founding practices - no more. They get founding pricing, locked in, and first access when we open.",
    "You won't have to come looking for us. Tell us about your clinic, and we'll come to you.",
  ],
};

export const success = {
  heading: "You're on the founding list.",
  body: [
    "BiLLiE isn't open yet. We're taking on seven founding practices, and yours is now in front of me.",
    "I'll be in touch personally, usually within a couple of days, to hear how your clinic bills today. Nothing for you to do in the meantime.",
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
  // Line 4 must render the real copyright glyph U+00A9, not the ASCII fallback.
  // "Vilosoft" is a sole trader - never add "Pty Ltd".
  lines: [
    "BiLLiE is operated by Vilosoft, Australia. Clinic and claim data is hosted in Australia (AWS ap-southeast-2) and used only to operate BiLLiE.",
    "BiLLiE sends individual, claim-specific correspondence to payers on your clinic's behalf. Never bulk email. Never marketing email.",
    "Contact info@getbillie.com.au",
    "© 2026 Vilosoft",
  ],
  contactEmail: "info@getbillie.com.au",
};

// -----------------------------------------------------------------------------
// Form option arrays. Canonical here; the zod schema (lib/lead-schema.ts)
// derives its enums from these so display and validation never drift.
// -----------------------------------------------------------------------------

export const roleOptions = [
  "Practice manager",
  "Practice owner",
  "Clinician",
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

// Three payers only. Ticking WorkCover / Third-party insurers reveals a
// required conditional field (state / free text) handled in the form + schema.
export const payerOptions = ["DVA", "WorkCover", "Third-party insurers"] as const;

export const invoiceVolumeOptions = [
  "Under 20",
  "20-50",
  "50-100",
  "100+",
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
    payers: { label: "Which payers do you bill?", options: payerOptions },
    // Conditional reveal, shown only when "WorkCover" is ticked.
    workcover_state: { label: "Which state?", options: stateOptions },
    // Conditional reveal, shown only when "Third-party insurers" is ticked.
    third_party_detail: { label: "Which ones?" },
    invoice_volume: {
      label: "Roughly how many invoices do you send each week?",
      options: invoiceVolumeOptions,
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
  { key: "payers", label: "Payers" },
  { key: "workcover_state", label: "WorkCover state" },
  { key: "third_party_detail", label: "Third-party insurers" },
  { key: "invoice_volume", label: "Invoice volume" },
  { key: "notes", label: "Notes" },
];
