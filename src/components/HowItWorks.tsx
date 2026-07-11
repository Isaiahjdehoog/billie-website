import { howItWorks } from "@/lib/copy";

export function HowItWorks() {
  return (
    <section className="border-t border-mist/20 bg-bone">
      <div className="mx-auto w-full max-w-content px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
          {howItWorks.heading}
        </h2>
        <ol className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {howItWorks.steps.map((step, i) => (
            <li key={step.heading} className="flex flex-col">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-clay font-display text-base font-semibold text-bone"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {step.heading}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink/75">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
