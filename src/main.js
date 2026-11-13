import '@fontsource-variable/bricolage-grotesque/wght.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './styles.css';
import { supplements, byId, EVIDENZ, PREIS_STAND } from './data/supplements.js';
import { ROLLEN, ORTE } from './data/zusatz.js';
import { szenen } from './bild/szenen.js';
import { koerperSzene } from './bild/koerper.js';
import { Bild } from './bild/bild.js';
import geliefert from 'abbildungen:geliefert';

const SCHRITT_DAUER = 9000;
const ruhig = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// kleines DOM-Helferlein: h('div', {class: 'x'}, kind1, 'text', …)
function h(tag, attrs = {}, ...kinder) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else if (k === 'style') el.style.cssText = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of kinder.flat()) {
    if (c == null || c === false) continue;
    el.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return el;
}

const state = { id: null, kg: 75, step: 0, spielt: !ruhig, bilder: [], timer: 0, ui: {} };
const gruppenName = (g) => (g === 'Trend' ? 'Neu & Trend' : 'Kern-Set Ausdauer');

// ── Menü ───────────────────────────────────────────────────────────
function baueMenue() {
  const nav = document.getElementById('menue');
  const gruppen = [...new Set(supplements.map((s) => s.gruppe))];
  nav.replaceChildren(
    ...gruppen.map((g) =>
      h(
        'div',
        { class: 'menue__gruppe' },
        h('p', { class: 'menue__titel' }, gruppenName(g)),
        h(
          'ul',
          {},
          supplements
            .filter((s) => s.gruppe === g)
            .map((s) =>
              h(
                'li',
                {},
                h(
                  'a',
                  { href: `#${s.id}`, class: 'menue__link', 'data-id': s.id, style: `--akz:${s.farbe}` },
                  h('span', { class: 'menue__punkt', 'aria-hidden': 'true' }),
                  h('span', { class: 'menue__name' }, s.name),
                  h('span', { class: `evi evi--${s.evidenz}`, title: `Evidenz: ${EVIDENZ[s.evidenz].label}` }, s.evidenz),
                ),
              ),
            ),
        ),
      ),
    ),
  );
}

// ── Bausteine der Detailansicht ────────────────────────────────────
const kachel = (label, wert, klasse = '') =>
  h('div', { class: `kachel ${klasse}` }, h('p', { class: 'kachel__label' }, label), h('p', { class: 'kachel__wert' }, wert));

const karte = (id, titel, ...inhalt) => h('section', { class: `karte karte--${id}`, id: `a-${id}` }, h('h2', { class: 'karte__titel' }, titel), ...inhalt);

const zeilen = (...paare) => h('dl', { class: 'zeilen' }, paare.map(([label, text]) => h('div', { class: 'zeile' }, h('dt', {}, label), h('dd', {}, text))));

function abbildung(nr, titel, unterzeile, ...inhalt) {
  return h(
    'figure',
    { class: 'tafel' },
    ...inhalt,
    h('figcaption', { class: 'tafel__titel' }, h('b', {}, `Abb. ${nr}`), titel, unterzeile && h('small', {}, unterzeile)),
  );
}

function baueAufnahme(s, ui) {
  ui.koerper = h('div', { class: 'tafel__bild tafel__bild--koerper' });
  return h(
    'section',
    { class: 'block block--aufnahme', id: 'a-aufnahme' },
    h('h2', { class: 'block__titel' }, h('span', {}, '1'), 'Aufnahme: Wo und wie kommt es in den Körper?'),
    h(
      'div',
      { class: 'block__raster' },
      abbildung(1, 'Der Weg durch den Körper', 'Die Nummern entsprechen den Stationen rechts.', ui.koerper),
      h(
        'div',
        { class: 'weg' },
        h('p', { class: 'kurz' }, s.aufnahme.kurz),
        h('div', { class: 'kennzahlen' }, s.aufnahme.kennzahlen.map(([l, w]) => kachel(l, w))),
        h(
          'ol',
          { class: 'stationen' },
          s.aufnahme.weg.map((st, i) =>
            h(
              'li',
              { class: `station station--${st.rolle}` },
              h('span', { class: 'station__nr' }, i + 1),
              h('div', {}, h('p', { class: 'station__kopf' }, ORTE[st.ort], h('span', { class: 'rolle' }, ROLLEN[st.rolle])), h('p', { class: 'station__text' }, st.text)),
            ),
          ),
        ),
      ),
    ),
  );
}

