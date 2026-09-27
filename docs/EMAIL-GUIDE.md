# BiLLiE email guide

Every email BiLLiE sends.
For each one: what sends it, where the words live, how to change them.

Last checked: 2026.09.27.

---

## The quick map

| Email | Who gets it | Words live in | Sent by |
|---|---|---|---|
| 1. Website lead | info@getbillie.com.au | website repo | AWS SES Sydney |
| 2. Website auto-reply | the person who filled in the form | website repo | AWS SES Sydney |
| 3. App sign-in code | a practice user | Supabase dashboard | Resend (for now) |
| 4. App password reset | a practice user | Supabase dashboard | Resend (for now) |
| 5. Daily digest | the practice | billie repo | AWS SES Sydney |
| 6. Claim to a third-party insurer | the insurer | billie repo | AWS SES Sydney |
| 7. Claim to ADF (Bupa) | Bupa | billie repo | AWS SES Sydney (not live yet) |
| 8. Portal login paused | the practice | billie repo | AWS SES Sydney |
| 9. Portal login still failing | the practice | billie repo | AWS SES Sydney |

Two repos:
- **website repo** = `~/Documents/CODING_2026/BiLLiE/Code/website`
- **billie repo** = `~/Documents/CODING_2026/BiLLiE/Code/billie`

---

## Part 1 - Website emails (website repo)

Both are sent when someone presses
"Become a founding practice" on getbillie.com.au.

The sending code is `src/app/api/lead/route.ts`, in the function `POST`.
It sends two emails, in this order.

### 1. Website lead notification

- **Trigger:** the form is sent and passes the checks.
- **To:** info@getbillie.com.au
- **From:** BiLLiE <info@getbillie.com.au>
- **Reply-To:** the person who filled in the form.
  So pressing Reply answers them directly.
- **If it fails:** the visitor sees an error and can try again.

Where the words live:
- The subject is in `src/app/api/lead/route.ts`.
  Look for `New BiLLiE lead -`.
- The labels, like "Practice name" and "Phone",
  are in `src/lib/copy.ts`, in `leadEmailLabels`.
- The first line, "New lead for BiLLiE",
  is in `route.ts`, in the function `leadEmailText`.

### 2. Website auto-reply

- **Trigger:** straight after email 1 is sent.
- **To:** the person who filled in the form.
- **From:** Isaiah de Hoog <isaiah@getbillie.com.au>
- **Reply-To:** isaiah@getbillie.com.au
- **If it fails:** nothing shows to the visitor.
  Their enquiry still reached info@. The failure is only logged.

Where the words live:
- `src/lib/copy.ts`, in `autoReply`.
- `subject` is the subject line.
- `body` is the whole email.
- `{name}` and `{practice}` are swapped
  for what the person typed. Keep them spelt exactly like that.

### How to change a website email

1. Open `src/lib/copy.ts` (or `route.ts` for the lead subject).
2. Change the words between the quote marks or backticks.
3. Don't delete the quote marks, backticks or commas.
4. Use hyphens, never long dashes.
5. Test it (Part 4), then open a pull request.

### The sender addresses

- The From addresses are at the top of `route.ts`.
- AWS only allows `info@` and `isaiah@` to send from this site.
- A new From address needs the AWS role changed first,
  or every send will fail.

---

## Part 2 - App sign-in emails (Supabase dashboard)

These are **not** in any repo's live code.
Supabase writes and sends them.

### 3. Sign-in code, and 4. Password reset

- **Trigger:** a practice user asks for a code on /login,
  or asks to reset their password.
- **From:** app@getbillie.com.au
- **Sent through:** Resend today.
  This is moving to AWS SES Sydney (Head of Development chat).

Where the words live:
1. Go to supabase.com and open the `billie-prod` project.
2. Go to **Authentication**, then **Email Templates**.
3. **Magic Link** is the sign-in code email.
4. **Reset Password** is the password reset email.
5. Each one has a Subject box and a Body box.

