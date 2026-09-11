# Where to put video clips

Same idea as `public/images/README.md`: drop a file at the exact path
below and it replaces the "Video coming soon" placeholder automatically.

| Path | Used on |
|---|---|
| `cedric-surfing.mp4` | Homepage — "See Your Instructor in Action" section |

## Before adding a clip here

Raw camera/drone exports are usually **way** too large for a website —
we've hit clips in the 100–250MB range in this project's raw photo/video
dump, which would make the homepage painfully slow to load and can even
exceed hosting limits. Before dropping a file in this folder:

1. **Trim it** to the actual clip you want (10–30 seconds is plenty for a
   homepage spotlight — this isn't the place for a multi-minute reel).
2. **Compress it** to roughly **5–15MB** at 1080p. On a Mac, iMovie's
   "Share > File" export at 1080p and a moderate quality setting gets
   you there; QuickTime Player's Export can too. If you have HandBrake
   installed, its "Fast 1080p30" preset is a reliable one-click option.
3. **Keep it as `.mp4`** (H.264) — this plays natively in every browser
   without extra work.

If you're not sure how to compress a specific file, ask and it can be
walked through, or the file can be compressed here directly if it's
already in the project folder.
