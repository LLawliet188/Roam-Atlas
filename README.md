# Wanderlust — Immersive Travel Portfolio Platform

A premium, cinematic travel portfolio: interactive 3D globe, animated maps, timelines,
destination stories, galleries, blog/vlog, AI search & assistant, and a full CMS/admin —
built on Next.js 16 (App Router) + React 19.

**🌍 Live:** https://llawliet188.github.io/Roam-Atlas/ · **Repo:** https://github.com/LLawliet188/Roam-Atlas

> **Not a blog.** The experience aims for the feel of National Geographic × Apple ×
> Airbnb × Google Earth × Polarsteps.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | **Next.js 16** (App Router, Turbopack, RSC) |
| UI | React 19, TypeScript (strict), Tailwind CSS **v4** |
| Components | Hand-rolled shadcn-style primitives (`src/components/ui`) |
| Motion | Framer Motion, GSAP, CSS keyframes |
| 3D | Three.js + React Three Fiber + Drei |
| Scroll | Lenis smooth scroll |
| Data (planned) | Supabase (Auth/Postgres/Storage) + Prisma |
| Media (planned) | Cloudinary |
| Maps (planned) | Mapbox |

### Important: this repo targets Next.js **16**, not 15

The scaffold installed the current release (16) + Tailwind **v4**, which differ from
older docs. Key rules enforced in this codebase:

- `params` / `searchParams` / `cookies` / `headers` are **async** — always `await`.
- Images use `remotePatterns` + explicit `qualities` (see `next.config.ts`).
- `middleware` is now `proxy`; Turbopack is the default bundler.
- Brand icons (Github/Instagram/Twitter) were **removed from `lucide-react`** — use
  generic icons.
- Bundled docs live in `node_modules/next/dist/docs/` — read before using new APIs.

## Architecture

Feature-based, server-components-first, strictly typed.

```
src/
  app/                     # App Router routes
    page.tsx               # Cinematic landing
    explore/               # Filterable destination grid (data-backed)
    destinations/[slug]/   # Destination detail (static params + async params)
    globe/                 # M2: interactive 3D globe (R3F)
    map/                   # M2: scratch map + animated routes
    timeline/              # M2: scroll-driven travel timeline
    stories|blog|search|.. # Later-milestone stubs (ComingSoon)
    loading.tsx error.tsx not-found.tsx
    globals.css            # Tailwind v4 theme + design tokens
  components/
    globe/                 # M2 globe scene + experience
    map/                   # M2 world/scratch map
    timeline/              # M2 timeline view
    ui/                    # Primitives: button, card, badge, skeleton, reveal, slot…
    layout/                # navbar, footer, page-header, coming-soon
    landing/               # hero, particle-field, featured, capabilities, marquee, cta
    destinations/          # destination-card, explore-grid
    providers/             # theme-provider, smooth-scroll (Lenis)
  lib/
    types.ts               # Domain types (Destination, TimelineEntry, …)
    config.ts              # Site + nav config
    utils.ts               # cn(), formatters
    data/                  # Mock data layer (swap for Supabase/Prisma)
```

### Design system

Semantic tokens (shadcn-style: `--background`, `--primary`, …) plus a travel-inspired
brand palette (`--ocean`, `--sunset`, `--coral`, `--jungle`, `--aurora`, `--gold`),
defined in `globals.css` for light **and** dark, mapped into Tailwind via `@theme`.
Utilities: `.text-gradient`, `.bg-aurora`, `.glass`, `.shimmer`. Reduced-motion honored.

### Runs with zero API keys

The whole app is populated by a **mock data layer** (`src/lib/data`) using seeded
[Lorem Picsum](https://picsum.photos) images. Swap `lib/data/images.ts` for a
Cloudinary URL builder and the data files for Supabase queries — the `Destination`
type is the contract.

## Getting started

```bash
npm install
npm run dev        # Turbopack dev server
npm run build      # production build
```

## Milestones

- [x] **M1 — Foundation & cinematic landing.** Design system, dark/light theming,
  Lenis smooth scroll, nav/footer, UI primitives, animated hero (aurora + particles +
  gradient headline), featured grid, capabilities bento, CTA, filterable `/explore`,
  destination detail pages, error/loading/404 boundaries.
- [x] **M2 — 3D globe (R3F), animated world map, scratch map, travel timeline.**
  Dotted-land Earth with glowing destination pins (Three.js/R3F/drei), a scratch-foil
  world map with animated great-circle routes and visited-country tinting, and a
  scroll-driven chronological timeline.
- [x] **M3 — Country→city hierarchy, richer destination pages, Pinterest gallery + lightbox.**
  Country-grouped explore view + breadcrumbs + sibling-city navigation, destination
  pages with highlights and real-photo masonry, and a filterable Pinterest-style
  gallery (Prague & Doha chapters, films tab, keyboard-navigable lightbox).
- [ ] **M4 — Stories, MDX blog + vlog, comments, likes, bookmarks, newsletter.**
- [ ] **M5 — AI semantic search + assistant, stats dashboard, bucket list.**
- [ ] **M6 — CMS/admin, RBAC auth, autosave, scheduling, drafts, analytics.**
- [ ] **M7 — PWA/offline, SEO, media optimization, deploy (Vercel).**

Each milestone ships fully functional before the next begins.
