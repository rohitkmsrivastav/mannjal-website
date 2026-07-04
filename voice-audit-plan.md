# Brand Voice Audit: OneTrust Guidelines Applied to Mannjal Website

## Source Document
`onetrust-brand-guidelines-external.pdf` (51 pages). Voice and tone content on pages 3-17.

## OneTrust Voice Framework (pages 9-17)

### Three Core Tone of Voice Traits (page 12, section 1.10)

1. **We cut through complexity** — "We tackle serious topics with simple language. We are clear, never cryptic. We keep things simple, short and smart."
2. **We lead with earned authority** — "We've built market leadership on proven solutions. We set the benchmark for our sector. We communicate with confidence, not conventions."
3. **We light up the answers** — "We focus on opportunities and outcomes, not obstacles. We write with a bright tone and light touch. We're the approachable expert on their side."

### Personality Traits for Website (pages 13, 17)

Website content leads with **Expert + Optimistic** (page 17, section 1.15):
- **Optimistic**: "We keep things bright in tone, and focus on lighting up the answers and opportunities, not dwelling on the complexity and challenges." (page 13)
- **Expert**: "Though our world is technical, our language is not. We prove our expertise and reflect the intelligence of our audience by keeping things simple, short and smart." (page 13)

### Mannjal-Specific Compliance Guardrails (non-negotiable, from CLAUDE.md)

- Never "certified" (only "audited by" / "aligned with")
- No badges
- Platform-scoped claims
- CERT-In stated plainly
- "Infrastructure" preferred over "platform/solution"
- Credit decision always stays with the lender

### AI Copy Anti-Patterns (from memory: feedback_ai_copy_patterns.md)

- No em dashes as connectors in body copy
- No negative parallelism ("Not X, but Y")
- No tricolons / magic adverbs / false profundity
- No grandiose stakes

---

## Audit Findings: 6 Categories of Violations

### Category 1: Negative contrast patterns (violates "Light up the answers")

Phrases like "not a project", "not a fire drill", "not a quarter of rebuilding" dwell on what's wrong instead of leading with outcomes. The OneTrust guideline is explicit: "focus on opportunities and outcomes, not obstacles."

**Found in**: index.html, for-banks.html, co-lending.html, direct-assignment.html, securitisation.html, business-correspondent.html, platform-security.html, direct-assignment.html

### Category 2: Jargon (violates "Cut through complexity")

Terms like "People arbitrage", "Tech arbitrage", "Operating leverage", "operating layer" are insider language that a CBO or CRO won't connect with. The guideline says: "simple, short and smart."

**Found in**: for-banks.html, index.html, co-lending.html, faq.html, careers.html

### Category 3: Defensive/institutional tone (violates "Lead with earned authority")

Phrases like "We don't ask you to trust our security" and "Verified, not self-declared" lead with what the company isn't doing. Confident authority leads with what you provide.

**Found in**: platform-security.html

### Category 4: CTA monotony ("No slides" repeated everywhere)

