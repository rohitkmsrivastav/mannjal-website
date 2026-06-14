// db-sections2.jsx — diagram, capabilities, recognition, close (cta+faq), footer
const { useState: useS2 } = React;

// ---- Two-sides connected flow map (Mannjal signature) ----
const FM_BRAIN = {
  chips: ["Eligibility checks", "Doc validation", "Deviation flags", "Routing"],
  note: <>Validates against the bank's rules. <b>Never sees or stores borrower data.</b></>,
};
const FM_CARDS = {
  c1: { n: "01", t: "Defines the program", d: "Sets eligibility rules, product parameters & compliance thresholds." },
  c2: { n: "02", t: "Sources & captures", d: "Finds borrowers, collects documents. Phygital journeys supported." },
  c4: { n: "04", t: "Reviews & sanctions", d: "Makes the credit decision. Full audit trail logged at every step." },
  c5: { n: "05", t: "Disbursed & reconciled", d: "Funds flow through escrow; Mannjal reconciles across partnerships." },
};

function FlowCard({ d, style }) {
  return (
    <div className="fm-card" style={style}>
      <span className="n">{d.n}</span>
      <h4>{d.t}</h4>
      <p>{d.d}</p>
    </div>
  );
}

function HowItWorks() {
  const dot = (cx, cy) => <circle cx={cx} cy={cy} r="3.5" fill="var(--accent)" />;
  return (
    <section className="hiw band sec" id="how">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">How it works</span>
          <h2>Two sides, one workflow.<br/>No data in the middle.</h2>
          <p>Each partner runs its own contained instance. Mannjal is the thin layer between them — inputs flow in from both sides, decisions and funds flow back out, and nothing borrower-identifying ever rests in the center.</p>
        </div>

        <div className="flowmap">
          {/* ---------- desktop canvas ---------- */}
          <div className="fm-canvas">
            {/* environments */}
            <div className="fm-env" style={{ left: "2%", top: "7%", width: "30%", height: "86%" }}><span className="lab">Bank · own instance</span></div>
            <div className="fm-env" style={{ left: "68%", top: "7%", width: "30%", height: "86%" }}><span className="lab">Originator · own instance</span></div>

            {/* connectors */}
            <svg className="fm-svg" viewBox="0 0 1120 600" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <marker id="fmar" viewBox="0 0 10 10" refX="7.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
                  <path d="M0,0 L10,5 L0,10 z" fill="var(--accent)" />
                </marker>
              </defs>
              <g fill="none" stroke="var(--accent)" strokeOpacity="0.5" strokeWidth="2" markerEnd="url(#fmar)">
                <path d="M330.4,177 H383 V250 H436.8" />
                <path d="M789.6,177 H737 V250 H683.2" />
                <path d="M436.8,350 H383 V423 H330.4" />
                <path d="M683.2,350 H737 V423 H789.6" />
              </g>
              <g>
                <path className="fm-pulse" style={{ animationDelay: "0s" }} d="M330.4,177 H383 V250 H436.8" />
                <path className="fm-pulse" style={{ animationDelay: "0.25s" }} d="M789.6,177 H737 V250 H683.2" />
                <path className="fm-pulse" style={{ animationDelay: "1.2s" }} d="M436.8,350 H383 V423 H330.4" />
                <path className="fm-pulse" style={{ animationDelay: "1.45s" }} d="M683.2,350 H737 V423 H789.6" />
              </g>
              {dot(330.4, 177)}{dot(789.6, 177)}{dot(330.4, 423)}{dot(789.6, 423)}
            </svg>

            {/* connector labels */}
            <span className="fm-clab" style={{ left: "34.2%", top: "35.5%" }}>Rules <span className="ar">→</span></span>
            <span className="fm-clab" style={{ left: "65.8%", top: "35.5%" }}><span className="ar">←</span> Application</span>
            <span className="fm-clab" style={{ left: "34.2%", top: "64.3%" }}><span className="ar">←</span> Decision</span>
            <span className="fm-clab" style={{ left: "65.8%", top: "64.3%" }}>Reconciled <span className="ar">→</span></span>

            {/* cards */}
            <FlowCard d={FM_CARDS.c1} style={{ left: "4.5%", top: "17%", width: "25%", height: "25%" }} />
            <FlowCard d={FM_CARDS.c4} style={{ left: "4.5%", top: "58%", width: "25%", height: "25%" }} />
            <FlowCard d={FM_CARDS.c2} style={{ left: "70.5%", top: "17%", width: "25%", height: "25%" }} />
            <FlowCard d={FM_CARDS.c5} style={{ left: "70.5%", top: "58%", width: "25%", height: "25%" }} />

            {/* central brain */}
            <div className="fm-brain" style={{ left: "39%", top: "50%", width: "22%", transform: "translateY(-50%)" }}>
              <span className="n">03</span>
              <div className="bh"><span className="tag">MANNJAL</span><span className="sub">Orchestration layer</span></div>
              <div className="fm-chips">{FM_BRAIN.chips.map((c) => <span className="fm-chip" key={c}>{c}</span>)}</div>
              <div className="note">{FM_BRAIN.note}</div>
            </div>
          </div>

          {/* ---------- mobile stacked ---------- */}
          <div className="fm-stack">
            <div className="fm-srow"><div className="fm-srail"><span className="node">01</span></div><div className="fm-scard"><span className="who">Bank · own instance</span><h4>{FM_CARDS.c1.t}</h4><p>{FM_CARDS.c1.d}</p></div></div>
            <div className="fm-srow"><div className="fm-srail"><span className="node">02</span></div><div className="fm-scard"><span className="who">Originator · own instance</span><h4>{FM_CARDS.c2.t}</h4><p>{FM_CARDS.c2.d}</p></div></div>
            <div className="fm-srow is-brain"><div className="fm-srail"><span className="node">03</span></div><div className="fm-scard"><span className="who">Mannjal · orchestration layer</span><h4>Orchestrates &amp; routes</h4><div className="fm-chips">{FM_BRAIN.chips.map((c) => <span className="fm-chip" key={c}>{c}</span>)}</div><p>{FM_BRAIN.note}</p></div></div>
            <div className="fm-srow"><div className="fm-srail"><span className="node">04</span></div><div className="fm-scard"><span className="who">Bank · own instance</span><h4>{FM_CARDS.c4.t}</h4><p>{FM_CARDS.c4.d}</p></div></div>
            <div className="fm-srow"><div className="fm-srail"><span className="node">05</span></div><div className="fm-scard"><span className="who">Originator · own instance</span><h4>{FM_CARDS.c5.t}</h4><p>{FM_CARDS.c5.d}</p></div></div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- TRUST — product pillars (from the real product) ----
function TrustSection() {
  const pillars = [
    { ico: "users", h: "Collaborative application management", pts: [
      "Program-level workflow and task management to measure TATs & effectiveness",
      "Simple messaging interface for query resolution, tagged to applications and tasks",
      "Large file handling (200 MB+) with unified navigation across documents and data",
    ]},
    { ico: "doc", h: "Simplified data processing", pts: [
      "Data ingestion from feet-on-street mobile apps, multi-format files or APIs",
      "Data validation via third-party data providers and human / AI agents",
      "Data conversion into lender-specific formats for decisioning & reporting",
    ]},
    { ico: "chart", h: "Transparent decision support", pts: [
      "Auditable business rules engine acting as a co-pilot for credit and operations teams",
      "Real-time deviation flags and workflow actions based on policy and process rules",
      "Configurable MIS and dashboards with scheduled reporting and escalation triggers",
    ]},
    { ico: "lock", h: "Robust access management", pts: [
      "Role-based access at program, stage, section and data-field levels",
      "Ring-fenced access for human and AI agents, aligned with compliant workflows",
      "Audit-ready by default — every action tracked and time-stamped",
    ]},
    { ico: "grid", h: "Scalable architecture", pts: [
      "Decentralised network protocols that support multi-entity collaboration on the go",
      "Low-code configuration to adapt products and workflows quickly",
      "AI-ready, LLM/SLM-agnostic architecture that plugs into your chosen AI stack",
    ]},
    { ico: "shield", h: "Compliance & security", pts: [
      "Network-segregated deployments with dedicated private environments per client",
      "Data-localisation compliant, with clear data-residency controls",
      "Encryption at rest and in transit, with strict key management",
    ]},
  ];
  const [open, setOpen] = useS2(0);
  return (
    <section className="sec" id="product">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Why Mannjal</span>
          <h2 className="trust-heading">Partnership lending runs on <span className="accent">trust</span>.</h2>
          <p>We engineer it into every layer — across entities, systems and processes — so partners run on confidence they can prove, not just promise.</p>
        </div>
        <div className="trust-acc">
          {pillars.map((p, i) => (
            <div className={`trust-row ${open === i ? "open" : ""}`} key={p.h}>
              <button className="trust-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <span className="tt">{p.h}</span>
                <span className="ico"><Ic k={p.ico} s={22} c="var(--accent)" /></span>
                <span className="pm" aria-hidden="true"></span>
              </button>
              <div className="trust-a">
                <div className="inner">
                  <div className="trust-pts">
                    {p.pts.map((pt, j) => <div className="trust-pt" key={j}><span className="ck"><Ic k="check" s={14} c="var(--accent)" /></span>{pt}</div>)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Recognition band (stats + backing) ----
function Recognition() {
  const stats = [
    { v: "70+", d: <><b>Originators</b> live across MSME, agri & affordable housing</> },
    { v: "20+", d: <><b>Lenders</b> — banks, SFBs and NBFCs on the platform</> },
    { v: "₹1,000 Cr+", d: <><b>Disbursed</b> through partnership programs to date</> },
  ];
  return (
    <section className="band sec" id="traction">
      <div className="wrap">
        <div className="sec-head" style={{ marginBottom: "clamp(32px,4vw,52px)" }}>
          <span className="eyebrow">Traction &amp; backing</span>
          <h2>Built on real volume, backed by real investors.</h2>
        </div>
        <div className="recog-stats">
          {stats.map((s) => <div className="recog-stat" key={s.v}><div className="sv">{s.v}</div><div className="sd">{s.d}</div></div>)}
        </div>
        <div className="backed-island">
          <span className="bk-lab">Backed by</span>
          <div className="bk-names">
            {["Arali Ventures", "B Capital", "Sparrow Capital", "Gemba Capital"].map((n, i, a) => (
              <React.Fragment key={n}>
                <span className="bk-name">{n}</span>
                {i < a.length - 1 && <span className="bk-sep" aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Close: final CTA + FAQ ----
const FAQS = [
  { q: "What is Mannjal?", a: "Mannjal is partnership lending infrastructure. It manages co-lending, BC, and LSP programs end to end, giving each partner their own secure instance and orchestrating the workflow between them." },
  { q: "How does borrower data stay separate?", a: "Mannjal never holds borrower data and never makes credit decisions. Each partner runs their own instance; Mannjal validates applications against the rules a bank set — it connects the two sides without absorbing anything in the middle." },
  { q: "How fast can a program go live?", a: "Originators can be live on a new lending program in 1–2 weeks, with real-time sync, compliant documentation, and pipeline visibility from day one." },
  { q: "Is it ready for the RBI 2025 directions?", a: "Yes. Escrow reconciliation, a single blended interest rate, audit trails, and partner-level reporting for the new RBI Co-Lending Arrangements Directions are already live on the platform." },
  { q: "What do co-lending, BC, and LSP mean here?", a: "They are the three partnership structures Mannjal supports: co-lending (shared risk between a bank and an NBFC), Business Correspondent networks, and Lending Service Provider arrangements — all on one platform." },
];

function Close({ onCta }) {
  const [open, setOpen] = useS2(0);
  return (
    <section className="sec" id="contact">
      <div className="wrap">
        <div className="close-grid">
          <div className="cta-card">
            <h2>Infrastructure that makes <span className="accent">multi-party lending</span> work.</h2>
            <p>Each partner gets their own secure instance. No data leakage. No credit decisions. Let's talk about your programs.</p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={onCta}>Talk to us</button>
              <a className="btn btn-ghost" href="#how">See how it works</a>
            </div>
          </div>
          <div className="faq">
            <div className="faq-h"><h3>Get to know Mannjal</h3></div>
            {FAQS.map((f, i) => (
              <div className={`faq-item ${open === i ? "open" : ""}`} key={i}>
                <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                  {f.q}<span className="pm" aria-hidden="true"></span>
                </button>
                <div className="faq-a"><div className="inner">{f.a}</div></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- Mega footer ----
function MegaFooter() {
  const cols = [
    { h: "Platform", links: ["Co-lending", "Business Correspondent", "LSP programs", "Escrow", "Reporting"] },
    { h: "Use cases", links: ["For banks", "For originators", "MSME", "Agriculture", "Affordable housing"] },
    { h: "Company", links: ["About", "RBI 2025", "Security", "Careers", "Contact"] },
    { h: "Resources", links: ["How it works", "Compliance", "Documentation", "FAQ"] },
  ];
  return (
    <footer className="site">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Wordmark size={24} />
            <p className="tagline">Partnership lending infrastructure for banks that want to scale.</p>
            <div className="socials">
              <a className="soc" href="#contact" aria-label="LinkedIn"><Ic k="users" s={15} /></a>
              <a className="soc" href="#contact" aria-label="Email"><Ic k="doc" s={15} /></a>
              <a className="soc" href="#contact" aria-label="Link"><Ic k="link" s={15} /></a>
            </div>
          </div>
          {cols.map((c) => (
            <div className="foot-col" key={c.h}>
              <h5>{c.h}</h5>
              {c.links.map((l) => <a href="#contact" key={l}>{l}</a>)}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <div className="fine">© 2026 Mannjal · Partnership lending infrastructure</div>
          <div className="legal">
            <a href="#contact">Privacy</a>
            <a href="#contact">Terms</a>
            <a href="#contact">Security</a>
            <a href="#contact">RBI 2025</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { HowItWorks, TrustSection, Recognition, Close, MegaFooter });
