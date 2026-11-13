# Abbildungs-Katalog

> Automatisch erzeugt aus den Projektdaten (`npm run lastenheft`). Nicht von Hand ändern.
> Vorgaben zu Format, Schnittstelle und Gestaltung: [LASTENHEFT.md](LASTENHEFT.md).

## Inhalt

| Nr. | Datei | Supplement | Thema |
|---|---|---|---|
| 1 | `abbildungen/koerper.svg` | alle | Abb. 1 – Körperschema für den Aufnahmeweg |
| 2 | `abbildungen/zelle/koffein.svg` | Koffein | Nervenzelle im Gehirn |
| 3 | `abbildungen/zelle/nitrat.svg` | Nitrat (Rote Bete) | Zunge → Blut → Muskelzelle |
| 4 | `abbildungen/zelle/bicarbonat.svg` | Natriumbicarbonat | Muskelzelle und Blut |
| 5 | `abbildungen/zelle/beta-alanin.svg` | Beta-Alanin | Muskelzelle |
| 6 | `abbildungen/zelle/kreatin.svg` | Kreatin | Muskelzelle |
| 7 | `abbildungen/zelle/kohlenhydrate.svg` | Kohlenhydrate (Glukose + Fruktose) | Darmzelle (Enterozyt) |
| 8 | `abbildungen/zelle/itc.svg` | ITC / Brokkolisprossen (Nomio) | Muskelzelle: Zytoplasma → Zellkern |
| 9 | `abbildungen/zelle/ketonester.svg` | Ketonester | Blut → Muskelzelle → Mitochondrium |
| 10 | `abbildungen/zelle/sauerkirsche.svg` | Polyphenole (Sauerkirsche) | Muskelzelle nach harter Belastung |

## Abb. 1 – Körperschema (eine Datei für alle Supplemente)

Vorlage: [vorlagen/koerper.svg](vorlagen/koerper.svg). Pflicht-IDs je Ort:

| Ort | Organ-Gruppe | Schild-Gruppe | Anker |
|---|---|---|---|
| Mund | `org-mund` | `schild-mund` | `anker-mund` |
| Magen | `org-magen` | `schild-magen` | `anker-magen` |
| Dünndarm | `org-duenndarm` | `schild-duenndarm` | `anker-duenndarm` |
| Dickdarm | `org-dickdarm` | `schild-dickdarm` | `anker-dickdarm` |
| Leber | `org-leber` | `schild-leber` | `anker-leber` |
| Blut | `org-blut` | `schild-blut` | `anker-blut` |
| Gehirn | `org-gehirn` | `schild-gehirn` | `anker-gehirn` |
| Muskel | `org-muskel` | `schild-muskel` | `anker-muskel` |
| Niere | `org-niere` | `schild-niere` | `anker-niere` |

Welche Orte je Supplement vorkommen (nicht beteiligte Organe blendet die Seite auf 28 % ab, ihre Schilder aus):

| Supplement | Stationen in Reihenfolge |
|---|---|
| Koffein | 1. Mund → 2. Magen → 3. Dünndarm → 4. Blut → 5. Gehirn → 6. Leber → 7. Niere |
| Nitrat (Rote Bete) | 1. Mund → 2. Dünndarm → 3. Blut → 4. Mund → 5. Magen → 6. Dünndarm → 7. Muskel → 8. Niere |
| Natriumbicarbonat | 1. Magen → 2. Dünndarm → 3. Blut → 4. Muskel → 5. Niere |
| Beta-Alanin | 1. Dünndarm → 2. Blut → 3. Muskel → 4. Muskel → 5. Leber |
| Kreatin | 1. Magen → 2. Dünndarm → 3. Blut → 4. Muskel → 5. Niere |
| Kohlenhydrate (Glukose + Fruktose) | 1. Mund → 2. Magen → 3. Dünndarm → 4. Leber → 5. Muskel → 6. Dickdarm |
| ITC / Brokkolisprossen (Nomio) | 1. Mund → 2. Dünndarm → 3. Dickdarm → 4. Muskel → 5. Niere |
| Ketonester | 1. Magen → 2. Dünndarm → 3. Leber → 4. Blut → 5. Muskel → 6. Niere |
| Polyphenole (Sauerkirsche) | 1. Magen → 2. Dünndarm → 3. Dickdarm → 4. Blut → 5. Muskel → 6. Niere |

---

## Koffein – `abbildungen/zelle/koffein.svg`

**Bildtitel:** Koffein blockiert den Adenosin-Rezeptor einer Nervenzelle  
**Ort:** Nervenzelle im Gehirn  
**Kernaussage:** Koffein sieht für den Adenosin-Rezeptor fast aus wie Adenosin – setzt sich drauf, drückt aber den „Müde“-Knopf nicht.

Vorlage: [vorlagen/zelle/koffein.svg](vorlagen/zelle/koffein.svg) · Schritt-Vorschau: [vorschau/koffein.svg](vorschau/koffein.svg)

**Pflicht-Elemente**

