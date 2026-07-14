import { manifesto } from "@/lib/copy";

// The Bite, Change 2. A quiet manifesto beat between the comparison and How It
// Works. Deliberately spare: no card, no icon, extra vertical space, centred on
// a narrow measure so the silence around it does the work. The last line
// ("Now it is.") lands on its own with a touch more weight.
export function Manifesto() {
  const last = manifesto.body.length - 1;

  return (
    <section className="border-t border-mist/20 bg-paper">
      <div className="mx-auto w-full max-w-2xl px-5 py-24 text-center sm:px-8 sm:py-32">
        <h2 className="font-serif text-[28px] font-[400] leading-[1.15] text-ink md:text-[40px]">
          {manifesto.heading}
        </h2>
        <div className="mt-8 space-y-5">
          {manifesto.body.map((paragraph, i) => (
            <p
              key={paragraph}
              className={
                i === last
                  ? "text-lg font-medium leading-relaxed text-ink"
                  : "text-lg leading-relaxed text-ink/75"
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
