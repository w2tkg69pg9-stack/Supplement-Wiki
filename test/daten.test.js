// Prüft, dass Inhalte vollständig sind und Szenen zu den Daten passen.
import test from 'node:test';
import assert from 'node:assert/strict';
import { supplements, EVIDENZ, byId } from '../src/data/supplements.js';
import { scenes } from '../src/scene/scenes.js';

// Attrappe der 3D-Bühne: merkt sich nur, welche Namen eine Szene anlegt.
function attrappe() {
  const namen = { flows: new Set(), objs: new Set(), labels: [] };
  const obj = () => ({ material: {}, position: {}, scale: {} });
  const mitName = (_, name, name2) => {
    if (name) namen.objs.add(name);
    if (name2) namen.objs.add(name2);
    return obj();
  };
  return {
    namen,
    membrane: obj,
    channel: mitName,
    receptor: mitName,
    blob: mitName,
    sphere: mitName,
    mito: mitName,
    nucleus: mitName,
    barrel: mitName,
    fibril: mitName,
    bacteria: mitName,
    vessel: mitName,
    flow: (name, o) => {
      assert.ok(o.paths.length > 0 && o.paths.every((p) => p.length >= 2), `Strom ${name} braucht Pfade`);
      namen.flows.add(name);
    },
    cloud: (name) => namen.flows.add(name),
    label: (text, pos, o = {}) => namen.labels.push({ text, steps: o.steps }),
  };
}

test('jedes Supplement ist vollständig beschrieben', () => {
  assert.ok(supplements.length >= 9);
  const ids = new Set();
  for (const s of supplements) {
    assert.match(s.id, /^[a-z-]+$/);
    assert.ok(!ids.has(s.id), `doppelte id ${s.id}`);
    ids.add(s.id);
    for (const feld of ['name', 'gruppe', 'claim', 'farbe', 'urteil', 'empfehlung']) {
      assert.ok(s[feld] && s[feld].length > 2, `${s.id}: ${feld} fehlt`);
    }
    assert.ok(EVIDENZ[s.evidenz], `${s.id}: unbekannte Evidenzstufe`);
    for (const feld of ['plus', 'dosis', 'timing', 'kosten']) assert.ok(s.aufEinenBlick[feld], `${s.id}: aufEinenBlick.${feld}`);
    for (const feld of ['wieviel', 'wann', 'wie', 'achtung']) assert.ok(s.einnahme[feld].length > 20, `${s.id}: einnahme.${feld}`);
    assert.ok(s.studien.leistungsplus.length > 40, `${s.id}: Leistungsplus`);
    assert.ok(s.studien.punkte.length >= 3, `${s.id}: Studienpunkte`);
    assert.ok(s.mechanismus.ort && s.mechanismus.kurz, `${s.id}: Mechanismus`);
    assert.equal(byId(s.id), s);
  }
});

test('Quellen sind verlinkt (DOI) und Anbieter haben Preise', () => {
  for (const s of supplements) {
    assert.ok(s.quellen.length >= 2, `${s.id}: mindestens zwei Quellen`);
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

test('jede Szene passt zu ihrem Supplement und verweist nur auf vorhandene Elemente', () => {
  assert.deepEqual(Object.keys(scenes).sort(), supplements.map((s) => s.id).sort());
  for (const [id, sz] of Object.entries(scenes)) {
    const b = attrappe();
    sz.build(b);
    assert.equal(sz.cam.pos.length, 3);
    assert.ok(sz.legende.length >= 3, `${id}: Legende`);
    assert.ok(sz.steps.length >= 4, `${id}: mindestens vier Schritte`);
    const benutzt = new Set();
    sz.steps.forEach((st, i) => {
      assert.ok(st.titel.length > 3 && st.text.length > 60, `${id} Schritt ${i + 1}: Text`);
      for (const [f, v] of Object.entries(st.flows || {})) {
        assert.ok(b.namen.flows.has(f), `${id} Schritt ${i + 1}: Strom „${f}“ gibt es nicht`);
        assert.ok(v > 0 && v <= 1);
        benutzt.add(f);
      }
      for (const o of Object.keys(st.set || {})) assert.ok(b.namen.objs.has(o), `${id} Schritt ${i + 1}: Objekt „${o}“ gibt es nicht`);
    });
    for (const f of b.namen.flows) assert.ok(benutzt.has(f), `${id}: Strom „${f}“ wird nie gezeigt`);
    for (const l of b.namen.labels) {
      for (const n of l.steps || []) assert.ok(n >= 0 && n < sz.steps.length, `${id}: Beschriftung „${l.text}“ zeigt auf Schritt ${n}`);
    }
  }
});
