// Zeichen-Bausteine für die Lehrbuch-Abbildungen. Alles sind reine Funktionen, die SVG-Text liefern.

export const F = {
  tinte: '#2b2f38',
  grau: '#6b7280',
  papier: '#fbf8f0',
  aussen: '#e3eef7',
  zyto: '#fdf1da',
  blut: '#fbe2dd',
  mund: '#fdebe6',
  darm: '#f1f5df',
  rot: '#d6453d',
};

const n = (v) => +(+v).toFixed(1);
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');

// Muster für die Lipid-Doppelschicht und Pfeilspitzen in den Farben der Ströme
export function defs(id, farben = []) {
  const kopf = 'fill="#f1c47f" stroke="#9c6a1c" stroke-width="1.3"';
  const lipid = `<path d="M5 12v9.5M9 12v9.5M5 32v-9.5M9 32v-9.5" stroke="#b98a3e" stroke-width="1.3" fill="none"/><circle cx="7" cy="7" r="5" ${kopf}/><circle cx="7" cy="37" r="5" ${kopf}/>`;
  const pfeile = farben
    .map(
      (c, i) =>
        `<marker id="${id}-p${i}" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0 1 9 5 0 9z" fill="${c}"/></marker>`,
    )
    .join('');
  return `<defs><pattern id="${id}-mem" width="14" height="44" patternUnits="userSpaceOnUse">${lipid}</pattern>${pfeile}</defs>`;
}

export const flaeche = (x, y, w, h, f) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"/>`;

// Zellmembran: y ist die Oberkante, Dicke 44
export const membran = (id, x, y, w) =>
  `<g transform="translate(${x} ${y})"><rect width="${w}" height="44" fill="url(#${id}-mem)"/></g>`;

// Transporter/Kanal in der Membran (x = Mitte, y = Oberkante der Membran)
export function kanal(x, y, { f = '#a9cbea', r = '#3b6c9c', b = 42 } = {}) {
  const w = b / 2 - 4;
  const a = `y="${y - 9}" width="${w}" height="62" rx="9" fill="${f}" stroke="${r}" stroke-width="2.2"`;
  return `<g><rect x="${x - b / 2}" ${a}/><rect x="${x + 4}" ${a}/></g>`;
}

// Rezeptor mit Bindetasche oberhalb der Membran; die Tasche liegt bei (x, y − 28)
export function rezeptor(x, y, { f = '#cdbbea', r = '#6b4fa3' } = {}) {
  return `<g fill="${f}" stroke="${r}" stroke-width="2.2" stroke-linejoin="round"><rect x="${x - 9}" y="${y - 8}" width="18" height="60" rx="8"/><path d="M${x - 25} ${y - 40}q0 34 25 34q25 0 25-34h-10q0 21-15 21q-15 0-15-21z"/></g>`;
}

// Mitochondrium mit Cristae
export function mito(cx, cy, w, h, { f = '#f2b697', i = '#fde7d8', r = '#a44d2c' } = {}) {
  const rx = w / 2;
  const ry = h / 2;
  const k = Math.max(3, Math.round(w / 44));
  let c = '';
  for (let j = 0; j < k; j++) {
    const dx = -0.66 * (rx - 8) + (j * 1.32 * (rx - 8)) / (k - 1);
    const hh = (ry - 8) * Math.sqrt(1 - (dx / (rx - 8)) ** 2);
    const len = hh * 1.2;
    const y0 = j % 2 === 0 ? cy - hh - 2 : cy + hh + 2 - len;
    c += `<rect x="${n(cx + dx - 5.5)}" y="${n(y0)}" width="11" height="${n(len)}" rx="5.5" fill="${f}" stroke="${r}" stroke-width="1.5"/>`;
  }
  return `<g><ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}" stroke="${r}" stroke-width="2.6"/><ellipse cx="${cx}" cy="${cy}" rx="${rx - 8}" ry="${ry - 8}" fill="${i}" stroke="${r}" stroke-width="1.4"/>${c}</g>`;
}

