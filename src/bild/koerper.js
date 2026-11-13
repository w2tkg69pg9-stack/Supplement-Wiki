// Abb. 1 je Supplement: der Weg durch den Körper – vom Mund bis zum Wirkort und wieder raus.
import { blob, label } from './teile.js';

const DX = 34; // linker Rand für Beschriftungen
export const W = 408;
export const H = 584;

// Ankerpunkte der Stationen (ohne Rand)
export const ANKER = {
  mund: [170, 94],
  magen: [210, 240],
  duenndarm: [172, 360],
  dickdarm: [246, 384],
  leber: [118, 224],
  blut: [212, 160],
  gehirn: [170, 46],
  muskel: [110, 540],
  niere: [272, 262],
};

const SCHILD = {
  mund: [236, 100, 'Mund', [188, 95]],
  gehirn: [236, 40, 'Gehirn', [200, 44]],
  blut: [252, 146, 'Herz · Blut', [228, 158]],
  magen: [306, 220, 'Magen', [240, 232]],
  niere: [306, 302, 'Niere', [282, 270]],
  dickdarm: [306, 410, 'Dickdarm', [258, 396]],
  leber: [-30, 206, 'Leber', [78, 224], 'unten'],
  duenndarm: [-30, 330, 'Dünn-\ndarm', [118, 360], 'unten'],
  muskel: [-30, 520, 'Muskel', [94, 540], 'unten'],
};

const ORGANE = {
  gehirn: () =>
    blob(170, 44, 62, 42, { f: '#f2c6d4', r: '#a5506e' }) +
    '<path d="M150 40q8-10 16 0t16 0M152 54q9-8 18 0t16-2" fill="none" stroke="#a5506e" stroke-width="1.4"/>',
  mund: () => '<ellipse cx="170" cy="95" rx="15" ry="6.5" fill="#d9737a" stroke="#8f3f47" stroke-width="1.8"/>',
  magen: () =>
    '<path d="M184 204C222 192 246 216 240 248C234 278 196 286 174 270C184 252 178 226 184 204Z" fill="#f2b8a2" stroke="#a9553c" stroke-width="2.2"/>',
  leber: () =>
    '<path d="M72 218C84 190 148 190 170 206C166 232 120 256 80 252C68 244 66 230 72 218Z" fill="#c68b6b" stroke="#7b4730" stroke-width="2.2"/>',
  dickdarm: () => {
    const d = 'M100 442V312Q100 298 114 298H232Q246 298 246 312V428Q246 452 214 456Q180 458 172 492';
    return `<path d="${d}" fill="none" stroke="#a36d3c" stroke-width="21" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#e8c29a" stroke-width="16" stroke-linecap="round"/>`;
  },
  duenndarm: () => {
    const d = 'M176 278C160 302 128 298 128 318C128 336 218 328 218 346C218 364 128 356 128 374C128 392 218 386 218 404C218 420 144 414 114 432';
    return `<path d="${d}" fill="none" stroke="#b07748" stroke-width="15" stroke-linecap="round"/><path d="${d}" fill="none" stroke="#f5dab6" stroke-width="11" stroke-linecap="round"/>`;
  },
  niere: () => '<path d="M268 244C284 242 288 262 282 276C276 286 262 282 264 270C266 264 270 262 266 256C262 250 262 246 268 244Z" fill="#b9656d" stroke="#7a3a42" stroke-width="2"/>',
  blut: () => '<g transform="translate(212 158) scale(1.7)"><path d="M0 12C-14 0-12-12-5-12C-1-12 0-7 0-7C0-7 1-12 5-12C12-12 14 0 0 12Z" fill="#d9534a" stroke="#8f2f28" stroke-width="1.2"/></g>',
  muskel: () =>
    '<path d="M110 508C134 524 134 558 110 574C86 558 86 524 110 508Z" fill="#dd776d" stroke="#8f3a33" stroke-width="2.2"/><path d="M110 514V568M100 522Q104 541 100 560M120 522Q116 541 120 560" fill="none" stroke="#8f3a33" stroke-width="1.2"/>',
};

const rund = (v) => +v.toFixed(1);

// Glatte Kurve (Catmull-Rom) durch alle Stationen
export function wegPfad(weg) {
  const zahl = {};
  const p = weg.map(({ ort }) => {
    const k = (zahl[ort] = (zahl[ort] || 0) + 1) - 1;
    const [x, y] = ANKER[ort];
    return [x + DX + k * 9, y + k * 7];
  });
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[Math.max(0, i - 1)];
    const b = p[i];
    const c = p[i + 1];
    const e = p[Math.min(p.length - 1, i + 2)];
    d += `C${rund(b[0] + (c[0] - a[0]) / 6)} ${rund(b[1] + (c[1] - a[1]) / 6)} ${rund(c[0] - (e[0] - b[0]) / 6)} ${rund(c[1] - (e[1] - b[1]) / 6)} ${c[0]} ${c[1]}`;
  }
  return d;
}

export function koerperSzene(s) {
  const weg = s.aufnahme.weg;
  const dabei = new Set(weg.map((w) => w.ort));
  return {
    w: W,
    h: H,
    titel: `Weg von ${s.name} durch den Körper`,
    zeichne() {
      const rumpf =
        'M148 110V132C148 146 70 142 52 188C44 210 44 240 44 270V452C44 470 50 490 60 504V584H160L164 524Q170 510 176 524L180 584H280V504C290 490 296 470 296 452V270C296 240 296 210 288 188C270 142 192 146 192 132V110';
      const haut = 'fill="#f8f0e4" stroke="#cbbda6" stroke-width="2.2"';
      const speise = 'M170 101V194C170 206 180 208 190 212';
      let s2 = `<g transform="translate(${DX} 0)"><path d="${rumpf}" ${haut}/><ellipse cx="170" cy="62" rx="47" ry="55" ${haut}/>`;
      s2 += `<path d="${speise}" fill="none" stroke="#b9705f" stroke-width="9" stroke-linecap="round"/><path d="${speise}" fill="none" stroke="#f3c5b8" stroke-width="5" stroke-linecap="round"/>`;
      for (const ort of ['dickdarm', 'duenndarm', 'leber', 'magen', 'niere', 'blut', 'gehirn', 'mund', 'muskel']) {
        s2 += `<g data-ort="${ort}" opacity="${dabei.has(ort) ? 1 : 0.28}">${ORGANE[ort]()}</g>`;
      }
      for (const ort of dabei) {
        const [x, y, name, zu, von] = SCHILD[ort];
        s2 += label(x, y, name, zu, { g: 13.5, von, fett: true });
      }
      return `${s2}</g>`;
    },
    oben() {
      const zahl = {};
      let b = '';
      weg.forEach(({ ort }, i) => {
        const k = (zahl[ort] = (zahl[ort] || 0) + 1) - 1;
        const [x, y] = ANKER[ort];
        b += `<g transform="translate(${x + DX + k * 23} ${y - 1})"><circle r="11.5" fill="${s.farbe}" stroke="#fff" stroke-width="2.2"/><text class="tt" text-anchor="middle" dominant-baseline="central" font-size="12.5" fill="#fff">${i + 1}</text></g>`;
      });
      return b;
    },
    flows: { weg: { d: wegPfad(weg), farbe: s.farbe, form: 'kreis', r: 5.5, rand: '#fff', n: 3, dauer: Math.max(7, weg.length * 1.8) } },
    steps: [{ flows: { weg: 1 } }],
  };
}
