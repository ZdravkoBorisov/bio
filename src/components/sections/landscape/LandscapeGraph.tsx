"use client";

import { motion, useReducedMotion } from "motion/react";
import type { KeyboardEvent } from "react";
import {
  LANDSCAPE_VIEWBOX,
  landscapeEdges,
  landscapeNodes,
  type LandscapeNode,
  type NodeId,
} from "@/content/landscape";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";
import { curvedPath, edgeRelation, relationOf, type Relation } from "./graph";

type LandscapeGraphProps = {
  focus: NodeId | null;
  inView: boolean;
  onSelect: (id: NodeId) => void;
  onRelease: () => void;
  /** Small screens: larger marks, and only the focused node is labelled */
  compact?: boolean;
};

const edgeStyle: Record<Relation, { stroke: string; opacity: number; width: number }> = {
  idle: { stroke: "rgb(255 255 255)", opacity: 0.12, width: 1 },
  active: { stroke: "var(--color-accent)", opacity: 0.8, width: 1.4 },
  related: { stroke: "var(--color-accent)", opacity: 0.7, width: 1.4 },
  secondary: { stroke: "var(--color-accent)", opacity: 0.3, width: 1 },
  dim: { stroke: "rgb(255 255 255)", opacity: 0.04, width: 1 },
};

export function LandscapeGraph({ focus, inView, onSelect, onRelease, compact = false }: LandscapeGraphProps) {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox={`0 0 ${LANDSCAPE_VIEWBOX.width} ${LANDSCAPE_VIEWBOX.height}`}
      className="h-auto w-full overflow-visible"
      role="group"
      aria-label="Engineering landscape — select a technology to see how it connects"
      // Touch taps also fire pointerleave, which would clear the selection immediately
      onPointerLeave={(e) => e.pointerType === "mouse" && onRelease()}
    >
      <defs>
        <radialGradient id="land-glow">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g fill="none" strokeLinecap="round">
        {landscapeEdges.map((edge, i) => {
          const rel = edgeRelation(focus, edge);
          const style = edgeStyle[rel];
          const weak = edge.strength === 2;
          return (
            <motion.path
              key={`${edge.from}-${edge.to}`}
              d={curvedPath(edge)}
              stroke={style.stroke}
              strokeWidth={compact ? style.width * 2 : style.width}
              strokeDasharray={weak ? "2 6" : undefined}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: weak && rel === "idle" ? style.opacity * 0.7 : style.opacity } : { opacity: 0 }}
              transition={{
                duration: focus ? 0.35 : 0.9,
                delay: focus ? 0 : 0.15 + i * 0.02,
                ease: easeOutExpo,
              }}
              style={{ transition: "stroke 350ms, stroke-width 350ms" }}
            />
          );
        })}
      </g>

      {/* Packets flow outward from the focused node along its direct connections */}
      {focus && !reduceMotion ? (
        <g key={focus}>
          {landscapeEdges
            .filter((e) => e.strength === 1 && (e.from === focus || e.to === focus))
            .map((e, i) => (
              <circle key={`${e.from}-${e.to}`} r={compact ? 5 : 2.5} fill="var(--color-accent)">
                <animateMotion
                  dur="1.8s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                  path={curvedPath(e, e.to === focus)}
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  keyTimes="0;0.1;0.75;1"
                  dur="1.8s"
                  begin={`${i * 0.2}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
        </g>
      ) : null}

      {landscapeNodes.map((node, i) => (
        <GraphNode
          key={node.id}
          node={node}
          index={i}
          inView={inView}
          relation={relationOf(focus, node.id)}
          onSelect={onSelect}
          compact={compact}
        />
      ))}
    </svg>
  );
}

type GraphNodeProps = {
  node: LandscapeNode;
  index: number;
  inView: boolean;
  relation: Relation;
  onSelect: (id: NodeId) => void;
  compact: boolean;
};

const labelClass: Record<Relation, string> = {
  idle: "fill-fg-muted",
  active: "fill-fg",
  related: "fill-fg",
  secondary: "fill-fg-muted",
  dim: "fill-fg-faint",
};

function GraphNode({ node, index, inView, relation, onSelect, compact }: GraphNodeProps) {
  const isHub = node.id === "services";
  const r = (isHub ? 7 : 4.5) * (compact ? 2 : 1);
  const highlighted = relation === "active" || relation === "related";

  const onKeyDown = (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(node.id);
    }
  };

  return (
    <motion.g
      role="button"
      tabIndex={0}
      aria-label={node.label}
      aria-pressed={relation === "active"}
      onPointerEnter={() => onSelect(node.id)}
      onFocus={() => onSelect(node.id)}
      onClick={() => onSelect(node.id)}
      onKeyDown={onKeyDown}
      className="cursor-pointer outline-none [&:focus-visible_.ring]:opacity-100"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: relation === "dim" ? 0.35 : 1 } : { opacity: 0 }}
      transition={{ duration: relation === "idle" ? 0.6 : 0.3, delay: relation === "idle" ? 0.3 + index * 0.03 : 0 }}
    >
      {/* Generous hit area */}
      <circle cx={node.x} cy={node.y} r={34} fill="transparent" />

      <circle
        cx={node.x}
        cy={node.y}
        r={40}
        fill="url(#land-glow)"
        style={{ opacity: relation === "active" ? 1 : 0, transition: "opacity 400ms" }}
      />
      <circle
        className="ring"
        cx={node.x}
        cy={node.y}
        r={r + 7}
        fill="none"
        stroke="var(--color-accent)"
        strokeOpacity={0.5}
        style={{ opacity: relation === "active" ? 1 : 0, transition: "opacity 300ms" }}
      />
      {isHub ? (
        <circle cx={node.x} cy={node.y} r={r + 14} fill="none" stroke="rgb(255 255 255 / 0.1)" strokeDasharray="1 4" />
      ) : null}
      <circle
        cx={node.x}
        cy={node.y}
        r={r}
        fill={highlighted ? "var(--color-accent)" : relation === "secondary" ? "var(--color-accent-dim)" : "var(--color-ink-800)"}
        stroke={highlighted ? "var(--color-accent)" : "rgb(255 255 255 / 0.35)"}
        style={{ transition: "fill 300ms, stroke 300ms" }}
      />
      {!compact || relation === "active" ? (
        <text
          x={node.x}
          y={compact ? node.y - r - 16 : node.y + (isHub ? 36 : 26)}
          textAnchor={compact ? (node.x < 150 ? "start" : node.x > 850 ? "end" : "middle") : "middle"}
          className={cn(
            labelClass[relation],
            "font-mono tracking-wide transition-[fill] duration-300",
            compact ? "text-[34px]" : "text-[13px]",
          )}
        >
          {node.label}
        </text>
      ) : null}
    </motion.g>
  );
}
