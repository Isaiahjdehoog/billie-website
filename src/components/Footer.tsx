import { Fragment } from "react";
import { footer } from "@/lib/copy";

// Digit runs render in the sans face (Jost) via .num. The footer is already
// sans, so this is a guard, not a visual change - it keeps the "© 2026" year and
// the "ap-southeast-2" region out of any serif context for good.
function withNumerals(text: string) {
  return text.split(/(\d[\d-]*)/).map((part, i) =>
    /^\d/.test(part) ? (
      <span key={i} className="num">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

// Renders the four footer lines verbatim. Line 2 is load-bearing (SES
// production-access alignment) - it stays exactly as written in copy.ts.
export function Footer() {
  return (
    <footer className="border-t border-mist/20 bg-bone">
      <div className="mx-auto w-full max-w-content px-5 py-12 sm:px-8">
        <div className="max-w-prose space-y-3 text-sm leading-relaxed text-mist">
          {footer.lines.map((line) =>
            line.includes(footer.contactEmail) ? (
              <p key={line}>
                Contact{" "}
                <a
                  href={`mailto:${footer.contactEmail}`}
                  className="text-ink underline decoration-mist/50 underline-offset-2 hover:text-ledger"
                >
                  {footer.contactEmail}
                </a>
              </p>
            ) : (
              <p key={line}>{withNumerals(line)}</p>
            ),
          )}
        </div>
      </div>
    </footer>
  );
}
