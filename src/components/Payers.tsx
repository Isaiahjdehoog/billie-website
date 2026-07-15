import { payers } from "@/lib/copy";

// Green band: the payer list, then the payoff (moved here from the comparison).
// Line one white/bone, line two in Clay.
export function Payers() {
  return (
    <section className="bg-ledger text-bone">
      <div className="mx-auto w-full max-w-content px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className="text-2xl font-bold tracking-tight sm:text-3xl">
          {payers.list}
        </p>
        <p className="mt-6 text-2xl font-bold leading-snug tracking-tight sm:text-4xl">
          <span className="block">{payers.payoff.line1}</span>
          <span className="block text-clay">{payers.payoff.line2}</span>
        </p>
      </div>
    </section>
  );
}
