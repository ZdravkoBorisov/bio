"use client";

import { useState } from "react";
import { experience } from "@/content/experience";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoleItem } from "./RoleItem";

export function Experience() {
  const [open, setOpen] = useState(() => new Set(experience.map((_, i) => i)));

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (!next.delete(i)) next.add(i);
      return next;
    });

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          index="02"
          label="Experience"
          title="Ownership, from design to on-call."
          lede="The work I'm accountable for: services I've designed, systems I help run, and what happens when they break."
        />

        <Reveal className="relative mt-14" tilt={2}>
          {/* Timeline rail */}
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-line md:left-[12.25rem]" />
          <ol className="divide-y divide-line border-y border-line">
            {experience.map((role, i) => (
              <RoleItem
                key={`${role.company}-${i}`}
                role={role}
                current={i === 0 && !role.placeholder}
                open={open.has(i)}
                onToggle={() => toggle(i)}
              />
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
