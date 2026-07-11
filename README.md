# Mannjal website

Static marketing site for Mannjal, served by GitHub Pages from the root of the `Mannjal-dark` branch. What you see in this repo is exactly what deploys — there is no build step.

## Layout

- `*.html` — the site pages, one file per page, all at the repo root (Pages serves them at `/<name>.html`; keep them here so URLs don't change)
- `assets/system.css` — the shared design system; every page links it
- `assets/app.js` — shared JS (icons, nav, accordions)
- `assets/img/` — founder photos and investor logos
- `assets/mannjal-logo.png`, favicons — brand assets
- `wireframes/` — annotated wireframes; the content and IA source of truth per page
- `CLAUDE.md` — the build brief; read it before changing or adding pages
- `_private/` — local-only business documents (gitignored, never committed)

## Working on it

Open any `.html` file in a browser, or run `python3 -m http.server` from the repo root.

Branch off `Mannjal-dark`, open a PR back into it; merging deploys to Pages.
