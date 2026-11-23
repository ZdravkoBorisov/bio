"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { easeOutExpo, revealViewport } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Degrees the block is tipped back before it rises into place. */
  tilt?: number;
};

export function Reveal({ children, className, delay = 0, y = 14, tilt = 7 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, rotateX: tilt, transformPerspective: 1400 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.7, ease: easeOutExpo, delay }}
    >
      {children}
    </motion.div>
  );
}
