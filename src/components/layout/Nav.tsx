"use client";

import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { ScrollProgress } from "@/components/fx/ScrollProgress";
import { links, navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { useActiveSection } from "@/lib/useActiveSection";
import { MobileMenu } from "./MobileMenu";

const sectionIds = navigation.map((item) => item.id);

export function Nav() {
  const active = useActiveSection(sectionIds);
  const { scrollY } = useScroll();
  const [compact, setCompact] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 24));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
        compact
          ? "border-b border-line bg-ink-950/70 backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className={cn(
          "container-page flex items-center justify-between transition-[height] duration-500 ease-[var(--ease-out-expo)]",
          compact ? "h-14" : "h-18",
        )}
      >
        <a href="#home" className="group flex items-center gap-2.5 text-sm font-medium tracking-tight text-fg">
          <span
            aria-hidden
            className="grid size-7 place-items-center rounded-md border border-line-strong font-mono text-[0.6875rem] text-accent transition-colors group-hover:border-accent-dim"
          >
            ZB
          </span>
          <span>{site.name}</span>
        </a>

        <ul className="hidden items-center gap-1 rounded-full border border-line bg-ink-900/50 p-1 md:flex">
          {navigation.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                {isActive ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/[0.06] ring-1 ring-line-strong"
                    transition={{ type: "spring", stiffness: 400, damping: 34 }}
                  />
                ) : null}
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block rounded-full px-3.5 py-1.5 text-[0.8125rem] transition-colors duration-300",
                    isActive ? "text-fg" : "text-fg-subtle hover:text-fg",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-flex"
          >
            LinkedIn ↗
          </a>
          <MobileMenu active={active} />
        </div>
      </nav>
      <ScrollProgress />
    </header>
  );
}
