import '@fontsource-variable/bricolage-grotesque/wght.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import './styles.css';
import { supplements, byId, EVIDENZ, PREIS_STAND } from './data/supplements.js';
import { scenes } from './scene/scenes.js';
import { Stage, webglVerfuegbar } from './scene/stage.js';

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
const hex = (n) => (typeof n === 'number' ? `#${n.toString(16).padStart(6, '0')}` : n);

const state = {
  id: null,
  kg: 75,
  step: 0,
  spielt: !ruhig,
  stage: null,
  timer: 0,
  start: 0,
  ui: {},
};

// ── Menü ───────────────────────────────────────────────────────────
function baueMenue() {
  const nav = document.getElementById('menue');
  const gruppen = [...new Set(supplements.map((s) => s.gruppe))];
  nav.replaceChildren(
    ...gruppen.map((g) =>
      h(
        'div',
        { class: 'menue__gruppe' },
        h('p', { class: 'menue__titel' }, g === 'Trend' ? 'Neu & Trend' : 'Kern-Set Ausdauer'),
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

// ── Detailansicht ──────────────────────────────────────────────────
function kachel(label, wert) {
  return h('div', { class: 'kachel' }, h('p', { class: 'kachel__label' }, label), h('p', { class: 'kachel__wert' }, wert));
}

function karte(titel, klasse, ...inhalt) {
  return h('section', { class: `karte ${klasse || ''}` }, h('h2', { class: 'karte__titel' }, titel), ...inhalt);
}

function zeile(label, text) {
  return h('div', { class: 'zeile' }, h('dt', {}, label), h('dd', {}, text));
}

function baueDetail(s) {
  const sz = scenes[s.id];
  const ev = EVIDENZ[s.evidenz];
  const ui = (state.ui = {});

  ui.rechner = h('p', { class: 'rechner__wert' });
  ui.schritte = sz.steps.map((st, i) =>
    h(
      'li',
      {},
      h(
        'button',
        { class: 'schritt', type: 'button', 'aria-expanded': 'false', onclick: () => geheZu(i) },
        h('span', { class: 'schritt__nr' }, String(i + 1).padStart(2, '0')),
        h('span', { class: 'schritt__kopf' }, st.titel),
        h('span', { class: 'schritt__text' }, st.text),
        h('span', { class: 'schritt__lauf', 'aria-hidden': 'true' }),
      ),
    ),
  );
  ui.play = h('button', { class: 'knopf', type: 'button', onclick: () => setzeSpielt(!state.spielt) });
  ui.buehne = h('div', { class: 'buehne__canvas' });

  const mechanismus = h(
    'section',
    { class: 'mech', 'aria-label': 'Wirkmechanismus' },
    h(
      'div',
      { class: 'buehne' },
      h('p', { class: 'buehne__ort' }, h('span', {}, 'Schauplatz'), s.mechanismus.ort, h('small', {}, 'Ziehen = drehen · Scrollen = zoomen')),
      ui.buehne,
      h(
        'ul',
        { class: 'legende' },
        sz.legende.map((l) => h('li', {}, h('i', { style: `background:${hex(l.farbe)};box-shadow:0 0 10px ${hex(l.farbe)}` }), l.label)),
      ),
    ),
    h(
      'div',
      { class: 'ablauf' },
      h('p', { class: 'ablauf__kurz' }, s.mechanismus.kurz),
      h('ol', { class: 'ablauf__liste' }, ui.schritte),
      h(
        'div',
        { class: 'ablauf__steuer' },
        h('button', { class: 'knopf', type: 'button', onclick: () => geheZu(state.step - 1), 'aria-label': 'Schritt zurück' }, '←'),
        ui.play,
        h('button', { class: 'knopf', type: 'button', onclick: () => geheZu(state.step + 1), 'aria-label': 'Schritt weiter' }, '→'),
      ),
    ),
  );

  const el = h(
    'article',
    { class: 'detail', style: `--akz:${s.farbe}` },
    h(
      'header',
      { class: 'titel' },
      h('p', { class: 'titel__gruppe' }, s.gruppe === 'Trend' ? 'Neu & Trend' : 'Kern-Set Ausdauer'),
      h('h1', {}, s.name),
      h('p', { class: 'titel__claim' }, s.claim),
    ),
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
      kachel('Kosten', s.aufEinenBlick.kosten),
    ),
    mechanismus,
    h(
      'div',
      { class: 'raster' },
      karte(
        'Einnahme',
        'karte--einnahme',
        h(
          'dl',
          { class: 'zeilen' },
          zeile('Wie viel', s.einnahme.wieviel),
          zeile('Wann', s.einnahme.wann),
          zeile('Wie', s.einnahme.wie),
          zeile('Achtung', s.einnahme.achtung),
        ),
        h('div', { class: 'rechner' }, h('p', { class: 'rechner__label' }, 'Für dich gerechnet'), ui.rechner),
      ),
      karte(
        'Studienlage',
        'karte--studien',
        h('p', { class: 'studien__plus' }, s.studien.leistungsplus),
        h('ul', { class: 'punkte' }, s.studien.punkte.map((p) => h('li', {}, p))),
        h('p', { class: 'studien__evi' }, h('span', { class: `evi evi--${s.evidenz}` }, s.evidenz), ev.text),
      ),
      karte(
        'Anbieter & Preise',
        'karte--anbieter',
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
      karte('Empfehlung', 'karte--empfehlung', h('p', { class: 'empfehlung' }, s.empfehlung)),
      karte(
        'Quellen',
        'karte--quellen',
        h(
          'ol',
          { class: 'quellen' },
          s.quellen.map((q) =>
            h(
              'li',
              {},
              h('a', { href: q.url, target: '_blank', rel: 'noopener noreferrer' }, q.kurz),
              h('span', {}, ` ${q.titel}. `),
              h('em', {}, q.journal),
            ),
          ),
        ),
      ),
    ),
  );
  return el;
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
  clearTimeout(state.timer);
  if (an) plane();
}

function plane() {
  clearTimeout(state.timer);
  if (!state.spielt) return;
  state.timer = setTimeout(() => geheZu(state.step + 1), SCHRITT_DAUER);
}

function geheZu(i) {
  const n = scenes[state.id].steps.length;
  state.step = ((i % n) + n) % n;
  state.ui.schritte.forEach((li, k) => {
    const b = li.firstChild;
    const aktiv = k === state.step;
    b.classList.toggle('ist-aktiv', aktiv);
    b.setAttribute('aria-expanded', String(aktiv));
    if (aktiv) {
      // Laufbalken neu starten
      const lauf = b.querySelector('.schritt__lauf');
      lauf.style.animation = 'none';
      void lauf.offsetWidth;
      lauf.style.animation = '';
    }
  });
  if (state.stage) state.stage.setStep(state.step);
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

  if (state.stage) {
    state.stage.dispose();
    state.stage = null;
  }
  const inhalt = document.getElementById('inhalt');
  inhalt.replaceChildren(baueDetail(s));
  rechne();

  if (webglVerfuegbar()) {
    try {
      state.stage = new Stage(state.ui.buehne, { ruhig });
      state.stage.load(scenes[s.id]);
      state.stage.start();
    } catch (e) {
      console.error(e);
      state.stage = null;
    }
  }
  if (!state.stage) {
    state.ui.buehne.append(h('p', { class: 'buehne__ersatz' }, '3D-Ansicht braucht WebGL – die Schritte rechts erklären den Ablauf trotzdem.'));
  }
  geheZu(0);
  setzeSpielt(state.spielt);
  inhalt.scrollTop = 0;
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
    if (!state.stage) return;
    if (document.hidden) {
      state.stage.stop();
      clearTimeout(state.timer);
    } else {
      state.stage.start();
      plane();
    }
  });
  zeige(location.hash.slice(1) || supplements[0].id);
}

init();
