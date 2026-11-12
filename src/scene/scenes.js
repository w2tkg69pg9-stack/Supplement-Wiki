// Mechanismus-Szenen je Supplement. Jede Szene: Kamera, Legende, Aufbau, Schritte.
// Koordinaten: Membran liegt bei y = 0, oben ist „draußen“ (Blut/Darm), unten das Zellinnere.

const C = {
  adenosin: 0xffb02e,
  koffein: 0x35e0c8,
  rot: 0xff4d5e,
  gruen: 0x6dff9c,
  nitrat: 0xff4f8b,
  nitrit: 0xb07cff,
  no: 0x9dffb0,
  o2: 0x8fd8ff,
  atp: 0xffd84a,
  hco3: 0x5aa9ff,
  laktat: 0xffe27a,
  co2: 0xc9d3e6,
  ba: 0x35e0c8,
  his: 0xff9f4a,
  carn: 0xffc145,
  cr: 0xb9c7ff,
  pcr: 0xffe14d,
  glu: 0xffe14d,
  fru: 0xff7ab8,
  na: 0xe9f1ff,
  itc: 0xb6f24a,
  nrf2: 0x4dff9a,
  enzym: 0x8fd8ff,
  ke: 0xc49bff,
  bhb: 0x9d7bff,
  acoa: 0xff9f4a,
  poly: 0xe0457b,
  nfkb: 0xff9f4a,
  cyto: 0xff6b3d,
};

const CAM = { pos: [0, 4.5, 33], target: [0, -2.2, 0] };

