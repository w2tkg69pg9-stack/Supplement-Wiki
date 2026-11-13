// Abb. 2 je Supplement: was in der Zelle passiert. Vier Schritte, gezeichnet wie im Bio-Buch.
import { F, flaeche, membran, kanal, rezeptor, mito, helix, kern, faser, gefaess, bakterium, blob, stern, txt, label, zone, nur, icon } from './teile.js';

const C = {
  adenosin: '#e0872a',
  koffein: '#1f8f80',
  rot: '#d6453d',
  gruen: '#4f9a3a',
  nitrat: '#c2255c',
  nitrit: '#8e44ad',
  no: '#2d7fc1',
  atp: '#e3a008',
  laktat: '#e67e22',
  hco3: '#2b6cb0',
  co2: '#7b8794',
  ba: '#c98a12',
  his: '#7c5cc4',
  carn: '#2f9e6e',
  cr: '#3b82c4',
  pcr: '#5a55c8',
  glu: '#f0c330',
  na: '#8a63d2',
  fru: '#e8703a',
  itc: '#6a9a1f',
  nrf2: '#e8872b',
  enzym: '#1f9a8a',
  ke: '#7b4fc4',
  bhb: '#b0469b',
  acoa: '#d99a1b',
  poly: '#b0304f',
  nfkb: '#e07b28',
  cyto: '#c2378f',
  glyko: '#8aa0b8',
};
const W = 640;
const H = 480;
const DUNKEL = '#3a2a00';

// Sternchen (ROS) an festen Plätzen; die ersten `bleiben` sind in allen Schritten da
const rosFeld = (punkte, bleiben, weg = '0,1,2') =>
  punkte.map(([x, y], i) => (i < bleiben ? stern(x, y) : nur(weg, stern(x, y)))).join('');

