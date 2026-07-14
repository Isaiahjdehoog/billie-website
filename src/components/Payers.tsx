import { payers } from "@/lib/copy";

// Two lines only. Line 2 is the payoff that echoes the hero and the business
// card.
export function Payers() {
  return (
    <section className="bg-ledger text-bone">
      <div className="mx-auto w-full max-w-content px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className="text-2xl font-bold tracking-tight sm:text-3xl">
          {payers.line1}
        </p>
        <p className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {payers.line2}
        </p>
      </div>
    </section>
  );
}
