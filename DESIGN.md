# Mannjal — Design System & Homepage Context

> Single source of truth for the Mannjal brand and the marketing homepage.
> Brand stays constant; the homepage borrows **structure/composition** from Databricks
> (product-mock hero, logo band, promo banner, tabbed showcase, capability rows, mega footer)
> while keeping 100% of Mannjal's visual language.

---

## 1. Brand foundations

**What Mannjal is:** partnership-lending infrastructure for banks. It runs co-lending, BC, and
LSP programs end to end. Each partner gets its own secure instance; Mannjal orchestrates between
them **without ever holding borrower data or making credit decisions.** Neutral by design.

**Voice of the design:** enterprise-grade and restrained, not playful or startup-casual.
Amber is the single point of energy; everything around it stays quiet. Confidence through
simplicity and space, not decoration or density. Data and proof points carry the weight.
Copywriting uses plain, declarative lines and a signature **"X, not Y"** contrast
(e.g. "confidence they can prove, not just promise"; "credit, not coordination").

**What to avoid:** bright/multi-color palettes, gradient fills, light backgrounds as the dominant
canvas, stock fintech imagery, decorative elements that carry no information, tight/dense layouts.

---

## 2. Color tokens

Defined as CSS custom properties on `:root`. **Amber is the only warm/saturated color** — everything
else is a neutral on the dark canvas. No gradients, no secondary hues.

| Token | Value | Role |
|---|---|---|
| `--accent` | `#F5A623` | Headlines accents, logo dot, CTAs, stat highlights, icons |
| `--accent-soft` | `color-mix(--accent 14%, transparent)` | Icon tiles, soft fills |
| `--accent-line` | `color-mix(--accent 32%, transparent)` | Amber hairlines, node borders |
| `--bg` | `#111111` | Default canvas |
| `--band` | `#0B0B0B` | Alternating section bands (logo band, RBI, diagram, recognition) |
| `--surface` | `#1A1A1A` | Cards, containers, elevated elements |
| `--surface-2` | `#212121` | Chips, nested surfaces |
| `--text` | `#FFFFFF` | Primary text on dark |
| `--text-2` | `#9A9A9A` | Body / supporting copy |
| `--text-3` | `#6A6A6A` | Captions, metadata, mono eyebrows |
| `--border` | `rgba(255,255,255,0.10)` | Card outlines, separators |
| `--border-strong` | `rgba(255,255,255,0.18)` | Hover borders, ghost buttons |

**Accent alternatives** (exposed as a Tweak): `#F5A623` (brand), `#FFC24B`, `#F0851F`, `#E0B341`.
**Background tones** (Tweak): Brand (`#111`), Deep (`#0C0C0C`), Warm (`#13110C`).

---

## 3. Typography

Two families plus a mono for labels.

- `--font-head` — **Spectral** (serif) — headings, wordmark, stat numerals, pillar titles.
  Heavy serif display reads as deliberate and premium against the restrained dark brand.
  Tweak options: Spectral · Newsreader · Playfair Display. (Roboto was trialed and rejected —
  too generic/heavy for this brand.)
- `--font-body` — **Hanken Grotesk** (sans) — body copy, buttons, nav, card text.
- `--font-mono` — **JetBrains Mono** — eyebrows, tags, "who" labels, step numbers, badges.
  Always uppercase with `letter-spacing: 0.12–0.18em`, color `--accent` or `--text-3`.

**Scale cues:** headings `clamp(30px, 4.4vw, 54px)`; hero `clamp(38px, 5.6vw, 72px)`;
body `16–18px`; eyebrow/mono `~12.5px`. Headings `font-weight: 800`, `letter-spacing: -0.02em`,
`line-height: ~1.05`.

---

## 4. Logo / wordmark

- Lowercase wordmark **mannjal** with a single amber dot as the tittle over the **j** — the only
  graphic mark. Always white letterforms on dark; generous clear space.
- **Use the real asset, not a font recreation.** File: `mannjal-logo.png` (white-on-transparent).
  Referenced via `window.__resources.logo` (with a `"mannjal-logo.png"` string fallback) so the
  HTML bundler can discover and inline it for the standalone export.
- Appears in: nav, footer, and the product-mock "secure instance" badge.

---

## 5. Components & patterns

- **Buttons:** `.btn` pill-ish `border-radius: 8px`. `.btn-primary` (amber, dark text),
  `.btn-dark` (surface-2 + strong border), `.btn-ghost` (transparent + border). Hover lifts 1px.
- **`.link-arrow`:** amber inline link; gap widens on hover (arrow slides).
- **Eyebrow:** mono, uppercase, wide tracking, amber. Category label above every section head.
- **Cards:** `--surface` bg, `1px --border`, `border-radius: 16–22px`, **no drop shadows**
  (brand rule). Hover = border brightens + `translateY(-3px)`.
- **Nuance kit** (applied to audience cards; reusable): ghosted oversized index numeral watermark
  that tints amber on hover, amber top-bar that scales in on hover, faint corner dot-texture
  (same dotted grid as the hero), icon tile that scales on hover.
