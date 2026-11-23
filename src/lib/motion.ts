import type { Transition, Variants } from "motion/react";

/** Shared easing — fast start, long settle. Mirrors --ease-out-expo in CSS. */
export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const transition = {
  base: { duration: 0.7, ease: easeOutExpo } satisfies Transition,
  fast: { duration: 0.35, ease: easeOutExpo } satisfies Transition,
  draw: { duration: 1.1, ease: easeOutExpo } satisfies Transition,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: transition.base },
};

export const stagger = (staggerChildren = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/** Viewport options used by every scroll reveal so they trigger consistently. */
export const revealViewport = { once: true, margin: "0px 0px -12% 0px" } as const;
