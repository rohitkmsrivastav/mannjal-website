// mannjal-app.jsx — composition + tweaks
const { useEffect: useEffectA } = React;

const HEAD_FONTS = {
  "Spectral": "'Spectral', Georgia, serif",
  "Newsreader": "'Newsreader', Georgia, serif",
  "Playfair Display": "'Playfair Display', Georgia, serif",
};

const BG_TONES = {
  "Brand": { bg: "#111111", surface: "#1A1A1A", surface2: "#202020" },
  "Deep":  { bg: "#0B0B0B", surface: "#151515", surface2: "#1C1C1C" },
  "Warm":  { bg: "#13110C", surface: "#1C1914", surface2: "#231F18" },
};

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "heroVariant": "Editorial",
  "diagramVariant": "Columns",
  "accent": "#F5A623",
  "headFont": "Spectral",
  "bgTone": "Brand"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply theme tokens to :root
  useEffectA(() => {
    const r = document.documentElement.style;
    r.setProperty("--accent", t.accent);
    r.setProperty("--accent-soft", `color-mix(in srgb, ${t.accent} 14%, transparent)`);
    r.setProperty("--accent-line", `color-mix(in srgb, ${t.accent} 32%, transparent)`);
    r.setProperty("--font-head", HEAD_FONTS[t.headFont] || HEAD_FONTS.Nunito);
    const tone = BG_TONES[t.bgTone] || BG_TONES.Brand;
    r.setProperty("--bg", tone.bg);
    r.setProperty("--surface", tone.surface);
    r.setProperty("--surface-2", tone.surface2);
  }, [t.accent, t.headFont, t.bgTone]);

  const onCta = () => {
    const el = document.getElementById("contact");
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
  };

  return (
    <React.Fragment>
      <Nav onCta={onCta} />
      <Hero variant={t.heroVariant} onCta={onCta} />
      <Traction />
      <ThreePaths onCta={onCta} />
      <HowItWorks variant={t.diagramVariant} />
      <RbiStrip />
      <PartnerBar />
      <Investors />
      <FooterCta onCta={onCta} />
      <SiteFooter />

      <TweaksPanel>
        <TweakSection label="Sections to compare" />
        <TweakRadio label="Hero layout" value={t.heroVariant}
          options={["Editorial", "Centered", "Split"]}
          onChange={(v) => setTweak("heroVariant", v)} />
        <TweakRadio label="How-it-works" value={t.diagramVariant}
          options={["Columns", "Flow"]}
          onChange={(v) => setTweak("diagramVariant", v)} />

        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={["#F5A623", "#FFC24B", "#F0851F", "#E0B341"]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakSelect label="Heading font" value={t.headFont}
          options={["Spectral", "Newsreader", "Playfair Display"]}
          onChange={(v) => setTweak("headFont", v)} />
        <TweakRadio label="Background" value={t.bgTone}
          options={["Brand", "Deep", "Warm"]}
          onChange={(v) => setTweak("bgTone", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
