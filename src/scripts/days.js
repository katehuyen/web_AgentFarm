// 04 Days: one chain drawn across days. A seeded simulation of the real relay rules, so it draws the same every visit:
// hand over at 40% context or at 90% of the 5-hour window; the weekly line at 98% takes an account out;
// the next leg goes to the emptiest account under the 70% wall; with none left the chain parks until the first reset.
import { ACCT, reduce } from './state.js';

const $ = id => document.getElementById('d-' + id);
const LEGS = 92, W = 300, K = 0.04, START = 9 * 60, UPDATES = [23, 51, 77];

function rng(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }
const D = (() => {
  const R = rng(20261011);
  const acc = ACCT.map(a => ({ u: 0, ws: null, w: a.w }));
  const touch = (k, t) => { const A = acc[k]; if (A.ws !== null && t - A.ws >= W) { A.u = 0; A.ws = null; } return A; };
  let t = START, a = 0, quota = 0;
  const legs = [], parks = [], ups = [];
  for (let i = 1; i <= LEGS; i++) {
    const A = touch(a, t); if (A.ws === null) A.ws = t;
    const want = 30 + R() * 22, rate = 0.7 + R() * 0.6, to5 = (90 - A.u) / rate, toW = (98 - A.w) / (rate * K);
    const q = Math.min(to5, toW) < want ? (toW < to5 ? 'wk' : '5h') : '';
    const d = Math.max(6, q ? Math.min(to5, toW) : want);
    A.u += d * rate; A.w += d * rate * K;
    legs.push({ i, s: t, e: t + d, a, q }); if (q) quota++;
    t += d + 0.8;
    if (UPDATES.includes(i)) { ups.push({ t, i }); t += 2.5; }
    if (i === LEGS) break; /* the last leg is the live one */
    if (q || A.u >= 70) {
      const c = acc.map((x, k) => ({ k, x: touch(k, t) })).filter(o => o.x.u < 70 && o.x.w < 97.9).sort((p, r) => p.x.u - r.x.u);
      if (c.length) a = c[0].k;
      else {
        const r = acc.map((x, k) => ({ k, at: x.ws === null ? t : x.ws + W, w: x.w })).filter(o => o.w < 97.9).sort((p, s) => p.at - s.at)[0];
        parks.push({ s: t, e: r.at }); t = r.at + 0.8; a = r.k; touch(a, t);
      }
    }
  }
  return { legs, parks, ups, quota, end: legs[legs.length - 1].e };
})();