// DNA-Doppelhelix als Wellenpaar mit Sprossen
export function helix(x, y, w, { amp = 9, per = 44, f = '#5b4a9c' } = {}) {
  let a = '';
  let b = '';
  let s = '';
  for (let dx = 0; dx <= w; dx += 4) {
    const v = amp * Math.sin((dx / per) * 2 * Math.PI);
    a += `${dx ? 'L' : 'M'}${n(x + dx)} ${n(y + v)}`;
    b += `${dx ? 'L' : 'M'}${n(x + dx)} ${n(y - v)}`;
    if (dx % 8 === 0 && Math.abs(v) > 3) s += `M${n(x + dx)} ${n(y + v)}V${n(y - v)}`;
  }
  return `<g fill="none" stroke="${f}" stroke-linecap="round"><path d="${s}" stroke-width="1" opacity=".55"/><path d="${a}" stroke-width="2.2"/><path d="${b}" stroke-width="2.2"/></g>`;
}

// Zellkern mit Doppelmembran
export function kern(cx, cy, r, { f = '#e8dff7', s = '#6f55a8' } = {}) {
  return `<g><circle cx="${cx}" cy="${cy}" r="${r}" fill="${f}" stroke="${s}" stroke-width="3"/><circle cx="${cx}" cy="${cy}" r="${r - 7}" fill="none" stroke="${s}" stroke-width="1.3" stroke-dasharray="16 6"/></g>`;
}

// Quergestreifte Muskelfaser (Myofibrille)
export function faser(x, y, w, h, { hoch = false, f = '#f1b2a9', r = '#9d4038' } = {}) {
  let z = '';
  const lang = hoch ? h : w;
  for (let d = 16; d < lang - 22; d += 26) {
    z += hoch
      ? `<path d="M${x + 3} ${y + d}h${w - 6}" stroke="${r}" stroke-width="2.4"/><path d="M${x + 3} ${y + d + 13}h${w - 6}" stroke="#fbe0da" stroke-width="5"/>`
      : `<path d="M${x + d} ${y + 3}v${h - 6}" stroke="${r}" stroke-width="2.4"/><path d="M${x + d + 13} ${y + 3}v${h - 6}" stroke="#fbe0da" stroke-width="5"/>`;
  }
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10" fill="${f}" stroke="${r}" stroke-width="2.4"/>${z}</g>`;
}

// Blutgefäß im Längsschnitt mit roten Blutkörperchen
export function gefaess(x, y, w, h, { zellen = 6 } = {}) {
  let z = '';
  let s = (x * 7 + y * 13 + w) % 97;
  for (let i = 0; i < zellen; i++) {
    s = (s * 37 + 11) % 97;
    const cx = x + ((i + 0.5) * w) / zellen + (s % 21) - 10;
    const cy = y + h / 2 + ((s % 5) - 2) * (h / 9);
    z += `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="12" ry="7.5" fill="#e06a5f" stroke="#a43a32" stroke-width="1.4"/><ellipse cx="${n(cx)}" cy="${n(cy)}" rx="5" ry="2.6" fill="#c9483f"/>`;
  }
  return `<g><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${F.blut}"/><path d="M${x} ${y}h${w}M${x} ${y + h}h${w}" stroke="#b5473c" stroke-width="5" stroke-linecap="round"/>${z}</g>`;
}

export const bakterium = (x, y, grad = 0) =>
  `<g transform="translate(${x} ${y}) rotate(${grad})"><path d="M17 0q6-7 12 0t12 0" fill="none" stroke="#4d7d2c" stroke-width="1.3"/><rect x="-17" y="-8" width="34" height="16" rx="8" fill="#c3e2a8" stroke="#4d7d2c" stroke-width="1.8"/></g>`;

// Organisch geformtes Protein
export function blob(cx, cy, w, h, { f = '#c9d3e2', r = '#56657d' } = {}) {
  const a = w / 2;
  const b = h / 2;
  const d = `M${n(cx - a)} ${cy}C${n(cx - a)} ${n(cy - b * 1.24)} ${n(cx - a * 0.36)} ${n(cy - b * 1.04)} ${n(cx + a * 0.1)} ${n(cy - b)}C${n(cx + a * 0.8)} ${n(cy - b * 0.96)} ${n(cx + a)} ${n(cy - b * 0.4)} ${n(cx + a)} ${n(cy + b * 0.1)}C${n(cx + a)} ${n(cy + b * 0.9)} ${n(cx + a * 0.4)} ${n(cy + b * 1.1)} ${n(cx - a * 0.16)} ${n(cy + b)}C${n(cx - a * 0.72)} ${n(cy + b * 0.92)} ${n(cx - a)} ${n(cy + b * 0.6)} ${n(cx - a)} ${cy}Z`;
  return `<path d="${d}" fill="${f}" stroke="${r}" stroke-width="2.2"/>`;
}

