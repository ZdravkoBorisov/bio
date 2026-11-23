import { cn } from "@/lib/cn";

type StatusDotProps = {
  active?: boolean;
  tone?: "accent" | "warn";
  className?: string;
};

export function StatusDot({ active = true, tone = "accent", className }: StatusDotProps) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-block size-1.5 rounded-full transition-colors duration-700",
        active ? (tone === "warn" ? "bg-warn" : "bg-accent animate-pulse-dot") : "bg-fg-faint",
        className,
      )}
    />
  );
}