export const szenen = {
  // ───────────────────────────────────────────────────────── KOFFEIN
  koffein: {
    titel: 'Koffein blockiert den Adenosin-Rezeptor einer Nervenzelle',
    legende: [
      { farbe: C.adenosin, label: 'A = Adenosin („müde“-Signal)' },
      { farbe: C.koffein, label: 'K = Koffein' },
      { farbe: C.rot, label: 'Bremssignal' },
      { farbe: C.gruen, label: 'Nervenimpulse / Dopamin & Co.' },
    ],
    zeichne(id) {
      const xs = [200, 360, 520];
      return (
        flaeche(0, 0, W, 212, F.aussen) +
        flaeche(0, 212, W, H - 212, F.zyto) +
        membran(id, 0, 190, W) +
        xs.map((x) => rezeptor(x, 190)).join('') +
        nur('0,1', xs.map((x) => icon(x, 161, 'sechseck', 11, C.adenosin, null, 'A')).join('')) +
        nur('2,3', xs.map((x) => icon(x, 161, 'kreis', 11, C.koffein, null, 'K')).join('')) +
        nur('0,1', xs.map((x) => `<path d="M${x - 15} 338h30" stroke="${C.rot}" stroke-width="5" stroke-linecap="round"/>`).join('')) +
        `<rect x="26" y="372" width="588" height="54" rx="27" fill="#e8f3df" stroke="#5c9440" stroke-width="2.2"/>` +
        `<path d="M50 399h90l10-16 14 32 12-24 8 8h110l10-16 14 32 12-24 8 8h110l10-16 14 32 12-24 8 8h40" fill="none" stroke="#5c9440" stroke-width="1.6" opacity=".6"/>` +
        zone(16, 24, 'AUSSEN · ZWISCHEN DEN NERVENZELLEN') +
        zone(16, 262, 'NERVENZELLE') +
        label(16, 150, 'Adenosin-\nRezeptor', [174, 168], { von: 'unten' }) +
        nur('0,1', label(232, 304, 'Bremssignal', [204, 300])) +
        nur('2,3', txt(232, 304, 'Bremse gelöst', { f: C.gruen, fett: true })) +
        txt(320, 456, 'Signalweiterleitung: Dopamin, Noradrenalin', { a: 'middle', g: 15 })
      );
    },
    flows: {
      adeno: { d: [200, 360, 520].map((x) => `M${x - 70} 14C${x - 70} 84 ${x} 92 ${x} 142`), farbe: C.adenosin, form: 'sechseck', txt: 'A', r: 10, n: 6, dauer: 5 },
      abprall: { d: [200, 360, 520].map((x) => `M${x - 70} 14C${x - 70} 80 ${x - 26} 104 ${x - 18} 124C${x - 8} 104 ${x + 52} 84 ${x + 64} 14`), farbe: C.adenosin, form: 'sechseck', txt: 'A', r: 10, n: 6, dauer: 6 },
      kof: { d: [200, 360, 520].map((x) => `M624 34C580 60 ${x + 60} 70 ${x + 12} 138`), farbe: C.koffein, form: 'kreis', txt: 'K', r: 10, n: 6, dauer: 5 },
      bremse: { d: [200, 360, 520].map((x) => `M${x} 246V326`), farbe: C.rot, form: 'kreis', r: 5, n: 6, dauer: 2.6, pfeil: false },
      impuls: { d: 'M40 399H600', farbe: C.gruen, form: 'raute', r: 9, n: 8, dauer: 3 },
    },
    steps: [
      {
        titel: 'Adenosin drückt die Bremse',
        text: 'Je länger du wach bist und je härter du arbeitest, desto mehr Adenosin sammelt sich an. Es dockt am Adenosin-Rezeptor an und sagt der Nervenzelle: runterfahren. Folge: weniger Dopamin, du fühlst dich platt.',
        flows: { adeno: 1, bremse: 1, impuls: 0.25 },
      },
      {
        titel: 'Koffein flutet an',
        text: 'Etwa 60 Minuten nach der Tablette ist der Koffeinspiegel im Blut oben. Koffein ist klein und fettlöslich genug, um locker ins Gehirn zu kommen.',
        flows: { adeno: 1, kof: 1, bremse: 1, impuls: 0.25 },
      },
      {
        titel: 'Platz besetzt',
        text: 'Koffein passt in dieselbe Bindetasche wie Adenosin – löst aber kein Signal aus (kompetitiver Antagonist). Das Adenosin ist noch da, findet nur keinen freien Rezeptor mehr.',
        flows: { abprall: 1, kof: 0.35, impuls: 0.6 },
      },
      {
        titel: 'Bremse gelöst',
        text: 'Ohne Bremssignal feuern die Nervenzellen munterer, mehr Dopamin und Noradrenalin sind unterwegs. Für dich heißt das: Gleiche Watt fühlen sich leichter an, du hältst das Tempo länger.',
        flows: { abprall: 1, kof: 0.2, impuls: 1 },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── NITRAT
  nitrat: {
    titel: 'Nitrat wird über Zungenbakterien zu Nitrit und im Muskel zu Stickstoffmonoxid',
    legende: [
      { farbe: C.nitrat, label: 'Nitrat (NO₃⁻)' },
      { farbe: C.nitrit, label: 'Nitrit (NO₂⁻)' },
      { farbe: C.no, label: 'Stickstoffmonoxid (NO)' },
      { farbe: C.rot, label: 'Sauerstoff (O₂)' },
      { farbe: C.atp, label: 'ATP (Energie)' },
    ],
    zeichne(id) {
      let zunge = 'M0 150V118';
      for (let x = 0; x < W; x += 40) zunge += `q20-24 40 0`;
      zunge += 'V150Z';
      return (
        flaeche(0, 0, W, 150, F.mund) +
        `<path d="${zunge}" fill="#f1a9a9" stroke="#b55a62" stroke-width="2.2"/>` +
        [180, 250, 320, 110, 390].map((x, i) => bakterium(x, 98 + (i % 2) * 4, i % 2 ? 8 : -8)).join('') +
        flaeche(0, 150, W, 100, '#f6ecdf') +
        nur('0,1,2', gefaess(0, 164, W, 56)) +
        nur('3', gefaess(0, 154, W, 76)) +
        flaeche(0, 254, W, H - 254, F.zyto) +
        membran(id, 0, 232, W) +
        mito(220, 380, 250, 120) +
        faser(456, 344, 160, 70) +
        zone(16, 22, 'MUND · ZUNGENRÜCKEN') +
        zone(16, 300, 'MUSKELZELLE') +
        label(420, 62, 'Bakterien', [392, 94], { von: 'unten' }) +
        nur('0,1,2', zone(624, 196, 'BLUTGEFÄSS', 'end')) +
        nur('3', txt(624, 197, 'Gefäß weitet sich', { a: 'end', fett: true, f: C.no, g: 15 })) +
        txt(220, 462, 'Mitochondrium', { a: 'middle', g: 15 }) +
        txt(536, 436, 'Muskelfaser', { a: 'middle', g: 15 })
      );
    },
    flows: {
      no3: { d: ['M16 50C80 46 130 60 172 86', 'M16 70C100 76 200 62 244 88', 'M16 36C150 22 280 50 316 86'], farbe: C.nitrat, form: 'pille', txt: 'NO₃⁻', r: 9, n: 6, dauer: 5 },
      no2: { d: 'M256 88C330 50 480 50 530 96C570 134 566 170 548 188C520 204 420 186 380 204C356 216 348 250 344 300', farbe: C.nitrit, form: 'pille', txt: 'NO₂⁻', r: 9, n: 7, dauer: 9 },
      no: { d: ['M340 306C320 320 300 330 286 344', 'M352 300C400 294 440 276 452 232'], farbe: C.no, form: 'kreis', txt: 'NO', r: 10, n: 6, dauer: 4 },
      o2: { d: 'M140 196C140 250 160 290 176 330', farbe: C.rot, form: 'kreis', txt: 'O₂', r: 10, n: 3, dauer: 5 },
      atp: { d: 'M344 384C380 384 420 380 452 378', farbe: C.atp, form: 'pille', txt: 'ATP', tf: DUNKEL, r: 9, n: 2, dauer: 3.5 },
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
      },
    ],
  },

  // ───────────────────────────────────────────────────────── BICARBONAT
  bicarbonat: {
    titel: 'Bicarbonat im Blut zieht Säure aus der Muskelzelle',
    legende: [
      { farbe: C.rot, label: 'H⁺ (Säure)' },
      { farbe: C.laktat, label: 'La = Laktat' },
      { farbe: C.hco3, label: 'Bicarbonat (HCO₃⁻)' },
      { farbe: C.co2, label: 'CO₂ (wird abgeatmet)' },
    ],
    zeichne(id) {
      return (
        flaeche(0, 0, W, 240, F.blut) +
        flaeche(0, 240, W, H - 240, F.zyto) +
        membran(id, 0, 218, W) +
        kanal(230, 218) +
        kanal(430, 218) +
        faser(110, 400, 420, 52) +
        zone(16, 22, 'BLUT') +
        zone(16, 290, 'MUSKELZELLE') +
        label(498, 296, 'MCT-Transporter', [452, 262]) +
        txt(320, 472, 'Muskelfaser bei Vollgas', { a: 'middle', g: 15 }) +
        nur('3', txt(320, 50, 'H⁺ + HCO₃⁻ → H₂CO₃ → H₂O + CO₂', { a: 'middle', fett: true, g: 18 })) +
        nur('3', txt(624, 22, '→ Lunge', { a: 'end', fett: true, f: C.co2, g: 15 }))
      );
    },
    flows: {
      hInnen: { d: ['M170 398C150 340 196 312 222 290', 'M480 398C500 340 462 312 438 290', 'M320 398C320 356 290 336 300 308'], farbe: C.rot, form: 'kreis', txt: 'H⁺', r: 10, n: 9, dauer: 4 },
      hRaus: { d: ['M225 286V178C225 150 250 132 286 124', 'M425 286V178C425 150 450 132 486 124'], farbe: C.rot, form: 'kreis', txt: 'H⁺', r: 10, n: 6, dauer: 4 },
      lakRaus: { d: ['M236 286V190C236 166 262 152 300 150', 'M436 286V190C436 166 462 152 500 150'], farbe: C.laktat, form: 'kreis', txt: 'La', r: 10, n: 4, dauer: 4.6 },
      hco3: { d: ['M12 96H612', 'M12 176H190'], farbe: C.hco3, form: 'pille', txt: 'HCO₃⁻', r: 9, n: 8, dauer: 8 },
      co2: { d: 'M330 112C400 80 520 50 618 34', farbe: C.co2, form: 'pille', txt: 'CO₂', r: 9, n: 4, dauer: 4 },
    },
    steps: [
      {
        titel: 'Vollgas macht sauer',
        text: 'Wenn du über der Schwelle fährst, fallen in der Muskelzelle massenhaft H⁺-Ionen an. Der pH sinkt – das stört die Kontraktion und die Energiebereitstellung. Es brennt.',
        flows: { hInnen: 1, hco3: 0.3, hRaus: 0.3, lakRaus: 0.25 },
      },
      {
        titel: 'Bicarbonat lädt das Blut auf',
        text: 'Nach der Einnahme steigt der Bicarbonat-Spiegel im Blut. In die Muskelzelle selbst kommt das kaum – muss es auch nicht. Es macht das Blut zum besseren Säure-Abfluss.',
        flows: { hInnen: 1, hco3: 1, hRaus: 0.3, lakRaus: 0.25 },
      },
      {
        titel: 'Sog nach draußen',
        text: 'Mehr Puffer draußen heißt größeres Gefälle: H⁺ und Laktat werden gemeinsam über MCT-Transporter schneller aus der Zelle geschleust. Drinnen bleibt der pH länger im grünen Bereich.',
        flows: { hInnen: 0.55, hco3: 1, hRaus: 1, lakRaus: 1 },
      },
      {
        titel: 'Abgefangen und abgeatmet',
        text: 'Im Blut schnappt sich Bicarbonat das H⁺. Daraus wird Kohlensäure, die zu Wasser und CO₂ zerfällt – und das CO₂ atmest du einfach ab. Ergebnis: Du hältst harte Belastungen ein Stück länger durch.',
        flows: { hInnen: 0.35, hco3: 0.75, hRaus: 1, lakRaus: 1, co2: 1 },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── BETA-ALANIN
  'beta-alanin': {
    titel: 'Beta-Alanin wird in der Muskelzelle zu Carnosin verbaut',
    legende: [
      { farbe: C.ba, label: 'Beta-Alanin (β-Ala)' },
      { farbe: C.his, label: 'Histidin (His)' },
      { farbe: C.carn, label: 'Carnosin (Puffer)' },
      { farbe: C.rot, label: 'H⁺ (Säure)' },
    ],
    zeichne(id) {
      const platz = [];
      for (let i = 0; i < 12; i++) platz.push([462 + (i % 3) * 56, 232 + Math.floor(i / 3) * 34]);
      const carn = (p) => icon(p[0], p[1], 'pille', 9, C.carn, null, 'Carn');
      return (
        flaeche(0, 0, W, 132, F.blut) +
        flaeche(0, 132, W, H - 132, F.zyto) +
        membran(id, 0, 110, W) +
        kanal(150, 110) +
        blob(300, 256, 124, 78, { f: '#cfe8dc', r: '#2f7d5b' }) +
        txt(300, 252, 'Carnosin-\nSynthase', { a: 'middle', g: 14, fett: true }) +
        `<rect x="424" y="204" width="196" height="150" rx="14" fill="#fffaf0" stroke="${C.carn}" stroke-width="2" stroke-dasharray="7 5"/>` +
        platz.slice(0, 3).map(carn).join('') +
        nur('1,2,3', platz.slice(3, 5).map(carn).join('')) +
        nur('2,3', platz.slice(5, 12).map(carn).join('')) +
        faser(60, 408, 520, 50) +
        zone(16, 22, 'BLUT') +
        zone(16, 186, 'MUSKELZELLE') +
        label(206, 190, 'Transporter TauT', [172, 160]) +
        txt(522, 194, 'Carnosin-Speicher', { a: 'middle', g: 15, fett: true, f: '#1f6f4d' }) +
        nur('2', txt(522, 376, 'nach 4 Wochen: +40–60 %', { a: 'middle', g: 14, f: '#1f6f4d' })) +
        nur('3', txt(200, 392, 'Säure aus der arbeitenden Faser', { a: 'middle', g: 14, f: C.rot }))
      );
    },
    flows: {
      ba: { d: 'M40 30C100 34 150 56 150 100V176C150 214 214 238 242 246', farbe: C.ba, form: 'pille', txt: 'β-Ala', r: 9, n: 6, dauer: 6 },
      his: { d: 'M30 336C110 336 196 306 244 274', farbe: C.his, form: 'pille', txt: 'His', r: 9, n: 4, dauer: 5 },
      carn: { d: 'M362 256C390 256 404 258 424 262', farbe: C.carn, form: 'pille', txt: 'Carn', r: 9, n: 3, dauer: 3 },
      saeure: { d: ['M470 406C470 388 480 372 490 358', 'M560 406C560 388 552 372 546 358', 'M400 406C410 380 440 350 452 330'], farbe: C.rot, form: 'kreis', txt: 'H⁺', r: 10, n: 6, dauer: 3 },
    },
    steps: [
      {
        titel: 'Rein in die Muskelzelle',
        text: 'Beta-Alanin kommt übers Blut und wird vom Transporter TauT in die Muskelzelle geschleust. Allein kann es da drin noch nichts.',
        flows: { ba: 1, his: 0.5 },
      },
      {
        titel: 'Zusammenbau zu Carnosin',
        text: 'Das Enzym Carnosin-Synthase klebt Beta-Alanin und Histidin zusammen. Histidin hast du genug – Beta-Alanin ist der Engpass. Deshalb bringt mehr Beta-Alanin mehr Carnosin.',
        flows: { ba: 1, his: 1, carn: 1 },
      },
      {
        titel: 'Wochenlang auffüllen',
        text: 'Das geht langsam: Nach 4 Wochen mit 4–6 g pro Tag ist der Carnosin-Speicher um 40–60 % größer. Eine Einzeldosis vor dem Rennen bringt deshalb nichts – außer Kribbeln.',
        flows: { ba: 0.7, his: 0.75, carn: 1 },
      },
      {
        titel: 'Puffer im Einsatz',
        text: 'Im harten Intervall schießt H⁺ in die Faser. Carnosin fängt es direkt vor Ort ab (über seinen Imidazol-Ring). Der pH fällt langsamer – du hältst die 1–4-Minuten-Hölle etwas länger aus.',
        flows: { saeure: 1, carn: 0.34 },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── KREATIN
  kreatin: {
    titel: 'Kreatin pendelt als Phosphokreatin zwischen Mitochondrium und Muskelfaser',
    legende: [
      { farbe: C.cr, label: 'Kreatin (Cr)' },
      { farbe: C.pcr, label: 'Phosphokreatin (PCr)' },
      { farbe: C.atp, label: 'ATP an der Faser' },
    ],
    zeichne(id) {
      return (
        flaeche(0, 0, W, 112, F.blut) +
        flaeche(0, 112, W, H - 112, F.zyto) +
        membran(id, 0, 90, W) +
        kanal(130, 90) +
        mito(190, 310, 250, 140) +
        faser(520, 150, 84, 300, { hoch: true }) +
        blob(318, 306, 44, 34, { f: '#d8d6f5', r: C.pcr }) +
        blob(506, 300, 40, 34, { f: '#d8d6f5', r: C.pcr }) +
        zone(16, 22, 'BLUT') +
        zone(16, 168, 'MUSKELZELLE') +
        label(186, 172, 'Transporter CreaT', [152, 140]) +
        txt(190, 404, 'Mitochondrium', { a: 'middle', g: 15 }) +
        txt(562, 470, 'Muskelfaser', { a: 'middle', g: 15 }) +
        label(412, 306, 'Kreatin-\nkinase', [342, 306], { a: 'middle', g: 14 }) +
        `<path d="M452 312L484 302" stroke="${F.tinte}" stroke-width="1.1"/>` +
        nur('3', txt(412, 440, 'ADP + PCr → ATP + Cr', { a: 'middle', fett: true, g: 16 }))
      );
    },
    flows: {
      rein: { d: 'M30 28C90 30 130 48 130 82V160C130 200 146 224 164 240', farbe: C.cr, form: 'pille', txt: 'Cr', r: 9, n: 5, dauer: 6 },
      pcr: { d: 'M300 262C370 216 440 214 512 240', farbe: C.pcr, form: 'pille', txt: 'PCr', r: 9, n: 5, dauer: 4 },
      zurueck: { d: 'M512 356C440 392 370 390 306 352', farbe: C.cr, form: 'pille', txt: 'Cr', r: 9, n: 5, dauer: 4 },
      atp: { d: 'M562 436V166', farbe: C.atp, form: 'pille', txt: 'ATP', tf: DUNKEL, r: 9, n: 5, dauer: 3 },
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
      },
      {
        titel: 'Shuttle zur Faser',
        text: 'PCr wandert zur Myofibrille, gibt dort sein Phosphat ab und kommt als Kreatin zurück. So wird Energie vom Kraftwerk zur Baustelle gefahren.',
        flows: { pcr: 1, zurueck: 1, atp: 0.5 },
      },
      {
        titel: 'Antritt!',
        text: 'Bei der Attacke wird ATP schneller verbraucht, als Mitochondrien nachliefern. PCr springt in Millisekunden ein und macht aus ADP wieder ATP. Mehr PCr im Tank heißt: härter antreten und öfter nachlegen.',
        flows: { pcr: 1, zurueck: 1, atp: 1 },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── KOHLENHYDRATE
  kohlenhydrate: {
    titel: 'Glukose und Fruktose nehmen in der Darmzelle verschiedene Transporter',
    legende: [
      { farbe: C.glu, label: 'G = Glukose' },
      { farbe: C.na, label: 'Natrium (fährt mit)' },
      { farbe: C.fru, label: 'F = Fruktose' },
    ],
    zeichne(id) {
      const stau = [[166, 96], [196, 82], [180, 58], [214, 104], [150, 70], [206, 48], [236, 76], [170, 30]];
      const g = (p) => icon(p[0], p[1], 'sechseck', 10, C.glu, null, 'G', DUNKEL);
      return (
        flaeche(0, 0, W, 150, F.darm) +
        flaeche(0, 150, W, 190, F.zyto) +
        gefaess(0, 366, W, 114, { zellen: 5 }) +
        membran(id, 0, 128, W) +
        membran(id, 0, 318, W) +
        [130, 230].map((x) => kanal(x, 128, { f: '#f6dd8c', r: '#a07c12' })).join('') +
        [420, 520].map((x) => kanal(x, 128, { f: '#f5c0a3', r: '#a8502a' })).join('') +
        [200, 330, 460].map((x) => kanal(x, 318, { f: '#bcd9c0', r: '#3f7a4c' })).join('') +
        nur('1,2', stau.slice(3).map(g).join('')) +
        nur('1,2,3', stau.slice(0, 3).map(g).join('')) +
        zone(624, 22, 'DARMINNERES', 'end') +
        zone(16, 250, 'DARMZELLE') +
        zone(624, 470, 'BLUT', 'end') +
        txt(180, 208, 'SGLT1', { a: 'middle', fett: true, g: 15 }) +
        txt(470, 208, 'GLUT5', { a: 'middle', fett: true, g: 15 }) +
        txt(265, 306, 'GLUT2', { a: 'middle', fett: true, g: 15 }) +
        nur('1,2,3', txt(180, 228, 'max. ~60 g/h', { a: 'middle', g: 14, f: C.rot, fett: true }))
      );
    },
    flows: {
      glu: {
        d: ['M96 14C96 60 130 84 130 122V214C130 262 192 280 200 312V386C200 420 262 438 326 446', 'M270 14C270 60 230 84 230 122V214C230 262 318 280 330 312V386C330 420 400 438 464 446'],
        farbe: C.glu, form: 'sechseck', txt: 'G', tf: DUNKEL, r: 10, n: 8, dauer: 7,
      },
      na: { d: ['M118 14C118 60 139 90 139 124V190C140 216 110 228 76 232', 'M248 14C248 60 239 90 239 124V190C240 220 270 236 300 242'], farbe: C.na, form: 'kreis', txt: 'Na⁺', r: 9, n: 4, dauer: 6 },
      fru: {
        d: ['M440 14C440 60 420 84 420 122V214C420 262 452 284 456 312V386C456 420 520 440 600 448', 'M556 14C556 60 520 84 520 122V214C520 262 472 286 466 312V392C466 414 520 426 600 428'],
        farbe: C.fru, form: 'fuenfeck', txt: 'F', r: 10, n: 8, dauer: 7,
      },
    },
    steps: [
      {
        titel: 'Glukose nimmt SGLT1',
        text: 'Glukose (auch die aus Maltodextrin) kommt nur über einen Transporter aus dem Darm: SGLT1. Der nimmt Glukose zusammen mit Natrium mit – deshalb gehört etwas Salz ins Getränk.',
        flows: { glu: 0.5, na: 0.5 },
      },
      {
        titel: 'Bei ~60 g/h ist Schluss',
        text: 'SGLT1 ist bei rund 1 g pro Minute gesättigt. Kippst du mehr Glukose nach, bleibt sie im Darm liegen, zieht Wasser – und du bekommst Magenprobleme statt Energie.',
        flows: { glu: 1, na: 1 },
      },
      {
        titel: 'Fruktose nimmt die Nebentür',
        text: 'Fruktose benutzt einen eigenen Transporter: GLUT5. Der ist von der Glukose-Schlange völlig unbeeindruckt. Zwei Zuckerarten, zwei Türen.',
        flows: { glu: 1, na: 1, fru: 1 },
      },
      {
        titel: 'Mehr Sprit im Blut',
        text: 'Auf der Rückseite der Darmzelle gehen beide über GLUT2 ins Blut. Mit ~60 g/h Glukose plus Fruktose obendrauf kommen 90 g/h an – mit trainiertem Darm bis 120 g/h.',
        flows: { glu: 1, na: 1, fru: 1 },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── ITC
  itc: {
    titel: 'ITC löst NRF2 von KEAP1; NRF2 schaltet im Zellkern Schutz-Gene an',
    legende: [
      { farbe: C.itc, label: 'ITC (z. B. Sulforaphan)' },
      { farbe: C.nrf2, label: 'NRF2' },
      { farbe: '#f0564a', label: 'ROS (oxidativer Stress)' },
      { farbe: C.enzym, label: 'Schutz-Enzyme (NQO1, HO-1, GCL)' },
    ],
    zeichne(id) {
      const ros = [[330, 120], [560, 150], [70, 250], [300, 400], [210, 300], [600, 440], [420, 110], [40, 150], [250, 452], [130, 120], [340, 190]];
      const fass = [0, 1, 2, 3].map((i) => `<rect x="72" y="${318 + i * 24}" width="76" height="22" rx="10" fill="${i % 3 ? '#d7dce6' : '#bfc7d6'}" stroke="#56657d" stroke-width="1.8"/>`).join('');
      return (
        flaeche(0, 0, W, 62, F.aussen) +
        flaeche(0, 62, W, H - 62, F.zyto) +
        membran(id, 0, 40, W) +
        kern(470, 322, 134) +
        helix(366, 330, 208) +
        `<rect x="430" y="314" width="76" height="32" rx="6" fill="#ffe27a" fill-opacity=".8" stroke="#a07c12" stroke-width="1.6"/>` +
        txt(468, 336, 'ARE', { a: 'middle', fett: true, g: 15 }) +
        nur('0', blob(192, 196, 62, 54) + blob(244, 196, 62, 54)) +
        nur('1,2,3', blob(192, 196, 62, 54, { f: '#d5e8a8', r: '#5c8420' }) + blob(244, 196, 62, 54, { f: '#d5e8a8', r: '#5c8420' })) +
        nur('1,2,3', icon(176, 172, 'pille', 8, C.itc, null, 'ITC') + icon(262, 174, 'pille', 8, C.itc, null, 'ITC')) +
        txt(218, 202, 'KEAP1', { a: 'middle', fett: true, g: 15 }) +
        nur('1,2,3', txt(218, 244, 'Sensor klemmt', { a: 'middle', g: 14, f: '#4d7218', fett: true })) +
        nur('0,1', icon(218, 156, 'pille', 10, C.nrf2, null, 'NRF2')) +
        fass +
        txt(110, 432, 'Proteasom', { a: 'middle', g: 15 }) +
        nur('0,1', [[92, 452], [112, 460], [130, 450]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.5" fill="${C.nrf2}"/>`).join('')) +
        nur('2,3', icon(452, 300, 'pille', 10, C.nrf2, null, 'NRF2') + icon(500, 300, 'kreis', 9, '#b9a4e6', null, 's')) +
        rosFeld(ros, 3) +
        zone(16, 22, 'AUSSEN') +
        zone(16, 104, 'MUSKELZELLE · ZYTOPLASMA') +
        txt(470, 222, 'Zellkern', { a: 'middle', g: 15 }) +
        txt(540, 372, 'DNA', { a: 'middle', g: 14, f: '#5b4a9c' })
      );
    },
    flows: {
      abbau: { d: 'M214 176C150 220 120 260 112 310', farbe: C.nrf2, form: 'pille', txt: 'NRF2', r: 8, n: 3, dauer: 4 },
      itc: { d: ['M70 8C80 70 130 130 172 162', 'M330 8C320 70 296 132 268 164'], farbe: C.itc, form: 'pille', txt: 'ITC', r: 8, n: 4, dauer: 4.5 },
      nrf2: { d: 'M232 150C310 120 380 210 446 290', farbe: C.nrf2, form: 'pille', txt: 'NRF2', r: 9, n: 4, dauer: 5 },
      enzyme: { d: ['M400 372C340 420 270 440 190 432', 'M386 286C340 270 322 236 326 196', 'M560 250C590 200 596 150 586 100'], farbe: C.enzym, form: 'pille', txt: 'Enz', r: 8, n: 6, dauer: 5 },
    },
    steps: [
      {
        titel: 'Normalbetrieb: NRF2 wird geschreddert',
        text: 'NRF2 ist der Chef des zelleigenen Schutzprogramms – wird aber kurzgehalten. Der Sensor KEAP1 hält es fest und markiert es für den Abbau. Im Proteasom landet es, bevor es etwas ausrichten kann. Hartes Training erzeugt derweil reichlich ROS.',
        flows: { abbau: 1 },
      },
      {
        titel: 'ITC kommt rein',
        text: 'Aus den Glucosinolaten der Sprossen entstehen Isothiocyanate (ITC), z. B. Sulforaphan. Die sind klein und reaktiv, schlüpfen durch die Membran und hängen sich an Cystein-Bausteine von KEAP1. Der Sensor „klemmt“.',
        flows: { itc: 1, abbau: 0.4 },
      },
      {
        titel: 'NRF2 ist frei',
        text: 'Mit klemmendem KEAP1 wird neues NRF2 nicht mehr abgebaut. Es sammelt sich an, wandert in den Zellkern und bindet dort zusammen mit einem Partner (sMAF) an den DNA-Schalter ARE.',
        flows: { itc: 0.5, nrf2: 1 },
      },
      {
        titel: 'Schutz-Gene an',
        text: 'Der Kern produziert jetzt mehr antioxidative und entgiftende Enzyme (NQO1, HO-1, Glutathion-Synthese). Die räumen ROS ab. Gemessen wurde beim Menschen: weniger oxidativ geschädigte Muskelproteine und weniger Laktat bei gleicher Leistung. Warum das Laktat sinkt, ist noch nicht geklärt.',
        flows: { itc: 0.3, nrf2: 0.5, enzyme: 1 },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── KETONESTER
  ketonester: {
    titel: 'Ketonester wird zu βHB gespalten und im Mitochondrium verbrannt',
    legende: [
      { farbe: C.ke, label: 'KE = Ketonester' },
      { farbe: C.bhb, label: 'β-Hydroxybutyrat (βHB)' },
      { farbe: C.acoa, label: 'Acetyl-CoA im Citratzyklus' },
      { farbe: C.atp, label: 'ATP' },
      { farbe: C.rot, label: 'H⁺ (Säure)' },
      { farbe: C.glyko, label: 'Glukose-Abbau (Glykolyse)' },
    ],
    zeichne(id) {
      return (
        flaeche(0, 0, W, 172, F.blut) +
        flaeche(0, 172, W, H - 172, F.zyto) +
        membran(id, 0, 150, W) +
        kanal(340, 150) +
        blob(140, 84, 96, 60, { f: '#e0d4f5', r: '#6a47ad' }) +
        txt(140, 89, 'Esterase', { a: 'middle', fett: true, g: 14 }) +
        mito(390, 350, 300, 176) +
        `<circle cx="400" cy="350" r="44" fill="#fffaf0" stroke="${C.acoa}" stroke-width="2" stroke-dasharray="6 5"/>` +
        txt(400, 346, 'Citrat-\nzyklus', { a: 'middle', g: 13, fett: true }) +
        txt(90, 232, 'Glukose', { a: 'middle', g: 15, fett: true }) +
        txt(90, 458, 'Pyruvat', { a: 'middle', g: 15, fett: true }) +
        nur('3', txt(104, 340, 'gebremst', { g: 14, f: C.rot, fett: true })) +
        zone(624, 22, 'BLUT', 'end') +
        zone(624, 470, 'MUSKELZELLE', 'end') +
        label(396, 226, 'MCT-Transporter', [364, 196]) +
        txt(390, 462, 'Mitochondrium', { a: 'middle', g: 15 }) +
        nur('3', txt(16, 140, 'Blut-pH sinkt', { fett: true, f: C.rot, g: 15 }))
      );
    },
    flows: {
      ke: { d: 'M10 50C50 50 70 66 94 78', farbe: C.ke, form: 'pille', txt: 'KE', r: 9, n: 3, dauer: 3 },
      bhb: { d: 'M188 86C250 84 340 92 340 142V228C340 250 352 262 364 276', farbe: C.bhb, form: 'pille', txt: 'βHB', r: 9, n: 6, dauer: 6 },
      zyklus: { d: 'M400 306A44 44 0 1 1 399.9 306', farbe: C.acoa, form: 'kreis', r: 6, n: 5, dauer: 5, pfeil: false },
      atp: { d: 'M540 350C576 350 600 330 622 296', farbe: C.atp, form: 'pille', txt: 'ATP', tf: DUNKEL, r: 9, n: 3, dauer: 3 },
      saeure: { d: ['M240 34H610', 'M610 124H420'], farbe: C.rot, form: 'kreis', txt: 'H⁺', r: 10, n: 6, dauer: 6 },
      glyko: { d: 'M90 244V436', farbe: C.glyko, form: 'sechseck', r: 8, n: 5, dauer: 4 },
    },
    steps: [
      {
        titel: 'Der Ester wird geknackt',
        text: 'Ketonmonoester ist βHB, das an Butandiol gebunden ist. Esterasen spalten das auf; die Leber macht aus dem Butandiol ebenfalls βHB. Binnen Minuten steigt der Ketonspiegel im Blut auf Werte wie nach tagelangem Fasten.',
        flows: { ke: 1, bhb: 0.34, glyko: 1, atp: 0.6 },
      },
      {
        titel: 'βHB geht in den Muskel',
        text: 'β-Hydroxybutyrat nimmt denselben Transporter wie Laktat (MCT) und landet in der Muskelzelle. Dort geht es direkt weiter ins Mitochondrium.',
        flows: { ke: 0.6, bhb: 1, glyko: 1, atp: 0.6 },
      },
      {
        titel: 'Verfeuert im Mitochondrium',
        text: 'Drei Enzymschritte (BDH1 → SCOT → Thiolase) machen aus βHB zwei Acetyl-CoA. Die laufen in den Citratzyklus und liefern ATP. Auf dem Papier: ein Zusatzbrennstoff, der Glykogen sparen könnte.',
        flows: { bhb: 1, zyklus: 1, atp: 1, glyko: 0.8 },
      },
      {
        titel: 'Der Haken',
        text: 'βHB ist eine Säure: Blut-pH und Bicarbonat sinken – schlecht, wenn du am Limit fährst. Zudem bremsen Ketone den Glukose-Abbau, also genau den schnellen Stoffwechselweg für hohe Intensität. Deshalb zeigen die Studien im Rennen: kein Plus, teils ein Minus.',
        flows: { bhb: 1, zyklus: 1, atp: 0.8, saeure: 1, glyko: 0.2 },
      },
    ],
  },

  // ───────────────────────────────────────────────────────── SAUERKIRSCHE
  sauerkirsche: {
    titel: 'Kirsch-Polyphenole dämpfen oxidativen Stress und den Entzündungs-Schalter NF-κB',
    legende: [
      { farbe: '#f0564a', label: 'ROS (oxidativer Stress)' },
      { farbe: C.nfkb, label: 'NF-κB (Entzündungs-Schalter)' },
      { farbe: C.cyto, label: 'Entzündungssignale' },
      { farbe: C.poly, label: 'PP = Kirsch-Polyphenole' },
    ],
    zeichne(id) {
      const ros = [[150, 372], [300, 366], [60, 300], [240, 330], [100, 352], [330, 300], [200, 378], [44, 384], [280, 250], [120, 250], [356, 392]];
      const risse = [120, 210, 290].map((x) => `<path d="M${x} 396l7 12-9 10 8 12-6 12" fill="none" stroke="#fff7f2" stroke-width="3.5" stroke-linejoin="round"/>`).join('');
      return (
        flaeche(0, 0, W, 62, F.blut) +
        flaeche(0, 62, W, H - 62, F.zyto) +
        membran(id, 0, 40, W) +
        kern(482, 316, 128) +
        helix(384, 326, 196) +
        nur('0,3', `<rect x="436" y="310" width="96" height="32" rx="6" fill="#f3e3c0" fill-opacity=".8" stroke="#9c8250" stroke-width="1.6"/>`) +
        nur('1,2', `<rect x="436" y="310" width="96" height="32" rx="6" fill="#ffb199" fill-opacity=".9" stroke="${C.rot}" stroke-width="2.2"/>`) +
        txt(484, 368, 'Entzündungs-Gene', { a: 'middle', fett: true, g: 14 }) +
        faser(30, 394, 340, 54) +
        risse +
        blob(190, 176, 84, 54, { f: '#f9d3ae', r: '#a8581a' }) +
        txt(190, 182, 'NF-κB', { a: 'middle', fett: true, g: 15 }) +
        nur('0', blob(236, 150, 50, 34) + txt(236, 155, 'IκB', { a: 'middle', g: 13 })) +
        rosFeld(ros, 3) +
        zone(16, 22, 'BLUT') +
        zone(16, 104, 'MUSKELZELLE') +
        txt(482, 222, 'Zellkern', { a: 'middle', g: 15 }) +
        txt(200, 470, 'Muskelfaser mit Mikrorissen', { a: 'middle', g: 15 }) +
        nur('0', label(280, 128, 'Bremse (IκB) hält NF-κB fest', [252, 144])) +
        nur('3', txt(190, 232, 'weniger aktiv', { a: 'middle', g: 14, fett: true, f: C.gruen }))
      );
    },
    flows: {
      nfkb: { d: 'M234 180C310 190 380 250 444 304', farbe: C.nfkb, form: 'pille', txt: 'NF-κB', r: 8, n: 4, dauer: 5 },
      signal: { d: ['M520 250C552 190 580 110 596 12', 'M470 240C470 180 440 100 430 12'], farbe: C.cyto, form: 'dreieck', r: 9, n: 6, dauer: 4 },
      poly: { d: ['M60 8C70 70 110 130 156 160', 'M300 8C300 110 260 240 210 350', 'M150 8C130 120 100 240 110 330'], farbe: C.poly, form: 'pille', txt: 'PP', r: 8, n: 6, dauer: 5 },
    },
    steps: [
      {
        titel: 'Harte Einheit, viel Stress',
        text: 'Lange oder sehr harte Belastungen hinterlassen Mikroschäden in der Faser und viele reaktive Sauerstoffverbindungen (ROS). Das ist normal – und ein Teil davon ist sogar das Signal für Anpassung.',
        flows: {},
      },
      {
        titel: 'Der Entzündungs-Schalter kippt',
        text: 'ROS und Zellschäden aktivieren NF-κB. Es wandert in den Zellkern und schaltet Entzündungs-Gene an. Die Zelle funkt Alarmsignale – das spürst du als Muskelkater und Kraftverlust in den Tagen danach.',
        flows: { nfkb: 1, signal: 1 },
      },
      {
        titel: 'Polyphenole kommen an',
        text: 'Aus der Sauerkirsche kommen Anthocyane und andere Polyphenole. Im Blut landen vor allem ihre Abbauprodukte – die sind es wahrscheinlich, die in der Zelle wirken.',
        flows: { nfkb: 1, signal: 1, poly: 1 },
      },
      {
        titel: 'Feuer gedämpft',
        text: 'Vermutete Wirkung: weniger ROS, weniger NF-κB-Aktivität, weniger Entzündungssignale – dazu bessere Durchblutung. Ergebnis in Studien: schnellere Erholung der Muskelfunktion. Der Mechanismus ist plausibel, aber nicht bis ins Detail bewiesen.',
        flows: { nfkb: 0.25, signal: 0.2, poly: 1 },
      },
    ],
  },
};

for (const sz of Object.values(szenen)) {
  sz.w = W;
  sz.h = H;
}