A copy of the sign-in code email is kept in the billie repo,
at `docs/email/auth-code.supabase.html`.
The top of that file explains how to copy it into Supabase.

### How to change a sign-in email

1. Edit `docs/email/auth-code.supabase.html` in the billie repo first,
   so the copy stays true.
2. Copy the whole file.
3. Paste it into the right template in Supabase and press Save.
4. Keep `{{ .Token }}` exactly as it is. That is the code.
5. Test it (Part 4).

When the sending service changes from Resend to SES,
**the templates stay where they are.**
Only the SMTP settings change
(Authentication, then SMTP Settings). The words don't move.

---

## Part 3 - App emails to practices and payers (billie repo)

All of these go through `packages/email`.
- The layout and wording of each email are in `packages/email/src/templates/`.
- The sending code is `packages/email/src/send.ts`.
- The sender is notifications@getbillie.com.au,
  set by the env var `SES_NOTIFICATIONS_FROM`.

### 5. Daily digest

- **Trigger:** a timed job every morning at 6:30am Brisbane
  (`/api/cron/digest`, set in `apps/app/vercel.json`).
- **To:** the practice's notification or billing email.
- **Template:** `packages/email/src/templates/notification-digest.tsx`
- **Subject:** `apps/app/src/lib/digest.ts`
  (it looks like "BiLLiE: 3 updates for Practice Name").

### 6. Claim to a third-party insurer

- **Trigger:** a practice approves an invoice for a third-party insurer
  (Allianz, QBE, GIO and so on).
- **To:** the insurer's claims address, with the invoice PDF attached.
- **Template:** `packages/email/src/templates/submission-third-party.tsx`
- **Shared layout:** `packages/email/src/templates/_layout.tsx`
  and `_parts.tsx`.
- **Subject:** the function `composeSubmissionSubject`
  in `packages/shared/src/audit-context/index.ts`.
  The patient's name must never go in the subject.
- **Sending code:** `apps/app/src/lib/submission-send.ts`

### 7. Claim to ADF (Bupa)

- **Template:** `packages/email/src/templates/submission-adf.tsx`
- **Status:** built, but nothing sends it yet.

### 8. Portal login paused

- **Trigger:** BiLLiE can't sign in to a payer portal
  (for example WorkCover), so it pauses those claims.
- **To:** the practice.
- **Template:** `packages/email/src/templates/portal-credential-paused.tsx`
- **Subject:** `apps/app/src/lib/portal-credentials.ts`,
  in `NOTICES` ("Action needed: ... submissions are paused").

### 9. Portal login still failing

- **Trigger:** the practice saves a new portal password,
  and the portal still rejects it.
- **To:** the practice.
- **Template:** `packages/email/src/templates/portal-credential-resume-failed.tsx`
- **Subject:** same place as email 8, in `NOTICES`.

### How to change an app email

The billie repo has its own rules (its CLAUDE.md and the DECs).
The easiest way is to ask Claude Code in the billie repo, for example:
"change the wording of the digest email to ...".

If you do it yourself:
1. Open the template file listed above.
2. Change only the words between the tags.
   Leave anything in `{curly brackets}` alone. Those are filled in by the app.
3. Some files have lines starting with 🔒.
   Those are rules for that email. Read them before changing it.
4. Test it (Part 4).

---

## Part 4 - Test before it goes live

### Website emails

1. Make your change on a new branch, never on `main`.
2. Push the branch and open a pull request.
3. Vercel builds a **preview** link for it.
   The link shows on the pull request.
4. Open the preview link and fill in the form.
   - Put **TEST** in the practice name.
   - Use **info@getbillie.com.au** as the email,
     so both emails come to you and no real person gets one.
5. Check both emails arrived at info@ and read right.
6. Only then merge to `main`. That puts it on the live site.

### App emails to practices and payers

1. See the email without sending it.
   In the billie repo, run:
   - `pnpm --filter @billie/email preview:digest`
   - `pnpm --filter @billie/email preview:submission`
   Each one writes an HTML file you can open in a browser.
