"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import type { AnchorHTMLAttributes, PointerEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useFinePointer } from "@/lib/useMediaQuery";

type Variant = "primary" | "ghost";

type MagneticLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> & {
  children: ReactNode;
  variant?: Variant;
  strength?: number;
};

const variants: Record<Variant, string> = {
  primary:
    "bg-fg text-ink-950 hover:bg-white shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_8px_30px_-12px_rgb(124_196_255/0.35)]",
  ghost: "border border-line-strong text-fg hover:border-fg-subtle hover:bg-white/[0.03]",
};

export function MagneticLink({ children, className, variant = "primary", strength = 0.25, ...rest }: MagneticLinkProps) {
  const finePointer = useFinePointer();
  const x = useSpring(useMotionValue(0), { stiffness: 250, damping: 20, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 250, damping: 20, mass: 0.4 });

  const onPointerMove = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!finePointer) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      {...rest}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn(
        "group inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-medium transition-colors duration-300",
        variants[variant],
        className,
      )}
    >
      {children}
    </motion.a>
  );
}
