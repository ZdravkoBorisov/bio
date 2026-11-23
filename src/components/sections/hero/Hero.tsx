"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { PerspectiveGrid } from "@/components/fx/PerspectiveGrid";
import { ServiceGlobe } from "@/components/fx/ServiceGlobe";
import { hero } from "@/content/hero";
import { links, profile } from "@/content/site";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { StatusDot } from "@/components/ui/StatusDot";
import { cn } from "@/lib/cn";
import { easeOutExpo } from "@/lib/motion";
import { HeroNetwork } from "./HeroNetwork";

const LINE_DELAY = 0.18;
const CHAR_DELAY = 0.024;

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [live, setLive] = useState(false);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const networkOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  useEffect(() => {
    const t = window.setTimeout(() => setLive(true), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-x-clip pb-16 pt-28 lg:pb-20 lg:pt-32"
    >
      <PerspectiveGrid className="bottom-0 -z-10 h-[24%] opacity-50" />

      <div className="container-page grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="beam inline-flex items-center gap-2.5 rounded-full border border-line bg-ink-900/60 py-1.5 pl-3 pr-3.5 font-mono text-[0.75rem] tracking-wide text-fg-muted"
          >
            <StatusDot active={live} />
            {hero.status}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.15 }}
            className="label-mono mt-8"
          >
            {hero.eyebrow.join(" · ")}
          </motion.p>

          <h1
            id="hero-title"
            className="mt-5 text-[2.6rem] font-medium leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-[4.25rem] xl:text-[4.75rem]"
          >
            {hero.headline.map((line, i) => {
              let charIndex = 0;
              return (
                <span key={line} className={cn("block pb-[0.08em]", i === 0 && "text-fg")}>
                  <span className="sr-only">{line}</span>
                  <span aria-hidden className="block">
                    {line.split(" ").map((word, w) => (
                      <Fragment key={w}>
                        {w > 0 ? " " : null}
                        <span className="inline-block whitespace-nowrap">
                          {Array.from(word).map((char, c) => {
                            const delay = 0.2 + i * LINE_DELAY + charIndex++ * CHAR_DELAY;
                            return (
                              <motion.span
                                key={c}
                                className={cn("inline-block", i > 0 && "text-gradient")}
                                style={{ transformOrigin: "50% 100%", transformPerspective: 600 }}
                                initial={{ opacity: 0, rotateX: -95, y: "0.25em" }}
                                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                                transition={{ duration: 0.9, ease: easeOutExpo, delay }}
                              >
                                {char}
                              </motion.span>
                            );
                          })}
                        </span>
                      </Fragment>
                    ))}
                  </span>
                </span>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: easeOutExpo, delay: 0.85 }}
            className="mt-6 flex items-center gap-3"
          >
            <span aria-hidden className="h-px w-10 bg-gradient-to-r from-accent to-transparent" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-fg sm:text-[0.875rem]">
              {hero.motto}
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.47 }}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-fg-subtle"
          >
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="tracking-normal">📍</span>
              {profile.city}, {profile.country}
            </span>
            <span aria-hidden className="text-fg-faint">·</span>
            <span>
              <span className="sr-only">Speaks {profile.languages.map((l) => l.name).join(" and ")}</span>
              <span aria-hidden>{profile.languages.map((l) => l.code).join(" / ")}</span>
            </span>
            <span aria-hidden className="text-fg-faint">·</span>
            <span className="text-accent">{profile.availability}</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.52 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <MagneticLink href="#experience">
              View experience
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-y-0.5">
                ↓
              </span>
            </MagneticLink>
            <MagneticLink href="#contact" variant="ghost">
              Contact me
            </MagneticLink>
            <div className="ml-1 flex items-center gap-4 font-mono text-[0.75rem] uppercase tracking-[0.14em] text-fg-subtle">
              <a href={links.github} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
                GitHub ↗
              </a>
              <a href={links.linkedin} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
                LinkedIn ↗
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: networkOpacity }}
          className="relative isolate mx-auto w-full max-w-[26rem] sm:max-w-[30rem] lg:max-w-[32rem]"
        >
          {/* No 3D transforms here: they make the browser rasterise and rescale the SVG text */}
          <ServiceGlobe className="pointer-events-none absolute -inset-[6%] -z-10 h-[112%] w-[112%] opacity-40" />
          <HeroNetwork />
        </motion.div>
      </div>

      <motion.a
        href="#snapshot"
        aria-label="Scroll to engineering snapshot"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-fg-faint transition-colors hover:text-fg-subtle lg:flex"
      >
        <span className="font-mono text-[0.75rem] uppercase tracking-[0.12em]">Scroll</span>
        <span className="relative h-8 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-3 animate-[scroll-hint_2s_ease-in-out_infinite] bg-fg-subtle" />
        </span>
      </motion.a>
    </section>
  );
}
