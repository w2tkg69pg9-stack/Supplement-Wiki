// Erzeugt den Abbildungs-Katalog, die Vorlagen im Lieferformat und die Schritt-Vorschauen
// unter docs/abbildungen/ aus den Daten des Projekts.
//   node scripts/lastenheft.mjs           schreibt die Dateien
//   node scripts/lastenheft.mjs --pruefen meldet, ob sie aktuell sind (Exit-Code 1, wenn nicht)
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { supplements } from '../src/data/supplements.js';
import { ORTE } from '../src/data/zusatz.js';
import { szenen } from '../src/bild/szenen.js';
import { vorgaben } from '../src/bild/vorgaben.js';
import { koerperVorlage } from '../src/bild/koerper.js';
import { baueSvg } from '../src/bild/bild.js';
import { KOERPER_ORTE } from '../src/bild/lieferung.js';

const WURZEL = fileURLToPath(new URL('../', import.meta.url));
const FORM = { kreis: 'Kreis', pille: 'Kapsel', sechseck: 'Sechseck', fuenfeck: 'Fünfeck', dreieck: 'Dreieck', raute: 'Raute' };

const schritte = (txt) => txt.split(',').map((n) => +n + 1).join(', ');

function vorschau(id, sz) {
  const pw = sz.w;
  const ph = sz.h + 46;
  let style = '[data-s],[data-strom],.teilchen-gruppe{display:none}.strom__weg{stroke-width:1.7;stroke-dasharray:5 5}text{font-family:system-ui,sans-serif}.t{paint-order:stroke;stroke:#fffdf8;stroke-width:4.5px;stroke-linejoin:round}.zone{font-family:ui-monospace,monospace;letter-spacing:.09em}.tt{font-weight:700}';
  let panels = '';
  sz.steps.forEach((st, k) => {
    style += `.p${k} [data-s*="${k}"]{display:inline}`;
    for (const f of Object.keys(st.flows || {})) style += `.p${k} [data-strom="${f}"]{display:inline}`;
    const x = (k % 2) * (pw + 20);
    const y = Math.floor(k / 2) * (ph + 20);
    panels += `<g class="p${k}" transform="translate(${x} ${y})"><rect width="${pw}" height="${ph}" fill="#fff" stroke="#999"/><text x="12" y="${sz.h + 30}" font-size="18" font-weight="700" fill="#23262e">Schritt ${k + 1}: ${st.titel.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</text>${baueSvg(sz, `v${k}`, { ohneTeilchen: true }).replace('<svg ', `<svg width="${pw}" height="${sz.h}" `)}</g>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${pw * 2 + 20} ${ph * 2 + 20}">\n<!-- Vorschau ${id}: aktueller Stand, je Schritt die sichtbaren Elemente und Teilchenwege. Nur Ansicht, kein Lieferformat. -->\n<style>${style}</style>\n${panels}\n</svg>\n`;
}

function vorlage(id, sz) {
  return `${baueSvg(sz, 'v', { ohneTeilchen: true })
    .replace(/<svg [^>]*>/, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${sz.w} ${sz.h}">\n<!-- Vorlage Abb. 2 „${id}“ im Lieferformat: aktueller Stand, neu zu zeichnen. Pfade mit data-strom und Gruppen mit data-s beibehalten. -->\n`)}\n`;
}

function katalog() {
  let md = `# Abbildungs-Katalog\n\n`;
  md += `> Automatisch erzeugt aus den Projektdaten (\`npm run lastenheft\`). Nicht von Hand ändern.\n> Vorgaben zu Format, Schnittstelle und Gestaltung: [LASTENHEFT.md](LASTENHEFT.md).\n\n`;
  md += `## Inhalt\n\n`;
  md += `| Nr. | Datei | Supplement | Thema |\n|---|---|---|---|\n`;
  md += `| 1 | \`abbildungen/koerper.svg\` | alle | Abb. 1 – Körperschema für den Aufnahmeweg |\n`;
  supplements.forEach((s, i) => (md += `| ${i + 2} | \`abbildungen/zelle/${s.id}.svg\` | ${s.name} | ${s.mechanismus.ort} |\n`));

  md += `\n## Abb. 1 – Körperschema (eine Datei für alle Supplemente)\n\n`;
  md += `Vorlage: [vorlagen/koerper.svg](vorlagen/koerper.svg). Pflicht-IDs je Ort:\n\n| Ort | Organ-Gruppe | Schild-Gruppe | Anker |\n|---|---|---|---|\n`;
  for (const o of KOERPER_ORTE) md += `| ${ORTE[o]} | \`org-${o}\` | \`schild-${o}\` | \`anker-${o}\` |\n`;
  md += `\nWelche Orte je Supplement vorkommen (nicht beteiligte Organe blendet die Seite auf 28 % ab, ihre Schilder aus):\n\n| Supplement | Stationen in Reihenfolge |\n|---|---|\n`;
  for (const s of supplements) md += `| ${s.name} | ${s.aufnahme.weg.map((w, i) => `${i + 1}. ${ORTE[w.ort]}`).join(' → ')} |\n`;

  for (const s of supplements) {
    const sz = szenen[s.id];
    const v = vorgaben[s.id];
    md += `\n---\n\n## ${s.name} – \`abbildungen/zelle/${s.id}.svg\`\n\n`;
    md += `**Bildtitel:** ${sz.titel}  \n**Ort:** ${s.mechanismus.ort}  \n**Kernaussage:** ${s.mechanismus.kurz}\n\n`;
    md += `Vorlage: [vorlagen/zelle/${s.id}.svg](vorlagen/zelle/${s.id}.svg) · Schritt-Vorschau: [vorschau/${s.id}.svg](vorschau/${s.id}.svg)\n\n`;
    md += `**Pflicht-Elemente**\n\n${v.elemente.map((e) => `- ${e}`).join('\n')}\n\n`;
    md += `**Teilchenwege** (je mindestens ein \`<path data-strom="…">\`)\n\n| data-strom | Bedeutung | Farbe | Teilchen | Pfeilspitze |\n|---|---|---|---|---|\n`;
    for (const [name, f] of Object.entries(sz.flows)) {
      md += `| \`${name}\` | ${v.stroeme[name]} | \`${f.farbe}\` | ${FORM[f.form]}${f.txt ? ` „${f.txt}“` : ''} | ${f.pfeil === false ? 'nein' : 'ja'} |\n`;
    }
    md += `\n**Legende** (setzt die Seite, Farben im Bild bitte gleich verwenden)\n\n${sz.legende.map((l) => `- \`${l.farbe}\` ${l.label}`).join('\n')}\n\n`;
    const bedingt = [...vorlage(s.id, sz).matchAll(/data-s="([^"]+)"/g)].map((m) => m[1]);
    md += `**Schritte**\n\n| Schritt | Titel | Aktive Teilchenwege (Stärke 0–1) | Text auf der Seite |\n|---|---|---|---|\n`;
    sz.steps.forEach((st, k) => {
      const fl = Object.entries(st.flows || {}).map(([n, w]) => `\`${n}\` ${w}`).join(', ') || '–';
      md += `| ${k + 1} (\`data-s\` ${k}) | ${st.titel} | ${fl} | ${st.text} |\n`;
    });
    md += `\nIn der Vorlage gibt es ${bedingt.length} schrittabhängige Gruppen (sichtbar in Schritt: ${[...new Set(bedingt)].map(schritte).join(' / ') || '–'}).\n`;
  }
  return md;
}

