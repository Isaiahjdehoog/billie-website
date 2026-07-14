import { howItWorks } from "@/lib/copy";

export function HowItWorks() {
  return (
    <section className="border-t border-mist/20 bg-bone">
      <div className="mx-auto w-full max-w-content px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="text-[1.75rem] font-semibold leading-tight text-ink sm:text-4xl">
          {howItWorks.heading}
        </h2>
        <ol className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {howItWorks.steps.map((step, i) => (
            <li key={step.heading} className="flex flex-col">
              <span
                aria-hidden="true"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-clay font-mono text-base font-medium text-bone"
              >
                {i + 1}
              </span>
              <h3 className="mt-4 text-[1.375rem] font-semibold text-ink">
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
