import { origin } from "@/lib/copy";

// The trust section - first person, Isaiah speaking. On desktop the story sits
// left and a pull quote fills the otherwise-empty right column. The pull quote
// duplicates the first body line, so it is dropped entirely on mobile rather
// than stacked.
export function OriginStory() {
  return (
    <section className="border-t border-mist/20 bg-paper">
      <div className="mx-auto w-full max-w-content px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
          <div className="max-w-2xl">
            <h2 className="font-serif text-[28px] font-[400] leading-[1.15] text-ink md:text-[40px]">
              {origin.heading}
            </h2>
            {origin.body.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-4 text-lg leading-relaxed text-ink/75"
              >
                {paragraph}
              </p>
            ))}
            <p className="mt-6 u-label text-mist">
              {origin.attribution}
            </p>
          </div>

          {/* Pull quote - desktop only. A quote, not a card: just a left rule. */}
          <aside className="hidden lg:block">
            <blockquote className="border-l-4 border-ledger py-2 pl-6">
              {origin.pullQuote.map((line) => (
                <p
                  key={line}
                  className="font-serif text-[28px] font-normal leading-snug text-ink"
                >
                  {line}
                </p>
              ))}
            </blockquote>
          </aside>
        </div>
      </div>
    </section>
  );
}
