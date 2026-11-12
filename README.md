# Supplement-Wiki

Supplemente für den Ausdauersport auf einen Blick: Supplement im Menü wählen und sehen,

- wie es in der Zelle wirkt (3D-Animation in vier Schritten),
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
| `src/scene/scenes.js` | Die 3D-Szene je Supplement: Aufbau, Legende, Schritte |
| `src/scene/stage.js` | 3D-Bühne (three.js): Membran, Kanäle, Organellen, Teilchenströme |
| `src/main.js`, `src/styles.css` | Oberfläche |
| `test/` | Prüft Vollständigkeit der Inhalte und dass Szenen nur vorhandene Elemente ansprechen |

## Neues Supplement ergänzen

1. Eintrag in `src/data/supplements.js` (jede Zahl mit DOI-Quelle; Preise ohne Einzelquelle als „Richtwert“ kennzeichnen).
2. Szene mit derselben `id` in `src/scene/scenes.js`.
3. `npm test && npm run build`.

## Hinweise zum Inhalt

- Stand der Recherche und der Preise: November 2026.
- Evidenzstufen: A = mehrere Meta-Analysen/Positionspapiere, B = solide, aber situativ, C = dünn oder umstritten.
- Die 3D-Szenen sind Schemata, keine maßstabsgetreuen Strukturen.
- Kein medizinischer Rat.
