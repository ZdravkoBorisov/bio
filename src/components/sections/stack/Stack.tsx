import { stack } from "@/content/stack";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Stack() {
  return (
    <section id="stack" aria-labelledby="stack-title" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          id="stack-title"
          index="05"
          label="Stack"
          title="Tools, grouped by the job they do."
        />

        <Reveal className="mt-14">
          <dl className="border-t border-line">
            {stack.map((group) => (
              <div
                key={group.group}
                className="group grid gap-2 border-b border-line py-5 transition-colors duration-300 hover:bg-white/[0.015] sm:grid-cols-[14rem_1fr] sm:items-baseline sm:gap-8 sm:py-6"
              >
                <dt className="label-mono transition-colors duration-300 group-hover:text-accent">{group.group}</dt>
                <dd className="flex flex-wrap gap-x-2 gap-y-1 text-lg text-fg-muted transition-colors duration-300 group-hover:text-fg sm:text-xl">
                  {group.items.map((item, i) => (
                    <span key={item} className="tracking-[-0.01em]">
                      {item}
                      {i < group.items.length - 1 ? (
                        <span aria-hidden className="ml-2 text-fg-faint">
                          /
                        </span>
                      ) : null}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
