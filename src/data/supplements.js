// Inhalte des Supplement-Wikis.
// Jede Zahl hier drin hängt an einer Quelle in `quellen`. Preise sind Momentaufnahmen (siehe PREIS_STAND).

import { zusatz } from './zusatz.js';

export const PREIS_STAND = 'November 2026';

// Evidenz-Stufen: A = mehrere Meta-Analysen/Positionspapiere, B = solide, aber situativ, C = dünn oder widersprüchlich
export const EVIDENZ = {
  A: { label: 'Stark', text: 'Mehrere Meta-Analysen und Positionspapiere zeigen in dieselbe Richtung.' },
  B: { label: 'Solide, aber situativ', text: 'Wirkt nachweislich – aber nur in bestimmten Szenarien oder mit kleinem Effekt.' },
  C: { label: 'Dünn / umstritten', text: 'Wenige kleine Studien oder widersprüchliche Ergebnisse.' },
};

const r = (n, d = 0) => {
  const f = 10 ** d;
  return (Math.round(n * f) / f).toLocaleString('de-DE');
};

export const supplements = [
  // ───────────────────────────────────────────────────────────── KOFFEIN
  {
    id: 'koffein',
    name: 'Koffein',
    gruppe: 'Kern-Set',
    claim: 'Der Klassiker: dreht dir im Kopf die Müdigkeits-Bremse raus.',
    farbe: '#35e0c8',
    evidenz: 'A',
    urteil: 'Pflichtprogramm',
    aufEinenBlick: {
      plus: '≈ +3 % Leistung',
      dosis: '3–6 mg/kg',
      timing: '~60 min vorher',
      kosten: 'ab 3 Cent pro Tablette',
    },
    einnahme: {
      wieviel: '3–6 mg pro kg Körpergewicht. Unter 3 mg/kg wird’s unsicher (evtl. reichen 2 mg/kg), ab 9 mg/kg gibt’s nur noch mehr Nebenwirkungen, nicht mehr Leistung.',
      wann: 'Kapseln/Tabletten rund 60 Minuten vor dem Start. Kaugummi geht schneller ins Blut – da reicht deutlich weniger Vorlauf.',
      wie: 'Tablette, Kapsel, Gel, Kaugummi oder schlicht Kaffee. Bei langen Rennen kannst du auch unterwegs nachlegen (Koffein-Gel).',
      achtung: 'Schlaf! Koffein am Nachmittag kann dir die Nacht zerschießen – und Schlaf schlägt jedes Supplement. Manche reagieren mit Herzrasen, Nervosität oder Magen; das ist teils genetisch (Koffein-Abbau). Im Training testen, nie zum ersten Mal im Rennen.',
      rechner: (kg) => `${r(3 * kg)}–${r(6 * kg)} mg Koffein (das sind grob ${r((3 * kg) / 80, 1)}–${r((6 * kg) / 80, 1)} Tassen Filterkaffee à ~80 mg)`,
    },
    anbieter: [
      { name: 'Koffein-Tabletten 200 mg (z. B. vit4ever, 500 Stück)', preis: '14,99 €', pro: '≈ 3 Cent pro Tablette', quelle: 'https://vitaminversand24.com/Koffein_500' },
      { name: 'Sponser Caffeine Caps (90 × 50 mg, fein dosierbar)', preis: '19,90 €', pro: '≈ 22 Cent pro Kapsel', quelle: 'https://sponser.de/collections/all/products/caffeine-caps' },
      { name: 'Kaffee / Koffein-Gels', preis: 'hast du eh', pro: 'Gehalt schwankt – Tabletten sind genauer', quelle: null },
    ],
    studien: {
      leistungsplus: 'Im Schnitt +3,0 % mittlere Leistung und 2,2 % schnellere Zeitfahr-Zeit gegenüber Placebo (Meta-Analyse, 46 Studien). Die Streuung ist groß: Einzelne Studien fanden sogar langsamere Zeiten.',
      punkte: [
        'Positionspapier ISSN 2021: Ausdauer ist die Belastungsform mit dem verlässlichsten Koffein-Effekt.',
        'Funktioniert bei Trainierten und Untrainierten; wie stark, ist individuell (u. a. Genetik, Gewöhnung).',
        'IOC-Konsens 2018: eines der wenigen Supplemente mit guter Evidenz.',
      ],
    },
    empfehlung: 'Nimm’s. Billig, gut erforscht, spürbar. Fang bei 3 mg/kg an, teste im Training und geh nur höher, wenn du es verträgst. Für Rennen am Abend: abwägen, was dir der Schlaf danach wert ist.',
    quellen: [
      { kurz: 'Guest et al. 2021', titel: 'ISSN position stand: caffeine and exercise performance', journal: 'J Int Soc Sports Nutr 18:1', url: 'https://doi.org/10.1186/s12970-020-00383-4' },
      { kurz: 'Southward et al. 2018', titel: 'The effect of acute caffeine ingestion on endurance performance: a systematic review and meta-analysis', journal: 'Sports Med 48:1913–1928', url: 'https://doi.org/10.1007/s40279-018-0939-8' },
      { kurz: 'Maughan et al. 2018', titel: 'IOC consensus statement: dietary supplements and the high-performance athlete', journal: 'Br J Sports Med 52:439–455', url: 'https://doi.org/10.1136/bjsports-2018-099027' },
    ],
    mechanismus: {
      ort: 'Nervenzelle im Gehirn',
      kurz: 'Koffein sieht für den Adenosin-Rezeptor fast aus wie Adenosin – setzt sich drauf, drückt aber den „Müde“-Knopf nicht.',
    },
  },

  // ───────────────────────────────────────────────────────────── NITRAT
  {
    id: 'nitrat',
    name: 'Nitrat (Rote Bete)',
    gruppe: 'Kern-Set',
    claim: 'Mehr Watt pro Liter Sauerstoff – über den Umweg deiner Zungenbakterien.',
    farbe: '#ff4f8b',
    evidenz: 'B',
    urteil: 'Situativ stark',
    aufEinenBlick: {
      plus: 'klein (d ≈ 0,17)',
      dosis: '8–16 mmol (≈ 500–1000 mg)',
      timing: '2–4 h vorher',
      kosten: '≈ 2,70 € pro Shot',
    },
    einnahme: {
      wieviel: 'Akut 8–16 mmol Nitrat (≈ 500–1000 mg), also meist 2 konzentrierte Shots. Oder mehrere Tage am Stück 4–16 mmol pro Tag, letzte Dosis vor der Belastung.',
      wann: '2–4 Stunden vor dem Start – so lange braucht der Umweg über Speichel und Bakterien.',
      wie: 'Rote-Bete-Konzentrat (Shot) oder nitratreiches Gemüse (Rucola, Spinat, Rote Bete). Das Experten-Panel rät aus Sicherheitsgründen ausdrücklich zu Gemüse/Saft statt Nitrat-Salzen.',
      achtung: 'Kein antibakterielles Mundwasser rund um die Einnahme: Die Mundbakterien machen den ersten Reaktionsschritt, ohne sie verpufft der Shot. Roter Urin/Stuhl ist harmlos. Zwei Shots liegen deutlich über dem ADI-Wert für Nitrat (3,7 mg/kg/Tag) – also gezielt für Key-Sessions und Rennen, nicht als Dauergetränk.',
      rechner: () => '≈ 500–1000 mg Nitrat – unabhängig vom Körpergewicht. Ein Beet-It-Shot hat 400 mg (≈ 6,5 mmol): also 2 Shots.',
    },
    anbieter: [
      { name: 'Beet It Sport Nitrate 400 (15 × 70 ml, 400 mg Nitrat pro Shot)', preis: '39,90 €', pro: '≈ 2,66 € pro Shot', quelle: 'https://www.nutri-direct.com/shop/beet-it-sport-nitrate-400-shot/' },
      { name: 'Rote-Bete-Saft aus dem Supermarkt', preis: '≈ 2–3 € pro Liter (Richtwert)', pro: 'Nitratgehalt schwankt stark, nicht standardisiert', quelle: null },
    ],
    studien: {
      leistungsplus: 'Über 80 Studien gemittelt ein kleiner, aber klarer Effekt (d = 0,17). Greift vor allem bei „Durchhalten bis zur Erschöpfung“; für Zeitfahren ist der Effekt in Meta-Analysen nicht gesichert. Je fitter du bist (VO2peak > 60 ml/kg/min), desto weniger kommt an.',
      punkte: [
        'Senkt den Sauerstoffverbrauch bei gleicher Leistung leicht (−0,04 l/min in der gepoolten Analyse).',
        'Meta-Analyse 2021: Leistung und Zeit bis zur Erschöpfung besser, Zeitfahr-Zeit nicht signifikant.',
        'Experten-Konsens 2022: Akut bis ~16 mmol gilt als sicher; Langzeit-Sicherheit hoher Dosen ist offen.',
      ],
    },
    empfehlung: 'Lohnt sich am ehesten, wenn du (noch) kein Elite-Level hast und es um intensive Belastungen von einigen Minuten bis ~30 min geht. Als Hochtrainierter: ausprobieren, aber keine Wunder erwarten. Mundwasser weglassen, sonst zahlst du für rote Limo.',
    quellen: [
      { kurz: 'Senefeld et al. 2020', titel: 'Ergogenic effect of nitrate supplementation: a systematic review and meta-analysis', journal: 'Med Sci Sports Exerc 52:2250–2261', url: 'https://doi.org/10.1249/MSS.0000000000002363' },
      { kurz: 'Gao et al. 2021', titel: 'The effects of dietary nitrate supplementation on endurance exercise performance and cardiorespiratory measures in healthy adults', journal: 'J Int Soc Sports Nutr 18:55', url: 'https://doi.org/10.1186/s12970-021-00450-4' },
      { kurz: 'Shannon et al. 2022', titel: 'Dietary inorganic nitrate as an ergogenic aid: an expert consensus derived via the modified Delphi technique', journal: 'Sports Med 52:2537–2558', url: 'https://doi.org/10.1007/s40279-022-01701-3' },
    ],
    mechanismus: {
      ort: 'Zunge → Blut → Muskelzelle',
      kurz: 'Nitrat (NO₃⁻) wird von Bakterien zu Nitrit (NO₂⁻) und im arbeitenden Muskel zu Stickstoffmonoxid (NO) – das macht Mitochondrien sparsamer und Gefäße weiter.',
    },
  },

  // ───────────────────────────────────────────────────────────── BICARBONAT
  {
    id: 'bicarbonat',
    name: 'Natriumbicarbonat',
    gruppe: 'Kern-Set',
    claim: 'Backpulver-Prinzip: Säure raus aus dem Muskel, bevor sie dich ausbremst.',
    farbe: '#5aa9ff',
    evidenz: 'A',
    urteil: 'Situativ stark',
    aufEinenBlick: {
      plus: 'klein–moderat bei 30 s–12 min',
      dosis: '0,2–0,3 g/kg',
      timing: '60–180 min vorher',
      kosten: 'Cents (Natron) bis ≈ 17,50 € (Maurten)',
    },
    einnahme: {
      wieviel: '0,3 g pro kg Körpergewicht gilt als optimal, 0,2 g/kg ist das Minimum. Mehr (0,4–0,5 g/kg) bringt als Einzeldosis nichts außer mehr Magenproblemen.',
      wann: '60–180 Minuten vor der Belastung. Alternative: 3–7 Tage laden (0,4–0,5 g/kg pro Tag, auf die Mahlzeiten verteilt) – dann ist der Wettkampftag magenfreundlicher.',
      wie: 'Mit einer kohlenhydratreichen Mahlzeit, eher 180 min vorher und in kleinen Portionen – oder magensaftresistent verkapselt. Das senkt das Risiko für Magen-Darm-Stress.',
      achtung: 'Blähungen, Übelkeit, Durchfall sind die typischen Nebenwirkungen – unbedingt im Training testen. Außerdem: ordentlich Natrium (bei 0,3 g/kg und 75 kg gut 6 g Natrium).',
      rechner: (kg) => `${r(0.2 * kg, 1)}–${r(0.3 * kg, 1)} g Natriumbicarbonat (optimal: ${r(0.3 * kg, 1)} g)`,
    },
    anbieter: [
      { name: 'Maurten Bicarb System (4 Portionen, Hydrogel + Mini-Tabletten)', preis: '69,95 €', pro: '≈ 17,50 € pro Portion', quelle: 'https://www.maurten.com/de/products/de/bicarb' },
      { name: 'Haushalts-Natron (z. B. Kaiser Natron) aus der Drogerie', preis: '≈ 1–2 € pro Packung (Richtwert)', pro: 'wenige Cent pro Dosis, aber härter für den Magen', quelle: null },
    ],
    studien: {
      leistungsplus: 'Verbessert die Leistung bei hochintensiven Belastungen von 30 s bis 12 min – einzeln und in wiederholten Intervallen. Laut ISSN ist ein Teil des Effekts Placebo. Für lange, gleichmäßige Ausdauer allein bringt es wenig; spannend wird es für Attacken, Endspurt und kurze Zeitfahren.',
      punkte: [
        'Positionspapier ISSN 2021: wirkt bei Männern und Frauen, 0,3 g/kg ist die Referenzdosis.',
        'Kombi mit Kreatin oder Beta-Alanin kann sich addieren.',
        'In einer kleinen Studie (n = 9) hat Bicarbonat die Säurelast von Ketonester ausgeglichen und so ~5 % mehr Leistung im 15-min-Finale gebracht.',
      ],
    },
    empfehlung: 'Stark für alles, was richtig brennt: Bahn, Kriterium, Bergsprint, 1500 m bis 5 km, HYROX-Finish. Der Magen entscheidet – wer es verträgt, hat einen echten Hebel. Erst mit Natron im Training testen, bevor du 70 € für die Edel-Variante ausgibst.',
    quellen: [
      { kurz: 'Grgic et al. 2021', titel: 'ISSN position stand: sodium bicarbonate and exercise performance', journal: 'J Int Soc Sports Nutr 18:61', url: 'https://doi.org/10.1186/s12970-021-00458-w' },
      { kurz: 'Poffé et al. 2021', titel: 'Bicarbonate unlocks the ergogenic action of ketone monoester intake in endurance exercise', journal: 'Med Sci Sports Exerc 53:431–441', url: 'https://doi.org/10.1249/MSS.0000000000002467' },
      { kurz: 'Maughan et al. 2018', titel: 'IOC consensus statement: dietary supplements and the high-performance athlete', journal: 'Br J Sports Med 52:439–455', url: 'https://doi.org/10.1136/bjsports-2018-099027' },
    ],
    mechanismus: {
      ort: 'Muskelzelle und Blut',
      kurz: 'Mehr Bicarbonat (HCO₃⁻) im Blut zieht H⁺ und Laktat schneller aus der Muskelzelle. Draußen wird H⁺ abgefangen und als CO₂ abgeatmet.',
    },
  },

  // ───────────────────────────────────────────────────────────── BETA-ALANIN
  {
    id: 'beta-alanin',
    name: 'Beta-Alanin',
    gruppe: 'Kern-Set',
    claim: 'Baut dir über Wochen einen Säurepuffer direkt in die Muskelfaser.',
    farbe: '#ffc145',
    evidenz: 'B',
    urteil: 'Situativ stark',
    aufEinenBlick: {
      plus: '≈ +2,9 % (Median), v. a. 1–4 min',
      dosis: '4–6 g pro Tag',
      timing: 'täglich, ≥ 4 Wochen',
      kosten: '≈ 20–30 Cent pro Tag',
    },
    einnahme: {
      wieviel: '4–6 g pro Tag, aufgeteilt in Einzeldosen von höchstens 2 g.',
      wann: 'Zeitpunkt egal – es zählt die Summe über Wochen. Nach 2 Wochen ist ~20–30 % mehr Carnosin im Muskel, nach 4 Wochen 40–60 %.',
      wie: 'Pulver oder Kapseln zu den Mahlzeiten. Retard-Präparate kribbeln weniger.',
      achtung: 'Kribbeln auf der Haut (Parästhesie) ist die einzige berichtete Nebenwirkung – harmlos, aber nervig. Kleine Einzeldosen (1,6 g) oder Retard-Form helfen. Langzeitdaten über ein Jahr hinaus fehlen.',
      rechner: () => '4–6 g pro Tag – unabhängig vom Körpergewicht, z. B. 3–4 × 1,6 g. In 4 Wochen sind das rund 110–170 g.',
    },
    anbieter: [
      { name: 'ESN Beta-Alanin Pulver 500 g', preis: '22,90 €', pro: '≈ 18–27 Cent pro Tag (4–6 g)', quelle: 'https://www.nutrition-base.com/products/esn-beta-alanin-500g' },
      { name: 'Retard-Tabletten (sustained release, diverse Marken)', preis: 'teurer (Richtwert: 2–3× Pulverpreis)', pro: 'weniger Kribbeln', quelle: null },
    ],
    studien: {
      leistungsplus: 'Median +2,85 % in Belastungstests (15 Studien); Gesamt-Effektstärke 0,18 über 40 Studien. Am stärksten bei Belastungen von 0,5–10 min; bei längeren Sachen kaum noch messbar. Wirkt eher auf „länger durchhalten“ als auf „schneller sein“.',
      punkte: [
        'Positionspapier ISSN 2015: deutlichste Effekte bei 1–4 min All-out.',
        'Zusammen mit Natriumbicarbonat war der Effekt in der Meta-Analyse am größten (0,43).',
        'Für Ausdauer über 25 min ist die Datenlage laut ISSN noch zu dünn.',
      ],
    },
    empfehlung: 'Sinnvoll, wenn dein Sport harte 1–10-Minuten-Blöcke hat: Verfolgung, Kriterium, Crossrennen, HYROX-Stationen, Bergsprints. Für reines Grundlagen-Kilometerfressen kannst du es dir sparen. Wenn, dann konsequent mindestens 4 Wochen.',
    quellen: [
      { kurz: 'Trexler et al. 2015', titel: 'ISSN position stand: beta-alanine', journal: 'J Int Soc Sports Nutr 12:30', url: 'https://doi.org/10.1186/s12970-015-0090-y' },
      { kurz: 'Saunders et al. 2017', titel: 'β-alanine supplementation to improve exercise capacity and performance: a systematic review and meta-analysis', journal: 'Br J Sports Med 51:658–669', url: 'https://doi.org/10.1136/bjsports-2016-096396' },
      { kurz: 'Hobson et al. 2012', titel: 'Effects of β-alanine supplementation on exercise performance: a meta-analysis', journal: 'Amino Acids 43:25–37', url: 'https://doi.org/10.1007/s00726-011-1200-z' },
    ],
    mechanismus: {
      ort: 'Muskelzelle',
      kurz: 'Beta-Alanin ist der Engpass-Baustein für Carnosin. Mehr Carnosin = mehr Puffer, der H⁺ direkt in der Faser abfängt.',
    },
  },

  // ───────────────────────────────────────────────────────────── KREATIN
  {
    id: 'kreatin',
    name: 'Kreatin',
    gruppe: 'Kern-Set',
    claim: 'Die Schnelllade-Powerbank für Attacken, Antritte und den Zielsprint.',
    farbe: '#b9c7ff',
    evidenz: 'B',
    urteil: 'Nice to have',
    aufEinenBlick: {
      plus: 'für Antritte ja, fürs Zeitfahren gemischt',
      dosis: '3–5 g pro Tag',
      timing: 'täglich, egal wann',
      kosten: '≈ 15–30 Cent pro Tag',
    },
    einnahme: {
      wieviel: '3–5 g Kreatin-Monohydrat pro Tag. Wer es eilig hat: 5–7 Tage laden mit ~0,3 g/kg pro Tag (4 Portionen), danach 3–5 g.',
      wann: 'Egal – Hauptsache jeden Tag. Ohne Ladephase sind die Speicher nach rund 4 Wochen voll.',
      wie: 'Monohydrat-Pulver in Wasser oder ins Müsli. Zusammen mit Kohlenhydraten füllt Kreatin auch die Glykogenspeicher besser auf.',
      achtung: 'Meist 1–2 kg mehr auf der Waage (Wasser in der Muskulatur). Am Berg und beim Laufen kann das den Vorteil auffressen. Ladephase kann auf den Magen schlagen – dann einfach ohne laden.',
      rechner: (kg) => `Dauerhaft 3–5 g pro Tag. Optionale Ladephase: ${r(0.3 * kg)} g pro Tag für 5–7 Tage, verteilt auf 4 Portionen.`,
    },
    anbieter: [
      { name: 'ESN Ultrapure Creatine Monohydrate 500 g', preis: '≈ 23–30 €', pro: '≈ 15–30 Cent pro Tag', quelle: 'https://geizhals.de/esn-ultrapure-creatine-monohydrate-500g-a2388178.html' },
      { name: 'Creapure-Produkte (Rohstoff aus Deutschland, diverse Marken)', preis: '≈ 22–40 € pro 500–600 g', pro: 'gleicher Wirkstoff, zertifizierte Reinheit', quelle: 'https://www.ebay.de/p/15021664759' },
    ],
    studien: {
      leistungsplus: 'Kein klares Plus im gleichmäßigen Zeitfahren (Ergebnisse gemischt). Aber: längere Zeit bis zur Erschöpfung bei hoher Intensität und mehr Punch bei wiederholten Antritten und im Endspurt – also in den Momenten, die Rennen entscheiden.',
      punkte: [
        'Review 2023: Nutzen vor allem in Sportarten mit Tempowechseln (Radrennen, MTB, Triathlon, Langlauf).',
        'Mehr Körpermasse kann den Effekt in gewichtstragenden Disziplinen ausgleichen.',
        'ISSN 2017: Monohydrat ist die am besten untersuchte Form; bei Gesunden in üblicher Dosis sicher.',
      ],
    },
    empfehlung: 'Für Kriterien, Rundstrecke, Cross, HYROX und alle, die nebenbei Kraft trainieren: klares Ja. Für Bergfahrer und Läufer, bei denen jedes Kilo zählt: abwägen und in der Off-Season testen. Billig ist es sowieso.',
    quellen: [
      { kurz: 'Forbes et al. 2023', titel: 'Creatine supplementation and endurance performance: surges and sprints to win the race', journal: 'J Int Soc Sports Nutr 20:2204071', url: 'https://doi.org/10.1080/15502783.2023.2204071' },
      { kurz: 'Kreider et al. 2017', titel: 'ISSN position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine', journal: 'J Int Soc Sports Nutr 14:18', url: 'https://doi.org/10.1186/s12970-017-0173-z' },
      { kurz: 'Maughan et al. 2018', titel: 'IOC consensus statement: dietary supplements and the high-performance athlete', journal: 'Br J Sports Med 52:439–455', url: 'https://doi.org/10.1136/bjsports-2018-099027' },
    ],
    mechanismus: {
      ort: 'Muskelzelle',
      kurz: 'Mehr Kreatin = mehr Phosphokreatin (PCr). PCr lädt verbrauchtes ADP in Millisekunden wieder zu ATP auf – genau dann, wenn du antrittst.',
    },
  },

  // ───────────────────────────────────────────────────────────── KOHLENHYDRATE
  {
    id: 'kohlenhydrate',
    name: 'Kohlenhydrate (Glukose + Fruktose)',
    gruppe: 'Kern-Set',
    claim: 'Zwei Zuckerarten, zwei Türen im Darm – so passen bis zu 120 g pro Stunde durch.',
    farbe: '#ffe14d',
    evidenz: 'A',
    urteil: 'Pflichtprogramm',
    aufEinenBlick: {
      plus: 'groß – ab ~1 h der wichtigste Hebel',
      dosis: '60–90 g/h (bis 120 g/h)',
      timing: 'ab Start, alle 15–20 min',
      kosten: '≈ 0,50–4 € pro Stunde',
    },
    einnahme: {
      wieviel: 'Bis ~1 h: wenig bis nichts (Mundspülung reicht). 1–2 h: ~30 g/h. 2–3 h: bis 60 g/h. Über 2,5 h: bis 90 g/h – dann zwingend als Glukose-Fruktose-Mix. 120 g/h geht, wenn dein Darm es gelernt hat.',
      wann: 'Von Anfang an und regelmäßig, nicht erst, wenn der Tank leer ist.',
      wie: 'Glukose/Maltodextrin bei rund 60 g/h deckeln, Fruktose obendrauf. Bei 90 g/h passt 2:1, bei ~120 g/h eher 1:0,8. Drink, Gel, Gummis – die Form ist egal, die Oxidationsrate war in der Studie vergleichbar.',
      achtung: 'Darm trainieren! Hohe Mengen im Training üben, sonst gibt’s im Rennen Magenkrämpfe. Über 90 g/h wird zwar mehr „Fremd-Zucker“ verbrannt, aber das eigene Glykogen wird dadurch nicht zusätzlich geschont – ein Leistungsvorteil von 120 gegenüber 90 g/h ist nicht belegt.',
      rechner: () => 'Unabhängig vom Körpergewicht: 60 g/h Glukose/Maltodextrin + 30–55 g/h Fruktose bei langen Einheiten.',
    },
    anbieter: [
      { name: 'Selbst mischen: Maltodextrin + Fruktose (oder Haushaltszucker = 1:1)', preis: '≈ 3–8 € pro kg (Richtwert)', pro: '≈ 0,30–0,80 € pro Stunde', quelle: null },
      { name: 'Fertig-Mix mit 1:0,8 (z. B. Maurten Drink Mix 320, Gels diverser Marken)', preis: '≈ 3–4 € pro Portion (Richtwert)', pro: '≈ 3–5 € pro Stunde', quelle: null },
    ],
    studien: {
      leistungsplus: 'Kohlenhydrate während langer Belastungen sind der am besten belegte Leistungshebel überhaupt. Mit 120 statt 90 g/h stieg die Verbrennung von zugeführtem Zucker von 1,29 auf 1,51 g/min – ein zusätzlicher Leistungsgewinn ist dafür aber (noch) nicht gezeigt.',
      punkte: [
        'Eine einzelne Zuckerart wird mit maximal ~60 g/h verbrannt – mehr schafft der Glukose-Transporter SGLT1 nicht.',
        '120 g/h als Drink, Gel oder Gummi wurden von trainierten Sportlern ohne nennenswerte Magenprobleme vertragen (n = 9).',
        'Empfehlungen gelten unabhängig von Körpergewicht und Trainingszustand, hängen aber von Dauer und Intensität ab.',
      ],
    },
    empfehlung: 'Das ist kein „Supplement“, das ist Sprit. Alles über 90 Minuten: füttern. Fang mit 60 g/h an und arbeite dich im Training Richtung 90 g/h mit Glukose-Fruktose-Mix hoch. 120 g/h nur, wenn du es verträgst – der Zusatznutzen ist offen.',
    quellen: [
      { kurz: 'Jeukendrup 2014', titel: 'A step towards personalized sports nutrition: carbohydrate intake during exercise', journal: 'Sports Med 44 (Suppl 1):S25–S33', url: 'https://doi.org/10.1007/s40279-014-0148-z' },
      { kurz: 'Podlogar et al. 2022', titel: 'Increased exogenous but unaltered endogenous carbohydrate oxidation with combined fructose-maltodextrin ingested at 120 g/h versus 90 g/h at different ratios', journal: 'Eur J Appl Physiol 122:2393–2401', url: 'https://doi.org/10.1007/s00421-022-05019-w' },
      { kurz: 'Hearris et al. 2022', titel: '13C-glucose-fructose labeling reveals comparable exogenous CHO oxidation during exercise when consuming 120 g/h in fluid, gel, jelly chew, or coingestion', journal: 'J Appl Physiol 132:1394–1406', url: 'https://doi.org/10.1152/japplphysiol.00091.2022' },
    ],
    mechanismus: {
      ort: 'Darmzelle (Enterozyt)',
      kurz: 'Glukose nimmt die Tür SGLT1, Fruktose die Tür GLUT5. Ist SGLT1 voll, staut sich Glukose – Fruktose läuft trotzdem durch.',
    },
  },

  // ───────────────────────────────────────────────────────────── ITC / NOMIO
  {
    id: 'itc',
    name: 'ITC / Brokkolisprossen (Nomio)',
    gruppe: 'Trend',
    claim: 'Der Brokkoli-Shot: schaltet über NRF2 das zelleigene Schutzprogramm an.',
    farbe: '#b6f24a',
    evidenz: 'C',
    urteil: 'Spannend, aber abwarten',
    aufEinenBlick: {
      plus: 'Laktat −0,3 bis −0,4 mmol/l; Leistung offen',
      dosis: '1 Shot (60 ml)',
      timing: '~3 h vor harter Einheit',
      kosten: '≈ 5,50 € pro Shot',
    },
    einnahme: {
      wieviel: '1 Shot (60 ml) laut Hersteller. In den Studien: akut 37,5 g oder 75 g glucosinolatreiche Sprossen; im Trainingsblock 75 g zweimal täglich über 7 Tage.',
      wann: 'In der Akut-Studie 3 Stunden vor der Belastung. Ob früher (Vorabend) besser ist, wird gerade erst untersucht.',
      wie: 'Als Shot runterkippen (schmeckt nach Zitrone mit Brokkoli-Abgang). Günstige Alternative: frische Brokkolisprossen selbst ziehen und mixen – die Dosis ist dann aber Glückssache.',
      achtung: 'Mehr ist nicht besser: In der Akut-Studie wirkte die kleinere Dosis stärker (U-förmige Kurve). ITC erzeugen kurzzeitig selbst leichten oxidativen Stress – das ist der Trick, kein Fehler. Ob Dauergebrauch Trainingsanpassungen verändert, weiß niemand.',
      rechner: () => '1 Shot (60 ml) – unabhängig vom Körpergewicht. Laut Hersteller entspricht das dem ITC-Gehalt von 2,5–3 kg Brokkoli.',
    },
    anbieter: [
      { name: 'Nomio Shot Box (4 × 60 ml)', preis: '21,95 €', pro: '≈ 5,49 € pro Shot', quelle: 'https://www.nutri-bay.com/de-de/products/nomio-shot-box-4x60ml' },
      { name: 'Nomio Shot Box bei LaPrimaFit (4 × 60 ml)', preis: '22,95 €', pro: '≈ 5,74 € pro Shot', quelle: 'https://www.laprimafit.com/de/leistung/no-booster/nomio-shot-60-ml' },
      { name: 'Brokkolisprossen selbst ziehen (Saatgut)', preis: 'wenige Euro (Richtwert)', pro: 'Cents pro Portion, Gehalt unbekannt', quelle: null },
    ],
    studien: {
      leistungsplus: 'Gemessen ist vor allem weniger Laktat bei gleicher Leistung: −0,4 mmol/l nahe der Schwelle (37,5 g) bzw. −0,25 mmol/l (75 g). Niedrigeres Laktat heißt aber nicht automatisch schneller – Leistung wurde in der Akut-Studie gar nicht getestet. Eine unabhängige Studie mit Brokkolipulver fand keinen Effekt.',
      punkte: [
        'Flockhart 2023 (n = 9, 7 Tage hartes Intervalltraining): weniger oxidativ geschädigte Proteine im Muskel, weniger Laktat, weniger nächtliche Unterzuckerungen, bessere Leistung im Stufentest – unter Placebo unverändert.',
        'Vinge 2026 (n = 15, Einzeldosis, inzwischen peer-reviewed): weniger Laktat bei zwei submaximalen Stufen. Warum, ist ungeklärt.',
        'Cesanelli 2026 (n = 17, unabhängig, 2 Wochen Brokkolipulver): Sulforaphan kam nachweislich im Körper an, aber kein Effekt auf Laktat, oxidativen Stress, Leistung oder Erholung. Anderes Produkt, deutlich geringere Dosis.',
        'Einordnung: Die positiven Studien stammen aus der Arbeitsgruppe, deren Leiter Nomio mitgegründet haben.',
      ],
    },
    empfehlung: 'Mechanismus plausibel, erste Daten interessant – aber winzige Studien, fast alles aus dem Hersteller-Umfeld, und der Leistungsbeweis fehlt. Wenn du Laktat misst und Spaß am Experimentieren hast: an harten Tagen testen. Wenn du einfach schneller werden willst: Das Geld ist bei Kohlenhydraten und Koffein besser angelegt.',
    quellen: [
      { kurz: 'Flockhart et al. 2023', titel: 'Glucosinolate-rich broccoli sprouts protect against oxidative stress and improve adaptations to intense exercise training', journal: 'Redox Biol 67:102873', url: 'https://doi.org/10.1016/j.redox.2023.102873' },
      { kurz: 'Vinge et al. 2026', titel: 'Effects of a glucosinolate-rich beverage on blood lactate concentrations during submaximal exercise', journal: 'Physiol Rep 14:e71081', url: 'https://doi.org/10.14814/phy2.71081' },
      { kurz: 'Cesanelli et al. 2026', titel: 'Effects of short-term broccoli powder supplementation on acute oxidative stress and recovery following a metabolically demanding exercise session', journal: 'Antioxidants 15:379', url: 'https://doi.org/10.3390/antiox15030379' },
    ],
    mechanismus: {
      ort: 'Muskelzelle: Zytoplasma → Zellkern',
      kurz: 'ITC (z. B. Sulforaphan) hängt sich an den Sensor KEAP1. Der lässt daraufhin NRF2 los – NRF2 wandert in den Zellkern und schaltet Schutz-Gene an.',
    },
  },

  // ───────────────────────────────────────────────────────────── KETONESTER
  {
    id: 'ketonester',
    name: 'Ketonester',
    gruppe: 'Trend',
    claim: 'Der „vierte Brennstoff“ aus der Flasche – teuer, und im Rennen eher Bremse als Turbo.',
    farbe: '#c49bff',
    evidenz: 'C',
    urteil: 'Fürs Rennen: sparen',
    aufEinenBlick: {
      plus: 'akut ≈ 0 (teils negativ)',
      dosis: '25 g pro Portion (Studien)',
      timing: 'wenn, dann nach dem Training',
      kosten: '≈ 25–35 € pro Portion',
    },
    einnahme: {
      wieviel: 'In den Studien meist 25 g Ketonmonoester pro Portion (bzw. gewichtsbezogen).',
      wann: 'Vor/im Rennen bringt es nach aktueller Datenlage nichts. Das Erholungs-Protokoll aus Leuven: direkt nach dem Training und noch einmal vor dem Schlafen, während eines sehr harten Trainingsblocks.',
      wie: 'Flüssig, pur oder verdünnt. Schmeckt … speziell (bitter, chemisch).',
      achtung: 'Ketonester säuert das Blut an (pH und Bicarbonat sinken) und dämpft den Appetit – beides ungünstig, wenn du Vollgas fahren oder auftanken willst. Übelkeit kommt vor. Ketonsalze sind etwas anderes und heben den Ketonspiegel deutlich schwächer.',
      rechner: () => 'Studienüblich: 25 g pro Portion, unabhängig vom Körpergewicht. Bei ~30 € pro Portion kostet eine Trainingslager-Woche mit 2 Portionen täglich rund 420 €.',
    },
    anbieter: [
      { name: 'KetoneAid Ke4 (3 Flaschen à 30 g Ketonester)', preis: '89,95 US-$', pro: '≈ 30 US-$ pro Flasche, plus Versand/Zoll', quelle: 'https://shop.ketoneaid.com/products/ke4-pro' },
      { name: 'deltaG (25 g Ketonester pro Flasche)', preis: '≈ 24–39 US-$ pro Flasche', pro: 'je nach Abo', quelle: 'https://outliyr.com/best-exogenous-ketone-supplements' },
    ],
    studien: {
      leistungsplus: 'Zwei Meta-Analysen: kein Effekt auf die Ausdauerleistung (Hedges g = −0,05 bzw. +0,14, beides nicht signifikant). In einem 30-min-Zeitfahren war die Leistung mit Ketonester sogar leicht schlechter – auch mit Bicarbonat dazu.',
      punkte: [
        'Erholung: In einem 3-wöchigen Überlastungsblock dämpfte Ketonester nach dem Training Übertrainings-Symptome und die Leistung am Ende war besser (eine Studie, eine Arbeitsgruppe).',
        'Ketonester + Bicarbonat brachte ~5 % mehr Leistung im 15-min-Finale nach 3 h Fahrt (n = 9) – die Folgestudie mit 30-min-Zeitfahren bestätigte das nicht.',
        'Alle Studien zeigen: Der Blutketonspiegel steigt zuverlässig. Nur schneller macht das eben nicht.',
      ],
    },
    empfehlung: 'Als Renn-Booster nach heutigem Stand rausgeworfenes Geld. Interessant höchstens für die Erholung in extremen Belastungsblöcken (Etappenrennen, Trainingslager) – und selbst das steht auf wenigen Studien. Für Amateure gilt: erst Schlaf, Kohlenhydrate und Protein ausreizen.',
    quellen: [
      { kurz: 'Valenzuela et al. 2020', titel: 'Acute ketone supplementation and exercise performance: a systematic review and meta-analysis of randomized controlled trials', journal: 'Int J Sports Physiol Perform 15:298–308', url: 'https://doi.org/10.1123/ijspp.2019-0918' },
      { kurz: 'Brooks et al. 2022', titel: 'Acute ingestion of ketone monoesters and precursors do not enhance endurance exercise performance: a systematic review and meta-analysis', journal: 'Int J Sport Nutr Exerc Metab 32:214–225', url: 'https://doi.org/10.1123/ijsnem.2021-0280' },
      { kurz: 'Poffé et al. 2019', titel: 'Ketone ester supplementation blunts overreaching symptoms during endurance training overload', journal: 'J Physiol 597:3009–3027', url: 'https://doi.org/10.1113/JP277831' },
      { kurz: 'Poffé et al. 2021', titel: 'Exogenous ketosis impairs 30-min time-trial performance independent of bicarbonate supplementation', journal: 'Med Sci Sports Exerc 53:1068–1078', url: 'https://doi.org/10.1249/MSS.0000000000002552' },
    ],
    mechanismus: {
      ort: 'Blut → Muskelzelle → Mitochondrium',
      kurz: 'Der Ester wird zu β-Hydroxybutyrat (βHB) gespalten. βHB geht über MCT-Transporter in die Zelle und wird im Mitochondrium zu Acetyl-CoA verfeuert.',
    },
  },

  // ───────────────────────────────────────────────────────────── SAUERKIRSCHE
  {
    id: 'sauerkirsche',
    name: 'Polyphenole (Sauerkirsche)',
    gruppe: 'Trend',
    claim: 'Montmorency-Kirsche: dämpft das Feuer nach harten Einheiten.',
    farbe: '#e0457b',
    evidenz: 'B',
    urteil: 'Nice to have',
    aufEinenBlick: {
      plus: 'klein–moderat (SMD 0,36)',
      dosis: '2 × 30 ml Konzentrat',
      timing: 'einige Tage vor bis Wettkampf',
      kosten: '≈ 1,20–1,60 € pro 30 ml',
    },
    einnahme: {
      wieviel: 'In den Studien meist 60–90 ml Sauerkirsch-Konzentrat pro Tag (verdünnt), also 2 × 30 ml – oder 200–500 mg Pulver/Kapseln.',
      wann: 'Typisch: einige Tage vor dem Wettkampf starten (bis zu 7 Tage), letzte Portion etwa 1,5 h vorher, und in den Tagen danach weiter.',
      wie: 'Konzentrat mit Wasser mischen. Achte auf Montmorency-Sauerkirsche – damit wurde fast die gesamte Forschung gemacht.',
      achtung: 'Rund um Wettkämpfe und Blöcke mit kurzer Erholungszeit sinnvoll. Als Dauerlösung im Aufbautraining eher nicht: Oxidativer Stress ist auch ein Trainingssignal, und ob ständiges Dämpfen Anpassungen kostet, ist offen. 60 ml Konzentrat bringen außerdem Zucker mit.',
      rechner: () => '2 × 30 ml Konzentrat pro Tag – unabhängig vom Körpergewicht. Eine 946-ml-Flasche reicht für ~15 Tage.',
    },
    anbieter: [
      { name: 'CherryActive Konzentrat 946 ml (Montmorency)', preis: '≈ 38–50 € (in DE meist ~50 € inkl. Versand)', pro: '≈ 1,20–1,60 € pro 30 ml', quelle: 'http://www.suchepreise.de/search.php?q=montmorency+konzentrat' },
      { name: 'cherry PLUS Montmorency Sauerkirsch-Konzentrat', preis: 'ab ≈ 23 € pro Flasche', pro: 'je nach Flaschengröße', quelle: 'http://www.suchepreise.de/search.php?q=montmorency+konzentrat' },
    ],
    studien: {
      leistungsplus: 'Meta-Analyse über 10 Studien (147 Teilnehmende): kleiner bis moderater Leistungsvorteil in Ausdauertests (SMD 0,36; 95 %-KI 0,07–0,64). Einzeln fanden aber nur 2 der 10 Studien einen signifikanten Effekt – das Plus entsteht erst beim Zusammenlegen.',
      punkte: [
        'Keine Dosis-Wirkungs-Beziehung gefunden: Die optimale Menge ist unklar.',
        'Der Effekt war bei den am wenigsten Trainierten am kleinsten.',
        'Die Erholungswirkung (weniger Kraftverlust und Muskelkater) gilt als besser belegt als der direkte Leistungseffekt.',
      ],
    },
    empfehlung: 'Solides „Nice to have“ für Wettkampfwochen, Etappenrennen und Trainingslager, wenn du schnell wieder frisch sein musst. Kein Game-Changer und nichts für jeden Tag.',
    quellen: [
      { kurz: 'Gao & Chilibeck 2020', titel: 'Effect of tart cherry concentrate on endurance exercise performance: a meta-analysis', journal: 'J Am Coll Nutr 39:657–664', url: 'https://doi.org/10.1080/07315724.2020.1713246' },
      { kurz: 'Maughan et al. 2018', titel: 'IOC consensus statement: dietary supplements and the high-performance athlete', journal: 'Br J Sports Med 52:439–455', url: 'https://doi.org/10.1136/bjsports-2018-099027' },
    ],
    mechanismus: {
      ort: 'Muskelzelle nach harter Belastung',
      kurz: 'Vermuteter Mechanismus: Kirsch-Polyphenole und ihre Abbauprodukte fangen reaktive Sauerstoffverbindungen (ROS) ab und dämpfen Entzündungssignale wie NF-κB.',
    },
  },
];

// Steckbrief, Aufnahmeweg und Zusatzquellen anhängen
for (const s of supplements) {
  const z = zusatz[s.id];
  s.farbe = z.farbe;
  s.steckbrief = z.steckbrief;
  s.aufnahme = z.aufnahme;
  s.quellen = [...s.quellen, ...z.quellen];
}

export const byId = (id) => supplements.find((s) => s.id === id);
