// mannjal-sections.jsx — nav, hero variants, traction, RBI strip, three paths
const { useState, useEffect, useRef } = React;

// ---- Wordmark: lowercase "mannjal" with amber dot on the j ----
function Wordmark({ size = 26, style }) {
  return (
    <span className="wordmark" style={{ fontSize: size, ...style }}>
      mann<span className="j">j</span>al
    </span>
  );
}

// ---- Subtle scroll reveal (restrained) ----
function Reveal({ children, delay = 0, as = "div", className = "", style }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      el.classList.add("in");
      window.removeEventListener("scroll", check, true);
      window.removeEventListener("resize", check);
    };
    const check = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh * 0.92 && r.bottom > 0) reveal();
    };
    // initial check after layout settles
    const raf = requestAnimationFrame(() => requestAnimationFrame(check));
    window.addEventListener("scroll", check, true);
    window.addEventListener("resize", check);
    // safety net: never leave content hidden
    const safety = setTimeout(reveal, 1600);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      window.removeEventListener("scroll", check, true);
      window.removeEventListener("resize", check);
    };
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
      {children}
    </Tag>
  );
}

// ---- Simple flat amber glyphs (allowed simple shapes only) ----
function Glyph({ kind, color = "var(--accent)" }) {
  const c = { width: 24, height: 24, fill: "none", stroke: color, strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (kind === "bank") return (
    <svg {...c} viewBox="0 0 24 24"><path d="M3 9l9-5 9 5"/><path d="M5 9v8M10 9v8M14 9v8M19 9v8"/><path d="M3 20h18"/></svg>
  );
  if (kind === "origin") return (
    <svg {...c} viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.2"/><path d="M5.5 20a6.5 6.5 0 0 1 13 0"/></svg>
  );
  // orchestration: two squares linked by a thin line
  return (
    <svg {...c} viewBox="0 0 24 24"><rect x="3" y="8" width="6" height="8" rx="1.5"/><rect x="15" y="8" width="6" height="8" rx="1.5"/><path d="M9 12h6"/></svg>
  );
}

// ---- NAV ----
function Nav({ onCta }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#top" aria-label="Mannjal home"><Wordmark size={25} /></a>
        <div className="nav-links">
          <a className="nav-link" href="#how">How it works</a>
          <a className="nav-link" href="#banks">For banks</a>
          <a className="nav-link" href="#originators">For originators</a>
          <a className="nav-link" href="#rbi">RBI 2025</a>
        </div>
        <div className="nav-right">
          <button className="btn btn-primary btn-sm" onClick={onCta}>Talk to us</button>
        </div>
      </div>
    </nav>
  );
}

// ---- The two-sides motif (reused in hero aside + split) ----
function SidesMotif() {
  return (
    <div className="motif">
      <div className="motif-side">
        <h5>Bank</h5>
        <div className="row">Sets eligibility rules</div>
        <div className="row">Reviews &amp; sanctions</div>
        <div className="row">Owns the credit decision</div>
      </div>
      <div className="motif-spine" aria-hidden="true">
        <div className="node"><i></i></div>
        <div className="node"><i></i></div>
        <div className="node"><i></i></div>
      </div>
      <div className="motif-side">
        <h5>Originator</h5>
        <div className="row">Sources borrowers</div>
        <div className="row">Captures documents</div>
        <div className="row">Tracks the pipeline</div>
      </div>
    </div>
  );
}

// ---- HERO (3 variants) ----
const HERO_EYEBROW = "Co-lending · BC · LSP programs";
const HERO_SUB = "Mannjal manages co-lending, BC, and LSP programs end to end. Each partner gets their own secure instance — no data leakage, no credit decisions, no borrower data on our side. Just the infrastructure that makes multi-party lending actually work.";

function HeroEditorial({ onCta }) {
  return (
    <section className="hero wrap" id="top">
      <div className="hero-grid">
        <div>
          <Reveal className="hero-eyebrow"><span className="pip"></span><span className="eyebrow">{HERO_EYEBROW}</span></Reveal>
          <Reveal as="h1" delay={60}>Partnership lending <span className="accent">infrastructure</span> for banks that want to scale.</Reveal>
          <Reveal as="p" className="hero-sub" delay={120}>{HERO_SUB}</Reveal>
          <Reveal className="hero-cta" delay={180}>
            <button className="btn btn-primary" onClick={onCta}>Talk to us</button>
            <a className="btn btn-ghost" href="#how">See how it works</a>
          </Reveal>
        </div>
        <Reveal className="hero-aside" delay={140}>
          <SidesMotif />
          <div className="motif-cap"><b>Mannjal</b> orchestrates between the two — it never holds borrower data.</div>
        </Reveal>
      </div>
    </section>
  );
}

