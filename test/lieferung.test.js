// Prüft die Lieferschnittstelle für Abbildungen und dass die Lastenheft-Anhänge aktuell sind.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { supplements } from '../src/data/supplements.js';
import { szenen } from '../src/bild/szenen.js';
import { vorgaben } from '../src/bild/vorgaben.js';
import { koerperSzene, koerperVorlage } from '../src/bild/koerper.js';
import { baueSvg } from '../src/bild/bild.js';
import { pruefeZelle, pruefeKoerper, praefix, anker, KOERPER_ORTE } from '../src/bild/lieferung.js';
import { erzeuge } from '../scripts/lastenheft.mjs';
import { ladeLieferung } from '../scripts/abbildungen.mjs';

test('fachliche Vorgaben decken jede Abbildung und jeden Teilchenweg ab', () => {
  assert.deepEqual(Object.keys(vorgaben).sort(), Object.keys(szenen).sort());
  for (const [id, v] of Object.entries(vorgaben)) {
    assert.ok(v.elemente.length >= 4, `${id}: Pflicht-Elemente`);
    assert.deepEqual(Object.keys(v.stroeme).sort(), Object.keys(szenen[id].flows).sort(), `${id}: Teilchenwege`);
  }
});

test('Vorlagen bestehen die Lieferprüfung und lassen sich einbauen', () => {
  const dateien = erzeuge();
  for (const s of supplements) {
    const text = dateien[`docs/abbildungen/vorlagen/zelle/${s.id}.svg`];
    assert.deepEqual(pruefeZelle(text, szenen[s.id]), [], s.id);
    const svg = baueSvg({ ...szenen[s.id], svg: text }, 'x');
    assert.ok(!/NaN|undefined/.test(svg));
    assert.ok(svg.includes(`data-teilchen="${Object.keys(szenen[s.id].flows)[0]}"`));
  }
  const k = koerperVorlage();
  assert.deepEqual(pruefeKoerper(k), []);
  assert.equal(Object.keys(anker(k)).length, KOERPER_ORTE.length);
  for (const s of supplements) {
    const svg = baueSvg(koerperSzene(s, k), 'k');
    assert.ok(!/NaN|undefined/.test(svg), s.id);
    const dabei = new Set(s.aufnahme.weg.map((w) => w.ort));
    for (const ort of KOERPER_ORTE) {
      assert.equal(svg.includes(`id="k-schild-${ort}" display="none"`), !dabei.has(ort), `${s.id}: Schild ${ort}`);
      assert.equal(svg.includes(`id="k-org-${ort}" opacity="0.28"`), !dabei.has(ort), `${s.id}: Organ ${ort}`);
    }
  }
});

test('Lieferprüfung erkennt Regelverstöße', () => {
  const sz = szenen.nitrat;
  const gut = erzeuge()['docs/abbildungen/vorlagen/zelle/nitrat.svg'];
  const faelle = [
    [gut.replace('viewBox="0 0 640 480"', 'viewBox="0 0 800 600"'), /viewBox/],
    [gut.replace('</svg>', '<script>alert(1)</script></svg>'), /script/],
    [gut.replace('</svg>', '<style>text{fill:red}</style></svg>'), /style/],
    [gut.replace('</svg>', '<image href="data:image/png;base64,AA"/></svg>'), /Rastergrafik/],
    [gut.replace('</svg>', '<use href="https://example.org/x.svg#a"/></svg>'), /nach außen/],
    [gut.replace(/data-strom="atp"/g, 'data-strom="energie"'), /energie.*nicht|fehlt/],
    [gut.replace('data-s="3"', 'data-s="4"'), /data-s="4"/],
    [gut.replace('</svg>', '<g transform="translate(5 5)"><path data-strom="atp" d="M0 0L10 10"/></g></svg>'), /transform/],
    [gut.replace('<text ', '<text font-family="Arial" '), /font-family/],
  ];
  for (const [text, re] of faelle) {
    const f = pruefeZelle(text, sz);
    assert.ok(f.some((x) => re.test(x)), `erwartet ${re}, bekommen: ${f.join(' | ')}`);
  }
  const k = koerperVorlage();
  assert.ok(pruefeKoerper(k.replace('id="anker-niere"', 'id="anker-nieren"')).some((x) => /anker-niere/.test(x)));
  assert.ok(pruefeKoerper(k.replace('id="org-leber"', 'id="org-leber" opacity="0.5"')).some((x) => /opacity/.test(x)));
  assert.ok(pruefeKoerper(k.replace(/(<circle id="anker-mund"[^>]*\/>)/, '<g transform="scale(2)">$1</g>')).some((x) => /direkt unter/.test(x)));
});

test('Präfix erfasst IDs, url()- und href-Verweise', () => {
  const t = '<svg viewBox="0 0 1 1"><defs><marker id="m"/><symbol id="teilchen-a"/></defs><path marker-end="url(#m)"/><use href="#teilchen-a"/></svg>';
  const p = praefix(t, 'b1');
  assert.ok(p.includes('id="b1-m"') && p.includes('url(#b1-m)') && p.includes('href="#b1-teilchen-a"'));
});

test('Lastenheft-Anhänge in docs/abbildungen sind aktuell', async () => {
  for (const [pfad, inhalt] of Object.entries(erzeuge())) {
    assert.ok(existsSync(pfad), `${pfad} fehlt – npm run lastenheft`);
    assert.equal(await readFile(pfad, 'utf8'), inhalt, `${pfad} veraltet – npm run lastenheft`);
  }
});

test('gelieferte Abbildungen in abbildungen/ sind gültig', async () => {
  const { fehler } = await ladeLieferung();
  assert.deepEqual(fehler, []);
});
