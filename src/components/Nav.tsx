import { nav, WORDMARK } from "@/lib/copy";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-mist/20 bg-bone/85 backdrop-blur supports-[backdrop-filter]:bg-bone/70">
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-4 py-3 sm:px-8">
        <a
          href="#top"
          aria-label={WORDMARK}
          className="font-wordmark text-2xl font-bold leading-none text-ledger sm:text-3xl"
        >
          {WORDMARK}
        </a>
        <nav className="flex items-center gap-3 sm:gap-6">
          <a href={nav.cta.href} className="btn btn--sm">
            <span className="btn__mask">
              <span className="btn__inner">
                <span className="btn__label">{nav.cta.label}</span>
                <span className="btn__label" aria-hidden="true">
                  {nav.cta.label}
                </span>
              </span>
            </span>
          </a>
        </nav>
      </div>
    </header>
  );
}
