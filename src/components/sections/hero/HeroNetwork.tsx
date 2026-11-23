"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";
import {
  HERO_VIEWBOX,
  HUB,
  ambientParticles,
  edgePath,
  heroEdges,
  heroNodes,
  type HeroNode,
} from "./heroGraph";

const LAYER_DELAY = 0.18;
const BASE_DELAY = 0.35;
const DESIGNED_FROM_SCRATCH = 15;

const layerDelay = (layer: number) => BASE_DELAY + layer * LAYER_DELAY;
const nodeLayer = new Map(heroNodes.map((n) => [n.id, n.layer]));

export function HeroNetwork({ className }: { className?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref);
  const reduceMotion = useReducedMotion();
  const [assembled, setAssembled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setAssembled(true), 1600);
    return () => window.clearTimeout(t);
  }, []);

  const showPackets = assembled && inView && !reduceMotion;
  const isEdgeActive = (from: string, to: string) => hovered !== null && (from === hovered || to === hovered);

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${HERO_VIEWBOX.width} ${HERO_VIEWBOX.height}`}
      className={cn("h-auto w-full overflow-visible", className)}
      role="img"
      aria-labelledby="hero-network-title"
    >
      <title id="hero-network-title">
        Engineering profile: .NET services across an 80+ service microservice ecosystem, communicating over Kafka,
        RabbitMQ and REST, running on AWS with Terraform, observed through Grafana and OpenSearch, and built with
        AI tooling on Claude: custom skills and project context files.
      </title>

      <defs>
        <radialGradient id="hero-hub-glow">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
        </radialGradient>
        {heroEdges.map((e) => (
          <path key={e.id} id={`hero-${e.id}`} d={edgePath(e)} />
        ))}
      </defs>

      {/* Ambient particles */}
      <g className="hidden sm:block">
        {ambientParticles.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={p.size}
            fill="var(--color-fg-subtle)"
            initial={{ opacity: 0 }}
            animate={{ opacity: reduceMotion ? 0.25 : [0, 0.45, 0.15, 0.4] }}
            transition={
              reduceMotion
                ? { duration: 0.6 }
                : { duration: 6, delay: 0.2 + p.delay * 0.1, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            }
          />
        ))}
      </g>

      {/* Edges */}
      <g fill="none" strokeLinecap="round">
        {heroEdges.map((e) => {
          const active = isEdgeActive(e.from, e.to);
          const dimmed = hovered !== null && !active;
          const delay = layerDelay(nodeLayer.get(e.from) ?? 0) + 0.1;
          return (
            <motion.path
              key={e.id}
              d={edgePath(e)}
              stroke={active ? "var(--color-accent)" : "rgb(255 255 255 / 0.16)"}
              strokeWidth={active ? 1.25 : 1}
              strokeDasharray={e.dashed ? "3 5" : undefined}
              initial={e.dashed ? { opacity: 0 } : { pathLength: 0, opacity: 0 }}
              animate={
                e.dashed
                  ? { opacity: dimmed ? 0.35 : 1 }
                  : { pathLength: 1, opacity: dimmed ? 0.35 : 1 }
              }
              transition={{
                pathLength: { duration: 0.9, ease: easeOutExpo, delay },
                opacity: { duration: 0.4, delay: hovered === null && !assembled ? delay : 0 },
              }}
              style={{ transition: "stroke 300ms, stroke-width 300ms" }}
            />
          );
        })}
      </g>

      {/* Packets travelling along edges */}
      {showPackets ? (
        <g>
          {heroEdges
            .filter((e) => !e.dashed)
            .map((e, i) => (
              <circle key={e.id} r="2" fill="var(--color-accent)" opacity="0.9">
                <animateMotion dur={`${2.6 + (i % 3) * 0.7}s`} begin={`${(i * 0.45) % 2.4}s`} repeatCount="indefinite">
                  <mpath href={`#hero-${e.id}`} />
                </animateMotion>
                <animate
                  attributeName="opacity"
                  values="0;0.9;0.9;0"
                  keyTimes="0;0.15;0.8;1"
                  dur={`${2.6 + (i % 3) * 0.7}s`}
                  begin={`${(i * 0.45) % 2.4}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}
        </g>
      ) : null}

      <Hub reduceMotion={!!reduceMotion} />

      {heroNodes
        .filter((n) => n.id !== "services")
        .map((n) => (
          <PillNode
            key={n.id}
            node={n}
            active={hovered === n.id}
            dimmed={hovered !== null && hovered !== n.id}
            onHover={setHovered}
          />
        ))}

      {/* Legend */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="hidden sm:block"
      >
        <circle cx={HUB.x + 92} cy={HUB.y - 42} r="2" fill="var(--color-accent)" />
        <text x={HUB.x + 100} y={HUB.y - 39} className="svg-halo fill-fg-muted font-mono text-[12px] tracking-wide">
          DESIGNED FROM SCRATCH
        </text>
        <circle cx={HUB.x + 92} cy={HUB.y - 27} r="1.6" fill="var(--color-fg-faint)" />
        <text x={HUB.x + 100} y={HUB.y - 24} className="svg-halo fill-fg-muted font-mono text-[12px] tracking-wide">
          ONE DOT ≈ ONE SERVICE
        </text>
      </motion.g>
    </svg>
  );
}

function Hub({ reduceMotion }: { reduceMotion: boolean }) {
  const delay = layerDelay(1);
  return (
    <g>
      <motion.circle
        cx={HUB.x}
        cy={HUB.y}
        r={HUB.ringRadius + 34}
        fill="url(#hero-hub-glow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay }}
      />

      <g
        className={cn(
          "[transform-box:view-box]",
          !reduceMotion && "animate-[spin-slow_140s_linear_infinite]",
        )}
        style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
      >
        {Array.from({ length: HUB.ringDots }, (_, i) => {
          const angle = (i / HUB.ringDots) * Math.PI * 2 - Math.PI / 2;
          const cx = HUB.x + Math.cos(angle) * HUB.ringRadius;
          const cy = HUB.y + Math.sin(angle) * HUB.ringRadius;
          const designed = i < DESIGNED_FROM_SCRATCH;
          return (
            <motion.circle
              key={i}
              cx={cx.toFixed(2)}
              cy={cy.toFixed(2)}
              r={designed ? 2 : 1.3}
              fill={designed ? "var(--color-accent)" : "rgb(255 255 255 / 0.28)"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: delay + 0.2 + i * 0.009 }}
            />
          );
        })}
      </g>

      <motion.g
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: easeOutExpo, delay }}
        style={{ transformOrigin: `${HUB.x}px ${HUB.y}px` }}
      >
        <circle cx={HUB.x} cy={HUB.y} r={42} fill="var(--color-ink-900)" stroke="rgb(124 196 255 / 0.35)" />
        <text x={HUB.x} y={HUB.y + 2} textAnchor="middle" className="fill-fg text-[22px] font-medium tracking-tight">
          80+
        </text>
        <text x={HUB.x} y={HUB.y + 19} textAnchor="middle" className="fill-fg-muted font-mono text-[12px] tracking-[0.12em]">
          SERVICES
        </text>
        <text
          x={HUB.x - HUB.ringRadius - 16}
          y={HUB.y + 4}
          textAnchor="end"
          className="svg-halo fill-fg-muted font-mono text-[15px] tracking-wide"
        >
          Microservices
        </text>
      </motion.g>
    </g>
  );
}

type PillNodeProps = {
  node: HeroNode;
  active: boolean;
  dimmed: boolean;
  onHover: (id: string | null) => void;
};

function PillNode({ node, active, dimmed, onHover }: PillNodeProps) {
  const width = Math.round(node.label.length * 9.2 + 36);
  const subPos = node.subPos ?? "right";
  const subY = { right: node.y + 4, above: node.y - 28, below: node.y + 38 }[subPos];

  return (
    <motion.g
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: dimmed ? 0.45 : 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: easeOutExpo,
        delay: dimmed || active ? 0 : layerDelay(node.layer),
      }}
      onPointerEnter={() => onHover(node.id)}
      onPointerLeave={() => onHover(null)}
      className="cursor-default"
    >
      <rect
        x={node.x - width / 2}
        y={node.y - 17}
        width={width}
        height={34}
        rx={17}
        fill="var(--color-ink-900)"
        stroke={active ? "rgb(124 196 255 / 0.6)" : "rgb(255 255 255 / 0.14)"}
        style={{ transition: "stroke 300ms" }}
      />
      <circle cx={node.x - width / 2 + 14} cy={node.y} r={2.5} fill="var(--color-accent)" />
      <text x={node.x + 6} y={node.y + 5} textAnchor="middle" className="fill-fg font-mono text-[15px]">
        {node.label}
      </text>
      {node.sub ? (
        <text
          x={subPos === "right" ? node.x + width / 2 + 12 : node.x}
          y={subY}
          textAnchor={subPos === "right" ? "start" : "middle"}
          className="svg-halo fill-fg-muted font-mono text-[13px] tracking-wide"
        >
          {node.sub}
        </text>
      ) : null}
    </motion.g>
  );
}
