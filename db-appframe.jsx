// db-appframe.jsx — product-UI mock (partner instance dashboard) + small icon set
const { useState: useStateAF } = React;

// ---- tiny line-icon set (simple shapes only) ----
function Ic({ k, s = 16, c = "currentColor", sw = 1.6 }) {
  const p = { width: s, height: s, viewBox: "0 0 24 24", fill: "none", stroke: c, strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    branch: <><circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="9" r="2.4"/><path d="M6 8.4v7.2M8.4 6H14a2 2 0 0 1 2 2v.6"/></>,
    shield: <><path d="M12 3l7 3v5c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6z"/><path d="M9 12l2 2 4-4"/></>,
    wallet: <><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14" r="1.3"/></>,
    chart: <><path d="M4 19V5M4 19h16"/><path d="M8 16l3.5-4 3 2.5L20 8"/></>,
    doc: <><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 13h6M10 16h6"/></>,
    users: <><circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 6.5a3 3 0 0 1 0 5.5M21 19a5.5 5.5 0 0 0-4-5.3"/></>,
    bank: <><path d="M3 9l9-5 9 5"/><path d="M5 9v8M10 9v8M14 9v8M19 9v8"/><path d="M3 20h18"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/></>,
    lock: <><rect x="4" y="10.5" width="16" height="10.5" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/><circle cx="12" cy="15.5" r="1.2"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></>,
    link: <><rect x="3" y="9" width="7" height="6" rx="2"/><rect x="14" y="9" width="7" height="6" rx="2"/><path d="M10 12h4"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    check: <><path d="M5 12l4 4L19 7"/></>,
  };
  return <svg {...p}>{paths[k] || paths.grid}</svg>;
}

