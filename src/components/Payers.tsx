import { payers } from "@/lib/copy";

export function Payers() {
  return (
    <section className="bg-ledger text-bone">
      <div className="mx-auto w-full max-w-content px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className="mx-auto max-w-3xl font-display text-lg leading-relaxed text-bone/85 sm:text-xl">
          {payers.list}
        </p>
        <p className="mt-6 font-display text-2xl font-semibold tracking-tight sm:text-4xl">
          {payers.tagline}
        </p>
      </div>
    </section>
  );
}