function baueWirkung(s, sz, ui) {
  ui.schritte = sz.steps.map((st, i) =>
    h(
      'li',
      {},
      h(
        'button',
        { class: 'schritt', type: 'button', 'aria-expanded': 'false', onclick: () => geheZu(i) },
        h('span', { class: 'schritt__nr' }, i + 1),
        h('span', { class: 'schritt__kopf' }, st.titel),
        h('span', { class: 'schritt__text' }, st.text),
        h('span', { class: 'schritt__lauf', 'aria-hidden': 'true' }),
      ),
    ),
  );
  ui.play = h('button', { class: 'knopf knopf--breit', type: 'button', onclick: () => setzeSpielt(!state.spielt) });
  ui.zelle = h('div', { class: 'tafel__bild' });
  return h(
    'section',
    { class: 'block block--wirkung', id: 'a-wirkung' },
    h('h2', { class: 'block__titel' }, h('span', {}, '2'), 'Wirkung: Was passiert in der Zelle?'),
    h(
      'div',
      { class: 'block__raster block__raster--breit' },
      abbildung(
        2,
        s.mechanismus.ort,
        'Schematisch, nicht maßstabsgetreu.',
        ui.zelle,
        h('ul', { class: 'legende' }, sz.legende.map((l) => h('li', {}, h('i', { style: `background:${l.farbe}` }), l.label))),
      ),
      h(
        'div',
        { class: 'ablauf' },
        h('p', { class: 'kurz' }, s.mechanismus.kurz),
        h('ol', { class: 'ablauf__liste' }, ui.schritte),
        h(
          'div',
          { class: 'ablauf__steuer' },
          h('button', { class: 'knopf', type: 'button', onclick: () => geheZu(state.step - 1), 'aria-label': 'Schritt zurück' }, '←'),
          ui.play,
          h('button', { class: 'knopf', type: 'button', onclick: () => geheZu(state.step + 1), 'aria-label': 'Schritt weiter' }, '→'),
        ),
      ),
    ),
  );
}

// Gelieferte Zeichnung (abbildungen/zelle/<id>.svg) ersetzt die eingebaute
const zellSzene = (id) => (geliefert.zelle[id] ? { ...szenen[id], svg: geliefert.zelle[id] } : szenen[id]);

function baueDetail(s) {
  const sz = zellSzene(s.id);
  const ev = EVIDENZ[s.evidenz];
  const ui = (state.ui = {});
  ui.rechner = h('p', { class: 'rechner__wert' });
  const sb = s.steckbrief;

  const sprung = [
    ['aufnahme', 'Aufnahme'],
    ['wirkung', 'Wirkung'],
    ['einnahme', 'Einnahme'],
    ['studien', 'Studien'],
    ['anbieter', 'Preise'],
    ['empfehlung', 'Empfehlung'],
    ['quellen', 'Quellen'],
  ];

  return h(
    'article',
    { class: 'detail', style: `--akz:${s.farbe}` },
    h('header', { class: 'titel' }, h('p', { class: 'titel__gruppe' }, gruppenName(s.gruppe)), h('h1', {}, s.name), h('p', { class: 'titel__claim' }, s.claim)),
    h(
      'section',
      { class: 'blick', 'aria-label': 'Auf einen Blick' },
      h(
        'div',
        { class: 'kachel kachel--urteil' },
        h('p', { class: 'kachel__label' }, 'Urteil'),
        h('p', { class: 'kachel__wert' }, s.urteil),
        h('p', { class: 'kachel__evi' }, h('span', { class: `evi evi--${s.evidenz}` }, s.evidenz), `Evidenz: ${ev.label}`),
      ),
      kachel('Leistungsplus', s.aufEinenBlick.plus),
      kachel('Dosis', s.aufEinenBlick.dosis),
      kachel('Timing', s.aufEinenBlick.timing),
      kachel('Aufnahme', s.aufnahme.kennzahlen[0][1]),
      kachel('Kosten', s.aufEinenBlick.kosten),
    ),
    h(
      'nav',
      { class: 'sprung', 'aria-label': 'Abschnitte' },
      sprung.map(([id, name]) =>
        h('button', { type: 'button', onclick: () => document.getElementById(`a-${id}`)?.scrollIntoView({ behavior: ruhig ? 'auto' : 'smooth', block: 'start' }) }, name),
      ),
    ),
    h('p', { class: 'wasistdas' }, h('b', {}, 'Was ist das? '), sb.was),
    baueAufnahme(s, ui),
    baueWirkung(s, sz, ui),
    h(
      'div',
      { class: 'raster' },
      karte(
        'einnahme',
        'Einnahme',
        zeilen(
          ['Wie viel', s.einnahme.wieviel],
          ['Wann', s.einnahme.wann],
          ['Wie', s.einnahme.wie],
          ['Formen', sb.formen],
          ['Im Essen', sb.nahrung],
          ['Kombinieren', sb.kombi],
          ['Achtung', s.einnahme.achtung],
          ['Neben\u00adwirkungen', sb.nebenwirkungen],
        ),
        h('div', { class: 'rechner' }, h('p', { class: 'rechner__label' }, 'Für dich gerechnet'), ui.rechner),
      ),
      karte(
        'studien',
        'Studienlage',
        h('p', { class: 'studien__plus' }, s.studien.leistungsplus),
        h('ul', { class: 'punkte' }, s.studien.punkte.map((p) => h('li', {}, p))),
        h('p', { class: 'studien__evi' }, h('span', { class: `evi evi--${s.evidenz}` }, s.evidenz), ev.text),
      ),
      karte(
        'anbieter',
        'Anbieter & Preise',
        h(
          'ul',
          { class: 'anbieter' },
          s.anbieter.map((a) =>
            h(
              'li',
              {},
              h('p', { class: 'anbieter__name' }, a.name),
              h('p', { class: 'anbieter__preis' }, a.preis, h('span', {}, a.pro)),
              a.quelle
                ? h('a', { href: a.quelle, target: '_blank', rel: 'noopener noreferrer' }, 'Preisquelle')
                : h('span', { class: 'anbieter__ohne' }, 'Richtwert, ohne Einzelquelle'),
            ),
          ),
        ),
        h('p', { class: 'klein' }, `Stand ${PREIS_STAND}. Preise ändern sich – vor dem Kauf kurz vergleichen.`),
      ),
      karte('empfehlung', 'Empfehlung', h('p', { class: 'empfehlung' }, s.empfehlung), zeilen(['Wofür', sb.fuerWen], ['Doping-Status', sb.doping])),
      karte(
        'quellen',
        'Quellen',
        h(
          'ol',
          { class: 'quellen' },
          s.quellen.map((q) => h('li', {}, h('a', { href: q.url, target: '_blank', rel: 'noopener noreferrer' }, q.kurz), h('span', {}, ` ${q.titel}. `), h('em', {}, q.journal))),
        ),
      ),
    ),
  );
}

