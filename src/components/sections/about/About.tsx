import { about } from "@/content/hero";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 sm:py-32">
      <div className="container-page grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-8">
        <Reveal>
          <p className="label-mono flex items-center gap-3">
            <span className="text-accent">07</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            About
          </p>
        </Reveal>
        <div className="max-w-3xl">
          <Reveal delay={0.05}>
            <h2
              id="about-title"
              className="text-balance text-2xl font-medium leading-snug tracking-[-0.025em] text-fg sm:text-3xl lg:text-[2.125rem]"
            >
              I build backend systems. Production gets the final say.
            </h2>
          </Reveal>
          <div className="mt-8 space-y-5">
            {about.map((p, i) => (
              <Reveal key={i} delay={0.1 + i * 0.05}>
                <p className="text-pretty text-lg leading-relaxed text-fg-muted">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
