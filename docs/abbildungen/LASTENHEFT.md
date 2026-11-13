# Lastenheft: Abbildungen für das Supplement-Wiki

Stand: November 2026 · Auftraggeber: Max (Repository-Inhaber) · Repository: `w2tkg69pg9-stack/Supplement-Wiki` (öffentlich)

Dieses Dokument beschreibt, welche Abbildungen geliefert werden, in welchem technischen Format, wie sie animiert werden, wie sie aussehen sollen und wie sie abgenommen werden. Zu jeder einzelnen Abbildung stehen die fachlichen Vorgaben im Anhang **[KATALOG.md](KATALOG.md)**. Er wird aus den Projektdaten erzeugt und ist deshalb immer auf dem Stand der Texte auf der Seite.

---

## 1. Ausgangslage und Ziel

Das Supplement-Wiki (`index.html`, live unter `https://w2tkg69pg9-stack.github.io/Supplement-Wiki/`) erklärt neun Nahrungsergänzungsmittel für Ausdauersportler. Jede Seite hat zwei Abbildungen:

- **Abb. 1 – Aufnahme:** ein Körperschema, auf dem der Weg des Stoffes durch den Körper mit nummerierten Stationen eingezeichnet wird. Die Seite zeichnet Route, Nummern und Teilchen selbst; geliefert wird **ein** Körperschema für alle Supplemente.
- **Abb. 2 – Wirkung:** ein Ausschnitt auf Zellebene, der in vier Schritten erklärt, was passiert. Teilchen (Moleküle, Ionen) wandern animiert entlang festgelegter Wege.

Die jetzigen Abbildungen sind aus Code gezeichnet. Sie sind fachlich abgestimmt, wirken aber noch zu schematisch. **Ziel ist ein hochwertiger, einheitlicher Schulbuch-Look**: so klar wie eine gute Abbildung in einem Biologie-Lehrbuch der Oberstufe, aber nicht kindlich.

## 2. Lieferumfang

| Nr. | Datei im Repository | Inhalt |
|---|---|---|
| 1 | `abbildungen/koerper.svg` | Körperschema (Abb. 1), eine Datei für alle Supplemente |
| 2–10 | `abbildungen/zelle/<id>.svg` | Zellabbildung (Abb. 2) je Supplement. `<id>` ist: `koffein`, `nitrat`, `bicarbonat`, `beta-alanin`, `kreatin`, `kohlenhydrate`, `itc`, `ketonester`, `sauerkirsche` |

Teillieferungen sind ausdrücklich erwünscht. Fehlt eine Datei, zeigt die Seite für dieses Supplement weiter die eingebaute Zeichnung.

**Empfohlene Reihenfolge:** Zuerst ein Pilot mit `koerper.svg` und `zelle/koffein.svg`. Nach der Abstimmung zum Stil folgen die übrigen acht.

### Was mitgeliefert wird (als Arbeitsgrundlage)

| Datei | Zweck |
|---|---|
| [KATALOG.md](KATALOG.md) | Fachliche Vorgaben je Abbildung: Pflicht-Elemente, Teilchenwege, Farben, Schritte mit Seitentext |
| [vorlagen/koerper.svg](vorlagen/koerper.svg) | Aktuelles Körperschema **im Lieferformat**: alle Pflicht-IDs sind schon gesetzt |
| [vorlagen/zelle/&lt;id&gt;.svg](vorlagen/zelle/) | Aktuelle Zellabbildungen **im Lieferformat**: Teilchenwege (`data-strom`) und schrittabhängige Gruppen (`data-s`) sind schon gesetzt |
| [vorschau/&lt;id&gt;.svg](vorschau/) | Dieselben Zellabbildungen als 2×2-Raster: was in welchem Schritt sichtbar ist (nur zur Ansicht, kein Lieferformat) |

Die Vorlagen bestehen die automatische Prüfung. Sie dürfen als Ausgangspunkt dienen und komplett neu gezeichnet werden. Komposition und Anordnung dürfen sich ändern; Pflicht-Elemente, IDs und Stromnamen müssen bleiben.

