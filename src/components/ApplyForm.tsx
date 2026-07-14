"use client";

import { useState } from "react";
import { apply, form, success } from "@/lib/copy";
import {
  HONEYPOT_FIELD,
  leadSchema,
  type LeadFieldErrors,
} from "@/lib/lead-schema";

type Values = {
  name: string;
  practice: string;
  role: string;
  email: string;
  phone: string;
  state: string;
  payers: string[];
  workcover_state: string;
  third_party_detail: string;
  invoice_volume: string;
  notes: string;
};

const INITIAL: Values = {
  name: "",
  practice: "",
  role: "",
  email: "",
  phone: "",
  state: "",
  payers: [],
  workcover_state: "",
  third_party_detail: "",
  invoice_volume: "",
  notes: "",
};

const inputClass =
  "w-full rounded-lg border border-mist/40 bg-paper px-3 py-2.5 text-ink placeholder:text-mist focus:border-ledger focus:outline-none focus:ring-2 focus:ring-ledger/30";

function FieldShell({
  htmlFor,
  label,
  optional,
  error,
  children,
}: {
  htmlFor?: string;
  label: string;
  optional?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block u-label text-ink">
        {label}
        {optional ? (
          <span className="ml-1 font-sans font-normal text-mist">
            ({optional})
          </span>
        ) : null}
      </label>
      <div className="mt-1.5">{children}</div>
      {error ? <p className="mt-1 text-sm text-clay">{error}</p> : null}
    </div>
  );
}

