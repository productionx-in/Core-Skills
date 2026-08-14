# Memorial invitation & photo frame — Smt. Kaza Krishna Kumari

WhatsApp-ready creatives generated from a single source file.

## Files

| File | Size | Purpose |
| --- | --- | --- |
| `invitation-telugu.png` | 1080×1350 | WhatsApp invitation, Telugu |
| `invitation-english.png` | 1080×1350 | WhatsApp invitation, English |
| `photo-frame-telugu.png` | 1080×1080 | Framed memorial portrait, Telugu |
| `photo-frame-english.png` | 1080×1080 | Framed memorial portrait, English |

All PNGs render at 2× (2160px / 2160px on the long edge) so they stay sharp
after WhatsApp recompression and are usable for small prints.

## Regenerating

```bash
node design.js          # writes the four .html files and screenshots them
```

Requires Playwright's Chromium. Everything else (fonts, ornaments) is local —
no network access needed at render time.

## Adding the photograph

The portrait slot currently shows a placeholder. To drop in the real photo:

1. Put the image next to `design.js` (e.g. `photo.jpg`).
2. Set `photo: 'photo.jpg'` in the `CONFIG` block at the top of `design.js`.
3. Re-run `node design.js`.

The slot uses `object-fit: cover`, so any aspect ratio is cropped to fit
rather than squashed. A roughly portrait crop centred on the face works best.

## Details still to confirm

`CONFIG` at the top of `design.js` holds every editable string. These are
placeholders or inferences and should be checked before sending:

- **Time** — defaults to 8:00 AM.
- **Date of passing** — 10 August 2026 is *derived*, not given: if 19 Aug is
  the 10th day and 21 Aug the 12th, day one falls on 10 Aug 2026 (Monday).
- **Relationship** — defaults to "our beloved mother" / "మా తల్లి గారైన".
- **Rite names** — the 20 Aug label follows the conventional sequence; only
  the 10th day (19 Aug) and 12th day (21 Aug) were specified. The card lists
  19-21 Aug; 18 Aug was dropped at the family's request.

## Fonts

Bundled under `fonts/`, all SIL Open Font License 1.1:

- Noto Serif Telugu — Telugu text
- Cormorant Garamond, EB Garamond — Latin text