## 3. Technische Vorgaben (für alle Dateien)

| Punkt | Vorgabe |
|---|---|
| Format | SVG 1.1/2, UTF-8, reine Vektorgrafik |
| Zeichenfläche | Zellabbildung: `viewBox="0 0 640 480"`. Körperschema: `viewBox="0 0 408 584"`. Exakt diese Werte. Am Wurzelelement `<svg>` nur `xmlns` und `viewBox` – alle weiteren Attribute dort (`width`, `fill`, `style` …) werden beim Einbau verworfen |
| Dateigröße | höchstens 200 kB je Datei (Ziel unter 80 kB; Pfade vereinfachen, Nachkommastellen auf 1 begrenzen) |
| Verboten | `<script>`, `<style>`, `<foreignObject>`, `<image>` (auch keine eingebetteten Rasterbilder), SMIL-Animation (`<animate…>`, `<set>`), Event-Attribute (`onclick` …), DOCTYPE/ENTITY, externe Verweise (`href`/`url()` nur auf `#interne-id`) |
| Gestaltung | ausschließlich über Präsentationsattribute (`fill`, `stroke`, `stroke-width` …) oder `style="…"` am Element. **Kein** `<style>`-Block: Er würde in der Seite global wirken |
| Verläufe, Muster, Filter | erlaubt (`<linearGradient>`, `<pattern>`, `<filter>`), sparsam; Filter wie Weichzeichner nur dezent, sie kosten auf Handys Leistung |
| IDs | eindeutig innerhalb der Datei; nur Buchstaben, Ziffern, `-`, `_`, Beginn mit Buchstabe. Die Seite versieht beim Einbau alle IDs mit einem Präfix, Kollisionen zwischen Dateien sind also kein Problem |
| Text | als echter `<text>` (nicht in Pfade umwandeln), damit Korrekturen ohne Neulieferung möglich sind. **Keine** `font-family` setzen – die Seite setzt *Bricolage Grotesque* (Fließtext) bzw. *IBM Plex Mono* (Zonen). `font-size`, `font-weight`, `fill`, `text-anchor` sind erlaubt |
| Text-Klassen (optional) | `class="t"` gibt dem Text eine helle Kontur (lesbar auf Linien); `class="t zone"` setzt die Mono-Schrift mit Sperrung für Raumbezeichnungen wie „BLUT“; `class="tt"` für fette Kurzbeschriftungen in Symbolen |
| Schreibweise | Deutsch, neue Rechtschreibung. Chemische Formeln mit Unicode-Indizes: NO₃⁻, NO₂⁻, HCO₃⁻, H⁺, CO₂, O₂, H₂O, H₂CO₃; griechisch β, κ (βHB, NF-κB) |

Die Prüfung dieser Punkte ist automatisiert (Abschnitt 7). Fehlermeldungen nennen Datei und Regel.

## 4. Schnittstelle Zellabbildung (Abb. 2)

Die Datei ist ein statisches Bild. Bewegung und Schrittwechsel macht die Seite. Dafür gibt es zwei Kennzeichnungen.

### 4.1 Teilchenwege: `data-strom`

```svg
<path data-strom="no2" d="M256 88C330 50 480 50 530 96 …" fill="none" stroke="#8e44ad" stroke-width="1.7" stroke-dasharray="5 5" marker-end="url(#pfeil-lila)"/>
```

- Jeder im Katalog genannte Teilchenweg braucht **mindestens einen** `<path>` mit genau diesem `data-strom`-Namen. Mehrere Pfade mit demselben Namen sind erlaubt: Die Teilchen verteilen sich dann auf diese Pfade (z. B. drei Rezeptoren → drei Pfade `adeno`).
- Die **Laufrichtung ist die Zeichenrichtung** des Pfades (Startpunkt → Endpunkt). Teilchen erscheinen am Anfang und verblassen am Ende.
- Der Pfad selbst ist sichtbar und wird mit den Teilchen ein- und ausgeblendet. Empfohlen: gestrichelt, 1,5–2 px, in der Farbe des Stroms, Pfeilspitze laut Katalog. Soll der Weg unsichtbar sein: `stroke="none"`.
- `data-strom` nur an `<path>`, nicht an Gruppen. Der Pfad darf keine `transform`-Angabe haben und nicht in einer transformierten Gruppe liegen, sonst stimmen die Teilchenpositionen nicht.
- Andere Stromnamen als die im Katalog sind nicht erlaubt.

