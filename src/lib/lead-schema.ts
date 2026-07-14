import { z } from "zod";
import {
  form,
  invoiceVolumeOptions,
  payerOptions,
  roleOptions,
  stateOptions,
} from "@/lib/copy";

// One schema, shared by the client (validate for UX) and the /api/lead route
// handler (validate for truth - never trust the client).
//
// Input caps are the spam ceiling: notes <= 1000 chars, every other string
// field <= 200. Anything larger is rejected server-side with a 400.
//
// Two conditional fields depend on the payer checkboxes:
//   - workcover_state    required iff "WorkCover" is ticked
//   - third_party_detail required iff "Third-party insurers" is ticked
// When their payer is not ticked they are neither required nor kept: the
// transform below blanks them so a stale value can never reach the email.

const e = form.errors;

const WORKCOVER = "WorkCover";
const THIRD_PARTY = "Third-party insurers";
const STATES = stateOptions as readonly string[];

const enumOf = (options: readonly string[]) =>
  z.enum([...options] as [string, ...string[]]);

const shortText = z.string().trim().min(1, e.required).max(200, e.tooLong);

export const leadSchema = z
  .object({
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
    payers: z
      .array(enumOf(payerOptions))
      .min(1, e.payers)
      .max(payerOptions.length),
    workcover_state: z.string().trim().max(200, e.tooLong).optional().default(""),
    third_party_detail: z
      .string()
      .trim()
      .max(200, e.tooLong)
      .optional()
      .default(""),
    invoice_volume: enumOf(invoiceVolumeOptions),
    notes: z.string().max(1000, e.tooLong).optional().default(""),
  })
  .superRefine((val, ctx) => {
    if (val.payers.includes(WORKCOVER)) {
      if (!val.workcover_state) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["workcover_state"],
          message: e.required,
        });
      } else if (!STATES.includes(val.workcover_state)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["workcover_state"],
          message: e.required,
        });
      }
    }
    if (val.payers.includes(THIRD_PARTY) && !val.third_party_detail) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["third_party_detail"],
        message: e.required,
      });
    }
  })
  // Drop conditional answers whose payer is no longer ticked, so nothing stale
  // is stored or emailed.
  .transform((val) => ({
    ...val,
    workcover_state: val.payers.includes(WORKCOVER) ? val.workcover_state : "",
    third_party_detail: val.payers.includes(THIRD_PARTY)
      ? val.third_party_detail
      : "",
  }));

export type Lead = z.infer<typeof leadSchema>;

// Field-level errors, keyed by field name, for the client to render.
export type LeadFieldErrors = Partial<Record<keyof Lead, string[]>>;

// The honeypot field name. Present in the POST body but NOT part of the schema
// (zod strips unknown keys). Checked separately in the route handler.
export const HONEYPOT_FIELD = "website";
