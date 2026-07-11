import { credibility } from "@/lib/copy";

export function Credibility() {
  return (
    <section className="border-t border-mist/20 bg-paper">
      <div className="mx-auto w-full max-w-content px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
            {credibility.heading}
          </h2>
          {credibility.body.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-4 text-lg leading-relaxed text-ink/75"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
