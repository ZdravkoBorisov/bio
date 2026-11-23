"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { aiWorkflow } from "@/content/ai";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";

const STEP_MS = 1100;
const HOLD_STEPS = 2; // pause on the final step before restarting

export function WorkflowPipeline() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const reduceMotion = useReducedMotion();
  const [tick, setTick] = useState(0);

  const last = aiWorkflow.length - 1;
  const progress = reduceMotion ? last : Math.min(tick, last);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const id = window.setInterval(() => setTick((t) => (t >= last + HOLD_STEPS ? 0 : t + 1)), STEP_MS);
    return () => window.clearInterval(id);
  }, [inView, reduceMotion, last]);

  return (
    <ol ref={ref} className="relative" aria-label="AI-assisted development workflow">
      {/* Rail + animated fill */}
      <span aria-hidden className="absolute bottom-6 left-[0.6875rem] top-6 w-px bg-line">
        <motion.span
          className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-accent/80 to-accent"
          initial={false}
          animate={{ height: `${(progress / last) * 100}%` }}
          transition={{ duration: progress === 0 ? 0.3 : STEP_MS / 1000, ease: easeOutExpo }}
        />
      </span>

      {aiWorkflow.map((item, i) => {
        const reached = i <= progress;
        const current = i === progress;
        return (
          <li key={item.step} className="relative flex gap-5 py-3.5">
            <span
              aria-hidden
              className={cn(
                "relative z-10 mt-0.5 grid size-[1.375rem] shrink-0 place-items-center rounded-full border bg-ink-950 transition-colors duration-500",
                reached ? "border-accent/70" : "border-line-strong",
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full transition-all duration-500",
                  reached ? "bg-accent" : "bg-fg-faint",
                  current && !reduceMotion && "shadow-[0_0_12px_2px_rgb(124_196_255/0.5)]",
                )}
              />
            </span>
            <div>
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-[0.75rem] tracking-[0.14em] text-fg-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "font-medium tracking-[-0.01em] transition-colors duration-500",
                    reached ? "text-fg" : "text-fg-subtle",
                  )}
                >
                  {item.step}
                </span>
              </p>
              <p className="mt-1 pl-[1.9rem] text-sm leading-relaxed text-fg-subtle">{item.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
