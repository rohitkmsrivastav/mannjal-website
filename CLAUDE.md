# Mannjal website — build brief

This is the **only** version of the Mannjal site — a single static build living at the repo root, sharing one design system. There is no separate dark/legacy build and no duplicated deploy copy anymore; the repo root is both what you edit and what GitHub Pages serves. `index.html` is the reference implementation — match its look, structure, and code conventions exactly when adding or changing pages.

Mannjal is B2B partnership-lending infrastructure (co-lending, Business Correspondent, Direct Assignment, securitisation, digital lending) sitting neutrally between banks and loan originators, plus Dash, its workflow orchestration layer. It never makes a credit decision — that neutrality is load-bearing and must stay visible in copy and diagrams.

## Repo layout

```
index.html, for-banks.html, for-originators.html, how-it-works.html,
platform.html, security.html, co-lending.html,
business-correspondent.html, direct-assignment.html, securitisation.html,
digital-lending.html, our-story.html, careers.html, faq.html, contact.html,
book-a-walkthrough.html, privacy.html, terms.html   ← the built pages
assets/system.css       ← the whole design system. Every page links this. Do not fork it.
assets/app.js           ← shared JS: ic(), appFrame(), hydrateIcons(), initNav(), wireAccordion(), miniChart()
assets/img/             ← founder photos + investor logos used by Our Story / homepage
assets/product/         ← approved product workflow and dashboard visuals used by product pages
assets/photographs/     ← source photographs kept with the site assets
assets/comic_strips/    ← illustration assets
assets/reference/       ← local reference artwork and source exports
wireframes/             ← low-fi annotated wireframes = the content + IA source of truth for each page
_private/               ← local-only business docs (audit PDFs, questionnaires, spare logo exports); gitignored, never commit
```

"Dash" is an internal name only — the public site says "the platform" and the pages are `platform.html` ("The Platform") and `security.html` ("Security & trust").

The wireframes are grey-box layouts with dashed amber annotation notes explaining intent. They are **content and structure specs, not visual targets**. Build the real page in the `system.css` look and drop all placeholder/annotation styling.

Still not built (no source wireframe/IA exists yet): `traction.html`, `blog.html`.

Each page is a standalone HTML file in the repo root, same `<head>` as `index.html` (fonts + `assets/system.css`), shared nav + footer (`<img class="logo-img" src="assets/mannjal-logo.png">`, not a text wordmark), `<script src="assets/app.js"></script>`, then a small inline script calling `hydrateIcons()` and `initNav()` (plus `wireAccordion(...)` if the page has accordions). Product visuals live in `assets/product/` and are placed with the shared `.product-visual` treatment; keep their source files together there rather than adding page-local media folders.

## Design tokens (defined in `assets/system.css` `:root` — never hard-code hex)

- Foundation: `--page #FCFCFD`, `--band #F4F5F6`, `--surface #FFFFFF`
- Ink/text: `--ink #1F2328`, `--text-2 #565D6A`, `--text-3 #8B92A0`
- Lines: `--line #E6E9ED`, `--line-strong #D4D9DF`
- Accent — brand gold, two-tone (use sparingly): `--accent #FFBE00` for fills/button backgrounds/decorative dots only (illegible as text on white); `--accent-ink #946100` for all accent text, icons, diagram lines and borders; `--accent-soft #FFF4D6` (tint background); `--accent-line rgba(255,190,0,0.35)` (hairline border).
- Type: **Inter** for everything. Eyebrows = uppercase, tracked, `--accent-ink`. Figures = tabular-nums. Headings 700 weight, tight tracking.

## Components already in `system.css` (reuse, don't reinvent)