- Raum zwischen Nervenzellen (synaptischer Spalt), Zone beschriftet
- Zellmembran der Nervenzelle als Lipid-Doppelschicht
- Drei Adenosin-Rezeptoren in der Membran, Bindetasche nach außen, einer beschriftet „Adenosin-Rezeptor“
- Hemmendes Signal („Bremssignal“) unter jedem Rezeptor ins Zellinnere, nur in Schritt 1–2
- Signalweiterleitung der Nervenzelle (Dopamin, Noradrenalin) als Band oder Leitung im Zellinneren
- Adenosin in der Bindetasche (Schritt 1–2), Koffein in der Bindetasche (Schritt 3–4)

**Teilchenwege** (je mindestens ein `<path data-strom="…">`)

| data-strom | Bedeutung | Farbe | Teilchen | Pfeilspitze |
|---|---|---|---|---|
| `adeno` | Adenosin wandert aus dem Spalt in die freie Bindetasche und bindet. | `#e0872a` | Sechseck „A“ | ja |
| `abprall` | Adenosin nähert sich der besetzten Tasche, prallt ab und entfernt sich wieder. | `#e0872a` | Sechseck „A“ | ja |
| `kof` | Koffein kommt (aus dem Blut) heran und besetzt die Bindetasche. | `#1f8f80` | Kreis „K“ | ja |
| `bremse` | Hemmendes Signal läuft vom Rezeptor ins Zellinnere (ohne Pfeilspitze, Punktfolge). | `#d6453d` | Kreis | nein |
| `impuls` | Nervenimpuls / Transmitter-Signal läuft entlang der Zelle; Dichte zeigt die Aktivität. | `#4f9a3a` | Raute | ja |

**Legende** (setzt die Seite, Farben im Bild bitte gleich verwenden)

- `#e0872a` A = Adenosin („müde“-Signal)
- `#1f8f80` K = Koffein
- `#d6453d` Bremssignal
- `#4f9a3a` Nervenimpulse / Dopamin & Co.

**Schritte**

| Schritt | Titel | Aktive Teilchenwege (Stärke 0–1) | Text auf der Seite |
|---|---|---|---|
| 1 (`data-s` 0) | Adenosin drückt die Bremse | `adeno` 1, `bremse` 1, `impuls` 0.25 | Je länger du wach bist und je härter du arbeitest, desto mehr Adenosin sammelt sich an. Es dockt am Adenosin-Rezeptor an und sagt der Nervenzelle: runterfahren. Folge: weniger Dopamin, du fühlst dich platt. |
| 2 (`data-s` 1) | Koffein flutet an | `adeno` 1, `kof` 1, `bremse` 1, `impuls` 0.25 | Etwa 60 Minuten nach der Tablette ist der Koffeinspiegel im Blut oben. Koffein ist klein und fettlöslich genug, um locker ins Gehirn zu kommen. |
| 3 (`data-s` 2) | Platz besetzt | `abprall` 1, `kof` 0.35, `impuls` 0.6 | Koffein passt in dieselbe Bindetasche wie Adenosin – löst aber kein Signal aus (kompetitiver Antagonist). Das Adenosin ist noch da, findet nur keinen freien Rezeptor mehr. |
| 4 (`data-s` 3) | Bremse gelöst | `abprall` 1, `kof` 0.2, `impuls` 1 | Ohne Bremssignal feuern die Nervenzellen munterer, mehr Dopamin und Noradrenalin sind unterwegs. Für dich heißt das: Gleiche Watt fühlen sich leichter an, du hältst das Tempo länger. |

In der Vorlage gibt es 5 schrittabhängige Gruppen (sichtbar in Schritt: 1, 2 / 3, 4).

---

## Nitrat (Rote Bete) – `abbildungen/zelle/nitrat.svg`

**Bildtitel:** Nitrat wird über Zungenbakterien zu Nitrit und im Muskel zu Stickstoffmonoxid  
**Ort:** Zunge → Blut → Muskelzelle  
**Kernaussage:** Nitrat (NO₃⁻) wird von Bakterien zu Nitrit (NO₂⁻) und im arbeitenden Muskel zu Stickstoffmonoxid (NO) – das macht Mitochondrien sparsamer und Gefäße weiter.

Vorlage: [vorlagen/zelle/nitrat.svg](vorlagen/zelle/nitrat.svg) · Schritt-Vorschau: [vorschau/nitrat.svg](vorschau/nitrat.svg)

**Pflicht-Elemente**

- Zungenrücken (Mundraum) mit Papillen-Oberfläche
- Mehrere Nitrat-reduzierende Bakterien auf der Zunge, beschriftet „Bakterien“
- Blutgefäß im Längsschnitt mit Erythrozyten; in Schritt 4 sichtbar geweitet
- Zellmembran der Muskelzelle als Lipid-Doppelschicht
- Mitochondrium mit Cristae, beschriftet
- Muskelfaser (quergestreift), beschriftet

**Teilchenwege** (je mindestens ein `<path data-strom="…">`)

