import { comparison } from "@/lib/copy";

// The centrepiece. Two columns on desktop, stacked on mobile. The asymmetry is
// the whole argument: a long, dense, faded "Right now" column beside a short,
// solid, spacious "With BiLLiE" column. items-start keeps each column its
// natural height so the right card stays short and its white space does the
// talking. Do not equalise the two cards.
export function Comparison() {
  const lastLeft = comparison.leftSteps.length - 1;

  return (
    <section className="border-t border-mist/20 bg-bone">
      <div className="mx-auto w-full max-w-content px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {comparison.heading}
        </h2>

        <div className="mt-10 grid items-start gap-6 sm:grid-cols-2">
          {/* Right now - no fill, thin Mist border, faded Mist text, dense. */}
          <div className="rounded-2xl border border-mist/40 p-6 sm:p-8">
            <p className="font-display text-sm font-semibold tracking-wide text-mist">
              {comparison.leftLabel}
            </p>
            <ul className="mt-5 space-y-2.5">
              {comparison.leftSteps.map((step, i) => {
                // The rejection loop is the point of the section: Clay, medium
                // weight, extra space above so it lands as its own beat.
                const isBeat = i === lastLeft;
                return (
                  <li
                    key={step}
                    className={`flex gap-3 text-base ${
                      isBeat ? "pt-3 font-medium text-clay" : "text-mist"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 shrink-0 text-clay"
                    >
                      ✕
                    </span>
                    <span className="leading-snug">{step}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* With BiLLiE - solid Paper fill, Ledger border, larger Ledger text,
              generous padding (~2x the left card). Short and calm by design. */}
          <div className="rounded-2xl border border-ledger/50 bg-paper px-6 py-12 sm:px-8 sm:py-16">
            <p className="font-display text-sm font-semibold tracking-wide text-ledger">
              {comparison.rightLabel}
            </p>
            <ul className="mt-5 space-y-4">
              {comparison.rightSteps.map((step) => (
                <li key={step} className="flex gap-3 text-ledger">
                  <span aria-hidden="true" className="mt-1 shrink-0">
                    ✓
                  </span>
                  <span className="text-lg font-medium leading-snug sm:text-xl">
                    {step}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* The payoff (The Bite, Change 3) - centred, larger than body, room. */}
        <p className="mx-auto mt-12 max-w-2xl text-center font-display text-2xl font-semibold leading-snug text-ink sm:mt-16 sm:text-3xl">
          {comparison.closingLine}
        </p>
      </div>
    </section>
  );
}
