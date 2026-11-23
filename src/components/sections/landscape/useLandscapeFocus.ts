"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { NodeId } from "@/content/landscape";
import { tourSequence } from "./graph";

const TOUR_INTERVAL_MS = 2800;
const RESUME_AFTER_MS = 5000;

/**
 * Focus state for the landscape graph. While idle and visible it slowly tours
 * through key nodes; any user interaction takes over and pauses the tour.
 */
export function useLandscapeFocus(inView: boolean) {
  const reduceMotion = useReducedMotion();
  const [focus, setFocus] = useState<NodeId | null>(null);
  const [touring, setTouring] = useState(true);
  const resumeTimer = useRef<number | undefined>(undefined);
  const step = useRef(0);

  useEffect(() => {
    if (!touring || !inView || reduceMotion) return;
    const tick = () => {
      setFocus(tourSequence[step.current % tourSequence.length]);
      step.current += 1;
    };
    const first = window.setTimeout(tick, 900);
    const interval = window.setInterval(tick, TOUR_INTERVAL_MS);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, [touring, inView, reduceMotion]);

  useEffect(() => () => window.clearTimeout(resumeTimer.current), []);

  const select = useCallback((id: NodeId | null) => {
    window.clearTimeout(resumeTimer.current);
    setTouring(false);
    setFocus(id);
  }, []);

  const release = useCallback(() => {
    setFocus(null);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setTouring(true), RESUME_AFTER_MS);
  }, []);

  return { focus, touring: touring && !reduceMotion, select, release };
}
