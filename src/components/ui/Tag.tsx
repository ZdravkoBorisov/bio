import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-line px-2.5 py-1 font-mono text-[0.75rem] tracking-wide text-fg-muted">
      {children}
    </span>
  );
}
