"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

// A rotating 3D constellation of services, drawn on a 2D canvas with a hand-rolled
// perspective projection — no WebGL or 3D library needed for a few hundred points.

type Vec3 = [number, number, number];

const POINTS = 180;
const NEIGHBOURS = 3;
const PACKETS = 12;
const CAMERA = 3.2;
const RADIUS = 0.4; // fraction of the shorter canvas side
const ACCENT = "124,196,255";
const ACCENT_2 = "165,176,255";
const FG = "233,236,239";
const HIGHLIGHTS = new Set(Array.from({ length: 15 }, (_, i) => 6 + i * 12));

/** Evenly spread points on a unit sphere (Fibonacci lattice). */
const points: Vec3[] = Array.from({ length: POINTS }, (_, i) => {
  const y = 1 - (i / (POINTS - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const theta = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(theta) * r, y, Math.sin(theta) * r];
});

const dist2 = (a: Vec3, b: Vec3) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;

/** Each point links to its nearest neighbours; duplicates are dropped. */
const edges: [number, number][] = (() => {
  const seen = new Set<number>();
  const out: [number, number][] = [];
  points.forEach((p, i) => {
    points
      .map((q, j) => [j, dist2(p, q)] as const)
      .filter(([j]) => j !== i)
      .sort((a, b) => a[1] - b[1])
      .slice(0, NEIGHBOURS)
      .forEach(([j]) => {
        const key = Math.min(i, j) * POINTS + Math.max(i, j);
        if (seen.has(key)) return;
        seen.add(key);
        out.push([i, j]);
      });
  });
  return out;
})();

const adjacency: number[][] = points.map(() => []);
edges.forEach(([a, b]) => {
  adjacency[a].push(b);
  adjacency[b].push(a);
});

/** Two tilted orbit rings, as unit-circle samples pre-rotated into place. */
const orbits = [
  { radius: 1.32, tiltX: 1.15, tiltZ: 0.35, speed: 0.35, color: ACCENT },
  { radius: 1.18, tiltX: -0.9, tiltZ: -0.6, speed: -0.5, color: ACCENT_2 },
].map((o) => {
  const sample = (a: number): Vec3 => {
    const x = Math.cos(a) * o.radius;
    const z = Math.sin(a) * o.radius;
    // rotate around X, then Z
    const y1 = -z * Math.sin(o.tiltX);
    const z1 = z * Math.cos(o.tiltX);
    return [x * Math.cos(o.tiltZ) - y1 * Math.sin(o.tiltZ), x * Math.sin(o.tiltZ) + y1 * Math.cos(o.tiltZ), z1];
  };
  return { ...o, sample, ring: Array.from({ length: 96 }, (_, i) => sample((i / 96) * Math.PI * 2)) };
});

type Packet = { from: number; to: number; t: number; speed: number };

const newPacket = (): Packet => {
  const from = Math.floor(Math.random() * POINTS);
  const next = adjacency[from];
  return { from, to: next[Math.floor(Math.random() * next.length)], t: Math.random(), speed: 0.5 + Math.random() * 0.7 };
};

const DEPTH_BUCKETS = 5;

export function ServiceGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const px = new Float32Array(POINTS);
    const py = new Float32Array(POINTS);
    const pz = new Float32Array(POINTS);
    const packets = Array.from({ length: PACKETS }, newPacket);

    let width = 0;
    let height = 0;
    let dpr = 1;
    let yaw = 0.6;
    const pitch = -0.32;
    let pointerYaw = 0;
    let pointerPitch = 0;
    let targetYaw = 0;
    let targetPitch = 0;
    let start = 0;
    let last = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Layout size, not the transformed box, so the backing store maps 1:1 to screen pixels
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (v: Vec3, cy: number, sy: number, cp: number, sp: number, radius: number) => {
      const x1 = v[0] * cy + v[2] * sy;
      const z1 = -v[0] * sy + v[2] * cy;
      const y2 = v[1] * cp - z1 * sp;
      const z2 = v[1] * sp + z1 * cp;
      const s = CAMERA / (CAMERA - z2);
      return [width / 2 + x1 * radius * s, height / 2 - y2 * radius * s, z2, s] as const;
    };

    const draw = (time: number) => {
      if (!start) start = last = time;
      const dt = Math.min(0.05, (time - last) / 1000);
      last = time;

      // Intro: fade in and expand over the first ~1.4s
      const intro = reduceMotion ? 1 : Math.min(1, (time - start) / 1400);
      const ease = 1 - Math.pow(1 - intro, 3);

      if (!reduceMotion) yaw += dt * 0.11;
      pointerYaw += (targetYaw - pointerYaw) * 0.04;
      pointerPitch += (targetPitch - pointerPitch) * 0.04;

      const ya = yaw + pointerYaw;
      const pa = pitch + pointerPitch;
      const cy = Math.cos(ya);
      const sy = Math.sin(ya);
      const cp = Math.cos(pa);
      const sp = Math.sin(pa);
      const radius = Math.min(width, height) * RADIUS * (0.82 + 0.18 * ease);

      for (let i = 0; i < POINTS; i++) {
        const [x, y, z] = project(points[i], cy, sy, cp, sp, radius);
        px[i] = x;
        py[i] = y;
        pz[i] = z;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = ease;
      const depth = (z: number) => (z + 1) / 2;

      // Soft core glow
      const glow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, radius * 1.25);
      glow.addColorStop(0, `rgba(${ACCENT},0.07)`);
      glow.addColorStop(1, `rgba(${ACCENT},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      // Orbit rings — back halves first so the sphere sits between them
      orbits.forEach((o) => {
        ctx.lineWidth = 1;
        for (let i = 0; i < o.ring.length; i++) {
          const a = project(o.ring[i], cy, sy, cp, sp, radius);
          const b = project(o.ring[(i + 1) % o.ring.length], cy, sy, cp, sp, radius);
          const d = depth((a[2] + b[2]) / 2 / o.radius);
          ctx.strokeStyle = `rgba(${o.color},${(0.04 + 0.22 * d * d).toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a[0], a[1]);
          ctx.lineTo(b[0], b[1]);
          ctx.stroke();
        }
        const sat = project(o.sample(((time - start) / 1000) * o.speed), cy, sy, cp, sp, radius);
        const d = depth(sat[2] / o.radius);
        ctx.fillStyle = `rgba(${o.color},${(0.25 + 0.75 * d).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sat[0], sat[1], 1.4 + 1.8 * d, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${o.color},${(0.08 * d).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(sat[0], sat[1], 9 * d + 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Edges, batched into depth buckets to keep stroke calls low
      ctx.lineWidth = 0.75;
      for (let b = 0; b < DEPTH_BUCKETS; b++) {
        const lo = b / DEPTH_BUCKETS;
        const hi = (b + 1) / DEPTH_BUCKETS;
        const mid = (lo + hi) / 2;
        ctx.strokeStyle = `rgba(${FG},${(0.02 + 0.16 * mid * mid).toFixed(3)})`;
        ctx.beginPath();
        for (const [i, j] of edges) {
          const d = depth((pz[i] + pz[j]) / 2);
          if (d < lo || d >= hi) continue;
          ctx.moveTo(px[i], py[i]);
          ctx.lineTo(px[j], py[j]);
        }
        ctx.stroke();
      }

      // Nodes
      for (let b = 0; b < DEPTH_BUCKETS; b++) {
        const lo = b / DEPTH_BUCKETS;
        const hi = (b + 1) / DEPTH_BUCKETS;
        const mid = (lo + hi) / 2;
        ctx.fillStyle = `rgba(${FG},${(0.12 + 0.6 * mid).toFixed(3)})`;
        ctx.beginPath();
        for (let i = 0; i < POINTS; i++) {
          if (HIGHLIGHTS.has(i)) continue;
          const d = depth(pz[i]);
          if (d < lo || d >= hi) continue;
          const r = 0.6 + 1.1 * d;
          ctx.moveTo(px[i] + r, py[i]);
          ctx.arc(px[i], py[i], r, 0, Math.PI * 2);
        }
        ctx.fill();
      }

      // Highlighted services — the ones designed from scratch
      HIGHLIGHTS.forEach((i) => {
        const d = depth(pz[i]);
        ctx.fillStyle = `rgba(${ACCENT},${(0.06 + 0.14 * d).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px[i], py[i], 4 + 7 * d, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${ACCENT},${(0.35 + 0.65 * d).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(px[i], py[i], 1.2 + 1.6 * d, 0, Math.PI * 2);
        ctx.fill();
      });

      // Messages walking the graph
      packets.forEach((p) => {
        if (!reduceMotion) p.t += dt * p.speed;
        if (p.t >= 1) {
          const next = adjacency[p.to];
          p.from = p.to;
          p.to = next[Math.floor(Math.random() * next.length)];
          p.t = 0;
        }
        const x = px[p.from] + (px[p.to] - px[p.from]) * p.t;
        const y = py[p.from] + (py[p.to] - py[p.from]) * p.t;
        const d = depth(pz[p.from] + (pz[p.to] - pz[p.from]) * p.t);
        if (d < 0.35) return;
        ctx.fillStyle = `rgba(${ACCENT},${(0.12 * d).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 6 * d, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${ACCENT},${d.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.6 * d, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };

    const resume = () => {
      if (frame || reduceMotion || !visible || document.hidden) return;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    };

    const onPointerMove = (e: PointerEvent) => {
      targetYaw = (e.clientX / window.innerWidth - 0.5) * 0.9;
      targetPitch = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (!frame) draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    io.observe(canvas);

    document.addEventListener("visibilitychange", resume);
    if (!reduceMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
    }

    resize();
    if (reduceMotion) draw(performance.now());
    else resume();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={cn("block", className)} />;
}