| data-strom | Bedeutung | Farbe | Teilchen | Pfeilspitze |
|---|---|---|---|---|
| `no3` | Nitrat aus dem Speichel gelangt zu den Bakterien auf dem Zungenrücken. | `#c2255c` | Kapsel „NO₃⁻“ | ja |
| `no2` | Nitrit von den Bakterien wird geschluckt, gelangt ins Blut und in die Muskelzelle. | `#8e44ad` | Kapsel „NO₂⁻“ | ja |
| `no` | Im Muskel entsteht NO; ein Weg zum Mitochondrium, einer zum Blutgefäß. | `#2d7fc1` | Kreis „NO“ | ja |
| `o2` | Sauerstoff aus dem Blut ins Mitochondrium (in Schritt 4 weniger nötig). | `#d6453d` | Kreis „O₂“ | ja |
| `atp` | ATP vom Mitochondrium zur Muskelfaser. | `#e3a008` | Kapsel „ATP“ | ja |

**Legende** (setzt die Seite, Farben im Bild bitte gleich verwenden)

- `#c2255c` Nitrat (NO₃⁻)
- `#8e44ad` Nitrit (NO₂⁻)
- `#2d7fc1` Stickstoffmonoxid (NO)
- `#d6453d` Sauerstoff (O₂)
- `#e3a008` ATP (Energie)

**Schritte**

| Schritt | Titel | Aktive Teilchenwege (Stärke 0–1) | Text auf der Seite |
|---|---|---|---|
| 1 (`data-s` 0) | Nitrat landet auf der Zunge | `no3` 1, `o2` 1, `atp` 1 | Das Nitrat aus dem Shot geht erst ins Blut – und dann ziehen es deine Speicheldrüsen raus und pumpen es konzentriert zurück in den Mund. Klingt nach Umweg, ist aber der Trick. |
| 2 (`data-s` 1) | Bakterien machen Nitrit draus | `no3` 0.7, `no2` 1, `o2` 1, `atp` 1 | Bakterien auf dem Zungenrücken knabbern ein Sauerstoffatom ab: aus Nitrat (NO₃⁻) wird Nitrit (NO₂⁻). Du schluckst es, es geht wieder ins Blut. Deshalb: kein antibakterielles Mundwasser. |
| 3 (`data-s` 2) | Im Muskel wird NO draus | `no2` 1, `no` 1, `o2` 1, `atp` 1 | Im arbeitenden Muskel ist es sauer und sauerstoffarm. Genau dort wird Nitrit zu Stickstoffmonoxid (NO) reduziert – das Signalgas entsteht also da, wo es gebraucht wird. |
| 4 (`data-s` 3) | NO macht dich sparsamer | `no2` 0.6, `no` 1, `o2` 0.6, `atp` 1 | NO weitet die Gefäße (mehr Blut zum Muskel) und lässt die Mitochondrien mit weniger Sauerstoff die gleiche Menge ATP liefern. Unterm Strich: gleiche Watt, etwas weniger O₂-Verbrauch. |

In der Vorlage gibt es 4 schrittabhängige Gruppen (sichtbar in Schritt: 1, 2, 3 / 4).

---

## Natriumbicarbonat – `abbildungen/zelle/bicarbonat.svg`

**Bildtitel:** Bicarbonat im Blut zieht Säure aus der Muskelzelle  
**Ort:** Muskelzelle und Blut  
**Kernaussage:** Mehr Bicarbonat (HCO₃⁻) im Blut zieht H⁺ und Laktat schneller aus der Muskelzelle. Draußen wird H⁺ abgefangen und als CO₂ abgeatmet.

Vorlage: [vorlagen/zelle/bicarbonat.svg](vorlagen/zelle/bicarbonat.svg) · Schritt-Vorschau: [vorschau/bicarbonat.svg](vorschau/bicarbonat.svg)

**Pflicht-Elemente**

- Blut (Zone beschriftet)
- Zellmembran der Muskelzelle als Lipid-Doppelschicht
- Zwei MCT-Transporter in der Membran, einer beschriftet „MCT-Transporter“
- Muskelfaser bei Belastung (quergestreift)
- Reaktionsgleichung H⁺ + HCO₃⁻ → H₂CO₃ → H₂O + CO₂ und Hinweis „→ Lunge“, nur Schritt 4

**Teilchenwege** (je mindestens ein `<path data-strom="…">`)

| data-strom | Bedeutung | Farbe | Teilchen | Pfeilspitze |
|---|---|---|---|---|
| `hInnen` | H⁺ entsteht in der Muskelfaser und wandert zu den Transportern. | `#d6453d` | Kreis „H⁺“ | ja |
| `hRaus` | H⁺ wird durch die MCT-Transporter ins Blut geschleust. | `#d6453d` | Kreis „H⁺“ | ja |
| `lakRaus` | Laktat geht gemeinsam mit H⁺ durch die MCT-Transporter ins Blut. | `#e67e22` | Kreis „La“ | ja |
| `hco3` | Bicarbonat zirkuliert im Blut (Menge zeigt den Pufferstand). | `#2b6cb0` | Kapsel „HCO₃⁻“ | ja |
| `co2` | CO₂ entsteht im Blut und wird Richtung Lunge abtransportiert. | `#7b8794` | Kapsel „CO₂“ | ja |

**Legende** (setzt die Seite, Farben im Bild bitte gleich verwenden)

- `#d6453d` H⁺ (Säure)
- `#e67e22` La = Laktat
- `#2b6cb0` Bicarbonat (HCO₃⁻)
- `#7b8794` CO₂ (wird abgeatmet)

**Schritte**

