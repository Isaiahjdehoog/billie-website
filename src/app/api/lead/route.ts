import { NextResponse } from "next/server";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";
import { awsCredentialsProvider } from "@vercel/oidc-aws-credentials-provider";
import { autoReply, leadEmailLabels } from "@/lib/copy";
import { HONEYPOT_FIELD, leadSchema, type Lead } from "@/lib/lead-schema";

// Node runtime (the AWS SDK is not built for Edge). vercel.json pins the
// function region to syd1 (Sydney), next to SES ap-southeast-2.
export const runtime = "nodejs";
export const preferredRegion = "syd1";

// Both addresses are on getbillie.com.au, a verified SES domain identity in
// ap-southeast-2. The IAM role only allows these two From addresses.
const LEAD_INBOX = "info@getbillie.com.au";
const LEAD_FROM = "BiLLiE <info@getbillie.com.au>";
const AUTOREPLY_FROM = "Isaiah de Hoog <isaiah@getbillie.com.au>";
const AUTOREPLY_REPLY_TO = "isaiah@getbillie.com.au";

const SES_REGION = "ap-southeast-2";

// Auth is Vercel OIDC: the function swaps its Vercel token for short-lived AWS
// credentials on the role in AWS_ROLE_ARN. No long-lived keys anywhere.
let ses: SESv2Client | undefined;
function sesClient(roleArn: string): SESv2Client {
  if (!ses) {
    ses = new SESv2Client({
      region: SES_REGION,
      credentials: awsCredentialsProvider({ roleArn }),
    });
  }
  return ses;
}

async function sendText(
  client: SESv2Client,
  email: { from: string; to: string; replyTo: string; subject: string; text: string },
): Promise<void> {
  await client.send(
    new SendEmailCommand({
      FromEmailAddress: email.from,
      Destination: { ToAddresses: [email.to] },
      ReplyToAddresses: [email.replyTo],
      Content: {
        Simple: {
          Subject: { Data: email.subject, Charset: "UTF-8" },
          Body: { Text: { Data: email.text, Charset: "UTF-8" } },
        },
      },
    }),
  );
}

function leadEmailText(lead: Lead): string {
  const value = (key: string): string => {
    if (key === "payers") return lead.payers.join(", ");
    if (key === "notes") return lead.notes?.trim() ? lead.notes.trim() : "-";
    // Conditional fields (workcover_state, third_party_detail) are "" when their
    // payer wasn't ticked - show a dash rather than a blank line.
    const raw = (lead as Record<string, unknown>)[key];
    return raw == null || raw === "" ? "-" : String(raw);
  };

  const lines = leadEmailLabels.map((f) => `${f.label}: ${value(f.key)}`);
  return ["New lead for BiLLiE", "", ...lines].join("\n");
}

export async function POST(request: Request) {
  // Parse the body defensively. A malformed body is a 400, never a 500.
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: a bot fills the hidden field. Pretend success, send nothing.
  const honeypot = (body as Record<string, unknown>)?.[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Server-side validation is the source of truth. Input caps here are the
  // spam ceiling. Never echo submitted PII back in the error response - only
  // static field-error messages.
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }
  const lead = parsed.data;

  const roleArn = process.env.AWS_ROLE_ARN;
  if (!roleArn) {
    console.error("AWS_ROLE_ARN is not set");
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  const client = sesClient(roleArn);

  // Email 1 - the lead notification. This is the one that matters. If it fails,
  // the whole request fails so the practice knows to retry.
  try {
    await sendText(client, {
      from: LEAD_FROM,
      to: LEAD_INBOX,
      replyTo: lead.email,
      subject: `New BiLLiE lead - ${lead.practice}`,
      text: leadEmailText(lead),
    });
  } catch (err) {
    console.error("Lead notification email failed", errorName(err));
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  // Email 2 - the courtesy auto-reply, sent as Isaiah personally so replies land
  // in his inbox (replyTo isaiah@). A failure here must NOT fail the request: we
  // already captured the lead. Log and move on.
  try {
    await sendText(client, {
      from: AUTOREPLY_FROM,
      to: lead.email,
      replyTo: AUTOREPLY_REPLY_TO,
      subject: autoReply.subject.replaceAll("{name}", lead.name),
      text: autoReply.body
        .replaceAll("{name}", lead.name)
        .replaceAll("{practice}", lead.practice),
    });
  } catch (err) {
    console.error("Auto-reply email failed (lead still captured)", errorName(err));
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}

// Log the error's name and message only. SES errors can quote the recipient
// address back, so the full object is never logged.
function errorName(err: unknown): string {
  if (err instanceof Error) return `${err.name}: ${err.message.replace(/\S+@\S+/g, "<email>")}`;
  return "unknown error";
}
