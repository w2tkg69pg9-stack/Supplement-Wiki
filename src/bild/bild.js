// Zeigt eine Lehrbuch-Abbildung: statische Zeichnung plus Teilchen, die an Pfeilen entlangwandern.
import { defs, symbol } from './teile.js';

let zaehler = 0;

// Reiner Text – läuft auch ohne Browser (Tests)
export function baueSvg(sz, id = 'b0') {
  const flows = Object.entries(sz.flows || {});
  const farben = [...new Set(flows.map(([, f]) => f.farbe))];
  let s = `<svg class="abb" viewBox="0 0 ${sz.w} ${sz.h}" role="img" aria-label="${sz.titel}">${defs(id, farben)}${sz.zeichne(id)}`;
  for (const [name, f] of flows) {
    const spitze = f.pfeil === false ? '' : ` marker-end="url(#${id}-p${farben.indexOf(f.farbe)})"`;
    s += `<g class="strom" data-strom="${name}">`;
    for (const d of [].concat(f.d)) s += `<path class="strom__weg" d="${d}" fill="none" stroke="${f.farbe}"${spitze}/>`;
    for (let k = 0; k < (f.n ?? 5); k++) s += `<g class="teilchen">${symbol(f.form, f.r ?? 9, f.farbe, f.rand, f.txt, f.tf)}</g>`;
    s += '</g>';
  }
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
    this.stroeme = [...svg.querySelectorAll('.strom')].map((g) => ({
      g,
      name: g.dataset.strom,
      def: sz.flows[g.dataset.strom],
      wege: [...g.querySelectorAll('.strom__weg')].map((p) => ({ p, len: p.getTotalLength() })),
      teilchen: [...g.querySelectorAll('.teilchen')],
      staerke: 0,
    }));
    this.bedingt = [...svg.querySelectorAll('[data-s]')].map((el) => ({ el, s: el.dataset.s.split(',').map(Number) }));
    this._tick = this._tick.bind(this);
    this.setStep(0);
  }

  setStep(i) {
    const st = this.sz.steps[i] || {};
    for (const b of this.bedingt) b.el.classList.toggle('aus', !b.s.includes(i));
    for (const s of this.stroeme) {
      s.staerke = (st.flows || {})[s.name] ?? 0;
      s.g.classList.toggle('aus', s.staerke <= 0);
    }
    this._setze(performance.now());
  }

  _setze(jetzt) {
    const t = (jetzt - this.t0) / 1000;
    for (const s of this.stroeme) {
      if (s.staerke <= 0) continue;
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