| Schritt | Titel | Aktive Teilchenwege (Stärke 0–1) | Text auf der Seite |
|---|---|---|---|
| 1 (`data-s` 0) | Vollgas macht sauer | `hInnen` 1, `hco3` 0.3, `hRaus` 0.3, `lakRaus` 0.25 | Wenn du über der Schwelle fährst, fallen in der Muskelzelle massenhaft H⁺-Ionen an. Der pH sinkt – das stört die Kontraktion und die Energiebereitstellung. Es brennt. |
| 2 (`data-s` 1) | Bicarbonat lädt das Blut auf | `hInnen` 1, `hco3` 1, `hRaus` 0.3, `lakRaus` 0.25 | Nach der Einnahme steigt der Bicarbonat-Spiegel im Blut. In die Muskelzelle selbst kommt das kaum – muss es auch nicht. Es macht das Blut zum besseren Säure-Abfluss. |
| 3 (`data-s` 2) | Sog nach draußen | `hInnen` 0.55, `hco3` 1, `hRaus` 1, `lakRaus` 1 | Mehr Puffer draußen heißt größeres Gefälle: H⁺ und Laktat werden gemeinsam über MCT-Transporter schneller aus der Zelle geschleust. Drinnen bleibt der pH länger im grünen Bereich. |
| 4 (`data-s` 3) | Abgefangen und abgeatmet | `hInnen` 0.35, `hco3` 0.75, `hRaus` 1, `lakRaus` 1, `co2` 1 | Im Blut schnappt sich Bicarbonat das H⁺. Daraus wird Kohlensäure, die zu Wasser und CO₂ zerfällt – und das CO₂ atmest du einfach ab. Ergebnis: Du hältst harte Belastungen ein Stück länger durch. |

In der Vorlage gibt es 2 schrittabhängige Gruppen (sichtbar in Schritt: 4).

---

## Beta-Alanin – `abbildungen/zelle/beta-alanin.svg`

**Bildtitel:** Beta-Alanin wird in der Muskelzelle zu Carnosin verbaut  
**Ort:** Muskelzelle  
**Kernaussage:** Beta-Alanin ist der Engpass-Baustein für Carnosin. Mehr Carnosin = mehr Puffer, der H⁺ direkt in der Faser abfängt.

Vorlage: [vorlagen/zelle/beta-alanin.svg](vorlagen/zelle/beta-alanin.svg) · Schritt-Vorschau: [vorschau/beta-alanin.svg](vorschau/beta-alanin.svg)

**Pflicht-Elemente**

- Blut (Zone beschriftet)
- Zellmembran der Muskelzelle mit Transporter, beschriftet „Transporter TauT“
- Enzym Carnosin-Synthase, beschriftet
- Carnosin-Speicher als Bereich, der sich über die Schritte füllt (3 → 5 → 12 Einheiten)
- Hinweis „nach 4 Wochen: +40–60 %“ nur Schritt 3
- Muskelfaser (quergestreift), in Schritt 4 Säure-Quelle

**Teilchenwege** (je mindestens ein `<path data-strom="…">`)

| data-strom | Bedeutung | Farbe | Teilchen | Pfeilspitze |
|---|---|---|---|---|
| `ba` | Beta-Alanin aus dem Blut durch TauT zur Carnosin-Synthase. | `#c98a12` | Kapsel „β-Ala“ | ja |
| `his` | Histidin (bereits in der Zelle) zur Carnosin-Synthase. | `#7c5cc4` | Kapsel „His“ | ja |
| `carn` | Fertiges Carnosin von der Synthase in den Speicher. | `#2f9e6e` | Kapsel „Carn“ | ja |
| `saeure` | H⁺ aus der arbeitenden Faser wird vom Carnosin im Speicher abgefangen. | `#d6453d` | Kreis „H⁺“ | ja |

**Legende** (setzt die Seite, Farben im Bild bitte gleich verwenden)

- `#c98a12` Beta-Alanin (β-Ala)
- `#7c5cc4` Histidin (His)
- `#2f9e6e` Carnosin (Puffer)
- `#d6453d` H⁺ (Säure)

**Schritte**

| Schritt | Titel | Aktive Teilchenwege (Stärke 0–1) | Text auf der Seite |
|---|---|---|---|
| 1 (`data-s` 0) | Rein in die Muskelzelle | `ba` 1, `his` 0.5 | Beta-Alanin kommt übers Blut und wird vom Transporter TauT in die Muskelzelle geschleust. Allein kann es da drin noch nichts. |
| 2 (`data-s` 1) | Zusammenbau zu Carnosin | `ba` 1, `his` 1, `carn` 1 | Das Enzym Carnosin-Synthase klebt Beta-Alanin und Histidin zusammen. Histidin hast du genug – Beta-Alanin ist der Engpass. Deshalb bringt mehr Beta-Alanin mehr Carnosin. |
| 3 (`data-s` 2) | Wochenlang auffüllen | `ba` 0.7, `his` 0.75, `carn` 1 | Das geht langsam: Nach 4 Wochen mit 4–6 g pro Tag ist der Carnosin-Speicher um 40–60 % größer. Eine Einzeldosis vor dem Rennen bringt deshalb nichts – außer Kribbeln. |
| 4 (`data-s` 3) | Puffer im Einsatz | `saeure` 1, `carn` 0.34 | Im harten Intervall schießt H⁺ in die Faser. Carnosin fängt es direkt vor Ort ab (über seinen Imidazol-Ring). Der pH fällt langsamer – du hältst die 1–4-Minuten-Hölle etwas länger aus. |

