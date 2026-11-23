import { hero } from "@/content/hero";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-3 py-8 text-xs text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
          <span aria-hidden className="mx-2 text-fg-faint">·</span>
          <span className="font-mono uppercase tracking-[0.12em] text-fg-muted">{hero.motto}</span>
        </p>
        <a href="#home" className="font-mono uppercase tracking-[0.12em] transition-colors hover:text-fg">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