Every CTA section across all pages used the identical phrase "A 30-minute walkthrough. No slides." This violates "cut through complexity" (repetition becomes noise) and "light up the answers" (defines the walkthrough by what it isn't).

**Found in**: for-banks.html, co-lending.html, business-correspondent.html, direct-assignment.html, securitisation.html, digital-lending.html, how-it-works.html, our-story.html, faq.html, contact.html, book-a-walkthrough.html

### Category 5: Compliance guardrail violation

"Independently certified" chip on for-banks.html violates the guardrail: only "audited" is accurate.

**Found in**: for-banks.html

### Category 6: Identical eyebrows across product pages

All 5 product pages used "What Mannjal handles" as the section eyebrow. Varying them improves scanability and reduces templated feel.

**Found in**: co-lending.html, business-correspondent.html, direct-assignment.html, securitisation.html, digital-lending.html

---

## Implementation Plan

### What NOT to change

- `privacy.html` and `terms.html` (legal documents, different voice rules)
- FAQ answers in `faq.html` (already clear, concise, expert)
- Founder bios in `our-story.html` (factual, not inflated)
- All neutrality framing ("the lender makes the credit decision")
- Footer compliance notes, consent lines, legal-entity blocks
- CTA button text rules ("Schedule a walkthrough" / "Join the network")
- Nav and footer HTML structure
- Problem-first openings ("Most lenders hit a ceiling...") — user explicitly excluded (Phase 1A)

### Phase 1: Priority pages (index.html, for-banks.html, contact.html)

#### 1B. Remove negative contrast patterns

| File | Line | Before | After |
|---|---|---|---|
| `index.html` | 213 | "a config change, not a project" | "a config change" |
| `index.html` | 217 | "a click, not a fire drill" | "available in a single click" |
| `index.html` | 219 | "a button, not a quarter of rebuilding" | "ready at the push of a button" |
| `index.html` | 242 | "Infrastructure that makes multi-party lending work." | "See how your partnership programs run on Mannjal." |
| `for-banks.html` | 72 | "No slides · 30 minutes · run on one of your own programs" | "30 minutes with a founder. Bring a program you're running today." |
| `for-banks.html` | 98 | tag: "Operating leverage" | "Do more with the same team" |
| `for-banks.html` | 99 | "Scale without increasing cost linearly" | "Run more programs with the same team" |
| `for-banks.html` | 100 | "People arbitrage...Tech arbitrage..." | "One team runs multiple partnerships. One integration reaches multiple originators." |
| `for-banks.html` | 121 | "The credit committee stops bouncing them back." | "Files reach the credit committee ready to approve." |
| `for-banks.html` | 122 | "not the three to four months it usually takes" | "against the usual three to four months" |
| `for-banks.html` | 134 | "Auditable, isolated, enterprise-ready." | "Built for the way your risk team works." |
| `for-banks.html` | 141 | "Independently certified" | "Independently audited" (compliance fix) |
| `for-banks.html` | 154 | "A 30-minute walkthrough. No slides." | "30 minutes with a founder, run on one of your programs." |

#### 1C. Warm institutional tone

| File | Line | Before | After |
|---|---|---|---|
| `index.html` | 309 | "Runs as a dedicated instance in your cloud, with data-localization and DPDP controls" | "Runs in your own cloud. Your data stays in your environment, with data-localization and DPDP controls in place" |

#### 1D. Meta descriptions

| File | Before | After |
|---|---|---|
| `index.html` (line 11) | em dash separator | Period separator |
| `contact.html` (lines 11, 18) | "No slides." | "on the live product." |
| `contact.html` (line 67) | "No slides, a founder walks you through it." | "A founder walks you through it on the live product." |

#### 1E. Replace "operating layer" with simpler language

| File | Before | After |
|---|---|---|
| `index.html:209` | "One operating layer for every lending partnership." | "Co-lending, BC, DA, securitisation, digital lending. All in one place." |
| `index.html:323` | "all on one operating layer" | "all managed through Mannjal" |

### Phase 2: Product pages (5 pages)

#### 2A. Negative contrast patterns

| File | Before | After |
|---|---|---|
| `co-lending.html:68` | "a config change, not a project" | "a config change" |
| `co-lending.html:68` | "same operating layer" | "same infrastructure" |
| `co-lending.html:93` | "No re-engineering." | Dropped |
| `co-lending.html:99` | "The credit committee stops bouncing files back." | "Files reach the credit committee ready to review." |
| `co-lending.html:153` | "A 30-minute walkthrough. No slides." | "We'll walk through your co-lending program live." |
| `direct-assignment.html:67` | "a click, not a fire drill" | "available in a single click" |
| `direct-assignment.html:87` | "No retroactive data cleansing, no last-minute scrambles" | "The data is complete from origination." |
| `direct-assignment.html:93` | "not from spreadsheets assembled under deadline pressure" | "ready when your treasury team needs them" |
| `direct-assignment.html:106` | "not on the scramble" | "strength of the portfolio" |
| `direct-assignment.html:107` | "Most DA transactions stall because..." | Outcome-first rewrite |
| `direct-assignment.html:119` | "No slides." | "We'll show you how a pool tape comes together." |
| `securitisation.html:67` | "a button, not a quarter of rebuilding" | "ready at the push of a button" |
| `securitisation.html:87` | "No retroactive data scrubbing" | "The data is structured from origination." |
| `securitisation.html:112` | "not a data project" | "The data is always ready." |
| `securitisation.html:113` | "Most originators delay..." | Outcome-first rewrite |
| `securitisation.html:125` | "No slides." | "See how PTC-ready data flows from origination." |
| `business-correspondent.html:68` | "on one operating layer" | "on a single shared infrastructure" |
| `business-correspondent.html:99` | "not half-done" | Dropped (kept "Files arrive complete.") |
| `business-correspondent.html:132` | "No slides." | "See how your BC network looks on Mannjal." |
| `digital-lending.html:86` | "built into the workflow" | "built in from the start" |
| `digital-lending.html:138` | "No slides." | "See your digital lending program with DLG controls built in." |

#### 2B. Meta descriptions

| File | Before | After |
|---|---|---|
| `co-lending.html` (11, 18) | "not a project" | "a config change" |
| `direct-assignment.html` (11, 18) | "not a fire drill" | "available in a single click" |
| `securitisation.html` (11, 18) | "not a quarter of rebuilding" | "ready at the push of a button" |

### Phase 3: Supporting pages (8 pages)

| File | Before | After |
|---|---|---|
| `platform-security.html:67` | "We don't ask you to trust our security." | "Your risk team gets the evidence to verify every claim." |
| `platform-security.html:109` | "One export, not a search" | "A full audit in one export" |
| `platform-security.html:141` | "Verified, not self-declared." | "Independently verified." |
| `how-it-works.html:210` | "No slides." | "Follow one loan through the system." |
| `our-story.html:67` | "saw exactly where it broke" | "built the infrastructure they wished existed" |
| `our-story.html:200` | "No slides." | "Bring a program you're running today." |
| `book-a-walkthrough.html:67` | "No slides, no pitch deck." | "We walk through your program on the live product." |
| `book-a-walkthrough.html:89` | "not a slide deck" | Dropped (kept "runs on the production product") |
| `book-a-walkthrough.html` (11, 18) | "no slides" | "on the live product" |
| `careers.html:76` | "One operating layer" | "One infrastructure" |
| `careers.html:107` | "not a pitch deck" | "of the live product" |
| `faq.html:117` | "No slides." | "Bring a program you're running today." |
| `faq.html:158` | "All run on one operating layer." | "All managed through one system." |
| `faq.html:161` | "a shared operating layer across" | "shared infrastructure across" |

### Phase 4: Vary "What Mannjal handles" eyebrows

| File | Before | After |
|---|---|---|
| `co-lending.html` | "What Mannjal handles" | Keep (first in nav) |
| `business-correspondent.html` | "What Mannjal handles" | "How it works" |
| `direct-assignment.html` | "What Mannjal handles" | "From origination to transaction" |
| `securitisation.html` | "What Mannjal handles" | "From loan to PTC" |
| `digital-lending.html` | "What Mannjal handles" | "Compliance controls" |

---

## Verification Checklist

1. Grep sweep for negative patterns: `grep -rn "not a \|No slides\|No re-engin\|No retroactive\|arbitrage\|operating layer\|enterprise-ready\|Independently certified"` — **0 results**
2. Compliance check: `grep -rn "certified"` — **0 in rendered content** (only in HTML comment)
3. Neutrality framing: `grep -c "credit decision"` — **present on all 17 pages**
4. Meta descriptions: no negative patterns remaining
5. Console errors: **0**
6. Preview verified: homepage, for-banks.html, securitisation.html confirmed visually

## Exclusions (by user instruction)

- Phase 1A (problem-first openings like "Most lenders hit a ceiling...") — user said "ignore 1A"
- Em dashes in `<title>` tags ("Mannjal — Page Name") — standard brand separator, not body copy
- Legal pages (privacy.html, terms.html) — different voice rules apply