In der Vorlage gibt es 4 schrittabhängige Gruppen (sichtbar in Schritt: 2, 3, 4 / 3, 4 / 3 / 4).

---

## Kreatin – `abbildungen/zelle/kreatin.svg`

**Bildtitel:** Kreatin pendelt als Phosphokreatin zwischen Mitochondrium und Muskelfaser  
**Ort:** Muskelzelle  
**Kernaussage:** Mehr Kreatin = mehr Phosphokreatin (PCr). PCr lädt verbrauchtes ADP in Millisekunden wieder zu ATP auf – genau dann, wenn du antrittst.

Vorlage: [vorlagen/zelle/kreatin.svg](vorlagen/zelle/kreatin.svg) · Schritt-Vorschau: [vorschau/kreatin.svg](vorschau/kreatin.svg)

**Pflicht-Elemente**

- Blut (Zone beschriftet)
- Zellmembran der Muskelzelle mit Transporter, beschriftet „Transporter CreaT“
- Mitochondrium mit Cristae, beschriftet
- Je eine Kreatinkinase am Mitochondrium und an der Muskelfaser, gemeinsam beschriftet
- Muskelfaser (hochkant, quergestreift), beschriftet
- Gleichung ADP + PCr → ATP + Cr, nur Schritt 4

**Teilchenwege** (je mindestens ein `<path data-strom="…">`)

| data-strom | Bedeutung | Farbe | Teilchen | Pfeilspitze |
|---|---|---|---|---|
| `rein` | Kreatin aus dem Blut durch CreaT zum Mitochondrium. | `#3b82c4` | Kapsel „Cr“ | ja |
| `pcr` | Phosphokreatin vom Mitochondrium zur Muskelfaser (oberer Bogen). | `#5a55c8` | Kapsel „PCr“ | ja |
| `zurueck` | Kreatin von der Muskelfaser zurück zum Mitochondrium (unterer Bogen). | `#3b82c4` | Kapsel „Cr“ | ja |
| `atp` | ATP-Bereitstellung entlang der Muskelfaser. | `#e3a008` | Kapsel „ATP“ | ja |

**Legende** (setzt die Seite, Farben im Bild bitte gleich verwenden)

- `#3b82c4` Kreatin (Cr)
- `#5a55c8` Phosphokreatin (PCr)
- `#e3a008` ATP an der Faser

**Schritte**

| Schritt | Titel | Aktive Teilchenwege (Stärke 0–1) | Text auf der Seite |
|---|---|---|---|
| 1 (`data-s` 0) | Kreatin wird eingelagert | `rein` 1, `atp` 0.25 | Kreatin aus dem Blut kommt über den Transporter CreaT in die Muskelzelle. Mit 3–5 g täglich sind die Speicher nach etwa 4 Wochen voll. |
| 2 (`data-s` 1) | Aufladen am Mitochondrium | `rein` 0.5, `pcr` 1, `atp` 0.25 | Direkt am Mitochondrium hängt die Kreatinkinase ein Phosphat ans Kreatin: fertig ist Phosphokreatin (PCr) – ein geladener Akku. |
| 3 (`data-s` 2) | Shuttle zur Faser | `pcr` 1, `zurueck` 1, `atp` 0.5 | PCr wandert zur Myofibrille, gibt dort sein Phosphat ab und kommt als Kreatin zurück. So wird Energie vom Kraftwerk zur Baustelle gefahren. |
| 4 (`data-s` 3) | Antritt! | `pcr` 1, `zurueck` 1, `atp` 1 | Bei der Attacke wird ATP schneller verbraucht, als Mitochondrien nachliefern. PCr springt in Millisekunden ein und macht aus ADP wieder ATP. Mehr PCr im Tank heißt: härter antreten und öfter nachlegen. |

In der Vorlage gibt es 1 schrittabhängige Gruppen (sichtbar in Schritt: 4).

---

## Kohlenhydrate (Glukose + Fruktose) – `abbildungen/zelle/kohlenhydrate.svg`

**Bildtitel:** Glukose und Fruktose nehmen in der Darmzelle verschiedene Transporter  
**Ort:** Darmzelle (Enterozyt)  
**Kernaussage:** Glukose nimmt die Tür SGLT1, Fruktose die Tür GLUT5. Ist SGLT1 voll, staut sich Glukose – Fruktose läuft trotzdem durch.

Vorlage: [vorlagen/zelle/kohlenhydrate.svg](vorlagen/zelle/kohlenhydrate.svg) · Schritt-Vorschau: [vorschau/kohlenhydrate.svg](vorschau/kohlenhydrate.svg)

**Pflicht-Elemente**

- Darminneres (Zone beschriftet)
- Darmzelle zwischen zwei Lipid-Doppelschichten: oben zum Darm (apikal), unten zum Blut (basolateral)
- Zwei SGLT1-Transporter oben, beschriftet
- Zwei GLUT5-Transporter oben, beschriftet
- Drei GLUT2-Transporter unten, beschriftet
- Blutgefäß unten mit Erythrozyten
- Stau aus wartender Glukose vor SGLT1 und Hinweis „max. ~60 g/h“ ab Schritt 2

