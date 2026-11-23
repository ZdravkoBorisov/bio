"use client";

import { useInView } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { useIsDesktop } from "@/lib/useMediaQuery";
import { LandscapeDetail } from "./LandscapeDetail";
import { LandscapeGraph } from "./LandscapeGraph";
import { LandscapeMobile } from "./LandscapeMobile";
import { useLandscapeFocus } from "./useLandscapeFocus";

export function Landscape() {
  const graphRef = useRef<HTMLDivElement>(null);
  const inView = useInView(graphRef, { amount: 0.35 });
  const isDesktop = useIsDesktop();
  const { focus, touring, select, release } = useLandscapeFocus(inView);

  return (
    <section id="systems" aria-labelledby="systems-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="systems-title"
          index="03"
          label="Systems"
          title="The engineering landscape."
          lede="Not a list of tools — the way they depend on each other. Services talk over messaging, run on infrastructure defined as code, and are only as good as the signals they emit."
        />

        <Reveal className="mt-14">
          <div
            ref={graphRef}
            className="surface relative grid overflow-hidden rounded-2xl lg:grid-cols-[1fr_20rem]"
          >
            <div className="relative border-line p-5 sm:p-8 lg:border-r lg:p-10">
              <div aria-hidden className="backdrop-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
              <div className="relative">
                <LandscapeGraph
                  focus={focus}
                  inView={inView}
                  onSelect={select}
                  onRelease={release}
                  compact={!isDesktop}
                />
              </div>
              {isDesktop ? null : (
                <div className="relative mt-6">
                  <LandscapeMobile focus={focus} onSelect={select} />
                </div>
              )}
            </div>
            <div className="border-t border-line p-6 sm:p-8 lg:border-t-0">
              <LandscapeDetail focus={focus} touring={touring} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
