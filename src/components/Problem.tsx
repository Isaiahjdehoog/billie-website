import { problem } from "@/lib/copy";

export function Problem() {
  return (
    <section className="border-t border-mist/20 bg-paper">
      <div className="mx-auto w-full max-w-content px-5 py-16 sm:px-8 sm:py-24">
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {problem.blocks.map((block) => (
            <div key={block.heading}>
              <h2 className="text-[19px] font-bold leading-snug text-ledger">
                {block.heading}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink/75">
                {block.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
