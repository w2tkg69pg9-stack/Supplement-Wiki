// Prüfung und Einbau gelieferter SVG-Abbildungen (siehe docs/abbildungen/LASTENHEFT.md).
// Reine Textfunktionen: laufen im Build, in den Tests und im Browser.

export const FORMAT = {
  zelle: { viewBox: '0 0 640 480', maxKB: 200 },
  koerper: { viewBox: '0 0 408 584', maxKB: 200 },
};

export const KOERPER_ORTE = ['mund', 'magen', 'duenndarm', 'dickdarm', 'leber', 'blut', 'gehirn', 'muskel', 'niere'];

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`));
  return m ? (m[2] ?? m[3]) : null;
};

function tagMit(text, id) {
  const m = text.match(new RegExp(`<[a-zA-Z][^>]*\\sid\\s*=\\s*["']${id}["'][^>]*>`));
  return m ? m[0] : null;
}

function grundregeln(text, art) {
  const f = [];
  const kb = new TextEncoder().encode(text).length / 1024;
  if (kb > FORMAT[art].maxKB) f.push(`Datei ist ${kb.toFixed(0)} kB groß, erlaubt sind ${FORMAT[art].maxKB} kB.`);
  const wurzel = text.match(/<svg\b[^>]*>/);
  if (!wurzel) return [...f, 'Kein <svg>-Element gefunden.'];
  if (text.slice(0, wurzel.index).replace(/<\?xml[^>]*\?>|<!--[\s\S]*?-->|\s/g, '').length) f.push('Vor dem <svg>-Element steht unerlaubter Inhalt (z. B. DOCTYPE).');
  const vb = (attr(wurzel[0], 'viewBox') || '').trim().replace(/[\s,]+/g, ' ');
  if (vb !== FORMAT[art].viewBox) f.push(`viewBox muss "${FORMAT[art].viewBox}" sein, ist "${vb}".`);
  const verboten = [
    [/<script\b/i, '<script> ist nicht erlaubt.'],
    [/<style\b/i, '<style> ist nicht erlaubt (würde die ganze Seite umfärben) – Präsentationsattribute verwenden.'],
    [/<foreignObject\b/i, '<foreignObject> ist nicht erlaubt.'],
    [/<image\b/i, '<image> (Rastergrafik) ist nicht erlaubt – nur Vektoren.'],
    [/<text\b[^>]*\bfont-family\s*=|font-family\s*:/i, 'Keine eigene font-family – die Schrift setzt die Seite.'],
    [/\son[a-z]+\s*=/i, 'Event-Attribute (onclick …) sind nicht erlaubt.'],
    [/<!ENTITY|<!DOCTYPE/i, 'DOCTYPE/ENTITY ist nicht erlaubt.'],
    [/url\(\s*['"]?(?!#)/i, 'url(...) darf nur auf interne IDs (#…) zeigen.'],
    [/<(animate|animateTransform|animateMotion|set)\b/i, 'Keine SMIL-Animation – bewegt wird über data-strom.'],
  ];
  for (const [re, msg] of verboten) if (re.test(text)) f.push(msg);
  for (const m of text.matchAll(/\s(?:xlink:)?href\s*=\s*["']([^"']*)["']/g)) {
    if (!m[1].startsWith('#')) f.push(`href "${m[1].slice(0, 40)}" zeigt nach außen – nur interne Verweise (#…).`);
  }
  const ids = [...text.matchAll(/\sid\s*=\s*["']([^"']+)["']/g)].map((m) => m[1]);
  const doppelt = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (doppelt.length) f.push(`Doppelte IDs: ${[...new Set(doppelt)].join(', ')}.`);
  for (const id of ids) if (!/^[A-Za-z][\w-]*$/.test(id)) f.push(`ID "${id}" enthält unerlaubte Zeichen.`);
  return f;
}

// sz: Szene aus szenen.js (für Stromnamen und Schrittzahl)
export function pruefeZelle(text, sz) {
  const f = grundregeln(text, 'zelle');
  const n = sz.steps.length;
  for (const m of text.matchAll(/\sdata-s\s*=\s*["']([^"']*)["']/g)) {
    const teile = m[1].split(',').map((x) => x.trim());
    if (!teile.every((x) => /^\d+$/.test(x) && +x >= 0 && +x < n)) f.push(`data-s="${m[1]}" ist ungültig – erlaubt sind Schrittnummern 0 bis ${n - 1}, durch Komma getrennt.`);
  }
  const gefunden = new Set();
  for (const m of text.matchAll(/<([a-zA-Z]+)\b[^>]*\sdata-strom\s*=\s*["']([^"']*)["'][^>]*>/g)) {
    if (m[1] !== 'path') f.push(`data-strom="${m[2]}" steht an <${m[1]}> – erlaubt nur an <path>.`);
    if (!sz.flows[m[2]]) f.push(`data-strom="${m[2]}" gibt es in dieser Abbildung nicht (erlaubt: ${Object.keys(sz.flows).join(', ')}).`);
    if (!attr(m[0], 'd')) f.push(`data-strom="${m[2]}": Pfad ohne d-Attribut.`);
    gefunden.add(m[2]);
  }
  // Teilchenwege dürfen weder selbst noch über eine Elterngruppe transformiert sein
  const stapel = [];
  for (const m of text.matchAll(/<(\/?)([a-zA-Z][\w:-]*)\b[^>]*?(\/?)>/g)) {
    if (m[1]) {
      stapel.pop();
      continue;
    }
    const tf = /\stransform\s*=/.test(m[0]);
    const strom = attr(m[0], 'data-strom');
    if (strom && (tf || stapel.includes(true))) f.push(`data-strom="${strom}": Pfad liegt in einem transform – Teilchen würden danebenlaufen.`);
    if (!m[3]) stapel.push(tf);
  }
  for (const name of Object.keys(sz.flows)) if (!gefunden.has(name)) f.push(`Teilchenweg data-strom="${name}" fehlt.`);
  for (const m of text.matchAll(/<symbol\b[^>]*\sid\s*=\s*["']teilchen-([^"']+)["']/g)) {
    if (!sz.flows[m[1]]) f.push(`<symbol id="teilchen-${m[1]}"> gehört zu keinem Teilchenweg.`);
  }
  return f;
}

export function pruefeKoerper(text) {
  const f = grundregeln(text, 'koerper');
  for (const ort of KOERPER_ORTE) {
    for (const art of ['org', 'schild']) {
      const t = tagMit(text, `${art}-${ort}`);
      if (!t) f.push(`ID "${art}-${ort}" fehlt.`);
      else if (!/^<g\b/.test(t)) f.push(`"${art}-${ort}" muss eine Gruppe <g> sein.`);
      else if (/\s(opacity|display|visibility)\s*=/.test(t)) f.push(`"${art}-${ort}": opacity/display/visibility setzt die Seite – bitte weglassen.`);
    }
    const a = tagMit(text, `anker-${ort}`);
    if (!a) f.push(`ID "anker-${ort}" fehlt.`);
    else if (!/^<circle\b/.test(a) || !Number.isFinite(+attr(a, 'cx')) || !Number.isFinite(+attr(a, 'cy'))) f.push(`"anker-${ort}" muss ein <circle> mit Zahlen in cx und cy sein.`);
    else {
      const davor = text.slice(0, text.indexOf(a));
      const tiefe = (davor.match(/<g\b(?![^>]*\/>)/g) || []).length - (davor.match(/<\/g>/g) || []).length;
      if (tiefe !== 0 || attr(a, 'transform')) f.push(`"anker-${ort}" muss direkt unter <svg> liegen, ohne transform.`);
    }
  }
  return f;
}

// Alle IDs mit Präfix versehen, damit sich zwei Abbildungen auf einer Seite nicht stören
export function praefix(text, p) {
  return text
    .replace(/(\sid\s*=\s*["'])([^"']+)/g, `$1${p}-$2`)
    .replace(/url\(\s*(['"]?)#/g, `url($1#${p}-`)
    .replace(/(\s(?:xlink:)?href\s*=\s*["'])#/g, `$1#${p}-`);
}

export function anker(text) {
  const out = {};
  for (const ort of KOERPER_ORTE) {
    const t = tagMit(text, `anker-${ort}`);
    if (t) out[ort] = [+attr(t, 'cx'), +attr(t, 'cy')];
  }
  return out;
}

// Gelieferte Körper-Abbildung: nicht beteiligte Organe abblenden, nur beteiligte Schilder zeigen
export function koerperAnpassen(text, beteiligt) {
  let s = text;
  for (const ort of KOERPER_ORTE) {
    const dabei = beteiligt.has(ort);
    s = s.replace(new RegExp(`(\\sid\\s*=\\s*["']org-${ort}["'])`), dabei ? '$1' : '$1 opacity="0.28"');
    s = s.replace(new RegExp(`(\\sid\\s*=\\s*["']schild-${ort}["'])`), dabei ? '$1' : '$1 display="none"');
    s = s.replace(new RegExp(`(\\sid\\s*=\\s*["']anker-${ort}["'])`), '$1 visibility="hidden"');
  }
  return s;
}

// Inhalt zwischen <svg …> und </svg>
export function innen(text) {
  const a = text.match(/<svg\b[^>]*>/);
  return text.slice(a.index + a[0].length, text.lastIndexOf('</svg>'));
}