### 4.2 Schrittabhängige Elemente: `data-s`

```svg
<g data-s="0,1"> … Adenosin in der Bindetasche … </g>
<g data-s="2,3"> … Koffein in der Bindetasche … </g>
```

- Schritte sind **ab 0 gezählt**: Schritt 1 auf der Seite = `data-s="0"`.
- Elemente mit `data-s` sind nur in den genannten Schritten sichtbar; die Seite blendet weich über (0,45 s). Elemente ohne `data-s` sind immer sichtbar.
- An jedem Element erlaubt, sinnvollerweise an `<g>`.

### 4.3 Teilchen-Aussehen (optional): `<symbol id="teilchen-<name>">`

Ohne Angabe zeichnet die Seite die Teilchen selbst: farbige Form mit Kurzbeschriftung laut Katalog (z. B. Kapsel „NO₂⁻“). Wer eigene Teilchen gestalten will, legt pro Strom ein Symbol an:

```svg
<defs>
  <symbol id="teilchen-no2" overflow="visible">
    <!-- um den Nullpunkt (0,0) gezeichnet, etwa 24 × 20 Einheiten groß -->
    <rect x="-16" y="-9" width="32" height="18" rx="9" fill="#8e44ad" stroke="#2b2f38" stroke-width="1.4"/>
    <text class="tt" text-anchor="middle" dominant-baseline="central" font-size="10" fill="#fff">NO₂⁻</text>
  </symbol>
</defs>
```

Das Symbol wird am Nullpunkt zentriert und auf dem Pfad mitgeführt (ohne Drehung). Größe: Durchmesser etwa 16–24 Einheiten. Die Kurzbeschriftung im Teilchen ist Pflicht, denn Farbe allein trägt die Bedeutung nicht.

### 4.4 Was die Seite um das Bild herum setzt

Bildunterschrift („Abb. 2 …“), Legende mit den Katalogfarben, Schritt-Texte und Steuerung sind HTML und **nicht** Teil der Lieferung. Im Bild stehen nur Beschriftungen von Strukturen und kurze Hinweise.

## 5. Schnittstelle Körperschema (Abb. 1)

Ein neutrales Körperschema (Rumpf und Kopf von vorn) mit neun Organen. Für **jeden** der neun Orte `mund`, `magen`, `duenndarm`, `dickdarm`, `leber`, `blut`, `gehirn`, `muskel`, `niere` gilt:

| ID | Element | Zweck |
|---|---|---|
| `org-<ort>` | `<g>` mit der Zeichnung des Organs | Nicht beteiligte Organe blendet die Seite auf 28 % Deckkraft ab |
| `schild-<ort>` | `<g>` mit Beschriftung und Hinweislinie | Wird nur bei beteiligten Organen gezeigt |
| `anker-<ort>` | `<circle cx=… cy=…>` | Punkt, durch den die Route läuft und an dem die Stationsnummer sitzt. Liegt **direkt unter `<svg>`**, ohne `transform`. Wird auf der Seite unsichtbar |

Weitere Vorgaben:

