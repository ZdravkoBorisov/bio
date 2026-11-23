"use client";

import { useInView } from "motion/react";
import { useRef } from "react";

const lanes = [
  { label: "Kafka", packets: 5, duration: 9 },
  { label: "RabbitMQ", packets: 4, duration: 12 },
  { label: "gRPC", packets: 3, duration: 6 },
  { label: "REST", packets: 3, duration: 7 },
];

/** Decorative message-flow lanes. Purely illustrative — no data behind it. */
export function SignalLanes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div ref={ref} aria-hidden className="relative">
      <div className="space-y-3">
        {lanes.map((lane) => (
          <div key={lane.label} className="flex items-center gap-4">
            <span className="w-20 shrink-0 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-faint">
              {lane.label}
            </span>
            <div className="relative h-px flex-1 overflow-hidden bg-line">
              {Array.from({ length: lane.packets }, (_, i) => (
                <span
                  key={i}
                  className="absolute -top-px left-0 h-[3px] w-10 rounded-full bg-gradient-to-r from-transparent via-accent/70 to-accent"
                  style={{
                    animation: `lane-travel ${lane.duration}s linear infinite`,
                    animationDelay: `${-(lane.duration / lane.packets) * i}s`,
                    animationPlayState: inView ? "running" : "paused",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-right font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-faint">
        Illustrative · not live data
      </p>
    </div>
  );
}
