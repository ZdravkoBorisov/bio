"use client";

import { useEffect, useRef } from "react";

/** Fixed page backdrop: drifting aurora, fine grid, cursor spotlight and film noise. */
export function Backdrop() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotlightRef.current;
    if (!el || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[70rem] bg-[radial-gradient(ellipse_60%_40%_at_50%_-5%,rgb(124_196_255/0.08),transparent_70%)]" />
      <div className="aurora aurora-a" />
      <div className="aurora aurora-b" />
      <div className="backdrop-grid absolute inset-0 animate-grid-in" />
      <div ref={spotlightRef} className="spotlight absolute inset-0" />
      <div className="backdrop-noise absolute inset-0" />
    </div>
  );
}
