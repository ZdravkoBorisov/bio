import { productionPractices } from "@/content/production";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt } from "@/components/ui/Tilt";
import { StatusPanel } from "./StatusPanel";

export function Production() {
  return (
    <section id="production" aria-labelledby="production-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="production-title"
          index="04"
          label="Reliability"
          title="Built for production."
          lede="Shipping is the middle of the job, not the end. The systems I work on run continuously, and I'm part of what keeps them that way."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
          <Reveal>
            <Tilt max={4} className="rounded-2xl">
              <StatusPanel />
            </Tilt>
          </Reveal>

          <ul className="flex flex-col justify-center">
            {productionPractices.map((item, i) => (
              <li key={item.title} className="border-b border-line py-6 first:pt-0 last:border-b-0">
                <Reveal delay={i * 0.06}>
                  <h3 className="font-medium text-fg">{item.title}</h3>
                  <p className="mt-1.5 text-pretty leading-relaxed text-fg-subtle">{item.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
