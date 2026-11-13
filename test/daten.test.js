// Prüft, dass Inhalte vollständig sind und die Abbildungen zu den Daten passen.
import test from 'node:test';
import assert from 'node:assert/strict';
import { supplements, EVIDENZ, byId } from '../src/data/supplements.js';
import { ROLLEN, ORTE } from '../src/data/zusatz.js';
import { szenen } from '../src/bild/szenen.js';
import { koerperSzene, ANKER } from '../src/bild/koerper.js';
import { baueSvg } from '../src/bild/bild.js';

test('jedes Supplement ist vollständig beschrieben', () => {
  assert.ok(supplements.length >= 9);
  const ids = new Set();
  for (const s of supplements) {
    assert.match(s.id, /^[a-z-]+$/);
    assert.ok(!ids.has(s.id), `doppelte id ${s.id}`);
    ids.add(s.id);
    for (const feld of ['name', 'gruppe', 'claim', 'urteil', 'empfehlung']) {
      assert.ok(s[feld] && s[feld].length > 2, `${s.id}: ${feld} fehlt`);
    }
    assert.match(s.farbe, /^#[0-9a-f]{6}$/, `${s.id}: Farbe`);
    assert.ok(EVIDENZ[s.evidenz], `${s.id}: unbekannte Evidenzstufe`);
    for (const feld of ['plus', 'dosis', 'timing', 'kosten']) assert.ok(s.aufEinenBlick[feld], `${s.id}: aufEinenBlick.${feld}`);
    for (const feld of ['wieviel', 'wann', 'wie', 'achtung']) assert.ok(s.einnahme[feld].length > 20, `${s.id}: einnahme.${feld}`);
    for (const feld of ['was', 'formen', 'nahrung', 'nebenwirkungen', 'kombi', 'fuerWen', 'doping']) {
      assert.ok(s.steckbrief[feld] && s.steckbrief[feld].length > 15, `${s.id}: steckbrief.${feld}`);
    }
    assert.ok(s.studien.leistungsplus.length > 40, `${s.id}: Leistungsplus`);
    assert.ok(s.studien.punkte.length >= 3, `${s.id}: Studienpunkte`);
    assert.ok(s.mechanismus.ort && s.mechanismus.kurz, `${s.id}: Mechanismus`);
    assert.equal(byId(s.id), s);
  }
});

test('Aufnahmeweg: bekannte Orte und Rollen, mindestens eine Aufnahme-Station, vier Kennzahlen', () => {
  for (const s of supplements) {
    const a = s.aufnahme;
    assert.ok(a.kurz.length > 40, `${s.id}: Kurzfassung`);
    assert.equal(a.kennzahlen.length, 4, `${s.id}: Kennzahlen`);
    for (const [l, w] of a.kennzahlen) assert.ok(l && w, `${s.id}: Kennzahl unvollständig`);
    assert.ok(a.weg.length >= 4, `${s.id}: Stationen`);
    for (const st of a.weg) {
      assert.ok(ORTE[st.ort] && ANKER[st.ort], `${s.id}: Ort „${st.ort}“ unbekannt`);
      assert.ok(ROLLEN[st.rolle], `${s.id}: Rolle „${st.rolle}“ unbekannt`);
      assert.ok(st.text.length > 20, `${s.id}: Stationstext`);
    }
    assert.ok(a.weg.some((st) => st.rolle === 'aufnahme'), `${s.id}: keine Aufnahme-Station`);
    const svg = baueSvg(koerperSzene(s), 't');
    assert.equal((svg.match(/<circle r="11.5"/g) || []).length, a.weg.length, `${s.id}: je Station eine Nummer`);
    assert.ok(!/NaN|undefined/.test(svg), `${s.id}: Körperbild fehlerhaft`);
  }
});

test('Quellen sind verlinkt (DOI) und Anbieter haben Preise', () => {
  for (const s of supplements) {
    assert.ok(s.quellen.length >= 2, `${s.id}: mindestens zwei Quellen`);
    const urls = s.quellen.map((q) => q.url);
    assert.equal(new Set(urls).size, urls.length, `${s.id}: Quelle doppelt`);
    for (const q of s.quellen) {
      assert.match(q.url, /^https:\/\/doi\.org\/10\.\d{4,}\//, `${s.id}: ${q.kurz} ohne DOI-Link`);
      assert.match(q.kurz, /(19|20)\d\d$/, `${s.id}: ${q.kurz} ohne Jahr`);
      assert.ok(q.titel && q.journal);
    }
    assert.ok(s.anbieter.length >= 2, `${s.id}: mindestens zwei Anbieter`);
    for (const a of s.anbieter) {
      assert.ok(a.name && a.preis && a.pro, `${s.id}: Anbieter unvollständig`);
      if (a.quelle) assert.match(a.quelle, /^https?:\/\//);
      else assert.ok(/Richtwert|hast du eh/.test(a.preis + a.pro), `${s.id}: Preis ohne Quelle muss als Richtwert markiert sein`);
    }
  }
});

test('Dosis-Rechner liefert für 45–110 kg sinnvolle Texte', () => {
  for (const s of supplements) {
    for (const kg of [45, 60, 75, 90, 110]) {
      const t = s.einnahme.rechner(kg);
      assert.equal(typeof t, 'string');
      assert.ok(t.length > 10 && !/NaN|undefined/.test(t), `${s.id} @ ${kg} kg: ${t}`);
    }
  }
  assert.match(byId('koffein').einnahme.rechner(75), /225–450 mg/);
  assert.match(byId('bicarbonat').einnahme.rechner(70), /14–21 g/);
});

test('jede Zell-Abbildung passt zu ihrem Supplement und verweist nur auf vorhandene Ströme und Schritte', () => {
  assert.deepEqual(Object.keys(szenen).sort(), supplements.map((s) => s.id).sort());
  for (const [id, sz] of Object.entries(szenen)) {
    assert.ok(sz.legende.length >= 3, `${id}: Legende`);
    assert.ok(sz.steps.length >= 4, `${id}: mindestens vier Schritte`);
    const svg = baueSvg(sz, 't');
    assert.ok(svg.startsWith('<svg') && svg.endsWith('</svg>'));
    assert.ok(!/NaN|undefined/.test(svg), `${id}: Zeichnung fehlerhaft`);
    const benutzt = new Set();
    sz.steps.forEach((st, i) => {
      assert.ok(st.titel.length > 3 && st.text.length > 60, `${id} Schritt ${i + 1}: Text`);
      for (const [f, v] of Object.entries(st.flows || {})) {
        assert.ok(sz.flows[f], `${id} Schritt ${i + 1}: Strom „${f}“ gibt es nicht`);
        assert.ok(v > 0 && v <= 1);
        benutzt.add(f);
      }
    });
    for (const f of Object.keys(sz.flows)) assert.ok(benutzt.has(f), `${id}: Strom „${f}“ wird nie gezeigt`);
    for (const m of svg.matchAll(/data-s="([^"]+)"/g)) {
      for (const n of m[1].split(',').map(Number)) assert.ok(n >= 0 && n < sz.steps.length, `${id}: data-s zeigt auf Schritt ${n}`);
    }
  }
});
