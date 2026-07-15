import { payers } from "@/lib/copy";

// Green band: the emotional payoff, big. Line one white/bone, line two in Clay,
// both the same size.
export function Payers() {
  return (
    <section className="bg-ledger text-bone">
      <div className="mx-auto w-full max-w-content px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className="text-3xl font-bold leading-snug tracking-tight sm:text-5xl">
          <span className="block">{payers.payoff.line1}</span>
          <span className="block text-clay">{payers.payoff.line2}</span>
        </p>
      </div>
    </section>
  );
}
