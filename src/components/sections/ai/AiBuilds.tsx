import { aiBuilds, type AiBuild } from "@/content/ai";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { Tilt } from "@/components/ui/Tilt";
import { easeOutExpo, revealViewport } from "@/lib/motion";

function BuildCard({ build, index }: { build: AiBuild; index: number }) {
  return (
    <Tilt
      max={6}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ duration: 0.8, ease: easeOutExpo, delay: index * 0.07 }}
      className="surface beam beam-hover flex w-full flex-col rounded-2xl bg-ink-900/40 p-6 sm:p-7"
    >
      <p className="label-mono flex items-center gap-3">
        <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
        {build.label}
      </p>
      <h4 className="mt-5 text-lg font-medium leading-snug tracking-[-0.01em] text-fg">{build.title}</h4>
      {build.stat ? (
        <p className="mt-4 flex items-baseline gap-2.5">
          <span className="text-4xl font-medium tracking-[-0.04em] text-accent">{build.stat.value}</span>
          <span className="text-sm text-fg-subtle">{build.stat.label}</span>
        </p>
      ) : null}
      <p className="mt-3 text-pretty text-sm leading-relaxed text-fg-muted">{build.body}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-6">
        {build.tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
    </Tilt>
  );
}

export function AiBuilds() {
  return (
    <div className="mt-20">
      <Reveal className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <h3 className="label-mono">A few highlights</h3>
        <p className="text-sm text-fg-subtle">A small sample of what I&apos;ve built with AI. There&apos;s much more.</p>
      </Reveal>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4">
        {aiBuilds.map((build, i) => (
          <li key={build.title} className="flex">
            <BuildCard build={build} index={i} />
          </li>
        ))}
      </ul>
    </div>
  );
}
