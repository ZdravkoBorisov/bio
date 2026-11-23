"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { links, navigation } from "@/content/site";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";

const noopSubscribe = () => () => {};

export function MobileMenu({ active }: { active: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Portalled to <body>: the header's backdrop-filter would otherwise trap position: fixed.
  const panel = (
    <AnimatePresence>
      {open ? (
        <motion.div
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className="fixed inset-0 z-40 flex flex-col bg-ink-950/95 px-6 pb-10 pt-24 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <ul className="flex flex-col">
            {navigation.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: easeOutExpo, delay: 0.04 * i }}
                className="border-b border-line"
              >
                <a href={`#${item.id}`} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-5">
                  <span
                    className={cn(
                      "text-3xl font-medium tracking-[-0.03em]",
                      active === item.id ? "text-fg" : "text-fg-muted",
                    )}
                  >
                    {item.label}
                  </span>
                  <span className="label-mono">{String(i + 1).padStart(2, "0")}</span>
                </a>
              </motion.li>
            ))}
          </ul>

          <div className="mt-auto flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs uppercase tracking-[0.12em] text-fg-subtle">
            <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-fg">
              GitHub
            </a>
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:text-fg">
              LinkedIn
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-10 place-items-center rounded-full border border-line bg-ink-900/60"
      >
        <span className="relative block h-2.5 w-4">
          <span
            className={cn(
              "absolute left-0 h-px w-4 bg-fg transition-all duration-300",
              open ? "top-1/2 rotate-45" : "top-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 h-px w-4 bg-fg transition-all duration-300",
              open ? "top-1/2 -rotate-45" : "top-full",
            )}
          />
        </span>
      </button>
      {mounted ? createPortal(panel, document.body) : null}
    </div>
  );
}