// ── Ablaufsteuerung ────────────────────────────────────────────────
function rechne() {
  const s = byId(state.id);
  if (s && state.ui.rechner) state.ui.rechner.textContent = s.einnahme.rechner(state.kg);
}

function setzeSpielt(an) {
  state.spielt = an;
  if (state.ui.play) {
    state.ui.play.textContent = an ? 'Pause' : 'Abspielen';
    state.ui.play.setAttribute('aria-pressed', String(an));
  }
  document.documentElement.classList.toggle('spielt', an);
  for (const b of state.bilder) (an ? b.start() : b.stop());
  plane();
}

function plane() {
  clearTimeout(state.timer);
  if (!state.spielt || document.hidden) return;
  state.timer = setTimeout(() => geheZu(state.step + 1), SCHRITT_DAUER);
}

function geheZu(i) {
  const n = szenen[state.id].steps.length;
  state.step = ((i % n) + n) % n;
  state.ui.schritte.forEach((li, k) => {
    const b = li.firstChild;
    const aktiv = k === state.step;
    b.classList.toggle('ist-aktiv', aktiv);
    b.setAttribute('aria-expanded', String(aktiv));
    if (aktiv) {
      const lauf = b.querySelector('.schritt__lauf');
      lauf.style.animation = 'none';
      void lauf.offsetWidth;
      lauf.style.animation = '';
    }
  });
  state.zelle?.setStep(state.step);
  plane();
}

function zeige(id) {
  const s = byId(id) || supplements[0];
  state.id = s.id;
  document.title = `${s.name} – Supplement-Wiki`;
  document.querySelectorAll('.menue__link').forEach((a) => {
    const an = a.dataset.id === s.id;
    a.classList.toggle('ist-aktiv', an);
    if (an) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
    if (an && a.scrollIntoView && window.innerWidth < 900) a.scrollIntoView({ block: 'nearest', inline: 'center' });
  });

  for (const b of state.bilder) b.dispose();
  document.getElementById('inhalt').replaceChildren(baueDetail(s));
  rechne();
  state.zelle = new Bild(state.ui.zelle, zellSzene(s.id), { ruhig });
  state.bilder = [new Bild(state.ui.koerper, koerperSzene(s, geliefert.koerper), { ruhig }), state.zelle];
  geheZu(0);
  setzeSpielt(state.spielt);
  window.scrollTo(0, 0);
}

// ── Start ──────────────────────────────────────────────────────────
function init() {
  document.getElementById('preisstand').textContent = PREIS_STAND;
  baueMenue();
  const gw = document.getElementById('gewicht');
  try {
    const gespeichert = Number(localStorage.getItem('kg'));
    if (gespeichert >= 40 && gespeichert <= 130) state.kg = gespeichert;
  } catch {
    /* Speicher nicht verfügbar – dann eben ohne */
  }
  gw.value = state.kg;
  gw.addEventListener('input', () => {
    const v = Number(gw.value);
    if (v >= 40 && v <= 130) {
      state.kg = v;
      try {
        localStorage.setItem('kg', String(v));
      } catch {
        /* egal */
      }
      rechne();
    }
  });
  window.addEventListener('hashchange', () => zeige(location.hash.slice(1)));
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT') return;
    if (e.key === 'ArrowRight') geheZu(state.step + 1);
    if (e.key === 'ArrowLeft') geheZu(state.step - 1);
  });
  document.addEventListener('visibilitychange', () => {
    for (const b of state.bilder) (document.hidden || !state.spielt ? b.stop() : b.start());
    plane();
  });
  zeige(location.hash.slice(1) || supplements[0].id);
}

init();