function HeroCentered({ onCta }) {
  return (
    <section className="hero wrap hero-centered" id="top">
      <Reveal className="hero-eyebrow"><span className="pip"></span><span className="eyebrow">{HERO_EYEBROW}</span></Reveal>
      <Reveal as="h1" delay={60} style={{ maxWidth: 980, margin: "0 auto" }}>Partnership lending <span className="accent">infrastructure</span> for banks that want to scale.</Reveal>
      <Reveal as="p" className="hero-sub" delay={120}>{HERO_SUB}</Reveal>
      <Reveal className="hero-cta" delay={180}>
        <button className="btn btn-primary" onClick={onCta}>Talk to us</button>
        <a className="btn btn-ghost" href="#how">See how it works</a>
      </Reveal>
      <Reveal className="hero-inline-stats" delay={240}>
        <div><div className="num"><b>70+</b></div><div className="lab">Originators</div></div>
        <div><div className="num"><b>20+</b></div><div className="lab">Lenders</div></div>
        <div><div className="num">₹<b>1,000</b> Cr+</div><div className="lab">Disbursed</div></div>
      </Reveal>
    </section>
  );
}

function HeroSplit({ onCta }) {
  return (
    <section className="hero wrap" id="top">
      <div className="hero-grid">
        <div>
          <Reveal className="hero-eyebrow"><span className="pip"></span><span className="eyebrow">Neutral by design</span></Reveal>
          <Reveal as="h1" delay={60}>One platform.<br/><span className="accent">Two sides.</span><br/>No data in the middle.</Reveal>
          <Reveal as="p" className="hero-sub" delay={120}>Mannjal manages co-lending, BC, and LSP programs end to end. Each partner runs their own secure instance — Mannjal orchestrates the workflow between them without ever touching borrower data or making credit decisions.</Reveal>
          <Reveal className="hero-cta" delay={180}>
            <button className="btn btn-primary" onClick={onCta}>Talk to us</button>
            <a className="btn btn-ghost" href="#how">See how it works</a>
          </Reveal>
        </div>
        <Reveal className="hero-aside" delay={140}>
          <SidesMotif />
          <div className="motif-cap"><b>Mannjal</b> is the thin layer between — it connects, it doesn't absorb.</div>
        </Reveal>
      </div>
    </section>
  );
}

function Hero({ variant, onCta }) {
  if (variant === "Centered") return <HeroCentered onCta={onCta} />;
  if (variant === "Split") return <HeroSplit onCta={onCta} />;
  return <HeroEditorial onCta={onCta} />;
}

// ---- TRACTION STRIP ----
function Traction() {
  const cells = [
    { num: <><b>70+</b></>, lab: "Originators" },
    { num: <><b>20+</b></>, lab: "Lenders" },
    { num: <>₹<b>1,000</b> Cr+</>, lab: "Disbursed" },
  ];
  return (
    <section className="traction">
      <div className="wrap"><div className="traction-grid">
        {cells.map((c, i) => (
          <Reveal key={i} className="traction-cell" delay={i * 80}>
            <div className="num">{c.num}</div>
            <div className="lab">{c.lab}</div>
          </Reveal>
        ))}
      </div></div>
    </section>
  );
}

// ---- RBI 2025 STRIP ----
function RbiStrip() {
  const chips = ["Escrow reconciliation", "Single blended interest rate", "Audit trails", "Partner-level reporting"];
  return (
    <section className="rbi section-pad" id="rbi">
      <div className="wrap">
        <Reveal className="rbi-card">
          <div className="rbi-badge">
            <span className="tag">BUILT FOR RBI</span>
            <span className="yr">2025</span>
          </div>
          <div className="rbi-body">
            <h3>Ready for the new RBI Co-Lending Arrangements Directions.</h3>
            <div className="rbi-chips">
              {chips.map((c) => <span className="chip" key={c}><span className="ck">✓</span>{c}</span>)}
            </div>
            <div className="rbi-live"><span className="live-dot"></span>Already live on the platform.</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ---- THREE PATHS ----
function ThreePaths({ onCta }) {
  const cards = [
    { id: "banks", tag: "For banks", ico: "bank", h: "Run 20 programs where you ran 4.", p: "Mannjal handles eligibility rules, audit trails, escrow reconciliation, and regulatory reporting — so your team focuses on credit, not coordination." },
    { id: "originators", tag: "For originators", ico: "origin", h: "Access bank capital without months of setup.", p: "Get live on a new lending program in 1–2 weeks, with real-time sync, compliant documentation, and clear visibility into your pipeline." },
    { id: "how", tag: "How it works", ico: "orchestrate", h: "One platform, two sides.", p: "Each partner runs their own secure instance. Mannjal orchestrates the workflow between them without ever touching borrower data or making credit decisions. Neutral by design." },
  ];
  return (
    <section className="section-pad" id="paths">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="eyebrow">Three paths, one rail</span>
          <h2>Built for both sides of every partnership.</h2>
        </Reveal>
        <div className="paths-grid">
          {cards.map((c, i) => (
            <Reveal key={c.id} as="div" delay={i * 90}>
              <div className="path-card" id={c.id}>
                <div className="path-ico"><Glyph kind={c.ico} /></div>
                <div className="path-tag">{c.tag}</div>
                <h3>{c.h}</h3>
                <p>{c.p}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Wordmark, Reveal, Glyph, Nav, SidesMotif, Hero, Traction, RbiStrip, ThreePaths });