- **Icons:** flat single-color line icons in amber, drawn inline in `db-appframe.jsx` via the
  `<Ic k="..." />` component (set: grid, branch, shield, wallet, chart, doc, users, bank,
  settings, plus, search, link, arrow, check). Minimal detail, functional not illustrative.
- **Pills/chips:** `--surface-2` bg, `--border`, full-radius, amber check `✓` prefix where used.
- **Motion:** restrained. Section content is static (no scroll-in animation by default — preview
  environments throttle off-focus transitions, so reveal-on-scroll was removed). The one motion
  accent is the diagram pulse (see §6). All motion respects `prefers-reduced-motion`.

---

## 6. Homepage architecture

Section order (top → bottom):

1. **Nav** — sticky, blur backdrop, logo + links + "Talk to us". Border appears on scroll.
2. **Hero** — headline + sub left; a real **product-UI mock** (`AppFrame`) bleeding off the right
   over a masked dotted-grid texture. The signature Databricks borrow.
3. **Logo band** — full-bleed `--band`; "Trusted by banks, SFBs & NBFCs" + placeholder logos.
4. **RBI banner** — amber **chevron** (clip-path) as an evergreen **compliance seal**: shield icon +
   "RBI-ready" + small "Co-Lending Directions · 2025" reference pill. (Deliberately *not* a giant
   "2025" — that read as dated.) Right side: headline + capability chips + "Already live."
5. **Platform showcase** — center head + **pill tabs** (Co-lending / BC / LSP & reporting / Escrow);
   each tab swaps a split card: copy left, matching `AppFrame` view right.
6. **Audience** — two cards, "For banks" / "For originators" (nuance kit applied).
7. **How it works** — the **two-sides flow map** (see below). The core story.
8. **Capabilities** — 4-up icon cards (eligibility, escrow, audit trails, reporting).
9. **Recognition** — stat list (70+ originators · 20+ lenders · ₹1,000 Cr+ disbursed) + RBI card on
   top row; **"Backed by" horizontal island** (Arali · B Capital · Sparrow · Gemba) full-width below.
10. **Close** — CTA card + **FAQ accordion** ("Get to know Mannjal").
11. **Mega footer** — brand + 4 link columns + legal row.

### The "How it works" flow map (signature)
- **Desktop:** an aspect-locked canvas. Two contained "own instance" environments (Bank left,
  Originator right). A central **Mannjal "brain"** (orchestration layer) sits center, vertically
  centered, with capability chips and the "never sees or stores borrower data" note. SVG connectors
  flow bilaterally (Rules/Application in, Decision/Reconciled out) — **not** through a hub that
  stores anything. A bright amber **pulse travels along each connector** in its flow direction,
  staggered, glowing (`stroke-dasharray` + `fmpulse` keyframes); hidden under `prefers-reduced-motion`.
- **Mobile (≤860px):** a clean **numbered vertical timeline** — nodes 01–05 with a single continuous
  amber spine (`.fm-srail::before`) connecting them to cards. The Mannjal step (03) is the filled
  amber node with a glow ring + amber-bordered card. (Do not regress to per-row line segments — the
  spine must be continuous.)

---

## 7. Tweaks (in-page controls)

Wired via `tweaks-panel.jsx` + `useTweaks`. Panel titled "Tweaks", hidden when toggled off.
- **Accent** color (4 amber options)
- **Heading font** (Spectral / Newsreader / Playfair Display)
- **Background** tone (Brand / Deep / Warm)

---

## 8. File structure

| File | Role |
|---|---|
| `Mannjal Homepage (Databricks).html` | **Main deliverable** — all CSS (tokens + component styles), font links, mounts. Edit styles here. |
| `db-appframe.jsx` | `<Ic>` icon set, `MiniChart`, and the `AppFrame` product-UI mock (per-tab views). |
| `db-sections.jsx` | `Wordmark`, `Nav`, `Hero`, `LogoBand`, `RbiBanner`, `PlatformShowcase`, `Audience`. |
| `db-sections2.jsx` | `HowItWorks` (flow map), `Capabilities`, `Recognition`, `Close` (CTA+FAQ), `MegaFooter`. |
| `db-app.jsx` | Composition + tweaks wiring + theme-token application. |
| `tweaks-panel.jsx` | Tweaks shell (starter component). |
| `mannjal-logo.png` | Real logo asset (white-on-transparent). |
| `Mannjal Homepage — Standalone.html` | Bundled offline export (regenerate after any change). |

Components share scope by exporting to `window` via `Object.assign(window, {...})` at the end of
each JSX file (required because each `<script type="text/babel">` is transpiled in its own scope).

> **Note:** an earlier, separate file `Mannjal Homepage.html` is the pre-Databricks v1 (serif,
> simpler structure). The Databricks version is the current direction.

---

## 9. Rules of thumb for future edits

- Never introduce a second accent hue or any gradient. Amber is the only energy.
- Keep cards shadowless; separate content with space, not lines.
- Mono only for labels/eyebrows/numbers; serif for display; sans for everything readable.
- Prefer evergreen phrasing over dated stamps (the RBI-seal lesson).
- When adding a row/grid of siblings, use flex/grid + `gap` (survives direct-edit reorder).
- Regenerate the standalone HTML after changing any source file.
