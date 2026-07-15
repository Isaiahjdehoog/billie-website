import { payers } from "@/lib/copy";

// Green band: the payoff on two lines, all cream/bone. Sizes are matched so the
// left and right edges line up (small top, big bottom). The bottom stands out
// via a heavier weight (700) and bigger size; the top is lighter (400).
export function Payers() {
  return (
    <section className="bg-ledger text-bone">
      <div className="mx-auto w-full max-w-content px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className="leading-[1.1] tracking-tight">
          <span className="block text-[19px] font-normal md:text-[38px]">
            {payers.payoff.line1}
          </span>
          <span className="block text-[35px] font-bold md:text-[71px]">
            {payers.payoff.line2}
          </span>
        </p>
      </div>
    </section>
  );
}