**Teilchenwege** (je mindestens ein `<path data-strom="…">`)

| data-strom | Bedeutung | Farbe | Teilchen | Pfeilspitze |
|---|---|---|---|---|
| `glu` | Glukose aus dem Darm durch SGLT1, durch die Zelle, durch GLUT2 ins Blut. | `#f0c330` | Sechseck „G“ | ja |
| `na` | Natrium fährt mit der Glukose durch SGLT1 in die Zelle. | `#8a63d2` | Kreis „Na⁺“ | ja |
| `fru` | Fruktose aus dem Darm durch GLUT5, durch die Zelle, durch GLUT2 ins Blut. | `#e8703a` | Fünfeck „F“ | ja |

**Legende** (setzt die Seite, Farben im Bild bitte gleich verwenden)

- `#f0c330` G = Glukose
- `#8a63d2` Natrium (fährt mit)
- `#e8703a` F = Fruktose

**Schritte**

| Schritt | Titel | Aktive Teilchenwege (Stärke 0–1) | Text auf der Seite |
|---|---|---|---|
| 1 (`data-s` 0) | Glukose nimmt SGLT1 | `glu` 0.5, `na` 0.5 | Glukose (auch die aus Maltodextrin) kommt nur über einen Transporter aus dem Darm: SGLT1. Der nimmt Glukose zusammen mit Natrium mit – deshalb gehört etwas Salz ins Getränk. |
| 2 (`data-s` 1) | Bei ~60 g/h ist Schluss | `glu` 1, `na` 1 | SGLT1 ist bei rund 1 g pro Minute gesättigt. Kippst du mehr Glukose nach, bleibt sie im Darm liegen, zieht Wasser – und du bekommst Magenprobleme statt Energie. |
| 3 (`data-s` 2) | Fruktose nimmt die Nebentür | `glu` 1, `na` 1, `fru` 1 | Fruktose benutzt einen eigenen Transporter: GLUT5. Der ist von der Glukose-Schlange völlig unbeeindruckt. Zwei Zuckerarten, zwei Türen. |
| 4 (`data-s` 3) | Mehr Sprit im Blut | `glu` 1, `na` 1, `fru` 1 | Auf der Rückseite der Darmzelle gehen beide über GLUT2 ins Blut. Mit ~60 g/h Glukose plus Fruktose obendrauf kommen 90 g/h an – mit trainiertem Darm bis 120 g/h. |

In der Vorlage gibt es 3 schrittabhängige Gruppen (sichtbar in Schritt: 2, 3 / 2, 3, 4).

---

## ITC / Brokkolisprossen (Nomio) – `abbildungen/zelle/itc.svg`

**Bildtitel:** ITC löst NRF2 von KEAP1; NRF2 schaltet im Zellkern Schutz-Gene an  
**Ort:** Muskelzelle: Zytoplasma → Zellkern  
**Kernaussage:** ITC (z. B. Sulforaphan) hängt sich an den Sensor KEAP1. Der lässt daraufhin NRF2 los – NRF2 wandert in den Zellkern und schaltet Schutz-Gene an.

Vorlage: [vorlagen/zelle/itc.svg](vorlagen/zelle/itc.svg) · Schritt-Vorschau: [vorschau/itc.svg](vorschau/itc.svg)

**Pflicht-Elemente**

- Außenraum und Zellmembran (Lipid-Doppelschicht)
- KEAP1 (zwei Untereinheiten), beschriftet; ab Schritt 2 mit gebundenem ITC und Hinweis „Sensor klemmt“
- NRF2 an KEAP1 gebunden (Schritt 1–2), danach frei
- Proteasom (Fass aus Ringen), beschriftet, mit Abbau-Bruchstücken in Schritt 1–2
- Zellkern mit Doppelmembran, DNA-Helix und ARE-Abschnitt, alle beschriftet
- NRF2 mit Partner (sMAF) am ARE ab Schritt 3
- ROS als Zacken-Symbole; ab Schritt 4 deutlich weniger

**Teilchenwege** (je mindestens ein `<path data-strom="…">`)

| data-strom | Bedeutung | Farbe | Teilchen | Pfeilspitze |
|---|---|---|---|---|
| `abbau` | NRF2 wird von KEAP1 zum Proteasom geschickt und abgebaut. | `#e8872b` | Kapsel „NRF2“ | ja |
| `itc` | ITC dringt durch die Membran und bindet an KEAP1. | `#6a9a1f` | Kapsel „ITC“ | ja |
| `nrf2` | Freies NRF2 wandert in den Zellkern zum ARE. | `#e8872b` | Kapsel „NRF2“ | ja |
| `enzyme` | Schutz-Enzyme verlassen den Kern ins Zytoplasma. | `#1f9a8a` | Kapsel „Enz“ | ja |

**Legende** (setzt die Seite, Farben im Bild bitte gleich verwenden)

- `#6a9a1f` ITC (z. B. Sulforaphan)
- `#e8872b` NRF2
- `#f0564a` ROS (oxidativer Stress)
- `#1f9a8a` Schutz-Enzyme (NQO1, HO-1, GCL)

