import type { ReactNode } from "react";
import { metrics } from "@/content/hero";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Tilt } from "@/components/ui/Tilt";
import { easeOutExpo, revealViewport } from "@/lib/motion";
import { SignalLanes } from "./SignalLanes";

type CardProps = { label: string; value: ReactNode; detail: string; index: number };

function MetricCard({ label, value, detail, index }: CardProps) {
  return (
    <Tilt
      max={9}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.07 }}
      className="surface beam beam-hover rounded-2xl bg-ink-900/40 p-5 sm:p-7"
    >
      <dt className="label-mono [transform:translateZ(20px)]">{label}</dt>
      <dd className="mt-4 text-5xl font-medium tracking-[-0.04em] text-fg [transform:translateZ(50px)] sm:text-6xl">
        {value}
      </dd>
      <dd className="mt-3 text-sm leading-snug text-fg-subtle [transform:translateZ(30px)]">{detail}</dd>
    </Tilt>
  );
}

export function Snapshot() {
  return (
    <section id="snapshot" aria-labelledby="snapshot-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="snapshot-title"
          index="01"
          label="Snapshot"
          title="The short version."
          lede="Scope and responsibility, in numbers I can stand behind."
        />

        <dl className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {metrics.map((m, i) => (
            <MetricCard
              key={m.label}
              index={i}
              label={m.label}
              value={<Counter to={m.value} prefix={m.prefix} suffix={m.suffix} />}
              detail={m.detail}
            />
          ))}
          <MetricCard index={3} label="Cloud" value="AWS" detail="EC2 · SQS · S3 · DynamoDB, via Terraform" />
        </dl>

        <Reveal delay={0.1} className="mt-12 max-w-3xl">
          <SignalLanes />
        </Reveal>
      </div>
    </section>
  );
}
