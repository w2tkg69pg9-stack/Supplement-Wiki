// Baut die App nach dist/ (ein JS-Bündel, ein CSS, Schriften). Mit --serve: lokaler Server auf Port 8000.
import { build, context } from 'esbuild';
import { rm } from 'node:fs/promises';

const serve = process.argv.includes('--serve');

const options = {
  entryPoints: { app: 'src/main.js' },
  bundle: true,
  format: 'iife',
  target: ['es2020'],
  outdir: 'dist',
  minify: !serve,
  sourcemap: serve,
  legalComments: 'none',
  loader: { '.woff2': 'file', '.woff': 'file' },
  assetNames: 'fonts/[name]',
  logLevel: 'info',
};

await rm('dist', { recursive: true, force: true });

if (serve) {
  const ctx = await context(options);
  await ctx.watch();
  const { port } = await ctx.serve({ servedir: '.', port: 8000 });
  console.log(`Läuft auf http://localhost:${port}`);
} else {
  await build(options);
}
