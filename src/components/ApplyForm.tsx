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
  discipline: string;
  payers: string[];
  billing_hours: string;
  notes: string;
};

const INITIAL: Values = {
  name: "",
  practice: "",
  role: "",
  email: "",
  phone: "",
  state: "",
  discipline: "",
  payers: [],
  billing_hours: "",
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
      <label
        htmlFor={htmlFor}
        className="block font-display text-sm font-medium text-ink"
      >
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

  function togglePayer(option: string) {
    setValues((prev) => ({
      ...prev,
      payers: prev.payers.includes(option)
        ? prev.payers.filter((p) => p !== option)
        : [...prev.payers, option],
    }));
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

  const firstError = (key: keyof Values): string | undefined =>
    errors[key]?.[0];

  if (submitted) {
    return (
      <section
        id="apply"
        className="border-t border-mist/20 bg-bone scroll-mt-20"
      >
        <div className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
          <div className="rounded-2xl border border-ledger/20 bg-paper p-8 sm:p-10">
            <h2 className="font-display text-2xl font-semibold text-ledger sm:text-3xl">
              {success.heading}
            </h2>
            {success.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-base leading-relaxed text-ink/75"
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

  return (
    <section id="apply" className="border-t border-mist/20 bg-bone scroll-mt-20">
      <div className="mx-auto w-full max-w-2xl px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
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

          <div className="grid gap-5 sm:grid-cols-2">
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

            <FieldShell
              htmlFor="discipline"
              label={f.discipline.label}
              error={firstError("discipline")}
            >
              <select
                id="discipline"
                name="discipline"
                className={inputClass}
                value={values.discipline}
                onChange={(e) => update("discipline", e.target.value)}
                aria-invalid={Boolean(firstError("discipline"))}
              >
                <option value="" disabled>
                  {form.selectPlaceholder}
                </option>
                {f.discipline.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FieldShell>
          </div>

          <FieldShell label={f.payers.label} error={firstError("payers")}>
            <div className="grid gap-2 sm:grid-cols-2">
              {f.payers.options.map((option) => (
                <label
                  key={option}
                  className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-mist/40 bg-paper px-3 py-2.5 text-sm text-ink hover:border-ledger/50"
                >
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
              ))}
            </div>
          </FieldShell>

          <FieldShell
            htmlFor="billing_hours"
            label={f.billing_hours.label}
            error={firstError("billing_hours")}
          >
            <select
              id="billing_hours"
              name="billing_hours"
              className={inputClass}
              value={values.billing_hours}
              onChange={(e) => update("billing_hours", e.target.value)}
              aria-invalid={Boolean(firstError("billing_hours"))}
            >
              <option value="" disabled>
                {form.selectPlaceholder}
              </option>
              {f.billing_hours.options.map((option) => (
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
            className="inline-flex w-full items-center justify-center rounded-full bg-ledger px-7 py-3.5 font-display text-base font-semibold text-bone transition-colors hover:bg-[#14492e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ledger disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {status === "submitting" ? form.submittingLabel : form.submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
