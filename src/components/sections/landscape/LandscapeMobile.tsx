"use client";

import { landscapeNodes, type NodeId } from "@/content/landscape";
import { cn } from "@/lib/cn";
import { relationOf } from "./graph";

/** Touch-first variant: technology chips whose relations light up on tap. */
export function LandscapeMobile({ focus, onSelect }: { focus: NodeId | null; onSelect: (id: NodeId) => void }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {landscapeNodes.map((node) => {
        const rel = relationOf(focus, node.id);
        return (
          <li key={node.id}>
            <button
              type="button"
              aria-pressed={rel === "active"}
              onClick={() => onSelect(node.id)}
              className={cn(
                "rounded-full border px-3.5 py-2 font-mono text-xs transition-all duration-300",
                rel === "active" && "border-accent bg-accent/10 text-fg",
                rel === "related" && "border-accent/50 text-fg",
                rel === "secondary" && "border-dashed border-accent/40 text-fg-muted",
                rel === "dim" && "border-line text-fg-faint",
                rel === "idle" && "border-line-strong text-fg-muted",
              )}
            >
              {node.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