// Zackenstern für reaktive Sauerstoffverbindungen
export function stern(x, y, r = 10, f = '#f0564a') {
  let p = '';
  for (let i = 0; i < 16; i++) {
    const rr = i % 2 ? r * 0.48 : r;
    const w = (i / 16) * 2 * Math.PI;
    p += `${n(x + rr * Math.cos(w))},${n(y + rr * Math.sin(w))} `;
  }
  return `<polygon points="${p.trim()}" fill="${f}" stroke="#9c2a22" stroke-width="1.2" stroke-linejoin="round"/>`;
}

// Text; \n trennt Zeilen
export function txt(x, y, s, { a = 'start', g = 16, fett = false, f = F.tinte, k = '' } = {}) {
  const zeilen = String(s).split('\n');
  const inhalt = zeilen.map((z, i) => `<tspan x="${x}" dy="${i ? '1.15em' : 0}">${esc(z)}</tspan>`).join('');
  return `<text class="t ${k}" x="${x}" y="${y}" text-anchor="${a}" font-size="${g}" ${fett ? 'font-weight="700"' : ''} fill="${f}">${inhalt}</text>`;
}

// Beschriftung mit Hinweislinie zum Ziel
export function label(x, y, s, zu, o = {}) {
  const a = o.a || 'start';
  const sx = a === 'end' ? x + 5 : a === 'middle' ? x : x - 5;
  const sy = o.von === 'unten' ? y + 6 + (String(s).split('\n').length - 1) * 18 : o.von === 'oben' ? y - 15 : y - 5;
  return `<g><path d="M${sx} ${sy}L${zu[0]} ${zu[1]}" stroke="${F.tinte}" stroke-width="1.1" fill="none"/><circle cx="${zu[0]}" cy="${zu[1]}" r="2.6" fill="${F.tinte}"/>${txt(x, y, s, o)}</g>`;
}

export const zone = (x, y, s, a = 'start') =>
  `<text class="t zone" x="${x}" y="${y}" text-anchor="${a}" font-size="12.5" fill="${F.grau}">${esc(s)}</text>`;

// Nur in bestimmten Schritten sichtbar, z. B. nur('0,1', …)
export const nur = (schritte, ...inhalt) => `<g data-s="${schritte}">${inhalt.join('')}</g>`;

// Molekül-Symbol, um den Nullpunkt gezeichnet
export function symbol(form = 'kreis', r = 9, f = '#888', rand, t, tf = '#fff') {
  const st = `fill="${f}" stroke="${rand || F.tinte}" stroke-width="1.4" stroke-linejoin="round"`;
  const eck = (k, dreh = -Math.PI / 2) => {
    let p = '';
    for (let i = 0; i < k; i++) p += `${n(r * Math.cos(dreh + (i * 2 * Math.PI) / k))},${n(r * Math.sin(dreh + (i * 2 * Math.PI) / k))} `;
    return `<polygon points="${p.trim()}" ${st}/>`;
  };
  let s;
  if (form === 'pille') s = `<rect x="${n(-r * 1.75)}" y="${n(-r * 0.9)}" width="${n(r * 3.5)}" height="${n(r * 1.8)}" rx="${n(r * 0.9)}" ${st}/>`;
  else if (form === 'sechseck') s = eck(6);
  else if (form === 'fuenfeck') s = eck(5);
  else if (form === 'dreieck') s = eck(3);
  else if (form === 'raute') s = eck(4);
  else s = `<circle r="${r}" ${st}/>`;
  if (t) s += `<text class="tt" text-anchor="middle" dominant-baseline="central" font-size="${n(form === 'pille' ? r * 1.05 : r * 1.05)}" fill="${tf}">${esc(t)}</text>`;
  return s;
}

export const icon = (x, y, form, r, f, rand, t, tf) => `<g transform="translate(${x} ${y})">${symbol(form, r, f, rand, t, tf)}</g>`;
