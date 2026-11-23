import { aiIntro, aiPrinciples } from "@/content/ai";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt } from "@/components/ui/Tilt";
import { AiBuilds } from "./AiBuilds";
import { WorkflowPipeline } from "./WorkflowPipeline";

export function AiSection() {
  return (
    <section id="ai" aria-labelledby="ai-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="ai-title"
          index="06"
          label="AI"
          title="Engineering with AI."
          lede="A multiplier on judgment, not a substitute for it."
        />

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_24rem] lg:gap-20 xl:grid-cols-[1fr_27rem]">
          <div>
            <div className="max-w-2xl space-y-5">
              {aiIntro.map((p, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <p className="text-pretty text-lg leading-relaxed text-fg-muted">{p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1} className="mt-12">
              <h3 className="label-mono">Principles</h3>
              <dl className="mt-5 grid border-t border-line sm:grid-cols-2">
                {aiPrinciples.map((item, i) => (
                  <div
                    key={item.title}
                    className="border-b border-line py-6 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
                  >
                    <dt className="flex items-baseline gap-3 font-medium text-fg">
                      <span className="font-mono text-[0.75rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                      {item.title}
                    </dt>
                    <dd className="mt-2 pl-7 text-sm leading-relaxed text-fg-subtle">{item.body}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <Tilt max={5} className="surface beam rounded-2xl p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="label-mono">Workflow</h3>
                <span className="font-mono text-[0.75rem] uppercase tracking-[0.12em] text-fg-faint">
                  Claude Code · custom skills
                </span>
              </div>
              <WorkflowPipeline />
            </Tilt>
          </Reveal>
        </div>

        <AiBuilds />
      </div>
    </section>
  );
}
