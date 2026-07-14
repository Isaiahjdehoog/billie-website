import { hero } from "@/lib/copy";

export function Hero() {
  return (
    <section className="bg-bone">
      <div className="mx-auto w-full max-w-content px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-24">
        <div className="max-w-3xl">
          <h1 className="font-serif text-[36px] font-[400] leading-[1.08] tracking-[-0.01em] text-ink md:text-[56px]">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75 sm:text-xl">
            {hero.sub}
          </p>
          <div className="mt-8">
            <a
              href="#apply"
              className="inline-flex items-center justify-center rounded-full bg-ledger px-7 py-3.5 text-base font-medium text-bone transition-colors hover:bg-ledger/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ledger"
            >
              {hero.ctaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
