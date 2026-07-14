import { nav, WORDMARK } from "@/lib/copy";

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-mist/20 bg-bone/85 backdrop-blur supports-[backdrop-filter]:bg-bone/70">
      <div className="mx-auto flex w-full max-w-content items-center justify-between px-4 py-3 sm:px-8">
        <a
          href="#top"
          aria-label={WORDMARK}
          className="font-wordmark text-2xl leading-none text-ledger sm:text-3xl"
        >
          {WORDMARK}
        </a>
        <nav className="flex items-center gap-3 sm:gap-6">
          <a
            href={nav.cta.href}
            className="inline-flex items-center justify-center rounded-full bg-ledger px-3 py-2 text-xs font-medium text-bone transition-colors hover:bg-ledger/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ledger sm:px-4 sm:text-sm"
          >
            {nav.cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
