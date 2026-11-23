import type { ProductionRow } from "@/content/production";

/** Small abstract glyphs for each status row. Decorative — they carry no data. */
export function RowVisual({ kind, running }: { kind: ProductionRow["visual"]; running: boolean }) {
  const playState = running ? "running" : "paused";

  switch (kind) {
    case "services":
      return (
        <span className="grid grid-cols-20 gap-[3px]">
          {Array.from({ length: 80 }, (_, i) => (
            <span
              key={i}
              className="size-[5px] rounded-[1px] bg-accent/70"
              style={{
                animation: "cell-blink 4s ease-in-out infinite",
                animationDelay: `${((i * 7) % 40) * 0.1}s`,
                animationPlayState: playState,
              }}
            />
          ))}
        </span>
      );
    case "flow":
      return (
        <span className="flex w-32 flex-col gap-2">
          {[3.2, 4.6].map((duration) => (
            <span key={duration} className="relative block h-px overflow-hidden bg-line-strong">
              <span
                className="absolute -top-px left-0 h-[3px] w-6 rounded-full bg-gradient-to-r from-transparent to-accent"
                style={{ animation: `lane-travel ${duration}s linear infinite`, animationPlayState: playState }}
              />
            </span>
          ))}
        </span>
      );
    case "cloud":
      return (
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="grid size-5 place-items-center rounded-[4px] border border-line-strong">
              <span className="size-1 rounded-full bg-accent/80" />
            </span>
          ))}
        </span>
      );
    case "code":
      return (
        <span className="font-mono text-[0.75rem] tracking-wide text-fg-subtle">
          plan <span className="text-fg-faint">→</span> review <span className="text-fg-faint">→</span>{" "}
          <span className="text-accent">apply</span>
        </span>
      );
    case "signal":
      return (
        <span className="relative block h-5 w-32 overflow-hidden">
          <span className="absolute inset-x-0 top-1/2 h-px bg-line-strong" />
          <span
            className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_rgb(124_196_255/0.8)]"
            style={{ animation: "scan 3.6s ease-in-out infinite alternate", animationPlayState: playState }}
          />
        </span>
      );
    case "incident":
      return (
        <span className="inline-flex items-center gap-2 rounded-full border border-warn/30 px-2.5 py-1 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-warn">
          <span className="size-1.5 rounded-full bg-warn" />
          On-call
        </span>
      );
  }
}
