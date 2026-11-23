import { PerspectiveGrid } from "@/components/fx/PerspectiveGrid";
import { links, profile } from "@/content/site";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { Reveal } from "@/components/ui/Reveal";

const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const channels = [
  { label: "Email", value: links.email, href: `mailto:${links.email}`, external: false },
  { label: "GitHub", value: displayUrl(links.github), href: links.github, external: true },
  { label: "LinkedIn", value: displayUrl(links.linkedin), href: links.linkedin, external: true },
].filter((c) => !c.href.includes("TODO"));

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative isolate overflow-hidden pb-24 pt-24 sm:pb-32 sm:pt-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[36rem] bg-[radial-gradient(ellipse_50%_60%_at_50%_100%,rgb(124_196_255/0.07),transparent_70%)]"
      />
      <PerspectiveGrid className="bottom-0 -z-10 h-[45%]" />
      <div className="container-page relative">
        <Reveal>
          <p className="label-mono flex items-center gap-3">
            <span className="text-accent">08</span>
            <span aria-hidden className="h-px w-8 bg-line-strong" />
            Contact
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            id="contact-title"
            className="mt-6 max-w-4xl text-balance text-4xl font-medium leading-[1.05] tracking-[-0.04em] text-fg sm:text-6xl lg:text-7xl"
          >
            <span className="text-gradient">Let&apos;s talk.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            About software, systems, AI — or whatever is currently on fire.
          </p>
          <p className="mt-3 text-sm text-fg-subtle">
            Based in {profile.city}, {profile.country}. {profile.languages.map((l) => l.name).join(" and ")}.{" "}
            <span className="text-accent">{profile.availability}.</span>
          </p>
        </Reveal>

        <Reveal delay={0.18} className="mt-10 flex flex-wrap gap-3">
          <MagneticLink href={`mailto:${links.email}`}>
            Send an email <span aria-hidden>→</span>
          </MagneticLink>
          <MagneticLink href={links.linkedin} target="_blank" rel="noreferrer" variant="ghost">
            LinkedIn <span aria-hidden>↗</span>
          </MagneticLink>
        </Reveal>

        <Reveal delay={0.22}>
          <ul className="mt-16 grid border-t border-line md:grid-flow-col md:auto-cols-fr">
            {channels.map((c) => (
              <li key={c.label} className="min-w-0 border-b border-line md:border-b-0 md:border-r md:last:border-r-0">
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 py-6 md:px-6 md:[li:first-child_&]:pl-0"
                >
                  <span className="min-w-0">
                    <span className="label-mono block">{c.label}</span>
                    <span className="mt-2 block truncate text-fg-muted transition-colors group-hover:text-fg">
                      {c.value}
                    </span>
                  </span>
                  <span
                    aria-hidden
                    className="text-fg-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
