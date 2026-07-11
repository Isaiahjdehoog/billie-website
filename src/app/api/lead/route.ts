import { NextResponse } from "next/server";
import { Resend } from "resend";
import { autoReply, leadEmailLabels } from "@/lib/copy";
import { HONEYPOT_FIELD, leadSchema, type Lead } from "@/lib/lead-schema";

// Sydney. preferredRegion applies to the Edge runtime; vercel.json pins the
// default function region to syd1 as well.
export const runtime = "edge";
export const preferredRegion = "syd1";

const FROM = "BiLLiE <hello@getbillie.com.au>";
const LEAD_INBOX = "info@getbillie.com.au";

function leadEmailText(lead: Lead): string {
  const value = (key: string): string => {
    if (key === "payers") return lead.payers.join(", ");
    if (key === "notes") return lead.notes?.trim() ? lead.notes.trim() : "-";
    return String((lead as Record<string, unknown>)[key] ?? "-");
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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ ok: false }, { status: 500 });
  }
  const resend = new Resend(apiKey);

  // Email 1 - the lead notification. This is the one that matters. If it fails,
  // the whole request fails so the practice knows to retry.
  const { error: leadError } = await resend.emails.send({
    from: FROM,
    to: LEAD_INBOX,
    replyTo: lead.email,
    subject: `New BiLLiE lead - ${lead.practice}`,
    text: leadEmailText(lead),
  });

  if (leadError) {
    console.error("Lead notification email failed", leadError);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  // Email 2 - the courtesy auto-reply. hello@ is send-only and NOT an inbox, so
  // replyTo must be info@. A failure here must NOT fail the request: we already
  // captured the lead. Log and move on.
  try {
    const { error: replyError } = await resend.emails.send({
      from: FROM,
      to: lead.email,
      replyTo: LEAD_INBOX,
      subject: autoReply.subject,
      text: autoReply.body
        .replaceAll("{name}", lead.name)
        .replaceAll("{practice}", lead.practice),
    });
    if (replyError) {
      console.error("Auto-reply email failed (lead still captured)", replyError);
    }
  } catch (err) {
    console.error("Auto-reply email threw (lead still captured)", err);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