`.nav` · `.hero` / `.hero-center` + `.img-ph` (standard hero visual) · `.eyebrow` · `.btn` (`.btn-primary` / `.btn-dark` / `.btn-ghost` / `.btn-sm`) · `.link-arrow` · `.sec` / `.band` / `.sec-head` · `.statstrip` (thin 3-cell strip directly under a hero) · `.recog-stats` + `.recog-stat` (metric rows, `.cols2` variant) · `.aud-grid` + `.aud-card` (persona/feature/numbered-step cards, `.cols3` variant; put a `.chip-row` of `.chip` pills inside a card when it needs token/tag lists) · `.reassure` (bordered reassurance island with a `.seal` icon + optional `.cro-chips`) · `.split-flow` (compact icon list paired with a visual, two-column) · `.fm-*` two-sides flow map · `.trust-list`/`.trust-row` editorial rows · `.backed-island` · `.cta-band` + `.faq` · `footer.site` · `.chip`, `.chip.accent`, `.pill`.

Map content shapes to these — don't invent a new bespoke component when one of these already fits:
- **3-cell metric / quick-read strip directly under a hero** → `.statstrip`.
- **Metric rows further down a page** → `.recog-stats` / `.recog-stat`.
- **Program paragraphs, labelled concern blocks, numbered process steps** (For Banks, Platform & Security, Dash Platform) → `.aud-grid` + `.aud-card`. This is the default for almost any "N labelled things, each with a short explanation" shape.
- **Today-vs-Mannjal matrix** (For Originators — historical; current build uses an `.aud-grid` outcome-card layout instead) → a two-column comparison built with `--line` borders and `--accent-soft` on the Mannjal column, if resurrected.
- **Three-lane How It Works** → reuse the homepage `.fm-*` flow map directly (originator lane / Mannjal amber spine / bank lane). The credit decision card stays in the **bank/lender lane**.
- **Reassurance bands** (CRO band, audit-pass band, neutral-position band, lender-controlled-by-design) → `.reassure`, one short paragraph, not two — use a `.cro-chips` row to break out specifics instead of a second paragraph.
- **Founder cards / timeline / investor cards** (Our Story) → card grid using `.surface` + `--line`; amber dots for the timeline rail. Keep copy factual, no superlatives.
- **Integrations row** (Platform & Security) → `.intg-grid` tiles with a name + function tag.
- **Contact form** (Contact) → use `--line` inputs on `--surface`; no `<form>` semantics needed for the static build; include the "I'm a bank / I'm an originator" routing select and show founder emails.

## Voice & copy rules

- Tone is peer-level and professional for senior buyers. Operator, not vendor. Plainspoken and precise.
- **Avoid "platform"/"solution" SKU framing in new copy.** Prefer "infrastructure", "orchestration", or plain description. (The homepage copy still says "platform" in places — that's pre-existing; don't propagate it into the new pages.)
- Metrics are experiences the ops team lives, not feature specs: `50–75% TAT reduction`, `98% first-time-right`, `85–90% login-to-sanction`, `1–2 week program launch`, `70+ originators`, `20+ lenders`, `₹1,000 Cr+ disbursed`.
- No bulleted capability lists in body copy — write paragraphs in the reader's voice.
- Reinforce neutrality everywhere: Mannjal orchestrates; the lender decides; borrower data never sits in the middle.
- CTA wording is fixed: **"Schedule a walkthrough"** on bank/CRO pages, **"Join the network"** on For Originators. Never "Get a demo".
- Avoid AI-writing tells: em dashes as connectors, negative parallelism ("not X, but Y"), bold-first bullets, repeated structural templates, punchy fragment stacks.

## Logo

Use `assets/mannjal-logo.png` (a dark "mannjal" wordmark badge with a gold dot over the *j*) via `<img class="logo-img" src="assets/mannjal-logo.png" alt="mannjal">` in both nav and footer — not a text wordmark.

## Per-page nav state

Nav and footer markup are identical across pages (copy from `index.html`). On each page, the matching top-level nav link gets a quiet active treatment; the wireframes note which item is "active" (some pages — Platform & Security, Our Story, Contact — have no active primary item and are reached from the footer/secondary nav).

## Quality floor

Responsive down to mobile (the system has the breakpoints), visible keyboard focus, `prefers-reduced-motion` respected (already handled for the flow-map pulse), no `localStorage`/`sessionStorage`. Keep the boldness in one place per page (usually the flow map or the hero); everything else stays quiet.

## How to run

It's static HTML — open any file in a browser, or `python3 -m http.server` from the repo root. No build step.