- Auf `org-`/`schild-`-Gruppen **kein** `opacity`, `display` oder `visibility` setzen; das steuert die Seite.
- Die Seite zeichnet die Route als glatte Kurve durch die Anker, dazu Nummern-Kreise (Ø 23 Einheiten) und Teilchen. Anker deshalb so legen, dass die Nummern auf dem Organ gut sichtbar sind und sich nicht mit Schildern überdecken. Kommt ein Ort zweimal vor, setzt die Seite die zweite Nummer 23 Einheiten rechts daneben.
- `blut` steht für Herz und Kreislauf (bisher als Herz dargestellt, Schild „Herz · Blut“). `muskel` ist ein Skelettmuskel, z. B. Oberschenkel oder Unterarm. `mund` und Speiseröhre sollen als Weg zum Magen erkennbar sein.
- Links ist Platz für Schilder vorgesehen (Leber, Dünndarm, Muskel), rechts für die übrigen. Die Verteilung darf sich ändern, solange nichts abgeschnitten wird.
- Für die Wege je Supplement siehe Katalog („Stationen in Reihenfolge“). Am längsten ist Nitrat mit acht Stationen über Mund, Dünndarm, Blut, Mund, Magen, Dünndarm, Muskel und Niere.

## 6. Gestaltung (Schulbuch-Look)

**Gesamteindruck:** sachlich-freundlich, flächig, klar konturiert, wenig Verlauf. Vorbild sind hochwertige Biologie-Schulbücher und Lehrbuch-Abbildungen (Campbell, Linder). Keine Fotorealistik, kein 3D-Rendering, keine Comic-Gesichter.

| Thema | Vorgabe |
|---|---|
| Hintergrund der Seite | Papier `#f4efe4`, Bildfläche `#fffdf8` |
| Raumfarben (Richtwerte) | außen/Extrazellulär `#e3eef7` · Zytoplasma `#fdf1da` · Blut `#fbe2dd` · Mundraum `#fdebe6` · Darminneres `#f1f5df` |
| Konturen | 2–2,6 px in einer dunkleren Tönung der Füllfarbe; Feinstrukturen (Cristae, Helix-Sprossen) 1–1,5 px |
| Tinte für Text und Hinweislinien | `#2b2f38`; Hinweislinie 1,1 px mit Punkt (r ≈ 2,6) am Ziel |
| Farben der Teilchen | wie im Katalog je Strom, damit Legende, Teilchen und Pfade übereinstimmen |
| Membranen | Lipid-Doppelschicht mit Köpfchen und Schwänzen (Wiedererkennung über alle Abbildungen) |
| Wiederkehrende Strukturen | in allen Abbildungen gleich gezeichnet: Membran, Mitochondrium mit Cristae, Zellkern mit Doppelmembran, quergestreifte Muskelfaser, Blutgefäß mit Erythrozyten, Transporter als Kanal in der Membran |
| Schriftgrößen (in Einheiten der viewBox) | Strukturbeschriftung 14–16, fette Hervorhebung 15–18, Raumbezeichnung 12,5 (Mono, Versalien), Text in Teilchen 9–11 |
| Lesbarkeit | Die Zellabbildung erscheint auf dem Desktop etwa 640–700 px breit, auf dem Handy 580 px (seitlich wischbar). Schrift unter 12 Einheiten nur in Teilchen |
| Platz für Teilchen | Teilchenwege nicht durch dichte Beschriftung führen; um die Pfade herum ruhige Flächen lassen |
| Maßstab | schematisch, nicht maßstabsgetreu (steht in der Bildunterschrift) |
| Barrierearmut | Bedeutung nie nur über Farbe – Beschriftungen und Formen tragen sie mit. Kontrast Text zu Hintergrund mindestens 4,5 : 1 |

## 7. Lieferweg

Das Repository ist öffentlich. Geliefert wird per **Pull Request aus einem Fork**:

