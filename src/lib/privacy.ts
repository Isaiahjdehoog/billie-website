// -----------------------------------------------------------------------------
// PRIVACY POLICY TEXT - the words on /privacy.
//
// Built from billie-privacy-policy-draft-v1.md (13 Aug 2026), corrected against
// the 2026.09.27 website audit and email-and-accounts report. Rule: every
// sentence must be true on the day it is published. Claims the draft's own
// notes flag as not yet true (per-practice access controls, a retention
// schedule) are left out on purpose. Do not add them back until they are real.
//
// The copy.ts "no AI" rule is for marketing copy. A privacy policy has to say
// plainly how data is processed, so this page does name AI.
//
// Change EFFECTIVE_DATE and LAST_UPDATED whenever this text changes and ships.
// -----------------------------------------------------------------------------

export const EFFECTIVE_DATE = "27 September 2026";
export const LAST_UPDATED = "27 September 2026";
export const PRIVACY_EMAIL = "info@getbillie.com.au";

export type Block =
  | { p: string }
  | { list: string[] }
  | { h3: string };

export type Section = { heading: string; blocks: Block[] };

export const privacyMeta = {
  title: "Privacy Policy - BiLLiE",
  description:
    "How BiLLiE, operated by Vilosoft, collects, uses, stores and protects personal information.",
  heading: "Privacy Policy",
  dates: `Effective ${EFFECTIVE_DATE}. Last updated ${LAST_UPDATED}.`,
};

