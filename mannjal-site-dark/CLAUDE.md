# Mannjal website — build brief

Goal: build a **light-themed, designed** version of every page of the Mannjal site, all sharing one design system. `index.html` (the homepage) is already finished and is the **reference implementation** — match its look, structure, and code conventions exactly.

Mannjal is B2B partnership-lending infrastructure (co-lending, Business Correspondent, and LSP programs) sitting neutrally between banks and loan originators. It never makes a credit decision and never holds borrower data — that neutrality is load-bearing and must stay visible in copy and diagrams.

## Repo layout

```
index.html              ← finished homepage (the reference — study it first)
assets/system.css       ← the whole design system. Every page links this. Do not fork it.
assets/app.js           ← shared JS: ic(), appFrame(), hydrateIcons(), initNav(), wireAccordion(), miniChart()
wireframes/             ← low-fi annotated wireframes = the content + IA source of truth for each page
```

The wireframes are grey-box layouts with dashed amber annotation notes explaining intent. They are **content and structure specs, not visual targets**. Build the real page in the `system.css` look and drop all placeholder/annotation styling.

## Page build order

Each page is a standalone HTML file in the repo root, same `<head>` as `index.html` (fonts + `assets/system.css`), shared nav + footer, `<script src="assets/app.js"></script>`, then a small inline script calling `hydrateIcons()` and `initNav()` (plus `wireAccordion(...)` if the page has accordions).

| Output file | Source wireframe | Reader | Primary CTA |
|---|---|---|---|
| `for-banks.html` | `wireframes/mannjal-for-banks-wireframe.html` | Bank CBO / CRO | Schedule a walkthrough |
| `for-originators.html` | `wireframes/mannjal-for-originators-wireframe.html` | Originator MD / CEO | Join the network |
| `how-it-works.html` | `wireframes/mannjal-how-it-works-wireframe.html` | CRO / partnership manager | Schedule a walkthrough |
| `platform-security.html` | `wireframes/mannjal-platform-security-wireframe.html` | Bank IT / audit committee | Request security documentation |
| `our-story.html` | `wireframes/mannjal-our-story-wireframe.html` | Board sponsor / senior decision-maker | Schedule a walkthrough |
| `contact.html` | `wireframes/mannjal-contact-wireframe.html` | Anyone ready to talk | Schedule a walkthrough |

Three more pages from the engagement proposal (`Mannjal_Engagement_Proposal.md`, Appendix A) complete the 10-page site — build them last, from that IA: `traction.html` (anonymized case snapshots + aggregate network numbers), `blog.html` (CMS-style index + a TLDR-led article template), `careers.html` (lightweight roles list).

## Design tokens (defined in `system.css :root` — never hard-code hex)

- Foundation: `--page #FCFCFD`, `--band #F4F5F6`, `--surface #FFFFFF`
- Ink/text: `--ink #1F2328`, `--text-2 #565D6A`, `--text-3 #8B92A0`
- Lines: `--line #E6E9ED`, `--line-strong #D4D9DF`
- Accent (use sparingly): `--accent #B8651F` (burnt amber), `--accent-2 #9E5417` (hover), `--accent-soft #FDF3E8` (tint), `--accent-line` (hairline)
- Type: **Inter** for everything. Eyebrows = uppercase, tracked, amber. Figures = tabular-nums. Headings 700 weight, tight tracking.

## Components already in `system.css` (reuse, don't reinvent)

`.nav` · `.hero` / `.hero-grid` · `.eyebrow` · `.btn` (`.btn-primary` / `.btn-dark` / `.btn-ghost` / `.btn-sm`) · `.link-arrow` · `.sec` / `.band` / `.sec-head` · `.strip`-style metric rows → use `.recog-stats` + `.recog-stat` · `.aud-card` (persona/feature cards) · `.app` product mock (call `appFrame('dashboard'|'coLending'|'bc'|'escrow'|'reporting')`) · `.fm-*` two-sides flow map · `.trust-acc` accordion · `.backed-island` · `.cta-card` + `.faq` · `footer.site` · `.chip`, `.pill`, `.logo-ph`.

Map wireframe patterns to these:
- **3-cell metric / trust strip** (For Banks, Originators, How It Works, Platform) → `.recog-stats` / `.recog-stat`, or the `.strip` look rebuilt with tokens. Frame each metric as a lived consequence, not a spec.
- **Program paragraphs** (For Banks: BC / co-lending / DA) and **labelled concern blocks** (Platform & Security: deployment / data isolation / credentials / audit) → `.aud-card`-style blocks or a simple bordered list using `--line`. No bullet-point capability lists.
- **Today-vs-Mannjal matrix** (For Originators) → a two-column comparison built with `--line` borders and `--accent-soft` on the Mannjal column.
- **Three-lane How It Works** → reuse the homepage `.fm-*` flow map directly (originator lane / Mannjal amber spine / bank lane). The credit decision card stays in the **bank/lender lane**.
- **Reassurance bands** (CRO band, audit-pass band, neutral-position band) → a `.band` section with `.sec-head` + short paragraph.
- **Founder cards / timeline / investor cards** (Our Story) → card grid using `.surface` + `--line`; amber dots for the timeline rail. Keep copy factual, no superlatives.
- **Integrations row** (Platform & Security) → grid of `.logo-ph`-style tiles with a name + function tag.
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

The supplied logo PNG is white-on-transparent (built for a dark site) and is invisible on this light background. Render the wordmark as text instead — exactly as in `index.html`:
`<span class="wordmark">Mann<span class="j">j</span>al</span>` (ink text, amber dot over the *j*). Keep it in nav and footer.

## Per-page nav state

Nav and footer markup are identical across pages (copy from `index.html`). On each page, the matching top-level nav link gets a quiet active treatment; the wireframes note which item is "active" (some pages — Platform & Security, Our Story, Contact — have no active primary item and are reached from the footer/secondary nav).

## Quality floor

Responsive down to mobile (the system has the breakpoints), visible keyboard focus, `prefers-reduced-motion` respected (already handled for the flow-map pulse), no `localStorage`/`sessionStorage`. Keep the boldness in one place per page (usually the flow map or the hero); everything else stays quiet.

## How to run

It's static HTML — open any file in a browser, or `python3 -m http.server` from the repo root. No build step.
