// mannjal-diagram.jsx — How It Works (2 variants), partner trust bar, investors, footer
const STEPS = [
  { n: "01", who: "Bank", t: "Defines the program", d: "Sets eligibility rules, product parameters, documentation requirements, and compliance thresholds on its own instance.", side: "bank" },
  { n: "02", who: "Originator", t: "Sources & captures", d: "Identifies borrowers in the field, collects documents, and submits applications through its own instance. Phygital journeys supported.", side: "orig" },
  { n: "03", who: "Mannjal", t: "Orchestrates", d: "Runs eligibility checks, validates documentation, flags deviations, and routes to the lender — validating against rules, never seeing borrower data.", side: "mid" },
  { n: "04", who: "Bank", t: "Reviews & sanctions", d: "Reviews on its instance, makes the credit decision, and sanctions. Full audit trail logged at every step.", side: "bank" },
  { n: "05", who: "Mannjal", t: "Disburses & reconciles", d: "Funds flow through escrow. Mannjal automates reconciliation, reporting, and ongoing program monitoring across all partnerships.", side: "mid" },
];

// ---------- Variant A: vertical two columns + thin center spine ----------
function DiagramColumns() {
  const bankItems = [
    { n: "01", t: "Defines the program", d: "Eligibility rules, product parameters & compliance thresholds." },
    { n: "04", t: "Reviews & sanctions", d: "Makes the credit decision. Full audit trail logged." },
  ];
  const origItems = [
    { n: "02", t: "Sources & captures", d: "Finds borrowers, collects docs. Phygital journeys supported." },
    { n: "05", t: "Pipeline visibility", d: "Tracks status in real time as funds flow through escrow." },
  ];
  const nodes = ["Eligibility checks", "Doc validation", "Deviation flags", "Routing", "Reconciliation"];
  return (
    <div className="diagram-cols">
      <div className="side-panel">
        <div className="ph">Left side · own instance</div>
        <h4>Bank / Lender</h4>
        {bankItems.map((it) => (
          <div className="side-item" key={it.n}>
            <div className="si-n">{it.n}</div>
            <div><div className="si-t">{it.t}</div><div className="si-d">{it.d}</div></div>
          </div>
        ))}
      </div>

      <div className="center-layer">
        <div className="center-rail" aria-hidden="true"></div>
        <div className="center-tag">MANNJAL</div>
        <div className="center-nodes">
          {nodes.map((n) => <div className="cnode" key={n}>{n}</div>)}
        </div>
        <div className="center-note"><span className="cn-strong">Never sees borrower data</span><span>Validates against the bank's rules — nothing stored.</span></div>
      </div>

      <div className="side-panel">
        <div className="ph">Right side · own instance</div>
        <h4>Originator</h4>
        {origItems.map((it) => (
          <div className="side-item" key={it.n}>
            <div className="si-n">{it.n}</div>
            <div><div className="si-t">{it.t}</div><div className="si-d">{it.d}</div></div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Variant B: horizontal 5-step flow with bank/originator axis ----------
function DiagramFlow() {
  return (
    <div className="diagram-flow">
      <div className="flow-track">
        {STEPS.map((s) => (
          <div className={`flow-step ${s.side}`} key={s.n}>
            <div className="fs-n">{s.n.replace("0", "")}</div>
            <div className="fs-who">{s.who}</div>
            <div className="fs-t">{s.t}</div>
            <div className="fs-d">{s.d}</div>
          </div>
        ))}
      </div>
      <div className="flow-legend">
        <div className="lg"><span className="sw" style={{ background: "var(--surface-2)", border: "1px solid var(--border-strong)" }}></span>Partner instances — Bank &amp; Originator run their own</div>
        <div className="lg"><span className="sw" style={{ background: "var(--accent)" }}></span>Mannjal — thin orchestration layer, never holds borrower data</div>
      </div>
    </div>
  );
}

function StepsList() {
  return (
    <div className="steps">
      {STEPS.map((s) => (
        <div className="step" key={s.n}>
          <div className="sn">{s.n} · {s.who}</div>
          <div className="st">{s.t}</div>
          <div className="sd">{s.d}</div>
        </div>
      ))}
    </div>
  );
}

function HowItWorks({ variant }) {
  return (
    <section className="hiw section-pad" id="how">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">How it works</span>
          <h2>Two sides, one workflow.<br/>No data in the middle.</h2>
          <p>Mannjal sits between the bank and the originator as a thin orchestration layer. It connects the two — it doesn't absorb. Arrows flow both ways; nothing borrower-identifying is ever stored in the center.</p>
        </Reveal>
        <Reveal delay={120}>
          {variant === "Flow" ? <DiagramFlow /> : <DiagramColumns />}
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Partner trust bar ----------
function PartnerBar() {
  return (
    <section className="section-pad" id="partners">
      <div className="wrap trust">
        <Reveal as="p">Trusted by <b>20+ banks, SFBs, and NBFCs</b> across MSME, agriculture, and affordable housing.</Reveal>
        <Reveal className="logo-row" delay={80}>
          {["partner logo", "partner logo", "partner logo", "partner logo", "partner logo"].map((l, i) => (
            <div className="logo-ph" key={i}>{l}</div>
          ))}
        </Reveal>
        <Reveal as="div" className="trust-note" delay={120}>Named partner logos to be added once clearances are in. <a href="#partners">View the network →</a></Reveal>
      </div>
    </section>
  );
}

// ---------- Investors ----------
function Investors() {
  const names = ["Arali Ventures", "B Capital", "Sparrow Capital", "Gemba Capital"];
  return (
    <section style={{ paddingBottom: "clamp(40px,6vw,80px)" }}>
      <div className="wrap investors">
        <Reveal className="eyebrow" as="div">Backed by</Reveal>
        <Reveal className="inv-row" delay={60}>
          {names.map((n, i) => (
            <React.Fragment key={n}>
              <span className="inv-name">{n}</span>
              {i < names.length - 1 && <span className="inv-sep" aria-hidden="true">·</span>}
            </React.Fragment>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

// ---------- Footer CTA + footer ----------
function FooterCta({ onCta }) {
  return (
    <section className="section-pad" style={{ borderTop: "1px solid var(--border)" }} id="contact">
      <div className="wrap cta-band">
        <Reveal as="h2">Infrastructure that makes <span className="accent">multi-party lending</span> actually work.</Reveal>
        <Reveal as="p" delay={80}>Each partner gets their own secure instance. No data leakage. No credit decisions. Let's talk about your programs.</Reveal>
        <Reveal className="hero-cta" delay={140}>
          <button className="btn btn-primary" onClick={onCta}>Talk to us</button>
          <a className="btn btn-ghost" href="#how">See how it works</a>
        </Reveal>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site">
      <div className="wrap foot-inner">
        <Wordmark size={22} />
        <div className="foot-links">
          <a href="#how">How it works</a>
          <a href="#banks">For banks</a>
          <a href="#originators">For originators</a>
          <a href="#rbi">RBI 2025</a>
          <a href="#contact">Talk to us</a>
        </div>
        <div className="foot-fine">© 2026 Mannjal · Partnership lending infrastructure</div>
      </div>
    </footer>
  );
}

Object.assign(window, { HowItWorks, PartnerBar, Investors, FooterCta, SiteFooter });
