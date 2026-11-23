import { cn } from "@/lib/cn";

/** Receding grid floor, fading out towards the horizon. Purely decorative. */
export function PerspectiveGrid({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("perspective-grid pointer-events-none absolute inset-x-0 overflow-hidden", className)}>
      <div className="perspective-grid-floor" />
    </div>
  );
}
