// db-sections.jsx — nav, hero, logo band, RBI banner, platform showcase, audience
const { useState: useS, useEffect: useE } = React;

function Wordmark({ size = 26, style }) {
  return <img src={(window.__resources && window.__resources.logo) || "mannjal-logo.png"} alt="Mannjal" className="wordmark-img" style={{ height: size, width: "auto", display: "block", ...style }} />;
}

function Nav({ onCta }) {
  const [sc, setSc] = useS(false);
  useE(() => {
    const f = () => setSc(window.scrollY > 12);
    window.addEventListener("scroll", f, { passive: true }); f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <nav className={`nav ${sc ? "scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <div className="nav-left">
          <a href="#top" aria-label="Mannjal home"><Wordmark size={26} /></a>
          <div className="nav-links">
            <a className="nav-link" href="platform-security.html">Platform & Security</a>
            <a className="nav-link" href="how-it-works.html">How It Works</a>
            <a className="nav-link" href="for-banks.html">For Banks</a>
            <a className="nav-link" href="for-originators.html">For Originators</a>
            <a className="nav-link" href="our-story.html">Our Story</a>
          </div>
        </div>
        <div className="nav-right">
          <a className="nav-link" href="contact.html">Sign in</a>
          <button className="btn btn-primary btn-sm" onClick={onCta}>Talk to us</button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ onCta }) {
  return (
    <section className="hero wrap-wide" id="top">
      <div className="hero-grid">
        <div>
          <div className="hero-eyebrow"><span className="pip"></span><span className="eyebrow">Co-lending · BC · LSP</span></div>
          <h1>Partnership lending <span className="accent">infrastructure</span> for banks that want to scale.</h1>
          <p className="hero-sub">Mannjal manages co-lending, BC, and LSP programs end to end. Each partner gets their own secure instance. No data leakage, no credit decisions, no borrower data on our side.</p>
          <div className="hero-cta">
            <button className="btn btn-primary" onClick={onCta}>Talk to us</button>
            <a className="btn btn-dark" href="#how">See how it works</a>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-dots" aria-hidden="true"></div>
          <div className="hero-frame-wrap"><AppFrame view="dashboard" /></div>
        </div>
      </div>
    </section>
  );
}

function LogoBand() {
  return (
    <section className="logoband">
      <div className="wrap logoband-inner">
        <div className="lab">Trusted by banks, SFBs &amp; NBFCs</div>
        <div className="logos">
          {["bank logo", "SFB logo", "NBFC logo", "bank logo", "NBFC logo", "SFB logo"].map((l, i) => <div className="logo-ph" key={i}>{l}</div>)}
        </div>
      </div>
    </section>
  );
}

function RbiBanner() {
  const chips = ["Escrow reconciliation", "Single blended interest rate", "Audit trails", "Partner-level reporting"];
  return (
    <section className="rbiband sec" id="rbi">
      <div className="wrap">
        <div className="rbi-grid">
          <div className="rbi-banner">
            <div className="rbi-seal"><Ic k="shield" s={34} c="#14110a" sw={1.7} /></div>
            <div className="rbi-bt">
              <span className="lab">Compliance</span>
              <span className="big">RBI-ready</span>
              <span className="ref">Co-Lending Directions · 2025</span>
            </div>
          </div>
          <div className="rbi-body">
            <h3>Built for the new RBI Co-Lending Arrangements Directions.</h3>
            <div className="rbi-chips">{chips.map((c) => <span className="chip" key={c}><span className="ck">✓</span>{c}</span>)}</div>
            <div className="rbi-live"><span className="ld"></span>Already live on the platform.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

const PLATFORM_TABS = [
  { id: "coLending", label: "Co-lending", ico: "branch", h: "Run blended co-lending programs", p: "Set the risk split, enforce a single blended interest rate, and let Mannjal route every application against the rules you defined, with escrow reconciliation built in." },
  { id: "bc", label: "Business Correspondent", ico: "users", h: "Manage BC networks in the field", p: "Onboard agents, enforce KYC and document checklists, and support phygital journeys, with full visibility into capture and submission across every cluster." },
  { id: "reporting", label: "LSP & reporting", ico: "doc", h: "LSP programs, fully reported", p: "Run Lending Service Provider programs with compliant documentation, audit trails at every step, and partner-level reporting that maps straight to RBI returns." },
  { id: "escrow", label: "Escrow", ico: "wallet", h: "Escrow that reconciles itself", p: "Funds flow through escrow while Mannjal automates reconciliation, posting, and ongoing program monitoring across all active partnerships. No spreadsheets." },
];

function PlatformShowcase() {
  const [tab, setTab] = useS("coLending");
  const t = PLATFORM_TABS.find((x) => x.id === tab);
  return (
    <section className="surface sec" id="platform">
      <div className="wrap">
        <div className="sec-head center">
          <span className="eyebrow">The Mannjal platform</span>
          <h2>One platform for every lending partnership.</h2>
          <p>Co-lending, BC, and LSP: each program runs on its own secure instance, orchestrated through one neutral layer.</p>
        </div>
        <div className="tabs">
          {PLATFORM_TABS.map((x) => (
            <button key={x.id} className={`tab ${tab === x.id ? "active" : ""}`} onClick={() => setTab(x.id)}>{x.label}</button>
          ))}
        </div>
        <div className="showcase">
          <div className="showcase-l">
            <div className="sc-ico"><Ic k={t.ico} s={26} c="var(--accent)" /></div>
            <h3>{t.h}</h3>
            <p>{t.p}</p>
            <div className="sc-cta"><a className="link-arrow" href="#contact">Talk to us about {t.label.toLowerCase()} <Ic k="arrow" s={16} /></a></div>
          </div>
          <div className="showcase-r">
            <AppFrame view={tab} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Audience({ onCta }) {
  return (
    <section className="sec" id="banks">
      <div className="wrap">
        <div className="sec-head" style={{ marginBottom: "clamp(32px,4vw,52px)" }}>
          <span className="eyebrow">Two sides, served</span>
          <h2>Built for both sides of every partnership.</h2>
        </div>
        <div className="aud-grid">
          <div className="aud-card">
            <span className="aud-idx" aria-hidden="true">01</span>
            <div className="aud-head">
              <div className="aud-ico"><Ic k="bank" s={22} c="var(--accent)" /></div>
              <div className="tag">For banks</div>
            </div>
            <h3>Run 20 programs where you ran 4.</h3>
            <p>Mannjal handles eligibility rules, audit trails, escrow reconciliation, and regulatory reporting, so your team focuses on credit, not coordination.</p>
            <div className="aud-cta"><a className="link-arrow" href="#contact">For banks <Ic k="arrow" s={16} /></a></div>
          </div>
          <div className="aud-card" id="originators">
            <span className="aud-idx" aria-hidden="true">02</span>
            <div className="aud-head">
              <div className="aud-ico"><Ic k="users" s={22} c="var(--accent)" /></div>
              <div className="tag">For originators</div>
            </div>
            <h3>Access bank capital without months of setup.</h3>
            <p>Get live on a new lending program in 1–2 weeks, with real-time sync, compliant documentation, and clear visibility into your pipeline.</p>
            <div className="aud-cta"><a className="link-arrow" href="#contact">For originators <Ic k="arrow" s={16} /></a></div>
          </div>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Wordmark, Nav, Hero, LogoBand, RbiBanner, PlatformShowcase, Audience });
