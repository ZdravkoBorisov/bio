"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId } from "react";
import type { Role } from "@/content/experience";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";

type RoleItemProps = {
  role: Role;
  open: boolean;
  current: boolean;
  onToggle: () => void;
};

export function RoleItem({ role, open, current, onToggle }: RoleItemProps) {
  const panelId = useId();

  return (
    <li
      className={cn(
        "relative grid gap-x-10 gap-y-3 py-10 md:grid-cols-[11rem_1fr]",
        role.placeholder && "opacity-60",
      )}
    >
      {/* Timeline marker */}
      <span aria-hidden className="absolute left-0 top-[2.9rem] -translate-x-1/2 md:left-[12.25rem]">
        <span
          className={cn(
            "block size-2.5 rounded-full border transition-colors duration-500",
            open ? "border-accent bg-accent/30" : "border-fg-faint bg-ink-950",
          )}
        />
      </span>

      <p className="pl-6 font-mono text-xs leading-6 text-fg-subtle md:pl-0">
        {role.period}
        {current ? <span className="mt-1 block text-accent">Current</span> : null}
      </p>

      <div className="pl-6 md:pl-10">
        <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="group flex w-full items-start justify-between gap-6 text-left"
        >
          <span>
            <span className="block text-xl font-medium tracking-[-0.02em] text-fg sm:text-2xl">{role.title}</span>
            <span className="mt-1 block text-fg-muted">{role.company}</span>
          </span>
          <span
            aria-hidden
            className="mt-1.5 grid size-7 shrink-0 place-items-center rounded-full border border-line text-fg-subtle transition-colors group-hover:border-line-strong group-hover:text-fg"
          >
            <svg viewBox="0 0 12 12" className={cn("size-3 transition-transform duration-500", open && "rotate-45")}>
              <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
          </span>
        </button>
        </h3>

        <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-fg-muted">{role.summary}</p>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.55, ease: easeOutExpo }}
              className="overflow-hidden"
            >
              <div className="grid gap-10 pt-8 lg:grid-cols-2">
                <div>
                  <h4 className="label-mono">Responsibilities</h4>
                  <ul className="mt-4 space-y-2.5">
                    {role.responsibilities.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg-muted">
                        <span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-fg-faint" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="label-mono">Engineering impact</h4>
                  <ul className="mt-4 space-y-2.5">
                    {role.impact.map((item) => (
                      <li key={item} className="flex gap-3 text-[0.9375rem] leading-relaxed text-fg">
                        <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-accent/80" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <h4 className="label-mono mt-8">Technologies</h4>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {role.stack.map((tech) => (
                      <li key={tech}>
                        <Tag>{tech}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </li>
  );
}