// ---- mini reconciliation chart (area + line, simple polyline) ----
function MiniChart({ h = 86 }) {
  const w = 320;
  const pts = [8, 14, 11, 20, 17, 28, 24, 33, 30, 44, 40, 52, 48, 60];
  const max = 64;
  const step = w / (pts.length - 1);
  const coords = pts.map((v, i) => [i * step, h - (v / max) * (h - 10) - 4]);
  const line = coords.map((c, i) => `${i === 0 ? "M" : "L"}${c[0].toFixed(1)} ${c[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ display: "block" }}>
      <defs>
        <linearGradient id="afg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.28" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => <line key={g} x1="0" y1={h * g} x2={w} y2={h * g} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />)}
      <path d={area} fill="url(#afg)" />
      <path d={line} fill="none" stroke="var(--accent)" strokeWidth="2" />
      {coords.filter((_, i) => i === coords.length - 1).map((c, i) => <circle key={i} cx={c[0]} cy={c[1]} r="3" fill="var(--accent)" />)}
    </svg>
  );
}

const VIEWS = {
  dashboard: {
    active: "Dashboard", icon: "grid", title: "Program overview",
    tiles: [["Active programs", <>12</>], ["Disbursed", <>₹<b>1,000</b>Cr+</>], ["Partners", <>90+</>]],
    block: "chart",
    rows: [["Application", "Amount", "Status"], ["MSME · Pune cluster", "₹4.2 L", ["live", "Disbursed"]], ["Agri · Nashik FPO", "₹1.8 L", ["ok", "Sanctioned"]], ["Housing · Surat", "₹9.6 L", ["wait", "In review"]]],
  },
  coLending: {
    active: "Programs", icon: "branch", title: "Co-lending program",
    tiles: [["Blended rate", <><b>11.4</b>%</>], ["Split", <>80 / 20</>], ["Live since", <>Wk 2</>]],
    block: "rules",
    rules: [["Single blended interest rate enforced", "auto"], ["80:20 risk participation locked", "rule"], ["Escrow routing configured", "live"]],
  },
  bc: {
    active: "Programs", icon: "users", title: "Business Correspondent",
    tiles: [["Field agents", <>340</>], ["Capture SLA", <><b>1.2</b>d</>], ["Phygital", <>On</>],],
    block: "rules",
    rules: [["Agent KYC & geo-tagging verified", "auto"], ["Document checklist enforced", "rule"], ["Cash-flow limits monitored", "live"]],
  },
  escrow: {
    active: "Escrow", icon: "wallet", title: "Escrow reconciliation",
    tiles: [["Reconciled", <><b>100</b>%</>], ["Open items", <>0</>], ["Cycle", <>T+0</>]],
    block: "chart",
    rows: [["Tranche", "Amount", "Status"], ["Disbursement · 13 Jun", "₹2.4 Cr", ["live", "Settled"]], ["Collection · 12 Jun", "₹1.1 Cr", ["live", "Matched"]], ["Fees · 12 Jun", "₹3.2 L", ["ok", "Posted"]]],
  },
  reporting: {
    active: "Reporting", icon: "chart", title: "Partner-level reporting",
    tiles: [["Reports", <>24</>], ["RBI returns", <>Auto</>], ["Audit trail", <>Full</>]],
    block: "chart",
    rows: [["Report", "Period", "Status"], ["Co-lending MIS", "Jun 2026", ["live", "Filed"]], ["Portfolio cut", "Q1 FY27", ["ok", "Ready"]], ["Deviation log", "Jun 2026", ["live", "Synced"]]],
  },
};

const SIDE = [
  { grp: "Partner instance" },
  { name: "Dashboard", icon: "grid" },
  { name: "Programs", icon: "branch" },
  { name: "Eligibility", icon: "shield" },
  { name: "Escrow", icon: "wallet" },
  { name: "Reporting", icon: "chart" },
  { grp: "Account" },
  { name: "Partners", icon: "users" },
  { name: "Settings", icon: "settings" },
];

function AppFrame({ view = "dashboard" }) {
  const v = VIEWS[view] || VIEWS.dashboard;
  return (
    <div className="app">
      <div className="app-top">
        <div className="left">
          <div className="dot-row"><i></i><i></i><i></i></div>
          <span className="inst"><img src={(window.__resources && window.__resources.logo) || "mannjal-logo.png"} alt="Mannjal" style={{ height: 13, width: "auto", display: "block" }} /><span className="badge">secure instance</span></span>
        </div>
        <div className="right">
          <Ic k="search" s={14} c="var(--text-3)" />
          <Ic k="plus" s={14} c="var(--text-3)" />
          <div className="avatar"></div>
        </div>
      </div>
      <div className="app-body">
        <div className="app-side">
          {SIDE.map((it, i) => it.grp
            ? <div className="grp" key={i}>{it.grp}</div>
            : <div className={`app-nav ${it.name === v.active ? "active" : ""}`} key={i}>
                <span className="ic"><Ic k={it.icon} s={14} c={it.name === v.active ? "var(--accent)" : "var(--text-3)"} /></span>{it.name}
              </div>
          )}
        </div>
        <div className="app-main">
          <div className="app-h">
            <div className="t">{v.title}</div>
            <div className="mini-btn">+ New</div>
          </div>
          <div className="app-tiles">
            {v.tiles.map((t, i) => <div className="app-tile" key={i}><div className="lab">{t[0]}</div><div className="val">{t[1]}</div></div>)}
          </div>
          {v.block === "chart" && (
            <div className="app-chart">
              <div className="ch-h"><span className="ct">Reconciliation · last 14 days</span><span className="cl">+ on track</span></div>
              <MiniChart />
            </div>
          )}
          {v.block === "rules" && (
            <div className="app-chart" style={{ paddingBottom: 12 }}>
              <div className="ch-h"><span className="ct">Active rules</span><span className="cl">enforced</span></div>
              <div className="app-rules">
                {v.rules.map((r, i) => <div className="app-rule" key={i}><span className="chk"><Ic k="check" s={11} c="var(--accent)" /></span>{r[0]}<span className="meta">{r[1]}</span></div>)}
              </div>
            </div>
          )}
          {v.rows && (
            <div className="app-table">
              {v.rows.map((r, i) => (
                <div className="app-row" key={i}>
                  <span className="nm">{r[0]}</span>
                  <span className="amt">{r[1]}</span>
                  {i === 0 ? <span>{r[2]}</span> : <span className={`pill ${r[2][0]}`}>{r[2][1]}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Ic, AppFrame, MiniChart });