1. Repository forken, im Fork einen Branch anlegen (z. B. `abbildungen-pilot`).
2. Dateien unter `abbildungen/` ablegen (siehe Abschnitt 2).
3. Lokal prüfen und bauen (Node 22):
   ```bash
   npm ci
   npm run pruefe-abbildungen   # prüft alle gelieferten SVGs gegen dieses Lastenheft
   npm test
   npm run build                # baut dist/ neu – die Abbildungen werden ins Bündel übernommen
   ```
   Zur Sichtkontrolle `index.html` im Browser öffnen oder `npm run dev` starten (http://localhost:8000).
4. Die SVG-Dateien **und** das neu gebaute `dist/` committen. Die CI bricht ab, wenn `dist/` nicht zum Stand passt.
5. Pull Request nach `main` mit:
   - Liste der gelieferten Dateien,
   - Screenshot je Abbildung (Schritt 1 und 4 genügen),
   - Hinweis auf bewusste Abweichungen von Vorlage oder Katalog,
   - Rechte-Erklärung (Abschnitt 9).

Bei Pull Requests aus Forks muss der Repository-Inhaber die CI einmalig freigeben („Approve and run“).

## 8. Abnahme

Eine Lieferung ist abgenommen, wenn alle drei Stufen erfüllt sind:

**A. Automatisch (CI, muss grün sein)**
- Alle Regeln aus Abschnitt 3–5: Format, viewBox, verbotene Elemente, IDs, `data-strom`-Namen vollständig, `data-s` gültig, Pflicht-IDs im Körperschema.
- Tests und Build laufen, `dist/` ist aktuell.

**B. Fachlich (Prüfung durch den Auftraggeber anhand des Katalogs)**
- Alle Pflicht-Elemente sind vorhanden und korrekt beschriftet.
- Jeder Teilchenweg verläuft fachlich richtig: richtiger Start, richtiges Ziel, durch die richtige Struktur (z. B. Glukose durch SGLT1, nicht durch GLUT5).
- Jedes Bild passt in jedem Schritt zum Seitentext dieses Schritts. Was dort nicht steht, wird nicht behauptet.
- Keine zusätzlichen fachlichen Aussagen ohne Rücksprache (z. B. weitere Enzyme, Signalwege, Zahlen).

**C. Darstellung**
- Desktop (1440 px) und Handy (390 px) ohne abgeschnittene oder überlappende Beschriftungen, in allen vier Schritten.
- Teilchen bleiben auf ihren Pfaden gut sichtbar (nicht unter Flächen verdeckt).
- Einheitlicher Stil über alle gelieferten Abbildungen.

Korrekturwünsche kommen als Review-Kommentar am Pull Request.

## 9. Rechte und Lizenz

Das Repository und die Seite sind öffentlich. Deshalb gilt:

- Der Lieferant bestätigt im Pull Request, dass er die Rechte an den Abbildungen hat und keine Rechte Dritter verletzt. Insbesondere werden keine Abbildungen aus Lehrbüchern, Fachartikeln oder Bilddatenbanken nachgezeichnet.
- Bei KI-gestützter Erstellung: nur Werkzeuge, deren Nutzungsbedingungen die Veröffentlichung erlauben. Das Ergebnis muss reines SVG nach Abschnitt 3 sein.
- **Offen, legt der Auftraggeber vor der ersten Übernahme fest:** unter welcher Lizenz die Abbildungen im Repository stehen (z. B. CC BY 4.0 mit Namensnennung des Lieferanten) und ob/wie der Lieferant auf der Seite genannt wird.

## 10. Ansprechpartner und Fragen

Fragen zu Inhalt oder Schnittstelle als Issue im Repository oder als Kommentar am Pull Request. Ist eine Vorgabe aus fachlicher oder gestalterischer Sicht unglücklich, gern einen Gegenvorschlag machen – lieber vor dem Zeichnen klären als danach.

---

### Anhang: Technischer Hintergrund (für Entwickler)

- Prüfung: `src/bild/lieferung.js` (`pruefeZelle`, `pruefeKoerper`). Laden: `scripts/abbildungen.mjs`, eingebunden über ein esbuild-Plugin in `scripts/build.mjs`.
- Einbau zur Laufzeit: `src/bild/bild.js` (`baueSvg`, Klasse `Bild`), `src/bild/koerper.js` (`koerperSzene`).
- Schritte, Teilchenstärken und Texte: `src/bild/szenen.js`. Fachliche Vorgaben je Bild: `src/bild/vorgaben.js`. Katalog, Vorlagen und Vorschauen erzeugt `npm run lastenheft`.