**Schritte**

| Schritt | Titel | Aktive Teilchenwege (Stärke 0–1) | Text auf der Seite |
|---|---|---|---|
| 1 (`data-s` 0) | Normalbetrieb: NRF2 wird geschreddert | `abbau` 1 | NRF2 ist der Chef des zelleigenen Schutzprogramms – wird aber kurzgehalten. Der Sensor KEAP1 hält es fest und markiert es für den Abbau. Im Proteasom landet es, bevor es etwas ausrichten kann. Hartes Training erzeugt derweil reichlich ROS. |
| 2 (`data-s` 1) | ITC kommt rein | `itc` 1, `abbau` 0.4 | Aus den Glucosinolaten der Sprossen entstehen Isothiocyanate (ITC), z. B. Sulforaphan. Die sind klein und reaktiv, schlüpfen durch die Membran und hängen sich an Cystein-Bausteine von KEAP1. Der Sensor „klemmt“. |
| 3 (`data-s` 2) | NRF2 ist frei | `itc` 0.5, `nrf2` 1 | Mit klemmendem KEAP1 wird neues NRF2 nicht mehr abgebaut. Es sammelt sich an, wandert in den Zellkern und bindet dort zusammen mit einem Partner (sMAF) an den DNA-Schalter ARE. |
| 4 (`data-s` 3) | Schutz-Gene an | `itc` 0.3, `nrf2` 0.5, `enzyme` 1 | Der Kern produziert jetzt mehr antioxidative und entgiftende Enzyme (NQO1, HO-1, Glutathion-Synthese). Die räumen ROS ab. Gemessen wurde beim Menschen: weniger oxidativ geschädigte Muskelproteine und weniger Laktat bei gleicher Leistung. Warum das Laktat sinkt, ist noch nicht geklärt. |

In der Vorlage gibt es 15 schrittabhängige Gruppen (sichtbar in Schritt: 1 / 2, 3, 4 / 1, 2 / 3, 4 / 1, 2, 3).

---

## Ketonester – `abbildungen/zelle/ketonester.svg`

**Bildtitel:** Ketonester wird zu βHB gespalten und im Mitochondrium verbrannt  
**Ort:** Blut → Muskelzelle → Mitochondrium  
**Kernaussage:** Der Ester wird zu β-Hydroxybutyrat (βHB) gespalten. βHB geht über MCT-Transporter in die Zelle und wird im Mitochondrium zu Acetyl-CoA verfeuert.

Vorlage: [vorlagen/zelle/ketonester.svg](vorlagen/zelle/ketonester.svg) · Schritt-Vorschau: [vorschau/ketonester.svg](vorschau/ketonester.svg)

**Pflicht-Elemente**

- Blut (Zone beschriftet) mit Esterase, beschriftet
- Zellmembran der Muskelzelle mit MCT-Transporter, beschriftet
- Mitochondrium mit Citratzyklus als Kreis, beides beschriftet
- Glykolyse als senkrechter Weg Glukose → Pyruvat; in Schritt 4 „gebremst“
- Hinweis „Blut-pH sinkt“ nur Schritt 4

**Teilchenwege** (je mindestens ein `<path data-strom="…">`)

| data-strom | Bedeutung | Farbe | Teilchen | Pfeilspitze |
|---|---|---|---|---|
| `ke` | Ketonester erreicht die Esterase. | `#7b4fc4` | Kapsel „KE“ | ja |
| `bhb` | βHB von der Esterase durch den MCT-Transporter ins Mitochondrium. | `#b0469b` | Kapsel „βHB“ | ja |
| `zyklus` | Acetyl-CoA kreist im Citratzyklus (ohne Pfeilspitze). | `#d99a1b` | Kreis | nein |
| `atp` | ATP verlässt das Mitochondrium. | `#e3a008` | Kapsel „ATP“ | ja |
| `saeure` | H⁺ im Blut nimmt zu (Säurelast). | `#d6453d` | Kreis „H⁺“ | ja |
| `glyko` | Glukose-Abbau Glukose → Pyruvat; Dichte zeigt die Aktivität. | `#8aa0b8` | Sechseck | ja |

**Legende** (setzt die Seite, Farben im Bild bitte gleich verwenden)

- `#7b4fc4` KE = Ketonester
- `#b0469b` β-Hydroxybutyrat (βHB)
- `#d99a1b` Acetyl-CoA im Citratzyklus
- `#e3a008` ATP
- `#d6453d` H⁺ (Säure)
- `#8aa0b8` Glukose-Abbau (Glykolyse)

**Schritte**

