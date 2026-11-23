"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Hairline at the top of the viewport that fills as the page is read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="absolute inset-x-0 bottom-[-1px] h-px origin-left bg-gradient-to-r from-accent/0 via-accent to-accent-2"
    />
  );
}
