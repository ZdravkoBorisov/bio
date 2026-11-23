"use client";

import { AnimatePresence, motion } from "motion/react";
import type { NodeId } from "@/content/landscape";
import { easeOutExpo } from "@/lib/motion";
import { nodeById, relatedIds } from "./graph";

export function LandscapeDetail({ focus, touring }: { focus: NodeId | null; touring: boolean }) {
  const node = focus ? nodeById.get(focus) : null;

  return (
    <div className="relative min-h-[17rem]" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {node ? (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: easeOutExpo }}
          >
            <p className="label-mono text-accent">{node.cluster}</p>
            <h3 className="mt-3 text-2xl font-medium tracking-[-0.02em] text-fg">{node.label}</h3>
            <p className="mt-3 text-pretty leading-relaxed text-fg-muted">{node.note}</p>
            <RelationList title="Connects directly to" ids={relatedIds(node.id, 1)} strong />
            <RelationList title="Secondary" ids={relatedIds(node.id, 2)} />
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="label-mono">Explore</p>
            <p className="mt-3 leading-relaxed text-fg-muted">
              Hover or select a technology to see how it connects to the rest of the system.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      {touring && node ? (
        <p className="absolute bottom-0 left-0 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-faint">
          Auto tour · select a node to take over
        </p>
      ) : null}
    </div>
  );
}

function RelationList({ title, ids, strong }: { title: string; ids: NodeId[]; strong?: boolean }) {
  if (ids.length === 0) return null;
  return (
    <div className="mt-6">
      <p className="label-mono">{title}</p>
      <p className={strong ? "mt-2 text-sm text-fg" : "mt-2 text-sm text-fg-subtle"}>
        {ids.map((id) => nodeById.get(id)!.label).join(" · ")}
      </p>
    </div>
  );
}
