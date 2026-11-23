"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { easeOutExpo } from "@/lib/motion";

type CounterProps = {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

export function Counter({ to, prefix = "", suffix = "", duration = 1.4 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduceMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const controls = animate(0, to, {
      duration,
      ease: easeOutExpo,
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduceMotion, to, duration]);

  const display = reduceMotion ? to : value;

  return (
    <span ref={ref} className="tabular-nums">
      <span className="sr-only">
        {prefix}
        {to}
        {suffix}
      </span>
      <span aria-hidden>
        <span className="text-fg-subtle">{prefix}</span>
        {display}
        {suffix ? <span>{suffix}</span> : null}
      </span>
    </span>
  );
}