2. Run the tests: `pnpm --filter @billie/email test`.
   A wording change will fail a snapshot test.
   That is expected. Claude Code can update the snapshot after you check it.
3. Never send a test claim to a real insurer.

### Sign-in emails

1. Change the template in Supabase.
2. Go to app.getbillie.com.au/login.
3. Ask for a code with **your own** email address.
4. Check it arrives and reads right.

---

## Things that must not change without thinking

- The website From addresses (AWS only allows info@ and isaiah@).
- Patient names in any subject line. Never.
- `{name}`, `{practice}` and `{{ .Token }}` placeholders.
- The domain getbillie.com.au in Resend. Don't add or verify it
  in any Resend account (DEC-79 rule 5). It breaks app sign-in.

---

## Part 5 - One-time AWS setup for the website form

The website sends through AWS SES using a role, not a password.
That role must exist before the form can send.
Until it does, the form shows its error message.

This is an AWS change. Do it once, by hand or in the billie repo's CDK
(`infra/aws/lib/constructs/iam-roles.ts`, next to `billie-prod-app`).

### Step 1 - Check the Vercel team

1. Open Vercel, then the `billie-website` project.
2. Check it sits in the team `isaiahjdehoogs-projects`,
   the same team as the `billie` app.
3. If it is in a different team, stop.
   The role below would need a second OIDC provider.

### Step 2 - Turn on OIDC in Vercel

1. `billie-website` project, then **Settings**, then **Security**.
2. Turn on **OIDC Federation**, mode **Team**.
3. Save.

### Step 3 - Create the IAM role in AWS

1. AWS console, region Sydney (ap-southeast-2), then **IAM**, then **Roles**.
2. **Create role**, then **Custom trust policy**.
3. Paste the trust policy below.
4. Skip adding managed permissions.
5. Name it `billie-prod-website-mailer`. Create it.
6. Open the role, then **Add permissions**, then **Create inline policy**, then **JSON**.
7. Paste the permissions policy below.
   Name it `WebsiteLeadSend`. Save.
8. Copy the role's ARN.

The Vercel OIDC provider already exists in the account (the app uses it).
Don't create a second one.

Trust policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::435958718453:oidc-provider/oidc.vercel.com/isaiahjdehoogs-projects"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.vercel.com/isaiahjdehoogs-projects:aud": "https://vercel.com/isaiahjdehoogs-projects"
        },
        "StringLike": {
          "oidc.vercel.com/isaiahjdehoogs-projects:sub": "owner:isaiahjdehoogs-projects:project:billie-website:environment:*"
        }
      }
    }
  ]
}
```

`environment:*` lets Preview and Production both send,
so a preview can be tested.
To lock it to live only, change `*` to `production`.

Permissions policy:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "WebsiteLeadSend",
      "Effect": "Allow",
      "Action": "ses:SendEmail",
      "Resource": [
        "arn:aws:ses:ap-southeast-2:435958718453:identity/getbillie.com.au",
        "arn:aws:ses:ap-southeast-2:435958718453:configuration-set/billie-prod-default"
      ],
      "Condition": {
        "StringEquals": {
          "ses:FromAddress": [
            "info@getbillie.com.au",
            "isaiah@getbillie.com.au"
          ]
        }
      }
    }
  ]
}
```

This role can only send email, only from getbillie.com.au,
and only as info@ or isaiah@. It can't read or change anything.

### Step 4 - Give Vercel the role

1. `billie-website` project, then **Settings**, then **Environment Variables**.
2. Add `AWS_ROLE_ARN` = the ARN from Step 3.
   Tick **Production** and **Preview**.
3. Redeploy the preview (Deployments, the latest preview, then Redeploy).

### Step 5 - Test

1. Do the website test in Part 4.
2. Both emails arrive at info@? Done.
3. Only after that, delete `RESEND_API_KEY` from the Vercel project.
