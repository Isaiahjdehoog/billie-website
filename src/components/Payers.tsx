import { payers } from "@/lib/copy";

// Green band: the payoff on two lines, sized so their left and right edges line
// up. The long top line is small, the short bottom line is big (~2.24x), so both
// render at the same width. Line one white/bone, line two Clay.
export function Payers() {
  return (
    <section className="bg-ledger text-bone">
      <div className="mx-auto w-full max-w-content px-5 py-16 text-center sm:px-8 sm:py-20">
        <p className="font-bold leading-[1.1] tracking-tight">
          <span className="block text-[16px] md:text-[34px]">
            {payers.payoff.line1}
          </span>
          <span className="block text-clay text-[36px] md:text-[76px]">
            {payers.payoff.line2}
          </span>
        </p>
      </div>
    </section>
  );
}
