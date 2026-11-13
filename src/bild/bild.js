// Zeigt eine Lehrbuch-Abbildung: statische Zeichnung plus Teilchen, die an Pfaden (data-strom) entlangwandern.
// Die Zeichnung kommt entweder aus dem Code (sz.zeichne) oder als gelieferte SVG-Datei (sz.svg).
import { defs, symbol } from './teile.js';
import { praefix, innen } from './lieferung.js';

let zaehler = 0;

function teilchen(sz, id, eigeneSymbole) {
  let s = '';
  for (const [name, f] of Object.entries(sz.flows || {})) {
    const form = eigeneSymbole.has(name) ? `<use href="#${id}-teilchen-${name}"/>` : symbol(f.form, f.r ?? 9, f.farbe, f.rand, f.txt, f.tf);
    s += `<g class="teilchen-gruppe" data-teilchen="${name}">`;
    for (let k = 0; k < (f.n ?? 5); k++) s += `<g class="teilchen">${form}</g>`;
    s += '</g>';
  }
  return s;
}

// Reiner Text – läuft auch ohne Browser (Tests, Lastenheft-Referenzen)
export function baueSvg(sz, id = 'b0', { ohneTeilchen = false } = {}) {
  const kopf = (vb) => `<svg class="abb" xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${sz.titel}">`;
  if (sz.svg) {
    const eigene = new Set([...sz.svg.matchAll(/id\s*=\s*["']teilchen-([^"']+)["']/g)].map((m) => m[1]));
    return `${kopf(sz.viewBox || `0 0 ${sz.w} ${sz.h}`)}${praefix(innen(sz.svg), id)}${ohneTeilchen ? '' : teilchen(sz, id, eigene)}${sz.oben ? sz.oben(id) : ''}</svg>`;
  }
  const flows = Object.entries(sz.flows || {});
  const farben = [...new Set(flows.map(([, f]) => f.farbe))];
  let s = `${kopf(`0 0 ${sz.w} ${sz.h}`)}${defs(id, farben)}${sz.zeichne(id)}`;
  for (const [name, f] of flows) {
    const spitze = f.pfeil === false ? '' : ` marker-end="url(#${id}-p${farben.indexOf(f.farbe)})"`;
    for (const d of [].concat(f.d)) s += `<path class="strom__weg" data-strom="${name}" d="${d}" fill="none" stroke="${f.farbe}"${spitze}/>`;
  }
  if (!ohneTeilchen) s += teilchen(sz, id, new Set());
  return `${s}${sz.oben ? sz.oben(id) : ''}</svg>`;
}

export class Bild {
  constructor(host, sz, { ruhig = false } = {}) {
    this.host = host;
    this.sz = sz;
    this.ruhig = ruhig;
    this.raf = 0;
    this.t0 = performance.now();
    host.innerHTML = baueSvg(sz, `b${++zaehler}`);
    const svg = host.firstElementChild;
    this.stroeme = Object.entries(sz.flows || {}).map(([name, def]) => {
      const wege = [...svg.querySelectorAll(`path[data-strom="${name}"]`)];
      const gruppe = svg.querySelector(`[data-teilchen="${name}"]`);
      return {
        name,
        def,
        teile: [...wege, gruppe],
        wege: wege.map((p) => ({ p, len: p.getTotalLength() })),
        teilchen: [...gruppe.querySelectorAll('.teilchen')],
        staerke: 0,
      };
    });
    this.bedingt = [...svg.querySelectorAll('[data-s]')].map((el) => ({ el, s: el.dataset.s.split(',').map(Number) }));
    this._tick = this._tick.bind(this);
    this.setStep(0);
  }

  setStep(i) {
    const st = this.sz.steps[i] || {};
    for (const b of this.bedingt) b.el.classList.toggle('aus', !b.s.includes(i));
    for (const s of this.stroeme) {
      s.staerke = (st.flows || {})[s.name] ?? 0;
      for (const el of s.teile) el.classList.toggle('aus', s.staerke <= 0);
    }
    this._setze(performance.now());
  }

  _setze(jetzt) {
    const t = (jetzt - this.t0) / 1000;
    for (const s of this.stroeme) {
      if (s.staerke <= 0 || !s.wege.length) continue;
      const anz = s.teilchen.length;
      const sichtbar = Math.max(1, Math.round(anz * s.staerke));
      for (let k = 0; k < anz; k++) {
        const el = s.teilchen[k];
        if (k >= sichtbar) {
          el.style.opacity = 0;
          continue;
        }
        const w = s.wege[k % s.wege.length];
        const u = this.ruhig ? (k + 0.5) / anz : (t / (s.def.dauer ?? 5) + k / anz) % 1;
        const p = w.p.getPointAtLength(u * w.len);
        el.setAttribute('transform', `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`);
        el.style.opacity = Math.min(1, u / 0.07, (1 - u) / 0.07).toFixed(2);
      }
    }
  }

  _tick(jetzt) {
    this._setze(jetzt);
    this.raf = requestAnimationFrame(this._tick);
  }

  start() {
    if (this.ruhig || this.raf) return;
    this.raf = requestAnimationFrame(this._tick);
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  dispose() {
    this.stop();
    this.host.replaceChildren();
  }
}