| Schritt | Titel | Aktive Teilchenwege (Stärke 0–1) | Text auf der Seite |
|---|---|---|---|
| 1 (`data-s` 0) | Der Ester wird geknackt | `ke` 1, `bhb` 0.34, `glyko` 1, `atp` 0.6 | Ketonmonoester ist βHB, das an Butandiol gebunden ist. Esterasen spalten das auf; die Leber macht aus dem Butandiol ebenfalls βHB. Binnen Minuten steigt der Ketonspiegel im Blut auf Werte wie nach tagelangem Fasten. |
| 2 (`data-s` 1) | βHB geht in den Muskel | `ke` 0.6, `bhb` 1, `glyko` 1, `atp` 0.6 | β-Hydroxybutyrat nimmt denselben Transporter wie Laktat (MCT) und landet in der Muskelzelle. Dort geht es direkt weiter ins Mitochondrium. |
| 3 (`data-s` 2) | Verfeuert im Mitochondrium | `bhb` 1, `zyklus` 1, `atp` 1, `glyko` 0.8 | Drei Enzymschritte (BDH1 → SCOT → Thiolase) machen aus βHB zwei Acetyl-CoA. Die laufen in den Citratzyklus und liefern ATP. Auf dem Papier: ein Zusatzbrennstoff, der Glykogen sparen könnte. |
| 4 (`data-s` 3) | Der Haken | `bhb` 1, `zyklus` 1, `atp` 0.8, `saeure` 1, `glyko` 0.2 | βHB ist eine Säure: Blut-pH und Bicarbonat sinken – schlecht, wenn du am Limit fährst. Zudem bremsen Ketone den Glukose-Abbau, also genau den schnellen Stoffwechselweg für hohe Intensität. Deshalb zeigen die Studien im Rennen: kein Plus, teils ein Minus. |

In der Vorlage gibt es 2 schrittabhängige Gruppen (sichtbar in Schritt: 4).

---

## Polyphenole (Sauerkirsche) – `abbildungen/zelle/sauerkirsche.svg`

**Bildtitel:** Kirsch-Polyphenole dämpfen oxidativen Stress und den Entzündungs-Schalter NF-κB  
**Ort:** Muskelzelle nach harter Belastung  
**Kernaussage:** Vermuteter Mechanismus: Kirsch-Polyphenole und ihre Abbauprodukte fangen reaktive Sauerstoffverbindungen (ROS) ab und dämpfen Entzündungssignale wie NF-κB.

Vorlage: [vorlagen/zelle/sauerkirsche.svg](vorlagen/zelle/sauerkirsche.svg) · Schritt-Vorschau: [vorschau/sauerkirsche.svg](vorschau/sauerkirsche.svg)

**Pflicht-Elemente**

- Blut (Zone beschriftet) und Zellmembran
- NF-κB, beschriftet; in Schritt 1 mit Bremse IκB (beschriftet), in Schritt 4 „weniger aktiv“
- Zellkern mit DNA und Abschnitt „Entzündungs-Gene“; in Schritt 2–3 rot (aktiv)
- Muskelfaser mit Mikrorissen, beschriftet
- ROS als Zacken-Symbole; in Schritt 4 deutlich weniger

**Teilchenwege** (je mindestens ein `<path data-strom="…">`)

| data-strom | Bedeutung | Farbe | Teilchen | Pfeilspitze |
|---|---|---|---|---|
| `nfkb` | NF-κB wandert in den Zellkern zu den Entzündungs-Genen. | `#e07b28` | Kapsel „NF-κB“ | ja |
| `signal` | Entzündungssignale verlassen die Zelle nach außen. | `#c2378f` | Dreieck | ja |
| `poly` | Polyphenol-Abbauprodukte aus dem Blut gelangen in die Zelle. | `#b0304f` | Kapsel „PP“ | ja |

**Legende** (setzt die Seite, Farben im Bild bitte gleich verwenden)

- `#f0564a` ROS (oxidativer Stress)
- `#e07b28` NF-κB (Entzündungs-Schalter)
- `#c2378f` Entzündungssignale
- `#b0304f` PP = Kirsch-Polyphenole

**Schritte**

| Schritt | Titel | Aktive Teilchenwege (Stärke 0–1) | Text auf der Seite |
|---|---|---|---|
| 1 (`data-s` 0) | Harte Einheit, viel Stress | – | Lange oder sehr harte Belastungen hinterlassen Mikroschäden in der Faser und viele reaktive Sauerstoffverbindungen (ROS). Das ist normal – und ein Teil davon ist sogar das Signal für Anpassung. |
| 2 (`data-s` 1) | Der Entzündungs-Schalter kippt | `nfkb` 1, `signal` 1 | ROS und Zellschäden aktivieren NF-κB. Es wandert in den Zellkern und schaltet Entzündungs-Gene an. Die Zelle funkt Alarmsignale – das spürst du als Muskelkater und Kraftverlust in den Tagen danach. |
| 3 (`data-s` 2) | Polyphenole kommen an | `nfkb` 1, `signal` 1, `poly` 1 | Aus der Sauerkirsche kommen Anthocyane und andere Polyphenole. Im Blut landen vor allem ihre Abbauprodukte – die sind es wahrscheinlich, die in der Zelle wirken. |
| 4 (`data-s` 3) | Feuer gedämpft | `nfkb` 0.25, `signal` 0.2, `poly` 1 | Vermutete Wirkung: weniger ROS, weniger NF-κB-Aktivität, weniger Entzündungssignale – dazu bessere Durchblutung. Ergebnis in Studien: schnellere Erholung der Muskelfunktion. Der Mechanismus ist plausibel, aber nicht bis ins Detail bewiesen. |

In der Vorlage gibt es 13 schrittabhängige Gruppen (sichtbar in Schritt: 1, 4 / 2, 3 / 1 / 1, 2, 3 / 4).
