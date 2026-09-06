# Where to put photos

Drop a file at the exact path below and it replaces the "Photo coming
soon" placeholder on the site automatically — no code changes needed.
Just re-run `npm run build` (or refresh the dev server) after adding one.

**Filenames must match exactly** (lowercase, hyphens, same extension
shown below — `.jpg` is assumed but `.png`/`.webp` also work if you
update the path in code to match).

## Naming and use

| Path | Used on |
|---|---|
| `home/hero-surf-class.webp` | Homepage — full-width hero background |
| `home/surf-highlight.jpg` | Homepage — "Surf Lessons for Every Level" card |
| `home/tours-teaser.jpg` | Homepage — "Kayak, paddle board, waterfalls & wildlife" card |
| `home/packages-teaser.jpg` | Homepage — "Book a Full Week or Weekend" card |
| `surf-lessons/lesson.jpg` | Surf Lessons page — intro photo |
| `tours/kayak-tour.jpg` | Kayak Tour — card + detail page + gallery |
| `tours/paddle-board.jpg` | Paddle Board (SUP) — card + detail page + gallery |
| `tours/night-tour.jpg` | Night Wildlife Tour — card + detail page + gallery |
| `tours/waterfall-tour.jpg` | Waterfall Tour — card + detail page + gallery |
| `tours/fruit-farm-tour.jpg` | Exotic Fruit Farm Tour — card + detail page + gallery |
| `tours/mini-surf-trip.jpg` | Mini Surf Trip (Isla Uvita & Cahuita) — card + detail page + gallery |
| `packages/weekend-taste.jpg` | "Weekend Taste of Puerto Viejo" package card |
| `packages/full-week-explorer.jpg` | "Full Week Explorer" package card |
| `packages/surf-and-relax.jpg` | "Surf & Relax" package card |
| `massages/hero.jpg` | Massages page photo |
| `about/team.jpg` | About page — "How It Started" photo |
| `about/team-cedric.jpg` | About page — Cedric McCrackin's team card |
| `about/team-solomon.jpg` | About page — Solomon McCrackin's team card |
| `about/team-julie.jpg` | About page — Julie Hickey's team card |

Each tour and package image is reused in more than one place (its
listing card, its own page, and — for tours — the Gallery page), so one
good photo per row above covers several spots on the site at once.

## What makes a good file

- **Orientation**: landscape, roughly 4:3 or 16:9 — the layout crops to
  fit, so avoid photos where the subject is tight against the edges.
- **Size**: 1600–2000px on the long edge is plenty; anything larger just
  slows down the page for no visual benefit (Next.js still resizes and
  compresses it automatically for each device).
- **Format**: `.jpg` for photos. If you'd rather use `.webp` or `.png`,
  update the matching `src` path in the page component to the new
  extension.
- **Content**: real guests/guides/locations doing the actual activity
  beats a generic stock photo — it's both more trustworthy for visitors
  and more useful for Google Image Search and AI search tools trying to
  understand what the business actually offers.

## Not covered by this table

- **Logo**: add `public/logo.png` once you have one, then uncomment the
  `logo` line in `src/lib/schema.ts` (`organizationSchema`) so it shows
  up in search results.
- **Social share image**: auto-generated from site copy/colors at
  `src/app/[locale]/opengraph-image.tsx` — no file needed, but replace
  it with a real designed image later if you want.
- **Gallery-only extra photos**: the Gallery page currently reuses the
  tour photos above. If you want additional photos there beyond the six
  tours, ask and it's a small change to support a dedicated
  `gallery/*.jpg` folder of extras.