export const privacySections: Section[] = [
  {
    heading: "1. Who we are",
    blocks: [
      {
        p: "BiLLiE is billing software for Australian health practices. It prepares, sends and tracks invoices and claims to payers on a practice's behalf.",
      },
      {
        p: `BiLLiE is operated by Isaiah de Hoog, a sole trader in Australia, under the name Vilosoft. You can contact us at ${PRIVACY_EMAIL}.`,
      },
      {
        p: "In this policy, \"we\", \"us\" and \"our\" mean the operator of BiLLiE. \"You\" means the person whose personal information we hold. That may be a website visitor, a practice owner, a practice staff member, or a patient of a practice that uses BiLLiE.",
      },
    ],
  },
  {
    heading: "2. Two different roles",
    blocks: [
      { p: "We handle personal information in two different ways." },
      {
        p: "As the operator of BiLLiE. When you visit our website, send us an enquiry, or use a BiLLiE account, we decide what information to collect and why. We are directly responsible to you for that information.",
      },
      {
        p: "As a service provider to your health practice. When a practice uses BiLLiE to prepare and send invoices, we handle patient information on that practice's instructions and on its behalf. The practice holds the relationship with the patient and remains responsible for the clinical record. We use that information only to deliver the billing service the practice has asked for. We do not use it for our own purposes, we do not sell it, and we do not use it to train artificial intelligence models.",
      },
      {
        p: "If you are a patient and you want to access, correct, or complain about your health information, the fastest path is to contact your treating practice. You can also contact us using the details in section 13, and we will work with your practice to respond.",
      },
    ],
  },
  {
    heading: "3. Our commitment under the Privacy Act",
    blocks: [
      {
        p: "We handle personal information in line with the Privacy Act 1988 (Cth) and the 13 Australian Privacy Principles, including the extra protections for health information, which is sensitive information.",
      },
      {
        p: "We commit to this whether or not the small business exemption in the Privacy Act would otherwise apply to us. Health information deserves the full standard, and the practices we work with need to be able to rely on it.",
      },
    ],
  },
  {
    heading: "4. What we collect",
    blocks: [
      { h3: "From the enquiry form on this website" },
      {
        p: "When you apply to become a founding practice, the form asks for:",
      },
      {
        list: [
          "your name",
          "your practice's name",
          "your role at the practice",
          "your email address",
          "your phone number",
          "your practice's state",
          "which payers your practice bills (DVA, WorkCover, third-party insurers)",
          "which state your WorkCover claims are in (only if you tick WorkCover)",
          "which third-party insurers you bill (only if you tick third-party insurers)",
          "roughly how many invoices your practice sends each week",
          "anything else you choose to tell us (optional)",
        ],
      },
      {
        p: "If you joined our earlier waitlist on app.getbillie.com.au, we hold the email address you gave us.",
      },
      { h3: "When you visit this website" },
      {
        p: "We use Vercel Web Analytics to count visits. It does not use cookies and does not tell us who you are. Section 14 lists exactly what it records. Our hosting provider also keeps short-lived technical logs of requests to the site, which can include your IP address.",
      },
      { h3: "From practice users of the BiLLiE app" },
      {
        list: [
          "Account information: name, work email address, role and practice.",
          "Sign-in information.",
          "Payer portal logins you choose to store so BiLLiE can lodge claims for you. These are stored encrypted in Amazon Web Services' Sydney region.",
          "A record of actions taken in the app, kept as an audit log.",
        ],
      },
      { h3: "Patient information, received from practices" },
      {
        p: "We receive whatever the practice's invoice and claim documents contain. That usually includes:",
      },
      {
        list: [
          "name and date of birth",
          "contact and address details",
          "claim, policy or member numbers issued by a payer",
          "service dates, item codes and service descriptions",
          "referral details and the treating provider",
          "amounts charged",
        ],
      },
      {
        p: "Some of this is health information, which is sensitive information under the Privacy Act and needs a higher standard of protection.",
      },
      {
        p: "We do not ask for clinical notes, imaging or pathology results. If a practice sends us a document with information we don't need, we still handle it under this policy, and we will work with the practice to stop it happening again.",
      },
    ],
  },
  {
    heading: "5. Why we collect it, and what we do with it",
    blocks: [
      { p: "We use website enquiry information to:" },
      {
        list: [
          "contact you about becoming a founding practice",
          "send you a confirmation email when you apply",
        ],
      },
      { p: "We use practice and patient information to:" },
      {
        list: [
          "prepare, check and send invoices and claims to payers on a practice's behalf",
          "read and sort payer replies, remittances and rejections",
          "show practices where their claims are up to and what needs their attention",
          "let users sign in and keep accounts secure",
          "keep an audit record of actions taken on a claim",
          "support, fix and improve the service",
          "meet our legal and record-keeping obligations",
        ],
      },
      {
        p: "We do not use personal information for advertising, and we do not sell it. Section 8 explains where it is stored, including the parts that may be stored outside Australia.",
      },
    ],
  },
  {
    heading: "6. Automated processing and automated decisions",
    blocks: [
      {
        p: "BiLLiE is automation software, and you are entitled to a plain description of what that means.",
      },
      {
        p: "What is automated. BiLLiE uses software, including artificial intelligence models, to read invoice documents, pull out the details a claim needs, check them against payer rules, and send the claim through a payer's portal or by email. It also reads payer replies and sorts the outcome.",
      },
      {
        p: "The personal information used in that processing is the patient and claim information listed in section 4: name, date of birth, claim or member number, service dates, item codes, service descriptions, referral details, treating provider and amounts charged.",
      },
      {
        p: "The decisions involved are: whether an invoice is ready to send, which payer and address it should go to, how a payer's reply should be sorted, and whether an item needs a person to look at it first.",
      },
      {
        p: "A person approves before a claim is sent. BiLLiE does not send a claim that a practice has not approved. BiLLiE does not pay or refuse claims. The payer decides that, under its own rules and review process. Where our software is unsure, the item goes to a person instead of being guessed at.",
      },
      {
        p: "You can ask us about a decision. If an automated step in BiLLiE has affected you, contact us using the details in section 13 and ask what information was used and how the step works. Where it concerns a claim, we will respond together with your practice and the payer.",
      },
      {
        p: "We are reviewing this section against the automated decision-making rules that start under the Privacy Act on 10 December 2026, and will update it before that date.",
      },
    ],
  },
  {
    heading: "7. Who we share information with",
    blocks: [
      {
        p: "Payers. When a practice asks us to lodge a claim, we give the payer the information that claim needs. For example, WorkCover Queensland, the Department of Veterans' Affairs, the Australian Defence Force's health contractors, or a private insurer. Those organisations handle it under their own privacy obligations.",
      },
      {
        p: "Service providers. We use a small number of providers to run BiLLiE. They act on our instructions:",
      },
      {
        list: [
          "Amazon Web Services: hosting, file storage, email sending and artificial intelligence processing, all in Australia.",
          "Supabase: our database, hosted in Amazon Web Services' Sydney region.",
          "Vercel: hosts this website and the BiLLiE app, and provides the website's visitor counts.",
          "Google: hosts our email accounts, including the inbox that receives website enquiries.",
          "Resend: sends the BiLLiE app's sign-in emails.",
          "A monitoring service that receives technical logs from the BiLLiE app.",
        ],
      },
      {
        p: "Where the law requires it. We may share information where the law requires or allows it, or where it is needed to prevent a serious threat to someone's life, health or safety.",
      },
      { p: "We do not share personal information with anyone else without your consent." },
    ],
  },
  {
    heading: "8. Where your information is stored",
    blocks: [
      { h3: "Patient and claim information" },
      {
        p: "Patient and claim information is stored in Australia, in Amazon Web Services' Sydney region (ap-southeast-2). That covers our database and our document storage. The artificial intelligence processing that reads invoices also runs in Australia.",
      },
      { h3: "Website enquiries" },
      {
        p: "When you send the enquiry form, it is processed by our website host in Sydney and sent as an email through Amazon Web Services in Sydney. That email, and our confirmation email to you, is then held in our email accounts hosted by Google. Google may store email outside Australia, including in the United States.",
      },
      { h3: "Other information that may leave Australia" },
      {
        list: [
          "Sign-in emails for the BiLLiE app are sent through Resend, which is based in the United States. They contain your email address and a sign-in link or code.",
          "Vercel, which is based in the United States, receives the anonymous visit data described in section 14 and keeps short-lived request logs.",
          "The monitoring service that receives technical logs from the BiLLiE app may store them outside Australia.",
        ],
      },
      {
        p: "If where we store information changes, we will update this policy and tell affected practices before the change takes effect.",
      },
    ],
  },
  {
    heading: "9. Security",
    blocks: [
      {
        p: "We take reasonable steps to protect personal information from misuse, interference, loss, and unauthorised access, change or disclosure. These include:",
      },
      {
        list: [
          "encrypting data when it travels over the internet and when it is stored",
          "storing payer portal logins in an encrypted secrets store",
          "keeping an audit log of actions taken on a claim",
          "monitoring and alerts for system errors",
        ],
      },
      {
        p: "No system is perfectly secure. If a data breach is likely to cause serious harm, we will tell the people affected and the Office of the Australian Information Commissioner, as the Notifiable Data Breaches scheme requires.",
      },
    ],
  },
  {
    heading: "10. How long we keep information",
    blocks: [
      {
        p: "We keep personal information only for as long as we need it for the purposes in this policy, or for as long as the law requires.",
      },
      {
        p: "When a practice stops using BiLLiE, we will return or delete its claim records as the practice directs, unless the law requires us to keep them.",
      },
      {
        p: "If you sent us a website enquiry and no longer want us to hold it, email us and we will delete it.",
      },
    ],
  },
  {
    heading: "11. Children and young people",
    blocks: [
      { p: "There are two different situations here, and they are handled differently." },
      {
        p: "Our website and app are not meant for children. BiLLiE is a business tool used by health practices. We do not knowingly collect personal information directly from anyone under 18 through our website or app accounts. If we find we have, we will delete it. If you think this has happened, contact us using the details in section 13.",
      },
      {
        p: "Patients may be children. Health practices treat patients of all ages, including young children. When a practice sends an invoice for a patient who is a minor, that information reaches us the same way as any patient's: from the practice, as part of the billing service, under the consent arrangements the practice has with the patient's parent or guardian. We have no direct relationship with the patient, and we collect nothing from the child themselves.",
      },
      {
        p: "Information about a minor is treated as sensitive information. It gets the same protections described in this policy, and the same access, correction and complaint rights, which a parent or guardian can use through the treating practice.",
      },
      {
        p: "We only use what appears on the billing documents a practice sends us. We do not ask for information about a patient's family, schooling or circumstances.",
      },
    ],
  },
  {
    heading: "12. Accessing and correcting your information",
    blocks: [
      {
        p: "You can ask us for the personal information we hold about you, and ask us to correct it if it is wrong.",
      },
      {
        list: [
          "Practice users and website enquirers: contact us.",
          "Patients: contact your treating practice first, as they hold the source record and can correct it there. You can also contact us directly.",
        ],
      },
      {
        p: "We will respond within a reasonable time, normally within 30 days. There is no charge. If we refuse access or correction, we will tell you why in writing and explain how to complain.",
      },
    ],
  },
  {
    heading: "13. Complaints and contact",
    blocks: [
      {
        p: "If you have a question about this policy, or you think we have mishandled your personal information, contact us first:",
      },
      { p: `Email: ${PRIVACY_EMAIL}` },
      {
        p: "We will acknowledge your complaint and respond within a reasonable time, normally within 30 days.",
      },
      {
        p: "If you are not satisfied with our response, you can complain to the Office of the Australian Information Commissioner at oaic.gov.au or on 1300 363 992.",
      },
    ],
  },
  {
    heading: "14. Cookies and analytics",
    blocks: [
      { p: "This website (getbillie.com.au) does not set any cookies." },
      {
        p: "We use Vercel Web Analytics to count visits. It does not use cookies. Instead, Vercel works out whether a visit is new from a scrambled code made from the request, and discards that code after 24 hours. We only see totals, not individual visitors. For each page view it may record:",
      },
      {
        list: [
          "the time",
          "the page you visited",
          "the site that referred you",
          "your approximate location (country, region, city)",
          "your device's operating system and browser",
          "whether you are on a phone, tablet or computer",
        ],
      },
      {
        p: "The BiLLiE app (app.getbillie.com.au) uses cookies that are needed to keep you signed in.",
      },
    ],
  },
  {
    heading: "15. Changes to this policy",
    blocks: [
      {
        p: "We may update this policy from time to time. The current version is always at getbillie.com.au/privacy, with the date it was last updated at the top. If a change materially affects how we handle personal information, we will tell practices directly.",
      },
    ],
  },
];
