"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, type HTMLMotionProps } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useFinePointer } from "@/lib/useMediaQuery";

type TiltProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: ReactNode;
  /** Maximum rotation in degrees at the card edge. */
  max?: number;
  glare?: boolean;
};

const spring = { stiffness: 180, damping: 18, mass: 0.5 };

/**
 * Perspective tilt that follows the pointer. Children live in the same 3D context,
 * so `[transform:translateZ(..)]` on a child lifts it off the card.
 */
export function Tilt({ children, className, style, max = 8, glare = true, ...rest }: TiltProps) {
  const finePointer = useFinePointer();
  const reduceMotion = useReducedMotion();
  const enabled = finePointer && !reduceMotion;

  const rotateX = useSpring(0, spring);
  const rotateY = useSpring(0, spring);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareOpacity = useSpring(0, spring);
  const glareBg = useMotionTemplate`radial-gradient(28rem circle at ${gx}% ${gy}%, rgb(255 255 255 / 0.07), transparent 55%)`;

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateY.set((x - 0.5) * 2 * max);
    rotateX.set(-(y - 0.5) * 2 * max);
    gx.set(x * 100);
    gy.set(y * 100);
    glareOpacity.set(1);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      {...rest}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
    >
      {children}
      {glare && enabled ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{ background: glareBg, opacity: glareOpacity }}
        />
      ) : null}
    </motion.div>
  );
}