export function ApplyForm() {
  const [values, setValues] = useState<Values>(INITIAL);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<LeadFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [submitted, setSubmitted] = useState(false);

  const f = form.fields;

  function update<K extends keyof Values>(key: K, value: Values[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  // Toggling a payer also clears its conditional field when unticked, so a
  // hidden field never carries a stale value and never blocks submit.
  function togglePayer(option: string) {
    setValues((prev) => {
      const has = prev.payers.includes(option);
      const payers = has
        ? prev.payers.filter((p) => p !== option)
        : [...prev.payers, option];
      const next: Values = { ...prev, payers };
      if (option === "WorkCover" && has) next.workcover_state = "";
      if (option === "Third-party insurers" && has) next.third_party_detail = "";
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Client validation for UX. The server re-validates for truth.
    const parsed = leadSchema.safeParse(values);
    if (!parsed.success) {
      setErrors(parsed.error.flatten().fieldErrors);
      setStatus("error");
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, [HONEYPOT_FIELD]: honeypot }),
      });

      if (res.ok) {
        setSubmitted(true);
        return;
      }

      if (res.status === 400) {
        const data = (await res.json().catch(() => null)) as {
          errors?: LeadFieldErrors;
        } | null;
        if (data?.errors) setErrors(data.errors);
      }
      setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const firstError = (key: keyof Values): string | undefined => errors[key]?.[0];

  if (submitted) {
    return (
      <section
        id="apply"
        className="border-t border-mist/20 bg-bone scroll-mt-20"
      >
        <div className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="rounded-2xl border border-ledger/20 bg-paper p-8 sm:p-10">
            <h2 className="font-serif text-[34px] font-[400] leading-[1.12] text-ledger md:text-[56px]">
              {success.heading}
            </h2>
            {success.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-[17px] leading-relaxed text-ink/75 md:text-[18px]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const genericError = status === "error" && Object.keys(errors).length === 0;

  const showWorkcoverState = values.payers.includes("WorkCover");
  const showThirdPartyDetail = values.payers.includes("Third-party insurers");

  return (
    <section id="apply" className="border-t border-mist/20 bg-bone scroll-mt-20">
      <div className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="font-serif text-[34px] font-[400] leading-[1.12] text-ink md:text-[56px]">
          {apply.heading}
        </h2>
        {apply.sub.map((paragraph) => (
          <p
            key={paragraph}
            className="mt-4 text-base leading-relaxed text-ink/75"
          >
            {paragraph}
          </p>
        ))}

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          {/* Honeypot: visually hidden, NOT display:none. A bot fills it. */}
          <div aria-hidden="true" className="sr-only">
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
          </div>

          <FieldShell htmlFor="name" label={f.name.label} error={firstError("name")}>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete={f.name.autoComplete}
              className={inputClass}
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              aria-invalid={Boolean(firstError("name"))}
            />
          </FieldShell>

          <FieldShell
            htmlFor="practice"
            label={f.practice.label}
            error={firstError("practice")}
          >
            <input
              id="practice"
              name="practice"
              type="text"
              autoComplete={f.practice.autoComplete}
              className={inputClass}
              value={values.practice}
              onChange={(e) => update("practice", e.target.value)}
              aria-invalid={Boolean(firstError("practice"))}
            />
          </FieldShell>

          <FieldShell htmlFor="role" label={f.role.label} error={firstError("role")}>
            <select
              id="role"
              name="role"
              className={inputClass}
              value={values.role}
              onChange={(e) => update("role", e.target.value)}
              aria-invalid={Boolean(firstError("role"))}
            >
              <option value="" disabled>
                {form.selectPlaceholder}
              </option>
              {f.role.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FieldShell>

          <div className="grid gap-5 sm:grid-cols-2">
            <FieldShell
              htmlFor="email"
              label={f.email.label}
              error={firstError("email")}
            >
              <input
                id="email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete={f.email.autoComplete}
                className={inputClass}
                value={values.email}
                onChange={(e) => update("email", e.target.value)}
                aria-invalid={Boolean(firstError("email"))}
              />
            </FieldShell>

            <FieldShell
              htmlFor="phone"
              label={f.phone.label}
              error={firstError("phone")}
            >
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete={f.phone.autoComplete}
                className={inputClass}
                value={values.phone}
                onChange={(e) => update("phone", e.target.value)}
                aria-invalid={Boolean(firstError("phone"))}
              />
            </FieldShell>
          </div>

          <FieldShell
            htmlFor="state"
            label={f.state.label}
            error={firstError("state")}
          >
            <select
              id="state"
              name="state"
              className={inputClass}
              value={values.state}
              onChange={(e) => update("state", e.target.value)}
              aria-invalid={Boolean(firstError("state"))}
            >
              <option value="" disabled>
                {form.selectPlaceholder}
              </option>
              {f.state.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FieldShell>

          <FieldShell label={f.payers.label} error={firstError("payers")}>
            <div className="space-y-2">
              {f.payers.options.map((option) => (
                <div key={option}>
                  <label className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-mist/40 bg-paper px-3 py-2.5 text-sm text-ink hover:border-ledger/50">
                    <input
                      type="checkbox"
                      name="payers"
                      value={option}
                      checked={values.payers.includes(option)}
                      onChange={() => togglePayer(option)}
                      className="h-4 w-4 shrink-0 accent-ledger"
                    />
                    <span>{option}</span>
                  </label>

                  {option === "WorkCover" && showWorkcoverState ? (
                    <div className="ml-1 mt-2.5 border-l-2 border-ledger/30 pl-4">
                      <FieldShell
                        htmlFor="workcover_state"
                        label={f.workcover_state.label}
                        error={firstError("workcover_state")}
                      >
                        <select
                          id="workcover_state"
                          name="workcover_state"
                          className={inputClass}
                          value={values.workcover_state}
                          onChange={(e) =>
                            update("workcover_state", e.target.value)
                          }
                          aria-invalid={Boolean(firstError("workcover_state"))}
                        >
                          <option value="" disabled>
                            {form.selectPlaceholder}
                          </option>
                          {f.workcover_state.options.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </FieldShell>
                    </div>
                  ) : null}

                  {option === "Third-party insurers" && showThirdPartyDetail ? (
                    <div className="ml-1 mt-2.5 border-l-2 border-ledger/30 pl-4">
                      <FieldShell
                        htmlFor="third_party_detail"
                        label={f.third_party_detail.label}
                        error={firstError("third_party_detail")}
                      >
                        <input
                          id="third_party_detail"
                          name="third_party_detail"
                          type="text"
                          maxLength={200}
                          autoComplete="off"
                          className={inputClass}
                          value={values.third_party_detail}
                          onChange={(e) =>
                            update("third_party_detail", e.target.value)
                          }
                          aria-invalid={Boolean(
                            firstError("third_party_detail"),
                          )}
                        />
                      </FieldShell>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </FieldShell>

          <FieldShell
            htmlFor="invoice_volume"
            label={f.invoice_volume.label}
            error={firstError("invoice_volume")}
          >
            <select
              id="invoice_volume"
              name="invoice_volume"
              className={inputClass}
              value={values.invoice_volume}
              onChange={(e) => update("invoice_volume", e.target.value)}
              aria-invalid={Boolean(firstError("invoice_volume"))}
            >
              <option value="" disabled>
                {form.selectPlaceholder}
              </option>
              {f.invoice_volume.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FieldShell>

          <FieldShell
            htmlFor="notes"
            label={f.notes.label}
            optional={f.notes.optional}
            error={firstError("notes")}
          >
            <textarea
              id="notes"
              name="notes"
              rows={4}
              maxLength={1000}
              className={`${inputClass} resize-y`}
              value={values.notes}
              onChange={(e) => update("notes", e.target.value)}
              aria-invalid={Boolean(firstError("notes"))}
            />
          </FieldShell>

          {genericError ? (
            <p className="text-sm text-clay" role="alert">
              {form.errors.generic}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            <span className="btn__mask">
              <span className="btn__inner">
                <span className="btn__label">
                  {status === "submitting"
                    ? form.submittingLabel
                    : form.submitLabel}
                </span>
                <span className="btn__label" aria-hidden="true">
                  {status === "submitting"
                    ? form.submittingLabel
                    : form.submitLabel}
                </span>
              </span>
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
