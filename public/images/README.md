# Where to put photos

Drop a file at the exact path below and it replaces the "Photo coming
soon" placeholder on the site automatically — no code changes needed.
Just re-run `npm run build` (or refresh the dev server) after adding one.

**Filenames must match exactly** (lowercase, hyphens, same extension
shown below — `.jpg` is assumed but `.png`/`.webp` also work if you
update the path in code to match).

## Naming and use

Filenames describe what's in the photo plus where it is (e.g.
`kayak-tour-puerto-viejo.jpg`) — lowercase, hyphens, real `.jpg`
extension. Descriptive names help Google Images and AI search tools
understand the photo; keep that pattern for anything new.

| Path | Used on |
|---|---|
| `home/surfer-aerial-puerto-viejo-costa-rica.jpg` | Homepage — hero background (desktop) |
| `about/cedric-mccrackin-surfing-cocles.jpg` | Homepage — hero background (mobile), Cedric's spotlight + About team card |
| `home/surf-lesson-group-cocles-beach.jpg` | Homepage — "Surf Lessons for Every Level" card |
| `home/surfing-puerto-viejo.mp4` (+ `-poster.jpg`) | Homepage — "See Your Instructor in Action" video (720p H.264) |
| `surf-lessons/surf-lesson-puerto-viejo.jpg` (+ `-2` … `-10`) | Surf Lessons page carousel. `-2` is also the page hero, `-5` the Surf & Relax package card, `-9` a homepage card |
| `tours/tours-puerto-viejo-hero.mp4` | Tours page — hero video |
| `tours/kayak-tour-puerto-viejo.jpg` (+ `-2`, `-3.mp4`) | Kayak Tour — card + detail carousel; `-2` is also the Full Week Explorer package card |
| `tours/paddle-board-puerto-viejo.jpg` (+ `-2`, `-3.mp4`) | Paddle Board — card + detail carousel; also the Packages page hero |
| `tours/night-tour-puerto-viejo.jpg` (+ `-2` … `-4`) | Night Tour & Exotic Fruit Farm — card + detail carousel |
| `tours/waterfall-tour-puerto-viejo.jpg` (+ `-2`) | Waterfall Tour — card + detail carousel; `-2` is also the Weekend Taste package card |
| `tours/waterfall-tour-puerto-viejo-hero.mp4` | Waterfall Tour — header video |
| `tours/mini-surf-trip-puerto-viejo.jpg` (+ `-2`) | Mini Surf Trip — card + detail carousel |
| `tours/massage-puerto-viejo.jpg` (+ `-2`, `-3`) | Massage — card + detail carousel. `-2` (Julie massaging) is also Julie's About team card; `-2` and `-3` (Watsu) are the Yoga & Massage page's Massage carousel |
| `yoga/yoga-class-puerto-viejo-1.jpg` … `-3.jpg` | Yoga & Massage page — "About the classes" photo strip; `-2` is also the page header |
| `about/surfer-barrel-wave-caribbean-costa-rica.jpg` | About page — hero background |
| `about/solomon-mccrackin-surf-instructor.jpg` | About page — Solomon's team card |
| `about/zalty-boyz-surfing-puerto-viejo.mp4` (+ `-poster.jpg`) | About page — video next to "How it started" (720p H.264) |
| `location/cocles-beach-puerto-viejo.jpg` | Location page hero + homepage "Find Us" card |
| `faq/surfer-airborne-puerto-viejo.jpg` | FAQ page — hero background |

One photo is often used in several places (a tour photo doubles as a
package card, etc.) — the code points at the same file rather than
keeping copies, so replace it once and every spot updates.

Unused photos that are worth keeping (beach shots, extra surf photos)
live in `photo-library/` at the repo root — outside `public/`, so they
aren't deployed. Move one into the right folder here, with a name that
matches the table above, to put it on the site.

The tour/lesson filename bases come from `tourPhotoName()` and
`surfLessonPhotoName` in `src/data/tours.ts`.

## Adding more photos (or videos) to a carousel

The Surf Lessons page and each tour's detail page show their main photo
as a swipeable carousel (arrows + dot indicators) whenever more than one
photo exists for it. To add items beyond the first one, use the same
base name with `-2`, `-3`, etc. — each slot can be either a `.jpg`
photo or an `.mp4` video, in any mix:

- `tours/kayak-tour-puerto-viejo.jpg`, `tours/kayak-tour-puerto-viejo-2.jpg`, `tours/kayak-tour-puerto-viejo-3.mp4`, ...
- `surf-lessons/surf-lesson-puerto-viejo.jpg`, `surf-lessons/surf-lesson-puerto-viejo-2.jpg`, ...

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
  single clip like `home/surfing-puerto-viejo.mp4`. New `.mp4`
  files are gitignored by default (raw camera files are huge) — add a
  `!public/images/...` line to `.gitignore` for each one the site uses. Keep clips compressed
  (under ~25MB) so pages stay fast.
