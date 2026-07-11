import { z } from "zod";
import {
  billingHoursOptions,
  disciplineOptions,
  form,
  payerOptions,
  roleOptions,
  stateOptions,
} from "@/lib/copy";

// One schema, shared by the client (validate for UX) and the /api/lead route
// handler (validate for truth - never trust the client).
//
// Input caps are the spam ceiling: notes <= 1000 chars, every other string
// field <= 200. Anything larger is rejected server-side with a 400.

const e = form.errors;

const enumOf = (options: readonly string[]) =>
  z.enum([...options] as [string, ...string[]]);

const shortText = z
  .string()
  .trim()
  .min(1, e.required)
  .max(200, e.tooLong);

export const leadSchema = z.object({
  name: shortText,
  practice: shortText,
  role: enumOf(roleOptions),
  email: z
    .string()
    .trim()
    .min(1, e.required)
    .max(200, e.tooLong)
    .email(e.email),
  phone: z.string().trim().min(1, e.required).max(200, e.tooLong),
  state: enumOf(stateOptions),
  discipline: enumOf(disciplineOptions),
  payers: z
    .array(enumOf(payerOptions))
    .min(1, e.payers)
    .max(payerOptions.length),
  billing_hours: enumOf(billingHoursOptions),
  notes: z.string().max(1000, e.tooLong).optional().default(""),
});

export type Lead = z.infer<typeof leadSchema>;

// Field-level errors, keyed by field name, for the client to render.
export type LeadFieldErrors = Partial<Record<keyof Lead, string[]>>;

// The honeypot field name. Present in the POST body but NOT part of the schema
// (zod strips unknown keys). Checked separately in the route handler.
export const HONEYPOT_FIELD = "website";