export const scenes = {
  // ───────────────────────────────────────────────────────── KOFFEIN
  koffein: {
    cam: CAM,
    legende: [
      { farbe: C.adenosin, label: 'Adenosin („müde“-Signal)' },
      { farbe: C.koffein, label: 'Koffein' },
      { farbe: C.rot, label: 'Bremssignal' },
      { farbe: C.gruen, label: 'Nervenimpulse / Dopamin & Co.' },
    ],
    build(s) {
      const xs = [-7, 0, 7];
      s.membrane({ holes: xs.map((x) => ({ x, r: 1.7 })) });
      xs.forEach((x, i) => {
        s.receptor({ x, color: 0xd8a04a }, `rez${i}`);
        s.sphere({ pos: [x, 2.15, 0], r: 0.5, color: C.adenosin, glow: 1.6 }, `adeno${i}`);
        s.sphere({ pos: [x, 2.15, 0], r: 0.55, color: C.koffein, glow: 1.8 }, `kof${i}`);
      });
      // Signal-Leitung im Zellinneren
      const tube = s.blob({ pos: [0, -7.5, 0], r: 1, color: 0x2b6f5c, glow: 0.25, squash: [12.5, 0.55, 1.1] }, 'leitung');
      tube.material.transparent = true;
      tube.material.opacity = 0.45;
      s.flow('adeno', { paths: xs.map((x) => [[x - 4, 9, 2, 2.4], [x - 1, 4.6, 0, 1.1], [x, 2.5, 0, 0.1]]), color: C.adenosin, count: 36, speed: 0.1 });
      s.flow('abprall', { paths: xs.map((x) => [[x - 4, 9, 2, 2.2], [x - 1, 4.6, 0, 0.7], [x + 0.6, 3.3, 0, 0.25], [x + 3, 5.4, 1, 1], [x + 6, 9.5, 2, 2.2]]), color: C.adenosin, count: 36, speed: 0.085 });
      s.flow('kof', { paths: xs.map((x) => [[-17, 5.5, 1, 1.6], [x - 3, 4.8, 0, 1], [x, 2.5, 0, 0.1]]), color: C.koffein, count: 42, speed: 0.09, size: 0.28 });
      s.flow('bremse', { paths: xs.map((x) => [[x, -2.2, 0, 0.15], [x, -4.8, 0, 0.5], [x, -7, 0, 0.3]]), color: C.rot, count: 30, speed: 0.16, size: 0.2, spiky: true });
      s.flow('impuls', { paths: [[[-13, -7.5, 0, 0.3], [-4, -7.5, 0, 0.3], [4, -7.5, 0, 0.3], [13, -7.5, 0, 0.3]]], color: C.gruen, count: 34, speed: 0.22, size: 0.24, glow: 2 });
      s.label('Adenosin-Rezeptor (A1 / A2A)', [0, -2.9, 0]);
      s.label('außen: Raum zwischen den Nervenzellen', [8, 8.4, 0], { art: 'zone' });
      s.label('innen: Nervenzelle', [-10, -3.6, 0], { art: 'zone' });
      s.label('Signal-Leitung', [9, -9.2, 0]);
      s.label('Rezeptor besetzt – Adenosin prallt ab', [0, 6.6, 0], { art: 'hinweis', steps: [2, 3] });
    },
    steps: [
      {
        titel: 'Adenosin drückt die Bremse',
        text: 'Je länger du wach bist und je härter du arbeitest, desto mehr Adenosin sammelt sich an. Es dockt am Adenosin-Rezeptor an und sagt der Nervenzelle: runterfahren. Folge: weniger Dopamin, du fühlst dich platt.',
        flows: { adeno: 1, bremse: 1, impuls: 0.22 },
        set: { kof0: { scale: 0 }, kof1: { scale: 0 }, kof2: { scale: 0 } },
      },
      {
        titel: 'Koffein flutet an',
        text: 'Etwa 60 Minuten nach der Tablette ist der Koffeinspiegel im Blut oben. Koffein ist klein und fettlöslich genug, um locker ins Gehirn zu kommen.',
        flows: { adeno: 1, kof: 1, bremse: 1, impuls: 0.22 },
        set: { kof0: { scale: 0 }, kof1: { scale: 0 }, kof2: { scale: 0 } },
      },
      {
        titel: 'Platz besetzt',
        text: 'Koffein passt in dieselbe Bindetasche wie Adenosin – löst aber kein Signal aus (kompetitiver Antagonist). Das Adenosin ist noch da, findet nur keinen freien Rezeptor mehr.',
        flows: { abprall: 1, kof: 0.35, impuls: 0.6 },
        set: {
          adeno0: { scale: 0 }, adeno1: { scale: 0 }, adeno2: { scale: 0 },
          rez0: { color: 0x2f9e91 }, rez1: { color: 0x2f9e91 }, rez2: { color: 0x2f9e91 },
        },
      },
      {
        titel: 'Bremse gelöst',
        text: 'Ohne Bremssignal feuern die Nervenzellen munterer, mehr Dopamin und Noradrenalin sind unterwegs. Für dich heißt das: Gleiche Watt fühlen sich leichter an, du hältst das Tempo länger.',
        flows: { abprall: 1, kof: 0.25, impuls: 1 },
        set: {
          adeno0: { scale: 0 }, adeno1: { scale: 0 }, adeno2: { scale: 0 },
          rez0: { color: 0x2f9e91 }, rez1: { color: 0x2f9e91 }, rez2: { color: 0x2f9e91 },
          leitung: { glow: 0.9 },
        },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── NITRAT
  nitrat: {
    cam: { pos: [0, 4.5, 34], target: [0, -1.5, 0] },
    legende: [
      { farbe: C.nitrat, label: 'Nitrat (NO₃⁻)' },
      { farbe: C.nitrit, label: 'Nitrit (NO₂⁻)' },
      { farbe: C.no, label: 'Stickstoffmonoxid (NO)' },
      { farbe: C.o2, label: 'Sauerstoff (O₂)' },
      { farbe: C.atp, label: 'ATP (Energie)' },
    ],
    build(s) {
      s.bacteria({ pos: [-10.5, 3.2, 0] }, 'bakt');
      s.membrane({ x0: -4.5, x1: 13 });
      s.mito({ pos: [4.5, -6, 0], s: 1.25 }, 'mito');
      s.vessel({ pos: [10.5, 5.5, 0], r: 1.7 }, 'gefaess');
      s.flow('no3', { paths: [[[-17, 9, 0, 1.5], [-13, 6.5, 0, 1], [-10.5, 3.6, 0, 1.4]]], color: C.nitrat, count: 28, speed: 0.11 });
      s.flow('no2', { paths: [[[-10.5, 3.4, 0, 1.2], [-6, 5.5, 0, 0.9], [-1, 3.5, 0, 0.8], [0.5, 0, 0, 0.5], [2, -3, 0, 0.7]]], color: C.nitrit, count: 30, speed: 0.085 });
      s.flow('no', { paths: [[[2, -3, 0, 0.6], [3.5, -4.6, 0, 0.5], [4.5, -5.8, 0, 0.9]], [[2, -3, 0, 0.6], [6.5, 0.5, 0, 0.6], [10.5, 5.2, 0, 1]]], color: C.no, count: 32, speed: 0.16, size: 0.2, glow: 2.2 });
      s.flow('o2', { paths: [[[10.5, 5.3, 0, 0.9], [8.5, 1, 0, 0.7], [6.5, -3.5, 0, 0.6], [5, -5.6, 0, 0.6]]], color: C.o2, count: 30, speed: 0.12, size: 0.22 });
      s.flow('atp', { paths: [[[3.5, -6.4, 0, 0.5], [0, -9, 0, 1], [-4, -10.5, 0, 1.6]]], color: C.atp, count: 26, speed: 0.13, glow: 2 });
      s.label('Zunge mit Bakterien', [-10.5, 0.6, 0]);
      s.label('Muskelzelle', [9.5, -1.8, 0], { art: 'zone' });
      s.label('Mitochondrium', [4.5, -9.2, 0]);
      s.label('Blutgefäß', [10.5, 8.6, 0]);
      s.label('gleich viel ATP, weniger O₂ nötig', [-2.5, -7.4, 0], { art: 'hinweis', steps: [3] });
    },
    steps: [
      {
        titel: 'Nitrat landet auf der Zunge',
        text: 'Das Nitrat aus dem Shot geht erst ins Blut – und dann ziehen es deine Speicheldrüsen raus und pumpen es konzentriert zurück in den Mund. Klingt nach Umweg, ist aber der Trick.',
        flows: { no3: 1, o2: 1, atp: 1 },
      },
      {
        titel: 'Bakterien machen Nitrit draus',
        text: 'Bakterien auf dem Zungenrücken knabbern ein Sauerstoffatom ab: aus Nitrat (NO₃⁻) wird Nitrit (NO₂⁻). Du schluckst es, es geht wieder ins Blut. Deshalb: kein antibakterielles Mundwasser.',
        flows: { no3: 0.7, no2: 1, o2: 1, atp: 1 },
        set: { bakt: { glow: 1 } },
      },
      {
        titel: 'Im Muskel wird NO draus',
        text: 'Im arbeitenden Muskel ist es sauer und sauerstoffarm. Genau dort wird Nitrit zu Stickstoffmonoxid (NO) reduziert – das Signalgas entsteht also da, wo es gebraucht wird.',
        flows: { no2: 1, no: 1, o2: 1, atp: 1 },
      },
      {
        titel: 'NO macht dich sparsamer',
        text: 'NO weitet die Gefäße (mehr Blut zum Muskel) und lässt die Mitochondrien mit weniger Sauerstoff die gleiche Menge ATP liefern. Unterm Strich: gleiche Watt, etwas weniger O₂-Verbrauch.',
        flows: { no2: 0.6, no: 1, o2: 0.6, atp: 1 },
        set: { gefaess: { scale: 1.4, glow: 0.9 }, mito: { glow: 0.9 } },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── BICARBONAT
  bicarbonat: {
    cam: CAM,
    legende: [
      { farbe: C.rot, label: 'H⁺ (Säure)' },
      { farbe: C.laktat, label: 'Laktat' },
      { farbe: C.hco3, label: 'Bicarbonat (HCO₃⁻)' },
      { farbe: C.co2, label: 'CO₂ (wird abgeatmet)' },
    ],
    build(s) {
      const xs = [-5, 5];
      s.membrane({ holes: xs.map((x) => ({ x, r: 1.3 })) });
      xs.forEach((x, i) => s.channel({ x, color: 0x7fb6ff }, `mct${i}`));
      s.fibril({ pos: [0, -8.6, 0], len: 14 }, 'faser');
      s.cloud('hInnen', { center: [0, -4.6, 0], box: [20, 4.6, 6], color: C.rot, count: 80, size: 0.19, spiky: true });
      s.cloud('hco3', { center: [0, 5.6, 0], box: [24, 5, 6], color: C.hco3, count: 70, size: 0.26 });
      const raus = xs.map((x) => [[x * 0.3, -5, 0, 1.4], [x, -2.2, 0, 0.5], [x, 0, 0, 0.12], [x, 2.4, 0, 0.5], [x * 1.3, 5, 0, 1.2]]);
      s.flow('hRaus', { paths: raus, color: C.rot, count: 34, speed: 0.13, size: 0.19, spiky: true });
      s.flow('lakRaus', { paths: raus, color: C.laktat, count: 34, speed: 0.13, size: 0.27 });
      s.flow('co2', { paths: xs.map((x) => [[x * 1.3, 5, 0, 1.2], [x * 1.6, 8, 0, 1.5], [x * 2.2, 12, 0, 2]]), color: C.co2, count: 30, speed: 0.12, size: 0.22, glow: 0.9 });
      s.label('MCT-Transporter', [5, 2.6, 0]);
      s.label('Blut', [10.5, 8, 0], { art: 'zone' });
      s.label('Muskelzelle', [-10.5, -2.4, 0], { art: 'zone' });
      s.label('Muskelfaser', [0, -10.8, 0]);
      s.label('H⁺ + HCO₃⁻ → CO₂ + H₂O', [0, 7.6, 0], { art: 'hinweis', steps: [3] });
    },
    steps: [
      {
        titel: 'Vollgas macht sauer',
        text: 'Wenn du über der Schwelle fährst, fallen in der Muskelzelle massenhaft H⁺-Ionen an. Der pH sinkt – das stört die Kontraktion und die Energiebereitstellung. Es brennt.',
        flows: { hInnen: 1, hco3: 0.3, hRaus: 0.25, lakRaus: 0.25, co2: 0.15 },
        set: { faser: { glow: 0.15 } },
      },
      {
        titel: 'Bicarbonat lädt das Blut auf',
        text: 'Nach der Einnahme steigt der Bicarbonat-Spiegel im Blut. In die Muskelzelle selbst kommt das kaum – muss es auch nicht. Es macht das Blut zum besseren Säure-Abfluss.',
        flows: { hInnen: 1, hco3: 1, hRaus: 0.25, lakRaus: 0.25, co2: 0.15 },
        set: { faser: { glow: 0.15 } },
      },
      {
        titel: 'Sog nach draußen',
        text: 'Mehr Puffer draußen heißt größeres Gefälle: H⁺ und Laktat werden gemeinsam über MCT-Transporter schneller aus der Zelle geschleust. Drinnen bleibt der pH länger im grünen Bereich.',
        flows: { hInnen: 0.55, hco3: 1, hRaus: 1, lakRaus: 1, co2: 0.4 },
        set: { mct0: { glow: 0.8 }, mct1: { glow: 0.8 } },
      },
      {
        titel: 'Abgefangen und abgeatmet',
        text: 'Im Blut schnappt sich Bicarbonat das H⁺. Daraus wird Kohlensäure, die zu Wasser und CO₂ zerfällt – und das CO₂ atmest du einfach ab. Ergebnis: Du hältst harte Belastungen ein Stück länger durch.',
        flows: { hInnen: 0.3, hco3: 0.75, hRaus: 1, lakRaus: 1, co2: 1 },
        set: { faser: { glow: 0.5 }, mct0: { glow: 0.8 }, mct1: { glow: 0.8 } },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── BETA-ALANIN
  'beta-alanin': {
    cam: CAM,
    legende: [
      { farbe: C.ba, label: 'Beta-Alanin' },
      { farbe: C.his, label: 'Histidin' },
      { farbe: C.carn, label: 'Carnosin (Puffer)' },
      { farbe: C.rot, label: 'H⁺ (Säure)' },
    ],
    build(s) {
      s.membrane({ holes: [{ x: -7, r: 1.3 }] });
      s.channel({ x: -7, color: 0x56d8c8 }, 'taut');
      s.blob({ pos: [-1.5, -5, 0], r: 1.5, color: 0x8e7cc3, glow: 0.4 }, 'enzym');
      s.fibril({ pos: [7, -9.4, 0], len: 10 }, 'faser');
      s.flow('ba', { paths: [[[-16, 8, 0, 2], [-9.5, 3.5, 0, 1], [-7, 0, 0, 0.12], [-5, -3, 0, 0.5], [-2.2, -4.6, 0, 0.25]]], color: C.ba, count: 34, speed: 0.1 });
      s.flow('his', { paths: [[[-10, -10.5, 0, 1.5], [-4.5, -7.6, 0, 0.6], [-1.9, -5.6, 0, 0.25]]], color: C.his, count: 22, speed: 0.11 });
      s.flow('carn', { paths: [[[-0.4, -5, 0, 0.25], [3, -5, 0, 0.7], [7, -5.4, 0, 2]]], color: C.carn, count: 20, speed: 0.12, size: 0.36, glow: 1.8 });
      s.cloud('speicher', { center: [7.2, -5.2, 0], box: [9.5, 4, 5], color: C.carn, count: 70, size: 0.3, glow: 1 });
      s.flow('saeure', { paths: [[[7, -9, 2, 2.5], [7, -7.5, 0, 2.6], [7.2, -5.2, 0, 2.2]]], color: C.rot, count: 44, speed: 0.2, size: 0.19, spiky: true });
      s.label('TauT-Transporter', [-7, 2.6, 0]);
      s.label('Carnosin-Synthase', [-1.5, -2.6, 0]);
      s.label('Blut', [9, 7.6, 0], { art: 'zone' });
      s.label('Muskelzelle', [10.5, -1.8, 0], { art: 'zone' });
      s.label('Carnosin-Speicher', [7.2, -2.4, 0], { steps: [1, 2, 3] });
      s.label('H⁺ wird am Carnosin abgefangen', [7.2, -11.8, 0], { art: 'hinweis', steps: [3] });
    },
    steps: [
      {
        titel: 'Rein in die Muskelzelle',
        text: 'Beta-Alanin kommt übers Blut und wird vom Transporter TauT in die Muskelzelle geschleust. Allein kann es da drin noch nichts.',
        flows: { ba: 1, his: 0.5, speicher: 0.12 },
      },
      {
        titel: 'Zusammenbau zu Carnosin',
        text: 'Das Enzym Carnosin-Synthase klebt Beta-Alanin und Histidin zusammen. Histidin hast du genug – Beta-Alanin ist der Engpass. Deshalb bringt mehr Beta-Alanin mehr Carnosin.',
        flows: { ba: 1, his: 1, carn: 1, speicher: 0.3 },
        set: { enzym: { glow: 1 } },
      },
      {
        titel: 'Wochenlang auffüllen',
        text: 'Das geht langsam: Nach 4 Wochen mit 4–6 g pro Tag ist der Carnosin-Speicher um 40–60 % größer. Eine Einzeldosis vor dem Rennen bringt deshalb nichts – außer Kribbeln.',
        flows: { ba: 0.7, his: 0.7, carn: 1, speicher: 1 },
        set: { enzym: { glow: 1 } },
      },
      {
        titel: 'Puffer im Einsatz',
        text: 'Im harten Intervall schießt H⁺ in die Faser. Carnosin fängt es direkt vor Ort ab (über seinen Imidazol-Ring). Der pH fällt langsamer – du hältst die 1–4-Minuten-Hölle etwas länger aus.',
        flows: { speicher: 1, saeure: 1, carn: 0.3 },
        set: { faser: { glow: 0.5 } },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── KREATIN
  kreatin: {
    cam: CAM,
    legende: [
      { farbe: C.cr, label: 'Kreatin' },
      { farbe: C.pcr, label: 'Phosphokreatin (PCr)' },
      { farbe: 0xff9f4a, label: 'ATP an der Faser' },
    ],
    build(s) {
      s.membrane({ holes: [{ x: -9, r: 1.3 }] });
      s.channel({ x: -9, color: 0xa9b8ff }, 'creat');
      s.mito({ pos: [-5, -6.2, 0], s: 1.15 }, 'mito');
      s.fibril({ pos: [7, -6.2, 0], len: 10 }, 'faser');
      s.flow('rein', { paths: [[[-17, 8, 0, 2], [-11.5, 3.5, 0, 1], [-9, 0, 0, 0.12], [-8, -3, 0, 0.5], [-6, -4.8, 0, 0.5]]], color: C.cr, count: 32, speed: 0.1 });
      s.flow('pcr', { paths: [[[-2.4, -5.6, 0, 0.35], [0.5, -4.4, 0, 0.6], [3.5, -5.4, 0, 0.5]]], color: C.pcr, count: 26, speed: 0.2, size: 0.3, glow: 2.2 });
      s.flow('zurueck', { paths: [[[3.5, -7, 0, 0.5], [0.5, -8.4, 0, 0.6], [-2.6, -7, 0, 0.35]]], color: C.cr, count: 22, speed: 0.2 });
      s.cloud('atp', { center: [7, -6.2, 0], box: [10, 3.4, 3.4], color: 0xff9f4a, count: 60, size: 0.2, glow: 1.6 });
      s.label('CreaT-Transporter', [-9, 2.6, 0]);
      s.label('Mitochondrium', [-5, -9.2, 0]);
      s.label('Myofibrille (hier wird gezogen)', [7, -9, 0]);
      s.label('Blut', [9, 7.6, 0], { art: 'zone' });
      s.label('Muskelzelle', [10.5, -1.8, 0], { art: 'zone' });
      s.label('PCr + ADP → ATP + Kreatin', [5, -3, 0], { art: 'hinweis', steps: [3] });
    },
    steps: [
      {
        titel: 'Kreatin wird eingelagert',
        text: 'Kreatin aus dem Blut kommt über den Transporter CreaT in die Muskelzelle. Mit 3–5 g täglich sind die Speicher nach etwa 4 Wochen voll.',
        flows: { rein: 1, atp: 0.25 },
      },
      {
        titel: 'Aufladen am Mitochondrium',
        text: 'Direkt am Mitochondrium hängt die Kreatinkinase ein Phosphat ans Kreatin: fertig ist Phosphokreatin (PCr) – ein geladener Akku.',
        flows: { rein: 0.5, pcr: 1, atp: 0.25 },
        set: { mito: { glow: 1 } },
      },
      {
        titel: 'Shuttle zur Faser',
        text: 'PCr wandert zur Myofibrille, gibt dort sein Phosphat ab und kommt als Kreatin zurück. So wird Energie vom Kraftwerk zur Baustelle gefahren.',
        flows: { pcr: 1, zurueck: 1, atp: 0.5 },
        set: { mito: { glow: 1 } },
      },
      {
        titel: 'Antritt!',
        text: 'Bei der Attacke wird ATP schneller verbraucht, als Mitochondrien nachliefern. PCr springt in Millisekunden ein und macht aus ADP wieder ATP. Mehr PCr im Tank heißt: härter antreten und öfter nachlegen.',
        flows: { pcr: 1, zurueck: 1, atp: 1 },
        set: { faser: { glow: 0.5 }, mito: { glow: 1 } },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── KOHLENHYDRATE
  kohlenhydrate: {
    cam: { pos: [0, 3, 37], target: [0, -0.8, 0] },
    legende: [
      { farbe: C.glu, label: 'Glukose' },
      { farbe: C.na, label: 'Natrium (fährt mit)' },
      { farbe: C.fru, label: 'Fruktose' },
    ],
    build(s) {
      const sg = [-8, -3];
      const g5 = [3, 8];
      const g2 = [-5.5, 0, 5.5];
      s.membrane({ y: 3.5, holes: [...sg, ...g5].map((x) => ({ x, r: 1.3 })) });
      s.membrane({ y: -5, holes: g2.map((x) => ({ x, r: 1.3 })), color: 0x4a5fa8 });
      sg.forEach((x, i) => s.channel({ x, y: 3.5, color: 0xffd23f }, `sglt${i}`));
      g5.forEach((x, i) => s.channel({ x, y: 3.5, color: 0xff7ab8 }, `glut5${i}`));
      g2.forEach((x, i) => s.channel({ x, y: -5, color: 0x9fb4ff }, `glut2${i}`));
      const gluP = sg.map((x, i) => [[x - 2, 12, 0, 2], [x, 7, 0, 0.8], [x, 3.5, 0, 0.12], [x + 1, -0.5, 0, 0.8], [g2[i], -5, 0, 0.12], [g2[i], -8, 0, 0.8], [g2[i] + 3, -12, 0, 1.6]]);
      s.flow('glu', { paths: gluP, color: C.glu, count: 46, speed: 0.06, size: 0.3 });
      s.flow('na', { paths: sg.map((x) => [[x - 2, 12, 0, 2], [x, 7, 0, 0.8], [x, 3.5, 0, 0.12], [x - 1, 0.5, 0, 0.9]]), color: C.na, count: 30, speed: 0.1, size: 0.16 });
      s.cloud('stau', { center: [-5.5, 8.2, 0], box: [11, 3.4, 5], color: C.glu, count: 60, size: 0.3 });
      s.flow('fru', { paths: g5.map((x, i) => [[x + 2, 12, 0, 2], [x, 7, 0, 0.8], [x, 3.5, 0, 0.12], [x - 1, -0.5, 0, 0.8], [g2[i + 1], -5, 0, 0.12], [g2[i + 1], -8, 0, 0.8], [g2[i + 1] + 3, -12, 0, 1.6]]), color: C.fru, count: 40, speed: 0.06, size: 0.3 });
      s.label('SGLT1', [-5.5, 6, 0]);
      s.label('GLUT5', [5.5, 6, 0], { steps: [2, 3] });
      s.label('GLUT2', [0, -2.6, 0]);
      s.label('Darm (hier schwimmt dein Gel)', [10, 9.6, 0], { art: 'zone' });
      s.label('Darmzelle', [11, -0.8, 0], { art: 'zone' });
      s.label('Blut → Muskel', [-10.5, -9.4, 0], { art: 'zone' });
      s.label('Stau: SGLT1 schafft nur ~60 g/h', [-5.5, 10.8, 0], { art: 'hinweis', steps: [1] });
      s.label('zweite Spur: bis 90–120 g/h', [5.5, 10.8, 0], { art: 'hinweis', steps: [3] });
    },
    steps: [
      {
        titel: 'Glukose nimmt SGLT1',
        text: 'Glukose (auch die aus Maltodextrin) kommt nur über einen Transporter aus dem Darm: SGLT1. Der nimmt Glukose zusammen mit Natrium mit – deshalb gehört etwas Salz ins Getränk.',
        flows: { glu: 0.55, na: 0.55 },
      },
      {
        titel: 'Bei ~60 g/h ist Schluss',
        text: 'SGLT1 ist bei rund 1 g pro Minute gesättigt. Kippst du mehr Glukose nach, bleibt sie im Darm liegen, zieht Wasser – und du bekommst Magenprobleme statt Energie.',
        flows: { glu: 1, na: 1, stau: 1 },
        set: { sglt0: { glow: 0.9 }, sglt1: { glow: 0.9 } },
      },
      {
        titel: 'Fruktose nimmt die Nebentür',
        text: 'Fruktose benutzt einen eigenen Transporter: GLUT5. Der ist von der Glukose-Schlange völlig unbeeindruckt. Zwei Zuckerarten, zwei Türen.',
        flows: { glu: 1, na: 1, stau: 0.45, fru: 1 },
        set: { glut50: { glow: 0.9 }, glut51: { glow: 0.9 } },
      },
      {
        titel: 'Mehr Sprit im Blut',
        text: 'Auf der Rückseite der Darmzelle gehen beide über GLUT2 ins Blut. Mit ~60 g/h Glukose plus Fruktose obendrauf kommen 90 g/h an – mit trainiertem Darm bis 120 g/h.',
        flows: { glu: 1, na: 1, stau: 0.15, fru: 1 },
        set: { glut20: { glow: 0.85 }, glut21: { glow: 0.85 }, glut22: { glow: 0.85 } },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── ITC / NRF2
  itc: {
    cam: { pos: [0, 2, 36], target: [0, -4.4, 0] },
    legende: [
      { farbe: C.itc, label: 'ITC (z. B. Sulforaphan)' },
      { farbe: C.nrf2, label: 'NRF2' },
      { farbe: C.rot, label: 'ROS (oxidativer Stress)' },
      { farbe: C.enzym, label: 'Schutz-Enzyme (NQO1, HO-1, GCL)' },
    ],
    build(s) {
      s.membrane({});
      s.blob({ pos: [-5.2, -3.6, 0], r: 1.25, color: 0x6f7fa8, glow: 0.3 }, 'keap1a');
      s.blob({ pos: [-3.4, -3.9, 0.3], r: 1.15, color: 0x6f7fa8, glow: 0.3 }, 'keap1b');
      s.sphere({ pos: [-4.3, -5.1, 0.2], r: 0.55, color: C.nrf2, glow: 1.4 }, 'nrf2fest');
      s.barrel({ pos: [-10.5, -7, 0] }, 'proteasom');
      s.nucleus({ pos: [4.5, -10.6, 0], r: 5 }, 'kern', 'are');
      s.mito({ pos: [10.5, -3.4, 0], s: 0.95 }, 'mito');
      s.cloud('ros', { center: [9.5, -3.6, 0], box: [8, 4, 5], color: C.rot, count: 60, size: 0.2, spiky: true });
      s.flow('itc', { paths: [[[-12, 9, 0, 2.2], [-7.5, 3.5, 0, 1.4], [-5.5, 0, 0, 1.2], [-4.4, -2.6, 0, 0.6]]], color: C.itc, count: 34, speed: 0.09 });
      s.flow('abbau', { paths: [[[-4.4, -5.2, 0.2, 0.2], [-7.5, -6, 0, 0.4], [-10.3, -6.9, 0, 0.15]]], color: C.nrf2, count: 16, speed: 0.14, size: 0.34 });
      s.flow('nrf2', { paths: [[[-3.8, -5.2, 0.2, 0.25], [-0.5, -6.4, 0, 0.5], [2.6, -6.6, 0, 0.3], [4.5, -9.6, 0, 0.5]]], color: C.nrf2, count: 22, speed: 0.11, size: 0.38, glow: 1.9 });
      s.flow('enzyme', { paths: [[[5.5, -9.4, 0, 0.5], [7.5, -6.5, 0, 0.6], [9.5, -3.8, 0, 2]]], color: C.enzym, count: 34, speed: 0.1, size: 0.25 });
      s.label('KEAP1 (Sensor)', [-4.3, -1.6, 0]);
      s.label('Proteasom (Schredder)', [-10.5, -9.6, 0]);
      s.label('Zellkern', [9.6, -14.6, 0]);
      s.label('ARE: Schalter auf der DNA', [3.4, -12.6, 0], { steps: [2, 3] });
      s.label('Mitochondrium', [10.5, -0.6, 0]);
      s.label('Blut', [9, 6.6, 0], { art: 'zone' });
      s.label('ITC hängt an den Cystein-Sensoren', [-4.3, -7, 0], { art: 'hinweis', steps: [1] });
      s.label('NRF2 + sMAF binden ans ARE', [4.5, -8.4, 0], { art: 'hinweis', steps: [2] });
    },
    steps: [
      {
        titel: 'Normalbetrieb: NRF2 wird geschreddert',
        text: 'NRF2 ist der Chef des zelleigenen Schutzprogramms – wird aber kurzgehalten. Der Sensor KEAP1 hält es fest und markiert es für den Abbau. Im Proteasom landet es, bevor es etwas ausrichten kann. Hartes Training erzeugt derweil reichlich ROS.',
        flows: { abbau: 1, ros: 1 },
      },
      {
        titel: 'ITC kommt rein',
        text: 'Aus den Glucosinolaten der Sprossen entstehen Isothiocyanate (ITC), z. B. Sulforaphan. Die sind klein und reaktiv, schlüpfen durch die Membran und hängen sich an Cystein-Bausteine von KEAP1. Der Sensor „klemmt“.',
        flows: { itc: 1, abbau: 0.5, ros: 1 },
        set: { keap1a: { color: 0x8fbf3f, glow: 0.4 }, keap1b: { color: 0x8fbf3f, glow: 0.4 } },
      },
      {
        titel: 'NRF2 ist frei',
        text: 'Mit klemmendem KEAP1 wird neues NRF2 nicht mehr abgebaut. Es sammelt sich an, wandert in den Zellkern und bindet dort zusammen mit einem Partner (sMAF) an den DNA-Schalter ARE.',
        flows: { itc: 0.5, nrf2: 1, ros: 1 },
        set: {
          keap1a: { color: 0x8fbf3f, glow: 0.4 }, keap1b: { color: 0x8fbf3f, glow: 0.4 },
          nrf2fest: { scale: 0 }, are: { glow: 2.2 },
        },
      },
      {
        titel: 'Schutz-Gene an',
        text: 'Der Kern produziert jetzt mehr antioxidative und entgiftende Enzyme (NQO1, HO-1, Glutathion-Synthese). Die räumen ROS ab. Gemessen wurde beim Menschen: weniger oxidativ geschädigte Muskelproteine und weniger Laktat bei gleicher Leistung. Warum das Laktat sinkt, ist noch nicht geklärt.',
        flows: { itc: 0.3, nrf2: 0.6, enzyme: 1, ros: 0.22 },
        set: {
          keap1a: { color: 0x8fbf3f, glow: 0.4 }, keap1b: { color: 0x8fbf3f, glow: 0.4 },
          nrf2fest: { scale: 0 }, are: { glow: 2.2 }, kern: { glow: 0.5 },
        },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── KETONESTER
  ketonester: {
    cam: CAM,
    legende: [
      { farbe: C.ke, label: 'Ketonester' },
      { farbe: C.bhb, label: 'β-Hydroxybutyrat (βHB)' },
      { farbe: C.acoa, label: 'Acetyl-CoA im Citratzyklus' },
      { farbe: C.atp, label: 'ATP' },
      { farbe: C.rot, label: 'H⁺ (Säure)' },
      { farbe: 0xe9f1ff, label: 'Glukose-Abbau (Glykolyse)' },
    ],
    build(s) {
      s.blob({ pos: [-10.5, 5.4, 0], r: 1.4, color: 0x8e7cc3, glow: 0.45 }, 'esterase');
      s.membrane({ holes: [{ x: -2, r: 1.3 }] });
      s.channel({ x: -2, color: 0xb39bff }, 'mct');
      s.mito({ pos: [5.5, -6, 0], s: 1.45 }, 'mito');
      s.flow('ke', { paths: [[[-18, 9, 0, 1.2], [-13.5, 6.8, 0, 0.7], [-10.8, 5.6, 0, 0.3]]], color: C.ke, count: 18, speed: 0.12, size: 0.42 });
      s.flow('bhb', { paths: [[[-10.2, 5.2, 0, 0.4], [-6, 4.2, 0, 1], [-2, 1.8, 0, 0.5], [-2, 0, 0, 0.12], [0, -3, 0, 0.6], [3.2, -5.4, 0, 0.4]]], color: C.bhb, count: 38, speed: 0.085, size: 0.27 });
      const ring = [];
      for (let i = 0; i < 8; i++) ring.push([5.5 + Math.cos((i / 8) * 6.283) * 1.5, -6 + Math.sin((i / 8) * 6.283) * 1.1, 0.4, 0.1]);
      s.flow('zyklus', { paths: [ring], color: C.acoa, count: 16, speed: 0.3, size: 0.24, glow: 2, closed: true });
      s.flow('atp', { paths: [[[8, -6, 0, 0.4], [10.5, -7.5, 0, 1], [13.5, -10, 0, 2]]], color: C.atp, count: 26, speed: 0.14, glow: 2 });
      s.cloud('saeure', { center: [3, 5.4, 0], box: [16, 4.5, 5], color: C.rot, count: 60, size: 0.19, spiky: true });
      s.flow('glyko', { paths: [[[-11, -9.5, 0, 1.2], [-5, -8.6, 0, 0.6], [1, -7.4, 0, 0.5], [3.4, -6.6, 0, 0.4]]], color: 0xe9f1ff, count: 26, speed: 0.11, size: 0.22, glow: 1 });
      s.label('Esterasen (Darm, Blut, Leber)', [-10.5, 8, 0]);
      s.label('MCT-Transporter', [-2, 2.8, 0]);
      s.label('Mitochondrium', [5.5, -9.8, 0]);
      s.label('Blut', [11.5, 2.4, 0], { art: 'zone' });
      s.label('Muskelzelle', [-10.5, -2.4, 0], { art: 'zone' });
      s.label('Blut wird saurer', [6, 8.4, 0], { art: 'hinweis', steps: [3] });
      s.label('Glykolyse gedrosselt', [-5, -11, 0], { art: 'hinweis', steps: [3] });
    },
    steps: [
      {
        titel: 'Der Ester wird geknackt',
        text: 'Ketonmonoester ist βHB, das an Butandiol gebunden ist. Esterasen spalten das auf; die Leber macht aus dem Butandiol ebenfalls βHB. Binnen Minuten steigt der Ketonspiegel im Blut auf Werte wie nach tagelangem Fasten.',
        flows: { ke: 1, bhb: 0.3, glyko: 1, atp: 0.6 },
        set: { esterase: { glow: 1 } },
      },
      {
        titel: 'βHB geht in den Muskel',
        text: 'β-Hydroxybutyrat nimmt denselben Transporter wie Laktat (MCT) und landet in der Muskelzelle. Dort geht es direkt weiter ins Mitochondrium.',
        flows: { ke: 0.6, bhb: 1, glyko: 1, atp: 0.6 },
        set: { mct: { glow: 0.85 } },
      },
      {
        titel: 'Verfeuert im Mitochondrium',
        text: 'Drei Enzymschritte (BDH1 → SCOT → Thiolase) machen aus βHB zwei Acetyl-CoA. Die laufen in den Citratzyklus und liefern ATP. Auf dem Papier: ein Zusatzbrennstoff, der Glykogen sparen könnte.',
        flows: { bhb: 1, zyklus: 1, atp: 1, glyko: 0.8 },
        set: { mito: { glow: 1 } },
      },
      {
        titel: 'Der Haken',
        text: 'βHB ist eine Säure: Blut-pH und Bicarbonat sinken – schlecht, wenn du am Limit fährst. Zudem bremsen Ketone den Glukose-Abbau, also genau den schnellen Stoffwechselweg für hohe Intensität. Deshalb zeigen die Studien im Rennen: kein Plus, teils ein Minus.',
        flows: { bhb: 1, zyklus: 1, atp: 0.8, saeure: 1, glyko: 0.25 },
        set: { mito: { glow: 1 } },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── SAUERKIRSCHE
  sauerkirsche: {
    cam: { pos: [0, 2, 36], target: [0, -4.4, 0] },
    legende: [
      { farbe: C.rot, label: 'ROS (oxidativer Stress)' },
      { farbe: C.nfkb, label: 'NF-κB (Entzündungs-Schalter)' },
      { farbe: C.cyto, label: 'Entzündungssignale' },
      { farbe: C.poly, label: 'Kirsch-Polyphenole' },
    ],
    build(s) {
      s.membrane({});
      s.mito({ pos: [-8, -4, 0], s: 1.05 }, 'mito');
      s.fibril({ pos: [-6.5, -11, 0], len: 9 }, 'faser');
      s.blob({ pos: [-0.5, -5, 0], r: 0.95, color: C.nfkb, glow: 0.6 }, 'nfkbRuhe');
      s.nucleus({ pos: [6, -10.6, 0], r: 5 }, 'kern', 'gene');
      s.cloud('ros', { center: [-6, -6.4, 0], box: [9.5, 6.5, 5], color: C.rot, count: 80, size: 0.2, spiky: true });
      s.flow('nfkb', { paths: [[[-0.3, -5.2, 0, 0.3], [2.4, -6, 0, 0.5], [4.2, -6.6, 0, 0.3], [6, -9.6, 0, 0.5]]], color: C.nfkb, count: 22, speed: 0.11, size: 0.36 });
      s.flow('signal', { paths: [[[7, -9.2, 0, 0.5], [9.5, -5.5, 0, 0.7], [11.5, -1.5, 0, 1.2], [13, 4, 0, 2]]], color: C.cyto, count: 34, speed: 0.1, size: 0.25 });
      s.flow('poly', { paths: [[[-16, 9, 0, 2], [-10, 4, 0, 1.4], [-7, 0, 0, 1.2], [-5.5, -4, 0, 2.2], [-2, -5.5, 0, 1.4]]], color: C.poly, count: 44, speed: 0.08, size: 0.27 });
      s.label('Mitochondrium', [-8, -1.6, 0]);
      s.label('Muskelfaser mit Mikroschäden', [-6.5, -13.6, 0]);
      s.label('NF-κB', [-0.5, -3.3, 0]);
      s.label('Zellkern', [10.3, -13.6, 0]);
      s.label('Blut', [9, 6.6, 0], { art: 'zone' });
      s.label('Entzündungs-Gene aktiv', [6, -12.4, 0], { art: 'hinweis', steps: [1, 2] });
      s.label('Feuer gedämpft', [6, -12.4, 0], { art: 'hinweis', steps: [3] });
    },
    steps: [
      {
        titel: 'Harte Einheit, viel Stress',
        text: 'Lange oder sehr harte Belastungen hinterlassen Mikroschäden in der Faser und viele reaktive Sauerstoffverbindungen (ROS). Das ist normal – und ein Teil davon ist sogar das Signal für Anpassung.',
        flows: { ros: 1 },
        set: { faser: { color: 0xa84a5a } },
      },
      {
        titel: 'Der Entzündungs-Schalter kippt',
        text: 'ROS und Zellschäden aktivieren NF-κB. Es wandert in den Zellkern und schaltet Entzündungs-Gene an. Die Zelle funkt Alarmsignale – das spürst du als Muskelkater und Kraftverlust in den Tagen danach.',
        flows: { ros: 1, nfkb: 1, signal: 1 },
        set: { nfkbRuhe: { scale: 0.5 }, gene: { color: 0xff7a3d, glow: 2 }, faser: { color: 0xa84a5a } },
      },
      {
        titel: 'Polyphenole kommen an',
        text: 'Aus der Sauerkirsche kommen Anthocyane und andere Polyphenole. Im Blut landen vor allem ihre Abbauprodukte – die sind es wahrscheinlich, die in der Zelle wirken.',
        flows: { ros: 1, nfkb: 1, signal: 1, poly: 1 },
        set: { nfkbRuhe: { scale: 0.5 }, gene: { color: 0xff7a3d, glow: 2 }, faser: { color: 0xa84a5a } },
      },
      {
        titel: 'Feuer gedämpft',
        text: 'Vermutete Wirkung: weniger ROS, weniger NF-κB-Aktivität, weniger Entzündungssignale – dazu bessere Durchblutung. Ergebnis in Studien: schnellere Erholung der Muskelfunktion. Der Mechanismus ist plausibel, aber nicht bis ins Detail bewiesen.',
        flows: { ros: 0.3, nfkb: 0.3, signal: 0.25, poly: 1 },
        set: { gene: { glow: 0.5 } },
      },
    ],
  },
};
