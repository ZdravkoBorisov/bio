# Zdravko Borisov — personal site

Single-page portfolio built with Next.js (App Router), Tailwind CSS v4 and Motion. It is exported as a fully static site.

## Development
 
```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
```

## Content

All copy lives in `src/content/` — edit those files rather than the components:

| File | Section |
| --- | --- |
| `site.ts` | Name, role, contact links, navigation |
| `hero.ts` | Hero headline and intro |
| `experience.ts` | Roles |
| `landscape.ts` | Systems graph — nodes, positions and edges |
| `production.ts`, `ai.ts`, `stack.ts` | Remaining sections |

## Build

```bash
npm run build      # writes the static site to out/
```

`next.config.ts` uses `output: "export"`, so there is no server runtime: metadata routes (`robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `apple-icon.tsx`) are rendered once at build time.

## Deploying to Cloudflare Pages

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `out` |
| Environment variable | `NEXT_PUBLIC_SITE_URL=https://your-domain` |
| Environment variable | `NODE_VERSION=20` (or newer) |

`NEXT_PUBLIC_SITE_URL` is required — it feeds the canonical URL, sitemap, robots.txt and social preview image. Without it they point at `https://example.com`.

Response headers (security headers, long-term caching for hashed assets) are defined in `public/_headers`, which Cloudflare Pages picks up automatically.
