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
| `surf-lessons/hero.jpg` | Surf Lessons page — hero banner background |
| `surf-lessons/lesson.jpg` | Surf Lessons page — intro photo |
| `tours/kayak-tour.jpg` | Kayak Tour — card + detail page + gallery |
| `tours/paddle-board.jpg` | Paddle Board (SUP) — card + detail page + gallery |
| `tours/night-tour.jpg` | Night Wildlife Tour — card + detail page + gallery |
| `tours/waterfall-tour.jpg` | Waterfall Tour — card + detail page + gallery |
| `tours/fruit-farm-tour.jpg` | Exotic Fruit Farm Tour — card + detail page + gallery |
| `tours/mini-surf-trip.jpg` | Mini Surf Trip (Isla Uvita & Cahuita) — card + detail page + gallery |
| `tours/massage.jpg` | Massage — card + detail page + gallery (folded into Tours) |
| `packages/weekend-taste.jpg` | "Weekend Taste of Puerto Viejo" package card |
| `packages/full-week-explorer.jpg` | "Full Week Explorer" package card |
| `packages/surf-and-relax.jpg` | "Surf & Relax" package card |
| `about/hero.jpg` | About page — hero banner background |
| `about/team-cedric.jpg` | About page — Cedric McCrackin's team card |
| `about/team-solomon.jpg` | About page — Solomon McCrackin's team card |
| `about/team-julie.jpg` | About page — Julie Hickey's team card |
| `location/hero.jpg` | Location page — hero banner background |
| `location/cocles-video.mp4` | Location page — "A Look at Cocles Beach" video, before the map |
| `faq/hero.jpg` | FAQ page — hero banner background |
| `location/cocles.jpg` | Location page — Cocles Beach carousel card |
| `location/punta-uva.jpg` | Location page — Punta Uva carousel card |
| `location/playa-grande.jpg` | Location page — Playa Grande carousel card |
| `location/playa-negra.jpg` | Location page — Playa Negra carousel card |

Note: `about/team.jpg` (the old "How It Started" photo) is no longer
used — that section now embeds the real Zalty Boyz YouTube video
instead of a photo.

Each tour and package image is reused in more than one place (its
listing card and its own page), so one good photo per row above covers
several spots on the site at once.

## Adding more photos (or videos) to a carousel

The Surf Lessons page and each tour's detail page show their main photo
as a swipeable carousel (arrows + dot indicators) whenever more than one
photo exists for it. To add items beyond the first one, use the same
base name with `-2`, `-3`, etc. — each slot can be either a `.jpg`
photo or an `.mp4` video, in any mix:

- `tours/kayak-tour.jpg`, `tours/kayak-tour-2.jpg`, `tours/kayak-tour-3.mp4`, ...
- `surf-lessons/lesson.jpg`, `surf-lessons/lesson-2.jpg`, `surf-lessons/lesson-3.jpg`, ...

Any numbers up to 15 are auto-detected — drop a file in and it just
appears in the carousel, no code changes needed. Gaps are fine (e.g.
`-2` and `-4` without a `-3`), but there's no reason to leave one.

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
- **Videos**: `.mp4` works anywhere a numbered carousel slot is listed
  above (see "Adding more photos (or videos) to a carousel"), and as a
  single clip via `location/cocles-video.mp4`. Keep clips compressed
  (under ~25MB) so pages stay fast.
