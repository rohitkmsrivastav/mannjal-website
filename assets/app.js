/* Mannjal — shared front-end helpers used across all pages.
   Load with <script src="assets/app.js"></script> before any page-specific script. */

/* ---- line-icon set (simple shapes only) ---- */
const ICONS = {
  grid:'<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  branch:'<circle cx="6" cy="6" r="2.4"/><circle cx="6" cy="18" r="2.4"/><circle cx="18" cy="9" r="2.4"/><path d="M6 8.4v7.2M8.4 6H14a2 2 0 0 1 2 2v.6"/>',
  shield:'<path d="M12 3l7 3v5c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6z"/><path d="M9 12l2 2 4-4"/>',
  wallet:'<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18"/><circle cx="16.5" cy="14" r="1.3"/>',
  chart:'<path d="M4 19V5M4 19h16"/><path d="M8 16l3.5-4 3 2.5L20 8"/>',
  doc:'<path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/><path d="M10 13h6M10 16h6"/>',
  users:'<circle cx="9" cy="8" r="3"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0"/><path d="M16 6.5a3 3 0 0 1 0 5.5M21 19a5.5 5.5 0 0 0-4-5.3"/>',
  bank:'<path d="M3 9l9-5 9 5"/><path d="M5 9v8M10 9v8M14 9v8M19 9v8"/><path d="M3 20h18"/>',
  settings:'<circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"/>',
  lock:'<rect x="4" y="10.5" width="16" height="10.5" rx="2.5"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/><circle cx="12" cy="15.5" r="1.2"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/>',
  link:'<rect x="3" y="9" width="7" height="6" rx="2"/><rect x="14" y="9" width="7" height="6" rx="2"/><path d="M10 12h4"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  check:'<path d="M5 12l4 4L19 7"/>'
};
const FILL_ICONS = {
  linkedin:'<path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .78 23.2 0 22.22 0z"/>'
};
function ic(k, s = 16, c = 'currentColor', sw = 1.6) {
  if (FILL_ICONS[k]) return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="${c}" aria-hidden="true">${FILL_ICONS[k]}</svg>`;
  return `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICONS[k] || ICONS.grid}</svg>`;
}

/* Fill any <span data-ic="bank" data-s="22"> with an icon (amber by default). */
function hydrateIcons(root = document) {
  root.querySelectorAll('[data-ic]').forEach(el => {
    el.innerHTML = ic(el.dataset.ic, Number(el.dataset.s) || 22, el.dataset.c || 'var(--accent-ink)');
  });
}

/* Sticky-nav hairline on scroll. Expects <nav class="nav" id="nav">. */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 12);
    if (!nav.classList.contains('nav-open')) {
      if (y > 80 && y > lastY + 4) nav.classList.add('nav-hidden');
      else if (y < lastY - 4 || y <= 80) nav.classList.remove('nav-hidden');
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  // mobile menu toggle
  const toggle = document.getElementById('navToggle');
  if (toggle) {
    const setOpen = (open) => {
      nav.classList.toggle('nav-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    toggle.addEventListener('click', () => setOpen(!nav.classList.contains('nav-open')));
    nav.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
  }
  // dropdown toggles
  nav.querySelectorAll('.nav-dd-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const dd = btn.closest('.nav-dd');
      const opening = !dd.classList.contains('open');
      nav.querySelectorAll('.nav-dd.open').forEach(d => { d.classList.remove('open'); d.querySelector('.nav-dd-btn').setAttribute('aria-expanded','false'); });
      if (opening) { dd.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
    });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.nav-dd')) nav.querySelectorAll('.nav-dd.open').forEach(d => { d.classList.remove('open'); d.querySelector('.nav-dd-btn').setAttribute('aria-expanded','false'); }); });
}

/* Generic single-open accordion. Works for .trust-acc and .faq lists.
   wireAccordion('#trustAcc', '.trust-row', '.trust-q'); */
function wireAccordion(rootSel, rowSel, btnSel, openClass = 'open') {
  const root = document.querySelector(rootSel);
  if (!root) return;
  root.querySelectorAll(btnSel).forEach(btn => btn.addEventListener('click', () => {
    const row = btn.closest(rowSel);
    const isOpen = row.classList.contains(openClass);
    root.querySelectorAll(rowSel).forEach(r => {
      r.classList.remove(openClass);
      const b = r.querySelector(btnSel); if (b) b.setAttribute('aria-expanded', 'false');
    });
    if (!isOpen) { row.classList.add(openClass); btn.setAttribute('aria-expanded', 'true'); }
  }));
}

/* ---- product-UI mock (partner instance dashboard) ---- */
function miniChart(h = 86) {
  const w = 320, pts = [8,14,11,20,17,28,24,33,30,44,40,52,48,60], max = 64, step = w / (pts.length - 1);
  const coords = pts.map((v, i) => [i * step, h - (v / max) * (h - 10) - 4]);
  const line = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c[0].toFixed(1)} ${c[1].toFixed(1)}`).join(' ');
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  const grid = [0.25, 0.5, 0.75].map(g => `<line x1="0" y1="${(h*g).toFixed(1)}" x2="${w}" y2="${(h*g).toFixed(1)}" stroke="rgba(31,35,40,0.05)" stroke-width="1"/>`).join('');
  const last = coords[coords.length - 1];
  return `<svg width="100%" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="display:block">
    <defs><linearGradient id="afg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="var(--accent-ink)" stop-opacity="0.22"/><stop offset="100%" stop-color="var(--accent-ink)" stop-opacity="0"/></linearGradient></defs>
    ${grid}<path d="${area}" fill="url(#afg)"/><path d="${line}" fill="none" stroke="var(--accent-ink)" stroke-width="2"/>
    <circle cx="${last[0].toFixed(1)}" cy="${last[1].toFixed(1)}" r="3" fill="var(--accent-ink)"/></svg>`;
}
const VIEWS = {
  dashboard:{active:'Dashboard',title:'Program overview',
    tiles:[['Active programs','12'],['Disbursed','₹<b>1,000</b>Cr+'],['Partners','90+']],block:'chart',
    rows:[['Application','Amount','Status'],['MSME · Pune cluster','₹4.2 L',['live','Disbursed']],['Agri · Nashik FPO','₹1.8 L',['ok','Sanctioned']],['Housing · Surat','₹9.6 L',['wait','In review']]]},
  coLending:{active:'Programs',title:'Co-lending program',
    tiles:[['Blended rate','<b>11.4</b>%'],['Split','80 / 20'],['Live since','Wk 2']],block:'rules',
    rules:[['Single blended interest rate enforced','auto'],['80:20 risk participation locked','rule'],['Escrow routing configured','live']]},
  bc:{active:'Programs',title:'Business Correspondent',
    tiles:[['Field agents','340'],['Capture SLA','<b>1.2</b>d'],['Phygital','On']],block:'rules',
    rules:[['Agent KYC & geo-tagging verified','auto'],['Document checklist enforced','rule'],['Cash-flow limits monitored','live']]},
  reporting:{active:'Reporting',title:'Partner-level reporting',
    tiles:[['Reports','24'],['RBI returns','Auto'],['Audit trail','Full']],block:'chart',
    rows:[['Report','Period','Status'],['Co-lending MIS','Jun 2026',['live','Filed']],['Portfolio cut','Q1 FY27',['ok','Ready']],['Deviation log','Jun 2026',['live','Synced']]]}
};
const SIDE = [{grp:'Partner instance'},{name:'Dashboard',icon:'grid'},{name:'Programs',icon:'branch'},{name:'Eligibility',icon:'shield'},{name:'Escrow',icon:'wallet'},{name:'Reporting',icon:'chart'},{grp:'Account'},{name:'Partners',icon:'users'},{name:'Settings',icon:'settings'}];
function appFrame(view = 'dashboard') {
  const v = VIEWS[view] || VIEWS.dashboard;
  const side = SIDE.map(it => it.grp ? `<div class="grp">${it.grp}</div>` : `<div class="app-nav ${it.name === v.active ? 'active' : ''}"><span class="ic">${ic(it.icon, 14, it.name === v.active ? 'var(--accent-ink)' : 'var(--text-3)')}</span>${it.name}</div>`).join('');
  const tiles = v.tiles.map(t => `<div class="app-tile"><div class="lab">${t[0]}</div><div class="val">${t[1]}</div></div>`).join('');
  let block = '';
  if (v.block === 'chart') block = `<div class="app-chart"><div class="ch-h"><span class="ct">Reconciliation · last 14 days</span><span class="cl">+ on track</span></div>${miniChart()}</div>`;
  if (v.block === 'rules') block = `<div class="app-chart" style="padding-bottom:12px"><div class="ch-h"><span class="ct">Active rules</span><span class="cl">enforced</span></div><div class="app-rules">${v.rules.map(r => `<div class="app-rule"><span class="chk">${ic('check',11,'var(--accent-ink)')}</span>${r[0]}<span class="meta">${r[1]}</span></div>`).join('')}</div></div>`;
  let table = '';
  if (v.rows) table = `<div class="app-table">${v.rows.map((r, i) => `<div class="app-row"><span class="nm">${r[0]}</span><span class="amt">${r[1]}</span>${i === 0 ? `<span>${r[2]}</span>` : `<span class="pill ${r[2][0]}">${r[2][1]}</span>`}</div>`).join('')}</div>`;
  return `<div class="app"><div class="app-top"><div class="left"><div class="dot-row"><i></i><i></i><i></i></div><span class="inst"><span class="wm">mannjal</span><span class="badge">secure instance</span></span></div><div class="right">${ic('search',14,'var(--text-3)')}${ic('plus',14,'var(--text-3)')}<div class="avatar"></div></div></div><div class="app-body"><div class="app-side">${side}</div><div class="app-main"><div class="app-h"><div class="t">${v.title}</div><div class="mini-btn">+ New</div></div><div class="app-tiles">${tiles}</div>${block}${table}</div></div></div>`;
}
