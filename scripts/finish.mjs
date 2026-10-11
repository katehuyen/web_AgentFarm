// Second half of `npm run build`: turns Astro's dist/ into a plain site that runs when index.html is opened
// from disk and uploads to any host (Hostinger included) as it is.
//   dist/index.html          readable, every path relative
//   dist/assets/site.css     all styles
//   dist/assets/site.js      all scripts, one plain (non-module) script; module scripts do not run from disk
//   dist/assets/fonts/       the three font families
//   dist/assets/sounds/      the extension's tones
import { build } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { site } from '../src/data/site.js';

const DIST = 'dist', A = path.join(DIST, 'assets'), FONTS = path.join(A, 'fonts'), V = `?v=${site.version}`;
const clean = f => f.replace(/\.[\w-]{8}(\.\w+)$/, '$1');   // geist-latin-wght-normal.BgDaEnEv.woff2 → geist-latin-wght-normal.woff2

/* 1. scripts: one plain script, bundled from src/scripts/main.js */
await build({ entryPoints: ['src/scripts/main.js'], bundle: true, format: 'iife', minify: true, target: 'es2020', legalComments: 'none', outfile: path.join(A, 'site.js') });

/* 2. fonts: out of their hashed names, into assets/fonts */
fs.mkdirSync(FONTS, { recursive: true });
const fontMap = {};
for (const f of fs.readdirSync(A).filter(f => f.endsWith('.woff2'))) {
  fontMap[f] = clean(f);
  fs.renameSync(path.join(A, f), path.join(FONTS, clean(f)));
}

/* 3. styles: the one stylesheet Astro wrote becomes assets/site.css, with font paths relative to it */
const sheets = fs.readdirSync(A).filter(f => f.endsWith('.css') && f !== 'site.css');
if (sheets.length !== 1) throw new Error(`expected one stylesheet in ${A}, found ${sheets.length}: ${sheets.join(', ')}`);
let css = fs.readFileSync(path.join(A, sheets[0]), 'utf8');
css = css.replace(/url\(\/assets\/([^)]+)\)/g, (m, f) => `url(fonts/${fontMap[f] || clean(f)})`);
fs.writeFileSync(path.join(A, 'site.css'), css);
fs.rmSync(path.join(A, sheets[0]));

/* 4. index.html: point at site.css; nothing may still reach for a module script or a root-absolute path */
const htmlPath = path.join(DIST, 'index.html');
let html = fs.readFileSync(htmlPath, 'utf8');
html = html.replace(/<link rel="stylesheet" href="\/assets\/[^"]+\.css">/, `<link rel="stylesheet" href="assets/site.css${V}">`);
const left = html.match(/type="module"|(?:src|href)="\/(?!\/)[^"]*"/g);
if (left) throw new Error(`index.html still has module scripts or root-absolute paths: ${left.join(', ')}`);
fs.writeFileSync(htmlPath, html);

/* 5. nothing else may be left in assets/ */
const extra = fs.readdirSync(A).filter(f => !['site.css', 'site.js', 'fonts', 'sounds'].includes(f));
if (extra.length) throw new Error(`unexpected files in ${A}: ${extra.join(', ')}`);

const size = d => fs.readdirSync(d, { withFileTypes: true }).reduce((n, e) => n + (e.isDirectory() ? size(path.join(d, e.name)) : fs.statSync(path.join(d, e.name)).size), 0);
console.log(`finish: dist/ is a plain site, ${(size(DIST) / 1024).toFixed(0)} KB (site ${site.version})`);
