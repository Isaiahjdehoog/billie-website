import { status } from "@/lib/copy";

export function StatusBar() {
  return (
    <div className="bg-ledger text-bone">
      <div className="mx-auto w-full max-w-content px-4 py-2 text-center sm:px-8">
        <p className="font-display text-xs font-medium tracking-wide sm:text-sm">
          {status.line}
        </p>
      </div>
    </div>
  );
}
