# Supplement-Wiki

Supplemente für den Ausdauersport auf einen Blick: Supplement im Menü wählen und sehen,

- wo und wie es aufgenommen wird (Abb. 1: Weg durch den Körper, Kennzahlen),
- wie es in der Zelle wirkt (Abb. 2: Lehrbuch-Zeichnung in vier Schritten),
- wie viel, wann und wie man es nimmt (mit Rechner fürs eigene Körpergewicht),
- welche Anbieter es gibt und was es kostet,
- was die Studien an Leistungsplus zeigen,
- und ob es sich lohnt.

Enthalten: Koffein, Nitrat, Natriumbicarbonat, Beta-Alanin, Kreatin, Kohlenhydrate (Glukose + Fruktose),
ITC/Brokkolisprossen (Nomio), Ketonester, Sauerkirsch-Polyphenole.

## Ansehen

`index.html` im Browser öffnen – das fertige Bündel liegt in `dist/` und läuft ohne Server.

## Entwickeln

```bash
npm install
npm run dev     # baut bei jeder Änderung neu, http://localhost:8000
npm test        # prüft Inhalte und Szenen
npm run build   # schreibt dist/ (wird mit eingecheckt)
```

## Aufbau

| Pfad | Inhalt |
| --- | --- |
| `src/data/supplements.js` | Alle Texte, Dosierungen, Preise und Quellen |
| `src/data/zusatz.js` | Steckbrief und Aufnahmeweg je Supplement |
| `src/bild/szenen.js` | Abb. 2 je Supplement: Zeichnung, Legende, Schritte |
| `src/bild/koerper.js` | Abb. 1: Körperschema mit den Stationen des Aufnahmewegs |
| `src/bild/teile.js`, `src/bild/bild.js` | Zeichen-Bausteine (SVG) und die Darstellung mit wandernden Teilchen |
| `src/main.js`, `src/styles.css` | Oberfläche |
| `test/` | Prüft Vollständigkeit der Inhalte und dass Szenen nur vorhandene Elemente ansprechen |

## Neues Supplement ergänzen

1. Eintrag in `src/data/supplements.js` (jede Zahl mit DOI-Quelle; Preise ohne Einzelquelle als „Richtwert“ kennzeichnen).
2. Steckbrief und Aufnahmeweg mit derselben `id` in `src/data/zusatz.js`.
3. Zell-Abbildung mit derselben `id` in `src/bild/szenen.js`.
4. `npm test && npm run build`.

## Hinweise zum Inhalt

- Stand der Recherche und der Preise: November 2026.
- Evidenzstufen: A = mehrere Meta-Analysen/Positionspapiere, B = solide, aber situativ, C = dünn oder umstritten.
- Die Abbildungen sind Schemata, keine maßstabsgetreuen Strukturen.
- Kein medizinischer Rat.
