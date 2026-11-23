"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { productionRows } from "@/content/production";
import { StatusDot } from "@/components/ui/StatusDot";
import { easeOutExpo } from "@/lib/motion";
import { RowVisual } from "./RowVisual";

export function StatusPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });

  return (
    <div ref={ref} className="surface overflow-hidden rounded-2xl">
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-b border-line px-5 py-3.5 sm:px-6">
        <p className="flex items-center gap-2.5 whitespace-nowrap font-mono text-[0.75rem] uppercase tracking-[0.14em] text-fg-muted">
          <StatusDot active={inView} />
          Production scope
        </p>
        <p className="whitespace-nowrap font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-faint">Profile · not a live feed</p>
      </div>

      <dl>
        {productionRows.map((row, i) => (
          <motion.div
            key={row.key}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.1 + i * 0.07 }}
            className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 border-b border-line px-5 py-5 last:border-b-0 sm:grid-cols-[9rem_1fr_auto] sm:px-6"
          >
            <dt className="label-mono col-span-2 sm:col-span-1">{row.key}</dt>
            <dd className="min-w-0">
              <span className="block text-lg font-medium tracking-[-0.01em] text-fg sm:text-xl">{row.value}</span>
              <span className="block text-sm text-fg-subtle">{row.sub}</span>
            </dd>
            <dd aria-hidden className="flex justify-end">
              <RowVisual kind={row.visual} running={inView} />
            </dd>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}
