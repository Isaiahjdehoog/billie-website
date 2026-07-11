# BiLLiE website - build brief

This is the brief this repo was built from, archived for reference. Phase A
(scaffold + form + email) and Phase B (final copy) were collapsed into a single
build.

## Context

- A **new, separate** repo. Not part of the BiLLiE monorepo. Zero coupling.
- Disposable: it gets rebuilt in Framer later, so it must stay throwaway.
- GitHub: `github.com/Isaiahjdehoog/billie-website` (private).
- Vercel project: `billie-website` (separate from the `billie` project).
- Purpose: single-page marketing site with a qualification form. No product
  signup, no database. Isaiah reaches out to leads manually.

## Governing decisions (BiLLiE Decision Log)

- **DEC-69**: `app.getbillie.com.au` is the canonical app domain. Apex and www
  are reserved for marketing. No redirect between them.
- **DEC-74**: the interim waitlist copy at `app.getbillie.com.au` is SES
  corroboration evidence. Not to be copied here; the app page is not touched.
- **DEC-41**: no data captured without a downstream consumer. Hence no database.

## Stack

- Next.js 15, App Router, TypeScript strict
- Tailwind v3
- One route handler: `/api/lead`
- Resend for outbound email
- No Supabase, no auth, no database, no CMS, no shared packages
- Vercel, function region `syd1` (Sydney)
- `@vercel/analytics` (cookieless). No GA, no pixels, no cookie banner.

## Brand tokens (hardcoded in `tailwind.config.ts`)

| Token  | Hex       | Use                     |
| ------ | --------- | ----------------------- |
| ledger | `#1A5D3A` | primary green           |
| clay   | `#C2553D` | accent                  |
| ink    | `#1C1917` | body text               |
| bone   | `#FAF5EC` | page background         |
| paper  | `#FFFFFF` | surfaces                |
| mist   | `#A8A29E` | muted text, hairlines   |

Fonts: **Jost** headers (Futura substitute), **Helvetica/Arial** system stack
for body, **Kalam** for the wordmark only. Wordmark casing is exactly `BiLLiE`.

## Page structure (one page, `/`)

1. Nav - wordmark left; "Log in" -> app login, primary CTA -> `#apply`
2. Status bar - thin strip above the hero
3. Hero - h1, sub-paragraph, primary CTA
4. Problem - three blocks
5. How it works - three numbered steps
6. Payers - the payer row
7. Credibility - founder/origin block
8. Apply - `id="apply"`, the form
9. Footer - AU residency, operator, contact, copyright

Mobile-first: must look right on a phone.

## The form (section 8)

Fields in order: `name`, `practice` (label "Practice name"), `role` (select),
`email`, `phone`, `state` (select), `discipline` (select), `payers` (checkbox
group, >=1 required), `billing_hours` (select, label "Roughly how many hours a
week does your practice spend on billing?"), `notes` (textarea, optional).

Spam handling:

- Honeypot field, visually hidden (NOT `display:none`).
- zod input caps server-side: `notes` max 1000 chars; every other string field
  max 200; reject anything larger with a 400.
- (No in-memory rate limiter - it's a guard that looks real and isn't on
  ephemeral serverless functions. Vercel Firewall rule if spam ever appears.)
- No captcha.

Client validates for UX; server validates for truth (never trust the client).
Success state replaces the form in place with a confirmation panel.

## `/api/lead` route handler

On valid POST, send TWO emails via Resend:

**Email 1 - lead notification** (the one that matters)

- from `BiLLiE <info@getbillie.com.au>`, to `info@getbillie.com.au`
- replyTo = the lead's email
- subject `New BiLLiE lead - {practice}`
- body: every field, plain text, one per line, labelled

**Email 2 - auto-reply to the lead**

- from `Isaiah de Hoog <isaiah@getbillie.com.au>`, to the lead
- replyTo `isaiah@getbillie.com.au` so replies reach Isaiah directly
- subject `Welcome to BiLLiE, {name}`; subject/body from the copy, `{name}` and
  `{practice}` interpolated (`isaiah@` must exist as a Workspace alias first)

Email 2 failing must NOT fail the request (separate try/catch). 200 on success,
400 with field errors on validation failure. Never echo submitted PII in an
error response. The Resend domain is verified domain-wide, so no new DNS.

## Env

`RESEND_API_KEY` - a new key scoped to this project. `.env.example` committed
with a placeholder; real key never committed.

## CI

Single GitHub Actions workflow on PR: `pnpm typecheck`, `pnpm build`. No test
suite - nothing here is worth testing yet.

## Non-goals

No database/persistence; no import from or change to the monorepo; no auth or
signup ("Log in" is a plain link); no blog/CMS/multiple pages; do not attach
`getbillie.com.au`/`www` to this project (Isaiah does it manually); no DNS
changes; the word "AI" appears nowhere in the rendered page or metadata.

## Definition of done

- Pushed to the `billie-website` remote, CI green (typecheck + build)
- Deployed to `billie-website.vercel.app`
- Zero `{{TOKEN}}` strings anywhere; all copy in `lib/copy.ts`, none inline
- Form submit -> lead email in `info@` with every field, reply-to the submitter
- Auto-reply lands with `{name}`/`{practice}` interpolated; auto-reply failure
  does not fail the request
- Honeypot submission silently rejected, no email sent
- Oversized payload rejected with 400
- Favicon and og:image present
- Reads correctly on a phone
- This brief committed at `docs/brief.md`

## Meta

- `<title>`: `BiLLiE - Billing Managed`
- description: BiLLiE handles invoice submission for Australian allied health
  practices. DVA, WorkCover, Allianz, QBE and more - submitted, tracked, chased.
- og:image: simple BiLLiE wordmark on Bone.

## Copy hard constraints

No dollar figure / percentage / pricing table ("Founding pricing, locked in" is
the entire pricing statement). No "AI" anywhere. Banned words: leverage,
streamline, seamless, solution, platform, empower, revolutionise, cutting-edge,
game-changing. No invented testimonials/logos/customer counts/statistics. Do
not name the pilot clinic ("our own practice" / "our clinic" only). Footer line
2 is load-bearing and stays verbatim.

> Final copy lives in `src/lib/copy.ts` and is the source of truth.
