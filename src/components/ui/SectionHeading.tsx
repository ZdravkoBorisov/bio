import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "./Reveal";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeading({ index, label, title, lede, id, className }: SectionHeadingProps) {
  return (
    <header className={cn("max-w-3xl", className)}>
      <Reveal>
        <p className="label-mono flex items-center gap-3">
          <span className="text-accent">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line-strong" />
          {label}
        </p>
      </Reveal>
      <Reveal delay={0.06}>
        <h2
          id={id}
          className="mt-5 text-balance text-3xl font-medium tracking-[-0.03em] text-fg sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]"
        >
          {title}
        </h2>
      </Reveal>
      {lede ? (
        <Reveal delay={0.12}>
          <p className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            {lede}
          </p>
        </Reveal>
      ) : null}
    </header>
  );
}