const fmt = m => { m = ((m % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(Math.floor(m % 60)).padStart(2, '0'); };
const WORDS = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five'];
$('title').innerHTML = `Ninety-two legs. <em>${WORDS[Math.floor(D.end / 1440)]} nights.</em> One task.`;
$('parks').textContent = D.parks.length;
$('quota').textContent = D.quota;
$('updates').textContent = D.ups.length;
$('legend').innerHTML = ACCT.map(a => `<span><i style="background:${a.c}"></i>${a.n}</span>`).join('')
  + '<span><i style="background:#ec0f74;width:3px"></i>quota handover</span><span><i class="pk"></i>parked until reset</span><span><i class="up"></i>self-update, same seat</span>';

const cv = $('canvas');
let G = null, prog = reduce ? 1 : 0;
function geo() {
  const w = cv.parentElement.clientWidth - 28, mob = w < 560;
  const rows = Math.ceil(D.end / 1440), lab = mob ? 40 : 64, top = 22, rh = mob ? 24 : 34, gap = mob ? 14 : 16;
  const h = top + rows * (rh + gap), dpr = devicePixelRatio || 1;
  cv.width = w * dpr; cv.height = h * dpr; cv.style.height = h + 'px';
  const g = cv.getContext('2d'); g.setTransform(dpr, 0, 0, dpr, 0, 0);
  G = { g, w, h, rows, lab, top, rh, gap, mob, X: m => lab + (m / 1440) * (w - lab - 4) };
}
function hatch(g) {
  const p = document.createElement('canvas'); p.width = p.height = 6;
  const c = p.getContext('2d'); c.strokeStyle = '#6c6d63'; c.lineWidth = 1.4; c.beginPath(); c.moveTo(0, 6); c.lineTo(6, 0); c.stroke();
  return g.createPattern(p, 'repeat');
}
/* calls fn(day, from, to) for each day a span touches */
function span(s, e, fn) {
  for (let d = Math.floor(s / 1440); d * 1440 < e; d++) {
    const a = Math.max(s, d * 1440) - d * 1440, b = Math.min(e, (d + 1) * 1440) - d * 1440;
    if (b > a) fn(d, a, b);
  }
}
function draw() {
  if (!G) return;
  const { g, w, h, rows, lab, top, rh, gap, mob, X } = G;
  g.clearRect(0, 0, w, h);
  const cut = START + prog * (D.end - START), Y = d => top + d * (rh + gap);
  g.font = `${mob ? 9.5 : 11}px "Geist Mono Variable", ui-monospace, monospace`;
  for (let hr = 0; hr <= 24; hr += mob ? 6 : 3) {
    const x = X(hr * 60);
    g.fillStyle = 'rgba(255,255,255,.06)'; g.fillRect(x, top - 4, 1, h - top);
    g.fillStyle = '#6c6d63'; g.textAlign = hr === 24 ? 'right' : hr === 0 ? 'left' : 'center'; g.fillText(String(hr).padStart(2, '0'), x, 11);
  }
  g.textAlign = 'left';
  for (let d = 0; d < rows; d++) {
    g.fillStyle = '#8f8f84'; g.fillText(mob ? `D${d + 1}` : `DAY ${d + 1}`, 0, Y(d) + rh / 2 + 4);
    g.fillStyle = '#16170f'; g.fillRect(X(0), Y(d), X(1440) - X(0), rh);
  }
  const pat = hatch(g);
  let n = 0;
  for (const p of D.parks) {
    if (p.s > cut) break;
    span(p.s, Math.min(p.e, cut), (d, a, b) => {
      g.fillStyle = pat; g.fillRect(X(a), Y(d), X(b) - X(a), rh);
      g.strokeStyle = '#4b4c44'; g.strokeRect(X(a) + 0.5, Y(d) + 0.5, X(b) - X(a) - 1, rh - 1);
      if (!mob && X(b) - X(a) > 96) { g.fillStyle = '#cfd0c4'; g.fillText(`parked · ${fmt(p.e)}`, X(a) + 6, Y(d) + rh / 2 + 4); }
    });
  }
  for (const L of D.legs) {
    if (L.s > cut) break;
    n = L.i;
    span(L.s, Math.min(L.e, cut), (d, a, b) => {
      const x = X(a), wd = Math.max(1, X(b) - X(a) - 1.2);
      g.fillStyle = ACCT[L.a].c; g.fillRect(x, Y(d), wd, rh);
      if (L.q) { g.fillStyle = L.q === 'wk' ? '#ffffff' : '#ec0f74'; g.fillRect(x + wd - 2, Y(d), 2, rh); }
      if (wd > (mob ? 14 : 20) && b - a > 20) { g.fillStyle = '#10140a'; g.textAlign = 'center'; g.fillText(String(L.i), x + wd / 2, Y(d) + rh / 2 + 4); g.textAlign = 'left'; }
    });
  }
  for (const u of D.ups) {
    if (u.t > cut) break;
    const d = Math.floor(u.t / 1440), x = X(u.t - d * 1440), y = Y(d) - 3;
    g.fillStyle = '#ec0f74'; g.beginPath(); g.moveTo(x - 5, y - 8); g.lineTo(x + 5, y - 8); g.lineTo(x, y); g.fill();
  }
  if (prog >= 1) {
    const d = Math.floor(D.end / 1440), x = X(D.end - d * 1440);
    g.fillStyle = '#e0245e'; g.fillRect(x, Y(d) - 6, 2, rh + 12);
    g.fillStyle = '#a8f035'; g.fillText(mob ? `⑂ ${LEGS} live` : `⑂ ${LEGS} · live now`, x + 8, Y(d) + rh / 2 + 4);
  }
  $('legs').textContent = n;
  $('hours').textContent = Math.round((Math.min(cut, D.end) - START) / 60) + 'h';
}
function play() {
  const t0 = performance.now();
  const f = t => { prog = Math.min(1, (t - t0) / 2600); draw(); if (prog < 1) requestAnimationFrame(f); };
  requestAnimationFrame(f);
}
geo(); draw();
addEventListener('resize', () => { geo(); draw(); });
document.fonts?.ready.then(draw);
if (!reduce) new IntersectionObserver((es, o) => { if (es[0].isIntersecting) { o.disconnect(); play(); } }, { threshold: 0.35 }).observe($('strip'));

/* hover a block to read it */
const tip = $('tip');
cv.addEventListener('pointermove', e => {
  if (!G || prog < 1) return;
  const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, { top, rh, gap, lab, w } = G;
  const d = Math.floor((y - top) / (rh + gap)), inRow = y - top - d * (rh + gap) <= rh;
  if (d < 0 || !inRow || x < lab) { tip.style.opacity = 0; return; }
  const m = d * 1440 + ((x - lab) / (w - lab - 4)) * 1440;
  const L = D.legs.find(l => m >= l.s && m <= l.e), P = D.parks.find(p => m >= p.s && m <= p.e);
  let t = '';
  if (L) t = `⑂ ${L.i} · ${ACCT[L.a].n} · ${Math.round(L.e - L.s)}m · ${fmt(L.s)}–${fmt(L.e)}${L.q === 'wk' ? ' · weekly line, 98%' : L.q ? ' · quota handover, 5H 90%' : ' · handed over at 40%'}`;
  else if (P) t = `parked ${Math.round(P.e - P.s)}m · woke at the ${fmt(P.e)} reset`;
  if (!t) { tip.style.opacity = 0; return; }
  tip.textContent = t; tip.style.opacity = 1;
  const tw = tip.offsetWidth, px = Math.min(Math.max(14, x + 14 - tw / 2), cv.parentElement.clientWidth - tw - 8);
  tip.style.left = px + 'px'; tip.style.top = y - 20 + 'px';
});
cv.addEventListener('pointerleave', () => { tip.style.opacity = 0; });
