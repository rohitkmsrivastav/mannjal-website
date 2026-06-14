// db-app.jsx — composition + tweaks
const { useEffect: useEff } = React;

const HEAD_FONTS = {
  "Roboto": "'Roboto', system-ui, sans-serif",
  "Spectral": "'Spectral', Georgia, serif",
  "Newsreader": "'Newsreader', Georgia, serif",
  "Playfair Display": "'Playfair Display', Georgia, serif",
};
const BG_TONES = {
  "Brand": { bg: "#111111", band: "#0B0B0B", surface: "#1A1A1A", s2: "#212121" },
  "Deep":  { bg: "#0C0C0C", band: "#070707", surface: "#151515", s2: "#1C1C1C" },
  "Warm":  { bg: "#13110C", band: "#0C0A07", surface: "#1C1914", s2: "#231F18" },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#F5A623",
  "headFont": "Roboto",
  "bgTone": "Brand"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useEff(() => {
    const r = document.documentElement.style;
    r.setProperty("--accent", t.accent);
    r.setProperty("--accent-soft", `color-mix(in srgb, ${t.accent} 14%, transparent)`);
    r.setProperty("--accent-line", `color-mix(in srgb, ${t.accent} 32%, transparent)`);
    r.setProperty("--font-head", HEAD_FONTS[t.headFont] || HEAD_FONTS.Spectral);
    const tone = BG_TONES[t.bgTone] || BG_TONES.Brand;
    r.setProperty("--bg", tone.bg);
    r.setProperty("--band", tone.band);
    r.setProperty("--surface", tone.surface);
    r.setProperty("--surface-2", tone.s2);
  }, [t.accent, t.headFont, t.bgTone]);

  const onCta = () => {
    const el = document.getElementById("contact");
    if (el) window.scrollTo({ top: el.offsetTop - 30, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <Nav onCta={onCta} />
      <Hero onCta={onCta} />
      <LogoBand />
      <RbiBanner />
      <PlatformShowcase />
      <Audience onCta={onCta} />
      <HowItWorks />
      <TrustSection />
      <Recognition />
      <Close onCta={onCta} />
      <MegaFooter />

      <TweaksPanel>
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={["#F5A623", "#FFC24B", "#F0851F", "#E0B341"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSelect label="Heading font" value={t.headFont}
          options={["Roboto", "Spectral", "Newsreader", "Playfair Display"]}
          onChange={(v) => setTweak("headFont", v)} />
        <TweakRadio label="Background" value={t.bgTone}
          options={["Brand", "Deep", "Warm"]}
          onChange={(v) => setTweak("bgTone", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
