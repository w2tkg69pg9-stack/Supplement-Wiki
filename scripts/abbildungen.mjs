// Liest gelieferte Abbildungen aus abbildungen/ und prüft sie gegen das Lastenheft.
// Aufruf direkt: node scripts/abbildungen.mjs  → listet Fehler, Exit-Code 1 bei Fehlern.
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { szenen } from '../src/bild/szenen.js';
import { pruefeZelle, pruefeKoerper } from '../src/bild/lieferung.js';

const ORDNER = fileURLToPath(new URL('../abbildungen/', import.meta.url));

export async function ladeLieferung() {
  const zelle = {};
  const fehler = [];
  let koerper = null;
  if (existsSync(`${ORDNER}zelle`)) {
    for (const datei of (await readdir(`${ORDNER}zelle`)).sort()) {
      if (!datei.endsWith('.svg')) continue;
      const id = datei.slice(0, -4);
      const text = await readFile(`${ORDNER}zelle/${datei}`, 'utf8');
      if (!szenen[id]) {
        fehler.push(`abbildungen/zelle/${datei}: Unbekanntes Supplement "${id}" (erlaubt: ${Object.keys(szenen).join(', ')}).`);
        continue;
      }
      const f = pruefeZelle(text, szenen[id]);
      fehler.push(...f.map((x) => `abbildungen/zelle/${datei}: ${x}`));
      if (!f.length) zelle[id] = text;
    }
  }
  if (existsSync(`${ORDNER}koerper.svg`)) {
    const text = await readFile(`${ORDNER}koerper.svg`, 'utf8');
    const f = pruefeKoerper(text);
    fehler.push(...f.map((x) => `abbildungen/koerper.svg: ${x}`));
    if (!f.length) koerper = text;
  }
  return { zelle, koerper, fehler };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { zelle, koerper, fehler } = await ladeLieferung();
  console.log(`Zell-Abbildungen geliefert: ${Object.keys(zelle).join(', ') || 'keine'}`);
  console.log(`Körper-Abbildung geliefert: ${koerper ? 'ja' : 'nein'}`);
  if (fehler.length) {
    console.error(`\n${fehler.length} Fehler:\n- ${fehler.join('\n- ')}`);
    process.exit(1);
  }
  console.log('Alles in Ordnung.');
}