export function erzeuge() {
  const dateien = { 'docs/abbildungen/KATALOG.md': katalog(), 'docs/abbildungen/vorlagen/koerper.svg': koerperVorlage() };
  for (const s of supplements) {
    dateien[`docs/abbildungen/vorlagen/zelle/${s.id}.svg`] = vorlage(s.id, szenen[s.id]);
    dateien[`docs/abbildungen/vorschau/${s.id}.svg`] = vorschau(s.id, szenen[s.id]);
  }
  return dateien;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const pruefen = process.argv.includes('--pruefen');
  const alt = [];
  for (const [pfad, inhalt] of Object.entries(erzeuge())) {
    const ziel = WURZEL + pfad;
    if (pruefen) {
      if (!existsSync(ziel) || (await readFile(ziel, 'utf8')) !== inhalt) alt.push(pfad);
    } else {
      await mkdir(dirname(ziel), { recursive: true });
      await writeFile(ziel, inhalt);
    }
  }
  if (pruefen && alt.length) {
    console.error(`Veraltet – bitte \`npm run lastenheft\` ausführen:\n- ${alt.join('\n- ')}`);
    process.exit(1);
  }
  console.log(pruefen ? 'Lastenheft-Anhänge sind aktuell.' : 'Lastenheft-Anhänge geschrieben.');
}
